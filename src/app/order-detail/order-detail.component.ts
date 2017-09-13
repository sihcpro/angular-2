import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../shared/services/api.service';
import { NotificationService } from '../shared/services/notification.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  all_orders: any;
  order_id: any;

  subOrder: any;

  constructor(
    private _route: ActivatedRoute,
    private _apiServer: ApiService,
    private _notificationService: NotificationService
    ) {
    this._route.params.subscribe(data => {
      this.order_id = data['id'];
    }).unsubscribe();
  }

  ngOnInit() {
    this.getOrderDetail();
  }

  getOrderDetail = () => {
    this.subOrder = this._apiServer.get('/users/orders/'+ this.order_id)
    .subscribe(
      data => {
        this.all_orders = data;
        console.log(data);
      },
      error => this._notificationService.printErrorMessage(error.status)
      );
  }
}
