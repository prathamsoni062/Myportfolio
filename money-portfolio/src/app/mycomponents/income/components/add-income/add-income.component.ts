import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { IncomeService } from '../../services/income.service';
import { snackBarType } from 'src/app/shared/enums/sanckbar.enum';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrl: './add-income.component.scss'
})
export class AddIncomeComponent {

  incomeForm!: FormGroup;
  isEdit = false;
  requestData: any;
  selectedSource: string = '';

  minSelectableDate: Date = new Date(2000, 0, 1); // Jan 1, 2000
  maxSelectableDate: Date = new Date(); // today

  constructor(
    public dialogRef: MatDialogRef<AddIncomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private incomeService: IncomeService,
    private snackbar: SnackbarService
  ) { }
  ngOnInit(): void {
    console.log(this.data);

    this.incomeForm = new FormGroup({
      incomeDate: new FormControl(''),
      incomeSource: new FormControl(''),
      incomeAmount: new FormControl(''),
      frequency: new FormControl(''),
    });

    // If data is passed to the popup, pre-fill the form
    if (this.data.isEdit) {
      this.incomeForm.patchValue({
        incomeDate: new Date(this.data.Date),
        incomeSource: this.data.Source,
        incomeAmount: this.data.Amount,
        frequency: this.data.frequency
      });
      this.selectedSource = this.data.frequency.toLowerCase();
    }
  }

  frequencyOptions = [
    { label: 'One-time', value: 'one-time' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
  ];

  onSourceChange(value: any) {
    // this.selectedSource = value;
    this.incomeForm.get('frequency')?.setValue(value);
  }

  incomePaload() {
    const formData = this.incomeForm.value;
    // Convert date to valid ISO format (YYYY-MM-DD)
    const formattedDate = formData.incomeDate
      ? new Date(formData.incomeDate).toISOString()
      : null;
    this.requestData = {
      incomeReceivedDate: formattedDate,
      incomeSource: formData.incomeSource,
      incomeAmount: Number(formData.incomeAmount),
      frequency: formData.frequency
    };

    if (this.data.isEdit && this.data._id) {
      this.requestData._id = this.data._id; // Include ID for updating
    }
  }

  createIncome() {
    this.incomeService.createIncome(this.requestData).subscribe((res) => {
      this.snackbar.openSnackBar("Income Added successfully", snackBarType.SUCCESS);
      this.dialogRef.close(true);
    });
  }

  updateIncome() {
    this.incomeService.updateIncome(this.requestData).subscribe((res) => {
      this.snackbar.openSnackBar("Income Updated successfully", snackBarType.SUCCESS);
      this.dialogRef.close(true);
    });
  }

  saveincomes() {
    if (this.incomeForm.valid) {
      this.incomePaload();
      if (this.data.isEdit) {
        this.updateIncome();
      } else {
        this.createIncome();
      }
    }
  }

  closePopup() {
    this.dialogRef.close();
  }
}
