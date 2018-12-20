/**
 * initialize router of server
 *
 * @param {Object} app - initialized express application
 */
module.exports = function ( app ) {

  app.get('/pay/:walletId', require('../controller/pay'));

};

