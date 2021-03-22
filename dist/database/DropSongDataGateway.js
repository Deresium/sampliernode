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
const DropSongEntity_1 = __importDefault(require("../models/DropSongEntity"));
const pgConnexion_1 = require("../pgConnexion");
const AudioFileEntity_1 = __importDefault(require("../models/AudioFileEntity"));
const awsCalls_1 = require("../awsCalls");
const DropSongVM_1 = __importDefault(require("../viewmodels/DropSongVM"));
const AudioFileVM_1 = __importDefault(require("../viewmodels/AudioFileVM"));
class DropSongDataGateway {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const dropSongEntities = yield DropSongEntity_1.default.findAll({ include: DropSongEntity_1.default.associations.audioFiles, order: [['createdAt', 'DESC']] });
            const dropSongArray = new Array();
            for (const dropSongEntity of dropSongEntities)
                dropSongArray.push(this.constructDropSong(dropSongEntity));
            return dropSongArray;
        });
    }
    constructDropSong(dropSongEntity) {
        const dropSongVm = new DropSongVM_1.default(dropSongEntity.getName(), dropSongEntity.getEmail());
        for (const audioFileEntity of dropSongEntity.getAudioFiles()) {
            dropSongVm.addAudioFile(new AudioFileVM_1.default(audioFileEntity.getAudioFileId(), audioFileEntity.getName()));
        }
        return dropSongVm;
    }
    save(dropSong) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pgConnexion_1.sequelize.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                const savedDropSong = yield DropSongEntity_1.default.create({
                    name: dropSong.getName(),
                    email: dropSong.getEmail()
                }, { transaction: t });
                for (const file of dropSong.getAudioFiles()) {
                    const savedAudioFile = yield AudioFileEntity_1.default.create({
                        name: file.getAudioFileName(),
                        dropSongId: savedDropSong.getDropSongId()
                    }, { transaction: t });
                    yield awsCalls_1.sendToAWS(file.getAudioFileBuffer(), `${savedAudioFile.getAudioFileId()}_${file.getAudioFileName()}`);
                }
            }));
        });
    }
    findAudioFileNameStock(audioFileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const audioFile = yield AudioFileEntity_1.default.findByPk(audioFileId);
            if (!audioFile)
                return null;
            return new AudioFileVM_1.default(audioFile.getAudioFileId(), audioFile.getName());
        });
    }
}
exports.default = DropSongDataGateway;
//# sourceMappingURL=DropSongDataGateway.js.map