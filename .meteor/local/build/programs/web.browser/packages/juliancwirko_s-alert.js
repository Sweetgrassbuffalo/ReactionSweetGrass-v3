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
var Template = Package['templating-runtime'].Template;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var _ = Package.underscore._;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var Session = Package.session.Session;
var Spacebars = Package.spacebars.Spacebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var sAlert;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/juliancwirko_s-alert/client/s-alert.js                                                             //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
'use strict';                                                                                                  // 1
                                                                                                               // 2
// helper functions                                                                                            // 3
var conditionSet = function (self, msg, condition, customSettings) {                                           // 4
    var settings = {};                                                                                         // 5
    var effects = ['jelly', 'genie', 'stackslide', 'scale', 'slide', 'flip', 'bouncyflip'];                    // 6
    var currentEffect;                                                                                         // 7
    var sAlertId;                                                                                              // 8
    if (!_.isObject(customSettings)) {                                                                         // 9
        customSettings = {};                                                                                   // 10
    }                                                                                                          // 11
    if (_.isObject(msg) && _.isString(condition)) {                                                            // 12
        settings = _.extend(settings, self.settings, JSON.parse(JSON.stringify(msg)), {condition: condition}, customSettings);
    }                                                                                                          // 14
    if (_.isString(msg) && _.isString(condition)) {                                                            // 15
        settings = _.extend(settings, self.settings, {message: msg}, {condition: condition}, customSettings);  // 16
    }                                                                                                          // 17
    currentEffect = settings && settings.effect;                                                               // 18
    if (_.contains(effects, currentEffect) && !Package['juliancwirko:s-alert-' + currentEffect] && typeof console !== 'undefined') {
        console.info('Install "' + currentEffect + '" effect by running "meteor add juliancwirko:s-alert-' + currentEffect + '"');
    }                                                                                                          // 21
    if (_.isObject(settings) && !_.isEmpty(settings)) {                                                        // 22
        sAlertId = sAlert.collection.insert(settings);                                                         // 23
    }                                                                                                          // 24
    return sAlertId;                                                                                           // 25
};                                                                                                             // 26
                                                                                                               // 27
var EVENTS = 'webkitAnimationEnd oAnimationEnd animationEnd msAnimationEnd animationend';                      // 28
var sAlertClose = function (alertId) {                                                                         // 29
    var closingTimeout;                                                                                        // 30
    var onClose;                                                                                               // 31
    var alertObj;                                                                                              // 32
    var invokeOnCloseCb = function () {                                                                        // 33
        // invoke onClose callback                                                                             // 34
        if (onClose && _.isFunction(onClose)) {                                                                // 35
            onClose();                                                                                         // 36
        }                                                                                                      // 37
    };                                                                                                         // 38
    if (document.hidden || document.webkitHidden || !$('#' + alertId).hasClass('s-alert-is-effect')) {         // 39
        alertObj = sAlert.collection.findOne(alertId);                                                         // 40
        if (alertObj && !_.isEmpty(alertObj)) {                                                                // 41
            onClose = alertObj.onClose;                                                                        // 42
        }                                                                                                      // 43
        sAlert.collection.remove(alertId);                                                                     // 44
        invokeOnCloseCb();                                                                                     // 45
    } else {                                                                                                   // 46
        $('.s-alert-box#' + alertId).removeClass('s-alert-show');                                              // 47
        closingTimeout = Meteor.setTimeout(function () {                                                       // 48
            $('.s-alert-box#' + alertId).addClass('s-alert-hide');                                             // 49
        }, 100);                                                                                               // 50
        $('.s-alert-box#' + alertId).off(EVENTS);                                                              // 51
        $('.s-alert-box#' + alertId).on(EVENTS, function () {                                                  // 52
            $(this).hide();                                                                                    // 53
            alertObj = sAlert.collection.findOne(alertId);                                                     // 54
            if (alertObj && !_.isEmpty(alertObj)) {                                                            // 55
                onClose = alertObj.onClose;                                                                    // 56
            }                                                                                                  // 57
            sAlert.collection.remove(alertId);                                                                 // 58
            Meteor.clearTimeout(closingTimeout);                                                               // 59
            invokeOnCloseCb();                                                                                 // 60
        });                                                                                                    // 61
    }                                                                                                          // 62
    // stop audio when closing                                                                                 // 63
    sAlert.audio && sAlert.audio.load();                                                                       // 64
    sAlert.audioInfo && sAlert.audioInfo.load();                                                               // 65
    sAlert.audioError && sAlert.audioError.load();                                                             // 66
    sAlert.audioSuccess && sAlert.audioSuccess.load();                                                         // 67
    sAlert.audioWarning && sAlert.audioWarning.load();                                                         // 68
};                                                                                                             // 69
                                                                                                               // 70
// sAlert object                                                                                               // 71
sAlert = {                                                                                                     // 72
    settings: {                                                                                                // 73
        effect: '',                                                                                            // 74
        position: 'top-right',                                                                                 // 75
        timeout: 5000,                                                                                         // 76
        html: false,                                                                                           // 77
        onRouteClose: true,                                                                                    // 78
        stack: true,                                                                                           // 79
        // or you can pass an object:                                                                          // 80
        // stack: {                                                                                            // 81
        //     spacing: 10 // in px                                                                            // 82
        //     limit: 3 // when fourth alert appears all previous ones are cleared                             // 83
        // }                                                                                                   // 84
        offset: 0, // in px - will be added to first alert (bottom or top - depends of the position in config)
        beep: false,                                                                                           // 86
        // beep: '/beep.mp3'  // or you can pass an object:                                                    // 87
        // beep: {                                                                                             // 88
        //     info: '/beep-info.mp3',                                                                         // 89
        //     error: '/beep-error.mp3',                                                                       // 90
        //     success: '/beep-success.mp3',                                                                   // 91
        //     warning: '/beep-warning.mp3'                                                                    // 92
        // }                                                                                                   // 93
        onClose: _.noop                                                                                        // 94
    },                                                                                                         // 95
    config: function (configObj) {                                                                             // 96
        var self = this;                                                                                       // 97
        if (_.isObject(configObj)) {                                                                           // 98
            self.settings = _.extend(self.settings, configObj);                                                // 99
        } else {                                                                                               // 100
            throw new Meteor.Error(400, 'Config must be an object!');                                          // 101
        }                                                                                                      // 102
    },                                                                                                         // 103
    closeAll: function () {                                                                                    // 104
        sAlert.collection.find({}).forEach(function (sAlertObj) {                                              // 105
            sAlert.collection.remove(sAlertObj._id);                                                           // 106
            if (sAlertObj.onClose && _.isFunction(sAlertObj.onClose)) {                                        // 107
                sAlertObj.onClose();                                                                           // 108
            }                                                                                                  // 109
        });                                                                                                    // 110
    },                                                                                                         // 111
    close: function (id) {                                                                                     // 112
        if (_.isString(id)) {                                                                                  // 113
            sAlertClose(id);                                                                                   // 114
        }                                                                                                      // 115
    },                                                                                                         // 116
    info: function (msg, customSettings) {                                                                     // 117
        return conditionSet(this, msg, 'info', customSettings);                                                // 118
    },                                                                                                         // 119
    error: function (msg, customSettings) {                                                                    // 120
        return conditionSet(this, msg, 'error', customSettings);                                               // 121
    },                                                                                                         // 122
    success: function (msg, customSettings) {                                                                  // 123
        return conditionSet(this, msg, 'success', customSettings);                                             // 124
    },                                                                                                         // 125
    warning: function (msg, customSettings) {                                                                  // 126
        return conditionSet(this, msg, 'warning', customSettings);                                             // 127
    }                                                                                                          // 128
};                                                                                                             // 129
                                                                                                               // 130
// routers clean                                                                                               // 131
Meteor.startup(function () {                                                                                   // 132
    if (typeof Iron !== 'undefined' && typeof Router !== 'undefined') {                                        // 133
        Router.onStop(function () {                                                                            // 134
            sAlert.collection.remove({onRouteClose: true});                                                    // 135
        });                                                                                                    // 136
    }                                                                                                          // 137
    if (typeof FlowRouter !== 'undefined' && _.isObject(FlowRouter.triggers)) {                                // 138
        FlowRouter.triggers.enter([function () {                                                               // 139
            sAlert.collection.remove({onRouteClose: true});                                                    // 140
        }]);                                                                                                   // 141
    }                                                                                                          // 142
    if (typeof FlowRouter !== 'undefined' && !_.isObject(FlowRouter.triggers)) {                               // 143
        FlowRouter.middleware(function (path, next) {                                                          // 144
            sAlert.collection.remove({onRouteClose: true});                                                    // 145
            next();                                                                                            // 146
        });                                                                                                    // 147
    }                                                                                                          // 148
});                                                                                                            // 149
                                                                                                               // 150
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/juliancwirko_s-alert/client/s-alert-collection.js                                                  //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
'use strict';                                                                                                  // 1
                                                                                                               // 2
// only client side collections for now..                                                                      // 3
sAlert.collection = new Mongo.Collection(null);                                                                // 4
                                                                                                               // 5
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/juliancwirko_s-alert/client/template.s-alert-template.js                                           //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
                                                                                                               // 1
Template.__checkName("sAlert");                                                                                // 2
Template["sAlert"] = new Template("Template.sAlert", (function() {                                             // 3
  var view = this;                                                                                             // 4
  return [ Blaze.Each(function() {                                                                             // 5
    return Spacebars.call(view.lookup("sAlertDataLeft"));                                                      // 6
  }, function() {                                                                                              // 7
    return [ "\n        ", Spacebars.include(view.lookupTemplate("sAlertContent")), "\n    " ];                // 8
  }), "\n    ", Blaze.Each(function() {                                                                        // 9
    return Spacebars.call(view.lookup("sAlertDataRight"));                                                     // 10
  }, function() {                                                                                              // 11
    return [ "\n        ", Spacebars.include(view.lookupTemplate("sAlertContent")), "\n    " ];                // 12
  }), "\n    ", Blaze.Each(function() {                                                                        // 13
    return Spacebars.call(view.lookup("sAlertDataFullTop"));                                                   // 14
  }, function() {                                                                                              // 15
    return [ "\n        ", Spacebars.include(view.lookupTemplate("sAlertContent")), "\n    " ];                // 16
  }), "\n    ", Blaze.Each(function() {                                                                        // 17
    return Spacebars.call(view.lookup("sAlertDataFullBottom"));                                                // 18
  }, function() {                                                                                              // 19
    return [ "\n        ", Spacebars.include(view.lookupTemplate("sAlertContent")), "\n    " ];                // 20
  }) ];                                                                                                        // 21
}));                                                                                                           // 22
                                                                                                               // 23
Template.__checkName("sAlertContent");                                                                         // 24
Template["sAlertContent"] = new Template("Template.sAlertContent", (function() {                               // 25
  var view = this;                                                                                             // 26
  return Blaze.If(function() {                                                                                 // 27
    return Spacebars.call(Spacebars.dot(view.lookup(".."), "template"));                                       // 28
  }, function() {                                                                                              // 29
    return [ "\n        ", Blaze._TemplateWith(function() {                                                    // 30
      return {                                                                                                 // 31
        template: Spacebars.call(Spacebars.dot(view.lookup(".."), "template")),                                // 32
        data: Spacebars.call(view.lookup("."))                                                                 // 33
      };                                                                                                       // 34
    }, function() {                                                                                            // 35
      return Spacebars.include(function() {                                                                    // 36
        return Spacebars.call(Template.__dynamic);                                                             // 37
      });                                                                                                      // 38
    }), "\n    " ];                                                                                            // 39
  }, function() {                                                                                              // 40
    return [ "\n        ", HTML.DIV({                                                                          // 41
      class: function() {                                                                                      // 42
        return [ "s-alert-box s-alert-", Spacebars.mustache(view.lookup("condition")), " s-alert-", Spacebars.mustache(view.lookup("position")), " ", Blaze.If(function() {
          return Spacebars.call(view.lookup("effect"));                                                        // 44
        }, function() {                                                                                        // 45
          return [ "s-alert-is-effect s-alert-effect-", Blaze.View("lookup:effect", function() {               // 46
            return Spacebars.mustache(view.lookup("effect"));                                                  // 47
          }) ];                                                                                                // 48
        }), " s-alert-show" ];                                                                                 // 49
      },                                                                                                       // 50
      id: function() {                                                                                         // 51
        return Spacebars.mustache(view.lookup("_id"));                                                         // 52
      },                                                                                                       // 53
      style: function() {                                                                                      // 54
        return Spacebars.mustache(view.lookup("boxPosition"));                                                 // 55
      }                                                                                                        // 56
    }, "\n            ", HTML.DIV({                                                                            // 57
      class: "s-alert-box-inner"                                                                               // 58
    }, "\n                ", HTML.P(Blaze.If(function() {                                                      // 59
      return Spacebars.call(view.lookup("isHtml"));                                                            // 60
    }, function() {                                                                                            // 61
      return Blaze.View("lookup:message", function() {                                                         // 62
        return Spacebars.makeRaw(Spacebars.mustache(view.lookup("message")));                                  // 63
      });                                                                                                      // 64
    }, function() {                                                                                            // 65
      return Blaze.View("lookup:message", function() {                                                         // 66
        return Spacebars.mustache(view.lookup("message"));                                                     // 67
      });                                                                                                      // 68
    })), "\n            "), "\n            ", HTML.SPAN({                                                      // 69
      class: "s-alert-close"                                                                                   // 70
    }), "\n        "), "\n    " ];                                                                             // 71
  });                                                                                                          // 72
}));                                                                                                           // 73
                                                                                                               // 74
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// packages/juliancwirko_s-alert/client/s-alert-template.js                                                    //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
'use strict';                                                                                                  // 1
                                                                                                               // 2
var getAlertData = function (currentData, sAlertPosition) {                                                    // 3
    var positionTop = 0;                                                                                       // 4
    var positionBottom = 0;                                                                                    // 5
    var padding = 0;                                                                                           // 6
    var alerts = {};                                                                                           // 7
    var style;                                                                                                 // 8
    var sAlertBoxHTML;                                                                                         // 9
    var sAlertBox;                                                                                             // 10
    var docElement;                                                                                            // 11
    var sAlertBoxHeight;                                                                                       // 12
    var templateOverwrite = currentData && currentData.template;                                               // 13
    var positionTypeTop;                                                                                       // 14
    var positionTypeBottom;                                                                                    // 15
    var stackLimit;                                                                                            // 16
    var alertsCount;                                                                                           // 17
    var checkFirst = function (type, objId) {                                                                  // 18
        var collectionOfType = sAlertCollection.filter(function(obj) {                                         // 19
            return obj.position === type;                                                                      // 20
        });                                                                                                    // 21
        return collectionOfType && collectionOfType[0]._id === objId;                                          // 22
    };                                                                                                         // 23
    var positionFunc = function (position, positionType, alert, sAlertBox) {                                   // 24
        padding = alert.stack.spacing || sAlertBox.find('.s-alert-box').css(positionType);                     // 25
        if (checkFirst(alert.position, alert._id) && alert.offset) {                                           // 26
            position = 0;                                                                                      // 27
            position = position + parseInt(alert.offset);                                                      // 28
        }                                                                                                      // 29
        if (checkFirst(alert.position, alert._id) && alert.stack.spacing) {                                    // 30
            position = position;                                                                               // 31
        } else {                                                                                               // 32
            position = position + parseInt(padding);                                                           // 33
        }                                                                                                      // 34
        style = positionType + ': ' + position + 'px;';                                                        // 35
        position = position + sAlertBoxHeight;                                                                 // 36
        return position;                                                                                       // 37
    };                                                                                                         // 38
                                                                                                               // 39
    var query = {};                                                                                            // 40
    if (sAlertPosition === 'left') {                                                                           // 41
        query = {$or: [{position: 'top-left'}, {position: 'bottom-left'}]};                                    // 42
    }                                                                                                          // 43
    if (sAlertPosition === 'right') {                                                                          // 44
        query = {$or: [{position: 'top-right'}, {position: 'bottom-right'}]};                                  // 45
    }                                                                                                          // 46
    if (sAlertPosition === 'full-top') {                                                                       // 47
        query = {position: 'top'};                                                                             // 48
    }                                                                                                          // 49
    if (sAlertPosition === 'full-bottom') {                                                                    // 50
        query = {position: 'bottom'};                                                                          // 51
    }                                                                                                          // 52
    var sAlertCollection = sAlert.collection.find(query).fetch();                                              // 53
                                                                                                               // 54
    return sAlertCollection.map(function (alert) {                                                             // 55
        positionTypeTop = alert.position && /top/g.test(alert.position);                                       // 56
        positionTypeBottom = alert.position && /bottom/g.test(alert.position);                                 // 57
        if (alert.stack) {                                                                                     // 58
            stackLimit = alert.stack && alert.stack.limit;                                                     // 59
            alertsCount = sAlert.collection.find(query).count();                                               // 60
            // limit check                                                                                     // 61
            if (stackLimit && alertsCount > stackLimit) {                                                      // 62
                sAlert.close(sAlert.collection.findOne(query)._id);                                            // 63
            }                                                                                                  // 64
            // checking alert box height - needed to calculate position                                        // 65
            docElement = document.createElement('div');                                                        // 66
            $(docElement).addClass('s-alert-box-height');                                                      // 67
            if (_.isString(templateOverwrite)) {                                                               // 68
                sAlertBoxHTML = Blaze.toHTMLWithData(Template[templateOverwrite], alert);                      // 69
            } else {                                                                                           // 70
                sAlertBoxHTML = Blaze.toHTMLWithData(Template.sAlertContent, alert);                           // 71
            }                                                                                                  // 72
            sAlertBox = $(docElement).html(sAlertBoxHTML);                                                     // 73
            $('body').append(sAlertBox);                                                                       // 74
            sAlertBoxHeight = sAlertBox.find('.s-alert-box').outerHeight(true);                                // 75
            if (positionTypeTop) {                                                                             // 76
                positionTop = positionFunc(positionTop, 'top', alert, sAlertBox);                              // 77
            }                                                                                                  // 78
            if (positionTypeBottom) {                                                                          // 79
                positionBottom = positionFunc(positionBottom, 'bottom', alert, sAlertBox);                     // 80
            }                                                                                                  // 81
            sAlertBox.remove();                                                                                // 82
            if (sAlertPosition === 'left') {                                                                   // 83
                style = style + 'left: ' + (alert.stack.spacing || sAlertBox.find('.s-alert-box').css('left')) + 'px;';
            }                                                                                                  // 85
            if (sAlertPosition === 'right') {                                                                  // 86
                style = style + 'right: ' + (alert.stack.spacing || sAlertBox.find('.s-alert-box').css('right')) + 'px;';
            }                                                                                                  // 88
            alerts = _.extend(alert, {boxPosition: style});                                                    // 89
        } else if (alert.offset && positionTypeTop) {                                                          // 90
            alerts = _.extend(alert, {boxPosition: 'top: ' + parseInt(alert.offset) + 'px;'});                 // 91
        } else if (alert.offset && positionTypeBottom) {                                                       // 92
            alerts = _.extend(alert, {boxPosition: 'bottom: ' + parseInt(alert.offset) + 'px;'});              // 93
        } else {                                                                                               // 94
            alerts = alert;                                                                                    // 95
        }                                                                                                      // 96
        return alerts;                                                                                         // 97
    });                                                                                                        // 98
};                                                                                                             // 99
                                                                                                               // 100
Template.sAlert.helpers({                                                                                      // 101
    sAlertDataLeft: function () {                                                                              // 102
        return getAlertData(Template.currentData(), 'left');                                                   // 103
    },                                                                                                         // 104
    sAlertDataRight: function () {                                                                             // 105
        return getAlertData(Template.currentData(), 'right');                                                  // 106
    },                                                                                                         // 107
    sAlertDataFullTop: function () {                                                                           // 108
        return getAlertData(Template.currentData(), 'full-top');                                               // 109
    },                                                                                                         // 110
    sAlertDataFullBottom: function () {                                                                        // 111
        return getAlertData(Template.currentData(), 'full-bottom');                                            // 112
    }                                                                                                          // 113
});                                                                                                            // 114
                                                                                                               // 115
Template.sAlertContent.onRendered(function () {                                                                // 116
    var tmpl = this;                                                                                           // 117
    var data = Template.currentData();                                                                         // 118
    var sAlertTimeout = data.timeout;                                                                          // 119
    var beep = data.beep;                                                                                      // 120
    // audio                                                                                                   // 121
    if (beep && _.isString(beep)) {                                                                            // 122
        sAlert.audio = new Audio(data.beep);                                                                   // 123
        sAlert.audio.load();                                                                                   // 124
        sAlert.audio.play();                                                                                   // 125
    }                                                                                                          // 126
    if (beep && _.isObject(beep) && data.condition === 'info') {                                               // 127
        sAlert.audioInfo = new Audio(data.beep.info);                                                          // 128
        sAlert.audioInfo.load();                                                                               // 129
        sAlert.audioInfo.play();                                                                               // 130
    }                                                                                                          // 131
    if (beep && _.isObject(beep) && data.condition === 'error') {                                              // 132
        sAlert.audioError = new Audio(data.beep.error);                                                        // 133
        sAlert.audioError.load();                                                                              // 134
        sAlert.audioError.play();                                                                              // 135
    }                                                                                                          // 136
    if (beep && _.isObject(beep) && data.condition === 'success') {                                            // 137
        sAlert.audioSuccess = new Audio(data.beep.success);                                                    // 138
        sAlert.audioSuccess.load();                                                                            // 139
        sAlert.audioSuccess.play();                                                                            // 140
    }                                                                                                          // 141
    if (beep && _.isObject(beep) && data.condition === 'warning') {                                            // 142
        sAlert.audioWarning = new Audio(data.beep.warning);                                                    // 143
        sAlert.audioWarning.load();                                                                            // 144
        sAlert.audioWarning.play();                                                                            // 145
    }                                                                                                          // 146
    if (sAlertTimeout && sAlertTimeout !== 'none') {                                                           // 147
        sAlertTimeout = parseInt(sAlertTimeout);                                                               // 148
        if (tmpl.sAlertCloseTimeout) {                                                                         // 149
            Meteor.clearTimeout(tmpl.sAlertCloseTimeout);                                                      // 150
        }                                                                                                      // 151
        tmpl.sAlertCloseTimeout = Meteor.setTimeout(function () {                                              // 152
            sAlert.close(data._id);                                                                            // 153
        }, sAlertTimeout);                                                                                     // 154
    }                                                                                                          // 155
});                                                                                                            // 156
Template.sAlertContent.onDestroyed(function () {                                                               // 157
    if (this.sAlertCloseTimeout) {                                                                             // 158
        Meteor.clearTimeout(this.sAlertCloseTimeout);                                                          // 159
    }                                                                                                          // 160
});                                                                                                            // 161
                                                                                                               // 162
Template.sAlertContent.events({                                                                                // 163
    'click .s-alert-close': function (e, tmpl) {                                                               // 164
        e.preventDefault();                                                                                    // 165
        Meteor.clearTimeout(tmpl.sAlertCloseTimeout);                                                          // 166
        sAlert.close(this._id);                                                                                // 167
    }                                                                                                          // 168
});                                                                                                            // 169
                                                                                                               // 170
Template.sAlertContent.helpers({                                                                               // 171
    isHtml: function () {                                                                                      // 172
        var data = Template.currentData();                                                                     // 173
        return data && data.html;                                                                              // 174
    }                                                                                                          // 175
});                                                                                                            // 176
                                                                                                               // 177
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['juliancwirko:s-alert'] = {}, {
  sAlert: sAlert
});

})();
