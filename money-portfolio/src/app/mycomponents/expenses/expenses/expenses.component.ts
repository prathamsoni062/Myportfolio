import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ExpensesService } from '../services/expenses.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'], // Fixed typo `styleUrl`
})
export class ExpensesComponent implements OnInit {
  constructor(private expensesService: ExpensesService) {}

  totalExpenses: number = 0;
  monthlyBudget: number = 0;
  currentMonthExpenses: number = 0;
  expensesData: any;
  btnLabel = 'Add Expenses';

  // Define the type of users array
  users: any[] = [];

  columns = ['Date', 'Type', 'Description', 'Amount'];
  expensesForm!: FormGroup;

  // Initialize the form
  initiateForm() {
    this.expensesForm = new FormGroup({
      totalExpenses: new FormControl(''),
      monthlyBudget: new FormControl(''),
      currentMonthExpenses: new FormControl(''),
      addInvestmentForm: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getExpensesData();
    this.initiateForm();
  }

  setAllData() {
    this.expensesForm.patchValue({
      totalExpenses: this.expensesData.totalExpenses,
      monthlyBudget: '200',
      currentMonthExpenses: this.expensesData?.currentMonthExpenses,
    });
  }

  getExpensesData() {
    this.expensesService.getExpenses().subscribe((res) => {
      this.expensesData = res;

      // Set form data
      this.setAllData();

      // Map expenses to table data
      this.users = this.expensesData.expenses.map((expense: any) => ({
        Date: new Date(expense.expenseDate).toLocaleDateString(),
        Type: expense.expenseCategory,
        Description: expense.expenseName,
        Amount: expense.expenseAmount,
      }));
    });
  }

  

  
}
