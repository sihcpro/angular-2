import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/index';

@Component({
  selector: 'layout-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  categories: any;
  sub: any;

  constructor(
    private _apiService: ApiService
  ) { }

  ngOnInit() {
    this.sub = this._apiService.getUnAuthorticate('/categories')
      .subscribe(data => {
        this.categories = data;
        console.log(this.categories);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
