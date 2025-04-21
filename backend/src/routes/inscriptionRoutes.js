const express = require("express");
const multer = require("multer");
const upload = multer();
const {
  createParentInscriptionController,
  addStudentToInscriptionController,
  validateSingleStudentController,
  refuseStudentInscriptionController,
  getSpecifiedInscription,
  getAllParents,
  getAllStudents,
  findStudentsByParent,
  findStudentById,
  findParentById,
} = require("../controllers/inscriptionController");

const router = express.Router();

router.post("/parent", createParentInscriptionController);

router.post(
  "/:parentId/students",
  upload.none(), // to remove after we add the files functionality
  addStudentToInscriptionController
);

router.post("/validate/:parentId/:studentId", validateSingleStudentController);

router.post("/refuse/:parentId/:studentId", refuseStudentInscriptionController);

router.get("/parents", getAllParents);

router.get("/students", getAllStudents);

router.get("/parents/:parentId/students", findStudentsByParent);

router.get("/parents/:parentId", findParentById);

router.get("/students/:studentId", findStudentById);

router.get("/students/status/:status", getSpecifiedInscription);

module.exports = router;
