import * as fromBooks from './books.reducer';

export interface State {
  shop: fromBooks.State;
}

export const reducers = {
  shop: fromBooks.reducer
};

export function getBooks(state: State) {
  return state.shop.books;
}
