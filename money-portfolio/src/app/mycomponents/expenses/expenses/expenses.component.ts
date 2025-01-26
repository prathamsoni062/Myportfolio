import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ExpensesService } from '../services/expenses.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'
})
export class ExpensesComponent implements OnInit {
  constructor(private expensesService:ExpensesService) { }

  
amount = "3000009";
  btnLabel = "Add Expenses";
  users = [
    { Date: 10/10/2024, Type: 'stock', Description: 'john@example.com', Amount:30000,Current_Value:1000000 , Roi:20},
    { Date: 10/11/2024, Type: 'bond', Description: 'jane@example.com', Amount:10000, Current_Value:500000, Roi:15},
    
  ];

  columns = ['Date', 'Type', 'Description', 'Amount', 'Current Value', 'Roi'];
  expensesForm!: FormGroup;
  initiateForm() {
    this.expensesForm = new FormGroup({
      amount1: new FormControl(''),
      amount2: new FormControl(''),
      amount3: new FormControl(''),
      addInvestmentForm:new FormControl('')
    });
  }

  ngOnInit(): void {
    this.initiateForm();
    this.setAllData();
    this.expensesService.getExpenses().subscribe(res => {
      // this.users = data;
      console.log(res);
      
    });
  }

  setAllData() {
    this.expensesForm.patchValue({
      amount1: this.amount,
      amount2: '200',
      amount3: this.amount
    });
    // this.expensesForm.get("amount2")?.patchValue('200')
  }
}

