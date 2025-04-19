import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { snackBarType } from 'src/app/shared/enums/sanckbar.enum';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { UserService } from 'src/app/user.service';

import {
  MsalService,
  MsalBroadcastService,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
} from '@azure/msal-angular';
import {
  EventMessage,
  EventType,
  InteractionStatus,
  RedirectRequest,
  AuthenticationResult,
} from '@azure/msal-browser';

import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { interactionInProgress } from '@azure/msal-browser/dist/error/BrowserAuthErrorCodes';

declare var google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  loginDisplay = false;
  tokenExpiration: string = '';
  private readonly _destroying$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private router: Router,
    private snackbar: SnackbarService,
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration
  ) {}
  interactionInProgress = false;
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    this.initGoogleSignIn();

    this.msalService.instance.handleRedirectPromise().then((result) => {
      if (result) {
        const payload = result as AuthenticationResult;
        this.msalService.instance.setActiveAccount(payload.account);
      }
    })
    .catch((error) => {
      console.error('MSAL redirect error:', error);
      this.snackbar.openSnackBar('Microsoft login failed', snackBarType.ERROR);
    }
    );

    this.msalBroadcastService.msalSubject$.pipe(
      filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      // takeUntil(this._destroying$)
    ).subscribe((result)=>{
      const payload = result.payload as AuthenticationResult;
      this.msalService.instance.setActiveAccount(payload.account);
      // sessionStorage.setItem('authToken', payload.idToken);
      this.snackbar.openSnackBar('Microsoft login successful', snackBarType.SUCCESS);
      this.router.navigate(['/home']);
    })

    this.msalBroadcastService.inProgress$.pipe(takeUntil(this._destroying$)).subscribe((status: InteractionStatus) => {
      this.interactionInProgress = status === InteractionStatus.Login || status === InteractionStatus.AcquireToken;
    })
    
  }

  setLoginDisplay(): void {
    this.loginDisplay = this.msalService.instance.getAllAccounts().length > 0;
  }

  loginWithMicrosoft(): void {
    if(!this.interactionInProgress && !this.msalService.instance.getAllAccounts().length) {
     this.msalService.loginRedirect({
      scopes: ['User.Read'],
      redirectUri:'http://localhost:4000/login',
    });
    } else {
      console.log('Already logged in or interaction in progress');
    }
  }

  onSignIn(): void {
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

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
