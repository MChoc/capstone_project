import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userList = 'http://127.0.0.1:5000/api/accounts/'
  
  constructor(private http: HttpClient) { }

  getUsers() {
    let key = window.localStorage.getItem('key')
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Token ' + key)
    }
    
    return this.http.get(this.userList, header)
  }

}
