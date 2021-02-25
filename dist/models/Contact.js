"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgConnexion_1 = require("../pgConnexion");
class Contact extends sequelize_1.Model {
    get contactName() {
        return this.name;
    }
    get contactFirstname() {
        return this.firstName;
    }
    get contactEmail() {
        return this.email;
    }
    get contactMessage() {
        return this.message;
    }
}
exports.default = Contact;
Contact.init({
    contactId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(256),
        allowNull: false
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING(256)
    },
    email: {
        type: sequelize_1.DataTypes.STRING(512),
        allowNull: false
    },
    message: {
        type: sequelize_1.DataTypes.STRING(4000),
        allowNull: false
    }
}, {
    tableName: 'Contacts',
    sequelize: pgConnexion_1.sequelize
});
//# sourceMappingURL=Contact.js.map