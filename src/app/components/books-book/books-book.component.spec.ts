import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import * as helper from '../../testing/helper';
import { BooksBookComponent } from './books-book.component';

@Component({
  template: `
    <app-books-book
      [book]="book"
      [units]="units"
      (onUnitsChanged)="onChange($event)">
    </app-books-book>
  `
})
class HostComponent {
  book = helper.getBook();
  units = 1;

  onChange(units: number) {
  }
}

const t = helper.Trigger;

describe('BooksBookComponent', () => {
  let f: helper.Fixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponent, BooksBookComponent]
    });

    f = new helper.Fixture(TestBed.createComponent(HostComponent));
    f.fixture.detectChanges();
  });

  it('should set title', () => {
    const title: HTMLElement = f.queryByCss('.title').nativeElement;
    expect(title.innerText).toContain(f.component.book.title);
  });

  it('should set synopsis', () => {
    const synopsis: HTMLElement = f.queryByCss('[test-synopsis]').nativeElement;
    expect(synopsis.innerText).toContain(f.component.book.synopsis[0]);
  });

  it('should NOT have "read more" button when synopsis length equal to 0 or 1', () => {
    expect(f.queryByCss('.more')).toBeNull();
  });

  it('should have a "read more" button when there\'s at least 2 synopsis', () => {
    f.component.book = helper.getBook({ synopsis: ['synopsis1', 'synopsis2'] });
    f.fixture.detectChanges();

    expect(f.queryByCss('.more')).not.toBeNull();
  });

  it('should reveal more synopsis when clicking on "read more" button', () => {
    f.component.book = helper.getBook({ synopsis: ['synopsis1', 'synopsis2'] });
    f.fixture.detectChanges();
    expect(f.queryAllByCss('[test-synopsis]').length).toEqual(1);

    t.click(f.queryByCss('.more'));
    f.fixture.detectChanges();

    expect(f.queryAllByCss('[test-synopsis]').length).toEqual(2);
  });

  it('should change the number of units', () => {
    const onChange = spyOn(f.component, 'onChange');

    t.inputText(f.queryByCss('.units-input'), '2');
    f.fixture.detectChanges();

    expect(onChange).toHaveBeenCalledWith(2);
  });
});
