import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  id: string;
  user: Object;
  success_message = '';
  error_message = '';

  userEditForm = new FormGroup({
    username: new FormControl({disabled: true}),
    first_name: new FormControl(),
    last_name: new FormControl(),
    user_type: new FormControl(),
  });

  onFormSubmit(): void {
    console.log(this.userEditForm.value);
    let url = 'http://127.0.0.1:5000/api/accounts/' + this.id + '/';
    this.http.put(url, this.userEditForm.value).toPromise().then(data => {
      this.success_message = 'User updated successfully!'
    },
    error => {
      this.error_message = "An error occured. User was not updated."
    })
  }

  constructor(private _Activatedroute: ActivatedRoute, private http: HttpClient, ) { }

  ngOnInit(): void {

    this._Activatedroute.paramMap.subscribe(params => { 
        this.id = params.get('id');
    });

    let url = 'http://127.0.0.1:5000/api/accounts/' + this.id + '/';
    this.http.get(url).toPromise().then(data => {
      this.user = data;
      this.userEditForm.setValue({username: this.user['username'],
                                  first_name: this.user['first_name'],
                                  last_name: this.user['last_name'],
                                  user_type: this.user['user_type'],
                                })
    },
    error => {
      console.log("ERROR!")
      console.log(error.error);
    })

  }
}
