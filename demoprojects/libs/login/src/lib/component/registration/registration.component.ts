import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from "@angular/material/dialog";
import { HttpService, ToastService } from '@demoprojects/core';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'demoprojects-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RegistrationComponent>,
    private httpService: HttpService,
    private toastService: ToastService,
  ) { }

  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'firstname',
      type: 'input',
      templateOptions: {
        label: 'first name',
        placeholder: 'Enter first name',
        required: true,
      },
    },{
      key: 'lastname',
      type: 'input',
      templateOptions: {
        label: 'last name',
        placeholder: 'Enter last name',
        required: true,
      }
    },
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
        placeholder: 'Enter password',
        required: true,
      }
    }
  ];

  ngOnInit(): void {
  }

  createNew() {
    const payload = {
      'password': this.model.password,
      'firstname': this.model.firstname,
      'lastname': this.model.lastname,
      'email': this.model.email
    }
    this.httpService
      .sendPOSTRequest('http://localhost:3333/User/createUser', payload)
      .subscribe((data: any) => {
        if(data.result === "User created successfully!") {
          this.toastService.success("user created successfully");
          this.close();
        } else {
          this.toastService.error("something went wrong");
          this.close();
        }
      });
  }

  close() {
    this.dialogRef.close();
  }
}
