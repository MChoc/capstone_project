import { Injectable, ɵConsole } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  items = [];

  addToCart(product) {
    this.items.push(product);
    console.log("ITEM ADDED TO CART:");
    console.log(this.items);
    window.sessionStorage.setItem('cart_items', JSON.stringify(this.items));
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    window.sessionStorage.setItem('cart_items', JSON.stringify(this.items));
    return this.items;
  }

  // TODO: add remove from cart!

  constructor() { 
    let cart_items = window.sessionStorage.getItem('cart_items');
    if (cart_items) {
      this.items = JSON.parse(cart_items);
    }
  }
}
