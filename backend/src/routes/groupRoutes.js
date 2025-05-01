const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const validate = require('../middleware/validateGroup');

router.post('/groups', validate, groupController.createGroup);
router.post('/groups/distribute', groupController.distributeStudents);
router.get('/groups/list', groupController.listGroups);
router.get('/groups/with-teachers-classrooms', groupController.getGroupsWithTeachersAndClassrooms);

module.exports = router;