import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { OfferModel } from '../../../models/offer.model';

@Component({
  selector: 'app-books-cart-price',
  templateUrl: './books-cart-price.component.html',
  styleUrls: ['./books-cart-price.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksCartPriceComponent {
  @Input() booksCount: number;
  @Input() fullPrice: number;
  @Input() bestOffer: OfferModel;
  @Output() onCheckout = new EventEmitter<number>();

  checkout() {
    const amount = this.bestOffer ? this.bestOffer.price : this.fullPrice;
    this.onCheckout.emit(amount);
  }
}
