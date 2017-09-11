import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { BookModel } from '../../models/book.model';
import { OfferModel } from '../../models/offer.model';

import { CartService } from '../../services/cart.service';
import { BooksService } from '../../services/books.service';

import * as CartActions from '../../store/cart/cart.actions';
import * as fromRoot from '../../store/reducers';

@Component({
  selector: 'app-books-cart',
  templateUrl: './books-cart.component.html',
  styleUrls: ['./books-cart.component.css']
})
export class BooksCartComponent implements OnInit {
  items: BookModel[] = [];
  itemsPrice: number[] = [];
  fullPrice: number;
  offers: OfferModel[];
  bestOffer: OfferModel;

  constructor(
    private store: Store<fromRoot.State>,
    private cartService: CartService,
    private booksService: BooksService) {
  }

  ngOnInit() {
    this.store.select(fromRoot.getCartBooks).subscribe(items => {
      this.items = items;
      this.itemsPrice = this.items.map(item => item.price * item.units);
      this.fullPrice = this.cartService.getFullPrice();
      this.getOffers();
    });
  }

  onDelete(item) {
    this.store.dispatch(new CartActions.SetBook(item, 0));
  }

  onEmpty() {
    this.store.dispatch(new CartActions.EmptyCart());
  }

  getOffers() {
    const isbn = this.items.map(item => item.isbn);
    if (isbn.length) {
      this.booksService.getOffers(isbn).subscribe(offers => {
        this.offers = this.cartService.getDiscountPrices(offers);
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
