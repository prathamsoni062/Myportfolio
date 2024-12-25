import { Component } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  user = {
    username: '',
    email: '',
    mobileNo: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private userService: UserService,
    // private sanckbar: SanckbarComponent
  ) { }

  signUpWithFacebook(){

  }

  signUpWithGoogle(){

  }

  signUpWithLinkedIn(){
    
  }
  onSignUp() {
    // You might want to add validation before sending the request
    this.userService.signUp(this.user).subscribe(
      (response) => {
        console.log('User signed up successfully', response);
        // this.sanckbar.openSnackBar('Your signup is successful', 'Close');
        // Handle success (e.g., navigate to login, show a message, etc.)
      },
      (error) => {
        console.error('Sign up failed', error);
        // Handle error (e.g., show an error message)
      }
    );
  }
}


// 6B9080 header
//