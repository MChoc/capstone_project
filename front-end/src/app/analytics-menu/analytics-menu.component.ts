import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../_services/data.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-analytics-menu',
  templateUrl: './analytics-menu.component.html',
  styleUrls: ['./analytics-menu.component.css']
})
export class AnalyticsMenuComponent implements OnInit {

  currentUrl: string;
  categories$: Object;
  open: number;

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
    this.data.getCategoryStats().subscribe(
      data => this.categories$ = data,
    )  
  }

  collapse(id) {
    this.open = id;
  }

  close() {
    this.open = null;
  }
  
}