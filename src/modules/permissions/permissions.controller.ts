import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";


@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController {

    constructor() {
    }
}
