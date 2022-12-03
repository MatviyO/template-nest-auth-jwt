export interface IRole {
    id: number;
    type: string;
}

export interface IRoleCreation extends Pick<IRole, 'type'>{}
