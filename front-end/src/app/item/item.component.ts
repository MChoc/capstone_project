import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../_services/data.service';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  categories$: Object;
  extras$: Object;

  id: string;
  category: Object;
  catName: string;

  


  myForm: FormGroup;
    disabled = false;
    ShowFilter = false;
    limitSelection = false;
    extras: any = [];

    dropdownList = [];
    selectedItems = [];
    dropdownSettings = {};
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private data : DataService,
    private _Activatedroute: ActivatedRoute,
    private formBuilder: FormBuilder
    ) { 
      
    }

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
  description: string;
  price: number;
  priceSmall: number;
  priceMedium: number;
  priceLarge: number;
  url = 'http://127.0.0.1:5000/api/food_items/';


  addItem() {
    let key = window.localStorage.getItem('key');
    let header = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Token ' + key
      })
    }    
    if(this.noClicked) {
      let post_data = {
        name: this.name,
        active: true,
        price: this.price,
        description: this.description,
        category: 'http://127.0.0.1:5000/api/categories/' + this.id + '/'
      };
      this.http.post(this.url, post_data, header).toPromise().then(data => {
        console.log(data);
        this.router.navigate(['/management/menu/category/'+ this.id]); 
      },
      error=> {
        console.log(error.error);
      });
    } else {
      //small
      let post_data = {
        name: this.name,
        active: true,
        price: this.priceSmall,
        size: 'SMALL',
        description: this.description,
        category: 'http://127.0.0.1:5000/api/categories/' + this.id + '/'
      };
      this.http.post(this.url, post_data, header).toPromise().then(data => {
        console.log(data);
      },
      error=> {
        console.log(error.error);
      });
      //medium
      post_data = {
        name: this.name,
        active: true,
        price: this.priceMedium,
        size: 'MEDIUM',
        description: this.description,
        category: 'http://127.0.0.1:5000/api/categories/' + this.id + '/'
      };
      this.http.post(this.url, post_data, header).toPromise().then(data => {
        console.log(data);
      },
      error=> {
        console.log(error.error);
      });
      //large
      post_data = {
        name: this.name,
        active: true,
        price: this.priceLarge,
        size: 'LARGE',
        description: this.description,
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
  }

  noClicked = true;
  yesClicked = false;
  sizes(){
    this.noClicked = !this.noClicked;
    this.yesClicked = !this.yesClicked;
  }

  back() {
    this.router.navigate(['/management/menu/category/' + this.id]);
  }


}
