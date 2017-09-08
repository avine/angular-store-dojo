import * as fromTest from './test.reducer';

export interface State {
  test: fromTest.State;
}

export const reducers = {
  test: fromTest.reducer
};
