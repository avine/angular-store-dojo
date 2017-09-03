import { Component, OnInit } from '@angular/core';

import { BookModel } from '../../models/book.model';

import { BooksService } from '../../services/books.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  books: BookModel[] = [];
  units = {};

  constructor(
    private booksService: BooksService,
    private cartService: CartService) {
  }

  ngOnInit() {
    this.booksService.books.subscribe(books =>
      this.books = BooksService.duplicate(books)
    );
    this.cartService.cart.subscribe(items => {
      this.units = {};
      items.forEach(item =>
        this.units[item.isbn] = item.units
      );
    });
  }

  onUnitsChanged(book: BookModel, units: string) {
    this.cartService.set(book, parseInt(units, 10));
  }
}
