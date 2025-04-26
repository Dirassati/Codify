const { update } = require("../db/knex");
const { sendEmail } = require("../utils/mailer");
const knex = require("../db/knex");

const {
  make_Account_reinscription_status,
  getAllParentsSorted,
  getParentById,
  getStudentById,
  getStudentsByParentIdSorted,
  getAllStudentsSorted,
  updateParentStatus,
  updateStudentStatus,
  getParentByEmail,
  getStudentByFields,
  findUserById,
} = require("../services/re-inscriptionService");
const { activate_Account } = require("../services/accountService");

const reinscriptionStatusParentChildren = async (req, res) => {
  const parentId = parseInt(req.params.parentId);

  try {
    const students = await getStudentsByParentIdSorted(parentId);
    const parent = await getParentById(parentId);
    if (!parent) {
      return res.status(404).json({
        message: "user doesn't exist",
      });
    }
    await make_Account_reinscription_status(parentId);
    for (const student of students) {
      await make_Account_reinscription_status(student.id);
    }

    res.status(200).json({
      message: "Account in re-inscription status",
      parent,
      students, // Return the updated user
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error" });
  }
};

const makeAllParentsStudentsReinscriptionStatus = async (req, res) => {
  try {
    const parents = await getAllParentsSorted();

    for (const p of parents) {
      await make_Account_reinscription_status(p.id);
      const students = await getStudentsByParentIdSorted(p.id);

      for (const s of students) {
        await make_Account_reinscription_status(s.id);
      }
    }
    // Construct email content and send email to each parent
    for (const p of parents) {
      const subject = `Reinscription de votre enfants dans la platforme Dirassati`;

      const text = `
  Bonjour ${p.last_name},
  Votre compte a été mis en statut de réinscription ;
  Veuillez compléter votre réinscription depuis la page d'accueil dès que possible.
  Après 20 jours sans action, votre compte sera désactivé.
  Cordialement,
  L'équipe administrative Dirassati 
  `;

      const html = `<p>Bonjour ${p.last_name},</p>
  <p>Votre compte a été mis en statut de <strong>réinscription</strong>.</p>
  <p>Veuillez compléter votre réinscription depuis la page d'accueil dès que possible.</p>
  <p>Après 20 jours sans action, votre compte sera désactivé.</p>
  <p>Cordialement,</p>
  <p>L'équipe administrative Dirassati </p>`;

      const userResult = await findUserById(p.id);
      const user = userResult[0]; // Get the first (and only) user from array

      await sendEmail(user.email, subject, text, html);
    }

    return res
      .status(200)
      .json({ message: "All parents and students updated and emails sent " });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update statuses", error: err.message });
  }
};

const reinscriptionParentSingleChild = async (req, res) => {
  const { email, matricule, nom, prenom } = req.body;
  const parentId = parseInt(req.params.parentId);
  const studentId = parseInt(req.params.studentId);

  if (!email || !matricule || !nom || !prenom) {
    return res.status(400).json({
      message: "Email, matricule, nom, and prenom are required",
    });
  }

  try {
    // 1. Get parent by email
    const parentResult = await getParentByEmail(email);
    const parent = parentResult[0];

    if (parent.id !== parentId) {
      return res
        .status(404)
        .json({ message: "the provided email is not correct" });
    }

    // 2. Get student by multiple fields and verify they belong to this parent
    const studentResult = await getStudentByFields(matricule, nom, prenom);
    const student = studentResult[0];

    if (!student) {
      return res.status(404).json({
        message: "Stusent not found",
      });
    }

    if (student.parent_id !== parent.id || student.id !== studentId) {
      return res.status(404).json({
        message: "Student does not belong to this parent",
      });
    }

    // 3. Update both statuses
    await activate_Account(student.id);
    await activate_Account(parent.id);

    const subject = `Reinscription de votre enfants dans la platforme Dirassati avec succés!`;

    const text = `
Bonjour ${parent.last_name},

Nous vous confirmons que la réinscription a été effectuée avec succès.

Le statut de votre compte ainsi que celui de votre enfant ${student.first_name}  a été réactivé. Vous pouvez désormais accéder à votre espace personnel et continuer à utiliser nos services.

Nous vous remercions pour votre réactivité.

Cordialement,  
L'équipe administrative

`;

    const html = `
      <p>Bonjour <strong>${parent.name}</strong>,</p>
      <p>Nous avons le plaisir de vous informer que la réinscription a été <strong>validée avec succès</strong>.</p>
      <p>Les statuts de votre compte et celui de votre enfant <strong>${student.name}</strong> sont désormais <span style="color: green;">actifs</span>.</p>
      <p>Vous pouvez accéder à votre espace personnel à tout moment pour consulter les informations ou effectuer d'autres démarches.</p>
      <p>Merci pour votre confiance et votre réactivité.</p>
      <br />
      <p >Cordialement,<br>L'équipe administrative</p>
`;

    await sendEmail(parent.email, subject, text, html);

    res.status(200).json({
      message: "Student and parent successfully updated to active again ",
      parent: { id: parent.id, email: parent.email },
      student: {
        id: student.id,
        matricule: student.matricule,
        nom: student.nom,
        prenom: student.prenom,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  reinscriptionStatusParentChildren,
  makeAllParentsStudentsReinscriptionStatus,
  reinscriptionParentSingleChild,
};
