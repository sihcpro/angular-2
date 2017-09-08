import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { JwtService } from './jwt.service';
import { ApiService } from './api.service';
import { NotificationService } from './notification.service';

@Injectable()
export class ProductService {
  private productListSubject = new BehaviorSubject(<any>[]);
  public productList = this.productListSubject.asObservable().distinctUntilChanged();

  product_list: any;

  linkFindProduct: string = '/find_products';

  constructor(
    private _http: Http,
    private _apiServer: ApiService,
    private _notificationService: NotificationService
  ) { }

  searchProduct = (name: string = ""): any => {
    this._apiServer.get(this.linkFindProduct + '/' + name)
      .subscribe(
      data => {
        if( data.status === 404 ) {
          this.product_list = [];
        }
        else if( data.status === undefined ) {
          this.product_list = data;
          console.log('search');
          console.log(this.product_list);
        }
        this.update();
        return this.product_list;
      },
      error => 
        {
          this._notificationService.printErrorMessage(error.status)
          return [];
        }
      )
  }

  update = () => {
    this.productListSubject.next(this.product_list);
  }
}
