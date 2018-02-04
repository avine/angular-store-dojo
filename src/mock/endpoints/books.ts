import * as express from 'express';

import books from '../data/books';

const router = express.Router();
router.get('/books', (req, res) => res.json(books));

export default router;
