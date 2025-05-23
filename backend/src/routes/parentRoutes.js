const express = require("express");
const router = express.Router();
const parentController = require("../controllers/parentController");

router.get("/parents/list", parentController.listParents);
router.get("/parents/:parentId/children", parentController.listParentChildren);

module.exports = router;