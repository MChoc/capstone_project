import { Component, OnInit, Inject } from '@angular/core';
import {interval} from "rxjs/internal/observable/interval";
import {startWith, switchMap} from "rxjs/operators";
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionDuplicatesPipe } from './../transaction-duplicates.pipe';
import { DataService } from '../_services/data.service';
import { Transaction } from "../models/transaction.model";
import { TransactionFoodItem } from "../models/transaction-food-item.model"

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css'],
  providers: [TransactionDuplicatesPipe]
})
export class OrderSuccessComponent implements OnInit {

  id: String;
  complete: boolean = false;
  transactionFoodItems: TransactionFoodItem[] = [];
  foodItems = [];
  extras = [];
  transaction: Object;
  total_price: number;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    private data : DataService,
  ) { 
    this._Activatedroute.paramMap.subscribe(params => { 
      this.id = params.get('id');
    });
    
    this.data.getTransactionDetails(this.id).subscribe(data => {
      this.transactionFoodItems = data,
      console.log('Transaction data: ', data)
    })

    this.data.getItems().subscribe(data => {
      this.foodItems = data;
    })

    this.data.getExtras().subscribe(data => {
      this.extras = data;
    })

    this.data.getTransaction(this.id).subscribe(data => {
      this.transaction = data;
      this.total_price = data['total_price'];
    })

  }


  ngOnInit(): void {

    interval(10000)
    .pipe(
      startWith(0),
      switchMap(() => this.data.getTransaction(this.id))
    )
    .subscribe(res => {
      // order is complete when it has been marked as inactive by the waiter
      if (res.prepared == true) {
        this.complete = true;
      }
    });
  }

  /**
   * 
   * @param url url to get food item name for
   * 
   * returns: array of [item_name, size]
   */
  public getFoodItemName(url: string): string{
    let item_details = []
    for(let item of this.foodItems) {
      if (item['url'] === url) {
        item_details.push(item['name']);
        if(item['size']){
          item_details.push(item['size']);
        }
      }
    }
    return item_details.join(", ")
  }

  public removeDup(items$: any[], args?: any): any[] {
        var unique = [];
        items$.forEach( element1 => {
            var t = 0;
            unique.forEach(element2 => {
              if (element1['request'] === element2['request'] && this.getFoodItemName(element1.food_item).toString() === this.getFoodItemName(element2.food_item).toString()) {
                // var st1 = [];
                // var st2 = [];
                if (this.getExtraNames(element1.extras) === this.getExtraNames(element2.extras)) t = t + 1;
                // this.getExtraNames(element1.extras).forEach(extra1 => {
                //   st1.push(extra1);
                // })
                // this.getExtraNames(element2.extras).forEach(extra2 => {
                //   st2.push(extra2);
                // })
                // if (st1.sort().toString() === st2.sort().toString()) {
                //   t = t + 1;
                // }
              }
            })  
          if (t < 1) unique.push(element1);
        })
  return unique;
  }

  public count(element1: any, FoodItems: any): number {
    var t = 0;
      FoodItems.forEach(element2 => {
        if (element1['request'] === element2['request'] && this.getFoodItemName(element1.food_item).toString() === this.getFoodItemName(element2.food_item).toString()) {
          if (this.getExtraNames(element1.extras) === this.getExtraNames(element2.extras)) t = t + 1;
        }
      }) 
    return t;
  }


  public getExtraNames(urls: string[]): string {
    let names: string[] = [];
    for(let extra of this.extras){
      if ( urls.indexOf(extra['url']) !== -1) {
        names.push(extra['name']);
      }
    }
    return names.join(", ")
  }

  menu() {
    this.router.navigate(['/'])
  }

}
