import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString} from "@nestjs/class-validator";
import {Transform, TransformFnParams} from "@nestjs/class-transformer";
import {IRoleCreation} from "@/modules/roles/IRole";

export class CreateRoleDto implements IRoleCreation {
    @ApiProperty()
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    readonly email: string;
}
