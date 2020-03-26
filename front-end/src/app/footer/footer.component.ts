import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {

  currentUrl: string;
  loggedIn: boolean;

  constructor(private router: Router) { 
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if(localStorage.getItem('key')) {
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
      }
    });
  }

  @Input() title:string="";

  ngOnInit(): void {
  }

}
