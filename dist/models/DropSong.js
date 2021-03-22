"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgConnexion_1 = require("../pgConnexion");
class DropSong extends sequelize_1.Model {
}
exports.default = DropSong;
DropSong.init({
    dropSongId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(512),
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING(1024),
        allowNull: false
    }
}, {
    tableName: 'DropSongs',
    sequelize: pgConnexion_1.sequelize
});
//# sourceMappingURL=DropSong.js.map