const db = require('../../database/models/index');

class UsersService {
  async findAll() {
    const users = await db.users.findAll();
    return users;
  }

  async create(userData) {
    return await db.users.create(userData);
  }

  async findOne(userId) {
    const user = await db.users.findOne({
      where: {
        id: userId,
      },
    });

    return user;
  }

  async update(user, userUpdate) {
    return await user.update(userUpdate);
  }

  async deleted(user) {
    return await user.destroy();
  }
}

module.exports = UsersService;
