import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  id: string;
  category: Object;
  success_message = '';
  error_message = '';

  categoryEditForm = new FormGroup({
    name: new FormControl()
  });

  onFormSubmit(): void {
    console.log(this.categoryEditForm.value);
    let url = 'http://127.0.0.1:5000/api/categories/' + this.id + '/';
    this.http.patch(url, this.categoryEditForm.value).toPromise().then(data => {
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
    let url = 'http://127.0.0.1:5000/api/categories/' + this.id + '/';
    this.http.get(url).toPromise().then(data => {
      this.category = data;
      this.categoryEditForm.setValue({name: this.category['name']})
    },
    error => {
      console.log("ERROR!")
      console.log(error.error);
    })
  }

}
