import { Module } from '@nestjs/common';
import {AuthController} from "@/modules/auth/auth.controller";
import {AuthService} from "@/modules/auth/auth.service";
import {UsersModule} from "@/modules/users/users.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [ UsersModule, JwtModule.register({
        privateKey: process.env.PRIVATE_KEY
    })]
})
export class AuthModule {}
