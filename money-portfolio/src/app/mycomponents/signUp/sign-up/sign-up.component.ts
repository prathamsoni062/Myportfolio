import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { snackBarType } from 'src/app/shared/enums/sanckbar.enum';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { UserService } from 'src/app/user.service';

declare var google: any; // Declare google object for GIS

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signInForm!: FormGroup;

  // Password validation flags
  passwordHasMinLength = false;
  passwordHasUppercase = false;
  passwordHasLowercase = false;
  passwordHasNumber = false;
  passwordHasSpecialChar = false;

  ngOnInit(): void {
    this.signInForm = new FormGroup(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(/^\S+@\S+\.\S+$/), // Email validation
        ]),
        mobileNo: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[6-9]\d{9}$/), // Mobile number should start with 6-9 and have 10 digits
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ), // Strong password validation
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: this.passwordsMatchValidator } // Custom validator for password match
    );

    // Listen for password changes
    this.signInForm.get('password')?.valueChanges.subscribe((value) => {
      this.checkPasswordStrength(value);
    });
    this.initGoogleSignIn();
  }

  constructor(
    private userService: UserService,
    private snackbar: SnackbarService,
    private router: Router
  ) {}

  signUpWithFacebook() {}

  signUpWithGoogle() {}

  signUpWithLinkedIn() {}

  // Check password strength dynamically
  checkPasswordStrength(password: string) {
    this.passwordHasMinLength = password.length >= 8;
    this.passwordHasUppercase = /[A-Z]/.test(password);
    this.passwordHasLowercase = /[a-z]/.test(password);
    this.passwordHasNumber = /\d/.test(password);
    this.passwordHasSpecialChar = /[@$!%*?&]/.test(password);
  }

  // Custom validator to check if password and confirmPassword match
  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSignUp() {
    if (this.signInForm.invalid) {
      this.snackbar.openSnackBar(
        'Please fill in all fields correctly',
        snackBarType.ERROR
      );
      return;
    }

    this.userService.signUp(this.signInForm.value).subscribe(
      (response) => {
        this.snackbar.openSnackBar('Signup Successfully', snackBarType.SUCCESS);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Sign up failed', error);
        this.snackbar.openSnackBar(
          'Error occurred during signup',
          snackBarType.ERROR
        );
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