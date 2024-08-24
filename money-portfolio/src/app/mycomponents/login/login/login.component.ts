import { Component } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private userService: UserService){}
  user = {
    email: '',
    password: ''
  };

  onSignIn() {
    // Handle sign-in logic here
    this.userService.logIn(this.user).subscribe(
      (res)=>{
        console.log("User LogIn successfully", res);       
      },
      (err)=>{
        console.error("Log in failed", err);
      }
    )
  }
}
