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
const multer_1 = __importDefault(require("multer"));
const AudioFile_1 = __importDefault(require("../business/filechecker/AudioFile"));
const FileCheckerWithFileType_1 = __importDefault(require("../business/filechecker/FileCheckerWithFileType"));
const DropSong_1 = __importDefault(require("../business/filechecker/DropSong"));
const DropSongDataGateway_1 = __importDefault(require("../database/DropSongDataGateway"));
const authentication_1 = require("../middlewares/authentication");
const sendgridSamplier_1 = require("../sendgridSamplier");
const dropSongRouter = express_1.default.Router();
const upload = multer_1.default();
dropSongRouter.post('/dropSong', upload.array('files'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (Array.isArray(req.files)) {
        const audioFileArray = req.files.map(file => {
            return new AudioFile_1.default(file.originalname, file.buffer);
        });
        const fileChecker = new FileCheckerWithFileType_1.default();
        const dropSong = new DropSong_1.default(req.body.name, req.body.email, audioFileArray);
        if (!(yield dropSong.isValid(fileChecker))) {
            res.status(400).send('Veuillez vérifier les formats des fichiers envoyés.');
            return;
        }
        const dropSongDataGateway = new DropSongDataGateway_1.default();
        yield dropSongDataGateway.save(dropSong);
        yield sendgridSamplier_1.sendDropSongMail(dropSong);
        res.status(200).send();
    }
    else {
        res.status(400).send();
        return;
    }
}));
dropSongRouter.get('/dropSong', authentication_1.authOnlyAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dropSongDataGateway = new DropSongDataGateway_1.default();
    const dropSongs = yield dropSongDataGateway.findAll();
    res.status(200).send(dropSongs);
}));
exports.default = dropSongRouter;
//# sourceMappingURL=dropSongRouter.js.map