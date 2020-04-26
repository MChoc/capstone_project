import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router
    ) {

      let loggedOn = window.localStorage.getItem('user');

      if(!loggedOn || JSON.parse(loggedOn)['user_type'] != 'MANAGER') {
        this.router.navigate(['**']);
      }

    }

  ngOnInit(): void {
  }

  fname: string;
  username: string;
  lname: string;
  password1: string;
  password2: string;
  employeeType: string;
  password1_error = '';
  general_error = '';
  username_error = '';

  url = 'http://127.0.0.1:5000/rest-auth/registration/';

  registerUser() {
    let post_data = {
      username: this.username,
      password1: this.password1,
      password2: this.password2,
      first_name: this.fname,
      last_name: this.lname,
      user_type: this.employeeType
    };
    this.http.post(this.url, post_data).toPromise().then(data => {
      this.router.navigate(['/management/staff']); 
    },
    error=> {
      if (error.error['password1']) {
        this.password1_error = error.error['password1'];
      } else {
        this.password1_error = '';
      }

      if (error.error['username']) {
        this.username_error = error.error['username'];
      } else {
        this.username_error = '';
      }

      if (error.error['non_field_errors']) {
        this.general_error = error.error['non_field_errors'];
      } else {
        this.general_error = '';
      }

    });
  }

}
