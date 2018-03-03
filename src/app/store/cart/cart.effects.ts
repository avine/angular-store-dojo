import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { switchMap, map } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import * as CartActions from './cart.actions';
import { OfferModel } from '../../models/offer.model';
import { BooksService } from '../../services/books.service';

@Injectable()
export class CartEffects {
  @Effect()
  getOffers$: Observable<Action> = this.actions$.ofType(CartActions.GET_OFFERS).pipe(
    switchMap((action: CartActions.GetOffers) => this.booksService.getOffers(action.payload)),
    map((offers: OfferModel[]) => new CartActions.GetOffersSuccess(offers))
  );

  constructor(
    private actions$: Actions,
    private booksService: BooksService
  ) { }
}
