const catchAsync = require("../utils/catchAsync");
const AbsenceService = require("../services/abcenseService");
const { validate } = require("node-cron");
/**
 * Report a student absence (Teacher)
 */
const reportAbsence = catchAsync(async (req, res) => {
  const { studentId, groupId, teacherId, subjectId, date, timing } = req.body;
  //   const teacherId = req.user.id; // From auth middleware

  const absence = await AbsenceService.reportAbsence(
    studentId,
    groupId,
    teacherId,
    subjectId,
    date,
    timing
  );

  res.status(201).json({
    status: "success",
    data: absence,
    message: "Absence reported successfully",
  });
});

/**
 * Justify an absence (Parent)
 */
const justifyAbsence = catchAsync(async (req, res) => {
  const { parentId, absenceId, justificationText } = req.body;
  const filePath = req.file ? req.file.path : null;

  const absence = await AbsenceService.justifyAbsence(
    absenceId,
    parentId,
    justificationText,
    filePath
  );

  res.status(200).json({
    status: "success",
    data: absence,
    message: "Absence justified successfully",
  });
});

/**
 * Validate/reject justification (Admin)
 */
const validateJustification = catchAsync(async (req, res) => {
  const { absenceId, adminId, validated, message } = req.body;
  const absence = await AbsenceService.validateJustification(
    absenceId,
    adminId,
    validated,
    message
  );

  res.status(200).json({
    status: "success",
    data: absence,
    message: validated
      ? "Justification validated successfully"
      : "Justification rejected, more clarifiations are required",
  });
});

/**
 * Get student absences (Parent/Student)
 */
const getStudentAbsences = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const filters = req.query;

  const absences = await AbsenceService.getStudentAbsences(studentId, filters);

  res.status(200).json({
    status: "success",
    results: absences.length,
    data: absences,
  });
});

/**
 * Get group absences (Teacher)
 */
const getGroupAbsences = catchAsync(async (req, res) => {
  const { groupId } = req.params;
  const filters = req.query;

  const absences = await AbsenceService.getGroupAbsences(groupId, filters);

  res.status(200).json({
    status: "success",
    results: absences.length,
    data: absences,
  });
});

/**
 * Get all absences (Admin)
 */
const getAllAbsences = catchAsync(async (req, res) => {
  const filters = req.query;

  const absences = await AbsenceService.getAllAbsences(filters);

  res.status(200).json({
    status: "success",
    results: absences.length,
    data: absences,
  });
});

/**
 * Get absence details
 */
const getAbsenceDetails = catchAsync(async (req, res) => {
  const { absenceId } = req.params;

  const absence = await AbsenceService.getAbsenceDetails(absenceId);

  if (!absence) {
    return res.status(404).json({
      status: "fail",
      message: "Absence not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: absence,
  });
});

module.exports = {
  getAbsenceDetails,
  getAllAbsences,
  getGroupAbsences,
  getStudentAbsences,
  reportAbsence,
  justifyAbsence,
  validateJustification,
};
