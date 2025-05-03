const groupService = require('../services/groupService');
const catchAsync = require('../utils/catchAsync');

module.exports = {
  createGroup: catchAsync(async (req, res) => {
    const group = await groupService.createGroup(
      req.body.name,
      req.body.class_id,
      req.body.grade_id,
      req.body.specialization_id
    );
    res.status(201).json({
      status: 'success',
      message: "Groupe créé avec succès",
      data: group
    });
  }),

  distributeStudents: catchAsync(async (req, res) => {
    const result = await groupService.distributeStudents();
    res.status(200).json({
      status: 'success',
      message: `${result.count} élèves distribués avec succès`
    });
  }),

  listGroups: catchAsync(async (req, res) => {
    const groups = await groupService.listGroups();
    res.status(200).json({
      status: 'success',
      results: groups.length,
      data: groups.map(g => ({
        name: g.name,
        year: g.grade_name,
        level: g.grade_level,
        specialization: g.specialization_name,
        classroom: g.classroom_name,
        student_number: g.student_number
      }))
    });
  }),

  getGroupsWithTeachersAndClassrooms: catchAsync(async (req, res) => {
    const groups = await groupService.getGroupsWithTeachersAndClassrooms();
    res.status(200).json({
      status: 'success',
      results: groups.length,
      data: groups
    });
  })
};