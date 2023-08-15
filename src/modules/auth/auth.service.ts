import {UsersService} from "../users/users.service";

export class AuthService {
    private usersService: UsersService;


    constructor() {
        this.usersService = new UsersService();
    }

}

