import { Routes } from 'nest-router';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
export const routes: Routes = [
  {
    path: '/api',
    module: ApiModule,
    children: [
      { path: '/auth', module: AuthModule },
      { path: '/users', module: UsersModule },
      { path: '/roles', module: RolesModule },
      { path: '/permissions', module: PermissionsModule },
    ],
  },
];
