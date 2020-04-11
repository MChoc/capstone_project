import { Component, OnInit, Inject } from '@angular/core';
import {interval} from "rxjs/internal/observable/interval";
import {startWith, switchMap} from "rxjs/operators";
import { Router, ActivatedRoute } from '@angular/router';
// import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

  id: String;
  complete: boolean = false;
  
  constructor(
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    private data : DataService,
  ) { 
    this._Activatedroute.paramMap.subscribe(params => { 
      this.id = params.get('id');
    });
  }

  ngOnInit(): void {

    interval(10000)
    .pipe(
      startWith(0),
      switchMap(() => this.data.getTransaction(this.id))
    )
    .subscribe(res => {
      // order is complete when it has been marked as inactive by the waiter
      if (res.active == false) {
        this.complete = true;
      }
    });
  }

}
