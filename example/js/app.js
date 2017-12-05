(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var badgerAccordion = createCommonjsModule(function (module, exports) {
  !function (t, e) {
    module.exports = e();
  }(commonjsGlobal, function () {
    !function (t, e) {
      var n = (t.body || t.documentElement).style,
          i = "",
          s = "";"" == n.WebkitAnimation && (i = "-webkit-"), "" == n.MozAnimation && (i = "-moz-"), "" == n.OAnimation && (i = "-o-"), "" == n.WebkitTransition && (s = "-webkit-"), "" == n.MozTransition && (s = "-moz-"), "" == n.OTransition && (s = "-o-"), Object.prototype.onCSSAnimationEnd = function (t) {
        var e = function e(n) {
          t(), n.target.removeEventListener(n.type, e);
        };return this.addEventListener("webkitAnimationEnd", e), this.addEventListener("mozAnimationEnd", e), this.addEventListener("oAnimationEnd", e), this.addEventListener("oanimationend", e), this.addEventListener("animationend", e), ("" != i || "animation" in n) && "0s" != getComputedStyle(this)[i + "animation-duration"] || t(), this;
      }, Object.prototype.onCSSTransitionEnd = function (t) {
        var e = function e(n) {
          t(), n.target.removeEventListener(n.type, e);
        };return this.addEventListener("webkitTransitionEnd", e), this.addEventListener("mozTransitionEnd", e), this.addEventListener("oTransitionEnd", e), this.addEventListener("transitionend", e), this.addEventListener("transitionend", e), ("" != s || "transition" in n) && "0s" != getComputedStyle(this)[s + "transition-duration"] || t(), this;
      };
    }(document, window);var t = function () {
      function t(t, e) {
        for (var n = 0; n < e.length; n++) {
          var i = e[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
        }
      }return function (e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e;
      };
    }();return function () {
      function e(t, n) {
        !function (t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, e);var i = document.querySelector(t);if (null != i) {
          this.settings = Object.assign({}, { headerClass: ".js-badger-accordion-header", panelClass: ".js-badger-accordion-panel", panelInnerClass: ".js-badger-accordion-panel-inner", hidenClass: "is-hidden", initalisedClass: "badger-accordion--initalised", headerDataAttr: "data-badger-accordion-header-id", openMultiplePanels: !1, openHeadersOnLoad: [], headerOpenLabel: "Open accordion panel", headerCloseLabel: "Close accordion panel" }, n), this.container = i, this.headers = Array.from(this.container.querySelectorAll(this.settings.headerClass)), this.panels = Array.from(this.container.querySelectorAll(this.settings.panelClass)), this.toggleEl = void 0 !== this.settings.toggleEl ? Array.from(this.container.querySelectorAll(this.settings.toggleEl)) : this.headers, this.states = [].map.call(this.headers, function () {
            return { state: "closed" };
          }), this.ids = [].map.call(this.headers, function () {
            return { id: Math.floor(1e6 * Math.random() + 1) };
          }), this.toggling = !1, this.container ? this.init() : console.log("Something is wrong with you markup...");
        }
      }return t(e, [{ key: "init", value: function value() {
          this._setupAttributes(), this._initalState(), this._setPanelHeight(), this._insertDataAttrs(), this._addListeners(), this._finishInitalisation();
        } }, { key: "_initalState", value: function value() {
          var t = this.settings.openHeadersOnLoad;t.length && this._openHeadersOnLoad(t), this._renderDom();
        } }, { key: "_insertDataAttrs", value: function value() {
          var t = this;this.headers.forEach(function (e, n) {
            e.setAttribute(t.settings.headerDataAttr, n);
          });
        } }, { key: "_finishInitalisation", value: function value() {
          this.container.classList.add(this.settings.initalisedClass);
        } }, { key: "_addListeners", value: function value() {
          var t = this;this.headers.forEach(function (e, n) {
            e.addEventListener("click", function () {
              t.handleClick(e, n);
            });
          });
        } }, { key: "handleClick", value: function value(t, e) {
          var n = this.settings.headerClass.substr(1);t.classList.contains(n) && !1 === this.toggling && (this.toggling = !0, this.setState(e), this._renderDom());
        } }, { key: "setState", value: function value(t) {
          var e = this,
              n = this.getState();this.settings.openMultiplePanels || n.filter(function (e, n) {
            n != t && (e.state = "closed");
          }), n.filter(function (n, i) {
            if (i == t) {
              var s = e.toggleState(n.state);return n.state = s;
            }
          });
        } }, { key: "_renderDom", value: function value() {
          var t = this;this.states.filter(function (e, n) {
            "open" === e.state && t.open(n);
          }), this.states.filter(function (e, n) {
            "closed" === e.state && t.close(n);
          });
        } }, { key: "open", value: function value(t) {
          this.togglePanel("open", t);
        } }, { key: "close", value: function value(t) {
          this.togglePanel("closed", t);
        } }, { key: "openAll", value: function value() {
          var t = this;this.headers.forEach(function (e) {
            t.togglePanel("open", e);
          });
        } }, { key: "closeAll", value: function value() {
          var t = this;this.headers.forEach(function (e) {
            t.togglePanel("closed", e);
          });
        } }, { key: "togglePanel", value: function value(t, e) {
          var n = this;if (void 0 !== t && void 0 !== e) if ("closed" === t) {
            var i = this.headers[e],
                s = this.panels[e];s.classList.add(this.settings.hidenClass), i.setAttribute("aria-expanded", !1), i.setAttribute("aria-label", this.settings.headerOpenLabel), s.onCSSTransitionEnd(function () {
              return n.toggling = !1;
            });
          } else if ("open" === t) {
            var a = this.headers[e],
                r = this.panels[e];r.classList.remove(this.settings.hidenClass), a.setAttribute("aria-expanded", !0), a.setAttribute("aria-label", this.settings.headerCloseLabel), r.onCSSTransitionEnd(function () {
              return n.toggling = !1;
            });
          }
        } }, { key: "getState", value: function value() {
          var t = this,
              e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];if (e.length && Array.isArray(e)) {
            return e.map(function (e) {
              return t.states[e];
            });
          }return this.states;
        } }, { key: "toggleState", value: function value(t) {
          if (void 0 !== t) return "closed" === t ? "open" : "closed";
        } }, { key: "_openHeadersOnLoad", value: function value() {
          var t = this,
              e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];if (e.length && Array.isArray(e)) {
            e.filter(function (t) {
              return void 0 != t;
            }).forEach(function (e) {
              return t.states[e].state = "open";
            });
          }
        } }, { key: "_setPanelHeight", value: function value() {
          var t = this;this.panels.forEach(function (e) {
            var n = e.querySelector(t.settings.panelInnerClass).offsetHeight;return e.style.maxHeight = n + "px";
          });
        } }, { key: "_setupHeaders", value: function value() {
          var t = this;this.headers.forEach(function (e, n) {
            e.setAttribute("id", "badger-accordion-header-" + t.ids[n].id), e.setAttribute("aria-controls", "badger-accordion-panel-" + t.ids[n].id), e.setAttribute("aria-label", t.settings.headerOpenLabel);
          });
        } }, { key: "_setupPanels", value: function value() {
          var t = this;this.panels.forEach(function (e, n) {
            e.setAttribute("id", "badger-accordion-panel-" + t.ids[n].id), e.setAttribute("aria-labeledby", "badger-accordion-header-" + t.ids[n].id);
          });
        } }, { key: "_setupAttributes", value: function value() {
          this._setupHeaders(), this._setupPanels(), this._insertDataAttrs();
        } }]), e;
    }();
  });
});

// Importing accordion
// import pollyfill from 'dist/array-from-pollyfill';

// Creating a new instance of the accordion
var accordion = new badgerAccordion('.js-badger-accordion');

// API Examples
console.log(accordion.getState([0]));
// accordion.open( document.querySelector('[data-badger-accordion-header-id="1"]') );
// accordion.close( 0 );

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlcyI6WyJiZWhhdmlvdXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vLyBJbXBvcnRpbmcgYWNjb3JkaW9uXG4vLyBpbXBvcnQgcG9sbHlmaWxsIGZyb20gJ2Rpc3QvYXJyYXktZnJvbS1wb2xseWZpbGwnO1xuaW1wb3J0IEJhZGdlckFjY29yZGlvbiBmcm9tICdkaXN0L2JhZGdlci1hY2NvcmRpb24nO1xuXG4vLyBDcmVhdGluZyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgYWNjb3JkaW9uXG5jb25zdCBhY2NvcmRpb24gPSBuZXcgQmFkZ2VyQWNjb3JkaW9uKCcuanMtYmFkZ2VyLWFjY29yZGlvbicpO1xuXG4vLyBBUEkgRXhhbXBsZXNcbmNvbnNvbGUubG9nKGFjY29yZGlvbi5nZXRTdGF0ZSggWzBdICkpO1xuLy8gYWNjb3JkaW9uLm9wZW4oIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWJhZGdlci1hY2NvcmRpb24taGVhZGVyLWlkPVwiMVwiXScpICk7XG4vLyBhY2NvcmRpb24uY2xvc2UoIDAgKTtcbiJdLCJuYW1lcyI6WyJhY2NvcmRpb24iLCJCYWRnZXJBY2NvcmRpb24iLCJjb25zb2xlIiwibG9nIiwiZ2V0U3RhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7O0FBRUEsQUFFQTtBQUNBLElBQU1BLFlBQVksSUFBSUMsZUFBSixDQUFvQixzQkFBcEIsQ0FBbEI7OztBQUdBQyxRQUFRQyxHQUFSLENBQVlILFVBQVVJLFFBQVYsQ0FBb0IsQ0FBQyxDQUFELENBQXBCLENBQVo7Ozs7OzsifQ==
