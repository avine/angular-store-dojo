import { Action } from '@ngrx/store';

import { BookModel } from '../models/book.model';
import * as CartActions from './cart.actions';

export interface State {
  books: BookModel[];
}

const initialState: State = {
  books: []
};

export function reducer(state: State = initialState, action: CartActions.All) {
  switch (action.type) {
    case CartActions.SET_BOOK: {
      // TODO: should be done as before in some function (ie: cart.service.ts)
      const book = action.payload.book;
      const units = action.payload.units;
      if (units === 0) {
        state.books = state.books.filter(item => item.isbn !== book.isbn);
      } else {
        const filtered = state.books.filter(item => item.isbn === book.isbn);
        if (filtered.length) {
          filtered[0].units = units;
        } else {
          state.books.push(Object.assign({ units }, book) as BookModel);
        }
      }
      return {
        ...state,
        books: [...state.books]
      };
    }

    default:
      return state;
  }
}
