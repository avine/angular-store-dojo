import { Action } from '@ngrx/store';

import { BookModel } from '../models/book.model';

export const GET_BOOKS = '[BOOKS] GET_BOOKS';
export const GET_BOOKS_SUCCESS = '[BOOKS] GET_BOOKS_SUCCESS';

export class GetBooks implements Action {
  readonly type = GET_BOOKS;
}

export class GetBooksSuccess implements Action {
  readonly type = GET_BOOKS_SUCCESS;
  constructor(public payload: BookModel[]) {
  }
}

export type All = GetBooks | GetBooksSuccess;
