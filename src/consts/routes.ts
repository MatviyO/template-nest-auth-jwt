import {PermissionsModule} from "@/modules/permissions/permissions.module";
import { RolesModule } from "@/modules/roles/roles.module";
import { UsersModule } from '@/modules/users/users.module';

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
