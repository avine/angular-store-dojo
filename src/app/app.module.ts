import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { BooksService } from './services/books.service';
import { CartService } from './services/cart.service';

import { AppComponent } from './app.component';
import { BookItemComponent } from './components/book-item/book-item.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BooksCartComponent } from './components/books-cart/books-cart.component';

const routes = [
  { path: 'list', component: BooksListComponent },
  { path: 'cart', component: BooksCartComponent },
  { path: '**', redirectTo: '/list' }
];

@NgModule({
  declarations: [
    AppComponent,
    BookItemComponent,
    BooksListComponent,
    BooksCartComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    BooksService,
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
