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
const releaseController_1 = require("../controllers/releaseController");
const Release_1 = __importDefault(require("../models/Release"));
const authentication_1 = require("../middlewares/authentication");
const awsCalls_1 = require("../awsCalls");
const multer_1 = __importDefault(require("multer"));
const releaseRouter = express_1.default.Router();
releaseRouter.get('/release', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield releaseController_1.getAllReleases());
}));
releaseRouter.get('/release/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const releaseId = parseInt(req.params.id);
    res.send(yield releaseController_1.getRelease(releaseId));
}));
const upload = multer_1.default();
releaseRouter.put('/release/:id', authentication_1.authOnlyAdmin, upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const releaseId = parseInt(req.params.id);
        yield Release_1.default.update({
            name: req.body.name,
            description: req.body.description,
            artistId: req.body.artistId,
            type: req.body.type,
            date: req.body.date
        }, {
            where: {
                releaseId
            }
        });
        if (req.file) {
            const image = req.file;
            const fileName = `release_${releaseId}`;
            yield awsCalls_1.sendToAWS(image.buffer, fileName);
        }
        res.send();
    }
    catch (error) {
        console.log(error);
        res.status(500).send();
    }
}));
releaseRouter.delete('/release/:id', authentication_1.authOnlyAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const releaseId = parseInt(req.params.id);
        yield Release_1.default.destroy({
            where: {
                releaseId
            }
        });
        res.send();
    }
    catch (error) {
        console.log(error);
        res.status(500).send();
    }
}));
releaseRouter.post('/release', authentication_1.authOnlyAdmin, upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        res.status(500).send();
        return;
    }
    try {
        const release = yield Release_1.default.create({
            name: req.body.name,
            description: req.body.description,
            artistId: req.body.artistId,
            type: req.body.type,
            date: req.body.date
        });
        const image = req.file;
        const fileName = `release_${release.id}`;
        yield awsCalls_1.sendToAWS(image.buffer, fileName);
        res.send();
    }
    catch (error) {
        console.log(error);
        res.status(500).send();
    }
}));
releaseRouter.post('/release/:id/image', authentication_1.authOnlyAdmin, upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const image = req.file;
    const releaseId = req.params.id;
    const fileName = `release_${releaseId}`;
    yield awsCalls_1.sendToAWS(image.buffer, fileName);
    res.send();
}));
releaseRouter.get('/release/:id/image', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const releaseId = req.params.id;
        const imgName = `release_${releaseId}`;
        const picture = yield awsCalls_1.getFromAWS(imgName);
        if (picture) {
            res.set('Content-Type', 'image/*');
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
exports.default = releaseRouter;
//# sourceMappingURL=releaseRouter.js.map