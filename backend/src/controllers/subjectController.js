const subjectService = require("../services/subjectService");

const createSubject = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const newSubject = await subjectService.createSubject(name, description);
    res.status(201).json(newSubject);
  } catch (error) {
    console.error(error);
    next(error); 
  }
};

const getSubjects = async (req, res, next) => {
  try {
    const subjects = await subjectService.listSubjects();
    res.status(200).json(subjects);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSubject, getSubjects
};
