import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { GLOBAL_INTERCEPTOR } from '@demoprojects/core';
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
  ],
  providers: [...GLOBAL_INTERCEPTOR],
  bootstrap: [AppComponent],
})
export class AppModule {}
