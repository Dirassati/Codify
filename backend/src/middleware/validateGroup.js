const Joi = require("joi");

const groupValidationSchema = Joi.object({
  name: Joi.string().required(),
  class_id: Joi.number().required(),
  grade_id: Joi.number().required(),
  specialization_id: Joi.number().optional().allow(null), 
});

const validateGroup = (req, res, next) => {
  const { error } = groupValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next(); 
};

module.exports = validateGroup;
