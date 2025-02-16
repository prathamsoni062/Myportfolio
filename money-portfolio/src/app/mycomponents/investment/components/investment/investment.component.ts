import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { InvestmentService } from '../../services/investment.service';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrl: './investment.component.scss',
})
export class InvestmentComponent implements OnInit {
  constructor(private investmentService: InvestmentService) {}
  btnLabel = 'Add Investment';
  investmentData: any;
  users = [];

  columns = ['Date', 'Type', 'Amount', 'Current Value', 'Roi'];
  investmentForm!: FormGroup;
  initiateForm() {
    this.investmentForm = new FormGroup({
      currentValue: new FormControl(''),
      totalInvested: new FormControl(''),
      overallROI: new FormControl(''),
      addInvestmentForm: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getInvestments();
    this.initiateForm();
  }

  setAllData() {
    this.investmentForm.patchValue({
      currentValue: this.investmentData.totalCurrentValue,
      totalInvested: this.investmentData.totalInvested,
      overallROI: this.investmentData.overallROI,
    });
    // this.investmentForm.get("totalInvested")?.patchValue('200')
  }

  getInvestments() {
    this.investmentService.getInvestments().subscribe((res) => {
      this.investmentData = res;
      this.setAllData();
      console.log(this.investmentData);
      this.users = this.investmentData.investments.map((investment: any) => ({
        Date: new Date(investment.investmentDate).toLocaleDateString(),
        Type: investment.investmentType,
        // Description: '',
        Amount: investment.investmentAmount,
        'Current Value': investment.currentValue,
        Roi: investment.roi,
      }));
    });
  }
}
