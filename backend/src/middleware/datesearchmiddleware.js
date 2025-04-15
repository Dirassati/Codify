function validateAndParseDates(req, res, next) {
    try {
      const { dateType, startDate, endDate } = req.query;
      
       // Skip if no date parameters exist
    if (!dateType && !startDate && !endDate) {
        req.dateSearch = null; // Explicitly mark no date search
        return next();
      }
      // Validation
      if (!dateType || !startDate || !endDate) {
        throw new Error('Missing date parameters');
      }
      
      const utcStart = new Date(`${startDate}T00:00:00Z`);
      const utcEnd = new Date(`${endDate}T23:59:59Z`);
      
      if (isNaN(utcStart)) throw new Error('Invalid startDate');
      if (isNaN(utcEnd)) throw new Error('Invalid endDate');
      if (utcStart > utcEnd) throw new Error('startDate must be before endDate');
  
      // Attach to request
      req.dateSearch = {
        dateType,
        dateRange: [utcStart, utcEnd]
      };
      
      next();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  module.exports = { validateAndParseDates };