import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ExpensesService } from '../services/expenses.service';
import { ExpensesPopupComponent } from './expenses-popup/expenses-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogService } from 'src/app/shared/services/dialog/confirmation-dialog.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'], // Fixed typo `styleUrl`
})
export class ExpensesComponent implements OnInit {
  constructor(private expensesService: ExpensesService,
    private dialog: MatDialog,
    private dialogService: ConfirmationDialogService
  ) {}

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
      currentMonthExpenses: this.expensesData?.currentMonthTotal,
    });
  }

  getExpensesData() {
    this.expensesService.getExpenses().subscribe((res) => {
      this.expensesData = res;

      // Set form data
      this.setAllData();

      // Map expenses to table data
      this.users = this.expensesData.expenses.map((expense: any) => ({
        _id: expense._id,
        Date: new Date(expense.expenseDate).toLocaleDateString(),
        Type: expense.expenseCategory,
        Description: expense.expenseName,
        Amount: expense.expenseAmount,
        paymentMethod: expense.paymentMethod,
        notes:expense.notes
      }));
    });
  }

  openPopup(data: any = null){
    const isEdit = !!data;
    const dialogRef = this.dialog.open(ExpensesPopupComponent, {
      width: '400px',
      disableClose: false,
      data: {...data, isEdit},
    });

    dialogRef.afterClosed().subscribe((result)=>{
      if(result){
        this.getExpensesData();
      }
    })
  }

  editInvestment(row:any){
    this.openPopup(row);
  }
  deleteInvestment(row:any){
    this.dialogService
      .confirm(
        'Delete Investment',
        'Are you sure you want to delete this investment?'
      )
      .subscribe((confirmed) => {
        if (confirmed) {
          this.expensesService.deleteExpenses(row._id).subscribe(
            (res) => {
              this.getExpensesData();
            },
            (error) => {
              console.error('Error deleting investment:', error);
            }
          );
        }
      });
  }
}
