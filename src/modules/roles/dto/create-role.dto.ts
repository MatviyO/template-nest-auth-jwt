import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "@nestjs/class-validator";
import {Transform, TransformFnParams} from "@nestjs/class-transformer";
import {IRoleCreation} from "@/modules/Role/IRole";

export class CreateRoleDto implements IRoleCreation {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    readonly name: string;
}
