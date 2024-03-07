import { Express } from "express";
import session from 'express-session';
import passport from 'passport';
import { KeyCloakStrategyOptions } from '@KeyCloakStrategy';
import KeyCloak from 'keycloak-connect';

export default function(app: Express, options: {
    store: session.Store,
    keyCloak: KeyCloakStrategyOptions,
}) {

    app.use(session({
        secret: 'something',
        store: options.store,
    }));
    app.use(passport.authenticate('session'));

    const strategy = new KeyCloak({}, {
        realm: 'kana-api',
        'auth-server-url': 'http://localhost/auth',
        'ssl-required': 'none',
        'resource': 'dashboard-client',
        'confidential-port': 4443,
    });
    app.use(strategy.middleware());
}