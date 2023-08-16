import {PasswordService} from "../../utils/password.service";
import {User} from "./users.model";
import {JwtService} from "../auth/jwt.service";
import {CreateUserDataDto} from "./dto/create-user-data.dto";

export class UsersService {
    private passwordService: PasswordService;
    private jwtService: JwtService;

    constructor() {
        this.passwordService = new PasswordService();
        this.jwtService = new JwtService();

    }

    async getUser() {
        return await User.findAll();
    }

    async getUserByEmail(email) {
        return await User.findOne({
            where: {email: email},
        });
    }

    async createUser(createUserData: CreateUserDataDto) {
        if (createUserData.password != createUserData.confirmPassword) {
            throw new Error('Wrong password');

        }
        if (await this.getUserByEmail(createUserData.email)) {
            throw new Error('User already exists');
        }

        const hashedPassword = await this.passwordService.hashPassword(createUserData.password);

        const user = await User.create({
            ...createUserData,
            password: hashedPassword,
        });

        const token = this.jwtService.createToken({userId: user.id})

        return {token};
    }
}

