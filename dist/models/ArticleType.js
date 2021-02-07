"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pgConnexion_1 = require("../pgConnexion");
class ArticleType extends sequelize_1.Model {
    get articleTypeName() {
        return this.name;
    }
}
exports.default = ArticleType;
ArticleType.init({
    articleTypeCode: {
        type: sequelize_1.DataTypes.STRING(10),
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(256)
    }
}, {
    tableName: 'ArticleTypes',
    sequelize: pgConnexion_1.sequelize
});
//# sourceMappingURL=ArticleType.js.map