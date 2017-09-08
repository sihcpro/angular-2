import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService, NotificationService } from '../../services/index';

@Component({
  selector: 'layout-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  key: string = "";
  model: any = {};

  constructor(
    private router: Router,
    private _searchService: ProductService,
    private _notificationService: NotificationService
    ) { }

  ngOnInit() {
  }

  search = () => {
    if( this.model.key != "" )
    {
      console.log('ok');
      this._searchService.searchProduct(this.model.key)
      this.router.navigate(['/find', this.model.key]);
    }
  }

}
