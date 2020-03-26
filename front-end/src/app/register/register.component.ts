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
    ) { }

  ngOnInit(): void {
  }

  fname: string;
  username: string;
  lname: string;
  password1: string;
  password2: string;
  employeeType: string;

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
    console.log("request: " + post_data);
    this.http.post(this.url, post_data).toPromise().then(data => {
      console.log("response!:");
      console.log(data);
      console.log(data['key']);
      this.router.navigate(['/management/staff']); 
    },
    error=> {
      // TODO: show error message on page!
      console.log(error.error);
    });
  }


}
