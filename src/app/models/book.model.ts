export interface BookModel {
  isbn: string;
  price: number;
  title: string;
  cover: string;
  synopsis: string[];
  units?: number;
}
