import { Component, OnInit } from '@angular/core';

import { ApiService } from '../shared/services/api.service';
import { NotificationService } from '../shared/services/notification.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  list_order: any = [];

  subOrder: any;

  constructor(
    private _apiServer: ApiService,
    private _notificationService: NotificationService
    ) {
  }

  ngOnInit() {
    this.getOrders();
  }

  getOrders = () => {
    this.subOrder = this._apiServer.get('/users/orders')
    .subscribe(
      data => {
        console.log(data);
        this.list_order = data;
        data.forEach((d) => {
          d['time'] = new Date( d.created_at );
        })
      },
      error => this._notificationService.printErrorMessage(error.status)
      );
  }
}
