import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers } from './store/reducers';
import { BooksEffects } from './store/books/books.effects';
import { CartEffects } from './store/cart/cart.effects';

import { BooksService } from './services/books.service';

import { AppComponent } from './app.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BooksSearchComponent } from './components/books-list/books-search/books-search.component';
import { BooksBookComponent } from './components/books-list/books-book/books-book.component';
import { BooksCartComponent } from './components/books-cart/books-cart.component';
import { BooksCartSummaryComponent } from './components/books-cart/books-cart-summary/books-cart-summary.component';
import { BooksCartPriceComponent } from './components/books-cart/books-cart-price/books-cart-price.component';
import { BooksBasketComponent } from './components/books-basket/books-basket.component';
import { AllInOneComponent } from './components/all-in-one/all-in-one.component';

import { BooksFilterPipe } from './pipes/books-filter.pipe';

const routes = [
  { path: 'list', component: BooksListComponent },
  { path: 'cart', component: BooksCartComponent },
  { path: 'all', component: AllInOneComponent },
  { path: '**', redirectTo: '/list' }
];

@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    BooksSearchComponent,
    BooksBookComponent,
    BooksCartComponent,
    BooksCartSummaryComponent,
    BooksCartPriceComponent,
    BooksBasketComponent,
    AllInOneComponent,
    BooksFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([BooksEffects, CartEffects]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [BooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
