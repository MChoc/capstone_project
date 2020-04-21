import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { RemoveDuplicatesPipe } from './../remove-duplicates.pipe';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [RemoveDuplicatesPipe]
})
export class CartComponent implements OnInit {

  items = [];
  total_price: string;

  constructor(
    private cartService: CartService,
  ) { }

  count(item: any): number {
    var t = 0.00;
    this.items.forEach(element1 => {
      if (element1.name === item.name && element1.size === item.size && element1.request === item.request) {
        var st1 = [];
        var st2 = [];
        element1.extras.forEach(extra1 => {
          st1.push(extra1.name);
        })
        item.extras.forEach(extra2 => {
          st2.push(extra2.name);
        })
        if (st1.sort().toString() === st2.sort().toString()) t = t + 1;
      }
    });
    return t;
   }

   
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
