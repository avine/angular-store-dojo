import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { BookModel } from '../models/book.model';

export class CartService {
  private items: BookModel[] = [];
  cart = new BehaviorSubject<BookModel[]>([]);

  static duplicate(items: BookModel[]) {
    return items.map(item => Object.assign({}, item));
  }

  constructor() {
  }

  private next() {
    this.cart.next(this.items);
  }

  set(book: BookModel, units: number) { // FIXME: in fact, units is a string !!!!
    if (units.toString() === '0') {
      this.items = this.items.filter(item => item.isbn !== book.isbn);
    } else {
      const filtered = this.items.filter(item => item.isbn === book.isbn);
      if (filtered.length) {
        filtered[0].units = units;
      } else {
        this.items.push(Object.assign({ units }, book) as BookModel);
      }
    }
    this.next();
  }

  empty() {
    this.items = [];
    this.next();
  }

  getFullPrice() {
    return this.items.reduce((price, item) => price + item.price * item.units, 0);
  }
}
