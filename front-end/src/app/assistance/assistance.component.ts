import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { animation, transition, animate, state, trigger, style } from '@angular/animations';


@Component({
  selector: 'app-assistance',
  templateUrl: './assistance.component.html',
  styleUrls: ['./assistance.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({backgroundColor: 'white', opacity: 0, transform: 'translateX(-40px)'}),
        animate(1100)
      ])
    ])
  ]
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
    let assistance_url = 'http://127.0.0.1:5000/api/assistance/'
    this.http.post(assistance_url, request_data).toPromise().then(data => {
      console.log(data);
      this.router.navigate(['/assistance/'+ data['id']]);
    },
    error => {
      console.error("Error! " + error.error);
    })

  }

}
