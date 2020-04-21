import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../_services/data.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { animation, transition, animate, state, trigger, style } from '@angular/animations';


@Component({
  selector: 'app-menu-category',
  templateUrl: './menu-category.component.html',
  styleUrls: ['./menu-category.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({backgroundColor: 'white', opacity: 0, transform: 'translateX(40px)'}),
        animate(300)
      ])
    ])
  ]
})
export class MenuCategoryComponent implements OnInit {
  currentUrl: string;

  items$: Object;
  error: any;
  id: any;
  category: Object;
  category_name: string;
  category_url: string;
  category_id: string;
  categories$: Object;
  
  constructor(
    private _Activatedroute: ActivatedRoute, 
    private http: HttpClient,
    private data : DataService,
    private router: Router) { 
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    router.events.subscribe((_: NavigationEnd) => this.currentUrl = _.url)
  }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => { 
      this.id = params.get('id');
    }),
    this.data.getCategories().subscribe(
      data => this.categories$ = data,
    ),
    this.data.getCategory(this.id).subscribe(
      data => {
        this.category = data;
        this.category_name = data['name'];
        this.category_url = data['url'];
        this.category_id = data['id'];
      }
    ),
    this.data.getItems().subscribe(
      data => this.items$ = data,
    )
  }

  display(new_id) {
    this.router.navigate(['/menu/',new_id]);
  }

}
