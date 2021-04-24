import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AntdResultMiddleware } from './shared/middlewares/antd-result.middleware';
import { UsersModule } from './users/users.module';
import { ApiModule } from './api/api.module';
import { routes } from './routes';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [jwtConfig],
    }),
    RouterModule.forRoutes(routes),
    AuthModule,
    UsersModule,
    ApiModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
  ],
  controllers: [AppController],
  providers: [
    ConfigService,
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AntdResultMiddleware).forRoutes('/api');
  }
}
