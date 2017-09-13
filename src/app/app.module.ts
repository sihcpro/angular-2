import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsByCategoryComponent } from './products-by-category/products-by-category.component';
import { CartDetailComponent } from './cart/cart-detail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';
import { ProductsBySearchComponent } from './products-by-search/products-by-search.component';
import { MakeOrderComponent } from './make-order/make-order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderListComponent } from './order-list/order-list.component';
import {
  HeaderComponent,
  FooterComponent,
  CartComponent,
  AsideComponent,
  SliderComponent,
  SingleProductComponent,
  ListProductComponent,
  SearchComponent,
  UserAsideComponent,

  ApiService,
  JwtService,
  NotificationService,
  AuthenService,
  PagerService,
  CartService,
  AuthGuardService,
  ProductService,
  OrderService,

  PricePipe,
  ShowQuantityPipe,
  OrderIdPipe
} from './shared';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    AsideComponent,
    SliderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    SingleProductComponent,
    ListProductComponent,
    ProductDetailComponent,
    ProductsByCategoryComponent,
    CartDetailComponent,
    UserProfileComponent,
    ConfirmAccountComponent,
    SearchComponent,
    ProductsBySearchComponent,
    UserAsideComponent,
    MakeOrderComponent,
    OrderDetailComponent,
    OrderListComponent,

    PricePipe,
    ShowQuantityPipe,
    OrderIdPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    // SharedModule
  ],
  providers: [
    ApiService,
    JwtService,
    NotificationService,
    AuthenService,
    PagerService,
    CartService,
    AuthGuardService,
    ProductService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
