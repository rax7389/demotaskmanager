  import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    const element: any = document.getElementsByClassName('text-link');
    if (element && element.length > 0) {
      for (let i = 0; i < element.length; i++) {
        element[i].addEventListener('click', () => {
          this.data.observable.next({
            event: 'LINK_CLICK',
            data: element[i].getAttribute('data-value'),
          });
        });
      }
    }
  }

   get IconName() {
    switch (this.data.snackType) {
      case 'success':
        return { type: this.data.snackType, icon: 'check' };
      case 'error':
        return { type: this.data.snackType, icon: 'Warning-Outlined' };
      case 'warn':
        return { type: this.data.snackType, icon: 'warning_outline' };
      case 'info':
        return { type: this.data.snackType, icon: 'info_outline' };
      default:
      return {type: this.data.snackType, icon: 'check'};
    }
  }

  closeSnackbar() {
    this.data.snackBar.dismiss();
    this.data.observable.next({
      event: 'CLOSE_CLICK',
    });
  }

}
