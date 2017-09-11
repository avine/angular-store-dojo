import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './store/reducers';
import { BooksEffects } from './store/books/books.effects';
import { CartEffects } from './store/cart/cart.effects';

import { BooksService } from './services/books.service';

import { AppComponent } from './app.component';
import { BooksBookComponent } from './components/books-book/books-book.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BooksCartComponent } from './components/books-cart/books-cart.component';
import { BooksBasketComponent } from './components/books-basket/books-basket.component';
import { AllInOneComponent } from './components/all-in-one/all-in-one.component';

const routes = [
  { path: 'list', component: BooksListComponent },
  { path: 'cart', component: BooksCartComponent },
  { path: 'all', component: AllInOneComponent },
  { path: '**', redirectTo: '/list' }
];

@NgModule({
  declarations: [
    AppComponent,
    BooksBookComponent,
    BooksListComponent,
    BooksCartComponent,
    BooksBasketComponent,
    AllInOneComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([BooksEffects, CartEffects])
  ],
  providers: [BooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
