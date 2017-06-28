(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var later = Package['mrt:later'].later;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var check = Package.check.check;
var Match = Package.check.Match;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var __coffeescriptShare, Job, JobCollection;

(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/vsivsi_job-collection/job/src/job_class.coffee.js                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
                                                                                                                      //
var JobQueue,                                                                                                         // 9
    _clearInterval,                                                                                                   // 9
    _setImmediate,                                                                                                    // 9
    _setInterval,                                                                                                     // 9
    concatReduce,                                                                                                     // 9
    isBoolean,                                                                                                        // 9
    isInteger,                                                                                                        // 9
    methodCall,                                                                                                       // 9
    optionsHelp,                                                                                                      // 9
    reduceCallbacks,                                                                                                  // 9
    splitLongArray,                                                                                                   // 9
    slice = [].slice,                                                                                                 // 9
    indexOf = [].indexOf || function (item) {                                                                         // 9
  for (var i = 0, l = this.length; i < l; i++) {                                                                      // 3
    if (i in this && this[i] === item) return i;                                                                      // 3
  }                                                                                                                   // 3
                                                                                                                      //
  return -1;                                                                                                          // 3
};                                                                                                                    // 3
                                                                                                                      //
methodCall = function (root, method, params, cb, after) {                                                             // 9
  var apply, name, ref, ref1, ref2, ref3;                                                                             // 10
                                                                                                                      //
  if (after == null) {                                                                                                // 7
    after = function (ret) {                                                                                          // 9
      return ret;                                                                                                     // 9
    };                                                                                                                // 9
  }                                                                                                                   // 11
                                                                                                                      //
  apply = (ref = (ref1 = Job._ddp_apply) != null ? ref1[(ref2 = root.root) != null ? ref2 : root] : void 0) != null ? ref : Job._ddp_apply;
                                                                                                                      //
  if (typeof apply !== 'function') {                                                                                  // 11
    throw new Error("Job remote method call error, no valid invocation method found.");                               // 12
  }                                                                                                                   // 15
                                                                                                                      //
  name = ((ref3 = root.root) != null ? ref3 : root) + "_" + method;                                                   // 13
                                                                                                                      //
  if (cb && typeof cb === 'function') {                                                                               // 14
    return apply(name, params, function (_this) {                                                                     // 18
      return function (err, res) {                                                                                    // 19
        if (err) {                                                                                                    // 16
          return cb(err);                                                                                             // 16
        }                                                                                                             // 22
                                                                                                                      //
        return cb(null, after(res));                                                                                  // 23
      };                                                                                                              // 15
    }(this));                                                                                                         // 15
  } else {                                                                                                            // 14
    return after(apply(name, params));                                                                                // 19
  }                                                                                                                   // 28
};                                                                                                                    // 9
                                                                                                                      //
optionsHelp = function (options, cb) {                                                                                // 21
  var ref;                                                                                                            // 23
                                                                                                                      //
  if (cb != null && typeof cb !== 'function') {                                                                       // 23
    options = cb;                                                                                                     // 24
    cb = void 0;                                                                                                      // 25
  } else {                                                                                                            // 23
    if (!((typeof options === "undefined" ? "undefined" : _typeof(options)) === 'object' && options instanceof Array && options.length < 2)) {
      throw new Error('options... in optionsHelp must be an Array with zero or one elements');                        // 30
    }                                                                                                                 // 39
                                                                                                                      //
    options = (ref = options != null ? options[0] : void 0) != null ? ref : {};                                       // 31
  }                                                                                                                   // 41
                                                                                                                      //
  if ((typeof options === "undefined" ? "undefined" : _typeof(options)) !== 'object') {                               // 32
    throw new Error('in optionsHelp options not an object or bad callback');                                          // 33
  }                                                                                                                   // 44
                                                                                                                      //
  return [options, cb];                                                                                               // 34
};                                                                                                                    // 21
                                                                                                                      //
splitLongArray = function (arr, max) {                                                                                // 36
  var i, k, ref, results;                                                                                             // 37
                                                                                                                      //
  if (!(arr instanceof Array && max > 0)) {                                                                           // 37
    throw new Error('splitLongArray: bad params');                                                                    // 37
  }                                                                                                                   // 52
                                                                                                                      //
  results = [];                                                                                                       // 38
                                                                                                                      //
  for (i = k = 0, ref = Math.ceil(arr.length / max); 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {        // 54
    results.push(arr.slice(i * max, (i + 1) * max));                                                                  // 55
  }                                                                                                                   // 38
                                                                                                                      //
  return results;                                                                                                     // 57
};                                                                                                                    // 36
                                                                                                                      //
reduceCallbacks = function (cb, num, reduce, init) {                                                                  // 42
  var cbCount, cbErr, cbRetVal;                                                                                       // 43
                                                                                                                      //
  if (reduce == null) {                                                                                               // 62
    reduce = function (a, b) {                                                                                        // 42
      return a || b;                                                                                                  // 64
    };                                                                                                                // 42
  }                                                                                                                   // 66
                                                                                                                      //
  if (init == null) {                                                                                                 // 67
    init = false;                                                                                                     // 42
  }                                                                                                                   // 69
                                                                                                                      //
  if (cb == null) {                                                                                                   // 43
    return void 0;                                                                                                    // 43
  }                                                                                                                   // 72
                                                                                                                      //
  if (!(typeof cb === 'function' && num > 0 && typeof reduce === 'function')) {                                       // 44
    throw new Error('Bad params given to reduceCallbacks');                                                           // 45
  }                                                                                                                   // 75
                                                                                                                      //
  cbRetVal = init;                                                                                                    // 46
  cbCount = 0;                                                                                                        // 47
  cbErr = null;                                                                                                       // 48
  return function (err, res) {                                                                                        // 49
    if (!cbErr) {                                                                                                     // 50
      if (err) {                                                                                                      // 51
        cbErr = err;                                                                                                  // 52
        return cb(err);                                                                                               // 83
      } else {                                                                                                        // 51
        cbCount++;                                                                                                    // 55
        cbRetVal = reduce(cbRetVal, res);                                                                             // 56
                                                                                                                      //
        if (cbCount === num) {                                                                                        // 57
          return cb(null, cbRetVal);                                                                                  // 88
        } else if (cbCount > num) {                                                                                   // 57
          throw new Error("reduceCallbacks callback invoked more than requested " + num + " times");                  // 60
        }                                                                                                             // 51
      }                                                                                                               // 50
    }                                                                                                                 // 93
  };                                                                                                                  // 49
};                                                                                                                    // 42
                                                                                                                      //
concatReduce = function (a, b) {                                                                                      // 62
  if (!(a instanceof Array)) {                                                                                        // 63
    a = [a];                                                                                                          // 63
  }                                                                                                                   // 100
                                                                                                                      //
  return a.concat(b);                                                                                                 // 101
};                                                                                                                    // 62
                                                                                                                      //
isInteger = function (i) {                                                                                            // 66
  return typeof i === 'number' && Math.floor(i) === i;                                                                // 105
};                                                                                                                    // 66
                                                                                                                      //
isBoolean = function (b) {                                                                                            // 68
  return typeof b === 'boolean';                                                                                      // 109
};                                                                                                                    // 68
                                                                                                                      //
_setImmediate = function () {                                                                                         // 71
  var args, func;                                                                                                     // 72
  func = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];                                  // 71
                                                                                                                      //
  if ((typeof Meteor !== "undefined" && Meteor !== null ? Meteor.setTimeout : void 0) != null) {                      // 72
    return Meteor.setTimeout.apply(Meteor, [func, 0].concat(slice.call(args)));                                       // 73
  } else if (typeof setImmediate !== "undefined" && setImmediate !== null) {                                          // 72
    return setImmediate.apply(null, [func].concat(slice.call(args)));                                                 // 75
  } else {                                                                                                            // 74
    return setTimeout.apply(null, [func, 0].concat(slice.call(args)));                                                // 78
  }                                                                                                                   // 121
};                                                                                                                    // 71
                                                                                                                      //
_setInterval = function () {                                                                                          // 80
  var args, func, timeOut;                                                                                            // 81
  func = arguments[0], timeOut = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];          // 80
                                                                                                                      //
  if ((typeof Meteor !== "undefined" && Meteor !== null ? Meteor.setInterval : void 0) != null) {                     // 81
    return Meteor.setInterval.apply(Meteor, [func, timeOut].concat(slice.call(args)));                                // 82
  } else {                                                                                                            // 81
    return setInterval.apply(null, [func, timeOut].concat(slice.call(args)));                                         // 85
  }                                                                                                                   // 131
};                                                                                                                    // 80
                                                                                                                      //
_clearInterval = function (id) {                                                                                      // 87
  if ((typeof Meteor !== "undefined" && Meteor !== null ? Meteor.clearInterval : void 0) != null) {                   // 88
    return Meteor.clearInterval(id);                                                                                  // 89
  } else {                                                                                                            // 88
    return clearInterval(id);                                                                                         // 92
  }                                                                                                                   // 139
};                                                                                                                    // 87
                                                                                                                      //
JobQueue = function () {                                                                                              // 96
  function JobQueue() {                                                                                               // 98
    var k, options, ref, ref1, ref2, ref3, root1, type1, worker;                                                      // 99
    root1 = arguments[0], type1 = arguments[1], options = 4 <= arguments.length ? slice.call(arguments, 2, k = arguments.length - 1) : (k = 2, []), worker = arguments[k++];
    this.root = root1;                                                                                                // 98
    this.type = type1;                                                                                                // 98
    this.worker = worker;                                                                                             // 98
                                                                                                                      //
    if (!(this instanceof JobQueue)) {                                                                                // 99
      return function (func, args, ctor) {                                                                            // 100
        ctor.prototype = func.prototype;                                                                              // 151
        var child = new ctor(),                                                                                       // 152
            result = func.apply(child, args);                                                                         // 152
        return Object(result) === result ? result : child;                                                            // 153
      }(JobQueue, [this.root, this.type].concat(slice.call(options), [this.worker]), function () {});                 // 154
    }                                                                                                                 // 155
                                                                                                                      //
    ref = optionsHelp(options, this.worker), options = ref[0], this.worker = ref[1];                                  // 101
    this.pollInterval = options.pollInterval != null && !options.pollInterval ? Job.forever : !(options.pollInterval != null && isInteger(options.pollInterval)) ? 5000 : options.pollInterval;
                                                                                                                      //
    if (!(isInteger(this.pollInterval) && this.pollInterval >= 0)) {                                                  // 110
      throw new Error("JobQueue: Invalid pollInterval, must be a positive integer");                                  // 111
    }                                                                                                                 // 160
                                                                                                                      //
    this.concurrency = (ref1 = options.concurrency) != null ? ref1 : 1;                                               // 113
                                                                                                                      //
    if (!(isInteger(this.concurrency) && this.concurrency >= 0)) {                                                    // 114
      throw new Error("JobQueue: Invalid concurrency, must be a positive integer");                                   // 115
    }                                                                                                                 // 164
                                                                                                                      //
    this.payload = (ref2 = options.payload) != null ? ref2 : 1;                                                       // 117
                                                                                                                      //
    if (!(isInteger(this.payload) && this.payload >= 0)) {                                                            // 118
      throw new Error("JobQueue: Invalid payload, must be a positive integer");                                       // 119
    }                                                                                                                 // 168
                                                                                                                      //
    this.prefetch = (ref3 = options.prefetch) != null ? ref3 : 0;                                                     // 121
                                                                                                                      //
    if (!(isInteger(this.prefetch) && this.prefetch >= 0)) {                                                          // 122
      throw new Error("JobQueue: Invalid prefetch, must be a positive integer");                                      // 123
    }                                                                                                                 // 172
                                                                                                                      //
    this.workTimeout = options.workTimeout;                                                                           // 125
                                                                                                                      //
    if (this.workTimeout != null && !(isInteger(this.workTimeout) && this.workTimeout >= 0)) {                        // 126
      throw new Error("JobQueue: Invalid workTimeout, must be a positive integer");                                   // 127
    }                                                                                                                 // 176
                                                                                                                      //
    this.callbackStrict = options.callbackStrict;                                                                     // 129
                                                                                                                      //
    if (this.callbackStrict != null && !isBoolean(this.callbackStrict)) {                                             // 130
      throw new Error("JobQueue: Invalid callbackStrict, must be a boolean");                                         // 131
    }                                                                                                                 // 180
                                                                                                                      //
    this._workers = {};                                                                                               // 133
    this._tasks = [];                                                                                                 // 134
    this._taskNumber = 0;                                                                                             // 135
    this._stoppingGetWork = void 0;                                                                                   // 136
    this._stoppingTasks = void 0;                                                                                     // 137
    this._interval = null;                                                                                            // 138
    this._getWorkOutstanding = false;                                                                                 // 139
    this.paused = true;                                                                                               // 140
    this.resume();                                                                                                    // 141
  }                                                                                                                   // 98
                                                                                                                      //
  JobQueue.prototype._getWork = function () {                                                                         // 192
    var numJobsToGet, options;                                                                                        // 145
                                                                                                                      //
    if (!(this._getWorkOutstanding || this.paused)) {                                                                 // 145
      numJobsToGet = this.prefetch + this.payload * (this.concurrency - this.running()) - this.length();              // 146
                                                                                                                      //
      if (numJobsToGet > 0) {                                                                                         // 147
        this._getWorkOutstanding = true;                                                                              // 148
        options = {                                                                                                   // 149
          maxJobs: numJobsToGet                                                                                       // 149
        };                                                                                                            // 149
                                                                                                                      //
        if (this.workTimeout != null) {                                                                               // 150
          options.workTimeout = this.workTimeout;                                                                     // 150
        }                                                                                                             // 203
                                                                                                                      //
        return Job.getWork(this.root, this.type, options, function (_this) {                                          // 204
          return function (err, jobs) {                                                                               // 205
            var j, k, len;                                                                                            // 152
            _this._getWorkOutstanding = false;                                                                        // 152
                                                                                                                      //
            if (err) {                                                                                                // 153
              return console.error("JobQueue: Received error from getWork(): ", err);                                 // 209
            } else if (jobs != null && jobs instanceof Array) {                                                       // 153
              if (jobs.length > numJobsToGet) {                                                                       // 156
                console.error("JobQueue: getWork() returned jobs (" + jobs.length + ") in excess of maxJobs (" + numJobsToGet + ")");
              }                                                                                                       // 213
                                                                                                                      //
              for (k = 0, len = jobs.length; k < len; k++) {                                                          // 158
                j = jobs[k];                                                                                          // 215
                                                                                                                      //
                _this._tasks.push(j);                                                                                 // 159
                                                                                                                      //
                if (_this._stoppingGetWork == null) {                                                                 // 160
                  _setImmediate(_this._process.bind(_this));                                                          // 160
                }                                                                                                     // 219
              }                                                                                                       // 158
                                                                                                                      //
              if (_this._stoppingGetWork != null) {                                                                   // 161
                return _this._stoppingGetWork();                                                                      // 222
              }                                                                                                       // 155
            } else {                                                                                                  // 155
              return console.error("JobQueue: Nonarray response from server from getWork()");                         // 225
            }                                                                                                         // 226
          };                                                                                                          // 151
        }(this));                                                                                                     // 151
      }                                                                                                               // 145
    }                                                                                                                 // 230
  };                                                                                                                  // 143
                                                                                                                      //
  JobQueue.prototype._only_once = function (fn) {                                                                     // 233
    var called;                                                                                                       // 166
    called = false;                                                                                                   // 166
    return function (_this) {                                                                                         // 167
      return function () {                                                                                            // 237
        if (called) {                                                                                                 // 168
          console.error("Worker callback called multiple times in JobQueue");                                         // 169
                                                                                                                      //
          if (_this.callbackStrict) {                                                                                 // 170
            throw new Error("JobQueue worker callback was invoked multiple times");                                   // 171
          }                                                                                                           // 168
        }                                                                                                             // 243
                                                                                                                      //
        called = true;                                                                                                // 172
        return fn.apply(_this, arguments);                                                                            // 245
      };                                                                                                              // 167
    }(this);                                                                                                          // 167
  };                                                                                                                  // 165
                                                                                                                      //
  JobQueue.prototype._process = function () {                                                                         // 250
    var cb, job, next;                                                                                                // 176
                                                                                                                      //
    if (!this.paused && this.running() < this.concurrency && this.length()) {                                         // 176
      if (this.payload > 1) {                                                                                         // 177
        job = this._tasks.splice(0, this.payload);                                                                    // 178
      } else {                                                                                                        // 177
        job = this._tasks.shift();                                                                                    // 180
      }                                                                                                               // 257
                                                                                                                      //
      job._taskId = "Task_" + this._taskNumber++;                                                                     // 181
      this._workers[job._taskId] = job;                                                                               // 182
                                                                                                                      //
      next = function (_this) {                                                                                       // 183
        return function () {                                                                                          // 261
          delete _this._workers[job._taskId];                                                                         // 184
                                                                                                                      //
          if (_this._stoppingTasks != null && _this.running() === 0 && _this.length() === 0) {                        // 185
            return _this._stoppingTasks();                                                                            // 264
          } else {                                                                                                    // 185
            _setImmediate(_this._process.bind(_this));                                                                // 188
                                                                                                                      //
            return _setImmediate(_this._getWork.bind(_this));                                                         // 267
          }                                                                                                           // 268
        };                                                                                                            // 183
      }(this);                                                                                                        // 183
                                                                                                                      //
      cb = this._only_once(next);                                                                                     // 190
      return this.worker(job, cb);                                                                                    // 272
    }                                                                                                                 // 273
  };                                                                                                                  // 175
                                                                                                                      //
  JobQueue.prototype._stopGetWork = function (callback) {                                                             // 276
    _clearInterval(this._interval);                                                                                   // 194
                                                                                                                      //
    this._interval = null;                                                                                            // 195
                                                                                                                      //
    if (this._getWorkOutstanding) {                                                                                   // 196
      return this._stoppingGetWork = callback;                                                                        // 280
    } else {                                                                                                          // 196
      return _setImmediate(callback);                                                                                 // 282
    }                                                                                                                 // 283
  };                                                                                                                  // 193
                                                                                                                      //
  JobQueue.prototype._waitForTasks = function (callback) {                                                            // 286
    if (this.running() !== 0) {                                                                                       // 202
      return this._stoppingTasks = callback;                                                                          // 288
    } else {                                                                                                          // 202
      return _setImmediate(callback);                                                                                 // 290
    }                                                                                                                 // 291
  };                                                                                                                  // 201
                                                                                                                      //
  JobQueue.prototype._failJobs = function (tasks, callback) {                                                         // 294
    var count, job, k, len, results;                                                                                  // 208
                                                                                                                      //
    if (tasks.length === 0) {                                                                                         // 208
      _setImmediate(callback);                                                                                        // 208
    }                                                                                                                 // 298
                                                                                                                      //
    count = 0;                                                                                                        // 209
    results = [];                                                                                                     // 210
                                                                                                                      //
    for (k = 0, len = tasks.length; k < len; k++) {                                                                   // 301
      job = tasks[k];                                                                                                 // 302
      results.push(job.fail("Worker shutdown", function (_this) {                                                     // 303
        return function (err, res) {                                                                                  // 304
          count++;                                                                                                    // 212
                                                                                                                      //
          if (count === tasks.length) {                                                                               // 213
            return callback();                                                                                        // 307
          }                                                                                                           // 308
        };                                                                                                            // 211
      }(this)));                                                                                                      // 211
    }                                                                                                                 // 210
                                                                                                                      //
    return results;                                                                                                   // 312
  };                                                                                                                  // 207
                                                                                                                      //
  JobQueue.prototype._hard = function (callback) {                                                                    // 315
    this.paused = true;                                                                                               // 217
    return this._stopGetWork(function (_this) {                                                                       // 317
      return function () {                                                                                            // 318
        var i, r, ref, tasks;                                                                                         // 219
        tasks = _this._tasks;                                                                                         // 219
        _this._tasks = [];                                                                                            // 220
        ref = _this._workers;                                                                                         // 221
                                                                                                                      //
        for (i in meteorBabelHelpers.sanitizeForInObject(ref)) {                                                      // 221
          r = ref[i];                                                                                                 // 324
          tasks = tasks.concat(r);                                                                                    // 222
        }                                                                                                             // 221
                                                                                                                      //
        return _this._failJobs(tasks, callback);                                                                      // 327
      };                                                                                                              // 218
    }(this));                                                                                                         // 218
  };                                                                                                                  // 216
                                                                                                                      //
  JobQueue.prototype._stop = function (callback) {                                                                    // 332
    this.paused = true;                                                                                               // 226
    return this._stopGetWork(function (_this) {                                                                       // 334
      return function () {                                                                                            // 335
        var tasks;                                                                                                    // 228
        tasks = _this._tasks;                                                                                         // 228
        _this._tasks = [];                                                                                            // 229
        return _this._waitForTasks(function () {                                                                      // 339
          return _this._failJobs(tasks, callback);                                                                    // 340
        });                                                                                                           // 230
      };                                                                                                              // 227
    }(this));                                                                                                         // 227
  };                                                                                                                  // 225
                                                                                                                      //
  JobQueue.prototype._soft = function (callback) {                                                                    // 346
    return this._stopGetWork(function (_this) {                                                                       // 347
      return function () {                                                                                            // 348
        return _this._waitForTasks(callback);                                                                         // 349
      };                                                                                                              // 234
    }(this));                                                                                                         // 234
  };                                                                                                                  // 233
                                                                                                                      //
  JobQueue.prototype.length = function () {                                                                           // 354
    return this._tasks.length;                                                                                        // 355
  };                                                                                                                  // 237
                                                                                                                      //
  JobQueue.prototype.running = function () {                                                                          // 358
    return Object.keys(this._workers).length;                                                                         // 359
  };                                                                                                                  // 239
                                                                                                                      //
  JobQueue.prototype.idle = function () {                                                                             // 362
    return this.length() + this.running() === 0;                                                                      // 363
  };                                                                                                                  // 241
                                                                                                                      //
  JobQueue.prototype.full = function () {                                                                             // 366
    return this.running() === this.concurrency;                                                                       // 367
  };                                                                                                                  // 243
                                                                                                                      //
  JobQueue.prototype.pause = function () {                                                                            // 370
    if (this.paused) {                                                                                                // 246
      return;                                                                                                         // 246
    }                                                                                                                 // 373
                                                                                                                      //
    if (!(this.pollInterval >= Job.forever)) {                                                                        // 247
      _clearInterval(this._interval);                                                                                 // 248
                                                                                                                      //
      this._interval = null;                                                                                          // 249
    }                                                                                                                 // 377
                                                                                                                      //
    this.paused = true;                                                                                               // 250
    return this;                                                                                                      // 379
  };                                                                                                                  // 245
                                                                                                                      //
  JobQueue.prototype.resume = function () {                                                                           // 382
    var k, ref, w;                                                                                                    // 254
                                                                                                                      //
    if (!this.paused) {                                                                                               // 254
      return;                                                                                                         // 254
    }                                                                                                                 // 386
                                                                                                                      //
    this.paused = false;                                                                                              // 255
                                                                                                                      //
    _setImmediate(this._getWork.bind(this));                                                                          // 256
                                                                                                                      //
    if (!(this.pollInterval >= Job.forever)) {                                                                        // 257
      this._interval = _setInterval(this._getWork.bind(this), this.pollInterval);                                     // 258
    }                                                                                                                 // 391
                                                                                                                      //
    for (w = k = 1, ref = this.concurrency; 1 <= ref ? k <= ref : k >= ref; w = 1 <= ref ? ++k : --k) {               // 259
      _setImmediate(this._process.bind(this));                                                                        // 260
    }                                                                                                                 // 259
                                                                                                                      //
    return this;                                                                                                      // 395
  };                                                                                                                  // 253
                                                                                                                      //
  JobQueue.prototype.trigger = function () {                                                                          // 398
    if (this.paused) {                                                                                                // 264
      return;                                                                                                         // 264
    }                                                                                                                 // 401
                                                                                                                      //
    _setImmediate(this._getWork.bind(this));                                                                          // 265
                                                                                                                      //
    return this;                                                                                                      // 403
  };                                                                                                                  // 263
                                                                                                                      //
  JobQueue.prototype.shutdown = function () {                                                                         // 406
    var cb, k, options, ref;                                                                                          // 269
    options = 2 <= arguments.length ? slice.call(arguments, 0, k = arguments.length - 1) : (k = 0, []), cb = arguments[k++];
    ref = optionsHelp(options, cb), options = ref[0], cb = ref[1];                                                    // 269
                                                                                                                      //
    if (options.level == null) {                                                                                      // 410
      options.level = 'normal';                                                                                       // 270
    }                                                                                                                 // 412
                                                                                                                      //
    if (options.quiet == null) {                                                                                      // 413
      options.quiet = false;                                                                                          // 271
    }                                                                                                                 // 415
                                                                                                                      //
    if (cb == null) {                                                                                                 // 272
      if (!options.quiet) {                                                                                           // 273
        console.warn("using default shutdown callback!");                                                             // 273
      }                                                                                                               // 419
                                                                                                                      //
      cb = function (_this) {                                                                                         // 274
        return function () {                                                                                          // 421
          return console.warn("Shutdown complete");                                                                   // 422
        };                                                                                                            // 274
      }(this);                                                                                                        // 274
    }                                                                                                                 // 425
                                                                                                                      //
    switch (options.level) {                                                                                          // 276
      case 'hard':                                                                                                    // 276
        if (!options.quiet) {                                                                                         // 278
          console.warn("Shutting down hard");                                                                         // 278
        }                                                                                                             // 430
                                                                                                                      //
        return this._hard(cb);                                                                                        // 431
                                                                                                                      //
      case 'soft':                                                                                                    // 276
        if (!options.quiet) {                                                                                         // 281
          console.warn("Shutting down soft");                                                                         // 281
        }                                                                                                             // 435
                                                                                                                      //
        return this._soft(cb);                                                                                        // 436
                                                                                                                      //
      default:                                                                                                        // 276
        if (!options.quiet) {                                                                                         // 284
          console.warn("Shutting down normally");                                                                     // 284
        }                                                                                                             // 440
                                                                                                                      //
        return this._stop(cb);                                                                                        // 441
    }                                                                                                                 // 276
  };                                                                                                                  // 268
                                                                                                                      //
  return JobQueue;                                                                                                    // 445
}();                                                                                                                  // 447
                                                                                                                      //
Job = function () {                                                                                                   // 289
  Job.forever = 9007199254740992;                                                                                     // 292
  Job.foreverDate = new Date(8640000000000000);                                                                       // 295
  Job.jobPriorities = {                                                                                               // 297
    low: 10,                                                                                                          // 298
    normal: 0,                                                                                                        // 299
    medium: -5,                                                                                                       // 300
    high: -10,                                                                                                        // 301
    critical: -15                                                                                                     // 302
  };                                                                                                                  // 298
  Job.jobRetryBackoffMethods = ['constant', 'exponential'];                                                           // 304
  Job.jobStatuses = ['waiting', 'paused', 'ready', 'running', 'failed', 'cancelled', 'completed'];                    // 306
  Job.jobLogLevels = ['info', 'success', 'warning', 'danger'];                                                        // 309
  Job.jobStatusCancellable = ['running', 'ready', 'waiting', 'paused'];                                               // 311
  Job.jobStatusPausable = ['ready', 'waiting'];                                                                       // 312
  Job.jobStatusRemovable = ['cancelled', 'completed', 'failed'];                                                      // 313
  Job.jobStatusRestartable = ['cancelled', 'failed'];                                                                 // 314
  Job.ddpMethods = ['startJobs', 'stopJobs', 'startJobServer', 'shutdownJobServer', 'jobRemove', 'jobPause', 'jobResume', 'jobReady', 'jobCancel', 'jobRestart', 'jobSave', 'jobRerun', 'getWork', 'getJob', 'jobLog', 'jobProgress', 'jobDone', 'jobFail'];
  Job.ddpPermissionLevels = ['admin', 'manager', 'creator', 'worker'];                                                // 322
  Job.ddpMethodPermissions = {                                                                                        // 325
    'startJobs': ['startJobs', 'admin'],                                                                              // 326
    'stopJobs': ['stopJobs', 'admin'],                                                                                // 327
    'startJobServer': ['startJobServer', 'admin'],                                                                    // 328
    'shutdownJobServer': ['shutdownJobServer', 'admin'],                                                              // 329
    'jobRemove': ['jobRemove', 'admin', 'manager'],                                                                   // 330
    'jobPause': ['jobPause', 'admin', 'manager'],                                                                     // 331
    'jobResume': ['jobResume', 'admin', 'manager'],                                                                   // 332
    'jobCancel': ['jobCancel', 'admin', 'manager'],                                                                   // 333
    'jobReady': ['jobReady', 'admin', 'manager'],                                                                     // 334
    'jobRestart': ['jobRestart', 'admin', 'manager'],                                                                 // 335
    'jobSave': ['jobSave', 'admin', 'creator'],                                                                       // 336
    'jobRerun': ['jobRerun', 'admin', 'creator'],                                                                     // 337
    'getWork': ['getWork', 'admin', 'worker'],                                                                        // 338
    'getJob': ['getJob', 'admin', 'worker'],                                                                          // 339
    'jobLog': ['jobLog', 'admin', 'worker'],                                                                          // 340
    'jobProgress': ['jobProgress', 'admin', 'worker'],                                                                // 341
    'jobDone': ['jobDone', 'admin', 'worker'],                                                                        // 342
    'jobFail': ['jobFail', 'admin', 'worker']                                                                         // 343
  };                                                                                                                  // 326
  Job._ddp_apply = void 0;                                                                                            // 346
                                                                                                                      //
  Job._setDDPApply = function (apply, collectionName) {                                                               // 350
    if (typeof apply === 'function') {                                                                                // 351
      if (typeof collectionName === 'string') {                                                                       // 352
        if (this._ddp_apply == null) {                                                                                // 506
          this._ddp_apply = {};                                                                                       // 353
        }                                                                                                             // 508
                                                                                                                      //
        if (typeof this._ddp_apply === 'function') {                                                                  // 354
          throw new Error("Job.setDDP must specify a collection name each time if called more than once.");           // 355
        }                                                                                                             // 511
                                                                                                                      //
        return this._ddp_apply[collectionName] = apply;                                                               // 512
      } else if (!this._ddp_apply) {                                                                                  // 352
        return this._ddp_apply = apply;                                                                               // 514
      } else {                                                                                                        // 357
        throw new Error("Job.setDDP must specify a collection name each time if called more than once.");             // 360
      }                                                                                                               // 351
    } else {                                                                                                          // 351
      throw new Error("Bad function in Job.setDDPApply()");                                                           // 362
    }                                                                                                                 // 520
  };                                                                                                                  // 350
                                                                                                                      //
  Job.setDDP = function (ddp, collectionNames, Fiber) {                                                               // 365
    var collName, k, len, results;                                                                                    // 366
                                                                                                                      //
    if (ddp == null) {                                                                                                // 525
      ddp = null;                                                                                                     // 365
    }                                                                                                                 // 527
                                                                                                                      //
    if (collectionNames == null) {                                                                                    // 528
      collectionNames = null;                                                                                         // 365
    }                                                                                                                 // 530
                                                                                                                      //
    if (Fiber == null) {                                                                                              // 531
      Fiber = null;                                                                                                   // 365
    }                                                                                                                 // 533
                                                                                                                      //
    if (!(typeof collectionNames === 'string' || collectionNames instanceof Array)) {                                 // 366
      Fiber = collectionNames;                                                                                        // 368
      collectionNames = [void 0];                                                                                     // 369
    } else if (typeof collectionNames === 'string') {                                                                 // 366
      collectionNames = [collectionNames];                                                                            // 372
    }                                                                                                                 // 539
                                                                                                                      //
    results = [];                                                                                                     // 373
                                                                                                                      //
    for (k = 0, len = collectionNames.length; k < len; k++) {                                                         // 541
      collName = collectionNames[k];                                                                                  // 542
                                                                                                                      //
      if (!(ddp != null && ddp.close != null && ddp.subscribe != null)) {                                             // 374
        if (ddp === null && (typeof Meteor !== "undefined" && Meteor !== null ? Meteor.apply : void 0) != null) {     // 376
          results.push(this._setDDPApply(Meteor.apply, collName));                                                    // 545
        } else {                                                                                                      // 376
          throw new Error("Bad ddp object in Job.setDDP()");                                                          // 381
        }                                                                                                             // 374
      } else if (ddp.observe == null) {                                                                               // 374
        results.push(this._setDDPApply(ddp.apply.bind(ddp), collName));                                               // 550
      } else {                                                                                                        // 382
        if (Fiber == null) {                                                                                          // 385
          results.push(this._setDDPApply(ddp.call.bind(ddp), collName));                                              // 553
        } else {                                                                                                      // 385
          results.push(this._setDDPApply(function (name, params, cb) {                                                // 555
            var fib;                                                                                                  // 391
            fib = Fiber.current;                                                                                      // 391
            ddp.call(name, params, function (err, res) {                                                              // 392
              if (cb != null && typeof cb === 'function') {                                                           // 393
                return cb(err, res);                                                                                  // 560
              } else {                                                                                                // 393
                if (err) {                                                                                            // 396
                  return fib.throwInto(err);                                                                          // 563
                } else {                                                                                              // 396
                  return fib.run(res);                                                                                // 565
                }                                                                                                     // 393
              }                                                                                                       // 567
            });                                                                                                       // 392
                                                                                                                      //
            if (cb != null && typeof cb === 'function') {} else {                                                     // 400
              return Fiber["yield"]();                                                                                // 403
            }                                                                                                         // 573
          }, collName));                                                                                              // 390
        }                                                                                                             // 382
      }                                                                                                               // 576
    }                                                                                                                 // 373
                                                                                                                      //
    return results;                                                                                                   // 578
  };                                                                                                                  // 365
                                                                                                                      //
  Job.getWork = function () {                                                                                         // 409
    var cb, k, options, ref, root, type;                                                                              // 410
    root = arguments[0], type = arguments[1], options = 4 <= arguments.length ? slice.call(arguments, 2, k = arguments.length - 1) : (k = 2, []), cb = arguments[k++];
    ref = optionsHelp(options, cb), options = ref[0], cb = ref[1];                                                    // 410
                                                                                                                      //
    if (typeof type === 'string') {                                                                                   // 411
      type = [type];                                                                                                  // 411
    }                                                                                                                 // 587
                                                                                                                      //
    if (options.workTimeout != null) {                                                                                // 412
      if (!(isInteger(options.workTimeout) && options.workTimeout > 0)) {                                             // 413
        throw new Error('getWork: workTimeout must be a positive integer');                                           // 414
      }                                                                                                               // 412
    }                                                                                                                 // 592
                                                                                                                      //
    return methodCall(root, "getWork", [type, options], cb, function (_this) {                                        // 593
      return function (res) {                                                                                         // 594
        var doc, jobs;                                                                                                // 416
                                                                                                                      //
        jobs = function () {                                                                                          // 416
          var l, len, results;                                                                                        // 597
          results = [];                                                                                               // 416
                                                                                                                      //
          for (l = 0, len = res.length; l < len; l++) {                                                               // 599
            doc = res[l];                                                                                             // 600
            results.push(new Job(root, doc));                                                                         // 601
          }                                                                                                           // 416
                                                                                                                      //
          return results;                                                                                             // 603
        }() || [];                                                                                                    // 604
                                                                                                                      //
        if (options.maxJobs != null) {                                                                                // 417
          return jobs;                                                                                                // 418
        } else {                                                                                                      // 417
          return jobs[0];                                                                                             // 420
        }                                                                                                             // 609
      };                                                                                                              // 415
    }(this));                                                                                                         // 415
  };                                                                                                                  // 409
                                                                                                                      //
  Job.processJobs = JobQueue;                                                                                         // 423
                                                                                                                      //
  Job.makeJob = function () {                                                                                         // 427
    var depFlag;                                                                                                      // 428
    depFlag = false;                                                                                                  // 428
    return function (root, doc) {                                                                                     // 619
      if (!depFlag) {                                                                                                 // 430
        depFlag = true;                                                                                               // 431
        console.warn("Job.makeJob(root, jobDoc) has been deprecated and will be removed in a future release, use 'new Job(root, jobDoc)' instead.");
      }                                                                                                               // 623
                                                                                                                      //
      return new Job(root, doc);                                                                                      // 624
    };                                                                                                                // 429
  }();                                                                                                                // 427
                                                                                                                      //
  Job.getJob = function () {                                                                                          // 437
    var cb, id, k, options, ref, root;                                                                                // 438
    root = arguments[0], id = arguments[1], options = 4 <= arguments.length ? slice.call(arguments, 2, k = arguments.length - 1) : (k = 2, []), cb = arguments[k++];
    ref = optionsHelp(options, cb), options = ref[0], cb = ref[1];                                                    // 438
                                                                                                                      //
    if (options.getLog == null) {                                                                                     // 632
      options.getLog = false;                                                                                         // 439
    }                                                                                                                 // 634
                                                                                                                      //
    return methodCall(root, "getJob", [id, options], cb, function (_this) {                                           // 635
      return function (doc) {                                                                                         // 636
        if (doc) {                                                                                                    // 441
          return new Job(root, doc);                                                                                  // 638
        } else {                                                                                                      // 441
          return void 0;                                                                                              // 640
        }                                                                                                             // 641
      };                                                                                                              // 440
    }(this));                                                                                                         // 440
  };                                                                                                                  // 437
                                                                                                                      //
  Job.getJobs = function () {                                                                                         // 447
    var cb, chunkOfIds, chunksOfIds, ids, k, l, len, myCb, options, ref, retVal, root;                                // 448
    root = arguments[0], ids = arguments[1], options = 4 <= arguments.length ? slice.call(arguments, 2, k = arguments.length - 1) : (k = 2, []), cb = arguments[k++];
    ref = optionsHelp(options, cb), options = ref[0], cb = ref[1];                                                    // 448
                                                                                                                      //
    if (options.getLog == null) {                                                                                     // 650
      options.getLog = false;                                                                                         // 449
    }                                                                                                                 // 652
                                                                                                                      //
    retVal = [];                                                                                                      // 450
    chunksOfIds = splitLongArray(ids, 32);                                                                            // 451
    myCb = reduceCallbacks(cb, chunksOfIds.length, concatReduce, []);                                                 // 452
                                                                                                                      //
    for (l = 0, len = chunksOfIds.length; l < len; l++) {                                                             // 453
      chunkOfIds = chunksOfIds[l];                                                                                    // 657
      retVal = retVal.concat(methodCall(root, "getJob", [chunkOfIds, options], myCb, function (_this) {               // 454
        return function (doc) {                                                                                       // 659
          var d, len1, m, results;                                                                                    // 455
                                                                                                                      //
          if (doc) {                                                                                                  // 455
            results = [];                                                                                             // 456
                                                                                                                      //
            for (m = 0, len1 = doc.length; m < len1; m++) {                                                           // 663
              d = doc[m];                                                                                             // 664
              results.push(new Job(root, d.type, d.data, d));                                                         // 665
            }                                                                                                         // 456
                                                                                                                      //
            return results;                                                                                           // 667
          } else {                                                                                                    // 455
            return null;                                                                                              // 669
          }                                                                                                           // 670
        };                                                                                                            // 454
      }(this)));                                                                                                      // 454
    }                                                                                                                 // 453
                                                                                                                      //
    return retVal;                                                                                                    // 459
  };                                                                                                                  // 447
                                                                                                                      //
  Job.pauseJobs = function () {                                                                                       // 463
    var cb, chunkOfIds, chunksOfIds, ids, k, l, len, myCb, options, ref, retVal, root;                                // 464
    root = arguments[0], ids = arguments[1], options = 4 <= arguments.length ? slice.call(arguments, 2, k = arguments.length - 1) : (k = 2, []), cb = arguments[k++];
    ref = optionsHelp(options, cb), options = ref[0], cb = ref[1];                                                    // 464
    retVal = false;                                                                                                   // 465
    chunksOfIds = splitLongArray(ids, 256);                                                                           // 466
    myCb = reduceCallbacks(cb, chunksOfIds.length);                                                                   // 467
                                                                                                                      //
    for (l = 0, len = chunksOfIds.length; l < len; l++) {                                                             // 468
      chunkOfIds = chunksOfIds[l];                                                                                    // 685
      retVal = methodCall(root, "jobPause", [chunkOfIds, options], myCb) || retVal;                                   // 469
    }                                                                                                                 // 468
                                                                                                                      //
    return retVal;                                                                                                    // 470
  };                                                                                                                  // 463
                                                                                                                      //
  Job.resumeJobs = function () {                                                                                      // 474
    var cb, chunkOfIds, chunksOfIds, ids, k, l, len, myCb, options, ref, retVal, root;                                // 475
    root = arguments[0], ids = arguments[1], options = 4 <= arguments.length ? slice.call(arguments, 2, k = arguments.length - 1) : (k = 2, []), cb = arguments[k++];
    ref = optionsHelp(options, cb), options = ref[0], cb = ref[1];                                                    // 475
    retVal = false;                                                                                                   // 476
    chunksOfIds = splitLongArray(ids, 256);                                                                           // 477
    myCb = reduceCallbacks(cb, chunksOfIds.length);                                                                   // 478
                                                                                                                      //
    for (l = 0, len = chunksOfIds.length; l < len; l++) {                                                             // 479
      chunkOfIds = chunksOfIds[l];                                                                                    // 699
      retVal = methodCall(root, "jobResume", [chunkOfIds, options], myCb) || retVal;                                  // 480
    }                                                                                                                 // 479
                                                                                                                      //
    return retVal;                                                                                                    // 481
  };                                                                                                                  // 474
                                                                                                                      //
  Job.readyJobs = function () {                                                                                       // 485
    var cb, chunkOfIds, chunksOfIds, ids, k, l, len, myCb, options, ref, retVal, root;                                // 486
    root = arguments[0], ids = arguments[1], options = 4 <= arguments.length ? slice.call(arguments, 2, k = arguments.length - 1) : (k = 2, []), cb = arguments[k++];
                                                                                                                      //
    if (ids == null) {                                                                                                // 708
      ids = [];                                                                                                       // 485
    }                                                                                                                 // 710
                                                                                                                      //
    ref = optionsHelp(options, cb), options = ref[0], cb = ref[1];                                                    // 486
                                                                                                                      //
    if (options.force == null) {                                                                                      // 712
      options.force = false;                                                                                          // 487
    }                                                                                                                 // 714
                                                                                                                      //
    retVal = false;                                                                                                   // 488
    chunksOfIds = splitLongArray(ids, 256);                                                                           // 489
                                                                                                                      //
    if (!(chunksOfIds.length > 0)) {                                                                                  // 490
      chunksOfIds = [[]];                                                                                             // 490
    }                                                                                                                 // 719
                                                                                                                      //
    myCb = reduceCallbacks(cb, chunksOfIds.length);                                                                   // 491
                                                                                                                      //
    for (l = 0, len = chunksOfIds.length; l < len; l++) {                                                             // 492
      chunkOfIds = chunksOfIds[l];                                                                                    // 722
      retVal = methodCall(root, "jobReady", [chunkOfIds, options], myCb) || retVal;                                   // 493
    }                                                                                                                 // 492
                                                                                                                      //
    return retVal;                                                                                                    // 494
  };                                                                                                                  // 485
                                                                                                                      //
  Job.cancelJobs = function () {                                                                                      // 497
    var cb, chunkOfIds, chunksOfIds, ids, k, l, len, myCb, options, ref, retVal, root;                                // 498
    root = arguments[0], ids = arguments[1], options = 4 <= arguments.length ? slice.call(arguments, 2, k = arguments.length - 1) : (k = 2, []), cb = arguments[k++];
    ref = optionsHelp(options, cb), options = ref[0], cb = ref[1];                                                    // 498
                                                                                                                      //
    if (options.antecedents == null) {                                                                                // 732
      options.antecedents = true;                                                                                     // 499
    }                                                                                                                 // 734
                                                                                                                      //
    retVal = false;                                                                                                   // 500
    chunksOfIds = splitLongArray(ids, 256);                                                                           // 501
    myCb = reduceCallbacks(cb, chunksOfIds.length);                                                                   // 502
                                                                                                                      //
    for (l = 0, len = chunksOfIds.length; l < len; l++) {                                                             // 503
      chunkOfIds = chunksOfIds[l];                                                                                    // 739
      retVal = methodCall(root, "jobCancel", [chunkOfIds, options], myCb) || retVal;                                  // 504
    }                                                                                                                 // 503
                                                                                                                      //
    return retVal;                                                                                                    // 505
  };                                                                                                                  // 497
                                                                                                                      //
  Job.restartJobs = function () {                                                                                     // 508
    var cb, chunkOfIds, chunksOfIds, ids, k, l, len, myCb, options, ref, retVal, root;                                // 509
    root = arguments[0], ids = arguments[1], options = 4 <= arguments.length ? slice.call(arguments, 2, k = arguments.length - 1) : (k = 2, []), cb = arguments[k++];
    ref = optionsHelp(options, cb), options = ref[0], cb = ref[1];                                                    // 509
                                                                                                                      //
    if (options.retries == null) {                                                                                    // 749
      options.retries = 1;                                                                                            // 510
    }                                                                                                                 // 751
                                                                                                                      //
    if (options.dependents == null) {                                                                                 // 752
      options.dependents = true;                                                                                      // 511
    }                                                                                                                 // 754
                                                                                                                      //
    retVal = false;                                                                                                   // 512
    chunksOfIds = splitLongArray(ids, 256);                                                                           // 513
    myCb = reduceCallbacks(cb, chunksOfIds.length);                                                                   // 514
                                                                                                                      //
    for (l = 0, len = chunksOfIds.length; l < len; l++) {                                                             // 515
      chunkOfIds = chunksOfIds[l];                                                                                    // 759
      retVal = methodCall(root, "jobRestart", [chunkOfIds, options], myCb) || retVal;                                 // 516
    }                                                                                                                 // 515
                                                                                                                      //
    return retVal;                                                                                                    // 517
  };                                                                                                                  // 508
                                                                                                                      //
  Job.removeJobs = function () {                                                                                      // 520
    var cb, chunkOfIds, chunksOfIds, ids, k, l, len, myCb, options, ref, retVal, root;                                // 521
    root = arguments[0], ids = arguments[1], options = 4 <= arguments.length ? slice.call(arguments, 2, k = arguments.length - 1) : (k = 2, []), cb = arguments[k++];
    ref = optionsHelp(options, cb), options = ref[0], cb = ref[1];                                                    // 521
    retVal = false;                                                                                                   // 522
    chunksOfIds = splitLongArray(ids, 256);                                                                           // 523
    myCb = reduceCallbacks(cb, chunksOfIds.length);                                                                   // 524
                                                                                                                      //
    for (l = 0, len = chunksOfIds.length; l < len; l++) {                                                             // 525
      chunkOfIds = chunksOfIds[l];                                                                                    // 773
      retVal = methodCall(root, "jobRemove", [chunkOfIds, options], myCb) || retVal;                                  // 526
    }                                                                                                                 // 525
                                                                                                                      //
    return retVal;                                                                                                    // 527
  };                                                                                                                  // 520
                                                                                                                      //
  Job.startJobs = function () {                                                                                       // 531
    var cb, k, options, ref, root;                                                                                    // 532
    root = arguments[0], options = 3 <= arguments.length ? slice.call(arguments, 1, k = arguments.length - 1) : (k = 1, []), cb = arguments[k++];
    ref = optionsHelp(options, cb), options = ref[0], cb = ref[1];                                                    // 532
    return methodCall(root, "startJobs", [options], cb);                                                              // 783
  };                                                                                                                  // 531
                                                                                                                      //
  Job.stopJobs = function () {                                                                                        // 537
    var cb, k, options, ref, root;                                                                                    // 538
    root = arguments[0], options = 3 <= arguments.length ? slice.call(arguments, 1, k = arguments.length - 1) : (k = 1, []), cb = arguments[k++];
    ref = optionsHelp(options, cb), options = ref[0], cb = ref[1];                                                    // 538
                                                                                                                      //
    if (options.timeout == null) {                                                                                    // 790
      options.timeout = 60 * 1000;                                                                                    // 539
    }                                                                                                                 // 792
                                                                                                                      //
    return methodCall(root, "stopJobs", [options], cb);                                                               // 793
  };                                                                                                                  // 537
                                                                                                                      //
  Job.startJobServer = function () {                                                                                  // 543
    var cb, k, options, ref, root;                                                                                    // 544
    root = arguments[0], options = 3 <= arguments.length ? slice.call(arguments, 1, k = arguments.length - 1) : (k = 1, []), cb = arguments[k++];
    ref = optionsHelp(options, cb), options = ref[0], cb = ref[1];                                                    // 544
    return methodCall(root, "startJobServer", [options], cb);                                                         // 800
  };                                                                                                                  // 543
                                                                                                                      //
  Job.shutdownJobServer = function () {                                                                               // 548
    var cb, k, options, ref, root;                                                                                    // 549
    root = arguments[0], options = 3 <= arguments.length ? slice.call(arguments, 1, k = arguments.length - 1) : (k = 1, []), cb = arguments[k++];
    ref = optionsHelp(options, cb), options = ref[0], cb = ref[1];                                                    // 549
                                                                                                                      //
    if (options.timeout == null) {                                                                                    // 807
      options.timeout = 60 * 1000;                                                                                    // 550
    }                                                                                                                 // 809
                                                                                                                      //
    return methodCall(root, "shutdownJobServer", [options], cb);                                                      // 810
  };                                                                                                                  // 548
                                                                                                                      //
  function Job(root1, type, data) {                                                                                   // 554
    var doc, ref, time;                                                                                               // 555
    this.root = root1;                                                                                                // 554
                                                                                                                      //
    if (!(this instanceof Job)) {                                                                                     // 555
      return new Job(this.root, type, data);                                                                          // 556
    }                                                                                                                 // 818
                                                                                                                      //
    this._root = this.root;                                                                                           // 559
                                                                                                                      //
    if (((ref = this.root) != null ? ref.root : void 0) != null && typeof this.root.root === 'string') {              // 562
      this.root = this._root.root;                                                                                    // 563
    }                                                                                                                 // 822
                                                                                                                      //
    if (data == null && (type != null ? type.data : void 0) != null && (type != null ? type.type : void 0) != null) {
      if (type instanceof Job) {                                                                                      // 567
        return type;                                                                                                  // 568
      }                                                                                                               // 826
                                                                                                                      //
      doc = type;                                                                                                     // 570
      data = doc.data;                                                                                                // 571
      type = doc.type;                                                                                                // 572
    } else {                                                                                                          // 566
      doc = {};                                                                                                       // 574
    }                                                                                                                 // 832
                                                                                                                      //
    if (!((typeof doc === "undefined" ? "undefined" : _typeof(doc)) === 'object' && (typeof data === "undefined" ? "undefined" : _typeof(data)) === 'object' && typeof type === 'string' && typeof this.root === 'string')) {
      throw new Error("new Job: bad parameter(s), " + this.root + " (" + _typeof(this.root) + "), " + type + " (" + (typeof type === "undefined" ? "undefined" : _typeof(type)) + "), " + data + " (" + (typeof data === "undefined" ? "undefined" : _typeof(data)) + "), " + doc + " (" + (typeof doc === "undefined" ? "undefined" : _typeof(doc)) + ")");
    } else if (doc.type != null && doc.data != null) {                                                                // 576
      this._doc = doc;                                                                                                // 583
    } else {                                                                                                          // 582
      time = new Date();                                                                                              // 586
      this._doc = {                                                                                                   // 587
        runId: null,                                                                                                  // 588
        type: type,                                                                                                   // 589
        data: data,                                                                                                   // 590
        status: 'waiting',                                                                                            // 591
        updated: time,                                                                                                // 592
        created: time                                                                                                 // 593
      };                                                                                                              // 588
      this.priority().retry().repeat().after().progress().depends().log("Constructed");                               // 594
    }                                                                                                                 // 848
                                                                                                                      //
    return this;                                                                                                      // 596
  }                                                                                                                   // 554
                                                                                                                      //
  Job.prototype._echo = function (message, level) {                                                                   // 852
    if (level == null) {                                                                                              // 853
      level = null;                                                                                                   // 599
    }                                                                                                                 // 855
                                                                                                                      //
    switch (level) {                                                                                                  // 600
      case 'danger':                                                                                                  // 600
        console.error(message);                                                                                       // 601
        break;                                                                                                        // 601
                                                                                                                      //
      case 'warning':                                                                                                 // 600
        console.warn(message);                                                                                        // 602
        break;                                                                                                        // 602
                                                                                                                      //
      case 'success':                                                                                                 // 600
        console.log(message);                                                                                         // 603
        break;                                                                                                        // 603
                                                                                                                      //
      default:                                                                                                        // 600
        console.info(message);                                                                                        // 604
    }                                                                                                                 // 600
  };                                                                                                                  // 599
                                                                                                                      //
  Job.prototype.depends = function (jobs) {                                                                           // 871
    var depends, j, k, len;                                                                                           // 610
                                                                                                                      //
    if (jobs) {                                                                                                       // 610
      if (jobs instanceof Job) {                                                                                      // 611
        jobs = [jobs];                                                                                                // 612
      }                                                                                                               // 876
                                                                                                                      //
      if (jobs instanceof Array) {                                                                                    // 613
        depends = this._doc.depends;                                                                                  // 614
                                                                                                                      //
        for (k = 0, len = jobs.length; k < len; k++) {                                                                // 615
          j = jobs[k];                                                                                                // 880
                                                                                                                      //
          if (!(j instanceof Job && j._doc._id != null)) {                                                            // 616
            throw new Error('Each provided object must be a saved Job instance (with an _id)');                       // 617
          }                                                                                                           // 883
                                                                                                                      //
          depends.push(j._doc._id);                                                                                   // 618
        }                                                                                                             // 613
      } else {                                                                                                        // 613
        throw new Error('Bad input parameter: depends() accepts a falsy value, or Job or array of Jobs');             // 620
      }                                                                                                               // 610
    } else {                                                                                                          // 610
      depends = [];                                                                                                   // 622
    }                                                                                                                 // 891
                                                                                                                      //
    this._doc.depends = depends;                                                                                      // 623
    this._doc.resolved = [];                                                                                          // 624
    return this;                                                                                                      // 625
  };                                                                                                                  // 609
                                                                                                                      //
  Job.prototype.priority = function (level) {                                                                         // 897
    var priority;                                                                                                     // 629
                                                                                                                      //
    if (level == null) {                                                                                              // 899
      level = 0;                                                                                                      // 628
    }                                                                                                                 // 901
                                                                                                                      //
    if (typeof level === 'string') {                                                                                  // 629
      priority = Job.jobPriorities[level];                                                                            // 630
                                                                                                                      //
      if (priority == null) {                                                                                         // 631
        throw new Error('Invalid string priority level provided');                                                    // 632
      }                                                                                                               // 629
    } else if (isInteger(level)) {                                                                                    // 629
      priority = level;                                                                                               // 634
    } else {                                                                                                          // 633
      throw new Error('priority must be an integer or valid priority level');                                         // 636
      priority = 0;                                                                                                   // 637
    }                                                                                                                 // 912
                                                                                                                      //
    this._doc.priority = priority;                                                                                    // 638
    return this;                                                                                                      // 639
  };                                                                                                                  // 628
                                                                                                                      //
  Job.prototype.retry = function (options) {                                                                          // 917
    var base, ref;                                                                                                    // 645
                                                                                                                      //
    if (options == null) {                                                                                            // 919
      options = 0;                                                                                                    // 644
    }                                                                                                                 // 921
                                                                                                                      //
    if (isInteger(options) && options >= 0) {                                                                         // 645
      options = {                                                                                                     // 646
        retries: options                                                                                              // 646
      };                                                                                                              // 646
    }                                                                                                                 // 926
                                                                                                                      //
    if ((typeof options === "undefined" ? "undefined" : _typeof(options)) !== 'object') {                             // 647
      throw new Error('bad parameter: accepts either an integer >= 0 or an options object');                          // 648
    }                                                                                                                 // 929
                                                                                                                      //
    if (options.retries != null) {                                                                                    // 649
      if (!(isInteger(options.retries) && options.retries >= 0)) {                                                    // 650
        throw new Error('bad option: retries must be an integer >= 0');                                               // 651
      }                                                                                                               // 933
                                                                                                                      //
      options.retries++;                                                                                              // 652
    } else {                                                                                                          // 649
      options.retries = Job.forever;                                                                                  // 654
    }                                                                                                                 // 937
                                                                                                                      //
    if (options.until != null) {                                                                                      // 655
      if (!(options.until instanceof Date)) {                                                                         // 656
        throw new Error('bad option: until must be a Date object');                                                   // 657
      }                                                                                                               // 655
    } else {                                                                                                          // 655
      options.until = Job.foreverDate;                                                                                // 659
    }                                                                                                                 // 944
                                                                                                                      //
    if (options.wait != null) {                                                                                       // 660
      if (!(isInteger(options.wait) && options.wait >= 0)) {                                                          // 661
        throw new Error('bad option: wait must be an integer >= 0');                                                  // 662
      }                                                                                                               // 660
    } else {                                                                                                          // 660
      options.wait = 5 * 60 * 1000;                                                                                   // 664
    }                                                                                                                 // 951
                                                                                                                      //
    if (options.backoff != null) {                                                                                    // 665
      if (ref = options.backoff, indexOf.call(Job.jobRetryBackoffMethods, ref) < 0) {                                 // 666
        throw new Error('bad option: invalid retry backoff method');                                                  // 667
      }                                                                                                               // 665
    } else {                                                                                                          // 665
      options.backoff = 'constant';                                                                                   // 669
    }                                                                                                                 // 958
                                                                                                                      //
    this._doc.retries = options.retries;                                                                              // 671
    this._doc.repeatRetries = options.retries;                                                                        // 672
    this._doc.retryWait = options.wait;                                                                               // 673
                                                                                                                      //
    if ((base = this._doc).retried == null) {                                                                         // 962
      base.retried = 0;                                                                                               // 963
    }                                                                                                                 // 964
                                                                                                                      //
    this._doc.retryBackoff = options.backoff;                                                                         // 675
    this._doc.retryUntil = options.until;                                                                             // 676
    return this;                                                                                                      // 677
  };                                                                                                                  // 644
                                                                                                                      //
  Job.prototype.repeat = function (options) {                                                                         // 970
    var base, ref;                                                                                                    // 683
                                                                                                                      //
    if (options == null) {                                                                                            // 972
      options = 0;                                                                                                    // 682
    }                                                                                                                 // 974
                                                                                                                      //
    if (isInteger(options) && options >= 0) {                                                                         // 683
      options = {                                                                                                     // 684
        repeats: options                                                                                              // 684
      };                                                                                                              // 684
    }                                                                                                                 // 979
                                                                                                                      //
    if ((typeof options === "undefined" ? "undefined" : _typeof(options)) !== 'object') {                             // 685
      throw new Error('bad parameter: accepts either an integer >= 0 or an options object');                          // 686
    }                                                                                                                 // 982
                                                                                                                      //
    if (options.wait != null && options.schedule != null) {                                                           // 687
      throw new Error('bad options: wait and schedule options are mutually exclusive');                               // 688
    }                                                                                                                 // 985
                                                                                                                      //
    if (options.repeats != null) {                                                                                    // 689
      if (!(isInteger(options.repeats) && options.repeats >= 0)) {                                                    // 690
        throw new Error('bad option: repeats must be an integer >= 0');                                               // 691
      }                                                                                                               // 689
    } else {                                                                                                          // 689
      options.repeats = Job.forever;                                                                                  // 693
    }                                                                                                                 // 992
                                                                                                                      //
    if (options.until != null) {                                                                                      // 694
      if (!(options.until instanceof Date)) {                                                                         // 695
        throw new Error('bad option: until must be a Date object');                                                   // 696
      }                                                                                                               // 694
    } else {                                                                                                          // 694
      options.until = Job.foreverDate;                                                                                // 698
    }                                                                                                                 // 999
                                                                                                                      //
    if (options.wait != null) {                                                                                       // 699
      if (!(isInteger(options.wait) && options.wait >= 0)) {                                                          // 700
        throw new Error('bad option: wait must be an integer >= 0');                                                  // 701
      }                                                                                                               // 699
    } else {                                                                                                          // 699
      options.wait = 5 * 60 * 1000;                                                                                   // 703
    }                                                                                                                 // 1006
                                                                                                                      //
    if (options.schedule != null) {                                                                                   // 704
      if (_typeof(options.schedule) !== 'object') {                                                                   // 705
        throw new Error('bad option, schedule option must be an object');                                             // 706
      }                                                                                                               // 1010
                                                                                                                      //
      if (!(((ref = options.schedule) != null ? ref.schedules : void 0) != null && options.schedule.schedules instanceof Array)) {
        throw new Error('bad option, schedule object requires a schedules attribute of type Array.');                 // 708
      }                                                                                                               // 1013
                                                                                                                      //
      if (options.schedule.exceptions != null && !(options.schedule.exceptions instanceof Array)) {                   // 709
        throw new Error('bad option, schedule object exceptions attribute must be an Array');                         // 710
      }                                                                                                               // 1016
                                                                                                                      //
      options.wait = {                                                                                                // 711
        schedules: options.schedule.schedules,                                                                        // 712
        exceptions: options.schedule.exceptions                                                                       // 713
      };                                                                                                              // 712
    }                                                                                                                 // 1021
                                                                                                                      //
    this._doc.repeats = options.repeats;                                                                              // 715
    this._doc.repeatWait = options.wait;                                                                              // 716
                                                                                                                      //
    if ((base = this._doc).repeated == null) {                                                                        // 1024
      base.repeated = 0;                                                                                              // 1025
    }                                                                                                                 // 1026
                                                                                                                      //
    this._doc.repeatUntil = options.until;                                                                            // 718
    return this;                                                                                                      // 719
  };                                                                                                                  // 682
                                                                                                                      //
  Job.prototype.delay = function (wait) {                                                                             // 1031
    if (wait == null) {                                                                                               // 1032
      wait = 0;                                                                                                       // 722
    }                                                                                                                 // 1034
                                                                                                                      //
    if (!(isInteger(wait) && wait >= 0)) {                                                                            // 723
      throw new Error('Bad parameter, delay requires a non-negative integer.');                                       // 724
    }                                                                                                                 // 1037
                                                                                                                      //
    return this.after(new Date(new Date().valueOf() + wait));                                                         // 725
  };                                                                                                                  // 722
                                                                                                                      //
  Job.prototype.after = function (time) {                                                                             // 1041
    var after;                                                                                                        // 729
                                                                                                                      //
    if (time == null) {                                                                                               // 1043
      time = new Date(0);                                                                                             // 728
    }                                                                                                                 // 1045
                                                                                                                      //
    if ((typeof time === "undefined" ? "undefined" : _typeof(time)) === 'object' && time instanceof Date) {           // 729
      after = time;                                                                                                   // 730
    } else {                                                                                                          // 729
      throw new Error('Bad parameter, after requires a valid Date object');                                           // 732
    }                                                                                                                 // 1050
                                                                                                                      //
    this._doc.after = after;                                                                                          // 733
    return this;                                                                                                      // 734
  };                                                                                                                  // 728
                                                                                                                      //
  Job.prototype.log = function () {                                                                                   // 1055
    var base, cb, k, message, options, ref, ref1;                                                                     // 738
    message = arguments[0], options = 3 <= arguments.length ? slice.call(arguments, 1, k = arguments.length - 1) : (k = 1, []), cb = arguments[k++];
    ref = optionsHelp(options, cb), options = ref[0], cb = ref[1];                                                    // 738
                                                                                                                      //
    if (options.level == null) {                                                                                      // 1059
      options.level = 'info';                                                                                         // 739
    }                                                                                                                 // 1061
                                                                                                                      //
    if (typeof message !== 'string') {                                                                                // 740
      throw new Error('Log message must be a string');                                                                // 741
    }                                                                                                                 // 1064
                                                                                                                      //
    if (!(typeof options.level === 'string' && (ref1 = options.level, indexOf.call(Job.jobLogLevels, ref1) >= 0))) {  // 742
      throw new Error('Log level options must be one of Job.jobLogLevels');                                           // 743
    }                                                                                                                 // 1067
                                                                                                                      //
    if (options.echo != null) {                                                                                       // 744
      if (options.echo && Job.jobLogLevels.indexOf(options.level) >= Job.jobLogLevels.indexOf(options.echo)) {        // 745
        this._echo("LOG: " + options.level + ", " + this._doc._id + " " + this._doc.runId + ": " + message, options.level);
      }                                                                                                               // 1071
                                                                                                                      //
      delete options.echo;                                                                                            // 747
    }                                                                                                                 // 1073
                                                                                                                      //
    if (this._doc._id != null) {                                                                                      // 748
      return methodCall(this._root, "jobLog", [this._doc._id, this._doc.runId, message, options], cb);                // 749
    } else {                                                                                                          // 748
      if ((base = this._doc).log == null) {                                                                           // 1077
        base.log = [];                                                                                                // 1078
      }                                                                                                               // 1079
                                                                                                                      //
      this._doc.log.push({                                                                                            // 752
        time: new Date(),                                                                                             // 752
        runId: null,                                                                                                  // 752
        level: options.level,                                                                                         // 752
        message: message                                                                                              // 752
      });                                                                                                             // 752
                                                                                                                      //
      if (cb != null && typeof cb === 'function') {                                                                   // 753
        _setImmediate(cb, null, true);                                                                                // 754
      }                                                                                                               // 1088
                                                                                                                      //
      return this;                                                                                                    // 755
    }                                                                                                                 // 1090
  };                                                                                                                  // 737
                                                                                                                      //
  Job.prototype.progress = function () {                                                                              // 1093
    var cb, completed, k, options, progress, ref, total;                                                              // 760
    completed = arguments[0], total = arguments[1], options = 4 <= arguments.length ? slice.call(arguments, 2, k = arguments.length - 1) : (k = 2, []), cb = arguments[k++];
                                                                                                                      //
    if (completed == null) {                                                                                          // 1096
      completed = 0;                                                                                                  // 759
    }                                                                                                                 // 1098
                                                                                                                      //
    if (total == null) {                                                                                              // 1099
      total = 1;                                                                                                      // 759
    }                                                                                                                 // 1101
                                                                                                                      //
    ref = optionsHelp(options, cb), options = ref[0], cb = ref[1];                                                    // 760
                                                                                                                      //
    if (typeof completed === 'number' && typeof total === 'number' && completed >= 0 && total > 0 && total >= completed) {
      progress = {                                                                                                    // 766
        completed: completed,                                                                                         // 767
        total: total,                                                                                                 // 768
        percent: 100 * completed / total                                                                              // 769
      };                                                                                                              // 767
                                                                                                                      //
      if (options.echo) {                                                                                             // 770
        delete options.echo;                                                                                          // 771
                                                                                                                      //
        this._echo("PROGRESS: " + this._doc._id + " " + this._doc.runId + ": " + progress.completed + " out of " + progress.total + " (" + progress.percent + "%)");
      }                                                                                                               // 1112
                                                                                                                      //
      if (this._doc._id != null && this._doc.runId != null) {                                                         // 773
        return methodCall(this._root, "jobProgress", [this._doc._id, this._doc.runId, completed, total, options], cb, function (_this) {
          return function (res) {                                                                                     // 1115
            if (res) {                                                                                                // 775
              _this._doc.progress = progress;                                                                         // 776
            }                                                                                                         // 1118
                                                                                                                      //
            return res;                                                                                               // 1119
          };                                                                                                          // 774
        }(this));                                                                                                     // 774
      } else if (this._doc._id == null) {                                                                             // 773
        this._doc.progress = progress;                                                                                // 779
                                                                                                                      //
        if (cb != null && typeof cb === 'function') {                                                                 // 780
          _setImmediate(cb, null, true);                                                                              // 781
        }                                                                                                             // 1126
                                                                                                                      //
        return this;                                                                                                  // 782
      }                                                                                                               // 761
    } else {                                                                                                          // 761
      throw new Error("job.progress: something is wrong with progress params: " + this.id + ", " + completed + " out of " + total);
    }                                                                                                                 // 1131
                                                                                                                      //
    return null;                                                                                                      // 785
  };                                                                                                                  // 759
                                                                                                                      //
  Job.prototype.save = function () {                                                                                  // 1135
    var cb, k, options, ref;                                                                                          // 790
    options = 2 <= arguments.length ? slice.call(arguments, 0, k = arguments.length - 1) : (k = 0, []), cb = arguments[k++];
    ref = optionsHelp(options, cb), options = ref[0], cb = ref[1];                                                    // 790
    return methodCall(this._root, "jobSave", [this._doc, options], cb, function (_this) {                             // 791
      return function (id) {                                                                                          // 1140
        if (id) {                                                                                                     // 792
          _this._doc._id = id;                                                                                        // 793
        }                                                                                                             // 1143
                                                                                                                      //
        return id;                                                                                                    // 1144
      };                                                                                                              // 791
    }(this));                                                                                                         // 791
  };                                                                                                                  // 789
                                                                                                                      //
  Job.prototype.refresh = function () {                                                                               // 1149
    var cb, k, options, ref;                                                                                          // 798
    options = 2 <= arguments.length ? slice.call(arguments, 0, k = arguments.length - 1) : (k = 0, []), cb = arguments[k++];
    ref = optionsHelp(options, cb), options = ref[0], cb = ref[1];                                                    // 798
                                                                                                                      //
    if (options.getLog == null) {                                                                                     // 1153
      options.getLog = false;                                                                                         // 799
    }                                                                                                                 // 1155
                                                                                                                      //
    if (this._doc._id != null) {                                                                                      // 800
      return methodCall(this._root, "getJob", [this._doc._id, options], cb, function (_this) {                        // 801
        return function (doc) {                                                                                       // 1158
          if (doc != null) {                                                                                          // 802
            _this._doc = doc;                                                                                         // 803
            return _this;                                                                                             // 1161
          } else {                                                                                                    // 802
            return false;                                                                                             // 1163
          }                                                                                                           // 1164
        };                                                                                                            // 801
      }(this));                                                                                                       // 801
    } else {                                                                                                          // 800
      throw new Error("Can't call .refresh() on an unsaved job");                                                     // 808
    }                                                                                                                 // 1169
  };                                                                                                                  // 797
                                                                                                                      //
  Job.prototype.done = function () {                                                                                  // 1172
    var cb, k, options, ref, result;                                                                                  // 812
    result = arguments[0], options = 3 <= arguments.length ? slice.call(arguments, 1, k = arguments.length - 1) : (k = 1, []), cb = arguments[k++];
                                                                                                                      //
    if (result == null) {                                                                                             // 1175
      result = {};                                                                                                    // 811
    }                                                                                                                 // 1177
                                                                                                                      //
    if (typeof result === 'function') {                                                                               // 812
      cb = result;                                                                                                    // 813
      result = {};                                                                                                    // 814
    }                                                                                                                 // 1181
                                                                                                                      //
    ref = optionsHelp(options, cb), options = ref[0], cb = ref[1];                                                    // 815
                                                                                                                      //
    if (!(result != null && (typeof result === "undefined" ? "undefined" : _typeof(result)) === 'object')) {          // 816
      result = {                                                                                                      // 817
        value: result                                                                                                 // 817
      };                                                                                                              // 817
    }                                                                                                                 // 1187
                                                                                                                      //
    if (this._doc._id != null && this._doc.runId != null) {                                                           // 818
      return methodCall(this._root, "jobDone", [this._doc._id, this._doc.runId, result, options], cb);                // 819
    } else {                                                                                                          // 818
      throw new Error("Can't call .done() on an unsaved or non-running job");                                         // 821
    }                                                                                                                 // 1192
                                                                                                                      //
    return null;                                                                                                      // 822
  };                                                                                                                  // 811
                                                                                                                      //
  Job.prototype.fail = function () {                                                                                  // 1196
    var cb, k, options, ref, result;                                                                                  // 826
    result = arguments[0], options = 3 <= arguments.length ? slice.call(arguments, 1, k = arguments.length - 1) : (k = 1, []), cb = arguments[k++];
                                                                                                                      //
    if (result == null) {                                                                                             // 1199
      result = "No error information provided";                                                                       // 825
    }                                                                                                                 // 1201
                                                                                                                      //
    if (typeof result === 'function') {                                                                               // 826
      cb = result;                                                                                                    // 827
      result = "No error information provided";                                                                       // 828
    }                                                                                                                 // 1205
                                                                                                                      //
    ref = optionsHelp(options, cb), options = ref[0], cb = ref[1];                                                    // 829
                                                                                                                      //
    if (!(result != null && (typeof result === "undefined" ? "undefined" : _typeof(result)) === 'object')) {          // 830
      result = {                                                                                                      // 831
        value: result                                                                                                 // 831
      };                                                                                                              // 831
    }                                                                                                                 // 1211
                                                                                                                      //
    if (options.fatal == null) {                                                                                      // 1212
      options.fatal = false;                                                                                          // 832
    }                                                                                                                 // 1214
                                                                                                                      //
    if (this._doc._id != null && this._doc.runId != null) {                                                           // 833
      return methodCall(this._root, "jobFail", [this._doc._id, this._doc.runId, result, options], cb);                // 834
    } else {                                                                                                          // 833
      throw new Error("Can't call .fail() on an unsaved or non-running job");                                         // 836
    }                                                                                                                 // 1219
                                                                                                                      //
    return null;                                                                                                      // 837
  };                                                                                                                  // 825
                                                                                                                      //
  Job.prototype.pause = function () {                                                                                 // 1223
    var cb, k, options, ref;                                                                                          // 841
    options = 2 <= arguments.length ? slice.call(arguments, 0, k = arguments.length - 1) : (k = 0, []), cb = arguments[k++];
    ref = optionsHelp(options, cb), options = ref[0], cb = ref[1];                                                    // 841
                                                                                                                      //
    if (this._doc._id != null) {                                                                                      // 842
      return methodCall(this._root, "jobPause", [this._doc._id, options], cb);                                        // 843
    } else {                                                                                                          // 842
      this._doc.status = 'paused';                                                                                    // 845
                                                                                                                      //
      if (cb != null && typeof cb === 'function') {                                                                   // 846
        _setImmediate(cb, null, true);                                                                                // 847
      }                                                                                                               // 1233
                                                                                                                      //
      return this;                                                                                                    // 848
    }                                                                                                                 // 1235
                                                                                                                      //
    return null;                                                                                                      // 849
  };                                                                                                                  // 840
                                                                                                                      //
  Job.prototype.resume = function () {                                                                                // 1239
    var cb, k, options, ref;                                                                                          // 854
    options = 2 <= arguments.length ? slice.call(arguments, 0, k = arguments.length - 1) : (k = 0, []), cb = arguments[k++];
    ref = optionsHelp(options, cb), options = ref[0], cb = ref[1];                                                    // 854
                                                                                                                      //
    if (this._doc._id != null) {                                                                                      // 855
      return methodCall(this._root, "jobResume", [this._doc._id, options], cb);                                       // 856
    } else {                                                                                                          // 855
      this._doc.status = 'waiting';                                                                                   // 858
                                                                                                                      //
      if (cb != null && typeof cb === 'function') {                                                                   // 859
        _setImmediate(cb, null, true);                                                                                // 860
      }                                                                                                               // 1249
                                                                                                                      //
      return this;                                                                                                    // 861
    }                                                                                                                 // 1251
                                                                                                                      //
    return null;                                                                                                      // 862
  };                                                                                                                  // 853
                                                                                                                      //
  Job.prototype.ready = function () {                                                                                 // 1255
    var cb, k, options, ref;                                                                                          // 866
    options = 2 <= arguments.length ? slice.call(arguments, 0, k = arguments.length - 1) : (k = 0, []), cb = arguments[k++];
    ref = optionsHelp(options, cb), options = ref[0], cb = ref[1];                                                    // 866
                                                                                                                      //
    if (options.force == null) {                                                                                      // 1259
      options.force = false;                                                                                          // 867
    }                                                                                                                 // 1261
                                                                                                                      //
    if (this._doc._id != null) {                                                                                      // 868
      return methodCall(this._root, "jobReady", [this._doc._id, options], cb);                                        // 869
    } else {                                                                                                          // 868
      throw new Error("Can't call .ready() on an unsaved job");                                                       // 871
    }                                                                                                                 // 1266
                                                                                                                      //
    return null;                                                                                                      // 872
  };                                                                                                                  // 865
                                                                                                                      //
  Job.prototype.cancel = function () {                                                                                // 1270
    var cb, k, options, ref;                                                                                          // 876
    options = 2 <= arguments.length ? slice.call(arguments, 0, k = arguments.length - 1) : (k = 0, []), cb = arguments[k++];
    ref = optionsHelp(options, cb), options = ref[0], cb = ref[1];                                                    // 876
                                                                                                                      //
    if (options.antecedents == null) {                                                                                // 1274
      options.antecedents = true;                                                                                     // 877
    }                                                                                                                 // 1276
                                                                                                                      //
    if (this._doc._id != null) {                                                                                      // 878
      return methodCall(this._root, "jobCancel", [this._doc._id, options], cb);                                       // 879
    } else {                                                                                                          // 878
      throw new Error("Can't call .cancel() on an unsaved job");                                                      // 881
    }                                                                                                                 // 1281
                                                                                                                      //
    return null;                                                                                                      // 882
  };                                                                                                                  // 875
                                                                                                                      //
  Job.prototype.restart = function () {                                                                               // 1285
    var cb, k, options, ref;                                                                                          // 886
    options = 2 <= arguments.length ? slice.call(arguments, 0, k = arguments.length - 1) : (k = 0, []), cb = arguments[k++];
    ref = optionsHelp(options, cb), options = ref[0], cb = ref[1];                                                    // 886
                                                                                                                      //
    if (options.retries == null) {                                                                                    // 1289
      options.retries = 1;                                                                                            // 887
    }                                                                                                                 // 1291
                                                                                                                      //
    if (options.dependents == null) {                                                                                 // 1292
      options.dependents = true;                                                                                      // 888
    }                                                                                                                 // 1294
                                                                                                                      //
    if (this._doc._id != null) {                                                                                      // 889
      return methodCall(this._root, "jobRestart", [this._doc._id, options], cb);                                      // 890
    } else {                                                                                                          // 889
      throw new Error("Can't call .restart() on an unsaved job");                                                     // 892
    }                                                                                                                 // 1299
                                                                                                                      //
    return null;                                                                                                      // 893
  };                                                                                                                  // 885
                                                                                                                      //
  Job.prototype.rerun = function () {                                                                                 // 1303
    var cb, k, options, ref;                                                                                          // 897
    options = 2 <= arguments.length ? slice.call(arguments, 0, k = arguments.length - 1) : (k = 0, []), cb = arguments[k++];
    ref = optionsHelp(options, cb), options = ref[0], cb = ref[1];                                                    // 897
                                                                                                                      //
    if (options.repeats == null) {                                                                                    // 1307
      options.repeats = 0;                                                                                            // 898
    }                                                                                                                 // 1309
                                                                                                                      //
    if (options.wait == null) {                                                                                       // 1310
      options.wait = this._doc.repeatWait;                                                                            // 899
    }                                                                                                                 // 1312
                                                                                                                      //
    if (this._doc._id != null) {                                                                                      // 900
      return methodCall(this._root, "jobRerun", [this._doc._id, options], cb);                                        // 901
    } else {                                                                                                          // 900
      throw new Error("Can't call .rerun() on an unsaved job");                                                       // 903
    }                                                                                                                 // 1317
                                                                                                                      //
    return null;                                                                                                      // 904
  };                                                                                                                  // 896
                                                                                                                      //
  Job.prototype.remove = function () {                                                                                // 1321
    var cb, k, options, ref;                                                                                          // 908
    options = 2 <= arguments.length ? slice.call(arguments, 0, k = arguments.length - 1) : (k = 0, []), cb = arguments[k++];
    ref = optionsHelp(options, cb), options = ref[0], cb = ref[1];                                                    // 908
                                                                                                                      //
    if (this._doc._id != null) {                                                                                      // 909
      return methodCall(this._root, "jobRemove", [this._doc._id, options], cb);                                       // 910
    } else {                                                                                                          // 909
      throw new Error("Can't call .remove() on an unsaved job");                                                      // 912
    }                                                                                                                 // 1329
                                                                                                                      //
    return null;                                                                                                      // 913
  };                                                                                                                  // 907
                                                                                                                      //
  Object.defineProperties(Job.prototype, {                                                                            // 916
    doc: {                                                                                                            // 917
      get: function () {                                                                                              // 918
        return this._doc;                                                                                             // 1336
      },                                                                                                              // 918
      set: function () {                                                                                              // 919
        return console.warn("Job.doc cannot be directly assigned.");                                                  // 1339
      }                                                                                                               // 918
    },                                                                                                                // 918
    type: {                                                                                                           // 920
      get: function () {                                                                                              // 921
        return this._doc.type;                                                                                        // 1344
      },                                                                                                              // 921
      set: function () {                                                                                              // 922
        return console.warn("Job.type cannot be directly assigned.");                                                 // 1347
      }                                                                                                               // 921
    },                                                                                                                // 921
    data: {                                                                                                           // 923
      get: function () {                                                                                              // 924
        return this._doc.data;                                                                                        // 1352
      },                                                                                                              // 924
      set: function () {                                                                                              // 925
        return console.warn("Job.data cannot be directly assigned.");                                                 // 1355
      }                                                                                                               // 924
    }                                                                                                                 // 924
  });                                                                                                                 // 917
  return Job;                                                                                                         // 1360
}();                                                                                                                  // 1362
                                                                                                                      //
if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {                           // 928
  module.exports = Job;                                                                                               // 929
}                                                                                                                     // 1366
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/vsivsi_job-collection/src/shared.coffee.js                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var JobCollectionBase,                                                                                                // 7
    _validId,                                                                                                         // 7
    _validIntGTEOne,                                                                                                  // 7
    _validIntGTEZero,                                                                                                 // 7
    _validJobDoc,                                                                                                     // 7
    _validLaterJSObj,                                                                                                 // 7
    _validLog,                                                                                                        // 7
    _validLogLevel,                                                                                                   // 7
    _validNumGTEOne,                                                                                                  // 7
    _validNumGTEZero,                                                                                                 // 7
    _validNumGTZero,                                                                                                  // 7
    _validProgress,                                                                                                   // 7
    _validRetryBackoff,                                                                                               // 7
    _validStatus,                                                                                                     // 7
    indexOf = [].indexOf || function (item) {                                                                         // 7
  for (var i = 0, l = this.length; i < l; i++) {                                                                      // 7
    if (i in this && this[i] === item) return i;                                                                      // 7
  }                                                                                                                   // 7
                                                                                                                      //
  return -1;                                                                                                          // 7
},                                                                                                                    // 7
    extend = function (child, parent) {                                                                               // 7
  for (var key in meteorBabelHelpers.sanitizeForInObject(parent)) {                                                   // 3
    if (hasProp.call(parent, key)) child[key] = parent[key];                                                          // 3
  }                                                                                                                   // 3
                                                                                                                      //
  function ctor() {                                                                                                   // 3
    this.constructor = child;                                                                                         // 3
  }                                                                                                                   // 3
                                                                                                                      //
  ctor.prototype = parent.prototype;                                                                                  // 3
  child.prototype = new ctor();                                                                                       // 3
  child.__super__ = parent.prototype;                                                                                 // 3
  return child;                                                                                                       // 3
},                                                                                                                    // 3
    hasProp = {}.hasOwnProperty,                                                                                      // 7
    slice = [].slice;                                                                                                 // 7
                                                                                                                      //
_validNumGTEZero = function (v) {                                                                                     // 7
  return Match.test(v, Number) && v >= 0.0;                                                                           // 8
};                                                                                                                    // 7
                                                                                                                      //
_validNumGTZero = function (v) {                                                                                      // 10
  return Match.test(v, Number) && v > 0.0;                                                                            // 12
};                                                                                                                    // 10
                                                                                                                      //
_validNumGTEOne = function (v) {                                                                                      // 13
  return Match.test(v, Number) && v >= 1.0;                                                                           // 16
};                                                                                                                    // 13
                                                                                                                      //
_validIntGTEZero = function (v) {                                                                                     // 16
  return _validNumGTEZero(v) && Math.floor(v) === v;                                                                  // 20
};                                                                                                                    // 16
                                                                                                                      //
_validIntGTEOne = function (v) {                                                                                      // 19
  return _validNumGTEOne(v) && Math.floor(v) === v;                                                                   // 24
};                                                                                                                    // 19
                                                                                                                      //
_validStatus = function (v) {                                                                                         // 22
  return Match.test(v, String) && indexOf.call(Job.jobStatuses, v) >= 0;                                              // 28
};                                                                                                                    // 22
                                                                                                                      //
_validLogLevel = function (v) {                                                                                       // 25
  return Match.test(v, String) && indexOf.call(Job.jobLogLevels, v) >= 0;                                             // 32
};                                                                                                                    // 25
                                                                                                                      //
_validRetryBackoff = function (v) {                                                                                   // 28
  return Match.test(v, String) && indexOf.call(Job.jobRetryBackoffMethods, v) >= 0;                                   // 36
};                                                                                                                    // 28
                                                                                                                      //
_validId = function (v) {                                                                                             // 31
  return Match.test(v, Match.OneOf(String, Mongo.Collection.ObjectID));                                               // 40
};                                                                                                                    // 31
                                                                                                                      //
_validLog = function () {                                                                                             // 34
  return [{                                                                                                           // 44
    time: Date,                                                                                                       // 36
    runId: Match.OneOf(Match.Where(_validId), null),                                                                  // 37
    level: Match.Where(_validLogLevel),                                                                               // 38
    message: String,                                                                                                  // 39
    data: Match.Optional(Object)                                                                                      // 40
  }];                                                                                                                 // 35
};                                                                                                                    // 34
                                                                                                                      //
_validProgress = function () {                                                                                        // 43
  return {                                                                                                            // 56
    completed: Match.Where(_validNumGTEZero),                                                                         // 44
    total: Match.Where(_validNumGTEZero),                                                                             // 45
    percent: Match.Where(_validNumGTEZero)                                                                            // 46
  };                                                                                                                  // 44
};                                                                                                                    // 43
                                                                                                                      //
_validLaterJSObj = function () {                                                                                      // 48
  return {                                                                                                            // 64
    schedules: [Object],                                                                                              // 49
    exceptions: Match.Optional([Object])                                                                              // 50
  };                                                                                                                  // 49
};                                                                                                                    // 48
                                                                                                                      //
_validJobDoc = function () {                                                                                          // 52
  return {                                                                                                            // 71
    _id: Match.Optional(Match.OneOf(Match.Where(_validId), null)),                                                    // 53
    runId: Match.OneOf(Match.Where(_validId), null),                                                                  // 54
    type: String,                                                                                                     // 55
    status: Match.Where(_validStatus),                                                                                // 56
    data: Object,                                                                                                     // 57
    result: Match.Optional(Object),                                                                                   // 58
    failures: Match.Optional([Object]),                                                                               // 59
    priority: Match.Integer,                                                                                          // 60
    depends: [Match.Where(_validId)],                                                                                 // 61
    resolved: [Match.Where(_validId)],                                                                                // 62
    after: Date,                                                                                                      // 63
    updated: Date,                                                                                                    // 64
    workTimeout: Match.Optional(Match.Where(_validIntGTEOne)),                                                        // 65
    expiresAfter: Match.Optional(Date),                                                                               // 66
    log: Match.Optional(_validLog()),                                                                                 // 67
    progress: _validProgress(),                                                                                       // 68
    retries: Match.Where(_validIntGTEZero),                                                                           // 69
    retried: Match.Where(_validIntGTEZero),                                                                           // 70
    repeatRetries: Match.Optional(Match.Where(_validIntGTEZero)),                                                     // 71
    retryUntil: Date,                                                                                                 // 72
    retryWait: Match.Where(_validIntGTEZero),                                                                         // 73
    retryBackoff: Match.Where(_validRetryBackoff),                                                                    // 74
    repeats: Match.Where(_validIntGTEZero),                                                                           // 75
    repeated: Match.Where(_validIntGTEZero),                                                                          // 76
    repeatUntil: Date,                                                                                                // 77
    repeatWait: Match.OneOf(Match.Where(_validIntGTEZero), Match.Where(_validLaterJSObj)),                            // 78
    created: Date                                                                                                     // 79
  };                                                                                                                  // 53
};                                                                                                                    // 52
                                                                                                                      //
JobCollectionBase = function (superClass) {                                                                           // 81
  extend(JobCollectionBase, superClass);                                                                              // 103
                                                                                                                      //
  function JobCollectionBase(root, options) {                                                                         // 83
    var collectionName;                                                                                               // 84
    this.root = root != null ? root : 'queue';                                                                        // 83
                                                                                                                      //
    if (options == null) {                                                                                            // 108
      options = {};                                                                                                   // 83
    }                                                                                                                 // 110
                                                                                                                      //
    if (!(this instanceof JobCollectionBase)) {                                                                       // 84
      return new JobCollectionBase(this.root, options);                                                               // 85
    }                                                                                                                 // 113
                                                                                                                      //
    if (!(this instanceof Mongo.Collection)) {                                                                        // 87
      throw new Error('The global definition of Mongo.Collection has changed since the job-collection package was loaded. Please ensure that any packages that redefine Mongo.Collection are loaded before job-collection.');
    }                                                                                                                 // 116
                                                                                                                      //
    if (Mongo.Collection !== Mongo.Collection.prototype.constructor) {                                                // 90
      throw new Meteor.Error('The global definition of Mongo.Collection has been patched by another package, and the prototype constructor has been left in an inconsistent state. Please see this link for a workaround: https://github.com/vsivsi/meteor-file-sample-app/issues/2#issuecomment-120780592');
    }                                                                                                                 // 119
                                                                                                                      //
    this.later = later;                                                                                               // 93
                                                                                                                      //
    if (options.noCollectionSuffix == null) {                                                                         // 121
      options.noCollectionSuffix = false;                                                                             // 95
    }                                                                                                                 // 123
                                                                                                                      //
    collectionName = this.root;                                                                                       // 97
                                                                                                                      //
    if (!options.noCollectionSuffix) {                                                                                // 99
      collectionName += '.jobs';                                                                                      // 100
    }                                                                                                                 // 127
                                                                                                                      //
    delete options.noCollectionSuffix;                                                                                // 104
    Job.setDDP(options.connection, this.root);                                                                        // 106
                                                                                                                      //
    this._createLogEntry = function (message, runId, level, time, data) {                                             // 108
      var l;                                                                                                          // 109
                                                                                                                      //
      if (message == null) {                                                                                          // 132
        message = '';                                                                                                 // 108
      }                                                                                                               // 134
                                                                                                                      //
      if (runId == null) {                                                                                            // 135
        runId = null;                                                                                                 // 108
      }                                                                                                               // 137
                                                                                                                      //
      if (level == null) {                                                                                            // 138
        level = 'info';                                                                                               // 108
      }                                                                                                               // 140
                                                                                                                      //
      if (time == null) {                                                                                             // 141
        time = new Date();                                                                                            // 108
      }                                                                                                               // 143
                                                                                                                      //
      if (data == null) {                                                                                             // 144
        data = null;                                                                                                  // 108
      }                                                                                                               // 146
                                                                                                                      //
      l = {                                                                                                           // 109
        time: time,                                                                                                   // 109
        runId: runId,                                                                                                 // 109
        message: message,                                                                                             // 109
        level: level                                                                                                  // 109
      };                                                                                                              // 109
      return l;                                                                                                       // 110
    };                                                                                                                // 108
                                                                                                                      //
    this._logMessage = {                                                                                              // 112
      'readied': function () {                                                                                        // 113
        return this._createLogEntry("Promoted to ready");                                                             // 157
      }.bind(this),                                                                                                   // 113
      'forced': function (id) {                                                                                       // 114
        return this._createLogEntry("Dependencies force resolved", null, 'warning');                                  // 160
      }.bind(this),                                                                                                   // 114
      'rerun': function (id, runId) {                                                                                 // 115
        return this._createLogEntry("Rerunning job", null, 'info', new Date(), {                                      // 163
          previousJob: {                                                                                              // 115
            id: id,                                                                                                   // 115
            runId: runId                                                                                              // 115
          }                                                                                                           // 115
        });                                                                                                           // 115
      }.bind(this),                                                                                                   // 115
      'running': function (runId) {                                                                                   // 116
        return this._createLogEntry("Job Running", runId);                                                            // 171
      }.bind(this),                                                                                                   // 116
      'paused': function () {                                                                                         // 117
        return this._createLogEntry("Job Paused");                                                                    // 174
      }.bind(this),                                                                                                   // 117
      'resumed': function () {                                                                                        // 118
        return this._createLogEntry("Job Resumed");                                                                   // 177
      }.bind(this),                                                                                                   // 118
      'cancelled': function () {                                                                                      // 119
        return this._createLogEntry("Job Cancelled", null, 'warning');                                                // 180
      }.bind(this),                                                                                                   // 119
      'restarted': function () {                                                                                      // 120
        return this._createLogEntry("Job Restarted");                                                                 // 183
      }.bind(this),                                                                                                   // 120
      'resubmitted': function () {                                                                                    // 121
        return this._createLogEntry("Job Resubmitted");                                                               // 186
      }.bind(this),                                                                                                   // 121
      'submitted': function () {                                                                                      // 122
        return this._createLogEntry("Job Submitted");                                                                 // 189
      }.bind(this),                                                                                                   // 122
      'completed': function (runId) {                                                                                 // 123
        return this._createLogEntry("Job Completed", runId, 'success');                                               // 192
      }.bind(this),                                                                                                   // 123
      'resolved': function (id, runId) {                                                                              // 124
        return this._createLogEntry("Dependency resolved", null, 'info', new Date(), {                                // 195
          dependency: {                                                                                               // 124
            id: id,                                                                                                   // 124
            runId: runId                                                                                              // 124
          }                                                                                                           // 124
        });                                                                                                           // 124
      }.bind(this),                                                                                                   // 124
      'failed': function (runId, fatal, err) {                                                                        // 125
        var level, msg, value;                                                                                        // 126
        value = err.value;                                                                                            // 126
        msg = "Job Failed with" + (fatal ? ' Fatal' : '') + " Error" + (value != null && typeof value === 'string' ? ': ' + value : '') + ".";
        level = fatal ? 'danger' : 'warning';                                                                         // 128
        return this._createLogEntry(msg, runId, level);                                                               // 207
      }.bind(this)                                                                                                    // 125
    };                                                                                                                // 113
                                                                                                                      //
    JobCollectionBase.__super__.constructor.call(this, collectionName, options);                                      // 132
  }                                                                                                                   // 83
                                                                                                                      //
  JobCollectionBase.prototype._validNumGTEZero = _validNumGTEZero;                                                    // 213
  JobCollectionBase.prototype._validNumGTZero = _validNumGTZero;                                                      // 215
  JobCollectionBase.prototype._validNumGTEOne = _validNumGTEOne;                                                      // 217
  JobCollectionBase.prototype._validIntGTEZero = _validIntGTEZero;                                                    // 219
  JobCollectionBase.prototype._validIntGTEOne = _validIntGTEOne;                                                      // 221
  JobCollectionBase.prototype._validStatus = _validStatus;                                                            // 223
  JobCollectionBase.prototype._validLogLevel = _validLogLevel;                                                        // 225
  JobCollectionBase.prototype._validRetryBackoff = _validRetryBackoff;                                                // 227
  JobCollectionBase.prototype._validId = _validId;                                                                    // 229
  JobCollectionBase.prototype._validLog = _validLog;                                                                  // 231
  JobCollectionBase.prototype._validProgress = _validProgress;                                                        // 233
  JobCollectionBase.prototype._validJobDoc = _validJobDoc;                                                            // 235
  JobCollectionBase.prototype.jobLogLevels = Job.jobLogLevels;                                                        // 237
  JobCollectionBase.prototype.jobPriorities = Job.jobPriorities;                                                      // 239
  JobCollectionBase.prototype.jobStatuses = Job.jobStatuses;                                                          // 241
  JobCollectionBase.prototype.jobStatusCancellable = Job.jobStatusCancellable;                                        // 243
  JobCollectionBase.prototype.jobStatusPausable = Job.jobStatusPausable;                                              // 245
  JobCollectionBase.prototype.jobStatusRemovable = Job.jobStatusRemovable;                                            // 247
  JobCollectionBase.prototype.jobStatusRestartable = Job.jobStatusRestartable;                                        // 249
  JobCollectionBase.prototype.forever = Job.forever;                                                                  // 251
  JobCollectionBase.prototype.foreverDate = Job.foreverDate;                                                          // 253
  JobCollectionBase.prototype.ddpMethods = Job.ddpMethods;                                                            // 255
  JobCollectionBase.prototype.ddpPermissionLevels = Job.ddpPermissionLevels;                                          // 257
  JobCollectionBase.prototype.ddpMethodPermissions = Job.ddpMethodPermissions;                                        // 259
                                                                                                                      //
  JobCollectionBase.prototype.processJobs = function () {                                                             // 261
    var params;                                                                                                       // 161
    params = 1 <= arguments.length ? slice.call(arguments, 0) : [];                                                   // 161
    return function (func, args, ctor) {                                                                              // 264
      ctor.prototype = func.prototype;                                                                                // 265
      var child = new ctor(),                                                                                         // 266
          result = func.apply(child, args);                                                                           // 266
      return Object(result) === result ? result : child;                                                              // 267
    }(Job.processJobs, [this.root].concat(slice.call(params)), function () {});                                       // 268
  };                                                                                                                  // 161
                                                                                                                      //
  JobCollectionBase.prototype.getJob = function () {                                                                  // 271
    var params;                                                                                                       // 162
    params = 1 <= arguments.length ? slice.call(arguments, 0) : [];                                                   // 162
    return Job.getJob.apply(Job, [this.root].concat(slice.call(params)));                                             // 274
  };                                                                                                                  // 162
                                                                                                                      //
  JobCollectionBase.prototype.getWork = function () {                                                                 // 277
    var params;                                                                                                       // 163
    params = 1 <= arguments.length ? slice.call(arguments, 0) : [];                                                   // 163
    return Job.getWork.apply(Job, [this.root].concat(slice.call(params)));                                            // 280
  };                                                                                                                  // 163
                                                                                                                      //
  JobCollectionBase.prototype.getJobs = function () {                                                                 // 283
    var params;                                                                                                       // 164
    params = 1 <= arguments.length ? slice.call(arguments, 0) : [];                                                   // 164
    return Job.getJobs.apply(Job, [this.root].concat(slice.call(params)));                                            // 286
  };                                                                                                                  // 164
                                                                                                                      //
  JobCollectionBase.prototype.readyJobs = function () {                                                               // 289
    var params;                                                                                                       // 165
    params = 1 <= arguments.length ? slice.call(arguments, 0) : [];                                                   // 165
    return Job.readyJobs.apply(Job, [this.root].concat(slice.call(params)));                                          // 292
  };                                                                                                                  // 165
                                                                                                                      //
  JobCollectionBase.prototype.cancelJobs = function () {                                                              // 295
    var params;                                                                                                       // 166
    params = 1 <= arguments.length ? slice.call(arguments, 0) : [];                                                   // 166
    return Job.cancelJobs.apply(Job, [this.root].concat(slice.call(params)));                                         // 298
  };                                                                                                                  // 166
                                                                                                                      //
  JobCollectionBase.prototype.pauseJobs = function () {                                                               // 301
    var params;                                                                                                       // 167
    params = 1 <= arguments.length ? slice.call(arguments, 0) : [];                                                   // 167
    return Job.pauseJobs.apply(Job, [this.root].concat(slice.call(params)));                                          // 304
  };                                                                                                                  // 167
                                                                                                                      //
  JobCollectionBase.prototype.resumeJobs = function () {                                                              // 307
    var params;                                                                                                       // 168
    params = 1 <= arguments.length ? slice.call(arguments, 0) : [];                                                   // 168
    return Job.resumeJobs.apply(Job, [this.root].concat(slice.call(params)));                                         // 310
  };                                                                                                                  // 168
                                                                                                                      //
  JobCollectionBase.prototype.restartJobs = function () {                                                             // 313
    var params;                                                                                                       // 169
    params = 1 <= arguments.length ? slice.call(arguments, 0) : [];                                                   // 169
    return Job.restartJobs.apply(Job, [this.root].concat(slice.call(params)));                                        // 316
  };                                                                                                                  // 169
                                                                                                                      //
  JobCollectionBase.prototype.removeJobs = function () {                                                              // 319
    var params;                                                                                                       // 170
    params = 1 <= arguments.length ? slice.call(arguments, 0) : [];                                                   // 170
    return Job.removeJobs.apply(Job, [this.root].concat(slice.call(params)));                                         // 322
  };                                                                                                                  // 170
                                                                                                                      //
  JobCollectionBase.prototype.setDDP = function () {                                                                  // 325
    var params;                                                                                                       // 172
    params = 1 <= arguments.length ? slice.call(arguments, 0) : [];                                                   // 172
    return Job.setDDP.apply(Job, params);                                                                             // 328
  };                                                                                                                  // 172
                                                                                                                      //
  JobCollectionBase.prototype.startJobServer = function () {                                                          // 331
    var params;                                                                                                       // 174
    params = 1 <= arguments.length ? slice.call(arguments, 0) : [];                                                   // 174
    return Job.startJobServer.apply(Job, [this.root].concat(slice.call(params)));                                     // 334
  };                                                                                                                  // 174
                                                                                                                      //
  JobCollectionBase.prototype.shutdownJobServer = function () {                                                       // 337
    var params;                                                                                                       // 175
    params = 1 <= arguments.length ? slice.call(arguments, 0) : [];                                                   // 175
    return Job.shutdownJobServer.apply(Job, [this.root].concat(slice.call(params)));                                  // 340
  };                                                                                                                  // 175
                                                                                                                      //
  JobCollectionBase.prototype.startJobs = function () {                                                               // 343
    var params;                                                                                                       // 178
    params = 1 <= arguments.length ? slice.call(arguments, 0) : [];                                                   // 178
    return Job.startJobs.apply(Job, [this.root].concat(slice.call(params)));                                          // 346
  };                                                                                                                  // 178
                                                                                                                      //
  JobCollectionBase.prototype.stopJobs = function () {                                                                // 349
    var params;                                                                                                       // 179
    params = 1 <= arguments.length ? slice.call(arguments, 0) : [];                                                   // 179
    return Job.stopJobs.apply(Job, [this.root].concat(slice.call(params)));                                           // 352
  };                                                                                                                  // 179
                                                                                                                      //
  JobCollectionBase.prototype.jobDocPattern = _validJobDoc();                                                         // 355
                                                                                                                      //
  JobCollectionBase.prototype.allow = function () {                                                                   // 357
    throw new Error("Server-only function jc.allow() invoked on client.");                                            // 184
  };                                                                                                                  // 184
                                                                                                                      //
  JobCollectionBase.prototype.deny = function () {                                                                    // 361
    throw new Error("Server-only function jc.deny() invoked on client.");                                             // 185
  };                                                                                                                  // 185
                                                                                                                      //
  JobCollectionBase.prototype.promote = function () {                                                                 // 365
    throw new Error("Server-only function jc.promote() invoked on client.");                                          // 186
  };                                                                                                                  // 186
                                                                                                                      //
  JobCollectionBase.prototype.setLogStream = function () {                                                            // 369
    throw new Error("Server-only function jc.setLogStream() invoked on client.");                                     // 187
  };                                                                                                                  // 187
                                                                                                                      //
  JobCollectionBase.prototype.logConsole = function () {                                                              // 373
    throw new Error("Client-only function jc.logConsole() invoked on server.");                                       // 190
  };                                                                                                                  // 190
                                                                                                                      //
  JobCollectionBase.prototype.makeJob = function () {                                                                 // 377
    var dep;                                                                                                          // 194
    dep = false;                                                                                                      // 194
    return function () {                                                                                              // 380
      var params;                                                                                                     // 196
      params = 1 <= arguments.length ? slice.call(arguments, 0) : [];                                                 // 195
                                                                                                                      //
      if (!dep) {                                                                                                     // 196
        dep = true;                                                                                                   // 197
        console.warn("WARNING: jc.makeJob() has been deprecated. Use new Job(jc, doc) instead.");                     // 198
      }                                                                                                               // 386
                                                                                                                      //
      return function (func, args, ctor) {                                                                            // 387
        ctor.prototype = func.prototype;                                                                              // 388
        var child = new ctor(),                                                                                       // 389
            result = func.apply(child, args);                                                                         // 389
        return Object(result) === result ? result : child;                                                            // 390
      }(Job, [this.root].concat(slice.call(params)), function () {});                                                 // 391
    };                                                                                                                // 195
  }();                                                                                                                // 193
                                                                                                                      //
  JobCollectionBase.prototype.createJob = function () {                                                               // 395
    var dep;                                                                                                          // 203
    dep = false;                                                                                                      // 203
    return function () {                                                                                              // 398
      var params;                                                                                                     // 205
      params = 1 <= arguments.length ? slice.call(arguments, 0) : [];                                                 // 204
                                                                                                                      //
      if (!dep) {                                                                                                     // 205
        dep = true;                                                                                                   // 206
        console.warn("WARNING: jc.createJob() has been deprecated. Use new Job(jc, type, data) instead.");            // 207
      }                                                                                                               // 404
                                                                                                                      //
      return function (func, args, ctor) {                                                                            // 405
        ctor.prototype = func.prototype;                                                                              // 406
        var child = new ctor(),                                                                                       // 407
            result = func.apply(child, args);                                                                         // 407
        return Object(result) === result ? result : child;                                                            // 408
      }(Job, [this.root].concat(slice.call(params)), function () {});                                                 // 409
    };                                                                                                                // 204
  }();                                                                                                                // 202
                                                                                                                      //
  JobCollectionBase.prototype._methodWrapper = function (method, func) {                                              // 413
    var ref, toLog, unblockDDPMethods;                                                                                // 211
    toLog = this._toLog;                                                                                              // 211
    unblockDDPMethods = (ref = this._unblockDDPMethods) != null ? ref : false;                                        // 212
    return function () {                                                                                              // 214
      var params, ref1, retval, user;                                                                                 // 215
      params = 1 <= arguments.length ? slice.call(arguments, 0) : [];                                                 // 214
      user = (ref1 = this.userId) != null ? ref1 : "[UNAUTHENTICATED]";                                               // 215
      toLog(user, method, "params: " + JSON.stringify(params));                                                       // 216
                                                                                                                      //
      if (unblockDDPMethods) {                                                                                        // 217
        this.unblock();                                                                                               // 217
      }                                                                                                               // 424
                                                                                                                      //
      retval = func.apply(null, params);                                                                              // 218
      toLog(user, method, "returned: " + JSON.stringify(retval));                                                     // 219
      return retval;                                                                                                  // 220
    };                                                                                                                // 214
  };                                                                                                                  // 210
                                                                                                                      //
  JobCollectionBase.prototype._generateMethods = function () {                                                        // 431
    var baseMethodName, methodFunc, methodName, methodPrefix, methodsOut, ref;                                        // 223
    methodsOut = {};                                                                                                  // 223
    methodPrefix = '_DDPMethod_';                                                                                     // 224
    ref = this;                                                                                                       // 225
                                                                                                                      //
    for (methodName in meteorBabelHelpers.sanitizeForInObject(ref)) {                                                 // 225
      methodFunc = ref[methodName];                                                                                   // 437
                                                                                                                      //
      if (!(methodName.slice(0, methodPrefix.length) === methodPrefix)) {                                             // 438
        continue;                                                                                                     // 439
      }                                                                                                               // 440
                                                                                                                      //
      baseMethodName = methodName.slice(methodPrefix.length);                                                         // 226
      methodsOut[this.root + "_" + baseMethodName] = this._methodWrapper(baseMethodName, methodFunc.bind(this));      // 227
    }                                                                                                                 // 225
                                                                                                                      //
    return methodsOut;                                                                                                // 228
  };                                                                                                                  // 222
                                                                                                                      //
  JobCollectionBase.prototype._idsOfDeps = function (ids, antecedents, dependents, jobStatuses) {                     // 447
    var antsArray, dependsIds, dependsQuery;                                                                          // 234
    dependsQuery = [];                                                                                                // 234
                                                                                                                      //
    if (dependents) {                                                                                                 // 235
      dependsQuery.push({                                                                                             // 236
        depends: {                                                                                                    // 237
          $elemMatch: {                                                                                               // 238
            $in: ids                                                                                                  // 239
          }                                                                                                           // 239
        }                                                                                                             // 238
      });                                                                                                             // 237
    }                                                                                                                 // 458
                                                                                                                      //
    if (antecedents) {                                                                                                // 240
      antsArray = [];                                                                                                 // 241
      this.find({                                                                                                     // 242
        _id: {                                                                                                        // 244
          $in: ids                                                                                                    // 245
        }                                                                                                             // 245
      }, {                                                                                                            // 243
        fields: {                                                                                                     // 248
          depends: 1                                                                                                  // 249
        },                                                                                                            // 249
        transform: null                                                                                               // 250
      }).forEach(function (d) {                                                                                       // 247
        var i, j, len, ref, results;                                                                                  // 252
                                                                                                                      //
        if (indexOf.call(antsArray, i) < 0) {                                                                         // 252
          ref = d.depends;                                                                                            // 252
          results = [];                                                                                               // 252
                                                                                                                      //
          for (j = 0, len = ref.length; j < len; j++) {                                                               // 475
            i = ref[j];                                                                                               // 476
            results.push(antsArray.push(i));                                                                          // 477
          }                                                                                                           // 252
                                                                                                                      //
          return results;                                                                                             // 479
        }                                                                                                             // 480
      });                                                                                                             // 242
                                                                                                                      //
      if (antsArray.length > 0) {                                                                                     // 253
        dependsQuery.push({                                                                                           // 254
          _id: {                                                                                                      // 255
            $in: antsArray                                                                                            // 256
          }                                                                                                           // 256
        });                                                                                                           // 255
      }                                                                                                               // 240
    }                                                                                                                 // 489
                                                                                                                      //
    if (dependsQuery) {                                                                                               // 257
      dependsIds = [];                                                                                                // 258
      this.find({                                                                                                     // 259
        status: {                                                                                                     // 261
          $in: jobStatuses                                                                                            // 262
        },                                                                                                            // 262
        $or: dependsQuery                                                                                             // 263
      }, {                                                                                                            // 260
        fields: {                                                                                                     // 266
          _id: 1                                                                                                      // 267
        },                                                                                                            // 267
        transform: null                                                                                               // 268
      }).forEach(function (d) {                                                                                       // 265
        var ref;                                                                                                      // 271
                                                                                                                      //
        if (ref = d._id, indexOf.call(dependsIds, ref) < 0) {                                                         // 271
          return dependsIds.push(d._id);                                                                              // 505
        }                                                                                                             // 506
      });                                                                                                             // 259
    }                                                                                                                 // 508
                                                                                                                      //
    return dependsIds;                                                                                                // 272
  };                                                                                                                  // 230
                                                                                                                      //
  JobCollectionBase.prototype._rerun_job = function (doc, repeats, wait, repeatUntil) {                               // 512
    var id, jobId, logObj, runId, time;                                                                               // 276
                                                                                                                      //
    if (repeats == null) {                                                                                            // 514
      repeats = doc.repeats - 1;                                                                                      // 274
    }                                                                                                                 // 516
                                                                                                                      //
    if (wait == null) {                                                                                               // 517
      wait = doc.repeatWait;                                                                                          // 274
    }                                                                                                                 // 519
                                                                                                                      //
    if (repeatUntil == null) {                                                                                        // 520
      repeatUntil = doc.repeatUntil;                                                                                  // 274
    }                                                                                                                 // 522
                                                                                                                      //
    id = doc._id;                                                                                                     // 276
    runId = doc.runId;                                                                                                // 277
    time = new Date();                                                                                                // 278
    delete doc._id;                                                                                                   // 279
    delete doc.result;                                                                                                // 280
    delete doc.failures;                                                                                              // 281
    delete doc.expiresAfter;                                                                                          // 282
    delete doc.workTimeout;                                                                                           // 283
    doc.runId = null;                                                                                                 // 284
    doc.status = "waiting";                                                                                           // 285
    doc.repeatRetries = doc.repeatRetries != null ? doc.repeatRetries : doc.retries + doc.retried;                    // 286
    doc.retries = doc.repeatRetries;                                                                                  // 287
                                                                                                                      //
    if (doc.retries > this.forever) {                                                                                 // 288
      doc.retries = this.forever;                                                                                     // 288
    }                                                                                                                 // 537
                                                                                                                      //
    doc.retryUntil = repeatUntil;                                                                                     // 289
    doc.retried = 0;                                                                                                  // 290
    doc.repeats = repeats;                                                                                            // 291
                                                                                                                      //
    if (doc.repeats > this.forever) {                                                                                 // 292
      doc.repeats = this.forever;                                                                                     // 292
    }                                                                                                                 // 543
                                                                                                                      //
    doc.repeatUntil = repeatUntil;                                                                                    // 293
    doc.repeated = doc.repeated + 1;                                                                                  // 294
    doc.updated = time;                                                                                               // 295
    doc.created = time;                                                                                               // 296
    doc.progress = {                                                                                                  // 297
      completed: 0,                                                                                                   // 298
      total: 1,                                                                                                       // 299
      percent: 0                                                                                                      // 300
    };                                                                                                                // 298
                                                                                                                      //
    if (logObj = this._logMessage.rerun(id, runId)) {                                                                 // 301
      doc.log = [logObj];                                                                                             // 302
    } else {                                                                                                          // 301
      doc.log = [];                                                                                                   // 304
    }                                                                                                                 // 557
                                                                                                                      //
    doc.after = new Date(time.valueOf() + wait);                                                                      // 306
                                                                                                                      //
    if (jobId = this.insert(doc)) {                                                                                   // 307
      this._DDPMethod_jobReady(jobId);                                                                                // 308
                                                                                                                      //
      return jobId;                                                                                                   // 309
    } else {                                                                                                          // 307
      console.warn("Job rerun/repeat failed to reschedule!", id, runId);                                              // 311
    }                                                                                                                 // 564
                                                                                                                      //
    return null;                                                                                                      // 312
  };                                                                                                                  // 274
                                                                                                                      //
  JobCollectionBase.prototype._DDPMethod_startJobServer = function (options) {                                        // 568
    check(options, Match.Optional({}));                                                                               // 315
                                                                                                                      //
    if (options == null) {                                                                                            // 570
      options = {};                                                                                                   // 316
    }                                                                                                                 // 572
                                                                                                                      //
    if (!this.isSimulation) {                                                                                         // 318
      if (this.stopped && this.stopped !== true) {                                                                    // 319
        Meteor.clearTimeout(this.stopped);                                                                            // 319
      }                                                                                                               // 576
                                                                                                                      //
      this.stopped = false;                                                                                           // 320
    }                                                                                                                 // 578
                                                                                                                      //
    return true;                                                                                                      // 321
  };                                                                                                                  // 314
                                                                                                                      //
  JobCollectionBase.prototype._DDPMethod_startJobs = function () {                                                    // 582
    var depFlag;                                                                                                      // 324
    depFlag = false;                                                                                                  // 324
    return function (options) {                                                                                       // 585
      if (!depFlag) {                                                                                                 // 326
        depFlag = true;                                                                                               // 327
        console.warn("Deprecation Warning: jc.startJobs() has been renamed to jc.startJobServer()");                  // 328
      }                                                                                                               // 589
                                                                                                                      //
      return this._DDPMethod_startJobServer(options);                                                                 // 329
    };                                                                                                                // 325
  }();                                                                                                                // 323
                                                                                                                      //
  JobCollectionBase.prototype._DDPMethod_shutdownJobServer = function (options) {                                     // 594
    check(options, Match.Optional({                                                                                   // 332
      timeout: Match.Optional(Match.Where(_validIntGTEOne))                                                           // 333
    }));                                                                                                              // 333
                                                                                                                      //
    if (options == null) {                                                                                            // 598
      options = {};                                                                                                   // 334
    }                                                                                                                 // 600
                                                                                                                      //
    if (options.timeout == null) {                                                                                    // 601
      options.timeout = 60 * 1000;                                                                                    // 335
    }                                                                                                                 // 603
                                                                                                                      //
    if (!this.isSimulation) {                                                                                         // 338
      if (this.stopped && this.stopped !== true) {                                                                    // 339
        Meteor.clearTimeout(this.stopped);                                                                            // 339
      }                                                                                                               // 607
                                                                                                                      //
      this.stopped = Meteor.setTimeout(function (_this) {                                                             // 340
        return function () {                                                                                          // 609
          var cursor, failedJobs;                                                                                     // 342
          cursor = _this.find({                                                                                       // 342
            status: 'running'                                                                                         // 344
          }, {                                                                                                        // 343
            transform: null                                                                                           // 347
          });                                                                                                         // 346
          failedJobs = cursor.count();                                                                                // 350
                                                                                                                      //
          if (failedJobs !== 0) {                                                                                     // 351
            console.warn("Failing " + failedJobs + " jobs on queue stop.");                                           // 351
          }                                                                                                           // 619
                                                                                                                      //
          cursor.forEach(function (d) {                                                                               // 352
            return _this._DDPMethod_jobFail(d._id, d.runId, "Running at Job Server shutdown.");                       // 621
          });                                                                                                         // 352
                                                                                                                      //
          if (_this.logStream != null) {                                                                              // 353
            _this.logStream.end();                                                                                    // 354
                                                                                                                      //
            return _this.logStream = null;                                                                            // 625
          }                                                                                                           // 626
        };                                                                                                            // 341
      }(this), options.timeout);                                                                                      // 341
    }                                                                                                                 // 629
                                                                                                                      //
    return true;                                                                                                      // 358
  };                                                                                                                  // 331
                                                                                                                      //
  JobCollectionBase.prototype._DDPMethod_stopJobs = function () {                                                     // 633
    var depFlag;                                                                                                      // 361
    depFlag = false;                                                                                                  // 361
    return function (options) {                                                                                       // 636
      if (!depFlag) {                                                                                                 // 363
        depFlag = true;                                                                                               // 364
        console.warn("Deprecation Warning: jc.stopJobs() has been renamed to jc.shutdownJobServer()");                // 365
      }                                                                                                               // 640
                                                                                                                      //
      return this._DDPMethod_shutdownJobServer(options);                                                              // 366
    };                                                                                                                // 362
  }();                                                                                                                // 360
                                                                                                                      //
  JobCollectionBase.prototype._DDPMethod_getJob = function (ids, options) {                                           // 645
    var d, docs, fields, single;                                                                                      // 369
    check(ids, Match.OneOf(Match.Where(_validId), [Match.Where(_validId)]));                                          // 369
    check(options, Match.Optional({                                                                                   // 370
      getLog: Match.Optional(Boolean),                                                                                // 371
      getFailures: Match.Optional(Boolean)                                                                            // 372
    }));                                                                                                              // 371
                                                                                                                      //
    if (options == null) {                                                                                            // 652
      options = {};                                                                                                   // 373
    }                                                                                                                 // 654
                                                                                                                      //
    if (options.getLog == null) {                                                                                     // 655
      options.getLog = false;                                                                                         // 374
    }                                                                                                                 // 657
                                                                                                                      //
    if (options.getFailures == null) {                                                                                // 658
      options.getFailures = false;                                                                                    // 375
    }                                                                                                                 // 660
                                                                                                                      //
    single = false;                                                                                                   // 376
                                                                                                                      //
    if (_validId(ids)) {                                                                                              // 377
      ids = [ids];                                                                                                    // 378
      single = true;                                                                                                  // 379
    }                                                                                                                 // 665
                                                                                                                      //
    if (ids.length === 0) {                                                                                           // 380
      return null;                                                                                                    // 380
    }                                                                                                                 // 668
                                                                                                                      //
    fields = {                                                                                                        // 381
      _private: 0                                                                                                     // 381
    };                                                                                                                // 381
                                                                                                                      //
    if (!options.getLog) {                                                                                            // 382
      fields.log = 0;                                                                                                 // 382
    }                                                                                                                 // 674
                                                                                                                      //
    if (!options.getFailures) {                                                                                       // 383
      fields.failures = 0;                                                                                            // 383
    }                                                                                                                 // 677
                                                                                                                      //
    docs = this.find({                                                                                                // 384
      _id: {                                                                                                          // 386
        $in: ids                                                                                                      // 387
      }                                                                                                               // 387
    }, {                                                                                                              // 385
      fields: fields,                                                                                                 // 390
      transform: null                                                                                                 // 391
    }).fetch();                                                                                                       // 389
                                                                                                                      //
    if (docs != null ? docs.length : void 0) {                                                                        // 394
      if (this.scrub != null) {                                                                                       // 395
        docs = function () {                                                                                          // 396
          var j, len, results;                                                                                        // 689
          results = [];                                                                                               // 396
                                                                                                                      //
          for (j = 0, len = docs.length; j < len; j++) {                                                              // 691
            d = docs[j];                                                                                              // 692
            results.push(this.scrub(d));                                                                              // 693
          }                                                                                                           // 396
                                                                                                                      //
          return results;                                                                                             // 695
        }.call(this);                                                                                                 // 696
      }                                                                                                               // 697
                                                                                                                      //
      check(docs, [_validJobDoc()]);                                                                                  // 397
                                                                                                                      //
      if (single) {                                                                                                   // 398
        return docs[0];                                                                                               // 399
      } else {                                                                                                        // 398
        return docs;                                                                                                  // 401
      }                                                                                                               // 394
    }                                                                                                                 // 704
                                                                                                                      //
    return null;                                                                                                      // 402
  };                                                                                                                  // 368
                                                                                                                      //
  JobCollectionBase.prototype._DDPMethod_getWork = function (type, options) {                                         // 708
    var d, docs, foundDocs, ids, logObj, mods, num, runId, time;                                                      // 405
    check(type, Match.OneOf(String, [String]));                                                                       // 405
    check(options, Match.Optional({                                                                                   // 406
      maxJobs: Match.Optional(Match.Where(_validIntGTEOne)),                                                          // 407
      workTimeout: Match.Optional(Match.Where(_validIntGTEOne))                                                       // 408
    }));                                                                                                              // 407
                                                                                                                      //
    if (this.isSimulation) {                                                                                          // 411
      return;                                                                                                         // 412
    }                                                                                                                 // 717
                                                                                                                      //
    if (options == null) {                                                                                            // 718
      options = {};                                                                                                   // 414
    }                                                                                                                 // 720
                                                                                                                      //
    if (options.maxJobs == null) {                                                                                    // 721
      options.maxJobs = 1;                                                                                            // 415
    }                                                                                                                 // 723
                                                                                                                      //
    if (this.stopped) {                                                                                               // 417
      return [];                                                                                                      // 418
    }                                                                                                                 // 726
                                                                                                                      //
    if (typeof type === 'string') {                                                                                   // 421
      type = [type];                                                                                                  // 422
    }                                                                                                                 // 729
                                                                                                                      //
    time = new Date();                                                                                                // 423
    docs = [];                                                                                                        // 424
    runId = this._makeNewID();                                                                                        // 425
                                                                                                                      //
    while (docs.length < options.maxJobs) {                                                                           // 427
      ids = this.find({                                                                                               // 429
        type: {                                                                                                       // 431
          $in: type                                                                                                   // 432
        },                                                                                                            // 432
        status: 'ready',                                                                                              // 433
        runId: null                                                                                                   // 434
      }, {                                                                                                            // 430
        sort: {                                                                                                       // 437
          priority: 1,                                                                                                // 438
          retryUntil: 1,                                                                                              // 439
          after: 1                                                                                                    // 440
        },                                                                                                            // 438
        limit: options.maxJobs - docs.length,                                                                         // 441
        fields: {                                                                                                     // 442
          _id: 1                                                                                                      // 443
        },                                                                                                            // 443
        transform: null                                                                                               // 444
      }).map(function (d) {                                                                                           // 436
        return d._id;                                                                                                 // 752
      });                                                                                                             // 429
                                                                                                                      //
      if (!((ids != null ? ids.length : void 0) > 0)) {                                                               // 447
        break;                                                                                                        // 448
      }                                                                                                               // 756
                                                                                                                      //
      mods = {                                                                                                        // 450
        $set: {                                                                                                       // 451
          status: 'running',                                                                                          // 452
          runId: runId,                                                                                               // 453
          updated: time                                                                                               // 454
        },                                                                                                            // 452
        $inc: {                                                                                                       // 455
          retries: -1,                                                                                                // 456
          retried: 1                                                                                                  // 457
        }                                                                                                             // 456
      };                                                                                                              // 451
                                                                                                                      //
      if (logObj = this._logMessage.running(runId)) {                                                                 // 459
        mods.$push = {                                                                                                // 460
          log: logObj                                                                                                 // 461
        };                                                                                                            // 461
      }                                                                                                               // 772
                                                                                                                      //
      if (options.workTimeout != null) {                                                                              // 463
        mods.$set.workTimeout = options.workTimeout;                                                                  // 464
        mods.$set.expiresAfter = new Date(time.valueOf() + options.workTimeout);                                      // 465
      } else {                                                                                                        // 463
        if (mods.$unset == null) {                                                                                    // 777
          mods.$unset = {};                                                                                           // 467
        }                                                                                                             // 779
                                                                                                                      //
        mods.$unset.workTimeout = "";                                                                                 // 468
        mods.$unset.expiresAfter = "";                                                                                // 469
      }                                                                                                               // 782
                                                                                                                      //
      num = this.update({                                                                                             // 471
        _id: {                                                                                                        // 473
          $in: ids                                                                                                    // 474
        },                                                                                                            // 474
        status: 'ready',                                                                                              // 475
        runId: null                                                                                                   // 476
      }, mods, {                                                                                                      // 472
        multi: true                                                                                                   // 480
      });                                                                                                             // 479
                                                                                                                      //
      if (num > 0) {                                                                                                  // 484
        foundDocs = this.find({                                                                                       // 485
          _id: {                                                                                                      // 487
            $in: ids                                                                                                  // 488
          },                                                                                                          // 488
          runId: runId                                                                                                // 489
        }, {                                                                                                          // 486
          fields: {                                                                                                   // 492
            log: 0,                                                                                                   // 493
            failures: 0,                                                                                              // 494
            _private: 0                                                                                               // 495
          },                                                                                                          // 493
          transform: null                                                                                             // 496
        }).fetch();                                                                                                   // 491
                                                                                                                      //
        if ((foundDocs != null ? foundDocs.length : void 0) > 0) {                                                    // 500
          if (this.scrub != null) {                                                                                   // 501
            foundDocs = function () {                                                                                 // 502
              var j, len, results;                                                                                    // 809
              results = [];                                                                                           // 502
                                                                                                                      //
              for (j = 0, len = foundDocs.length; j < len; j++) {                                                     // 811
                d = foundDocs[j];                                                                                     // 812
                results.push(this.scrub(d));                                                                          // 813
              }                                                                                                       // 502
                                                                                                                      //
              return results;                                                                                         // 815
            }.call(this);                                                                                             // 816
          }                                                                                                           // 817
                                                                                                                      //
          check(docs, [_validJobDoc()]);                                                                              // 503
          docs = docs.concat(foundDocs);                                                                              // 504
        }                                                                                                             // 484
      }                                                                                                               // 821
    }                                                                                                                 // 427
                                                                                                                      //
    return docs;                                                                                                      // 507
  };                                                                                                                  // 404
                                                                                                                      //
  JobCollectionBase.prototype._DDPMethod_jobRemove = function (ids, options) {                                        // 826
    var num;                                                                                                          // 510
    check(ids, Match.OneOf(Match.Where(_validId), [Match.Where(_validId)]));                                          // 510
    check(options, Match.Optional({}));                                                                               // 511
                                                                                                                      //
    if (options == null) {                                                                                            // 830
      options = {};                                                                                                   // 512
    }                                                                                                                 // 832
                                                                                                                      //
    if (_validId(ids)) {                                                                                              // 513
      ids = [ids];                                                                                                    // 514
    }                                                                                                                 // 835
                                                                                                                      //
    if (ids.length === 0) {                                                                                           // 515
      return false;                                                                                                   // 515
    }                                                                                                                 // 838
                                                                                                                      //
    num = this.remove({                                                                                               // 516
      _id: {                                                                                                          // 518
        $in: ids                                                                                                      // 519
      },                                                                                                              // 519
      status: {                                                                                                       // 520
        $in: this.jobStatusRemovable                                                                                  // 521
      }                                                                                                               // 521
    });                                                                                                               // 517
                                                                                                                      //
    if (num > 0) {                                                                                                    // 524
      return true;                                                                                                    // 525
    } else {                                                                                                          // 524
      console.warn("jobRemove failed");                                                                               // 527
    }                                                                                                                 // 851
                                                                                                                      //
    return false;                                                                                                     // 528
  };                                                                                                                  // 509
                                                                                                                      //
  JobCollectionBase.prototype._DDPMethod_jobPause = function (ids, options) {                                         // 855
    var logObj, mods, num, time;                                                                                      // 531
    check(ids, Match.OneOf(Match.Where(_validId), [Match.Where(_validId)]));                                          // 531
    check(options, Match.Optional({}));                                                                               // 532
                                                                                                                      //
    if (options == null) {                                                                                            // 859
      options = {};                                                                                                   // 533
    }                                                                                                                 // 861
                                                                                                                      //
    if (_validId(ids)) {                                                                                              // 534
      ids = [ids];                                                                                                    // 535
    }                                                                                                                 // 864
                                                                                                                      //
    if (ids.length === 0) {                                                                                           // 536
      return false;                                                                                                   // 536
    }                                                                                                                 // 867
                                                                                                                      //
    time = new Date();                                                                                                // 537
    mods = {                                                                                                          // 539
      $set: {                                                                                                         // 540
        status: "paused",                                                                                             // 541
        updated: time                                                                                                 // 542
      }                                                                                                               // 541
    };                                                                                                                // 540
                                                                                                                      //
    if (logObj = this._logMessage.paused()) {                                                                         // 544
      mods.$push = {                                                                                                  // 545
        log: logObj                                                                                                   // 546
      };                                                                                                              // 546
    }                                                                                                                 // 879
                                                                                                                      //
    num = this.update({                                                                                               // 548
      _id: {                                                                                                          // 550
        $in: ids                                                                                                      // 551
      },                                                                                                              // 551
      status: {                                                                                                       // 552
        $in: this.jobStatusPausable                                                                                   // 553
      }                                                                                                               // 553
    }, mods, {                                                                                                        // 549
      multi: true                                                                                                     // 557
    });                                                                                                               // 556
                                                                                                                      //
    if (num > 0) {                                                                                                    // 560
      return true;                                                                                                    // 561
    } else {                                                                                                          // 560
      console.warn("jobPause failed");                                                                                // 563
    }                                                                                                                 // 894
                                                                                                                      //
    return false;                                                                                                     // 564
  };                                                                                                                  // 530
                                                                                                                      //
  JobCollectionBase.prototype._DDPMethod_jobResume = function (ids, options) {                                        // 898
    var logObj, mods, num, time;                                                                                      // 567
    check(ids, Match.OneOf(Match.Where(_validId), [Match.Where(_validId)]));                                          // 567
    check(options, Match.Optional({}));                                                                               // 568
                                                                                                                      //
    if (options == null) {                                                                                            // 902
      options = {};                                                                                                   // 569
    }                                                                                                                 // 904
                                                                                                                      //
    if (_validId(ids)) {                                                                                              // 570
      ids = [ids];                                                                                                    // 571
    }                                                                                                                 // 907
                                                                                                                      //
    if (ids.length === 0) {                                                                                           // 572
      return false;                                                                                                   // 572
    }                                                                                                                 // 910
                                                                                                                      //
    time = new Date();                                                                                                // 573
    mods = {                                                                                                          // 574
      $set: {                                                                                                         // 575
        status: "waiting",                                                                                            // 576
        updated: time                                                                                                 // 577
      }                                                                                                               // 576
    };                                                                                                                // 575
                                                                                                                      //
    if (logObj = this._logMessage.resumed()) {                                                                        // 579
      mods.$push = {                                                                                                  // 580
        log: logObj                                                                                                   // 581
      };                                                                                                              // 581
    }                                                                                                                 // 922
                                                                                                                      //
    num = this.update({                                                                                               // 583
      _id: {                                                                                                          // 585
        $in: ids                                                                                                      // 586
      },                                                                                                              // 586
      status: "paused",                                                                                               // 587
      updated: {                                                                                                      // 588
        $ne: time                                                                                                     // 589
      }                                                                                                               // 589
    }, mods, {                                                                                                        // 584
      multi: true                                                                                                     // 593
    });                                                                                                               // 592
                                                                                                                      //
    if (num > 0) {                                                                                                    // 596
      this._DDPMethod_jobReady(ids);                                                                                  // 597
                                                                                                                      //
      return true;                                                                                                    // 598
    } else {                                                                                                          // 596
      console.warn("jobResume failed");                                                                               // 600
    }                                                                                                                 // 939
                                                                                                                      //
    return false;                                                                                                     // 601
  };                                                                                                                  // 566
                                                                                                                      //
  JobCollectionBase.prototype._DDPMethod_jobReady = function (ids, options) {                                         // 943
    var l, logObj, mods, now, num, query;                                                                             // 604
    check(ids, Match.OneOf(Match.Where(_validId), [Match.Where(_validId)]));                                          // 604
    check(options, Match.Optional({                                                                                   // 605
      force: Match.Optional(Boolean),                                                                                 // 606
      time: Match.Optional(Date)                                                                                      // 607
    }));                                                                                                              // 606
                                                                                                                      //
    if (this.isSimulation) {                                                                                          // 612
      return;                                                                                                         // 613
    }                                                                                                                 // 952
                                                                                                                      //
    now = new Date();                                                                                                 // 615
                                                                                                                      //
    if (options == null) {                                                                                            // 954
      options = {};                                                                                                   // 617
    }                                                                                                                 // 956
                                                                                                                      //
    if (options.force == null) {                                                                                      // 957
      options.force = false;                                                                                          // 618
    }                                                                                                                 // 959
                                                                                                                      //
    if (options.time == null) {                                                                                       // 960
      options.time = now;                                                                                             // 619
    }                                                                                                                 // 962
                                                                                                                      //
    if (_validId(ids)) {                                                                                              // 621
      ids = [ids];                                                                                                    // 622
    }                                                                                                                 // 965
                                                                                                                      //
    query = {                                                                                                         // 624
      status: "waiting",                                                                                              // 625
      after: {                                                                                                        // 626
        $lte: options.time                                                                                            // 627
      }                                                                                                               // 627
    };                                                                                                                // 625
    mods = {                                                                                                          // 629
      $set: {                                                                                                         // 630
        status: "ready",                                                                                              // 631
        updated: now                                                                                                  // 632
      }                                                                                                               // 631
    };                                                                                                                // 630
                                                                                                                      //
    if (ids.length > 0) {                                                                                             // 634
      query._id = {                                                                                                   // 635
        $in: ids                                                                                                      // 636
      };                                                                                                              // 636
      mods.$set.after = now;                                                                                          // 637
    }                                                                                                                 // 983
                                                                                                                      //
    logObj = [];                                                                                                      // 639
                                                                                                                      //
    if (options.force) {                                                                                              // 641
      mods.$set.depends = [];                                                                                         // 642
      l = this._logMessage.forced();                                                                                  // 643
                                                                                                                      //
      if (l) {                                                                                                        // 644
        logObj.push(l);                                                                                               // 644
      }                                                                                                               // 641
    } else {                                                                                                          // 641
      query.depends = {                                                                                               // 646
        $size: 0                                                                                                      // 647
      };                                                                                                              // 647
    }                                                                                                                 // 995
                                                                                                                      //
    l = this._logMessage.readied();                                                                                   // 649
                                                                                                                      //
    if (l) {                                                                                                          // 650
      logObj.push(l);                                                                                                 // 650
    }                                                                                                                 // 999
                                                                                                                      //
    if (logObj.length > 0) {                                                                                          // 652
      mods.$push = {                                                                                                  // 653
        log: {                                                                                                        // 654
          $each: logObj                                                                                               // 655
        }                                                                                                             // 655
      };                                                                                                              // 654
    }                                                                                                                 // 1006
                                                                                                                      //
    num = this.update(query, mods, {                                                                                  // 657
      multi: true                                                                                                     // 661
    });                                                                                                               // 660
                                                                                                                      //
    if (num > 0) {                                                                                                    // 665
      return true;                                                                                                    // 666
    } else {                                                                                                          // 665
      return false;                                                                                                   // 668
    }                                                                                                                 // 1014
  };                                                                                                                  // 603
                                                                                                                      //
  JobCollectionBase.prototype._DDPMethod_jobCancel = function (ids, options) {                                        // 1017
    var cancelIds, depsCancelled, logObj, mods, num, time;                                                            // 671
    check(ids, Match.OneOf(Match.Where(_validId), [Match.Where(_validId)]));                                          // 671
    check(options, Match.Optional({                                                                                   // 672
      antecedents: Match.Optional(Boolean),                                                                           // 673
      dependents: Match.Optional(Boolean)                                                                             // 674
    }));                                                                                                              // 673
                                                                                                                      //
    if (options == null) {                                                                                            // 1024
      options = {};                                                                                                   // 675
    }                                                                                                                 // 1026
                                                                                                                      //
    if (options.antecedents == null) {                                                                                // 1027
      options.antecedents = false;                                                                                    // 676
    }                                                                                                                 // 1029
                                                                                                                      //
    if (options.dependents == null) {                                                                                 // 1030
      options.dependents = true;                                                                                      // 677
    }                                                                                                                 // 1032
                                                                                                                      //
    if (_validId(ids)) {                                                                                              // 678
      ids = [ids];                                                                                                    // 679
    }                                                                                                                 // 1035
                                                                                                                      //
    if (ids.length === 0) {                                                                                           // 680
      return false;                                                                                                   // 680
    }                                                                                                                 // 1038
                                                                                                                      //
    time = new Date();                                                                                                // 681
    mods = {                                                                                                          // 683
      $set: {                                                                                                         // 684
        status: "cancelled",                                                                                          // 685
        runId: null,                                                                                                  // 686
        progress: {                                                                                                   // 687
          completed: 0,                                                                                               // 688
          total: 1,                                                                                                   // 689
          percent: 0                                                                                                  // 690
        },                                                                                                            // 688
        updated: time                                                                                                 // 691
      }                                                                                                               // 685
    };                                                                                                                // 684
                                                                                                                      //
    if (logObj = this._logMessage.cancelled()) {                                                                      // 693
      mods.$push = {                                                                                                  // 694
        log: logObj                                                                                                   // 695
      };                                                                                                              // 695
    }                                                                                                                 // 1056
                                                                                                                      //
    num = this.update({                                                                                               // 697
      _id: {                                                                                                          // 699
        $in: ids                                                                                                      // 700
      },                                                                                                              // 700
      status: {                                                                                                       // 701
        $in: this.jobStatusCancellable                                                                                // 702
      }                                                                                                               // 702
    }, mods, {                                                                                                        // 698
      multi: true                                                                                                     // 706
    });                                                                                                               // 705
    cancelIds = this._idsOfDeps(ids, options.antecedents, options.dependents, this.jobStatusCancellable);             // 710
    depsCancelled = false;                                                                                            // 712
                                                                                                                      //
    if (cancelIds.length > 0) {                                                                                       // 713
      depsCancelled = this._DDPMethod_jobCancel(cancelIds, options);                                                  // 714
    }                                                                                                                 // 1071
                                                                                                                      //
    if (num > 0 || depsCancelled) {                                                                                   // 716
      return true;                                                                                                    // 717
    } else {                                                                                                          // 716
      console.warn("jobCancel failed");                                                                               // 719
    }                                                                                                                 // 1076
                                                                                                                      //
    return false;                                                                                                     // 720
  };                                                                                                                  // 670
                                                                                                                      //
  JobCollectionBase.prototype._DDPMethod_jobRestart = function (ids, options) {                                       // 1080
    var depsRestarted, logObj, mods, num, query, restartIds, time;                                                    // 723
    check(ids, Match.OneOf(Match.Where(_validId), [Match.Where(_validId)]));                                          // 723
    check(options, Match.Optional({                                                                                   // 724
      retries: Match.Optional(Match.Where(_validIntGTEZero)),                                                         // 725
      until: Match.Optional(Date),                                                                                    // 726
      antecedents: Match.Optional(Boolean),                                                                           // 727
      dependents: Match.Optional(Boolean)                                                                             // 728
    }));                                                                                                              // 725
                                                                                                                      //
    if (options == null) {                                                                                            // 1089
      options = {};                                                                                                   // 729
    }                                                                                                                 // 1091
                                                                                                                      //
    if (options.retries == null) {                                                                                    // 1092
      options.retries = 1;                                                                                            // 730
    }                                                                                                                 // 1094
                                                                                                                      //
    if (options.retries > this.forever) {                                                                             // 731
      options.retries = this.forever;                                                                                 // 731
    }                                                                                                                 // 1097
                                                                                                                      //
    if (options.dependents == null) {                                                                                 // 1098
      options.dependents = false;                                                                                     // 732
    }                                                                                                                 // 1100
                                                                                                                      //
    if (options.antecedents == null) {                                                                                // 1101
      options.antecedents = true;                                                                                     // 733
    }                                                                                                                 // 1103
                                                                                                                      //
    if (_validId(ids)) {                                                                                              // 734
      ids = [ids];                                                                                                    // 735
    }                                                                                                                 // 1106
                                                                                                                      //
    if (ids.length === 0) {                                                                                           // 736
      return false;                                                                                                   // 736
    }                                                                                                                 // 1109
                                                                                                                      //
    time = new Date();                                                                                                // 737
    query = {                                                                                                         // 739
      _id: {                                                                                                          // 740
        $in: ids                                                                                                      // 741
      },                                                                                                              // 741
      status: {                                                                                                       // 742
        $in: this.jobStatusRestartable                                                                                // 743
      }                                                                                                               // 743
    };                                                                                                                // 740
    mods = {                                                                                                          // 745
      $set: {                                                                                                         // 746
        status: "waiting",                                                                                            // 747
        progress: {                                                                                                   // 748
          completed: 0,                                                                                               // 749
          total: 1,                                                                                                   // 750
          percent: 0                                                                                                  // 751
        },                                                                                                            // 749
        updated: time                                                                                                 // 752
      },                                                                                                              // 747
      $inc: {                                                                                                         // 753
        retries: options.retries                                                                                      // 754
      }                                                                                                               // 754
    };                                                                                                                // 746
                                                                                                                      //
    if (logObj = this._logMessage.restarted()) {                                                                      // 756
      mods.$push = {                                                                                                  // 757
        log: logObj                                                                                                   // 758
      };                                                                                                              // 758
    }                                                                                                                 // 1137
                                                                                                                      //
    if (options.until != null) {                                                                                      // 760
      mods.$set.retryUntil = options.until;                                                                           // 761
    }                                                                                                                 // 1140
                                                                                                                      //
    num = this.update(query, mods, {                                                                                  // 763
      multi: true                                                                                                     // 763
    });                                                                                                               // 763
    restartIds = this._idsOfDeps(ids, options.antecedents, options.dependents, this.jobStatusRestartable);            // 766
    depsRestarted = false;                                                                                            // 768
                                                                                                                      //
    if (restartIds.length > 0) {                                                                                      // 769
      depsRestarted = this._DDPMethod_jobRestart(restartIds, options);                                                // 770
    }                                                                                                                 // 1148
                                                                                                                      //
    if (num > 0 || depsRestarted) {                                                                                   // 772
      this._DDPMethod_jobReady(ids);                                                                                  // 773
                                                                                                                      //
      return true;                                                                                                    // 774
    } else {                                                                                                          // 772
      console.warn("jobRestart failed");                                                                              // 776
    }                                                                                                                 // 1154
                                                                                                                      //
    return false;                                                                                                     // 777
  };                                                                                                                  // 722
                                                                                                                      //
  JobCollectionBase.prototype._DDPMethod_jobSave = function (doc, options) {                                          // 1158
    var logObj, mods, newId, next, nextDate, num, ref, time;                                                          // 782
    check(doc, _validJobDoc());                                                                                       // 782
    check(options, Match.Optional({                                                                                   // 783
      cancelRepeats: Match.Optional(Boolean)                                                                          // 784
    }));                                                                                                              // 784
    check(doc.status, Match.Where(function (v) {                                                                      // 785
      return Match.test(v, String) && (v === 'waiting' || v === 'paused');                                            // 1165
    }));                                                                                                              // 785
                                                                                                                      //
    if (options == null) {                                                                                            // 1167
      options = {};                                                                                                   // 787
    }                                                                                                                 // 1169
                                                                                                                      //
    if (options.cancelRepeats == null) {                                                                              // 1170
      options.cancelRepeats = false;                                                                                  // 788
    }                                                                                                                 // 1172
                                                                                                                      //
    if (doc.repeats > this.forever) {                                                                                 // 789
      doc.repeats = this.forever;                                                                                     // 789
    }                                                                                                                 // 1175
                                                                                                                      //
    if (doc.retries > this.forever) {                                                                                 // 790
      doc.retries = this.forever;                                                                                     // 790
    }                                                                                                                 // 1178
                                                                                                                      //
    time = new Date();                                                                                                // 792
                                                                                                                      //
    if (doc.after < time) {                                                                                           // 796
      doc.after = time;                                                                                               // 796
    }                                                                                                                 // 1182
                                                                                                                      //
    if (doc.retryUntil < time) {                                                                                      // 797
      doc.retryUntil = time;                                                                                          // 797
    }                                                                                                                 // 1185
                                                                                                                      //
    if (doc.repeatUntil < time) {                                                                                     // 798
      doc.repeatUntil = time;                                                                                         // 798
    }                                                                                                                 // 1188
                                                                                                                      //
    if (this.later != null && typeof doc.repeatWait !== 'number') {                                                   // 802
      if (!(next = (ref = this.later) != null ? ref.schedule(doc.repeatWait).next(1, doc.after) : void 0)) {          // 803
        console.warn("No valid available later.js times in schedule after " + doc.after);                             // 804
        return null;                                                                                                  // 805
      }                                                                                                               // 1193
                                                                                                                      //
      nextDate = new Date(next);                                                                                      // 806
                                                                                                                      //
      if (!(nextDate <= doc.repeatUntil)) {                                                                           // 807
        console.warn("No valid available later.js times in schedule before " + doc.repeatUntil);                      // 808
        return null;                                                                                                  // 809
      }                                                                                                               // 1198
                                                                                                                      //
      doc.after = nextDate;                                                                                           // 810
    } else if (this.later == null && doc.repeatWait !== 'number') {                                                   // 802
      console.warn("Later.js not loaded...");                                                                         // 812
      return null;                                                                                                    // 813
    }                                                                                                                 // 1203
                                                                                                                      //
    if (doc._id) {                                                                                                    // 815
      mods = {                                                                                                        // 817
        $set: {                                                                                                       // 818
          status: 'waiting',                                                                                          // 819
          data: doc.data,                                                                                             // 820
          retries: doc.retries,                                                                                       // 821
          repeatRetries: doc.repeatRetries != null ? doc.repeatRetries : doc.retries + doc.retried,                   // 822
          retryUntil: doc.retryUntil,                                                                                 // 823
          retryWait: doc.retryWait,                                                                                   // 824
          retryBackoff: doc.retryBackoff,                                                                             // 825
          repeats: doc.repeats,                                                                                       // 826
          repeatUntil: doc.repeatUntil,                                                                               // 827
          repeatWait: doc.repeatWait,                                                                                 // 828
          depends: doc.depends,                                                                                       // 829
          priority: doc.priority,                                                                                     // 830
          after: doc.after,                                                                                           // 831
          updated: time                                                                                               // 832
        }                                                                                                             // 819
      };                                                                                                              // 818
                                                                                                                      //
      if (logObj = this._logMessage.resubmitted()) {                                                                  // 834
        mods.$push = {                                                                                                // 835
          log: logObj                                                                                                 // 836
        };                                                                                                            // 836
      }                                                                                                               // 1227
                                                                                                                      //
      num = this.update({                                                                                             // 838
        _id: doc._id,                                                                                                 // 840
        status: 'paused',                                                                                             // 841
        runId: null                                                                                                   // 842
      }, mods);                                                                                                       // 839
                                                                                                                      //
      if (num) {                                                                                                      // 847
        this._DDPMethod_jobReady(doc._id);                                                                            // 848
                                                                                                                      //
        return doc._id;                                                                                               // 849
      } else {                                                                                                        // 847
        return null;                                                                                                  // 851
      }                                                                                                               // 815
    } else {                                                                                                          // 815
      if (doc.repeats === this.forever && options.cancelRepeats) {                                                    // 853
        this.find({                                                                                                   // 855
          type: doc.type,                                                                                             // 857
          status: {                                                                                                   // 858
            $in: this.jobStatusCancellable                                                                            // 859
          }                                                                                                           // 859
        }, {                                                                                                          // 856
          transform: null                                                                                             // 862
        }).forEach(function (_this) {                                                                                 // 861
          return function (d) {                                                                                       // 1249
            return _this._DDPMethod_jobCancel(d._id, {});                                                             // 1250
          };                                                                                                          // 864
        }(this));                                                                                                     // 864
      }                                                                                                               // 1253
                                                                                                                      //
      doc.created = time;                                                                                             // 865
      doc.log.push(this._logMessage.submitted());                                                                     // 866
      newId = this.insert(doc);                                                                                       // 867
                                                                                                                      //
      this._DDPMethod_jobReady(newId);                                                                                // 868
                                                                                                                      //
      return newId;                                                                                                   // 869
    }                                                                                                                 // 1259
  };                                                                                                                  // 781
                                                                                                                      //
  JobCollectionBase.prototype._DDPMethod_jobProgress = function (id, runId, completed, total, options) {              // 1262
    var job, mods, num, progress, time;                                                                               // 874
    check(id, Match.Where(_validId));                                                                                 // 874
    check(runId, Match.Where(_validId));                                                                              // 875
    check(completed, Match.Where(_validNumGTEZero));                                                                  // 876
    check(total, Match.Where(_validNumGTZero));                                                                       // 877
    check(options, Match.Optional({}));                                                                               // 878
                                                                                                                      //
    if (options == null) {                                                                                            // 1269
      options = {};                                                                                                   // 879
    }                                                                                                                 // 1271
                                                                                                                      //
    if (this.stopped) {                                                                                               // 882
      return null;                                                                                                    // 883
    }                                                                                                                 // 1274
                                                                                                                      //
    progress = {                                                                                                      // 885
      completed: completed,                                                                                           // 886
      total: total,                                                                                                   // 887
      percent: 100 * completed / total                                                                                // 888
    };                                                                                                                // 886
    check(progress, Match.Where(function (v) {                                                                        // 890
      var ref;                                                                                                        // 891
      return v.total >= v.completed && 0 <= (ref = v.percent) && ref <= 100;                                          // 1282
    }));                                                                                                              // 890
    time = new Date();                                                                                                // 893
    job = this.findOne({                                                                                              // 895
      _id: id                                                                                                         // 895
    }, {                                                                                                              // 895
      fields: {                                                                                                       // 895
        workTimeout: 1                                                                                                // 895
      }                                                                                                               // 895
    });                                                                                                               // 895
    mods = {                                                                                                          // 897
      $set: {                                                                                                         // 898
        progress: progress,                                                                                           // 899
        updated: time                                                                                                 // 900
      }                                                                                                               // 899
    };                                                                                                                // 898
                                                                                                                      //
    if ((job != null ? job.workTimeout : void 0) != null) {                                                           // 902
      mods.$set.expiresAfter = new Date(time.valueOf() + job.workTimeout);                                            // 903
    }                                                                                                                 // 1300
                                                                                                                      //
    num = this.update({                                                                                               // 905
      _id: id,                                                                                                        // 907
      runId: runId,                                                                                                   // 908
      status: "running"                                                                                               // 909
    }, mods);                                                                                                         // 906
                                                                                                                      //
    if (num === 1) {                                                                                                  // 914
      return true;                                                                                                    // 915
    } else {                                                                                                          // 914
      console.warn("jobProgress failed");                                                                             // 917
    }                                                                                                                 // 1310
                                                                                                                      //
    return false;                                                                                                     // 918
  };                                                                                                                  // 873
                                                                                                                      //
  JobCollectionBase.prototype._DDPMethod_jobLog = function (id, runId, message, options) {                            // 1314
    var job, logObj, mods, num, ref, time;                                                                            // 921
    check(id, Match.Where(_validId));                                                                                 // 921
    check(runId, Match.OneOf(Match.Where(_validId), null));                                                           // 922
    check(message, String);                                                                                           // 923
    check(options, Match.Optional({                                                                                   // 924
      level: Match.Optional(Match.Where(_validLogLevel)),                                                             // 925
      data: Match.Optional(Object)                                                                                    // 926
    }));                                                                                                              // 925
                                                                                                                      //
    if (options == null) {                                                                                            // 1323
      options = {};                                                                                                   // 927
    }                                                                                                                 // 1325
                                                                                                                      //
    time = new Date();                                                                                                // 928
    logObj = {                                                                                                        // 929
      time: time,                                                                                                     // 930
      runId: runId,                                                                                                   // 931
      level: (ref = options.level) != null ? ref : 'info',                                                            // 932
      message: message                                                                                                // 933
    };                                                                                                                // 930
                                                                                                                      //
    if (options.data != null) {                                                                                       // 934
      logObj.data = options.data;                                                                                     // 934
    }                                                                                                                 // 1335
                                                                                                                      //
    job = this.findOne({                                                                                              // 936
      _id: id                                                                                                         // 936
    }, {                                                                                                              // 936
      fields: {                                                                                                       // 936
        status: 1,                                                                                                    // 936
        workTimeout: 1                                                                                                // 936
      }                                                                                                               // 936
    });                                                                                                               // 936
    mods = {                                                                                                          // 938
      $push: {                                                                                                        // 939
        log: logObj                                                                                                   // 940
      },                                                                                                              // 940
      $set: {                                                                                                         // 941
        updated: time                                                                                                 // 942
      }                                                                                                               // 942
    };                                                                                                                // 939
                                                                                                                      //
    if ((job != null ? job.workTimeout : void 0) != null && job.status === 'running') {                               // 944
      mods.$set.expiresAfter = new Date(time.valueOf() + job.workTimeout);                                            // 945
    }                                                                                                                 // 1354
                                                                                                                      //
    num = this.update({                                                                                               // 947
      _id: id                                                                                                         // 949
    }, mods);                                                                                                         // 948
                                                                                                                      //
    if (num === 1) {                                                                                                  // 953
      return true;                                                                                                    // 954
    } else {                                                                                                          // 953
      console.warn("jobLog failed");                                                                                  // 956
    }                                                                                                                 // 1362
                                                                                                                      //
    return false;                                                                                                     // 957
  };                                                                                                                  // 920
                                                                                                                      //
  JobCollectionBase.prototype._DDPMethod_jobRerun = function (id, options) {                                          // 1366
    var doc;                                                                                                          // 960
    check(id, Match.Where(_validId));                                                                                 // 960
    check(options, Match.Optional({                                                                                   // 961
      repeats: Match.Optional(Match.Where(_validIntGTEZero)),                                                         // 962
      until: Match.Optional(Date),                                                                                    // 963
      wait: Match.OneOf(Match.Where(_validIntGTEZero), Match.Where(_validLaterJSObj))                                 // 964
    }));                                                                                                              // 962
    doc = this.findOne({                                                                                              // 966
      _id: id,                                                                                                        // 968
      status: "completed"                                                                                             // 969
    }, {                                                                                                              // 967
      fields: {                                                                                                       // 972
        result: 0,                                                                                                    // 973
        failures: 0,                                                                                                  // 974
        log: 0,                                                                                                       // 975
        progress: 0,                                                                                                  // 976
        updated: 0,                                                                                                   // 977
        after: 0,                                                                                                     // 978
        status: 0                                                                                                     // 979
      },                                                                                                              // 973
      transform: null                                                                                                 // 980
    });                                                                                                               // 971
                                                                                                                      //
    if (doc != null) {                                                                                                // 984
      if (options == null) {                                                                                          // 1390
        options = {};                                                                                                 // 985
      }                                                                                                               // 1392
                                                                                                                      //
      if (options.repeats == null) {                                                                                  // 1393
        options.repeats = 0;                                                                                          // 986
      }                                                                                                               // 1395
                                                                                                                      //
      if (options.repeats > this.forever) {                                                                           // 987
        options.repeats = this.forever;                                                                               // 987
      }                                                                                                               // 1398
                                                                                                                      //
      if (options.until == null) {                                                                                    // 1399
        options.until = doc.repeatUntil;                                                                              // 988
      }                                                                                                               // 1401
                                                                                                                      //
      if (options.wait == null) {                                                                                     // 1402
        options.wait = 0;                                                                                             // 989
      }                                                                                                               // 1404
                                                                                                                      //
      return this._rerun_job(doc, options.repeats, options.wait, options.until);                                      // 990
    }                                                                                                                 // 1406
                                                                                                                      //
    return false;                                                                                                     // 992
  };                                                                                                                  // 959
                                                                                                                      //
  JobCollectionBase.prototype._DDPMethod_jobDone = function (id, runId, result, options) {                            // 1410
    var after, d, doc, ids, jobId, logObj, mods, n, next, num, ref, time, wait;                                       // 995
    check(id, Match.Where(_validId));                                                                                 // 995
    check(runId, Match.Where(_validId));                                                                              // 996
    check(result, Object);                                                                                            // 997
    check(options, Match.Optional({                                                                                   // 998
      repeatId: Match.Optional(Boolean),                                                                              // 999
      delayDeps: Match.Optional(Match.Where(_validIntGTEZero))                                                        // 1000
    }));                                                                                                              // 999
                                                                                                                      //
    if (options == null) {                                                                                            // 1419
      options = {                                                                                                     // 1002
        repeatId: false                                                                                               // 1002
      };                                                                                                              // 1002
    }                                                                                                                 // 1423
                                                                                                                      //
    time = new Date();                                                                                                // 1003
    doc = this.findOne({                                                                                              // 1004
      _id: id,                                                                                                        // 1006
      runId: runId,                                                                                                   // 1007
      status: "running"                                                                                               // 1008
    }, {                                                                                                              // 1005
      fields: {                                                                                                       // 1011
        log: 0,                                                                                                       // 1012
        failures: 0,                                                                                                  // 1013
        progress: 0,                                                                                                  // 1014
        updated: 0,                                                                                                   // 1015
        after: 0,                                                                                                     // 1016
        status: 0                                                                                                     // 1017
      },                                                                                                              // 1012
      transform: null                                                                                                 // 1018
    });                                                                                                               // 1010
                                                                                                                      //
    if (doc == null) {                                                                                                // 1021
      if (!this.isSimulation) {                                                                                       // 1022
        console.warn("Running job not found", id, runId);                                                             // 1023
      }                                                                                                               // 1443
                                                                                                                      //
      return false;                                                                                                   // 1024
    }                                                                                                                 // 1445
                                                                                                                      //
    mods = {                                                                                                          // 1026
      $set: {                                                                                                         // 1027
        status: "completed",                                                                                          // 1028
        result: result,                                                                                               // 1029
        progress: {                                                                                                   // 1030
          completed: 1,                                                                                               // 1031
          total: 1,                                                                                                   // 1032
          percent: 100                                                                                                // 1033
        },                                                                                                            // 1031
        updated: time                                                                                                 // 1034
      }                                                                                                               // 1028
    };                                                                                                                // 1027
                                                                                                                      //
    if (logObj = this._logMessage.completed(runId)) {                                                                 // 1036
      mods.$push = {                                                                                                  // 1037
        log: logObj                                                                                                   // 1038
      };                                                                                                              // 1038
    }                                                                                                                 // 1462
                                                                                                                      //
    num = this.update({                                                                                               // 1040
      _id: id,                                                                                                        // 1042
      runId: runId,                                                                                                   // 1043
      status: "running"                                                                                               // 1044
    }, mods);                                                                                                         // 1041
                                                                                                                      //
    if (num === 1) {                                                                                                  // 1048
      if (doc.repeats > 0) {                                                                                          // 1049
        if (typeof doc.repeatWait === 'number') {                                                                     // 1050
          if (doc.repeatUntil - doc.repeatWait >= time) {                                                             // 1051
            jobId = this._rerun_job(doc);                                                                             // 1052
          }                                                                                                           // 1050
        } else {                                                                                                      // 1050
          next = (ref = this.later) != null ? ref.schedule(doc.repeatWait).next(2) : void 0;                          // 1056
                                                                                                                      //
          if (next && next.length > 0) {                                                                              // 1057
            d = new Date(next[0]);                                                                                    // 1058
                                                                                                                      //
            if (d - time > 500 || next.length > 1) {                                                                  // 1059
              if (d - time <= 500) {                                                                                  // 1060
                d = new Date(next[1]);                                                                                // 1061
              } else {}                                                                                               // 1060
                                                                                                                      //
              wait = d - time;                                                                                        // 1063
                                                                                                                      //
              if (doc.repeatUntil - wait >= time) {                                                                   // 1064
                jobId = this._rerun_job(doc, doc.repeats - 1, wait);                                                  // 1065
              }                                                                                                       // 1059
            }                                                                                                         // 1057
          }                                                                                                           // 1050
        }                                                                                                             // 1049
      }                                                                                                               // 1491
                                                                                                                      //
      ids = this.find({                                                                                               // 1068
        depends: {                                                                                                    // 1070
          $all: [id]                                                                                                  // 1071
        }                                                                                                             // 1071
      }, {                                                                                                            // 1069
        transform: null,                                                                                              // 1074
        fields: {                                                                                                     // 1075
          _id: 1                                                                                                      // 1076
        }                                                                                                             // 1076
      }).fetch().map(function (_this) {                                                                               // 1073
        return function (d) {                                                                                         // 1502
          return d._id;                                                                                               // 1503
        };                                                                                                            // 1078
      }(this));                                                                                                       // 1078
                                                                                                                      //
      if (ids.length > 0) {                                                                                           // 1080
        mods = {                                                                                                      // 1082
          $pull: {                                                                                                    // 1083
            depends: id                                                                                               // 1084
          },                                                                                                          // 1084
          $push: {                                                                                                    // 1085
            resolved: id                                                                                              // 1086
          }                                                                                                           // 1086
        };                                                                                                            // 1083
                                                                                                                      //
        if (options.delayDeps != null) {                                                                              // 1088
          after = new Date(time.valueOf() + options.delayDeps);                                                       // 1089
          mods.$max = {                                                                                               // 1090
            after: after                                                                                              // 1091
          };                                                                                                          // 1091
        }                                                                                                             // 1520
                                                                                                                      //
        if (logObj = this._logMessage.resolved(id, runId)) {                                                          // 1093
          mods.$push.log = logObj;                                                                                    // 1094
        }                                                                                                             // 1523
                                                                                                                      //
        n = this.update({                                                                                             // 1096
          _id: {                                                                                                      // 1098
            $in: ids                                                                                                  // 1099
          }                                                                                                           // 1099
        }, mods, {                                                                                                    // 1097
          multi: true                                                                                                 // 1103
        });                                                                                                           // 1102
                                                                                                                      //
        if (n !== ids.length) {                                                                                       // 1106
          console.warn("Not all dependent jobs were resolved " + ids.length + " > " + n);                             // 1107
        }                                                                                                             // 1533
                                                                                                                      //
        this._DDPMethod_jobReady(ids);                                                                                // 1109
      }                                                                                                               // 1535
                                                                                                                      //
      if (options.repeatId && jobId != null) {                                                                        // 1110
        return jobId;                                                                                                 // 1111
      } else {                                                                                                        // 1110
        return true;                                                                                                  // 1113
      }                                                                                                               // 1048
    } else {                                                                                                          // 1048
      console.warn("jobDone failed");                                                                                 // 1115
    }                                                                                                                 // 1543
                                                                                                                      //
    return false;                                                                                                     // 1116
  };                                                                                                                  // 994
                                                                                                                      //
  JobCollectionBase.prototype._DDPMethod_jobFail = function (id, runId, err, options) {                               // 1547
    var after, doc, logObj, mods, newStatus, num, time;                                                               // 1119
    check(id, Match.Where(_validId));                                                                                 // 1119
    check(runId, Match.Where(_validId));                                                                              // 1120
    check(err, Object);                                                                                               // 1121
    check(options, Match.Optional({                                                                                   // 1122
      fatal: Match.Optional(Boolean)                                                                                  // 1123
    }));                                                                                                              // 1123
                                                                                                                      //
    if (options == null) {                                                                                            // 1555
      options = {};                                                                                                   // 1125
    }                                                                                                                 // 1557
                                                                                                                      //
    if (options.fatal == null) {                                                                                      // 1558
      options.fatal = false;                                                                                          // 1126
    }                                                                                                                 // 1560
                                                                                                                      //
    time = new Date();                                                                                                // 1128
    doc = this.findOne({                                                                                              // 1129
      _id: id,                                                                                                        // 1131
      runId: runId,                                                                                                   // 1132
      status: "running"                                                                                               // 1133
    }, {                                                                                                              // 1130
      fields: {                                                                                                       // 1136
        log: 0,                                                                                                       // 1137
        failures: 0,                                                                                                  // 1138
        progress: 0,                                                                                                  // 1139
        updated: 0,                                                                                                   // 1140
        after: 0,                                                                                                     // 1141
        runId: 0,                                                                                                     // 1142
        status: 0                                                                                                     // 1143
      },                                                                                                              // 1137
      transform: null                                                                                                 // 1144
    });                                                                                                               // 1135
                                                                                                                      //
    if (doc == null) {                                                                                                // 1147
      if (!this.isSimulation) {                                                                                       // 1148
        console.warn("Running job not found", id, runId);                                                             // 1149
      }                                                                                                               // 1581
                                                                                                                      //
      return false;                                                                                                   // 1150
    }                                                                                                                 // 1583
                                                                                                                      //
    after = function () {                                                                                             // 1152
      switch (doc.retryBackoff) {                                                                                     // 1152
        case 'exponential':                                                                                           // 1152
          return new Date(time.valueOf() + doc.retryWait * Math.pow(2, doc.retried - 1));                             // 1587
                                                                                                                      //
        default:                                                                                                      // 1152
          return new Date(time.valueOf() + doc.retryWait);                                                            // 1589
      }                                                                                                               // 1152
    }();                                                                                                              // 1591
                                                                                                                      //
    newStatus = !options.fatal && doc.retries > 0 && doc.retryUntil >= after ? "waiting" : "failed";                  // 1158
    err.runId = runId;                                                                                                // 1162
    mods = {                                                                                                          // 1164
      $set: {                                                                                                         // 1165
        status: newStatus,                                                                                            // 1166
        runId: null,                                                                                                  // 1167
        after: after,                                                                                                 // 1168
        progress: {                                                                                                   // 1169
          completed: 0,                                                                                               // 1170
          total: 1,                                                                                                   // 1171
          percent: 0                                                                                                  // 1172
        },                                                                                                            // 1170
        updated: time                                                                                                 // 1173
      },                                                                                                              // 1166
      $push: {                                                                                                        // 1174
        failures: err                                                                                                 // 1175
      }                                                                                                               // 1175
    };                                                                                                                // 1165
                                                                                                                      //
    if (logObj = this._logMessage.failed(runId, newStatus === 'failed', err)) {                                       // 1178
      mods.$push.log = logObj;                                                                                        // 1179
    }                                                                                                                 // 1612
                                                                                                                      //
    num = this.update({                                                                                               // 1181
      _id: id,                                                                                                        // 1183
      runId: runId,                                                                                                   // 1184
      status: "running"                                                                                               // 1185
    }, mods);                                                                                                         // 1182
                                                                                                                      //
    if (newStatus === "failed" && num === 1) {                                                                        // 1189
      this.find({                                                                                                     // 1191
        depends: {                                                                                                    // 1193
          $all: [id]                                                                                                  // 1194
        }                                                                                                             // 1194
      }, {                                                                                                            // 1192
        transform: null                                                                                               // 1197
      }).forEach(function (_this) {                                                                                   // 1196
        return function (d) {                                                                                         // 1626
          return _this._DDPMethod_jobCancel(d._id);                                                                   // 1627
        };                                                                                                            // 1199
      }(this));                                                                                                       // 1199
    }                                                                                                                 // 1630
                                                                                                                      //
    if (num === 1) {                                                                                                  // 1200
      return true;                                                                                                    // 1201
    } else {                                                                                                          // 1200
      console.warn("jobFail failed");                                                                                 // 1203
    }                                                                                                                 // 1635
                                                                                                                      //
    return false;                                                                                                     // 1204
  };                                                                                                                  // 1118
                                                                                                                      //
  return JobCollectionBase;                                                                                           // 1639
}(Mongo.Collection);                                                                                                  // 1641
                                                                                                                      //
share.JobCollectionBase = JobCollectionBase;                                                                          // 1208
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/vsivsi_job-collection/src/server.coffee.js                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
                                                                                                                      //
var eventEmitter,                                                                                                     // 7
    userHelper,                                                                                                       // 7
    bind = function (fn, me) {                                                                                        // 7
  return function () {                                                                                                // 7
    return fn.apply(me, arguments);                                                                                   // 7
  };                                                                                                                  // 7
},                                                                                                                    // 7
    extend = function (child, parent) {                                                                               // 7
  for (var key in meteorBabelHelpers.sanitizeForInObject(parent)) {                                                   // 3
    if (hasProp.call(parent, key)) child[key] = parent[key];                                                          // 3
  }                                                                                                                   // 3
                                                                                                                      //
  function ctor() {                                                                                                   // 3
    this.constructor = child;                                                                                         // 3
  }                                                                                                                   // 3
                                                                                                                      //
  ctor.prototype = parent.prototype;                                                                                  // 3
  child.prototype = new ctor();                                                                                       // 3
  child.__super__ = parent.prototype;                                                                                 // 3
  return child;                                                                                                       // 3
},                                                                                                                    // 3
    hasProp = {}.hasOwnProperty,                                                                                      // 7
    slice = [].slice,                                                                                                 // 7
    indexOf = [].indexOf || function (item) {                                                                         // 7
  for (var i = 0, l = this.length; i < l; i++) {                                                                      // 6
    if (i in this && this[i] === item) return i;                                                                      // 6
  }                                                                                                                   // 6
                                                                                                                      //
  return -1;                                                                                                          // 6
};                                                                                                                    // 6
                                                                                                                      //
if (Meteor.isServer) {                                                                                                // 7
  eventEmitter = Npm.require('events').EventEmitter;                                                                  // 9
                                                                                                                      //
  userHelper = function (user, connection) {                                                                          // 11
    var ret;                                                                                                          // 12
    ret = user != null ? user : "[UNAUTHENTICATED]";                                                                  // 12
                                                                                                                      //
    if (!connection) {                                                                                                // 13
      ret = "[SERVER]";                                                                                               // 14
    }                                                                                                                 // 15
                                                                                                                      //
    return ret;                                                                                                       // 16
  };                                                                                                                  // 11
                                                                                                                      //
  JobCollection = function (superClass) {                                                                             // 20
    extend(JobCollection, superClass);                                                                                // 19
                                                                                                                      //
    function JobCollection(root, options) {                                                                           // 22
      var foo, i, len, level, localMethods, methodFunction, methodName, ref;                                          // 23
                                                                                                                      //
      if (root == null) {                                                                                             // 23
        root = 'queue';                                                                                               // 22
      }                                                                                                               // 25
                                                                                                                      //
      if (options == null) {                                                                                          // 26
        options = {};                                                                                                 // 22
      }                                                                                                               // 28
                                                                                                                      //
      this._emit = bind(this._emit, this);                                                                            // 29
      this._toLog = bind(this._toLog, this);                                                                          // 30
      this._onCall = bind(this._onCall, this);                                                                        // 31
      this._onError = bind(this._onError, this);                                                                      // 32
                                                                                                                      //
      if (!(this instanceof JobCollection)) {                                                                         // 23
        return new JobCollection(root, options);                                                                      // 24
      }                                                                                                               // 35
                                                                                                                      //
      JobCollection.__super__.constructor.call(this, root, options);                                                  // 27
                                                                                                                      //
      this.events = new eventEmitter();                                                                               // 29
      this._errorListener = this.events.on('error', this._onError);                                                   // 31
      this._methodErrorDispatch = this.events.on('error', function (_this) {                                          // 34
        return function (msg) {                                                                                       // 40
          return _this.events.emit(msg.method, msg);                                                                  // 41
        };                                                                                                            // 34
      }(this));                                                                                                       // 34
      this._callListener = this.events.on('call', this._onCall);                                                      // 37
      this._methodEventDispatch = this.events.on('call', function (_this) {                                           // 40
        return function (msg) {                                                                                       // 46
          return _this.events.emit(msg.method, msg);                                                                  // 47
        };                                                                                                            // 40
      }(this));                                                                                                       // 40
      this.stopped = true;                                                                                            // 43
                                                                                                                      //
      share.JobCollectionBase.__super__.deny.bind(this)({                                                             // 46
        update: function (_this) {                                                                                    // 47
          return function () {                                                                                        // 53
            return true;                                                                                              // 54
          };                                                                                                          // 47
        }(this),                                                                                                      // 47
        insert: function (_this) {                                                                                    // 48
          return function () {                                                                                        // 58
            return true;                                                                                              // 59
          };                                                                                                          // 48
        }(this),                                                                                                      // 48
        remove: function (_this) {                                                                                    // 49
          return function () {                                                                                        // 63
            return true;                                                                                              // 64
          };                                                                                                          // 49
        }(this)                                                                                                       // 49
      });                                                                                                             // 47
                                                                                                                      //
      this.promote();                                                                                                 // 51
      this.logStream = null;                                                                                          // 53
      this.allows = {};                                                                                               // 55
      this.denys = {};                                                                                                // 56
      ref = this.ddpPermissionLevels.concat(this.ddpMethods);                                                         // 59
                                                                                                                      //
      for (i = 0, len = ref.length; i < len; i++) {                                                                   // 59
        level = ref[i];                                                                                               // 74
        this.allows[level] = [];                                                                                      // 60
        this.denys[level] = [];                                                                                       // 61
      }                                                                                                               // 59
                                                                                                                      //
      if (options.connection == null) {                                                                               // 65
        this._ensureIndex({                                                                                           // 67
          type: 1,                                                                                                    // 67
          status: 1                                                                                                   // 67
        });                                                                                                           // 67
                                                                                                                      //
        this._ensureIndex({                                                                                           // 68
          priority: 1,                                                                                                // 68
          retryUntil: 1,                                                                                              // 68
          after: 1                                                                                                    // 68
        });                                                                                                           // 68
                                                                                                                      //
        this.isSimulation = false;                                                                                    // 69
        localMethods = this._generateMethods();                                                                       // 70
                                                                                                                      //
        if (this._localServerMethods == null) {                                                                       // 90
          this._localServerMethods = {};                                                                              // 71
        }                                                                                                             // 92
                                                                                                                      //
        for (methodName in meteorBabelHelpers.sanitizeForInObject(localMethods)) {                                    // 72
          methodFunction = localMethods[methodName];                                                                  // 94
          this._localServerMethods[methodName] = methodFunction;                                                      // 72
        }                                                                                                             // 72
                                                                                                                      //
        foo = this;                                                                                                   // 73
                                                                                                                      //
        this._ddp_apply = function (_this) {                                                                          // 74
          return function (name, params, cb) {                                                                        // 99
            if (cb != null) {                                                                                         // 75
              return Meteor.setTimeout(function () {                                                                  // 101
                var e, err, res;                                                                                      // 77
                err = null;                                                                                           // 77
                res = null;                                                                                           // 78
                                                                                                                      //
                try {                                                                                                 // 79
                  res = _this._localServerMethods[name].apply(_this, params);                                         // 80
                } catch (error) {                                                                                     // 79
                  e = error;                                                                                          // 81
                  err = e;                                                                                            // 82
                }                                                                                                     // 110
                                                                                                                      //
                return cb(err, res);                                                                                  // 111
              }, 0);                                                                                                  // 76
            } else {                                                                                                  // 75
              return _this._localServerMethods[name].apply(_this, params);                                            // 114
            }                                                                                                         // 115
          };                                                                                                          // 74
        }(this);                                                                                                      // 74
                                                                                                                      //
        Job._setDDPApply(this._ddp_apply, root);                                                                      // 87
                                                                                                                      //
        Meteor.methods(localMethods);                                                                                 // 89
      }                                                                                                               // 120
    }                                                                                                                 // 22
                                                                                                                      //
    JobCollection.prototype._onError = function (msg) {                                                               // 123
      var user;                                                                                                       // 92
      user = userHelper(msg.userId, msg.connection);                                                                  // 92
      return this._toLog(user, msg.method, "" + msg.error);                                                           // 126
    };                                                                                                                // 91
                                                                                                                      //
    JobCollection.prototype._onCall = function (msg) {                                                                // 129
      var user;                                                                                                       // 96
      user = userHelper(msg.userId, msg.connection);                                                                  // 96
                                                                                                                      //
      this._toLog(user, msg.method, "params: " + JSON.stringify(msg.params));                                         // 97
                                                                                                                      //
      return this._toLog(user, msg.method, "returned: " + JSON.stringify(msg.returnVal));                             // 133
    };                                                                                                                // 95
                                                                                                                      //
    JobCollection.prototype._toLog = function (userId, method, message) {                                             // 136
      var ref;                                                                                                        // 101
      return (ref = this.logStream) != null ? ref.write(new Date() + ", " + userId + ", " + method + ", " + message + "\n") : void 0;
    };                                                                                                                // 100
                                                                                                                      //
    JobCollection.prototype._emit = function () {                                                                     // 141
      var connection, err, method, params, ret, userId;                                                               // 105
      method = arguments[0], connection = arguments[1], userId = arguments[2], err = arguments[3], ret = arguments[4], params = 6 <= arguments.length ? slice.call(arguments, 5) : [];
                                                                                                                      //
      if (err) {                                                                                                      // 105
        return this.events.emit('error', {                                                                            // 145
          error: err,                                                                                                 // 107
          method: method,                                                                                             // 108
          connection: connection,                                                                                     // 109
          userId: userId,                                                                                             // 110
          params: params,                                                                                             // 111
          returnVal: null                                                                                             // 112
        });                                                                                                           // 107
      } else {                                                                                                        // 105
        return this.events.emit('call', {                                                                             // 154
          error: null,                                                                                                // 115
          method: method,                                                                                             // 116
          connection: connection,                                                                                     // 117
          userId: userId,                                                                                             // 118
          params: params,                                                                                             // 119
          returnVal: ret                                                                                              // 120
        });                                                                                                           // 115
      }                                                                                                               // 162
    };                                                                                                                // 104
                                                                                                                      //
    JobCollection.prototype._methodWrapper = function (method, func) {                                                // 165
      var myTypeof, permitted, self;                                                                                  // 123
      self = this;                                                                                                    // 123
                                                                                                                      //
      myTypeof = function (val) {                                                                                     // 124
        var type;                                                                                                     // 125
        type = typeof val === "undefined" ? "undefined" : _typeof(val);                                               // 125
                                                                                                                      //
        if (type === 'object' && type instanceof Array) {                                                             // 126
          type = 'array';                                                                                             // 126
        }                                                                                                             // 173
                                                                                                                      //
        return type;                                                                                                  // 127
      };                                                                                                              // 124
                                                                                                                      //
      permitted = function (_this) {                                                                                  // 128
        return function (userId, params) {                                                                            // 177
          var performAllTests, performTest;                                                                           // 129
                                                                                                                      //
          performTest = function (tests) {                                                                            // 129
            var i, len, result, test;                                                                                 // 130
            result = false;                                                                                           // 130
                                                                                                                      //
            for (i = 0, len = tests.length; i < len; i++) {                                                           // 131
              test = tests[i];                                                                                        // 183
                                                                                                                      //
              if (result === false) {                                                                                 // 184
                result = result || function () {                                                                      // 132
                  switch (myTypeof(test)) {                                                                           // 132
                    case 'array':                                                                                     // 132
                      return indexOf.call(test, userId) >= 0;                                                         // 188
                                                                                                                      //
                    case 'function':                                                                                  // 132
                      return test(userId, method, params);                                                            // 190
                                                                                                                      //
                    default:                                                                                          // 132
                      return false;                                                                                   // 192
                  }                                                                                                   // 132
                }();                                                                                                  // 194
              }                                                                                                       // 195
            }                                                                                                         // 131
                                                                                                                      //
            return result;                                                                                            // 136
          };                                                                                                          // 129
                                                                                                                      //
          performAllTests = function (allTests) {                                                                     // 137
            var i, len, ref, result, t;                                                                               // 138
            result = false;                                                                                           // 138
            ref = _this.ddpMethodPermissions[method];                                                                 // 139
                                                                                                                      //
            for (i = 0, len = ref.length; i < len; i++) {                                                             // 139
              t = ref[i];                                                                                             // 204
                                                                                                                      //
              if (result === false) {                                                                                 // 205
                result = result || performTest(allTests[t]);                                                          // 140
              }                                                                                                       // 207
            }                                                                                                         // 139
                                                                                                                      //
            return result;                                                                                            // 141
          };                                                                                                          // 137
                                                                                                                      //
          return !performAllTests(_this.denys) && performAllTests(_this.allows);                                      // 142
        };                                                                                                            // 128
      }(this);                                                                                                        // 128
                                                                                                                      //
      return function () {                                                                                            // 144
        var err, params, retval;                                                                                      // 145
        params = 1 <= arguments.length ? slice.call(arguments, 0) : [];                                               // 144
                                                                                                                      //
        try {                                                                                                         // 145
          if (!(this.connection && !permitted(this.userId, params))) {                                                // 146
            retval = func.apply(null, params);                                                                        // 147
          } else {                                                                                                    // 146
            err = new Meteor.Error(403, "Method not authorized", "Authenticated user is not permitted to invoke this method.");
            throw err;                                                                                                // 150
          }                                                                                                           // 145
        } catch (error) {                                                                                             // 145
          err = error;                                                                                                // 151
                                                                                                                      //
          self._emit(method, this.connection, this.userId, err);                                                      // 152
                                                                                                                      //
          throw err;                                                                                                  // 153
        }                                                                                                             // 228
                                                                                                                      //
        self._emit.apply(self, [method, this.connection, this.userId, null, retval].concat(slice.call(params)));      // 154
                                                                                                                      //
        return retval;                                                                                                // 155
      };                                                                                                              // 144
    };                                                                                                                // 122
                                                                                                                      //
    JobCollection.prototype.setLogStream = function (writeStream) {                                                   // 234
      if (writeStream == null) {                                                                                      // 235
        writeStream = null;                                                                                           // 157
      }                                                                                                               // 237
                                                                                                                      //
      if (this.logStream) {                                                                                           // 158
        throw new Error("logStream may only be set once per job-collection startup/shutdown cycle");                  // 159
      }                                                                                                               // 240
                                                                                                                      //
      this.logStream = writeStream;                                                                                   // 160
                                                                                                                      //
      if (!(this.logStream == null || this.logStream.write != null && typeof this.logStream.write === 'function' && this.logStream.end != null && typeof this.logStream.end === 'function')) {
        throw new Error("logStream must be a valid writable node.js Stream");                                         // 166
      }                                                                                                               // 244
    };                                                                                                                // 157
                                                                                                                      //
    JobCollection.prototype.allow = function (allowOptions) {                                                         // 247
      var func, results, type;                                                                                        // 170
      results = [];                                                                                                   // 170
                                                                                                                      //
      for (type in meteorBabelHelpers.sanitizeForInObject(allowOptions)) {                                            // 250
        func = allowOptions[type];                                                                                    // 251
                                                                                                                      //
        if (type in this.allows) {                                                                                    // 252
          results.push(this.allows[type].push(func));                                                                 // 253
        }                                                                                                             // 254
      }                                                                                                               // 170
                                                                                                                      //
      return results;                                                                                                 // 256
    };                                                                                                                // 169
                                                                                                                      //
    JobCollection.prototype.deny = function (denyOptions) {                                                           // 259
      var func, results, type;                                                                                        // 174
      results = [];                                                                                                   // 174
                                                                                                                      //
      for (type in meteorBabelHelpers.sanitizeForInObject(denyOptions)) {                                             // 262
        func = denyOptions[type];                                                                                     // 263
                                                                                                                      //
        if (type in this.denys) {                                                                                     // 264
          results.push(this.denys[type].push(func));                                                                  // 265
        }                                                                                                             // 266
      }                                                                                                               // 174
                                                                                                                      //
      return results;                                                                                                 // 268
    };                                                                                                                // 173
                                                                                                                      //
    JobCollection.prototype.scrub = function (job) {                                                                  // 271
      return job;                                                                                                     // 272
    };                                                                                                                // 177
                                                                                                                      //
    JobCollection.prototype.promote = function (milliseconds) {                                                       // 275
      if (milliseconds == null) {                                                                                     // 276
        milliseconds = 15 * 1000;                                                                                     // 180
      }                                                                                                               // 278
                                                                                                                      //
      if (typeof milliseconds === 'number' && milliseconds > 0) {                                                     // 181
        if (this.interval) {                                                                                          // 182
          Meteor.clearInterval(this.interval);                                                                        // 183
        }                                                                                                             // 282
                                                                                                                      //
        this._promote_jobs();                                                                                         // 184
                                                                                                                      //
        return this.interval = Meteor.setInterval(this._promote_jobs.bind(this), milliseconds);                       // 284
      } else {                                                                                                        // 181
        return console.warn("jobCollection.promote: invalid timeout: " + this.root + ", " + milliseconds);            // 286
      }                                                                                                               // 287
    };                                                                                                                // 180
                                                                                                                      //
    JobCollection.prototype._promote_jobs = function (ids) {                                                          // 290
      if (ids == null) {                                                                                              // 291
        ids = [];                                                                                                     // 189
      }                                                                                                               // 293
                                                                                                                      //
      if (this.stopped) {                                                                                             // 190
        return;                                                                                                       // 191
      }                                                                                                               // 296
                                                                                                                      //
      this.find({                                                                                                     // 193
        status: 'running',                                                                                            // 193
        expiresAfter: {                                                                                               // 193
          $lt: new Date()                                                                                             // 193
        }                                                                                                             // 193
      }).forEach(function (_this) {                                                                                   // 193
        return function (job) {                                                                                       // 303
          return new Job(_this.root, job).fail("Failed for exceeding worker set workTimeout");                        // 304
        };                                                                                                            // 194
      }(this));                                                                                                       // 194
      return this.readyJobs();                                                                                        // 307
    };                                                                                                                // 189
                                                                                                                      //
    return JobCollection;                                                                                             // 310
  }(share.JobCollectionBase);                                                                                         // 312
}                                                                                                                     // 313
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['vsivsi:job-collection'] = {}, {
  Job: Job,
  JobCollection: JobCollection
});

})();

//# sourceMappingURL=vsivsi_job-collection.js.map
