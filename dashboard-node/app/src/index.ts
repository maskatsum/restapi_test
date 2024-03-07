import express from 'express';
import credeintial from '@settings/dashboard-client.json';
import path from 'node:path';
import session from 'express-session';
import viewSetup from './setup/view';
import passportSetup from './setup/passportjs';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import loginPage from './routes/login/index';
import { ensureLoggedIn } from 'connect-ensure-login';
import { KeyCloakUser } from '@KeyCloakStrategy';
import KeyCloak from 'keycloak-connect';

const PUBLIC_DIR = path.normalize(
    path.join(__dirname, '..', '..', 'public'),
);
const authGuard = ensureLoggedIn('http://localhost:8080/admin/example/console/');

const app = express();
viewSetup(app, {
    pulicDir: PUBLIC_DIR,
});
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true,
}));


const memoryStore = new session.MemoryStore();
app.use(session({
    secret: 'something',
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
}));

const keycloak = new KeyCloak({
    store: memoryStore,
}, {
    'realm': 'kana-api',
    'auth-server-url': 'http://localhost/auth',
    'ssl-required': 'none',
    'resource': 'dashboard-client',
    'confidential-port': 4443,
});

app.use(keycloak.middleware());

app.get('/', loginPage);
// app.post(
//     '/auth',
//     passport.authenticate(KeyCloakStrategy.name, {
//         successRedirect: '/dashboard',
//         failureRedirect: '/',
//         failureMessage: true,
//     }),
// );
app.get(
    '/dashboard', 
    [keycloak.protect()],
    (req: express.Request, res: express.Response) => {
        res.send(`Hello ${(req.user as KeyCloakUser).id}`);
    }
);

app.listen(8000);
