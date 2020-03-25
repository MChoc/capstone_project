import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { 
    console.log("GOT LOCALSTORAGE THING");
    console.log(window.localStorage.getItem('key'));
  }

  ngOnInit(): void {
  }

}
