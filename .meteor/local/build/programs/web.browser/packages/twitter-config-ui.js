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
var Template = Package['templating-runtime'].Template;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var HTML = Package.htmljs.HTML;

(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/twitter-config-ui/template.twitter_configure.js                      //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
                                                                                 // 1
Template.__checkName("configureLoginServiceDialogForTwitter");                   // 2
Template["configureLoginServiceDialogForTwitter"] = new Template("Template.configureLoginServiceDialogForTwitter", (function() {
  var view = this;                                                               // 4
  return [ HTML.Raw("<p>\n    First, you'll need to register your app on Twitter. Follow these steps:\n  </p>\n  "), HTML.OL("\n    ", HTML.Raw('<li>\n      Visit <a href="https://apps.twitter.com/app/new" target="_blank">https://apps.twitter.com/app/new</a>\n    </li>'), "\n    ", HTML.LI("\n      Set Website to: ", HTML.SPAN({
    class: "url"                                                                 // 6
  }, Blaze.View("lookup:siteUrl", function() {                                   // 7
    return Spacebars.mustache(view.lookup("siteUrl"));                           // 8
  })), "\n    "), "\n    ", HTML.LI("\n      Set Callback URL to: ", HTML.SPAN({
    class: "url"                                                                 // 10
  }, Blaze.View("lookup:siteUrl", function() {                                   // 11
    return Spacebars.mustache(view.lookup("siteUrl"));                           // 12
  }), "_oauth/twitter"), "\n    "), "\n    ", HTML.Raw('<li>\n      Select "Create your Twitter application".\n    </li>'), "\n    ", HTML.Raw('<li>\n      On the Settings tab, enable "Allow this application to be used to Sign in with Twitter" and click\n      "Update settings".\n    </li>'), "\n    ", HTML.Raw('<li>\n      Switch to the "Keys and Access Tokens" tab.\n    </li>'), "\n  ") ];
}));                                                                             // 14
                                                                                 // 15
///////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////
//                                                                               //
// packages/twitter-config-ui/twitter_configure.js                               //
//                                                                               //
///////////////////////////////////////////////////////////////////////////////////
                                                                                 //
Template.configureLoginServiceDialogForTwitter.helpers({                         // 1
  siteUrl: function () {                                                         // 2
  // Twitter doesn't recognize localhost as a domain name                        // 3
    return Meteor.absoluteUrl({replaceLocalhost: true});                         // 4
  }                                                                              // 5
});                                                                              // 6
                                                                                 // 7
Template.configureLoginServiceDialogForTwitter.fields = function () {            // 8
  return [                                                                       // 9
    {property: 'consumerKey', label: 'API key'},                                 // 10
    {property: 'secret', label: 'API secret'}                                    // 11
  ];                                                                             // 12
};                                                                               // 13
                                                                                 // 14
///////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['twitter-config-ui'] = {};

})();
