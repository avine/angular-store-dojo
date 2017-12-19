import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BookModel } from '../models/book.model';

export class Fixture<T> {
  component: T;

  constructor(public fixture: ComponentFixture<T>) {
    this.component = this.fixture.componentInstance;
  }

  queryByCss(css) {
    return this.fixture.debugElement.query(By.css(css));
  }

  queryAllByCss(css) {
    return this.fixture.debugElement.queryAll(By.css(css));
  }

  queryByDirective(directive) {
    return this.fixture.debugElement.query(By.directive(directive));
  }

  queryAllByDirective(directive) {
    return this.fixture.debugElement.queryAll(By.directive(directive));
  }
}

export interface BookParamModel {
  isbn?: string;
  price?: number;
  title?: string;
  cover?: string;
  synopsis?: string[];
  units?: number;
}

export const getBook = (book?: BookParamModel): BookModel =>
  Object.assign({
    isbn: '12345',
    price: 10,
    title: 'title',
    cover: 'cover.png',
    synopsis: ['synopsis']
  }, book ? book : {});
