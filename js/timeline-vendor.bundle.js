! function (t, e, i) {
  var s = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame || function (e) {
      t.setTimeout(e, 1e3 / 60)
    },
    o = function () {
      var s = {},
        o = e.createElement("div").style,
        n = function () {
          for (var t = ["t", "webkitT", "MozT", "msT", "OT"], e = 0, i = t.length; e < i; e++)
            if (t[e] + "ransform" in o) return t[e].substr(0, t[e].length - 1);
          return !1
        }();

      function r(t) {
        return !1 !== n && ("" === n ? t : n + t.charAt(0).toUpperCase() + t.substr(1))
      }
      s.getTime = Date.now || function () {
        return (new Date).getTime()
      }, s.extend = function (t, e) {
        for (var i in e) t[i] = e[i]
      }, s.addEvent = function (t, e, i, s) {
        t.addEventListener(e, i, !!s)
      }, s.removeEvent = function (t, e, i, s) {
        t.removeEventListener(e, i, !!s)
      }, s.prefixPointerEvent = function (e) {
        return t.MSPointerEvent ? "MSPointer" + e.charAt(7).toUpperCase() + e.substr(8) : e
      }, s.momentum = function (t, e, s, o, n, r) {
        var a, l, h = t - e,
          c = i.abs(h) / s;
        return l = c / (r = void 0 === r ? 6e-4 : r), (a = t + c * c / (2 * r) * (h < 0 ? -1 : 1)) < o ? (a = n ? o - n / 2.5 * (c / 8) : o, l = (h = i.abs(a - t)) / c) : a > 0 && (a = n ? n / 2.5 * (c / 8) : 0, l = (h = i.abs(t) + a) / c), {
          destination: i.round(a),
          duration: l
        }
      };
      var a = r("transform");
      return s.extend(s, {
        hasTransform: !1 !== a,
        hasPerspective: r("perspective") in o,
        hasTouch: "ontouchstart" in t,
        hasPointer: !(!t.PointerEvent && !t.MSPointerEvent),
        hasTransition: r("transition") in o
      }), s.isBadAndroid = function () {
        var e = t.navigator.appVersion;
        if (/Android/.test(e) && !/Chrome\/\d/.test(e)) {
          var i = e.match(/Safari\/(\d+.\d)/);
          return !(i && "object" == typeof i && i.length >= 2) || parseFloat(i[1]) < 535.19
        }
        return !1
      }(), s.extend(s.style = {}, {
        transform: a,
        transitionTimingFunction: r("transitionTimingFunction"),
        transitionDuration: r("transitionDuration"),
        transitionDelay: r("transitionDelay"),
        transformOrigin: r("transformOrigin")
      }), s.hasClass = function (t, e) {
        return new RegExp("(^|\\s)" + e + "(\\s|$)").test(t.className)
      }, s.addClass = function (t, e) {
        if (!s.hasClass(t, e)) {
          var i = t.className.split(" ");
          i.push(e), t.className = i.join(" ")
        }
      }, s.removeClass = function (t, e) {
        if (s.hasClass(t, e)) {
          var i = new RegExp("(^|\\s)" + e + "(\\s|$)", "g");
          t.className = t.className.replace(i, " ")
        }
      }, s.offset = function (t) {
        for (var e = -t.offsetLeft, i = -t.offsetTop; t = t.offsetParent;) e -= t.offsetLeft, i -= t.offsetTop;
        return {
          left: e,
          top: i
        }
      }, s.preventDefaultException = function (t, e) {
        for (var i in e)
          if (e[i].test(t[i])) return !0;
        return !1
      }, s.extend(s.eventType = {}, {
        touchstart: 1,
        touchmove: 1,
        touchend: 1,
        mousedown: 2,
        mousemove: 2,
        mouseup: 2,
        pointerdown: 3,
        pointermove: 3,
        pointerup: 3,
        MSPointerDown: 3,
        MSPointerMove: 3,
        MSPointerUp: 3
      }), s.extend(s.ease = {}, {
        quadratic: {
          style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          fn: function (t) {
            return t * (2 - t)
          }
        },
        circular: {
          style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
          fn: function (t) {
            return i.sqrt(1 - --t * t)
          }
        },
        back: {
          style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          fn: function (t) {
            return (t -= 1) * t * (5 * t + 4) + 1
          }
        },
        bounce: {
          style: "",
          fn: function (t) {
            return (t /= 1) < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
          }
        },
        elastic: {
          style: "",
          fn: function (t) {
            return 0 === t ? 0 : 1 == t ? 1 : .4 * i.pow(2, -10 * t) * i.sin((t - .055) * (2 * i.PI) / .22) + 1
          }
        }
      }), s.tap = function (t, i) {
        var s = e.createEvent("Event");
        s.initEvent(i, !0, !0), s.pageX = t.pageX, s.pageY = t.pageY, t.target.dispatchEvent(s)
      }, s.click = function (i) {
        var s, o = i.target;
        /(SELECT|INPUT|TEXTAREA)/i.test(o.tagName) || ((s = e.createEvent(t.MouseEvent ? "MouseEvents" : "Event")).initEvent("click", !0, !0), s.view = i.view || t, s.detail = 1, s.screenX = o.screenX || 0, s.screenY = o.screenY || 0, s.clientX = o.clientX || 0, s.clientY = o.clientY || 0, s.ctrlKey = !!i.ctrlKey, s.altKey = !!i.altKey, s.shiftKey = !!i.shiftKey, s.metaKey = !!i.metaKey, s.button = 0, s.relatedTarget = null, s._constructed = !0, o.dispatchEvent(s))
      }, s
    }();

  function n(i, s) {
    for (var n in this.wrapper = "string" == typeof i ? e.querySelector(i) : i, this.scroller = this.wrapper.children[0], this.scrollerStyle = this.scroller.style, this.options = {
        resizeScrollbars: !0,
        mouseWheelSpeed: 20,
        snapThreshold: .334,
        disablePointer: !o.hasPointer,
        disableTouch: o.hasPointer || !o.hasTouch,
        disableMouse: o.hasPointer || o.hasTouch,
        startX: 0,
        startY: 0,
        scrollY: !0,
        directionLockThreshold: 5,
        momentum: !0,
        bounce: !0,
        bounceTime: 600,
        bounceEasing: "",
        preventDefault: !0,
        preventDefaultException: {
          tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|LABEL)$/
        },
        HWCompositing: !0,
        useTransition: !0,
        useTransform: !0,
        bindToWrapper: void 0 === t.onmousedown
      }, s) this.options[n] = s[n];
    this.translateZ = this.options.HWCompositing && o.hasPerspective ? " translateZ(0)" : "", this.options.useTransition = o.hasTransition && this.options.useTransition, this.options.useTransform = o.hasTransform && this.options.useTransform, this.options.eventPassthrough = !0 === this.options.eventPassthrough ? "vertical" : this.options.eventPassthrough, this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault, this.options.scrollY = "vertical" != this.options.eventPassthrough && this.options.scrollY, this.options.scrollX = "horizontal" != this.options.eventPassthrough && this.options.scrollX, this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough, this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold, this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? o.ease[this.options.bounceEasing] || o.ease.circular : this.options.bounceEasing, this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling, !0 === this.options.tap && (this.options.tap = "tap"), this.options.useTransition || this.options.useTransform || /relative|absolute/i.test(this.scrollerStyle.position) || (this.scrollerStyle.position = "relative"), "scale" == this.options.shrinkScrollbars && (this.options.useTransition = !1), this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1, this.x = 0, this.y = 0, this.directionX = 0, this.directionY = 0, this._events = {}, this._init(), this.refresh(), this.scrollTo(this.options.startX, this.options.startY), this.enable()
  }

  function r(t, i, s) {
    var o = e.createElement("div"),
      n = e.createElement("div");
    return !0 === s && (o.style.cssText = "position:absolute;z-index:9999", n.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"), n.className = "iScrollIndicator", "h" == t ? (!0 === s && (o.style.cssText += ";height:7px;left:2px;right:2px;bottom:0", n.style.height = "100%"), o.className = "iScrollHorizontalScrollbar") : (!0 === s && (o.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px", n.style.width = "100%"), o.className = "iScrollVerticalScrollbar"), o.style.cssText += ";overflow:hidden", i || (o.style.pointerEvents = "none"), o.appendChild(n), o
  }

  function a(i, n) {
    for (var r in this.wrapper = "string" == typeof n.el ? e.querySelector(n.el) : n.el, this.wrapperStyle = this.wrapper.style, this.indicator = this.wrapper.children[0], this.indicatorStyle = this.indicator.style, this.scroller = i, this.options = {
        listenX: !0,
        listenY: !0,
        interactive: !1,
        resize: !0,
        defaultScrollbars: !1,
        shrink: !1,
        fade: !1,
        speedRatioX: 0,
        speedRatioY: 0
      }, n) this.options[r] = n[r];
    if (this.sizeRatioX = 1, this.sizeRatioY = 1, this.maxPosX = 0, this.maxPosY = 0, this.options.interactive && (this.options.disableTouch || (o.addEvent(this.indicator, "touchstart", this), o.addEvent(t, "touchend", this)), this.options.disablePointer || (o.addEvent(this.indicator, o.prefixPointerEvent("pointerdown"), this), o.addEvent(t, o.prefixPointerEvent("pointerup"), this)), this.options.disableMouse || (o.addEvent(this.indicator, "mousedown", this), o.addEvent(t, "mouseup", this))), this.options.fade) {
      this.wrapperStyle[o.style.transform] = this.scroller.translateZ;
      var a = o.style.transitionDuration;
      if (!a) return;
      this.wrapperStyle[a] = o.isBadAndroid ? "0.0001ms" : "0ms";
      var l = this;
      o.isBadAndroid && s(function () {
        "0.0001ms" === l.wrapperStyle[a] && (l.wrapperStyle[a] = "0s")
      }), this.wrapperStyle.opacity = "0"
    }
  }
  n.prototype = {
    version: "5.2.0",
    _init: function () {
      this._initEvents(), (this.options.scrollbars || this.options.indicators) && this._initIndicators(), this.options.mouseWheel && this._initWheel(), this.options.snap && this._initSnap(), this.options.keyBindings && this._initKeys()
    },
    destroy: function () {
      this._initEvents(!0), clearTimeout(this.resizeTimeout), this.resizeTimeout = null, this._execEvent("destroy")
    },
    _transitionEnd: function (t) {
      t.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, this._execEvent("scrollEnd")))
    },
    _start: function (t) {
      if (1 != o.eventType[t.type] && 0 !== (t.which ? t.button : t.button < 2 ? 0 : 4 == t.button ? 1 : 2)) return;
      if (this.enabled && (!this.initiated || o.eventType[t.type] === this.initiated)) {
        !this.options.preventDefault || o.isBadAndroid || o.preventDefaultException(t.target, this.options.preventDefaultException) || t.preventDefault();
        var e, s = t.touches ? t.touches[0] : t;
        this.initiated = o.eventType[t.type], this.moved = !1, this.distX = 0, this.distY = 0, this.directionX = 0, this.directionY = 0, this.directionLocked = 0, this.startTime = o.getTime(), this.options.useTransition && this.isInTransition ? (this._transitionTime(), this.isInTransition = !1, e = this.getComputedPosition(), this._translate(i.round(e.x), i.round(e.y)), this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this._execEvent("scrollEnd")), this.startX = this.x, this.startY = this.y, this.absStartX = this.x, this.absStartY = this.y, this.pointX = s.pageX, this.pointY = s.pageY, this._execEvent("beforeScrollStart")
      }
    },
    _move: function (t) {
      if (this.enabled && o.eventType[t.type] === this.initiated) {
        this.options.preventDefault && t.preventDefault();
        var e, s, n, r, a = t.touches ? t.touches[0] : t,
          l = a.pageX - this.pointX,
          h = a.pageY - this.pointY,
          c = o.getTime();
        if (this.pointX = a.pageX, this.pointY = a.pageY, this.distX += l, this.distY += h, n = i.abs(this.distX), r = i.abs(this.distY), !(c - this.endTime > 300 && n < 10 && r < 10)) {
          if (this.directionLocked || this.options.freeScroll || (n > r + this.options.directionLockThreshold ? this.directionLocked = "h" : r >= n + this.options.directionLockThreshold ? this.directionLocked = "v" : this.directionLocked = "n"), "h" == this.directionLocked) {
            if ("vertical" == this.options.eventPassthrough) t.preventDefault();
            else if ("horizontal" == this.options.eventPassthrough) return void(this.initiated = !1);
            h = 0
          } else if ("v" == this.directionLocked) {
            if ("horizontal" == this.options.eventPassthrough) t.preventDefault();
            else if ("vertical" == this.options.eventPassthrough) return void(this.initiated = !1);
            l = 0
          }
          l = this.hasHorizontalScroll ? l : 0, h = this.hasVerticalScroll ? h : 0, e = this.x + l, s = this.y + h, (e > 0 || e < this.maxScrollX) && (e = this.options.bounce ? this.x + l / 3 : e > 0 ? 0 : this.maxScrollX), (s > 0 || s < this.maxScrollY) && (s = this.options.bounce ? this.y + h / 3 : s > 0 ? 0 : this.maxScrollY), this.directionX = l > 0 ? -1 : l < 0 ? 1 : 0, this.directionY = h > 0 ? -1 : h < 0 ? 1 : 0, this.moved || this._execEvent("scrollStart"), this.moved = !0, this._translate(e, s), c - this.startTime > 300 && (this.startTime = c, this.startX = this.x, this.startY = this.y)
        }
      }
    },
    _end: function (t) {
      if (this.enabled && o.eventType[t.type] === this.initiated) {
        this.options.preventDefault && !o.preventDefaultException(t.target, this.options.preventDefaultException) && t.preventDefault();
        t.changedTouches && t.changedTouches[0];
        var e, s, n = o.getTime() - this.startTime,
          r = i.round(this.x),
          a = i.round(this.y),
          l = i.abs(r - this.startX),
          h = i.abs(a - this.startY),
          c = 0,
          d = "";
        if (this.isInTransition = 0, this.initiated = 0, this.endTime = o.getTime(), !this.resetPosition(this.options.bounceTime)) {
          if (this.scrollTo(r, a), !this.moved) return this.options.tap && o.tap(t, this.options.tap), this.options.click && o.click(t), void this._execEvent("scrollCancel");
          if (this._events.flick && n < 200 && l < 100 && h < 100) this._execEvent("flick");
          else {
            if (this.options.momentum && n < 300 && (e = this.hasHorizontalScroll ? o.momentum(this.x, this.startX, n, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
                destination: r,
                duration: 0
              }, s = this.hasVerticalScroll ? o.momentum(this.y, this.startY, n, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
                destination: a,
                duration: 0
              }, r = e.destination, a = s.destination, c = i.max(e.duration, s.duration), this.isInTransition = 1), this.options.snap) {
              var p = this._nearestSnap(r, a);
              this.currentPage = p, c = this.options.snapSpeed || i.max(i.max(i.min(i.abs(r - p.x), 1e3), i.min(i.abs(a - p.y), 1e3)), 300), r = p.x, a = p.y, this.directionX = 0, this.directionY = 0, d = this.options.bounceEasing
            }
            if (r != this.x || a != this.y) return (r > 0 || r < this.maxScrollX || a > 0 || a < this.maxScrollY) && (d = o.ease.quadratic), void this.scrollTo(r, a, c, d);
            this._execEvent("scrollEnd")
          }
        }
      }
    },
    _resize: function () {
      var t = this;
      clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function () {
        t.refresh()
      }, this.options.resizePolling)
    },
    resetPosition: function (t) {
      var e = this.x,
        i = this.y;
      return t = t || 0, !this.hasHorizontalScroll || this.x > 0 ? e = 0 : this.x < this.maxScrollX && (e = this.maxScrollX), !this.hasVerticalScroll || this.y > 0 ? i = 0 : this.y < this.maxScrollY && (i = this.maxScrollY), (e != this.x || i != this.y) && (this.scrollTo(e, i, t, this.options.bounceEasing), !0)
    },
    disable: function () {
      this.enabled = !1
    },
    enable: function () {
      this.enabled = !0
    },
    refresh: function () {
      this.wrapper.offsetHeight;
      this.wrapperWidth = this.wrapper.clientWidth, this.wrapperHeight = this.wrapper.clientHeight, this.scrollerWidth = this.scroller.offsetWidth, this.scrollerHeight = this.scroller.offsetHeight, this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.maxScrollY = this.wrapperHeight - this.scrollerHeight, this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0, this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.endTime = 0, this.directionX = 0, this.directionY = 0, this.wrapperOffset = o.offset(this.wrapper), this._execEvent("refresh"), this.resetPosition()
    },
    on: function (t, e) {
      this._events[t] || (this._events[t] = []), this._events[t].push(e)
    },
    off: function (t, e) {
      if (this._events[t]) {
        var i = this._events[t].indexOf(e);
        i > -1 && this._events[t].splice(i, 1)
      }
    },
    _execEvent: function (t) {
      if (this._events[t]) {
        var e = 0,
          i = this._events[t].length;
        if (i)
          for (; e < i; e++) this._events[t][e].apply(this, [].slice.call(arguments, 1))
      }
    },
    scrollBy: function (t, e, i, s) {
      t = this.x + t, e = this.y + e, i = i || 0, this.scrollTo(t, e, i, s)
    },
    scrollTo: function (t, e, i, s) {
      s = s || o.ease.circular, this.isInTransition = this.options.useTransition && i > 0;
      var n = this.options.useTransition && s.style;
      !i || n ? (n && (this._transitionTimingFunction(s.style), this._transitionTime(i)), this._translate(t, e)) : this._animate(t, e, i, s.fn)
    },
    scrollToElement: function (t, e, s, n, r) {
      if (t = t.nodeType ? t : this.scroller.querySelector(t)) {
        var a = o.offset(t);
        a.left -= this.wrapperOffset.left, a.top -= this.wrapperOffset.top, !0 === s && (s = i.round(t.offsetWidth / 2 - this.wrapper.offsetWidth / 2)), !0 === n && (n = i.round(t.offsetHeight / 2 - this.wrapper.offsetHeight / 2)), a.left -= s || 0, a.top -= n || 0, a.left = a.left > 0 ? 0 : a.left < this.maxScrollX ? this.maxScrollX : a.left, a.top = a.top > 0 ? 0 : a.top < this.maxScrollY ? this.maxScrollY : a.top, e = void 0 === e || null === e || "auto" === e ? i.max(i.abs(this.x - a.left), i.abs(this.y - a.top)) : e, this.scrollTo(a.left, a.top, e, r)
      }
    },
    _transitionTime: function (t) {
      if (this.options.useTransition) {
        t = t || 0;
        var e = o.style.transitionDuration;
        if (e) {
          if (this.scrollerStyle[e] = t + "ms", !t && o.isBadAndroid) {
            this.scrollerStyle[e] = "0.0001ms";
            var i = this;
            s(function () {
              "0.0001ms" === i.scrollerStyle[e] && (i.scrollerStyle[e] = "0s")
            })
          }
          if (this.indicators)
            for (var n = this.indicators.length; n--;) this.indicators[n].transitionTime(t)
        }
      }
    },
    _transitionTimingFunction: function (t) {
      if (this.scrollerStyle[o.style.transitionTimingFunction] = t, this.indicators)
        for (var e = this.indicators.length; e--;) this.indicators[e].transitionTimingFunction(t)
    },
    _translate: function (t, e) {
      if (this.options.useTransform ? this.scrollerStyle[o.style.transform] = "translate(" + t + "px," + e + "px)" + this.translateZ : (t = i.round(t), e = i.round(e), this.scrollerStyle.left = t + "px", this.scrollerStyle.top = e + "px"), this.x = t, this.y = e, this.indicators)
        for (var s = this.indicators.length; s--;) this.indicators[s].updatePosition()
    },
    _initEvents: function (e) {
      var i = e ? o.removeEvent : o.addEvent,
        s = this.options.bindToWrapper ? this.wrapper : t;
      i(t, "orientationchange", this), i(t, "resize", this), this.options.click && i(this.wrapper, "click", this, !0), this.options.disableMouse || (i(this.wrapper, "mousedown", this), i(s, "mousemove", this), i(s, "mousecancel", this), i(s, "mouseup", this)), o.hasPointer && !this.options.disablePointer && (i(this.wrapper, o.prefixPointerEvent("pointerdown"), this), i(s, o.prefixPointerEvent("pointermove"), this), i(s, o.prefixPointerEvent("pointercancel"), this), i(s, o.prefixPointerEvent("pointerup"), this)), o.hasTouch && !this.options.disableTouch && (i(this.wrapper, "touchstart", this), i(s, "touchmove", this), i(s, "touchcancel", this), i(s, "touchend", this)), i(this.scroller, "transitionend", this), i(this.scroller, "webkitTransitionEnd", this), i(this.scroller, "oTransitionEnd", this), i(this.scroller, "MSTransitionEnd", this)
    },
    getComputedPosition: function () {
      var e, i, s = t.getComputedStyle(this.scroller, null);
      return this.options.useTransform ? (e = +((s = s[o.style.transform].split(")")[0].split(", "))[12] || s[4]), i = +(s[13] || s[5])) : (e = +s.left.replace(/[^-\d.]/g, ""), i = +s.top.replace(/[^-\d.]/g, "")), {
        x: e,
        y: i
      }
    },
    _initIndicators: function () {
      var t, e = this.options.interactiveScrollbars,
        i = "string" != typeof this.options.scrollbars,
        s = [],
        o = this;
      this.indicators = [], this.options.scrollbars && (this.options.scrollY && (t = {
        el: r("v", e, this.options.scrollbars),
        interactive: e,
        defaultScrollbars: !0,
        customStyle: i,
        resize: this.options.resizeScrollbars,
        shrink: this.options.shrinkScrollbars,
        fade: this.options.fadeScrollbars,
        listenX: !1
      }, this.wrapper.appendChild(t.el), s.push(t)), this.options.scrollX && (t = {
        el: r("h", e, this.options.scrollbars),
        interactive: e,
        defaultScrollbars: !0,
        customStyle: i,
        resize: this.options.resizeScrollbars,
        shrink: this.options.shrinkScrollbars,
        fade: this.options.fadeScrollbars,
        listenY: !1
      }, this.wrapper.appendChild(t.el), s.push(t))), this.options.indicators && (s = s.concat(this.options.indicators));
      for (var n = s.length; n--;) this.indicators.push(new a(this, s[n]));

      function l(t) {
        if (o.indicators)
          for (var e = o.indicators.length; e--;) t.call(o.indicators[e])
      }
      this.options.fadeScrollbars && (this.on("scrollEnd", function () {
        l(function () {
          this.fade()
        })
      }), this.on("scrollCancel", function () {
        l(function () {
          this.fade()
        })
      }), this.on("scrollStart", function () {
        l(function () {
          this.fade(1)
        })
      }), this.on("beforeScrollStart", function () {
        l(function () {
          this.fade(1, !0)
        })
      })), this.on("refresh", function () {
        l(function () {
          this.refresh()
        })
      }), this.on("destroy", function () {
        l(function () {
          this.destroy()
        }), delete this.indicators
      })
    },
    _initWheel: function () {
      o.addEvent(this.wrapper, "wheel", this), o.addEvent(this.wrapper, "mousewheel", this), o.addEvent(this.wrapper, "DOMMouseScroll", this), this.on("destroy", function () {
        clearTimeout(this.wheelTimeout), this.wheelTimeout = null, o.removeEvent(this.wrapper, "wheel", this), o.removeEvent(this.wrapper, "mousewheel", this), o.removeEvent(this.wrapper, "DOMMouseScroll", this)
      })
    },
    _wheel: function (t) {
      if (this.enabled) {
        var e, s, o, n, r = this;
        if (void 0 === this.wheelTimeout && r._execEvent("scrollStart"), clearTimeout(this.wheelTimeout), this.wheelTimeout = setTimeout(function () {
            r.options.snap || r._execEvent("scrollEnd"), r.wheelTimeout = void 0
          }, 400), "deltaX" in t) 1 === t.deltaMode ? (e = -t.deltaX * this.options.mouseWheelSpeed, s = -t.deltaY * this.options.mouseWheelSpeed) : (e = -t.deltaX, s = -t.deltaY);
        else if ("wheelDeltaX" in t) e = t.wheelDeltaX / 120 * this.options.mouseWheelSpeed, s = t.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
        else if ("wheelDelta" in t) e = s = t.wheelDelta / 120 * this.options.mouseWheelSpeed;
        else {
          if (!("detail" in t)) return;
          e = s = -t.detail / 3 * this.options.mouseWheelSpeed
        }
        if (e *= this.options.invertWheelDirection, s *= this.options.invertWheelDirection, this.hasVerticalScroll || (e = s, s = 0), this.options.snap) return o = this.currentPage.pageX, n = this.currentPage.pageY, e > 0 ? o-- : e < 0 && o++, s > 0 ? n-- : s < 0 && n++, void this.goToPage(o, n);
        o = this.x + i.round(this.hasHorizontalScroll ? e : 0), n = this.y + i.round(this.hasVerticalScroll ? s : 0), this.directionX = e > 0 ? -1 : e < 0 ? 1 : 0, this.directionY = s > 0 ? -1 : s < 0 ? 1 : 0, o > 0 ? o = 0 : o < this.maxScrollX && (o = this.maxScrollX), n > 0 ? n = 0 : n < this.maxScrollY && (n = this.maxScrollY), this.scrollTo(o, n, 0)
      }
    },
    _initSnap: function () {
      this.currentPage = {}, "string" == typeof this.options.snap && (this.options.snap = this.scroller.querySelectorAll(this.options.snap)), this.on("refresh", function () {
        var t, e, s, o, n, r, a = 0,
          l = 0,
          h = 0,
          c = this.options.snapStepX || this.wrapperWidth,
          d = this.options.snapStepY || this.wrapperHeight;
        if (this.pages = [], this.wrapperWidth && this.wrapperHeight && this.scrollerWidth && this.scrollerHeight) {
          if (!0 === this.options.snap)
            for (s = i.round(c / 2), o = i.round(d / 2); h > -this.scrollerWidth;) {
              for (this.pages[a] = [], t = 0, n = 0; n > -this.scrollerHeight;) this.pages[a][t] = {
                x: i.max(h, this.maxScrollX),
                y: i.max(n, this.maxScrollY),
                width: c,
                height: d,
                cx: h - s,
                cy: n - o
              }, n -= d, t++;
              h -= c, a++
            } else
              for (t = (r = this.options.snap).length, e = -1; a < t; a++)(0 === a || r[a].offsetLeft <= r[a - 1].offsetLeft) && (l = 0, e++), this.pages[l] || (this.pages[l] = []), h = i.max(-r[a].offsetLeft, this.maxScrollX), n = i.max(-r[a].offsetTop, this.maxScrollY), s = h - i.round(r[a].offsetWidth / 2), o = n - i.round(r[a].offsetHeight / 2), this.pages[l][e] = {
                x: h,
                y: n,
                width: r[a].offsetWidth,
                height: r[a].offsetHeight,
                cx: s,
                cy: o
              }, h > this.maxScrollX && l++;
          this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0), this.options.snapThreshold % 1 == 0 ? (this.snapThresholdX = this.options.snapThreshold, this.snapThresholdY = this.options.snapThreshold) : (this.snapThresholdX = i.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold), this.snapThresholdY = i.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold))
        }
      }), this.on("flick", function () {
        var t = this.options.snapSpeed || i.max(i.max(i.min(i.abs(this.x - this.startX), 1e3), i.min(i.abs(this.y - this.startY), 1e3)), 300);
        this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, t)
      })
    },
    _nearestSnap: function (t, e) {
      if (!this.pages.length) return {
        x: 0,
        y: 0,
        pageX: 0,
        pageY: 0
      };
      var s = 0,
        o = this.pages.length,
        n = 0;
      if (i.abs(t - this.absStartX) < this.snapThresholdX && i.abs(e - this.absStartY) < this.snapThresholdY) return this.currentPage;
      for (t > 0 ? t = 0 : t < this.maxScrollX && (t = this.maxScrollX), e > 0 ? e = 0 : e < this.maxScrollY && (e = this.maxScrollY); s < o; s++)
        if (t >= this.pages[s][0].cx) {
          t = this.pages[s][0].x;
          break
        } for (o = this.pages[s].length; n < o; n++)
        if (e >= this.pages[0][n].cy) {
          e = this.pages[0][n].y;
          break
        } return s == this.currentPage.pageX && ((s += this.directionX) < 0 ? s = 0 : s >= this.pages.length && (s = this.pages.length - 1), t = this.pages[s][0].x), n == this.currentPage.pageY && ((n += this.directionY) < 0 ? n = 0 : n >= this.pages[0].length && (n = this.pages[0].length - 1), e = this.pages[0][n].y), {
        x: t,
        y: e,
        pageX: s,
        pageY: n
      }
    },
    goToPage: function (t, e, s, o) {
      o = o || this.options.bounceEasing, t >= this.pages.length ? t = this.pages.length - 1 : t < 0 && (t = 0), e >= this.pages[t].length ? e = this.pages[t].length - 1 : e < 0 && (e = 0);
      var n = this.pages[t][e].x,
        r = this.pages[t][e].y;
      s = void 0 === s ? this.options.snapSpeed || i.max(i.max(i.min(i.abs(n - this.x), 1e3), i.min(i.abs(r - this.y), 1e3)), 300) : s, this.currentPage = {
        x: n,
        y: r,
        pageX: t,
        pageY: e
      }, this.scrollTo(n, r, s, o)
    },
    next: function (t, e) {
      var i = this.currentPage.pageX,
        s = this.currentPage.pageY;
      ++i >= this.pages.length && this.hasVerticalScroll && (i = 0, s++), this.goToPage(i, s, t, e)
    },
    prev: function (t, e) {
      var i = this.currentPage.pageX,
        s = this.currentPage.pageY;
      --i < 0 && this.hasVerticalScroll && (i = 0, s--), this.goToPage(i, s, t, e)
    },
    _initKeys: function (e) {
      var i, s = {
        pageUp: 33,
        pageDown: 34,
        end: 35,
        home: 36,
        left: 37,
        up: 38,
        right: 39,
        down: 40
      };
      if ("object" == typeof this.options.keyBindings)
        for (i in this.options.keyBindings) "string" == typeof this.options.keyBindings[i] && (this.options.keyBindings[i] = this.options.keyBindings[i].toUpperCase().charCodeAt(0));
      else this.options.keyBindings = {};
      for (i in s) this.options.keyBindings[i] = this.options.keyBindings[i] || s[i];
      o.addEvent(t, "keydown", this), this.on("destroy", function () {
        o.removeEvent(t, "keydown", this)
      })
    },
    _key: function (t) {
      if (this.enabled) {
        var e, s = this.options.snap,
          n = s ? this.currentPage.pageX : this.x,
          r = s ? this.currentPage.pageY : this.y,
          a = o.getTime(),
          l = this.keyTime || 0;
        switch (this.options.useTransition && this.isInTransition && (e = this.getComputedPosition(), this._translate(i.round(e.x), i.round(e.y)), this.isInTransition = !1), this.keyAcceleration = a - l < 200 ? i.min(this.keyAcceleration + .25, 50) : 0, t.keyCode) {
          case this.options.keyBindings.pageUp:
            this.hasHorizontalScroll && !this.hasVerticalScroll ? n += s ? 1 : this.wrapperWidth : r += s ? 1 : this.wrapperHeight;
            break;
          case this.options.keyBindings.pageDown:
            this.hasHorizontalScroll && !this.hasVerticalScroll ? n -= s ? 1 : this.wrapperWidth : r -= s ? 1 : this.wrapperHeight;
            break;
          case this.options.keyBindings.end:
            n = s ? this.pages.length - 1 : this.maxScrollX, r = s ? this.pages[0].length - 1 : this.maxScrollY;
            break;
          case this.options.keyBindings.home:
            n = 0, r = 0;
            break;
          case this.options.keyBindings.left:
            n += s ? -1 : 5 + this.keyAcceleration >> 0;
            break;
          case this.options.keyBindings.up:
            r += s ? 1 : 5 + this.keyAcceleration >> 0;
            break;
          case this.options.keyBindings.right:
            n -= s ? -1 : 5 + this.keyAcceleration >> 0;
            break;
          case this.options.keyBindings.down:
            r -= s ? 1 : 5 + this.keyAcceleration >> 0;
            break;
          default:
            return
        }
        s ? this.goToPage(n, r) : (n > 0 ? (n = 0, this.keyAcceleration = 0) : n < this.maxScrollX && (n = this.maxScrollX, this.keyAcceleration = 0), r > 0 ? (r = 0, this.keyAcceleration = 0) : r < this.maxScrollY && (r = this.maxScrollY, this.keyAcceleration = 0), this.scrollTo(n, r, 0), this.keyTime = a)
      }
    },
    _animate: function (t, e, i, n) {
      var r = this,
        a = this.x,
        l = this.y,
        h = o.getTime(),
        c = h + i;
      this.isAnimating = !0,
        function d() {
          var p, u, f, v = o.getTime();
          if (v >= c) return r.isAnimating = !1, r._translate(t, e), void(r.resetPosition(r.options.bounceTime) || r._execEvent("scrollEnd"));
          f = n(v = (v - h) / i), p = (t - a) * f + a, u = (e - l) * f + l, r._translate(p, u), r.isAnimating && s(d)
        }()
    },
    handleEvent: function (t) {
      switch (t.type) {
        case "touchstart":
        case "pointerdown":
        case "MSPointerDown":
        case "mousedown":
          this._start(t);
          break;
        case "touchmove":
        case "pointermove":
        case "MSPointerMove":
        case "mousemove":
          this._move(t);
          break;
        case "touchend":
        case "pointerup":
        case "MSPointerUp":
        case "mouseup":
        case "touchcancel":
        case "pointercancel":
        case "MSPointerCancel":
        case "mousecancel":
          this._end(t);
          break;
        case "orientationchange":
        case "resize":
          this._resize();
          break;
        case "transitionend":
        case "webkitTransitionEnd":
        case "oTransitionEnd":
        case "MSTransitionEnd":
          this._transitionEnd(t);
          break;
        case "wheel":
        case "DOMMouseScroll":
        case "mousewheel":
          this._wheel(t);
          break;
        case "keydown":
          this._key(t);
          break;
        case "click":
          this.enabled && !t._constructed && (t.preventDefault(), t.stopPropagation())
      }
    }
  }, a.prototype = {
    handleEvent: function (t) {
      switch (t.type) {
        case "touchstart":
        case "pointerdown":
        case "MSPointerDown":
        case "mousedown":
          this._start(t);
          break;
        case "touchmove":
        case "pointermove":
        case "MSPointerMove":
        case "mousemove":
          this._move(t);
          break;
        case "touchend":
        case "pointerup":
        case "MSPointerUp":
        case "mouseup":
        case "touchcancel":
        case "pointercancel":
        case "MSPointerCancel":
        case "mousecancel":
          this._end(t)
      }
    },
    destroy: function () {
      this.options.fadeScrollbars && (clearTimeout(this.fadeTimeout), this.fadeTimeout = null), this.options.interactive && (o.removeEvent(this.indicator, "touchstart", this), o.removeEvent(this.indicator, o.prefixPointerEvent("pointerdown"), this), o.removeEvent(this.indicator, "mousedown", this), o.removeEvent(t, "touchmove", this), o.removeEvent(t, o.prefixPointerEvent("pointermove"), this), o.removeEvent(t, "mousemove", this), o.removeEvent(t, "touchend", this), o.removeEvent(t, o.prefixPointerEvent("pointerup"), this), o.removeEvent(t, "mouseup", this)), this.options.defaultScrollbars && this.wrapper.parentNode.removeChild(this.wrapper)
    },
    _start: function (e) {
      var i = e.touches ? e.touches[0] : e;
      e.preventDefault(), e.stopPropagation(), this.transitionTime(), this.initiated = !0, this.moved = !1, this.lastPointX = i.pageX, this.lastPointY = i.pageY, this.startTime = o.getTime(), this.options.disableTouch || o.addEvent(t, "touchmove", this), this.options.disablePointer || o.addEvent(t, o.prefixPointerEvent("pointermove"), this), this.options.disableMouse || o.addEvent(t, "mousemove", this), this.scroller._execEvent("beforeScrollStart")
    },
    _move: function (t) {
      var e, i, s, n, r = t.touches ? t.touches[0] : t;
      o.getTime();
      this.moved || this.scroller._execEvent("scrollStart"), this.moved = !0, e = r.pageX - this.lastPointX, this.lastPointX = r.pageX, i = r.pageY - this.lastPointY, this.lastPointY = r.pageY, s = this.x + e, n = this.y + i, this._pos(s, n), t.preventDefault(), t.stopPropagation()
    },
    _end: function (e) {
      if (this.initiated) {
        if (this.initiated = !1, e.preventDefault(), e.stopPropagation(), o.removeEvent(t, "touchmove", this), o.removeEvent(t, o.prefixPointerEvent("pointermove"), this), o.removeEvent(t, "mousemove", this), this.scroller.options.snap) {
          var s = this.scroller._nearestSnap(this.scroller.x, this.scroller.y),
            n = this.options.snapSpeed || i.max(i.max(i.min(i.abs(this.scroller.x - s.x), 1e3), i.min(i.abs(this.scroller.y - s.y), 1e3)), 300);
          this.scroller.x == s.x && this.scroller.y == s.y || (this.scroller.directionX = 0, this.scroller.directionY = 0, this.scroller.currentPage = s, this.scroller.scrollTo(s.x, s.y, n, this.scroller.options.bounceEasing))
        }
        this.moved && this.scroller._execEvent("scrollEnd")
      }
    },
    transitionTime: function (t) {
      t = t || 0;
      var e = o.style.transitionDuration;
      if (e && (this.indicatorStyle[e] = t + "ms", !t && o.isBadAndroid)) {
        this.indicatorStyle[e] = "0.0001ms";
        var i = this;
        s(function () {
          "0.0001ms" === i.indicatorStyle[e] && (i.indicatorStyle[e] = "0s")
        })
      }
    },
    transitionTimingFunction: function (t) {
      this.indicatorStyle[o.style.transitionTimingFunction] = t
    },
    refresh: function () {
      this.transitionTime(), this.options.listenX && !this.options.listenY ? this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? "block" : "none" : this.options.listenY && !this.options.listenX ? this.indicatorStyle.display = this.scroller.hasVerticalScroll ? "block" : "none" : this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none", this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ? (o.addClass(this.wrapper, "iScrollBothScrollbars"), o.removeClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "8px" : this.wrapper.style.bottom = "8px")) : (o.removeClass(this.wrapper, "iScrollBothScrollbars"), o.addClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "2px" : this.wrapper.style.bottom = "2px"));
      this.wrapper.offsetHeight;
      this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth, this.options.resize ? (this.indicatorWidth = i.max(i.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px") : this.indicatorWidth = this.indicator.clientWidth, this.maxPosX = this.wrapperWidth - this.indicatorWidth, "clip" == this.options.shrink ? (this.minBoundaryX = 8 - this.indicatorWidth, this.maxBoundaryX = this.wrapperWidth - 8) : (this.minBoundaryX = 0, this.maxBoundaryX = this.maxPosX), this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX), this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight, this.options.resize ? (this.indicatorHeight = i.max(i.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px") : this.indicatorHeight = this.indicator.clientHeight, this.maxPosY = this.wrapperHeight - this.indicatorHeight, "clip" == this.options.shrink ? (this.minBoundaryY = 8 - this.indicatorHeight, this.maxBoundaryY = this.wrapperHeight - 8) : (this.minBoundaryY = 0, this.maxBoundaryY = this.maxPosY), this.maxPosY = this.wrapperHeight - this.indicatorHeight, this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY), this.updatePosition()
    },
    updatePosition: function () {
      var t = this.options.listenX && i.round(this.sizeRatioX * this.scroller.x) || 0,
        e = this.options.listenY && i.round(this.sizeRatioY * this.scroller.y) || 0;
      this.options.ignoreBoundaries || (t < this.minBoundaryX ? ("scale" == this.options.shrink && (this.width = i.max(this.indicatorWidth + t, 8), this.indicatorStyle.width = this.width + "px"), t = this.minBoundaryX) : t > this.maxBoundaryX ? "scale" == this.options.shrink ? (this.width = i.max(this.indicatorWidth - (t - this.maxPosX), 8), this.indicatorStyle.width = this.width + "px", t = this.maxPosX + this.indicatorWidth - this.width) : t = this.maxBoundaryX : "scale" == this.options.shrink && this.width != this.indicatorWidth && (this.width = this.indicatorWidth, this.indicatorStyle.width = this.width + "px"), e < this.minBoundaryY ? ("scale" == this.options.shrink && (this.height = i.max(this.indicatorHeight + 3 * e, 8), this.indicatorStyle.height = this.height + "px"), e = this.minBoundaryY) : e > this.maxBoundaryY ? "scale" == this.options.shrink ? (this.height = i.max(this.indicatorHeight - 3 * (e - this.maxPosY), 8), this.indicatorStyle.height = this.height + "px", e = this.maxPosY + this.indicatorHeight - this.height) : e = this.maxBoundaryY : "scale" == this.options.shrink && this.height != this.indicatorHeight && (this.height = this.indicatorHeight, this.indicatorStyle.height = this.height + "px")), this.x = t, this.y = e, this.scroller.options.useTransform ? this.indicatorStyle[o.style.transform] = "translate(" + t + "px," + e + "px)" + this.scroller.translateZ : (this.indicatorStyle.left = t + "px", this.indicatorStyle.top = e + "px")
    },
    _pos: function (t, e) {
      t < 0 ? t = 0 : t > this.maxPosX && (t = this.maxPosX), e < 0 ? e = 0 : e > this.maxPosY && (e = this.maxPosY), t = this.options.listenX ? i.round(t / this.sizeRatioX) : this.scroller.x, e = this.options.listenY ? i.round(e / this.sizeRatioY) : this.scroller.y, this.scroller.scrollTo(t, e)
    },
    fade: function (t, e) {
      if (!e || this.visible) {
        clearTimeout(this.fadeTimeout), this.fadeTimeout = null;
        var i = t ? 250 : 500,
          s = t ? 0 : 300;
        t = t ? "1" : "0", this.wrapperStyle[o.style.transitionDuration] = i + "ms", this.fadeTimeout = setTimeout(function (t) {
          this.wrapperStyle.opacity = t, this.visible = +t
        }.bind(this, t), s)
      }
    }
  }, n.utils = o, "undefined" != typeof module && module.exports ? module.exports = n : "function" == typeof define && define.amd ? define(function () {
    return n
  }) : t.IScroll = n
}(window, document, Math),
function (t, e, i) {
  i.fn.fp_scrolloverflow = function () {
    var s = ".fp-section",
      o = s + ".active",
      n = ".fp-slide",
      r = n + ".active",
      a = ".fp-tableCell",
      l = "fp-responsive",
      h = "fp-auto-height-responsive";

    function c(t) {
      var e = t.closest(s);
      return e.length ? parseInt(e.css("padding-bottom")) + parseInt(e.css("padding-top")) : 0
    }

    function d() {
      var o = this;

      function r() {
        var t;
        i("body").hasClass(l) ? (t = o.options.scrollOverflowHandler, p(function (e) {
          e.closest(s).hasClass(h) && t.remove(e)
        })) : p(d)
      }

      function d(e) {
        if (!e.hasClass("fp-noscroll")) {
          e.css("overflow", "hidden");
          var n, r = o.options.scrollOverflowHandler,
            l = r.wrapContent(),
            h = e.closest(s),
            d = r.scrollable(e),
            p = c(h);
          d.length ? n = r.scrollHeight(e) : (n = e.get(0).scrollHeight - p, o.options.verticalCentered && (n = e.find(a).get(0).scrollHeight - p));
          var u = i(t).height() - p;
          n > u ? d.length ? r.update(e, u) : (o.options.verticalCentered ? e.find(a).wrapInner(l) : e.wrapInner(l), r.create(e, u, o.iscrollOptions)) : r.remove(e), e.css("overflow", "")
        }
      }

      function p(t) {
        i(s).each(function () {
          var e = i(this).find(n);
          e.length ? e.each(function () {
            t(i(this))
          }) : t(i(this))
        })
      }
      o.options = null, o.init = function (s, n) {
        return o.options = s, o.iscrollOptions = n, "complete" === e.readyState && (r(), i.fn.fullpage.shared.afterRenderActions()), i(t).on("load", function () {
          r(), i.fn.fullpage.shared.afterRenderActions()
        }), o
      }, o.createScrollBarForAll = r
    }
    IScroll.prototype.wheelOn = function () {
      this.wrapper.addEventListener("wheel", this), this.wrapper.addEventListener("mousewheel", this), this.wrapper.addEventListener("DOMMouseScroll", this)
    }, IScroll.prototype.wheelOff = function () {
      this.wrapper.removeEventListener("wheel", this), this.wrapper.removeEventListener("mousewheel", this), this.wrapper.removeEventListener("DOMMouseScroll", this)
    };
    var p = {
      refreshId: null,
      iScrollInstances: [],
      iscrollOptions: {
        scrollbars: !0,
        mouseWheel: !0,
        hideScrollbars: !1,
        fadeScrollbars: !1,
        disableMouse: !0,
        interactiveScrollbars: !0
      },
      init: function (e) {
        var s = "ontouchstart" in t || navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints;
        return p.iscrollOptions.click = s, p.iscrollOptions = i.extend(p.iscrollOptions, e.scrollOverflowOptions), (new d).init(e, p.iscrollOptions)
      },
      toggleWheel: function (t) {
        i(o).find(".fp-scrollable").each(function () {
          var e = i(this).data("iscrollInstance");
          void 0 !== e && e && (t ? e.wheelOn() : e.wheelOff())
        })
      },
      onLeave: function () {
        p.toggleWheel(!1)
      },
      beforeLeave: function () {
        p.onLeave()
      },
      afterLoad: function () {
        p.toggleWheel(!0)
      },
      create: function (t, e, o) {
        var n = t.find(".fp-scrollable");
        n.height(e), n.each(function () {
          var e = i(this),
            n = e.data("iscrollInstance");
          n && i.each(p.iScrollInstances, function () {
            i(this).destroy()
          }), n = new IScroll(e.get(0), o), p.iScrollInstances.push(n), t.closest(s).hasClass("active") || n.wheelOff(), e.data("iscrollInstance", n)
        })
      },
      isScrolled: function (t, e) {
        var i = e.data("iscrollInstance");
        return !i || ("top" === t ? i.y >= 0 && !e.scrollTop() : "bottom" === t ? 0 - i.y + e.scrollTop() + 1 + e.innerHeight() >= e[0].scrollHeight : void 0)
      },
      scrollable: function (t) {
        return t.find(".fp-slides").length ? t.find(r).find(".fp-scrollable") : t.find(".fp-scrollable")
      },
      scrollHeight: function (t) {
        return t.find(".fp-scrollable").children().first().get(0).scrollHeight
      },
      remove: function (t) {
        var e = t.find(".fp-scrollable");
        if (e.length) {
          var i = e.data("iscrollInstance");
          i && i.destroy(), e.data("iscrollInstance", null)
        }
        t.find(".fp-scrollable").children().first().children().first().unwrap().unwrap()
      },
      update: function (t, e) {
        clearTimeout(p.refreshId), p.refreshId = setTimeout(function () {
          i.each(p.iScrollInstances, function () {
            i(this).get(0).refresh(), i.fn.fullpage.silentMoveTo(i(o).index() + 1)
          })
        }, 150), t.find(".fp-scrollable").css("height", e + "px").parent().css("height", e + c(t) + "px")
      },
      wrapContent: function () {
        return '<div class="fp-scrollable"><div class="fp-scroller"></div></div>'
      }
    };
    return {
      iscrollHandler: p
    }
  }()
}(window, document, jQuery),
function (t, e) {
  "use strict";
  "function" == typeof define && define.amd ? define(["jquery"], function (i) {
    return e(i, t, t.document, t.Math)
  }) : "object" == typeof exports && exports ? module.exports = e(require("jquery"), t, t.document, t.Math) : e(jQuery, t, t.document, t.Math)
}("undefined" != typeof window ? window : this, function (t, e, i, s, o) {
  "use strict";
  var n = "fullpage-wrapper",
    r = "." + n,
    a = "fp-responsive",
    l = "fp-notransition",
    h = "fp-destroyed",
    c = "fp-enabled",
    d = "fp-viewing",
    p = "active",
    u = "." + p,
    f = "fp-completely",
    v = "." + f,
    m = "fp-section",
    g = "." + m,
    S = g + u,
    y = g + ":first",
    x = g + ":last",
    w = "fp-tableCell",
    b = "." + w,
    T = "fp-auto-height",
    E = "fp-normal-scroll",
    k = "fp-nav",
    P = "#" + k,
    X = "fp-tooltip",
    Y = "." + X,
    C = "fp-show-active",
    H = "fp-slide",
    z = "." + H,
    _ = z + u,
    A = "fp-slides",
    B = "." + A,
    L = "fp-slidesContainer",
    M = "." + L,
    I = "fp-table",
    D = "fp-slidesNav",
    O = "." + D,
    W = O + " a",
    R = ".fp-controlArrow",
    F = "fp-prev",
    V = "fp-controlArrow " + F,
    q = R + ("." + F),
    N = "fp-controlArrow fp-next",
    U = R + ".fp-next",
    j = t(e),
    K = t(i);
  t.fn.fullpage = function (Z) {
    if (t("html").hasClass(c)) Ge();
    else {
      var $ = t("html, body"),
        Q = t("body"),
        G = t.fn.fullpage;
      Z = t.extend({
        menu: !1,
        anchors: [],
        lockAnchors: !1,
        navigation: !1,
        navigationPosition: "right",
        navigationTooltips: [],
        showActiveTooltip: !1,
        slidesNavigation: !1,
        slidesNavPosition: "bottom",
        scrollBar: !1,
        hybrid: !1,
        css3: !0,
        scrollingSpeed: 700,
        autoScrolling: !0,
        fitToSection: !0,
        fitToSectionDelay: 1e3,
        easing: "easeInOutCubic",
        easingcss3: "ease",
        loopBottom: !1,
        loopTop: !1,
        loopHorizontal: !0,
        continuousVertical: !1,
        continuousHorizontal: !1,
        scrollHorizontally: !1,
        interlockedSlides: !1,
        dragAndMove: !1,
        offsetSections: !1,
        resetSliders: !1,
        fadingEffect: !1,
        normalScrollElements: null,
        scrollOverflow: !1,
        scrollOverflowReset: !1,
        scrollOverflowHandler: t.fn.fp_scrolloverflow ? t.fn.fp_scrolloverflow.iscrollHandler : null,
        scrollOverflowOptions: null,
        touchSensitivity: 5,
        normalScrollElementTouchThreshold: 5,
        bigSectionsDestination: null,
        keyboardScrolling: !0,
        animateAnchor: !0,
        recordHistory: !0,
        controlArrows: !0,
        controlArrowColor: "#fff",
        verticalCentered: !0,
        sectionsColor: [],
        paddingTop: 0,
        paddingBottom: 0,
        fixedElements: null,
        responsive: 0,
        responsiveWidth: 0,
        responsiveHeight: 0,
        responsiveSlides: !1,
        parallax: !1,
        parallaxOptions: {
          type: "reveal",
          percentage: 62,
          property: "translate"
        },
        sectionSelector: ".section",
        slideSelector: ".slide",
        afterLoad: null,
        onLeave: null,
        afterRender: null,
        afterResize: null,
        afterReBuild: null,
        afterSlideLoad: null,
        onSlideLeave: null,
        afterResponsive: null,
        lazyLoading: !0
      }, Z);
      var J, tt, et, it, st = !1,
        ot = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/),
        nt = "ontouchstart" in e || navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints,
        rt = t(this),
        at = j.height(),
        lt = !1,
        ht = !0,
        ct = !0,
        dt = [],
        pt = {
          m: {
            up: !0,
            down: !0,
            left: !0,
            right: !0
          }
        };
      pt.k = t.extend(!0, {}, pt.m);
      var ut, ft, vt, mt, gt, St, yt, xt = function () {
          var t;
          t = e.PointerEvent ? {
            down: "pointerdown",
            move: "pointermove"
          } : {
            down: "MSPointerDown",
            move: "MSPointerMove"
          };
          return t
        }(),
        wt = {
          touchmove: "ontouchmove" in e ? "touchmove" : xt.move,
          touchstart: "ontouchstart" in e ? "touchstart" : xt.down
        },
        bt = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]',
        Tt = t.extend(!0, {}, Z);
      Ge(), t.extend(t.easing, {
        easeInOutCubic: function (t, e, i, s, o) {
          return (e /= o / 2) < 1 ? s / 2 * e * e * e + i : s / 2 * ((e -= 2) * e * e + 2) + i
        }
      }), t(this).length && (G.version = "2.9.6", G.setAutoScrolling = Bt, G.setRecordHistory = Lt, G.setScrollingSpeed = Mt, G.setFitToSection = It, G.setLockAnchors = function (t) {
        Z.lockAnchors = t
      }, G.setMouseWheelScrolling = Dt, G.setAllowScrolling = Ot, G.setKeyboardScrolling = Wt, G.moveSectionUp = Rt, G.moveSectionDown = Ft, G.silentMoveTo = Vt, G.moveTo = qt, G.moveSlideRight = Nt, G.moveSlideLeft = Ut, G.fitToSection = Qt, G.reBuild = jt, G.setResponsive = Kt, G.destroy = function (e) {
        Bt(!1, "internal"), Ot(!1), Wt(!1), rt.addClass(h), clearTimeout(mt), clearTimeout(vt), clearTimeout(ft), clearTimeout(gt), clearTimeout(St), j.off("scroll", $t).off("hashchange", me).off("resize", He), K.off("keydown", Se).off("keyup", xe).off("click touchstart", P + " a").off("mouseenter", P + " li").off("mouseleave", P + " li").off("click touchstart", W).off("mouseover", Z.normalScrollElements).off("mouseout", Z.normalScrollElements), t(g).off("click touchstart", R), clearTimeout(mt), clearTimeout(vt), e && function () {
          Ke(0), rt.find("img[data-src], source[data-src], audio[data-src], iframe[data-src]").each(function () {
            he(t(this), "src")
          }), rt.find("img[data-srcset]").each(function () {
            he(t(this), "srcset")
          }), t(P + ", " + O + ", " + R).remove(), t(g).css({
            height: "",
            "background-color": "",
            padding: ""
          }), t(z).css({
            width: ""
          }), rt.css({
            height: "",
            position: "",
            "-ms-touch-action": "",
            "touch-action": ""
          }), $.css({
            overflow: "",
            height: ""
          }), t("html").removeClass(c), Q.removeClass(a), t.each(Q.get(0).className.split(/\s+/), function (t, e) {
            0 === e.indexOf(d) && Q.removeClass(e)
          }), t(g + ", " + z).each(function () {
            Z.scrollOverflowHandler && Z.scrollOverflowHandler.remove(t(this)), t(this).removeClass(I + " " + p), t(this).attr("style", t(this).data("fp-styles"))
          }), Ae(rt), rt.find(b + ", " + M + ", " + B).each(function () {
            t(this).replaceWith(this.childNodes)
          }), rt.css({
            "-webkit-transition": "none",
            transition: "none"
          }), $.scrollTop(0);
          var e = [m, H, L];
          t.each(e, function (e, i) {
            t("." + i).removeClass(i)
          })
        }()
      }, G.shared = {
        afterRenderActions: Zt
      }, function () {
        Z.css3 && (Z.css3 = function () {
          var t, s = i.createElement("p"),
            n = {
              webkitTransform: "-webkit-transform",
              OTransform: "-o-transform",
              msTransform: "-ms-transform",
              MozTransform: "-moz-transform",
              transform: "transform"
            };
          for (var r in i.body.insertBefore(s, null), n) s.style[r] !== o && (s.style[r] = "translate3d(1px,1px,1px)", t = e.getComputedStyle(s).getPropertyValue(n[r]));
          return i.body.removeChild(s), t !== o && t.length > 0 && "none" !== t
        }());
        Z.scrollBar = Z.scrollBar || Z.hybrid, s = rt.find(Z.sectionSelector), Z.anchors.length || (Z.anchors = s.filter("[data-anchor]").map(function () {
          return t(this).data("anchor").toString()
        }).get()), Z.navigationTooltips.length || (Z.navigationTooltips = s.filter("[data-tooltip]").map(function () {
          return t(this).data("tooltip").toString()
        }).get()), rt.css({
          height: "100%",
          position: "relative"
        }), rt.addClass(n), t("html").addClass(c), at = j.height(), rt.removeClass(h), rt.find(Z.sectionSelector).addClass(m), rt.find(Z.slideSelector).addClass(H), t(g).each(function (e) {
          var i = t(this),
            s = i.find(z),
            o = s.length;
          i.data("fp-styles", i.attr("style")),
            function (e, i) {
              i || 0 !== t(S).length || e.addClass(p), it = t(S), e.css("height", at + "px"), Z.paddingTop && e.css("padding-top", Z.paddingTop), Z.paddingBottom && e.css("padding-bottom", Z.paddingBottom), void 0 !== Z.sectionsColor[i] && e.css("background-color", Z.sectionsColor[i]), void 0 !== Z.anchors[i] && e.attr("data-anchor", Z.anchors[i])
            }(i, e),
            function (e, i) {
              void 0 !== Z.anchors[i] && e.hasClass(p) && Be(Z.anchors[i], i), Z.menu && Z.css3 && t(Z.menu).closest(r).length && t(Z.menu).appendTo(Q)
            }(i, e), o > 0 ? function (e, i, s) {
              var o = 100 * s,
                n = 100 / s;
              i.wrapAll('<div class="' + L + '" />'), i.parent().wrap('<div class="' + A + '" />'), e.find(M).css("width", o + "%"), s > 1 && (Z.controlArrows && function (t) {
                t.find(B).after('<div class="' + V + '"></div><div class="' + N + '"></div>'), "#fff" != Z.controlArrowColor && (t.find(U).css("border-color", "transparent transparent transparent " + Z.controlArrowColor), t.find(q).css("border-color", "transparent " + Z.controlArrowColor + " transparent transparent")), Z.loopHorizontal || t.find(q).hide()
              }(e), Z.slidesNavigation && function (t, e) {
                t.append('<div class="' + D + '"><ul></ul></div>');
                var i = t.find(O);
                i.addClass(Z.slidesNavPosition);
                for (var s = 0; s < e; s++) i.find("ul").append('<li><a href="#"><span></span></a></li>');
                i.css("margin-left", "-" + i.width() / 2 + "px"), i.find("li").first().find("a").addClass(p)
              }(e, s)), i.each(function (e) {
                t(this).css("width", n + "%"), Z.verticalCentered && Me(t(this))
              });
              var r = e.find(_);
              r.length && (0 !== t(S).index(g) || 0 === t(S).index(g) && 0 !== r.index()) ? je(r, "internal") : i.eq(0).addClass(p)
            }(i, s, o) : Z.verticalCentered && Me(i)
        }), Z.fixedElements && Z.css3 && t(Z.fixedElements).appendTo(Q), Z.navigation && function () {
          Q.append('<div id="' + k + '"><ul></ul></div>');
          var e = t(P);
          e.addClass(function () {
            return Z.showActiveTooltip ? C + " " + Z.navigationPosition : Z.navigationPosition
          });
          for (var i = 0; i < t(g).length; i++) {
            var s = "";
            Z.anchors.length && (s = Z.anchors[i]);
            var o = '<li><a href="#' + s + '"><span></span></a>',
              n = Z.navigationTooltips[i];
            void 0 !== n && "" !== n && (o += '<div class="' + X + " " + Z.navigationPosition + '">' + n + "</div>"), o += "</li>", e.find("ul").append(o)
          }
          t(P).css("margin-top", "-" + t(P).height() / 2 + "px"), t(P).find("li").eq(t(S).index(g)).find("a").addClass(p)
        }(), rt.find('iframe[src*="youtube.com/embed/"]').each(function () {
          var e, i, s;
          e = t(this), i = "enablejsapi=1", s = e.attr("src"), e.attr("src", s + (/\?/.test(s) ? "&" : "?") + i)
        }), Z.scrollOverflow ? ut = Z.scrollOverflowHandler.init(Z) : Zt(), Ot(!0), Bt(Z.autoScrolling, "internal"), ze(), Ne(), "complete" === i.readyState && ve();
        var s;
        j.on("load", ve)
      }(), j.on("scroll", $t).on("hashchange", me).blur(Ee).resize(He), K.keydown(Se).keyup(xe).on("click touchstart", P + " a", ke).on("click touchstart", W, Pe).on("click", Y, ye), t(g).on("click touchstart", R, Te), Z.normalScrollElements && (K.on("mouseenter touchstart", Z.normalScrollElements, function () {
        Ot(!1)
      }), K.on("mouseleave touchend", Z.normalScrollElements, function () {
        Ot(!0)
      })));
      var Et = !1,
        kt = 0,
        Pt = 0,
        Xt = 0,
        Yt = 0,
        Ct = 0,
        Ht = (new Date).getTime(),
        zt = 0,
        _t = 0,
        At = at
    }

    function Bt(e, i) {
      e || Ke(0), Qe("autoScrolling", e, i);
      var s = t(S);
      Z.autoScrolling && !Z.scrollBar ? ($.css({
        overflow: "hidden",
        height: "100%"
      }), Lt(Tt.recordHistory, "internal"), rt.css({
        "-ms-touch-action": "none",
        "touch-action": "none"
      }), s.length && Ke(s.position().top)) : ($.css({
        overflow: "visible",
        height: "initial"
      }), Lt(!1, "internal"), rt.css({
        "-ms-touch-action": "",
        "touch-action": ""
      }), s.length && $.scrollTop(s.position().top))
    }

    function Lt(t, e) {
      Qe("recordHistory", t, e)
    }

    function Mt(t, e) {
      Qe("scrollingSpeed", t, e)
    }

    function It(t, e) {
      Qe("fitToSection", t, e)
    }

    function Dt(t) {
      t ? (! function () {
        var t, s = "";
        e.addEventListener ? t = "addEventListener" : (t = "attachEvent", s = "on");
        var n = "onwheel" in i.createElement("div") ? "wheel" : i.onmousewheel !== o ? "mousewheel" : "DOMMouseScroll";
        "DOMMouseScroll" == n ? i[t](s + "MozMousePixelScroll", oe, !1) : i[t](s + n, oe, !1)
      }(), rt.on("mousedown", we).on("mouseup", be)) : (i.addEventListener ? (i.removeEventListener("mousewheel", oe, !1), i.removeEventListener("wheel", oe, !1), i.removeEventListener("MozMousePixelScroll", oe, !1)) : i.detachEvent("onmousewheel", oe), rt.off("mousedown", we).off("mouseup", be))
    }

    function Ot(e, i) {
      void 0 !== i ? (i = i.replace(/ /g, "").split(","), t.each(i, function (t, i) {
        $e(e, i, "m")
      })) : ($e(e, "all", "m"), e ? (Dt(!0), (ot || nt) && (Z.autoScrolling && Q.off(wt.touchmove).on(wt.touchmove, Jt), t(r).off(wt.touchstart).on(wt.touchstart, ie).off(wt.touchmove).on(wt.touchmove, te))) : (Dt(!1), (ot || nt) && (Z.autoScrolling && Q.off(wt.touchmove), t(r).off(wt.touchstart).off(wt.touchmove))))
    }

    function Wt(e, i) {
      void 0 !== i ? (i = i.replace(/ /g, "").split(","), t.each(i, function (t, i) {
        $e(e, i, "k")
      })) : ($e(e, "all", "k"), Z.keyboardScrolling = e)
    }

    function Rt() {
      var e = t(S).prev(g);
      e.length || !Z.loopTop && !Z.continuousVertical || (e = t(g).last()), e.length && ae(e, null, !0)
    }

    function Ft() {
      var e = t(S).next(g);
      e.length || !Z.loopBottom && !Z.continuousVertical || (e = t(g).first()), e.length && ae(e, null, !1)
    }

    function Vt(t, e) {
      Mt(0, "internal"), qt(t, e), Mt(Tt.scrollingSpeed, "internal")
    }

    function qt(t, e) {
      var i = Oe(t);
      void 0 !== e ? We(t, e) : i.length > 0 && ae(i)
    }

    function Nt(t) {
      ne("right", t)
    }

    function Ut(t) {
      ne("left", t)
    }

    function jt(e) {
      if (!rt.hasClass(h)) {
        lt = !0, at = j.height(), t(g).each(function () {
          var e = t(this).find(B),
            i = t(this).find(z);
          Z.verticalCentered && t(this).find(b).css("height", Ie(t(this)) + "px"), t(this).css("height", at + "px"), i.length > 1 && Ye(e, e.find(_))
        }), Z.scrollOverflow && ut.createScrollBarForAll();
        var i = t(S).index(g);
        i && Vt(i + 1), lt = !1, t.isFunction(Z.afterResize) && e && Z.afterResize.call(rt), t.isFunction(Z.afterReBuild) && !e && Z.afterReBuild.call(rt)
      }
    }

    function Kt(e) {
      var i = Q.hasClass(a);
      e ? i || (Bt(!1, "internal"), It(!1, "internal"), t(P).hide(), Q.addClass(a), t.isFunction(Z.afterResponsive) && Z.afterResponsive.call(rt, e)) : i && (Bt(Tt.autoScrolling, "internal"), It(Tt.autoScrolling, "internal"), t(P).show(), Q.removeClass(a), t.isFunction(Z.afterResponsive) && Z.afterResponsive.call(rt, e))
    }

    function Zt() {
      var e, i = t(S);
      i.addClass(f), ce(i), de(i), Z.scrollOverflow && Z.scrollOverflowHandler.afterLoad(), (!(e = Oe(ge().section)) || e.length && e.index() === it.index()) && t.isFunction(Z.afterLoad) && Z.afterLoad.call(i, i.data("anchor"), i.index(g) + 1), t.isFunction(Z.afterRender) && Z.afterRender.call(rt)
    }

    function $t() {
      var e;
      if (!Z.autoScrolling || Z.scrollBar) {
        var s = j.scrollTop(),
          o = function (t) {
            var e = t > kt ? "down" : "up";
            return kt = t, zt = t, e
          }(s),
          n = 0,
          r = s + j.height() / 2,
          a = Q.height() - j.height() === s,
          l = i.querySelectorAll(g);
        if (a) n = l.length - 1;
        else if (s)
          for (var h = 0; h < l.length; ++h) {
            l[h].offsetTop <= r && (n = h)
          } else n = 0;
        if (function (e) {
            var i = t(S).position().top,
              s = i + j.height();
            if ("up" == e) return s >= j.scrollTop() + j.height();
            return i <= j.scrollTop()
          }(o) && (t(S).hasClass(f) || t(S).addClass(f).siblings().removeClass(f)), !(e = t(l).eq(n)).hasClass(p)) {
          Et = !0;
          var c, d, u = t(S),
            v = u.index(g) + 1,
            m = Le(e),
            y = e.data("anchor"),
            x = e.index(g) + 1,
            w = e.find(_);
          w.length && (d = w.data("anchor"), c = w.index()), ct && (e.addClass(p).siblings().removeClass(p), t.isFunction(Z.onLeave) && Z.onLeave.call(u, v, x, m), t.isFunction(Z.afterLoad) && Z.afterLoad.call(e, y, x), ue(u), ce(e), de(e), Be(y, x - 1), Z.anchors.length && (J = y), Fe(c, d, y, x)), clearTimeout(gt), gt = setTimeout(function () {
            Et = !1
          }, 100)
        }
        Z.fitToSection && (clearTimeout(St), St = setTimeout(function () {
          Z.fitToSection && t(S).outerHeight() <= at && Qt()
        }, Z.fitToSectionDelay))
      }
    }

    function Qt() {
      ct && (lt = !0, ae(t(S)), lt = !1)
    }

    function Gt(e) {
      if (pt.m[e]) {
        var i = "down" === e ? Ft : Rt;
        if (Z.scrollOverflow) {
          var s = Z.scrollOverflowHandler.scrollable(t(S)),
            o = "down" === e ? "bottom" : "top";
          if (s.length > 0) {
            if (!Z.scrollOverflowHandler.isScrolled(o, s)) return !0;
            i()
          } else i()
        } else i()
      }
    }

    function Jt(t) {
      var e = t.originalEvent;
      Z.autoScrolling && ee(e) && t.preventDefault()
    }

    function te(e) {
      var i = e.originalEvent,
        o = t(i.target).closest(g);
      if (ee(i)) {
        Z.autoScrolling && e.preventDefault();
        var n = Ue(i);
        Yt = n.y, Ct = n.x, o.find(B).length && s.abs(Xt - Ct) > s.abs(Pt - Yt) ? !st && s.abs(Xt - Ct) > j.outerWidth() / 100 * Z.touchSensitivity && (Xt > Ct ? pt.m.right && Nt(o) : pt.m.left && Ut(o)) : Z.autoScrolling && ct && s.abs(Pt - Yt) > j.height() / 100 * Z.touchSensitivity && (Pt > Yt ? Gt("down") : Yt > Pt && Gt("up"))
      }
    }

    function ee(t) {
      return void 0 === t.pointerType || "mouse" != t.pointerType
    }

    function ie(t) {
      var e = t.originalEvent;
      if (Z.fitToSection && $.stop(), ee(e)) {
        var i = Ue(e);
        Pt = i.y, Xt = i.x
      }
    }

    function se(t, e) {
      for (var i = 0, o = t.slice(s.max(t.length - e, 1)), n = 0; n < o.length; n++) i += o[n];
      return s.ceil(i / e)
    }

    function oe(i) {
      var o = (new Date).getTime(),
        n = t(v).hasClass(E);
      if (Z.autoScrolling && !et && !n) {
        var r = (i = i || e.event).wheelDelta || -i.deltaY || -i.detail,
          a = s.max(-1, s.min(1, r)),
          l = void 0 !== i.wheelDeltaX || void 0 !== i.deltaX,
          h = s.abs(i.wheelDeltaX) < s.abs(i.wheelDelta) || s.abs(i.deltaX) < s.abs(i.deltaY) || !l;
        dt.length > 149 && dt.shift(), dt.push(s.abs(r)), Z.scrollBar && (i.preventDefault ? i.preventDefault() : i.returnValue = !1);
        var c = o - Ht;
        if (Ht = o, c > 200 && (dt = []), ct) se(dt, 10) >= se(dt, 70) && h && Gt(a < 0 ? "down" : "up");
        return !1
      }
      Z.fitToSection && $.stop()
    }

    function ne(e, i) {
      var s = (void 0 === i ? t(S) : i).find(B),
        o = s.find(z).length;
      if (!(!s.length || st || o < 2)) {
        var n = s.find(_),
          r = null;
        if (!(r = "left" === e ? n.prev(z) : n.next(z)).length) {
          if (!Z.loopHorizontal) return;
          r = "left" === e ? n.siblings(":last") : n.siblings(":first")
        }
        st = !0, Ye(s, r, e)
      }
    }

    function re() {
      t(_).each(function () {
        je(t(this), "internal")
      })
    }

    function ae(e, i, o) {
      if (void 0 !== e) {
        var n, a, l = {
          element: e,
          callback: i,
          isMovementUp: o,
          dtop: function (t) {
            var e = t.position(),
              i = e.top,
              s = e.top > zt,
              o = i - at + t.outerHeight(),
              n = Z.bigSectionsDestination;
            return t.outerHeight() > at ? (s || n) && "bottom" !== n || (i = o) : (s || lt && t.is(":last-child")) && (i = o), zt = i, i
          }(e),
          yMovement: Le(e),
          anchorLink: e.data("anchor"),
          sectionIndex: e.index(g),
          activeSlide: e.find(_),
          activeSection: t(S),
          leavingSection: t(S).index(g) + 1,
          localIsResizing: lt
        };
        if (!(l.activeSection.is(e) && !lt || Z.scrollBar && j.scrollTop() === l.dtop && !e.hasClass(T))) {
          if (l.activeSlide.length && (n = l.activeSlide.data("anchor"), a = l.activeSlide.index()), t.isFunction(Z.onLeave) && !l.localIsResizing) {
            var h = l.yMovement;
            if (void 0 !== o && (h = o ? "up" : "down"), !1 === Z.onLeave.call(l.activeSection, l.leavingSection, l.sectionIndex + 1, h)) return
          }
          Z.autoScrolling && Z.continuousVertical && void 0 !== l.isMovementUp && (!l.isMovementUp && "up" == l.yMovement || l.isMovementUp && "down" == l.yMovement) && (l = function (e) {
              e.isMovementUp ? t(S).before(e.activeSection.nextAll(g)) : t(S).after(e.activeSection.prevAll(g).get().reverse());
              return Ke(t(S).position().top), re(), e.wrapAroundElements = e.activeSection, e.dtop = e.element.position().top, e.yMovement = Le(e.element), e.leavingSection = e.activeSection.index(g) + 1, e.sectionIndex = e.element.index(g), e
            }(l)), l.localIsResizing || ue(l.activeSection), Z.scrollOverflow && Z.scrollOverflowHandler.beforeLeave(), e.addClass(p).siblings().removeClass(p), ce(e), Z.scrollOverflow && Z.scrollOverflowHandler.onLeave(), ct = !1, Fe(a, n, l.anchorLink, l.sectionIndex),
            function (e) {
              if (Z.css3 && Z.autoScrolling && !Z.scrollBar) {
                var i = "translate3d(0px, -" + s.round(e.dtop) + "px, 0px)";
                De(i, !0), Z.scrollingSpeed ? (clearTimeout(vt), vt = setTimeout(function () {
                  le(e)
                }, Z.scrollingSpeed)) : le(e)
              } else {
                var o = function (t) {
                  var e = {};
                  Z.autoScrolling && !Z.scrollBar ? (e.options = {
                    top: -t.dtop
                  }, e.element = r) : (e.options = {
                    scrollTop: t.dtop
                  }, e.element = "html, body");
                  return e
                }(e);
                t(o.element).animate(o.options, Z.scrollingSpeed, Z.easing).promise().done(function () {
                  Z.scrollBar ? setTimeout(function () {
                    le(e)
                  }, 30) : le(e)
                })
              }
            }(l), J = l.anchorLink, Be(l.anchorLink, l.sectionIndex)
        }
      }
    }

    function le(e) {
      ! function (e) {
        e.wrapAroundElements && e.wrapAroundElements.length && (e.isMovementUp ? t(y).before(e.wrapAroundElements) : t(x).after(e.wrapAroundElements), Ke(t(S).position().top), re())
      }(e), t.isFunction(Z.afterLoad) && !e.localIsResizing && Z.afterLoad.call(e.element, e.anchorLink, e.sectionIndex + 1), Z.scrollOverflow && Z.scrollOverflowHandler.afterLoad(), e.localIsResizing || de(e.element), e.element.addClass(f).siblings().removeClass(f), ct = !0, t.isFunction(e.callback) && e.callback.call(this)
    }

    function he(t, e) {
      t.attr(e, t.data(e)).removeAttr("data-" + e)
    }

    function ce(e) {
      var i;
      Z.lazyLoading && fe(e).find("img[data-src], img[data-srcset], source[data-src], source[data-srcset], video[data-src], audio[data-src], iframe[data-src]").each(function () {
        if (i = t(this), t.each(["src", "srcset"], function (t, e) {
            var s = i.attr("data-" + e);
            void 0 !== s && s && he(i, e)
          }), i.is("source")) {
          var e = i.closest("video").length ? "video" : "audio";
          i.closest(e).get(0).load()
        }
      })
    }

    function de(e) {
      var i = fe(e);
      i.find("video, audio").each(function () {
        var e = t(this).get(0);
        e.hasAttribute("data-autoplay") && "function" == typeof e.play && e.play()
      }), i.find('iframe[src*="youtube.com/embed/"]').each(function () {
        var e = t(this).get(0);
        e.hasAttribute("data-autoplay") && pe(e), e.onload = function () {
          e.hasAttribute("data-autoplay") && pe(e)
        }
      })
    }

    function pe(t) {
      t.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*")
    }

    function ue(e) {
      var i = fe(e);
      i.find("video, audio").each(function () {
        var e = t(this).get(0);
        e.hasAttribute("data-keepplaying") || "function" != typeof e.pause || e.pause()
      }), i.find('iframe[src*="youtube.com/embed/"]').each(function () {
        var e = t(this).get(0);
        /youtube\.com\/embed\//.test(t(this).attr("src")) && !e.hasAttribute("data-keepplaying") && t(this).get(0).contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*")
      })
    }

    function fe(e) {
      var i = e.find(_);
      return i.length && (e = t(i)), e
    }

    function ve() {
      var t = ge(),
        e = t.section,
        i = t.slide;
      e && (Z.animateAnchor ? We(e, i) : Vt(e, i))
    }

    function me() {
      if (!Et && !Z.lockAnchors) {
        var t = ge(),
          e = t.section,
          i = t.slide,
          s = void 0 === J,
          o = void 0 === J && void 0 === i && !st;
        e && e.length && (e && e !== J && !s || o || !st && tt != i) && We(e, i)
      }
    }

    function ge() {
      var t, i, s = e.location.hash;
      if (s.length) {
        var o = s.replace("#", "").split("/"),
          n = s.indexOf("#/") > -1;
        t = n ? "/" + o[1] : decodeURIComponent(o[0]);
        var r = n ? o[2] : o[1];
        r && r.length && (i = decodeURIComponent(r))
      }
      return {
        section: t,
        slide: i
      }
    }

    function Se(e) {
      clearTimeout(yt);
      var i = t(":focus"),
        s = e.which;
      if (9 === s) ! function (e) {
        var i = e.shiftKey,
          s = t(":focus"),
          o = t(S),
          n = o.find(_),
          r = (n.length ? n : o).find(bt).not('[tabindex="-1"]');

        function a(t) {
          return t.preventDefault(), r.first().focus()
        }
        s.length ? s.closest(S, _).length || (s = a(e)) : a(e);
        (!i && s.is(r.last()) || i && s.is(r.first())) && e.preventDefault()
      }(e);
      else if (!i.is("textarea") && !i.is("input") && !i.is("select") && "true" !== i.attr("contentEditable") && "" !== i.attr("contentEditable") && Z.keyboardScrolling && Z.autoScrolling) {
        t.inArray(s, [40, 38, 32, 33, 34]) > -1 && e.preventDefault(), et = e.ctrlKey, yt = setTimeout(function () {
          ! function (e) {
            var i = e.shiftKey;
            if (!ct && [37, 39].indexOf(e.which) < 0) return;
            switch (e.which) {
              case 38:
              case 33:
                pt.k.up && Rt();
                break;
              case 32:
                if (i && pt.k.up) {
                  Rt();
                  break
                }
              case 40:
              case 34:
                pt.k.down && Ft();
                break;
              case 36:
                pt.k.up && qt(1);
                break;
              case 35:
                pt.k.down && qt(t(g).length);
                break;
              case 37:
                pt.k.left && Ut();
                break;
              case 39:
                pt.k.right && Nt();
                break;
              default:
                ;
            }
          }(e)
        }, 150)
      }
    }

    function ye() {
      t(this).prev().trigger("click")
    }

    function xe(t) {
      ht && (et = t.ctrlKey)
    }

    function we(t) {
      2 == t.which && (_t = t.pageY, rt.on("mousemove", Xe))
    }

    function be(t) {
      2 == t.which && rt.off("mousemove")
    }

    function Te() {
      var e = t(this).closest(g);
      t(this).hasClass(F) ? pt.m.left && Ut(e) : pt.m.right && Nt(e)
    }

    function Ee() {
      ht = !1, et = !1
    }

    function ke(e) {
      e.preventDefault();
      var i = t(this).parent().index();
      ae(t(g).eq(i))
    }

    function Pe(e) {
      e.preventDefault();
      var i = t(this).closest(g).find(B);
      Ye(i, i.find(z).eq(t(this).closest("li").index()))
    }

    function Xe(t) {
      ct && (t.pageY < _t && pt.m.up ? Rt() : t.pageY > _t && pt.m.down && Ft()), _t = t.pageY
    }

    function Ye(e, i, o) {
      var n = e.closest(g),
        r = {
          slides: e,
          destiny: i,
          direction: o,
          destinyPos: i.position(),
          slideIndex: i.index(),
          section: n,
          sectionIndex: n.index(g),
          anchorLink: n.data("anchor"),
          slidesNav: n.find(O),
          slideAnchor: qe(i),
          prevSlide: n.find(_),
          prevSlideIndex: n.find(_).index(),
          localIsResizing: lt
        };
      r.xMovement = function (t, e) {
        if (t == e) return "none";
        if (t > e) return "left";
        return "right"
      }(r.prevSlideIndex, r.slideIndex), r.localIsResizing || (ct = !1), Z.onSlideLeave && !r.localIsResizing && "none" !== r.xMovement && t.isFunction(Z.onSlideLeave) && !1 === Z.onSlideLeave.call(r.prevSlide, r.anchorLink, r.sectionIndex + 1, r.prevSlideIndex, r.direction, r.slideIndex) ? st = !1 : (i.addClass(p).siblings().removeClass(p), r.localIsResizing || (ue(r.prevSlide), ce(i)), !Z.loopHorizontal && Z.controlArrows && (n.find(q).toggle(0 !== r.slideIndex), n.find(U).toggle(!i.is(":last-child"))), n.hasClass(p) && !r.localIsResizing && Fe(r.slideIndex, r.slideAnchor, r.anchorLink, r.sectionIndex), function (t, e, i) {
        var o = e.destinyPos;
        if (Z.css3) {
          var n = "translate3d(-" + s.round(o.left) + "px, 0px, 0px)";
          _e(t.find(M)).css(Ze(n)), mt = setTimeout(function () {
            i && Ce(e)
          }, Z.scrollingSpeed, Z.easing)
        } else t.animate({
          scrollLeft: s.round(o.left)
        }, Z.scrollingSpeed, Z.easing, function () {
          i && Ce(e)
        })
      }(e, r, !0))
    }

    function Ce(e) {
      var i, s;
      i = e.slidesNav, s = e.slideIndex, i.find(u).removeClass(p), i.find("li").eq(s).find("a").addClass(p), e.localIsResizing || (t.isFunction(Z.afterSlideLoad) && Z.afterSlideLoad.call(e.destiny, e.anchorLink, e.sectionIndex + 1, e.slideAnchor, e.slideIndex), ct = !0, de(e.destiny)), st = !1
    }

    function He() {
      if (ze(), ot) {
        var e = t(i.activeElement);
        if (!e.is("textarea") && !e.is("input") && !e.is("select")) {
          var o = j.height();
          s.abs(o - At) > 20 * s.max(At, o) / 100 && (jt(!0), At = o)
        }
      } else clearTimeout(ft), ft = setTimeout(function () {
        jt(!0)
      }, 350)
    }

    function ze() {
      var t = Z.responsive || Z.responsiveWidth,
        e = Z.responsiveHeight,
        i = t && j.outerWidth() < t,
        s = e && j.height() < e;
      t && e ? Kt(i || s) : t ? Kt(i) : e && Kt(s)
    }

    function _e(t) {
      var e = "all " + Z.scrollingSpeed + "ms " + Z.easingcss3;
      return t.removeClass(l), t.css({
        "-webkit-transition": e,
        transition: e
      })
    }

    function Ae(t) {
      return t.addClass(l)
    }

    function Be(e, i) {
      var s;
      s = e, Z.menu && (t(Z.menu).find(u).removeClass(p), t(Z.menu).find('[data-menuanchor="' + s + '"]').addClass(p)),
        function (e, i) {
          Z.navigation && (t(P).find(u).removeClass(p), e ? t(P).find('a[href="#' + e + '"]').addClass(p) : t(P).find("li").eq(i).find("a").addClass(p))
        }(e, i)
    }

    function Le(e) {
      var i = t(S).index(g),
        s = e.index(g);
      return i == s ? "none" : i > s ? "up" : "down"
    }

    function Me(e) {
      if (!e.hasClass(I)) {
        var i = t('<div class="' + w + '" />').height(Ie(e));
        e.addClass(I).wrapInner(i)
      }
    }

    function Ie(t) {
      var e = at;
      if (Z.paddingTop || Z.paddingBottom) {
        var i = t;
        i.hasClass(m) || (i = t.closest(g));
        var s = parseInt(i.css("padding-top")) + parseInt(i.css("padding-bottom"));
        e = at - s
      }
      return e
    }

    function De(t, e) {
      e ? _e(rt) : Ae(rt), rt.css(Ze(t)), setTimeout(function () {
        rt.removeClass(l)
      }, 10)
    }

    function Oe(e) {
      var i = rt.find(g + '[data-anchor="' + e + '"]');
      if (!i.length) {
        var s = void 0 !== e ? e - 1 : 0;
        i = t(g).eq(s)
      }
      return i
    }

    function We(t, e) {
      var i = Oe(t);
      if (i.length) {
        var s = function (t, e) {
          var i = e.find(z + '[data-anchor="' + t + '"]');
          return i.length || (t = void 0 !== t ? t : 0, i = e.find(z).eq(t)), i
        }(e, i);
        t === J || i.hasClass(p) ? Re(s) : ae(i, function () {
          Re(s)
        })
      }
    }

    function Re(t) {
      t.length && Ye(t.closest(B), t)
    }

    function Fe(t, e, i, s) {
      var o = "";
      Z.anchors.length && !Z.lockAnchors && (t ? (void 0 !== i && (o = i), void 0 === e && (e = t), tt = e, Ve(o + "/" + e)) : void 0 !== t ? (tt = e, Ve(i)) : Ve(i)), Ne()
    }

    function Ve(t) {
      if (Z.recordHistory) location.hash = t;
      else if (ot || nt) e.history.replaceState(o, o, "#" + t);
      else {
        var i = e.location.href.split("#")[0];
        e.location.replace(i + "#" + t)
      }
    }

    function qe(t) {
      var e = t.data("anchor"),
        i = t.index();
      return void 0 === e && (e = i), e
    }

    function Ne() {
      var e = t(S),
        i = e.find(_),
        s = qe(e),
        o = qe(i),
        n = String(s);
      i.length && (n = n + "-" + o), n = n.replace("/", "-").replace("#", "");
      var r = new RegExp("\\b\\s?" + d + "-[^\\s]+\\b", "g");
      Q[0].className = Q[0].className.replace(r, ""), Q.addClass(d + "-" + n)
    }

    function Ue(t) {
      var e = [];
      return e.y = void 0 !== t.pageY && (t.pageY || t.pageX) ? t.pageY : t.touches[0].pageY, e.x = void 0 !== t.pageX && (t.pageY || t.pageX) ? t.pageX : t.touches[0].pageX, nt && ee(t) && (Z.scrollBar || !Z.autoScrolling) && (e.y = t.touches[0].pageY, e.x = t.touches[0].pageX), e
    }

    function je(t, e) {
      Mt(0, "internal"), void 0 !== e && (lt = !0), Ye(t.closest(B), t), void 0 !== e && (lt = !1), Mt(Tt.scrollingSpeed, "internal")
    }

    function Ke(t) {
      var e = s.round(t);
      Z.css3 && Z.autoScrolling && !Z.scrollBar ? De("translate3d(0px, -" + e + "px, 0px)", !1) : Z.autoScrolling && !Z.scrollBar ? rt.css("top", -e) : $.scrollTop(e)
    }

    function Ze(t) {
      return {
        "-webkit-transform": t,
        "-moz-transform": t,
        "-ms-transform": t,
        transform: t
      }
    }

    function $e(e, i, s) {
      "all" !== i ? pt[s][i] = e : t.each(Object.keys(pt[s]), function (t, i) {
        pt[s][i] = e
      })
    }

    function Qe(t, e, i) {
      Z[t] = e, "internal" !== i && (Tt[t] = e)
    }

    function Ge() {
      t("html").hasClass(c) ? Je("error", "Fullpage.js can only be initialized once and you are doing it multiple times!") : (Z.continuousVertical && (Z.loopTop || Z.loopBottom) && (Z.continuousVertical = !1, Je("warn", "Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")), Z.scrollBar && Z.scrollOverflow && Je("warn", "Option `scrollBar` is mutually exclusive with `scrollOverflow`. Sections with scrollOverflow might not work well in Firefox"), !Z.continuousVertical || !Z.scrollBar && Z.autoScrolling || (Z.continuousVertical = !1, Je("warn", "Scroll bars (`scrollBar:true` or `autoScrolling:false`) are mutually exclusive with `continuousVertical`; `continuousVertical` disabled")), Z.scrollOverflow && !Z.scrollOverflowHandler && (Z.scrollOverflow = !1, Je("error", "The option `scrollOverflow:true` requires the file `scrolloverflow.min.js`. Please include it before fullPage.js.")), t.each(["fadingEffect", "continuousHorizontal", "scrollHorizontally", "interlockedSlides", "resetSliders", "responsiveSlides", "offsetSections", "dragAndMove", "scrollOverflowReset", "parallax"], function (t, e) {
        Z[e] && Je("warn", "fullpage.js extensions require jquery.fullpage.extensions.min.js file instead of the usual jquery.fullpage.js. Requested: " + e)
      }), t.each(Z.anchors, function (e, i) {
        var s = K.find("[name]").filter(function () {
            return t(this).attr("name") && t(this).attr("name").toLowerCase() == i.toLowerCase()
          }),
          o = K.find("[id]").filter(function () {
            return t(this).attr("id") && t(this).attr("id").toLowerCase() == i.toLowerCase()
          });
        (o.length || s.length) && (Je("error", "data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE)."), o.length && Je("error", '"' + i + '" is is being used by another element `id` property'), s.length && Je("error", '"' + i + '" is is being used by another element `name` property'))
      }))
    }

    function Je(t, e) {
      console && console[t] && console[t]("fullPage: " + e)
    }
  }
});
