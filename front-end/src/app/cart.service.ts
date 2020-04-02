import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  items = [];

  addToCart(product) {
    this.items.push(product);
    console.log("ITEM ADDED TO CART:");
    console.log(this.items);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  // TODO: add remove from cart!

  constructor() { }
}
