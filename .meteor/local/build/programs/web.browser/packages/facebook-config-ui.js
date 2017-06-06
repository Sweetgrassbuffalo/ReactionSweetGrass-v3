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

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// packages/facebook-config-ui/template.facebook_configure.js          //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
                                                                       // 1
Template.__checkName("configureLoginServiceDialogForFacebook");        // 2
Template["configureLoginServiceDialogForFacebook"] = new Template("Template.configureLoginServiceDialogForFacebook", (function() {
  var view = this;                                                     // 4
  return [ HTML.Raw("<p>\n    First, you'll need to register your app on Facebook. Follow these steps:\n  </p>\n  "), HTML.OL("\n    ", HTML.Raw('<li>\n      Visit <a href="https://developers.facebook.com/apps" target="_blank">https://developers.facebook.com/apps</a>\n    </li>'), "\n    ", HTML.Raw('<li>\n      Click "Add a New App".\n    </li>'), "\n    ", HTML.Raw('<li>\n      Select "Website" and type a name for your app.\n    </li>'), "\n    ", HTML.Raw('<li>\n      Click "Create New Facebook App ID".\n    </li>'), "\n    ", HTML.Raw('<li>\n      Select a category in the dropdown and click "Create App ID".\n    </li>'), "\n    ", HTML.LI('\n      Under "Tell us about your website", set Site URL to: ', HTML.SPAN({
    class: "url"                                                       // 6
  }, Blaze.View("lookup:siteUrl", function() {                         // 7
    return Spacebars.mustache(view.lookup("siteUrl"));                 // 8
  })), ' and click "Next".\n    '), "\n    ", HTML.Raw('<li>\n      Click "Skip to Developer Dashboard".\n    </li>'), "\n    ", HTML.Raw('<li>\n      Go to the "Settings" tab and add an email address under "Contact Email". Click "Save Changes".\n    </li>'), "\n    ", HTML.Raw('<li>\n      Go to the "Status &amp; Review" tab and select Yes for "Do you want to make this app and\n      all its live features available to the general public?". Click "Confirm".\n    </li>'), "\n    ", HTML.Raw("<li>\n      Go back to the Dashboard tab.\n    </li>"), "\n  ") ];
}));                                                                   // 10
                                                                       // 11
/////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// packages/facebook-config-ui/facebook_configure.js                   //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Template.configureLoginServiceDialogForFacebook.helpers({              // 1
  siteUrl: function () {                                               // 2
    return Meteor.absoluteUrl();                                       // 3
  }                                                                    // 4
});                                                                    // 5
                                                                       // 6
Template.configureLoginServiceDialogForFacebook.fields = function () {
  return [                                                             // 8
    {property: 'appId', label: 'App ID'},                              // 9
    {property: 'secret', label: 'App Secret'}                          // 10
  ];                                                                   // 11
};                                                                     // 12
                                                                       // 13
/////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['facebook-config-ui'] = {};

})();
