import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/map';

import { NotificationService } from './notification.service';
import { JwtService } from './jwt.service';
import { ApiService } from './api.service';

@Injectable()
export class AuthenService {

  constructor(
    private _http: Http,
    private _apiServer: ApiService,
    private _notificationService: NotificationService
  ) { }

  login = (email: string, password: string) => {
    return this._apiServer.post('/login', { 'email': email, 'password': password });
  }

  logout = () => {
    localStorage.removeItem(environment.current_user);
  }

  isUserAuthenticated = (): boolean => {
    let user = localStorage.getItem(environment.current_user);
    return user != null ? true : false;
  }

  getLoggedUser = (): string => {
    return this.isUserAuthenticated ? localStorage.getItem(environment.current_user) : '';
  }
}
