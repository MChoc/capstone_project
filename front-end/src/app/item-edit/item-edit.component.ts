import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {

  id: string;
  item: Object;
  success_message = '';
  error_message = '';

  itemEditForm = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    price: new FormControl(),
    category: new FormControl(),
  });

  onFormSubmit(): void {
    console.log(this.itemEditForm.value);
    let url = 'http://127.0.0.1:5000/api/food_items/' + this.id + '/';
    
    let key = window.localStorage.getItem('key');
    let header = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Token ' + key
      })
    }
    
    this.http.put(url, this.itemEditForm.value, header).toPromise().then(data => {
      this.router.navigate(['/management/menu']); 
    },
    error => {
      this.error_message = "An error occured. Item was not updated."
    })
  }

  constructor(
    private _Activatedroute: ActivatedRoute, 
    private http: HttpClient, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => { 
      this.id = params.get('id');
    });
    let url = 'http://127.0.0.1:5000/api/food_items/' + this.id + '/';
    this.http.get(url).toPromise().then(data => {
      this.item = data;
      this.itemEditForm.setValue({name: this.item['name'],
                                  description: this.item['description'],
                                  price: this.item['price'],
                                  category: this.item['category'],
                                })
    },
    error => {
      console.log("ERROR!")
      console.log(error.error);
    })
  }

}
