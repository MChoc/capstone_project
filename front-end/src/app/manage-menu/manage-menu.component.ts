import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../_services/data.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-manage-menu',
  templateUrl: './manage-menu.component.html',
  styleUrls: ['./manage-menu.component.css']
})

export class ManageMenuComponent implements OnInit {

    currentUrl: string;
  
    categories$: Object;
    items$: Object;
    error: any;
    
    constructor(
      private http: HttpClient,
      private data : DataService,
      private router: Router) { 
      router.events.subscribe((_: NavigationEnd) => this.currentUrl = _.url)
    }
  
    ngOnInit(): void {
      this.data.getCategories().subscribe(
        data => this.categories$ = data,
      ),
      this.data.getItems().subscribe(
        data => this.items$ = data,
      )
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
        window.location.reload();
      },
      error => {
        console.log("not deleted!")
        console.log(error.error);
      });  
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
  }