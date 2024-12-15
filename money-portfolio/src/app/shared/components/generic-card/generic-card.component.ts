import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-generic-card',
  templateUrl: './generic-card.component.html',
  styleUrl: './generic-card.component.scss'
})
export class GenericCardComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() actionButtonLabel: string | null = null;

  onActionButtonClick() {
    console.log('Action button clicked');
  }
}
