import { Component, OnInit } from '@angular/core';
import { CartService, NotificationService, ApiService } from 'app/shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss']
})
export class CartDetailComponent implements OnInit {

  loading: boolean = true;
  check_user: boolean = true;
  all_product: any;
  total_price: number = 0.0;
  user: any;

  subData: any;
  subTotal: any;
  subUser: any;

  constructor(
    private _router: Router,
    private _apiService: ApiService,
    private _cartService: CartService,
    private _notificationService: NotificationService
    ) { }

  ngOnInit() {
    this.getData();
    this.getTotalPrice();
    this.checkUser();
  }

  changeQuantity(i: number, change: number = 0) {
    let product = this.all_product[i];
    if(product.quantity + change > 0 && product.quantity + change <= product.quantity_stock) {
      this._cartService.updateQuantity(i, change);
      this.loading = false;
    }
  }

  deleteProduct = (i: number) => {
    this._cartService.deleteProduct(i);
    this.loading = false;
  }

  makeOrder = () => {
    if( this.user === undefined )
      this._router.navigate(['/login']);
    else
      this._router.navigate(['/make-order']);
  }

  private checkUser = () => {
    this.subUser = this._apiService.get('/users')
    .subscribe(
      data => {
        if( data.status === undefined ) {
          this.user = data;
        }
        this.check_user = false;
      });
  }

  private getData = () => {
    this.loading = true;
    this.subData = this._cartService.allProducts
    .subscribe(
      data => {
        if( data.status === undefined ) {
          this.all_product = data;
        }
        this.loading = false;
      },
      error => {
        this.all_product = null;
        this.loading = false;
      });
  }

  private getTotalPrice = () => {
    this.subTotal = this._cartService.totalPrice
    .subscribe(
      data => 
      {
        this.total_price = data;
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.subData.unsubscribe();
    this.subTotal.unsubscribe();
    this.subUser.unsubscribe();
  }
}
