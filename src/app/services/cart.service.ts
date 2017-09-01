import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { BookModel } from '../models/book.model';
import { CartModel } from '../models/cart.model';

export class CartService {
  private items: CartModel[] = [];
  cart = new BehaviorSubject<CartModel[]>([]);

  static duplicate(items: CartModel[]) {
    return items.map(item => Object.assign({}, item));
  }

  constructor() {
  }

  private next() {
    this.cart.next(this.items);
  }

  set(book: BookModel, units: number) {
    if (units === 0) {
      this.items = this.items.filter(item => item.isbn !== book.isbn);
    } else {
      const filtered = this.items.filter(item => item.isbn === book.isbn);
      if (filtered.length) {
        filtered[0].units = units;
      } else {
        this.items.push(Object.assign({ units }, book) as CartModel);
      }
    }
    this.next();
  }

  empty() {
    this.items = [];
    this.next();
  }
}
