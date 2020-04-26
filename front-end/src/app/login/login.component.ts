import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit(){
    // reroute to home page if user is already logged in
    if(window.localStorage.getItem('key')) {
      let userData = JSON.parse(window.localStorage.getItem('user'));
      this.routeToUserHome(userData);
    }
  }

  username: string;
  password: string;

  url = 'http://127.0.0.1:5000/rest-auth/login/';

  loginUser() {
    let post_data = {
      username: this.username,
      password: this.password
    };

    this.http.post(this.url, post_data).toPromise().then(data => {
      window.localStorage.setItem('key', data['key']);
      window.localStorage.setItem('user', JSON.stringify(data['user']));
      window.localStorage.setItem('staffID', JSON.stringify(data['user']['id']));

      this.routeToUserHome(data['user']);
    },
    error=> {
      if (error.error['non_field_errors']) {
        this.error = error.error['non_field_errors'];
      } else {
        this.error = '';
      }
    });
  }

  routeToUserHome(userData):void {

    if(userData['user_type'] === 'MANAGER') {
      this.router.navigate(['/management']);
    } else if(userData['user_type'] === 'WAITER') {
      this.router.navigate(['/waiter']);
    } else if(userData['user_type'] === 'KITCHEN') {
    this.router.navigate(['/kitchen']);
    } else {
      this.router.navigate(['/']); 
    }

  }

}
