import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-generic-select',
  templateUrl: './generic-select.component.html',
  styleUrl: './generic-select.component.scss'
})
export class GenericSelectComponent {
  @Input() label: string = 'Select';
  @Input() options: { label: string; value: string | number }[] = [];
  @Input() selectedValue: string | number | null = null;
  @Output() valueChange = new EventEmitter<string | number>();

  onChange(value: string | number) {
    this.valueChange.emit(value);
  }
}