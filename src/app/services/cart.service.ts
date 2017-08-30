import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CartService {
  private items: string[] = [];
  private cart = new BehaviorSubject<string[]>([]);

  constructor() { }

  add(isbn: string) {
    this.items.push(isbn);
    this.next();
  }

  remove(isbn: string) {
    this.items = this.items.filter(item => item !== isbn);
    this.next();
  }

  private next() {
    this.cart.next(this.items.slice());
  }

  subscribe(callback) {
    return this.cart.subscribe(callback);
  }
}
