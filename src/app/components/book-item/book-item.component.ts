import { Component, OnInit, Input } from '@angular/core';

import { BooksModel } from '../../models/books.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {
  @Input() book: BooksModel;
  moreSynopsis = false;
  isbn: string[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.subscribe(isbn => this.isbn = isbn);
  }

  add() {
    this.cartService.add(this.book.isbn);
  }

  remove() {
    this.cartService.remove(this.book.isbn);
  }

  isAdded() {
    return this.isbn.indexOf(this.book.isbn) !== -1;
  }
}
