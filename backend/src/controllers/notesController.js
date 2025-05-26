const notesService = require('../services/notesService');
const { logger } = require('../utils/logger');

class NotesController {
  async getStudentsGrades(req, res) {
    try {
      const { groupId, subjectId, trimestre } = req.params;
      if (!groupId || !subjectId || !trimestre) {
        throw new Error('Missing required parameters');
      }
      
      const data = await notesService.getStudentsForGrading(groupId, subjectId, trimestre);
      
      res.json({
        success: true,
        data
      });
    } catch (error) {
      logger.error(`Failed to fetch students grades: ${error}`);
      const statusCode = error.message.includes('not found') ? 404 : 
                        error.message.includes('invalid') ? 400 : 500;
      res.status(statusCode).json({
        success: false,
        message: error.message || 'Failed to fetch students grades'
      });
    }
  }

  async saveGrade(req, res) {
    try {
      const { eleveId, subjectId, trimestre, noteType, value } = req.body;
      
      const result = await notesService.saveOrUpdateNote(
        eleveId, 
        subjectId, 
        trimestre, 
        noteType, 
        value === '' ? null : parseFloat(value)
      );
      
      res.json(result);
    } catch (error) {
      logger.error(`Failed to save grade: ${error}`);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to save grade'
      });
    }
  }

  async getStudentGradesSummary(req, res) {
    try {
      const { eleveId, trimestre } = req.params;
      
      if (!eleveId || !trimestre) {
        throw new Error('Missing required parameters');
      }

      const data = await notesService.getStudentGradesSummary(
        parseInt(eleveId), 
        parseInt(trimestre)
      );
      
      res.json({
        success: true,
        data
      });
      console.log(data)

    } catch (error) {
      logger.error(`Failed to fetch student grades summary: ${error}`);
      const statusCode = error.message.includes('not found') ? 404 : 400;
      res.status(statusCode).json({
        success: false,
        message: error.message || 'Failed to fetch student grades summary'
      });
    }
  }

  async getAllStudentsWithAverages(req, res) {
  try {
    const data = await notesService.getAllStudentsWithAverages();
    res.json({
      success: true,
      data
    });
  } catch (error) {
    logger.error(`Failed to fetch students with averages: ${error}`);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch students with averages'
    });
  }
}
}

module.exports = new NotesController();