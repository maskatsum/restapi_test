"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const _KeyCloakStrategy_1 = require("../../key-cloak-strategy");
function default_1(app, options) {
    app.use((0, express_session_1.default)({
        secret: 'something',
        store: options.store,
    }));
    app.use(passport_1.default.authenticate('session'));
    const strategy = new _KeyCloakStrategy_1.KeyCloakStrategy(options.keyCloak);
    passport_1.default.use(strategy);
    passport_1.default.serializeUser(strategy.serializeUser);
    passport_1.default.deserializeUser(strategy.deserializeUser);
}
exports.default = default_1;
//# sourceMappingURL=passportjs.js.map