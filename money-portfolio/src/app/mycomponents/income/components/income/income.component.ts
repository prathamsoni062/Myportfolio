import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IncomeService } from '../../services/income.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogService } from 'src/app/shared/services/dialog/confirmation-dialog.service';
import { AddIncomeComponent } from '../add-income/add-income.component';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent implements OnInit {
  constructor(
    private incomeService: IncomeService,
    private dialog: MatDialog,
    private dialogService: ConfirmationDialogService
  ) { }

  totalMIncome: number = 0;
  totalAIncome: number = 0;
  incomeForm!: FormGroup;
  btnLabel = 'Add Income';
  incomeData: any;
  // Define the type of users array
  users: any[] = [];
  // Pie Chart Data
pieChartLabels: string[] = [];
pieChartData: number[] = [];

// Line Chart Data
lineChartLabels: string[] = [];
lineChartData:  number[] = [];


  columns = ['Date', 'Source', 'Amount', 'frequency'];

  ngOnInit(): void {
    this.getIncomeData();
    this.incomeForm = new FormGroup({
      totalMIncome: new FormControl(''),
      totalAIncome: new FormControl(''),
    });
  }

  setAllData() {
    this.incomeForm.patchValue({
      totalMIncome: this.incomeData.currentMonthTotal,
      totalAIncome: this.incomeData.totalIncome,
    });
  }

  getIncomeData() {
    this.incomeService.getIncome().subscribe((res) => {
      console.log(res);
      
      this.incomeData = res;
      this.setAllData();
      this.getUser(res);
      this.users= this.incomeData.income.map((income:any)=>({
        _id: income._id,
        Date: new Date(income.incomeReceivedDate).toLocaleDateString(),
        Amount: income.incomeAmount,
        Source: income.incomeSource,
        frequency: income.frequency
      }));
    });
  }

  getUser(res: any) {
    const incomeArray = res.income;

    // === Pie Chart: Income by Source ===
    const sourceMap = new Map<string, number>();
    for (const item of incomeArray) {
      const source = item.incomeSource;
      const amount = item.incomeAmount;
      sourceMap.set(source, (sourceMap.get(source) || 0) + amount);
    }

    this.pieChartLabels = Array.from(sourceMap.keys());
    this.pieChartData = Array.from(sourceMap.values());

    // === Line Chart: Monthly Income Trend ===
    const monthMap = new Map<string, number>();
    for (const item of incomeArray) {
      const date = new Date(item.incomeReceivedDate);
      const monthYear = `${date.toLocaleString('default', { month: 'short' })}-${date.getFullYear()}`;
      monthMap.set(monthYear, (monthMap.get(monthYear) || 0) + item.incomeAmount);
    }

    const sortedEntries = Array.from(monthMap.entries()).sort(
      ([a], [b]) => new Date(a + "-01").getTime() - new Date(b + "-01").getTime()
    );

    this.lineChartLabels = sortedEntries.map(([month]) => month);
    this.lineChartData = sortedEntries.map(([, value]) => value); // ✅ FIXED: simple array of numbers
  }


  openPopup(data:any = null) {
    const isEdit = !!data;
    const dialogRef = this.dialog.open(AddIncomeComponent, {
      width: '400px',
      disableClose: false,
      data: { isEdit, ...data },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.getIncomeData();
      }
    });

  }

  deleteIncome(row:any){
    this.dialogService
      .confirm(
        'Delete Income',
        'Are you sure you want to delete this Income?'
      )
      .subscribe((confirmed) => {
        if (confirmed) {
          this.incomeService.deleteIncome(row._id).subscribe(
            (res) => {
              this.getIncomeData();
            },
            (error) => {
              console.error('Error deleting Income:', error);
            }
          );
        }
      });
  }

  editIncome(row:any){
    this.openPopup(row);
  }

}
