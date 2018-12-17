// import modules
var express = require('express');

// declare global variables
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.get('/pay/:cardId', function (req, res) {
  res.send("Value of param is " + req.params.cardId
    + "\n" + "amount: " + req.query.amount
    + "\ncurrency:" + req.query.currency);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});