import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any, term: string): any {
    //check if search term is undefined 
    if (term === undefined) return items;
    //return the updated filtered array
    return items.filter(function(item){
      return  item.toLowerCase().inlcude(term.toLowerCase())
      //might not be name NEED TO CHECK and experiment
    })
  }

}
