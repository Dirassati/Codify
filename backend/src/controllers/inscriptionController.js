const {
  createParentInscription,
  addStudentToInscription,
} = require("../services/inscriptionService");

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

module.exports = {
  createParentInscriptionController,
  addStudentToInscriptionController,
};
