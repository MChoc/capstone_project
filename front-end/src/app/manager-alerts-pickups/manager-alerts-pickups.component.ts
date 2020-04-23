import { Component, OnInit } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { TransactionFoodItem } from '../models/transaction-food-item.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../_services/data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manager-alerts-pickups',
  templateUrl: './manager-alerts-pickups.component.html',
  styleUrls: ['./manager-alerts-pickups.component.css']
})
export class ManagerAlertsPickupsComponent implements OnInit {
  transaction$: Transaction;
  id: string;
  transactionFoodItems: TransactionFoodItem[] = [];
  foodItems = [];
  extras = [];

  constructor(
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    private data : DataService,
    private http: HttpClient,
  ) {

    let loggedOn = window.localStorage.getItem('user');

    if(!loggedOn || JSON.parse(loggedOn)['user_type'] != 'MANAGER') {
      this.router.navigate(['**']);
    }
    this._Activatedroute.paramMap.subscribe(params => { 
      this.id = params.get('id');
      this.data.getTransaction(this.id).subscribe(data => {
        this.transaction$ = data;
        console.log(this.transaction$);
      });
    })

    this.data.getTransactionFoodItems().subscribe(data => {
      this.transactionFoodItems = data;
    })

    this.data.getItems().subscribe(data => {
      this.foodItems = data;
    })

    this.data.getExtras().subscribe(data => {
      this.extras = data;
    })

  }

  ngOnInit(): void {
  }

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
      if (element1.transaction == this.transaction$.url) {
      var t = 0;
      unique.forEach(element2 => {
        if (element1['request'] === element2['request'] && this.getFoodItemName(element1.food_item).toString() === this.getFoodItemName(element2.food_item).toString()) {
          // var st1 = [];
          // var st2 = [];
          if (this.getExtraNames(element1.extras) == this.getExtraNames(element2.extras)) t = t + 1;
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
    }
    })
return unique;
}

public count(element1: any, FoodItems: any): number {
var t = 0;
      FoodItems.forEach(element2 => {
        if (element2.transaction == this.transaction$.url) {
        if (element1['request'] === element2['request'] && this.getFoodItemName(element1.food_item).toString() === this.getFoodItemName(element2.food_item).toString()) {
          // var st1 = [];
          // var st2 = [];
          // this.getExtraNames(element1.extras).forEach(extra1 => {
          //   st1.push(extra1);
          // })
          // this.getExtraNames(element2.extras).forEach(extra2 => {
          //   st2.push(extra2);
          // })
          // if (st1.sort().toString() === st2.sort().toString()) t = t + 1;
          if (this.getExtraNames(element1.extras) == this.getExtraNames(element2.extras)) t = t + 1;
        }
      }
      }) 
return t;
}

  public getExtraNames(urls: string[]): string{
    let names: string[] = [];
    for(let extra of this.extras){
      if ( urls.indexOf(extra['url']) !== -1) {
        names.push(extra['name']);
      }
    }
    return names.join(", ")
  }

  back() {
    this.router.navigate(['/management/alerts']);
  }
  
}