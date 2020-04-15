import { Injectable, ɵConsole } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  // item object structure
  // cart_item = {
  //   'id': string,
  //   'name': string,
  //   'size': string,
  //   'price': string,
  //   'url': string,
  //   'extras': [],
  //   'request': string
  // }

  items = [];

  addToCart(product, quantity) {
    for(var i = 0; i < quantity; i++) {
      this.items.push(product);
    }

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
      if(item.extras) {
        for (let extra of item.extras) {
          total_price += parseFloat(extra.price);
        }
      }
    }

    return total_price.toFixed(2);
  }

  constructor() { 
    let cart_items = window.sessionStorage.getItem('cart_items');
    if (cart_items) {
      this.items = JSON.parse(cart_items);
    }
  }
}
