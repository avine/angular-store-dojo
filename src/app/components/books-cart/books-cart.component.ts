import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { BookModel } from '../../models/book.model';
import { OfferModel } from '../../models/offer.model';

import { CartService } from '../../services/cart.service';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-books-cart',
  templateUrl: './books-cart.component.html',
  styleUrls: ['./books-cart.component.css']
})
export class BooksCartComponent implements OnInit, OnDestroy {
  items: BookModel[] = [];
  itemsPrice: number[] = [];
  fullPrice: number;
  offers: OfferModel[];
  bestOffer: OfferModel;
  subscription: Subscription;

  constructor(
    private cartService: CartService,
    private booksService: BooksService) {
  }

  ngOnInit() {
    this.subscription = this.cartService.cart.subscribe(items => {
      this.items = items;
      this.itemsPrice = this.items.map(item => item.price * item.units);
      this.fullPrice = this.cartService.getFullPrice();
      this.getOffers();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
        this.offers = this.cartService.getDiscountPrices(
          offers.json().offers as OfferModel[]
        );
        this.bestOffer = this.offers[0];
      });
    } else {
      this.offers = [];
      this.bestOffer = null;
    }
  }

  checkout() {
    const amount = this.bestOffer ? this.bestOffer.price : this.fullPrice;
    window.alert(`
Montant à régler : ${amount} €
Veuillez patienter, vous allez être redirigé vers l'agence Xebia...`
    );
  }
}
