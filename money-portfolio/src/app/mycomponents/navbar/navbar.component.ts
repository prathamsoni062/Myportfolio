import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public dialog: MatDialog,
      private userService:UserService
  ) {}

  ngOnInit() {
    this.getProfileData();
  }
  user = {
    username: 'John Doe',
    email: 'johndoe@example.com',
    mobileNo:9407505792,
    profilePicture: 'https://i.pravatar.cc/150?img=3'
  };

  logout() {
    this.userService.logOut();
  }  

  getProfileData(){
    this.userService.currentUser().subscribe((res: any) => {
      console.log(res);
      this.user = res;
    });
  }
}
