import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from './user.service'; // Assuming you have a UserService

export const navbarGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const navbarRoutes = ['/login', '/signup'];

  if (navbarRoutes.includes(state.url)) {
    return true; // Allow access to login and signup routes
  }

  if (userService.isLoggedIn()) {
    return true; // Allow access if the user is logged in
  } else {
    router.navigate(['/login']); // Redirect to login if not logged in
    return false;
  }
};
