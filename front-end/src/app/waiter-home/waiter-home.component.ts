import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../_services/data.service';
import { Router, NavigationEnd } from '@angular/router';
import {interval} from "rxjs/internal/observable/interval";
import {startWith, switchMap} from "rxjs/operators";

import { Transaction } from "../models/transaction.model";

@Component({
  selector: 'app-waiter-home',
  templateUrl: './waiter-home.component.html',
  styleUrls: ['./waiter-home.component.css']
})
export class WaiterHomeComponent implements OnInit {

  currentUrl: string;

  requests$: Object;
  transactions$: Transaction[] = [];

  constructor(
    private http: HttpClient,
    private data : DataService,
    private router: Router) { 
      let loggedOn = window.localStorage.getItem('user');

      if(!loggedOn || JSON.parse(loggedOn)['user_type'] != 'WAITER') {
        this.router.navigate(['**']);
      }  
    router.events.subscribe((_: NavigationEnd) => this.currentUrl = _.url)
  }

  ngOnInit(): void {

    interval(10000)
    .pipe(
      startWith(0),
      switchMap(() => this.data.getRequests())
    )
    .subscribe(res => {
      this.requests$ = res;
    });

    interval(10000)
      .pipe(
        startWith(0),
        switchMap(() => this.data.getTransactions())
      )
      .subscribe(res => {
        this.transactions$ = res;
      });
  }

  moveTo(id) {
    this.router.navigate(['/waiter/request/'+ id]);
  }

  pickupOrder(id) {
    alert("Picking up " + id);
  }

}
