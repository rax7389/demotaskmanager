import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AuthenticationReducer, GLOBAL_INTERCEPTOR,CoreModule } from '@demoprojects/core';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () =>
          import('@demoprojects/login').then((m) => m.LoginModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('@demoprojects/after-login').then((m) => m.AfterLoginModule),
      },
    ]),
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      authToken:AuthenticationReducer.reducer
    }),
    CoreModule
  ],
  providers: [...GLOBAL_INTERCEPTOR],
  bootstrap: [AppComponent],
})
export class AppModule {}
