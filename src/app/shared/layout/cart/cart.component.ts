import { Component, OnInit } from '@angular/core';
import { CartService, NotificationService } from '../../services/index';

@Component({
  selector: 'layout-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  amountProducts: number = 0;

  constructor(
    private _cartService: CartService,
    private _notificationService: NotificationService
  ) { }

  ngOnInit() {
  }

  ngDoCheck() {
    this._cartService.amount
    .subscribe(
      data => {
        this.amountProducts = data;
      });
  }
}
