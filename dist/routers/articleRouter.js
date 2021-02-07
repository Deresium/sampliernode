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
const express_1 = __importDefault(require("express"));
const articleController_1 = require("../controllers/articleController");
const awsCalls_1 = require("../awsCalls");
const articleRouter = express_1.default.Router();
articleRouter.get('/article', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.query.type;
    const response = yield articleController_1.getAllArticles(type);
    res.send(response);
}));
articleRouter.get('/article/:articleId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const articleId = parseInt(req.params.articleId);
    res.send(yield articleController_1.getArticle(articleId));
}));
articleRouter.get('/article/:articleId/image/:imageId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articleId = req.params.articleId;
        const imageId = req.params.imageId;
        const imgName = `${articleId}_${imageId}.jpg`;
        const picture = yield awsCalls_1.getFromAWS(imgName);
        if (picture) {
            res.set('Content-Type', 'image/jpeg');
            res.send(picture);
        }
        else {
            res.status(404).send();
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send();
    }
}));
exports.default = articleRouter;
//# sourceMappingURL=articleRouter.js.map