import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { DataService } from '../_services/data.service';
import { Transaction } from "../models/transaction.model";


@Component({
  selector: 'app-waiter-order',
  templateUrl: './waiter-order.component.html',
  styleUrls: ['./waiter-order.component.css']
})
export class WaiterOrderComponent implements OnInit {

  transaction$: Transaction;
  id: string;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    private data : DataService,
    private http: HttpClient,
  ) {

    let loggedOn = window.localStorage.getItem('user');

    if(!loggedOn || JSON.parse(loggedOn)['user_type'] != 'WAITER') {
      this.router.navigate(['**']);
    }
    this._Activatedroute.paramMap.subscribe(params => { 
      this.id = params.get('id');
      this.data.getTransaction(this.id).subscribe(data => {
        this.transaction$ = data;
        console.log(this.transaction$);
      });
    })

  }

  ngOnInit(): void {

  }

  pickup(): void {
    let input = {'active': false};

    let url = 'http://127.0.0.1:5000/api/transaction/' + this.id + '/'; 

    let key = window.localStorage.getItem('key')
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Token ' + key)
    }
    this.http.patch(url, input, header).subscribe(res => {
      console.log(res);
      this.router.navigate(['/waiter']);
    })
  }

  back(): void {
    this.router.navigate(['/waiter']);
  }

}
