const BaseSearchService = require('./BasesearchService');

class ParentSearchService extends BaseSearchService {
  constructor() {
    super('parents', ['first_name', 'last_name']);
  }
}

module.exports = new ParentSearchService();