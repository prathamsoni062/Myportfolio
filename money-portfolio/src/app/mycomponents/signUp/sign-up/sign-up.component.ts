import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { snackBarType } from 'src/app/shared/enums/sanckbar.enum';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  signInForm!: FormGroup;

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      username: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      mobileNo: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      confirmPassword: new FormControl('',[Validators.required])
    });
  }
  constructor(private userService: UserService,
    private snackbar: SnackbarService
  ) { }

  signUpWithFacebook(){

  }

  signUpWithGoogle(){

  }

  signUpWithLinkedIn(){
    
  }
  onSignUp() {
     if (this.signInForm.invalid) {
          this.snackbar.openSnackBar('Please fill in all fields correctly', snackBarType.ERROR);
          return;
        }
    // You might want to add validation before sending the request
    this.userService.signUp(this.signInForm.value).subscribe(
      (response) => {
        console.log('User signed up successfully', response);
        // this.sanckbar.openSnackBar('Your signup is successful', 'Close');
        // Handle success (e.g., navigate to login, show a message, etc.)
      },
      (error) => {
        console.error('Sign up failed', error);
        this.snackbar.openSnackBar('Error occurred during signup', snackBarType.ERROR);
        // Handle error (e.g., show an error message)
      }
    );
  }
}


// 6B9080 header
//