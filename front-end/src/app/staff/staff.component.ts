import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';
import { Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})

export class StaffComponent implements OnInit {

  currentUrl: string;

  users$: Object;
  error: any;

  constructor(
    private http: HttpClient,
    private data : DataService,
    private router: Router) { 
    router.events.subscribe((_: NavigationEnd) => this.currentUrl = _.url)
  }

  ngOnInit(): void {
    this.data.getUsers().subscribe(
      data => this.users$ = data,
    )
  }

  url : string;
  username : string;

  deleteUser(id) {
    let key = window.localStorage.getItem('key')
    let header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Token ' + key)
    }
    let url = 'http://127.0.0.1:5000/api/accounts/' + id + '/';
    this.http.delete(url, header).toPromise().then(data => {
      console.log("deleted");
      window.location.reload();
    },
    error => {
      console.log("not deleted!")
      console.log(error.error);
    });   
  }

}
