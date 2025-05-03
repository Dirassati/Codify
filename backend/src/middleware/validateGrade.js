const validateGrade = (req, res, next) => {
    const { name, level } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Grade name is required" });
    }

    if (!level || !["primaire", "moyen", "lycee"].includes(level)) {
      return res.status(400).json({
        message: "Level is required and must be one of: 'primaire', 'moyen', or 'lycee'.",
      });
    }
  
    next();
  };
  
  module.exports = validateGrade;
  