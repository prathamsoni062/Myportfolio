import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from './user.service'; // Ensure this is correctly pointing to your UserService

export const navbarGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const publicRoutes = ['/login', '/signup'];

  // Allow access to public routes (login and signup)
  if (publicRoutes.includes(state.url)) {
    return true;
  }

  // Check if the user is logged in
  if (userService.isLoggedIn()) {
    return true;
  } else {
    // Redirect to login if not logged in
    console.log('Unauthorized access. Redirecting to login...');
    // router.navigate(['/login']);    
    userService.logOut(); // Clear session and navigate to login    
    return false;
  }
};
