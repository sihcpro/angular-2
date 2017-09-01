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
import {
  HeaderComponent,
  FooterComponent,
  CartComponent,
  AsideComponent,
  SliderComponent,
  SingleProductComponent,
  ListProductComponent,
  ApiService,
  JwtService,
  NotificationService,
  AuthenService,
  PagerService
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
    ProductsByCategoryComponent
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
    PagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
