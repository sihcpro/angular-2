import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderId'
})
export class OrderIdPipe implements PipeTransform {

  transform(id: number = 0): string {
    let s: string = id.toString();
    while( s.length < 8 ) {
      s = '0' + s;
    }
    s = '#' + s;
    return s;
  }

}
