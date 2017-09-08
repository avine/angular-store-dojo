import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { BookModel } from '../../models/book.model';

import { BooksService } from '../../services/books.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit, OnDestroy {
  books: BookModel[] = [];
  units = {};
  subscriptions: Subscription[] = [];

  constructor(
    private booksService: BooksService,
    private cartService: CartService) {
  }

  ngOnInit() {
    this.subscriptions.push(this.booksService.books.subscribe(books =>
      this.books = BooksService.duplicate(books)
    ));
    this.subscriptions.push(this.cartService.cart.subscribe(items => {
      this.units = {};
      items.forEach(item =>
        this.units[item.isbn] = item.units
      );
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onUnitsChanged(book: BookModel, units: string) {
    this.cartService.set(book, parseInt(units, 10));
  }
}
