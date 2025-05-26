const Joi = require('joi');

const teacherSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  matricule: Joi.string().pattern(/^[A-Z]{3}-\d{4}$/).required(),
  last_name: Joi.string().max(50).required(),
  first_name: Joi.string().max(50).required(),
  phone_number: Joi.string().pattern(/^\+?[\d\s-]{10,15}$/),
  address: Joi.string().max(200),
  gender: Joi.string().valid('Male', 'Female'),
  degree: Joi.string().valid('bachelor', 'master', 'phd').required(),
  field: Joi.string().max(50).required(),
  level: Joi.string().valid('junior', 'mid', 'senior'),
  employment_date: Joi.date().iso().less('now')
});

const validateTeacher = (req, res, next) => {
  const { error } = teacherSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message.replace(/"/g, '')
    });
  }
  next();
};

module.exports = {
  validateTeacher
}; 