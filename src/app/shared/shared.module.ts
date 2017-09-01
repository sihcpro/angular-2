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

    ListProductComponent

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
