import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { environment } from 'environments/environment';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private _router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem(environment.current_user)) {
      return true;
    } else {
      this._router.navigate([environment.url_login], {
        queryParams: {
          returnUrl: state.url,
        }
      });
      return false;
    }
  }

}
