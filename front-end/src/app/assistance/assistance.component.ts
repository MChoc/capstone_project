import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
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
        style({ backgroundColor: 'white', opacity: 0, transform: 'translateX(40px)' }),
        animate(300)
      ])
    ])
  ]
})
export class AssistanceComponent implements OnInit {

  requestlist = [
    { id: 1, request: 'My table needs to be cleaned' },
    { id: 2, request: 'I need serviettes' },
    { id: 3, request: 'I need cutlery' },
    { id: 4, request: 'There is a problem with my order' },
    { id: 5, request: 'Problem with card payment' },
    { id: 6, request: 'I cannot add items to my cart' }
  ]

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addCheckboxes();
  }

  addCheckboxes() {
    this.requestlist.forEach((o, i) => {
      const control = new FormControl();
      (this.assistanceForm.controls.requests as FormArray).push(control);
    })
  }

  assistanceForm = new FormGroup({
    issue: new FormControl(),
    requests: new FormArray([]),
  });

  onFormSubmit() {

    // map request ids to their strings and add to the request
    const selectedrequestids = this.assistanceForm.value.requests.map((v, i) => (v ? this.requestlist[i].id : null)).filter(v => v !== null);

    let requests = [];
    for (let i = 0; i < selectedrequestids.length; i++) {
      requests.push(this.requestlist[selectedrequestids[i] - 1].request);
    };

    if (this.assistanceForm.value['issue'] !== null) requests.push(this.assistanceForm.value['issue']);

    let request_data = {
      'problems': requests
    }

    let assistance_url = 'http://127.0.0.1:5000/api/assistance/'
    this.http.post(assistance_url, request_data).toPromise().then(data => {
      this.router.navigate(['/assistance/' + data['id']]);
    },
      error => {
        console.error("Error! " + error.error);
      })

  }

}
