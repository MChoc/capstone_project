import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../_services/data.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-waiter-home',
  templateUrl: './waiter-home.component.html',
  styleUrls: ['./waiter-home.component.css']
})
export class WaiterHomeComponent implements OnInit {

  currentUrl: string;

  requests$: Object;

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
    this.data.getRequests().subscribe(
      data => this.requests$ = data,
    )
  }

}
