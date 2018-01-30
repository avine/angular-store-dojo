import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';

import { BookModel } from '../../models/book.model';
import { deleteAnimation } from '../../animations/animations';

@Component({
  selector: 'app-books-cart-summary',
  templateUrl: './books-cart-summary.component.html',
  styleUrls: ['./books-cart-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('delete', [
      transition(':leave', useAnimation(deleteAnimation))
    ])
  ]
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
