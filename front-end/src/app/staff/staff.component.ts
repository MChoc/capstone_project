import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';
import { Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router'



@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})

export class StaffComponent implements OnInit {

  currentUrl: string;

  users$: Object;
  error: any;

  constructor(
    private data : DataService,
    private router: Router) { 
    router.events.subscribe((_: NavigationEnd) => this.currentUrl = _.url)
  }

  ngOnInit(): void {
    this.data.getUsers().subscribe(
      data => this.users$ = data,
    )
  }

}
