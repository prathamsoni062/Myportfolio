import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrl: './investment.component.scss'
})
export class InvestmentComponent implements OnInit {
  amount = "3000009";
  btnLabel = "Add Investment";
  users = [
    { Date: 10/10/2024, Type: 'stock', Description: 'john@example.com', Amount:30000,Current_Value:1000000 , Roi:20},
    { Date: 10/11/2024, Type: 'bond', Description: 'jane@example.com', Amount:10000, Current_Value:500000, Roi:15},
    
  ];

  columns = ['Date', 'Type', 'Description', 'Amount', 'Current Value', 'Roi'];
  investmentForm!: FormGroup;
  initiateForm() {
    this.investmentForm = new FormGroup({
      amount1: new FormControl(''),
      amount2: new FormControl(''),
      amount3: new FormControl(''),
      addInvestmentForm:new FormControl('')
    });
  }

  ngOnInit(): void {
    this.initiateForm();
    this.setAllData();
  }

  setAllData() {
    this.investmentForm.patchValue({
      amount1: this.amount,
      amount2: '200',
      amount3: this.amount
    });
    // this.investmentForm.get("amount2")?.patchValue('200')
  }
}

