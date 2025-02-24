import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InvestmentService } from '../../services/investment.service';
import { snackBarType } from 'src/app/shared/enums/sanckbar.enum';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';

@Component({
  selector: 'app-investment-popup',
  templateUrl: './investment-popup.component.html',
  styleUrl: './investment-popup.component.scss'
})
export class InvestmentPopupComponent {
  investmentForm!: FormGroup;
  isEdit = false;
  requestData: any;
  constructor(
    public dialogRef: MatDialogRef<InvestmentPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private investmentService: InvestmentService,
     private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.investmentForm = new FormGroup({
      date: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      amount: new FormControl('', [Validators.required, Validators.min(0)]),
      currentValue: new FormControl('', [Validators.required, Validators.min(0)]),
      // roi: new FormControl('', [Validators.required, Validators.min(0)]),
    });

    // If data is passed to the popup, pre-fill the form
    if (this.data.isEdit) {
      this.investmentForm.patchValue({
        date: this.data.Date,
        type: this.data.Type,
        amount: this.data.Amount,
        currentValue: this.data['Current Value'],
        // roi: this.data.Roi,
      });
    }
  }

  investmentPayload(){
    const formData = this.investmentForm.value;

    // Convert date to valid ISO format (YYYY-MM-DD)
    const formattedDate = formData.date
      ? new Date(formData.date.split('/').reverse().join('-')).toISOString()
      : null;
  
     this.requestData = {
      investmentDate: formattedDate, // Correct date format
      investmentType: formData.type, // Ensure correct property names
      investmentAmount: Number(formData.amount), // Convert to number
      currentValue: Number(formData.currentValue), // Convert to number      
    };

    if (this.data.isEdit && this.data._id) {
      this.requestData._id = this.data._id; // Include ID for updating
    }
  }
  addInvestment(){ 
    this.investmentService.addInvestment(this.requestData).subscribe((res)=>{
      this.snackbar.openSnackBar('Investment Added successfully', snackBarType.SUCCESS);
      this.dialogRef.close(true);
    })
  }

  updateInvestment() {
    this.investmentService.updateInvestment(this.requestData).subscribe((res) => {
      this.snackbar.openSnackBar('Investment updated successfully', snackBarType.SUCCESS);
      this.dialogRef.close(true); // Close the popup and refresh the table
    });
  }
  
  saveInvestment() {
    if (this.investmentForm.valid) {
      this.investmentPayload(); // Ensure requestData is updated
  
      if (this.data.isEdit) {
        this.updateInvestment(); // Call update API if editing
      } else {
        this.addInvestment(); // Call add API if adding new investment
      }
  
      // this.dialogRef.close(true); // Close the popup
    }
  }

  closePopup() {
    this.dialogRef.close(); // Close without saving
  }
}
