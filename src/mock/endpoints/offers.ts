import * as express from 'express';

import * as offers from '../data/offers';

const router = express.Router();
router.get('/books/:list/commercialOffers', (req, res) => {
  const commercialOffers = [];
  const listLength = req.params.list.split(',').length;
  if (listLength === 2) {
    // For 2 isbn, you get a `percentage`
    commercialOffers.push(offers.percentage);
  }
  if (listLength >= 3) {
    // For 3 isbn and more, you get also `minus` and `slice`
    commercialOffers.push(offers.minus);
    commercialOffers.push(offers.slice);
  }
  res.json({ offers: commercialOffers });
});

export default router;
