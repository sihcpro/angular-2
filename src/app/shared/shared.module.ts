import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import {
  HeaderComponent,
  FooterComponent,
  CartComponent,
  AsideComponent,
  SliderComponent,
  SingleProductComponent,
  ListProductComponent,
  SearchComponent,
  UserAsideComponent
} from './layout';
import { 
  PricePipe,
  ShowQuantityPipe
} from './pipes';
import { OrderIdPipe } from './pipes/order-id.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [

    HeaderComponent,

    FooterComponent,

    CartComponent,

    AsideComponent,

    SliderComponent,

    SingleProductComponent,

    ListProductComponent,

    PricePipe,

    ShowQuantityPipe,

    SearchComponent,

    UserAsideComponent,

    OrderIdPipe

  ],

  exports: [
    HeaderComponent,
    FooterComponent,
    CartComponent,
    AsideComponent,
    SliderComponent,
    SingleProductComponent,
    ListProductComponent
  ]
})
export class SharedModule { }
