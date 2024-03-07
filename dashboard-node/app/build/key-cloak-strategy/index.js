"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyCloakStrategy = exports.KeyCloakUser = void 0;
const passport_1 = __importDefault(require("passport"));
const undici_1 = require("undici");
class KeyCloakUser {
    id;
    constructor(id) {
        this.id = id;
    }
    static isKeyCloakUser = (user) => {
        return true;
    };
}
exports.KeyCloakUser = KeyCloakUser;
;
class KeyCloakStrategy extends passport_1.default.Strategy {
    static name = 'key-cloak';
    name = KeyCloakStrategy.name;
    constructor(options) {
        super();
        console.log(`constructor`, options);
    }
    serializeUser(user, done) {
        const keyUser = user;
        done(null, keyUser.id);
    }
    deserializeUser(id, done) {
        done(null, new KeyCloakUser(id));
    }
    authenticate(req) {
        const realmName = 'example';
        http: (0, undici_1.request)(`http://localhost:8080/auth/realms/${realmName}/protocol/`);
    }
}
exports.KeyCloakStrategy = KeyCloakStrategy;
//# sourceMappingURL=index.js.map