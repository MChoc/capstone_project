import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userList = 'http://127.0.0.1:5000/api/accounts/'
  private menuList = 'http://127.0.0.1:5000/api/menus/'
  private extraList = 'http://127.0.0.1:5000/api/extra/'
  private categoryList = 'http://127.0.0.1:5000/api/categories/'
  private itemList = 'http://127.0.0.1:5000/api/food_items/'

  constructor(private http: HttpClient) { }

  getUsers() {
    let key = window.localStorage.getItem('key')
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Token ' + key)
    }
    
    return this.http.get(this.userList, header)
  }

  getMenus() {
    let key = window.localStorage.getItem('key')
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Token ' + key)
    }

    return this.http.get(this.menuList, header)
  }

  getExtras() {
    let key = window.localStorage.getItem('key')
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Token ' + key)
    }

    return this.http.get(this.extraList, header)
  }

  getCategories() {
    let key = window.localStorage.getItem('key')
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Token ' + key)
    }

    return this.http.get(this.categoryList, header)
  }

  getCategory(id) {
    let key = window.localStorage.getItem('key')
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Token ' + key)
    }
    let url = this.categoryList + id + '/'
    return this.http.get(url, header)
  }

  getItems() {
    let key = window.localStorage.getItem('key')
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Token ' + key)
    }

    return this.http.get(this.itemList, header)
  }

  getItem(id: string) {
    let url = this.itemList + id + '/';
    return this.http.get(url);
  }


  getCustomerCategories() {
    return this.http.get(this.categoryList)
  }

  getCustomerItems() {
    return this.http.get(this.itemList)
  }

}
