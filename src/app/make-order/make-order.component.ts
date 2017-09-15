import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

import { 
  CartService,
  NotificationService,
  ApiService,
  AuthenService
} from 'app/shared';

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.scss']
})
export class MakeOrderComponent implements OnInit {

  loading: boolean = false;
  check_user: boolean = true;
  enoughInfo: boolean = false;  // After update
  lockUpdate: boolean = true;
  allowOrder: boolean = false;  // After confirm info
  textSubTotal: string = 'Loading';

  user: any = {};
  all_product: any;
  total_quantity: number = 0;
  total_price: number = 0;

  subUser: any;
  subCart: any;

  constructor(
    private _authenService: AuthenService,
    private _apiService: ApiService,
    private _notificationService: NotificationService,
    private _router: Router,
    private _cartService: CartService,
    ) { }

  ngOnInit() {
    this.getUser();
    this.getCart();
  }

  checkUser = () => {
    if( this.user.phone === null || this.user.address === null ) {
      this.enoughInfo = false;
      this.lockUpdate = false;
    }
    else {
      this.enoughInfo = true;
      this.lockUpdate = true;
    }
  }

  updateAccount = () => {
    this.allowOrder = false;
    if( this.lockUpdate )
      this.lockUpdate = false;
    else {
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
        if (data.status === 202) {
          this._notificationService.printSuccessMessage('Update success!');
          this.loading = false;
          this.lockUpdate = true;
          this.getUser();
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

  exitUpdate = () => {
    this.lockUpdate = true;
    this.allowOrder = false;
  }

  makeOrder = () => {
    // console.log('check_user = ' + this.check_user);
    // console.log('enoughInfo = ' + this.enoughInfo);
    // console.log('allowOrder = ' + this.allowOrder);
    // console.log('lockUpdate = ' + this.lockUpdate);
    // console.log('user');
    // console.log(this.user);
    // if( !this.lockUpdate )
    //   this.lockUpdate = true;
    // else
    //   console.log('Dat hang nhe!');

    if( this.total_quantity === 0 ) {
      this._router.navigate(['/']);
    }
    else {
      if( this.allowOrder == false )
        this.allowOrder = true;
      else {
        this.order();
      }
    }
  }

  private order = () => {
    this._apiService.post('/users/orders')
    .subscribe(
      data => {
        if( data.status === 200 ) {
          this._notificationService.printSuccessMessage('Order succeed!');
          this._cartService.orderSuccess();
          this._router.navigate(['order/'+ data.order_id]);
        }
        else {
          this._notificationService.printErrorMessage(data.message);
        }
      },
      error => {
        console.log('sida roi!');
      });
  }

  private getUser = () => {
    this.subUser = this._apiService.get('/users')
    .subscribe(
      data => {
        if( data.status === undefined ) {
          this.user = data;
          console.log(data);
          this.checkUser();
        }
        this.check_user = false;
      });
  }

  private getCart = () => {
    this.loading = true;
    this.subCart = this._cartService.allProducts
    .subscribe(
      data => {
        if( data.status === undefined ) {
          this.all_product = data;
          this.total_quantity = this._cartService.amount_products;
          this.total_price = this._cartService.total_price;
        }
        this.loading = false;
      },
      error => {
        this.all_product = null;
        this.loading = false;
      });
  }

  buttonUserInfo(): string {
    if( this.lockUpdate )
      return 'Edit';
    else
      return 'Update'
  }

  buttonSubtotal(): string {
    if( this.check_user )
      return 'Loading...';
    else if( !this.lockUpdate || !this.enoughInfo )
      return 'Update user info';
    else if( this.total_quantity === 0 )
      return 'Back to home';
    else if( this.enoughInfo && this.lockUpdate && !this.allowOrder )
      return 'Confirm user delivery';
    else if( this.allowOrder )
      return 'Make order';
    else
      return '...';
  }

  ngOnDestroy() {
    this.subCart.unsubscribe();
    this.subUser.unsubscribe();
  }
}
