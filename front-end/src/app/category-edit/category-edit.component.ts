import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  id: string;
  category: Object;
  catName: string;
  catId: string;
  success_message = '';
  error_message = '';
  currentUrl: string;

  categoryEditForm = new FormGroup({
    name: new FormControl()
  });

  constructor(
    private _Activatedroute: ActivatedRoute, 
    private http: HttpClient, 
    private router: Router
  ) { 
    router.events.subscribe((_: NavigationEnd) => this.currentUrl = _.url)
  }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => { 
      this.id = params.get('id');
    });
    let url = 'http://127.0.0.1:5000/api/categories/' + this.id + '/';
    this.http.get(url).toPromise().then(data => {
      this.category = data;
      this.catName = data['name'];
      this.catId = data['id'];
      this.categoryEditForm.setValue({name: this.category['name']})
    },
    error => {
      console.error(error.error);
    })
  }

  onFormSubmit(): void {
    let url = 'http://127.0.0.1:5000/api/categories/' + this.id + '/';
    
    let key = window.localStorage.getItem('key');
    let header = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Token ' + key
      })
    }
    
    this.http.patch(url, this.categoryEditForm.value, header).toPromise().then(data => {
      this.router.navigate(['/management/menu/category/'+this.id]); 
    },
    error => {
      this.error_message = "An error occured. Item was not updated."
    })
  }

  back() {
    this.router.navigate(['/management/menu/category/'+this.id]);
  }

}
