"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgConnexion_1 = require("../pgConnexion");
const Artist_1 = __importDefault(require("./Artist"));
class Release extends sequelize_1.Model {
    get id() {
        return this.releaseId;
    }
    get releaseName() {
        return this.name;
    }
    get releaseDescription() {
        return this.description;
    }
    get releaseArtistId() {
        return this.artistId;
    }
    get releaseType() {
        return this.type;
    }
    get releaseDate() {
        return this.date;
    }
    get releaseArtistName() {
        if (this.artist)
            return this.artist.artistName;
        return null;
    }
}
exports.default = Release;
Release.init({
    releaseId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(256),
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING(4000)
    },
    artistId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    type: {
        type: sequelize_1.DataTypes.STRING(256),
    },
    date: {
        type: sequelize_1.DataTypes.DATE
    }
}, {
    tableName: 'Releases',
    sequelize: pgConnexion_1.sequelize
});
Release.belongsTo(Artist_1.default, { foreignKey: 'artistId', targetKey: 'artistId', as: 'artist' });
//# sourceMappingURL=Release.js.map