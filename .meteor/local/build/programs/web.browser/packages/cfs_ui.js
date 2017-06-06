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
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Template = Package['templating-runtime'].Template;
var HTML = Package.htmljs.HTML;
var Spacebars = Package.spacebars.Spacebars;

/* Package-scope variables */
var Helpers;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/cfs_ui/packages/cfs_ui.js                                                                            //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
(function () {                                                                                                   // 1
                                                                                                                 // 2
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 3
//                                                                                                        //     // 4
// packages/cfs:ui/template.ui.js                                                                         //     // 5
//                                                                                                        //     // 6
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                                          //     // 8
                                                                                                          // 1   // 9
Template.__checkName("_fs_DeleteButton");                                                                 // 2   // 10
Template["_fs_DeleteButton"] = new Template("Template._fs_DeleteButton", (function() {                    // 3   // 11
  var view = this;                                                                                        // 4   // 12
  return Blaze._TemplateWith(function() {                                                                 // 5   // 13
    return {                                                                                              // 6   // 14
      atts: Spacebars.call(view.lookup(".")),                                                             // 7   // 15
      fileObj: Spacebars.call(view.lookup("..")),                                                         // 8   // 16
      contentBlock: Spacebars.call(view.templateContentBlock)                                             // 9   // 17
    };                                                                                                    // 10  // 18
  }, function() {                                                                                         // 11  // 19
    return Spacebars.include(view.lookupTemplate("_fs_DeleteButton2"));                                   // 12  // 20
  });                                                                                                     // 13  // 21
}));                                                                                                      // 14  // 22
                                                                                                          // 15  // 23
Template.__checkName("_fs_DeleteButton2");                                                                // 16  // 24
Template["_fs_DeleteButton2"] = new Template("Template._fs_DeleteButton2", (function() {                  // 17  // 25
  var view = this;                                                                                        // 18  // 26
  return HTML.BUTTON(HTML.Attrs({                                                                         // 19  // 27
    type: "button"                                                                                        // 20  // 28
  }, function() {                                                                                         // 21  // 29
    return Spacebars.attrMustache(view.lookup("atts"));                                                   // 22  // 30
  }), Spacebars.With(function() {                                                                         // 23  // 31
    return Spacebars.call(view.lookup("contentBlock"));                                                   // 24  // 32
  }, function() {                                                                                         // 25  // 33
    return Spacebars.include(view.lookupTemplate("."));                                                   // 26  // 34
  }, function() {                                                                                         // 27  // 35
    return "Delete";                                                                                      // 28  // 36
  }));                                                                                                    // 29  // 37
}));                                                                                                      // 30  // 38
                                                                                                          // 31  // 39
Template.__checkName("_fs_UploadProgressBar");                                                            // 32  // 40
Template["_fs_UploadProgressBar"] = new Template("Template._fs_UploadProgressBar", (function() {          // 33  // 41
  var view = this;                                                                                        // 34  // 42
  return Spacebars.With(function() {                                                                      // 35  // 43
    return Spacebars.dataMustache(view.lookup("getAttsAndFileObj"), view.lookup("."), view.lookup("..")); // 36  // 44
  }, function() {                                                                                         // 37  // 45
    return [ "\n  ", Blaze.If(function() {                                                                // 38  // 46
      return Spacebars.call(Spacebars.dot(view.lookup("."), "useBootstrap"));                             // 39  // 47
    }, function() {                                                                                       // 40  // 48
      return [ "\n  ", HTML.DIV({                                                                         // 41  // 49
        "class": "progress"                                                                               // 42  // 50
      }, "\n  	", HTML.DIV(HTML.Attrs(function() {                                                        // 43  // 51
        return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                           // 44  // 52
      }), "\n        ", Blaze.If(function() {                                                             // 45  // 53
        return Spacebars.call(Spacebars.dot(view.lookup("."), "showPercent"));                            // 46  // 54
      }, function() {                                                                                     // 47  // 55
        return [ "\n        ", Blaze.View(function() {                                                    // 48  // 56
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "progress"));                         // 49  // 57
        }), "%\n        " ];                                                                              // 50  // 58
      }, function() {                                                                                     // 51  // 59
        return [ "\n	    ", HTML.SPAN({                                                                   // 52  // 60
          "class": "sr-only"                                                                              // 53  // 61
        }, Blaze.View(function() {                                                                        // 54  // 62
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "progress"));                         // 55  // 63
        }), "% Complete"), "\n        " ];                                                                // 56  // 64
      }), "\n    "), "\n  "), "\n  " ];                                                                   // 57  // 65
    }, function() {                                                                                       // 58  // 66
      return [ "\n  ", Blaze.If(function() {                                                              // 59  // 67
        return Spacebars.call(Spacebars.dot(view.lookup("."), "useSemantic"));                            // 60  // 68
      }, function() {                                                                                     // 61  // 69
        return [ "\n  ", HTML.DIV(HTML.Attrs(function() {                                                 // 62  // 70
          return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                         // 63  // 71
        }), "\n    ", HTML.DIV({                                                                          // 64  // 72
          "class": "bar",                                                                                 // 65  // 73
          style: function() {                                                                             // 66  // 74
            return [ "width: ", Spacebars.mustache(Spacebars.dot(view.lookup("."), "progress")), "%" ];   // 67  // 75
          }                                                                                               // 68  // 76
        }), "\n  "), "\n  " ];                                                                            // 69  // 77
      }, function() {                                                                                     // 70  // 78
        return [ "\n  ", HTML.PROGRESS(HTML.Attrs({                                                       // 71  // 79
          value: function() {                                                                             // 72  // 80
            return Spacebars.mustache(Spacebars.dot(view.lookup("."), "progress"));                       // 73  // 81
          },                                                                                              // 74  // 82
          max: "100"                                                                                      // 75  // 83
        }, function() {                                                                                   // 76  // 84
          return Spacebars.attrMustache(Spacebars.dot(view.lookup("."), "atts"));                         // 77  // 85
        }), Blaze.View(function() {                                                                       // 78  // 86
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "progress"));                         // 79  // 87
        }), "%"), "\n  " ];                                                                               // 80  // 88
      }), "\n  " ];                                                                                       // 81  // 89
    }), "\n  " ];                                                                                         // 82  // 90
  });                                                                                                     // 83  // 91
}));                                                                                                      // 84  // 92
                                                                                                          // 85  // 93
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 94
                                                                                                                 // 95
}).call(this);                                                                                                   // 96
                                                                                                                 // 97
                                                                                                                 // 98
                                                                                                                 // 99
                                                                                                                 // 100
                                                                                                                 // 101
                                                                                                                 // 102
(function () {                                                                                                   // 103
                                                                                                                 // 104
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 105
//                                                                                                        //     // 106
// packages/cfs:ui/ui.js                                                                                  //     // 107
//                                                                                                        //     // 108
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 109
                                                                                                          //     // 110
/* global Helpers:true */                                                                                 // 1   // 111
/* global Template */                                                                                     // 2   // 112
/* global FS */                                                                                           // 3   // 113
                                                                                                          // 4   // 114
Helpers = {};                                                                                             // 5   // 115
                                                                                                          // 6   // 116
// We expose the properties of Helpers on `FS` globally                                                   // 7   // 117
Template.registerHelper('FS', Helpers);                                                                   // 8   // 118
                                                                                                          // 9   // 119
// Usage: {{#with FS.GetFile collectionName id}}{{/with}}                                                 // 10  // 120
Helpers.GetFile = function cfsGetFile(collectionName, id) {                                               // 11  // 121
  var collection = FS._collections[collectionName];                                                       // 12  // 122
  return collection ? collection.findOne(id) : null;                                                      // 13  // 123
};                                                                                                        // 14  // 124
                                                                                                          // 15  // 125
// Usage: {{> FS.DeleteButton}} or {{#FS.DeleteButton}}Button Text{{/FS.DeleteButton}} (with FS.File as current context)
// Supported Options: any attribute                                                                       // 17  // 127
Helpers.DeleteButton = Template._fs_DeleteButton;                                                         // 18  // 128
                                                                                                          // 19  // 129
Template._fs_DeleteButton2.events({                                                                       // 20  // 130
  'click button': function(event, template) {                                                             // 21  // 131
    var fileObj = template.data.fileObj;                                                                  // 22  // 132
    if (!fileObj) {                                                                                       // 23  // 133
      return false;                                                                                       // 24  // 134
    }                                                                                                     // 25  // 135
    fileObj.remove();                                                                                     // 26  // 136
    return false;                                                                                         // 27  // 137
  }                                                                                                       // 28  // 138
});                                                                                                       // 29  // 139
                                                                                                          // 30  // 140
// Usage: {{> FS.UploadProgressBar attribute=value}} (with FS.File as current context or not for overall) // 31  // 141
Helpers.UploadProgressBar = Template._fs_UploadProgressBar;                                               // 32  // 142
                                                                                                          // 33  // 143
Template._fs_UploadProgressBar.helpers({                                                                  // 34  // 144
  getAttsAndFileObj: function getAttsAndFileObj(atts, fileObj) {                                          // 35  // 145
    if (atts instanceof FS.File) {                                                                        // 36  // 146
      fileObj = atts;                                                                                     // 37  // 147
      atts = {};                                                                                          // 38  // 148
    } else {                                                                                              // 39  // 149
      atts = atts || {};                                                                                  // 40  // 150
    }                                                                                                     // 41  // 151
                                                                                                          // 42  // 152
    var progressFunc;                                                                                     // 43  // 153
    if (fileObj instanceof FS.File) {                                                                     // 44  // 154
      progressFunc = function () {                                                                        // 45  // 155
        return fileObj.uploadProgress();                                                                  // 46  // 156
      };                                                                                                  // 47  // 157
    } else {                                                                                              // 48  // 158
      progressFunc = function () {                                                                        // 49  // 159
        return FS.HTTP.uploadQueue.progress();                                                            // 50  // 160
      };                                                                                                  // 51  // 161
    }                                                                                                     // 52  // 162
                                                                                                          // 53  // 163
    // We clone atts so that we can remove bootstrap or semantic props without losing them for            // 54  // 164
    // later reactive reruns.                                                                             // 55  // 165
    atts = FS.Utility.extend({}, atts);                                                                   // 56  // 166
                                                                                                          // 57  // 167
    var useBootstrap = false, useSemantic = false, show_percentage = false;                               // 58  // 168
    if (atts.semantic) {                                                                                  // 59  // 169
      useSemantic = true;                                                                                 // 60  // 170
      if (typeof atts["class"] === "string") {                                                            // 61  // 171
        atts["class"] += " ui progress";                                                                  // 62  // 172
      } else {                                                                                            // 63  // 173
        atts["class"] = "ui progress";                                                                    // 64  // 174
      }                                                                                                   // 65  // 175
      delete atts.semantic;                                                                               // 66  // 176
    } else if (atts.bootstrap) {                                                                          // 67  // 177
      useBootstrap = true;                                                                                // 68  // 178
      var progress = progressFunc();                                                                      // 69  // 179
      if (typeof atts["class"] === "string") {                                                            // 70  // 180
        atts["class"] += " progress-bar";                                                                 // 71  // 181
      } else {                                                                                            // 72  // 182
        atts["class"] = "progress-bar";                                                                   // 73  // 183
      }                                                                                                   // 74  // 184
      if (typeof atts.style === "string") {                                                               // 75  // 185
        atts.style += " width: " + progress + "%;";                                                       // 76  // 186
      } else {                                                                                            // 77  // 187
        atts.style = "width: " + progress + "%;";                                                         // 78  // 188
      }                                                                                                   // 79  // 189
      if (atts.showPercent) show_percentage = true;                                                       // 80  // 190
      atts.role = "progressbar";                                                                          // 81  // 191
      atts["aria-valuenow"] = ''+progress;                                                                // 82  // 192
      atts["aria-valuemin"] = "0";                                                                        // 83  // 193
      atts["aria-valuemax"] = "100";                                                                      // 84  // 194
      delete atts.bootstrap;                                                                              // 85  // 195
    }                                                                                                     // 86  // 196
                                                                                                          // 87  // 197
    return {                                                                                              // 88  // 198
      progress: progressFunc,                                                                             // 89  // 199
      atts: atts,                                                                                         // 90  // 200
      showPercent : show_percentage,                                                                      // 91  // 201
      useBootstrap: useBootstrap,                                                                         // 92  // 202
      useSemantic: useSemantic                                                                            // 93  // 203
    };                                                                                                    // 94  // 204
  }                                                                                                       // 95  // 205
});                                                                                                       // 96  // 206
                                                                                                          // 97  // 207
FS.EventHandlers = {};                                                                                    // 98  // 208
                                                                                                          // 99  // 209
// Simplifies some of the repetitive code for making an event handler that does a file insert             // 100
FS.EventHandlers.insertFiles = function cfsInsertFiles(collection, options) {                             // 101
  options = options || {};                                                                                // 102
  var afterCallback = options.after;                                                                      // 103
  var metadataCallback = options.metadata;                                                                // 104
                                                                                                          // 105
  function insertFilesHandler(event) {                                                                    // 106
    FS.Utility.eachFile(event, function (file) {                                                          // 107
      var f = new FS.File(file);                                                                          // 108
      if (metadataCallback) {                                                                             // 109
        FS.Utility.extend(f, metadataCallback(f));                                                        // 110
      }                                                                                                   // 111
      collection.insert(f, afterCallback);                                                                // 112
    });                                                                                                   // 113
  }                                                                                                       // 114
                                                                                                          // 115
  return insertFilesHandler;                                                                              // 116
};                                                                                                        // 117
                                                                                                          // 118
////////////////////////////////////////////////////////////////////////////////////////////////////////////     // 229
                                                                                                                 // 230
}).call(this);                                                                                                   // 231
                                                                                                                 // 232
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['cfs:ui'] = {};

})();
