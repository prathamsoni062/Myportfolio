import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  
  value: string = ''; // Internal value

  onChange = (value: any) => {}; // Placeholder function
  onTouched = () => {}; // Placeholder function

  // When value is written from the outside (formControl)
  writeValue(value: any): void {
    this.value = value;
  }

  // Registers the function to be called on value change
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Registers the function to be called on touch
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Handles input changes
  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.value = inputElement.value;
    this.onChange(this.value);
    this.onTouched();
  }
}
