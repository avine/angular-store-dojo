import { Component, OnInit } from '@angular/core';

import { BooksModel } from '../../models/books.model';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  public books: BooksModel[] = [];

  constructor(private booksService: BooksService) {
  }

  ngOnInit() {
    this.booksService.list(books => this.books = books);
  }

}
