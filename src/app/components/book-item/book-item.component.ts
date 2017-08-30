import { Component, OnInit, Input } from '@angular/core';

import { BooksModel } from '../../models/books.model';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {
  @Input() book: BooksModel;
  moreSynopsis = false;

  constructor() { }

  ngOnInit() {

  }

  add() {

  }
}
