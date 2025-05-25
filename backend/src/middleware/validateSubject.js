const { body, validationResult } = require('express-validator');

const validateSubject = [
  // Name validation
  body('name')
    .trim()
    .notEmpty().withMessage('Subject name is required')
    .isLength({ max: 100 }).withMessage('Subject name cannot exceed 100 characters'),
    
  // Description validation (optional)
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
    
  // Classroom type validation
  body('classroom_type')
    .optional()
    .isIn(['class', 'lab', 'informatique', 'sport', 'art'])
    .withMessage('Invalid classroom type. Must be one of: class, lab, informatique, sport, art'),
    
  // Middleware to handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg
        }))
      });
    }
    next();
  }
];

module.exports = validateSubject;