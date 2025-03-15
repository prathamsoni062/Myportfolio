import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import apiUrlConfigs from '../app/shared/modules/http-layer/config/api-url.config';
import { ApiService } from './shared/modules/http-layer/services/api.service';
import { Router } from '@angular/router';
import { snackBarType } from './shared/enums/sanckbar.enum';
import { SnackbarService } from './shared/services/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  token = sessionStorage.getItem('authToken');
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  constructor(
    private http: HttpClient,
    private ApiService: ApiService,
    private router: Router,
    private snackbar: SnackbarService
  ) {}

  signUp(user: any): Observable<any> {
    return this.ApiService.invoke(apiUrlConfigs.register, {
      requestBody: user,
    });
  }

  logIn(credentials: any): Observable<any> {
    return this.ApiService.invoke(apiUrlConfigs.login, {
      requestBody: credentials,
    });
  }

  isLoggedIn(): boolean {
    const token = sessionStorage.getItem('authToken');
    if (!token) return false;

    // Check if token is expired
    const expiry = this.getTokenExpiration(token);
    if (expiry < Date.now() / 1000) {
      this.logOut();
      return false;
    }
    return true;
  }

  logOut(): void {
    sessionStorage.removeItem('authToken');
    this.snackbar.openSnackBar(
      'Session expired. Please log in again.',
      snackBarType.ERROR
    );
    this.router.navigate(['/login']);
  }

  // Decode token and get expiration time
  private getTokenExpiration(token: string): number {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp || 0;
    } catch (e) {
      return 0;
    }
  }

  currentUser(): Observable<any> {
    return this.ApiService.invoke(apiUrlConfigs.currentUser);
  }

  googleLogin(token: string): Observable<any> {
    return this.ApiService.invoke(apiUrlConfigs.googleLogin, {
      requestBody: { token },
    });
  }
}
