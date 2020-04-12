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
  returnUrl: string;
  error = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit(){
     // get return url from route parameters or default to '/'
     this.returnUrl = this.route.snapshot.queryParams['returnUrl']
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
      //this.router.navigate([this.returnUrl]);
      window.localStorage.setItem('key', data['key']);
      window.localStorage.setItem('user', JSON.stringify(data['user']));
      window.localStorage.setItem('staffID', JSON.stringify(data['user']['id']));

      console.log('logged in');
      if(data['user']['user_type'] === 'MANAGER') {
        this.router.navigate(['/management']);
      } else if(data['user']['user_type'] === 'WAITER') {
        this.router.navigate(['/waiter']);
      } else if(data['user']['user_type'] === 'KITCHEN') {
      this.router.navigate(['/kitchen']);
      } else {
        this.router.navigate(['/']); 
      }
    },
    error=> {
      if (error.error['non_field_errors']) {
        this.error = error.error['non_field_errors'];
      } else {
        this.error = '';
      }
    });
  }

}
