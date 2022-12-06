import {UsersModule} from "@/modules/users/users.module";
import {RolesModule} from "@/modules/roles/roles.module";
import {PermissionsModule} from "@/modules/permissions/permissions.module";

export const routes = [
    {
    path: '',
    module: UsersModule,
    },
    {
        path: '',
        module: RolesModule,
    },
    {
        path: '',
        module: PermissionsModule,
    },
]
