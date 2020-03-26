import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'

@Component({
  selector: 'app-management-home',
  templateUrl: './management-home.component.html',
  styleUrls: ['./management-home.component.css']
})

export class ManagementHomeComponent implements OnInit {

  currentUrl: string;

  constructor(private router: Router) { 
    router.events.subscribe((_: NavigationEnd) => this.currentUrl = _.url)
  }

  ngOnInit(): void {
  }

}
