import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

import { BookModel } from '../models/book.model';
import { OfferModel } from '../models/offer.model';

@Injectable()
export class BooksService {
  constructor(private http: Http) {
  }

  getBooks() {
    return this.http.get(environment.booksUrl).map(
      response => response.json() as BookModel[]
    );
  }

  getOffers(isbn: string[]) {
    if (isbn && isbn.length) {
      return this.http.get(`${environment.booksUrl}/${isbn}/commercialOffers`).map(
        response => response.json().offers as OfferModel[]
      );
    } else {
      return new Observable(observer => {
        observer.next([]);
        observer.complete();
      });
    }
  }
}
