"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgConnexion_1 = require("../pgConnexion");
class User extends sequelize_1.Model {
    get id() {
        return this.userId;
    }
    get userName() {
        return this.name;
    }
    get userFirstName() {
        return this.firstName;
    }
    get userPhone() {
        return this.phone;
    }
    get userPassword() {
        return this.password;
    }
    set userPassword(password) {
        this.password = password;
    }
    get userEmail() {
        return this.email;
    }
    get userSalted() {
        return this.salted;
    }
    set userSalted(salted) {
        this.salted = salted;
    }
    get userRole() {
        return this.roleCode;
    }
    get userLostPasswordToken() {
        return this.lostPasswordToken;
    }
    set userLostPasswordToken(token) {
        this.lostPasswordToken = token;
    }
    get fullName() {
        if (this.firstName)
            return `${this.firstName} ${this.name}`;
        else
            return this.name;
    }
}
exports.default = User;
User.init({
    userId: {
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
    password: {
        type: sequelize_1.DataTypes.STRING(1024)
    },
    salted: {
        type: sequelize_1.DataTypes.STRING(1024)
    },
    roleCode: {
        type: sequelize_1.DataTypes.STRING(10)
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(256)
    },
    lostPasswordToken: {
        type: sequelize_1.DataTypes.STRING(1024)
    }
}, {
    tableName: 'Users',
    sequelize: pgConnexion_1.sequelize
});
//# sourceMappingURL=User.js.map