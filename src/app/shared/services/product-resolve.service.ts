import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApiService } from './api.service';

@Injectable()
export class ProductResolveService implements Resolve<any> {
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._apiService.get('/products_by_category')
  }

  constructor( private _apiService: ApiService) { }

}
