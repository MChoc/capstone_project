import { Component, OnInit } from '@angular/core';
import {interval} from "rxjs/internal/observable/interval";
import {startWith, switchMap} from "rxjs/operators";

import { DataService } from '../_services/data.service';
import {Transaction} from "../models/transaction.model";


@Component({
  selector: 'app-kitchen-home',
  templateUrl: './kitchen-home.component.html',
  styleUrls: ['./kitchen-home.component.css']
})
export class KitchenHomeComponent implements OnInit {

  transactions: Transaction[];

  constructor(
    private data : DataService,
  ) { 

  }

  ngOnInit() {
    interval(10000)
      .pipe(
        startWith(0),
        switchMap(() => this.data.getTransactions())
      )
      .subscribe(res => {
        this.transactions = res;
        console.log(res);
      })
    ;
  }

}
