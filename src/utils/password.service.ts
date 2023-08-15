import {bcryptConfig} from "../configs/bycrypt.config";

import * as bcrypt from 'bcrypt'

export class PasswordService {


    async hashPassword(password) {
        return await bcrypt.hash(password, bcryptConfig.saltRounds);
    }

    async comparePassword(firstPassword, secondPassword) {
        return await bcrypt.compare(firstPassword, secondPassword);
    }
}

