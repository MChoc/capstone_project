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
  
    deserialize(input: any) {
      Object.assign(<any>this, input);
  
      return this;
    }
}
