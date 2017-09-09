import { Action } from '@ngrx/store';

import * as TestActions from './test.actions';

export interface State {
  items: any[];
}

const initialState: State = {
  items: ['Hello', 'World!']
};

export function reducer(state: State = initialState, action: TestActions.All) {
  switch (action.type) {
    case TestActions.ADD:
      return {
        ...state,
        items: [...state.items, action.payload]
      };

    case TestActions.REMOVE:
      state.items.pop();
      return {
        ...state,
        items: [...state.items]
      };

    default:
      return state;
  }
}
