import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-resolved-assistance',
  templateUrl: './resolved-assistance.component.html',
  styleUrls: ['./resolved-assistance.component.css']
})
export class ResolvedAssistanceComponent implements OnInit {
  id: string;
  request: Object;
  request_problem: string;
  request_id: string;
  request_note: string;
  request_waiter: string;
  waiter: Object;
  waiter_username: string;

  constructor(
    private _Activatedroute: ActivatedRoute, 
    private http: HttpClient, 
    private router: Router
  ) { 
    let loggedOn = window.localStorage.getItem('user');

      if(!loggedOn || JSON.parse(loggedOn)['user_type'] != 'MANAGER') {
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
      this.request_note = data['notes'];
      this.request_waiter = data['waiter'];
      this.http.get(this.request_waiter, header).toPromise().then(data2 => {
        this.waiter = data2;
        this.waiter_username = data2['username'];
      },
      error => {
        console.log("ERROR!")
        console.log(error.error);
      })
    },
    error => {
      console.log("ERROR!")
      console.log(error.error);
    })
  }

  back() {
    this.router.navigate(['/management/alerts/resolved']);
  }
}
