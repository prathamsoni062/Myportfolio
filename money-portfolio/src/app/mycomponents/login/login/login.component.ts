import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private userService: UserService, private router:Router){}
  user = {
    email: '',
    password: ''
  };
  
  onSignIn() {
    // Handle sign-in logic here
    this.userService.logIn(this.user).subscribe(
      (res)=>{
        console.log("User LogIn successfully", res);  
        this.router.navigate(['/home']);     
      },
      (err)=>{
        console.error("Log in failed", err);
      }
    )
  }
}
