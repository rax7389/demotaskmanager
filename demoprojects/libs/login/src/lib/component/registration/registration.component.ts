import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from "@angular/material/dialog";
import { HttpService, ToastService } from '@demoprojects/core';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
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
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [{
    validators: {
      validation: [
        { name: 'fieldMatch', options: { errorPath: 'passwordConfirm' } },
      ],
    },
    fieldGroup:[{
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
      asyncValidators: {
          uniqueUsername: {
            expression: (control: FormControl) => {
              return this.checkUsername(control);
            },
            message: 'This username is already taken.',
          },
        },
    },{
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'password',
        placeholder: 'Enter password',
        required: true,
      }
    },{
      key: 'passwordConfirm',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Confirm Password',
        placeholder: 'Please re-enter your password',
        required: true,
      },
    },
  ]
}];

  ngOnInit(): void {
  }

  checkUsername(control) {
    const payload = {
      email : control?.value || ''
    }
    return this.httpService.sendPOSTRequest('http://localhost:3333/User/findByEmail', payload).pipe(
      distinctUntilChanged(),
      debounceTime(1500),
      map((data:any) => {
          return data.result === 'No User Found with this email';
      })
    );
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
