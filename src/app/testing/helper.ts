import { DebugElement } from '@angular/core';
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

export class Trigger {
  static click(de: DebugElement) {
    de.triggerEventHandler('click', null);
  }

  static inputText(de: DebugElement, value: string) {
    (de.nativeElement as HTMLInputElement).value = value;
    de.triggerEventHandler('input', null);
  }

  static checkboxChange(de: DebugElement, checked: boolean) {
    (de.nativeElement as HTMLInputElement).checked = checked;
    de.triggerEventHandler('change', null);
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
