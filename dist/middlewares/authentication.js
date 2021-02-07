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
exports.onlyExtractToken = exports.authOnlyAdmin = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookie_1 = __importDefault(require("cookie"));
const roles_1 = __importDefault(require("../enums/roles"));
const cookies_1 = require("../cookies");
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        extractToken(req, res);
        if (req.userId && req.userRole)
            next();
        else
            res.status(401).send('Please authenticate');
    }
    catch (e) {
        res.status(401).send('Please authenticate');
    }
});
exports.auth = auth;
const authOnlyAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        extractToken(req, res);
        if (req.userId && req.userRole && req.userRole === roles_1.default.ADMIN)
            next();
        else
            res.status(401).send('Please authenticate');
    }
    catch (e) {
        res.status(401).send('Please authenticate');
    }
});
exports.authOnlyAdmin = authOnlyAdmin;
const onlyExtractToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    extractToken(req, res);
    next();
});
exports.onlyExtractToken = onlyExtractToken;
const extractToken = (req, res) => {
    const cookies = cookie_1.default.parse(req.headers.cookie || '');
    const sign = cookies.signature;
    const payload = cookies.payload;
    if (sign && payload) {
        const token = `${payload}.${sign}`;
        const decrypt = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // @ts-ignore
        req.userRole = roles_1.default[decrypt.role];
        req.userId = decrypt.id;
        if (req.userRole && req.userId) {
            cookies_1.generateAuth(req.userId, req.userRole, res);
        }
    }
};
//# sourceMappingURL=authentication.js.map