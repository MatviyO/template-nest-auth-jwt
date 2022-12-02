export interface IUser {
    id: number;
    email: string;
    password: string;
    active: boolean;
    activateMessage: string;
}

export interface IUserCreation extends Pick<IUser, 'email' | 'password'>{}
