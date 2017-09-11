import { BookModel } from '../models/book.model';
import { OfferModel } from '../models/offer.model';

export class CartRules {
  fullPrice: number;

  constructor(public books: BookModel[]) {
    this.setBooksPrice();
  }

  setBooksPrice() {
    this.fullPrice = this.books.reduce((price, book) => price + book.price * book.units, 0);
  }

  getFullPrice() {
    return this.fullPrice;
  }

  addBook(book: BookModel, units: number) {
    if (units === 0) {
      this.books = this.books.filter(item => item.isbn !== book.isbn);
    } else {
      const match = this.books.filter(item => item.isbn === book.isbn);
      if (match.length) {
        match[0].units = units;
      } else {
        this.books.push(Object.assign({ units }, book) as BookModel);
      }
    }
    this.setBooksPrice();
  }

  getBooksPrice() {
    return this.books.map(book => book.price * book.units);
  }

  getUnitsPerIsbn() {
    const units = {};
    this.books.forEach(book => units[book.isbn] = book.units);
    return units;
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
