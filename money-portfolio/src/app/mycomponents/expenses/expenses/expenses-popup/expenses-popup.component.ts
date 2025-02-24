import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';
import { ExpensesService } from '../../services/expenses.service';
import { snackBarType } from 'src/app/shared/enums/sanckbar.enum';

@Component({
  selector: 'app-expenses-popup',
  templateUrl: './expenses-popup.component.html',
  styleUrl: './expenses-popup.component.scss',
})
export class ExpensesPopupComponent {
  expensesForm!: FormGroup;
  isEdit = false;
  requestData: any;
  constructor(
    public dialogRef: MatDialogRef<ExpensesPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private expensesService: ExpensesService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {    
    this.expensesForm = new FormGroup({
      expenseDate: new FormControl('', Validators.required),
      expenseCategory: new FormControl('', Validators.required),
      expenseName: new FormControl('', Validators.required),
      expenseAmount: new FormControl('', [Validators.required, Validators.min(0)]),
      paymentMethod: new FormControl('', Validators.required),
      notes: new FormControl(''),
    });

    // If data is passed to the popup, pre-fill the form
    if (this.data.isEdit) {
      this.expensesForm.patchValue({
        expenseDate: this.data.Date,
        expenseCategory: this.data.Type,
        expenseName: this.data.Description,                
        expenseAmount: this.data.Amount,
        paymentMethod: this.data.paymentMethod,
        notes: this.data.notes
      });
    }
  }

  expensesPayload(){
    const formData = this.expensesForm.value;

    // Convert date to valid ISO format (YYYY-MM-DD)
    const formattedDate = formData.expenseDate
      ? new Date(formData.expenseDate.split('/').reverse().join('-')).toISOString()
      : null;
  
     this.requestData = {
      expenseDate: formattedDate, 
      expenseCategory:formData.expenseCategory,
      expenseName: formData.expenseName, 
      expenseAmount: Number(formData.expenseAmount), 
      paymentMethod: formData.paymentMethod, 
      notes: formData.notes
    };

    if (this.data.isEdit && this.data._id) {
      this.requestData._id = this.data._id; // Include ID for updating
    }
  }

  createExpenses(){
    this.expensesService.createExpenses(this.requestData).subscribe((res)=>{
      this.snackbar.openSnackBar('Expenses saved successfully', snackBarType.SUCCESS);
      this.dialogRef.close(true); // Pass form data back
    })
  }

  updateExpenses(){
    this.expensesService.updateExpenses(this.requestData).subscribe((res)=>{
      this.snackbar.openSnackBar('Expenses updated successfully', snackBarType.SUCCESS);
      this.dialogRef.close(true); // Pass form data back
    })
  }

  saveExpenses(){
    if(this.expensesForm.valid){
      this.expensesPayload();
      if(this.data.isEdit){
        this.updateExpenses();
      }else{
        this.createExpenses();
      }

    }
    
  }
  closePopup(){
    this.dialogRef.close();
  }
}
