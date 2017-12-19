import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { BookModel } from '../../../models/book.model';

@Component({
  selector: 'app-books-book',
  templateUrl: './books-book.component.html',
  styleUrls: ['./books-book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksBookComponent {
  @Input() book: BookModel;
  @Input() units: number;
  @Output() onUnitsChanged = new EventEmitter<number>();
  readMore = false;

  onChange(units: string) {
    this.onUnitsChanged.emit(parseInt(units, 10));
  }
}
