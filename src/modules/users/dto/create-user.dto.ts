import {IUserCreation} from "../IUser";

export class CreateUserDto implements IUserCreation {
    readonly email: string;
    readonly password: string;
}
