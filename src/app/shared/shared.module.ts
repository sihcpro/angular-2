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
  ListProductComponent
} from './layout';
import { PricePipe } from './pipes';
import { ShowQuantityPipe } from './pipes/show-quantity.pipe';
import { SearchComponent } from './layout/search/search.component';


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

    SearchComponent

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
