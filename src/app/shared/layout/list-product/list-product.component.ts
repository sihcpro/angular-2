import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';

import { PagerService } from '../../services/pager.service';

@Component({
  selector: 'layout-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnChanges {

  @Input() allItems: any[] = [];

  nullData: boolean = false;

  pager: any = {};

  pagedItems: any[];

  loading: boolean = true;

  constructor(
    private _pagerService: PagerService
  ) { }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    this.loading = true;
    console.log(this.allItems);
    if (changes.allItems && !changes.allItems.firstChange) {
      this.loading = false;
      console.log(changes.allItems.currentValue.length !== 0);

      if (changes.allItems.currentValue.length !== 0) {
        this.nullData = false;
        this.setPage(1);
        console.log(changes.allItems);
      } else {
        this.nullData = true;
        console.log(changes.allItems);
      }
    } else {
      this.nullData = true;
    }
  }

  setPage = (page: number) => {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this._pagerService.getPager(this.allItems.length, page);
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  ngOnDestroy() {

  }
}
