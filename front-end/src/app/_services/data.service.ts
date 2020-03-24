import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userList = 'http://127.0.0.1:5000/api/accounts/'
  
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.userList)
  }

}
