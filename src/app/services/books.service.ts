import 'rxjs/add/observable/empty';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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
      return this.http.get(`${environment.booksUrl}/${isbn}/commercialOffers`).map(
        response => (response as any).offers
      );
    } else {
      return Observable.empty();
    }
  }
}
