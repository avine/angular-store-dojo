import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class BooksService {

  constructor(private http: Http) {
  }

  getList() {
    return this.http.get('http://henri-potier.xebia.fr/books');
  }

  getOffers() {
    // TODO...
  }
}
