const express = require("express");
const router = express.Router();
const {
  reinscriptionStatusParentChildren,
  makeAllParentsStudentsReinscriptionStatus,
  reinscriptionParentSingleChild,
} = require("../controllers/re-inscriptionController");

router.post("/:parentId/:studentId", reinscriptionParentSingleChild); //the parent reinscript his child
router.post("/:parentId", reinscriptionStatusParentChildren); //the children of the parent and him moved to re-inscription status
router.post("/", makeAllParentsStudentsReinscriptionStatus); //make all the parents and students to the re-inscription status

module.exports = router;
