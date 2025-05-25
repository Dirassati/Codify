const express = require("express");
const router = express.Router();
const {
  getAbsenceDetails,
  getAllAbsences,
  getGroupAbsences,
  getStudentAbsences,
  reportAbsence,
  justifyAbsence,
  validateJustification,
} = require("../controllers/abcenseController");
const authController = require("../controllers/authController");
//const upload = require("../utils/multerConfig");

// Teacher routes
router.post(
  "/report",
  //authController.protect,
  //authController.restrictTo("teacher"),
  reportAbsence
);

// Parent routes
router.post(
  "/justify",
  //authController.protect,
  //authController.restrictTo("parent"),
  //upload.single("justificationFile"),
  justifyAbsence
);

// Admin routes
router.post(
  "/validate",
  // authController.protect,
  //authController.restrictTo("admin"),
  validateJustification
);

// Common routes
router.get(
  "/student/:studentId",
  //authController.protect,
  getStudentAbsences
);

router.get(
  "/group/:groupId",
  //authController.protect,
  getGroupAbsences
);

router.get(
  "/",
  //authController.protect,
  //authController.restrictTo("admin"),
  getAllAbsences
);

router.get(
  "/:absenceId",
  //authController.protect,
  getAbsenceDetails
);

module.exports = router;
