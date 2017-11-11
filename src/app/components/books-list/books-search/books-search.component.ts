import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { SearchModel } from '../../../models/search.model';

@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksSearchComponent {
  placeholder = [
    'Rechercher dans le titre',
    'Rechercher dans le titre et le synopsis'
  ];

  @Output() onSearch = new EventEmitter<SearchModel>();

  onChange(term: string, fullSearch: boolean) {
    this.onSearch.emit({ term, fullSearch });
  }
}
