import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';
import { Observable } from 'rxjs';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { animation, transition, animate, state, trigger, style } from '@angular/animations';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({backgroundColor: 'white', opacity: 0, transform: 'translateX(40px)'}),
        animate(1000)
      ])
    ])
  ]
})

export class MenuComponent implements OnInit {

  currentUrl: string;

  categories$: Object;
  items$: Object;
  error: any;
  
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
