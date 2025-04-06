import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-generic-datepicker',
  templateUrl: './generic-datepicker.component.html',
  styleUrl: './generic-datepicker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenericDatepickerComponent),
      multi: true
    }
  ]
})
export class GenericDatepickerComponent implements ControlValueAccessor {
  @Input() label: string = 'Select Date';
  @Input() placeholder: string = 'Choose a date';
  @Input() minDate?: Date;
  @Input() maxDate?: Date;

  selectedDate: Date | null = null;

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.selectedDate = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  handleDateChange(event: any) {
    const value = event.value;
    this.selectedDate = value;
    this.onChange(value); // notify form control
    this.onTouched(); // mark as touched
  }
}
