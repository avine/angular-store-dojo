import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { BookModel } from '../../models/book.model';
import { SearchModel } from '../../models/search.model';

import * as fromRoot from '../../store/reducers';
import * as BooksActions from '../../store/books/books.actions';
import * as CartActions from '../../store/cart/cart.actions';

import { CartRules } from '../../rules/cart.rules';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {
  books$: Observable<BookModel[]>;
  units$: Observable<{}>;
  search: SearchModel;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.store.dispatch(new BooksActions.GetBooks());
    this.books$ = this.store.select(fromRoot.getBooks);
    this.units$ = this.store.select(fromRoot.getCartBooks).pipe(
      map(books => new CartRules(books).getUnitsPerIsbn())
    );
  }

  onUnitsChanged(book: BookModel, units: string) {
    this.store.dispatch(new CartActions.SetBook(book, parseInt(units, 10)));
  }

  onSearch(search: SearchModel) {
    this.search = search;
  }
}
