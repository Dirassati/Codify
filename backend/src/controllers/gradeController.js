const gradeService = require("../services/gradeService");
const specializationService = require("../services/specializationService");
const catchAsync = require("../utils/catchAsync");

exports.createGrade = catchAsync(async (req, res, next) => {
  const { name, level } = req.body;

  const existingGrade = await gradeService.checkGradeExistence(name);
  if (existingGrade) {
    return res.status(400).json({ message: "Grade already exists" });
  }

  const newGrade = await gradeService.createGrade(name, level);
  res.status(201).json({
    status: "success",
    data: newGrade
  });
});

exports.getAllGrades = catchAsync(async (req, res, next) => {
  const grades = await gradeService.getAllGrades();
  
  res.status(200).json({
    status: "success",
    results: grades.length,
    data: grades
  });
});

exports.assignSubjectsToGrade = catchAsync(async (req, res, next) => {
  const { grade_id, subject_ids, specialization_id } = req.body;

  const grade = await gradeService.getGradeById(grade_id);
  if (!grade) {
    return res.status(404).json({ message: "Grade not found" });
  }

  if (grade.level === 'lycee') {
    if (!specialization_id) {
      return res.status(400).json({ 
        message: "Specialization required for lycee level" 
      });
    }
    const spec = await specializationService.getSpecializationById(specialization_id);
    if (!spec) {
      return res.status(404).json({ message: "Specialization not found" });
    }
  }

  await gradeService.assignSubjectsToGrade(
    grade_id,
    subject_ids,
    grade.level === 'lycee' ? specialization_id : null
  );

  res.status(200).json({
    status: "success",
    message: "Subjects assigned successfully"
  });
});

exports.getGradeSubjects = catchAsync(async (req, res, next) => {
  const { grade_id, specialization_id } = req.body;

  const result = await gradeService.getGradeSubjects(grade_id, specialization_id || null);
  
  res.status(200).json({
    status: "success",
    data: result
  });
});