import express, { Express }  from 'express';
import passport from 'passport';
import { request } from 'undici';

export type KeyCloakStrategyOptions = {
    clientId: string;
    clientSecret: string;
    realm: string;
    url: string;
}

export class KeyCloakUser implements Express.User {
    
    constructor(
        readonly id: string,
    ) {
    }

    static readonly isKeyCloakUser = (user: any): user is KeyCloakUser => {
        return true;
    }
};

export class KeyCloakStrategy extends passport.Strategy {
    static readonly name = 'key-cloak';

    readonly name = KeyCloakStrategy.name;

    constructor(
        options: KeyCloakStrategyOptions,
    ) {
        super();
        console.log(`constructor`, options);
    }

    serializeUser(
        user: Express.User,
        done: (err: any, id: string) => void
    ) {
        const keyUser = user as KeyCloakUser;
        done(null, keyUser.id);
    }
    deserializeUser(
        id: string,
        done: (err: any, user: KeyCloakUser) => void
    ) {
        
        done(null, new KeyCloakUser(
            id,
        ));
    }

    authenticate(
        this: passport.StrategyCreated<this & passport.StrategyCreatedStatic>,
        req: express.Request,
    ) {
        const realmName = 'example';
        http://localhost:8080/admin/example/console/
        request(`http://localhost:8080/auth/realms/${realmName}/protocol/`)
        
        // const userid = req.body.userid;
        // const password = req.body.password;
        // if (userid === 'hello' && password === 'world') {
        //     return this.success(new KeyCloakUser(
        //         `user-${Date.now()}`,
        //     ));
        // }
        // this.fail('userid and/or password is/are incorrect.');
    }
}