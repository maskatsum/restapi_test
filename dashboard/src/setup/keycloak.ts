import session from 'express-session';
import KeyCloak from 'keycloak-connect';
import { Express } from "express";



export default function(app: Express, options: {
    store: session.Store,
    paths: {
        admin: string;
        logout: string;
    },
    config: KeyCloak.KeycloakConfig;
}): KeyCloak.Keycloak {

    app.use(session({
        secret: 'something',
        resave: false,
        saveUninitialized: true,
        store: options.store,
    }));

    const keycloak = new KeyCloak({
        store: options.store,
    }, options.config);

    app.use(keycloak.middleware({
        admin: options.paths.admin,
        logout: options.paths.logout,
    }));
    return keycloak; 
}
