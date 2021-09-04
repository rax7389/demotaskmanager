import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { HttpService ,AuthenticationState,AuthenticationAction, CoreGlobal, ToastService} from '@demoprojects/core';
import { Store } from '@ngrx/store';
@Component({
  selector: 'demoprojects-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private httpServeice: HttpService,
    private toastService: ToastService,
    private store: Store<AuthenticationState>
  ) {}
  boxShadow = true;
  padding = '1.5em';

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
      asyncValidators: {
        uniqueUsername: {
          expression: (control: FormControl) => {
            this.checkUsername(control);
          },
          message: 'This username is already taken.',
        },
      },
    },{
      key: 'password',
      type: 'input',
      templateOptions: {
        label: 'password',
        placeholder: 'Enter password',
        required: true,
      }
    }
  ];
  checkUsername(control) {
    if(control.value) {
      const payload = {
        email : control.value
      }
      this.httpServeice.sendPOSTRequest('http://localhost:3333/User/findByEmail', payload).subscribe((data)=> {
        return data;
      });
    }
  }

  onClickMe() {
    this.httpServeice
      .sendGETRequest('http://localhost:3333/User//findAllUser')
      .subscribe((data) => console.log(data));
  }

  onClickMeAgain() {
    const payload = {
      email: 'testda',
      password: 'test@required@VALID43',
    };
    this.httpServeice
      .sendPOSTRequest('http://localhost:3333/User/verifyUser', payload)
      .subscribe((data: any) => {
        // if (data.result === 'User logged successfully!') {
        //   sessionStorage.setItem('access_token', data.token);
        // }
        if (data.result === 'User logged successfully!') {
          this.store.dispatch(
            new AuthenticationAction().logout(CoreGlobal.LOGIN, data.token)
          );
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
    this.toastService.success('test');
    this.store.dispatch(
      new AuthenticationAction().logout(CoreGlobal.LOGOUT, 0)
    );
  }

  onSubmit() {
    console.log(this.model);
  }
}
