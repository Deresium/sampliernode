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
exports.getRelease = exports.getAllReleases = void 0;
const ReleaseVM_1 = __importDefault(require("../viewmodels/ReleaseVM"));
const Release_1 = __importDefault(require("../models/Release"));
const getAllReleases = () => __awaiter(void 0, void 0, void 0, function* () {
    const releases = new Array();
    try {
        const releasesDb = yield Release_1.default.findAll({ include: Release_1.default.associations.artist });
        for (const releaseDb of releasesDb) {
            releases.push(new ReleaseVM_1.default(releaseDb.id, releaseDb.releaseName, releaseDb.releaseDescription, releaseDb.releaseArtistId, releaseDb.releaseArtistName, releaseDb.releaseType, releaseDb.releaseDate));
        }
        return releases;
    }
    catch (error) {
        return releases;
    }
});
exports.getAllReleases = getAllReleases;
const getRelease = (releaseId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const releaseDb = yield Release_1.default.findByPk(releaseId, { include: Release_1.default.associations.artist });
        return new ReleaseVM_1.default(releaseDb.id, releaseDb.releaseName, releaseDb.releaseDescription, releaseDb.releaseArtistId, releaseDb.releaseArtistName, releaseDb.releaseType, releaseDb.releaseDate);
    }
    catch (error) {
        return null;
    }
});
exports.getRelease = getRelease;
//# sourceMappingURL=releaseController.js.map