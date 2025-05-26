const BaseSearchService = require('./BasesearchService');

class TeacherSearchService extends BaseSearchService {
  constructor() {
    super('enseignant', ['first_name', 'last_name']);
  }
}

module.exports = new TeacherSearchService();