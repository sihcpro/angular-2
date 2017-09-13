import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { NotificationService } from './notification.service';
import { ApiService } from './api.service';

@Injectable()
export class OrderService {

  constructor(
    private _apiServer: ApiService,
    private _notificationService: NotificationService
    ) { }

  getOrder = () => {
  }

}
