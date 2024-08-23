import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {

  @Input() label: string = '';  // Label for the input field
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() disabled: boolean = false;

  @Output() valueChange = new EventEmitter<string>();

  // Method to emit the value change event
  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.valueChange.emit(inputElement.value);
  }
}
