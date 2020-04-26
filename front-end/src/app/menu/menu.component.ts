import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';
import { Router, NavigationEnd } from '@angular/router'
import { transition, animate, trigger, style } from '@angular/animations';
import { FilterPipe } from './../filter.pipe';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ backgroundColor: 'white', opacity: 0, transform: 'translateX(40px)' }),
        animate(300)
      ])
    ])
  ],
  providers: [FilterPipe]
})

export class MenuComponent implements OnInit {

  currentUrl: string;

  categories$: Object;
  items$: Object;
  error: any;
  searchname: string;

  constructor(
    private data: DataService,
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
    this.router.navigate(['/menu/', id]);
  }

}
