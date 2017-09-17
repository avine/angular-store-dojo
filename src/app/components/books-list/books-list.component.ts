import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { BookModel } from '../../models/book.model';

import * as fromRoot from '../../store/reducers';
import * as BooksActions from '../../store/books/books.actions';
import * as CartActions from '../../store/cart/cart.actions';

import { CartRules } from '../../rules/cart.rules';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  books$: Observable<BookModel[]>;
  units$: Observable<{}>;
  filterTerm = '';
  filterLabel = [
    'Rechercher dans le titre',
    'Rechercher dans le titre et le synopsis'
  ];
  fullSearch = false;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.store.dispatch(new BooksActions.GetBooks());
    this.books$ = this.store.select(fromRoot.getBooks);
    this.units$ = this.store.select(fromRoot.getCartBooks).map(
      books => new CartRules(books).getUnitsPerIsbn()
    );
  }

  onUnitsChanged(book: BookModel, units: string) {
    this.store.dispatch(new CartActions.SetBook(book, parseInt(units, 10)));
  }
}
