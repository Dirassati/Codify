const studentService = require("../services/studentService");
const catchAsync = require("../utils/catchAsync");

exports.listStudents = catchAsync(async (req, res) => {
  const students = await studentService.listStudents();
  
  res.status(200).json({
    status: "success",
    data: students.map(student => ({
      id: student.id,
      last_name: student.last_name,
      first_name: student.first_name,
      matricule: student.matricule,
      email: student.email,
      group: student.group_name,
      year: student.grade_year,
      level: student.grade_level,
      specialization: student.specialization_name
    }))
  });
});

exports.listStudentsByGroup = catchAsync(async (req, res) => {
  const { groupId } = req.params;
  const students = await studentService.listStudentsByGroup(groupId);
  
  res.status(200).json({
    status: "success",
    data: students
  });
});

exports.assignSpecialization = catchAsync(async (req, res) => {
  const { studentId, specializationId } = req.body;

  if (!studentId || !specializationId) {
    return res.status(400).json({
      success: false,
      message: "ID étudiant et spécialisation requis"
    });
  }

  const result = await studentService.assignSpecialization(
    Number(studentId),
    Number(specializationId)
  );

  res.status(200).json({
    success: true,
    message: "Spécialisation attribuée avec succès",
    data: result
  });
});

exports.getAvailableSpecializations = catchAsync(async (req, res) => {
  const { id } = req.params;
  
  if (isNaN(Number(id))) {
    return res.status(400).json({
      success: false,
      message: "ID étudiant invalide"
    });
  }

  const result = await studentService.getAvailableSpecializations(Number(id));
  res.status(200).json({
    success: true,
    data: result
  });
});

exports.getStudentDetails = catchAsync(async (req, res) => {
  const { id } = req.params;
  
  if (isNaN(Number(id))) {
    return res.status(400).json({
      success: false,
      message: "ID étudiant invalide"
    });
  }

  try {
    const result = await studentService.getStudentDetails(Number(id));
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    if (error.message === "Étudiant non trouvé") {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    throw error;
  }
});