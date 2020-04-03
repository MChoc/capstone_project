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
    this._Activatedroute.paramMap.subscribe(params => { 
      this.id = params.get('id');
    });
  }

  name: string;
  description: string;
  price: number;
  itemType: string;

  url = 'http://127.0.0.1:5000/api/food_items/';

  addItem() {
    let post_data = {
      name: this.name,
      active: true,
      price: this.price,
      description: this.description,
      category: 'http://127.0.0.1:5000/api/categories/' + this.id + '/'
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
      console.log("response!:");
      console.log(data);
      console.log("URL =" + data['url']);
      if(this.itemType === 'YES') {
        let drink_data = {
          food_item : data['url'],
        };
        let drinkURL = 'http://127.0.0.1:5000/api/drinks/';
        this.http.post(drinkURL, drink_data, header).toPromise().then(data => {
        },
        error=>{
          console.log(error.error);
        });
      }
      this.router.navigate(['/management/menu']); 
    },
    error=> {
      console.log(error.error);
    });
  }

}
