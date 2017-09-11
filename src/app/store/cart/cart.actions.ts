import { Action } from '@ngrx/store';

import { BookModel } from '../../models/book.model';
import { OfferModel } from '../../models/offer.model';

export const SET_BOOK = '[CART] SET_BOOK';
export class SetBook implements Action {
  readonly type = SET_BOOK;
  payload: { book: BookModel, units: number };
  constructor(book: BookModel, units: number) {
    this.payload = { book, units };
  }
}

export const EMPTY_CART = '[CART] EMPTY_CART';
export class EmptyCart implements Action {
  readonly type = EMPTY_CART;
}

export const GET_OFFERS = '[CART] GET_OFFERS';
export class GetOffers implements Action {
  readonly type = GET_OFFERS;
  constructor(public payload: string[]) {
  }
}

export const GET_OFFERS_SUCCESS = '[CART] GET_OFFERS_SUCCESS';
export class GetOffersSuccess implements Action {
  readonly type = GET_OFFERS_SUCCESS;
  constructor(public payload: OfferModel[]) {
  }
}

export type All = SetBook | EmptyCart | GetOffers | GetOffersSuccess;
