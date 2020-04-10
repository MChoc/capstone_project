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
    error: any;
    menu: string;

    constructor(
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
      this.data.getCategories().subscribe(
        data => this.categories$ = data,
      )
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

    
    name : string;

    addCategory() {
      let post_data = {
        name: this.name,
        menu: "http://localhost:5000/api/menus/" + this.menu + "/"
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