import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  categories$: Object;
  extras$: Object;

  id: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private data : DataService,
    private _Activatedroute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.data.getCategories().subscribe(
      data => this.categories$ = data,
    ),
    this.data.getExtras().subscribe(
      data => this.extras$ = data,
    ),
    this._Activatedroute.paramMap.subscribe(params => { 
      this.id = params.get('id');
    });
  }

  name: string;
  description: string;
  price: number;
  itemSize: string;
  size: string;

  url = 'http://127.0.0.1:5000/api/food_items/';

  addItem() {
    if(this.itemSize === 'SL') {
      //this.size = 'SMALL';
    } else if (this.itemSize === 'SML') {
      //this.size = 'SMALL, MEDIUM';
    } else {
      this.size = null;
    }

    let post_data = {
      name: this.name,
      active: true,
      price: this.price,
      description: this.description,
      category: 'http://127.0.0.1:5000/api/categories/' + this.id + '/',
      size: this.size
    };
    console.log("request: " + post_data);
    let key = window.localStorage.getItem('key');
    let header = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Token ' + key
      })
    }
    this.http.post(this.url, post_data, header).toPromise().then(data => {
      this.router.navigate(['/management/menu']); 
    },
    error=> {
      console.log(error.error);
    });
  }

}
