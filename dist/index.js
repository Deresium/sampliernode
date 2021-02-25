"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const pgConnexion_1 = require("./pgConnexion");
const port = Number(process.env.PORT);
const host = process.env.DNS_NAME;
pgConnexion_1.connect().then(() => 'connect to DB');
let server;
if (process.env.NODE_ENV !== 'production') {
    server = app_1.default.listen(port, host, () => {
        console.log(`Server is up and running at http://${host}:${port}/!`);
    });
}
else {
    server = app_1.default.listen(process.env.PORT, () => {
        console.log(`Server is up and running at http://${host}:${port}/!`);
    });
}
exports.default = server;
//# sourceMappingURL=index.js.map