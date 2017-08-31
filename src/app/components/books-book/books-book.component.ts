import { Component, OnInit, Input } from '@angular/core';

import { BooksModel } from '../../models/books.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-books-book',
  templateUrl: './books-book.component.html',
  styleUrls: ['./books-book.component.css']
})
export class BooksBookComponent implements OnInit {
  @Input() book: BooksModel;
  @Input() index: number;
  readMore = false;
  isbn: string[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.subscribe(isbn => this.isbn = isbn);
  }

  onAction() {
    !this.isAdded() ? this.add() : this.remove();
  }

  add() {
    this.cartService.set(this.book.isbn, 1);
  }

  remove() {
    this.cartService.set(this.book.isbn, 0);
  }

  isAdded() {
    return this.isbn.indexOf(this.book.isbn) !== -1;
  }
}
