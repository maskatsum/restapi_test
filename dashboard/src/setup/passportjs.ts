import { Express } from "express";
import session from 'express-session';
import passport from 'passport';
import { KeyCloakStrategy, KeyCloakStrategyOptions } from '@KeyCloakStrategy'

export default function(app: Express, options: {
    store: session.Store,
    keyCloak: KeyCloakStrategyOptions,
}) {

    app.use(session({
        secret: 'something',
        store: options.store,
    }));
    app.use(passport.authenticate('session'));

    const strategy = new KeyCloakStrategy(options.keyCloak);
    passport.use(strategy);
    passport.serializeUser(strategy.serializeUser);
    passport.deserializeUser(strategy.deserializeUser);
}