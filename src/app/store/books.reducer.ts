import { Action } from '@ngrx/store';

import { BookModel } from '../models/book.model';
import * as BooksActions from './books.actions';

export type State = BookModel[];

const initialState: State = [];

export function reducer(state: State = initialState, action: BooksActions.All) {
  switch (action.type) {
    case BooksActions.GET_BOOKS_SUCCESS:
      return [...action.payload];

    default:
      return state;
  }
}
