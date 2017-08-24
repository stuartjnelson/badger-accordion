/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Importing accordion

var _arrayFromPollyfill = __webpack_require__(2);

var _arrayFromPollyfill2 = _interopRequireDefault(_arrayFromPollyfill);

var _badgerAccordion = __webpack_require__(3);

var _badgerAccordion2 = _interopRequireDefault(_badgerAccordion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Creating a new instance of the accordion
var accordion = new _badgerAccordion2.default('.js-badger-accordion');

// API Examples
// accordion.open( document.querySelector('[data-badger-accordion-header-id="1"]') );
// accordion.close( 0 );
// console.log(accordion.getState( [0] ));

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Production steps of ECMA-262, Edition 6, 22.1.2.1
if (!Array.from) {
  Array.from = function () {
    var toStr = Object.prototype.toString;
    var isCallable = function isCallable(fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function toInteger(value) {
      var number = Number(value);
      if (isNaN(number)) {
        return 0;
      }
      if (number === 0 || !isFinite(number)) {
        return number;
      }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function toLength(value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike /*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  }();
}

exports.default = module;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  ACCORDION
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * A lightwight vanilla JS accordion with an exstensible API
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _v = __webpack_require__(4);

var _v2 = _interopRequireDefault(_v);

var _transitionEnd = __webpack_require__(8);

var _transitionEnd2 = _interopRequireDefault(_transitionEnd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uuidV4 = _v2.default;

/**
 * CONSTRUCTOR
 * initialises the object
 */
var BadgerAccordion = function () {
    function BadgerAccordion(el, options) {
        _classCallCheck(this, BadgerAccordion);

        var container = document.querySelector(el);

        // If el is not defined
        if (container == null) {
            return;
        }

        var defaults = {
            headerClass: '.js-badger-accordion-header',
            panelClass: '.js-badger-accordion-panel',
            panelInnerClass: '.js-badger-accordion-panel-inner',
            hidenClass: 'is-hidden',
            initalisedClass: 'badger-accordion--initalised',
            headerDataAttr: 'data-badger-accordion-header-id',
            openMultiplePanels: false,
            openHeadersOnLoad: [],
            headerOpenLabel: 'Open accordion panel',
            headerCloseLabel: 'Close accordion panel'
            // toggleEl:            // If you want to use a different element to trigger the accordion
        };

        // Options
        this.settings = _extends({}, defaults, options);

        // Setting getting elements
        this.container = container;
        this.headers = Array.from(this.container.querySelectorAll(this.settings.headerClass));
        this.panels = Array.from(this.container.querySelectorAll(this.settings.panelClass));
        this.toggleEl = this.settings.toggleEl !== undefined ? Array.from(this.container.querySelectorAll(this.settings.toggleEl)) : this.headers;

        // This is for managing state of the accordion. It by default sets
        // all accordion panels to be closed
        this.states = [].map.call(this.headers, function (header) {
            return { state: 'closed' };
        });

        this.ids = [].map.call(this.headers, function (header) {
            return { id: uuidV4() };
        });

        // This is to ensure that once an opne/close event has been fired
        // another cannot start until the first event has finished.
        // @TODO - get this working...
        this.toggling = false;

        // Initiating the accordion
        if (this.container) {
            this.init();
        } else {
            console.log('Something is wrong with you markup...');
        }
    }

    /**
     *  INIT
     *
     *  Initalises the accordion
     */


    _createClass(BadgerAccordion, [{
        key: 'init',
        value: function init() {
            // Sets up ID, aria attrs & data-attrs
            this._setupAttributes();

            // Setting up the inital view of the accordion
            this._initalState();

            // Setting the height of each panel
            this._setPanelHeight();

            // Inserting data-attribute onto each `header`
            this._insertDataAttrs();

            // Adding listeners to headers
            this._addListeners();

            //
            this._finishInitalisation();
        }

        /**
         *  INSERT DATA ATTRS
         *
         *  Updates state object for inital loading of the accordion
         */

    }, {
        key: '_initalState',
        value: function _initalState() {
            // Sets state object as per `this.settings.openHeadersOnLoad`
            var headersToOpen = this.settings.openHeadersOnLoad;

            if (headersToOpen.length) {
                this._openHeadersOnLoad(headersToOpen);
            }

            // Render DOM as per the updates `this.states` object
            this._renderDom();
        }

        /**
         *  INSERT DATA ATTRS
         *
         *  Adds `headerDataAttr` to all headers
         */

    }, {
        key: '_insertDataAttrs',
        value: function _insertDataAttrs() {
            var _this2 = this;

            this.headers.forEach(function (header, index) {
                header.setAttribute(_this2.settings.headerDataAttr, index);
            });
        }

        /**
         *  FINISH INITALISATION
         *
         *  Adds in `initalisedClass` to accordion
         */

    }, {
        key: '_finishInitalisation',
        value: function _finishInitalisation() {
            this.container.classList.add(this.settings.initalisedClass);
        }

        /**
         *  ADD LISTENERS
         *
         *  Adds click event to each header
         */

    }, {
        key: '_addListeners',
        value: function _addListeners() {
            // So we can reference the badger-accordion object inside out eventListener
            var _this = this;

            // Adding click event to accordion
            this.headers.forEach(function (header, index) {
                header.addEventListener('click', function (event) {
                    // Getting the target of the click
                    // const clickedEl = event.target;

                    _this.handleClick(header, index);
                });
            });
        }

        /**
         *  HANDLE CLICK
         *
         *  //TODO - Add comment
         *  @param {object} targetHeader - The header node you want to open
         */

    }, {
        key: 'handleClick',
        value: function handleClick(targetHeader, headerIndex) {
            // Removing current `.` from `this.settings.headerClass` class so it can
            // be checked against the `targetHeader` classList
            var targetHeaderClass = this.settings.headerClass.substr(1);

            // Checking that the thing that was clicked on was the accordions header
            if (targetHeader.classList.contains(targetHeaderClass) && this.toggling === false) {
                this.toggling = true;

                // Updating states
                this.setState(headerIndex);

                // Render DOM as per the updates `this.states` object
                this._renderDom();
            }
        }

        /**
         *  SET STATES
         *
         *  Sets the state for all headers. The 'target header' will have its state toggeled
         *  @param {object} targetHeaderId - The header node you want to open
         */

    }, {
        key: 'setState',
        value: function setState(targetHeaderId) {
            var _this3 = this;

            var states = this.getState();

            // TODO - improve this comment
            // If `this.settings.openMultiplePanels` is false we need to ensure only one panel
            // be can open at once. This will the state on all but the target header to 'closed'
            if (!this.settings.openMultiplePanels) {
                states.filter(function (state, index) {
                    if (index != targetHeaderId) {
                        state.state = 'closed';
                    }
                });
            }

            // Toggles the state value of the target header. This was `array.find` but `find`
            // isnt supported in IE11
            states.filter(function (state, index) {
                if (index == targetHeaderId) {
                    var newState = _this3.toggleState(state.state);
                    return state.state = newState;
                }
            });
        }

        /**
         *  RENDER DOM
         *
         *  Renders the accordion in the DOM using the `this.states` object
         */

    }, {
        key: '_renderDom',
        value: function _renderDom() {
            var _this4 = this;

            var states = this.getState();

            // Filter through all open headers and open them
            this.states.filter(function (state, index) {
                if (state.state === 'open') {
                    var header = _this4.headers[index];

                    _this4.open(index);
                }
            });

            // Filter through all closed headers and closes them
            this.states.filter(function (state, index) {
                if (state.state === 'closed') {
                    var header = _this4.headers[index];

                    _this4.close(index);
                }
            });
        }

        /**
         *  OPEN
         *
         *  Closes a specific panel
         *  @param {object} header - The header node you want to open
         */

    }, {
        key: 'open',
        value: function open(headerIndex) {
            this.togglePanel('open', headerIndex);
        }

        /**
         *  CLOSE
         *
         *  Closes a specific panel
         *  @param {object} header - The header node you want to close
         */

    }, {
        key: 'close',
        value: function close(headerIndex) {
            this.togglePanel('closed', headerIndex);
        }

        /**
         *  OPEN ALL
         *
         *  Opens all panels
         */

    }, {
        key: 'openAll',
        value: function openAll() {
            var _this5 = this;

            this.headers.forEach(function (header) {
                _this5.togglePanel('open', header);
            });
        }

        /**
         *  CLOSE ALL
         *
         *  Closes all panels
         */

    }, {
        key: 'closeAll',
        value: function closeAll() {
            var _this6 = this;

            this.headers.forEach(function (header) {
                _this6.togglePanel('closed', header);
            });
        }

        /**
         *  GET STATE
         *
         *  Getting state of headers. By default gets state of all headers
         *  @param {string} animationAction - The animation you want to invoke
         *  @param {object} header          - The header node you want to animate
         */

    }, {
        key: 'togglePanel',
        value: function togglePanel(animationAction, headerIndex) {
            var _this7 = this;

            if (animationAction !== undefined && headerIndex !== undefined) {
                if (animationAction === 'closed') {
                    // Getting ID of panel that we want to close
                    var header = this.headers[headerIndex];
                    var panelToClose = this.panels[headerIndex];

                    // Closeing panel
                    panelToClose.classList.add(this.settings.hidenClass);

                    // Set aria attrs
                    header.setAttribute('aria-expanded', false);
                    header.setAttribute('aria-label', this.settings.headerOpenLabel);

                    // Resetting toggling so a new event can be fired
                    panelToClose.onCSSTransitionEnd(function () {
                        return _this7.toggling = false;
                    });
                } else if (animationAction === 'open') {
                    // 1.
                    // Getting ID of panel that we want to open
                    console.log("opening yehh");
                    var _header = this.headers[headerIndex];
                    var panelToOpen = this.panels[headerIndex];

                    // Closeing panel
                    panelToOpen.classList.remove(this.settings.hidenClass);

                    // Set aria attrs
                    _header.setAttribute('aria-expanded', true);
                    _header.setAttribute('aria-label', this.settings.headerCloseLabel);

                    // Resetting toggling so a new event can be fired
                    panelToOpen.onCSSTransitionEnd(function () {
                        return _this7.toggling = false;
                    });
                }
            }
        }

        // @TODO - is this needed anymore?
        // checkState(headerId) {
        //     let state = this.states[headerId].state;
        //
        //     if(state === 'closed') {
        //         return state;
        //     } else if(state === 'open') {
        //         return state;
        //     }
        // }


        /**
         *  GET STATE
         *
         *  Getting state of headers. By default gets state of all headers
         *  @param {array} headerIds - Id/'s of the headers you want to check
         */

    }, {
        key: 'getState',
        value: function getState() {
            var _this8 = this;

            var headerIds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            if (headerIds.length && Array.isArray(headerIds)) {
                var states = headerIds.map(function (header) {
                    return _this8.states[header];
                });

                return states;
            } else {
                return this.states;
            }
        }

        /**
         *  TOGGLE STATE
         *
         *  Toggling the state value
         *  @param {string} currentState - Current state value for a header
         */

    }, {
        key: 'toggleState',
        value: function toggleState(currentState) {
            if (currentState !== undefined) {
                return currentState === 'closed' ? 'open' : 'closed';
            }
        }

        /**
         *  HEADERS TO OPEN
         *
         *  Setting which headers should be open when accordion is initalised
         *  @param {array} headersToOpen - Array of ID's for the headers to be open
         */

    }, {
        key: '_openHeadersOnLoad',
        value: function _openHeadersOnLoad() {
            var _this9 = this;

            var headersToOpen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            if (headersToOpen.length && Array.isArray(headersToOpen)) {
                var headers = headersToOpen.filter(function (header) {
                    return header != undefined;
                });

                headersToOpen.forEach(function (header) {
                    return _this9.states[header].state = 'open';
                });
            }
        }

        /**
         *  SET PANEL HEIGHT
         *
         *  Setting height for panels using pannels inner element
         */

    }, {
        key: '_setPanelHeight',
        value: function _setPanelHeight() {
            var _this10 = this;

            // [].forEach.(this.panels, (panel) => {
            this.panels.forEach(function (panel) {
                var panelInner = panel.querySelector(_this10.settings.panelInnerClass);

                var activeHeight = panelInner.offsetHeight;

                return panel.style.maxHeight = activeHeight + 'px';
            });
        }
    }, {
        key: '_setupHeaders',
        value: function _setupHeaders() {
            var _this11 = this;

            this.headers.forEach(function (header, index) {
                header.setAttribute('id', 'badger-accordion-header-' + _this11.ids[index].id);
                header.setAttribute('aria-controls', 'badger-accordion-panel-' + _this11.ids[index].id);
                header.setAttribute('aria-label', _this11.settings.headerOpenLabel);
            });
        }
    }, {
        key: '_setupPanels',
        value: function _setupPanels() {
            var _this12 = this;

            this.panels.forEach(function (panel, index) {
                panel.setAttribute('id', 'badger-accordion-panel-' + _this12.ids[index].id);
                panel.setAttribute('aria-labeledby', 'badger-accordion-header-' + _this12.ids[index].id);
            });
        }
    }, {
        key: '_setupAttributes',
        value: function _setupAttributes() {
            // Adding ID & aria-controls
            this._setupHeaders();

            // Adding ID & aria-labeledby
            this._setupPanels();

            // Inserting data-attribute onto each `header`
            this._insertDataAttrs();
        }
    }]);

    return BadgerAccordion;
}();

// Export


exports.default = BadgerAccordion;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(5);
var bytesToUuid = __webpack_require__(7);

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection
var rng;

var crypto = global.crypto || global.msCrypto; // for IE 11
if (crypto && crypto.getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef
  rng = function whatwgRNG() {
    crypto.getRandomValues(rnds8);
    return rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

module.exports = rng;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
	value: true
});
/*
	By Osvaldas Valutis, www.osvaldas.info
	Available for use under the MIT License
*/

;(function (document, window, index) {
	var s = document.body || document.documentElement,
	    s = s.style,
	    prefixAnimation = '',
	    prefixTransition = '';

	if (s.WebkitAnimation == '') prefixAnimation = '-webkit-';
	if (s.MozAnimation == '') prefixAnimation = '-moz-';
	if (s.OAnimation == '') prefixAnimation = '-o-';

	if (s.WebkitTransition == '') prefixTransition = '-webkit-';
	if (s.MozTransition == '') prefixTransition = '-moz-';
	if (s.OTransition == '') prefixTransition = '-o-';

	Object.prototype.onCSSAnimationEnd = function (callback) {
		var runOnce = function runOnce(e) {
			callback();e.target.removeEventListener(e.type, runOnce);
		};
		this.addEventListener('webkitAnimationEnd', runOnce);
		this.addEventListener('mozAnimationEnd', runOnce);
		this.addEventListener('oAnimationEnd', runOnce);
		this.addEventListener('oanimationend', runOnce);
		this.addEventListener('animationend', runOnce);
		if (prefixAnimation == '' && !('animation' in s) || getComputedStyle(this)[prefixAnimation + 'animation-duration'] == '0s') callback();
		return this;
	};

	Object.prototype.onCSSTransitionEnd = function (callback) {
		var runOnce = function runOnce(e) {
			callback();e.target.removeEventListener(e.type, runOnce);
		};
		this.addEventListener('webkitTransitionEnd', runOnce);
		this.addEventListener('mozTransitionEnd', runOnce);
		this.addEventListener('oTransitionEnd', runOnce);
		this.addEventListener('transitionend', runOnce);
		this.addEventListener('transitionend', runOnce);
		if (prefixTransition == '' && !('transition' in s) || getComputedStyle(this)[prefixTransition + 'transition-duration'] == '0s') callback();
		return this;
	};
})(document, window, 0);

exports.default = module;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ })
/******/ ]);