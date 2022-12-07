import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import { Permission } from '@/modules/permissions/permission.model';

@Injectable()
export class PermissionsService {
    constructor(@InjectModel(Permission) private roleRepository: typeof Permission) {
    }
}
