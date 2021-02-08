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
exports.getAllArtists = exports.getArtist = void 0;
const Artist_1 = __importDefault(require("../models/Artist"));
const ArtistVM_1 = __importDefault(require("../viewmodels/ArtistVM"));
const getAllArtists = () => __awaiter(void 0, void 0, void 0, function* () {
    const artists = new Array();
    try {
        const artistsDb = yield Artist_1.default.findAll({ include: Artist_1.default.associations.hashtags });
        for (const artistDb of artistsDb) {
            const newArtist = new ArtistVM_1.default(artistDb.id, artistDb.artistName, artistDb.artistDescription);
            for (const hashtag of artistDb.artistHashtags) {
                newArtist.addHashtag(hashtag.hashtagName);
            }
            artists.push(newArtist);
        }
    }
    catch (error) {
        console.log(error);
    }
    return artists;
});
exports.getAllArtists = getAllArtists;
const getArtist = (artistId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const artistDb = yield Artist_1.default.findByPk(artistId, { include: Artist_1.default.associations.hashtags });
        const newArtist = new ArtistVM_1.default(artistDb.id, artistDb.artistName, artistDb.artistDescription);
        for (const hashtag of artistDb.artistHashtags) {
            newArtist.addHashtag(hashtag.hashtagName);
        }
        return newArtist;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.getArtist = getArtist;
//# sourceMappingURL=artistController.js.map