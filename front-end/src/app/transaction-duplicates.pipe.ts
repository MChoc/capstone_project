import { Pipe, PipeTransform } from '@angular/core';
import { OrderSuccessComponent } from  './order-success/order-success.component'
@Pipe({
  name: 'transactionDuplicates'
})
export class TransactionDuplicatesPipe implements PipeTransform {

  transform(items$: any[], args?: any): any[] {
    // return items$;
    if(!items$) return [];
        var unique = [];
        items$.forEach( element1 => {
          console.log("loggging ...  ", element1['request']);
          var t = 0;
          unique.forEach(element2 => {
            if (element1['url'] === element2['url'] && element1['request'] === element2['request']) {
              var st1 = [];
              var st2 = [];
              t = t + 1;
              element1.extras.forEach(extra1 => {
                st1.push(extra1.name);
              })
              element2.extras.forEach(extra2 => {
                st2.push(extra2.name);
              })
              if (st1.sort().toString() === st2.sort().toString()) t = t + 1;
            }
          }) 
          if (t < 1) unique.push(element1);
        })
  return unique;
  }
}