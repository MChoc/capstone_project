import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../_services/data.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  currentUrl: string;
  categories$: Object;
  category1: Object;
  items$: Object;
  category_name: string;

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
    ),
    this.data.getCategoryData(1).subscribe(
      data => {
        this.category1 = data,
        this.items$ = data['food_items'],
        this.category_name = data['name']
      }
    )  
  }

}