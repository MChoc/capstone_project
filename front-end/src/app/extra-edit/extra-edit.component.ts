import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../_services/data.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-extra-edit',
  templateUrl: './extra-edit.component.html',
  styleUrls: ['./extra-edit.component.css']
})
export class ExtraEditComponent implements OnInit {

  id: string;
  extra: Object;
  extraName: string;
  categories$: Object;

  success_message = '';
  error_message = '';

  extraEditForm = new FormGroup({
    name: new FormControl(),
    price: new FormControl(),
    category: new FormControl(),
  });

  onFormSubmit(): void {
    let url = 'http://127.0.0.1:5000/api/extra/' + this.id + '/';

    let key = window.localStorage.getItem('key');
    let header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + key
      })
    }

    this.http.put(url, this.extraEditForm.value, header).toPromise().then(data => {
      this._location.back();
    },
      error => {
        this.error_message = "An error occured. Item was not updated."
      })
  }

  constructor(
    private _Activatedroute: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private data: DataService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.data.getCategories().subscribe(
      data => this.categories$ = data,
    ),
      this._Activatedroute.paramMap.subscribe(params => {
        this.id = params.get('id');
      });

    let url = 'http://127.0.0.1:5000/api/extra/' + this.id + '/';
    this.http.get(url).toPromise().then(data => {
      this.extra = data;
      this.extraName = data['name'];
      this.extraEditForm.setValue({
        name: this.extra['name'],
        price: this.extra['price'],
        category: this.extra['category'],
      })
    },
      error => {
        console.error(error.error);
      })
  }

  back() {
    this._location.back();
  }

}
