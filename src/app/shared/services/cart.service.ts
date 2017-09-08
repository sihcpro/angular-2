import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs';

import { NotificationService } from './notification.service';
import { JwtService } from './jwt.service';
import { ApiService } from './api.service';

@Injectable()
export class CartService {
  private allProductsSubject = new BehaviorSubject(<any>[]);
  public allProducts = this.allProductsSubject.asObservable().distinctUntilChanged();
  private totalPriceSubject = new BehaviorSubject(0.0);
  public totalPrice = this.totalPriceSubject.asObservable().distinctUntilChanged();
  private amountSubject = new BehaviorSubject(0);
  public amount = this.amountSubject.asObservable().distinctUntilChanged();

  all_products: any;
  total_price: number = 0.0;
  amount_products: number = 0;

  constructor(
    private _http: Http,
    private _apiServer: ApiService,
    private _notificationService: NotificationService
    ) {
    this.getProducts();
  }

  readProduct = () => {
    return this.all_products;
  }

  private find = (slug: string) => {
    let d: number = 0;
    for (let product of this.all_products) {
      if( product.product_slug === slug ) {
        return d;
      }
      else d++;
    }
    return -1;
  }

  createQuantity = (slug: string = "", quantity: number = 1) => {
    let i = this.find( slug );
    if( i === -1 ) {
      this._apiServer.post('/users/carts', { 'slug':     slug, 'quantity': quantity })
      .subscribe(
        data => {
          if( data.status === 200 ) {
            this.getProducts();
          } else {
            this._notificationService.printErrorMessage(data.message)
          }
        },
        error => this._notificationService.printErrorMessage(error.status)
        )
    } else {
      this.updateQuantity(i, quantity);
    }
  }

  updateQuantity = (i: number, change: number = 0) => {
    let product = this.all_products[i];
    console.log(product);
    this._apiServer.put('/users/carts', {'slug': product.product_slug, 'quantity': product.quantity+change})
    .subscribe(
      data => {
        if( data.status === 200 ) {
          product.quantity += change;
          product.subtotal_price = product.quantity * product.price;
          this.total_price += change * product.price;
          this.amount_products += change;
          this.update();
        } else {
          this._notificationService.printErrorMessage(data.message)
          this.getProducts();
        }
      },
      error => this._notificationService.printErrorMessage(error.status)
      );
  }

  deleteProduct = (i: number) => {
    let product = this.all_products[i];
    return this._apiServer.delete('/users/carts', 'slug', product.product_slug)
    .subscribe(
      data => {
        if (data.status === 200) {
          this.total_price -= product.price * product.quantity;
          this.amount_products -= product.quantity;
          this.all_products.splice(i, 1);
          this.update();
        } else {
          this._notificationService.printErrorMessage(data.message);
          this.getProducts();
        }
      },
      error => this._notificationService.printErrorMessage(error.status)
      );
  }

  private getProducts = () => {
    this._apiServer.get('/users/carts')
    .subscribe(
      data => {
        this.all_products = data;
        this.total_price = 0.0;
        this.amount_products = 0;
        // console.log(this.all_products);
        for (var product of this.all_products) {
          product['subtotal_price'] = product.price * product.quantity;
          this.total_price += product.subtotal_price;
          this.amount_products += product.quantity;
        }
        this.update();
      }, err => {
        this._notificationService.printErrorMessage(err.message)
      }
      ), () => {
      this._notificationService.printErrorMessage(environment.error_load_data);
    }
  }

  private update = () => {
    this.allProductsSubject.next(this.all_products);
    this.totalPriceSubject.next(this.total_price);
    this.amountSubject.next(this.amount_products);
  }
}
