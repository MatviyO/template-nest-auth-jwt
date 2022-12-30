import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import { CreateRoleDto } from '@/modules/roles/dto/create-role.dto';
import { RolesService } from '@/modules/roles/roles.service';
import { Role } from '@/modules/roles/role.model';

@ApiTags('Roles')
@Controller('Roles')
export class RolesController {

    constructor(private RoleService: RolesService) {
    }

    @ApiResponse({status: 201, type: Role})
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.RoleService.createRole(dto);
    }

    @ApiResponse({status: 200, type: [Role]})
    @Get()
    getAll() {
        return this.RoleService.getAllRole();
    }

    @ApiResponse({status: 200, type: Role})
    @Get('/:name')
    getByName(@Param('name') name: string) {
        return this.RoleService.getRoleByName(name);
    }
}
