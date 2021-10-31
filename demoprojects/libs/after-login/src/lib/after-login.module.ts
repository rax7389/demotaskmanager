import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AfterLoginComponent } from './components/after-login/after-login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { CoreModule } from '@demoprojects/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule, } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  imports: [CommonModule,
    RouterModule.forChild([
       {path: '', component: AfterLoginComponent}
    ]),
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    CoreModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule],
  declarations: [
    AfterLoginComponent
  ],
})
export class AfterLoginModule {}
