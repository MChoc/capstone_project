import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { CartService } from '../cart.service';
import { DataService } from '../_services/data.service';
import { animation, transition, animate, state, trigger, style } from '@angular/animations';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ backgroundColor: 'white', opacity: 0, transform: 'translateX(40px)' }),
        animate(300)
      ])
    ])
  ]

})
export class AddItemComponent implements OnInit {

  id: string;
  category: string;
  item: any = {};
  extras = [];
  success_message = '';
  error_message = '';
  selected_extras = []

  orderForm = new FormGroup({
    quantity: new FormControl(1),
    request: new FormControl(''),
  });

  constructor(
    private _Activatedroute: ActivatedRoute,
    private cartService: CartService,
    private data: DataService,
    private router: Router
  ) {
    this._Activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.data.getItem(this.id).toPromise().then(data => {
        this.item = data;
        this.category = data['category'];
        this.data.getExtras().toPromise().then(data => {
          this.extras = data;
        });
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
    } else if (quantity < 1) {
      this.error_message = "Minimum quantity is 1. Please increase your quantity and try again.";
      return;
    } else {
      this.error_message = '';
    }

    let cart_item = {
      'id': item.id,
      'name': item.name,
      'size': item.size,
      'price': item.price,
      'url': item.url,
      'extras': this.selected_extras,
      'request': this.orderForm.controls['request'].value
    }
    this.cartService.addToCart(cart_item, quantity);
    this.router.navigate(['/']);
  }


  /**
   * Adds or removes extras from the cart
   * @param item item to be added to cart
   * @param checked whether item is selected or not
   */
  checkValue(item, checked) {
    if (checked) {
      this.addExtra(item);
    } else {
      this.removeExtra(item);
    }
  }

  addExtra(item) {
    this.selected_extras.push(item);
  }

  removeExtra(item) {
    const index: number = this.selected_extras.indexOf(item);
    if (index !== -1) {
      this.selected_extras.splice(index, 1);
    }
  }
}
