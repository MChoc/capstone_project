import { Component, OnInit } from '@angular/core';
import { interval } from "rxjs/internal/observable/interval";
import { startWith, switchMap } from "rxjs/operators";
import { Router } from '@angular/router';

import { DataService } from '../_services/data.service';
import { Transaction } from "../models/transaction.model";
import { TransactionFoodItem } from "../models/transaction-food-item.model"
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-kitchen-home',
  templateUrl: './kitchen-home.component.html',
  styleUrls: ['./kitchen-home.component.css']
})
export class KitchenHomeComponent implements OnInit {

  transactions: Transaction[] = [];
  transactionFoodItems: TransactionFoodItem[] = [];
  foodItems = []
  extras = []
  notes: string[] = []


  constructor(
    private data: DataService,
    private http: HttpClient,
    private router: Router
  ) {
    let loggedOn = window.localStorage.getItem('user');

    if (!loggedOn || JSON.parse(loggedOn)['user_type'] != 'KITCHEN') {
      this.router.navigate(['**']);
    }

    this.data.getItems().subscribe(res => {
      this.foodItems = res;
    })

    this.data.getExtras().subscribe(res => {
      this.extras = res;
    })
  }

  ngOnInit() {
    interval(10000)
      .pipe(
        startWith(0),
        switchMap(() => this.data.getUnpreparedTransactions())
      )
      .subscribe(res => {
        this.transactions = res;
      });

    interval(10000)
      .pipe(
        startWith(0),
        switchMap(() => this.data.getTransactionFoodItems())
      )
      .subscribe(res => {
        this.transactionFoodItems = res;
      });
  }

  onFormSubmit(transaction_id, note_index) {
    let url = 'http://127.0.0.1:5000/api/transaction/' + transaction_id + '/';
    let key = window.localStorage.getItem('key');
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Token ' + key)
    }
    let input = {
      prepared: true,
      kitchen_note: this.notes[note_index]
    };
    this.http.patch(url, input, header).subscribe(res => {
      window.location.reload();
    })
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

  public removeDup(items$: any[], transaction: any, args?: any): any[] {
    let unique = [];
    items$.forEach(element1 => {
      if (element1.transaction == transaction.url) {
        let t = 0;
        unique.forEach(element2 => {
          if (element1['request'] === element2['request'] && this.getFoodItemName(element1.food_item).toString() === 
              this.getFoodItemName(element2.food_item).toString()) {
            if (this.getExtraNames(element1.extras) == this.getExtraNames(element2.extras)) t = t + 1;
          }
        })
        if (t < 1) unique.push(element1);
      }
    })
    return unique;
  }

  public count(element1: any, FoodItems: any, transaction: any): number {
    let t = 0;
    FoodItems.forEach(element2 => {
      if (element2.transaction == transaction.url) {
        if (element1['request'] === element2['request'] && this.getFoodItemName(element1.food_item).toString() === 
            this.getFoodItemName(element2.food_item).toString()) {
          if (this.getExtraNames(element1.extras) == this.getExtraNames(element2.extras)) t = t + 1;
        }
      }
    })
    return t;
  }

  /**
   * Returns extra names as a string for display
   * @param urls urls of extras
   */
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
