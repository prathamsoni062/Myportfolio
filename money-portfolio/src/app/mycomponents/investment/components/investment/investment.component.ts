import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { InvestmentService } from '../../services/investment.service';
import { InvestmentPopupComponent } from '../investment-popup/investment-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogService } from 'src/app/shared/services/dialog/confirmation-dialog.service';
@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrl: './investment.component.scss',
})
export class InvestmentComponent implements OnInit {
  constructor(
    private investmentService: InvestmentService,
    private dialog: MatDialog,
    private dialogService: ConfirmationDialogService
  ) {}

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
  }

  getInvestments() {
    this.investmentService.getInvestments().subscribe((res) => {
      this.investmentData = res;
      this.setAllData();
      this.users = this.investmentData.investments.map((investment: any) => ({
        _id: investment._id,
        Date: new Date(investment.investmentDate).toLocaleDateString(),
        Type: investment.investmentType,
        Amount: investment.investmentAmount,
        'Current Value': investment.currentValue,
        Roi: investment.roi,
      }));
    });
  }

  openPopup(data: any = null) {
    const isEdit = !!data;
    const dialogRef = this.dialog.open(InvestmentPopupComponent, {
      width: '400px',
      disableClose: false,

      data: { ...data, isEdit }, // Pass selected row data
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getInvestments(); // Refresh table after edit
      }
    });
  }

  editInvestment(row: any) {
    this.openPopup(row);
  }

  deleteInvestment(row: any) {
    this.dialogService
      .confirm(
        'Delete Investment',
        'Are you sure you want to delete this investment?'
      )
      .subscribe((confirmed) => {
        if (confirmed) {
          this.investmentService.deleteInvestment(row._id).subscribe(
            (res) => {
              this.getInvestments(); // Refresh table
            },
            (error) => {
              console.error('Error deleting investment:', error);
            }
          );
        }
      });
  }
}
