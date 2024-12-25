import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-generic-pie-chart',
  templateUrl: './generic-pie-chart.component.html',
  styleUrls: ['./generic-pie-chart.component.scss']
})
export class GenericPieChartComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() label: string[] = ['Red', 'Blue', 'Yellow']; // Labels for the chart
  @Input() data: number[] = [300, 50, 100]; // Data for pie/doughnut charts
  @Input() backgroundColor: string[] = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)']; // Background colors
  @Input() type: string = ''; // Chart type ('pie', 'doughnut', 'line', 'bar')
  @Input() lineChartData: number[] = []; // Data for line chart
  @Input() barChartData: { date: string; Investment: number; expenses: number }[] = []; // Data for bar chart

  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  chart: Chart | null = null;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.createChart(); // Create the chart after view initialization
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type'] || changes['data'] || changes['label'] || changes['lineChartData'] || changes['barChartData']) {
      this.updateChart(); // Update chart if any relevant input changes
    }
  }

  updateChart(): void {
    if (this.chart) {
      this.chart.destroy(); // Destroy existing chart
      this.chart = null;
    }
    this.createChart(); // Recreate chart
  }

  createChart(): void {
    if (!this.canvasRef) {
      console.error('canvasRef is undefined');
      return;
    }

    const ctx = this.canvasRef.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Failed to get canvas context');
      return;
    }

    const config: any = {
      type: this.type,
      data: this.getChartData(),
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: this.getScales(),
        plugins: {
          tooltip: {
            callbacks: {
              label: (tooltipItem: any) => `${tooltipItem.label}: ${tooltipItem.raw}`
            }
          }
        }
      }
    };

    this.chart = new Chart(ctx, config);
  }

  private getChartData(): any {
    if (this.type === 'bar') {
      return {
        labels: this.barChartData.map(item => item.date),
        datasets: [
          {
            label: 'Income',
            data: this.barChartData.map(item => item.Investment),
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'Expenses',
            data: this.barChartData.map(item => item.expenses),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      };
    }

    return {
      labels: this.label,
      datasets: [
        {
          label: this.getChartLabel(),
          data: this.getChartDataForType(),
          backgroundColor: this.getBackgroundColor(),
          borderColor: this.getBorderColor(),
          borderWidth: this.type === 'line' || this.type === 'bar' ? 2 : undefined,
          hoverOffset: this.type === 'pie' || this.type === 'doughnut' ? 4 : undefined
        }
      ]
    };
  }

  private getChartLabel(): string {
    if (this.type === 'pie' || this.type === 'doughnut') {
      return `${this.type.charAt(0).toUpperCase() + this.type.slice(1)} Chart Dataset`;
    }
    if (this.type === 'line') {
      return 'Line Chart Dataset';
    }
    if (this.type === 'bar') {
      return 'Bar Chart Dataset';
    }
    return 'Chart Dataset';
  }

  private getChartDataForType(): number[] {
    if (this.type === 'line') {
      return this.lineChartData;
    }
    if (this.type === 'bar') {
      return []; // Bar chart data is handled separately
    }
    return this.data;
  }

  private getBackgroundColor(): string[] | string {
    if (this.type === 'pie' || this.type === 'doughnut') {
      return this.backgroundColor;
    }
    if (this.type === 'line' || this.type === 'bar') {
      return 'rgba(75, 192, 192, 0.2)';
    }
    return [];
  }

  private getBorderColor(): string | undefined {
    return this.type === 'line' || this.type === 'bar' ? 'rgba(75, 192, 192, 1)' : undefined;
  }

  private getScales(): any {
    if (this.type === 'line' || this.type === 'bar') {
      return {
        x: { display: true },
        y: { display: true }
      };
    }
    return {};
  }
}
