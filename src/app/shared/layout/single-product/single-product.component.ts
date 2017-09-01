import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'layout-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {
  
  @Input() product: any;

  constructor() { }

  ngOnInit() {
  }

}
