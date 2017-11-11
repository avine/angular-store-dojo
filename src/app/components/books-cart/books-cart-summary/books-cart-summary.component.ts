import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { BookModel } from '../../../models/book.model';

@Component({
  selector: 'app-books-cart-summary',
  templateUrl: './books-cart-summary.component.html',
  styleUrls: ['./books-cart-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksCartSummaryComponent {
  @Input() books: BookModel[];
  @Input() booksPrice: number[];
  @Output() onDelete = new EventEmitter<BookModel>();
  @Output() onEmpty = new EventEmitter<void>();

  delete(book: BookModel) {
    this.onDelete.emit(book);
  }

  empty() {
    this.onEmpty.emit();
  }
}
