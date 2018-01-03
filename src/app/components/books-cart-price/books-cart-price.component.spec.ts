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

  it('show only full price when no best offer available', () => {
    f.component.fullPrice = 100;
    f.fixture.detectChanges();

    expect(f.queryByCss('.bestPrice')).toBeNull();
    expect(f.queryByCss('.price-dashed')).toBeNull();

    const fullprice: HTMLElement = f.queryByCss('[test-fullprice]').nativeElement;
    expect(fullprice.textContent).toContain('100');
  });

  it('show dashed full price and best price when best price available', () => {
    f.component.fullPrice = 100;
    f.component.bestOffer = { type: 'percentage', value: 10, price: 90 };
    f.fixture.detectChanges();

    const bestPrice: HTMLElement = f.queryByCss('.bestPrice').nativeElement;
    expect(bestPrice.textContent).toContain('90');

    const fullprice: HTMLElement = f.queryByCss('.price-dashed').nativeElement;
    expect(fullprice.textContent).toContain('100');
  });

  it('show offer description', () => {
    f.component.fullPrice = 100;

    // Percentage
    f.component.bestOffer = { type: 'percentage', value: 10, price: 90 };
    f.fixture.detectChanges();
    let offerDesc: HTMLElement = f.queryByCss('.offer-desc').nativeElement;
    expect(offerDesc.textContent).toContain('10 %');

    // Minus
    f.component.bestOffer = { type: 'minus', value: 10, price: 90 };
    f.fixture.detectChanges();
    offerDesc = f.queryByCss('.offer-desc').nativeElement;
    expect(offerDesc.textContent).toContain('10 €');

    // Slice
    f.component.bestOffer = { type: 'slice', value: 10, sliceValue: 50, price: 80 };
    f.fixture.detectChanges();
    offerDesc = f.queryByCss('.offer-desc').nativeElement;
    expect(offerDesc.textContent).toContain('10 €');
    expect(offerDesc.textContent).toContain('50 €');
  });

  it('show checkout button when books count available', () => {
    expect(f.queryByCss('.checkout')).toBeNull();

    f.component.booksCount = 1;
    f.fixture.detectChanges();

    expect(f.queryByCss('.checkout')).not.toBeNull();
  });
});
