import { Component } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {

  users = [
    { InvestmentCategory: 'Stocks', InvestmentAmount: 50000, CurrentValue: 67500, ProfitLoss: 17500, ROI: '35%' },
  { InvestmentCategory: 'Bonds', InvestmentAmount: 30000, CurrentValue: 29400, ProfitLoss: -600, ROI: '-2%' },
  { InvestmentCategory: 'Mutual Funds', InvestmentAmount: 40000, CurrentValue: 46000, ProfitLoss: 6000, ROI: '15%' },
  { InvestmentCategory: 'Real Estate', InvestmentAmount: 30000, CurrentValue: 27000, ProfitLoss: -3000, ROI: '-10%' },
  ];

  columns = ['InvestmentCategory', 'InvestmentAmount', 'CurrentValue', 'ProfitLoss', 'ROI'];
}
