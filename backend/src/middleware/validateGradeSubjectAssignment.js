const validateGradeSubjectAssignment = (req, res, next) => {
    const { gradeId, subjects, specializationId } = req.body;
  
    if (!gradeId) {
      return res.status(400).json({ message: "Grade ID is required" });
    }
  
    if (!subjects || !Array.isArray(subjects) || subjects.length === 0) {
      return res.status(400).json({ message: "Subjects array is required with at least one subject" });
    }
  
    for (const subject of subjects) {
      if (!subject.subjectId) {
        return res.status(400).json({ message: "Each subject must have a subjectId" });
      }
      if (!subject.weeklyHours || typeof subject.weeklyHours !== 'number' || subject.weeklyHours < 1 || subject.weeklyHours > 10) {
        return res.status(400).json({ 
          message: "Each subject must have weeklyHours between 1 and 10" 
        });
      }
      if (typeof subject.isDoubleSession !== 'boolean') {
        return res.status(400).json({ 
          message: "Each subject must have isDoubleSession boolean" 
        });
      }
    }
  
    next();
  };
  
  module.exports = validateGradeSubjectAssignment;