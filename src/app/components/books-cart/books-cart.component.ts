import { Component, OnInit } from '@angular/core';

import { BookModel } from '../../models/book.model';
import { CartModel } from '../../models/cart.model';
import { OfferModel } from '../../models/offer.model';

import { CartService } from '../../services/cart.service';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-books-cart',
  templateUrl: './books-cart.component.html',
  styleUrls: ['./books-cart.component.css']
})
export class BooksCartComponent implements OnInit {
  items: CartModel[] = [];
  fullPrice: number;
  offers: OfferModel[];

  constructor(
    private cartService: CartService,
    private booksService: BooksService) {
  }

  ngOnInit() {
    this.cartService.cart.subscribe(items => {
      console.log(items);
      this.items = items;
      this.fullPrice = this.cartService.getFullPrice();
      this.getOffers();
    });
  }

  onDelete(item) {
    this.cartService.set(item, 0);
  }

  onEmpty() {
    this.cartService.empty();
  }

  getOffers() {
    const isbn = this.items.map(item => item.isbn);
    if (isbn.length) {
      this.booksService.offers(isbn).subscribe(offers => {
        this.offers = offers.json().offers as OfferModel[];
        this.getDiscounts();
      });
    } else {
      this.offers = [];
    }
  }

  getDiscounts() {
    for (const offer of this.offers) {
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
    this.offers = this.offers.sort((a, b) => a.price - b.price);
  }

  getPercentage(value) {
    return this.fullPrice * (100 - value) / 100;
  }

  getMinus(value) {
    return this.fullPrice > value ? this.fullPrice - value : this.fullPrice;
  }

  getSlice(value, sliceValue) {
    return this.fullPrice - Math.floor(this.fullPrice / sliceValue) * value;
  }
}
