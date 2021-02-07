'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Roles', [{
            roleCode: 'USER',
            name: 'user',
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            roleCode: 'ADMIN',
            name: 'admin',
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Roles', null, {});
    }
};
