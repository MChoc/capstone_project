import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../_services/data.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-analytics-assistance',
  templateUrl: './analytics-assistance.component.html',
  styleUrls: ['./analytics-assistance.component.css']
})
export class AnalyticsAssistanceComponent implements OnInit {

  currentUrl: string;
  requests$: Object;
  average$: Object;
  average: string;
  waiters$: Object;

  constructor( 
    private http: HttpClient,
    private data : DataService,
    private router: Router
    ) {

    let loggedOn = window.localStorage.getItem('user');

    if(!loggedOn || JSON.parse(loggedOn)['user_type'] != 'MANAGER') {
      this.router.navigate(['**']);
    }

    router.events.subscribe((_: NavigationEnd) => this.currentUrl = _.url)
  }

  ngOnInit(): void {
    this.data.getAssistanceStats().subscribe(
      data => this.requests$ = data,
    ),
    this.data.getAssistanceStats({"average_time": "true"}).subscribe(
      data => {
        this.average$ = data,
        this.average = this.transform(data['average_time']);
      } 
    ),
    this.data.getAssistanceStats({"waiters": "true"}).subscribe(
      data => {
        this.waiters$ = data;
      }
    )
  }

  transform(value: number): string {
    let minutes = Math.floor(value/60);
    let seconds = Math.floor(value % 3600 % 60);
    return ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
  }

}
