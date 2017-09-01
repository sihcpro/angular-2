import { Component, OnInit } from '@angular/core';
import { ApiService, NotificationService } from 'app/shared';
import { environment } from "environments/environment";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loading: boolean = true;

  allProduct: any[] = [];

  constructor(
    private _apiService: ApiService,
    private _notificationService: NotificationService
  ) { }

  ngOnInit() {
    this._apiService.get('/products').
      subscribe(data => {
        this.allProduct = data;
      }, err =>
        this._notificationService.printErrorMessage(err.message)
      ), () => {
        this._notificationService.printErrorMessage(environment.error_load_data);
        this.loading = false;
      }
  }

}
