import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  ngOnInit(): void {}

  constructor(private loginService: LoginService) {}

  showLogin() {

  }
  onClickSubmit(data){}

}
