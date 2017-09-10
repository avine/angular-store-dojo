import { Action } from '@ngrx/store';

import { BookModel } from '../models/book.model';

export const SET_BOOK = '[CART] SET_BOOK';

export class SetBook implements Action {
  readonly type = SET_BOOK;
  constructor(public payload: { book: BookModel, units: number }) {
  }
}

export type All = SetBook;
