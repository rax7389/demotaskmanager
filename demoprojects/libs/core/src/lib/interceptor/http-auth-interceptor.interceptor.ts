import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { isEmpty } from 'lodash';

@Injectable()
export class HttpAuthInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const access_token = sessionStorage.getItem('access_token');
    let modifedHeaders = request;
    if(isEmpty(access_token)){
      modifedHeaders = request.clone({
        headers:request.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('access_token'))
      });
    }
    return next.handle(modifedHeaders);
  }
}
