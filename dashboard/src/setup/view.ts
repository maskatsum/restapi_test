import express, { Express } from "express";
import sassMiddleware from 'node-sass-middleware';
import path from 'node:path';

export default function(app: Express, options: {
    pulicDir: string,
}) {
    app.set('view engine', 'ejs');
    app.use(sassMiddleware({
        src: path.join(options.pulicDir, 'scss'),
        dest: path.join(options.pulicDir, 'css'),
        debug: true,
        prefix:  '/public/css',
    }));
    app.use('/public', express.static(options.pulicDir));
}