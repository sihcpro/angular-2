import { Component, OnInit } from '@angular/core';
import { ApiService, AuthenService, NotificationService } from 'app/shared';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  loading: boolean = false;

  constructor(
    private _authenService: AuthenService,
    private _apiService: ApiService,
    private _notificationService: NotificationService,
    private _router: Router
  ) {
    this._apiService.get('/users').subscribe(data => {
      this.user = data;
    })
  }

  ngOnInit() {
  }

  updateAccount = () => {
    this.loading = true;
    let data: any = {
      first_name: this.user.first_name,
      last_name: this.user.last_name,
      phone: this.user.phone,
      address: this.user.address,
      province: this.user.province,
      zipcode: this.user.zipcode
    };
    this._apiService.put('/users', data).subscribe(data => {
      console.log(data);
      if (data.status == 202) {
        this._notificationService.printSuccessMessage(data.message);
        this.loading = false;
        this._router.navigate([environment.url_profile]);
      }
      else {
        this._notificationService.printErrorMessage(data.message);
        this.loading = false;
      }
    }, error => {
      this._notificationService.printErrorMessage(environment.error_load_data);
      this.loading = false;
    });
  }

}
