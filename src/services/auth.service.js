const db = require('../../database/models/index');
const { Sequelize } = require('sequelize');

class AuthService {
  async createTenantAndUser(tenantData, userData) {
    try {
      // Empieza una transacción para asegurar que ambas operaciones se realicen o ninguna.
      const result = await db.Tenant.sequelize.transaction(async (t) => {
        // Primero creamos el tenant
        const newTenant = await db.Tenant.create(tenantData, { transaction: t });

        // Crear el esquema en la base de datos
        await db.Tenant.sequelize.query(
          `CREATE SCHEMA IF NOT EXISTS "${newTenant.schema_name}"`,
          { transaction: t }
        );

        // Modificar el modelo de Tenant para usar el nuevo esquema
        db.Tenant.schema = newTenant.schema_name;

        // Luego creamos el usuario y asociamos el tenant
        const newUser = await db.tenant_users.create(
          { ...userData, tenant_id: newTenant.id },
          { transaction: t }
        );

        // se dice a sequelice donde se creara las migraciones ,en este caso en el nuevo schema generado

        const newSchema = newTenant.schema_name;

        const collaboratorModel = db.Collaborator.schema(newSchema);

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
