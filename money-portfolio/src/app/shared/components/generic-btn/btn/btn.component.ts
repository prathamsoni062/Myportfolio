import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
  styleUrl: './btn.component.scss'
})
export class BtnComponent {
  @Input() label: string = 'Button'; // Text displayed on the button
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary'; // Material color
  @Input() disabled: boolean = false; // Disable the button
  @Input() icon?: string; // Optional icon name
  @Input() fullWidth: boolean = false; // Full-width button
  @Input() type: 'button' | 'submit' = 'button'; // Button type
  
  @Output() onClick = new EventEmitter<void>(); // Event emitted on button click

  handleClick() {
    if (!this.disabled) {
      this.onClick.emit();
    }
  }
}
