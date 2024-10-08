'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tenant extends Model {
    static associate(models) {
      // Asociación con tenant_users
      this.hasMany(models.tenant_users, {
        foreignKey: 'tenant_id', // Clave foránea en tenant_users
        as: 'users', // Alias para la relación
      });
    }
  }

  Tenant.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      schema_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      short_id: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: true,
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Tenant', // Cambiado a PascalCase
      schema: 'tenants', // Esquema en la base de datos
      tableName: 'tenant', // Nombre de la tabla en la base de datos
    }
  );

  return Tenant;
};
