import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { CoreModule } from '@demoprojects/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule, } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
       {path: '', pathMatch: 'full', component: LoginComponent}
    ]),
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    CoreModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
  ],
  declarations: [
    LoginComponent
  ],
})
export class LoginModule {}
