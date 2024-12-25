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
    { Date: "01/10/2023", Description: 'Bought Apple Stocks', Category: 'Investment', Amount: "3000009" },
    { Date: "01/11/2023", Description: 'Sold Apple Stocks', Category: 'Investment', Amount: "-3000009" },
    { Date: "01/12/2023", Description: 'Bought Google Stocks', Category: 'Investment', Amount: "1000000" },
    { Date: "01/12/2023", Description: 'Paid Bill', Category: 'Expenses', Amount: "10000" },
    // { id: 2, name: 'Jane', email: 'jane@example.com' },
    // Add more data here
  ];

  columns = ['Date', 'Description', 'Category', 'Amount'];
}
