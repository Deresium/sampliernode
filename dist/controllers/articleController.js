"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArticle = exports.getAllArticles = void 0;
const Article_1 = __importDefault(require("../models/Article"));
const ArticleVM_1 = __importDefault(require("../viewmodels/ArticleVM"));
const sequelize_1 = require("sequelize");
const getAllArticles = (type) => __awaiter(void 0, void 0, void 0, function* () {
    const articles = new Array();
    let where;
    if (type === 'VIDEOPODCAST') {
        where = {
            [sequelize_1.Op.or]: [
                { articleTypeCode: 'VIDEO' },
                { articleTypeCode: 'PODCAST' }
            ]
        };
    }
    else {
        where = { articleTypeCode: type };
    }
    try {
        const articlesDb = yield Article_1.default.findAll({
            where,
            include: { association: Article_1.default.associations.articleType },
            order: [['date', 'DESC']]
        });
        for (const articleDb of articlesDb) {
            articles.push(new ArticleVM_1.default(articleDb.id, articleDb.articleTitle, articleDb.articleSubtitle, articleDb.typeName, articleDb.articleDate, articleDb.typeCode));
        }
    }
    catch (error) {
        console.log(error);
        return articles;
    }
    return articles;
});
exports.getAllArticles = getAllArticles;
const getArticle = (articleId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articleDb = yield Article_1.default.findByPk(articleId, {
            include: { association: Article_1.default.associations.articleType }
        });
        return new ArticleVM_1.default(articleDb.id, articleDb.articleTitle, articleDb.articleSubtitle, articleDb.typeName, articleDb.articleDate, articleDb.typeCode);
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getArticle = getArticle;
//# sourceMappingURL=articleController.js.map