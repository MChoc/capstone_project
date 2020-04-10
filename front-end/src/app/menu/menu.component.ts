import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';
import { Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  currentUrl: string;

  categories$: Object;
  items$: Object;
  extras$: Object;
  error: any;
  
  constructor(
    private http: HttpClient,
    private data : DataService,
    private router: Router) { 
    router.events.subscribe((_: NavigationEnd) => this.currentUrl = _.url)
  }

  ngOnInit(): void {
    this.data.getCustomerCategories().subscribe(
      data => this.categories$ = data,
    ),
    this.data.getCustomerItems().subscribe(
      data => this.items$ = data,
    ),
    this.data.getCustomerExtras().subscribe(
      data => this.extras$ = data,
    )
  }

}
