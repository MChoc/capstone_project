import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-waiter-assistance',
  templateUrl: './waiter-assistance.component.html',
  styleUrls: ['./waiter-assistance.component.css']
})
export class WaiterAssistanceComponent implements OnInit {

  id: string;
  request: Object;
  request_id: string;
  request_problem: string;

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
      this.request_problem = data['problem'];
    },
    error => {
      console.log("ERROR!")
      console.log(error.error);
    })
  }

}
