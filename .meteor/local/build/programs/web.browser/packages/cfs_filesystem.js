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

(function(){

/////////////////////////////////////////////////////////////////////////////
//                                                                         //
// packages/cfs_filesystem/packages/cfs_filesystem.js                      //
//                                                                         //
/////////////////////////////////////////////////////////////////////////////
                                                                           //
(function () {                                                             // 1
                                                                           // 2
///////////////////////////////////////////////////////////////////////    // 3
//                                                                   //    // 4
// packages/cfs:filesystem/filesystem.client.js                      //    // 5
//                                                                   //    // 6
///////////////////////////////////////////////////////////////////////    // 7
                                                                     //    // 8
// On the client we have just a shell                                // 1  // 9
FS.Store.FileSystem = function(name, options) {                      // 2  // 10
  var self = this;                                                   // 3  // 11
  if (!(self instanceof FS.Store.FileSystem))                        // 4  // 12
    throw new Error('FS.Store.FileSystem missing keyword "new"');    // 5  // 13
                                                                     // 6  // 14
  return new FS.StorageAdapter(name, options, {                      // 7  // 15
    typeName: 'storage.filesystem'                                   // 8  // 16
  });                                                                // 9  // 17
};                                                                   // 10
                                                                     // 11
///////////////////////////////////////////////////////////////////////    // 20
                                                                           // 21
}).call(this);                                                             // 22
                                                                           // 23
/////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['cfs:filesystem'] = {};

})();
