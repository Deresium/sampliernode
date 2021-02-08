"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgConnexion_1 = require("../pgConnexion");
class Hashtag extends sequelize_1.Model {
    get hashtagName() {
        return this.name;
    }
}
exports.default = Hashtag;
Hashtag.init({
    hashtagId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(256),
        allowNull: false
    },
    artistId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Hashtags',
    sequelize: pgConnexion_1.sequelize
});
//# sourceMappingURL=Hashtag.js.map