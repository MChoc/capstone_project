import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items = [];
  total_price = 0;

  constructor(
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.items.sort((a,b) => a.name.localeCompare(b.name));
    for(let item of this.items) {
      this.total_price += parseFloat(item.price);
    }
  }

  deleteFromCart(item): void {
    this.cartService.removeFromCart(item);
    window.location.reload();
  }

}
