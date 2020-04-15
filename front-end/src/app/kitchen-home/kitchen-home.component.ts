import { Component, OnInit } from '@angular/core';
import {interval} from "rxjs/internal/observable/interval";
import {startWith, switchMap} from "rxjs/operators";
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


  constructor(
    private data : DataService,
    private http: HttpClient,
    private router: Router
  ) { 
    let loggedOn = window.localStorage.getItem('user');

    if(!loggedOn || JSON.parse(loggedOn)['user_type'] != 'KITCHEN') {
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
        // console.log(res);
      });
  }

  cooked(transaction_id): void {
    console.log("cooked!");
    let url = 'http://127.0.0.1:5000/api/transaction/' + transaction_id + '/';

    let key = window.localStorage.getItem('key');
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Token ' + key)
    }
    let input = { prepared: true };
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
  public getFoodItemName(url: string): string[]{
    let item_details = []
    for(let item of this.foodItems) {
      if (item['url'] === url) {
        item_details.push(item['name']);

        if(item['size']){
          item_details.push(item['size']);
        }
      }
    }
    return item_details
  }

  public getExtraNames(urls: string[]): string[]{
    let names: string[] = [];
    for(let extra of this.extras){
      if ( urls.indexOf(extra['url']) !== -1) {
        names.push(extra['name']);
      }
    }
    return names
  }

}
