import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
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
  styleUrls: ['./books-cart.component.scss']
})
export class BooksCartComponent implements OnInit, OnDestroy {
  books$: Observable<BookModel[]>;
  booksCount$: Observable<number>;
  booksPrice$: Observable<number[]>;
  fullPrice$: Observable<number>;
  offers$: Observable<OfferModel[]>;
  bestOffer$: Observable<OfferModel>;
  amount$: Observable<number>;
  subscriptions: Subscription[] = [];

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.books$ = this.store.select(fromRoot.getCartBooks);
    this.booksCount$ = this.books$.map(books => books.length);
    this.booksPrice$ = this.books$.map(books => new CartRules(books).getBooksPrice());
    this.fullPrice$ = this.books$.map(books => new CartRules(books).getFullPrice());

    this.offers$ = this.books$.switchMap(
      books => this.store.select(fromRoot.getCartOffers).map(
        offers => new CartRules(books).getDiscountPrices(offers)
      )
    );
    this.bestOffer$ = this.offers$.map(offers => offers[0]);

    this.amount$ = Observable.combineLatest(this.fullPrice$, this.bestOffer$).map(
      value => value[1] ? value[1].price : value[0]
    );

    this.subscriptions.push(this.books$.subscribe(
      books => this.store.dispatch(new CartActions.GetOffers(books.map(book => book.isbn)))
    ));
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

  onCheckout(amount: number) {
    window.alert(`
Montant à régler : ${amount} €
Veuillez patienter, vous allez être redirigé vers l'agence Xebia...`
    );
  }
}
