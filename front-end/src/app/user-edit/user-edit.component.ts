import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';


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
    let url = 'http://127.0.0.1:5000/api/accounts/' + this.id + '/';
    
    let key = window.localStorage.getItem('key');
    let header = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Token ' + key
      })
    }
    
    this.http.put(url, this.userEditForm.value, header).toPromise().then(data => {
      this.router.navigate(['/management/staff']); 
    },
    error => {
      this.error_message = "An error occured. User was not updated."
    })
  }

  constructor(
    private _Activatedroute: ActivatedRoute, 
    private http: HttpClient, 
    private router: Router
    ) {

      let loggedOn = window.localStorage.getItem('user');

      if(!loggedOn || JSON.parse(loggedOn)['user_type'] != 'MANAGER') {
        this.router.navigate(['**']);
      }

    }

  ngOnInit(): void {

    this._Activatedroute.paramMap.subscribe(params => { 
        this.id = params.get('id');
    });

    let url = 'http://127.0.0.1:5000/api/accounts/' + this.id + '/';
    let key = window.localStorage.getItem('key')

    let current_user = JSON.parse(localStorage.getItem('user'));

    let header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Token ' + key)
    }
    this.http.get(url, header).toPromise().then(data => {
      this.user = data;
      this.userEditForm.setValue({username: this.user['username'],
                                  first_name: this.user['first_name'],
                                  last_name: this.user['last_name'],
                                  user_type: this.user['user_type'],
                                })
    },
    error => {
      console.error(error.error);
    })
    // this.userEditForm.get('user_type').disable()
    if (this.id == current_user.id) {
      this.userEditForm.get('user_type').disable()
    }

  }
}
