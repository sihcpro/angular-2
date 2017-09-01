import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class JwtService {

  constructor() { }

  getToken = (): string => {
    return window.localStorage[`${environment.current_user}`];
  }

  saveToken = (token: string) => {
    window.localStorage[`${environment.current_user}`] = token;
  }

  destroyToken = () => {
    window.localStorage.removeItem(`${environment.current_user}`);
  }

}
