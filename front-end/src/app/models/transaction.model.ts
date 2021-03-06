import {Deserializable} from './deserializable.model';

export class Transaction implements Deserializable {

    id: number;
    url: string;
    active: boolean;
    date: string;
    customer: string;
    credit_card: string;
    food_items:  string[];
    request: string;
    prepared: boolean;
    total_price: number;
    kitchen_note: string;
  
    deserialize(input: any) {
      Object.assign(<any>this, input);
  
      return this;
    }
}
