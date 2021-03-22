"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgConnexion_1 = require("../pgConnexion");
class AudioFile extends sequelize_1.Model {
}
exports.default = AudioFile;
AudioFile.init({
    audioFileId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(1024),
        allowNull: false
    },
    dropSongId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'AudioFiles',
    sequelize: pgConnexion_1.sequelize
});
//# sourceMappingURL=AudioFile.js.map