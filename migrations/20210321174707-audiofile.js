'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction(t => {
          return Promise.all([
              queryInterface.createTable('DropSongs', {
                  dropSongId: {
                      type: Sequelize.INTEGER,
                      primaryKey: true,
                      autoIncrement: true
                  },
                  name: {
                      type: Sequelize.STRING(512),
                      allowNull: false
                  },
                  email: {
                      type: Sequelize.STRING(1024),
                      allowNull: false
                  },
                  createdAt: {
                      type: Sequelize.DATE
                  },
                  updatedAt: {
                      type: Sequelize.DATE
                  }
              }, {transaction: t}),

              queryInterface.createTable('AudioFiles', {
                  audioFileId: {
                      type: Sequelize.INTEGER,
                      primaryKey: true,
                      autoIncrement: true
                  },
                  name: {
                      type: Sequelize.STRING(1024),
                      allowNull: false
                  },
                  dropSongId:{
                      type: Sequelize.INTEGER,
                      allowNull: false,
                      references: {
                          model: {
                              tableName: 'DropSongs',
                              schema: 'public'
                          },
                          key: 'dropSongId'
                      }
                  },
                  createdAt: {
                      type: Sequelize.DATE
                  },
                  updatedAt: {
                      type: Sequelize.DATE
                  }
              }, {transaction: t})
          ])
      })
  },

  down: async (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction(t => {
          return Promise.all([
              queryInterface.dropTable('AudioFiles',{transaction: t}),
              queryInterface.dropTable('DropSongs',{transaction: t}),

          ])
      })
  }
};
