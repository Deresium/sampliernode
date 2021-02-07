"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgConnexion_1 = require("../pgConnexion");
const ArticleType_1 = __importDefault(require("./ArticleType"));
class Article extends sequelize_1.Model {
    get id() {
        return this.articleId;
    }
    get articleTitle() {
        return this.title;
    }
    get articleSubtitle() {
        return this.subtitle;
    }
    get articleDate() {
        return this.date;
    }
    get type() {
        return this.articleType;
    }
    get typeName() {
        if (this.articleType)
            return this.articleType.articleTypeName;
        return null;
    }
    get typeCode() {
        return this.articleTypeCode;
    }
}
exports.default = Article;
Article.init({
    articleId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING(1024),
        allowNull: false
    },
    subtitle: {
        type: sequelize_1.DataTypes.STRING(4000)
    },
    date: {
        type: sequelize_1.DataTypes.DATE
    },
    articleTypeCode: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false
    }
}, {
    tableName: 'Articles',
    sequelize: pgConnexion_1.sequelize
});
Article.belongsTo(ArticleType_1.default, { foreignKey: 'articleTypeCode', targetKey: 'articleTypeCode', as: 'articleType' });
//# sourceMappingURL=Article.js.map