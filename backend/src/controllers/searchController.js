/*const searchService = require('../services/AdminsearchService');

const searchController = {
  async search(req, res) {
    try {
      const {
        q: searchTerm,
        role,
        dateType = 'created',
        startDate,
        endDate,
        matricule,
        grade
      } = req.query;

      const results = await searchService.searchUsers({
        searchTerm,
        role,
        dateType,
        startDate,
        endDate,
        matricule,
        grade
      });

      res.json({ success: true, data: results });
    } catch (error) {
      console.error('Search error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Internal server error' 
      });
    }
  }
};

module.exports = searchController;*/