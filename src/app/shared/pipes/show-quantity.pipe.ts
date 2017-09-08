import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showQuantity'
})
export class ShowQuantityPipe implements PipeTransform {

  transform(quantity: number, warn_quantity: number = 5): string {
    if (quantity > warn_quantity) {
      return "Available";
    }
    else if (quantity > 0) {
      return "Only " + quantity + " more!";
    }
    else {
      return "Out of order!";
    }
  }

}
