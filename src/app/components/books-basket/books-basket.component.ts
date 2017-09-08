import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { BookModel } from '../../models/book.model';
import { OfferModel } from '../../models/offer.model';

import { CartService } from '../../services/cart.service';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-books-basket',
  templateUrl: './books-basket.component.html',
  styleUrls: ['./books-basket.component.css']
})
export class BooksBasketComponent implements OnInit, OnDestroy {
  total: number;
  subscription: Subscription;

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.subscription = this.cartService.cart.subscribe(items => {
      this.total = items.reduce((total, item) => total + item.units, 0);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
