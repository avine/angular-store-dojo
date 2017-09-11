import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { BookModel } from '../../models/book.model';
import { OfferModel } from '../../models/offer.model';

import { CartRules } from '../../rules/cart.rules';

import * as CartActions from '../../store/cart/cart.actions';
import * as fromRoot from '../../store/reducers';

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
  subscriptions: Subscription[] = [];

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.subscriptions.push(this.store.select(fromRoot.getCartBooks).subscribe(items => {
      this.items = items;
      const cartRules = new CartRules(this.items);
      this.itemsPrice = cartRules.getBooksPrice();
      this.fullPrice = cartRules.getFullPrice();
      this.getOffers();
    }));

    this.subscriptions.push(this.store.select(fromRoot.getCartOffers).subscribe(offers => {
      const cartRules = new CartRules(this.items);
      this.offers = cartRules.getDiscountPrices(offers);
      this.bestOffer = this.offers[0];
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
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
      this.store.dispatch(new CartActions.GetOffers(isbn));
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
