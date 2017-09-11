import { Action } from '@ngrx/store';

import { BookModel } from '../../models/book.model';

export const SET_BOOK = '[CART] SET_BOOK';
export const EMPTY_CART = '[CART] EMPTY_CART';

export class SetBook implements Action {
  readonly type = SET_BOOK;
  payload: { book: BookModel, units: number };
  constructor(book: BookModel, units: number) {
    this.payload = { book, units };
  }
}

export class EmptyCart implements Action {
  readonly type = EMPTY_CART;
}

export type All = SetBook | EmptyCart;
