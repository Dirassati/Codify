const { addTeacher } = require('../services/addTeacherService');


const createTeacher = async (req, res) => {
  try {
        const teacherData = {
      ...req.body,
      photo: req.file?.path  // Add uploaded photo path to data
    };

    // Use your existing service
    const teacher = await addTeacher(teacherData);

    // Successful response
    res.status(201).json({
      success: true,
      data: {
        id: teacher.id,
        email: teacher.email,
        matricule: teacher.matricule,
        role: 'enseignant',
        details: {
          last_name: teacher.last_name,
          first_name: teacher.first_name,
          field: teacher.field
        }
      }
    });

  } catch (error) {
    // Error handling
    res.status(error.statusCode || 400).json({
      success: false,
      error: error.message || 'Teacher creation failed'
    });
  }
};

module.exports = {
  createTeacher
};