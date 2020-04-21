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
  private categoryStats = 'http://127.0.0.1:5000/api/categories_stats/'
  private assistanceStats = 'http://127.0.0.1:5000/api/assistance_stats/'

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

  getTransactions(parameters={}): Observable<Transaction[]> {
    
    if (parameters) {
      return this.http.get<Transaction[]>(this.transactionList, {params: parameters});
    }
    return this.http.get<Transaction[]>(this.transactionList);
  }

  getTransaction(id, parameters?: any): Observable<Transaction> {
    let url = 'http://127.0.0.1:5000/api/transaction/' + id + '/';

      if(parameters) {
        return this.http.get<Transaction>(url, {params: parameters});
      }
      return this.http.get<Transaction>(url);
  }

  getTransactionFoodItems(): Observable<TransactionFoodItem[]> {

    return this.http.get<TransactionFoodItem[]>(this.transactionFoodItemList);
  }


  getRequests(parameters = {}) {
    let key = window.localStorage.getItem('key')
    let header = new HttpHeaders().set('Authorization', 'Token ' + key)

    return this.http.get(this.requestList, {headers: header, params: parameters})
  }

  getRequest(id: string, parameters = {}) {
    let url = this.requestList + id + '/';
    return this.http.get(url, {params: parameters});
  }

  getTransactionDetails(id): Observable<TransactionFoodItem[]> {

    let transaction_details = {
      'transaction_id': id,

    }
    return this.http.get<TransactionFoodItem[]>(this.transactionFoodItemList, {params: transaction_details});
  }

  getUnpreparedTransactions(): Observable<Transaction[]> {
    
    let transaction_details = {
      'get_unprepared': 'true',
    }

    return this.http.get<Transaction[]>(this.transactionList, {params: transaction_details});
  }

  getCategoryStats() {
  let key = window.localStorage.getItem('key');
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Token ' + key)
    }
    
    return this.http.get(this.categoryStats, header);
  }

  getCategoryData(id) {
    let url = this.categoryStats + id + '/';
    let key = window.localStorage.getItem('key');
      var header = {
        headers: new HttpHeaders()
          .set('Authorization', 'Token ' + key)
      }
      
      return this.http.get(url, header);
  }

  getAssistanceStats(parameters = {}) {
    let key = window.localStorage.getItem('key')
    let header = new HttpHeaders().set('Authorization', 'Token ' + key)

    return this.http.get(this.assistanceStats, {headers: header, params: parameters})
  }

}
