import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Observe, ResponseType } from '../interface/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  public sendGETRequest(url: string, options?) {
    const finalOptions = { ...this.getDefaultOptions, ...options };
    return this.http.get<unknown>(url, finalOptions);
  }

  public sendPOSTRequest(url: string, payload, options?) {
    const finalOptions = { ...this.getDefaultOptions, ...options };
    return this.http.post<unknown>(url, payload, finalOptions);
  }

  private getDefaultOptions(): Http {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      observe: Observe.BODY,
      params: new HttpParams(),
      reportProgress: false,
      responseType: ResponseType.JSON,
      withCredentials: false,
    };
  }
}
