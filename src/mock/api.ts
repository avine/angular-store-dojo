import { join } from 'path';
import * as express from 'express';

const app = express();

// Enable CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Serve images
app.use(express.static(join(__dirname, 'static')));

// Serve books
import booksRouter from './endpoints/books';
app.use('', booksRouter);

// Serve offers
import offersRouter from './endpoints/offers';
app.use('', offersRouter);

app.listen(4300, () => console.log(`Henri Potier mock's listening on port 4300!\n`));
