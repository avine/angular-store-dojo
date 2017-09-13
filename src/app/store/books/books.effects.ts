import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import * as BooksActions from './books.actions';
import { BookModel } from '../../models/book.model';
import { BooksService } from '../../services/books.service';

@Injectable()
export class BooksEffects {
  @Effect()
  getBooks$: Observable<Action> = this.actions$.ofType(BooksActions.GET_BOOKS)
    .switchMap((action: BooksActions.GetBooks) => this.booksService.getBooks())
    .map((books: BookModel[]) => new BooksActions.GetBooksSuccess(books));

  constructor(
    private actions$: Actions,
    private booksService: BooksService
  ) { }
}
