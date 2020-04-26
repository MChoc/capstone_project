import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../_services/data.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-manage',
  templateUrl: './category-manage.component.html',
  styleUrls: ['./category-manage.component.css']
})
export class CategoryManageComponent implements OnInit {

  id: string;
  currentUrl: string;
  
  category$: Object;
  items$: Object;
  extras$: Object;
  catName: string;
  catUrl: string;
  catId: string;


  constructor(
    private _Activatedroute: ActivatedRoute, 
    private http: HttpClient,
    private data : DataService,
    private router: Router
    ) {

      let loggedOn = window.localStorage.getItem('user');

      if(!loggedOn || JSON.parse(loggedOn)['user_type'] != 'MANAGER') {
        this.router.navigate(['**']);
      }

      router.events.subscribe((_: NavigationEnd) => this.currentUrl = _.url)
    }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => { 
      this.id = params.get('id');
    }),
    this.data.getCategory(this.id).subscribe(
      data => {
        this.category$ = data;
        this.catName = data['name'];
        this.catUrl = data['url'];
        this.catId = data['id'];
      }
    ),
    this.data.getItems().subscribe(
      data => this.items$ = data,
    ),
    this.data.getExtras().subscribe(
      data => this.extras$ = data,
    )
  }

  deleteItem(id) {
    let key = window.localStorage.getItem('key')
    let header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Token ' + key)
    }
    let url = 'http://127.0.0.1:5000/api/food_items/' + id + '/';
    this.http.delete(url, header).toPromise().then(data => {
      window.location.reload();
    },
    error => {
      console.error(error.error);
    });   
  }

  archiveItem(id) {
    let input = { active: false };
    let url = 'http://127.0.0.1:5000/api/food_items/' + id + '/';
    
    this.make_patch(url, input);

  }

  unarchiveItem(id) {
    let input = { active: true };
    let url = 'http://127.0.0.1:5000/api/food_items/' + id + '/';

    this.make_patch(url, input);
  }

  deleteExtra(id) {
    let key = window.localStorage.getItem('key')
    let header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Token ' + key)
    }

    let url = 'http://127.0.0.1:5000/api/extra/' + id + '/';
    this.http.delete(url, header).toPromise().then(data => {
      window.location.reload();
    },
    error => {
      console.error(error.error);
    });   
  }

  archiveExtra(id) {
    let input = { active: false };
    let url = 'http://127.0.0.1:5000/api/extra/' + id + '/';
    
    this.make_patch(url, input);
  }
  

  unarchiveExtra(id) {
    let input = { active: true };
    let url = 'http://127.0.0.1:5000/api/extra/' + id + '/';

    this.make_patch(url, input);
  }


  deleteCategory(id) {
    let key = window.localStorage.getItem('key')
    let header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Token ' + key)
    }
    let url = 'http://127.0.0.1:5000/api/categories/' + id + '/';
    this.http.delete(url, header).toPromise().then(data => {
      this.router.navigate(['/management/menu']);
    },
    error => {
      console.error(error.error);
    });  
  } 

  back() {
    this.router.navigate(['/management/menu']);
  }


  make_patch(url: string, input: object) {
    let key = window.localStorage.getItem('key');
    let header = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Token ' + key
      })
    }
      
    this.http.patch(url, input, header).subscribe(
      (val) => {
        window.location.reload();
      },
      response => {
          console.error("PATCH call in error", response);
      },
      () => {});
  }

}
