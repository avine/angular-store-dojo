import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import * as CartActions from './cart.actions';
import { OfferModel } from '../../models/offer.model';
import { BooksService } from '../../services/books.service';

@Injectable()
export class CartEffects {
  @Effect()
  getOffers$: Observable<Action> = this.actions$.ofType(CartActions.GET_OFFERS)
    .switchMap((action: CartActions.GetOffers) => this.booksService.getOffers(action.payload))
    .map((offers: OfferModel[]) => new CartActions.GetOffersSuccess(offers));

  constructor(
    private actions$: Actions,
    private booksService: BooksService
  ) { }
}
