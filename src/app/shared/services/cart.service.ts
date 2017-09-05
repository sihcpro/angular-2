import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/map';

import { NotificationService } from './notification.service';
import { JwtService } from './jwt.service';
import { ApiService } from './api.service';

@Injectable()
export class CartService {

  constructor(
    private _http: Http,
    private _apiServer: ApiService,
    private _notificationService: NotificationService
  ) { }

  get = () => {
    return this._apiServer.get('/users/carts')
  }

  updateQuantity = (product_slug: string, quantity: number) => {
    return this._apiServer.put('/users/carts', {'slug': product_slug, 'quantity': quantity})
  }

  deleteProduct = (product_slug: string) => {
    return this._apiServer.delete('/users/carts', 'slug', product_slug)
  }
}
