import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BookModel } from '../models/book.model';
import { OfferModel, OfferType } from '../models/offer.model';

// This import is needed to run `npm test` successfully.
import 'rxjs/add/operator/map';
// import { map } from 'rxjs/operator/map'; // TODO: replace with this syntax for all occurences

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
  getDependency(token) {
    return this.fixture.debugElement.injector.get(token);
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
  static changeCheckbox(de: DebugElement, checked: boolean) {
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

export interface OfferParamModel {
  type?: OfferType;
  value?: number;
  sliceValue?: number;
  price?: number;
}

export const getBook = (book: BookParamModel = {}): BookModel =>
  Object.assign({
    isbn: '12345',
    price: 10,
    title: 'title',
    cover: 'cover.png',
    synopsis: ['synopsis']
  } as BookModel, book);

export const getOffer = (offer: OfferParamModel = {}): OfferModel =>
  Object.assign({
    type: 'percentage',
    value: 10
  } as OfferModel, offer);
