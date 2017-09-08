import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { JwtService } from './jwt.service';
import { NotificationService } from './notification.service';

@Injectable()
export class ApiService {

  private header: Headers;

  constructor(
    private _http: Http,
    private _router: Router,
    private _jwtServer: JwtService,
    private _notificationService: NotificationService
  ) { }

  get = (url: string): Observable<any> => {
    return this._http.get(environment.api_url + url, this.jwt())
      .catch(this.handleError)
      .map(this.extractData);
  }

  getUnAuthorticate = (url: string) => {
    return this._http.get(environment.api_url + url)
      .map(this.extractData);
  }

  post = (url: string, data?: any): Observable<any> => {
    console.log('ok');
    return this._http.post(environment.api_url + url, data, this.jwt())
      .catch(this.handleError)
      .map(this.extractData);
  }

  put = (url: string, data?: any): Observable<any> => {
    return this._http.put(environment.api_url + url, data, this.jwt())
      .catch(this.handleError)
      .map(this.extractData);
  }

  delete = (url: string, key: string, id: string): Observable<any> => {
    return this._http.delete(`${environment.api_url}${url}?${key}=${id}`, this.jwt())
      .catch(this.handleError)
      .map(this.extractData);
  }

  private getHeaders() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

  private extractData = (res: Response) => {
    return res.json() || {};
  }

  private handleError = (error: any) => {
    let errMsg = error.message || environment.error_load_data;
    this._notificationService.printErrorMessage(environment.error_connect_to_server + error.status);
    return Observable.throw(errMsg);
  }

  private jwt() {
    let auth_token = this._jwtServer.getToken();
    if (auth_token) {
      let headers = new Headers({ 'auth-token': auth_token });
      return new RequestOptions({ headers: headers });
    }
  }


}