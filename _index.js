// import modules
var path = require('path');
var express = require('express');
var mustacheExpress = require('mustache-express');

// declare global variables
var app = express();

// setup static resources
app.use(express.static(path.join(__dirname, 'public')));

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');


app.get('/pay/:walletId', function (request, response) {
  var amount = request.query.amount,
    currency = request.query.currency,
    walletId = request.params.walletId,
    currencyType = (currency || '').toUpperCase(),
    data = {},
    amountValidation = parseFloat(amount) || -1;

  switch( currencyType ) {
    case 'EUR':
      data = {
        walletId: walletId,
        currencyType: 'eur',
        amount: amount,
        currency: currencyType,
        error: false,
        errorMessage: ''
      };
      break;
    case 'BTC':
      data = {
        currencyType: 'btc',
        walletId: walletId,
        amount: amount,
        currency: currencyType,
        error: false,
        errorMessage: ''
      };
      break;
    case 'ETH':
      data = {
        currencyType: 'eth',
        walletId: walletId,
        amount: amount,
        currency: currencyType,
        error: false,
        errorMessage: ''
      };
      break;
    default:
      data = {
        currencyType: 'error',
        walletId: walletId,
        amount: amount,
        currency: currencyType,
        error: true,
        errorType: 'CURRENCY'
      }
  }


  if(amountValidation <= 0) {
    data = {
      currencyType: 'error',
      walletId: walletId,
      amount: amount,
      currency: currencyType,
      error: true,
      errorType: 'AMOUNT'
    }
  }

  // NOTE compile view using mustache-express
  response.render('pay', data);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});