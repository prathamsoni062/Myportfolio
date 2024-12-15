import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-generic-pie-chart',
  templateUrl: './generic-pie-chart.component.html',
  styleUrls: ['./generic-pie-chart.component.scss']
})
export class GenericPieChartComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() label: string[] = ['Red', 'Blue', 'Yellow'];
  @Input() data: number[] = [300, 50, 100];
  @Input() backgroundColor: string[] = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'];
  @Input() type: string = 'pie'; // Can be 'pie' or 'line'
  @Input() lineChartData: number[] = []; // Data for line chart
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>; // Get a reference to the canvas
  chart: Chart | null = null; // Initialize chart as null

  ngOnInit(): void {
    // No need to create chart here
  }

  ngAfterViewInit(): void {
    this.createChart(); // Create the chart here after the view has initialized
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Check if relevant inputs have changed
    if (changes['type'] || changes['data'] || changes['label'] || changes['lineChartData']) {
      this.updateChart(); // Create or update the chart whenever inputs change
    }
  }

  updateChart(): void {
    // Destroy existing chart if it exists
    if (this.chart) {
      this.chart.destroy();
      this.chart = null; // Reset chart instance to null
    }
    this.createChart(); // Create chart
  }

  createChart(): void {
    // Ensure that canvasRef is defined
    if (!this.canvasRef) {
      console.error('canvasRef is undefined');
      return; // Exit if canvasRef is undefined
    }
  
    const ctx = this.canvasRef.nativeElement.getContext('2d'); // Get the context from canvasRef
  
    if (!ctx) {
      console.error('Failed to get canvas context');
      return; // Exit if context is null
    }
  
    const config: any = {
      type: this.type,
      data: {
        labels: this.label,
        datasets: [{
          label: this.type === 'pie' ? 'Pie Chart Dataset' : 'Line Chart Dataset',
          data: this.type === 'pie' ? this.data : this.lineChartData,
          backgroundColor: this.type === 'pie' ? this.backgroundColor : 'rgba(75, 192, 192, 0.2)',
          borderColor: this.type === 'line' ? 'rgb(75, 192, 192)' : '',
          fill: this.type === 'line' ? false : true,
          borderWidth: this.type === 'line' ? 2 : undefined,
          hoverOffset: this.type === 'pie' ? 4 : undefined
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: this.type === 'line' ? { 
          x: { display: true }, 
          y: { display: true } 
        } : {}
      }
    };
  
    this.chart = new Chart(ctx, config); // Create the chart
  }
}
