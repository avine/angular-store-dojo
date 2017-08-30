import { Component, OnInit } from '@angular/core';

import { BooksService } from '../../services/books.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-books-cart',
  templateUrl: './books-cart.component.html',
  styleUrls: ['./books-cart.component.css']
})
export class BooksCartComponent implements OnInit {
  items: string[];

  constructor(private booksService: BooksService, private cartService: CartService) { }

  ngOnInit() {
    this.cartService.subscribe(items => {
      this.items = items;
      this.getOffers();
    });
  }

  getOffers() {
    if (this.items.length) {
      this.booksService.getOffers(this.items).subscribe(offers => console.log('offers', offers.json()));
    }
  }
}
