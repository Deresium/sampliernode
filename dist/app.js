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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const process = __importStar(require("process"));
const path_1 = __importDefault(require("path"));
const redirectHttps_1 = __importDefault(require("./middlewares/redirectHttps"));
const allowLocalhost_1 = __importDefault(require("./middlewares/allowLocalhost"));
const returnIndex_1 = __importDefault(require("./middlewares/returnIndex"));
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const articleRouter_1 = __importDefault(require("./routers/articleRouter"));
const artistRouter_1 = __importDefault(require("./routers/artistRouter"));
const releaseRouter_1 = __importDefault(require("./routers/releaseRouter"));
const contactRouter_1 = __importDefault(require("./routers/contactRouter"));
const dropSongRouter_1 = __importDefault(require("./routers/dropSongRouter"));
const downloadFileRouter_1 = __importDefault(require("./routers/downloadFileRouter"));
const app = express_1.default();
const publicDirectoryPath = path_1.default.join(__dirname, '../public/');
if (process.env.NODE_ENV === 'production') {
    app.use(redirectHttps_1.default);
}
else {
    app.use(allowLocalhost_1.default);
}
app.use(express_1.default.json());
app.use(downloadFileRouter_1.default);
app.use(returnIndex_1.default);
app.use(userRouter_1.default);
app.use(articleRouter_1.default);
app.use(artistRouter_1.default);
app.use(releaseRouter_1.default);
app.use(contactRouter_1.default);
app.use(dropSongRouter_1.default);
app.use(express_1.default.static(publicDirectoryPath));
exports.default = app;
//# sourceMappingURL=app.js.map