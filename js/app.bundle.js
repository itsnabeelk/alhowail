! function (t) {
  var e = {};

  function n(i) {
    if (e[i]) return e[i].exports;
    var a = e[i] = {
      i: i,
      l: !1,
      exports: {}
    };
    return t[i].call(a.exports, a, a.exports, n), a.l = !0, a.exports
  }
  n.m = t, n.c = e, n.d = function (t, e, i) {
    n.o(t, e) || Object.defineProperty(t, e, {
      configurable: !1,
      enumerable: !0,
      get: i
    })
  }, n.n = function (t) {
    var e = t && t.__esModule ? function () {
      return t.default
    } : function () {
      return t
    };
    return n.d(e, "a", e), e
  }, n.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e)
  }, n.p = "", n(n.s = 28)
}({
  28: function (t, e, n) {
    t.exports = n(29)
  },
  29: function (t, e, n) {
    "use strict";
    n(30), n(31), n(32), n(33), n(34), n(35), n(36), n(37), n(38), n(39), n(40), n(41)
  },
  30: function (t, e, n) {
    "use strict";
    var i;
    (i = window.NSI || {}).jobMap = {
      apiKey: "AIzaSyDyGlhkEothwI4S-Avcr4-V-Ly99CkBgSg",
      mapCanvas: null,
      init: function () {
        var t = document.querySelector(".js-job-location_map");
        t && (this.mapCanvas = t, i.jobMap.loadApi())
      },
      loadApi: function () {
        var t = document.createElement("script");
        t.type = "text/javascript", t.src = "https://maps.googleapis.com/maps/api/js?key=" + i.jobMap.apiKey + "&callback=NSI.jobMap.mapInit", document.body.appendChild(t)
      },
      mapInit: function () {
        var t = i.jobMap.mapCanvas,
          e = {
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            streetViewControl: !1,
            zoomControl: !0,
            zoomControlOptions: {
              position: google.maps.ControlPosition.RIGHT_BOTTOM
            },
            scrollwheel: !1,
            mapTypeControl: !1
          },
          n = document.querySelectorAll(".js-job-location_data"),
          a = !1,
          r = void 0,
          o = void 0,
          s = void 0,
          c = void 0,
          l = void 0,
          d = void 0,
          u = void 0;
        n.length > 1 && (a = !0, d = document.querySelector(".job-location_menu"), u = document.createElement("select"), d.appendChild(u));
        for (var f = [], m = 0; m < n.length; m++) {
          var p = n[m];
          if (o = p.getAttribute("data-map-coords"), r = p.getAttribute("data-map-location"), s = o.split(","), c = parseFloat(s[0]), l = parseFloat(s[1]), f.push([c, l]), a) {
            var h = document.createElement("option");
            h.value = r.toLowerCase(), h.text = r, u.appendChild(h)
          }
        }
        var v = new google.maps.LatLng(f[0][0], f[0][1]);
        e.center = v;
        for (var w = new google.maps.Map(t, e), g = 0; g < f.length; g++) {
          var b = f[g];
          new google.maps.Marker({
            map: w,
            position: new google.maps.LatLng(b[0], b[1])
          })
        }
        if (a) {
          var y = 0,
            A = void 0;
          u.addEventListener("change", function () {
            y = this.selectedIndex, A = new google.maps.LatLng(f[y][0], f[y][1]), w.panTo(A)
          });
          for (var S = 0; S < n.length; S++) n[S].classList.add("is-hidden")
        }
      },
      mapPanToTarget: function () {}
    }, window.NSI = i, document.addEventListener("DOMContentLoaded", function () {
      i.jobMap.init()
    })
  },
  31: function (t, e, n) {
    "use strict";
    var i;
    (i = window.NSI || {}).carousel = {
      init: function () {
        var t = document.querySelectorAll(".js-carousel");
        if (!(t.length < 1))
          for (var e = 0; e < t.length; ++e) this.render(t[e])
      },
      render: function (t) {
        var e = 0,
          n = !1,
          i = t.querySelector(".carousel_control"),
          a = t.querySelectorAll("video");
        t.dataset.carouselAutoplay && (e = 1e3 * t.dataset.carouselAutoplay), t.dataset.carouselNav && (n = !0);
        var r = new Flickity(t, {
          autoPlay: e,
          cellAlign: "left",
          cellSelector: ".carousel_cell",
          friction: .34,
          pageDots: !1,
          prevNextButtons: n,
          pauseAutoPlayOnHover: !1,
          wrapAround: !0
        });
        this.bindPlayControl(r, i, e), this.bindDotControl(r, i), a.length > 0 && (this.waypointLoadVideos(t, a), this.bindVideoControl(r)), e > 0 && (r.pausePlayer(), this.waypointAutoplay(r, t, e))
      },
      waypointLoadVideos: function (t, e) {
        var n = new Waypoint({
            element: t,
            handler: function () {
              if (window.matchMedia && window.matchMedia("(min-width: 1024px)").matches)
                for (var t = 0; t < e.length; ++t) {
                  var i = e[t].querySelector("source");
                  i.src = i.dataset.src, e[t].load()
                }
              n.destroy()
            },
            offset: "150%"
          }),
          i = new Waypoint({
            element: t,
            handler: function () {
              var t = e[0];
              window.matchMedia && window.matchMedia("(min-width: 1024px)").matches && t && setTimeout(function () {
                t.play()
              }, 750), i.destroy()
            },
            offset: "50%"
          })
      },
      waypointAutoplay: function (t, e, n) {
        var i = new Waypoint({
          element: e,
          handler: function () {
            t.playPlayer(), i.destroy()
          },
          offset: "100%"
        })
      },
      bindVideoControl: function (t) {
        var e = 0;
        t.on("change", function () {
          var n = t.cells[e].element.querySelector("video");
          n && (n.currentTime = 0, n.pause());
          var i = t.selectedElement.querySelector("video");
          i && setTimeout(function () {
            i.play()
          }, 750), e = t.selectedIndex
        })
      },
      bindPlayControl: function (t, e, n) {
        var i = e.querySelector(".carousel_control_button"),
          a = !1;
        n < 1 ? i.classList.add("is-hidden") : (i.addEventListener("click", function () {
          a ? (t.playPlayer(), t.next(), this.classList.remove("is-paused"), a = !1) : (t.pausePlayer(), this.classList.add("is-paused"), a = !0)
        }), t.on("pointerDown", function () {
          !0 !== a && (i.classList.add("is-paused"), a = !0)
        }), t.on("select", function (e) {
          "playing" != t.player.state && !0 !== a && (i.classList.add("is-paused"), a = !0)
        }))
      },
      bindDotControl: function (t, e) {
        var n = e.querySelectorAll(".carousel_control_dot"),
          i = Array.prototype.slice.call(n);
        e.querySelector(".carousel_control_button"), e.addEventListener("click", function (e) {
          var n = e.target;
          if (n.matches(".carousel_control_dot")) {
            var a = i.indexOf(n);
            t.select(a)
          }
        }), t.on("select", function () {
          for (var e = 0; e < n.length; ++e) e == t.selectedIndex ? n[e].classList.add("is-selected") : n[e].classList.remove("is-selected")
        })
      }
    }, window.NSI = i, document.addEventListener("DOMContentLoaded", function () {
      i.carousel.init()
    })
  },
  32: function (t, e, n) {
    "use strict";
    var i;
    (i = window.NSI || {}).chat = {
      init: function () {
        var t = document.querySelector(".js-chat");
        if (t) var e = new Waypoint({
          element: t,
          handler: function () {
            t && t.classList.add("chat--animate"), e.destroy()
          },
          offset: "50%"
        })
      }
    }, window.NSI = i, document.addEventListener("DOMContentLoaded", function () {
      i.chat.init()
    })
  },
  33: function (t, e, n) {
    "use strict";
    var i;
    (i = window.NSI || {}).cookieNotification = {
      init: function () {
        var t = document.querySelector(".cookie-message"),
          e = document.querySelector(".js-cookie-button"),
          n = Cookies.get("accept-cookies");
        t && e && (void 0 === n && t.classList.add("is-open"), e.addEventListener("click", function (e) {
          e.preventDefault(), t.classList.remove("is-open"), Cookies.set("accept-cookies", !0, {
            expires: 365
          })
        }))
      }
    }, window.NSI = i, document.addEventListener("DOMContentLoaded", function () {
      i.cookieNotification.init()
    })
  },
  34: function (t, e, n) {
    "use strict";
    var i;
    (i = window.NSI || {}).financeTracker = {
      chart: null,
      chartInner: null,
      chartWidth: 600,
      chartHeight: 360,
      chartLegendText: "Figures are in £ billions",
      init: function () {
        if (this.chart = document.getElementById("financeTracker"), this.chart) {
          var t = document.createElementNS("http://www.w3.org/2000/svg", "g");
          t.setAttribute("class", "ft-group-chart"), t.setAttribute("transform", "translate(20 0)"), this.chart.appendChild(t), this.chartInner = t, this.drawSVG();
          var e = document.createElement("small");
          e.textContent = this.chartLegendText;
          var n = this.chart.parentNode;
          n.parentNode.insertBefore(e, n);
          var a = document.querySelector(".js-ft-chart-select");
          a && a.addEventListener("change", function (t) {
            var e = t.target.value;
            i.financeTracker.cleanupSVG(), i.financeTracker.drawSVG(e)
          })
        }
      },
      cleanupSVG: function () {
        var t = document.querySelector(".ft-group-target"),
          e = document.querySelector(".ft-group-chart");
        if (t && i.financeTracker.chart.removeChild(t), e)
          for (var n = e.childNodes.length - 1; n >= 0; n--) e.removeChild(e.childNodes[n])
      },
      drawSVG: function (t) {
        var e = i.financeTrackerData;
        if (null !== e && void 0 !== e) {
          t && (e = e.filter(function (e) {
            return e.year === parseInt(t, 10)
          })), e = e[0];
          var n = i.financeTracker.getChartData(e),
            a = e.year,
            r = e.target,
            o = e.offset;
          i.financeTracker.plotChartTarget(n, r, o), i.financeTracker.plotChartQuarters(n, a), i.financeTracker.plotChartData(n)
        }
      },
      getValueArray: function (t) {
        return t.map(function (t) {
          return t.value
        })
      },
      getChartData: function (t) {
        t.dataPoints.length < 5 && t.dataPoints.unshift({
          label: "start",
          value: 0
        });
        var e = i.financeTracker.getValueArray(t.dataPoints);
        return i.financeTracker.getCoordinates(e, t.target)
      },
      getCoordinates: function (t, e) {
        var n = Math.floor(1 * Math.min.apply(null, t)),
          a = Math.ceil(1 * Math.max.apply(null, t)),
          r = 0,
          o = 2 * e;
        n < r && (r = 2 * n), a > o && (o = a);
        var s = (o - r) / this.chartHeight,
          c = this.chartWidth / (t.length - 1);
        return t.map(function (t, e) {
          var n = i.financeTracker.chartHeight - (t - r) / s;
          return [c * e, n, t]
        })
      },
      getLineSVG: function (t) {
        var e = "";
        return t.filter(function (t) {
          return null !== t[2]
        }).map(function (t, n) {
          e = e + " " + (0 === n ? "M" : "L") + " " + t[0] + "," + t[1]
        }), e
      },
      plotChartData: function (t) {
        var e = t.filter(function (t) {
            return null !== t[2] && 0 !== t[2]
          }),
          n = document.createElementNS("http://www.w3.org/2000/svg", "g");
        n.setAttribute("class", "ft-group-datapoints"), this.chartInner.appendChild(n);
        var a, r = document.createElementNS("http://www.w3.org/2000/svg", "path");
        r.setAttribute("class", "ft-dataline"), r.setAttribute("style", "animation-duration:" + .3 * e.length + "s;"), r.setAttribute("d", i.financeTracker.getLineSVG(t)), a = r.getTotalLength(), r.setAttribute("stroke-dasharray", a), r.setAttribute("stroke-dashoffset", a), setTimeout(function () {
          r.setAttribute("class", "ft-dataline ft-dataline--in")
        }, 1e3), n.appendChild(r), e.map(function (t) {
          var e = document.createElementNS("http://www.w3.org/2000/svg", "g");
          e.setAttribute("class", "ft-group-datapoint"), n.appendChild(e);
          var i = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          i.setAttribute("class", "ft-datapoint-outer"), i.setAttribute("cx", t[0]), i.setAttribute("cy", t[1]), i.setAttribute("r", 6), e.appendChild(i);
          var a = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          a.setAttribute("class", "ft-datapoint"), a.setAttribute("cx", t[0]), a.setAttribute("cy", t[1]), a.setAttribute("r", 3), e.appendChild(a);
          var r = document.createElementNS("http://www.w3.org/2000/svg", "text");
          r.setAttribute("class", "ft-datapoint_label"), r.setAttribute("text-anchor", "middle"), r.setAttribute("transform", "translate(0 25)"), r.setAttribute("width", 100), r.setAttribute("x", t[0]), r.setAttribute("y", t[1]), r.textContent = t[2], e.appendChild(r)
        })
      },
      plotChartTarget: function (t, e, n) {
        var a = this.chartWidth / (t.length - 1),
          r = document.createElementNS("http://www.w3.org/2000/svg", "g");
        r.setAttribute("class", "ft-group-gridlines"), this.chartInner.appendChild(r), t.map(function (t, e) {
          var n = document.createElementNS("http://www.w3.org/2000/svg", "rect");
          n.setAttribute("class", "ft-gridline"), n.setAttribute("height", i.financeTracker.chartHeight), n.setAttribute("width", 1), n.setAttribute("x", a * e), n.setAttribute("y", 0), r.appendChild(n)
        });
        var o = document.createElementNS("http://www.w3.org/2000/svg", "g");
        o.setAttribute("class", "ft-group-target"), this.chart.insertBefore(o, document.querySelector(".ft-group-chart"));
        var s = e + n,
          c = e - n,
          l = document.createElementNS("http://www.w3.org/2000/svg", "rect"),
          d = i.financeTracker.getCoordinates([s, c], e),
          u = d[0][1],
          f = d[1][1];
        l.setAttribute("class", "ft-target-range"), l.setAttribute("height", f - u), l.setAttribute("x", 0), l.setAttribute("y", u), l.setAttribute("width", "100%"), o.appendChild(l);
        var m = document.createElementNS("http://www.w3.org/2000/svg", "line"),
          p = i.financeTracker.getCoordinates([e], e)[0][1];
        m.setAttribute("class", "ft-target-line"), m.setAttribute("x1", 0), m.setAttribute("x2", "100%"), m.setAttribute("y1", p), m.setAttribute("y2", p), o.appendChild(m);
        var h = document.createElementNS("http://www.w3.org/2000/svg", "path");
        h.setAttribute("class", "ft-target-label"), h.setAttribute("d", "M 0 0 L 50 0 L 60 12 L 50 24 L 0 24"), h.setAttribute("transform", "translate(0 " + (p - 12) + ")"), o.appendChild(h);
        var v = document.createElementNS("http://www.w3.org/2000/svg", "text");
        v.setAttribute("alignment-baseline", "middle"), v.setAttribute("class", "ft-target-label_text"), v.setAttribute("transform", "translate(4 1)"), v.setAttribute("x", 0), v.setAttribute("y", p), v.textContent = "£" + e + " Bn", o.appendChild(v);
        var w = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        w.setAttribute("class", "ft-gridline"), w.setAttribute("height", 1), w.setAttribute("width", "100%"), w.setAttribute("x", 0), w.setAttribute("y", 40), o.appendChild(w)
      },
      plotChartQuarters: function (t, e) {
        var n = this.chartWidth / (t.length - 1),
          a = document.createElementNS("http://www.w3.org/2000/svg", "g");
        a.setAttribute("class", "ft-group-quarters"), this.chartInner.appendChild(a), t.map(function (t, r) {
          if (0 !== r) {
            var o = document.createElementNS("http://www.w3.org/2000/svg", "g"),
              s = "";
            null === t[2] ? s += "ft-quarter--disabled" : s += "ft-quarter--enabled", o.setAttribute("class", "ft-group-quarter " + s), o.setAttribute("id", "ft-group-quarter-" + r), o.setAttribute("data-content-target", e + "q" + r), a.appendChild(o);
            var c = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            c.setAttribute("class", "ft-quarter"), c.setAttribute("height", i.financeTracker.chartHeight), c.setAttribute("width", n), c.setAttribute("x", n * (r - 1)), c.setAttribute("y", 0), o.appendChild(c);
            var l = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            l.setAttribute("class", "ft-quarter_header"), l.setAttribute("height", 40), l.setAttribute("width", n), l.setAttribute("x", n * (r - 1)), l.setAttribute("y", 0), o.appendChild(l);
            var d = document.createElementNS("http://www.w3.org/2000/svg", "text");
            d.setAttribute("class", "ft-quarter_label"), d.setAttribute("text-anchor", "middle"), d.setAttribute("x", n * (r - 1) + n / 2), d.setAttribute("y", 25), d.textContent = "Q" + r, o.appendChild(d)
          }
        });
        var r = document.querySelectorAll(".ft-quarter--enabled"),
          o = document.querySelector(".ft-content"),
          s = r[r.length - 1];
        if (o) {
          $(i.financeTracker.chart).addClass("ft--interactive");
          for (var c = 0; c < r.length; c++) r[c].addEventListener("click", function (t) {
            i.financeTracker.showQuarterContent(this, r)
          })
        }
        i.financeTracker.showQuarterContent(s, r)
      },
      showQuarterContent: function (t, e) {
        for (var n = document.querySelectorAll(".ft-content_quarter"), i = t.getAttribute("data-content-target"), a = document.getElementById(i), r = 0; r < e.length; r++) $(e[r]).removeClass("is-active");
        if ($(t).addClass("is-active"), a) {
          for (var o = 0; o < n.length; o++) n[o].classList.remove("is-visible");
          a.classList.add("is-visible")
        }
      }
    }, window.NSI = i, document.addEventListener("DOMContentLoaded", function () {
      i.financeTracker.init()
    })
  },
  35: function (t, e, n) {
    "use strict";
    var i;
    (i = window.NSI || {}).interstitial = {
      init: function () {
        var t = $("#interstitial"),
          e = Cookies.get("interstitial-shown");
        t.length < 1 || (void 0 === e && t.foundation("open"), t.on("closed.zf.reveal", function () {
          Cookies.set("interstitial-shown", !0, {
            expires: 365
          })
        }))
      }
    }, window.NSI = i, document.addEventListener("DOMContentLoaded", function () {
      /*i.interstitial.init()*/
    })
  },
  36: function (t, e, n) {
    "use strict";
    var i;
    (i = window.NSI || {}).documentDownload = {
      init: function () {
        var t = document.querySelector(".js-document-download");
        if (t) {
          var e = t.getAttribute("data-target"),
            n = document.querySelector("#" + e);
          t.addEventListener("click", function () {
            window.open(n.value)
          })
        }
      }
    }, window.NSI = i, document.addEventListener("DOMContentLoaded", function () {
      i.documentDownload.init()
    })
  },
  37: function (t, e, n) {
    "use strict";
    var i;
    (i = window.NSI || {}).video_modal = {
      init: function () {
        if (!($(".video-modal").length < 1)) {
          var t = document.createElement("script");
          t.id = "iframe-demo", t.src = "https://www.youtube.com/iframe_api";
          var e = document.getElementsByTagName("script")[0];
          e.parentNode.insertBefore(t, e)
        }
      },
      onYouTubeIframeAPIReady: function () {
        i.video_modal.eventBindings()
      },
      eventBindings: function () {
        var t = $(".video-modal");
        t.on("closeme.zf.reveal", function () {
          var t = this.querySelector("iframe");
          if (t) YT.get(t.id).playVideo();
          else {
            var e = this.querySelector(".youtube-embed"),
              n = e.getAttribute("data-video-id");
            new YT.Player(e, {
              videoId: n,
              playerVars: {
                rel: 0,
                theme: "light",
                showinfo: 0,
                showsearch: 0,
                autoplay: 1,
                autohide: 1,
                modestbranding: 1
              },
              events: {}
            })
          }
        }), t.on("closed.zf.reveal", function () {
          var t = this.querySelector("iframe");
          YT.get(t.id).destroy()
        })
      }
    }, window.onYouTubeIframeAPIReady = i.video_modal.onYouTubeIframeAPIReady, window.NSI = i, document.addEventListener("DOMContentLoaded", function () {
      i.video_modal.init()
    })
  },
  38: function (t, e, n) {
    "use strict";
    var i;
    (i = window.NSI || {}).statistic = {
      init: function () {
        this.statisticWaypoint()
      },
      statisticWaypoint: function () {
        for (var t = document.querySelectorAll(".js-statistic"), e = function (e) {
            var n = t[e];
            n.hasAttribute("data-stat-animate") && $(n).addClass("statistic-hidden");
            var a = new Waypoint({
              element: n,
              handler: function (t) {
                $(n).hasClass("statistic--chart") && (i.statistic.animateDoughnutChart(n), i.statistic.animateStatisticValue(n)), n.hasAttribute("data-stat-animate") && $(n).removeClass("statistic-hidden"), a.disable()
              },
              offset: "80%"
            })
          }, n = 0; n < t.length; n++) e(n)
      },
      animateDoughnutChart: function (t) {
        var e = $(t).find(".statistic_chart");
        e && e.removeClass("is-inactive")
      },
      animateStatisticValue: function (t) {
        var e = $(t).find(".statistic_value"),
          n = e.attr("data-value");
        null != (n = n.trim()) && (e.text("0"), $({
          countNum: e.text()
        }).animate({
          countNum: n
        }, {
          duration: 2e3,
          easing: "swing",
          step: function () {
            var t = Math.floor(this.countNum);
            e.text(t)
          },
          complete: function () {
            e.text(this.countNum)
          }
        }))
      }
    }, window.NSI = i, document.addEventListener("DOMContentLoaded", function () {
      i.statistic.init()
    })
  },
  39: function (t, e, n) {
    "use strict";
    var i;
    (i = window.NSI || {}).promo = {
      init: function () {
        this.fixedBackground()
      },
      fixedBackground: function () {
        for (var t = document.querySelectorAll(".js-promo-fixed"), e = function (e) {
            var n = t[e],
              i = n.querySelector(".promo_media");
            new Waypoint({
              element: n,
              handler: function (t) {
                "down" === t ? i.classList.add("is-fixed") : "up" === t && i.classList.remove("is-fixed")
              }
            }), new Waypoint({
              element: n,
              handler: function (t) {
                "down" === t ? i.classList.add("is-bottom") : "up" === t && i.classList.remove("is-bottom")
              },
              offset: "bottom-in-view"
            })
          }, n = 0; n < t.length; n++) e(n)
      }
    }, window.NSI = i, document.addEventListener("DOMContentLoaded", function () {
      i.promo.init()
    })
  },
  40: function (t, e, n) {
    "use strict";
    var i;
    (i = window.NSI || {}).timeline = {
      init: function () {
        var t = $("#heritage-timeline");
        t.length < 1 || t.fullpage({
          animateAnchor: !1,
          css3: !0,
          menu: "#timeline-menu",
          recordHistory: !1,
          responsiveWidth: 1024,
          scrollOverflow: !0,
          scrollingSpeed: 1e3,
          scrollOverflowOptions: {
            mouseWheelSpeed: 5,
            preventDefault: !1,
            scrollbars: !1
          },
          sectionSelector: ".timeline-panel",
          verticalCentered: !0,
          onLeave: function (t, e, n) {
            var i = $(this).next(".timeline-panel");
            i.hasClass("animated") || i.addClass("animated");
            var a = $(".timeline-menu_item"),
              r = $(".timeline-panel");
            a.each(function (t) {
              var n = $(this),
                i = n.attr("data-menuanchor"),
                a = $("[data-anchor='" + i + "']"),
                o = r.index(a);
              e > o && -1 != o ? n.addClass("visited") : n.removeClass("visited")
            })
          },
          afterLoad: function (t, e) {
			 // debugger;
            $(".timeline-panel").each(function (t, n) {
              t + 1 <= e && 0 != t && $(n).addClass("animated")
            })
			  if(e>1){
				  $('body').addClass('subpage-dark-horizontal');
			  }
			  else{
				  $('body').removeClass('subpage-dark-horizontal');
				}
          },
          afterRender: function () {
            var t = $(".timeline-panel_header"),
              e = $(".timeline-panel_video"),
              n = $(".timeline-panel_bg_image"),
              i = $("#timeline-panel_scroll-down");
            t.each(function (t, e) {
              $(this).parents(".timeline-panel").prepend(e)
            }), e.each(function (t, e) {
              $(this).parents(".timeline-panel").prepend(e)
            }), n.each(function (t, e) {
              $(this).parents(".timeline-panel").prepend(e)
            }), i.on("click", function () {
              $.fn.fullpage.moveSectionDown()
            })
          }
        })
      }
    }, window.NSI = i, document.addEventListener("DOMContentLoaded", function () {
      i.timeline.init()
    })
  },
	
  41: function (t, e, n) {
    "use strict";
    var i;
    Handlebars.registerHelper("showOrbitControls", function (t, e) {
      return t > 1 ? e.fn(this) : e.inverse(this)
    }), (i = window.NSI || {}).timelineEntry = {
      init: function () {
        $(".timeline-entry").length < 1 || (this.modal_carousel(), this.modal_video())
      },
      modal_video: function () {
        $(".js-timeline-video").on("click", function (t) {
          t.preventDefault()
        })
      },
      modal_carousel: function () {
        var t = $(".js-timeline-carousel"),
          e = $(".timeline-modal"),
          n = new Foundation.Reveal(e, {
            animationIn: "fade-in fast",
            animationOut: "fade-out fast",
            resetOnClose: !0
          }),
          i = void 0,
          a = document.getElementById("carousel-template").innerHTML,
          r = Handlebars.compile(a);
        t.on("click", function (t) {
          t.preventDefault();
          var e = $(this).attr("data-section"),
            a = window.TIMELINE["carousel_items_" + e],
            o = r({
              Slides: a
            });
          document.getElementById("timeline-modal_content").innerHTML = o, i = $(".timeline-carousel"), new Foundation.Orbit(i), n.open()
        }), $(document).on("closed.zf.reveal", ".timeline-modal", function () {
          document.getElementById("timeline-modal_content").innerHTML = ""
        })
      }
    }, window.NSI = i, document.addEventListener("DOMContentLoaded", function () {
      i.timelineEntry.init()
    })
  }
});
