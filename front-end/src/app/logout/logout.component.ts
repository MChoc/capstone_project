import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() : void {
    //call logout endpoint
    let key = window.localStorage.getItem('key')
    let header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Token ' + key)
    }
    let url = 'http://127.0.0.1:5000/rest-auth/logout/';
    this.http.post(url, {}, header).toPromise().then(data => {
    },
    error => {
      console.error("LOGOUT ERROR " + error);
    });
    // remove key from localstorage
    window.localStorage.removeItem("key");
    window.localStorage.removeItem("user");
  }

}
