import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  amount = "3000009"
  type = 'pie';
  data = [65, 59, 80, 81];
  users = [
    { id: 1, name: 'John', email: 'john@example.com' },
    { id: 2, name: 'Jane', email: 'jane@example.com' },
    // Add more data here
  ];

  columns = ['id', 'name', 'email'];
}
