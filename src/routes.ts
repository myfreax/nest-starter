import { Routes } from 'nest-router';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
export const routes: Routes = [
  {
    path: '/api',
    module: ApiModule,
    children: [
      { path: '/auth', module: AuthModule }
    ],
  },
];
