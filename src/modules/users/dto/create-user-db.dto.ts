import {IUserCreation} from "../IUser";
import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString} from "@nestjs/class-validator";
import {Transform, TransformFnParams} from "@nestjs/class-transformer";

export class CreateUserDbDto implements IUserCreation {
    @ApiProperty()
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    readonly password: string;

    @IsNotEmpty()
    @ApiProperty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    readonly Role: number[];
}
