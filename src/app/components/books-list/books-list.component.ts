import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { BooksModel } from '../../models/books.model';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  public books = new BehaviorSubject<BooksModel[]>([]);

  constructor(private booksService: BooksService) {
  }

  ngOnInit() {
    this.booksService.getList().subscribe(list => this.books.next(list.json() as BooksModel[]));
  }

}
