(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var FS = Package['cfs:base-package'].FS;
var ECMAScript = Package.ecmascript.ECMAScript;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

var require = meteorInstall({"node_modules":{"meteor":{"cfs:gridfs":{"gridfs.server.js":function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/cfs_gridfs/gridfs.server.js                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/* eslint-disable */var path = Npm.require("path");                                                                    // 1
                                                                                                                       //
var mongodb = Npm.require("mongodb");                                                                                  // 3
                                                                                                                       //
var ObjectID = Npm.require("mongodb").ObjectID;                                                                        // 4
                                                                                                                       //
var Grid = Npm.require("gridfs-stream"); // var Grid = Npm.require('gridfs-locking-stream');                           // 5
                                                                                                                       //
                                                                                                                       //
var chunkSize = 1024 * 1024 * 2; // 256k is default GridFS chunk size, but performs terribly for largish files         // 8
/**                                                                                                                    // 10
 * @public                                                                                                             //
 * @constructor                                                                                                        //
 * @param {String} name - The store name                                                                               //
 * @param {Object} options                                                                                             //
 * @param {Function} [options.beforeSave] - Function to run before saving a file from the server. The context of the function will be the `FS.File` instance we're saving. The function may alter its properties.
 * @param {Number} [options.maxTries=5] - Max times to attempt saving a file                                           //
 * @returns {FS.StorageAdapter} An instance of FS.StorageAdapter.                                                      //
 *                                                                                                                     //
 * Creates a GridFS store instance on the server. Inherits from FS.StorageAdapter                                      //
 * type.                                                                                                               //
 */                                                                                                                    //
                                                                                                                       //
FS.Store.GridFS = function (name, options) {                                                                           // 23
  var self = this;                                                                                                     // 24
  options = options || {};                                                                                             // 25
  var gridfsName = name;                                                                                               // 27
  var mongoOptions = options.mongoOptions || {};                                                                       // 28
                                                                                                                       //
  if (!(self instanceof FS.Store.GridFS)) {                                                                            // 30
    throw new Error('FS.Store.GridFS missing keyword "new"');                                                          // 31
  }                                                                                                                    // 32
                                                                                                                       //
  if (!options.mongoUrl) {                                                                                             // 34
    options.mongoUrl = process.env.MONGO_URL; // When using a Meteor MongoDB instance, preface name with "cfs_gridfs."
                                                                                                                       //
    gridfsName = "cfs_gridfs." + name;                                                                                 // 37
  }                                                                                                                    // 38
                                                                                                                       //
  if (!options.mongoOptions) {                                                                                         // 40
    options.mongoOptions = {                                                                                           // 41
      db: {                                                                                                            // 41
        native_parser: true                                                                                            // 41
      },                                                                                                               // 41
      server: {                                                                                                        // 41
        auto_reconnect: true                                                                                           // 41
      }                                                                                                                // 41
    };                                                                                                                 // 41
  }                                                                                                                    // 42
                                                                                                                       //
  if (options.chunkSize) {                                                                                             // 44
    chunkSize = options.chunkSize;                                                                                     // 45
  }                                                                                                                    // 46
                                                                                                                       //
  return new FS.StorageAdapter(name, options, {                                                                        // 48
    typeName: "storage.gridfs",                                                                                        // 50
    fileKey: function (fileObj) {                                                                                      // 51
      // We should not have to mount the file here - We assume its taken                                               // 52
      // care of - Otherwise we create new files instead of overwriting                                                // 53
      var key = {                                                                                                      // 54
        _id: null,                                                                                                     // 55
        filename: null                                                                                                 // 56
      }; // If we're passed a fileObj, we retrieve the _id and filename from it.                                       // 54
                                                                                                                       //
      if (fileObj) {                                                                                                   // 60
        var info = fileObj._getInfo(name, {                                                                            // 61
          updateFileRecordFirst: false                                                                                 // 61
        });                                                                                                            // 61
                                                                                                                       //
        key._id = info.key || null;                                                                                    // 62
        key.filename = info.name || fileObj.name({                                                                     // 63
          updateFileRecordFirst: false                                                                                 // 63
        }) || fileObj.collectionName + "-" + fileObj._id;                                                              // 63
      } // If key._id is null at this point, createWriteStream will let GridFS generate a new ID                       // 64
                                                                                                                       //
                                                                                                                       //
      return key;                                                                                                      // 67
    },                                                                                                                 // 68
    createReadStream: function (fileKey, options) {                                                                    // 69
      options = options || {}; // Init GridFS                                                                          // 70
                                                                                                                       //
      var gfs = new Grid(self.db, mongodb); // Set the default streamning settings                                     // 73
                                                                                                                       //
      var settings = {                                                                                                 // 76
        _id: new ObjectID(fileKey._id),                                                                                // 77
        root: gridfsName                                                                                               // 78
      }; // Check if this should be a partial read                                                                     // 76
                                                                                                                       //
      if (typeof options.start !== "undefined" && typeof options.end !== "undefined") {                                // 82
        // Add partial info                                                                                            // 83
        settings.range = {                                                                                             // 84
          startPos: options.start,                                                                                     // 85
          endPos: options.end                                                                                          // 86
        };                                                                                                             // 84
      }                                                                                                                // 88
                                                                                                                       //
      FS.debug && console.log("GRIDFS", settings);                                                                     // 90
      return gfs.createReadStream(settings);                                                                           // 92
    },                                                                                                                 // 93
    createWriteStream: function (fileKey, options) {                                                                   // 94
      options = options || {}; // Init GridFS                                                                          // 95
                                                                                                                       //
      var gfs = new Grid(self.db, mongodb);                                                                            // 98
      var opts = {                                                                                                     // 100
        filename: fileKey.filename,                                                                                    // 101
        mode: "w",                                                                                                     // 102
        root: gridfsName,                                                                                              // 103
        chunk_size: options.chunk_size || chunkSize,                                                                   // 104
        // We allow aliases, metadata and contentType to be passed in via                                              // 105
        // options                                                                                                     // 106
        aliases: options.aliases || [],                                                                                // 107
        metadata: options.metadata || null,                                                                            // 108
        content_type: options.contentType || "application/octet-stream"                                                // 109
      };                                                                                                               // 100
                                                                                                                       //
      if (fileKey._id) {                                                                                               // 112
        opts._id = new ObjectID(fileKey._id);                                                                          // 113
      }                                                                                                                // 114
                                                                                                                       //
      var writeStream = gfs.createWriteStream(opts);                                                                   // 116
      writeStream.on("close", function (file) {                                                                        // 118
        if (!file) {                                                                                                   // 119
          // gridfs-stream will emit "close" without passing a file                                                    // 120
          // if there is an error. We can simply exit here because                                                     // 121
          // the "error" listener will also be called in this case.                                                    // 122
          return;                                                                                                      // 123
        }                                                                                                              // 124
                                                                                                                       //
        if (FS.debug) console.log("SA GridFS - DONE!"); // Emit end and return the fileKey, size, and updated date     // 126
                                                                                                                       //
        writeStream.emit("stored", {                                                                                   // 129
          // Set the generated _id so that we know it for future reads and writes.                                     // 130
          // We store the _id as a string and only convert to ObjectID right before                                    // 131
          // reading, writing, or deleting. If we store the ObjectID itself,                                           // 132
          // Meteor (EJSON?) seems to convert it to a LocalCollection.ObjectID,                                        // 133
          // which GFS doesn't understand.                                                                             // 134
          fileKey: file._id.toString(),                                                                                // 135
          size: file.length,                                                                                           // 136
          storedAt: file.uploadDate || new Date()                                                                      // 137
        });                                                                                                            // 129
      });                                                                                                              // 139
      writeStream.on("error", function (error) {                                                                       // 141
        console.log("SA GridFS - ERROR!", error);                                                                      // 142
      });                                                                                                              // 143
      return writeStream;                                                                                              // 145
    },                                                                                                                 // 146
    remove: function (fileKey, callback) {                                                                             // 147
      // Init GridFS                                                                                                   // 148
      var gfs = new Grid(self.db, mongodb);                                                                            // 149
                                                                                                                       //
      try {                                                                                                            // 151
        gfs.remove({                                                                                                   // 152
          _id: new ObjectID(fileKey._id),                                                                              // 152
          root: gridfsName                                                                                             // 152
        }, callback);                                                                                                  // 152
      } catch (err) {                                                                                                  // 153
        callback(err);                                                                                                 // 154
      }                                                                                                                // 155
    },                                                                                                                 // 156
    // Not implemented                                                                                                 // 158
    watch: function () {                                                                                               // 159
      throw new Error("GridFS storage adapter does not support the sync option");                                      // 160
    },                                                                                                                 // 161
    init: function (callback) {                                                                                        // 163
      mongodb.MongoClient.connect(options.mongoUrl, mongoOptions, function (err, db) {                                 // 164
        if (err) {                                                                                                     // 165
          return callback(err);                                                                                        // 165
        }                                                                                                              // 165
                                                                                                                       //
        self.db = db;                                                                                                  // 166
        callback(null);                                                                                                // 167
      });                                                                                                              // 168
    }                                                                                                                  // 169
  });                                                                                                                  // 48
};                                                                                                                     // 171
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/cfs:gridfs/gridfs.server.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['cfs:gridfs'] = {};

})();

//# sourceMappingURL=cfs_gridfs.js.map
