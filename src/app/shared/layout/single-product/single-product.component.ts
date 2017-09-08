import { Component, OnInit, Input } from '@angular/core';
import { CartService, NotificationService } from '../../services/index';

@Component({
  selector: 'layout-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

  @Input() product: any;

  loading: boolean = true;

  constructor(
    private _cartService: CartService,
    private _notificationService: NotificationService
    ) { }

  ngOnInit( ) { }

  addCart = (product_slug: string = "") => {
    this._cartService.createQuantity(product_slug);
  }

}
