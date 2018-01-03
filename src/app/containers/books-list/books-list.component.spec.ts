import { Component, DebugElement } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';

import * as helper from '../../testing/helper';

import * as fromRoot from '../../store/reducers';
import * as BooksActions from '../../store/books/books.actions';

import { BooksListComponent } from './books-list.component';
import { BooksBookComponent } from '../../components/books-book/books-book.component';
import { BooksSearchComponent } from '../../components/books-search/books-search.component';
import { BooksFilterPipe } from '../../pipes/books-filter.pipe';

const t = helper.Trigger;

describe('BooksListComponent', () => {
  let store: Store<fromRoot.State>;
  let f: helper.Fixture<BooksListComponent>;
  let expectBooksLengthToBe: (length: number) => DebugElement[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(fromRoot.reducers)
      ],
      declarations: [
        BooksListComponent,
        BooksBookComponent,
        BooksSearchComponent,
        BooksFilterPipe
      ]
    });

    f = new helper.Fixture(TestBed.createComponent(BooksListComponent));

    // We do not provide store @Effects.
    // Thus we have to manually dispatch effect 'success' with the appropriate payload.
    store = TestBed.get(Store);
    store.dispatch(new BooksActions.GetBooksSuccess([
      helper.getBook({ isbn: '1', title: 'ab', synopsis: ['cd'] }),
      helper.getBook({ isbn: '2', title: 'ef', synopsis: ['gh'] })
    ]));
    f.fixture.detectChanges();

    // Helper to find how many books are displayed in the UI.
    // This helper also return the list of DebugElement founded.
    expectBooksLengthToBe = function (length: number) {
      // Detect changes
      f.fixture.detectChanges();
      // Find books
      const books = f.queryAllByDirective(BooksBookComponent);
      // Expect length
      expect(books.length).toBe(length);
      // Return books
      return books;
    };
  });

  it('display list of books', () => {
    expectBooksLengthToBe(2);
  });

  it('filter books by title and synopsis', () => {
    // Filter books by title only
    helper.Trigger.inputText(f.queryByCss('.search-input'), 'ab');
    expectBooksLengthToBe(1);

    // Filter by synopsis also, but checkbox NOT checked!
    helper.Trigger.inputText(f.queryByCss('.search-input'), 'cd');
    expectBooksLengthToBe(0);

    // Filter by synopsis also, with checkbox checked!
    helper.Trigger.changeCheckbox(f.queryByCss('[test-checkbox]'), true);
    expectBooksLengthToBe(1);
  });
});
