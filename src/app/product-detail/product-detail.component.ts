import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
declare var jQuery: any;
import {
  ApiService,
  NotificationService,
  CartService
} from 'app/shared';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnChanges {
  loading: boolean = true;

  product: any = {};
  productSlug: string = '';
  images: Array<any> = [];
  quantity: any;
  choice: number = 1;

  constructor(
    private _route: ActivatedRoute,
    private _apiService: ApiService,
    private _cartService: CartService,
    private _notificationService: NotificationService
    ) {
    this._route.queryParams.subscribe(data => {
      this.productSlug = data['name'];
    })
  }

  ngOnChanges() {
    this._route.queryParams.subscribe(data => {
      this.productSlug = data['name'];
    });
    this._apiService.get('/products/' + this.productSlug)
    .subscribe(data => {
      this.product = data;
      this.images = this.product.product_images;
      this.loading = false;
    }, err => {
      this._notificationService.printErrorMessage(environment.error_load_data);
    });
  }

  ngOnInit() {
    this.getData();

    jQuery("#hot").carouFredSel({
      auto: !1, prev: "#prev_hot", next: "#next_hot", mousewheel: !1, swipe: {
        onMouse: !0, onTouch: !0
      }
      , responsive: !0, width: "100%", height: "variable", scroll: 1, items: {
        width: 270, height: "variable", visible: {
          min: 1, max: 1
        }
      }
    });
  }

  subData: any;
  getData = () => {
    this.subData = this._apiService.getUnAuthorticate('/products/' + this.productSlug)
    .subscribe(data => {
      this.product = data;
      console.log(this.product);
      this.images = this.product.product_images;
      this.loading = false;
      this.quantity = Array(Math.min(this.product.quantity_stock, 10)).fill(1).map((x,i)=>i);
      console.log(this.quantity);
    }, err => {
      this._notificationService.printErrorMessage(environment.error_load_data);
    });
  }

  addCart = () => {
    console.log(this.choice);
    if( this.choice <= this.product.quantity_stock && this.choice !== 0 ) {
      console.log('ok');
      this._cartService.createQuantity(this.product.slug, this.choice);
    }
  }

  onChange(quantity) {
    this.choice = Math.min(quantity.target.value, this.product.quantity_stock);
  }

  ngOnDestroy() {
    this.subData.unsubscribe();
  }
}
