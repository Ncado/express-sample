import {Env} from '../utils/validate-env';

export const authConfig = {
    jwtConfig: {
        secret: Env.string('JWT_SECRET'),
        signOptions: {expiresIn: '365d'},
    },
    sessionSecret: Env.string('SESSION_SECRET')

}
//Env.string('JWT_SECRET')
