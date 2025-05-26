const gradeService = require("../services/gradeService");
const specializationService = require("../services/specializationService");

module.exports = {
  async createGrade(req, res) {
    try {
      const { name, level } = req.body;
      const newGrade = await gradeService.createGrade(name, level);
      res.status(201).json(newGrade);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating grade" });
    }
  },

  async getAllGrades(req, res) {
    try {
      const grades = await gradeService.getAllGrades();
      res.status(200).json(grades);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching grades" });
    }
  },

 async assignSubjectsToGrade(req, res) {
    try {
      const { gradeId, subjects, specializationId } = req.body;
      const grade = await gradeService.getGradeById(gradeId);

      if (!grade) {
        return res.status(404).json({ message: "Grade not found" });
      }

      // Validate specialization for lycee
      if (grade.level === 'lycee') {
        if (!specializationId) {
          return res.status(400).json({
            message: "Specialization is required for lycee level"
          });
        }
        const spec = await specializationService.getSpecializationById(specializationId);
        if (!spec) {
          return res.status(404).json({ message: "Specialization not found" });
        }
      }

      for (const subject of subjects) {
        if (subject.coefficient && (isNaN(subject.coefficient) || subject.coefficient <= 0)) {
          return res.status(400).json({ 
            message: "Coefficient must be a positive number" 
          });
        }
      }

      await gradeService.assignSubjectsToGrade(
        gradeId,
        subjects,
        grade.level === 'lycee' ? specializationId : null
      );

      res.status(200).json({ message: "Subjects assigned successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message || "Error assigning subjects" });
    }
  },

  async getGradeSubjects(req, res) {
    try {
      const gradeId = parseInt(req.params.gradeId);
      const specializationId = req.query.specializationId 
        ? parseInt(req.query.specializationId) 
        : null;

      const result = await gradeService.getGradeSubjects(gradeId, specializationId);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message || "Error fetching grade subjects" });
    }
  }
};