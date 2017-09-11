import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Http, HttpModule } from '@angular/http';

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
import {
  HeaderComponent,
  FooterComponent,
  CartComponent,
  AsideComponent,
  SliderComponent,
  SingleProductComponent,
  ListProductComponent,
  SearchComponent,

  ApiService,
  JwtService,
  NotificationService,
  AuthenService,
  PagerService,
  CartService,
  AuthGuardService,
  AddCartService,
  ProductService,

  PricePipe,
  ShowQuantityPipe
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

    PricePipe,
    ShowQuantityPipe,
    MakeOrderComponent,
    OrderDetailComponent,
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
    AddCartService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
