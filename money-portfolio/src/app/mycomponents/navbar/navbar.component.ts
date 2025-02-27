import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public dialog: MatDialog, 
    private userService: UserService) {}

  ngOnInit() {
    this.getProfileData();
  }
  user = {
    username: 'John Doe',
    email: 'johndoe@example.com',
    mobileNo: 9407505792,
    profilePicture: '', // Empty to test initials
  };

  logout() {
    this.userService.logOut();
  }

  getProfileData() {
    this.userService.currentUser().subscribe((res: any) => {
      console.log(res);
      this.user = res;
      // this.user.profilePicture = 'https://i.pravatar.cc/150?img=3'
    });
  }

  getInitials(name: string): string {
    if (!name) return '?';

    const nameParts = name.split(' ');
    return nameParts
      .slice(0, 2) // Get first two words
      .map((part) => part[0]) // Extract first letter
      .join('')
      .toUpperCase(); // Convert to uppercase
  }
}
