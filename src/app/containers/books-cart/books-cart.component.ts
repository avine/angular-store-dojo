import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { BookModel } from '../../models/book.model';
import { OfferModel } from '../../models/offer.model';

import { CartDomain } from '../../domain/cart.domain';

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
    this.booksCount$ = this.books$.pipe(map(books => books.length));
    this.booksPrice$ = this.books$.pipe(map(books => new CartDomain(books).getBooksPrice()));
    this.fullPrice$ = this.books$.pipe(map(books => new CartDomain(books).getFullPrice()));

    this.offers$ = this.books$.pipe(
      switchMap(books => this.store.select(fromRoot.getCartOffers).pipe(
        map(offers => new CartDomain(books).getDiscountPrices(offers))
      ))
    );
    this.bestOffer$ = this.offers$.pipe(map(offers => offers[0]));

    this.amount$ = combineLatest(this.fullPrice$, this.bestOffer$).pipe(
      map(value => value[1] ? value[1].price : value[0])
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
    window.alert(`Montant à régler : ${amount} €`
    );
  }
}
