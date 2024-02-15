import express from 'express';
import credeintial from '@settings/dashboard-client.json';
import path from 'node:path';
import { KeyCloakStrategy, KeyCloakUser } from '@KeyCloakStrategy';
import session from 'express-session';
import viewSetup from './setup/view';
import passportSetup from './setup/passportjs';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import loginPage from './routes/login/index';
import { ensureLoggedIn } from 'connect-ensure-login';
import keycloakSetup from './setup/keycloak';

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


const config = {
    'realm': 'example',
    'realm-public-key': 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxfcsLy0+GQgzv8U9JCMndOEvdrKL4EODDd6v4hkzVaOUHBNWkjfJqQPEUi1TQ8wRM/zGN2MLsfNMz7QTdRXzQLRH6jcHNrKnfBJ6TCmvBOtG3mI7iXFYSLjvlnpxxi1oQNzaX5Fr4f8EvWf48Fg3/34t+TlGBYgIB04xKHNU8RVZbr87CQBhjBS01fRG0fqCQXRKBMp2eWw/XRO9C8LUhYxdUaQXNOygLYkY4ripe2dClfvcONaUeUQYdI/vrIvL0rPhczRxbxNiy5HXiDkvHy3sKbLpXc2+mug+qi1FisV+bSHQIGubzKBzXXt6yUoZFjyizqyYjvMbFfvEwOTIhwIDAQAB',
    'auth-server-url': 'http://localhost:8080/admin/example/console/',
    'ssl-required': 'external',
    'resource': 'dashboard-client',
    'public-client': true,
    'confidential-port': 8443,
};

const memoryStore = new session.MemoryStore();
// const keycloak = keycloakSetup(app, {
//     store: memoryStore,
//     paths: {
//         'admin': '/',
//         'logout': '/logout',
//     },
//     config,
// });
passportSetup(app, {
    store: memoryStore,
    keyCloak: credeintial,
});

// app.get('/', loginPage);
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
    authGuard,
    (req: express.Request, res: express.Response) => {
        res.send(`Hello ${(req.user as KeyCloakUser).id}`);
    }
);

app.listen(3000);