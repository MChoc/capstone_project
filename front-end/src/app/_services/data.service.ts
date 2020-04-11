import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Transaction} from "../models/transaction.model";
import {Observable} from "rxjs/internal/Observable";
import { TransactionFoodItem } from '../models/transaction-food-item.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userList = 'http://127.0.0.1:5000/api/accounts/';
  private menuList = 'http://127.0.0.1:5000/api/menus/';
  private extraList = 'http://127.0.0.1:5000/api/extra/';
  private categoryList = 'http://127.0.0.1:5000/api/categories/';
  private itemList = 'http://127.0.0.1:5000/api/food_items/';
  private transactionList = 'http://127.0.0.1:5000/api/transaction/';
  private transactionFoodItemList = 'http://127.0.0.1:5000/api/transaction_food_item/';
  private requestList = 'http://127.0.0.1:5000/api/assistance/';

  constructor(private http: HttpClient) { }

  getUsers() {
    let key = window.localStorage.getItem('key');
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Token ' + key)
    }
    
    return this.http.get(this.userList, header);
  }

  getMenus() {
    return this.http.get<any[]>(this.menuList);
  }

  getExtras() {
    return this.http.get<any[]>(this.extraList);
  }

  getCategories() {
    return this.http.get<any[]>(this.categoryList);
  }

  getCategory(id) {

    let url = this.categoryList + id + '/';
    return this.http.get(url);
  }

  getItems() {
    return this.http.get<any[]>(this.itemList);
  }

  getItem(id: string) {
    let url = this.itemList + id + '/';
    return this.http.get(url);
  }

  getTransactions(): Observable<Transaction[]> {

    let key = window.localStorage.getItem('key')
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Token ' + key)
    }

    return this.http.get<Transaction[]>(this.transactionList, header);
  }

  getTransactionFoodItems(): Observable<TransactionFoodItem[]> {
    let key = window.localStorage.getItem('key')
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Token ' + key)
    }

    return this.http.get<TransactionFoodItem[]>(this.transactionFoodItemList, header);
  }


    getRequests() {
      let key = window.localStorage.getItem('key')
      var header = {
        headers: new HttpHeaders()
          .set('Authorization', 'Token ' + key)
      }
  
      return this.http.get(this.requestList, header)
    }
  
    getRequest(id: string) {
      let url = this.requestList + id + '/';
      return this.http.get(url);
    }

}
