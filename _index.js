// import modules
var express = require('express');
var mustacheExpress = require('mustache-express');


// declare global variables
var app = express();


app.use(express.static(__dirname + '/public'));


// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');


app.get('/pay/:walletId', function (req, res) {
  var amount = req.query.amount || '',
    currency = req.query.currency || '',
    walletId = req.params.walletId || '';

  switch (currency.toUpperCase()) {
    case 'EUR':
      res.render('index', {
        currencyType: 'eur',
        walletIdPt1: walletId.slice(0, 4),
        walletIdPt2: walletId.slice(4, 8),
        walletIdPt3: walletId.slice(8, 12),
        walletIdPt4: walletId.slice(12, 16),
        amount: amount,
        currency: currency,
        linkToOtherWallet: 'https://sugi.io' + req.originalUrl
      });
      break;
    case 'BTC':
      res.render('index', {
        currencyType: 'btc',
        walletIdPt1: walletId,
        walletIdPt2: '',
        walletIdPt3: '',
        walletIdPt4: '',
        amount: amount,
        currency: currency,
        linkToOtherWallet: 'bitcoin:' + walletId + '?amount\=' + amount
      });
      console.log('bitcoin:' + walletId + '?amount=' + amount);
      break;
    case 'ETH':
      res.render('index', {
        currencyType: 'eth',
        walletIdPt1: walletId,
        walletIdPt2: '',
        walletIdPt3: '',
        walletIdPt4: '',
        amount: amount,
        currency: currency,
        linkToOtherWallet: 'ethereum:' + walletId + '?value=' + amount + 'e18'
      });
      console.log('ethereum:' + walletId + '?value=' + amount + 'e18');
      break;
    default:
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});