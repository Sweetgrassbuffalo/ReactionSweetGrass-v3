(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var _ = Package.underscore._;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var Stripe, StripeSync;

var require = meteorInstall({"node_modules":{"meteor":{"jeremy:stripe":{"stripe_server.js":function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/jeremy_stripe/stripe_server.js                                                                            //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Stripe = Npm.require("stripe");                                                                                       // 2
                                                                                                                      //
StripeSync = function (key) {                                                                                         // 4
  var resources = {                                                                                                   // 6
    account: ["create", "list", "update", "retrieve"],                                                                // 7
    accounts: ["create", "list", "update", "retrieve"],                                                               // 13
    balance: ["retrieve", "listTransactions", "retrieveTransaction"],                                                 // 19
    charges: ["create", "list", "retrieve", "update", "setMetadata", "getMetadata", "capture", "refund", "updateDispute", "closeDispute", "createRefund", "listRefunds", "retrieveRefund", "updateRefund", "markAsSafe", "markAsFraudulent"],
    refunds: ["create", "list", "update", "retrieve"],                                                                // 42
    coupons: ["create", "list", "update", "retrieve", "del"],                                                         // 48
    customers: ["create", "list", "update", "retrieve", "del", "setMetaData", "getMetadata", "createSubscription", "updateSubscription", "cancelSubscription", "listSubscriptions", "retrieveSubscription", "createSource", "listSources", "retrieveSource", "updateSource", "deleteSource", "createCard", "listCards", "retrieveCard", "updateCard", "deleteCard", "deleteDiscount", "deleteSubscriptionDiscount"],
    disputes: ["list", "retrieve", "update", "setMetadata", "getMetadata", "close"],                                  // 81
    events: ["list", "retrieve"],                                                                                     // 89
    invoices: ["create", "list", "update", "retrieve", "retrieveLines", "retrieveUpcoming", "pay"],                   // 93
    invoiceItems: ["create", "list", "update", "retrieve", "del", "setMetadata", "getMetadata"],                      // 102
    plans: ["create", "list", "update", "retrieve", "del"],                                                           // 111
    recipientCards: ["create", "list", "retrieve", "update", "del"],                                                  // 118
    recipients: ["create", "list", "update", "retrieve", "del", "setMetadata", "getMetadata", "createCard", "listCards", "retrieveCard", "updateCard", "deleteCard"],
    tokens: ["create", "retrieve"],                                                                                   // 139
    transfers: ["create", "list", "update", "retrieve", "setMetadata", "getMetadata", "reverse", "cancel", "listTransactions", "createReversal", "listReversals", "retrieveReversal", "updateReversal"],
    applicationFees: ["list", "retrieve", "refund", "createRefund", "listRefunds", "retrieveRefund", "updateRefund"],
    fileUploads: ["retrieve", "list", "create"],                                                                      // 167
    bitcoinReceivers: ["create", "retrieve", "list", "update", "setMetadata", "getMetadata", "listTransactions"],     // 172
    customerCards: ["create", "list", "retrieve", "update", "del"],                                                   // 181
    customerSubscriptions: ["create", "list", "retrieve", "update", "del", "deleteDiscount"],                         // 188
    chargeRefunds: ["create", "list", "retrieve", "update"],                                                          // 196
    applicationFeeRefunds: ["create", "list", "retrieve", "update"],                                                  // 202
    transferReversals: ["create", "list", "retrieve", "update"]                                                       // 208
  };                                                                                                                  // 6
  var stripeSync = Stripe(key);                                                                                       // 216
                                                                                                                      //
  _.each(resources, function (resource, key) {                                                                        // 218
    _.each(resource, function (funcName) {                                                                            // 219
      var stripeFunc = stripeSync[key][funcName];                                                                     // 220
      stripeSync[key][funcName] = Meteor.wrapAsync(stripeFunc, stripeSync[key]);                                      // 221
    });                                                                                                               // 222
  });                                                                                                                 // 223
                                                                                                                      //
  return stripeSync;                                                                                                  // 225
};                                                                                                                    // 226
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/jeremy:stripe/stripe_server.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['jeremy:stripe'] = {}, {
  Stripe: Stripe,
  StripeSync: StripeSync
});

})();

//# sourceMappingURL=jeremy_stripe.js.map
