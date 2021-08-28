import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { isEmpty } from 'lodash';
import { catchError, first, mergeMap, retry, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Injectable()
export class HttpAuthInterceptorInterceptor implements HttpInterceptor {
  constructor(private store: Store<any>) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.store.select('authToken').pipe(
      first(),
      mergeMap((authToken) => {
        return this.ngrxAuthStoreHandler(request, next, authToken);
      })
    );
  }

  private ngrxAuthStoreHandler(
    request,
    next,
    authToken
  ): Observable<HttpEvent<unknown>> {
    let modifedHeaders = request;
    if (!isEmpty(authToken) && !isEmpty(authToken[0])) {
      modifedHeaders = request.clone({
        headers: request.headers.set(
          'Authorization',
          'Bearer ' + authToken.toString()
        ),
      });
    }
    return next.handle(modifedHeaders).pipe(
      tap((event) => {
        console.log(event);
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
