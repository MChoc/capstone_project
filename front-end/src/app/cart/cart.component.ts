import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { animation, transition, animate, state, trigger, style } from '@angular/animations';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({backgroundColor: 'white', opacity: 0, transform: 'translateX(40px)'}),
        animate(1000)
      ])
    ])
  ]
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
