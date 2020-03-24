import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})

export class StaffComponent implements OnInit {

  users$: Object;
  error: any;

  constructor(private data : DataService) { }

  ngOnInit(): void {
    this.data.getUsers().subscribe(
      data => this.users$ = data,
    )
  }

}
