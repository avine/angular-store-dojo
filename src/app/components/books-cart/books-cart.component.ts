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
  dicountPrices = [];

  constructor(
    private cartService: CartService,
    private booksService: BooksService) {
  }

  ngOnInit() {
    this.cartService.cart.subscribe(items => {
      this.items = items;
      this.getFullPrice();
      this.getOffers();
    });
  }

  onDelete(item) {
    this.cartService.set(item, 0);
  }

  onEmpty() {
    this.cartService.empty();
  }

  getFullPrice() {
    this.fullPrice = this.items.reduce(
      (price, item: CartModel) => price + item.price * item.units, 0
    );
  }

  getOffers() {
    const isbn = this.items.map(item => item.isbn);
    if (isbn.length) {
      this.booksService.offers(isbn).subscribe(offers => {
        this.offers = offers.json().offers as OfferModel[];
        this.calculate();
      });
    }
  }

  calculate() {
    this.dicountPrices = [];
    console.log('offers', this.offers);
    for (const offer of this.offers) {
      switch (offer.type) {
        case 'percentage':
          this.dicountPrices.push({
            type: offer.type,
            price: this.fullPrice * (100 - offer.value) / 100
          });
          break;
        case 'minus':
          break;
        case 'slice':
          break;
      }
    }
    console.log(this.dicountPrices);
  }
}
