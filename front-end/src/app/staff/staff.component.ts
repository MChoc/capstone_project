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


  archiveUser(id) {
    let input = { active: false };
    let url = 'http://127.0.0.1:5000/api/accounts/' + id + '/';
    
    let key = window.localStorage.getItem('key');
      let header = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Token ' + key
      })
    }

    this.http.patch(url, input, header).subscribe(
      (val) => {
        window.location.reload();  
        console.log("PATCH call successful value returned in body", 
                      val);
      },
      response => {
          console.log("PATCH call in error", response);
      },
      () => {
          console.log("The PATCH observable is now completed.");
      });
  }

  unarchiveUser(id) {
    let input = { active: true };
    let url = 'http://127.0.0.1:5000/api/accounts/' + id + '/';
    
    let key = window.localStorage.getItem('key');
      let header = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Token ' + key
      })
    }

    this.http.patch(url, input, header).subscribe(
      (val) => {
        window.location.reload();  
        console.log("PATCH call successful value returned in body", 
                      val);
      },
      response => {
          console.log("PATCH call in error", response);
      },
      () => {
          console.log("The PATCH observable is now completed.");
      });
  }

}
