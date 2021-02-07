"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.generateAuth = void 0;
const cookie_1 = __importDefault(require("cookie"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getSignatureCookie = (value, deleteCookie = false) => {
    return cookie_1.default.serialize('signature', value, {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: deleteCookie ? 0 : 60 * 60 * 24,
        domain: process.env.DNS_NAME,
        sameSite: true,
        path: '/'
    });
};
const getPayloadCookie = (value, deleteCookie = false) => {
    return cookie_1.default.serialize('payload', value, {
        secure: process.env.NODE_ENV === 'production',
        maxAge: deleteCookie ? 0 : 60 * 60 * 24,
        domain: process.env.DNS_NAME,
        sameSite: true,
        path: '/'
    });
};
const generateAuth = (userId, userRole, res) => {
    const token = jsonwebtoken_1.default.sign({ id: userId, role: userRole }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 }).split('.');
    const signatureCookieValue = token[2];
    const payloadCookieValue = `${token[0]}.${token[1]}`;
    res.setHeader('Set-Cookie', [getSignatureCookie(signatureCookieValue), getPayloadCookie(payloadCookieValue)]);
};
exports.generateAuth = generateAuth;
const logout = (res) => {
    res.setHeader('Set-Cookie', [getSignatureCookie('', true), getPayloadCookie('', true)]);
};
exports.logout = logout;
//# sourceMappingURL=cookies.js.map