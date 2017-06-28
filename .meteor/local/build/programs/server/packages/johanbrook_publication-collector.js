(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var ECMAScript = Package.ecmascript.ECMAScript;
var _ = Package.underscore._;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var check = Package.check.check;
var Match = Package.check.Match;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var PublicationCollector;

var require = meteorInstall({"node_modules":{"meteor":{"johanbrook:publication-collector":{"publication-collector.js":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits","meteor/mongo","meteor/mongo-id","events",function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                //
// packages/johanbrook_publication-collector/publication-collector.js                                             //
//                                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                  //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                                           //
                                                                                                                  //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                                  //
                                                                                                                  //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");                     //
                                                                                                                  //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);                            //
                                                                                                                  //
var _inherits2 = require("babel-runtime/helpers/inherits");                                                       //
                                                                                                                  //
var _inherits3 = _interopRequireDefault(_inherits2);                                                              //
                                                                                                                  //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                 //
                                                                                                                  //
var Mongo = void 0;                                                                                               // 1
module.importSync("meteor/mongo", {                                                                               // 1
  Mongo: function (v) {                                                                                           // 1
    Mongo = v;                                                                                                    // 1
  }                                                                                                               // 1
}, 0);                                                                                                            // 1
var MongoID = void 0;                                                                                             // 1
module.importSync("meteor/mongo-id", {                                                                            // 1
  MongoID: function (v) {                                                                                         // 1
    MongoID = v;                                                                                                  // 1
  }                                                                                                               // 1
}, 1);                                                                                                            // 1
var EventEmitter = void 0;                                                                                        // 1
module.importSync("events", {                                                                                     // 1
  EventEmitter: function (v) {                                                                                    // 1
    EventEmitter = v;                                                                                             // 1
  }                                                                                                               // 1
}, 2);                                                                                                            // 1
var validMongoId = Match.OneOf(String, Mongo.ObjectID); /*                                                        // 5
                                                          This class describes something like Subscription in     //
                                                          meteor/meteor/packages/ddp/livedata_server.js, but instead of sending
                                                          over a socket it just collects data.                    //
                                                        */                                                        //
                                                                                                                  //
PublicationCollector = function (_EventEmitter) {                                                                 // 12
  (0, _inherits3.default)(PublicationCollector, _EventEmitter);                                                   // 12
                                                                                                                  //
  function PublicationCollector() {                                                                               // 14
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};                         // 14
    (0, _classCallCheck3.default)(this, PublicationCollector);                                                    // 14
                                                                                                                  //
    var _this = (0, _possibleConstructorReturn3.default)(this, _EventEmitter.call(this));                         // 14
                                                                                                                  //
    check(context.userId, Match.Optional(String)); // Object where the keys are collection names, and then the keys are _ids
                                                                                                                  //
    _this._documents = {};                                                                                        // 19
                                                                                                                  //
    _this.unblock = function () {};                                                                               // 20
                                                                                                                  //
    _this.userId = context.userId;                                                                                // 21
    _this._idFilter = {                                                                                           // 22
      idStringify: MongoID.idStringify,                                                                           // 23
      idParse: MongoID.idParse                                                                                    // 24
    };                                                                                                            // 22
                                                                                                                  //
    _this._isDeactivated = function () {};                                                                        // 26
                                                                                                                  //
    return _this;                                                                                                 // 14
  }                                                                                                               // 27
                                                                                                                  //
  PublicationCollector.prototype.collect = function () {                                                          // 12
    function collect(name) {                                                                                      // 12
      var _this2 = this;                                                                                          // 29
                                                                                                                  //
      var callback = void 0; // extracts optional callback from latest argument                                   // 30
                                                                                                                  //
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {   // 29
        args[_key - 1] = arguments[_key];                                                                         // 29
      }                                                                                                           // 29
                                                                                                                  //
      if (_.isFunction(args[args.length - 1])) {                                                                  // 32
        callback = args.pop();                                                                                    // 33
      } // adds a one time listener function for the "ready" event                                                // 34
                                                                                                                  //
                                                                                                                  //
      this.once('ready', function (collections) {                                                                 // 36
        if (_.isFunction(callback)) {                                                                             // 37
          callback(collections);                                                                                  // 38
        } // immediately stop the subscription                                                                    // 39
                                                                                                                  //
                                                                                                                  //
        _this2.stop();                                                                                            // 41
      });                                                                                                         // 42
      var handler = Meteor.server.publish_handlers[name];                                                         // 44
      var result = handler.call.apply(handler, [this].concat(args));                                              // 45
                                                                                                                  //
      this._publishHandlerResult(result);                                                                         // 47
    }                                                                                                             // 48
                                                                                                                  //
    return collect;                                                                                               // 12
  }(); /**                                                                                                        // 12
        * Reproduces "_publishHandlerResult" processing                                                           //
        * @see {@link https://github.com/meteor/meteor/blob/master/packages/ddp-server/livedata_server.js#L1045}  //
        */                                                                                                        //
                                                                                                                  //
  PublicationCollector.prototype._publishHandlerResult = function () {                                            // 12
    function _publishHandlerResult(res) {                                                                         // 12
      var _this3 = this;                                                                                          // 54
                                                                                                                  //
      var cursors = []; // publication handlers can return a collection cursor, an array of cursors or nothing.   // 55
                                                                                                                  //
      if (this._isCursor(res)) {                                                                                  // 58
        cursors.push(res);                                                                                        // 59
      } else if (Array.isArray(res)) {                                                                            // 60
        // check all the elements are cursors                                                                     // 61
        var areCursors = res.reduce(function (valid, cur) {                                                       // 62
          return valid && _this3._isCursor(cur);                                                                  // 62
        }, true);                                                                                                 // 62
                                                                                                                  //
        if (!areCursors) {                                                                                        // 63
          this.error(new Error('Publish function returned an array of non-Cursors'));                             // 64
          return;                                                                                                 // 65
        } // find duplicate collection names                                                                      // 66
                                                                                                                  //
                                                                                                                  //
        var collectionNames = {};                                                                                 // 68
                                                                                                                  //
        for (var i = 0; i < res.length; ++i) {                                                                    // 69
          var collectionName = res[i]._getCollectionName();                                                       // 70
                                                                                                                  //
          if ({}.hasOwnProperty.call(collectionNames, collectionName)) {                                          // 71
            this.error(new Error("Publish function returned multiple cursors for collection " + collectionName));
            return;                                                                                               // 75
          }                                                                                                       // 76
                                                                                                                  //
          collectionNames[collectionName] = true;                                                                 // 77
          cursors.push(res[i]);                                                                                   // 78
        }                                                                                                         // 79
      }                                                                                                           // 80
                                                                                                                  //
      if (cursors.length > 0) {                                                                                   // 82
        try {                                                                                                     // 83
          // for each cursor we call _publishCursor method which starts observing the cursor and                  // 84
          // publishes the results.                                                                               // 85
          cursors.forEach(function (cur) {                                                                        // 86
            _this3._ensureCollectionInRes(cur._getCollectionName());                                              // 87
                                                                                                                  //
            cur._publishCursor(_this3);                                                                           // 88
          });                                                                                                     // 89
        } catch (e) {                                                                                             // 90
          this.error(e);                                                                                          // 91
          return;                                                                                                 // 92
        } // mark subscription as ready (_publishCursor does NOT call ready())                                    // 93
                                                                                                                  //
                                                                                                                  //
        this.ready();                                                                                             // 95
      } else if (res) {                                                                                           // 96
        // truthy values other than cursors or arrays are probably a                                              // 97
        // user mistake (possible returning a Mongo document via, say,                                            // 98
        // `coll.findOne()`).                                                                                     // 99
        this.error(new Error('Publish function can only return a Cursor or an array of Cursors'));                // 100
      }                                                                                                           // 101
    }                                                                                                             // 102
                                                                                                                  //
    return _publishHandlerResult;                                                                                 // 12
  }();                                                                                                            // 12
                                                                                                                  //
  PublicationCollector.prototype.added = function () {                                                            // 12
    function added(collection, id, fields) {                                                                      // 12
      check(collection, String);                                                                                  // 105
      check(id, validMongoId);                                                                                    // 106
                                                                                                                  //
      this._ensureCollectionInRes(collection); // Make sure to ignore the _id in fields                           // 108
                                                                                                                  //
                                                                                                                  //
      var addedDocument = _.extend({                                                                              // 111
        _id: id                                                                                                   // 111
      }, _.omit(fields, '_id'));                                                                                  // 111
                                                                                                                  //
      this._documents[collection][id] = addedDocument;                                                            // 112
    }                                                                                                             // 113
                                                                                                                  //
    return added;                                                                                                 // 12
  }();                                                                                                            // 12
                                                                                                                  //
  PublicationCollector.prototype.changed = function () {                                                          // 12
    function changed(collection, id, fields) {                                                                    // 12
      check(collection, String);                                                                                  // 116
      check(id, validMongoId);                                                                                    // 117
                                                                                                                  //
      this._ensureCollectionInRes(collection);                                                                    // 119
                                                                                                                  //
      var existingDocument = this._documents[collection][id];                                                     // 121
                                                                                                                  //
      var fieldsNoId = _.omit(fields, '_id');                                                                     // 122
                                                                                                                  //
      if (existingDocument) {                                                                                     // 124
        _.extend(existingDocument, fieldsNoId); // Delete all keys that were undefined in fields (except _id)     // 125
                                                                                                                  //
                                                                                                                  //
        _.forEach(fields, function (value, key) {                                                                 // 128
          if (value === undefined) {                                                                              // 129
            delete existingDocument[key];                                                                         // 130
          }                                                                                                       // 131
        });                                                                                                       // 132
      }                                                                                                           // 133
    }                                                                                                             // 134
                                                                                                                  //
    return changed;                                                                                               // 12
  }();                                                                                                            // 12
                                                                                                                  //
  PublicationCollector.prototype.removed = function () {                                                          // 12
    function removed(collection, id) {                                                                            // 12
      check(collection, String);                                                                                  // 137
      check(id, validMongoId);                                                                                    // 138
                                                                                                                  //
      this._ensureCollectionInRes(collection);                                                                    // 140
                                                                                                                  //
      delete this._documents[collection][id];                                                                     // 142
                                                                                                                  //
      if (_.isEmpty(this._documents[collection])) {                                                               // 144
        delete this._documents[collection];                                                                       // 145
      }                                                                                                           // 146
    }                                                                                                             // 147
                                                                                                                  //
    return removed;                                                                                               // 12
  }();                                                                                                            // 12
                                                                                                                  //
  PublicationCollector.prototype.ready = function () {                                                            // 12
    function ready() {                                                                                            // 12
      // Synchronously calls each of the listeners registered for the "ready" event                               // 150
      this.emit('ready', this._generateResponse());                                                               // 151
    }                                                                                                             // 152
                                                                                                                  //
    return ready;                                                                                                 // 12
  }();                                                                                                            // 12
                                                                                                                  //
  PublicationCollector.prototype.onStop = function () {                                                           // 12
    function onStop(callback) {                                                                                   // 12
      // Adds a one time listener function for the "stop" event                                                   // 155
      this.once('stop', callback);                                                                                // 156
    }                                                                                                             // 157
                                                                                                                  //
    return onStop;                                                                                                // 12
  }();                                                                                                            // 12
                                                                                                                  //
  PublicationCollector.prototype.stop = function () {                                                             // 12
    function stop() {                                                                                             // 12
      // Synchronously calls each of the listeners registered for the "stop" event                                // 160
      this.emit('stop');                                                                                          // 161
    }                                                                                                             // 162
                                                                                                                  //
    return stop;                                                                                                  // 12
  }();                                                                                                            // 12
                                                                                                                  //
  PublicationCollector.prototype.error = function () {                                                            // 12
    function error(_error) {                                                                                      // 12
      throw _error;                                                                                               // 165
    }                                                                                                             // 166
                                                                                                                  //
    return error;                                                                                                 // 12
  }();                                                                                                            // 12
                                                                                                                  //
  PublicationCollector.prototype._isCursor = function () {                                                        // 12
    function _isCursor(c) {                                                                                       // 12
      return c && c._publishCursor;                                                                               // 169
    }                                                                                                             // 170
                                                                                                                  //
    return _isCursor;                                                                                             // 12
  }();                                                                                                            // 12
                                                                                                                  //
  PublicationCollector.prototype._ensureCollectionInRes = function () {                                           // 12
    function _ensureCollectionInRes(collection) {                                                                 // 12
      this._documents[collection] = this._documents[collection] || {};                                            // 173
    }                                                                                                             // 174
                                                                                                                  //
    return _ensureCollectionInRes;                                                                                // 12
  }();                                                                                                            // 12
                                                                                                                  //
  PublicationCollector.prototype._generateResponse = function () {                                                // 12
    function _generateResponse() {                                                                                // 12
      var output = {};                                                                                            // 177
                                                                                                                  //
      _.forEach(this._documents, function (documents, collectionName) {                                           // 179
        output[collectionName] = _.values(documents);                                                             // 180
      });                                                                                                         // 181
                                                                                                                  //
      return output;                                                                                              // 183
    }                                                                                                             // 184
                                                                                                                  //
    return _generateResponse;                                                                                     // 12
  }();                                                                                                            // 12
                                                                                                                  //
  return PublicationCollector;                                                                                    // 12
}(EventEmitter);                                                                                                  // 12
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/johanbrook:publication-collector/publication-collector.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['johanbrook:publication-collector'] = {}, {
  PublicationCollector: PublicationCollector
});

})();

//# sourceMappingURL=johanbrook_publication-collector.js.map
