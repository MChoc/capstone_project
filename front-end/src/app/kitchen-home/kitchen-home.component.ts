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

  transactions: Transaction[];
  transactionFoodItems: TransactionFoodItem[];
  food_items = []


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
      this.food_items = res;
    })
  }

  ngOnInit() {
    interval(10000)
      .pipe(
        startWith(0),
        switchMap(() => this.data.getTransactions())
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
      console.log(res);
      window.location.reload();
    })
  }

  // public getFoodItemName(url: string): string{
  //   for(let item in this.food_items) {
  //     if (item['url'] === url) {
  //       return item['name'];
  //     }
  //   }
  // }

}
