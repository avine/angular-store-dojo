import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { BookModel } from '../models/book.model';
import { OfferModel } from '../models/offer.model';

@Injectable()
export class BooksService {
  constructor(private http: HttpClient) {
  }

  getBooks() {
    return this.http.get(environment.booksUrl) as Observable<BookModel[]>;
  }

  getOffers(isbn: string[]): Observable<OfferModel[]> {
    if (isbn && isbn.length) {
      return this.http.get(`${environment.booksUrl}/${isbn}/commercialOffers`).pipe(
        map(response => (response as any).offers)
      );
    } else {
      return empty();
    }
  }
}
