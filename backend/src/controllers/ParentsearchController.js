const parentSearchService = require('../services/parentSearchService');

class ParentSearchController {
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
        const results = await parentSearchService.search(searchParams);
        res.json({ success: true, data: results });
      } catch (error) {
        res.status(500).json({ success: false, error: 'Parent search failed' });
      }
  }
}


module.exports = new ParentSearchController();