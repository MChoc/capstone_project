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

  myForm: FormGroup;
    disabled = false;
    ShowFilter = false;
    limitSelection = false;
    extras: any = [];
    selectedItems: any = [];
    dropdownSettings: any = {};
  
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
      data => this.extras = data,
    ),
    this._Activatedroute.paramMap.subscribe(params => { 
      this.id = params.get('id');
    }),
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'url'
    }
    ;
  }

  onItemSelect(item: any) {
    console.log('onItemSelect', item);
  }

  name: string;
  description: string;
  price: number;
  priceMedium: number = null;
  priceLarge: number = null;
  size: string;

  url = 'http://127.0.0.1:5000/api/food_items/';


  addItem() {
    
    let key = window.localStorage.getItem('key');
    let header = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Token ' + key
      })
    }

    if(this.priceMedium === null && this.priceLarge === null) {
      //no sizes
      console.log('Regular');
      let post_data = {
        name: this.name,
        active: true,
        price: this.price,
        description: this.description,
        category: 'http://127.0.0.1:5000/api/categories/' + this.id + '/',
      };
      this.http.post(this.url, post_data, header).toPromise().then(data => {
      this.router.navigate(['/management/menu']); 
      },
      error=> {
        console.log(error.error);
      });
    } else if (this.priceMedium !== null && this.priceLarge === null) {
      //small and medium
      console.log('Small and Medium');
      let post_data = {
        name: this.name,
        active: true,
        price: this.price,
        description: this.description,
        category: 'http://127.0.0.1:5000/api/categories/' + this.id + '/',
        size: 'SMALL'
      };
      this.http.post(this.url, post_data, header).toPromise().then(data => {
        //this.router.navigate(['/management/menu']); 
      },
      error=> {
        console.log(error.error);
      });
      post_data = {
        name: this.name,
        active: true,
        price: this.priceMedium,
        description: this.description,
        category: 'http://127.0.0.1:5000/api/categories/' + this.id + '/',
        size: 'MEDIUM'
      };
      this.http.post(this.url, post_data, header).toPromise().then(data => {
        this.router.navigate(['/management/menu']); 
      },
      error=> {
        console.log(error.error);
      });
    } else if (this.priceMedium === null && this.priceLarge !== null) {
      //small and large
      console.log('small and large');
      let post_data = {
        name: this.name,
        active: true,
        price: this.price,
        description: this.description,
        category: 'http://127.0.0.1:5000/api/categories/' + this.id + '/',
        size: 'SMALL'
      };
      this.http.post(this.url, post_data, header).toPromise().then(data => {
        //this.router.navigate(['/management/menu']); 
      },
      error=> {
        console.log(error.error);
      });
      post_data = {
        name: this.name,
        active: true,
        price: this.priceLarge,
        description: this.description,
        category: 'http://127.0.0.1:5000/api/categories/' + this.id + '/',
        size: 'LARGE'
      };
      this.http.post(this.url, post_data, header).toPromise().then(data => {
        this.router.navigate(['/management/menu']); 
      },
      error=> {
        console.log(error.error);
      });
    } else if (this.priceMedium !== null && this.priceLarge !== null) {
      //small medium and large
      console.log('small medium large');
      console.log(this.priceMedium);

      let post_data = {
        name: this.name,
        active: true,
        price: this.price,
        description: this.description,
        category: 'http://127.0.0.1:5000/api/categories/' + this.id + '/',
        size: 'SMALL'
      };
      this.http.post(this.url, post_data, header).toPromise().then(data => {
        //this.router.navigate(['/management/menu']); 
      },
      error=> {
        console.log(error.error);
      });
      post_data = {
        name: this.name,
        active: true,
        price: this.priceMedium,
        description: this.description,
        category: 'http://127.0.0.1:5000/api/categories/' + this.id + '/',
        size: 'MEDIUM'
      };
      this.http.post(this.url, post_data, header).toPromise().then(data => {
        this.router.navigate(['/management/menu']); 
      },
      error=> {
        console.log(error.error);
      });
      post_data = {
        name: this.name,
        active: true,
        price: this.priceLarge,
        description: this.description,
        category: 'http://127.0.0.1:5000/api/categories/' + this.id + '/',
        size: 'LARGE'
      };
      this.http.post(this.url, post_data, header).toPromise().then(data => {
        this.router.navigate(['/management/menu']); 
      },
      error=> {
        console.log(error.error);
      });
    }

  }


}
