"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgConnexion_1 = require("../pgConnexion");
const AudioFileEntity_1 = __importDefault(require("./AudioFileEntity"));
class DropSongEntity extends sequelize_1.Model {
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getDropSongId() {
        return this.dropSongId;
    }
    getAudioFiles() {
        return this.audioFiles;
    }
}
exports.default = DropSongEntity;
DropSongEntity.init({
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
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE
    }
}, {
    tableName: 'DropSongs',
    sequelize: pgConnexion_1.sequelize
});
DropSongEntity.hasMany(AudioFileEntity_1.default, { sourceKey: 'dropSongId', foreignKey: 'dropSongId', as: 'audioFiles' });
//# sourceMappingURL=DropSongEntity.js.map