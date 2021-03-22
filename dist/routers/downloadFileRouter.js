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
const authentication_1 = require("../middlewares/authentication");
const DropSongDataGateway_1 = __importDefault(require("../database/DropSongDataGateway"));
const awsCalls_1 = require("../awsCalls");
const downloadFileRouter = express_1.default.Router();
downloadFileRouter.get('/audioFile/:idAudioFile', authentication_1.authOnlyAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dropSongDataGateway = new DropSongDataGateway_1.default();
    const idAudioFile = parseInt(req.params.idAudioFile);
    const audioFile = yield dropSongDataGateway.findAudioFileNameStock(idAudioFile);
    if (!audioFile) {
        res.status(400).send('Une erreur est survenue lors de la récupération du fichier');
        return;
    }
    const file = yield awsCalls_1.getFromAWS(audioFile.getStockName());
    if (!file) {
        res.status(400).send('Une erreur est survenue lors de la récupération du fichier');
        return;
    }
    res.set('Content-Type', 'audio/*');
    res.set('Content-Disposition', `attachment; filename="${audioFile.getFileName()}"`);
    res.send(file);
}));
exports.default = downloadFileRouter;
//# sourceMappingURL=downloadFileRouter.js.map