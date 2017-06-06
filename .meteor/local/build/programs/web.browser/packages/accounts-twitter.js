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
var Twitter = Package['twitter-oauth'].Twitter;
var HTTP = Package.http.HTTP;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/accounts-twitter/notice.js                                                                 //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
if (Package['accounts-ui']                                                                             // 1
    && !Package['service-configuration']                                                               // 2
    && !Package.hasOwnProperty('twitter-config-ui')) {                                                 // 3
  console.warn(                                                                                        // 4
    "Note: You're using accounts-ui and accounts-twitter,\n" +                                         // 5
    "but didn't install the configuration UI for Twitter\n" +                                          // 6
    "OAuth. You can install it with:\n" +                                                              // 7
    "\n" +                                                                                             // 8
    "    meteor add twitter-config-ui" +                                                               // 9
    "\n"                                                                                               // 10
  );                                                                                                   // 11
}                                                                                                      // 12
                                                                                                       // 13
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/accounts-twitter/twitter.js                                                                //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
Accounts.oauth.registerService('twitter');                                                             // 1
                                                                                                       // 2
if (Meteor.isClient) {                                                                                 // 3
  Meteor.loginWithTwitter = function(options, callback) {                                              // 4
    // support a callback without options                                                              // 5
    if (! callback && typeof options === "function") {                                                 // 6
      callback = options;                                                                              // 7
      options = null;                                                                                  // 8
    }                                                                                                  // 9
                                                                                                       // 10
    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    Twitter.requestCredential(options, credentialRequestCompleteCallback);                             // 12
  };                                                                                                   // 13
} else {                                                                                               // 14
  var autopublishedFields = _.map(                                                                     // 15
    // don't send access token. https://dev.twitter.com/discussions/5025                               // 16
    Twitter.whitelistedFields.concat(['id', 'screenName']),                                            // 17
    function (subfield) { return 'services.twitter.' + subfield; });                                   // 18
                                                                                                       // 19
  Accounts.addAutopublishFields({                                                                      // 20
    forLoggedInUser: autopublishedFields,                                                              // 21
    forOtherUsers: autopublishedFields                                                                 // 22
  });                                                                                                  // 23
}                                                                                                      // 24
                                                                                                       // 25
/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['accounts-twitter'] = {};

})();
