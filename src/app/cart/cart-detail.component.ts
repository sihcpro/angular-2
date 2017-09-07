import { Component, OnInit } from '@angular/core';
import { ApiService, CartService, NotificationService } from 'app/shared';
import { environment } from "environments/environment";

@Component({
  selector: 'app-cart',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss']
})
export class CartDetailComponent implements OnInit {

  loading: boolean = true;

  all_product: any;
  total_price: number = 0.0;

  constructor(
    private _cartService: CartService,
    private _apiService: ApiService,
    private _notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.getData();
  }

  statusQuantity(quantity: number) {
    if (quantity > 5) {
      return "Available";
    }
    else if (quantity > 0) {
      return "Only " + quantity + " in stock!";
    }
    else {
      return "Out of order!";
    }
  }

  easyReadNumber(price: number = 0) {
    let number_read = "" + (price % 1000).toFixed(2);
    while (price >= 1000) {
      if (price % 1000 < 100)
        number_read = "0" + number_read;
      if (price % 1000 < 10)
        number_read = "0" + number_read;
      if (price % 100 === 0)
        number_read = "0" + number_read;
      price = price - price % 1000;
      price /= 1000;
      number_read = (price % 1000) + "," + number_read;
    }
    return number_read;
  }

  changeQuantity(i: number, change: number = 0) {
    let product = this.all_product[i];
    if (product.quantity + change > 0) {
      this._cartService.updateQuantity(product.product_slug, product.quantity + change)
        .subscribe(
        data => {
          if (data.status === 200) {
            product.quantity += change;
            product.subtotal_price_read = this.easyReadNumber(product.quantity * product.price);
            this.total_price += change * product.price;
          } else {
            this._notificationService.printErrorMessage(data.message)
            console.log('data loi: ' + data);

            this.getData();
          }
        },
        error => this._notificationService.printErrorMessage(error.status),
        () => this.loading = false);
    }
    this.all_product[i] = product;
  }

  deleteProduct = (i: number) => {
    this._cartService.deleteProduct(this.all_product[i].product_slug)
      .subscribe(
      data => {
        
        if (data.status === 200) {
          this.total_price -= this.all_product[i].price * this.all_product[i].quantity;
          this.all_product.splice(i, 1);
        } else {
          console.log(data);
          this._notificationService.printErrorMessage(data.message);
          this.getData();
        }
      },
      error => {
        this._notificationService.printErrorMessage(error.status);
      },
      () => this.loading = false);
  }

  private getData = () => {
    this._cartService.get()
      .subscribe(
      data => {
        this.all_product = data;
        this.total_price = 0;
        for (var product of this.all_product) {
          product['price_read'] = this.easyReadNumber(product['price']);
          product['subtotal_price_read'] = this.easyReadNumber(product['price'] * product['quantity']);
          this.total_price += product['price'] * product['quantity'];
        }
      }, err => {

        this._notificationService.printErrorMessage(err.message)
      }
      ), () => {
        this._notificationService.printErrorMessage(environment.error_load_data);
        this.loading = false;
      }
  }
}
