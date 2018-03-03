import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../store/reducers';

@Component({
  selector: 'app-books-basket',
  templateUrl: './books-basket.component.html',
  styleUrls: ['./books-basket.component.scss']
})
export class BooksBasketComponent implements OnInit {
  total$: Observable<number>;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.total$ = this.store.select(fromRoot.getCartBooks).pipe(
      map(books => books.reduce((total, book) => total + book.units, 0))
    );
  }
}
