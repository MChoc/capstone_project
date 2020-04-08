import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-extra-edit',
  templateUrl: './extra-edit.component.html',
  styleUrls: ['./extra-edit.component.css']
})
export class ExtraEditComponent implements OnInit {

  id: string;
  extra: Object;
  success_message = '';
  error_message = '';

  extraEditForm = new FormGroup({
    name: new FormControl(),
    price: new FormControl()
  });

  onFormSubmit(): void {
    console.log(this.extraEditForm.value);
    let url = 'http://127.0.0.1:5000/api/extra/' + this.id + '/';
    
    let key = window.localStorage.getItem('key');
    let header = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Token ' + key
      })
    }
    
    this.http.patch(url, this.extraEditForm.value, header).toPromise().then(data => {
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
    let url = 'http://127.0.0.1:5000/api/extra/' + this.id + '/';
    this.http.get(url).toPromise().then(data => {
      this.extra = data;
      this.extraEditForm.setValue({name: this.extra['name'],
                                   price: this.extra['price']}
                                 )
    },
    error => {
      console.log("ERROR!")
      console.log(error.error);
    })
  }

}