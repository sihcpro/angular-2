import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

import {
  NotificationService,
  AuthenService,
  JwtService
} from "app/shared";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading: boolean = false;
  returnUrl: string;
  auth_token: string = localStorage.getItem(environment.current_user) || '';

  constructor(
    // private authenService: AuthenService,
    private _notificationService: NotificationService,
    private _router: Router,
    private _authenService: AuthenService,
    private _jwtServer: JwtService
  ) { }

  ngOnInit() {
    if (this.auth_token) {
      this._notificationService.printSuccessMessage(environment.logged);
      this._router.navigate([environment.url_home]);
    }
    console.log("===" + this.auth_token + '===');
  }

  login = () => {
    this.loading = true;
    this._authenService.login(this.model.email, this.model.password)
      .subscribe(
      data => {
        if (data.status === 200) {
          this._jwtServer.destroyToken();
          this._jwtServer.saveToken(data.auth_token);
          this._notificationService.printSuccessMessage(environment.login_success);
          this._router.navigate([environment.url_home]);
        } else {
          this._notificationService.printErrorMessage(data.message)
        }
      },
      error => this._notificationService.printErrorMessage(error.status),
      () => this.loading = false);
  }

}
