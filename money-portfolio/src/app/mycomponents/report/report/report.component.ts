import { Component } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {
  
    monthlyInvestmentData = [
      { month: '2024-01', stocks: 10000, bonds: 5000, realEstate: 0, mutualFunds: 8000 },
      { month: '2024-02', stocks: 12000, bonds: 3000, realEstate: 5000, mutualFunds: 7000 },
      { month: '2024-03', stocks: 8000, bonds: 7000, realEstate: 2000, mutualFunds: 6000 },
    ];
  
    roiComparisonData = [
      { investmentType: 'Stocks', roi: 15.5 },
      { investmentType: 'Bonds', roi: 5.2 },
      { investmentType: 'Mutual Funds', roi: 12.0 },
      { investmentType: 'Real Estate', roi: 20.3 },
    ];
  
  

  users = [
    { InvestmentCategory: 'Stocks', InvestmentAmount: 50000, CurrentValue: 67500, ProfitLoss: 17500, ROI: '35%' },
  { InvestmentCategory: 'Bonds', InvestmentAmount: 30000, CurrentValue: 29400, ProfitLoss: -600, ROI: '-2%' },
  { InvestmentCategory: 'Mutual Funds', InvestmentAmount: 40000, CurrentValue: 46000, ProfitLoss: 6000, ROI: '15%' },
  { InvestmentCategory: 'Real Estate', InvestmentAmount: 30000, CurrentValue: 27000, ProfitLoss: -3000, ROI: '-10%' },
  ];

  columns = ['InvestmentCategory', 'InvestmentAmount', 'CurrentValue', 'ProfitLoss', 'ROI'];
}
