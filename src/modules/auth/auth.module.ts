import { forwardRef, Module } from '@nestjs/common';
import {AuthController} from "@/modules/auth/auth.controller";
import {AuthService} from "@/modules/auth/auth.service";
import {JwtModule} from "@nestjs/jwt";
import { UsersModule } from '@/modules/users/users.module';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth-guard';

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtAuthGuard],
    imports: [
        forwardRef(() => UsersModule),
        JwtModule.register({
        secret: `${process.env.PRIVATE_KEY}`,
        signOptions: {
            expiresIn: '24h'
        }
    })],
    exports: [JwtAuthGuard]
})
export class AuthModule {

}
