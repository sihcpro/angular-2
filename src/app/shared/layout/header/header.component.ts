import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { JwtService } from '../../services/jwt.service';
import { ApiService } from '../../services/index';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  auth_token: string;
  categories: Array<any> = [];
  categories_array = [0,1,2];

  categoriesSub: any;

  constructor(
    private _jwtService: JwtService,
    private _router: Router,
    private _apiService: ApiService
  ) {
    // this.auth_token = window.localStorage[`${environment.current_user}`]
  }

  ngOnInit() {
    this.categoriesSub = this._apiService.getUnAuthorticate('/categories')
      .subscribe(data => {
        this.categories = data;
        this.categories_array = [1, 1, 1];
        console.log(this.categories);
      });
  }

  ngDoCheck() {
    this.auth_token = this._jwtService.getToken();

  }

  logout = () => {
    this._jwtService.destroyToken();
  }

}
