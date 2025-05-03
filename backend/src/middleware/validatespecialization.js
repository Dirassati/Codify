const Joi = require("joi");

const specializationValidationSchema = Joi.object({
  name: Joi.string().required().min(3).max(100),  
  description: Joi.string().optional().max(255),  
});

const validateSpecialization = (req, res, next) => {
  const { error } = specializationValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next(); 
};

module.exports = validateSpecialization;
