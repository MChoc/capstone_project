import { Component, OnInit } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { TransactionFoodItem } from '../models/transaction-food-item.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../_services/data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-resolved-orders',
  templateUrl: './resolved-orders.component.html',
  styleUrls: ['./resolved-orders.component.css']
})
export class ResolvedOrdersComponent implements OnInit {

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

  back() {
    this.router.navigate(['/management/alerts/resolved']);
  }

}
