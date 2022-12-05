export interface IUser {
    id: number;
    email: string;
    password: string;
    active: boolean;
}

export interface IUserCreation extends Pick<IUser, 'email' | 'password'>{}
