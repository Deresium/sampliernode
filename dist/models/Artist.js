"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgConnexion_1 = require("../pgConnexion");
const Hashtag_1 = __importDefault(require("./Hashtag"));
class Artist extends sequelize_1.Model {
    get id() {
        return this.artistId;
    }
    get artistName() {
        return this.name;
    }
    get artistDescription() {
        return this.description;
    }
    get artistHashtags() {
        return this.hashtags;
    }
}
exports.default = Artist;
Artist.init({
    artistId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(256),
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING(4000)
    }
}, {
    tableName: 'Artists',
    sequelize: pgConnexion_1.sequelize
});
Artist.hasMany(Hashtag_1.default, { sourceKey: 'artistId', foreignKey: 'artistId', as: 'hashtags' });
//# sourceMappingURL=Artist.js.map