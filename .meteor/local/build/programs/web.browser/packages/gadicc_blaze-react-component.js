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
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Template = Package['templating-runtime'].Template;
var ReactiveVar = Package['reactive-var'].ReactiveVar;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;
var HTML = Package.htmljs.HTML;
var Spacebars = Package.spacebars.Spacebars;

/* Package-scope variables */
var blazeToReact, BlazeComponent;

var require = meteorInstall({"node_modules":{"meteor":{"gadicc:blaze-react-component":{"blaze-react-component-client.js":["babel-runtime/helpers/extends","babel-runtime/helpers/typeof","babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits","react","react-dom","meteor/blaze","meteor/reactive-var","meteor/templating",function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// packages/gadicc_blaze-react-component/blaze-react-component-client.js                          //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _extends2 = require("babel-runtime/helpers/extends");                                         //
                                                                                                  //
var _extends3 = _interopRequireDefault(_extends2);                                                //
                                                                                                  //
var _typeof2 = require("babel-runtime/helpers/typeof");                                           //
                                                                                                  //
var _typeof3 = _interopRequireDefault(_typeof2);                                                  //
                                                                                                  //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                           //
                                                                                                  //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                  //
                                                                                                  //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");     //
                                                                                                  //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);            //
                                                                                                  //
var _inherits2 = require("babel-runtime/helpers/inherits");                                       //
                                                                                                  //
var _inherits3 = _interopRequireDefault(_inherits2);                                              //
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
var Template = void 0;                                                                            // 1
module.importSync("meteor/templating", {                                                          // 1
  Template: function (v) {                                                                        // 1
    Template = v;                                                                                 // 1
  }                                                                                               // 1
}, 4);                                                                                            // 1
                                                                                                  //
var BlazeComponent = function (_Component) {                                                      //
  (0, _inherits3.default)(BlazeComponent, _Component);                                            //
                                                                                                  //
  function BlazeComponent() {                                                                     //
    (0, _classCallCheck3.default)(this, BlazeComponent);                                          //
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));     //
  }                                                                                               //
                                                                                                  //
  BlazeComponent.prototype.componentDidMount = function () {                                      //
    function componentDidMount() {                                                                //
      this.renderBlazeView();                                                                     // 10
    }                                                                                             // 11
                                                                                                  //
    return componentDidMount;                                                                     //
  }();                                                                                            //
                                                                                                  //
  BlazeComponent.prototype.componentDidUpdate = function () {                                     //
    function componentDidUpdate(prevProps) {                                                      //
      if (prevProps.template != this.props.template) {                                            // 14
        Blaze.remove(this._blazeView);                                                            // 15
        this.renderBlazeView();                                                                   // 16
      }                                                                                           // 17
    }                                                                                             // 18
                                                                                                  //
    return componentDidUpdate;                                                                    //
  }();                                                                                            //
                                                                                                  //
  BlazeComponent.prototype.renderBlazeView = function () {                                        //
    function renderBlazeView() {                                                                  //
      var _this2 = this;                                                                          // 20
                                                                                                  //
      this._blazeData = new ReactiveVar(_.omit(this.props, 'template'));                          // 21
      var template = void 0,                                                                      // 23
          tArg = this.props.template;                                                             // 23
                                                                                                  //
      if (typeof tArg === 'string') {                                                             // 24
        template = Template[tArg];                                                                // 25
        if (!template) throw new Error("No Template[\"" + tArg + "\"] exists.  If this template " + "originates in your app, make sure you have the `templating` " + "package installed (and not, for e.g. `static-html`)");
      } else if (tArg instanceof Blaze.Template) {                                                // 30
        template = tArg;                                                                          // 31
      } else {                                                                                    // 32
        throw new Error("Invalid template= argument specified.  Expected " + "the string name of an existing Template, or the template " + "itself, instead got ''" + (typeof tArg === "undefined" ? "undefined" : (0, _typeof3.default)(tArg)) + ": " + JSON.stringify(tArg));
      }                                                                                           // 37
                                                                                                  //
      this._blazeView = Blaze.renderWithData(template, function () {                              // 39
        return _this2._blazeData.get();                                                           // 41
      }, ReactDOM.findDOMNode(this._blazeRef));                                                   // 41
    }                                                                                             // 44
                                                                                                  //
    return renderBlazeView;                                                                       //
  }();                                                                                            //
                                                                                                  //
  BlazeComponent.prototype.shouldComponentUpdate = function () {                                  //
    function shouldComponentUpdate(nextProps) {                                                   //
      // Never call render() for props except template again; Blaze will do what's necessary.     // 47
      return nextProps.template !== this.props.template;                                          // 48
    }                                                                                             // 49
                                                                                                  //
    return shouldComponentUpdate;                                                                 //
  }();                                                                                            //
                                                                                                  //
  BlazeComponent.prototype.componentWillReceiveProps = function () {                              //
    function componentWillReceiveProps(nextProps) {                                               //
      this._blazeData.set(_.omit(nextProps, 'template'));                                         // 52
    }                                                                                             // 53
                                                                                                  //
    return componentWillReceiveProps;                                                             //
  }();                                                                                            //
                                                                                                  //
  BlazeComponent.prototype.componentWillUnmount = function () {                                   //
    function componentWillUnmount() {                                                             //
      Blaze.remove(this._blazeView);                                                              // 56
    }                                                                                             // 57
                                                                                                  //
    return componentWillUnmount;                                                                  //
  }();                                                                                            //
                                                                                                  //
  BlazeComponent.prototype.render = function () {                                                 //
    function render() {                                                                           //
      var _this3 = this;                                                                          // 59
                                                                                                  //
      return React.createElement("span", {                                                        // 60
        className: this.props.className || '',                                                    // 60
        ref: function (c) {                                                                       // 60
          return _this3._blazeRef = c;                                                            // 60
        }                                                                                         // 60
      });                                                                                         // 60
    }                                                                                             // 61
                                                                                                  //
    return render;                                                                                //
  }();                                                                                            //
                                                                                                  //
  return BlazeComponent;                                                                          //
}(Component);                                                                                     //
                                                                                                  //
module.runModuleSetters(blazeToReact = function (template) {                                      // 65
  return function (props) {                                                                       // 66
    return React.createElement(BlazeComponent, (0, _extends3.default)({}, props, {                // 66
      template: template                                                                          // 66
    }));                                                                                          // 66
  };                                                                                              // 66
});                                                                                               // 67
module.export("default", exports.default = BlazeComponent);                                       // 1
////////////////////////////////////////////////////////////////////////////////////////////////////

}]}}}},{"extensions":[".js",".json"]});
var exports = require("./node_modules/meteor/gadicc:blaze-react-component/blaze-react-component-client.js");

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
