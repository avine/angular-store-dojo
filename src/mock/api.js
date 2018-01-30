const path = require('path');
const express = require('express');
const app = express();

// Enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Serve images
app.use(express.static(path.join(__dirname, 'static')));

// Serve books
app.get('/books', (req, res) => res.json(require(path.join(__dirname, 'books.js'))));

// Serve offers
app.get('/books/:list/commercialOffers', (req, res) => {
  const offers = [];
  const listLength = req.params.list.split(',').length;
  if (listLength === 2) {
    // For 2 isbn, you get a `percentage`
    offers.push({ type: 'percentage', 'value': 4 });
  }
  if (listLength >= 3) {
    // For 2 isbn and more, you get also `minus` and `slice`
    offers.push({ type: 'minus', value: 15 });
    offers.push({ type: 'slice', sliceValue: 100, value: 12 });
  }
  res.json({ offers });
});

app.listen(4300, () => console.log(`Henri Potier mock's listening on port 4300!\n`));
