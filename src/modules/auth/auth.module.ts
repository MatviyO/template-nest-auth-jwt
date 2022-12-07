import { Module } from '@nestjs/common';
import {AuthController} from "@/modules/auth/auth.controller";
import {AuthService} from "@/modules/auth/auth.service";
import {JwtModule} from "@nestjs/jwt";
import { UsersModule } from '@/modules/users/users.module';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [ UsersModule, JwtModule.register({
        secret: process.env.PRIVATE_KEY,
        signOptions: {
            expiresIn: '24h'
        }
    })]
})
export class AuthModule {}
