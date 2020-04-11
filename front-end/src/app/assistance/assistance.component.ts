import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assistance',
  templateUrl: './assistance.component.html',
  styleUrls: ['./assistance.component.css']
})
export class AssistanceComponent implements OnInit {

  constructor(
    private http: HttpClient, 
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  assistanceForm = new FormGroup({
    issue: new FormControl(),
  })

  onFormSubmit() {
    let request_data = {
      'problem': this.assistanceForm.value['issue']
    }
    let validate_url = 'http://127.0.0.1:5000/api/assistance/'
    this.http.post(validate_url, request_data).toPromise().then(data => {
      console.log(data);
    },
    error => {
      console.error("Error! " + error.error);
    })

  }

}
