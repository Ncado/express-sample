import {PasswordService} from "../../utils/password.service";
import {User} from "./users.model";

export class UsersService {
    private passwordService: PasswordService;

    constructor() {
        this.passwordService = new PasswordService();
    }

    async getUser() {
        return await User.findAll();
    }

    async getUserByEmail(email) {
        return await User.findOne({
            where: {email: email},
        });
    }

    async createUser(createUserData) {
        if (await this.getUserByEmail(createUserData.email)) {
            throw new Error('User already exists');
        }

        const hashedPassword = await this.passwordService.hashPassword(createUserData.password);

        const user = await User.create({
            ...createUserData,
            password: hashedPassword,
        });

        return user;
    }
}

