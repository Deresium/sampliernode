'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('ArticleTypes', [{
            articleTypeCode: 'ACTUALITY',
            name: 'actualité',
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            articleTypeCode: 'INTERVIEW',
            name: 'interview',
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            articleTypeCode: 'VIDEO',
            name: 'vidéo',
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            articleTypeCode: 'PODCAST',
            name: 'podcast',
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('ArticlesTypes', null, {});
    }
};
