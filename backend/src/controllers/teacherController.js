const teacherService = require("../services/teacherService");
const catchAsync = require("../utils/catchAsync");

// List all teachers
exports.listTeachers = catchAsync(async (req, res) => {
  const teachers = await teacherService.listTeachers();
  
  res.status(200).json({
    status: "success",
    data: teachers.map(teacher => ({
      id: teacher.id,
      last_name: teacher.last_name,
      first_name: teacher.first_name,
      phone_number: teacher.phone_number,
      email: teacher.email,
      degree: teacher.degree,
      field: teacher.field,
      level: teacher.level,
      employment_date: teacher.employment_date
    }))
  });
});

// Assign subjects to teacher
exports.assignSubjects = catchAsync(async (req, res) => {
  const teacher_id = req.params.id;
  const { subject_ids } = req.body;
  
  const assignments = await teacherService.assignSubjectsToTeacher({
    teacher_id,
    subject_ids
  });
  
  res.status(200).json({
    status: 'success',
    data: assignments,
    message: assignments.length > 0
      ? `Assigned ${assignments.length} subject(s)`
      : 'No new subjects assigned (already exists)'
  });
});

// Get teacher with subjects
exports.getTeacherWithSubjects = catchAsync(async (req, res) => {
  const teacher_id = req.params.id;
  const teacher = await teacherService.getTeacherWithSubjects(teacher_id);
  res.status(200).json({
    status: 'success',
    data: teacher
  });
});

// Assign teacher to group subject
exports.assignTeacherToGroupSubject = catchAsync(async (req, res) => {
  const { teacher_id, subject_id } = req.body;
  const { group_id } = req.params;

  const result = await teacherService.assignTeacherToGroupSubject(
    teacher_id,
    group_id,
    subject_id
  );

  if (!result.success) {
    return res.status(400).json({
      status: 'fail',
      message: result.error
    });
  }

  res.status(200).json({
    status: 'success',
    message: result.message,
    data: {
      group_id,
      subject_id,
      teacher_id
    }
  });
});

// Get group subjects with teachers
exports.getGroupSubjectsWithTeachers = catchAsync(async (req, res) => {
  const { group_id } = req.params;
  const subjects = await teacherService.getGroupSubjectsWithTeachers(group_id);

  res.status(200).json({
    status: 'success',
    data: {
      group_id,
      subjects
    }
  });
});

// Get teacher groups with details
exports.getTeacherGroupsWithDetails = catchAsync(async (req, res) => {
  const { id } = req.params;
  const groups = await teacherService.getTeacherGroupsWithDetails(id);

  res.status(200).json({
    status: 'success',
    results: groups.length,
    data: groups
  });
});

// Get teacher for specific subject in group
exports.getTeacherForSubjectInGroup = catchAsync(async (req, res) => {
  const { subject_id, group_id } = req.body;
  
  if (!subject_id || !group_id) {
    return res.status(400).json({
      success: false,
      message: "subject_id and group_id are required"
    });
  }

  try {
    const teacher = await teacherService.getTeacherForSubjectInGroup(
      Number(group_id),
      Number(subject_id)
    );
    
    res.status(200).json({
      success: true,
      data: teacher
    });
  } catch (error) {
    if (error.message === "No teacher found for this subject in the specified group") {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    throw error;
  }
});