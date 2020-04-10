import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CartService } from '../cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  total_price: string;
  items = [];
  error_message = "";
  success_message = "";

  checkoutForm = new FormGroup({
    card_number: new FormControl(),
    expiry_month: new FormControl(),
    expiry_year: new FormControl(),
    cvc: new FormControl(),
  })

  constructor(
    private cartService: CartService,
    private http: HttpClient, 
  ) { }

  ngOnInit(): void {
    this.total_price = this.cartService.getTotalPrice();
    this.items = this.cartService.getItems();
  }

  onFormSubmit() {
    console.log("Submitted!");
    let card_data = {
      'number': this.checkoutForm.value['card_number'],
      'expiry_month': this.checkoutForm.value['expiry_month'],
      'expiry_year': this.checkoutForm.value['expiry_year'],
      'cvs': this.checkoutForm.value['cvc']
    }
    let validate_url = 'http://127.0.0.1:5000/api/credit_cards/validate/'
    this.http.post(validate_url, card_data).toPromise().then(data => {
      console.log(data);
      if (data['validated'] == true) {
        this.processTransaction(data['id']);
        this.error_message = "";
      } else {
        this.error_message = "Invalid card details";
      }
    },
    error => {
      console.error("Error! " + error.error);
    })

  }

  processTransaction(card_id) {

    // TODO: maybe create a service for this?
    let card_url = "http://127.0.0.1:5000/api/credit_cards/" + card_id + "/";
    let food_items = [];

    for (let item of this.items) {
      console.log(item);
      food_items.push(item['url']);
    }

    let transaction_url = "http://127.0.0.1:5000/api/transaction/"

    let transaction_data = {
      'credit_card': card_url,
      'food_items': food_items,
    }
    console.log(transaction_data);
    this.http.post(transaction_url, transaction_data).toPromise().then(data => {
      console.log('Transaction Created!');
      this.processFoodItemTransaction(data['url']);
      this.success_message = "Your order has been placed! Your transaction number is " + data['id'];
      // Remove everything from cart once order has been placed
      this.cartService.clearCart();
    },
    error => {
      console.error(error);
    })
  }

  processFoodItemTransaction(transaction_url) {
    let foodItemTransactionUrl = "http://127.0.0.1:5000/api/transaction_food_item/";
    // TODO: get this discount url from somewhere! AND GET EXTRAS WORKING!
    let discountUrl = "http://127.0.0.1:5000/api/discounts/1/";
    for (let item of this.items) {
      let foodItemData = {
        'food_item': item['url'],
        'transaction': transaction_url,
        'discount': discountUrl,
        'extras': []
      }
      console.log(foodItemData);
      this.http.post(foodItemTransactionUrl, foodItemData).toPromise().then(data => {
        console.log("transaction created!");
        console.log(data);
      },
      error => {
        console.error(error.error);
      })
    }
  }

}
