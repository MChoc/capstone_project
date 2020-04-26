import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { DataService } from '../_services/data.service';
import { Transaction } from "../models/transaction.model";
import { TransactionFoodItem } from "../models/transaction-food-item.model"


@Component({
  selector: 'app-waiter-order',
  templateUrl: './waiter-order.component.html',
  styleUrls: ['./waiter-order.component.css']
})
export class WaiterOrderComponent implements OnInit {

  id: string;
  transactionFoodItems: TransactionFoodItem[] = [];
  foodItems = [];
  extras = [];
  transaction: Transaction;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    private data: DataService,
    private http: HttpClient,
  ) {

    let loggedOn = window.localStorage.getItem('user');

    if (!loggedOn || JSON.parse(loggedOn)['user_type'] != 'WAITER') {
      this.router.navigate(['**']);
    }
    this._Activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
    })

    this.data.getTransactionDetails(this.id).subscribe(data => {
      this.transactionFoodItems = data;
    })

    this.data.getItems().subscribe(data => {
      this.foodItems = data;
    })

    this.data.getExtras().subscribe(data => {
      this.extras = data;
    })

    this.data.getTransaction(this.id).subscribe(data => {
      this.transaction = data;
    })

  }

  ngOnInit(): void {

  }

  pickup(): void {
    let input = { 'active': false };

    let url = 'http://127.0.0.1:5000/api/transaction/' + this.id + '/';

    let key = window.localStorage.getItem('key')
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Token ' + key)
    }
    this.http.patch(url, input, header).subscribe(res => {
      this.router.navigate(['/waiter']);
    })
  }

  back(): void {
    this.router.navigate(['/waiter']);
  }

  /**
 * 
 * @param url url to get food item name for
 * 
 * returns: array of [item_name, size]
 */
  public getFoodItemName(url: string): string {
    let item_details = []
    for (let item of this.foodItems) {
      if (item['url'] === url) {
        item_details.push(item['name']);

        if (item['size']) {
          item_details.push(item['size']);
        }
      }
    }
    return item_details.join(", ")
  }

  public removeDup(items$: any[], args?: any): any[] {
    let unique = [];
    items$.forEach(element1 => {
      let t = 0;
      unique.forEach(element2 => {
        if (element1['request'] === element2['request'] && this.getFoodItemName(element1.food_item).toString() === 
            this.getFoodItemName(element2.food_item).toString()) {

          if (this.getExtraNames(element1.extras) == this.getExtraNames(element2.extras)) t = t + 1;

        }
      })
      if (t < 1) unique.push(element1);

    })
    return unique;
  }

  public count(element1: any, FoodItems: any): number {
    let t = 0;
    FoodItems.forEach(element2 => {
      if (element1['request'] === element2['request'] && this.getFoodItemName(element1.food_item).toString() === 
          this.getFoodItemName(element2.food_item).toString()) {

        if (this.getExtraNames(element1.extras) == this.getExtraNames(element2.extras)) t = t + 1;

      }

    })
    return t;
  }

  public getExtraNames(urls: string[]): string {
    let names: string[] = [];
    for (let extra of this.extras) {
      if (urls.indexOf(extra['url']) !== -1) {
        names.push(extra['name']);
      }
    }
    return names.join(", ")
  }

}
