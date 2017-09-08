import { Action } from '@ngrx/store';

export const ADD = 'ADD';
export const REMOVE = 'REMOVE';

export class Add implements Action {
  readonly type = ADD;
  constructor(public payload: any) {}
}

export class Remove implements Action {
  readonly type = REMOVE;
  constructor(public payload: any = null) {}
}

export type All = Add | Remove;
