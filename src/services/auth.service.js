const db = require('../../database/models/index');
const crypto = require('crypto');

const { Sequelize } = require('sequelize');

class AuthService {
  async generateUniqueShortId() {
    let shortId;
    let isUnique = false;

    while (!isUnique) {
      shortId = crypto.randomBytes(4).toString('hex').toUpperCase();
      const existingTenant = await db.Tenant.findOne({ where: { short_id: shortId } });
      if (!existingTenant) {
        isUnique = true;
      }
    }

    return shortId;
  }

  async createTenantAndUser(tenantData, userData) {
    try {
      // Empieza una transacción para asegurar que ambas operaciones se realicen o ninguna.
      const result = await db.Tenant.sequelize.transaction(async (t) => {
        const shortId = await this.generateUniqueShortId();

        tenantData.short_id = shortId;

        // creamos el tenant
        const newTenant = await db.Tenant.create(tenantData, { transaction: t });

        const schemaName = `${tenantData.schema_name
          .toLowerCase()
          .replace(/\s+/g, '_')}_${newTenant.id}`;

        // Crear el esquema en la base de datos
        await db.Tenant.sequelize.query(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`, {
          transaction: t,
        });

        // Modificar el modelo de Tenant para usar el nuevo esquema
        db.Tenant.schema = schemaName;

        // Luego creamos el usuario y asociamos el tenant
        const newUser = await db.tenant_users.create(
          { ...userData, tenant_id: newTenant.id },
          { transaction: t }
        );

        // se dice a sequelice donde se creara las migraciones ,en este caso en el nuevo schema generado

        const collaboratorModel = db.Collaborator.schema(schemaName);

        await collaboratorModel.sync({ transaction: t });

        await collaboratorModel.create(
          {
            first_name: userData.first_name,
            last_name: userData.last_name,
            email: userData.email,
            password: userData.password,
            role: 'Admin',
          },
          { transaction: t }
        );

        return { newTenant, newUser };
      });

      return result;
    } catch (error) {
      console.log(error.message);

      throw new Error('Error al crear el tenant y el usuario.');
    }
  }
}

module.exports = AuthService;
