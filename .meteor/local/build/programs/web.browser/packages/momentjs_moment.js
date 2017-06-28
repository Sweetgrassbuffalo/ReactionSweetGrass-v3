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

/* Package-scope variables */
var moment;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/momentjs_moment/moment.js                                                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
//! moment.js                                                                                                        // 1
//! version : 2.17.1                                                                                                 // 2
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors                                                       // 3
//! license : MIT                                                                                                    // 4
//! momentjs.com                                                                                                     // 5
                                                                                                                     // 6
;(function (global, factory) {                                                                                       // 7
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :                      // 8
    typeof define === 'function' && define.amd ? define(factory) :                                                   // 9
    global.moment = factory()                                                                                        // 10
}(this, (function () { 'use strict';                                                                                 // 11
                                                                                                                     // 12
var hookCallback;                                                                                                    // 13
                                                                                                                     // 14
function hooks () {                                                                                                  // 15
    return hookCallback.apply(null, arguments);                                                                      // 16
}                                                                                                                    // 17
                                                                                                                     // 18
// This is done to register the method called with moment()                                                          // 19
// without creating circular dependencies.                                                                           // 20
function setHookCallback (callback) {                                                                                // 21
    hookCallback = callback;                                                                                         // 22
}                                                                                                                    // 23
                                                                                                                     // 24
function isArray(input) {                                                                                            // 25
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';                     // 26
}                                                                                                                    // 27
                                                                                                                     // 28
function isObject(input) {                                                                                           // 29
    // IE8 will treat undefined and null as object if it wasn't for                                                  // 30
    // input != null                                                                                                 // 31
    return input != null && Object.prototype.toString.call(input) === '[object Object]';                             // 32
}                                                                                                                    // 33
                                                                                                                     // 34
function isObjectEmpty(obj) {                                                                                        // 35
    var k;                                                                                                           // 36
    for (k in obj) {                                                                                                 // 37
        // even if its not own property I'd still call it non-empty                                                  // 38
        return false;                                                                                                // 39
    }                                                                                                                // 40
    return true;                                                                                                     // 41
}                                                                                                                    // 42
                                                                                                                     // 43
function isNumber(input) {                                                                                           // 44
    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';                 // 45
}                                                                                                                    // 46
                                                                                                                     // 47
function isDate(input) {                                                                                             // 48
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';                       // 49
}                                                                                                                    // 50
                                                                                                                     // 51
function map(arr, fn) {                                                                                              // 52
    var res = [], i;                                                                                                 // 53
    for (i = 0; i < arr.length; ++i) {                                                                               // 54
        res.push(fn(arr[i], i));                                                                                     // 55
    }                                                                                                                // 56
    return res;                                                                                                      // 57
}                                                                                                                    // 58
                                                                                                                     // 59
function hasOwnProp(a, b) {                                                                                          // 60
    return Object.prototype.hasOwnProperty.call(a, b);                                                               // 61
}                                                                                                                    // 62
                                                                                                                     // 63
function extend(a, b) {                                                                                              // 64
    for (var i in b) {                                                                                               // 65
        if (hasOwnProp(b, i)) {                                                                                      // 66
            a[i] = b[i];                                                                                             // 67
        }                                                                                                            // 68
    }                                                                                                                // 69
                                                                                                                     // 70
    if (hasOwnProp(b, 'toString')) {                                                                                 // 71
        a.toString = b.toString;                                                                                     // 72
    }                                                                                                                // 73
                                                                                                                     // 74
    if (hasOwnProp(b, 'valueOf')) {                                                                                  // 75
        a.valueOf = b.valueOf;                                                                                       // 76
    }                                                                                                                // 77
                                                                                                                     // 78
    return a;                                                                                                        // 79
}                                                                                                                    // 80
                                                                                                                     // 81
function createUTC (input, format, locale, strict) {                                                                 // 82
    return createLocalOrUTC(input, format, locale, strict, true).utc();                                              // 83
}                                                                                                                    // 84
                                                                                                                     // 85
function defaultParsingFlags() {                                                                                     // 86
    // We need to deep clone this object.                                                                            // 87
    return {                                                                                                         // 88
        empty           : false,                                                                                     // 89
        unusedTokens    : [],                                                                                        // 90
        unusedInput     : [],                                                                                        // 91
        overflow        : -2,                                                                                        // 92
        charsLeftOver   : 0,                                                                                         // 93
        nullInput       : false,                                                                                     // 94
        invalidMonth    : null,                                                                                      // 95
        invalidFormat   : false,                                                                                     // 96
        userInvalidated : false,                                                                                     // 97
        iso             : false,                                                                                     // 98
        parsedDateParts : [],                                                                                        // 99
        meridiem        : null                                                                                       // 100
    };                                                                                                               // 101
}                                                                                                                    // 102
                                                                                                                     // 103
function getParsingFlags(m) {                                                                                        // 104
    if (m._pf == null) {                                                                                             // 105
        m._pf = defaultParsingFlags();                                                                               // 106
    }                                                                                                                // 107
    return m._pf;                                                                                                    // 108
}                                                                                                                    // 109
                                                                                                                     // 110
var some;                                                                                                            // 111
if (Array.prototype.some) {                                                                                          // 112
    some = Array.prototype.some;                                                                                     // 113
} else {                                                                                                             // 114
    some = function (fun) {                                                                                          // 115
        var t = Object(this);                                                                                        // 116
        var len = t.length >>> 0;                                                                                    // 117
                                                                                                                     // 118
        for (var i = 0; i < len; i++) {                                                                              // 119
            if (i in t && fun.call(this, t[i], i, t)) {                                                              // 120
                return true;                                                                                         // 121
            }                                                                                                        // 122
        }                                                                                                            // 123
                                                                                                                     // 124
        return false;                                                                                                // 125
    };                                                                                                               // 126
}                                                                                                                    // 127
                                                                                                                     // 128
var some$1 = some;                                                                                                   // 129
                                                                                                                     // 130
function isValid(m) {                                                                                                // 131
    if (m._isValid == null) {                                                                                        // 132
        var flags = getParsingFlags(m);                                                                              // 133
        var parsedParts = some$1.call(flags.parsedDateParts, function (i) {                                          // 134
            return i != null;                                                                                        // 135
        });                                                                                                          // 136
        var isNowValid = !isNaN(m._d.getTime()) &&                                                                   // 137
            flags.overflow < 0 &&                                                                                    // 138
            !flags.empty &&                                                                                          // 139
            !flags.invalidMonth &&                                                                                   // 140
            !flags.invalidWeekday &&                                                                                 // 141
            !flags.nullInput &&                                                                                      // 142
            !flags.invalidFormat &&                                                                                  // 143
            !flags.userInvalidated &&                                                                                // 144
            (!flags.meridiem || (flags.meridiem && parsedParts));                                                    // 145
                                                                                                                     // 146
        if (m._strict) {                                                                                             // 147
            isNowValid = isNowValid &&                                                                               // 148
                flags.charsLeftOver === 0 &&                                                                         // 149
                flags.unusedTokens.length === 0 &&                                                                   // 150
                flags.bigHour === undefined;                                                                         // 151
        }                                                                                                            // 152
                                                                                                                     // 153
        if (Object.isFrozen == null || !Object.isFrozen(m)) {                                                        // 154
            m._isValid = isNowValid;                                                                                 // 155
        }                                                                                                            // 156
        else {                                                                                                       // 157
            return isNowValid;                                                                                       // 158
        }                                                                                                            // 159
    }                                                                                                                // 160
    return m._isValid;                                                                                               // 161
}                                                                                                                    // 162
                                                                                                                     // 163
function createInvalid (flags) {                                                                                     // 164
    var m = createUTC(NaN);                                                                                          // 165
    if (flags != null) {                                                                                             // 166
        extend(getParsingFlags(m), flags);                                                                           // 167
    }                                                                                                                // 168
    else {                                                                                                           // 169
        getParsingFlags(m).userInvalidated = true;                                                                   // 170
    }                                                                                                                // 171
                                                                                                                     // 172
    return m;                                                                                                        // 173
}                                                                                                                    // 174
                                                                                                                     // 175
function isUndefined(input) {                                                                                        // 176
    return input === void 0;                                                                                         // 177
}                                                                                                                    // 178
                                                                                                                     // 179
// Plugins that add properties should also add the key here (null value),                                            // 180
// so we can properly clone ourselves.                                                                               // 181
var momentProperties = hooks.momentProperties = [];                                                                  // 182
                                                                                                                     // 183
function copyConfig(to, from) {                                                                                      // 184
    var i, prop, val;                                                                                                // 185
                                                                                                                     // 186
    if (!isUndefined(from._isAMomentObject)) {                                                                       // 187
        to._isAMomentObject = from._isAMomentObject;                                                                 // 188
    }                                                                                                                // 189
    if (!isUndefined(from._i)) {                                                                                     // 190
        to._i = from._i;                                                                                             // 191
    }                                                                                                                // 192
    if (!isUndefined(from._f)) {                                                                                     // 193
        to._f = from._f;                                                                                             // 194
    }                                                                                                                // 195
    if (!isUndefined(from._l)) {                                                                                     // 196
        to._l = from._l;                                                                                             // 197
    }                                                                                                                // 198
    if (!isUndefined(from._strict)) {                                                                                // 199
        to._strict = from._strict;                                                                                   // 200
    }                                                                                                                // 201
    if (!isUndefined(from._tzm)) {                                                                                   // 202
        to._tzm = from._tzm;                                                                                         // 203
    }                                                                                                                // 204
    if (!isUndefined(from._isUTC)) {                                                                                 // 205
        to._isUTC = from._isUTC;                                                                                     // 206
    }                                                                                                                // 207
    if (!isUndefined(from._offset)) {                                                                                // 208
        to._offset = from._offset;                                                                                   // 209
    }                                                                                                                // 210
    if (!isUndefined(from._pf)) {                                                                                    // 211
        to._pf = getParsingFlags(from);                                                                              // 212
    }                                                                                                                // 213
    if (!isUndefined(from._locale)) {                                                                                // 214
        to._locale = from._locale;                                                                                   // 215
    }                                                                                                                // 216
                                                                                                                     // 217
    if (momentProperties.length > 0) {                                                                               // 218
        for (i in momentProperties) {                                                                                // 219
            prop = momentProperties[i];                                                                              // 220
            val = from[prop];                                                                                        // 221
            if (!isUndefined(val)) {                                                                                 // 222
                to[prop] = val;                                                                                      // 223
            }                                                                                                        // 224
        }                                                                                                            // 225
    }                                                                                                                // 226
                                                                                                                     // 227
    return to;                                                                                                       // 228
}                                                                                                                    // 229
                                                                                                                     // 230
var updateInProgress = false;                                                                                        // 231
                                                                                                                     // 232
// Moment prototype object                                                                                           // 233
function Moment(config) {                                                                                            // 234
    copyConfig(this, config);                                                                                        // 235
    this._d = new Date(config._d != null ? config._d.getTime() : NaN);                                               // 236
    if (!this.isValid()) {                                                                                           // 237
        this._d = new Date(NaN);                                                                                     // 238
    }                                                                                                                // 239
    // Prevent infinite loop in case updateOffset creates new moment                                                 // 240
    // objects.                                                                                                      // 241
    if (updateInProgress === false) {                                                                                // 242
        updateInProgress = true;                                                                                     // 243
        hooks.updateOffset(this);                                                                                    // 244
        updateInProgress = false;                                                                                    // 245
    }                                                                                                                // 246
}                                                                                                                    // 247
                                                                                                                     // 248
function isMoment (obj) {                                                                                            // 249
    return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);                                   // 250
}                                                                                                                    // 251
                                                                                                                     // 252
function absFloor (number) {                                                                                         // 253
    if (number < 0) {                                                                                                // 254
        // -0 -> 0                                                                                                   // 255
        return Math.ceil(number) || 0;                                                                               // 256
    } else {                                                                                                         // 257
        return Math.floor(number);                                                                                   // 258
    }                                                                                                                // 259
}                                                                                                                    // 260
                                                                                                                     // 261
function toInt(argumentForCoercion) {                                                                                // 262
    var coercedNumber = +argumentForCoercion,                                                                        // 263
        value = 0;                                                                                                   // 264
                                                                                                                     // 265
    if (coercedNumber !== 0 && isFinite(coercedNumber)) {                                                            // 266
        value = absFloor(coercedNumber);                                                                             // 267
    }                                                                                                                // 268
                                                                                                                     // 269
    return value;                                                                                                    // 270
}                                                                                                                    // 271
                                                                                                                     // 272
// compare two arrays, return the number of differences                                                              // 273
function compareArrays(array1, array2, dontConvert) {                                                                // 274
    var len = Math.min(array1.length, array2.length),                                                                // 275
        lengthDiff = Math.abs(array1.length - array2.length),                                                        // 276
        diffs = 0,                                                                                                   // 277
        i;                                                                                                           // 278
    for (i = 0; i < len; i++) {                                                                                      // 279
        if ((dontConvert && array1[i] !== array2[i]) ||                                                              // 280
            (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {                                               // 281
            diffs++;                                                                                                 // 282
        }                                                                                                            // 283
    }                                                                                                                // 284
    return diffs + lengthDiff;                                                                                       // 285
}                                                                                                                    // 286
                                                                                                                     // 287
function warn(msg) {                                                                                                 // 288
    if (hooks.suppressDeprecationWarnings === false &&                                                               // 289
            (typeof console !==  'undefined') && console.warn) {                                                     // 290
        console.warn('Deprecation warning: ' + msg);                                                                 // 291
    }                                                                                                                // 292
}                                                                                                                    // 293
                                                                                                                     // 294
function deprecate(msg, fn) {                                                                                        // 295
    var firstTime = true;                                                                                            // 296
                                                                                                                     // 297
    return extend(function () {                                                                                      // 298
        if (hooks.deprecationHandler != null) {                                                                      // 299
            hooks.deprecationHandler(null, msg);                                                                     // 300
        }                                                                                                            // 301
        if (firstTime) {                                                                                             // 302
            var args = [];                                                                                           // 303
            var arg;                                                                                                 // 304
            for (var i = 0; i < arguments.length; i++) {                                                             // 305
                arg = '';                                                                                            // 306
                if (typeof arguments[i] === 'object') {                                                              // 307
                    arg += '\n[' + i + '] ';                                                                         // 308
                    for (var key in arguments[0]) {                                                                  // 309
                        arg += key + ': ' + arguments[0][key] + ', ';                                                // 310
                    }                                                                                                // 311
                    arg = arg.slice(0, -2); // Remove trailing comma and space                                       // 312
                } else {                                                                                             // 313
                    arg = arguments[i];                                                                              // 314
                }                                                                                                    // 315
                args.push(arg);                                                                                      // 316
            }                                                                                                        // 317
            warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);    // 318
            firstTime = false;                                                                                       // 319
        }                                                                                                            // 320
        return fn.apply(this, arguments);                                                                            // 321
    }, fn);                                                                                                          // 322
}                                                                                                                    // 323
                                                                                                                     // 324
var deprecations = {};                                                                                               // 325
                                                                                                                     // 326
function deprecateSimple(name, msg) {                                                                                // 327
    if (hooks.deprecationHandler != null) {                                                                          // 328
        hooks.deprecationHandler(name, msg);                                                                         // 329
    }                                                                                                                // 330
    if (!deprecations[name]) {                                                                                       // 331
        warn(msg);                                                                                                   // 332
        deprecations[name] = true;                                                                                   // 333
    }                                                                                                                // 334
}                                                                                                                    // 335
                                                                                                                     // 336
hooks.suppressDeprecationWarnings = false;                                                                           // 337
hooks.deprecationHandler = null;                                                                                     // 338
                                                                                                                     // 339
function isFunction(input) {                                                                                         // 340
    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';               // 341
}                                                                                                                    // 342
                                                                                                                     // 343
function set (config) {                                                                                              // 344
    var prop, i;                                                                                                     // 345
    for (i in config) {                                                                                              // 346
        prop = config[i];                                                                                            // 347
        if (isFunction(prop)) {                                                                                      // 348
            this[i] = prop;                                                                                          // 349
        } else {                                                                                                     // 350
            this['_' + i] = prop;                                                                                    // 351
        }                                                                                                            // 352
    }                                                                                                                // 353
    this._config = config;                                                                                           // 354
    // Lenient ordinal parsing accepts just a number in addition to                                                  // 355
    // number + (possibly) stuff coming from _ordinalParseLenient.                                                   // 356
    this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);                    // 357
}                                                                                                                    // 358
                                                                                                                     // 359
function mergeConfigs(parentConfig, childConfig) {                                                                   // 360
    var res = extend({}, parentConfig), prop;                                                                        // 361
    for (prop in childConfig) {                                                                                      // 362
        if (hasOwnProp(childConfig, prop)) {                                                                         // 363
            if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {                                       // 364
                res[prop] = {};                                                                                      // 365
                extend(res[prop], parentConfig[prop]);                                                               // 366
                extend(res[prop], childConfig[prop]);                                                                // 367
            } else if (childConfig[prop] != null) {                                                                  // 368
                res[prop] = childConfig[prop];                                                                       // 369
            } else {                                                                                                 // 370
                delete res[prop];                                                                                    // 371
            }                                                                                                        // 372
        }                                                                                                            // 373
    }                                                                                                                // 374
    for (prop in parentConfig) {                                                                                     // 375
        if (hasOwnProp(parentConfig, prop) &&                                                                        // 376
                !hasOwnProp(childConfig, prop) &&                                                                    // 377
                isObject(parentConfig[prop])) {                                                                      // 378
            // make sure changes to properties don't modify parent config                                            // 379
            res[prop] = extend({}, res[prop]);                                                                       // 380
        }                                                                                                            // 381
    }                                                                                                                // 382
    return res;                                                                                                      // 383
}                                                                                                                    // 384
                                                                                                                     // 385
function Locale(config) {                                                                                            // 386
    if (config != null) {                                                                                            // 387
        this.set(config);                                                                                            // 388
    }                                                                                                                // 389
}                                                                                                                    // 390
                                                                                                                     // 391
var keys;                                                                                                            // 392
                                                                                                                     // 393
if (Object.keys) {                                                                                                   // 394
    keys = Object.keys;                                                                                              // 395
} else {                                                                                                             // 396
    keys = function (obj) {                                                                                          // 397
        var i, res = [];                                                                                             // 398
        for (i in obj) {                                                                                             // 399
            if (hasOwnProp(obj, i)) {                                                                                // 400
                res.push(i);                                                                                         // 401
            }                                                                                                        // 402
        }                                                                                                            // 403
        return res;                                                                                                  // 404
    };                                                                                                               // 405
}                                                                                                                    // 406
                                                                                                                     // 407
var keys$1 = keys;                                                                                                   // 408
                                                                                                                     // 409
var defaultCalendar = {                                                                                              // 410
    sameDay : '[Today at] LT',                                                                                       // 411
    nextDay : '[Tomorrow at] LT',                                                                                    // 412
    nextWeek : 'dddd [at] LT',                                                                                       // 413
    lastDay : '[Yesterday at] LT',                                                                                   // 414
    lastWeek : '[Last] dddd [at] LT',                                                                                // 415
    sameElse : 'L'                                                                                                   // 416
};                                                                                                                   // 417
                                                                                                                     // 418
function calendar (key, mom, now) {                                                                                  // 419
    var output = this._calendar[key] || this._calendar['sameElse'];                                                  // 420
    return isFunction(output) ? output.call(mom, now) : output;                                                      // 421
}                                                                                                                    // 422
                                                                                                                     // 423
var defaultLongDateFormat = {                                                                                        // 424
    LTS  : 'h:mm:ss A',                                                                                              // 425
    LT   : 'h:mm A',                                                                                                 // 426
    L    : 'MM/DD/YYYY',                                                                                             // 427
    LL   : 'MMMM D, YYYY',                                                                                           // 428
    LLL  : 'MMMM D, YYYY h:mm A',                                                                                    // 429
    LLLL : 'dddd, MMMM D, YYYY h:mm A'                                                                               // 430
};                                                                                                                   // 431
                                                                                                                     // 432
function longDateFormat (key) {                                                                                      // 433
    var format = this._longDateFormat[key],                                                                          // 434
        formatUpper = this._longDateFormat[key.toUpperCase()];                                                       // 435
                                                                                                                     // 436
    if (format || !formatUpper) {                                                                                    // 437
        return format;                                                                                               // 438
    }                                                                                                                // 439
                                                                                                                     // 440
    this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {                             // 441
        return val.slice(1);                                                                                         // 442
    });                                                                                                              // 443
                                                                                                                     // 444
    return this._longDateFormat[key];                                                                                // 445
}                                                                                                                    // 446
                                                                                                                     // 447
var defaultInvalidDate = 'Invalid date';                                                                             // 448
                                                                                                                     // 449
function invalidDate () {                                                                                            // 450
    return this._invalidDate;                                                                                        // 451
}                                                                                                                    // 452
                                                                                                                     // 453
var defaultOrdinal = '%d';                                                                                           // 454
var defaultOrdinalParse = /\d{1,2}/;                                                                                 // 455
                                                                                                                     // 456
function ordinal (number) {                                                                                          // 457
    return this._ordinal.replace('%d', number);                                                                      // 458
}                                                                                                                    // 459
                                                                                                                     // 460
var defaultRelativeTime = {                                                                                          // 461
    future : 'in %s',                                                                                                // 462
    past   : '%s ago',                                                                                               // 463
    s  : 'a few seconds',                                                                                            // 464
    m  : 'a minute',                                                                                                 // 465
    mm : '%d minutes',                                                                                               // 466
    h  : 'an hour',                                                                                                  // 467
    hh : '%d hours',                                                                                                 // 468
    d  : 'a day',                                                                                                    // 469
    dd : '%d days',                                                                                                  // 470
    M  : 'a month',                                                                                                  // 471
    MM : '%d months',                                                                                                // 472
    y  : 'a year',                                                                                                   // 473
    yy : '%d years'                                                                                                  // 474
};                                                                                                                   // 475
                                                                                                                     // 476
function relativeTime (number, withoutSuffix, string, isFuture) {                                                    // 477
    var output = this._relativeTime[string];                                                                         // 478
    return (isFunction(output)) ?                                                                                    // 479
        output(number, withoutSuffix, string, isFuture) :                                                            // 480
        output.replace(/%d/i, number);                                                                               // 481
}                                                                                                                    // 482
                                                                                                                     // 483
function pastFuture (diff, output) {                                                                                 // 484
    var format = this._relativeTime[diff > 0 ? 'future' : 'past'];                                                   // 485
    return isFunction(format) ? format(output) : format.replace(/%s/i, output);                                      // 486
}                                                                                                                    // 487
                                                                                                                     // 488
var aliases = {};                                                                                                    // 489
                                                                                                                     // 490
function addUnitAlias (unit, shorthand) {                                                                            // 491
    var lowerCase = unit.toLowerCase();                                                                              // 492
    aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;                                       // 493
}                                                                                                                    // 494
                                                                                                                     // 495
function normalizeUnits(units) {                                                                                     // 496
    return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;                   // 497
}                                                                                                                    // 498
                                                                                                                     // 499
function normalizeObjectUnits(inputObject) {                                                                         // 500
    var normalizedInput = {},                                                                                        // 501
        normalizedProp,                                                                                              // 502
        prop;                                                                                                        // 503
                                                                                                                     // 504
    for (prop in inputObject) {                                                                                      // 505
        if (hasOwnProp(inputObject, prop)) {                                                                         // 506
            normalizedProp = normalizeUnits(prop);                                                                   // 507
            if (normalizedProp) {                                                                                    // 508
                normalizedInput[normalizedProp] = inputObject[prop];                                                 // 509
            }                                                                                                        // 510
        }                                                                                                            // 511
    }                                                                                                                // 512
                                                                                                                     // 513
    return normalizedInput;                                                                                          // 514
}                                                                                                                    // 515
                                                                                                                     // 516
var priorities = {};                                                                                                 // 517
                                                                                                                     // 518
function addUnitPriority(unit, priority) {                                                                           // 519
    priorities[unit] = priority;                                                                                     // 520
}                                                                                                                    // 521
                                                                                                                     // 522
function getPrioritizedUnits(unitsObj) {                                                                             // 523
    var units = [];                                                                                                  // 524
    for (var u in unitsObj) {                                                                                        // 525
        units.push({unit: u, priority: priorities[u]});                                                              // 526
    }                                                                                                                // 527
    units.sort(function (a, b) {                                                                                     // 528
        return a.priority - b.priority;                                                                              // 529
    });                                                                                                              // 530
    return units;                                                                                                    // 531
}                                                                                                                    // 532
                                                                                                                     // 533
function makeGetSet (unit, keepTime) {                                                                               // 534
    return function (value) {                                                                                        // 535
        if (value != null) {                                                                                         // 536
            set$1(this, unit, value);                                                                                // 537
            hooks.updateOffset(this, keepTime);                                                                      // 538
            return this;                                                                                             // 539
        } else {                                                                                                     // 540
            return get(this, unit);                                                                                  // 541
        }                                                                                                            // 542
    };                                                                                                               // 543
}                                                                                                                    // 544
                                                                                                                     // 545
function get (mom, unit) {                                                                                           // 546
    return mom.isValid() ?                                                                                           // 547
        mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;                                                    // 548
}                                                                                                                    // 549
                                                                                                                     // 550
function set$1 (mom, unit, value) {                                                                                  // 551
    if (mom.isValid()) {                                                                                             // 552
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);                                                     // 553
    }                                                                                                                // 554
}                                                                                                                    // 555
                                                                                                                     // 556
// MOMENTS                                                                                                           // 557
                                                                                                                     // 558
function stringGet (units) {                                                                                         // 559
    units = normalizeUnits(units);                                                                                   // 560
    if (isFunction(this[units])) {                                                                                   // 561
        return this[units]();                                                                                        // 562
    }                                                                                                                // 563
    return this;                                                                                                     // 564
}                                                                                                                    // 565
                                                                                                                     // 566
                                                                                                                     // 567
function stringSet (units, value) {                                                                                  // 568
    if (typeof units === 'object') {                                                                                 // 569
        units = normalizeObjectUnits(units);                                                                         // 570
        var prioritized = getPrioritizedUnits(units);                                                                // 571
        for (var i = 0; i < prioritized.length; i++) {                                                               // 572
            this[prioritized[i].unit](units[prioritized[i].unit]);                                                   // 573
        }                                                                                                            // 574
    } else {                                                                                                         // 575
        units = normalizeUnits(units);                                                                               // 576
        if (isFunction(this[units])) {                                                                               // 577
            return this[units](value);                                                                               // 578
        }                                                                                                            // 579
    }                                                                                                                // 580
    return this;                                                                                                     // 581
}                                                                                                                    // 582
                                                                                                                     // 583
function zeroFill(number, targetLength, forceSign) {                                                                 // 584
    var absNumber = '' + Math.abs(number),                                                                           // 585
        zerosToFill = targetLength - absNumber.length,                                                               // 586
        sign = number >= 0;                                                                                          // 587
    return (sign ? (forceSign ? '+' : '') : '-') +                                                                   // 588
        Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;                                     // 589
}                                                                                                                    // 590
                                                                                                                     // 591
var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;
                                                                                                                     // 593
var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;                                            // 594
                                                                                                                     // 595
var formatFunctions = {};                                                                                            // 596
                                                                                                                     // 597
var formatTokenFunctions = {};                                                                                       // 598
                                                                                                                     // 599
// token:    'M'                                                                                                     // 600
// padded:   ['MM', 2]                                                                                               // 601
// ordinal:  'Mo'                                                                                                    // 602
// callback: function () { this.month() + 1 }                                                                        // 603
function addFormatToken (token, padded, ordinal, callback) {                                                         // 604
    var func = callback;                                                                                             // 605
    if (typeof callback === 'string') {                                                                              // 606
        func = function () {                                                                                         // 607
            return this[callback]();                                                                                 // 608
        };                                                                                                           // 609
    }                                                                                                                // 610
    if (token) {                                                                                                     // 611
        formatTokenFunctions[token] = func;                                                                          // 612
    }                                                                                                                // 613
    if (padded) {                                                                                                    // 614
        formatTokenFunctions[padded[0]] = function () {                                                              // 615
            return zeroFill(func.apply(this, arguments), padded[1], padded[2]);                                      // 616
        };                                                                                                           // 617
    }                                                                                                                // 618
    if (ordinal) {                                                                                                   // 619
        formatTokenFunctions[ordinal] = function () {                                                                // 620
            return this.localeData().ordinal(func.apply(this, arguments), token);                                    // 621
        };                                                                                                           // 622
    }                                                                                                                // 623
}                                                                                                                    // 624
                                                                                                                     // 625
function removeFormattingTokens(input) {                                                                             // 626
    if (input.match(/\[[\s\S]/)) {                                                                                   // 627
        return input.replace(/^\[|\]$/g, '');                                                                        // 628
    }                                                                                                                // 629
    return input.replace(/\\/g, '');                                                                                 // 630
}                                                                                                                    // 631
                                                                                                                     // 632
function makeFormatFunction(format) {                                                                                // 633
    var array = format.match(formattingTokens), i, length;                                                           // 634
                                                                                                                     // 635
    for (i = 0, length = array.length; i < length; i++) {                                                            // 636
        if (formatTokenFunctions[array[i]]) {                                                                        // 637
            array[i] = formatTokenFunctions[array[i]];                                                               // 638
        } else {                                                                                                     // 639
            array[i] = removeFormattingTokens(array[i]);                                                             // 640
        }                                                                                                            // 641
    }                                                                                                                // 642
                                                                                                                     // 643
    return function (mom) {                                                                                          // 644
        var output = '', i;                                                                                          // 645
        for (i = 0; i < length; i++) {                                                                               // 646
            output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];                          // 647
        }                                                                                                            // 648
        return output;                                                                                               // 649
    };                                                                                                               // 650
}                                                                                                                    // 651
                                                                                                                     // 652
// format date using native date object                                                                              // 653
function formatMoment(m, format) {                                                                                   // 654
    if (!m.isValid()) {                                                                                              // 655
        return m.localeData().invalidDate();                                                                         // 656
    }                                                                                                                // 657
                                                                                                                     // 658
    format = expandFormat(format, m.localeData());                                                                   // 659
    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);                                 // 660
                                                                                                                     // 661
    return formatFunctions[format](m);                                                                               // 662
}                                                                                                                    // 663
                                                                                                                     // 664
function expandFormat(format, locale) {                                                                              // 665
    var i = 5;                                                                                                       // 666
                                                                                                                     // 667
    function replaceLongDateFormatTokens(input) {                                                                    // 668
        return locale.longDateFormat(input) || input;                                                                // 669
    }                                                                                                                // 670
                                                                                                                     // 671
    localFormattingTokens.lastIndex = 0;                                                                             // 672
    while (i >= 0 && localFormattingTokens.test(format)) {                                                           // 673
        format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);                                 // 674
        localFormattingTokens.lastIndex = 0;                                                                         // 675
        i -= 1;                                                                                                      // 676
    }                                                                                                                // 677
                                                                                                                     // 678
    return format;                                                                                                   // 679
}                                                                                                                    // 680
                                                                                                                     // 681
var match1         = /\d/;            //       0 - 9                                                                 // 682
var match2         = /\d\d/;          //      00 - 99                                                                // 683
var match3         = /\d{3}/;         //     000 - 999                                                               // 684
var match4         = /\d{4}/;         //    0000 - 9999                                                              // 685
var match6         = /[+-]?\d{6}/;    // -999999 - 999999                                                            // 686
var match1to2      = /\d\d?/;         //       0 - 99                                                                // 687
var match3to4      = /\d\d\d\d?/;     //     999 - 9999                                                              // 688
var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999                                                            // 689
var match1to3      = /\d{1,3}/;       //       0 - 999                                                               // 690
var match1to4      = /\d{1,4}/;       //       0 - 9999                                                              // 691
var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999                                                            // 692
                                                                                                                     // 693
var matchUnsigned  = /\d+/;           //       0 - inf                                                               // 694
var matchSigned    = /[+-]?\d+/;      //    -inf - inf                                                               // 695
                                                                                                                     // 696
var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z                                         // 697
var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z                          // 698
                                                                                                                     // 699
var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123                                              // 700
                                                                                                                     // 701
// any word (or two) characters or numbers including two/three word month in arabic.                                 // 702
// includes scottish gaelic two word and hyphenated months                                                           // 703
var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;
                                                                                                                     // 705
                                                                                                                     // 706
var regexes = {};                                                                                                    // 707
                                                                                                                     // 708
function addRegexToken (token, regex, strictRegex) {                                                                 // 709
    regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {                                   // 710
        return (isStrict && strictRegex) ? strictRegex : regex;                                                      // 711
    };                                                                                                               // 712
}                                                                                                                    // 713
                                                                                                                     // 714
function getParseRegexForToken (token, config) {                                                                     // 715
    if (!hasOwnProp(regexes, token)) {                                                                               // 716
        return new RegExp(unescapeFormat(token));                                                                    // 717
    }                                                                                                                // 718
                                                                                                                     // 719
    return regexes[token](config._strict, config._locale);                                                           // 720
}                                                                                                                    // 721
                                                                                                                     // 722
// Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript              // 723
function unescapeFormat(s) {                                                                                         // 724
    return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
        return p1 || p2 || p3 || p4;                                                                                 // 726
    }));                                                                                                             // 727
}                                                                                                                    // 728
                                                                                                                     // 729
function regexEscape(s) {                                                                                            // 730
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');                                                              // 731
}                                                                                                                    // 732
                                                                                                                     // 733
var tokens = {};                                                                                                     // 734
                                                                                                                     // 735
function addParseToken (token, callback) {                                                                           // 736
    var i, func = callback;                                                                                          // 737
    if (typeof token === 'string') {                                                                                 // 738
        token = [token];                                                                                             // 739
    }                                                                                                                // 740
    if (isNumber(callback)) {                                                                                        // 741
        func = function (input, array) {                                                                             // 742
            array[callback] = toInt(input);                                                                          // 743
        };                                                                                                           // 744
    }                                                                                                                // 745
    for (i = 0; i < token.length; i++) {                                                                             // 746
        tokens[token[i]] = func;                                                                                     // 747
    }                                                                                                                // 748
}                                                                                                                    // 749
                                                                                                                     // 750
function addWeekParseToken (token, callback) {                                                                       // 751
    addParseToken(token, function (input, array, config, token) {                                                    // 752
        config._w = config._w || {};                                                                                 // 753
        callback(input, config._w, config, token);                                                                   // 754
    });                                                                                                              // 755
}                                                                                                                    // 756
                                                                                                                     // 757
function addTimeToArrayFromToken(token, input, config) {                                                             // 758
    if (input != null && hasOwnProp(tokens, token)) {                                                                // 759
        tokens[token](input, config._a, config, token);                                                              // 760
    }                                                                                                                // 761
}                                                                                                                    // 762
                                                                                                                     // 763
var YEAR = 0;                                                                                                        // 764
var MONTH = 1;                                                                                                       // 765
var DATE = 2;                                                                                                        // 766
var HOUR = 3;                                                                                                        // 767
var MINUTE = 4;                                                                                                      // 768
var SECOND = 5;                                                                                                      // 769
var MILLISECOND = 6;                                                                                                 // 770
var WEEK = 7;                                                                                                        // 771
var WEEKDAY = 8;                                                                                                     // 772
                                                                                                                     // 773
var indexOf;                                                                                                         // 774
                                                                                                                     // 775
if (Array.prototype.indexOf) {                                                                                       // 776
    indexOf = Array.prototype.indexOf;                                                                               // 777
} else {                                                                                                             // 778
    indexOf = function (o) {                                                                                         // 779
        // I know                                                                                                    // 780
        var i;                                                                                                       // 781
        for (i = 0; i < this.length; ++i) {                                                                          // 782
            if (this[i] === o) {                                                                                     // 783
                return i;                                                                                            // 784
            }                                                                                                        // 785
        }                                                                                                            // 786
        return -1;                                                                                                   // 787
    };                                                                                                               // 788
}                                                                                                                    // 789
                                                                                                                     // 790
var indexOf$1 = indexOf;                                                                                             // 791
                                                                                                                     // 792
function daysInMonth(year, month) {                                                                                  // 793
    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();                                                      // 794
}                                                                                                                    // 795
                                                                                                                     // 796
// FORMATTING                                                                                                        // 797
                                                                                                                     // 798
addFormatToken('M', ['MM', 2], 'Mo', function () {                                                                   // 799
    return this.month() + 1;                                                                                         // 800
});                                                                                                                  // 801
                                                                                                                     // 802
addFormatToken('MMM', 0, 0, function (format) {                                                                      // 803
    return this.localeData().monthsShort(this, format);                                                              // 804
});                                                                                                                  // 805
                                                                                                                     // 806
addFormatToken('MMMM', 0, 0, function (format) {                                                                     // 807
    return this.localeData().months(this, format);                                                                   // 808
});                                                                                                                  // 809
                                                                                                                     // 810
// ALIASES                                                                                                           // 811
                                                                                                                     // 812
addUnitAlias('month', 'M');                                                                                          // 813
                                                                                                                     // 814
// PRIORITY                                                                                                          // 815
                                                                                                                     // 816
addUnitPriority('month', 8);                                                                                         // 817
                                                                                                                     // 818
// PARSING                                                                                                           // 819
                                                                                                                     // 820
addRegexToken('M',    match1to2);                                                                                    // 821
addRegexToken('MM',   match1to2, match2);                                                                            // 822
addRegexToken('MMM',  function (isStrict, locale) {                                                                  // 823
    return locale.monthsShortRegex(isStrict);                                                                        // 824
});                                                                                                                  // 825
addRegexToken('MMMM', function (isStrict, locale) {                                                                  // 826
    return locale.monthsRegex(isStrict);                                                                             // 827
});                                                                                                                  // 828
                                                                                                                     // 829
addParseToken(['M', 'MM'], function (input, array) {                                                                 // 830
    array[MONTH] = toInt(input) - 1;                                                                                 // 831
});                                                                                                                  // 832
                                                                                                                     // 833
addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {                                              // 834
    var month = config._locale.monthsParse(input, token, config._strict);                                            // 835
    // if we didn't find a month name, mark the date as invalid.                                                     // 836
    if (month != null) {                                                                                             // 837
        array[MONTH] = month;                                                                                        // 838
    } else {                                                                                                         // 839
        getParsingFlags(config).invalidMonth = input;                                                                // 840
    }                                                                                                                // 841
});                                                                                                                  // 842
                                                                                                                     // 843
// LOCALES                                                                                                           // 844
                                                                                                                     // 845
var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;                                                              // 846
var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
function localeMonths (m, format) {                                                                                  // 848
    if (!m) {                                                                                                        // 849
        return this._months;                                                                                         // 850
    }                                                                                                                // 851
    return isArray(this._months) ? this._months[m.month()] :                                                         // 852
        this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
}                                                                                                                    // 854
                                                                                                                     // 855
var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');                         // 856
function localeMonthsShort (m, format) {                                                                             // 857
    if (!m) {                                                                                                        // 858
        return this._monthsShort;                                                                                    // 859
    }                                                                                                                // 860
    return isArray(this._monthsShort) ? this._monthsShort[m.month()] :                                               // 861
        this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];                       // 862
}                                                                                                                    // 863
                                                                                                                     // 864
function handleStrictParse(monthName, format, strict) {                                                              // 865
    var i, ii, mom, llc = monthName.toLocaleLowerCase();                                                             // 866
    if (!this._monthsParse) {                                                                                        // 867
        // this is not used                                                                                          // 868
        this._monthsParse = [];                                                                                      // 869
        this._longMonthsParse = [];                                                                                  // 870
        this._shortMonthsParse = [];                                                                                 // 871
        for (i = 0; i < 12; ++i) {                                                                                   // 872
            mom = createUTC([2000, i]);                                                                              // 873
            this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();                               // 874
            this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();                                     // 875
        }                                                                                                            // 876
    }                                                                                                                // 877
                                                                                                                     // 878
    if (strict) {                                                                                                    // 879
        if (format === 'MMM') {                                                                                      // 880
            ii = indexOf$1.call(this._shortMonthsParse, llc);                                                        // 881
            return ii !== -1 ? ii : null;                                                                            // 882
        } else {                                                                                                     // 883
            ii = indexOf$1.call(this._longMonthsParse, llc);                                                         // 884
            return ii !== -1 ? ii : null;                                                                            // 885
        }                                                                                                            // 886
    } else {                                                                                                         // 887
        if (format === 'MMM') {                                                                                      // 888
            ii = indexOf$1.call(this._shortMonthsParse, llc);                                                        // 889
            if (ii !== -1) {                                                                                         // 890
                return ii;                                                                                           // 891
            }                                                                                                        // 892
            ii = indexOf$1.call(this._longMonthsParse, llc);                                                         // 893
            return ii !== -1 ? ii : null;                                                                            // 894
        } else {                                                                                                     // 895
            ii = indexOf$1.call(this._longMonthsParse, llc);                                                         // 896
            if (ii !== -1) {                                                                                         // 897
                return ii;                                                                                           // 898
            }                                                                                                        // 899
            ii = indexOf$1.call(this._shortMonthsParse, llc);                                                        // 900
            return ii !== -1 ? ii : null;                                                                            // 901
        }                                                                                                            // 902
    }                                                                                                                // 903
}                                                                                                                    // 904
                                                                                                                     // 905
function localeMonthsParse (monthName, format, strict) {                                                             // 906
    var i, mom, regex;                                                                                               // 907
                                                                                                                     // 908
    if (this._monthsParseExact) {                                                                                    // 909
        return handleStrictParse.call(this, monthName, format, strict);                                              // 910
    }                                                                                                                // 911
                                                                                                                     // 912
    if (!this._monthsParse) {                                                                                        // 913
        this._monthsParse = [];                                                                                      // 914
        this._longMonthsParse = [];                                                                                  // 915
        this._shortMonthsParse = [];                                                                                 // 916
    }                                                                                                                // 917
                                                                                                                     // 918
    // TODO: add sorting                                                                                             // 919
    // Sorting makes sure if one month (or abbr) is a prefix of another                                              // 920
    // see sorting in computeMonthsParse                                                                             // 921
    for (i = 0; i < 12; i++) {                                                                                       // 922
        // make the regex if we don't have it already                                                                // 923
        mom = createUTC([2000, i]);                                                                                  // 924
        if (strict && !this._longMonthsParse[i]) {                                                                   // 925
            this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');           // 926
            this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');     // 927
        }                                                                                                            // 928
        if (!strict && !this._monthsParse[i]) {                                                                      // 929
            regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');                                   // 930
            this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');                                          // 931
        }                                                                                                            // 932
        // test the regex                                                                                            // 933
        if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {                               // 934
            return i;                                                                                                // 935
        } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {                        // 936
            return i;                                                                                                // 937
        } else if (!strict && this._monthsParse[i].test(monthName)) {                                                // 938
            return i;                                                                                                // 939
        }                                                                                                            // 940
    }                                                                                                                // 941
}                                                                                                                    // 942
                                                                                                                     // 943
// MOMENTS                                                                                                           // 944
                                                                                                                     // 945
function setMonth (mom, value) {                                                                                     // 946
    var dayOfMonth;                                                                                                  // 947
                                                                                                                     // 948
    if (!mom.isValid()) {                                                                                            // 949
        // No op                                                                                                     // 950
        return mom;                                                                                                  // 951
    }                                                                                                                // 952
                                                                                                                     // 953
    if (typeof value === 'string') {                                                                                 // 954
        if (/^\d+$/.test(value)) {                                                                                   // 955
            value = toInt(value);                                                                                    // 956
        } else {                                                                                                     // 957
            value = mom.localeData().monthsParse(value);                                                             // 958
            // TODO: Another silent failure?                                                                         // 959
            if (!isNumber(value)) {                                                                                  // 960
                return mom;                                                                                          // 961
            }                                                                                                        // 962
        }                                                                                                            // 963
    }                                                                                                                // 964
                                                                                                                     // 965
    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));                                               // 966
    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);                                          // 967
    return mom;                                                                                                      // 968
}                                                                                                                    // 969
                                                                                                                     // 970
function getSetMonth (value) {                                                                                       // 971
    if (value != null) {                                                                                             // 972
        setMonth(this, value);                                                                                       // 973
        hooks.updateOffset(this, true);                                                                              // 974
        return this;                                                                                                 // 975
    } else {                                                                                                         // 976
        return get(this, 'Month');                                                                                   // 977
    }                                                                                                                // 978
}                                                                                                                    // 979
                                                                                                                     // 980
function getDaysInMonth () {                                                                                         // 981
    return daysInMonth(this.year(), this.month());                                                                   // 982
}                                                                                                                    // 983
                                                                                                                     // 984
var defaultMonthsShortRegex = matchWord;                                                                             // 985
function monthsShortRegex (isStrict) {                                                                               // 986
    if (this._monthsParseExact) {                                                                                    // 987
        if (!hasOwnProp(this, '_monthsRegex')) {                                                                     // 988
            computeMonthsParse.call(this);                                                                           // 989
        }                                                                                                            // 990
        if (isStrict) {                                                                                              // 991
            return this._monthsShortStrictRegex;                                                                     // 992
        } else {                                                                                                     // 993
            return this._monthsShortRegex;                                                                           // 994
        }                                                                                                            // 995
    } else {                                                                                                         // 996
        if (!hasOwnProp(this, '_monthsShortRegex')) {                                                                // 997
            this._monthsShortRegex = defaultMonthsShortRegex;                                                        // 998
        }                                                                                                            // 999
        return this._monthsShortStrictRegex && isStrict ?                                                            // 1000
            this._monthsShortStrictRegex : this._monthsShortRegex;                                                   // 1001
    }                                                                                                                // 1002
}                                                                                                                    // 1003
                                                                                                                     // 1004
var defaultMonthsRegex = matchWord;                                                                                  // 1005
function monthsRegex (isStrict) {                                                                                    // 1006
    if (this._monthsParseExact) {                                                                                    // 1007
        if (!hasOwnProp(this, '_monthsRegex')) {                                                                     // 1008
            computeMonthsParse.call(this);                                                                           // 1009
        }                                                                                                            // 1010
        if (isStrict) {                                                                                              // 1011
            return this._monthsStrictRegex;                                                                          // 1012
        } else {                                                                                                     // 1013
            return this._monthsRegex;                                                                                // 1014
        }                                                                                                            // 1015
    } else {                                                                                                         // 1016
        if (!hasOwnProp(this, '_monthsRegex')) {                                                                     // 1017
            this._monthsRegex = defaultMonthsRegex;                                                                  // 1018
        }                                                                                                            // 1019
        return this._monthsStrictRegex && isStrict ?                                                                 // 1020
            this._monthsStrictRegex : this._monthsRegex;                                                             // 1021
    }                                                                                                                // 1022
}                                                                                                                    // 1023
                                                                                                                     // 1024
function computeMonthsParse () {                                                                                     // 1025
    function cmpLenRev(a, b) {                                                                                       // 1026
        return b.length - a.length;                                                                                  // 1027
    }                                                                                                                // 1028
                                                                                                                     // 1029
    var shortPieces = [], longPieces = [], mixedPieces = [],                                                         // 1030
        i, mom;                                                                                                      // 1031
    for (i = 0; i < 12; i++) {                                                                                       // 1032
        // make the regex if we don't have it already                                                                // 1033
        mom = createUTC([2000, i]);                                                                                  // 1034
        shortPieces.push(this.monthsShort(mom, ''));                                                                 // 1035
        longPieces.push(this.months(mom, ''));                                                                       // 1036
        mixedPieces.push(this.months(mom, ''));                                                                      // 1037
        mixedPieces.push(this.monthsShort(mom, ''));                                                                 // 1038
    }                                                                                                                // 1039
    // Sorting makes sure if one month (or abbr) is a prefix of another it                                           // 1040
    // will match the longer piece.                                                                                  // 1041
    shortPieces.sort(cmpLenRev);                                                                                     // 1042
    longPieces.sort(cmpLenRev);                                                                                      // 1043
    mixedPieces.sort(cmpLenRev);                                                                                     // 1044
    for (i = 0; i < 12; i++) {                                                                                       // 1045
        shortPieces[i] = regexEscape(shortPieces[i]);                                                                // 1046
        longPieces[i] = regexEscape(longPieces[i]);                                                                  // 1047
    }                                                                                                                // 1048
    for (i = 0; i < 24; i++) {                                                                                       // 1049
        mixedPieces[i] = regexEscape(mixedPieces[i]);                                                                // 1050
    }                                                                                                                // 1051
                                                                                                                     // 1052
    this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');                                         // 1053
    this._monthsShortRegex = this._monthsRegex;                                                                      // 1054
    this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');                                    // 1055
    this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');                              // 1056
}                                                                                                                    // 1057
                                                                                                                     // 1058
// FORMATTING                                                                                                        // 1059
                                                                                                                     // 1060
addFormatToken('Y', 0, 0, function () {                                                                              // 1061
    var y = this.year();                                                                                             // 1062
    return y <= 9999 ? '' + y : '+' + y;                                                                             // 1063
});                                                                                                                  // 1064
                                                                                                                     // 1065
addFormatToken(0, ['YY', 2], 0, function () {                                                                        // 1066
    return this.year() % 100;                                                                                        // 1067
});                                                                                                                  // 1068
                                                                                                                     // 1069
addFormatToken(0, ['YYYY',   4],       0, 'year');                                                                   // 1070
addFormatToken(0, ['YYYYY',  5],       0, 'year');                                                                   // 1071
addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');                                                                   // 1072
                                                                                                                     // 1073
// ALIASES                                                                                                           // 1074
                                                                                                                     // 1075
addUnitAlias('year', 'y');                                                                                           // 1076
                                                                                                                     // 1077
// PRIORITIES                                                                                                        // 1078
                                                                                                                     // 1079
addUnitPriority('year', 1);                                                                                          // 1080
                                                                                                                     // 1081
// PARSING                                                                                                           // 1082
                                                                                                                     // 1083
addRegexToken('Y',      matchSigned);                                                                                // 1084
addRegexToken('YY',     match1to2, match2);                                                                          // 1085
addRegexToken('YYYY',   match1to4, match4);                                                                          // 1086
addRegexToken('YYYYY',  match1to6, match6);                                                                          // 1087
addRegexToken('YYYYYY', match1to6, match6);                                                                          // 1088
                                                                                                                     // 1089
addParseToken(['YYYYY', 'YYYYYY'], YEAR);                                                                            // 1090
addParseToken('YYYY', function (input, array) {                                                                      // 1091
    array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);                                // 1092
});                                                                                                                  // 1093
addParseToken('YY', function (input, array) {                                                                        // 1094
    array[YEAR] = hooks.parseTwoDigitYear(input);                                                                    // 1095
});                                                                                                                  // 1096
addParseToken('Y', function (input, array) {                                                                         // 1097
    array[YEAR] = parseInt(input, 10);                                                                               // 1098
});                                                                                                                  // 1099
                                                                                                                     // 1100
// HELPERS                                                                                                           // 1101
                                                                                                                     // 1102
function daysInYear(year) {                                                                                          // 1103
    return isLeapYear(year) ? 366 : 365;                                                                             // 1104
}                                                                                                                    // 1105
                                                                                                                     // 1106
function isLeapYear(year) {                                                                                          // 1107
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;                                                 // 1108
}                                                                                                                    // 1109
                                                                                                                     // 1110
// HOOKS                                                                                                             // 1111
                                                                                                                     // 1112
hooks.parseTwoDigitYear = function (input) {                                                                         // 1113
    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);                                                         // 1114
};                                                                                                                   // 1115
                                                                                                                     // 1116
// MOMENTS                                                                                                           // 1117
                                                                                                                     // 1118
var getSetYear = makeGetSet('FullYear', true);                                                                       // 1119
                                                                                                                     // 1120
function getIsLeapYear () {                                                                                          // 1121
    return isLeapYear(this.year());                                                                                  // 1122
}                                                                                                                    // 1123
                                                                                                                     // 1124
function createDate (y, m, d, h, M, s, ms) {                                                                         // 1125
    //can't just apply() to create a date:                                                                           // 1126
    //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
    var date = new Date(y, m, d, h, M, s, ms);                                                                       // 1128
                                                                                                                     // 1129
    //the date constructor remaps years 0-99 to 1900-1999                                                            // 1130
    if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {                                                         // 1131
        date.setFullYear(y);                                                                                         // 1132
    }                                                                                                                // 1133
    return date;                                                                                                     // 1134
}                                                                                                                    // 1135
                                                                                                                     // 1136
function createUTCDate (y) {                                                                                         // 1137
    var date = new Date(Date.UTC.apply(null, arguments));                                                            // 1138
                                                                                                                     // 1139
    //the Date.UTC function remaps years 0-99 to 1900-1999                                                           // 1140
    if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {                                                      // 1141
        date.setUTCFullYear(y);                                                                                      // 1142
    }                                                                                                                // 1143
    return date;                                                                                                     // 1144
}                                                                                                                    // 1145
                                                                                                                     // 1146
// start-of-first-week - start-of-year                                                                               // 1147
function firstWeekOffset(year, dow, doy) {                                                                           // 1148
    var // first-week day -- which january is always in the first week (4 for iso, 1 for other)                      // 1149
        fwd = 7 + dow - doy,                                                                                         // 1150
        // first-week day local weekday -- which local weekday is fwd                                                // 1151
        fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;                                             // 1152
                                                                                                                     // 1153
    return -fwdlw + fwd - 1;                                                                                         // 1154
}                                                                                                                    // 1155
                                                                                                                     // 1156
//http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday            // 1157
function dayOfYearFromWeeks(year, week, weekday, dow, doy) {                                                         // 1158
    var localWeekday = (7 + weekday - dow) % 7,                                                                      // 1159
        weekOffset = firstWeekOffset(year, dow, doy),                                                                // 1160
        dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,                                                  // 1161
        resYear, resDayOfYear;                                                                                       // 1162
                                                                                                                     // 1163
    if (dayOfYear <= 0) {                                                                                            // 1164
        resYear = year - 1;                                                                                          // 1165
        resDayOfYear = daysInYear(resYear) + dayOfYear;                                                              // 1166
    } else if (dayOfYear > daysInYear(year)) {                                                                       // 1167
        resYear = year + 1;                                                                                          // 1168
        resDayOfYear = dayOfYear - daysInYear(year);                                                                 // 1169
    } else {                                                                                                         // 1170
        resYear = year;                                                                                              // 1171
        resDayOfYear = dayOfYear;                                                                                    // 1172
    }                                                                                                                // 1173
                                                                                                                     // 1174
    return {                                                                                                         // 1175
        year: resYear,                                                                                               // 1176
        dayOfYear: resDayOfYear                                                                                      // 1177
    };                                                                                                               // 1178
}                                                                                                                    // 1179
                                                                                                                     // 1180
function weekOfYear(mom, dow, doy) {                                                                                 // 1181
    var weekOffset = firstWeekOffset(mom.year(), dow, doy),                                                          // 1182
        week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,                                               // 1183
        resWeek, resYear;                                                                                            // 1184
                                                                                                                     // 1185
    if (week < 1) {                                                                                                  // 1186
        resYear = mom.year() - 1;                                                                                    // 1187
        resWeek = week + weeksInYear(resYear, dow, doy);                                                             // 1188
    } else if (week > weeksInYear(mom.year(), dow, doy)) {                                                           // 1189
        resWeek = week - weeksInYear(mom.year(), dow, doy);                                                          // 1190
        resYear = mom.year() + 1;                                                                                    // 1191
    } else {                                                                                                         // 1192
        resYear = mom.year();                                                                                        // 1193
        resWeek = week;                                                                                              // 1194
    }                                                                                                                // 1195
                                                                                                                     // 1196
    return {                                                                                                         // 1197
        week: resWeek,                                                                                               // 1198
        year: resYear                                                                                                // 1199
    };                                                                                                               // 1200
}                                                                                                                    // 1201
                                                                                                                     // 1202
function weeksInYear(year, dow, doy) {                                                                               // 1203
    var weekOffset = firstWeekOffset(year, dow, doy),                                                                // 1204
        weekOffsetNext = firstWeekOffset(year + 1, dow, doy);                                                        // 1205
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;                                                     // 1206
}                                                                                                                    // 1207
                                                                                                                     // 1208
// FORMATTING                                                                                                        // 1209
                                                                                                                     // 1210
addFormatToken('w', ['ww', 2], 'wo', 'week');                                                                        // 1211
addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');                                                                     // 1212
                                                                                                                     // 1213
// ALIASES                                                                                                           // 1214
                                                                                                                     // 1215
addUnitAlias('week', 'w');                                                                                           // 1216
addUnitAlias('isoWeek', 'W');                                                                                        // 1217
                                                                                                                     // 1218
// PRIORITIES                                                                                                        // 1219
                                                                                                                     // 1220
addUnitPriority('week', 5);                                                                                          // 1221
addUnitPriority('isoWeek', 5);                                                                                       // 1222
                                                                                                                     // 1223
// PARSING                                                                                                           // 1224
                                                                                                                     // 1225
addRegexToken('w',  match1to2);                                                                                      // 1226
addRegexToken('ww', match1to2, match2);                                                                              // 1227
addRegexToken('W',  match1to2);                                                                                      // 1228
addRegexToken('WW', match1to2, match2);                                                                              // 1229
                                                                                                                     // 1230
addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {                                    // 1231
    week[token.substr(0, 1)] = toInt(input);                                                                         // 1232
});                                                                                                                  // 1233
                                                                                                                     // 1234
// HELPERS                                                                                                           // 1235
                                                                                                                     // 1236
// LOCALES                                                                                                           // 1237
                                                                                                                     // 1238
function localeWeek (mom) {                                                                                          // 1239
    return weekOfYear(mom, this._week.dow, this._week.doy).week;                                                     // 1240
}                                                                                                                    // 1241
                                                                                                                     // 1242
var defaultLocaleWeek = {                                                                                            // 1243
    dow : 0, // Sunday is the first day of the week.                                                                 // 1244
    doy : 6  // The week that contains Jan 1st is the first week of the year.                                        // 1245
};                                                                                                                   // 1246
                                                                                                                     // 1247
function localeFirstDayOfWeek () {                                                                                   // 1248
    return this._week.dow;                                                                                           // 1249
}                                                                                                                    // 1250
                                                                                                                     // 1251
function localeFirstDayOfYear () {                                                                                   // 1252
    return this._week.doy;                                                                                           // 1253
}                                                                                                                    // 1254
                                                                                                                     // 1255
// MOMENTS                                                                                                           // 1256
                                                                                                                     // 1257
function getSetWeek (input) {                                                                                        // 1258
    var week = this.localeData().week(this);                                                                         // 1259
    return input == null ? week : this.add((input - week) * 7, 'd');                                                 // 1260
}                                                                                                                    // 1261
                                                                                                                     // 1262
function getSetISOWeek (input) {                                                                                     // 1263
    var week = weekOfYear(this, 1, 4).week;                                                                          // 1264
    return input == null ? week : this.add((input - week) * 7, 'd');                                                 // 1265
}                                                                                                                    // 1266
                                                                                                                     // 1267
// FORMATTING                                                                                                        // 1268
                                                                                                                     // 1269
addFormatToken('d', 0, 'do', 'day');                                                                                 // 1270
                                                                                                                     // 1271
addFormatToken('dd', 0, 0, function (format) {                                                                       // 1272
    return this.localeData().weekdaysMin(this, format);                                                              // 1273
});                                                                                                                  // 1274
                                                                                                                     // 1275
addFormatToken('ddd', 0, 0, function (format) {                                                                      // 1276
    return this.localeData().weekdaysShort(this, format);                                                            // 1277
});                                                                                                                  // 1278
                                                                                                                     // 1279
addFormatToken('dddd', 0, 0, function (format) {                                                                     // 1280
    return this.localeData().weekdays(this, format);                                                                 // 1281
});                                                                                                                  // 1282
                                                                                                                     // 1283
addFormatToken('e', 0, 0, 'weekday');                                                                                // 1284
addFormatToken('E', 0, 0, 'isoWeekday');                                                                             // 1285
                                                                                                                     // 1286
// ALIASES                                                                                                           // 1287
                                                                                                                     // 1288
addUnitAlias('day', 'd');                                                                                            // 1289
addUnitAlias('weekday', 'e');                                                                                        // 1290
addUnitAlias('isoWeekday', 'E');                                                                                     // 1291
                                                                                                                     // 1292
// PRIORITY                                                                                                          // 1293
addUnitPriority('day', 11);                                                                                          // 1294
addUnitPriority('weekday', 11);                                                                                      // 1295
addUnitPriority('isoWeekday', 11);                                                                                   // 1296
                                                                                                                     // 1297
// PARSING                                                                                                           // 1298
                                                                                                                     // 1299
addRegexToken('d',    match1to2);                                                                                    // 1300
addRegexToken('e',    match1to2);                                                                                    // 1301
addRegexToken('E',    match1to2);                                                                                    // 1302
addRegexToken('dd',   function (isStrict, locale) {                                                                  // 1303
    return locale.weekdaysMinRegex(isStrict);                                                                        // 1304
});                                                                                                                  // 1305
addRegexToken('ddd',   function (isStrict, locale) {                                                                 // 1306
    return locale.weekdaysShortRegex(isStrict);                                                                      // 1307
});                                                                                                                  // 1308
addRegexToken('dddd',   function (isStrict, locale) {                                                                // 1309
    return locale.weekdaysRegex(isStrict);                                                                           // 1310
});                                                                                                                  // 1311
                                                                                                                     // 1312
addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {                                     // 1313
    var weekday = config._locale.weekdaysParse(input, token, config._strict);                                        // 1314
    // if we didn't get a weekday name, mark the date as invalid                                                     // 1315
    if (weekday != null) {                                                                                           // 1316
        week.d = weekday;                                                                                            // 1317
    } else {                                                                                                         // 1318
        getParsingFlags(config).invalidWeekday = input;                                                              // 1319
    }                                                                                                                // 1320
});                                                                                                                  // 1321
                                                                                                                     // 1322
addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {                                           // 1323
    week[token] = toInt(input);                                                                                      // 1324
});                                                                                                                  // 1325
                                                                                                                     // 1326
// HELPERS                                                                                                           // 1327
                                                                                                                     // 1328
function parseWeekday(input, locale) {                                                                               // 1329
    if (typeof input !== 'string') {                                                                                 // 1330
        return input;                                                                                                // 1331
    }                                                                                                                // 1332
                                                                                                                     // 1333
    if (!isNaN(input)) {                                                                                             // 1334
        return parseInt(input, 10);                                                                                  // 1335
    }                                                                                                                // 1336
                                                                                                                     // 1337
    input = locale.weekdaysParse(input);                                                                             // 1338
    if (typeof input === 'number') {                                                                                 // 1339
        return input;                                                                                                // 1340
    }                                                                                                                // 1341
                                                                                                                     // 1342
    return null;                                                                                                     // 1343
}                                                                                                                    // 1344
                                                                                                                     // 1345
function parseIsoWeekday(input, locale) {                                                                            // 1346
    if (typeof input === 'string') {                                                                                 // 1347
        return locale.weekdaysParse(input) % 7 || 7;                                                                 // 1348
    }                                                                                                                // 1349
    return isNaN(input) ? null : input;                                                                              // 1350
}                                                                                                                    // 1351
                                                                                                                     // 1352
// LOCALES                                                                                                           // 1353
                                                                                                                     // 1354
var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');                   // 1355
function localeWeekdays (m, format) {                                                                                // 1356
    if (!m) {                                                                                                        // 1357
        return this._weekdays;                                                                                       // 1358
    }                                                                                                                // 1359
    return isArray(this._weekdays) ? this._weekdays[m.day()] :                                                       // 1360
        this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];                     // 1361
}                                                                                                                    // 1362
                                                                                                                     // 1363
var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');                                           // 1364
function localeWeekdaysShort (m) {                                                                                   // 1365
    return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;                                                 // 1366
}                                                                                                                    // 1367
                                                                                                                     // 1368
var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');                                                    // 1369
function localeWeekdaysMin (m) {                                                                                     // 1370
    return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;                                                     // 1371
}                                                                                                                    // 1372
                                                                                                                     // 1373
function handleStrictParse$1(weekdayName, format, strict) {                                                          // 1374
    var i, ii, mom, llc = weekdayName.toLocaleLowerCase();                                                           // 1375
    if (!this._weekdaysParse) {                                                                                      // 1376
        this._weekdaysParse = [];                                                                                    // 1377
        this._shortWeekdaysParse = [];                                                                               // 1378
        this._minWeekdaysParse = [];                                                                                 // 1379
                                                                                                                     // 1380
        for (i = 0; i < 7; ++i) {                                                                                    // 1381
            mom = createUTC([2000, 1]).day(i);                                                                       // 1382
            this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();                               // 1383
            this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();                           // 1384
            this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();                                     // 1385
        }                                                                                                            // 1386
    }                                                                                                                // 1387
                                                                                                                     // 1388
    if (strict) {                                                                                                    // 1389
        if (format === 'dddd') {                                                                                     // 1390
            ii = indexOf$1.call(this._weekdaysParse, llc);                                                           // 1391
            return ii !== -1 ? ii : null;                                                                            // 1392
        } else if (format === 'ddd') {                                                                               // 1393
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);                                                      // 1394
            return ii !== -1 ? ii : null;                                                                            // 1395
        } else {                                                                                                     // 1396
            ii = indexOf$1.call(this._minWeekdaysParse, llc);                                                        // 1397
            return ii !== -1 ? ii : null;                                                                            // 1398
        }                                                                                                            // 1399
    } else {                                                                                                         // 1400
        if (format === 'dddd') {                                                                                     // 1401
            ii = indexOf$1.call(this._weekdaysParse, llc);                                                           // 1402
            if (ii !== -1) {                                                                                         // 1403
                return ii;                                                                                           // 1404
            }                                                                                                        // 1405
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);                                                      // 1406
            if (ii !== -1) {                                                                                         // 1407
                return ii;                                                                                           // 1408
            }                                                                                                        // 1409
            ii = indexOf$1.call(this._minWeekdaysParse, llc);                                                        // 1410
            return ii !== -1 ? ii : null;                                                                            // 1411
        } else if (format === 'ddd') {                                                                               // 1412
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);                                                      // 1413
            if (ii !== -1) {                                                                                         // 1414
                return ii;                                                                                           // 1415
            }                                                                                                        // 1416
            ii = indexOf$1.call(this._weekdaysParse, llc);                                                           // 1417
            if (ii !== -1) {                                                                                         // 1418
                return ii;                                                                                           // 1419
            }                                                                                                        // 1420
            ii = indexOf$1.call(this._minWeekdaysParse, llc);                                                        // 1421
            return ii !== -1 ? ii : null;                                                                            // 1422
        } else {                                                                                                     // 1423
            ii = indexOf$1.call(this._minWeekdaysParse, llc);                                                        // 1424
            if (ii !== -1) {                                                                                         // 1425
                return ii;                                                                                           // 1426
            }                                                                                                        // 1427
            ii = indexOf$1.call(this._weekdaysParse, llc);                                                           // 1428
            if (ii !== -1) {                                                                                         // 1429
                return ii;                                                                                           // 1430
            }                                                                                                        // 1431
            ii = indexOf$1.call(this._shortWeekdaysParse, llc);                                                      // 1432
            return ii !== -1 ? ii : null;                                                                            // 1433
        }                                                                                                            // 1434
    }                                                                                                                // 1435
}                                                                                                                    // 1436
                                                                                                                     // 1437
function localeWeekdaysParse (weekdayName, format, strict) {                                                         // 1438
    var i, mom, regex;                                                                                               // 1439
                                                                                                                     // 1440
    if (this._weekdaysParseExact) {                                                                                  // 1441
        return handleStrictParse$1.call(this, weekdayName, format, strict);                                          // 1442
    }                                                                                                                // 1443
                                                                                                                     // 1444
    if (!this._weekdaysParse) {                                                                                      // 1445
        this._weekdaysParse = [];                                                                                    // 1446
        this._minWeekdaysParse = [];                                                                                 // 1447
        this._shortWeekdaysParse = [];                                                                               // 1448
        this._fullWeekdaysParse = [];                                                                                // 1449
    }                                                                                                                // 1450
                                                                                                                     // 1451
    for (i = 0; i < 7; i++) {                                                                                        // 1452
        // make the regex if we don't have it already                                                                // 1453
                                                                                                                     // 1454
        mom = createUTC([2000, 1]).day(i);                                                                           // 1455
        if (strict && !this._fullWeekdaysParse[i]) {                                                                 // 1456
            this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');    // 1457
            this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
            this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');  // 1459
        }                                                                                                            // 1460
        if (!this._weekdaysParse[i]) {                                                                               // 1461
            regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
            this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');                                        // 1463
        }                                                                                                            // 1464
        // test the regex                                                                                            // 1465
        if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {                           // 1466
            return i;                                                                                                // 1467
        } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {                    // 1468
            return i;                                                                                                // 1469
        } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {                       // 1470
            return i;                                                                                                // 1471
        } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {                                            // 1472
            return i;                                                                                                // 1473
        }                                                                                                            // 1474
    }                                                                                                                // 1475
}                                                                                                                    // 1476
                                                                                                                     // 1477
// MOMENTS                                                                                                           // 1478
                                                                                                                     // 1479
function getSetDayOfWeek (input) {                                                                                   // 1480
    if (!this.isValid()) {                                                                                           // 1481
        return input != null ? this : NaN;                                                                           // 1482
    }                                                                                                                // 1483
    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();                                                  // 1484
    if (input != null) {                                                                                             // 1485
        input = parseWeekday(input, this.localeData());                                                              // 1486
        return this.add(input - day, 'd');                                                                           // 1487
    } else {                                                                                                         // 1488
        return day;                                                                                                  // 1489
    }                                                                                                                // 1490
}                                                                                                                    // 1491
                                                                                                                     // 1492
function getSetLocaleDayOfWeek (input) {                                                                             // 1493
    if (!this.isValid()) {                                                                                           // 1494
        return input != null ? this : NaN;                                                                           // 1495
    }                                                                                                                // 1496
    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;                                                // 1497
    return input == null ? weekday : this.add(input - weekday, 'd');                                                 // 1498
}                                                                                                                    // 1499
                                                                                                                     // 1500
function getSetISODayOfWeek (input) {                                                                                // 1501
    if (!this.isValid()) {                                                                                           // 1502
        return input != null ? this : NaN;                                                                           // 1503
    }                                                                                                                // 1504
                                                                                                                     // 1505
    // behaves the same as moment#day except                                                                         // 1506
    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)                                                // 1507
    // as a setter, sunday should belong to the previous week.                                                       // 1508
                                                                                                                     // 1509
    if (input != null) {                                                                                             // 1510
        var weekday = parseIsoWeekday(input, this.localeData());                                                     // 1511
        return this.day(this.day() % 7 ? weekday : weekday - 7);                                                     // 1512
    } else {                                                                                                         // 1513
        return this.day() || 7;                                                                                      // 1514
    }                                                                                                                // 1515
}                                                                                                                    // 1516
                                                                                                                     // 1517
var defaultWeekdaysRegex = matchWord;                                                                                // 1518
function weekdaysRegex (isStrict) {                                                                                  // 1519
    if (this._weekdaysParseExact) {                                                                                  // 1520
        if (!hasOwnProp(this, '_weekdaysRegex')) {                                                                   // 1521
            computeWeekdaysParse.call(this);                                                                         // 1522
        }                                                                                                            // 1523
        if (isStrict) {                                                                                              // 1524
            return this._weekdaysStrictRegex;                                                                        // 1525
        } else {                                                                                                     // 1526
            return this._weekdaysRegex;                                                                              // 1527
        }                                                                                                            // 1528
    } else {                                                                                                         // 1529
        if (!hasOwnProp(this, '_weekdaysRegex')) {                                                                   // 1530
            this._weekdaysRegex = defaultWeekdaysRegex;                                                              // 1531
        }                                                                                                            // 1532
        return this._weekdaysStrictRegex && isStrict ?                                                               // 1533
            this._weekdaysStrictRegex : this._weekdaysRegex;                                                         // 1534
    }                                                                                                                // 1535
}                                                                                                                    // 1536
                                                                                                                     // 1537
var defaultWeekdaysShortRegex = matchWord;                                                                           // 1538
function weekdaysShortRegex (isStrict) {                                                                             // 1539
    if (this._weekdaysParseExact) {                                                                                  // 1540
        if (!hasOwnProp(this, '_weekdaysRegex')) {                                                                   // 1541
            computeWeekdaysParse.call(this);                                                                         // 1542
        }                                                                                                            // 1543
        if (isStrict) {                                                                                              // 1544
            return this._weekdaysShortStrictRegex;                                                                   // 1545
        } else {                                                                                                     // 1546
            return this._weekdaysShortRegex;                                                                         // 1547
        }                                                                                                            // 1548
    } else {                                                                                                         // 1549
        if (!hasOwnProp(this, '_weekdaysShortRegex')) {                                                              // 1550
            this._weekdaysShortRegex = defaultWeekdaysShortRegex;                                                    // 1551
        }                                                                                                            // 1552
        return this._weekdaysShortStrictRegex && isStrict ?                                                          // 1553
            this._weekdaysShortStrictRegex : this._weekdaysShortRegex;                                               // 1554
    }                                                                                                                // 1555
}                                                                                                                    // 1556
                                                                                                                     // 1557
var defaultWeekdaysMinRegex = matchWord;                                                                             // 1558
function weekdaysMinRegex (isStrict) {                                                                               // 1559
    if (this._weekdaysParseExact) {                                                                                  // 1560
        if (!hasOwnProp(this, '_weekdaysRegex')) {                                                                   // 1561
            computeWeekdaysParse.call(this);                                                                         // 1562
        }                                                                                                            // 1563
        if (isStrict) {                                                                                              // 1564
            return this._weekdaysMinStrictRegex;                                                                     // 1565
        } else {                                                                                                     // 1566
            return this._weekdaysMinRegex;                                                                           // 1567
        }                                                                                                            // 1568
    } else {                                                                                                         // 1569
        if (!hasOwnProp(this, '_weekdaysMinRegex')) {                                                                // 1570
            this._weekdaysMinRegex = defaultWeekdaysMinRegex;                                                        // 1571
        }                                                                                                            // 1572
        return this._weekdaysMinStrictRegex && isStrict ?                                                            // 1573
            this._weekdaysMinStrictRegex : this._weekdaysMinRegex;                                                   // 1574
    }                                                                                                                // 1575
}                                                                                                                    // 1576
                                                                                                                     // 1577
                                                                                                                     // 1578
function computeWeekdaysParse () {                                                                                   // 1579
    function cmpLenRev(a, b) {                                                                                       // 1580
        return b.length - a.length;                                                                                  // 1581
    }                                                                                                                // 1582
                                                                                                                     // 1583
    var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],                                         // 1584
        i, mom, minp, shortp, longp;                                                                                 // 1585
    for (i = 0; i < 7; i++) {                                                                                        // 1586
        // make the regex if we don't have it already                                                                // 1587
        mom = createUTC([2000, 1]).day(i);                                                                           // 1588
        minp = this.weekdaysMin(mom, '');                                                                            // 1589
        shortp = this.weekdaysShort(mom, '');                                                                        // 1590
        longp = this.weekdays(mom, '');                                                                              // 1591
        minPieces.push(minp);                                                                                        // 1592
        shortPieces.push(shortp);                                                                                    // 1593
        longPieces.push(longp);                                                                                      // 1594
        mixedPieces.push(minp);                                                                                      // 1595
        mixedPieces.push(shortp);                                                                                    // 1596
        mixedPieces.push(longp);                                                                                     // 1597
    }                                                                                                                // 1598
    // Sorting makes sure if one weekday (or abbr) is a prefix of another it                                         // 1599
    // will match the longer piece.                                                                                  // 1600
    minPieces.sort(cmpLenRev);                                                                                       // 1601
    shortPieces.sort(cmpLenRev);                                                                                     // 1602
    longPieces.sort(cmpLenRev);                                                                                      // 1603
    mixedPieces.sort(cmpLenRev);                                                                                     // 1604
    for (i = 0; i < 7; i++) {                                                                                        // 1605
        shortPieces[i] = regexEscape(shortPieces[i]);                                                                // 1606
        longPieces[i] = regexEscape(longPieces[i]);                                                                  // 1607
        mixedPieces[i] = regexEscape(mixedPieces[i]);                                                                // 1608
    }                                                                                                                // 1609
                                                                                                                     // 1610
    this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');                                       // 1611
    this._weekdaysShortRegex = this._weekdaysRegex;                                                                  // 1612
    this._weekdaysMinRegex = this._weekdaysRegex;                                                                    // 1613
                                                                                                                     // 1614
    this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');                                  // 1615
    this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');                            // 1616
    this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');                                // 1617
}                                                                                                                    // 1618
                                                                                                                     // 1619
// FORMATTING                                                                                                        // 1620
                                                                                                                     // 1621
function hFormat() {                                                                                                 // 1622
    return this.hours() % 12 || 12;                                                                                  // 1623
}                                                                                                                    // 1624
                                                                                                                     // 1625
function kFormat() {                                                                                                 // 1626
    return this.hours() || 24;                                                                                       // 1627
}                                                                                                                    // 1628
                                                                                                                     // 1629
addFormatToken('H', ['HH', 2], 0, 'hour');                                                                           // 1630
addFormatToken('h', ['hh', 2], 0, hFormat);                                                                          // 1631
addFormatToken('k', ['kk', 2], 0, kFormat);                                                                          // 1632
                                                                                                                     // 1633
addFormatToken('hmm', 0, 0, function () {                                                                            // 1634
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);                                                   // 1635
});                                                                                                                  // 1636
                                                                                                                     // 1637
addFormatToken('hmmss', 0, 0, function () {                                                                          // 1638
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +                                                  // 1639
        zeroFill(this.seconds(), 2);                                                                                 // 1640
});                                                                                                                  // 1641
                                                                                                                     // 1642
addFormatToken('Hmm', 0, 0, function () {                                                                            // 1643
    return '' + this.hours() + zeroFill(this.minutes(), 2);                                                          // 1644
});                                                                                                                  // 1645
                                                                                                                     // 1646
addFormatToken('Hmmss', 0, 0, function () {                                                                          // 1647
    return '' + this.hours() + zeroFill(this.minutes(), 2) +                                                         // 1648
        zeroFill(this.seconds(), 2);                                                                                 // 1649
});                                                                                                                  // 1650
                                                                                                                     // 1651
function meridiem (token, lowercase) {                                                                               // 1652
    addFormatToken(token, 0, 0, function () {                                                                        // 1653
        return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);                                  // 1654
    });                                                                                                              // 1655
}                                                                                                                    // 1656
                                                                                                                     // 1657
meridiem('a', true);                                                                                                 // 1658
meridiem('A', false);                                                                                                // 1659
                                                                                                                     // 1660
// ALIASES                                                                                                           // 1661
                                                                                                                     // 1662
addUnitAlias('hour', 'h');                                                                                           // 1663
                                                                                                                     // 1664
// PRIORITY                                                                                                          // 1665
addUnitPriority('hour', 13);                                                                                         // 1666
                                                                                                                     // 1667
// PARSING                                                                                                           // 1668
                                                                                                                     // 1669
function matchMeridiem (isStrict, locale) {                                                                          // 1670
    return locale._meridiemParse;                                                                                    // 1671
}                                                                                                                    // 1672
                                                                                                                     // 1673
addRegexToken('a',  matchMeridiem);                                                                                  // 1674
addRegexToken('A',  matchMeridiem);                                                                                  // 1675
addRegexToken('H',  match1to2);                                                                                      // 1676
addRegexToken('h',  match1to2);                                                                                      // 1677
addRegexToken('HH', match1to2, match2);                                                                              // 1678
addRegexToken('hh', match1to2, match2);                                                                              // 1679
                                                                                                                     // 1680
addRegexToken('hmm', match3to4);                                                                                     // 1681
addRegexToken('hmmss', match5to6);                                                                                   // 1682
addRegexToken('Hmm', match3to4);                                                                                     // 1683
addRegexToken('Hmmss', match5to6);                                                                                   // 1684
                                                                                                                     // 1685
addParseToken(['H', 'HH'], HOUR);                                                                                    // 1686
addParseToken(['a', 'A'], function (input, array, config) {                                                          // 1687
    config._isPm = config._locale.isPM(input);                                                                       // 1688
    config._meridiem = input;                                                                                        // 1689
});                                                                                                                  // 1690
addParseToken(['h', 'hh'], function (input, array, config) {                                                         // 1691
    array[HOUR] = toInt(input);                                                                                      // 1692
    getParsingFlags(config).bigHour = true;                                                                          // 1693
});                                                                                                                  // 1694
addParseToken('hmm', function (input, array, config) {                                                               // 1695
    var pos = input.length - 2;                                                                                      // 1696
    array[HOUR] = toInt(input.substr(0, pos));                                                                       // 1697
    array[MINUTE] = toInt(input.substr(pos));                                                                        // 1698
    getParsingFlags(config).bigHour = true;                                                                          // 1699
});                                                                                                                  // 1700
addParseToken('hmmss', function (input, array, config) {                                                             // 1701
    var pos1 = input.length - 4;                                                                                     // 1702
    var pos2 = input.length - 2;                                                                                     // 1703
    array[HOUR] = toInt(input.substr(0, pos1));                                                                      // 1704
    array[MINUTE] = toInt(input.substr(pos1, 2));                                                                    // 1705
    array[SECOND] = toInt(input.substr(pos2));                                                                       // 1706
    getParsingFlags(config).bigHour = true;                                                                          // 1707
});                                                                                                                  // 1708
addParseToken('Hmm', function (input, array, config) {                                                               // 1709
    var pos = input.length - 2;                                                                                      // 1710
    array[HOUR] = toInt(input.substr(0, pos));                                                                       // 1711
    array[MINUTE] = toInt(input.substr(pos));                                                                        // 1712
});                                                                                                                  // 1713
addParseToken('Hmmss', function (input, array, config) {                                                             // 1714
    var pos1 = input.length - 4;                                                                                     // 1715
    var pos2 = input.length - 2;                                                                                     // 1716
    array[HOUR] = toInt(input.substr(0, pos1));                                                                      // 1717
    array[MINUTE] = toInt(input.substr(pos1, 2));                                                                    // 1718
    array[SECOND] = toInt(input.substr(pos2));                                                                       // 1719
});                                                                                                                  // 1720
                                                                                                                     // 1721
// LOCALES                                                                                                           // 1722
                                                                                                                     // 1723
function localeIsPM (input) {                                                                                        // 1724
    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays                               // 1725
    // Using charAt should be more compatible.                                                                       // 1726
    return ((input + '').toLowerCase().charAt(0) === 'p');                                                           // 1727
}                                                                                                                    // 1728
                                                                                                                     // 1729
var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;                                                                    // 1730
function localeMeridiem (hours, minutes, isLower) {                                                                  // 1731
    if (hours > 11) {                                                                                                // 1732
        return isLower ? 'pm' : 'PM';                                                                                // 1733
    } else {                                                                                                         // 1734
        return isLower ? 'am' : 'AM';                                                                                // 1735
    }                                                                                                                // 1736
}                                                                                                                    // 1737
                                                                                                                     // 1738
                                                                                                                     // 1739
// MOMENTS                                                                                                           // 1740
                                                                                                                     // 1741
// Setting the hour should keep the time, because the user explicitly                                                // 1742
// specified which hour he wants. So trying to maintain the same hour (in                                            // 1743
// a new timezone) makes sense. Adding/subtracting hours does not follow                                             // 1744
// this rule.                                                                                                        // 1745
var getSetHour = makeGetSet('Hours', true);                                                                          // 1746
                                                                                                                     // 1747
// months                                                                                                            // 1748
// week                                                                                                              // 1749
// weekdays                                                                                                          // 1750
// meridiem                                                                                                          // 1751
var baseConfig = {                                                                                                   // 1752
    calendar: defaultCalendar,                                                                                       // 1753
    longDateFormat: defaultLongDateFormat,                                                                           // 1754
    invalidDate: defaultInvalidDate,                                                                                 // 1755
    ordinal: defaultOrdinal,                                                                                         // 1756
    ordinalParse: defaultOrdinalParse,                                                                               // 1757
    relativeTime: defaultRelativeTime,                                                                               // 1758
                                                                                                                     // 1759
    months: defaultLocaleMonths,                                                                                     // 1760
    monthsShort: defaultLocaleMonthsShort,                                                                           // 1761
                                                                                                                     // 1762
    week: defaultLocaleWeek,                                                                                         // 1763
                                                                                                                     // 1764
    weekdays: defaultLocaleWeekdays,                                                                                 // 1765
    weekdaysMin: defaultLocaleWeekdaysMin,                                                                           // 1766
    weekdaysShort: defaultLocaleWeekdaysShort,                                                                       // 1767
                                                                                                                     // 1768
    meridiemParse: defaultLocaleMeridiemParse                                                                        // 1769
};                                                                                                                   // 1770
                                                                                                                     // 1771
// internal storage for locale config files                                                                          // 1772
var locales = {};                                                                                                    // 1773
var localeFamilies = {};                                                                                             // 1774
var globalLocale;                                                                                                    // 1775
                                                                                                                     // 1776
function normalizeLocale(key) {                                                                                      // 1777
    return key ? key.toLowerCase().replace('_', '-') : key;                                                          // 1778
}                                                                                                                    // 1779
                                                                                                                     // 1780
// pick the locale from the array                                                                                    // 1781
// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each                         // 1782
// substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
function chooseLocale(names) {                                                                                       // 1784
    var i = 0, j, next, locale, split;                                                                               // 1785
                                                                                                                     // 1786
    while (i < names.length) {                                                                                       // 1787
        split = normalizeLocale(names[i]).split('-');                                                                // 1788
        j = split.length;                                                                                            // 1789
        next = normalizeLocale(names[i + 1]);                                                                        // 1790
        next = next ? next.split('-') : null;                                                                        // 1791
        while (j > 0) {                                                                                              // 1792
            locale = loadLocale(split.slice(0, j).join('-'));                                                        // 1793
            if (locale) {                                                                                            // 1794
                return locale;                                                                                       // 1795
            }                                                                                                        // 1796
            if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {                             // 1797
                //the next array item is better than a shallower substring of this one                               // 1798
                break;                                                                                               // 1799
            }                                                                                                        // 1800
            j--;                                                                                                     // 1801
        }                                                                                                            // 1802
        i++;                                                                                                         // 1803
    }                                                                                                                // 1804
    return null;                                                                                                     // 1805
}                                                                                                                    // 1806
                                                                                                                     // 1807
function loadLocale(name) {                                                                                          // 1808
    var oldLocale = null;                                                                                            // 1809
    // TODO: Find a better way to register and load all the locales in Node                                          // 1810
    if (!locales[name] && (typeof module !== 'undefined') &&                                                         // 1811
            module && module.exports) {                                                                              // 1812
        try {                                                                                                        // 1813
            oldLocale = globalLocale._abbr;                                                                          // 1814
            require('./locale/' + name);                                                                             // 1815
            // because defineLocale currently also sets the global locale, we                                        // 1816
            // want to undo that for lazy loaded locales                                                             // 1817
            getSetGlobalLocale(oldLocale);                                                                           // 1818
        } catch (e) { }                                                                                              // 1819
    }                                                                                                                // 1820
    return locales[name];                                                                                            // 1821
}                                                                                                                    // 1822
                                                                                                                     // 1823
// This function will load locale and then set the global locale.  If                                                // 1824
// no arguments are passed in, it will simply return the current global                                              // 1825
// locale key.                                                                                                       // 1826
function getSetGlobalLocale (key, values) {                                                                          // 1827
    var data;                                                                                                        // 1828
    if (key) {                                                                                                       // 1829
        if (isUndefined(values)) {                                                                                   // 1830
            data = getLocale(key);                                                                                   // 1831
        }                                                                                                            // 1832
        else {                                                                                                       // 1833
            data = defineLocale(key, values);                                                                        // 1834
        }                                                                                                            // 1835
                                                                                                                     // 1836
        if (data) {                                                                                                  // 1837
            // moment.duration._locale = moment._locale = data;                                                      // 1838
            globalLocale = data;                                                                                     // 1839
        }                                                                                                            // 1840
    }                                                                                                                // 1841
                                                                                                                     // 1842
    return globalLocale._abbr;                                                                                       // 1843
}                                                                                                                    // 1844
                                                                                                                     // 1845
function defineLocale (name, config) {                                                                               // 1846
    if (config !== null) {                                                                                           // 1847
        var parentConfig = baseConfig;                                                                               // 1848
        config.abbr = name;                                                                                          // 1849
        if (locales[name] != null) {                                                                                 // 1850
            deprecateSimple('defineLocaleOverride',                                                                  // 1851
                    'use moment.updateLocale(localeName, config) to change ' +                                       // 1852
                    'an existing locale. moment.defineLocale(localeName, ' +                                         // 1853
                    'config) should only be used for creating a new locale ' +                                       // 1854
                    'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');                      // 1855
            parentConfig = locales[name]._config;                                                                    // 1856
        } else if (config.parentLocale != null) {                                                                    // 1857
            if (locales[config.parentLocale] != null) {                                                              // 1858
                parentConfig = locales[config.parentLocale]._config;                                                 // 1859
            } else {                                                                                                 // 1860
                if (!localeFamilies[config.parentLocale]) {                                                          // 1861
                    localeFamilies[config.parentLocale] = [];                                                        // 1862
                }                                                                                                    // 1863
                localeFamilies[config.parentLocale].push({                                                           // 1864
                    name: name,                                                                                      // 1865
                    config: config                                                                                   // 1866
                });                                                                                                  // 1867
                return null;                                                                                         // 1868
            }                                                                                                        // 1869
        }                                                                                                            // 1870
        locales[name] = new Locale(mergeConfigs(parentConfig, config));                                              // 1871
                                                                                                                     // 1872
        if (localeFamilies[name]) {                                                                                  // 1873
            localeFamilies[name].forEach(function (x) {                                                              // 1874
                defineLocale(x.name, x.config);                                                                      // 1875
            });                                                                                                      // 1876
        }                                                                                                            // 1877
                                                                                                                     // 1878
        // backwards compat for now: also set the locale                                                             // 1879
        // make sure we set the locale AFTER all child locales have been                                             // 1880
        // created, so we won't end up with the child locale set.                                                    // 1881
        getSetGlobalLocale(name);                                                                                    // 1882
                                                                                                                     // 1883
                                                                                                                     // 1884
        return locales[name];                                                                                        // 1885
    } else {                                                                                                         // 1886
        // useful for testing                                                                                        // 1887
        delete locales[name];                                                                                        // 1888
        return null;                                                                                                 // 1889
    }                                                                                                                // 1890
}                                                                                                                    // 1891
                                                                                                                     // 1892
function updateLocale(name, config) {                                                                                // 1893
    if (config != null) {                                                                                            // 1894
        var locale, parentConfig = baseConfig;                                                                       // 1895
        // MERGE                                                                                                     // 1896
        if (locales[name] != null) {                                                                                 // 1897
            parentConfig = locales[name]._config;                                                                    // 1898
        }                                                                                                            // 1899
        config = mergeConfigs(parentConfig, config);                                                                 // 1900
        locale = new Locale(config);                                                                                 // 1901
        locale.parentLocale = locales[name];                                                                         // 1902
        locales[name] = locale;                                                                                      // 1903
                                                                                                                     // 1904
        // backwards compat for now: also set the locale                                                             // 1905
        getSetGlobalLocale(name);                                                                                    // 1906
    } else {                                                                                                         // 1907
        // pass null for config to unupdate, useful for tests                                                        // 1908
        if (locales[name] != null) {                                                                                 // 1909
            if (locales[name].parentLocale != null) {                                                                // 1910
                locales[name] = locales[name].parentLocale;                                                          // 1911
            } else if (locales[name] != null) {                                                                      // 1912
                delete locales[name];                                                                                // 1913
            }                                                                                                        // 1914
        }                                                                                                            // 1915
    }                                                                                                                // 1916
    return locales[name];                                                                                            // 1917
}                                                                                                                    // 1918
                                                                                                                     // 1919
// returns locale data                                                                                               // 1920
function getLocale (key) {                                                                                           // 1921
    var locale;                                                                                                      // 1922
                                                                                                                     // 1923
    if (key && key._locale && key._locale._abbr) {                                                                   // 1924
        key = key._locale._abbr;                                                                                     // 1925
    }                                                                                                                // 1926
                                                                                                                     // 1927
    if (!key) {                                                                                                      // 1928
        return globalLocale;                                                                                         // 1929
    }                                                                                                                // 1930
                                                                                                                     // 1931
    if (!isArray(key)) {                                                                                             // 1932
        //short-circuit everything else                                                                              // 1933
        locale = loadLocale(key);                                                                                    // 1934
        if (locale) {                                                                                                // 1935
            return locale;                                                                                           // 1936
        }                                                                                                            // 1937
        key = [key];                                                                                                 // 1938
    }                                                                                                                // 1939
                                                                                                                     // 1940
    return chooseLocale(key);                                                                                        // 1941
}                                                                                                                    // 1942
                                                                                                                     // 1943
function listLocales() {                                                                                             // 1944
    return keys$1(locales);                                                                                          // 1945
}                                                                                                                    // 1946
                                                                                                                     // 1947
function checkOverflow (m) {                                                                                         // 1948
    var overflow;                                                                                                    // 1949
    var a = m._a;                                                                                                    // 1950
                                                                                                                     // 1951
    if (a && getParsingFlags(m).overflow === -2) {                                                                   // 1952
        overflow =                                                                                                   // 1953
            a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :                                                     // 1954
            a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :                           // 1955
            a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
            a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :                                                    // 1957
            a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :                                                    // 1958
            a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :                                               // 1959
            -1;                                                                                                      // 1960
                                                                                                                     // 1961
        if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {                         // 1962
            overflow = DATE;                                                                                         // 1963
        }                                                                                                            // 1964
        if (getParsingFlags(m)._overflowWeeks && overflow === -1) {                                                  // 1965
            overflow = WEEK;                                                                                         // 1966
        }                                                                                                            // 1967
        if (getParsingFlags(m)._overflowWeekday && overflow === -1) {                                                // 1968
            overflow = WEEKDAY;                                                                                      // 1969
        }                                                                                                            // 1970
                                                                                                                     // 1971
        getParsingFlags(m).overflow = overflow;                                                                      // 1972
    }                                                                                                                // 1973
                                                                                                                     // 1974
    return m;                                                                                                        // 1975
}                                                                                                                    // 1976
                                                                                                                     // 1977
// iso 8601 regex                                                                                                    // 1978
// 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)         // 1979
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
                                                                                                                     // 1982
var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;                                                                               // 1983
                                                                                                                     // 1984
var isoDates = [                                                                                                     // 1985
    ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],                                                                         // 1986
    ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],                                                                               // 1987
    ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],                                                                              // 1988
    ['GGGG-[W]WW', /\d{4}-W\d\d/, false],                                                                            // 1989
    ['YYYY-DDD', /\d{4}-\d{3}/],                                                                                     // 1990
    ['YYYY-MM', /\d{4}-\d\d/, false],                                                                                // 1991
    ['YYYYYYMMDD', /[+-]\d{10}/],                                                                                    // 1992
    ['YYYYMMDD', /\d{8}/],                                                                                           // 1993
    // YYYYMM is NOT allowed by the standard                                                                         // 1994
    ['GGGG[W]WWE', /\d{4}W\d{3}/],                                                                                   // 1995
    ['GGGG[W]WW', /\d{4}W\d{2}/, false],                                                                             // 1996
    ['YYYYDDD', /\d{7}/]                                                                                             // 1997
];                                                                                                                   // 1998
                                                                                                                     // 1999
// iso time formats and regexes                                                                                      // 2000
var isoTimes = [                                                                                                     // 2001
    ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],                                                                        // 2002
    ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],                                                                         // 2003
    ['HH:mm:ss', /\d\d:\d\d:\d\d/],                                                                                  // 2004
    ['HH:mm', /\d\d:\d\d/],                                                                                          // 2005
    ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],                                                                            // 2006
    ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],                                                                             // 2007
    ['HHmmss', /\d\d\d\d\d\d/],                                                                                      // 2008
    ['HHmm', /\d\d\d\d/],                                                                                            // 2009
    ['HH', /\d\d/]                                                                                                   // 2010
];                                                                                                                   // 2011
                                                                                                                     // 2012
var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;                                                                         // 2013
                                                                                                                     // 2014
// date from iso format                                                                                              // 2015
function configFromISO(config) {                                                                                     // 2016
    var i, l,                                                                                                        // 2017
        string = config._i,                                                                                          // 2018
        match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),                                         // 2019
        allowTime, dateFormat, timeFormat, tzFormat;                                                                 // 2020
                                                                                                                     // 2021
    if (match) {                                                                                                     // 2022
        getParsingFlags(config).iso = true;                                                                          // 2023
                                                                                                                     // 2024
        for (i = 0, l = isoDates.length; i < l; i++) {                                                               // 2025
            if (isoDates[i][1].exec(match[1])) {                                                                     // 2026
                dateFormat = isoDates[i][0];                                                                         // 2027
                allowTime = isoDates[i][2] !== false;                                                                // 2028
                break;                                                                                               // 2029
            }                                                                                                        // 2030
        }                                                                                                            // 2031
        if (dateFormat == null) {                                                                                    // 2032
            config._isValid = false;                                                                                 // 2033
            return;                                                                                                  // 2034
        }                                                                                                            // 2035
        if (match[3]) {                                                                                              // 2036
            for (i = 0, l = isoTimes.length; i < l; i++) {                                                           // 2037
                if (isoTimes[i][1].exec(match[3])) {                                                                 // 2038
                    // match[2] should be 'T' or space                                                               // 2039
                    timeFormat = (match[2] || ' ') + isoTimes[i][0];                                                 // 2040
                    break;                                                                                           // 2041
                }                                                                                                    // 2042
            }                                                                                                        // 2043
            if (timeFormat == null) {                                                                                // 2044
                config._isValid = false;                                                                             // 2045
                return;                                                                                              // 2046
            }                                                                                                        // 2047
        }                                                                                                            // 2048
        if (!allowTime && timeFormat != null) {                                                                      // 2049
            config._isValid = false;                                                                                 // 2050
            return;                                                                                                  // 2051
        }                                                                                                            // 2052
        if (match[4]) {                                                                                              // 2053
            if (tzRegex.exec(match[4])) {                                                                            // 2054
                tzFormat = 'Z';                                                                                      // 2055
            } else {                                                                                                 // 2056
                config._isValid = false;                                                                             // 2057
                return;                                                                                              // 2058
            }                                                                                                        // 2059
        }                                                                                                            // 2060
        config._f = dateFormat + (timeFormat || '') + (tzFormat || '');                                              // 2061
        configFromStringAndFormat(config);                                                                           // 2062
    } else {                                                                                                         // 2063
        config._isValid = false;                                                                                     // 2064
    }                                                                                                                // 2065
}                                                                                                                    // 2066
                                                                                                                     // 2067
// date from iso format or fallback                                                                                  // 2068
function configFromString(config) {                                                                                  // 2069
    var matched = aspNetJsonRegex.exec(config._i);                                                                   // 2070
                                                                                                                     // 2071
    if (matched !== null) {                                                                                          // 2072
        config._d = new Date(+matched[1]);                                                                           // 2073
        return;                                                                                                      // 2074
    }                                                                                                                // 2075
                                                                                                                     // 2076
    configFromISO(config);                                                                                           // 2077
    if (config._isValid === false) {                                                                                 // 2078
        delete config._isValid;                                                                                      // 2079
        hooks.createFromInputFallback(config);                                                                       // 2080
    }                                                                                                                // 2081
}                                                                                                                    // 2082
                                                                                                                     // 2083
hooks.createFromInputFallback = deprecate(                                                                           // 2084
    'value provided is not in a recognized ISO format. moment construction falls back to js Date(), ' +              // 2085
    'which is not reliable across all browsers and versions. Non ISO date formats are ' +                            // 2086
    'discouraged and will be removed in an upcoming major release. Please refer to ' +                               // 2087
    'http://momentjs.com/guides/#/warnings/js-date/ for more info.',                                                 // 2088
    function (config) {                                                                                              // 2089
        config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));                                            // 2090
    }                                                                                                                // 2091
);                                                                                                                   // 2092
                                                                                                                     // 2093
// Pick the first defined of two or three arguments.                                                                 // 2094
function defaults(a, b, c) {                                                                                         // 2095
    if (a != null) {                                                                                                 // 2096
        return a;                                                                                                    // 2097
    }                                                                                                                // 2098
    if (b != null) {                                                                                                 // 2099
        return b;                                                                                                    // 2100
    }                                                                                                                // 2101
    return c;                                                                                                        // 2102
}                                                                                                                    // 2103
                                                                                                                     // 2104
function currentDateArray(config) {                                                                                  // 2105
    // hooks is actually the exported moment object                                                                  // 2106
    var nowValue = new Date(hooks.now());                                                                            // 2107
    if (config._useUTC) {                                                                                            // 2108
        return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];                           // 2109
    }                                                                                                                // 2110
    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];                                        // 2111
}                                                                                                                    // 2112
                                                                                                                     // 2113
// convert an array to a date.                                                                                       // 2114
// the array should mirror the parameters below                                                                      // 2115
// note: all values past the year are optional and will default to the lowest possible value.                        // 2116
// [year, month, day , hour, minute, second, millisecond]                                                            // 2117
function configFromArray (config) {                                                                                  // 2118
    var i, date, input = [], currentDate, yearToUse;                                                                 // 2119
                                                                                                                     // 2120
    if (config._d) {                                                                                                 // 2121
        return;                                                                                                      // 2122
    }                                                                                                                // 2123
                                                                                                                     // 2124
    currentDate = currentDateArray(config);                                                                          // 2125
                                                                                                                     // 2126
    //compute day of the year from weeks and weekdays                                                                // 2127
    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {                                          // 2128
        dayOfYearFromWeekInfo(config);                                                                               // 2129
    }                                                                                                                // 2130
                                                                                                                     // 2131
    //if the day of the year is set, figure out what it is                                                           // 2132
    if (config._dayOfYear) {                                                                                         // 2133
        yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);                                                    // 2134
                                                                                                                     // 2135
        if (config._dayOfYear > daysInYear(yearToUse)) {                                                             // 2136
            getParsingFlags(config)._overflowDayOfYear = true;                                                       // 2137
        }                                                                                                            // 2138
                                                                                                                     // 2139
        date = createUTCDate(yearToUse, 0, config._dayOfYear);                                                       // 2140
        config._a[MONTH] = date.getUTCMonth();                                                                       // 2141
        config._a[DATE] = date.getUTCDate();                                                                         // 2142
    }                                                                                                                // 2143
                                                                                                                     // 2144
    // Default to current date.                                                                                      // 2145
    // * if no year, month, day of month are given, default to today                                                 // 2146
    // * if day of month is given, default month and year                                                            // 2147
    // * if month is given, default only year                                                                        // 2148
    // * if year is given, don't default anything                                                                    // 2149
    for (i = 0; i < 3 && config._a[i] == null; ++i) {                                                                // 2150
        config._a[i] = input[i] = currentDate[i];                                                                    // 2151
    }                                                                                                                // 2152
                                                                                                                     // 2153
    // Zero out whatever was not defaulted, including time                                                           // 2154
    for (; i < 7; i++) {                                                                                             // 2155
        config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];                         // 2156
    }                                                                                                                // 2157
                                                                                                                     // 2158
    // Check for 24:00:00.000                                                                                        // 2159
    if (config._a[HOUR] === 24 &&                                                                                    // 2160
            config._a[MINUTE] === 0 &&                                                                               // 2161
            config._a[SECOND] === 0 &&                                                                               // 2162
            config._a[MILLISECOND] === 0) {                                                                          // 2163
        config._nextDay = true;                                                                                      // 2164
        config._a[HOUR] = 0;                                                                                         // 2165
    }                                                                                                                // 2166
                                                                                                                     // 2167
    config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);                                    // 2168
    // Apply timezone offset from input. The actual utcOffset can be changed                                         // 2169
    // with parseZone.                                                                                               // 2170
    if (config._tzm != null) {                                                                                       // 2171
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);                                            // 2172
    }                                                                                                                // 2173
                                                                                                                     // 2174
    if (config._nextDay) {                                                                                           // 2175
        config._a[HOUR] = 24;                                                                                        // 2176
    }                                                                                                                // 2177
}                                                                                                                    // 2178
                                                                                                                     // 2179
function dayOfYearFromWeekInfo(config) {                                                                             // 2180
    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;                                                 // 2181
                                                                                                                     // 2182
    w = config._w;                                                                                                   // 2183
    if (w.GG != null || w.W != null || w.E != null) {                                                                // 2184
        dow = 1;                                                                                                     // 2185
        doy = 4;                                                                                                     // 2186
                                                                                                                     // 2187
        // TODO: We need to take the current isoWeekYear, but that depends on                                        // 2188
        // how we interpret now (local, utc, fixed offset). So create                                                // 2189
        // a now version of current config (take local/utc/offset flags, and                                         // 2190
        // create now).                                                                                              // 2191
        weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);                            // 2192
        week = defaults(w.W, 1);                                                                                     // 2193
        weekday = defaults(w.E, 1);                                                                                  // 2194
        if (weekday < 1 || weekday > 7) {                                                                            // 2195
            weekdayOverflow = true;                                                                                  // 2196
        }                                                                                                            // 2197
    } else {                                                                                                         // 2198
        dow = config._locale._week.dow;                                                                              // 2199
        doy = config._locale._week.doy;                                                                              // 2200
                                                                                                                     // 2201
        var curWeek = weekOfYear(createLocal(), dow, doy);                                                           // 2202
                                                                                                                     // 2203
        weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);                                                    // 2204
                                                                                                                     // 2205
        // Default to current week.                                                                                  // 2206
        week = defaults(w.w, curWeek.week);                                                                          // 2207
                                                                                                                     // 2208
        if (w.d != null) {                                                                                           // 2209
            // weekday -- low day numbers are considered next week                                                   // 2210
            weekday = w.d;                                                                                           // 2211
            if (weekday < 0 || weekday > 6) {                                                                        // 2212
                weekdayOverflow = true;                                                                              // 2213
            }                                                                                                        // 2214
        } else if (w.e != null) {                                                                                    // 2215
            // local weekday -- counting starts from begining of week                                                // 2216
            weekday = w.e + dow;                                                                                     // 2217
            if (w.e < 0 || w.e > 6) {                                                                                // 2218
                weekdayOverflow = true;                                                                              // 2219
            }                                                                                                        // 2220
        } else {                                                                                                     // 2221
            // default to begining of week                                                                           // 2222
            weekday = dow;                                                                                           // 2223
        }                                                                                                            // 2224
    }                                                                                                                // 2225
    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {                                                        // 2226
        getParsingFlags(config)._overflowWeeks = true;                                                               // 2227
    } else if (weekdayOverflow != null) {                                                                            // 2228
        getParsingFlags(config)._overflowWeekday = true;                                                             // 2229
    } else {                                                                                                         // 2230
        temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);                                                // 2231
        config._a[YEAR] = temp.year;                                                                                 // 2232
        config._dayOfYear = temp.dayOfYear;                                                                          // 2233
    }                                                                                                                // 2234
}                                                                                                                    // 2235
                                                                                                                     // 2236
// constant that refers to the ISO standard                                                                          // 2237
hooks.ISO_8601 = function () {};                                                                                     // 2238
                                                                                                                     // 2239
// date from string and format string                                                                                // 2240
function configFromStringAndFormat(config) {                                                                         // 2241
    // TODO: Move this to another part of the creation flow to prevent circular deps                                 // 2242
    if (config._f === hooks.ISO_8601) {                                                                              // 2243
        configFromISO(config);                                                                                       // 2244
        return;                                                                                                      // 2245
    }                                                                                                                // 2246
                                                                                                                     // 2247
    config._a = [];                                                                                                  // 2248
    getParsingFlags(config).empty = true;                                                                            // 2249
                                                                                                                     // 2250
    // This array is used to make a Date, either with `new Date` or `Date.UTC`                                       // 2251
    var string = '' + config._i,                                                                                     // 2252
        i, parsedInput, tokens, token, skipped,                                                                      // 2253
        stringLength = string.length,                                                                                // 2254
        totalParsedInputLength = 0;                                                                                  // 2255
                                                                                                                     // 2256
    tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];                                  // 2257
                                                                                                                     // 2258
    for (i = 0; i < tokens.length; i++) {                                                                            // 2259
        token = tokens[i];                                                                                           // 2260
        parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];                                 // 2261
        // console.log('token', token, 'parsedInput', parsedInput,                                                   // 2262
        //         'regex', getParseRegexForToken(token, config));                                                   // 2263
        if (parsedInput) {                                                                                           // 2264
            skipped = string.substr(0, string.indexOf(parsedInput));                                                 // 2265
            if (skipped.length > 0) {                                                                                // 2266
                getParsingFlags(config).unusedInput.push(skipped);                                                   // 2267
            }                                                                                                        // 2268
            string = string.slice(string.indexOf(parsedInput) + parsedInput.length);                                 // 2269
            totalParsedInputLength += parsedInput.length;                                                            // 2270
        }                                                                                                            // 2271
        // don't parse if it's not a known token                                                                     // 2272
        if (formatTokenFunctions[token]) {                                                                           // 2273
            if (parsedInput) {                                                                                       // 2274
                getParsingFlags(config).empty = false;                                                               // 2275
            }                                                                                                        // 2276
            else {                                                                                                   // 2277
                getParsingFlags(config).unusedTokens.push(token);                                                    // 2278
            }                                                                                                        // 2279
            addTimeToArrayFromToken(token, parsedInput, config);                                                     // 2280
        }                                                                                                            // 2281
        else if (config._strict && !parsedInput) {                                                                   // 2282
            getParsingFlags(config).unusedTokens.push(token);                                                        // 2283
        }                                                                                                            // 2284
    }                                                                                                                // 2285
                                                                                                                     // 2286
    // add remaining unparsed input length to the string                                                             // 2287
    getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;                                   // 2288
    if (string.length > 0) {                                                                                         // 2289
        getParsingFlags(config).unusedInput.push(string);                                                            // 2290
    }                                                                                                                // 2291
                                                                                                                     // 2292
    // clear _12h flag if hour is <= 12                                                                              // 2293
    if (config._a[HOUR] <= 12 &&                                                                                     // 2294
        getParsingFlags(config).bigHour === true &&                                                                  // 2295
        config._a[HOUR] > 0) {                                                                                       // 2296
        getParsingFlags(config).bigHour = undefined;                                                                 // 2297
    }                                                                                                                // 2298
                                                                                                                     // 2299
    getParsingFlags(config).parsedDateParts = config._a.slice(0);                                                    // 2300
    getParsingFlags(config).meridiem = config._meridiem;                                                             // 2301
    // handle meridiem                                                                                               // 2302
    config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);                            // 2303
                                                                                                                     // 2304
    configFromArray(config);                                                                                         // 2305
    checkOverflow(config);                                                                                           // 2306
}                                                                                                                    // 2307
                                                                                                                     // 2308
                                                                                                                     // 2309
function meridiemFixWrap (locale, hour, meridiem) {                                                                  // 2310
    var isPm;                                                                                                        // 2311
                                                                                                                     // 2312
    if (meridiem == null) {                                                                                          // 2313
        // nothing to do                                                                                             // 2314
        return hour;                                                                                                 // 2315
    }                                                                                                                // 2316
    if (locale.meridiemHour != null) {                                                                               // 2317
        return locale.meridiemHour(hour, meridiem);                                                                  // 2318
    } else if (locale.isPM != null) {                                                                                // 2319
        // Fallback                                                                                                  // 2320
        isPm = locale.isPM(meridiem);                                                                                // 2321
        if (isPm && hour < 12) {                                                                                     // 2322
            hour += 12;                                                                                              // 2323
        }                                                                                                            // 2324
        if (!isPm && hour === 12) {                                                                                  // 2325
            hour = 0;                                                                                                // 2326
        }                                                                                                            // 2327
        return hour;                                                                                                 // 2328
    } else {                                                                                                         // 2329
        // this is not supposed to happen                                                                            // 2330
        return hour;                                                                                                 // 2331
    }                                                                                                                // 2332
}                                                                                                                    // 2333
                                                                                                                     // 2334
// date from string and array of format strings                                                                      // 2335
function configFromStringAndArray(config) {                                                                          // 2336
    var tempConfig,                                                                                                  // 2337
        bestMoment,                                                                                                  // 2338
                                                                                                                     // 2339
        scoreToBeat,                                                                                                 // 2340
        i,                                                                                                           // 2341
        currentScore;                                                                                                // 2342
                                                                                                                     // 2343
    if (config._f.length === 0) {                                                                                    // 2344
        getParsingFlags(config).invalidFormat = true;                                                                // 2345
        config._d = new Date(NaN);                                                                                   // 2346
        return;                                                                                                      // 2347
    }                                                                                                                // 2348
                                                                                                                     // 2349
    for (i = 0; i < config._f.length; i++) {                                                                         // 2350
        currentScore = 0;                                                                                            // 2351
        tempConfig = copyConfig({}, config);                                                                         // 2352
        if (config._useUTC != null) {                                                                                // 2353
            tempConfig._useUTC = config._useUTC;                                                                     // 2354
        }                                                                                                            // 2355
        tempConfig._f = config._f[i];                                                                                // 2356
        configFromStringAndFormat(tempConfig);                                                                       // 2357
                                                                                                                     // 2358
        if (!isValid(tempConfig)) {                                                                                  // 2359
            continue;                                                                                                // 2360
        }                                                                                                            // 2361
                                                                                                                     // 2362
        // if there is any input that was not parsed add a penalty for that format                                   // 2363
        currentScore += getParsingFlags(tempConfig).charsLeftOver;                                                   // 2364
                                                                                                                     // 2365
        //or tokens                                                                                                  // 2366
        currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;                                        // 2367
                                                                                                                     // 2368
        getParsingFlags(tempConfig).score = currentScore;                                                            // 2369
                                                                                                                     // 2370
        if (scoreToBeat == null || currentScore < scoreToBeat) {                                                     // 2371
            scoreToBeat = currentScore;                                                                              // 2372
            bestMoment = tempConfig;                                                                                 // 2373
        }                                                                                                            // 2374
    }                                                                                                                // 2375
                                                                                                                     // 2376
    extend(config, bestMoment || tempConfig);                                                                        // 2377
}                                                                                                                    // 2378
                                                                                                                     // 2379
function configFromObject(config) {                                                                                  // 2380
    if (config._d) {                                                                                                 // 2381
        return;                                                                                                      // 2382
    }                                                                                                                // 2383
                                                                                                                     // 2384
    var i = normalizeObjectUnits(config._i);                                                                         // 2385
    config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {  // 2386
        return obj && parseInt(obj, 10);                                                                             // 2387
    });                                                                                                              // 2388
                                                                                                                     // 2389
    configFromArray(config);                                                                                         // 2390
}                                                                                                                    // 2391
                                                                                                                     // 2392
function createFromConfig (config) {                                                                                 // 2393
    var res = new Moment(checkOverflow(prepareConfig(config)));                                                      // 2394
    if (res._nextDay) {                                                                                              // 2395
        // Adding is smart enough around DST                                                                         // 2396
        res.add(1, 'd');                                                                                             // 2397
        res._nextDay = undefined;                                                                                    // 2398
    }                                                                                                                // 2399
                                                                                                                     // 2400
    return res;                                                                                                      // 2401
}                                                                                                                    // 2402
                                                                                                                     // 2403
function prepareConfig (config) {                                                                                    // 2404
    var input = config._i,                                                                                           // 2405
        format = config._f;                                                                                          // 2406
                                                                                                                     // 2407
    config._locale = config._locale || getLocale(config._l);                                                         // 2408
                                                                                                                     // 2409
    if (input === null || (format === undefined && input === '')) {                                                  // 2410
        return createInvalid({nullInput: true});                                                                     // 2411
    }                                                                                                                // 2412
                                                                                                                     // 2413
    if (typeof input === 'string') {                                                                                 // 2414
        config._i = input = config._locale.preparse(input);                                                          // 2415
    }                                                                                                                // 2416
                                                                                                                     // 2417
    if (isMoment(input)) {                                                                                           // 2418
        return new Moment(checkOverflow(input));                                                                     // 2419
    } else if (isDate(input)) {                                                                                      // 2420
        config._d = input;                                                                                           // 2421
    } else if (isArray(format)) {                                                                                    // 2422
        configFromStringAndArray(config);                                                                            // 2423
    } else if (format) {                                                                                             // 2424
        configFromStringAndFormat(config);                                                                           // 2425
    }  else {                                                                                                        // 2426
        configFromInput(config);                                                                                     // 2427
    }                                                                                                                // 2428
                                                                                                                     // 2429
    if (!isValid(config)) {                                                                                          // 2430
        config._d = null;                                                                                            // 2431
    }                                                                                                                // 2432
                                                                                                                     // 2433
    return config;                                                                                                   // 2434
}                                                                                                                    // 2435
                                                                                                                     // 2436
function configFromInput(config) {                                                                                   // 2437
    var input = config._i;                                                                                           // 2438
    if (input === undefined) {                                                                                       // 2439
        config._d = new Date(hooks.now());                                                                           // 2440
    } else if (isDate(input)) {                                                                                      // 2441
        config._d = new Date(input.valueOf());                                                                       // 2442
    } else if (typeof input === 'string') {                                                                          // 2443
        configFromString(config);                                                                                    // 2444
    } else if (isArray(input)) {                                                                                     // 2445
        config._a = map(input.slice(0), function (obj) {                                                             // 2446
            return parseInt(obj, 10);                                                                                // 2447
        });                                                                                                          // 2448
        configFromArray(config);                                                                                     // 2449
    } else if (typeof(input) === 'object') {                                                                         // 2450
        configFromObject(config);                                                                                    // 2451
    } else if (isNumber(input)) {                                                                                    // 2452
        // from milliseconds                                                                                         // 2453
        config._d = new Date(input);                                                                                 // 2454
    } else {                                                                                                         // 2455
        hooks.createFromInputFallback(config);                                                                       // 2456
    }                                                                                                                // 2457
}                                                                                                                    // 2458
                                                                                                                     // 2459
function createLocalOrUTC (input, format, locale, strict, isUTC) {                                                   // 2460
    var c = {};                                                                                                      // 2461
                                                                                                                     // 2462
    if (locale === true || locale === false) {                                                                       // 2463
        strict = locale;                                                                                             // 2464
        locale = undefined;                                                                                          // 2465
    }                                                                                                                // 2466
                                                                                                                     // 2467
    if ((isObject(input) && isObjectEmpty(input)) ||                                                                 // 2468
            (isArray(input) && input.length === 0)) {                                                                // 2469
        input = undefined;                                                                                           // 2470
    }                                                                                                                // 2471
    // object construction must be done this way.                                                                    // 2472
    // https://github.com/moment/moment/issues/1423                                                                  // 2473
    c._isAMomentObject = true;                                                                                       // 2474
    c._useUTC = c._isUTC = isUTC;                                                                                    // 2475
    c._l = locale;                                                                                                   // 2476
    c._i = input;                                                                                                    // 2477
    c._f = format;                                                                                                   // 2478
    c._strict = strict;                                                                                              // 2479
                                                                                                                     // 2480
    return createFromConfig(c);                                                                                      // 2481
}                                                                                                                    // 2482
                                                                                                                     // 2483
function createLocal (input, format, locale, strict) {                                                               // 2484
    return createLocalOrUTC(input, format, locale, strict, false);                                                   // 2485
}                                                                                                                    // 2486
                                                                                                                     // 2487
var prototypeMin = deprecate(                                                                                        // 2488
    'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',            // 2489
    function () {                                                                                                    // 2490
        var other = createLocal.apply(null, arguments);                                                              // 2491
        if (this.isValid() && other.isValid()) {                                                                     // 2492
            return other < this ? this : other;                                                                      // 2493
        } else {                                                                                                     // 2494
            return createInvalid();                                                                                  // 2495
        }                                                                                                            // 2496
    }                                                                                                                // 2497
);                                                                                                                   // 2498
                                                                                                                     // 2499
var prototypeMax = deprecate(                                                                                        // 2500
    'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',            // 2501
    function () {                                                                                                    // 2502
        var other = createLocal.apply(null, arguments);                                                              // 2503
        if (this.isValid() && other.isValid()) {                                                                     // 2504
            return other > this ? this : other;                                                                      // 2505
        } else {                                                                                                     // 2506
            return createInvalid();                                                                                  // 2507
        }                                                                                                            // 2508
    }                                                                                                                // 2509
);                                                                                                                   // 2510
                                                                                                                     // 2511
// Pick a moment m from moments so that m[fn](other) is true for all                                                 // 2512
// other. This relies on the function fn to be transitive.                                                           // 2513
//                                                                                                                   // 2514
// moments should either be an array of moment objects or an array, whose                                            // 2515
// first element is an array of moment objects.                                                                      // 2516
function pickBy(fn, moments) {                                                                                       // 2517
    var res, i;                                                                                                      // 2518
    if (moments.length === 1 && isArray(moments[0])) {                                                               // 2519
        moments = moments[0];                                                                                        // 2520
    }                                                                                                                // 2521
    if (!moments.length) {                                                                                           // 2522
        return createLocal();                                                                                        // 2523
    }                                                                                                                // 2524
    res = moments[0];                                                                                                // 2525
    for (i = 1; i < moments.length; ++i) {                                                                           // 2526
        if (!moments[i].isValid() || moments[i][fn](res)) {                                                          // 2527
            res = moments[i];                                                                                        // 2528
        }                                                                                                            // 2529
    }                                                                                                                // 2530
    return res;                                                                                                      // 2531
}                                                                                                                    // 2532
                                                                                                                     // 2533
// TODO: Use [].sort instead?                                                                                        // 2534
function min () {                                                                                                    // 2535
    var args = [].slice.call(arguments, 0);                                                                          // 2536
                                                                                                                     // 2537
    return pickBy('isBefore', args);                                                                                 // 2538
}                                                                                                                    // 2539
                                                                                                                     // 2540
function max () {                                                                                                    // 2541
    var args = [].slice.call(arguments, 0);                                                                          // 2542
                                                                                                                     // 2543
    return pickBy('isAfter', args);                                                                                  // 2544
}                                                                                                                    // 2545
                                                                                                                     // 2546
var now = function () {                                                                                              // 2547
    return Date.now ? Date.now() : +(new Date());                                                                    // 2548
};                                                                                                                   // 2549
                                                                                                                     // 2550
function Duration (duration) {                                                                                       // 2551
    var normalizedInput = normalizeObjectUnits(duration),                                                            // 2552
        years = normalizedInput.year || 0,                                                                           // 2553
        quarters = normalizedInput.quarter || 0,                                                                     // 2554
        months = normalizedInput.month || 0,                                                                         // 2555
        weeks = normalizedInput.week || 0,                                                                           // 2556
        days = normalizedInput.day || 0,                                                                             // 2557
        hours = normalizedInput.hour || 0,                                                                           // 2558
        minutes = normalizedInput.minute || 0,                                                                       // 2559
        seconds = normalizedInput.second || 0,                                                                       // 2560
        milliseconds = normalizedInput.millisecond || 0;                                                             // 2561
                                                                                                                     // 2562
    // representation for dateAddRemove                                                                              // 2563
    this._milliseconds = +milliseconds +                                                                             // 2564
        seconds * 1e3 + // 1000                                                                                      // 2565
        minutes * 6e4 + // 1000 * 60                                                                                 // 2566
        hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
    // Because of dateAddRemove treats 24 hours as different from a                                                  // 2568
    // day when working around DST, we need to store them separately                                                 // 2569
    this._days = +days +                                                                                             // 2570
        weeks * 7;                                                                                                   // 2571
    // It is impossible translate months into days without knowing                                                   // 2572
    // which months you are are talking about, so we have to store                                                   // 2573
    // it separately.                                                                                                // 2574
    this._months = +months +                                                                                         // 2575
        quarters * 3 +                                                                                               // 2576
        years * 12;                                                                                                  // 2577
                                                                                                                     // 2578
    this._data = {};                                                                                                 // 2579
                                                                                                                     // 2580
    this._locale = getLocale();                                                                                      // 2581
                                                                                                                     // 2582
    this._bubble();                                                                                                  // 2583
}                                                                                                                    // 2584
                                                                                                                     // 2585
function isDuration (obj) {                                                                                          // 2586
    return obj instanceof Duration;                                                                                  // 2587
}                                                                                                                    // 2588
                                                                                                                     // 2589
function absRound (number) {                                                                                         // 2590
    if (number < 0) {                                                                                                // 2591
        return Math.round(-1 * number) * -1;                                                                         // 2592
    } else {                                                                                                         // 2593
        return Math.round(number);                                                                                   // 2594
    }                                                                                                                // 2595
}                                                                                                                    // 2596
                                                                                                                     // 2597
// FORMATTING                                                                                                        // 2598
                                                                                                                     // 2599
function offset (token, separator) {                                                                                 // 2600
    addFormatToken(token, 0, 0, function () {                                                                        // 2601
        var offset = this.utcOffset();                                                                               // 2602
        var sign = '+';                                                                                              // 2603
        if (offset < 0) {                                                                                            // 2604
            offset = -offset;                                                                                        // 2605
            sign = '-';                                                                                              // 2606
        }                                                                                                            // 2607
        return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);                       // 2608
    });                                                                                                              // 2609
}                                                                                                                    // 2610
                                                                                                                     // 2611
offset('Z', ':');                                                                                                    // 2612
offset('ZZ', '');                                                                                                    // 2613
                                                                                                                     // 2614
// PARSING                                                                                                           // 2615
                                                                                                                     // 2616
addRegexToken('Z',  matchShortOffset);                                                                               // 2617
addRegexToken('ZZ', matchShortOffset);                                                                               // 2618
addParseToken(['Z', 'ZZ'], function (input, array, config) {                                                         // 2619
    config._useUTC = true;                                                                                           // 2620
    config._tzm = offsetFromString(matchShortOffset, input);                                                         // 2621
});                                                                                                                  // 2622
                                                                                                                     // 2623
// HELPERS                                                                                                           // 2624
                                                                                                                     // 2625
// timezone chunker                                                                                                  // 2626
// '+10:00' > ['10',  '00']                                                                                          // 2627
// '-1530'  > ['-15', '30']                                                                                          // 2628
var chunkOffset = /([\+\-]|\d\d)/gi;                                                                                 // 2629
                                                                                                                     // 2630
function offsetFromString(matcher, string) {                                                                         // 2631
    var matches = (string || '').match(matcher);                                                                     // 2632
                                                                                                                     // 2633
    if (matches === null) {                                                                                          // 2634
        return null;                                                                                                 // 2635
    }                                                                                                                // 2636
                                                                                                                     // 2637
    var chunk   = matches[matches.length - 1] || [];                                                                 // 2638
    var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];                                                    // 2639
    var minutes = +(parts[1] * 60) + toInt(parts[2]);                                                                // 2640
                                                                                                                     // 2641
    return minutes === 0 ?                                                                                           // 2642
      0 :                                                                                                            // 2643
      parts[0] === '+' ? minutes : -minutes;                                                                         // 2644
}                                                                                                                    // 2645
                                                                                                                     // 2646
// Return a moment from input, that is local/utc/zone equivalent to model.                                           // 2647
function cloneWithOffset(input, model) {                                                                             // 2648
    var res, diff;                                                                                                   // 2649
    if (model._isUTC) {                                                                                              // 2650
        res = model.clone();                                                                                         // 2651
        diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();  // 2652
        // Use low-level api, because this fn is low-level api.                                                      // 2653
        res._d.setTime(res._d.valueOf() + diff);                                                                     // 2654
        hooks.updateOffset(res, false);                                                                              // 2655
        return res;                                                                                                  // 2656
    } else {                                                                                                         // 2657
        return createLocal(input).local();                                                                           // 2658
    }                                                                                                                // 2659
}                                                                                                                    // 2660
                                                                                                                     // 2661
function getDateOffset (m) {                                                                                         // 2662
    // On Firefox.24 Date#getTimezoneOffset returns a floating point.                                                // 2663
    // https://github.com/moment/moment/pull/1871                                                                    // 2664
    return -Math.round(m._d.getTimezoneOffset() / 15) * 15;                                                          // 2665
}                                                                                                                    // 2666
                                                                                                                     // 2667
// HOOKS                                                                                                             // 2668
                                                                                                                     // 2669
// This function will be called whenever a moment is mutated.                                                        // 2670
// It is intended to keep the offset in sync with the timezone.                                                      // 2671
hooks.updateOffset = function () {};                                                                                 // 2672
                                                                                                                     // 2673
// MOMENTS                                                                                                           // 2674
                                                                                                                     // 2675
// keepLocalTime = true means only change the timezone, without                                                      // 2676
// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->                                              // 2677
// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset                                               // 2678
// +0200, so we adjust the time as needed, to be valid.                                                              // 2679
//                                                                                                                   // 2680
// Keeping the time actually adds/subtracts (one hour)                                                               // 2681
// from the actual represented time. That is why we call updateOffset                                                // 2682
// a second time. In case it wants us to change the offset again                                                     // 2683
// _changeInProgress == true case, then we have to adjust, because                                                   // 2684
// there is no such time in the given timezone.                                                                      // 2685
function getSetOffset (input, keepLocalTime) {                                                                       // 2686
    var offset = this._offset || 0,                                                                                  // 2687
        localAdjust;                                                                                                 // 2688
    if (!this.isValid()) {                                                                                           // 2689
        return input != null ? this : NaN;                                                                           // 2690
    }                                                                                                                // 2691
    if (input != null) {                                                                                             // 2692
        if (typeof input === 'string') {                                                                             // 2693
            input = offsetFromString(matchShortOffset, input);                                                       // 2694
            if (input === null) {                                                                                    // 2695
                return this;                                                                                         // 2696
            }                                                                                                        // 2697
        } else if (Math.abs(input) < 16) {                                                                           // 2698
            input = input * 60;                                                                                      // 2699
        }                                                                                                            // 2700
        if (!this._isUTC && keepLocalTime) {                                                                         // 2701
            localAdjust = getDateOffset(this);                                                                       // 2702
        }                                                                                                            // 2703
        this._offset = input;                                                                                        // 2704
        this._isUTC = true;                                                                                          // 2705
        if (localAdjust != null) {                                                                                   // 2706
            this.add(localAdjust, 'm');                                                                              // 2707
        }                                                                                                            // 2708
        if (offset !== input) {                                                                                      // 2709
            if (!keepLocalTime || this._changeInProgress) {                                                          // 2710
                addSubtract(this, createDuration(input - offset, 'm'), 1, false);                                    // 2711
            } else if (!this._changeInProgress) {                                                                    // 2712
                this._changeInProgress = true;                                                                       // 2713
                hooks.updateOffset(this, true);                                                                      // 2714
                this._changeInProgress = null;                                                                       // 2715
            }                                                                                                        // 2716
        }                                                                                                            // 2717
        return this;                                                                                                 // 2718
    } else {                                                                                                         // 2719
        return this._isUTC ? offset : getDateOffset(this);                                                           // 2720
    }                                                                                                                // 2721
}                                                                                                                    // 2722
                                                                                                                     // 2723
function getSetZone (input, keepLocalTime) {                                                                         // 2724
    if (input != null) {                                                                                             // 2725
        if (typeof input !== 'string') {                                                                             // 2726
            input = -input;                                                                                          // 2727
        }                                                                                                            // 2728
                                                                                                                     // 2729
        this.utcOffset(input, keepLocalTime);                                                                        // 2730
                                                                                                                     // 2731
        return this;                                                                                                 // 2732
    } else {                                                                                                         // 2733
        return -this.utcOffset();                                                                                    // 2734
    }                                                                                                                // 2735
}                                                                                                                    // 2736
                                                                                                                     // 2737
function setOffsetToUTC (keepLocalTime) {                                                                            // 2738
    return this.utcOffset(0, keepLocalTime);                                                                         // 2739
}                                                                                                                    // 2740
                                                                                                                     // 2741
function setOffsetToLocal (keepLocalTime) {                                                                          // 2742
    if (this._isUTC) {                                                                                               // 2743
        this.utcOffset(0, keepLocalTime);                                                                            // 2744
        this._isUTC = false;                                                                                         // 2745
                                                                                                                     // 2746
        if (keepLocalTime) {                                                                                         // 2747
            this.subtract(getDateOffset(this), 'm');                                                                 // 2748
        }                                                                                                            // 2749
    }                                                                                                                // 2750
    return this;                                                                                                     // 2751
}                                                                                                                    // 2752
                                                                                                                     // 2753
function setOffsetToParsedOffset () {                                                                                // 2754
    if (this._tzm != null) {                                                                                         // 2755
        this.utcOffset(this._tzm);                                                                                   // 2756
    } else if (typeof this._i === 'string') {                                                                        // 2757
        var tZone = offsetFromString(matchOffset, this._i);                                                          // 2758
        if (tZone != null) {                                                                                         // 2759
            this.utcOffset(tZone);                                                                                   // 2760
        }                                                                                                            // 2761
        else {                                                                                                       // 2762
            this.utcOffset(0, true);                                                                                 // 2763
        }                                                                                                            // 2764
    }                                                                                                                // 2765
    return this;                                                                                                     // 2766
}                                                                                                                    // 2767
                                                                                                                     // 2768
function hasAlignedHourOffset (input) {                                                                              // 2769
    if (!this.isValid()) {                                                                                           // 2770
        return false;                                                                                                // 2771
    }                                                                                                                // 2772
    input = input ? createLocal(input).utcOffset() : 0;                                                              // 2773
                                                                                                                     // 2774
    return (this.utcOffset() - input) % 60 === 0;                                                                    // 2775
}                                                                                                                    // 2776
                                                                                                                     // 2777
function isDaylightSavingTime () {                                                                                   // 2778
    return (                                                                                                         // 2779
        this.utcOffset() > this.clone().month(0).utcOffset() ||                                                      // 2780
        this.utcOffset() > this.clone().month(5).utcOffset()                                                         // 2781
    );                                                                                                               // 2782
}                                                                                                                    // 2783
                                                                                                                     // 2784
function isDaylightSavingTimeShifted () {                                                                            // 2785
    if (!isUndefined(this._isDSTShifted)) {                                                                          // 2786
        return this._isDSTShifted;                                                                                   // 2787
    }                                                                                                                // 2788
                                                                                                                     // 2789
    var c = {};                                                                                                      // 2790
                                                                                                                     // 2791
    copyConfig(c, this);                                                                                             // 2792
    c = prepareConfig(c);                                                                                            // 2793
                                                                                                                     // 2794
    if (c._a) {                                                                                                      // 2795
        var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);                                                  // 2796
        this._isDSTShifted = this.isValid() &&                                                                       // 2797
            compareArrays(c._a, other.toArray()) > 0;                                                                // 2798
    } else {                                                                                                         // 2799
        this._isDSTShifted = false;                                                                                  // 2800
    }                                                                                                                // 2801
                                                                                                                     // 2802
    return this._isDSTShifted;                                                                                       // 2803
}                                                                                                                    // 2804
                                                                                                                     // 2805
function isLocal () {                                                                                                // 2806
    return this.isValid() ? !this._isUTC : false;                                                                    // 2807
}                                                                                                                    // 2808
                                                                                                                     // 2809
function isUtcOffset () {                                                                                            // 2810
    return this.isValid() ? this._isUTC : false;                                                                     // 2811
}                                                                                                                    // 2812
                                                                                                                     // 2813
function isUtc () {                                                                                                  // 2814
    return this.isValid() ? this._isUTC && this._offset === 0 : false;                                               // 2815
}                                                                                                                    // 2816
                                                                                                                     // 2817
// ASP.NET json date format regex                                                                                    // 2818
var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;                                           // 2819
                                                                                                                     // 2820
// from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html                         // 2821
// somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere                                         // 2822
// and further modified to allow for strings containing both week and day                                            // 2823
var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;
                                                                                                                     // 2825
function createDuration (input, key) {                                                                               // 2826
    var duration = input,                                                                                            // 2827
        // matching against regexp is expensive, do it on demand                                                     // 2828
        match = null,                                                                                                // 2829
        sign,                                                                                                        // 2830
        ret,                                                                                                         // 2831
        diffRes;                                                                                                     // 2832
                                                                                                                     // 2833
    if (isDuration(input)) {                                                                                         // 2834
        duration = {                                                                                                 // 2835
            ms : input._milliseconds,                                                                                // 2836
            d  : input._days,                                                                                        // 2837
            M  : input._months                                                                                       // 2838
        };                                                                                                           // 2839
    } else if (isNumber(input)) {                                                                                    // 2840
        duration = {};                                                                                               // 2841
        if (key) {                                                                                                   // 2842
            duration[key] = input;                                                                                   // 2843
        } else {                                                                                                     // 2844
            duration.milliseconds = input;                                                                           // 2845
        }                                                                                                            // 2846
    } else if (!!(match = aspNetRegex.exec(input))) {                                                                // 2847
        sign = (match[1] === '-') ? -1 : 1;                                                                          // 2848
        duration = {                                                                                                 // 2849
            y  : 0,                                                                                                  // 2850
            d  : toInt(match[DATE])                         * sign,                                                  // 2851
            h  : toInt(match[HOUR])                         * sign,                                                  // 2852
            m  : toInt(match[MINUTE])                       * sign,                                                  // 2853
            s  : toInt(match[SECOND])                       * sign,                                                  // 2854
            ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
        };                                                                                                           // 2856
    } else if (!!(match = isoRegex.exec(input))) {                                                                   // 2857
        sign = (match[1] === '-') ? -1 : 1;                                                                          // 2858
        duration = {                                                                                                 // 2859
            y : parseIso(match[2], sign),                                                                            // 2860
            M : parseIso(match[3], sign),                                                                            // 2861
            w : parseIso(match[4], sign),                                                                            // 2862
            d : parseIso(match[5], sign),                                                                            // 2863
            h : parseIso(match[6], sign),                                                                            // 2864
            m : parseIso(match[7], sign),                                                                            // 2865
            s : parseIso(match[8], sign)                                                                             // 2866
        };                                                                                                           // 2867
    } else if (duration == null) {// checks for null or undefined                                                    // 2868
        duration = {};                                                                                               // 2869
    } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {                           // 2870
        diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));                           // 2871
                                                                                                                     // 2872
        duration = {};                                                                                               // 2873
        duration.ms = diffRes.milliseconds;                                                                          // 2874
        duration.M = diffRes.months;                                                                                 // 2875
    }                                                                                                                // 2876
                                                                                                                     // 2877
    ret = new Duration(duration);                                                                                    // 2878
                                                                                                                     // 2879
    if (isDuration(input) && hasOwnProp(input, '_locale')) {                                                         // 2880
        ret._locale = input._locale;                                                                                 // 2881
    }                                                                                                                // 2882
                                                                                                                     // 2883
    return ret;                                                                                                      // 2884
}                                                                                                                    // 2885
                                                                                                                     // 2886
createDuration.fn = Duration.prototype;                                                                              // 2887
                                                                                                                     // 2888
function parseIso (inp, sign) {                                                                                      // 2889
    // We'd normally use ~~inp for this, but unfortunately it also                                                   // 2890
    // converts floats to ints.                                                                                      // 2891
    // inp may be undefined, so careful calling replace on it.                                                       // 2892
    var res = inp && parseFloat(inp.replace(',', '.'));                                                              // 2893
    // apply sign while we're at it                                                                                  // 2894
    return (isNaN(res) ? 0 : res) * sign;                                                                            // 2895
}                                                                                                                    // 2896
                                                                                                                     // 2897
function positiveMomentsDifference(base, other) {                                                                    // 2898
    var res = {milliseconds: 0, months: 0};                                                                          // 2899
                                                                                                                     // 2900
    res.months = other.month() - base.month() +                                                                      // 2901
        (other.year() - base.year()) * 12;                                                                           // 2902
    if (base.clone().add(res.months, 'M').isAfter(other)) {                                                          // 2903
        --res.months;                                                                                                // 2904
    }                                                                                                                // 2905
                                                                                                                     // 2906
    res.milliseconds = +other - +(base.clone().add(res.months, 'M'));                                                // 2907
                                                                                                                     // 2908
    return res;                                                                                                      // 2909
}                                                                                                                    // 2910
                                                                                                                     // 2911
function momentsDifference(base, other) {                                                                            // 2912
    var res;                                                                                                         // 2913
    if (!(base.isValid() && other.isValid())) {                                                                      // 2914
        return {milliseconds: 0, months: 0};                                                                         // 2915
    }                                                                                                                // 2916
                                                                                                                     // 2917
    other = cloneWithOffset(other, base);                                                                            // 2918
    if (base.isBefore(other)) {                                                                                      // 2919
        res = positiveMomentsDifference(base, other);                                                                // 2920
    } else {                                                                                                         // 2921
        res = positiveMomentsDifference(other, base);                                                                // 2922
        res.milliseconds = -res.milliseconds;                                                                        // 2923
        res.months = -res.months;                                                                                    // 2924
    }                                                                                                                // 2925
                                                                                                                     // 2926
    return res;                                                                                                      // 2927
}                                                                                                                    // 2928
                                                                                                                     // 2929
// TODO: remove 'name' arg after deprecation is removed                                                              // 2930
function createAdder(direction, name) {                                                                              // 2931
    return function (val, period) {                                                                                  // 2932
        var dur, tmp;                                                                                                // 2933
        //invert the arguments, but complain about it                                                                // 2934
        if (period !== null && !isNaN(+period)) {                                                                    // 2935
            deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
            'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');                         // 2937
            tmp = val; val = period; period = tmp;                                                                   // 2938
        }                                                                                                            // 2939
                                                                                                                     // 2940
        val = typeof val === 'string' ? +val : val;                                                                  // 2941
        dur = createDuration(val, period);                                                                           // 2942
        addSubtract(this, dur, direction);                                                                           // 2943
        return this;                                                                                                 // 2944
    };                                                                                                               // 2945
}                                                                                                                    // 2946
                                                                                                                     // 2947
function addSubtract (mom, duration, isAdding, updateOffset) {                                                       // 2948
    var milliseconds = duration._milliseconds,                                                                       // 2949
        days = absRound(duration._days),                                                                             // 2950
        months = absRound(duration._months);                                                                         // 2951
                                                                                                                     // 2952
    if (!mom.isValid()) {                                                                                            // 2953
        // No op                                                                                                     // 2954
        return;                                                                                                      // 2955
    }                                                                                                                // 2956
                                                                                                                     // 2957
    updateOffset = updateOffset == null ? true : updateOffset;                                                       // 2958
                                                                                                                     // 2959
    if (milliseconds) {                                                                                              // 2960
        mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);                                                  // 2961
    }                                                                                                                // 2962
    if (days) {                                                                                                      // 2963
        set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);                                                      // 2964
    }                                                                                                                // 2965
    if (months) {                                                                                                    // 2966
        setMonth(mom, get(mom, 'Month') + months * isAdding);                                                        // 2967
    }                                                                                                                // 2968
    if (updateOffset) {                                                                                              // 2969
        hooks.updateOffset(mom, days || months);                                                                     // 2970
    }                                                                                                                // 2971
}                                                                                                                    // 2972
                                                                                                                     // 2973
var add      = createAdder(1, 'add');                                                                                // 2974
var subtract = createAdder(-1, 'subtract');                                                                          // 2975
                                                                                                                     // 2976
function getCalendarFormat(myMoment, now) {                                                                          // 2977
    var diff = myMoment.diff(now, 'days', true);                                                                     // 2978
    return diff < -6 ? 'sameElse' :                                                                                  // 2979
            diff < -1 ? 'lastWeek' :                                                                                 // 2980
            diff < 0 ? 'lastDay' :                                                                                   // 2981
            diff < 1 ? 'sameDay' :                                                                                   // 2982
            diff < 2 ? 'nextDay' :                                                                                   // 2983
            diff < 7 ? 'nextWeek' : 'sameElse';                                                                      // 2984
}                                                                                                                    // 2985
                                                                                                                     // 2986
function calendar$1 (time, formats) {                                                                                // 2987
    // We want to compare the start of today, vs this.                                                               // 2988
    // Getting start-of-today depends on whether we're local/utc/offset or not.                                      // 2989
    var now = time || createLocal(),                                                                                 // 2990
        sod = cloneWithOffset(now, this).startOf('day'),                                                             // 2991
        format = hooks.calendarFormat(this, sod) || 'sameElse';                                                      // 2992
                                                                                                                     // 2993
    var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);       // 2994
                                                                                                                     // 2995
    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));                        // 2996
}                                                                                                                    // 2997
                                                                                                                     // 2998
function clone () {                                                                                                  // 2999
    return new Moment(this);                                                                                         // 3000
}                                                                                                                    // 3001
                                                                                                                     // 3002
function isAfter (input, units) {                                                                                    // 3003
    var localInput = isMoment(input) ? input : createLocal(input);                                                   // 3004
    if (!(this.isValid() && localInput.isValid())) {                                                                 // 3005
        return false;                                                                                                // 3006
    }                                                                                                                // 3007
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');                                             // 3008
    if (units === 'millisecond') {                                                                                   // 3009
        return this.valueOf() > localInput.valueOf();                                                                // 3010
    } else {                                                                                                         // 3011
        return localInput.valueOf() < this.clone().startOf(units).valueOf();                                         // 3012
    }                                                                                                                // 3013
}                                                                                                                    // 3014
                                                                                                                     // 3015
function isBefore (input, units) {                                                                                   // 3016
    var localInput = isMoment(input) ? input : createLocal(input);                                                   // 3017
    if (!(this.isValid() && localInput.isValid())) {                                                                 // 3018
        return false;                                                                                                // 3019
    }                                                                                                                // 3020
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');                                             // 3021
    if (units === 'millisecond') {                                                                                   // 3022
        return this.valueOf() < localInput.valueOf();                                                                // 3023
    } else {                                                                                                         // 3024
        return this.clone().endOf(units).valueOf() < localInput.valueOf();                                           // 3025
    }                                                                                                                // 3026
}                                                                                                                    // 3027
                                                                                                                     // 3028
function isBetween (from, to, units, inclusivity) {                                                                  // 3029
    inclusivity = inclusivity || '()';                                                                               // 3030
    return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&                     // 3031
        (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));                              // 3032
}                                                                                                                    // 3033
                                                                                                                     // 3034
function isSame (input, units) {                                                                                     // 3035
    var localInput = isMoment(input) ? input : createLocal(input),                                                   // 3036
        inputMs;                                                                                                     // 3037
    if (!(this.isValid() && localInput.isValid())) {                                                                 // 3038
        return false;                                                                                                // 3039
    }                                                                                                                // 3040
    units = normalizeUnits(units || 'millisecond');                                                                  // 3041
    if (units === 'millisecond') {                                                                                   // 3042
        return this.valueOf() === localInput.valueOf();                                                              // 3043
    } else {                                                                                                         // 3044
        inputMs = localInput.valueOf();                                                                              // 3045
        return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();   // 3046
    }                                                                                                                // 3047
}                                                                                                                    // 3048
                                                                                                                     // 3049
function isSameOrAfter (input, units) {                                                                              // 3050
    return this.isSame(input, units) || this.isAfter(input,units);                                                   // 3051
}                                                                                                                    // 3052
                                                                                                                     // 3053
function isSameOrBefore (input, units) {                                                                             // 3054
    return this.isSame(input, units) || this.isBefore(input,units);                                                  // 3055
}                                                                                                                    // 3056
                                                                                                                     // 3057
function diff (input, units, asFloat) {                                                                              // 3058
    var that,                                                                                                        // 3059
        zoneDelta,                                                                                                   // 3060
        delta, output;                                                                                               // 3061
                                                                                                                     // 3062
    if (!this.isValid()) {                                                                                           // 3063
        return NaN;                                                                                                  // 3064
    }                                                                                                                // 3065
                                                                                                                     // 3066
    that = cloneWithOffset(input, this);                                                                             // 3067
                                                                                                                     // 3068
    if (!that.isValid()) {                                                                                           // 3069
        return NaN;                                                                                                  // 3070
    }                                                                                                                // 3071
                                                                                                                     // 3072
    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;                                                         // 3073
                                                                                                                     // 3074
    units = normalizeUnits(units);                                                                                   // 3075
                                                                                                                     // 3076
    if (units === 'year' || units === 'month' || units === 'quarter') {                                              // 3077
        output = monthDiff(this, that);                                                                              // 3078
        if (units === 'quarter') {                                                                                   // 3079
            output = output / 3;                                                                                     // 3080
        } else if (units === 'year') {                                                                               // 3081
            output = output / 12;                                                                                    // 3082
        }                                                                                                            // 3083
    } else {                                                                                                         // 3084
        delta = this - that;                                                                                         // 3085
        output = units === 'second' ? delta / 1e3 : // 1000                                                          // 3086
            units === 'minute' ? delta / 6e4 : // 1000 * 60                                                          // 3087
            units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60                                                      // 3088
            units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst                       // 3089
            units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst                 // 3090
            delta;                                                                                                   // 3091
    }                                                                                                                // 3092
    return asFloat ? output : absFloor(output);                                                                      // 3093
}                                                                                                                    // 3094
                                                                                                                     // 3095
function monthDiff (a, b) {                                                                                          // 3096
    // difference in months                                                                                          // 3097
    var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),                                     // 3098
        // b is in (anchor - 1 month, anchor + 1 month)                                                              // 3099
        anchor = a.clone().add(wholeMonthDiff, 'months'),                                                            // 3100
        anchor2, adjust;                                                                                             // 3101
                                                                                                                     // 3102
    if (b - anchor < 0) {                                                                                            // 3103
        anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');                                                       // 3104
        // linear across the month                                                                                   // 3105
        adjust = (b - anchor) / (anchor - anchor2);                                                                  // 3106
    } else {                                                                                                         // 3107
        anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');                                                       // 3108
        // linear across the month                                                                                   // 3109
        adjust = (b - anchor) / (anchor2 - anchor);                                                                  // 3110
    }                                                                                                                // 3111
                                                                                                                     // 3112
    //check for negative zero, return zero if negative zero                                                          // 3113
    return -(wholeMonthDiff + adjust) || 0;                                                                          // 3114
}                                                                                                                    // 3115
                                                                                                                     // 3116
hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';                                                                        // 3117
hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';                                                                   // 3118
                                                                                                                     // 3119
function toString () {                                                                                               // 3120
    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');                                     // 3121
}                                                                                                                    // 3122
                                                                                                                     // 3123
function toISOString () {                                                                                            // 3124
    var m = this.clone().utc();                                                                                      // 3125
    if (0 < m.year() && m.year() <= 9999) {                                                                          // 3126
        if (isFunction(Date.prototype.toISOString)) {                                                                // 3127
            // native implementation is ~50x faster, use it when we can                                              // 3128
            return this.toDate().toISOString();                                                                      // 3129
        } else {                                                                                                     // 3130
            return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');                                                  // 3131
        }                                                                                                            // 3132
    } else {                                                                                                         // 3133
        return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');                                                    // 3134
    }                                                                                                                // 3135
}                                                                                                                    // 3136
                                                                                                                     // 3137
/**                                                                                                                  // 3138
 * Return a human readable representation of a moment that can                                                       // 3139
 * also be evaluated to get a new moment which is the same                                                           // 3140
 *                                                                                                                   // 3141
 * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects                   // 3142
 */                                                                                                                  // 3143
function inspect () {                                                                                                // 3144
    if (!this.isValid()) {                                                                                           // 3145
        return 'moment.invalid(/* ' + this._i + ' */)';                                                              // 3146
    }                                                                                                                // 3147
    var func = 'moment';                                                                                             // 3148
    var zone = '';                                                                                                   // 3149
    if (!this.isLocal()) {                                                                                           // 3150
        func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';                                           // 3151
        zone = 'Z';                                                                                                  // 3152
    }                                                                                                                // 3153
    var prefix = '[' + func + '("]';                                                                                 // 3154
    var year = (0 < this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';                                         // 3155
    var datetime = '-MM-DD[T]HH:mm:ss.SSS';                                                                          // 3156
    var suffix = zone + '[")]';                                                                                      // 3157
                                                                                                                     // 3158
    return this.format(prefix + year + datetime + suffix);                                                           // 3159
}                                                                                                                    // 3160
                                                                                                                     // 3161
function format (inputString) {                                                                                      // 3162
    if (!inputString) {                                                                                              // 3163
        inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;                                   // 3164
    }                                                                                                                // 3165
    var output = formatMoment(this, inputString);                                                                    // 3166
    return this.localeData().postformat(output);                                                                     // 3167
}                                                                                                                    // 3168
                                                                                                                     // 3169
function from (time, withoutSuffix) {                                                                                // 3170
    if (this.isValid() &&                                                                                            // 3171
            ((isMoment(time) && time.isValid()) ||                                                                   // 3172
             createLocal(time).isValid())) {                                                                         // 3173
        return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);                // 3174
    } else {                                                                                                         // 3175
        return this.localeData().invalidDate();                                                                      // 3176
    }                                                                                                                // 3177
}                                                                                                                    // 3178
                                                                                                                     // 3179
function fromNow (withoutSuffix) {                                                                                   // 3180
    return this.from(createLocal(), withoutSuffix);                                                                  // 3181
}                                                                                                                    // 3182
                                                                                                                     // 3183
function to (time, withoutSuffix) {                                                                                  // 3184
    if (this.isValid() &&                                                                                            // 3185
            ((isMoment(time) && time.isValid()) ||                                                                   // 3186
             createLocal(time).isValid())) {                                                                         // 3187
        return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);                // 3188
    } else {                                                                                                         // 3189
        return this.localeData().invalidDate();                                                                      // 3190
    }                                                                                                                // 3191
}                                                                                                                    // 3192
                                                                                                                     // 3193
function toNow (withoutSuffix) {                                                                                     // 3194
    return this.to(createLocal(), withoutSuffix);                                                                    // 3195
}                                                                                                                    // 3196
                                                                                                                     // 3197
// If passed a locale key, it will set the locale for this                                                           // 3198
// instance.  Otherwise, it will return the locale configuration                                                     // 3199
// variables for this instance.                                                                                      // 3200
function locale (key) {                                                                                              // 3201
    var newLocaleData;                                                                                               // 3202
                                                                                                                     // 3203
    if (key === undefined) {                                                                                         // 3204
        return this._locale._abbr;                                                                                   // 3205
    } else {                                                                                                         // 3206
        newLocaleData = getLocale(key);                                                                              // 3207
        if (newLocaleData != null) {                                                                                 // 3208
            this._locale = newLocaleData;                                                                            // 3209
        }                                                                                                            // 3210
        return this;                                                                                                 // 3211
    }                                                                                                                // 3212
}                                                                                                                    // 3213
                                                                                                                     // 3214
var lang = deprecate(                                                                                                // 3215
    'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
    function (key) {                                                                                                 // 3217
        if (key === undefined) {                                                                                     // 3218
            return this.localeData();                                                                                // 3219
        } else {                                                                                                     // 3220
            return this.locale(key);                                                                                 // 3221
        }                                                                                                            // 3222
    }                                                                                                                // 3223
);                                                                                                                   // 3224
                                                                                                                     // 3225
function localeData () {                                                                                             // 3226
    return this._locale;                                                                                             // 3227
}                                                                                                                    // 3228
                                                                                                                     // 3229
function startOf (units) {                                                                                           // 3230
    units = normalizeUnits(units);                                                                                   // 3231
    // the following switch intentionally omits break keywords                                                       // 3232
    // to utilize falling through the cases.                                                                         // 3233
    switch (units) {                                                                                                 // 3234
        case 'year':                                                                                                 // 3235
            this.month(0);                                                                                           // 3236
            /* falls through */                                                                                      // 3237
        case 'quarter':                                                                                              // 3238
        case 'month':                                                                                                // 3239
            this.date(1);                                                                                            // 3240
            /* falls through */                                                                                      // 3241
        case 'week':                                                                                                 // 3242
        case 'isoWeek':                                                                                              // 3243
        case 'day':                                                                                                  // 3244
        case 'date':                                                                                                 // 3245
            this.hours(0);                                                                                           // 3246
            /* falls through */                                                                                      // 3247
        case 'hour':                                                                                                 // 3248
            this.minutes(0);                                                                                         // 3249
            /* falls through */                                                                                      // 3250
        case 'minute':                                                                                               // 3251
            this.seconds(0);                                                                                         // 3252
            /* falls through */                                                                                      // 3253
        case 'second':                                                                                               // 3254
            this.milliseconds(0);                                                                                    // 3255
    }                                                                                                                // 3256
                                                                                                                     // 3257
    // weeks are a special case                                                                                      // 3258
    if (units === 'week') {                                                                                          // 3259
        this.weekday(0);                                                                                             // 3260
    }                                                                                                                // 3261
    if (units === 'isoWeek') {                                                                                       // 3262
        this.isoWeekday(1);                                                                                          // 3263
    }                                                                                                                // 3264
                                                                                                                     // 3265
    // quarters are also special                                                                                     // 3266
    if (units === 'quarter') {                                                                                       // 3267
        this.month(Math.floor(this.month() / 3) * 3);                                                                // 3268
    }                                                                                                                // 3269
                                                                                                                     // 3270
    return this;                                                                                                     // 3271
}                                                                                                                    // 3272
                                                                                                                     // 3273
function endOf (units) {                                                                                             // 3274
    units = normalizeUnits(units);                                                                                   // 3275
    if (units === undefined || units === 'millisecond') {                                                            // 3276
        return this;                                                                                                 // 3277
    }                                                                                                                // 3278
                                                                                                                     // 3279
    // 'date' is an alias for 'day', so it should be considered as such.                                             // 3280
    if (units === 'date') {                                                                                          // 3281
        units = 'day';                                                                                               // 3282
    }                                                                                                                // 3283
                                                                                                                     // 3284
    return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');                     // 3285
}                                                                                                                    // 3286
                                                                                                                     // 3287
function valueOf () {                                                                                                // 3288
    return this._d.valueOf() - ((this._offset || 0) * 60000);                                                        // 3289
}                                                                                                                    // 3290
                                                                                                                     // 3291
function unix () {                                                                                                   // 3292
    return Math.floor(this.valueOf() / 1000);                                                                        // 3293
}                                                                                                                    // 3294
                                                                                                                     // 3295
function toDate () {                                                                                                 // 3296
    return new Date(this.valueOf());                                                                                 // 3297
}                                                                                                                    // 3298
                                                                                                                     // 3299
function toArray () {                                                                                                // 3300
    var m = this;                                                                                                    // 3301
    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];                       // 3302
}                                                                                                                    // 3303
                                                                                                                     // 3304
function toObject () {                                                                                               // 3305
    var m = this;                                                                                                    // 3306
    return {                                                                                                         // 3307
        years: m.year(),                                                                                             // 3308
        months: m.month(),                                                                                           // 3309
        date: m.date(),                                                                                              // 3310
        hours: m.hours(),                                                                                            // 3311
        minutes: m.minutes(),                                                                                        // 3312
        seconds: m.seconds(),                                                                                        // 3313
        milliseconds: m.milliseconds()                                                                               // 3314
    };                                                                                                               // 3315
}                                                                                                                    // 3316
                                                                                                                     // 3317
function toJSON () {                                                                                                 // 3318
    // new Date(NaN).toJSON() === null                                                                               // 3319
    return this.isValid() ? this.toISOString() : null;                                                               // 3320
}                                                                                                                    // 3321
                                                                                                                     // 3322
function isValid$1 () {                                                                                              // 3323
    return isValid(this);                                                                                            // 3324
}                                                                                                                    // 3325
                                                                                                                     // 3326
function parsingFlags () {                                                                                           // 3327
    return extend({}, getParsingFlags(this));                                                                        // 3328
}                                                                                                                    // 3329
                                                                                                                     // 3330
function invalidAt () {                                                                                              // 3331
    return getParsingFlags(this).overflow;                                                                           // 3332
}                                                                                                                    // 3333
                                                                                                                     // 3334
function creationData() {                                                                                            // 3335
    return {                                                                                                         // 3336
        input: this._i,                                                                                              // 3337
        format: this._f,                                                                                             // 3338
        locale: this._locale,                                                                                        // 3339
        isUTC: this._isUTC,                                                                                          // 3340
        strict: this._strict                                                                                         // 3341
    };                                                                                                               // 3342
}                                                                                                                    // 3343
                                                                                                                     // 3344
// FORMATTING                                                                                                        // 3345
                                                                                                                     // 3346
addFormatToken(0, ['gg', 2], 0, function () {                                                                        // 3347
    return this.weekYear() % 100;                                                                                    // 3348
});                                                                                                                  // 3349
                                                                                                                     // 3350
addFormatToken(0, ['GG', 2], 0, function () {                                                                        // 3351
    return this.isoWeekYear() % 100;                                                                                 // 3352
});                                                                                                                  // 3353
                                                                                                                     // 3354
function addWeekYearFormatToken (token, getter) {                                                                    // 3355
    addFormatToken(0, [token, token.length], 0, getter);                                                             // 3356
}                                                                                                                    // 3357
                                                                                                                     // 3358
addWeekYearFormatToken('gggg',     'weekYear');                                                                      // 3359
addWeekYearFormatToken('ggggg',    'weekYear');                                                                      // 3360
addWeekYearFormatToken('GGGG',  'isoWeekYear');                                                                      // 3361
addWeekYearFormatToken('GGGGG', 'isoWeekYear');                                                                      // 3362
                                                                                                                     // 3363
// ALIASES                                                                                                           // 3364
                                                                                                                     // 3365
addUnitAlias('weekYear', 'gg');                                                                                      // 3366
addUnitAlias('isoWeekYear', 'GG');                                                                                   // 3367
                                                                                                                     // 3368
// PRIORITY                                                                                                          // 3369
                                                                                                                     // 3370
addUnitPriority('weekYear', 1);                                                                                      // 3371
addUnitPriority('isoWeekYear', 1);                                                                                   // 3372
                                                                                                                     // 3373
                                                                                                                     // 3374
// PARSING                                                                                                           // 3375
                                                                                                                     // 3376
addRegexToken('G',      matchSigned);                                                                                // 3377
addRegexToken('g',      matchSigned);                                                                                // 3378
addRegexToken('GG',     match1to2, match2);                                                                          // 3379
addRegexToken('gg',     match1to2, match2);                                                                          // 3380
addRegexToken('GGGG',   match1to4, match4);                                                                          // 3381
addRegexToken('gggg',   match1to4, match4);                                                                          // 3382
addRegexToken('GGGGG',  match1to6, match6);                                                                          // 3383
addRegexToken('ggggg',  match1to6, match6);                                                                          // 3384
                                                                                                                     // 3385
addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {                        // 3386
    week[token.substr(0, 2)] = toInt(input);                                                                         // 3387
});                                                                                                                  // 3388
                                                                                                                     // 3389
addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {                                              // 3390
    week[token] = hooks.parseTwoDigitYear(input);                                                                    // 3391
});                                                                                                                  // 3392
                                                                                                                     // 3393
// MOMENTS                                                                                                           // 3394
                                                                                                                     // 3395
function getSetWeekYear (input) {                                                                                    // 3396
    return getSetWeekYearHelper.call(this,                                                                           // 3397
            input,                                                                                                   // 3398
            this.week(),                                                                                             // 3399
            this.weekday(),                                                                                          // 3400
            this.localeData()._week.dow,                                                                             // 3401
            this.localeData()._week.doy);                                                                            // 3402
}                                                                                                                    // 3403
                                                                                                                     // 3404
function getSetISOWeekYear (input) {                                                                                 // 3405
    return getSetWeekYearHelper.call(this,                                                                           // 3406
            input, this.isoWeek(), this.isoWeekday(), 1, 4);                                                         // 3407
}                                                                                                                    // 3408
                                                                                                                     // 3409
function getISOWeeksInYear () {                                                                                      // 3410
    return weeksInYear(this.year(), 1, 4);                                                                           // 3411
}                                                                                                                    // 3412
                                                                                                                     // 3413
function getWeeksInYear () {                                                                                         // 3414
    var weekInfo = this.localeData()._week;                                                                          // 3415
    return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);                                                     // 3416
}                                                                                                                    // 3417
                                                                                                                     // 3418
function getSetWeekYearHelper(input, week, weekday, dow, doy) {                                                      // 3419
    var weeksTarget;                                                                                                 // 3420
    if (input == null) {                                                                                             // 3421
        return weekOfYear(this, dow, doy).year;                                                                      // 3422
    } else {                                                                                                         // 3423
        weeksTarget = weeksInYear(input, dow, doy);                                                                  // 3424
        if (week > weeksTarget) {                                                                                    // 3425
            week = weeksTarget;                                                                                      // 3426
        }                                                                                                            // 3427
        return setWeekAll.call(this, input, week, weekday, dow, doy);                                                // 3428
    }                                                                                                                // 3429
}                                                                                                                    // 3430
                                                                                                                     // 3431
function setWeekAll(weekYear, week, weekday, dow, doy) {                                                             // 3432
    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),                                       // 3433
        date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);                                        // 3434
                                                                                                                     // 3435
    this.year(date.getUTCFullYear());                                                                                // 3436
    this.month(date.getUTCMonth());                                                                                  // 3437
    this.date(date.getUTCDate());                                                                                    // 3438
    return this;                                                                                                     // 3439
}                                                                                                                    // 3440
                                                                                                                     // 3441
// FORMATTING                                                                                                        // 3442
                                                                                                                     // 3443
addFormatToken('Q', 0, 'Qo', 'quarter');                                                                             // 3444
                                                                                                                     // 3445
// ALIASES                                                                                                           // 3446
                                                                                                                     // 3447
addUnitAlias('quarter', 'Q');                                                                                        // 3448
                                                                                                                     // 3449
// PRIORITY                                                                                                          // 3450
                                                                                                                     // 3451
addUnitPriority('quarter', 7);                                                                                       // 3452
                                                                                                                     // 3453
// PARSING                                                                                                           // 3454
                                                                                                                     // 3455
addRegexToken('Q', match1);                                                                                          // 3456
addParseToken('Q', function (input, array) {                                                                         // 3457
    array[MONTH] = (toInt(input) - 1) * 3;                                                                           // 3458
});                                                                                                                  // 3459
                                                                                                                     // 3460
// MOMENTS                                                                                                           // 3461
                                                                                                                     // 3462
function getSetQuarter (input) {                                                                                     // 3463
    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);       // 3464
}                                                                                                                    // 3465
                                                                                                                     // 3466
// FORMATTING                                                                                                        // 3467
                                                                                                                     // 3468
addFormatToken('D', ['DD', 2], 'Do', 'date');                                                                        // 3469
                                                                                                                     // 3470
// ALIASES                                                                                                           // 3471
                                                                                                                     // 3472
addUnitAlias('date', 'D');                                                                                           // 3473
                                                                                                                     // 3474
// PRIOROITY                                                                                                         // 3475
addUnitPriority('date', 9);                                                                                          // 3476
                                                                                                                     // 3477
// PARSING                                                                                                           // 3478
                                                                                                                     // 3479
addRegexToken('D',  match1to2);                                                                                      // 3480
addRegexToken('DD', match1to2, match2);                                                                              // 3481
addRegexToken('Do', function (isStrict, locale) {                                                                    // 3482
    return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;                                            // 3483
});                                                                                                                  // 3484
                                                                                                                     // 3485
addParseToken(['D', 'DD'], DATE);                                                                                    // 3486
addParseToken('Do', function (input, array) {                                                                        // 3487
    array[DATE] = toInt(input.match(match1to2)[0], 10);                                                              // 3488
});                                                                                                                  // 3489
                                                                                                                     // 3490
// MOMENTS                                                                                                           // 3491
                                                                                                                     // 3492
var getSetDayOfMonth = makeGetSet('Date', true);                                                                     // 3493
                                                                                                                     // 3494
// FORMATTING                                                                                                        // 3495
                                                                                                                     // 3496
addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');                                                             // 3497
                                                                                                                     // 3498
// ALIASES                                                                                                           // 3499
                                                                                                                     // 3500
addUnitAlias('dayOfYear', 'DDD');                                                                                    // 3501
                                                                                                                     // 3502
// PRIORITY                                                                                                          // 3503
addUnitPriority('dayOfYear', 4);                                                                                     // 3504
                                                                                                                     // 3505
// PARSING                                                                                                           // 3506
                                                                                                                     // 3507
addRegexToken('DDD',  match1to3);                                                                                    // 3508
addRegexToken('DDDD', match3);                                                                                       // 3509
addParseToken(['DDD', 'DDDD'], function (input, array, config) {                                                     // 3510
    config._dayOfYear = toInt(input);                                                                                // 3511
});                                                                                                                  // 3512
                                                                                                                     // 3513
// HELPERS                                                                                                           // 3514
                                                                                                                     // 3515
// MOMENTS                                                                                                           // 3516
                                                                                                                     // 3517
function getSetDayOfYear (input) {                                                                                   // 3518
    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;            // 3519
    return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');                                           // 3520
}                                                                                                                    // 3521
                                                                                                                     // 3522
// FORMATTING                                                                                                        // 3523
                                                                                                                     // 3524
addFormatToken('m', ['mm', 2], 0, 'minute');                                                                         // 3525
                                                                                                                     // 3526
// ALIASES                                                                                                           // 3527
                                                                                                                     // 3528
addUnitAlias('minute', 'm');                                                                                         // 3529
                                                                                                                     // 3530
// PRIORITY                                                                                                          // 3531
                                                                                                                     // 3532
addUnitPriority('minute', 14);                                                                                       // 3533
                                                                                                                     // 3534
// PARSING                                                                                                           // 3535
                                                                                                                     // 3536
addRegexToken('m',  match1to2);                                                                                      // 3537
addRegexToken('mm', match1to2, match2);                                                                              // 3538
addParseToken(['m', 'mm'], MINUTE);                                                                                  // 3539
                                                                                                                     // 3540
// MOMENTS                                                                                                           // 3541
                                                                                                                     // 3542
var getSetMinute = makeGetSet('Minutes', false);                                                                     // 3543
                                                                                                                     // 3544
// FORMATTING                                                                                                        // 3545
                                                                                                                     // 3546
addFormatToken('s', ['ss', 2], 0, 'second');                                                                         // 3547
                                                                                                                     // 3548
// ALIASES                                                                                                           // 3549
                                                                                                                     // 3550
addUnitAlias('second', 's');                                                                                         // 3551
                                                                                                                     // 3552
// PRIORITY                                                                                                          // 3553
                                                                                                                     // 3554
addUnitPriority('second', 15);                                                                                       // 3555
                                                                                                                     // 3556
// PARSING                                                                                                           // 3557
                                                                                                                     // 3558
addRegexToken('s',  match1to2);                                                                                      // 3559
addRegexToken('ss', match1to2, match2);                                                                              // 3560
addParseToken(['s', 'ss'], SECOND);                                                                                  // 3561
                                                                                                                     // 3562
// MOMENTS                                                                                                           // 3563
                                                                                                                     // 3564
var getSetSecond = makeGetSet('Seconds', false);                                                                     // 3565
                                                                                                                     // 3566
// FORMATTING                                                                                                        // 3567
                                                                                                                     // 3568
addFormatToken('S', 0, 0, function () {                                                                              // 3569
    return ~~(this.millisecond() / 100);                                                                             // 3570
});                                                                                                                  // 3571
                                                                                                                     // 3572
addFormatToken(0, ['SS', 2], 0, function () {                                                                        // 3573
    return ~~(this.millisecond() / 10);                                                                              // 3574
});                                                                                                                  // 3575
                                                                                                                     // 3576
addFormatToken(0, ['SSS', 3], 0, 'millisecond');                                                                     // 3577
addFormatToken(0, ['SSSS', 4], 0, function () {                                                                      // 3578
    return this.millisecond() * 10;                                                                                  // 3579
});                                                                                                                  // 3580
addFormatToken(0, ['SSSSS', 5], 0, function () {                                                                     // 3581
    return this.millisecond() * 100;                                                                                 // 3582
});                                                                                                                  // 3583
addFormatToken(0, ['SSSSSS', 6], 0, function () {                                                                    // 3584
    return this.millisecond() * 1000;                                                                                // 3585
});                                                                                                                  // 3586
addFormatToken(0, ['SSSSSSS', 7], 0, function () {                                                                   // 3587
    return this.millisecond() * 10000;                                                                               // 3588
});                                                                                                                  // 3589
addFormatToken(0, ['SSSSSSSS', 8], 0, function () {                                                                  // 3590
    return this.millisecond() * 100000;                                                                              // 3591
});                                                                                                                  // 3592
addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {                                                                 // 3593
    return this.millisecond() * 1000000;                                                                             // 3594
});                                                                                                                  // 3595
                                                                                                                     // 3596
                                                                                                                     // 3597
// ALIASES                                                                                                           // 3598
                                                                                                                     // 3599
addUnitAlias('millisecond', 'ms');                                                                                   // 3600
                                                                                                                     // 3601
// PRIORITY                                                                                                          // 3602
                                                                                                                     // 3603
addUnitPriority('millisecond', 16);                                                                                  // 3604
                                                                                                                     // 3605
// PARSING                                                                                                           // 3606
                                                                                                                     // 3607
addRegexToken('S',    match1to3, match1);                                                                            // 3608
addRegexToken('SS',   match1to3, match2);                                                                            // 3609
addRegexToken('SSS',  match1to3, match3);                                                                            // 3610
                                                                                                                     // 3611
var token;                                                                                                           // 3612
for (token = 'SSSS'; token.length <= 9; token += 'S') {                                                              // 3613
    addRegexToken(token, matchUnsigned);                                                                             // 3614
}                                                                                                                    // 3615
                                                                                                                     // 3616
function parseMs(input, array) {                                                                                     // 3617
    array[MILLISECOND] = toInt(('0.' + input) * 1000);                                                               // 3618
}                                                                                                                    // 3619
                                                                                                                     // 3620
for (token = 'S'; token.length <= 9; token += 'S') {                                                                 // 3621
    addParseToken(token, parseMs);                                                                                   // 3622
}                                                                                                                    // 3623
// MOMENTS                                                                                                           // 3624
                                                                                                                     // 3625
var getSetMillisecond = makeGetSet('Milliseconds', false);                                                           // 3626
                                                                                                                     // 3627
// FORMATTING                                                                                                        // 3628
                                                                                                                     // 3629
addFormatToken('z',  0, 0, 'zoneAbbr');                                                                              // 3630
addFormatToken('zz', 0, 0, 'zoneName');                                                                              // 3631
                                                                                                                     // 3632
// MOMENTS                                                                                                           // 3633
                                                                                                                     // 3634
function getZoneAbbr () {                                                                                            // 3635
    return this._isUTC ? 'UTC' : '';                                                                                 // 3636
}                                                                                                                    // 3637
                                                                                                                     // 3638
function getZoneName () {                                                                                            // 3639
    return this._isUTC ? 'Coordinated Universal Time' : '';                                                          // 3640
}                                                                                                                    // 3641
                                                                                                                     // 3642
var proto = Moment.prototype;                                                                                        // 3643
                                                                                                                     // 3644
proto.add               = add;                                                                                       // 3645
proto.calendar          = calendar$1;                                                                                // 3646
proto.clone             = clone;                                                                                     // 3647
proto.diff              = diff;                                                                                      // 3648
proto.endOf             = endOf;                                                                                     // 3649
proto.format            = format;                                                                                    // 3650
proto.from              = from;                                                                                      // 3651
proto.fromNow           = fromNow;                                                                                   // 3652
proto.to                = to;                                                                                        // 3653
proto.toNow             = toNow;                                                                                     // 3654
proto.get               = stringGet;                                                                                 // 3655
proto.invalidAt         = invalidAt;                                                                                 // 3656
proto.isAfter           = isAfter;                                                                                   // 3657
proto.isBefore          = isBefore;                                                                                  // 3658
proto.isBetween         = isBetween;                                                                                 // 3659
proto.isSame            = isSame;                                                                                    // 3660
proto.isSameOrAfter     = isSameOrAfter;                                                                             // 3661
proto.isSameOrBefore    = isSameOrBefore;                                                                            // 3662
proto.isValid           = isValid$1;                                                                                 // 3663
proto.lang              = lang;                                                                                      // 3664
proto.locale            = locale;                                                                                    // 3665
proto.localeData        = localeData;                                                                                // 3666
proto.max               = prototypeMax;                                                                              // 3667
proto.min               = prototypeMin;                                                                              // 3668
proto.parsingFlags      = parsingFlags;                                                                              // 3669
proto.set               = stringSet;                                                                                 // 3670
proto.startOf           = startOf;                                                                                   // 3671
proto.subtract          = subtract;                                                                                  // 3672
proto.toArray           = toArray;                                                                                   // 3673
proto.toObject          = toObject;                                                                                  // 3674
proto.toDate            = toDate;                                                                                    // 3675
proto.toISOString       = toISOString;                                                                               // 3676
proto.inspect           = inspect;                                                                                   // 3677
proto.toJSON            = toJSON;                                                                                    // 3678
proto.toString          = toString;                                                                                  // 3679
proto.unix              = unix;                                                                                      // 3680
proto.valueOf           = valueOf;                                                                                   // 3681
proto.creationData      = creationData;                                                                              // 3682
                                                                                                                     // 3683
// Year                                                                                                              // 3684
proto.year       = getSetYear;                                                                                       // 3685
proto.isLeapYear = getIsLeapYear;                                                                                    // 3686
                                                                                                                     // 3687
// Week Year                                                                                                         // 3688
proto.weekYear    = getSetWeekYear;                                                                                  // 3689
proto.isoWeekYear = getSetISOWeekYear;                                                                               // 3690
                                                                                                                     // 3691
// Quarter                                                                                                           // 3692
proto.quarter = proto.quarters = getSetQuarter;                                                                      // 3693
                                                                                                                     // 3694
// Month                                                                                                             // 3695
proto.month       = getSetMonth;                                                                                     // 3696
proto.daysInMonth = getDaysInMonth;                                                                                  // 3697
                                                                                                                     // 3698
// Week                                                                                                              // 3699
proto.week           = proto.weeks        = getSetWeek;                                                              // 3700
proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;                                                           // 3701
proto.weeksInYear    = getWeeksInYear;                                                                               // 3702
proto.isoWeeksInYear = getISOWeeksInYear;                                                                            // 3703
                                                                                                                     // 3704
// Day                                                                                                               // 3705
proto.date       = getSetDayOfMonth;                                                                                 // 3706
proto.day        = proto.days             = getSetDayOfWeek;                                                         // 3707
proto.weekday    = getSetLocaleDayOfWeek;                                                                            // 3708
proto.isoWeekday = getSetISODayOfWeek;                                                                               // 3709
proto.dayOfYear  = getSetDayOfYear;                                                                                  // 3710
                                                                                                                     // 3711
// Hour                                                                                                              // 3712
proto.hour = proto.hours = getSetHour;                                                                               // 3713
                                                                                                                     // 3714
// Minute                                                                                                            // 3715
proto.minute = proto.minutes = getSetMinute;                                                                         // 3716
                                                                                                                     // 3717
// Second                                                                                                            // 3718
proto.second = proto.seconds = getSetSecond;                                                                         // 3719
                                                                                                                     // 3720
// Millisecond                                                                                                       // 3721
proto.millisecond = proto.milliseconds = getSetMillisecond;                                                          // 3722
                                                                                                                     // 3723
// Offset                                                                                                            // 3724
proto.utcOffset            = getSetOffset;                                                                           // 3725
proto.utc                  = setOffsetToUTC;                                                                         // 3726
proto.local                = setOffsetToLocal;                                                                       // 3727
proto.parseZone            = setOffsetToParsedOffset;                                                                // 3728
proto.hasAlignedHourOffset = hasAlignedHourOffset;                                                                   // 3729
proto.isDST                = isDaylightSavingTime;                                                                   // 3730
proto.isLocal              = isLocal;                                                                                // 3731
proto.isUtcOffset          = isUtcOffset;                                                                            // 3732
proto.isUtc                = isUtc;                                                                                  // 3733
proto.isUTC                = isUtc;                                                                                  // 3734
                                                                                                                     // 3735
// Timezone                                                                                                          // 3736
proto.zoneAbbr = getZoneAbbr;                                                                                        // 3737
proto.zoneName = getZoneName;                                                                                        // 3738
                                                                                                                     // 3739
// Deprecations                                                                                                      // 3740
proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);                       // 3741
proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);                           // 3742
proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);                              // 3743
proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);
                                                                                                                     // 3746
function createUnix (input) {                                                                                        // 3747
    return createLocal(input * 1000);                                                                                // 3748
}                                                                                                                    // 3749
                                                                                                                     // 3750
function createInZone () {                                                                                           // 3751
    return createLocal.apply(null, arguments).parseZone();                                                           // 3752
}                                                                                                                    // 3753
                                                                                                                     // 3754
function preParsePostFormat (string) {                                                                               // 3755
    return string;                                                                                                   // 3756
}                                                                                                                    // 3757
                                                                                                                     // 3758
var proto$1 = Locale.prototype;                                                                                      // 3759
                                                                                                                     // 3760
proto$1.calendar        = calendar;                                                                                  // 3761
proto$1.longDateFormat  = longDateFormat;                                                                            // 3762
proto$1.invalidDate     = invalidDate;                                                                               // 3763
proto$1.ordinal         = ordinal;                                                                                   // 3764
proto$1.preparse        = preParsePostFormat;                                                                        // 3765
proto$1.postformat      = preParsePostFormat;                                                                        // 3766
proto$1.relativeTime    = relativeTime;                                                                              // 3767
proto$1.pastFuture      = pastFuture;                                                                                // 3768
proto$1.set             = set;                                                                                       // 3769
                                                                                                                     // 3770
// Month                                                                                                             // 3771
proto$1.months            =        localeMonths;                                                                     // 3772
proto$1.monthsShort       =        localeMonthsShort;                                                                // 3773
proto$1.monthsParse       =        localeMonthsParse;                                                                // 3774
proto$1.monthsRegex       = monthsRegex;                                                                             // 3775
proto$1.monthsShortRegex  = monthsShortRegex;                                                                        // 3776
                                                                                                                     // 3777
// Week                                                                                                              // 3778
proto$1.week = localeWeek;                                                                                           // 3779
proto$1.firstDayOfYear = localeFirstDayOfYear;                                                                       // 3780
proto$1.firstDayOfWeek = localeFirstDayOfWeek;                                                                       // 3781
                                                                                                                     // 3782
// Day of Week                                                                                                       // 3783
proto$1.weekdays       =        localeWeekdays;                                                                      // 3784
proto$1.weekdaysMin    =        localeWeekdaysMin;                                                                   // 3785
proto$1.weekdaysShort  =        localeWeekdaysShort;                                                                 // 3786
proto$1.weekdaysParse  =        localeWeekdaysParse;                                                                 // 3787
                                                                                                                     // 3788
proto$1.weekdaysRegex       =        weekdaysRegex;                                                                  // 3789
proto$1.weekdaysShortRegex  =        weekdaysShortRegex;                                                             // 3790
proto$1.weekdaysMinRegex    =        weekdaysMinRegex;                                                               // 3791
                                                                                                                     // 3792
// Hours                                                                                                             // 3793
proto$1.isPM = localeIsPM;                                                                                           // 3794
proto$1.meridiem = localeMeridiem;                                                                                   // 3795
                                                                                                                     // 3796
function get$1 (format, index, field, setter) {                                                                      // 3797
    var locale = getLocale();                                                                                        // 3798
    var utc = createUTC().set(setter, index);                                                                        // 3799
    return locale[field](utc, format);                                                                               // 3800
}                                                                                                                    // 3801
                                                                                                                     // 3802
function listMonthsImpl (format, index, field) {                                                                     // 3803
    if (isNumber(format)) {                                                                                          // 3804
        index = format;                                                                                              // 3805
        format = undefined;                                                                                          // 3806
    }                                                                                                                // 3807
                                                                                                                     // 3808
    format = format || '';                                                                                           // 3809
                                                                                                                     // 3810
    if (index != null) {                                                                                             // 3811
        return get$1(format, index, field, 'month');                                                                 // 3812
    }                                                                                                                // 3813
                                                                                                                     // 3814
    var i;                                                                                                           // 3815
    var out = [];                                                                                                    // 3816
    for (i = 0; i < 12; i++) {                                                                                       // 3817
        out[i] = get$1(format, i, field, 'month');                                                                   // 3818
    }                                                                                                                // 3819
    return out;                                                                                                      // 3820
}                                                                                                                    // 3821
                                                                                                                     // 3822
// ()                                                                                                                // 3823
// (5)                                                                                                               // 3824
// (fmt, 5)                                                                                                          // 3825
// (fmt)                                                                                                             // 3826
// (true)                                                                                                            // 3827
// (true, 5)                                                                                                         // 3828
// (true, fmt, 5)                                                                                                    // 3829
// (true, fmt)                                                                                                       // 3830
function listWeekdaysImpl (localeSorted, format, index, field) {                                                     // 3831
    if (typeof localeSorted === 'boolean') {                                                                         // 3832
        if (isNumber(format)) {                                                                                      // 3833
            index = format;                                                                                          // 3834
            format = undefined;                                                                                      // 3835
        }                                                                                                            // 3836
                                                                                                                     // 3837
        format = format || '';                                                                                       // 3838
    } else {                                                                                                         // 3839
        format = localeSorted;                                                                                       // 3840
        index = format;                                                                                              // 3841
        localeSorted = false;                                                                                        // 3842
                                                                                                                     // 3843
        if (isNumber(format)) {                                                                                      // 3844
            index = format;                                                                                          // 3845
            format = undefined;                                                                                      // 3846
        }                                                                                                            // 3847
                                                                                                                     // 3848
        format = format || '';                                                                                       // 3849
    }                                                                                                                // 3850
                                                                                                                     // 3851
    var locale = getLocale(),                                                                                        // 3852
        shift = localeSorted ? locale._week.dow : 0;                                                                 // 3853
                                                                                                                     // 3854
    if (index != null) {                                                                                             // 3855
        return get$1(format, (index + shift) % 7, field, 'day');                                                     // 3856
    }                                                                                                                // 3857
                                                                                                                     // 3858
    var i;                                                                                                           // 3859
    var out = [];                                                                                                    // 3860
    for (i = 0; i < 7; i++) {                                                                                        // 3861
        out[i] = get$1(format, (i + shift) % 7, field, 'day');                                                       // 3862
    }                                                                                                                // 3863
    return out;                                                                                                      // 3864
}                                                                                                                    // 3865
                                                                                                                     // 3866
function listMonths (format, index) {                                                                                // 3867
    return listMonthsImpl(format, index, 'months');                                                                  // 3868
}                                                                                                                    // 3869
                                                                                                                     // 3870
function listMonthsShort (format, index) {                                                                           // 3871
    return listMonthsImpl(format, index, 'monthsShort');                                                             // 3872
}                                                                                                                    // 3873
                                                                                                                     // 3874
function listWeekdays (localeSorted, format, index) {                                                                // 3875
    return listWeekdaysImpl(localeSorted, format, index, 'weekdays');                                                // 3876
}                                                                                                                    // 3877
                                                                                                                     // 3878
function listWeekdaysShort (localeSorted, format, index) {                                                           // 3879
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');                                           // 3880
}                                                                                                                    // 3881
                                                                                                                     // 3882
function listWeekdaysMin (localeSorted, format, index) {                                                             // 3883
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');                                             // 3884
}                                                                                                                    // 3885
                                                                                                                     // 3886
getSetGlobalLocale('en', {                                                                                           // 3887
    ordinalParse: /\d{1,2}(th|st|nd|rd)/,                                                                            // 3888
    ordinal : function (number) {                                                                                    // 3889
        var b = number % 10,                                                                                         // 3890
            output = (toInt(number % 100 / 10) === 1) ? 'th' :                                                       // 3891
            (b === 1) ? 'st' :                                                                                       // 3892
            (b === 2) ? 'nd' :                                                                                       // 3893
            (b === 3) ? 'rd' : 'th';                                                                                 // 3894
        return number + output;                                                                                      // 3895
    }                                                                                                                // 3896
});                                                                                                                  // 3897
                                                                                                                     // 3898
// Side effect imports                                                                                               // 3899
hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);                 // 3900
hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);              // 3901
                                                                                                                     // 3902
var mathAbs = Math.abs;                                                                                              // 3903
                                                                                                                     // 3904
function abs () {                                                                                                    // 3905
    var data           = this._data;                                                                                 // 3906
                                                                                                                     // 3907
    this._milliseconds = mathAbs(this._milliseconds);                                                                // 3908
    this._days         = mathAbs(this._days);                                                                        // 3909
    this._months       = mathAbs(this._months);                                                                      // 3910
                                                                                                                     // 3911
    data.milliseconds  = mathAbs(data.milliseconds);                                                                 // 3912
    data.seconds       = mathAbs(data.seconds);                                                                      // 3913
    data.minutes       = mathAbs(data.minutes);                                                                      // 3914
    data.hours         = mathAbs(data.hours);                                                                        // 3915
    data.months        = mathAbs(data.months);                                                                       // 3916
    data.years         = mathAbs(data.years);                                                                        // 3917
                                                                                                                     // 3918
    return this;                                                                                                     // 3919
}                                                                                                                    // 3920
                                                                                                                     // 3921
function addSubtract$1 (duration, input, value, direction) {                                                         // 3922
    var other = createDuration(input, value);                                                                        // 3923
                                                                                                                     // 3924
    duration._milliseconds += direction * other._milliseconds;                                                       // 3925
    duration._days         += direction * other._days;                                                               // 3926
    duration._months       += direction * other._months;                                                             // 3927
                                                                                                                     // 3928
    return duration._bubble();                                                                                       // 3929
}                                                                                                                    // 3930
                                                                                                                     // 3931
// supports only 2.0-style add(1, 's') or add(duration)                                                              // 3932
function add$1 (input, value) {                                                                                      // 3933
    return addSubtract$1(this, input, value, 1);                                                                     // 3934
}                                                                                                                    // 3935
                                                                                                                     // 3936
// supports only 2.0-style subtract(1, 's') or subtract(duration)                                                    // 3937
function subtract$1 (input, value) {                                                                                 // 3938
    return addSubtract$1(this, input, value, -1);                                                                    // 3939
}                                                                                                                    // 3940
                                                                                                                     // 3941
function absCeil (number) {                                                                                          // 3942
    if (number < 0) {                                                                                                // 3943
        return Math.floor(number);                                                                                   // 3944
    } else {                                                                                                         // 3945
        return Math.ceil(number);                                                                                    // 3946
    }                                                                                                                // 3947
}                                                                                                                    // 3948
                                                                                                                     // 3949
function bubble () {                                                                                                 // 3950
    var milliseconds = this._milliseconds;                                                                           // 3951
    var days         = this._days;                                                                                   // 3952
    var months       = this._months;                                                                                 // 3953
    var data         = this._data;                                                                                   // 3954
    var seconds, minutes, hours, years, monthsFromDays;                                                              // 3955
                                                                                                                     // 3956
    // if we have a mix of positive and negative values, bubble down first                                           // 3957
    // check: https://github.com/moment/moment/issues/2166                                                           // 3958
    if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||                                                         // 3959
            (milliseconds <= 0 && days <= 0 && months <= 0))) {                                                      // 3960
        milliseconds += absCeil(monthsToDays(months) + days) * 864e5;                                                // 3961
        days = 0;                                                                                                    // 3962
        months = 0;                                                                                                  // 3963
    }                                                                                                                // 3964
                                                                                                                     // 3965
    // The following code bubbles up values, see the tests for                                                       // 3966
    // examples of what that means.                                                                                  // 3967
    data.milliseconds = milliseconds % 1000;                                                                         // 3968
                                                                                                                     // 3969
    seconds           = absFloor(milliseconds / 1000);                                                               // 3970
    data.seconds      = seconds % 60;                                                                                // 3971
                                                                                                                     // 3972
    minutes           = absFloor(seconds / 60);                                                                      // 3973
    data.minutes      = minutes % 60;                                                                                // 3974
                                                                                                                     // 3975
    hours             = absFloor(minutes / 60);                                                                      // 3976
    data.hours        = hours % 24;                                                                                  // 3977
                                                                                                                     // 3978
    days += absFloor(hours / 24);                                                                                    // 3979
                                                                                                                     // 3980
    // convert days to months                                                                                        // 3981
    monthsFromDays = absFloor(daysToMonths(days));                                                                   // 3982
    months += monthsFromDays;                                                                                        // 3983
    days -= absCeil(monthsToDays(monthsFromDays));                                                                   // 3984
                                                                                                                     // 3985
    // 12 months -> 1 year                                                                                           // 3986
    years = absFloor(months / 12);                                                                                   // 3987
    months %= 12;                                                                                                    // 3988
                                                                                                                     // 3989
    data.days   = days;                                                                                              // 3990
    data.months = months;                                                                                            // 3991
    data.years  = years;                                                                                             // 3992
                                                                                                                     // 3993
    return this;                                                                                                     // 3994
}                                                                                                                    // 3995
                                                                                                                     // 3996
function daysToMonths (days) {                                                                                       // 3997
    // 400 years have 146097 days (taking into account leap year rules)                                              // 3998
    // 400 years have 12 months === 4800                                                                             // 3999
    return days * 4800 / 146097;                                                                                     // 4000
}                                                                                                                    // 4001
                                                                                                                     // 4002
function monthsToDays (months) {                                                                                     // 4003
    // the reverse of daysToMonths                                                                                   // 4004
    return months * 146097 / 4800;                                                                                   // 4005
}                                                                                                                    // 4006
                                                                                                                     // 4007
function as (units) {                                                                                                // 4008
    var days;                                                                                                        // 4009
    var months;                                                                                                      // 4010
    var milliseconds = this._milliseconds;                                                                           // 4011
                                                                                                                     // 4012
    units = normalizeUnits(units);                                                                                   // 4013
                                                                                                                     // 4014
    if (units === 'month' || units === 'year') {                                                                     // 4015
        days   = this._days   + milliseconds / 864e5;                                                                // 4016
        months = this._months + daysToMonths(days);                                                                  // 4017
        return units === 'month' ? months : months / 12;                                                             // 4018
    } else {                                                                                                         // 4019
        // handle milliseconds separately because of floating point math errors (issue #1867)                        // 4020
        days = this._days + Math.round(monthsToDays(this._months));                                                  // 4021
        switch (units) {                                                                                             // 4022
            case 'week'   : return days / 7     + milliseconds / 6048e5;                                             // 4023
            case 'day'    : return days         + milliseconds / 864e5;                                              // 4024
            case 'hour'   : return days * 24    + milliseconds / 36e5;                                               // 4025
            case 'minute' : return days * 1440  + milliseconds / 6e4;                                                // 4026
            case 'second' : return days * 86400 + milliseconds / 1000;                                               // 4027
            // Math.floor prevents floating point math errors here                                                   // 4028
            case 'millisecond': return Math.floor(days * 864e5) + milliseconds;                                      // 4029
            default: throw new Error('Unknown unit ' + units);                                                       // 4030
        }                                                                                                            // 4031
    }                                                                                                                // 4032
}                                                                                                                    // 4033
                                                                                                                     // 4034
// TODO: Use this.as('ms')?                                                                                          // 4035
function valueOf$1 () {                                                                                              // 4036
    return (                                                                                                         // 4037
        this._milliseconds +                                                                                         // 4038
        this._days * 864e5 +                                                                                         // 4039
        (this._months % 12) * 2592e6 +                                                                               // 4040
        toInt(this._months / 12) * 31536e6                                                                           // 4041
    );                                                                                                               // 4042
}                                                                                                                    // 4043
                                                                                                                     // 4044
function makeAs (alias) {                                                                                            // 4045
    return function () {                                                                                             // 4046
        return this.as(alias);                                                                                       // 4047
    };                                                                                                               // 4048
}                                                                                                                    // 4049
                                                                                                                     // 4050
var asMilliseconds = makeAs('ms');                                                                                   // 4051
var asSeconds      = makeAs('s');                                                                                    // 4052
var asMinutes      = makeAs('m');                                                                                    // 4053
var asHours        = makeAs('h');                                                                                    // 4054
var asDays         = makeAs('d');                                                                                    // 4055
var asWeeks        = makeAs('w');                                                                                    // 4056
var asMonths       = makeAs('M');                                                                                    // 4057
var asYears        = makeAs('y');                                                                                    // 4058
                                                                                                                     // 4059
function get$2 (units) {                                                                                             // 4060
    units = normalizeUnits(units);                                                                                   // 4061
    return this[units + 's']();                                                                                      // 4062
}                                                                                                                    // 4063
                                                                                                                     // 4064
function makeGetter(name) {                                                                                          // 4065
    return function () {                                                                                             // 4066
        return this._data[name];                                                                                     // 4067
    };                                                                                                               // 4068
}                                                                                                                    // 4069
                                                                                                                     // 4070
var milliseconds = makeGetter('milliseconds');                                                                       // 4071
var seconds      = makeGetter('seconds');                                                                            // 4072
var minutes      = makeGetter('minutes');                                                                            // 4073
var hours        = makeGetter('hours');                                                                              // 4074
var days         = makeGetter('days');                                                                               // 4075
var months       = makeGetter('months');                                                                             // 4076
var years        = makeGetter('years');                                                                              // 4077
                                                                                                                     // 4078
function weeks () {                                                                                                  // 4079
    return absFloor(this.days() / 7);                                                                                // 4080
}                                                                                                                    // 4081
                                                                                                                     // 4082
var round = Math.round;                                                                                              // 4083
var thresholds = {                                                                                                   // 4084
    s: 45,  // seconds to minute                                                                                     // 4085
    m: 45,  // minutes to hour                                                                                       // 4086
    h: 22,  // hours to day                                                                                          // 4087
    d: 26,  // days to month                                                                                         // 4088
    M: 11   // months to year                                                                                        // 4089
};                                                                                                                   // 4090
                                                                                                                     // 4091
// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize                            // 4092
function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {                                        // 4093
    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);                                      // 4094
}                                                                                                                    // 4095
                                                                                                                     // 4096
function relativeTime$1 (posNegDuration, withoutSuffix, locale) {                                                    // 4097
    var duration = createDuration(posNegDuration).abs();                                                             // 4098
    var seconds  = round(duration.as('s'));                                                                          // 4099
    var minutes  = round(duration.as('m'));                                                                          // 4100
    var hours    = round(duration.as('h'));                                                                          // 4101
    var days     = round(duration.as('d'));                                                                          // 4102
    var months   = round(duration.as('M'));                                                                          // 4103
    var years    = round(duration.as('y'));                                                                          // 4104
                                                                                                                     // 4105
    var a = seconds < thresholds.s && ['s', seconds]  ||                                                             // 4106
            minutes <= 1           && ['m']           ||                                                             // 4107
            minutes < thresholds.m && ['mm', minutes] ||                                                             // 4108
            hours   <= 1           && ['h']           ||                                                             // 4109
            hours   < thresholds.h && ['hh', hours]   ||                                                             // 4110
            days    <= 1           && ['d']           ||                                                             // 4111
            days    < thresholds.d && ['dd', days]    ||                                                             // 4112
            months  <= 1           && ['M']           ||                                                             // 4113
            months  < thresholds.M && ['MM', months]  ||                                                             // 4114
            years   <= 1           && ['y']           || ['yy', years];                                              // 4115
                                                                                                                     // 4116
    a[2] = withoutSuffix;                                                                                            // 4117
    a[3] = +posNegDuration > 0;                                                                                      // 4118
    a[4] = locale;                                                                                                   // 4119
    return substituteTimeAgo.apply(null, a);                                                                         // 4120
}                                                                                                                    // 4121
                                                                                                                     // 4122
// This function allows you to set the rounding function for relative time strings                                   // 4123
function getSetRelativeTimeRounding (roundingFunction) {                                                             // 4124
    if (roundingFunction === undefined) {                                                                            // 4125
        return round;                                                                                                // 4126
    }                                                                                                                // 4127
    if (typeof(roundingFunction) === 'function') {                                                                   // 4128
        round = roundingFunction;                                                                                    // 4129
        return true;                                                                                                 // 4130
    }                                                                                                                // 4131
    return false;                                                                                                    // 4132
}                                                                                                                    // 4133
                                                                                                                     // 4134
// This function allows you to set a threshold for relative time strings                                             // 4135
function getSetRelativeTimeThreshold (threshold, limit) {                                                            // 4136
    if (thresholds[threshold] === undefined) {                                                                       // 4137
        return false;                                                                                                // 4138
    }                                                                                                                // 4139
    if (limit === undefined) {                                                                                       // 4140
        return thresholds[threshold];                                                                                // 4141
    }                                                                                                                // 4142
    thresholds[threshold] = limit;                                                                                   // 4143
    return true;                                                                                                     // 4144
}                                                                                                                    // 4145
                                                                                                                     // 4146
function humanize (withSuffix) {                                                                                     // 4147
    var locale = this.localeData();                                                                                  // 4148
    var output = relativeTime$1(this, !withSuffix, locale);                                                          // 4149
                                                                                                                     // 4150
    if (withSuffix) {                                                                                                // 4151
        output = locale.pastFuture(+this, output);                                                                   // 4152
    }                                                                                                                // 4153
                                                                                                                     // 4154
    return locale.postformat(output);                                                                                // 4155
}                                                                                                                    // 4156
                                                                                                                     // 4157
var abs$1 = Math.abs;                                                                                                // 4158
                                                                                                                     // 4159
function toISOString$1() {                                                                                           // 4160
    // for ISO strings we do not use the normal bubbling rules:                                                      // 4161
    //  * milliseconds bubble up until they become hours                                                             // 4162
    //  * days do not bubble at all                                                                                  // 4163
    //  * months bubble up until they become years                                                                   // 4164
    // This is because there is no context-free conversion between hours and days                                    // 4165
    // (think of clock changes)                                                                                      // 4166
    // and also not between days and months (28-31 days per month)                                                   // 4167
    var seconds = abs$1(this._milliseconds) / 1000;                                                                  // 4168
    var days         = abs$1(this._days);                                                                            // 4169
    var months       = abs$1(this._months);                                                                          // 4170
    var minutes, hours, years;                                                                                       // 4171
                                                                                                                     // 4172
    // 3600 seconds -> 60 minutes -> 1 hour                                                                          // 4173
    minutes           = absFloor(seconds / 60);                                                                      // 4174
    hours             = absFloor(minutes / 60);                                                                      // 4175
    seconds %= 60;                                                                                                   // 4176
    minutes %= 60;                                                                                                   // 4177
                                                                                                                     // 4178
    // 12 months -> 1 year                                                                                           // 4179
    years  = absFloor(months / 12);                                                                                  // 4180
    months %= 12;                                                                                                    // 4181
                                                                                                                     // 4182
                                                                                                                     // 4183
    // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js                  // 4184
    var Y = years;                                                                                                   // 4185
    var M = months;                                                                                                  // 4186
    var D = days;                                                                                                    // 4187
    var h = hours;                                                                                                   // 4188
    var m = minutes;                                                                                                 // 4189
    var s = seconds;                                                                                                 // 4190
    var total = this.asSeconds();                                                                                    // 4191
                                                                                                                     // 4192
    if (!total) {                                                                                                    // 4193
        // this is the same as C#'s (Noda) and python (isodate)...                                                   // 4194
        // but not other JS (goog.date)                                                                              // 4195
        return 'P0D';                                                                                                // 4196
    }                                                                                                                // 4197
                                                                                                                     // 4198
    return (total < 0 ? '-' : '') +                                                                                  // 4199
        'P' +                                                                                                        // 4200
        (Y ? Y + 'Y' : '') +                                                                                         // 4201
        (M ? M + 'M' : '') +                                                                                         // 4202
        (D ? D + 'D' : '') +                                                                                         // 4203
        ((h || m || s) ? 'T' : '') +                                                                                 // 4204
        (h ? h + 'H' : '') +                                                                                         // 4205
        (m ? m + 'M' : '') +                                                                                         // 4206
        (s ? s + 'S' : '');                                                                                          // 4207
}                                                                                                                    // 4208
                                                                                                                     // 4209
var proto$2 = Duration.prototype;                                                                                    // 4210
                                                                                                                     // 4211
proto$2.abs            = abs;                                                                                        // 4212
proto$2.add            = add$1;                                                                                      // 4213
proto$2.subtract       = subtract$1;                                                                                 // 4214
proto$2.as             = as;                                                                                         // 4215
proto$2.asMilliseconds = asMilliseconds;                                                                             // 4216
proto$2.asSeconds      = asSeconds;                                                                                  // 4217
proto$2.asMinutes      = asMinutes;                                                                                  // 4218
proto$2.asHours        = asHours;                                                                                    // 4219
proto$2.asDays         = asDays;                                                                                     // 4220
proto$2.asWeeks        = asWeeks;                                                                                    // 4221
proto$2.asMonths       = asMonths;                                                                                   // 4222
proto$2.asYears        = asYears;                                                                                    // 4223
proto$2.valueOf        = valueOf$1;                                                                                  // 4224
proto$2._bubble        = bubble;                                                                                     // 4225
proto$2.get            = get$2;                                                                                      // 4226
proto$2.milliseconds   = milliseconds;                                                                               // 4227
proto$2.seconds        = seconds;                                                                                    // 4228
proto$2.minutes        = minutes;                                                                                    // 4229
proto$2.hours          = hours;                                                                                      // 4230
proto$2.days           = days;                                                                                       // 4231
proto$2.weeks          = weeks;                                                                                      // 4232
proto$2.months         = months;                                                                                     // 4233
proto$2.years          = years;                                                                                      // 4234
proto$2.humanize       = humanize;                                                                                   // 4235
proto$2.toISOString    = toISOString$1;                                                                              // 4236
proto$2.toString       = toISOString$1;                                                                              // 4237
proto$2.toJSON         = toISOString$1;                                                                              // 4238
proto$2.locale         = locale;                                                                                     // 4239
proto$2.localeData     = localeData;                                                                                 // 4240
                                                                                                                     // 4241
// Deprecations                                                                                                      // 4242
proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
proto$2.lang = lang;                                                                                                 // 4244
                                                                                                                     // 4245
// Side effect imports                                                                                               // 4246
                                                                                                                     // 4247
// FORMATTING                                                                                                        // 4248
                                                                                                                     // 4249
addFormatToken('X', 0, 0, 'unix');                                                                                   // 4250
addFormatToken('x', 0, 0, 'valueOf');                                                                                // 4251
                                                                                                                     // 4252
// PARSING                                                                                                           // 4253
                                                                                                                     // 4254
addRegexToken('x', matchSigned);                                                                                     // 4255
addRegexToken('X', matchTimestamp);                                                                                  // 4256
addParseToken('X', function (input, array, config) {                                                                 // 4257
    config._d = new Date(parseFloat(input, 10) * 1000);                                                              // 4258
});                                                                                                                  // 4259
addParseToken('x', function (input, array, config) {                                                                 // 4260
    config._d = new Date(toInt(input));                                                                              // 4261
});                                                                                                                  // 4262
                                                                                                                     // 4263
// Side effect imports                                                                                               // 4264
                                                                                                                     // 4265
                                                                                                                     // 4266
hooks.version = '2.17.1';                                                                                            // 4267
                                                                                                                     // 4268
setHookCallback(createLocal);                                                                                        // 4269
                                                                                                                     // 4270
hooks.fn                    = proto;                                                                                 // 4271
hooks.min                   = min;                                                                                   // 4272
hooks.max                   = max;                                                                                   // 4273
hooks.now                   = now;                                                                                   // 4274
hooks.utc                   = createUTC;                                                                             // 4275
hooks.unix                  = createUnix;                                                                            // 4276
hooks.months                = listMonths;                                                                            // 4277
hooks.isDate                = isDate;                                                                                // 4278
hooks.locale                = getSetGlobalLocale;                                                                    // 4279
hooks.invalid               = createInvalid;                                                                         // 4280
hooks.duration              = createDuration;                                                                        // 4281
hooks.isMoment              = isMoment;                                                                              // 4282
hooks.weekdays              = listWeekdays;                                                                          // 4283
hooks.parseZone             = createInZone;                                                                          // 4284
hooks.localeData            = getLocale;                                                                             // 4285
hooks.isDuration            = isDuration;                                                                            // 4286
hooks.monthsShort           = listMonthsShort;                                                                       // 4287
hooks.weekdaysMin           = listWeekdaysMin;                                                                       // 4288
hooks.defineLocale          = defineLocale;                                                                          // 4289
hooks.updateLocale          = updateLocale;                                                                          // 4290
hooks.locales               = listLocales;                                                                           // 4291
hooks.weekdaysShort         = listWeekdaysShort;                                                                     // 4292
hooks.normalizeUnits        = normalizeUnits;                                                                        // 4293
hooks.relativeTimeRounding = getSetRelativeTimeRounding;                                                             // 4294
hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;                                                           // 4295
hooks.calendarFormat        = getCalendarFormat;                                                                     // 4296
hooks.prototype             = proto;                                                                                 // 4297
                                                                                                                     // 4298
return hooks;                                                                                                        // 4299
                                                                                                                     // 4300
})));                                                                                                                // 4301
                                                                                                                     // 4302
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/momentjs_moment/export.js                                                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// moment.js makes `moment` global on the window (or global) object, while Meteor expects a file-scoped global variable
moment = this.moment;                                                                                                // 2
try {                                                                                                                // 3
    delete this.moment;                                                                                              // 4
} catch (e) {                                                                                                        // 5
}                                                                                                                    // 6
                                                                                                                     // 7
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['momentjs:moment'] = {}, {
  moment: moment
});

})();
