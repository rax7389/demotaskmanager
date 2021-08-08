import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpAuthInterceptorInterceptor } from './http-auth-interceptor.interceptor';

export const GLOBAL_INTERCEPTOR = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpAuthInterceptorInterceptor,
    multi: true,
  },
];
