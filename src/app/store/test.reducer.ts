import { Action } from '@ngrx/store';

import * as testActions from './test.actions';

export interface State {
  items: any[];
}

const initialState: State = {
  items: ['Hello', 'World!']
};

export function reducer(state: State = initialState, action: testActions.All) {
  switch (action.type) {
    case testActions.ADD:
      return {
        ...state,
        items: [...state.items, action.payload]
      };

    case testActions.REMOVE:
      state.items.pop();
      return {
        ...state,
        items: [...state.items]
      };

    default:
      return state;
  }
}
