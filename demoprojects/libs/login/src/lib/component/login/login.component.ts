import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { HttpService ,AuthenticationState,AuthenticationAction, CoreGlobal, ToastService} from '@demoprojects/core';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RegistrationComponent } from '../registration/registration.component';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'demoprojects-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private httpServeice: HttpService,
    private toastService: ToastService,
    private matDialog: MatDialog,
    private router: Router,
    private store: Store<AuthenticationState>
  ) {}
  boxShadow = true;
  padding = '1.5em';
  componentForDialogs: any;
  dialogRef: any;
  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
      },
    },{
      key: 'password',
      type: 'input',
      templateOptions: {
        label: 'password',
        type: 'password',
        placeholder: 'Enter password',
        required: true,
      }
    }
  ];

  onClickMe() {
    this.httpServeice
      .sendGETRequest('http://localhost:3333/User//findAllUser')
      .subscribe((data) => console.log(data));
  }

  onClickMeAgain(data) {
    // const payload = {
    //   email: 'testda',
    //   password: 'test@required@VALID43',
    // };
    if(!data.email && data.password) {
      return;
    }
    const payload = {
      email: data.email,
      password: data.password,
    };
    console.log(data);
    this.httpServeice
      .sendPOSTRequest('http://localhost:3333/User/verifyUser', payload)
      .subscribe((data: any) => {
        if (data.result === 'User logged successfully!') {
          this.store.dispatch(
            new AuthenticationAction().logout(CoreGlobal.LOGIN, data.token)
          );
          this.router.navigate(['/after-login']);
        } else if (data.result === "No User Found with this email") {
          this.toastService.error("please register first")
        }
      });
  }

  onClickMeAgainAgain() {
    this.httpServeice
      .sendGETRequest('http://localhost:3333/SubTask/findAllSubTask')
      .subscribe((data: any) => {
        console.log(data);
      });
  }

  ngOnInit(): void {
    this.store.dispatch(
      new AuthenticationAction().logout(CoreGlobal.LOGOUT, 0)
    );
  }

  createNew() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '50em';
      dialogConfig.height = '30em';
      dialogConfig.data = {};
      this.matDialog.open(RegistrationComponent, dialogConfig);
  }

  onSubmit() {
    this.onClickMeAgain(this.model);
  }
}
