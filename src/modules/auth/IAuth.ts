import {CreateUserDto} from "@/modules/users/dto/create-user.dto";

export interface IAuthService {
    login: (userDto: CreateUserDto) => Promise<any>
    registration: (userDto: CreateUserDto) => Promise<any>
}
