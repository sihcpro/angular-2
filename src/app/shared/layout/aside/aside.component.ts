import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/index';

@Component({
  selector: 'layout-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  categories: any;

  constructor(
    private _apiService: ApiService
  ) {
    this._apiService.getUnAuthorticate('/categories')
      .subscribe(data => {
        this.categories = data;
        console.log(this.categories);
      });
  }

  ngOnInit() { }
}
