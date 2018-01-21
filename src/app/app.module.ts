import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import { BooksListComponent } from './containers/books-list/books-list.component';
import { BooksCartComponent } from './containers/books-cart/books-cart.component';
import { BooksBasketComponent } from './containers/books-basket/books-basket.component';
import { AllInOneComponent } from './containers/all-in-one/all-in-one.component';
import { BooksSearchComponent } from './components/books-search/books-search.component';
import { BooksBookComponent } from './components/books-book/books-book.component';
import { BooksCartSummaryComponent } from './components/books-cart-summary/books-cart-summary.component';
import { BooksCartPriceComponent } from './components/books-cart-price/books-cart-price.component';

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
    BooksCartComponent,
    BooksBasketComponent,
    AllInOneComponent,
    BooksSearchComponent,
    BooksBookComponent,
    BooksCartSummaryComponent,
    BooksCartPriceComponent,
    BooksFilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([BooksEffects, CartEffects]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [BooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
