import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { NotificationService, ApiService } from 'app/shared';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss']
})
export class ConfirmAccountComponent implements OnInit {
  loading: boolean = true;
  confirm_token: string = '';

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _notificationService: NotificationService,
    private _apiService: ApiService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((params: Params) => {
      this.confirm_token = params['confirm_token'];
      console.log(this.confirm_token);
    });
    this._apiService.getUnAuthorticate('/confirms/' + this.confirm_token).subscribe(data => {
      this.loading = false;
      if (data.status == 202) {
        this._notificationService.printSuccessMessage(data.message);
      }
      else if (data.status == 200) {
        this._notificationService.printWarningMessage(data.message);
      }
      else {
        this._notificationService.printErrorMessage(data.message)
      }
      this._router.navigate([environment.url_login]);
    }, error => {
      this._notificationService.printErrorMessage(environment.error_load_data);
      this.loading = false;
    });
  }
}
