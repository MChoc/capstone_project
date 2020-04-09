import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrls: ['./extra.component.css']
})
export class ExtraComponent implements OnInit {

  categories$: Object;
  id: string;
  category: Object;
  catName: string;

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
    let url = 'http://127.0.0.1:5000/api/categories/' + this.id + '/';
    this.http.get(url).toPromise().then(data => {
      this.category = data;
      this.catName = data['name'];
    },
    error => {
      console.log("ERROR!")
      console.log(error.error);
    })
  }

  name: string;
  price: number;
  url = 'http://127.0.0.1:5000/api/extra/';

  addExtra() {
    let key = window.localStorage.getItem('key');
    let header = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Token ' + key
      })
    }
  
    let post_data = {
      name: this.name,
      active: true,
      price: this.price,
      category: 'http://127.0.0.1:5000/api/categories/' + this.id + '/'
    };
    this.http.post(this.url, post_data, header).toPromise().then(data => {
      console.log(data);
      this.router.navigate(['/management/menu/category/'+ this.id]); 
    },
    error=> {
      console.log(error.error);
    });
  }


  back() {
    this.router.navigate(['/management/menu/category/' + this.id]);
  }


}
