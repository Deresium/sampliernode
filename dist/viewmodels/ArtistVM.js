"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArtistVM {
    constructor(artistId, name, description) {
        this.hashtags = new Array();
        this.artistId = artistId;
        this.name = name;
        this.description = description;
    }
    addHashtag(hashtag) {
        this.hashtags.push(hashtag);
    }
}
exports.default = ArtistVM;
//# sourceMappingURL=ArtistVM.js.map