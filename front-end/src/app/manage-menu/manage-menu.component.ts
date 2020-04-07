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
  
    extras$: Object;
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
      this.data.getExtras().subscribe(
        data => this.extras$ = data,
      ),this.data.getCategories().subscribe(
        data => this.categories$ = data,
      ),
      this.data.getItems().subscribe(
        data => this.items$ = data,
      ),
      this.data.getMenus().subscribe(
        data => {
          console.log(data['length']);
          if (data['length'] === 0) {
            let post_data = {
              name: 'MENU',
            };
            let key = window.localStorage.getItem('key')
            let header = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Token ' + key
              })
            }
            let url = 'http://localhost:5000/api/menus/';
            this.http.post(url, post_data, header).toPromise().then(data => {
              window.localStorage.setItem('menu', data['id']);
              window.location.reload();
            },
            error=> {
              console.log(error.error);
            });
          }
        }
      )
    }


    deleteExtra(id) {
      let key = window.localStorage.getItem('key')
      let header = {
        headers: new HttpHeaders()
          .set('Authorization', 'Token ' + key)
      }
      let url = 'http://127.0.0.1:5000/api/extra/' + id + '/';
      this.http.delete(url, header).toPromise().then(data => {
        console.log("deleted");
        window.location.reload();
      },
      error => {
        console.log("not deleted!")
        console.log(error.error);
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



    archiveCategory(id) {
      let input = { active: false };
      let url = 'http://127.0.0.1:5000/api/categories/' + id + '/';
      
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



    unarchiveCategory(id) {
      let input = { active: true };
      let url = 'http://127.0.0.1:5000/api/categories/' + id + '/';
      
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

    
    name : string;

    addCategory() {
      let menu = window.localStorage.getItem('menu');
      let post_data = {
        name: this.name,
        menu: "http://localhost:5000/api/menus/" + menu + "/"
      };
      
      let key = window.localStorage.getItem('key')
      let header = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Token ' + key
        })
      }
      
      let url = 'http://localhost:5000/api/categories/';
      this.http.post(url, post_data, header).toPromise().then(data => {
        console.log("response!:");
        console.log(data);
        console.log(data['key']);
        window.location.reload();
      },
      error=> {
        console.log(error.error);
      });
    }

  }