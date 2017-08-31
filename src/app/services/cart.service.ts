import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CartModel } from '../models/cart.model';

@Injectable()
export class CartService {
  private items: CartModel[] = [];
  private cart = new BehaviorSubject<CartModel[]>([]);

  constructor() { }

  private next() {
    this.cart.next(this.items);
  }

  subscribe(callback) {
    return this.cart.subscribe(items => callback(items.slice()));
  }

  set(isbn: string, units: number) {
    const filtered = this.items.filter(item => item.isbn === isbn);
    if (filtered.length) {
      filtered[0].units = units;
    } else {
      this.items.push({ isbn, units });
    }
    this.next();
  }

  empty() {
    this.items = [];
    this.next();
  }
}
