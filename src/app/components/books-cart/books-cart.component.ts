import { Component, OnInit } from '@angular/core';

import { BookModel } from '../../models/book.model';
import { OfferModel } from '../../models/offer.model';

import { CartService } from '../../services/cart.service';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-books-cart',
  templateUrl: './books-cart.component.html',
  styleUrls: ['./books-cart.component.css']
})
export class BooksCartComponent implements OnInit {
  items: BookModel[] = [];
  fullPrice: number;
  offers: OfferModel[];

  constructor(
    private cartService: CartService,
    private booksService: BooksService) {
  }

  ngOnInit() {
    this.cartService.cart.subscribe(items => {
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
    this.offers = [];
    const isbn = this.items.map(item => item.isbn);
    if (isbn.length) {
      this.booksService.offers(isbn).subscribe(offers => {
        this.offers = this.cartService.getDiscountPrices(
          offers.json().offers as OfferModel[]
        );
      });
    }
  }
}
