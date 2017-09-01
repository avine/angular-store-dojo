import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { environment } from '../../environments/environment';

import { BookModel } from '../models/book.model';

@Injectable()
export class BooksService {
  books = new ReplaySubject<BookModel[]>(1);

  static duplicate(books: BookModel[]) {
    return books.map(book => Object.assign({}, book));
  }

  constructor(private http: Http) {
    this.http.get(environment.booksUrl).subscribe(
      books => this.books.next(books.json())
    );
  }

  offers(isbn: string[]) {
    return this.http.get(`${environment.booksUrl}/${isbn}/commercialOffers`);
  }
}
