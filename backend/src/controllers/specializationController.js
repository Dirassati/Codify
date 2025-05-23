const { createSpecialization } = require('../services/specializationService');

exports.createSpecialization = async (req, res) => {
  const { name, description } = req.body;

  try {
    const specialization = await createSpecialization(name, description);
    return res.status(201).json({
      success: true,
      message: "Spécialisation créée avec succès",
      specialization,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la création de la spécialisation",
      error: error.message,
    });
  }
};
