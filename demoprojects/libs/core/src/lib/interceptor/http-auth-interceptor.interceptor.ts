import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { isEmpty } from 'lodash';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable()
export class HttpAuthInterceptorInterceptor implements HttpInterceptor {
  constructor() {
    console.log();
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const access_token = sessionStorage.getItem('access_token');
    let modifedHeaders = request;
    if (!isEmpty(access_token)) {
      modifedHeaders = request.clone({
        headers: request.headers.set(
          'Authorization',
          'Bearer ' + sessionStorage.getItem('access_token')
        ),
      });
    }
    return next.handle(modifedHeaders).pipe(
      tap((event) => {
        console.log(event);
        if (event instanceof HttpResponse) {
          if (event.status === 401) {
            console.log(event.statusText);
          }
        }
      }),
      retry(3),
      catchError(this.handleError)
    );
  }

  private handleError = (
    error: HttpErrorResponse
  ): Observable<HttpEvent<unknown>> => {
    console.log(error);
    if (error.status === 401) {
      this.unAuthroized(error);
    } else if (error.status === 403) {
      this.forbidden(error);
    } else if (error.status === 404) {
      this.notFound(error);
    }
    return throwError(error.error.errorMsg || error);
  };

  private unAuthroized(error: HttpErrorResponse): void {
    alert(error.error.errorMsg);
  }

  private forbidden(error: HttpErrorResponse): void {
    alert(error.error.errorMsg);
  }

  private notFound(error: HttpErrorResponse): void {
    alert(error.error.errorMsg);
  }
}
