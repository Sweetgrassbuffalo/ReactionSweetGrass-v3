(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var blazeToReact, BlazeComponent;

var require = meteorInstall({"node_modules":{"meteor":{"gadicc:blaze-react-component":{"blaze-react-component-server.js":["babel-runtime/helpers/extends","react","react-dom","meteor/blaze","meteor/reactive-var",function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/gadicc_blaze-react-component/blaze-react-component-server.js                          //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _extends2 = require("babel-runtime/helpers/extends");                                         //
                                                                                                  //
var _extends3 = _interopRequireDefault(_extends2);                                                //
                                                                                                  //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
                                                                                                  //
module.export({                                                                                   // 1
  blazeToReact: function () {                                                                     // 1
    return blazeToReact;                                                                          // 1
  }                                                                                               // 1
});                                                                                               // 1
var React = void 0,                                                                               // 1
    Component = void 0;                                                                           // 1
module.importSync("react", {                                                                      // 1
  "default": function (v) {                                                                       // 1
    React = v;                                                                                    // 1
  },                                                                                              // 1
  Component: function (v) {                                                                       // 1
    Component = v;                                                                                // 1
  }                                                                                               // 1
}, 0);                                                                                            // 1
var ReactDOM = void 0;                                                                            // 1
module.importSync("react-dom", {                                                                  // 1
  "default": function (v) {                                                                       // 1
    ReactDOM = v;                                                                                 // 1
  }                                                                                               // 1
}, 1);                                                                                            // 1
var Blaze = void 0;                                                                               // 1
module.importSync("meteor/blaze", {                                                               // 1
  Blaze: function (v) {                                                                           // 1
    Blaze = v;                                                                                    // 1
  }                                                                                               // 1
}, 2);                                                                                            // 1
var ReactiveVar = void 0;                                                                         // 1
module.importSync("meteor/reactive-var", {                                                        // 1
  ReactiveVar: function (v) {                                                                     // 1
    ReactiveVar = v;                                                                              // 1
  }                                                                                               // 1
}, 3);                                                                                            // 1
                                                                                                  //
var BlazeComponent = function (props) {                                                           // 6
  var html = {                                                                                    // 7
    __html: Blaze.toHTMLWithData(props.template, _.omit(props, 'template'))                       // 8
  };                                                                                              // 7
  return React.createElement("span", {                                                            // 14
    dangerouslySetInnerHTML: html                                                                 // 14
  });                                                                                             // 14
};                                                                                                // 15
                                                                                                  //
module.runModuleSetters(blazeToReact = function (template) {                                      // 17
  return function (props) {                                                                       // 18
    return React.createElement(BlazeComponent, (0, _extends3.default)({}, props, {                // 18
      template: template                                                                          // 18
    }));                                                                                          // 18
  };                                                                                              // 18
});                                                                                               // 19
module.export("default", exports.default = BlazeComponent);                                       // 1
////////////////////////////////////////////////////////////////////////////////////////////////////

}]}}}},{"extensions":[".js",".json"]});
var exports = require("./node_modules/meteor/gadicc:blaze-react-component/blaze-react-component-server.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['gadicc:blaze-react-component'] = exports, {
  BlazeComponent: BlazeComponent,
  blazeToReact: blazeToReact
});

})();

//# sourceMappingURL=gadicc_blaze-react-component.js.map
