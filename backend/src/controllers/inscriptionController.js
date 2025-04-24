const {
  createParentInscription,
  addStudentToInscription,
  getParentInscriptionById,
  getStudentsByParentId,
  findUserByEmail,
  getAllParentsSorted,
  getAllStudentsSorted,
  getStudentsByParentIdSorted,
  getStudentById,
  getParentById,
  getFiltredInscriptions,
  updateParentStatus,
  updateStudentStatus,
} = require("../services/inscriptionService");

const { sendEmail } = require("../utils/mailer");

const createParentInscriptionController = async (req, res) => {
  try {
    const {
      parent_last_name,
      parent_first_name,
      parent_phone_number,
      parent_card_Id,
      email_address,
      parent_profession,
      parent_etat_civil,
      number_kids,
    } = req.body;

    if (
      !parent_last_name ||
      !parent_first_name ||
      !parent_card_Id ||
      !email_address ||
      !parent_profession ||
      !parent_etat_civil ||
      !number_kids
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!Number.isInteger(number_kids) || number_kids <= 0) {
      return res.status(400).json({ message: "Invalid number of kids" });
    }

    const parentInscriptionId = await createParentInscription({
      parent_last_name,
      parent_first_name,
      parent_phone_number,
      parent_card_Id,
      email_address,
      parent_profession,
      parent_etat_civil,
      number_kids,
    });

    return res.status(201).json({
      message: "Parent inscription created successfully",
      parentInscriptionId,
    });
  } catch (error) {
    console.error("Error creating parent inscription:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const addStudentToInscriptionController = async (req, res) => {
  try {
    const parentInscriptionId = parseInt(req.params.parentId);
    const studentData = req.body; // Direct student object

    if (!parentInscriptionId || !studentData) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const {
      student_last_name,
      student_first_name,
      student_grade,
      student_gender,
      student_nationality,
      student_birth_date,
      student_blood_type,
      student_allergies,
      student_chronic_illnesses,
    } = studentData;

    // Validate required fields
    if (
      !student_last_name ||
      !student_first_name ||
      !student_grade ||
      !student_gender ||
      !student_nationality ||
      !student_blood_type
    ) {
      return res.status(400).json({
        message: "Missing student required fields",
        required: [
          "student_last_name",
          "student_first_name",
          "student_grade",
          "student_gender",
          "student_nationality",
          "student_blood_type",
        ],
      });
    }

    // Validate date format
    if (isNaN(Date.parse(student_birth_date))) {
      return res.status(400).json({
        message: `Invalid birth date for student ${student_last_name} ${student_first_name}`,
        expected_format: "YYYY-MM-DD",
      });
    }

    // Add student to inscription
    await addStudentToInscription(parentInscriptionId, studentData);

    return res.status(201).json({
      message: "Student added successfully to the parent inscription",
      parentInscriptionId,
      student: {
        student_last_name,
        student_first_name,
      },
    });
  } catch (error) {
    console.error("Error adding student:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const { createAccount } = require("../services/accountService");

const validateSingleStudentController = async (req, res) => {
  const parentInscriptionId = parseInt(req.params.parentId);
  const studentId = parseInt(req.params.studentId);

  try {
    // 1. Fetch parent inscription
    const parent = await getParentInscriptionById(parentInscriptionId);
    if (!parent) {
      return res.status(404).json({ message: "Parent inscription not found" });
    }

    // 2. Fetch the student to be validated
    const students = await getStudentsByParentId(parentInscriptionId);
    const student = students.find((s) => s.id === studentId);
    if (!student) {
      return res
        .status(404)
        .json({ message: "Student not found for this parent" });
    }

    // update status
    await updateStudentStatus(studentId, {
      status: "validated",
      validated: true,
    });
    await updateParentStatus(parentInscriptionId, {
      validated: true,
    });

    // 3. Check if parent account already exists and active
    const existingParentUser = await findUserByEmail(parent.email_address);
    const isParentAccountActive =
      existingParentUser && existingParentUser.status === "active";

    let parentCredentials = null;
    let parentAccount = null;

    if (!existingParentUser) {
      const passwordParent = Array.from({ length: 12 }, () =>
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]".charAt(
          Math.floor(Math.random() * 88)
        )
      ).join("");

      // Create parent account
      parentAccount = await createAccount(
        parent.email_address,
        null, // no matricule
        passwordParent,
        "parents",
        {
          last_name: parent.parent_last_name,
          first_name: parent.parent_first_name,
          phone_number: parent.parent_phone_number,
          profession: parent.parent_profession,
          etat_civil: parent.parent_etat_civil,
          card_id: parent.parent_card_Id,
        }
      );

      parentCredentials = {
        name: `${parent.parent_first_name} ${parent.parent_last_name}`,
        email: parent.email_address,
        password: passwordParent,
        isNew: true,
      };
    } else if (!isParentAccountActive) {
      existingParentUser.status = "active";
      parentAccount = { user: existingParentUser };

      parentCredentials = {
        name: `${parent.parent_first_name} ${parent.parent_last_name}`,
        email: existingParentUser.email,
        isNew: false,
      };
    } else {
      parentAccount = { user: existingParentUser };

      parentCredentials = {
        name: `${parent.parent_first_name} ${parent.parent_last_name}`,
        email: existingParentUser.email,
        isNew: false,
      };
    }

    // 4. Generate student's matricule, email, and password
    const birthDate = new Date(student.student_birth_date);
    const datePart = birthDate.toISOString().split("T")[0].replace(/-/g, "");
    const randomPart = String(Math.floor(Math.random() * 1000)).padStart(
      3,
      "0"
    );
    const matricule = `${datePart}${randomPart}`;
    const fakeEmail = `${student.student_last_name.toLowerCase()}${matricule}@dirassati.com`;

    const passwordEleve = Array.from({ length: 12 }, () =>
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]".charAt(
        Math.floor(Math.random() * 88)
      )
    ).join("");

    // 5. Create student account
    const studentAccount = await createAccount(
      fakeEmail,
      matricule,
      passwordEleve,
      "eleve",
      {
        last_name: student.student_last_name,
        first_name: student.student_first_name,
        gender: student.student_gender,
        blood_type: student.student_blood_type,
        nationality: student.student_nationality,
        birth_date: student.student_birth_date,
        allergies: student.student_allergies,
        chronic_illnesses: student.student_chronic_illnesses,
        parent_id: parentAccount.user.id,
        grade: student.student_grade,
      }
    );

    const studentCredentials = {
      name: `${student.student_first_name} ${student.student_last_name}`,
      email: fakeEmail,
      password: passwordEleve,
      matricule: matricule,
    };

    // Construct email content
    const subject = `Inscription Validée - Accès à votre compte Dirassati`;

    const text = `
Bonjour ${parentCredentials.name},

Votre inscription ainsi que celle de votre enfant ${
      studentCredentials.name
    } ont été validées avec succès.

🧑‍💼 Identifiants du parent:
- Email: ${parentCredentials.email}
${
  parentCredentials.isNew
    ? `- Mot de passe: ${parentCredentials.password}`
    : "- (Votre compte existait déjà)"
}

🎓 Identifiants de l'élève:
- Nom: ${studentCredentials.name}
- Email: ${studentCredentials.email}
- Matricule: ${studentCredentials.matricule}
- Mot de passe: ${studentCredentials.password}

Merci de vous connecter à la plateforme pour compléter les informations nécessaires.
Cordialement,
L'équipe Dirassati
`;

    const html = `
<h2>Bonjour ${parentCredentials.name},</h2>
<p>Votre inscription ainsi que celle de votre enfant <strong>${
      studentCredentials.name
    }</strong> ont été validées avec succès.</p>

<h3>🧑‍💼 Identifiants du parent:</h3>
<ul>
  <li><strong>Email:</strong> ${parentCredentials.email}</li>
  ${
    parentCredentials.isNew
      ? `<li><strong>Mot de passe:</strong> ${parentCredentials.password}</li>`
      : `<li>Votre compte existait déjà</li>`
  }
</ul>

<h3>🎓 Identifiants de l'élève:</h3>
<ul>
  <li><strong>Nom:</strong> ${studentCredentials.name}</li>
  <li><strong>Email:</strong> ${studentCredentials.email}</li>
  <li><strong>Matricule:</strong> ${studentCredentials.matricule}</li>
  <li><strong>Mot de passe:</strong> ${studentCredentials.password}</li>
</ul>

<p>Merci de vous connecter à la plateforme pour compléter les informations nécessaires.</p>
<p>Cordialement,<br/>L'équipe Dirassati</p>
`;

    // Send email
    await sendEmail(parentCredentials.email, subject, text, html);

    // 6. Return both credentials
    return res.status(201).json({
      message: "Student validated successfully,email sent to the parent",
      studentCredentials,
      parentCredentials,
    });
  } catch (err) {
    console.error("Error validating student:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

const refuseStudentInscriptionController = async (req, res) => {
  const parentInscriptionId = parseInt(req.params.parentId);
  const studentId = parseInt(req.params.studentId);
  const { reason } = req.body;

  try {
    if (!reason || reason.trim().length < 5) {
      return res.status(400).json({
        message:
          "A valid reason for refusal must be provided (min 5 characters)",
      });
    }

    // 1. Get parent and student data
    const parent = await getParentInscriptionById(parentInscriptionId);
    if (!parent) {
      return res.status(404).json({ message: "Parent inscription not found" });
    }

    const students = await getStudentsByParentId(parentInscriptionId);
    const student = students.find((s) => s.id === studentId);
    if (!student) {
      return res
        .status(404)
        .json({ message: "Student not found for this parent" });
    }

    await updateStudentStatus(studentId, {
      status: "refused",
      validated: false,
      refusal_reason: reason,
    });

    const subject = `Refus d'inscription de votre enfant - Dirassati`;

    const text = `
Bonjour ${parent.parent_first_name} ${parent.parent_last_name},

L'inscription de votre enfant ${student.student_first_name} ${student.student_last_name} a été refusée.

📌 Raison du refus :
"${reason}"

Vous pouvez recommencer la procédure en cliquant sur le lien suivant :
👉 https://dirassati.com/inscription

Merci de votre compréhension.

Cordialement,
L'équipe Dirassati
`;

    const html = `
<h2>Bonjour ${parent.parent_first_name} ${parent.parent_last_name},</h2>
<p>L'inscription de votre enfant <strong>${student.student_first_name} ${student.student_last_name}</strong> a été <strong>refusée</strong>.</p>

<h3>📌 Raison du refus :</h3>
<blockquote style="border-left: 4px solid #ccc; padding-left: 10px; color: #555;">${reason}</blockquote>

<p>Vous pouvez <strong>recommencer la procédure</strong> via le lien suivant :</p>
<p>👉 <a href="https://dirassati.com/inscription" target="_blank">https://dirassati.com/inscription</a></p>

<p>Merci de votre compréhension.</p>
<p>Cordialement,<br/>L'équipe Dirassati</p>
`;

    await sendEmail(parent.email_address, subject, text, html);

    return res.status(200).json({
      message: "Refusal reason sent to parent via email",
      reason,
    });
  } catch (err) {
    console.error("Error refusing student inscription:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const getAllParents = async (req, res) => {
  try {
    const parents = await getAllParentsSorted();
    res.json(parents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getAllStudents = async (req, res) => {
  try {
    const students = await getAllStudentsSorted();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const findStudentsByParent = async (req, res) => {
  try {
    const { parentId } = req.params;
    const students = await getStudentsByParentIdSorted(parentId);
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const findStudentById = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await getStudentById(studentId);
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const findParentById = async (req, res) => {
  try {
    const { parentId } = req.params;
    const parent = await getParentById(parentId);
    res.json(parent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSpecifiedInscription = async (req, res) => {
  try {
    const { status } = req.params;
    const students = await getFiltredInscriptions(status);
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createParentInscriptionController,
  addStudentToInscriptionController,
  validateSingleStudentController,
  refuseStudentInscriptionController,
  getSpecifiedInscription,
  getAllParents,
  getAllStudents,
  findStudentsByParent,
  findStudentById,
  findParentById,
};
