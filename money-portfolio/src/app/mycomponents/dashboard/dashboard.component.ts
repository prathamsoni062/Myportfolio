import { Component, OnInit } from '@angular/core';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  totalPortfolioValue: number = 0;
  totalInvestment: number = 0;
  totalExpenses: number = 0;
  netWorth: number = 0;
  pieData: string = '';
  pieChartLabels: string[] = [];
  pieChartData: number[] = [];
  lineChartLabels: string[] = []; // Dates for the line chart
  lineChartData: number[] = []; // Portfolio values for the line chart

  constructor(private dashboardService: DashboardService) {}
  dashboardData: any;
  ngOnInit(): void {
    this.getDashboardData();
  }

  type = 'pie';
  data = [65, 59, 80, 81];
  users: any[] = [];
  columns = ['Date', 'Description', 'Category', 'Amount'];

  getDashboardData() {
    this.dashboardService.getDashboardData().subscribe((res) => {
      this.dashboardData = res;
      console.log(res);

      this.getUsers(res);
      this.calculateTotalPortfolioValue();
    });
  }

  calculateTotalPortfolioValue() {
    this.totalPortfolioValue =
      this.dashboardData.investments.totalPortfolioValue;
    this.totalInvestment = this.dashboardData.investments.totalAmount;
    this.totalExpenses = this.dashboardData.expenses.totalAmount;
    this.netWorth = this.dashboardData.netWorth;
  }

  getUsers(res: any) {
    const expenseDetails = res.expenses.details;
    const investmentDetails = res.investments.details;
    this.users = [];
    const investmentSummary: { [key: string]: number } = {}; // For Pie Chart Data
    const portfolioOverTime: { [key: string]: number } = {}; // For Line Chart Data

    // Map expenseDetails to users array
    if (expenseDetails && Array.isArray(expenseDetails)) {
      const formattedExpenses = expenseDetails.map((detail: any) => ({
        Date: new Date(detail.expenseDate),
        Description: detail.expenseName,
        Category: detail.expenseCategory,
        Amount: `₹ ${detail.expenseAmount.toLocaleString('en-IN')}`,
      }));

      this.users.push(...formattedExpenses); // Add expense data to users
    }

    // Map investmentDetails to users array and aggregate for Pie Chart and Line Chart
    if (investmentDetails && Array.isArray(investmentDetails)) {
      const formattedInvestments = investmentDetails.map((detail: any) => {
        // Aggregate investment amounts by type for the pie chart
        const type = detail.investmentType;
        investmentSummary[type] =
          (investmentSummary[type] || 0) + detail.investmentAmount;

        // Aggregate portfolio value over time for the line chart
        const date = new Date(detail.investmentDate).toLocaleDateString(
          'en-IN'
        ); // Format the date
        portfolioOverTime[date] =
          (portfolioOverTime[date] || 0) + detail.investmentAmount;

        return {
          Date: new Date(detail.investmentDate),
          Description: detail.investmentType,
          Category: 'Investment',
          Amount: `₹ ${detail.investmentAmount.toLocaleString('en-IN')}`,
        };
      });

      this.users.push(...formattedInvestments); // Add investment data to users
    }

    // Sort the users array by Date in ascending order
    this.users.sort((a, b) => a.Date.getTime() - b.Date.getTime());

    // Format the Date into a readable format for display
    this.users = this.users.map((user) => ({
      ...user,
      Date: user.Date.toLocaleDateString('en-IN'),
    }));

    // Generate labels and data for the Pie Chart
    this.pieChartLabels = Object.keys(investmentSummary); // Investment types
    this.pieChartData = Object.values(investmentSummary); // Corresponding amounts

    // Generate labels and data for the Line Chart
    this.lineChartLabels = Object.keys(portfolioOverTime); // Dates
    this.lineChartData = Object.values(portfolioOverTime); // Portfolio values

    console.log('Sorted and Combined Users Data:', this.users);
    console.log('Pie Chart Labels:', this.pieChartLabels);
    console.log('Pie Chart Data:', this.pieChartData);
    console.log('Line Chart Labels:', this.lineChartLabels);
    console.log('Line Chart Data:', this.lineChartData);
  }
}
