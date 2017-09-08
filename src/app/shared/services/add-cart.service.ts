import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/map';

import { NotificationService } from './notification.service';
import { JwtService } from './jwt.service';
import { ApiService } from './api.service';

@Injectable()
export class AddCartService {

  amountProduct: number = 0;

  constructor(
    private _http: Http,
    private _apiServer: ApiService,
    private _notificationService: NotificationService
    ) {
    this.count();
  }

  count = () => {
    this._apiServer.get('/users/carts/count')
    .subscribe(
      data => {
        if( data.status === 200 ) {
          this.amountProduct = data.amount;
        }
        else {
          this.amountProduct = 0;
        }
      },
      error => {
        this.amountProduct = 0;
      });
  }

  getAmount = (): number => {
    return this.amountProduct;
  }

  addNewProduct = (product_slug: string = "") => {
    this.amountProduct++;
    return this._apiServer.post('/users/carts', {'slug': product_slug})
  }

  addProductSuccess = (amount: number = 1) => {
    this.amountProduct += amount;
  }

}
