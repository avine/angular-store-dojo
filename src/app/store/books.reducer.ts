import { Action } from '@ngrx/store';

import { BookModel } from '../models/book.model';
import { OfferModel } from '../models/offer.model';
import * as BooksActions from './books.actions';

export interface State {
  books: BookModel[];
  offers: OfferModel[];
}

const initialState: State = {
  books: [],
  offers: []
};

export function reducer(state: State = initialState, action: BooksActions.All) {
  switch (action.type) {
    case BooksActions.GET_BOOKS_SUCCESS:
      return {
        ...state,
        books: [...action.payload] // FIXME: need a deep copy of that object ?
      };

    default:
      return state;
  }
}
