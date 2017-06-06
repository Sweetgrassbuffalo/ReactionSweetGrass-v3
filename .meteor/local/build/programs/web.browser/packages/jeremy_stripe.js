//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
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
var ReactiveStripe;

var require = meteorInstall({"node_modules":{"meteor":{"jeremy:stripe":{"stripe_client.js":function(){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// packages/jeremy_stripe/stripe_client.js                                          //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
ReactiveStripe = {                                                                  // 2
  load: _.once(function (stripeKey) {                                               // 4
    var createHeadTag = function (srcUrl) {                                         // 5
      var script = document.createElement("script");                                // 6
      script.type = "text/javascript";                                              // 7
      script.src = srcUrl;                                                          // 8
      document.head.appendChild(script);                                            // 9
    };                                                                              // 10
                                                                                    //
    createHeadTag("https://js.stripe.com/v2/");                                     // 11
    createHeadTag("https://checkout.stripe.com/checkout.js");                       // 12
                                                                                    //
    this._checkReady(stripeKey);                                                    // 14
  }),                                                                               // 15
  _checkReady: function (stripeKey) {                                               // 17
    var _this = this;                                                               // 17
                                                                                    //
    var i = 0;                                                                      // 18
    var checkReady = Meteor.setInterval(function () {                               // 19
      if (typeof Stripe !== "undefined" && typeof StripeCheckout !== "undefined") {
        Stripe.setPublishableKey(stripeKey);                                        // 21
                                                                                    //
        _this._loaded.set(true);                                                    // 22
                                                                                    //
        Meteor.clearInterval(checkReady);                                           // 23
      } else {                                                                      // 24
        i += 100;                                                                   // 25
                                                                                    //
        if (i > 10000) {                                                            // 26
          // stop checking if the lib isn"t loaded within 10 secs,                  // 27
          // then throw an error                                                    // 28
          Meteor.clearInterval(checkReady);                                         // 29
          throw new Meteor.Error("Error loading Stripe libs from their CDN.");      // 30
        }                                                                           // 31
      }                                                                             // 32
    }, 100);                                                                        // 33
  },                                                                                // 34
  _loaded: new ReactiveVar(false),                                                  // 36
  loaded: function () {                                                             // 38
    return this._loaded.get();                                                      // 39
  }                                                                                 // 40
};                                                                                  // 2
//////////////////////////////////////////////////////////////////////////////////////

}}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/jeremy:stripe/stripe_client.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['jeremy:stripe'] = {}, {
  ReactiveStripe: ReactiveStripe
});

})();
