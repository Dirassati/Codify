const express = require("express");
const multer = require("multer");
const upload = multer();
const {
  createParentInscriptionController,
  addStudentToInscriptionController,
} = require("../controllers/inscriptionController");

const router = express.Router();

router.post("/parent", createParentInscriptionController);

router.post(
  "/:parentId/students",
  upload.none(), // parse form data (no files) to remove after we add the files functionality
  addStudentToInscriptionController
);

module.exports = router;
