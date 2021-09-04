import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AuthenticationReducer, GLOBAL_INTERCEPTOR } from '@demoprojects/core';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';

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
    ]),
    HttpClientModule,

    StoreModule.forRoot({
      authToken:AuthenticationReducer.reducer
    })
  ],
  providers: [...GLOBAL_INTERCEPTOR],
  bootstrap: [AppComponent],
})
export class AppModule {}
