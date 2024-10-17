const db = require('../../database/models');
const { encrypt } = require('../utils/handleBcrypt');
const { tokenSign } = require('../utils/tokenUtils');

class CollaboratorService {
  async createCollaborator(adminUser_Id, collaboratorData, schemaName) {
    const adminUser = await db.Collaborator.schema(schemaName).findByPk(adminUser_Id);

    if (!adminUser) {
      throw new Error('Admin no encontrado :/');
    }

    const passwordHash = await encrypt(collaboratorData.password);

    const collaboratorModel = db.Collaborator.schema(schemaName);

    const newCollaborator = await collaboratorModel.create({
      first_name: collaboratorData.first_name,
      last_name: collaboratorData.last_name,
      email: collaboratorData.email,
      password: passwordHash,
      role: collaboratorData.role,
    });

    const token = tokenSign(newCollaborator);

    return { newCollaborator, token };
  }
}

module.exports = CollaboratorService;
