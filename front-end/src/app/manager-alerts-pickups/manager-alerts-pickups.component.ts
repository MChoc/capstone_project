import { Component, OnInit } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { TransactionFoodItem } from '../models/transaction-food-item.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../_services/data.service';

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
    private data: DataService
  ) {

    let loggedOn = window.localStorage.getItem('user');

    if (!loggedOn || JSON.parse(loggedOn)['user_type'] != 'MANAGER') {
      this.router.navigate(['**']);
    }
    this._Activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.data.getTransaction(this.id).subscribe(data => {
        this.transaction$ = data;
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
      if (element1.transaction == this.transaction$.url) {
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

  public count(element1: any, FoodItems: any): number {
    let t = 0;
    FoodItems.forEach(element2 => {
      if (element2.transaction == this.transaction$.url) {
        if (element1['request'] === element2['request'] && this.getFoodItemName(element1.food_item).toString() === 
            this.getFoodItemName(element2.food_item).toString()) {

          if (this.getExtraNames(element1.extras) == this.getExtraNames(element2.extras)) t = t + 1;
        }
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

  back() {
    this.router.navigate(['/management/alerts']);
  }

}