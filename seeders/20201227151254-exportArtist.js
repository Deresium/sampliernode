'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Artists', [{
            artistId: 1,
            name: 'G-eazy',
            description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            artistId: 2,
            name: 'NF',
            description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            artistId: 3,
            name: 'Logic',
            description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            artistId: 4,
            name: 'Eminem',
            description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Articles', null, {});
    }
};
