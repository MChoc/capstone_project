import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';
import { Observable } from 'rxjs';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FilterPipe } from './../filter.pipe';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [FilterPipe]
})

export class MenuComponent implements OnInit {

  currentUrl: string;

  categories$: Object;
  items$: Object;
  error: any;
  searchname: string;
  
  constructor(
    private http: HttpClient,
    private data : DataService,
    private router: Router) { 
    router.events.subscribe((_: NavigationEnd) => this.currentUrl = _.url)
  }

  ngOnInit(): void {
    this.data.getCategories().subscribe(
      data => this.categories$ = data,
    ),
    this.data.getItems().subscribe(
      data => this.items$ = data,
    )
  }

  display(id) {
    this.router.navigate(['/menu/',id]);
  }
  
}
