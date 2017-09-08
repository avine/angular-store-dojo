import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { State } from './store/reducers';
import * as testActions from './store/test.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // -----------------
  // Testing "ngrx"...
  count = 1;
  testItems: Observable<any[]>;

  constructor(private store: Store<State>) {
    this.testItems = this.store.select(state => state.test.items);
  }

  addToStore() {
    this.store.dispatch(new testActions.Add(this.count++));
  }

  removeFromStore() {
    this.store.dispatch(new testActions.Remove());
  }
  // Testing "ngrx"...
  // -----------------
}
