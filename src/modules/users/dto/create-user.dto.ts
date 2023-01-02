import {IUserCreation} from "../IUser";
import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString} from "@nestjs/class-validator";
import {Transform, TransformFnParams} from "@nestjs/class-transformer";
import { Length } from 'class-validator';

export class CreateUserDto implements IUserCreation {
    @ApiProperty()
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    @Length(4, 16, { message: "Min 4 , max 16"})
    @Transform(({ value }: TransformFnParams) => value?.trim())
    readonly password: string;
}
