import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { snackBarType } from 'src/app/shared/enums/sanckbar.enum';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private snackbar: SnackbarService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the authorization header if the token exists
    const token = sessionStorage.getItem('authToken');
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Handle the request and catch errors
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle token expiration or unauthorized access
          sessionStorage.removeItem('authToken'); // Clear the token
          this.snackbar.openSnackBar('Session expired. Please log in again.', snackBarType.ERROR);
          this.router.navigate(['/login']); // Redirect to login page
        }
        return throwError(() => error);
      })
    );
  }
}
