const classroomService = require("../services/classroomService");
const catchAsync = require("../utils/catchAsync");

exports.createClassroom = catchAsync(async (req, res) => {
  const classroomData = req.body;
  const classroom = await classroomService.createClassroomWithEquipments(classroomData);
  res.status(201).json({ success: true, data: classroom });
});

exports.addEquipmentToClassroom = catchAsync(async (req, res) => {
  const { classroomId, equipmentId, quantity } = req.body;
  const result = await classroomService.addEquipmentToClassroom(classroomId, equipmentId, quantity);
  res.status(200).json({ success: true, message: "Equipment added to classroom", data: result });
});

exports.getAllClassrooms = catchAsync(async (req, res) => {
  const classrooms = await classroomService.getAllClassrooms();
  res.status(200).json({
    status: 'success',
    data: classrooms
  });
});
exports.getClassroomEquipments = catchAsync(async (req, res) => {
  const { classroomId } = req.params;
  const equipments = await classroomService.getClassroomEquipments(classroomId);
  res.status(200).json({
    status: 'success',
    data: equipments
  });
});