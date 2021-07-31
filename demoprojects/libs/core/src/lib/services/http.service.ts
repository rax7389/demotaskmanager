import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Observe, ResponseType } from '../interface/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public getCallTest(url: string,options?) {
    const finalOptions = {...this.getDefaultOptions, ...options}
    return this.http.get<unknown>(url,finalOptions);
  }

  public postCallTest(url: string,payload,options?) {
    const finalOptions = {...this.getDefaultOptions, ...options}
    return this.http.post<unknown>(url,payload,finalOptions);
  }

  private getDefaultOptions(): Http {
    return {
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      observe: Observe.BODY,
      params:new HttpParams(),
      reportProgress: false,
      responseType:ResponseType.JSON,
      withCredentials:false
    };
  }
}
