const studentSearchService = require('../services/StudentsearchService');

class StudentSearchController {
  async search(req, res) {
    try {
      // Prepare search parameters
      const searchParams = {
        searchTerm: req.query.searchTerm,
        searchBy: req.query.searchBy,
        dateType: req.query.dateType,
        dateRange: req.query.dateRange
          ? Array.isArray(req.query.dateRange) 
            ? req.query.dateRange 
            : [req.query.startDate, req.query.endDate]
          : undefined
      };
      const results = await studentSearchService.search(searchParams);
      res.json({ success: true, data: results });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Student search failed' });
    }
  }
}

module.exports = new StudentSearchController();