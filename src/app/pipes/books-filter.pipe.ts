import { Pipe, PipeTransform } from '@angular/core';

import { BookModel } from '../models/book.model';

@Pipe({
  name: 'booksFilter',
  pure: false
})
export class BooksFilterPipe implements PipeTransform {

  transform(books: BookModel[], text: string, fullSearch = false): BookModel[] {
    return !text ? books : books.filter(book =>
      new RegExp(text, 'i').test(
        [book.title].concat(fullSearch ? book.synopsis : []).join(' ')
      )
    );
  }

}
