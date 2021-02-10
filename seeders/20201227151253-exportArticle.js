'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Articles', [{
            articleId: 1,
            title: 'lorem ipsum',
            subtitle: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
            date: new Date(),
            articleTypeCode: 'ACTUALITY',
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            articleId: 2,
            title: 'lorem ipsum',
            subtitle: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
            date: new Date(),
            articleTypeCode: 'ACTUALITY',
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            articleId: 3,
            title: 'lorem ipsum',
            subtitle: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
            date: new Date(),
            articleTypeCode: 'INTERVIEW',
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            articleId: 4,
            title: 'lorem ipsum',
            subtitle: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
            date: new Date(),
            articleTypeCode: 'VIDEO',
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            articleId: 5,
            title: 'lorem ipsum',
            subtitle: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
            date: new Date(),
            articleTypeCode: 'PODCAST',
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Articles', null, {});
    }
};
