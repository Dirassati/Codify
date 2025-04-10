const express = require("express");
const {
  createParentInscriptionController,
  addStudentToInscriptionController,
} = require("../controllers/inscriptionController");

const router = express.Router();

router.post("/parent", createParentInscriptionController);

router.post("/:parentId/students", addStudentToInscriptionController);

module.exports = router;
