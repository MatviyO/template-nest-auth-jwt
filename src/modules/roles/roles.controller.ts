import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RolesService} from "@/modules/roles/roles.service";
import {CreateRoleDto} from "@/modules/roles/dto/create-role.dto";
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {RolesModel} from "@/modules/roles/roles.model";

@ApiTags('Roles')
@Controller('roles')
export class RolesController {

    constructor(private rolesService: RolesService) {
    }

    @ApiResponse({status: 201, type: RolesModel})
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.rolesService.createRole(dto);
    }

    @ApiResponse({status: 200, type: [RolesModel]})
    @Get()
    getAll() {
        return this.rolesService.getAllRoles();
    }

    @ApiResponse({status: 200, type: RolesModel})
    @Get('/:type')
    getByType(@Param('type') type: string) {
        return this.rolesService.getRoleByType(type);
    }
}
