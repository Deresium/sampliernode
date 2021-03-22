"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DropSongVM {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.audioFileArray = new Array();
    }
    addAudioFile(audioFile) {
        this.audioFileArray.push(audioFile);
    }
}
exports.default = DropSongVM;
//# sourceMappingURL=DropSongVM.js.map