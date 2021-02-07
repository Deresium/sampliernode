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
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const roles_1 = __importDefault(require("../enums/roles"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookies_1 = require("../cookies");
const userRouter = express_1.default.Router();
userRouter.post('/createAccount', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const firstName = req.body.firstName;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    try {
        const foundUser = yield User_1.default.findOne({ where: { email } });
        if (foundUser) {
            res.status(400).send('Un utilisateur associé à cet email existe déjà');
            return;
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const passwordHash = yield bcryptjs_1.default.hash(password, salt);
        yield User_1.default.create({
            name,
            firstName,
            email,
            phone,
            password: passwordHash,
            salted: salt,
            roleCode: roles_1.default.USER
        });
        res.send();
    }
    catch (error) {
        res.status(500).send();
        console.log(error);
    }
}));
userRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userLoginSuccess = undefined;
    const email = req.body.email;
    const password = req.body.password;
    try {
        const foundUser = yield User_1.default.findOne({
            where: {
                email
            }
        });
        if (!foundUser) {
            res.status(400).send('Email ou mot de passe incorrect');
            return;
        }
        const passwordHash = yield bcryptjs_1.default.hash(password, foundUser.userSalted);
        const compare = passwordHash === foundUser.userPassword;
        if (compare) {
            userLoginSuccess = foundUser;
        }
        else {
            res.status(400).send('Email ou mot de passe incorrect');
            return;
        }
        if (userLoginSuccess) {
            cookies_1.generateAuth(userLoginSuccess.id, userLoginSuccess.userRole, res);
            res.status(200).send(userLoginSuccess.userRole);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send();
    }
}));
userRouter.post('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    cookies_1.logout(res);
    res.send();
}));
userRouter.post('/forgotPassword', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const foundUser = yield User_1.default.findOne({ where: { email } });
    if (foundUser) {
        const salt = yield bcryptjs_1.default.genSalt(10);
        const token = jsonwebtoken_1.default.sign({ salt }, process.env.JWT_SECRET_2, { expiresIn: 60 * 60 * 2 });
        foundUser.userLostPasswordToken = token;
        yield foundUser.save();
        //await sendLostPasswordMail(foundUser.userEmail, foundUser.fullName, token);
    }
    res.send();
}));
userRouter.post('/newPassword', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.body.token;
    const password = req.body.password;
    const foundUser = yield User_1.default.findOne({ where: { lostPasswordToken: token } });
    if (!foundUser) {
        res.status(400).send();
    }
    try {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_2);
        const salt = yield bcryptjs_1.default.genSalt(10);
        const passwordHash = yield bcryptjs_1.default.hash(password, salt);
        foundUser.userPassword = passwordHash;
        foundUser.userSalted = salt;
        foundUser.userLostPasswordToken = null;
        yield foundUser.save();
        res.status(200).send();
    }
    catch (error) {
        console.log(error);
        res.status(400).send();
    }
}));
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map