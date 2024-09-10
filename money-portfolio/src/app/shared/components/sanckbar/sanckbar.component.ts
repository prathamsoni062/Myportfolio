import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarData } from '../../interfaces/snackbar-data.interface';
import { SnackBarIcon, snackBarType } from '../../enums/sanckbar.enum';

@Component({
  selector: 'app-sanckbar',
  templateUrl: './sanckbar.component.html',
  styleUrl: './sanckbar.component.scss',
})
export class SanckbarComponent {
  iconName: string = '';
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public snackBarData: SnackBarData,
    public snackbar: MatSnackBar
  ) {
    this.getIconName(snackBarData);
  }

  getIconName(snackBarData: SnackBarData) {
    switch (snackBarData?.snackType) {
      case snackBarType.ERROR:
        this.iconName = SnackBarIcon.ERROR;
        return this.iconName;
      case snackBarType.WARNING:
        this.iconName = SnackBarIcon.WARNING;
        return this.iconName;
      case snackBarType.SUCCESS:
        this.iconName = SnackBarIcon.SUCCESS;
        return this.iconName;
      case snackBarType.PENDING:
        this.iconName = SnackBarIcon.PENDING;
        return this.iconName;
      default:
        return SnackBarIcon.SUCCESS;
    }
  }

  closeSnackbar() {
    this.snackbar.dismiss();
  }
}
