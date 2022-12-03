import {UsersModule} from "@/modules/users/users.module";
import {RolesModule} from "@/modules/roles/roles.module";

export const routes = [
    {
    path: '',
    module: UsersModule,
    },
    {
        path: '',
        module: RolesModule,
    },
]
