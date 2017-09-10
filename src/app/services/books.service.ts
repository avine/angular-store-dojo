import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

import { BookModel } from '../models/book.model';

@Injectable()
export class BooksService {
  static duplicate(books: BookModel[]) {
    return books.map(book => Object.assign({}, book));
  }

  constructor(private http: Http) {
  }

  getBooks() {
    return this.http.get(environment.booksUrl).map(
      response => response.json()
    );
  }

  getOffers(isbn: string[]) {
    return this.http.get(`${environment.booksUrl}/${isbn}/commercialOffers`).map(
      response => response.json().offers
    );
  }
}
