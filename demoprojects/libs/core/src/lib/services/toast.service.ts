import { Injectable } from '@angular/core';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { ToastComponent } from '../components/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private subject = new Subject();
  constructor(
    public snackBar: MatSnackBar,
  ) { }

  success(
    message: string,
    duration?: number,
    allowHtml?: boolean
  ) {
    return this.openSnackBar(
      message,
      'success',
      duration,
      allowHtml
    );
  }

  error(
    message: string,
    duration?: number,
    allowHtml ?:boolean
  ) {
    return this.openSnackBar(
      message,
      'error',
      duration,
      allowHtml
    );
  }

  private openSnackBar(
    message: string,
    type: string,
    duration?: number,
    allowHtml?: boolean
  ) {
    const _snackType = type !== undefined ? type : 'success';
      this.snackBar.openFromComponent(ToastComponent, {
        duration: 5*1000,
        data: {
          message: message,
          snackType: _snackType,
        },
      });
  }

}
