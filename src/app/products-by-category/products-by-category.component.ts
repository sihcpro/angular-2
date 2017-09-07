import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from "app/shared";

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.scss']
})
export class ProductsByCategoryComponent implements OnInit {

  loading: boolean = true;
  categorySlug: string = '';
  productList: any[] = [];
  sub: any;
  constructor(
    private _apiService: ApiService,
    private _route: ActivatedRoute

  ) { }

  ngOnInit() {
    this.sub = this._route.params.subscribe(params => {
      this.categorySlug = params['slug'];
      // console.log(this.categorySlug);

      this._apiService.get('/products_by_categories/' + this.categorySlug)
        .subscribe(data => {
          this.productList = data;
          // console.log(this.productList);

        });
    });
  }

  onDestroy() {
    this.sub.unsubcribe();
  }
}
