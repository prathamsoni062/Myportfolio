import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from './user.service';
import { MsalService } from '@azure/msal-angular';

export const navbarGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const msalService = inject(MsalService);
  const router = inject(Router);

  const publicRoutes = ['/login', '/signup'];

  // Allow access to public routes (login and signup)
  if (publicRoutes.includes(state.url)) {
    return true;
  }

  // Check MSAL login status
  const accounts = msalService.instance.getAllAccounts();
  if (accounts.length > 0) {
    msalService.instance.setActiveAccount(accounts[0]);
    return true;
  }

  // Fallback: check your own app's login state
  if (userService.isLoggedIn()) {
    return true;
  }

  // Not logged in: clear session and redirect
  console.warn('Unauthorized access. Redirecting to login...');
  userService.logOut(); // Clears session and navigates to login
  return false;
};
