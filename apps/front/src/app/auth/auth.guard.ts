import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const AuthGuard: CanActivateFn = (_route, _state) => {
  const authService = inject(AuthService);
  return authService.checkLoginState();
};
