import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { snackBarType } from 'src/app/shared/enums/sanckbar.enum';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private userService: UserService,
    private router: Router,
    private sanckbar: SnackbarService
  ) {}
  user = {
    email: '',
    password: '',
  };

  onSignIn() {
    this.userService.logIn(this.user).subscribe(
      (res) => {
        if (res.length > 0) {
          console.log("User LogIn successfully", res[0]);
          const token = res[0].token || 'some-token'; // Adjust based on your actual response structure
          sessionStorage.setItem('authToken', token); 
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 100);
          this.sanckbar.openSnackBar('Login successful',snackBarType.SUCCESS );
        } else {
          console.error("Log in failed: Invalid credentials");
          this.sanckbar.openSnackBar('Invalid credentials', snackBarType.ERROR);
        }
      },
      (err) => {
        console.error("Log in failed", err);
        this.sanckbar.openSnackBar('Error occurred during login', snackBarType.ERROR);  
      }
    );
  }
  
  
}
