import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(price: number = 0): string {
    let number_read = "" + (price % 1000).toFixed(2);
    while (price >= 1000) {
      if (price % 1000 < 100)
        number_read = "0" + number_read;
      if (price % 1000 < 10)
        number_read = "0" + number_read;
      if (price % 100 === 0)
        number_read = "0" + number_read;
      price = price - price % 1000;
      price /= 1000;
      number_read = (price % 1000) + "," + number_read;
    }
    return number_read;
  }

}
