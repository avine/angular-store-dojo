import { Pipe, PipeTransform } from '@angular/core';

import { BookModel } from '../models/book.model';

@Pipe({
  name: 'booksFilter',
  pure: false
})
export class BooksFilterPipe implements PipeTransform {

  transform(books: BookModel[], term: string, fullSearch = false): BookModel[] {
    return !term ? books : books.filter(book =>
      new RegExp(term, 'i').test(
        [book.title].concat(fullSearch ? book.synopsis : []).join(' ')
      )
    );
  }

}
