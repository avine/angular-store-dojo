import * as BooksActions from './books.actions';

import { BookModel } from '../../models/book.model';

export type State = BookModel[];

// Initial state should be `null` in order to be able to display the 'Loading...' message.
// Thus, don't use an empty array as the initial state!
// Otherwise you can't know if it means 'Loading...' or there's no books to sell right now...
const initialState: State = null;

export function reducer(state: State = initialState, action: BooksActions.All) {
  switch (action.type) {
    case BooksActions.GET_BOOKS_SUCCESS: {
      return [...action.payload];
    }

    default: {
      return state;
    }
  }
}
