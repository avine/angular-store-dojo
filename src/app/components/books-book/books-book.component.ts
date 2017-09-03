import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { BookModel } from '../../models/book.model';

@Component({
  selector: 'app-books-book',
  templateUrl: './books-book.component.html',
  styleUrls: ['./books-book.component.css']
})
export class BooksBookComponent implements OnInit {
  @Input() book: BookModel;
  @Input() units: number;
  @Output() onUnitsChanged = new EventEmitter<number>();
  readMore = false;

  constructor() {
  }

  ngOnInit() {
  }

  onChange(units: number) {
    this.onUnitsChanged.emit(units);
  }
}
