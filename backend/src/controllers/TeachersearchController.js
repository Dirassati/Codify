const teacherSearchService = require('../services/TeachersearchService');

class TeacherSearchController {
  async search(req, res) {
    try {
      // Prepare search parameters
      const searchParams = {
        searchTerm: req.query.searchTerm,
        searchBy: req.query.searchBy,
        // Use middleware-processed dates if they exist
        ...(req.dateSearch || {})
      };
      const results = await teacherSearchService.search(searchParams);
      res.json({ success: true, data: results });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Teacher search failed' });
    }
  }
}

module.exports = new TeacherSearchController();