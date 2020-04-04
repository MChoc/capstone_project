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

  removeFromCart(item) {
    const index: number = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
    window.sessionStorage.setItem('cart_items', JSON.stringify(this.items));
  }

  constructor() { 
    let cart_items = window.sessionStorage.getItem('cart_items');
    if (cart_items) {
      this.items = JSON.parse(cart_items);
    }
  }
}
