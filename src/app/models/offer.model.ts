export interface OfferModel {
  type: OfferType;
  value: number;
  sliceValue?: number;
  price?: number;
}

export type OfferType = 'percentage' | 'minus' | 'slice';
