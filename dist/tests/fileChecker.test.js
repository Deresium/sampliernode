"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const FileCheckerWithFileType_1 = __importDefault(require("../business/filechecker/FileCheckerWithFileType"));
const AudioFile_1 = __importDefault(require("../business/filechecker/AudioFile"));
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
test('expect a empty File array to return true', () => __awaiter(void 0, void 0, void 0, function* () {
    const fileChecker = new FileCheckerWithFileType_1.default();
    const check = yield fileChecker.checkFiles(new Array());
    expect(check).toBe(true);
}));
test('expect txt file to be false', () => __awaiter(void 0, void 0, void 0, function* () {
    const file = fs.readFileSync(path_1.default.join(__dirname, '../../testFiles/txtFile'));
    const txtFile = new AudioFile_1.default('test.txt', file);
    const fileArray = new Array();
    fileArray.push(txtFile);
    const fileChecker = new FileCheckerWithFileType_1.default();
    const check = yield fileChecker.checkFiles(fileArray);
    expect(check).toBe(false);
}));
test('expect txt file and wav to be false', () => __awaiter(void 0, void 0, void 0, function* () {
    const fileTxt = fs.readFileSync(path_1.default.join(__dirname, '../../testFiles/txtFile'));
    const fileWav = fs.readFileSync(path_1.default.join(__dirname, '../../testFiles/fileWAV'));
    const txtFile = new AudioFile_1.default('test.txt', fileTxt);
    const wavFile = new AudioFile_1.default('test.wav', fileWav);
    const fileArray = new Array();
    fileArray.push(txtFile);
    fileArray.push(wavFile);
    const fileChecker = new FileCheckerWithFileType_1.default();
    const check = yield fileChecker.checkFiles(fileArray);
    expect(check).toBe(false);
}));
test('expect exe file and mp3 to be false', () => __awaiter(void 0, void 0, void 0, function* () {
    const fileExe = fs.readFileSync(path_1.default.join(__dirname, '../../testFiles/exeFile'));
    const fileMp3 = fs.readFileSync(path_1.default.join(__dirname, '../../testFiles/fileMP3'));
    const exeFile = new AudioFile_1.default('test.exe', fileExe);
    const mp3File = new AudioFile_1.default('test.mp3', fileMp3);
    const fileArray = new Array();
    fileArray.push(exeFile);
    fileArray.push(mp3File);
    const fileChecker = new FileCheckerWithFileType_1.default();
    const check = yield fileChecker.checkFiles(fileArray);
    expect(check).toBe(false);
}));
test('expect wav file and mp3 file to be true', () => __awaiter(void 0, void 0, void 0, function* () {
    const fileWav = fs.readFileSync(path_1.default.join(__dirname, '../../testFiles/fileWAV'));
    const fileMp3 = fs.readFileSync(path_1.default.join(__dirname, '../../testFiles/fileMP3'));
    const wavFile = new AudioFile_1.default('test.Wav', fileWav);
    const mp3File = new AudioFile_1.default('test.Mp3', fileMp3);
    const fileArray = new Array();
    fileArray.push(wavFile);
    fileArray.push(mp3File);
    const fileChecker = new FileCheckerWithFileType_1.default();
    const check = yield fileChecker.checkFiles(fileArray);
    expect(check).toBe(true);
}));
test('expect wav file and mp3 file and exe file to be false', () => __awaiter(void 0, void 0, void 0, function* () {
    const fileExe = fs.readFileSync(path_1.default.join(__dirname, '../../testFiles/exeFile'));
    const fileWav = fs.readFileSync(path_1.default.join(__dirname, '../../testFiles/fileWAV'));
    const fileMp3 = fs.readFileSync(path_1.default.join(__dirname, '../../testFiles/fileMP3'));
    const exeFile = new AudioFile_1.default('test.exe', fileExe);
    const wavFile = new AudioFile_1.default('test.wav', fileWav);
    const mp3File = new AudioFile_1.default('test.mp3', fileMp3);
    const fileArray = new Array();
    fileArray.push(exeFile);
    fileArray.push(wavFile);
    fileArray.push(mp3File);
    const fileChecker = new FileCheckerWithFileType_1.default();
    const check = yield fileChecker.checkFiles(fileArray);
    expect(check).toBe(false);
}));
//# sourceMappingURL=fileChecker.test.js.map