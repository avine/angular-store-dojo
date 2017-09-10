import * as fromBooks from './books.reducer';
import * as fromCart from './cart.reducer';

export interface State {
  books: fromBooks.State;
  cart: fromCart.State;
}

export const reducers = {
  books: fromBooks.reducer,
  cart: fromCart.reducer
};

export function getBooks(state: State) {
  return state.books;
}

export function getCartBooks(state: State) {
  return state.cart.books;
}
