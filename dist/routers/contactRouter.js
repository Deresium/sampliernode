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
const Contact_1 = __importDefault(require("../models/Contact"));
const sendgridSamplier_1 = require("../sendgridSamplier");
const contactRouter = express_1.default.Router();
contactRouter.post('/contact', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contact = yield Contact_1.default.create({
            name: req.body.name,
            firstName: req.body.firstName,
            email: req.body.email,
            message: req.body.message
        });
        yield sendgridSamplier_1.sendContactMail(contact);
        res.send();
    }
    catch (error) {
        res.status(500).send();
    }
}));
exports.default = contactRouter;
//# sourceMappingURL=contactRouter.js.map