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
const AudioFile_1 = __importDefault(require("../business/filechecker/AudioFile"));
const DropSong_1 = __importDefault(require("../business/filechecker/DropSong"));
const FileCheckerWithFileType_1 = __importDefault(require("../business/filechecker/FileCheckerWithFileType"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
test('drop song valid method return false when email missing', () => __awaiter(void 0, void 0, void 0, function* () {
    const email = undefined;
    const name = 'test';
    const dropSong = new DropSong_1.default(name, email, new Array());
    const isValid = yield dropSong.isValid(new FileCheckerWithFileType_1.default());
    expect(isValid).toBe(false);
}));
test('drop song valid method return false when email empty', () => __awaiter(void 0, void 0, void 0, function* () {
    const email = '';
    const name = 'test';
    const dropSong = new DropSong_1.default(name, email, new Array());
    const isValid = yield dropSong.isValid(new FileCheckerWithFileType_1.default());
    expect(isValid).toBe(false);
}));
test('drop song valid method return true when email and name', () => __awaiter(void 0, void 0, void 0, function* () {
    const email = 'dimitri.steinbusch@hotmail.com';
    const name = 'test';
    const dropSong = new DropSong_1.default(name, email, new Array());
    const isValid = yield dropSong.isValid(new FileCheckerWithFileType_1.default());
    expect(isValid).toBe(true);
}));
test('drop song valid with wrong files expect to be false', () => __awaiter(void 0, void 0, void 0, function* () {
    const email = 'dimitri.steinbusch@hotmail.com';
    const name = 'test';
    const fileExe = fs_1.default.readFileSync(path_1.default.join(__dirname, '../../testFiles/exeFile'));
    const fileMp3 = fs_1.default.readFileSync(path_1.default.join(__dirname, '../../testFiles/fileMP3'));
    const exeFile = new AudioFile_1.default('test.exe', fileExe);
    const mp3File = new AudioFile_1.default('test.MP3', fileMp3);
    const fileArray = new Array();
    fileArray.push(exeFile);
    fileArray.push(mp3File);
    const dropSong = new DropSong_1.default(name, email, fileArray);
    const isValid = yield dropSong.isValid(new FileCheckerWithFileType_1.default());
    expect(isValid).toBe(false);
}));
test('drop song valid with right files expect to be true', () => __awaiter(void 0, void 0, void 0, function* () {
    const email = 'dimitri.steinbusch@hotmail.com';
    const name = 'test';
    const fileWav = fs_1.default.readFileSync(path_1.default.join(__dirname, '../../testFiles/fileWAV'));
    const fileMp3 = fs_1.default.readFileSync(path_1.default.join(__dirname, '../../testFiles/fileMP3'));
    const wavFile = new AudioFile_1.default('test.WAV', fileWav);
    const mp3File = new AudioFile_1.default('test.MP3', fileMp3);
    const fileArray = new Array();
    fileArray.push(wavFile);
    fileArray.push(mp3File);
    const dropSong = new DropSong_1.default(name, email, fileArray);
    const isValid = yield dropSong.isValid(new FileCheckerWithFileType_1.default());
    expect(isValid).toBe(true);
}));
//# sourceMappingURL=dropSong.test.js.map