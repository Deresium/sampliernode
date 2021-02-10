'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Artists', [{
            hashtagId: 1,
            name: 'Rap US',
            artistId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            hashtagId: 2,
            name: 'Rap US',
            artistId: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            hashtagId: 3,
            name: 'Rap US',
            artistId: 3,
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            hashtagId: 4,
            name: 'Rap US',
            artistId: 4,
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            hashtagId: 5,
            name: 'Christian',
            artistId: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            hashtagId: 6,
            name: 'Chill',
            artistId: 3,
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Articles', null, {});
    }
};
