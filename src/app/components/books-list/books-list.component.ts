import { Component, OnInit } from '@angular/core';

import { BooksModel } from '../../models/books.model';
import { CartModel } from '../../models/cart.model';

import { BooksService } from '../../services/books.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  public books: BooksModel[] = [];
  public cart: CartModel[] = [];

  constructor(private booksService: BooksService, private cartService: CartService) {
  }

  ngOnInit() {
    this.booksService.list(books => this.books = books);
    this.cartService.subscribe(cart => this.cart = cart); // TODO: Use this to ckeck the number of units for each book...
  }

}
