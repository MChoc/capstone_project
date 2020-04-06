import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { CartService } from '../cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  total_price: string;
  error_message = "";

  checkoutForm = new FormGroup({
    card_number: new FormControl(),
    expiry_month: new FormControl(),
    expiry_year: new FormControl(),
    cvs: new FormControl(),
  })

  constructor(
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.total_price = this.cartService.getTotalPrice();
  }

  onFormSubmit() {
    console.log("Submitted!");
    console.log(this.checkoutForm.value);
  }

}
