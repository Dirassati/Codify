const express = require("express");
const router = express.Router();
const classroomController = require("../controllers/classroomController");

router.post("/classrooms", classroomController.createClassroom);
router.post("/classrooms/add-equipment", classroomController.addEquipmentToClassroom);
router.get("/classrooms/list", classroomController.getAllClassrooms); 
router.get("/classrooms/:classroomId/list-equipments", classroomController.getClassroomEquipments); 

module.exports = router;
