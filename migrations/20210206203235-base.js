'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.createTable('Roles', {
                    roleCode: {
                        type: Sequelize.STRING(10),
                        primaryKey: true,
                    },
                    name: {
                        type: Sequelize.STRING(64),
                        allowNull: false
                    },
                    createdAt: {
                        type: Sequelize.DATE
                    },
                    updatedAt: {
                        type: Sequelize.DATE
                    }
                }, {transaction: t}),

                queryInterface.createTable('Users', {
                    userId: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true
                    },
                    name: {
                        type: Sequelize.STRING(256),
                        allowNull: false
                    },
                    firstName: {
                        type: Sequelize.STRING(256)
                    },
                    email: {
                        type: Sequelize.STRING(512),
                        allowNull: false
                    },
                    password: {
                        type: Sequelize.STRING(1024),
                        allowNull: false
                    },
                    salted: {
                        type: Sequelize.STRING(1024),
                        allowNull: false
                    },
                    roleCode: {
                        type: Sequelize.STRING(10),
                        allowNull: false,
                        references: {
                            model: {
                                tableName: 'Roles',
                                schema: 'public'
                            },
                            key: 'roleCode'
                        }
                    },
                    phone: {
                        type: Sequelize.STRING(256),
                    },
                    lostPasswordToken: {
                        type: Sequelize.STRING(1024)
                    },
                    createdAt: {
                        type: Sequelize.DATE
                    },
                    updatedAt: {
                        type: Sequelize.DATE
                    }

                },{transaction: t}),

                queryInterface.createTable('Artists', {
                    artistId: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true
                    },
                    name: {
                        type: Sequelize.STRING(256),
                        allowNull: false
                    },
                    description: {
                        type: Sequelize.STRING(4000)
                    }
                },{transaction: t}),

                queryInterface.createTable('Hashtags', {
                    hashtagId:{
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true
                    },
                    name: {
                        type: Sequelize.STRING(256),
                        allowNull: false
                    },
                    artistId: {
                        type: Sequelize.INTEGER,
                        allowNull: false,
                        references: {
                            model: {
                                tableName: 'Artists',
                                schema: 'public'
                            },
                            key: 'artistId'
                        }
                    },
                    createdAt: {
                        type: Sequelize.DATE
                    },
                    updatedAt: {
                        type: Sequelize.DATE
                    }
                },{transaction: t}),

                queryInterface.createTable('Releases', {
                    releaseId:{
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true
                    },
                    name: {
                        type: Sequelize.STRING(256),
                        allowNull: false
                    },
                    description: {
                        type: Sequelize.STRING(4000)
                    },
                    artistId: {
                        type: Sequelize.INTEGER,
                        references: {
                            model: {
                                tableName: 'Artists',
                                schema: 'public'
                            },
                            key: 'artistId'
                        }
                    },
                    type: {
                        type: Sequelize.STRING(256),
                    },
                    date: {
                        type: Sequelize.DATE
                    },
                    createdAt: {
                        type: Sequelize.DATE
                    },
                    updatedAt: {
                        type: Sequelize.DATE
                    }
                }, {transaction: t}),

                queryInterface.createTable('Contacts', {
                    contactId: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true
                    },
                    name: {
                        type: Sequelize.STRING(256),
                        allowNull: false
                    },
                    firstName: {
                        type: Sequelize.STRING(256)
                    },
                    email: {
                        type: Sequelize.STRING(512),
                        allowNull: false
                    },
                    message: {
                        type: Sequelize.STRING(4000),
                        allowNull: false
                    },
                    createdAt: {
                        type: Sequelize.DATE
                    },
                    updatedAt: {
                        type: Sequelize.DATE
                    }
                },{transaction: t}),

                queryInterface.createTable('ArticleTypes', {
                    articleTypeCode: {
                        type: Sequelize.STRING(10),
                        primaryKey: true
                    },
                    name: {
                        type: Sequelize.STRING(256)
                    },
                    createdAt: {
                        type: Sequelize.DATE
                    },
                    updatedAt: {
                        type: Sequelize.DATE
                    }
                },{transaction: t}),

                queryInterface.createTable('Articles', {
                    articleId: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true
                    },
                    title: {
                        type: Sequelize.STRING(1024),
                        allowNull: false
                    },
                    subtitle: {
                        type: Sequelize.STRING(4000)
                    },
                    date: {
                        type: Sequelize.DATE
                    },
                    articleTypeCode:{
                        type: Sequelize.STRING(10),
                        allowNull: false,
                        references: {
                            model: {
                                tableName: 'ArticleTypes',
                                schema: 'public'
                            },
                            key: 'articleTypeCode'
                        }
                    },
                    createdAt: {
                        type: Sequelize.DATE
                    },
                    updatedAt: {
                        type: Sequelize.DATE
                    }
                },{transaction: t})
            ])
        })
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction(t => {
            return Promise.all([
                queryInterface.dropTable('Users',{transaction: t}),
                queryInterface.dropTable('Roles',{transaction: t}),
                queryInterface.dropTable('Hashtags',{transaction: t}),
                queryInterface.dropTable('Releases',{transaction: t}),
                queryInterface.dropTable('Artists',{transaction: t}),
                queryInterface.dropTable('Contacts',{transaction: t}),
                queryInterface.dropTable('Articles',{transaction: t}),
                queryInterface.dropTable('ArticleTypes',{transaction: t})

            ])
        })
    }
};
