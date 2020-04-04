import { Injectable, ɵConsole } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  items = [];

  addToCart(product, quantity) {
    for(var i = 0; i < quantity; i++) {
      this.items.push(product);
    }
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

  getTotalPrice() {

    let total_price = 0.0;
    for(let item of this.items) {
      total_price += parseFloat(item.price);
    }

    return total_price;
  }

  constructor() { 
    let cart_items = window.sessionStorage.getItem('cart_items');
    if (cart_items) {
      this.items = JSON.parse(cart_items);
    }
  }
}
