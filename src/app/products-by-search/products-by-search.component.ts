import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/index';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-by-search',
  templateUrl: './products-by-search.component.html',
  styleUrls: ['./products-by-search.component.scss']
})
export class ProductsBySearchComponent implements OnInit {

  key: string = '';
  productList: any[] = [];
  sub: any;

  constructor(
    private _searchService: ProductService,
    private _route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.sub = this._searchService.productList
    .subscribe(
      data => {
        this.productList = data
        console.log('product');
        console.log(this.productList);
      },
      );

    this._route.params
    .subscribe(
      params => {
        this.key = params['key'];
        console.log(this.key);
        this._searchService.searchProduct( this.key );
      }).unsubscribe;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
