import {UserModule} from "@/modules/User/User.module";
import {RoleModule} from "@/modules/Role/Role.module";
import {PermissionsModule} from "@/modules/permissions/permissions.module";

export const routes = [
    {
    path: '',
    module: UserModule,
    },
    {
        path: '',
        module: RoleModule,
    },
    {
        path: '',
        module: PermissionsModule,
    },
]
