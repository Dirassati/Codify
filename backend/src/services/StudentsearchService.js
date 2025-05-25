const BaseSearchService = require('./BasesearchService');

class StudentSearchService extends BaseSearchService {
  constructor() {
    super('eleve', ['first_name', 'last_name']);
  }

  // Additional student-specific methods can go here
  async searchStudentsByGrade(grade) {
    // Implementation...
  }
}

module.exports = new StudentSearchService();