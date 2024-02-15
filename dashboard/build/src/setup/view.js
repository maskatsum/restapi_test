"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_sass_middleware_1 = __importDefault(require("node-sass-middleware"));
const node_path_1 = __importDefault(require("node:path"));
function default_1(app, options) {
    app.set('view engine', 'ejs');
    app.use((0, node_sass_middleware_1.default)({
        src: node_path_1.default.join(options.pulicDir, 'scss'),
        dest: node_path_1.default.join(options.pulicDir, 'css'),
        debug: true,
        prefix: '/public/css',
    }));
    app.use('/public', express_1.default.static(options.pulicDir));
}
exports.default = default_1;
//# sourceMappingURL=view.js.map