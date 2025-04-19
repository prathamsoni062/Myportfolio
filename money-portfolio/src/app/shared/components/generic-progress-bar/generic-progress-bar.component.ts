import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-generic-progress-bar',
  templateUrl: './generic-progress-bar.component.html',
  styleUrl: './generic-progress-bar.component.scss'
})
export class GenericProgressBarComponent implements OnInit {
  @Input() percentage: number = 0;

  constructor() {}

  ngOnInit(): void {}

  get progressColor(): string {
    if (this.percentage < 30) return 'red';
    if (this.percentage < 70) return 'yellow';
    return 'green';
  }
}