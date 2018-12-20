/**
 * Controller to handle endpoint "/pay/:walletId?{currency}&{amount}"
 *
 * @param {Object} request - expresponzses requestuest object
 * @param {Object} response - expresponzses responzseponse object
 */
module.exports = function (request, response) {
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

};