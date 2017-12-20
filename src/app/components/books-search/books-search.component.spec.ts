import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import * as helper from '../../testing/helper';
import { BooksSearchComponent } from './books-search.component';
import { SearchModel } from '../../models/search.model';

@Component({
  template: `
    <app-books-search (onSearch)="onSearch($event)"></app-books-search>
  `
})
class HostComponent {
  onSearch(search: SearchModel) {
  }
}

const t = helper.Trigger;

describe('BooksSearchComponent', () => {
  let f: helper.Fixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponent, BooksSearchComponent]
    });

    f = new helper.Fixture(TestBed.createComponent(HostComponent));
    f.fixture.detectChanges();
  });

  it('should switch to fullSearch', () => {
    const onSearch = spyOn(f.component, 'onSearch');

    t.checkboxChange(f.queryByCss('[test-checkbox]'), true);
    f.fixture.detectChanges();

    expect(onSearch).toHaveBeenCalledWith({ term: '', fullSearch: true } as SearchModel);
  });

  it('should change the search term', () => {
    const onSearch = spyOn(f.component, 'onSearch');

    t.inputText(f.queryByCss('.search-input'), 'hello');
    f.fixture.detectChanges();

    expect(onSearch).toHaveBeenCalledWith({ term: 'hello', fullSearch: false } as SearchModel);
  });
});
