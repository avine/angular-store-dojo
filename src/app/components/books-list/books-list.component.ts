import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { BookModel } from '../../models/book.model';

import * as fromRoot from '../../store/reducers';
import * as BooksActions from '../../store/books/books.actions';
import * as CartActions from '../../store/cart/cart.actions';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  books: Observable<BookModel[]>;
  units: Observable<{}>;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.store.dispatch(new BooksActions.GetBooks());
    this.books = this.store.select(fromRoot.getBooks);

    this.units = this.store.select(fromRoot.getCartBooks).map(items => {
      const units = {};
      items.forEach(item => units[item.isbn] = item.units);
      return units;
    });
  }

  onUnitsChanged(book: BookModel, units: string) {
    this.store.dispatch(new CartActions.SetBook(book, parseInt(units, 10)));
  }
}
