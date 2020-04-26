import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-manager-alerts-assistance',
  templateUrl: './manager-alerts-assistance.component.html',
  styleUrls: ['./manager-alerts-assistance.component.css']
})
export class ManagerAlertsAssistanceComponent implements OnInit {
  id: string;
  request: Object;
  request_problems: string[] = [];
  request_id: string;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    let loggedOn = window.localStorage.getItem('user');

    if (!loggedOn || JSON.parse(loggedOn)['user_type'] != 'MANAGER') {
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
      let problems = data['problems'];
      this.request_problems = problems;
    },
      error => {
        console.error(error.error);
      })
  }

  back() {
    this.router.navigate(['/management/alerts']);
  }

}
