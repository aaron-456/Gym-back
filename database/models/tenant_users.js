'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tenant_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Tenant, {
        foreignKey: 'tenant_id', // Clave foránea en UserAccount
        as: 'tenant', // Alias para la relación
      });
    }
  }
  tenant_users.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      tenant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'tenant',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'tenant_users',
      schema: 'tenants',
    }
  );
  return tenant_users;
};
