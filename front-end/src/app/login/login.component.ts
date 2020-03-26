import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';



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
    private authenticationService: AuthenticationService
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
    if(this.username = '') {
      console.log('Plese enter username');
    }
    this.http.post(this.url, post_data).toPromise().then(data => {
      //this.router.navigate([this.returnUrl]);
      console.log(data['key']);
      window.localStorage.setItem('key', data['key']);
      window.localStorage.setItem('user_type', data['user']['user_type']);
      window.localStorage.setItem('session', 'true');
      console.log('logged in');
      if(data['user']['user_type'] === 'MANAGER') {
        this.router.navigate(['/management']);
      } else if(data['user']['user_type'] === 'WAITER') {
        this.router.navigate(['/waiter']);
      } else if(data['user']['user_type'] === 'KITCHEN') {
      this.router.navigate(['/kitchen']);
      }
    },
    error=> {
      // TODO: show error message on page!
      console.log(error.error);
      this.error = error;    
    });
  }

}
