"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dashboard_client_json_1 = __importDefault(require("../settings/dashboard-client.json"));
const node_path_1 = __importDefault(require("node:path"));
const express_session_1 = __importDefault(require("express-session"));
const view_1 = __importDefault(require("./setup/view"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_1 = __importDefault(require("./routes/login/index"));
const keycloak_1 = __importDefault(require("./setup/keycloak"));
const PUBLIC_DIR = node_path_1.default.normalize(node_path_1.default.join(__dirname, '..', '..', 'public'));
const app = (0, express_1.default)();
(0, view_1.default)(app, {
    pulicDir: PUBLIC_DIR,
});
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
const config = {
    'realm': 'example',
    'realm-public-key': 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxfcsLy0+GQgzv8U9JCMndOEvdrKL4EODDd6v4hkzVaOUHBNWkjfJqQPEUi1TQ8wRM/zGN2MLsfNMz7QTdRXzQLRH6jcHNrKnfBJ6TCmvBOtG3mI7iXFYSLjvlnpxxi1oQNzaX5Fr4f8EvWf48Fg3/34t+TlGBYgIB04xKHNU8RVZbr87CQBhjBS01fRG0fqCQXRKBMp2eWw/XRO9C8LUhYxdUaQXNOygLYkY4ripe2dClfvcONaUeUQYdI/vrIvL0rPhczRxbxNiy5HXiDkvHy3sKbLpXc2+mug+qi1FisV+bSHQIGubzKBzXXt6yUoZFjyizqyYjvMbFfvEwOTIhwIDAQAB',
    'auth-server-url': 'http://localhost:8080/admin/example/console/',
    'ssl-required': 'external',
    'resource': 'dashboard-client',
    'public-client': true,
    'confidential-port': 0,
};
const memoryStore = new express_session_1.default.MemoryStore();
const keycloak = (0, keycloak_1.default)(app, {
    store: memoryStore,
    paths: {
        'admin': '/',
        'logout': '/logout',
    },
    config,
});
app.get('/', index_1.default);
app.get('/dashboard', keycloak.protect(), (req, res) => {
    res.send(`Hello ${req.user.id}`);
});
app.listen(3000);
//# sourceMappingURL=index.js.map