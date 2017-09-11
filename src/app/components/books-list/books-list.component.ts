import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { BookModel } from '../../models/book.model';

import { BooksService } from '../../services/books.service';
import { CartService } from '../../services/cart.service';

import * as fromRoot from '../../store/reducers';
import * as BooksActions from '../../store/books/books.actions';
import * as CartActions from '../../store/cart/cart.actions';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit, OnDestroy {
  books: Observable<BookModel[]>;
  units = {};
  subscription: Subscription;

  constructor(
    private cartService: CartService,
    private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.store.dispatch(new BooksActions.GetBooks());
    this.books = this.store.select(fromRoot.getBooks);

    this.subscription = this.cartService.cart.subscribe(items => {
      this.units = {};
      items.forEach(item =>
        this.units[item.isbn] = item.units
      );
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onUnitsChanged(book: BookModel, units: string) {
    // Old version...
    this.cartService.set(book, parseInt(units, 10));

    // New version...
    // this.store.dispatch(new CartActions.SetBook(book, parseInt(units, 10)));
  }
}
