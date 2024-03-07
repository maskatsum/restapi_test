"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
const keycloak_connect_1 = __importDefault(require("keycloak-connect"));
function default_1(app, options) {
    app.use((0, express_session_1.default)({
        secret: 'something',
        resave: false,
        saveUninitialized: true,
        store: options.store,
    }));
    const keycloak = new keycloak_connect_1.default({
        store: options.store,
    }, options.config);
    app.use(keycloak.middleware({
        admin: options.paths.admin,
        logout: options.paths.logout,
    }));
    return keycloak;
}
exports.default = default_1;
//# sourceMappingURL=keycloak.js.map