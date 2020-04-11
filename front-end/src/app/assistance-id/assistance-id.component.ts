import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assistance-id',
  templateUrl: './assistance-id.component.html',
  styleUrls: ['./assistance-id.component.css']
})
export class AssistanceIdComponent implements OnInit {

  id: String;

  constructor(
    private _Activatedroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => { 
      this.id = params.get('id');
    });
  }

}
