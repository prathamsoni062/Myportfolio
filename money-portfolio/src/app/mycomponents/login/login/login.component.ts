import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { snackBarType } from 'src/app/shared/enums/sanckbar.enum';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { UserService } from 'src/app/user.service';

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
  }

  onSignIn() {
    if (this.loginForm.invalid) {
      this.snackbar.openSnackBar('Please fill in all fields correctly', snackBarType.ERROR);
      return;
    }

    console.log('User Credentials:', this.loginForm.value);
    this.userService.logIn(this.loginForm.value).subscribe(
      (res) => {
        if (res) {
          const token = res.accessToken;
          sessionStorage.setItem('authToken', token);
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 100);
          this.snackbar.openSnackBar('Login successful', snackBarType.SUCCESS);
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
}
