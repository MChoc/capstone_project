import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'
import {Location} from '@angular/common';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUrl: string;
  loggedIn: boolean;
  userType: string;

  constructor(
    private router: Router,
    private _location: Location
    ) { 
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if(localStorage.getItem('key')) {
          this.loggedIn = true;
          let user = JSON.parse(localStorage.getItem('user'));
          this.userType = user['user_type'];
        } else {
          this.loggedIn = false;
        }
      }
    });
  }

  @Input() title:string="";

  ngOnInit(): void {
  }


  homePage() {
    if(this.userType === 'MANAGER') {
      this.router.navigate(['/management']);
    } else if(this.userType === 'WAITER') {
      this.router.navigate(['/waiter']);
    } else if(this.userType === 'KITCHEN') {
      this.router.navigate(['/kitchen']);
    } else {
      this.router.navigate(['/']); 
    }
  }

  goBack() {
    this._location.back();
  }

}
