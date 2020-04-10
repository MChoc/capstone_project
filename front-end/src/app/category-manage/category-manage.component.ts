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
      console.log("deleted");
      window.location.reload();
    },
    error => {
      console.log("not deleted!")
      console.log(error.error);
    });   
  }

  archiveItem(id) {
    let input = { active: false };
    let url = 'http://127.0.0.1:5000/api/food_items/' + id + '/';
    
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
        console.log("PATCH call successful value returned in body", 
                      val);
      },
      response => {
          console.log("PATCH call in error", response);
      },
      () => {
          console.log("The PATCH observable is now completed.");
      });
  }


  unarchiveItem(id) {
    let input = { active: true };
    let url = 'http://127.0.0.1:5000/api/food_items/' + id + '/';
    
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
        console.log("PATCH call successful value returned in body", 
                      val);
      },
      response => {
          console.log("PATCH call in error", response);
      },
      () => {
          console.log("The PATCH observable is now completed.");
      });
  }

  deleteCategory(id) {
    let key = window.localStorage.getItem('key')
    let header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Token ' + key)
    }
    let url = 'http://127.0.0.1:5000/api/categories/' + id + '/';
    this.http.delete(url, header).toPromise().then(data => {
      console.log("deleted");
      this.router.navigate(['/management/menu']);
    },
    error => {
      console.log("not deleted!")
      console.log(error.error);
    });  
  } 

  back() {
    this.router.navigate(['/management/menu']);
  }

}
