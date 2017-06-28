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
var Accounts = Package['accounts-base'].Accounts;
var Facebook = Package['facebook-oauth'].Facebook;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/accounts-facebook/notice.js                                                                //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
if (Package['accounts-ui']                                                                             // 1
    && !Package['service-configuration']                                                               // 2
    && !Package.hasOwnProperty('facebook-config-ui')) {                                                // 3
  console.warn(                                                                                        // 4
    "Note: You're using accounts-ui and accounts-facebook,\n" +                                        // 5
    "but didn't install the configuration UI for the Facebook\n" +                                     // 6
    "OAuth. You can install it with:\n" +                                                              // 7
    "\n" +                                                                                             // 8
    "    meteor add facebook-config-ui" +                                                              // 9
    "\n"                                                                                               // 10
  );                                                                                                   // 11
}                                                                                                      // 12
                                                                                                       // 13
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/accounts-facebook/facebook.js                                                              //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
Accounts.oauth.registerService('facebook');                                                            // 1
                                                                                                       // 2
if (Meteor.isClient) {                                                                                 // 3
  Meteor.loginWithFacebook = function(options, callback) {                                             // 4
    // support a callback without options                                                              // 5
    if (! callback && typeof options === "function") {                                                 // 6
      callback = options;                                                                              // 7
      options = null;                                                                                  // 8
    }                                                                                                  // 9
                                                                                                       // 10
    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    Facebook.requestCredential(options, credentialRequestCompleteCallback);                            // 12
  };                                                                                                   // 13
} else {                                                                                               // 14
  Accounts.addAutopublishFields({                                                                      // 15
    // publish all fields including access token, which can legitimately                               // 16
    // be used from the client (if transmitted over ssl or on                                          // 17
    // localhost). https://developers.facebook.com/docs/concepts/login/access-tokens-and-types/,       // 18
    // "Sharing of Access Tokens"                                                                      // 19
    forLoggedInUser: ['services.facebook'],                                                            // 20
    forOtherUsers: [                                                                                   // 21
      // https://www.facebook.com/help/167709519956542                                                 // 22
      'services.facebook.id', 'services.facebook.username', 'services.facebook.gender'                 // 23
    ]                                                                                                  // 24
  });                                                                                                  // 25
}                                                                                                      // 26
                                                                                                       // 27
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['accounts-facebook'] = {};

})();
