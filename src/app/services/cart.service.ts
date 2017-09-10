import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { BookModel } from '../models/book.model';
import { OfferModel } from '../models/offer.model';

export class CartService {
  cart = new BehaviorSubject<BookModel[]>([]);
  private items: BookModel[] = [];
  private fullPrice = 0;

  constructor() {
  }

  private update() {
    this.setFullPrice();
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
        this.items.push(Object.assign({ units }, book) as BookModel);
      }
    }
    this.update();
  }

  empty() {
    this.items = [];
    this.update();
  }

  setFullPrice() {
    this.fullPrice = this.items.reduce((price, item) => price + item.price * item.units, 0);
  }

  getFullPrice() {
    return this.fullPrice;
  }

  getDiscountPrices(offers: OfferModel[]) {
    for (const offer of offers) {
      switch (offer.type) {
        case 'percentage':
          offer.price = this.getPercentage(offer.value);
          break;
        case 'minus':
          offer.price = this.getMinus(offer.value);
          break;
        case 'slice':
          offer.price = this.getSlice(offer.value, offer.sliceValue);
          break;
      }
    }
    // First offer is the best one
    return offers.sort((a, b) => a.price - b.price);
  }

  getPercentage(value) {
    return this.fullPrice * (100 - value) / 100;
  }

  getMinus(value) {
    return Math.max(this.fullPrice - value, 0);
  }

  getSlice(value, sliceValue) {
    return this.fullPrice - Math.floor(this.fullPrice / sliceValue) * value;
  }
}
