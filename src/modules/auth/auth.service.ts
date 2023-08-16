import {UsersService} from "../users/users.service";
import {PasswordService} from "../../utils/password.service";
import {JwtService} from "./jwt.service";
import {CustomError} from "../../utils/custom-error";

export class AuthService {
    private usersService: UsersService;
    private passwordService: PasswordService;
    private jwtService: JwtService;

    constructor() {
        this.usersService = new UsersService();
        this.passwordService = new PasswordService();
        this.jwtService = new JwtService();

    }

    async login(email: string, password: string) {
        const user = await this.usersService.getUserByEmail(email);

        if (!user) {
            throw new CustomError("AUTHENTICATION_FAILED", {
                "email": "AUTHENTICATION_FAILED",
                "password": "AUTHENTICATION_FAILED"
            }, "AUTHENTICATION_FAILED");

        }

        const isPasswordValid = await this.passwordService.comparePassword(password, user.password);

        if (!isPasswordValid) {
            throw new CustomError("AUTHENTICATION_FAILED", {
                "email": "AUTHENTICATION_FAILED",
                "password": "AUTHENTICATION_FAILED"
            }, "AUTHENTICATION_FAILED");
        }

        const token = this.jwtService.createToken({userId: user.id})
        return {token};
    }
}

