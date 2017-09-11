import * as CartActions from './cart.actions';

import { BookModel } from '../../models/book.model';
import { OfferModel } from '../../models/offer.model';
import { CartRules } from '../../rules/cart.rules';

export interface State {
  books: BookModel[];
  offers: OfferModel[];
}

const initialState: State = {
  books: [],
  offers: []
};

export function reducer(state: State = initialState, action: CartActions.All): State {
  switch (action.type) {
    case CartActions.SET_BOOK: {
      const cart = new CartRules(state.books);
      cart.addBook(action.payload.book, action.payload.units);
      return { ...state, books: [...cart.books] };
    }

    case CartActions.EMPTY_CART: {
      return { ...state, books: [] };
    }

    case CartActions.GET_OFFERS_SUCCESS: {
      return { ...state, offers: [...action.payload] };
    }

    default: {
      return state;
    }
  }
}
