import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService, NotificationService } from 'app/shared';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  loading: boolean = false;
  constructor(
    private _apiService: ApiService,
    private _notificationService: NotificationService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  register = () => {
    this.loading = true;
    let data: any = {
      first_name: this.model.firstName,
      last_name: this.model.lastName,
      email: this.model.email,
      password: this.model.password,
      password_confirmation: this.model.confirmPassword
    };
    this._apiService.post('/register', data).subscribe(data => {
      console.log(data.status);

      if (data.status === 201) {
        this._notificationService.printSuccessMessage(data.message);
        this.loading = false;
        this._router.navigate([environment.url_login]);

      } else if (data.status === 409) {
        data.message.forEach(element => {
          this._notificationService.printErrorMessage(element);
          this.loading = false;
        });
      }
    }, error => {
      this._notificationService.printErrorMessage(environment.error_load_data);
      this.loading = false;
    });
  }

}
