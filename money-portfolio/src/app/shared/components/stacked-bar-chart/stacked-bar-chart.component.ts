import { Component, Input, OnInit } from '@angular/core';
import {
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexPlotOptions,
  ApexDataLabels,
  ApexTooltip,
} from 'ng-apexcharts';

@Component({
  selector: 'app-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.scss'],
})
export class StackedBarChartComponent implements OnInit {
  @Input() chartData: { [key: string]: any }[] = []; // Flexible for any chart data structure
  @Input() xAxisField: string = '';  // Field name for x-axis
  @Input() yAxisField: string = '';  // Field name for y-axis title

  public chartOptions: {
    series: { name: string; data: number[] }[];
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    plotOptions: ApexPlotOptions;
    dataLabels: ApexDataLabels;
    tooltip: ApexTooltip;
    legend: { position: string; horizontalAlign: string };
  };

  constructor() {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
      },
      xaxis: {
        categories: [],
        title: { text: '' },
      },
      yaxis: {
        title: { text: '' }, // Ensure yaxis is initialized
      },
      plotOptions: {
        bar: { horizontal: false, columnWidth: '50%' },
      },
      dataLabels: { enabled: true },
      tooltip: { shared: true, intersect: false },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
      },
    };
  }

  ngOnInit(): void {
    this.updateChartOptions();
  }

  private updateChartOptions(): void {
    if (!this.chartData || this.chartData.length === 0) return;

    const categories = this.chartData.map((d) => d[this.xAxisField]); // Dynamically select x-axis field
    const seriesNames = Object.keys(this.chartData[0]).filter(
      (key) => key !== this.xAxisField
    ); // All fields except xAxisField (to create series)

    this.chartOptions.xaxis.categories = categories;

    // Check if yaxis exists and initialize title text
    if (this.chartOptions.yaxis && this.chartOptions.yaxis.title) {
      this.chartOptions.yaxis.title.text = this.yAxisField;
    }

    // Create series dynamically based on data
    this.chartOptions.series = seriesNames.map((name) => {
      return {
        name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize series names
        data: this.chartData.map((d) => d[name]),
      };
    });
  }
}
