import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { BooksService } from './services/books.service';

import { AppComponent } from './app.component';
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
    BooksListComponent,
    BooksCartComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    BooksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
