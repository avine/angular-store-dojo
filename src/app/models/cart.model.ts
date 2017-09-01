import { BookModel } from './book.model';

export interface CartModel extends BookModel {
  units: number;
}
