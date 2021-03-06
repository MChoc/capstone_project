import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../_services/data.service';
import { Router, NavigationEnd } from '@angular/router';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { Transaction } from '../models/transaction.model';

@Component({
  selector: 'app-manager-alerts',
  templateUrl: './manager-alerts.component.html',
  styleUrls: ['./manager-alerts.component.css']
})
export class ManagerAlertsComponent implements OnInit {
  currentUrl: string;
  requests$: Object;
  transactions$: Transaction[] = [];

  constructor(private http: HttpClient,
    private data: DataService,
    private router: Router) {
    let loggedOn = window.localStorage.getItem('user');

    if (!loggedOn || JSON.parse(loggedOn)['user_type'] != 'MANAGER') {
      this.router.navigate(['**']);
    }
    router.events.subscribe((_: NavigationEnd) => this.currentUrl = _.url)
  }

  ngOnInit(): void {
    interval(10000)
      .pipe(
        startWith(0),
        switchMap(() => this.data.getRequests({ 'start_date': this.getLast24HoursDate() }))
      )
      .subscribe(res => {
        this.requests$ = res;
      });

    interval(10000)
      .pipe(
        startWith(0),
        switchMap(() => this.data.getTransactions({ 'start_date': this.getLast24HoursDate() }))
      )
      .subscribe(res => {
        this.transactions$ = res;
      });

  }

  assistance(id) {
    this.router.navigate(['/management/alerts/assistance/' + id]);
  }

  orders(id) {
    this.router.navigate(['/management/alerts/orders/' + id]);
  }

  pickups(id) {
    this.router.navigate(['/management/alerts/pickups/' + id]);
  }

  resolved() {
    this.router.navigate(['/management/alerts/resolved']);
  }

  getLast24HoursDate(): string {
    let now = new Date();
    now.setHours(now.getHours() - 24)
    return now.toISOString()
  }

}
