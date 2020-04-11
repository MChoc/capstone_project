import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items = [];
  total_price: string;

  constructor(
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.items.sort((a,b) => a.name.localeCompare(b.name));
    this.total_price = this.cartService.getTotalPrice();
  }

  deleteFromCart(item): void {
    this.cartService.removeFromCart(item);
    window.location.reload();
  }

  clearCart(): void {
    this.cartService.clearCart();
    window.location.reload();
  }

}
