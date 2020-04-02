import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ControlContainer } from '@angular/forms';

import { CartService } from '../cart.service';
import { DataService } from '../_services/data.service';
// import { HttpClient } from '@angular/common/http';

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

  orderForm = new FormGroup({
    quantity: new FormControl(1),
  });

  constructor(
    private _Activatedroute: ActivatedRoute,
    private cartService: CartService,
    private data : DataService,
    // private http: HttpClient,

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
    console.log("ADDING TO CART!");
    this.cartService.addToCart(item);
    // window.alert('Your product has been added to the cart!');
  }

  incrementQuantity() {
    let cur_quantity = this.orderForm.controls['quantity'].value;
    // TODO: check if 15 is a reasonable limit
    if (cur_quantity >= 15) {
      return;
    }
    this.orderForm.patchValue({'quantity': cur_quantity + 1});
  }

  decrementQuantity() {
    let cur_quantity = this.orderForm.controls['quantity'].value;
    // min order count is 1
    if (cur_quantity == 1) {
      return;  
    }
    this.orderForm.patchValue({'quantity': cur_quantity - 1});
  }

}
