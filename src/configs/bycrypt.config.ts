import {Env} from "../utils/validate-env";

export const bcryptConfig = {
    saltRounds: Env.number('BCRYPT_SALT_ROUNDS'),
}
