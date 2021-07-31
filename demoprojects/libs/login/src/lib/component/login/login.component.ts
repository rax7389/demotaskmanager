import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { HttpService } from '@demoprojects/core';

@Component({
  selector: 'demoprojects-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private httpServeice :HttpService
  ) {


  }

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
      }
    }
  ];

  onClickMe(){
    this.httpServeice.getCallTest('http://localhost:3333/User/findAllUser').subscribe((data:any)=> console.log(data));
  }


  ngOnInit(): void {
    console.log(this.model);
  }



  onSubmit() {
    console.log(this.model);
  }


}
