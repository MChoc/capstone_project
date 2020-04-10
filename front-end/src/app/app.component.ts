import { Component } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { FilterPipe } from './shared/filter.pipe.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [FilterPipe]
})
export class AppComponent {
  title = 'front-end';
}
