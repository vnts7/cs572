import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multi'
})
export class MultiPipe implements PipeTransform {

  transform(value: string, m:number): any {
    let r = '';
    for (let i = 0; i < m; i++) r += value + ' ';
    return r;
  }

}
