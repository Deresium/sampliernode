"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AudioFile {
    constructor(name, buffer) {
        this.name = name;
        this.buffer = buffer;
    }
    getAudioFileName() {
        return this.name;
    }
    getAudioFileBuffer() {
        return this.buffer;
    }
    getExtension() {
        const splitName = this.name.split('.');
        return splitName[splitName.length - 1].toLowerCase();
    }
}
exports.default = AudioFile;
//# sourceMappingURL=AudioFile.js.map