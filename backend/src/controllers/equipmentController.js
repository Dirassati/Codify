const equipmentService = require("../services/equipmentService");
const catchAsync = require("../utils/catchAsync");

exports.createEquipment = catchAsync(async (req, res, next) => {
  const { name, description, quantity } = req.body;
  
  const equipment = await equipmentService.createEquipment({
    name,
    description,
    quantity: quantity || 1
  });

  res.status(201).json({
    status: "success",
    data: equipment,
    message: equipment.quantity > (quantity || 1)
      ? `Added to existing equipment (Total: ${equipment.quantity})`
      : "New equipment created"
  });
});
exports.getAllEquipments = catchAsync(async (req, res) => {
  const equipments = await equipmentService.getAllEquipments();
  res.status(200).json({
    status: 'success',
    data: equipments
  });
});