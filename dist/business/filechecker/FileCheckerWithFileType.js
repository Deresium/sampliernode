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
const file_type_1 = __importDefault(require("file-type"));
const AcceptedFileType_1 = __importDefault(require("./AcceptedFileType"));
class FileCheckerWithFileType {
    checkFiles(fileArray) {
        return __awaiter(this, void 0, void 0, function* () {
            if (fileArray.length === 0)
                return true;
            for (const file of fileArray) {
                const fileType = yield file_type_1.default.fromBuffer(file.getAudioFileBuffer());
                if (!fileType || !AcceptedFileType_1.default.acceptFileType.includes(fileType.ext))
                    return false;
                if (!AcceptedFileType_1.default.acceptFileType.includes(file.getExtension()))
                    return false;
            }
            return true;
        });
    }
}
exports.default = FileCheckerWithFileType;
//# sourceMappingURL=FileCheckerWithFileType.js.map