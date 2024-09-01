import { CanActivateFn } from '@angular/router';

export const navbarGuard: CanActivateFn = (route, state) => {
  const navbarRoutes = ['/login', '/signup'];
  return !navbarRoutes.includes(state.url);
};
