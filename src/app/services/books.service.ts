import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { environment } from '../../environments/environment';

import { BooksModel } from '../models/books.model';

@Injectable()
export class BooksService {
  private books = new ReplaySubject<BooksModel[]>(1);

  static duplicate(books) {
    return books.map(book => Object.assign({}, book));
  }

  constructor(private http: Http) {
    this.http.get(environment.booksUrl).subscribe(
      books => this.books.next(books.json())
    );
  }

  list(callback) {
    return this.books.subscribe(books => callback(BooksService.duplicate(books)));
  }

  offers(isbn: string[]) {
    return this.http.get(`${environment.booksUrl}/${isbn}/commercialOffers`);
  }
}
