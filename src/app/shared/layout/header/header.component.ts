import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { JwtService } from '../../services/jwt.service';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  auth_token: string;

  constructor(
    private _jwtService: JwtService,
    private _router: Router
  ) {
    // this.auth_token = window.localStorage[`${environment.current_user}`]
  }

  ngOnInit() {

  }

  ngDoCheck() {
    this.auth_token = this._jwtService.getToken();

  }

  logout = () => {
    this._jwtService.destroyToken();
  }

}
