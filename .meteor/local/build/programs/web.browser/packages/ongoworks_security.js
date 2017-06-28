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
var Mongo = Package.mongo.Mongo;
var _ = Package.underscore._;
var LocalCollection = Package.minimongo.LocalCollection;
var Minimongo = Package.minimongo.Minimongo;
var Random = Package.random.Random;
var EJSON = Package.ejson.EJSON;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var Security;

var require = meteorInstall({"node_modules":{"meteor":{"ongoworks:security":{"lib":{"client":{"Security.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/ongoworks_security/lib/client/Security.js                                               //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
// We only stub on the client to prevent errors if putting in common code                           // 1
Security = {                                                                                        // 3
  // the starting point of the chain                                                                // 4
  permit: function () {                                                                             // 5
    function permit() {                                                                             // 5
      return new Security.Rule();                                                                   // 6
    }                                                                                               // 7
                                                                                                    //
    return permit;                                                                                  // 5
  }(),                                                                                              // 5
  can: function () {                                                                                // 8
    function can() {                                                                                // 8
      return new Security.Check();                                                                  // 9
    }                                                                                               // 10
                                                                                                    //
    return can;                                                                                     // 8
  }(),                                                                                              // 8
  defineMethod: function () {                                                                       // 11
    function securityDefineMethod(name) {                                                           // 11
      // Check whether a rule with the given name already exists; can't overwrite                   // 12
      if (Security.Rule.prototype[name]) {                                                          // 13
        throw new Error('A security method with the name "' + name + '" has already been defined');
      }                                                                                             // 15
                                                                                                    //
      Security.Rule.prototype[name] = function () {                                                 // 16
        return this;                                                                                // 17
      };                                                                                            // 18
    }                                                                                               // 19
                                                                                                    //
    return securityDefineMethod;                                                                    // 11
  }()                                                                                               // 11
};                                                                                                  // 3
                                                                                                    //
Mongo.Collection.prototype.permit = function () {                                                   // 22
  return Security.permit().collections(this);                                                       // 23
};                                                                                                  // 24
//////////////////////////////////////////////////////////////////////////////////////////////////////

},"Security.Rule.js":["babel-runtime/helpers/classCallCheck",function(require){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/ongoworks_security/lib/client/Security.Rule.js                                          //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                             //
                                                                                                    //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                    //
                                                                                                    //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }   //
                                                                                                    //
// We only stub on the client to prevent errors if putting in common code                           // 1
Security.Rule = function () {                                                                       // 3
  function _class(types) {                                                                          // 4
    (0, _classCallCheck3.default)(this, _class);                                                    // 4
  }                                                                                                 // 4
                                                                                                    //
  _class.prototype.collections = function () {                                                      // 3
    function collections(_collections) {                                                            // 3
      return this;                                                                                  // 7
    }                                                                                               // 8
                                                                                                    //
    return collections;                                                                             // 3
  }();                                                                                              // 3
                                                                                                    //
  _class.prototype.allowInClientCode = function () {                                                // 3
    function allowInClientCode() {}                                                                 // 3
                                                                                                    //
    return allowInClientCode;                                                                       // 3
  }();                                                                                              // 3
                                                                                                    //
  _class.prototype.allow = function () {                                                            // 3
    function allow() {                                                                              // 3
      return true;                                                                                  // 13
    }                                                                                               // 14
                                                                                                    //
    return allow;                                                                                   // 3
  }();                                                                                              // 3
                                                                                                    //
  return _class;                                                                                    // 3
}();                                                                                                // 3
//////////////////////////////////////////////////////////////////////////////////////////////////////

}],"Security.Check.js":["babel-runtime/helpers/classCallCheck",function(require){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/ongoworks_security/lib/client/Security.Check.js                                         //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                             //
                                                                                                    //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                    //
                                                                                                    //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }   //
                                                                                                    //
// We only stub on the client to prevent errors if putting in common code                           // 1
Security.Check = function () {                                                                      // 3
  function _class() {                                                                               // 4
    (0, _classCallCheck3.default)(this, _class);                                                    // 4
  }                                                                                                 // 4
                                                                                                    //
  _class.prototype.for = function () {                                                              // 3
    function _for() {                                                                               // 3
      return this;                                                                                  // 7
    }                                                                                               // 8
                                                                                                    //
    return _for;                                                                                    // 3
  }();                                                                                              // 3
                                                                                                    //
  _class.prototype.insert = function () {                                                           // 3
    function insert() {                                                                             // 3
      return this;                                                                                  // 11
    }                                                                                               // 12
                                                                                                    //
    return insert;                                                                                  // 3
  }();                                                                                              // 3
                                                                                                    //
  _class.prototype.update = function () {                                                           // 3
    function update() {                                                                             // 3
      return this;                                                                                  // 15
    }                                                                                               // 16
                                                                                                    //
    return update;                                                                                  // 3
  }();                                                                                              // 3
                                                                                                    //
  _class.prototype.remove = function () {                                                           // 3
    function remove() {                                                                             // 3
      return this;                                                                                  // 19
    }                                                                                               // 20
                                                                                                    //
    return remove;                                                                                  // 3
  }();                                                                                              // 3
                                                                                                    //
  _class.prototype.read = function () {                                                             // 3
    function read() {                                                                               // 3
      return this;                                                                                  // 23
    }                                                                                               // 24
                                                                                                    //
    return read;                                                                                    // 3
  }();                                                                                              // 3
                                                                                                    //
  _class.prototype.download = function () {                                                         // 3
    function download() {                                                                           // 3
      return this;                                                                                  // 27
    }                                                                                               // 28
                                                                                                    //
    return download;                                                                                // 3
  }();                                                                                              // 3
                                                                                                    //
  _class.prototype.check = function () {                                                            // 3
    function check() {                                                                              // 3
      return true;                                                                                  // 31
    }                                                                                               // 32
                                                                                                    //
    return check;                                                                                   // 3
  }();                                                                                              // 3
                                                                                                    //
  _class.prototype.throw = function () {                                                            // 3
    function _throw() {}                                                                            // 3
                                                                                                    //
    return _throw;                                                                                  // 3
  }();                                                                                              // 3
                                                                                                    //
  return _class;                                                                                    // 3
}();                                                                                                // 3
//////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"builtInRules.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/ongoworks_security/lib/builtInRules.js                                                  //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
/*                                                                                                  // 1
 * This file defines built-in restriction methods                                                   //
 */ /*                                                                                              //
     * No one                                                                                       //
     */Security.defineMethod("never", {                                                             //
  fetch: [],                                                                                        // 10
  transform: null,                                                                                  // 11
  allow: function () {                                                                              // 12
    return false;                                                                                   // 13
  }                                                                                                 // 14
}); /*                                                                                              // 9
     * Logged In                                                                                    //
     */                                                                                             //
Security.defineMethod("ifLoggedIn", {                                                               // 21
  fetch: [],                                                                                        // 22
  transform: null,                                                                                  // 23
  allow: function (type, arg, userId) {                                                             // 24
    return !!userId;                                                                                // 25
  }                                                                                                 // 26
}); /*                                                                                              // 21
     * Specific User ID                                                                             //
     */                                                                                             //
Security.defineMethod("ifHasUserId", {                                                              // 33
  fetch: [],                                                                                        // 34
  transform: null,                                                                                  // 35
  allow: function (type, arg, userId) {                                                             // 36
    return userId === arg;                                                                          // 37
  }                                                                                                 // 38
}); /*                                                                                              // 33
     * Specific Roles                                                                               //
     */ /*                                                                                          //
         * alanning:roles support                                                                   //
         */                                                                                         //
                                                                                                    //
if (Package && Package["alanning:roles"]) {                                                         // 48
  var Roles = Package["alanning:roles"].Roles;                                                      // 50
  Security.defineMethod("ifHasRole", {                                                              // 52
    fetch: [],                                                                                      // 53
    transform: null,                                                                                // 54
    allow: function (type, arg, userId) {                                                           // 55
      if (!arg) throw new Error('ifHasRole security rule method requires an argument');             // 56
                                                                                                    //
      if (arg.role) {                                                                               // 57
        return Roles.userIsInRole(userId, arg.role, arg.group);                                     // 58
      } else {                                                                                      // 59
        return Roles.userIsInRole(userId, arg);                                                     // 60
      }                                                                                             // 61
    }                                                                                               // 62
  });                                                                                               // 52
} /*                                                                                                // 65
   * nicolaslopezj:roles support                                                                    //
   * Note: doesn't support groups                                                                   //
   */                                                                                               //
                                                                                                    //
if (Package && Package["nicolaslopezj:roles"]) {                                                    // 71
  var Roles = Package["nicolaslopezj:roles"].Roles;                                                 // 73
  Security.defineMethod("ifHasRole", {                                                              // 75
    fetch: [],                                                                                      // 76
    transform: null,                                                                                // 77
    allow: function (type, arg, userId) {                                                           // 78
      if (!arg) throw new Error('ifHasRole security rule method requires an argument');             // 79
      return Roles.userHasRole(userId, arg);                                                        // 80
    }                                                                                               // 81
  });                                                                                               // 75
} /*                                                                                                // 84
   * Specific Properties                                                                            //
   */                                                                                               //
                                                                                                    //
Security.defineMethod("onlyProps", {                                                                // 90
  fetch: [],                                                                                        // 91
  transform: null,                                                                                  // 92
  allow: function (type, arg, userId, doc, fieldNames) {                                            // 93
    if (!_.isArray(arg)) arg = [arg];                                                               // 94
    fieldNames = fieldNames || _.keys(doc);                                                         // 96
    return _.every(fieldNames, function (fieldName) {                                               // 98
      return _.contains(arg, fieldName);                                                            // 99
    });                                                                                             // 100
  }                                                                                                 // 101
});                                                                                                 // 90
Security.defineMethod("exceptProps", {                                                              // 104
  fetch: [],                                                                                        // 105
  transform: null,                                                                                  // 106
  allow: function (type, arg, userId, doc, fieldNames) {                                            // 107
    if (!_.isArray(arg)) arg = [arg];                                                               // 108
    fieldNames = fieldNames || _.keys(doc);                                                         // 110
    return !_.any(fieldNames, function (fieldName) {                                                // 112
      return _.contains(arg, fieldName);                                                            // 113
    });                                                                                             // 114
  }                                                                                                 // 115
});                                                                                                 // 104
//////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/ongoworks:security/lib/client/Security.js");
require("./node_modules/meteor/ongoworks:security/lib/client/Security.Rule.js");
require("./node_modules/meteor/ongoworks:security/lib/client/Security.Check.js");
require("./node_modules/meteor/ongoworks:security/lib/builtInRules.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['ongoworks:security'] = {}, {
  Security: Security
});

})();
