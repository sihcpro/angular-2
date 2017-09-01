import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
declare var jQuery: any;
import {
  ApiService,
  NotificationService
} from 'app/shared';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnChanges {
  product: any = {};
  productSlug: string = '';
  images: Array<any> = [];
  loading: boolean = true;

  constructor(
    private _apiService: ApiService,
    private _route: ActivatedRoute,
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
    this._apiService.getUnAuthorticate('/products/' + this.productSlug)
      .subscribe(data => {
        this.product = data;
        this.images = this.product.product_images;
        this.loading = false;
      }, err => {
        this._notificationService.printErrorMessage(environment.error_load_data);
      });

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
}
