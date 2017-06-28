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
var FS = Package['cfs:base-package'].FS;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

var require = meteorInstall({"node_modules":{"meteor":{"cfs:gridfs":{"gridfs.client.js":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
// packages/cfs_gridfs/gridfs.client.js                                                             //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
/* eslint-disable */ /**                                                                            // 1
                      * @public                                                                     //
                      * @constructor                                                                //
                      * @param {String} name - The store name                                       //
                      * @param {Object} options                                                     //
                      * @param {Function} [options.beforeSave] - Function to run before saving a file from the client. The context of the function will be the `FS.File` instance we're saving. The function may alter its properties.
                      * @param {Number} [options.maxTries=5] - Max times to attempt saving a file   //
                      * @returns {undefined}                                                        //
                      *                                                                             //
                      * Creates a GridFS store instance on the client, which is just a shell object
                      * storing some info.                                                          //
                      */FS.Store.GridFS = function (name, options) {                                //
  var self = this;                                                                                  // 16
                                                                                                    //
  if (!(self instanceof FS.Store.GridFS)) {                                                         // 17
    throw new Error('FS.Store.GridFS missing keyword "new"');                                       // 18
  }                                                                                                 // 19
                                                                                                    //
  return new FS.StorageAdapter(name, options, {                                                     // 21
    typeName: "storage.gridfs"                                                                      // 22
  });                                                                                               // 21
};                                                                                                  // 24
//////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/cfs:gridfs/gridfs.client.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['cfs:gridfs'] = {};

})();
