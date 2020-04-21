import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { animation, transition, animate, state, trigger, style } from '@angular/animations';


@Component({
  selector: 'app-assistance-id',
  templateUrl: './assistance-id.component.html',
  styleUrls: ['./assistance-id.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({backgroundColor: 'white', opacity: 0, transform: 'translateX(40px)'}),
        animate(1000)
      ])
    ])
  ]
})
export class AssistanceIdComponent implements OnInit {

  id: String;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => { 
      this.id = params.get('id');
    });
  }

  menu() {
    this.router.navigate(['/'])
  }

}
