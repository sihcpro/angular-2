import { Component, OnInit, Input } from '@angular/core';

import { PagerService } from '../../services/pager.service';

@Component({
  selector: 'layout-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  @Input() allItems: any[] = [];

  pager: any = {};

  pagedItems: any[];

  loading: boolean = true;

  constructor(
    private _pagerService: PagerService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      console.log(this.allItems);
      this.setPage(1);
      this.loading = false;
    }, 3000);
  }

  setPage = (page: number) => {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this._pagerService.getPager(this.allItems.length, page);

    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
