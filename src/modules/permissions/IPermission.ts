export interface IPermission {
    id: number;
    name: string;
}

export interface PermissionCreate extends Pick<IPermission, 'name'>{}
