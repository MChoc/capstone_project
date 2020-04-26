import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-waiter-assistance',
  templateUrl: './waiter-assistance.component.html',
  styleUrls: ['./waiter-assistance.component.css']
})
export class WaiterAssistanceComponent implements OnInit {

  id: string;
  request: Object;
  request_problems: string[] = [];
  request_id: string

  constructor(
    private _Activatedroute: ActivatedRoute, 
    private http: HttpClient, 
    private router: Router
  ) { 
    let loggedOn = window.localStorage.getItem('user');

      if(!loggedOn || JSON.parse(loggedOn)['user_type'] != 'WAITER') {
        this.router.navigate(['**']);
      }
  }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => { 
      this.id = params.get('id');
  });
  let url = 'http://127.0.0.1:5000/api/assistance/' + this.id + '/';
    let key = window.localStorage.getItem('key')
    let header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Token ' + key)
    }
    this.http.get(url, header).toPromise().then(data => {
      this.request = data;
      this.request_id = data['id'];
      let problem = data['problems'];
      this.request_problems = problem;
    },
    error => {
      console.error(error.error);
    })
  }

  editAssistanceForm = new FormGroup({
    notes: new FormControl(), 
  });

  onFormSubmit() {
    let post_data = {
      resolved: true,
      notes: this.editAssistanceForm.value['notes'],
      waiter: 'http://127.0.0.1:5000/api/accounts/' + window.localStorage.getItem('staffID') + '/'
    };
    
    let url = 'http://127.0.0.1:5000/api/assistance/' + this.id + '/';
    
    let key = window.localStorage.getItem('key');
    let header = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Token ' + key
      })
    }
    
    this.http.patch(url, post_data, header).toPromise().then(data => {
      this.router.navigate(['/waiter']);
    },
    error => {  }
    )
  }

  back() {
    this.router.navigate(['/waiter']);
  }

}
