const Joi = require('joi');

module.exports = {
  assignSpecialization: Joi.object({
    studentId: Joi.number().integer().required(),
    specializationId: Joi.number().integer().required()
  })
};