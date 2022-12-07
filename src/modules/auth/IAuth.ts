import {CreateUserDto} from "@/modules/User/dto/create-user.dto";

export interface IAuthService {
    login: (userDto: CreateUserDto) => Promise<any>
    registration: (userDto: CreateUserDto) => Promise<any>
}
