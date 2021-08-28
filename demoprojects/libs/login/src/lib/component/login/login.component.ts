import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { HttpService ,AuthenticationState,AuthenticationAction, CoreGlobal} from '@demoprojects/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'demoprojects-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private httpServeice: HttpService,
    private store: Store<AuthenticationState>
  ) {}

  form = new FormGroup({});
  model = { email: 'email@gmail.com' };
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
      },
    },
  ];

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
    console.log(this.model);
    this.store.dispatch(
      new AuthenticationAction().logout(CoreGlobal.LOGOUT, 0)
    );
  }

  onSubmit() {
    console.log(this.model);
  }
}
