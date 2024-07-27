'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('extraInfos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      extra_title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      extra_content: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      img_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      new_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'news',
          key: 'id',
        },
      },
      status: {
        type: Sequelize.ENUM('active', 'disable'),
        defaultValue: 'active',
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('extraInfos');
  },
};
