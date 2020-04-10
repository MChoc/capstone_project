import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ControlContainer } from '@angular/forms';

import { CartService } from '../cart.service';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  id: string;
  // TODO: apparently "any" is discouraged.
  item: any = {};
  // item: Object;
  success_message = '';
  error_message = '';

  orderForm = new FormGroup({
    quantity: new FormControl(1),
  });

  constructor(
    private _Activatedroute: ActivatedRoute,
    private cartService: CartService,
    private data : DataService,

  ) { 
    this._Activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.data.getItem(this.id).toPromise().then(data => {
        this.item = data;
      })
    })    
  }

  ngOnInit(): void {
  }

  // https://angular.io/start/start-data Amazing tutorial for creating carts
  addToCart(item) {
    let quantity = this.orderForm.controls['quantity'].value;
    if (quantity > 15) {
      this.error_message = "Maximum quantity is 15, please reduce your quantity and try again.";
      return;
    } else if(quantity < 1) {
      this.error_message = "Minimum quantity is 1. Please increase your quantity and try again.";
      return;
    } else {
      this.error_message = '';
    }

    this.cartService.addToCart(item, quantity);
    this.success_message = "Item added to order!";
  }

}
