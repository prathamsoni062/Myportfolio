import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { snackBarType } from 'src/app/shared/enums/sanckbar.enum';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { UserService } from 'src/app/user.service';

declare var google: any; // Declare google object for GIS

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    this.initGoogleSignIn();
  }

  onSignIn() {
    if (this.loginForm.invalid) {
      this.snackbar.openSnackBar('Please fill in all fields correctly', snackBarType.ERROR);
      return;
    }

    this.userService.logIn(this.loginForm.value).subscribe(
      (res) => {
        if (res && res.accessToken) {
          sessionStorage.setItem('authToken', res.accessToken);
          this.snackbar.openSnackBar('Login successful', snackBarType.SUCCESS);
          this.router.navigate(['/home']);
        } else {
          this.snackbar.openSnackBar('Invalid credentials', snackBarType.ERROR);
        }
      },
      (err) => {
        console.error('Login failed', err);
        this.snackbar.openSnackBar('Error occurred during login', snackBarType.ERROR);
      }
    );
  }

  initGoogleSignIn() {
    google.accounts.id.initialize({
      client_id: '513709081151-74o12mag93hb7kr7g1nlrqabm8gdlv43.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response),
    });

    google.accounts.id.renderButton(
      document.getElementById('google-signin-btn'),
      { theme: 'outline', size: 'large', width: '300' }
    );
  }

  handleCredentialResponse(response: any) {
    console.log('Google ID Token:', response.credential);

    this.userService.googleLogin(response.credential).subscribe(
      (res) => {
        sessionStorage.setItem('authToken', res.accessToken);
        this.snackbar.openSnackBar('Google Login successful', snackBarType.SUCCESS);
        this.router.navigate(['/home']);
      },
      (err) => {
        console.error('Google Login failed', err);
        this.snackbar.openSnackBar('Google Login failed', snackBarType.ERROR);
      }
    );
  }
}
