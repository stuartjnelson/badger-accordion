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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_uuid_v4__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_uuid_v4___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_uuid_v4__);
/**
 *  ACCORDION
 *
 * A lightwight vanilla JS accordion with an exstensible API
 */


const uuidV4 = __WEBPACK_IMPORTED_MODULE_0_uuid_v4___default.a;

/**
 * CONSTRUCTOR
 * initialises the object
 */
class BadgerAccordion {
    constructor(el, options) {
        const container = document.querySelector(el);

        // If el is not defined
        if (container == null) {
            return;
        }

        const defaults = {
            header:            '.js-badger-accordion-header',
            panel:             '.js-badger-accordion-panel',
            panelInner:        '.js-badger-accordion-panel-inner',
            activeClass:       'is-active',
            hidenClass:        'is-hidden',
            initalisedClass:   'badger-accordion--initalised',
            headerDataAttr:    'data-badger-accordion-header-id',
            openAllPanels:     false,
            openHeadersOnLoad: [],
            // toggleEl:            // If you want to use a different element to trigger the accordion
        };

        // Options
        this.settings = Object.assign({}, defaults, options);

        // Setting getting elements
        this.container = container;
        this.headers = Array.from( this.container.querySelectorAll(this.settings.header) );
        this.panels = Array.from( this.container.querySelectorAll(this.settings.panel) );
        this.toggleEl = this.settings.toggleEl !== undefined ? Array.from(this.container.querySelectorAll(this.settings.toggleEl)) : this.headers;

        // This is for managing state of the accordion. It by default sets
        // all accordion panels to be closed
        this.states = [].map.call(this.headers, header => {
            return { state: 'closed' };
        });

        this.ids = [].map.call(this.headers, header => {
            return { id: uuidV4() };
        });

        // This is to ensure that once an opne/close event has been fired
        // another cannot start until the first event has finished.
        // @TODO - get this working...
        this.toggling = false;

        // Initiating the accordion
        if( this.container ) {
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
     init() {
         // Sets up ID, aria attrs & data-attrs
         this.setupAttributes();

         // Setting up the inital view of the accordion
         this.initalState();

         // Setting the height of each panel
         this.setPanelHeight();

         // Inserting data-attribute onto each `header`
         this.insertDataAttrs();

         // Adding listeners to headers
         this.addListeners();

         //
         this.finishInitalisation();
     }


    /**
     *  INSERT DATA ATTRS
     *
     *  Updates state object for inital loading of the accordion
     */
    _initalState() {
        // Sets state object as per `this.settings.openHeadersOnLoad`
        const headersToOpen = this.settings.openHeadersOnLoad;

        if (headersToOpen.length) {
            this.openHeadersOnLoad(headersToOpen);
        }

        // Render DOM as per the updates `this.states` object
        this.renderDom();
    }


    /**
     *  INSERT DATA ATTRS
     *
     *  Adds `headerDataAttr` to all headers
     */
    insertDataAttrs() {
        this.headers.forEach( (header, index) => {
            header.setAttribute(this.settings.headerDataAttr, index);
        });
    }


    /**
     *  FINISH INITALISATION
     *
     *  Adds in `initalisedClass` to accordion
     */
    _finishInitalisation() {
        document.querySelector(this.settings.container).classList.add(this.settings.initalisedClass);
    }


    /**
     *  ADD LISTENERS
     *
     *  Adds click event to each header
     */
    _addListeners() {
        // So we can reference the badger-accordion object inside out eventListener
        const _this = this;

        // Adding click event to accordion
        this.headers.forEach((header, index) => {
            header.addEventListener('click', function(event) {
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
    handleClick(targetHeader, headerIndex) {
        // Removing current `.` from `this.settings.header` class so it can
        // be checked against the `targetHeader` classList
        const targetHeaderClass = this.settings.header.substr(1);

        // Checking that the thing that was clicked on was the accordions header
        if (targetHeader.classList.contains(targetHeaderClass)) {
            // Updating states
            this.setState(headerIndex);

            // Render DOM as per the updates `this.states` object
            this.renderDom();
        }
    }


    /**
     *  SET STATES
     *
     *  Sets the state for all headers. The 'target header' will have its state toggeled
     *  @param {object} targetHeaderId - The header node you want to open
     */
    setStates(targetHeaderId) {
        const states = this.getState();

        // TODO - improve this comment
        // If `this.settings.openAllPanels` is false we need to ensure only one panel
        // be can open at once. This will the state on all but the target header to 'closed'
        if (!this.settings.openAllPanels) {
            states.filter((state, index) => {
                if (index != targetHeaderId) {
                    state.state = 'closed';
                }
            });
        }

        // Toggles the state value of the target header. This was `array.find` but `find`
        // isnt supported in IE11
        states.filter((state, index) => {
            if (index == targetHeaderId) {
                // TODO - is this a `const` or `let`?
                const newState = this.toggleState(state.state);
                return (state.state = newState);
            }
        });
    }


    /**
     *  RENDER DOM
     *
     *  Renders the accordion in the DOM using the `this.states` object
     */
    renderDom() {
        const states = this.getState();


        // Sets up ID, aria attrs & data-attrs
        this.setupAttributes();


        // Filter through all open headers and open them
        this.states.filter( (state, index) => {
            if(state.state === 'open') {
                let header = this.headers[index];

                this.open(header);
            }
        });

        // Filter through all closed headers and closes them
        this.states.filter( (state, index) => {
            if(state.state === 'closed') {
                let header = this.headers[index];

                this.close(header);
            }
        });


        // Resetting toggling so a new event can be fired
        this.toggling = false;
    }


    /**
     *  OPEN
     *
     *  Closes a specific panel
     *  @param {object} header - The header node you want to open
     */
    open(header) {
        this.togglePanel('open', header);
    }


    /**
     *  CLOSE
     *
     *  Closes a specific panel
     *  @param {object} header - The header node you want to close
     */
    close(header) {
        this.togglePanel('closed', header);
    }


    /**
     *  OPEN ALL
     *
     *  Opens all panels
     */
    openAll() {
        this.headers.forEach( header => {
            this.togglePanel('open', header);
        });
    }


    /**
     *  CLOSE ALL
     *
     *  Closes all panels
     */
    closeAll() {
        this.headers.forEach( header => {
            this.togglePanel('closed', header);
        });
    }


    /**
     *  GET STATE
     *
     *  Getting state of headers. By default gets state of all headers
     *  @param {string} animationAction - The animation you want to invoke
     *  @param {object} header          - The header node you want to animate
     */
    togglePanel(animationAction, header) {
        if(animationAction && header) {
            if(animationAction === 'closed') {
                // Getting ID of panel that we want to close
                let panelId      = header.getAttribute('aria-controls'),
                    panelToClose = document.getElementById(panelId);

                // Closeing panel
                panelToClose.classList.add(this.settings.hidenClass);

                // Set aria attrs
                header.setAttribute('aria-expanded', false);
            } else if(animationAction === 'open') {
                // 1.
                // Getting ID of panel that we want to open
                let panelId     = header.getAttribute('aria-controls'),
                    panelToOpen = document.getElementById(panelId);

                // Opening panel
                panelToOpen.classList.remove(this.settings.hidenClass);

                // Set aria attrs
                header.setAttribute('aria-expanded', true);
            }
        }
    }


    // @TODO - is this needed anymore?
    checkState(headerId) {
        let state = this.states[headerId].state;

        if(state === 'closed') {
            return state;
        } else if(state === 'open') {
            return state;
        }
    }


    /**
     *  GET STATE
     *
     *  Getting state of headers. By default gets state of all headers
     *  @param {array} headerIds - Id/'s of the headers you want to check
     */
    getState(headerIds = []) {
        if(headerIds.length && Array.isArray(headerIds)) {
            let states = headerIds.map( header => this.states[header] );

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
    toggleState(currentState) {
        if(currentState !== undefined) {
            return (currentState === 'closed') ? 'open' : 'closed';
        }
    }


    /**
     *  GET HEADER ID
     *
     *  Getting an ID for a header
     *  @param {array} header - Array of ID's for the headers to be open
     */
    getHeaderId(header) {
        if(header !== undefined) {
            return header.getAttribute(this.settings.headerDataAttr);
        }
    }


    /**
     *  HEADERS TO OPEN
     *
     *  Setting which headers should be open when accordion is initalised
     *  @param {array} headersToOpen - Array of ID's for the headers to be open
     */
    openHeaders(headersToOpen = []) {
        if (headersToOpen.length && Array.isArray(headersToOpen)) {
            let headers = headersToOpen.filter(header => header != undefined);

            headersToOpen.forEach(header => {
                return (this.states[header].state = 'open');
            });
        }
    }


    /**
     *  SET PANEL HEIGHT
     *
     *  Setting height for panels using pannels inner element
     */
    setPanelHeight() {
        // [].forEach.(this.panels, (panel) => {
        this.panels.forEach(panel => {
            const panelInner = panel.querySelector(this.settings.panelInner);

            let activeHeight = panelInner.offsetHeight;

            return panel.style.maxHeight = `${activeHeight}px`;
        });
    }


    setupHeaders() {
        this.headers.forEach( (header, index) => {
            header.setAttribute('id', `badger-accordion-header-${this.ids[index].id}`);
            header.setAttribute('aria-controls', `badger-accordion-panel-${this.ids[index].id}`);
        });
    }



    setupPanels() {
        this.panels.forEach( (panel, index) => {
            panel.setAttribute('id', `badger-accordion-panel-${this.ids[index].id}`);
            panel.setAttribute('aria-labeledby', `badger-accordion-header-${this.ids[index].id}`);
        });
    }


    setupAttributes() {
        // Adding ID & aria-controls
        this.setupHeaders();

        // Adding ID & aria-labeledby
        this.setupPanels();

        // Inserting data-attribute onto each `header`
        this.insertDataAttrs();
    }
}


// Export
/* harmony default export */ __webpack_exports__["default"] = (BadgerAccordion);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(2);
var bytesToUuid = __webpack_require__(4);

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
/* 2 */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 3 */
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
/* 4 */
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


/***/ })
/******/ ]);