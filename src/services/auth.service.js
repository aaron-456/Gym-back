const db = require('../../database/models/index');

class AuthService {
  async register(userData) {
    return await db.users.create(userData);
  }
}

module.exports = AuthService;
