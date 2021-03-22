"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AudioFileVM {
    constructor(idAudioFile, fileName) {
        this.idAudioFile = idAudioFile;
        this.fileName = fileName;
    }
    getFileName() {
        return this.fileName;
    }
    getStockName() {
        return `${this.idAudioFile}_${this.fileName}`;
    }
}
exports.default = AudioFileVM;
//# sourceMappingURL=AudioFileVM.js.map