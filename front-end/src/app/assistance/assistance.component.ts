import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { animation, transition, animate, state, trigger, style } from '@angular/animations';


import { of } from 'rxjs';

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
    private router: Router,
  ) {}

  orders = [
    { id: 1, request: 'My table needs to be cleaned' },
    { id: 2, request: 'I need serviettes' },
    { id: 3, request: 'I need cutlery' },
    { id: 4, request: 'I need more condiments' }, 
    { id: 5, request: 'Problem with card payment' },
    { id: 6, request: 'I cannot add items in my cart' },
    { id: 7, request: "Other requests"}
  ];

  ngOnInit(): void {
    this.assistanceForm.get('issue').disable()
    this.assistanceForm.controls.orders.patchValue(this.orders[0].id);
  }

  assistanceForm = new FormGroup({
    issue: new FormControl(),
    orders: new FormControl({orders: ['']})
  });

  get_request_string = (request_id) => {
    return this.orders[request_id-1].request
  }
  
  alertme = () => {
    let id_current = this.assistanceForm.value['orders'];
    if (id_current == this.orders.length) this.assistanceForm.get('issue').enable()
    else this.assistanceForm.get('issue').disable()
  }

  onFormSubmit() {
    let string = '';
    let id_recieve = this.assistanceForm.value['orders'];
    if (id_recieve != this.orders.length) string = this.get_request_string(id_recieve)
    else string = this.assistanceForm.value['issue']
    let request_data = {
      'problem': string
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
