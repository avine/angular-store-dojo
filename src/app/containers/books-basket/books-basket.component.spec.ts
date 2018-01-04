import { Component, DebugElement } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';

import * as helper from '../../testing/helper';

import * as fromRoot from '../../store/reducers';
import * as CartActions from '../../store/cart/cart.actions';

import { BooksBasketComponent } from './books-basket.component';

const t = helper.Trigger;

describe('BooksBasketComponent', () => {
  let f: helper.Fixture<BooksBasketComponent>;
  let store: Store<fromRoot.State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(fromRoot.reducers)
      ],
      declarations: [BooksBasketComponent]
    });

    f = new helper.Fixture(TestBed.createComponent(BooksBasketComponent));
    store = TestBed.get(Store);
    f.fixture.detectChanges();
  });

  it('display total cart items', () => {
    let container: HTMLElement = f.queryByCss('.container').nativeElement;
    expect(container.innerText).not.toContain('3');

    store.dispatch(new CartActions.SetBook(helper.getBook({ isbn: '1'}), 1));
    store.dispatch(new CartActions.SetBook(helper.getBook({ isbn: '2'}), 2));
    f.fixture.detectChanges();

    container = f.queryByCss('.container').nativeElement;
    expect(container.innerText).toContain('3');
  });
});
