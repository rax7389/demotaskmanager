import { Component, OnInit } from '@angular/core';
import { HttpService, ToastService } from '@demoprojects/core';

@Component({
  selector: 'demoprojects-after-login',
  templateUrl: './after-login.component.html',
  styleUrls: ['./after-login.component.scss']
})
export class AfterLoginComponent implements OnInit {

  constructor(
    private httpService: HttpService,
    private toastService: ToastService,) { }

  ngOnInit(): void {
  }

}
