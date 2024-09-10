import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarType } from '../../enums/sanckbar.enum';
import { SanckbarComponent } from '../../components/sanckbar/sanckbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) {}

  public openSnackBar(message: string, snackType?: 'pending'|'warning'|'error'|'success'|'', duration: number = 5000) {

const _snackType: string = this.getClassName(snackType ?? '');
    this.snackBar.openFromComponent(SanckbarComponent, {

      duration: duration,
      panelClass: _snackType,
      data:{message: message,snackType: snackType}
    });
  }

getClassName(snackType: string) {
    switch(snackType){
      case snackBarType.SUCCESS:
        return'success-snackbar';
      case snackBarType.ERROR:
        return 'error-snackbar';
      case snackBarType.WARNING:
        return 'warning-snackbar';
      case snackBarType.PENDING:
        return 'pending-snackbar';
      default:
        return'success-snackbar';
    }
  }
}
