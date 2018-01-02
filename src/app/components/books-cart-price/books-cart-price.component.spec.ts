import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import * as helper from '../../testing/helper';
import { BooksCartPriceComponent } from './books-cart-price.component';
import { OfferModel } from '../../models/offer.model';

@Component({
  template: `
    <app-books-cart-price
      [booksCount]="booksCount"
      [fullPrice]="fullPrice"
      [bestOffer]="bestOffer"
      (onCheckout)="onCheckout($event)"></app-books-cart-price>
  `
})
class HostComponent {
  booksCount: number;
  fullPrice: number;
  bestOffer: OfferModel;

  onCheckout(x) {
    console.log(x);
  }
}

const t = helper.Trigger;

describe('BooksCartPriceComponent', () => {
  let f: helper.Fixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponent, BooksCartPriceComponent]
    });

    f = new helper.Fixture(TestBed.createComponent(HostComponent));
    f.fixture.detectChanges();
  });

  it('should have only full price when no best offer available', () => {
    f.component.fullPrice = 100;
    f.fixture.detectChanges();

    expect(f.queryByCss('.bestPrice')).toBeNull();
    expect(f.queryByCss('.price-dashed')).toBeNull();

    const fullprice: HTMLElement = f.queryByCss('[test-fullprice]').nativeElement;
    expect(fullprice.textContent).toContain('100');
  });

  it('should have full price dashed and best price when best price available', () => {
    f.component.fullPrice = 100;
    f.component.bestOffer = { type: 'percentage', value: 10, price: 90 };
    f.fixture.detectChanges();

    const bestPrice: HTMLElement = f.queryByCss('.bestPrice').nativeElement;
    expect(bestPrice.textContent).toContain('90');

    const fullprice: HTMLElement = f.queryByCss('.price-dashed').nativeElement;
    expect(fullprice.textContent).toContain('100');
  });

  // TODO: test "offer-desc"
  // ...

  it('should have checkout button when books count available', () => {
    expect(f.queryByCss('.checkout')).toBeNull();

    f.component.booksCount = 1;
    f.fixture.detectChanges();

    expect(f.queryByCss('.checkout')).not.toBeNull();
  });
});
