import {Deserializable} from './deserializable.model';

export class TransactionFoodItem implements Deserializable {

    id: number;
    url: string;
    food_item: boolean;
    transaction: string;
    discount: string;
    extras: string[];
    request: string;

    deserialize(input: any) {
      Object.assign(<any>this, input);
  
      return this;
    }

}
