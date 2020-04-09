import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrls: ['./extra.component.css']
})

export class ExtraComponent implements OnInit {

    extras$: Object;
  
    constructor(
      private http: HttpClient,
      private router: Router,
      private data : DataService,
      private _Activatedroute: ActivatedRoute
      ) { }
  
    ngOnInit(): void {
      this.data.getExtras().subscribe(
        data => this.extras$ = data,
      );
    }
  
    name: string;
    price: number;
  
    url = 'http://127.0.0.1:5000/api/extra/';
  
    addExtra() {
      let post_data = {
        name: this.name,
        //active: true,
        price: this.price
      };
      console.log("request: " + post_data);
      let key = window.localStorage.getItem('key');
      let header = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Token ' + key
        })
      }
      this.http.post(this.url, post_data, header).toPromise().then(data => {
        this.router.navigate(['/management/menu']); 
      },
      error=> {
        console.log(error.error);
      });
    }
  
  }
  