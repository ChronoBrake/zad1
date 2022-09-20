!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.Popper = e()
}(this, function() {
    "use strict";
    function t(t) {
        return t && "[object Function]" === {}.toString.call(t)
    }
    function e(t, e) {
        if (1 !== t.nodeType)
            return [];
        var i = getComputedStyle(t, null);
        return e ? i[e] : i
    }
    function i(t) {
        return "HTML" === t.nodeName ? t : t.parentNode || t.host
    }
    function n(t) {
        if (!t)
            return document.body;
        switch (t.nodeName) {
        case "HTML":
        case "BODY":
            return t.ownerDocument.body;
        case "#document":
            return t.body
        }
        var o = e(t)
          , r = o.overflow
          , s = o.overflowX
          , a = o.overflowY;
        return /(auto|scroll)/.test(r + a + s) ? t : n(i(t))
    }
    function o(t) {
        var i = t && t.offsetParent
          , n = i && i.nodeName;
        return n && "BODY" !== n && "HTML" !== n ? -1 !== ["TD", "TABLE"].indexOf(i.nodeName) && "static" === e(i, "position") ? o(i) : i : t ? t.ownerDocument.documentElement : document.documentElement
    }
    function r(t) {
        return null === t.parentNode ? t : r(t.parentNode)
    }
    function s(t, e) {
        if (!(t && t.nodeType && e && e.nodeType))
            return document.documentElement;
        var i = t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING
          , n = i ? t : e
          , a = i ? e : t
          , l = document.createRange();
        l.setStart(n, 0),
        l.setEnd(a, 0);
        var c = l.commonAncestorContainer;
        if (t !== c && e !== c || n.contains(a))
            return function(t) {
                var e = t.nodeName;
                return "BODY" !== e && ("HTML" === e || o(t.firstElementChild) === t)
            }(c) ? c : o(c);
        var u = r(t);
        return u.host ? s(u.host, e) : s(t, r(e).host)
    }
    function a(t) {
        var e = "top" === (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "top") ? "scrollTop" : "scrollLeft"
          , i = t.nodeName;
        if ("BODY" === i || "HTML" === i) {
            var n = t.ownerDocument.documentElement;
            return (t.ownerDocument.scrollingElement || n)[e]
        }
        return t[e]
    }
    function l(t, e) {
        var i = 2 < arguments.length && void 0 !== arguments[2] && arguments[2]
          , n = a(e, "top")
          , o = a(e, "left")
          , r = i ? -1 : 1;
        return t.top += n * r,
        t.bottom += n * r,
        t.left += o * r,
        t.right += o * r,
        t
    }
    function c(t, e) {
        var i = "x" === e ? "Left" : "Top"
          , n = "Left" == i ? "Right" : "Bottom";
        return parseFloat(t["border" + i + "Width"], 10) + parseFloat(t["border" + n + "Width"], 10)
    }
    function u(t, e, i, n) {
        return R(e["offset" + t], e["scroll" + t], i["client" + t], i["offset" + t], i["scroll" + t], U() ? i["offset" + t] + n["margin" + ("Height" === t ? "Top" : "Left")] + n["margin" + ("Height" === t ? "Bottom" : "Right")] : 0)
    }
    function d() {
        var t = document.body
          , e = document.documentElement
          , i = U() && getComputedStyle(e);
        return {
            height: u("Height", t, e, i),
            width: u("Width", t, e, i)
        }
    }
    function h(t) {
        return $({}, t, {
            right: t.left + t.width,
            bottom: t.top + t.height
        })
    }
    function f(t) {
        var i = {};
        if (U())
            try {
                i = t.getBoundingClientRect();
                var n = a(t, "top")
                  , o = a(t, "left");
                i.top += n,
                i.left += o,
                i.bottom += n,
                i.right += o
            } catch (t) {}
        else
            i = t.getBoundingClientRect();
        var r = {
            left: i.left,
            top: i.top,
            width: i.right - i.left,
            height: i.bottom - i.top
        }
          , s = "HTML" === t.nodeName ? d() : {}
          , l = s.width || t.clientWidth || r.right - r.left
          , u = s.height || t.clientHeight || r.bottom - r.top
          , f = t.offsetWidth - l
          , p = t.offsetHeight - u;
        if (f || p) {
            var m = e(t);
            f -= c(m, "x"),
            p -= c(m, "y"),
            r.width -= f,
            r.height -= p
        }
        return h(r)
    }
    function p(t, i) {
        var o = U()
          , r = "HTML" === i.nodeName
          , s = f(t)
          , a = f(i)
          , c = n(t)
          , u = e(i)
          , d = parseFloat(u.borderTopWidth, 10)
          , p = parseFloat(u.borderLeftWidth, 10)
          , m = h({
            top: s.top - a.top - d,
            left: s.left - a.left - p,
            width: s.width,
            height: s.height
        });
        if (m.marginTop = 0,
        m.marginLeft = 0,
        !o && r) {
            var g = parseFloat(u.marginTop, 10)
              , v = parseFloat(u.marginLeft, 10);
            m.top -= d - g,
            m.bottom -= d - g,
            m.left -= p - v,
            m.right -= p - v,
            m.marginTop = g,
            m.marginLeft = v
        }
        return (o ? i.contains(c) : i === c && "BODY" !== c.nodeName) && (m = l(m, i)),
        m
    }
    function m(t) {
        var e = t.ownerDocument.documentElement
          , i = p(t, e)
          , n = R(e.clientWidth, window.innerWidth || 0)
          , o = R(e.clientHeight, window.innerHeight || 0)
          , r = a(e)
          , s = a(e, "left");
        return h({
            top: r - i.top + i.marginTop,
            left: s - i.left + i.marginLeft,
            width: n,
            height: o
        })
    }
    function g(t) {
        var n = t.nodeName;
        return "BODY" !== n && "HTML" !== n && ("fixed" === e(t, "position") || g(i(t)))
    }
    function v(t, e, o, r) {
        var a = {
            top: 0,
            left: 0
        }
          , l = s(t, e);
        if ("viewport" === r)
            a = m(l);
        else {
            var c;
            "scrollParent" === r ? "BODY" === (c = n(i(e))).nodeName && (c = t.ownerDocument.documentElement) : c = "window" === r ? t.ownerDocument.documentElement : r;
            var u = p(c, l);
            if ("HTML" !== c.nodeName || g(l))
                a = u;
            else {
                var h = d()
                  , f = h.height
                  , v = h.width;
                a.top += u.top - u.marginTop,
                a.bottom = f + u.top,
                a.left += u.left - u.marginLeft,
                a.right = v + u.left
            }
        }
        return a.left += o,
        a.top += o,
        a.right -= o,
        a.bottom -= o,
        a
    }
    function y(t) {
        return t.width * t.height
    }
    function w(t, e, i, n, o) {
        var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === t.indexOf("auto"))
            return t;
        var s = v(i, n, r, o)
          , a = {
            top: {
                width: s.width,
                height: e.top - s.top
            },
            right: {
                width: s.right - e.right,
                height: s.height
            },
            bottom: {
                width: s.width,
                height: s.bottom - e.bottom
            },
            left: {
                width: e.left - s.left,
                height: s.height
            }
        }
          , l = Object.keys(a).map(function(t) {
            return $({
                key: t
            }, a[t], {
                area: y(a[t])
            })
        }).sort(function(t, e) {
            return e.area - t.area
        })
          , c = l.filter(function(t) {
            var e = t.width
              , n = t.height;
            return e >= i.clientWidth && n >= i.clientHeight
        })
          , u = 0 < c.length ? c[0].key : l[0].key
          , d = t.split("-")[1];
        return u + (d ? "-" + d : "")
    }
    function b(t, e, i) {
        return p(i, s(e, i))
    }
    function x(t) {
        var e = getComputedStyle(t)
          , i = parseFloat(e.marginTop) + parseFloat(e.marginBottom)
          , n = parseFloat(e.marginLeft) + parseFloat(e.marginRight);
        return {
            width: t.offsetWidth + n,
            height: t.offsetHeight + i
        }
    }
    function S(t) {
        var e = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };
        return t.replace(/left|right|bottom|top/g, function(t) {
            return e[t]
        })
    }
    function C(t, e, i) {
        i = i.split("-")[0];
        var n = x(t)
          , o = {
            width: n.width,
            height: n.height
        }
          , r = -1 !== ["right", "left"].indexOf(i)
          , s = r ? "top" : "left"
          , a = r ? "left" : "top"
          , l = r ? "height" : "width"
          , c = r ? "width" : "height";
        return o[s] = e[s] + e[l] / 2 - n[l] / 2,
        o[a] = i === a ? e[a] - n[c] : e[S(a)],
        o
    }
    function I(t, e) {
        return Array.prototype.find ? t.find(e) : t.filter(e)[0]
    }
    function _(e, i, n) {
        return (void 0 === n ? e : e.slice(0, function(t, e, i) {
            if (Array.prototype.findIndex)
                return t.findIndex(function(t) {
                    return t[e] === i
                });
            var n = I(t, function(t) {
                return t[e] === i
            });
            return t.indexOf(n)
        }(e, "name", n))).forEach(function(e) {
            e.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
            var n = e.function || e.fn;
            e.enabled && t(n) && (i.offsets.popper = h(i.offsets.popper),
            i.offsets.reference = h(i.offsets.reference),
            i = n(i, e))
        }),
        i
    }
    function T(t, e) {
        return t.some(function(t) {
            var i = t.name;
            return t.enabled && i === e
        })
    }
    function E(t) {
        for (var e = [!1, "ms", "Webkit", "Moz", "O"], i = t.charAt(0).toUpperCase() + t.slice(1), n = 0; n < e.length - 1; n++) {
            var o = e[n]
              , r = o ? "" + o + i : t;
            if (void 0 !== document.body.style[r])
                return r
        }
        return null
    }
    function L(t) {
        var e = t.ownerDocument;
        return e ? e.defaultView : window
    }
    function M(t, e, i, o) {
        i.updateBound = o,
        L(t).addEventListener("resize", i.updateBound, {
            passive: !0
        });
        var r = n(t);
        return function t(e, i, o, r) {
            var s = "BODY" === e.nodeName
              , a = s ? e.ownerDocument.defaultView : e;
            a.addEventListener(i, o, {
                passive: !0
            }),
            s || t(n(a.parentNode), i, o, r),
            r.push(a)
        }(r, "scroll", i.updateBound, i.scrollParents),
        i.scrollElement = r,
        i.eventsEnabled = !0,
        i
    }
    function N() {
        var t, e;
        this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate),
        this.state = (t = this.reference,
        e = this.state,
        L(t).removeEventListener("resize", e.updateBound),
        e.scrollParents.forEach(function(t) {
            t.removeEventListener("scroll", e.updateBound)
        }),
        e.updateBound = null,
        e.scrollParents = [],
        e.scrollElement = null,
        e.eventsEnabled = !1,
        e))
    }
    function D(t) {
        return "" !== t && !isNaN(parseFloat(t)) && isFinite(t)
    }
    function k(t, e) {
        Object.keys(e).forEach(function(i) {
            var n = "";
            -1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(i) && D(e[i]) && (n = "px"),
            t.style[i] = e[i] + n
        })
    }
    function j(t, e, i) {
        var n = I(t, function(t) {
            return t.name === e
        })
          , o = !!n && t.some(function(t) {
            return t.name === i && t.enabled && t.order < n.order
        });
        if (!o) {
            var r = "`" + e + "`";
            console.warn("`" + i + "` modifier is required by " + r + " modifier in order to work, be sure to include it before " + r + "!")
        }
        return o
    }
    function A(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] && arguments[1]
          , i = V.indexOf(t)
          , n = V.slice(i + 1).concat(V.slice(0, i));
        return e ? n.reverse() : n
    }
    function O(t, e, i, n) {
        var o = [0, 0]
          , r = -1 !== ["right", "left"].indexOf(n)
          , s = t.split(/(\+|\-)/).map(function(t) {
            return t.trim()
        })
          , a = s.indexOf(I(s, function(t) {
            return -1 !== t.search(/,|\s/)
        }));
        s[a] && -1 === s[a].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
        var l = /\s*,\s*|\s+/
          , c = -1 === a ? [s] : [s.slice(0, a).concat([s[a].split(l)[0]]), [s[a].split(l)[1]].concat(s.slice(a + 1))];
        return (c = c.map(function(t, n) {
            var o = (1 === n ? !r : r) ? "height" : "width"
              , s = !1;
            return t.reduce(function(t, e) {
                return "" === t[t.length - 1] && -1 !== ["+", "-"].indexOf(e) ? (t[t.length - 1] = e,
                s = !0,
                t) : s ? (t[t.length - 1] += e,
                s = !1,
                t) : t.concat(e)
            }, []).map(function(t) {
                return function(t, e, i, n) {
                    var o = t.match(/((?:\-|\+)?\d*\.?\d*)(.*)/)
                      , r = +o[1]
                      , s = o[2];
                    if (!r)
                        return t;
                    if (0 === s.indexOf("%")) {
                        var a;
                        switch (s) {
                        case "%p":
                            a = i;
                            break;
                        case "%":
                        case "%r":
                        default:
                            a = n
                        }
                        return h(a)[e] / 100 * r
                    }
                    return "vh" === s || "vw" === s ? ("vh" === s ? R(document.documentElement.clientHeight, window.innerHeight || 0) : R(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * r : r
                }(t, o, e, i)
            })
        })).forEach(function(t, e) {
            t.forEach(function(i, n) {
                D(i) && (o[e] += i * ("-" === t[n - 1] ? -1 : 1))
            })
        }),
        o
    }
    for (var z = Math.min, P = Math.floor, R = Math.max, W = "undefined" != typeof window && "undefined" != typeof document, H = ["Edge", "Trident", "Firefox"], B = 0, F = 0; F < H.length; F += 1)
        if (W && 0 <= navigator.userAgent.indexOf(H[F])) {
            B = 1;
            break
        }
    var q, Q = W && window.Promise ? function(t) {
        var e = !1;
        return function() {
            e || (e = !0,
            window.Promise.resolve().then(function() {
                e = !1,
                t()
            }))
        }
    }
    : function(t) {
        var e = !1;
        return function() {
            e || (e = !0,
            setTimeout(function() {
                e = !1,
                t()
            }, B))
        }
    }
    , U = function() {
        return null == q && (q = -1 !== navigator.appVersion.indexOf("MSIE 10")),
        q
    }, Y = function(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }, Z = function() {
        function t(t, e) {
            for (var i, n = 0; n < e.length; n++)
                (i = e[n]).enumerable = i.enumerable || !1,
                i.configurable = !0,
                "value"in i && (i.writable = !0),
                Object.defineProperty(t, i.key, i)
        }
        return function(e, i, n) {
            return i && t(e.prototype, i),
            n && t(e, n),
            e
        }
    }(), G = function(t, e, i) {
        return e in t ? Object.defineProperty(t, e, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = i,
        t
    }, $ = Object.assign || function(t) {
        for (var e, i = 1; i < arguments.length; i++)
            for (var n in e = arguments[i])
                Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t
    }
    , X = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"], V = X.slice(3), J = "flip", K = "clockwise", tt = "counterclockwise", et = function() {
        function e(i, n) {
            var o = this
              , r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
            Y(this, e),
            this.scheduleUpdate = function() {
                return requestAnimationFrame(o.update)
            }
            ,
            this.update = Q(this.update.bind(this)),
            this.options = $({}, e.Defaults, r),
            this.state = {
                isDestroyed: !1,
                isCreated: !1,
                scrollParents: []
            },
            this.reference = i && i.jquery ? i[0] : i,
            this.popper = n && n.jquery ? n[0] : n,
            this.options.modifiers = {},
            Object.keys($({}, e.Defaults.modifiers, r.modifiers)).forEach(function(t) {
                o.options.modifiers[t] = $({}, e.Defaults.modifiers[t] || {}, r.modifiers ? r.modifiers[t] : {})
            }),
            this.modifiers = Object.keys(this.options.modifiers).map(function(t) {
                return $({
                    name: t
                }, o.options.modifiers[t])
            }).sort(function(t, e) {
                return t.order - e.order
            }),
            this.modifiers.forEach(function(e) {
                e.enabled && t(e.onLoad) && e.onLoad(o.reference, o.popper, o.options, e, o.state)
            }),
            this.update();
            var s = this.options.eventsEnabled;
            s && this.enableEventListeners(),
            this.state.eventsEnabled = s
        }
        return Z(e, [{
            key: "update",
            value: function() {
                return function() {
                    if (!this.state.isDestroyed) {
                        var t = {
                            instance: this,
                            styles: {},
                            arrowStyles: {},
                            attributes: {},
                            flipped: !1,
                            offsets: {}
                        };
                        t.offsets.reference = b(this.state, this.popper, this.reference),
                        t.placement = w(this.options.placement, t.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding),
                        t.originalPlacement = t.placement,
                        t.offsets.popper = C(this.popper, t.offsets.reference, t.placement),
                        t.offsets.popper.position = "absolute",
                        t = _(this.modifiers, t),
                        this.state.isCreated ? this.options.onUpdate(t) : (this.state.isCreated = !0,
                        this.options.onCreate(t))
                    }
                }
                .call(this)
            }
        }, {
            key: "destroy",
            value: function() {
                return function() {
                    return this.state.isDestroyed = !0,
                    T(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"),
                    this.popper.style.left = "",
                    this.popper.style.position = "",
                    this.popper.style.top = "",
                    this.popper.style[E("transform")] = ""),
                    this.disableEventListeners(),
                    this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper),
                    this
                }
                .call(this)
            }
        }, {
            key: "enableEventListeners",
            value: function() {
                return function() {
                    this.state.eventsEnabled || (this.state = M(this.reference, this.options, this.state, this.scheduleUpdate))
                }
                .call(this)
            }
        }, {
            key: "disableEventListeners",
            value: function() {
                return N.call(this)
            }
        }]),
        e
    }();
    return et.Utils = ("undefined" == typeof window ? global : window).PopperUtils,
    et.placements = X,
    et.Defaults = {
        placement: "bottom",
        eventsEnabled: !0,
        removeOnDestroy: !1,
        onCreate: function() {},
        onUpdate: function() {},
        modifiers: {
            shift: {
                order: 100,
                enabled: !0,
                fn: function(t) {
                    var e = t.placement
                      , i = e.split("-")[0]
                      , n = e.split("-")[1];
                    if (n) {
                        var o = t.offsets
                          , r = o.reference
                          , s = o.popper
                          , a = -1 !== ["bottom", "top"].indexOf(i)
                          , l = a ? "left" : "top"
                          , c = a ? "width" : "height"
                          , u = {
                            start: G({}, l, r[l]),
                            end: G({}, l, r[l] + r[c] - s[c])
                        };
                        t.offsets.popper = $({}, s, u[n])
                    }
                    return t
                }
            },
            offset: {
                order: 200,
                enabled: !0,
                fn: function(t, e) {
                    var i, n = e.offset, o = t.placement, r = t.offsets, s = r.popper, a = r.reference, l = o.split("-")[0];
                    return i = D(+n) ? [+n, 0] : O(n, s, a, l),
                    "left" === l ? (s.top += i[0],
                    s.left -= i[1]) : "right" === l ? (s.top += i[0],
                    s.left += i[1]) : "top" === l ? (s.left += i[0],
                    s.top -= i[1]) : "bottom" === l && (s.left += i[0],
                    s.top += i[1]),
                    t.popper = s,
                    t
                },
                offset: 0
            },
            preventOverflow: {
                order: 300,
                enabled: !0,
                fn: function(t, e) {
                    var i = e.boundariesElement || o(t.instance.popper);
                    t.instance.reference === i && (i = o(i));
                    var n = v(t.instance.popper, t.instance.reference, e.padding, i);
                    e.boundaries = n;
                    var r = e.priority
                      , s = t.offsets.popper
                      , a = {
                        primary: function(t) {
                            var i = s[t];
                            return s[t] < n[t] && !e.escapeWithReference && (i = R(s[t], n[t])),
                            G({}, t, i)
                        },
                        secondary: function(t) {
                            var i = "right" === t ? "left" : "top"
                              , o = s[i];
                            return s[t] > n[t] && !e.escapeWithReference && (o = z(s[i], n[t] - ("right" === t ? s.width : s.height))),
                            G({}, i, o)
                        }
                    };
                    return r.forEach(function(t) {
                        var e = -1 === ["left", "top"].indexOf(t) ? "secondary" : "primary";
                        s = $({}, s, a[e](t))
                    }),
                    t.offsets.popper = s,
                    t
                },
                priority: ["left", "right", "top", "bottom"],
                padding: 5,
                boundariesElement: "scrollParent"
            },
            keepTogether: {
                order: 400,
                enabled: !0,
                fn: function(t) {
                    var e = t.offsets
                      , i = e.popper
                      , n = e.reference
                      , o = t.placement.split("-")[0]
                      , r = P
                      , s = -1 !== ["top", "bottom"].indexOf(o)
                      , a = s ? "right" : "bottom"
                      , l = s ? "left" : "top"
                      , c = s ? "width" : "height";
                    return i[a] < r(n[l]) && (t.offsets.popper[l] = r(n[l]) - i[c]),
                    i[l] > r(n[a]) && (t.offsets.popper[l] = r(n[a])),
                    t
                }
            },
            arrow: {
                order: 500,
                enabled: !0,
                fn: function(t, i) {
                    var n;
                    if (!j(t.instance.modifiers, "arrow", "keepTogether"))
                        return t;
                    var o = i.element;
                    if ("string" == typeof o) {
                        if (!(o = t.instance.popper.querySelector(o)))
                            return t
                    } else if (!t.instance.popper.contains(o))
                        return console.warn("WARNING: `arrow.element` must be child of its popper element!"),
                        t;
                    var r = t.placement.split("-")[0]
                      , s = t.offsets
                      , a = s.popper
                      , l = s.reference
                      , c = -1 !== ["left", "right"].indexOf(r)
                      , u = c ? "height" : "width"
                      , d = c ? "Top" : "Left"
                      , f = d.toLowerCase()
                      , p = c ? "left" : "top"
                      , m = c ? "bottom" : "right"
                      , g = x(o)[u];
                    l[m] - g < a[f] && (t.offsets.popper[f] -= a[f] - (l[m] - g)),
                    l[f] + g > a[m] && (t.offsets.popper[f] += l[f] + g - a[m]),
                    t.offsets.popper = h(t.offsets.popper);
                    var v = l[f] + l[u] / 2 - g / 2
                      , y = e(t.instance.popper)
                      , w = parseFloat(y["margin" + d], 10)
                      , b = parseFloat(y["border" + d + "Width"], 10)
                      , S = v - t.offsets.popper[f] - w - b;
                    return S = R(z(a[u] - g, S), 0),
                    t.arrowElement = o,
                    t.offsets.arrow = (G(n = {}, f, Math.round(S)),
                    G(n, p, ""),
                    n),
                    t
                },
                element: "[x-arrow]"
            },
            flip: {
                order: 600,
                enabled: !0,
                fn: function(t, e) {
                    if (T(t.instance.modifiers, "inner"))
                        return t;
                    if (t.flipped && t.placement === t.originalPlacement)
                        return t;
                    var i = v(t.instance.popper, t.instance.reference, e.padding, e.boundariesElement)
                      , n = t.placement.split("-")[0]
                      , o = S(n)
                      , r = t.placement.split("-")[1] || ""
                      , s = [];
                    switch (e.behavior) {
                    case J:
                        s = [n, o];
                        break;
                    case K:
                        s = A(n);
                        break;
                    case tt:
                        s = A(n, !0);
                        break;
                    default:
                        s = e.behavior
                    }
                    return s.forEach(function(a, l) {
                        if (n !== a || s.length === l + 1)
                            return t;
                        n = t.placement.split("-")[0],
                        o = S(n);
                        var c = t.offsets.popper
                          , u = t.offsets.reference
                          , d = P
                          , h = "left" === n && d(c.right) > d(u.left) || "right" === n && d(c.left) < d(u.right) || "top" === n && d(c.bottom) > d(u.top) || "bottom" === n && d(c.top) < d(u.bottom)
                          , f = d(c.left) < d(i.left)
                          , p = d(c.right) > d(i.right)
                          , m = d(c.top) < d(i.top)
                          , g = d(c.bottom) > d(i.bottom)
                          , v = "left" === n && f || "right" === n && p || "top" === n && m || "bottom" === n && g
                          , y = -1 !== ["top", "bottom"].indexOf(n)
                          , w = !!e.flipVariations && (y && "start" === r && f || y && "end" === r && p || !y && "start" === r && m || !y && "end" === r && g);
                        (h || v || w) && (t.flipped = !0,
                        (h || v) && (n = s[l + 1]),
                        w && (r = function(t) {
                            return "end" === t ? "start" : "start" === t ? "end" : t
                        }(r)),
                        t.placement = n + (r ? "-" + r : ""),
                        t.offsets.popper = $({}, t.offsets.popper, C(t.instance.popper, t.offsets.reference, t.placement)),
                        t = _(t.instance.modifiers, t, "flip"))
                    }),
                    t
                },
                behavior: "flip",
                padding: 5,
                boundariesElement: "viewport"
            },
            inner: {
                order: 700,
                enabled: !1,
                fn: function(t) {
                    var e = t.placement
                      , i = e.split("-")[0]
                      , n = t.offsets
                      , o = n.popper
                      , r = n.reference
                      , s = -1 !== ["left", "right"].indexOf(i)
                      , a = -1 === ["top", "left"].indexOf(i);
                    return o[s ? "left" : "top"] = r[i] - (a ? o[s ? "width" : "height"] : 0),
                    t.placement = S(e),
                    t.offsets.popper = h(o),
                    t
                }
            },
            hide: {
                order: 800,
                enabled: !0,
                fn: function(t) {
                    if (!j(t.instance.modifiers, "hide", "preventOverflow"))
                        return t;
                    var e = t.offsets.reference
                      , i = I(t.instance.modifiers, function(t) {
                        return "preventOverflow" === t.name
                    }).boundaries;
                    if (e.bottom < i.top || e.left > i.right || e.top > i.bottom || e.right < i.left) {
                        if (!0 === t.hide)
                            return t;
                        t.hide = !0,
                        t.attributes["x-out-of-boundaries"] = ""
                    } else {
                        if (!1 === t.hide)
                            return t;
                        t.hide = !1,
                        t.attributes["x-out-of-boundaries"] = !1
                    }
                    return t
                }
            },
            computeStyle: {
                order: 850,
                enabled: !0,
                fn: function(t, e) {
                    var i = e.x
                      , n = e.y
                      , r = t.offsets.popper
                      , s = I(t.instance.modifiers, function(t) {
                        return "applyStyle" === t.name
                    }).gpuAcceleration;
                    void 0 !== s && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                    var a, l, c = void 0 === s ? e.gpuAcceleration : s, u = f(o(t.instance.popper)), d = {
                        position: r.position
                    }, h = {
                        left: P(r.left),
                        top: P(r.top),
                        bottom: P(r.bottom),
                        right: P(r.right)
                    }, p = "bottom" === i ? "top" : "bottom", m = "right" === n ? "left" : "right", g = E("transform");
                    if (l = "bottom" == p ? -u.height + h.bottom : h.top,
                    a = "right" == m ? -u.width + h.right : h.left,
                    c && g)
                        d[g] = "translate3d(" + a + "px, " + l + "px, 0)",
                        d[p] = 0,
                        d[m] = 0,
                        d.willChange = "transform";
                    else {
                        var v = "bottom" == p ? -1 : 1
                          , y = "right" == m ? -1 : 1;
                        d[p] = l * v,
                        d[m] = a * y,
                        d.willChange = p + ", " + m
                    }
                    var w = {
                        "x-placement": t.placement
                    };
                    return t.attributes = $({}, w, t.attributes),
                    t.styles = $({}, d, t.styles),
                    t.arrowStyles = $({}, t.offsets.arrow, t.arrowStyles),
                    t
                },
                gpuAcceleration: !0,
                x: "bottom",
                y: "right"
            },
            applyStyle: {
                order: 900,
                enabled: !0,
                fn: function(t) {
                    return k(t.instance.popper, t.styles),
                    function(t, e) {
                        Object.keys(e).forEach(function(i) {
                            !1 === e[i] ? t.removeAttribute(i) : t.setAttribute(i, e[i])
                        })
                    }(t.instance.popper, t.attributes),
                    t.arrowElement && Object.keys(t.arrowStyles).length && k(t.arrowElement, t.arrowStyles),
                    t
                },
                onLoad: function(t, e, i, n, o) {
                    var r = b(0, e, t)
                      , s = w(i.placement, r, e, t, i.modifiers.flip.boundariesElement, i.modifiers.flip.padding);
                    return e.setAttribute("x-placement", s),
                    k(e, {
                        position: "absolute"
                    }),
                    i
                },
                gpuAcceleration: void 0
            }
        }
    },
    et
}),
function(t, e) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? e(t, !0) : function(t) {
        if (!t.document)
            throw new Error("jQuery requires a window with a document");
        return e(t)
    }
    : e(t)
}("undefined" != typeof window ? window : this, function(t, e) {
    "use strict";
    var i = []
      , n = t.document
      , o = Object.getPrototypeOf
      , r = i.slice
      , s = i.concat
      , a = i.push
      , l = i.indexOf
      , c = {}
      , u = c.toString
      , d = c.hasOwnProperty
      , h = d.toString
      , f = h.call(Object)
      , p = {}
      , m = function(t) {
        return "function" == typeof t && "number" != typeof t.nodeType
    }
      , g = function(t) {
        return null != t && t === t.window
    }
      , v = {
        type: !0,
        src: !0,
        nonce: !0,
        noModule: !0
    };
    function y(t, e, i) {
        var o, r, s = (i = i || n).createElement("script");
        if (s.text = t,
        e)
            for (o in v)
                (r = e[o] || e.getAttribute && e.getAttribute(o)) && s.setAttribute(o, r);
        i.head.appendChild(s).parentNode.removeChild(s)
    }
    function w(t) {
        return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? c[u.call(t)] || "object" : typeof t
    }
    var b = "3.4.1"
      , x = function(t, e) {
        return new x.fn.init(t,e)
    }
      , S = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    function C(t) {
        var e = !!t && "length"in t && t.length
          , i = w(t);
        return !m(t) && !g(t) && ("array" === i || 0 === e || "number" == typeof e && 0 < e && e - 1 in t)
    }
    x.fn = x.prototype = {
        jquery: b,
        constructor: x,
        length: 0,
        toArray: function() {
            return r.call(this)
        },
        get: function(t) {
            return null == t ? r.call(this) : t < 0 ? this[t + this.length] : this[t]
        },
        pushStack: function(t) {
            var e = x.merge(this.constructor(), t);
            return e.prevObject = this,
            e
        },
        each: function(t) {
            return x.each(this, t)
        },
        map: function(t) {
            return this.pushStack(x.map(this, function(e, i) {
                return t.call(e, i, e)
            }))
        },
        slice: function() {
            return this.pushStack(r.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(t) {
            var e = this.length
              , i = +t + (t < 0 ? e : 0);
            return this.pushStack(0 <= i && i < e ? [this[i]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: a,
        sort: i.sort,
        splice: i.splice
    },
    x.extend = x.fn.extend = function() {
        var t, e, i, n, o, r, s = arguments[0] || {}, a = 1, l = arguments.length, c = !1;
        for ("boolean" == typeof s && (c = s,
        s = arguments[a] || {},
        a++),
        "object" == typeof s || m(s) || (s = {}),
        a === l && (s = this,
        a--); a < l; a++)
            if (null != (t = arguments[a]))
                for (e in t)
                    n = t[e],
                    "__proto__" !== e && s !== n && (c && n && (x.isPlainObject(n) || (o = Array.isArray(n))) ? (i = s[e],
                    r = o && !Array.isArray(i) ? [] : o || x.isPlainObject(i) ? i : {},
                    o = !1,
                    s[e] = x.extend(c, r, n)) : void 0 !== n && (s[e] = n));
        return s
    }
    ,
    x.extend({
        expando: "jQuery" + (b + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(t) {
            throw new Error(t)
        },
        noop: function() {},
        isPlainObject: function(t) {
            var e, i;
            return !(!t || "[object Object]" !== u.call(t) || (e = o(t)) && ("function" != typeof (i = d.call(e, "constructor") && e.constructor) || h.call(i) !== f))
        },
        isEmptyObject: function(t) {
            var e;
            for (e in t)
                return !1;
            return !0
        },
        globalEval: function(t, e) {
            y(t, {
                nonce: e && e.nonce
            })
        },
        each: function(t, e) {
            var i, n = 0;
            if (C(t))
                for (i = t.length; n < i && !1 !== e.call(t[n], n, t[n]); n++)
                    ;
            else
                for (n in t)
                    if (!1 === e.call(t[n], n, t[n]))
                        break;
            return t
        },
        trim: function(t) {
            return null == t ? "" : (t + "").replace(S, "")
        },
        makeArray: function(t, e) {
            var i = e || [];
            return null != t && (C(Object(t)) ? x.merge(i, "string" == typeof t ? [t] : t) : a.call(i, t)),
            i
        },
        inArray: function(t, e, i) {
            return null == e ? -1 : l.call(e, t, i)
        },
        merge: function(t, e) {
            for (var i = +e.length, n = 0, o = t.length; n < i; n++)
                t[o++] = e[n];
            return t.length = o,
            t
        },
        grep: function(t, e, i) {
            for (var n = [], o = 0, r = t.length, s = !i; o < r; o++)
                !e(t[o], o) !== s && n.push(t[o]);
            return n
        },
        map: function(t, e, i) {
            var n, o, r = 0, a = [];
            if (C(t))
                for (n = t.length; r < n; r++)
                    null != (o = e(t[r], r, i)) && a.push(o);
            else
                for (r in t)
                    null != (o = e(t[r], r, i)) && a.push(o);
            return s.apply([], a)
        },
        guid: 1,
        support: p
    }),
    "function" == typeof Symbol && (x.fn[Symbol.iterator] = i[Symbol.iterator]),
    x.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(t, e) {
        c["[object " + e + "]"] = e.toLowerCase()
    });
    var I = function(t) {
        var e, i, n, o, r, s, a, l, c, u, d, h, f, p, m, g, v, y, w, b = "sizzle" + 1 * new Date, x = t.document, S = 0, C = 0, I = lt(), _ = lt(), T = lt(), E = lt(), L = function(t, e) {
            return t === e && (d = !0),
            0
        }, M = {}.hasOwnProperty, N = [], D = N.pop, k = N.push, j = N.push, A = N.slice, O = function(t, e) {
            for (var i = 0, n = t.length; i < n; i++)
                if (t[i] === e)
                    return i;
            return -1
        }, z = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", P = "[\\x20\\t\\r\\n\\f]", R = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+", W = "\\[" + P + "*(" + R + ")(?:" + P + "*([*^$|!~]?=)" + P + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + R + "))|)" + P + "*\\]", H = ":(" + R + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + W + ")*)|.*)\\)|)", B = new RegExp(P + "+","g"), F = new RegExp("^" + P + "+|((?:^|[^\\\\])(?:\\\\.)*)" + P + "+$","g"), q = new RegExp("^" + P + "*," + P + "*"), Q = new RegExp("^" + P + "*([>+~]|" + P + ")" + P + "*"), U = new RegExp(P + "|>"), Y = new RegExp(H), Z = new RegExp("^" + R + "$"), G = {
            ID: new RegExp("^#(" + R + ")"),
            CLASS: new RegExp("^\\.(" + R + ")"),
            TAG: new RegExp("^(" + R + "|[*])"),
            ATTR: new RegExp("^" + W),
            PSEUDO: new RegExp("^" + H),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + P + "*(even|odd|(([+-]|)(\\d*)n|)" + P + "*(?:([+-]|)" + P + "*(\\d+)|))" + P + "*\\)|)","i"),
            bool: new RegExp("^(?:" + z + ")$","i"),
            needsContext: new RegExp("^" + P + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + P + "*((?:-\\d)?\\d*)" + P + "*\\)|)(?=[^-]|$)","i")
        }, $ = /HTML$/i, X = /^(?:input|select|textarea|button)$/i, V = /^h\d$/i, J = /^[^{]+\{\s*\[native \w/, K = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, tt = /[+~]/, et = new RegExp("\\\\([\\da-f]{1,6}" + P + "?|(" + P + ")|.)","ig"), it = function(t, e, i) {
            var n = "0x" + e - 65536;
            return n != n || i ? e : n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
        }, nt = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, ot = function(t, e) {
            return e ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t
        }, rt = function() {
            h()
        }, st = bt(function(t) {
            return !0 === t.disabled && "fieldset" === t.nodeName.toLowerCase()
        }, {
            dir: "parentNode",
            next: "legend"
        });
        try {
            j.apply(N = A.call(x.childNodes), x.childNodes),
            N[x.childNodes.length].nodeType
        } catch (e) {
            j = {
                apply: N.length ? function(t, e) {
                    k.apply(t, A.call(e))
                }
                : function(t, e) {
                    for (var i = t.length, n = 0; t[i++] = e[n++]; )
                        ;
                    t.length = i - 1
                }
            }
        }
        function at(t, e, n, o) {
            var r, a, c, u, d, p, v, y = e && e.ownerDocument, S = e ? e.nodeType : 9;
            if (n = n || [],
            "string" != typeof t || !t || 1 !== S && 9 !== S && 11 !== S)
                return n;
            if (!o && ((e ? e.ownerDocument || e : x) !== f && h(e),
            e = e || f,
            m)) {
                if (11 !== S && (d = K.exec(t)))
                    if (r = d[1]) {
                        if (9 === S) {
                            if (!(c = e.getElementById(r)))
                                return n;
                            if (c.id === r)
                                return n.push(c),
                                n
                        } else if (y && (c = y.getElementById(r)) && w(e, c) && c.id === r)
                            return n.push(c),
                            n
                    } else {
                        if (d[2])
                            return j.apply(n, e.getElementsByTagName(t)),
                            n;
                        if ((r = d[3]) && i.getElementsByClassName && e.getElementsByClassName)
                            return j.apply(n, e.getElementsByClassName(r)),
                            n
                    }
                if (i.qsa && !E[t + " "] && (!g || !g.test(t)) && (1 !== S || "object" !== e.nodeName.toLowerCase())) {
                    if (v = t,
                    y = e,
                    1 === S && U.test(t)) {
                        for ((u = e.getAttribute("id")) ? u = u.replace(nt, ot) : e.setAttribute("id", u = b),
                        a = (p = s(t)).length; a--; )
                            p[a] = "#" + u + " " + wt(p[a]);
                        v = p.join(","),
                        y = tt.test(t) && vt(e.parentNode) || e
                    }
                    try {
                        return j.apply(n, y.querySelectorAll(v)),
                        n
                    } catch (e) {
                        E(t, !0)
                    } finally {
                        u === b && e.removeAttribute("id")
                    }
                }
            }
            return l(t.replace(F, "$1"), e, n, o)
        }
        function lt() {
            var t = [];
            return function e(i, o) {
                return t.push(i + " ") > n.cacheLength && delete e[t.shift()],
                e[i + " "] = o
            }
        }
        function ct(t) {
            return t[b] = !0,
            t
        }
        function ut(t) {
            var e = f.createElement("fieldset");
            try {
                return !!t(e)
            } catch (t) {
                return !1
            } finally {
                e.parentNode && e.parentNode.removeChild(e),
                e = null
            }
        }
        function dt(t, e) {
            for (var i = t.split("|"), o = i.length; o--; )
                n.attrHandle[i[o]] = e
        }
        function ht(t, e) {
            var i = e && t
              , n = i && 1 === t.nodeType && 1 === e.nodeType && t.sourceIndex - e.sourceIndex;
            if (n)
                return n;
            if (i)
                for (; i = i.nextSibling; )
                    if (i === e)
                        return -1;
            return t ? 1 : -1
        }
        function ft(t) {
            return function(e) {
                return "input" === e.nodeName.toLowerCase() && e.type === t
            }
        }
        function pt(t) {
            return function(e) {
                var i = e.nodeName.toLowerCase();
                return ("input" === i || "button" === i) && e.type === t
            }
        }
        function mt(t) {
            return function(e) {
                return "form"in e ? e.parentNode && !1 === e.disabled ? "label"in e ? "label"in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && st(e) === t : e.disabled === t : "label"in e && e.disabled === t
            }
        }
        function gt(t) {
            return ct(function(e) {
                return e = +e,
                ct(function(i, n) {
                    for (var o, r = t([], i.length, e), s = r.length; s--; )
                        i[o = r[s]] && (i[o] = !(n[o] = i[o]))
                })
            })
        }
        function vt(t) {
            return t && void 0 !== t.getElementsByTagName && t
        }
        for (e in i = at.support = {},
        r = at.isXML = function(t) {
            var e = t.namespaceURI
              , i = (t.ownerDocument || t).documentElement;
            return !$.test(e || i && i.nodeName || "HTML")
        }
        ,
        h = at.setDocument = function(t) {
            var e, o, s = t ? t.ownerDocument || t : x;
            return s !== f && 9 === s.nodeType && s.documentElement && (p = (f = s).documentElement,
            m = !r(f),
            x !== f && (o = f.defaultView) && o.top !== o && (o.addEventListener ? o.addEventListener("unload", rt, !1) : o.attachEvent && o.attachEvent("onunload", rt)),
            i.attributes = ut(function(t) {
                return t.className = "i",
                !t.getAttribute("className")
            }),
            i.getElementsByTagName = ut(function(t) {
                return t.appendChild(f.createComment("")),
                !t.getElementsByTagName("*").length
            }),
            i.getElementsByClassName = J.test(f.getElementsByClassName),
            i.getById = ut(function(t) {
                return p.appendChild(t).id = b,
                !f.getElementsByName || !f.getElementsByName(b).length
            }),
            i.getById ? (n.filter.ID = function(t) {
                var e = t.replace(et, it);
                return function(t) {
                    return t.getAttribute("id") === e
                }
            }
            ,
            n.find.ID = function(t, e) {
                if (void 0 !== e.getElementById && m) {
                    var i = e.getElementById(t);
                    return i ? [i] : []
                }
            }
            ) : (n.filter.ID = function(t) {
                var e = t.replace(et, it);
                return function(t) {
                    var i = void 0 !== t.getAttributeNode && t.getAttributeNode("id");
                    return i && i.value === e
                }
            }
            ,
            n.find.ID = function(t, e) {
                if (void 0 !== e.getElementById && m) {
                    var i, n, o, r = e.getElementById(t);
                    if (r) {
                        if ((i = r.getAttributeNode("id")) && i.value === t)
                            return [r];
                        for (o = e.getElementsByName(t),
                        n = 0; r = o[n++]; )
                            if ((i = r.getAttributeNode("id")) && i.value === t)
                                return [r]
                    }
                    return []
                }
            }
            ),
            n.find.TAG = i.getElementsByTagName ? function(t, e) {
                return void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t) : i.qsa ? e.querySelectorAll(t) : void 0
            }
            : function(t, e) {
                var i, n = [], o = 0, r = e.getElementsByTagName(t);
                if ("*" === t) {
                    for (; i = r[o++]; )
                        1 === i.nodeType && n.push(i);
                    return n
                }
                return r
            }
            ,
            n.find.CLASS = i.getElementsByClassName && function(t, e) {
                if (void 0 !== e.getElementsByClassName && m)
                    return e.getElementsByClassName(t)
            }
            ,
            v = [],
            g = [],
            (i.qsa = J.test(f.querySelectorAll)) && (ut(function(t) {
                p.appendChild(t).innerHTML = "<a id='" + b + "'></a><select id='" + b + "-\r\\' msallowcapture=''><option selected=''></option></select>",
                t.querySelectorAll("[msallowcapture^='']").length && g.push("[*^$]=" + P + "*(?:''|\"\")"),
                t.querySelectorAll("[selected]").length || g.push("\\[" + P + "*(?:value|" + z + ")"),
                t.querySelectorAll("[id~=" + b + "-]").length || g.push("~="),
                t.querySelectorAll(":checked").length || g.push(":checked"),
                t.querySelectorAll("a#" + b + "+*").length || g.push(".#.+[+~]")
            }),
            ut(function(t) {
                t.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var e = f.createElement("input");
                e.setAttribute("type", "hidden"),
                t.appendChild(e).setAttribute("name", "D"),
                t.querySelectorAll("[name=d]").length && g.push("name" + P + "*[*^$|!~]?="),
                2 !== t.querySelectorAll(":enabled").length && g.push(":enabled", ":disabled"),
                p.appendChild(t).disabled = !0,
                2 !== t.querySelectorAll(":disabled").length && g.push(":enabled", ":disabled"),
                t.querySelectorAll("*,:x"),
                g.push(",.*:")
            })),
            (i.matchesSelector = J.test(y = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.oMatchesSelector || p.msMatchesSelector)) && ut(function(t) {
                i.disconnectedMatch = y.call(t, "*"),
                y.call(t, "[s!='']:x"),
                v.push("!=", H)
            }),
            g = g.length && new RegExp(g.join("|")),
            v = v.length && new RegExp(v.join("|")),
            e = J.test(p.compareDocumentPosition),
            w = e || J.test(p.contains) ? function(t, e) {
                var i = 9 === t.nodeType ? t.documentElement : t
                  , n = e && e.parentNode;
                return t === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(n)))
            }
            : function(t, e) {
                if (e)
                    for (; e = e.parentNode; )
                        if (e === t)
                            return !0;
                return !1
            }
            ,
            L = e ? function(t, e) {
                if (t === e)
                    return d = !0,
                    0;
                var n = !t.compareDocumentPosition - !e.compareDocumentPosition;
                return n || (1 & (n = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1) || !i.sortDetached && e.compareDocumentPosition(t) === n ? t === f || t.ownerDocument === x && w(x, t) ? -1 : e === f || e.ownerDocument === x && w(x, e) ? 1 : u ? O(u, t) - O(u, e) : 0 : 4 & n ? -1 : 1)
            }
            : function(t, e) {
                if (t === e)
                    return d = !0,
                    0;
                var i, n = 0, o = t.parentNode, r = e.parentNode, s = [t], a = [e];
                if (!o || !r)
                    return t === f ? -1 : e === f ? 1 : o ? -1 : r ? 1 : u ? O(u, t) - O(u, e) : 0;
                if (o === r)
                    return ht(t, e);
                for (i = t; i = i.parentNode; )
                    s.unshift(i);
                for (i = e; i = i.parentNode; )
                    a.unshift(i);
                for (; s[n] === a[n]; )
                    n++;
                return n ? ht(s[n], a[n]) : s[n] === x ? -1 : a[n] === x ? 1 : 0
            }
            ),
            f
        }
        ,
        at.matches = function(t, e) {
            return at(t, null, null, e)
        }
        ,
        at.matchesSelector = function(t, e) {
            if ((t.ownerDocument || t) !== f && h(t),
            i.matchesSelector && m && !E[e + " "] && (!v || !v.test(e)) && (!g || !g.test(e)))
                try {
                    var n = y.call(t, e);
                    if (n || i.disconnectedMatch || t.document && 11 !== t.document.nodeType)
                        return n
                } catch (t) {
                    E(e, !0)
                }
            return 0 < at(e, f, null, [t]).length
        }
        ,
        at.contains = function(t, e) {
            return (t.ownerDocument || t) !== f && h(t),
            w(t, e)
        }
        ,
        at.attr = function(t, e) {
            (t.ownerDocument || t) !== f && h(t);
            var o = n.attrHandle[e.toLowerCase()]
              , r = o && M.call(n.attrHandle, e.toLowerCase()) ? o(t, e, !m) : void 0;
            return void 0 !== r ? r : i.attributes || !m ? t.getAttribute(e) : (r = t.getAttributeNode(e)) && r.specified ? r.value : null
        }
        ,
        at.escape = function(t) {
            return (t + "").replace(nt, ot)
        }
        ,
        at.error = function(t) {
            throw new Error("Syntax error, unrecognized expression: " + t)
        }
        ,
        at.uniqueSort = function(t) {
            var e, n = [], o = 0, r = 0;
            if (d = !i.detectDuplicates,
            u = !i.sortStable && t.slice(0),
            t.sort(L),
            d) {
                for (; e = t[r++]; )
                    e === t[r] && (o = n.push(r));
                for (; o--; )
                    t.splice(n[o], 1)
            }
            return u = null,
            t
        }
        ,
        o = at.getText = function(t) {
            var e, i = "", n = 0, r = t.nodeType;
            if (r) {
                if (1 === r || 9 === r || 11 === r) {
                    if ("string" == typeof t.textContent)
                        return t.textContent;
                    for (t = t.firstChild; t; t = t.nextSibling)
                        i += o(t)
                } else if (3 === r || 4 === r)
                    return t.nodeValue
            } else
                for (; e = t[n++]; )
                    i += o(e);
            return i
        }
        ,
        (n = at.selectors = {
            cacheLength: 50,
            createPseudo: ct,
            match: G,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(t) {
                    return t[1] = t[1].replace(et, it),
                    t[3] = (t[3] || t[4] || t[5] || "").replace(et, it),
                    "~=" === t[2] && (t[3] = " " + t[3] + " "),
                    t.slice(0, 4)
                },
                CHILD: function(t) {
                    return t[1] = t[1].toLowerCase(),
                    "nth" === t[1].slice(0, 3) ? (t[3] || at.error(t[0]),
                    t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])),
                    t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && at.error(t[0]),
                    t
                },
                PSEUDO: function(t) {
                    var e, i = !t[6] && t[2];
                    return G.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : i && Y.test(i) && (e = s(i, !0)) && (e = i.indexOf(")", i.length - e) - i.length) && (t[0] = t[0].slice(0, e),
                    t[2] = i.slice(0, e)),
                    t.slice(0, 3))
                }
            },
            filter: {
                TAG: function(t) {
                    var e = t.replace(et, it).toLowerCase();
                    return "*" === t ? function() {
                        return !0
                    }
                    : function(t) {
                        return t.nodeName && t.nodeName.toLowerCase() === e
                    }
                },
                CLASS: function(t) {
                    var e = I[t + " "];
                    return e || (e = new RegExp("(^|" + P + ")" + t + "(" + P + "|$)")) && I(t, function(t) {
                        return e.test("string" == typeof t.className && t.className || void 0 !== t.getAttribute && t.getAttribute("class") || "")
                    })
                },
                ATTR: function(t, e, i) {
                    return function(n) {
                        var o = at.attr(n, t);
                        return null == o ? "!=" === e : !e || (o += "",
                        "=" === e ? o === i : "!=" === e ? o !== i : "^=" === e ? i && 0 === o.indexOf(i) : "*=" === e ? i && -1 < o.indexOf(i) : "$=" === e ? i && o.slice(-i.length) === i : "~=" === e ? -1 < (" " + o.replace(B, " ") + " ").indexOf(i) : "|=" === e && (o === i || o.slice(0, i.length + 1) === i + "-"))
                    }
                },
                CHILD: function(t, e, i, n, o) {
                    var r = "nth" !== t.slice(0, 3)
                      , s = "last" !== t.slice(-4)
                      , a = "of-type" === e;
                    return 1 === n && 0 === o ? function(t) {
                        return !!t.parentNode
                    }
                    : function(e, i, l) {
                        var c, u, d, h, f, p, m = r !== s ? "nextSibling" : "previousSibling", g = e.parentNode, v = a && e.nodeName.toLowerCase(), y = !l && !a, w = !1;
                        if (g) {
                            if (r) {
                                for (; m; ) {
                                    for (h = e; h = h[m]; )
                                        if (a ? h.nodeName.toLowerCase() === v : 1 === h.nodeType)
                                            return !1;
                                    p = m = "only" === t && !p && "nextSibling"
                                }
                                return !0
                            }
                            if (p = [s ? g.firstChild : g.lastChild],
                            s && y) {
                                for (w = (f = (c = (u = (d = (h = g)[b] || (h[b] = {}))[h.uniqueID] || (d[h.uniqueID] = {}))[t] || [])[0] === S && c[1]) && c[2],
                                h = f && g.childNodes[f]; h = ++f && h && h[m] || (w = f = 0) || p.pop(); )
                                    if (1 === h.nodeType && ++w && h === e) {
                                        u[t] = [S, f, w];
                                        break
                                    }
                            } else if (y && (w = f = (c = (u = (d = (h = e)[b] || (h[b] = {}))[h.uniqueID] || (d[h.uniqueID] = {}))[t] || [])[0] === S && c[1]),
                            !1 === w)
                                for (; (h = ++f && h && h[m] || (w = f = 0) || p.pop()) && ((a ? h.nodeName.toLowerCase() !== v : 1 !== h.nodeType) || !++w || (y && ((u = (d = h[b] || (h[b] = {}))[h.uniqueID] || (d[h.uniqueID] = {}))[t] = [S, w]),
                                h !== e)); )
                                    ;
                            return (w -= o) === n || w % n == 0 && 0 <= w / n
                        }
                    }
                },
                PSEUDO: function(t, e) {
                    var i, o = n.pseudos[t] || n.setFilters[t.toLowerCase()] || at.error("unsupported pseudo: " + t);
                    return o[b] ? o(e) : 1 < o.length ? (i = [t, t, "", e],
                    n.setFilters.hasOwnProperty(t.toLowerCase()) ? ct(function(t, i) {
                        for (var n, r = o(t, e), s = r.length; s--; )
                            t[n = O(t, r[s])] = !(i[n] = r[s])
                    }) : function(t) {
                        return o(t, 0, i)
                    }
                    ) : o
                }
            },
            pseudos: {
                not: ct(function(t) {
                    var e = []
                      , i = []
                      , n = a(t.replace(F, "$1"));
                    return n[b] ? ct(function(t, e, i, o) {
                        for (var r, s = n(t, null, o, []), a = t.length; a--; )
                            (r = s[a]) && (t[a] = !(e[a] = r))
                    }) : function(t, o, r) {
                        return e[0] = t,
                        n(e, null, r, i),
                        e[0] = null,
                        !i.pop()
                    }
                }),
                has: ct(function(t) {
                    return function(e) {
                        return 0 < at(t, e).length
                    }
                }),
                contains: ct(function(t) {
                    return t = t.replace(et, it),
                    function(e) {
                        return -1 < (e.textContent || o(e)).indexOf(t)
                    }
                }),
                lang: ct(function(t) {
                    return Z.test(t || "") || at.error("unsupported lang: " + t),
                    t = t.replace(et, it).toLowerCase(),
                    function(e) {
                        var i;
                        do {
                            if (i = m ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang"))
                                return (i = i.toLowerCase()) === t || 0 === i.indexOf(t + "-")
                        } while ((e = e.parentNode) && 1 === e.nodeType);
                        return !1
                    }
                }),
                target: function(e) {
                    var i = t.location && t.location.hash;
                    return i && i.slice(1) === e.id
                },
                root: function(t) {
                    return t === p
                },
                focus: function(t) {
                    return t === f.activeElement && (!f.hasFocus || f.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                },
                enabled: mt(!1),
                disabled: mt(!0),
                checked: function(t) {
                    var e = t.nodeName.toLowerCase();
                    return "input" === e && !!t.checked || "option" === e && !!t.selected
                },
                selected: function(t) {
                    return t.parentNode && t.parentNode.selectedIndex,
                    !0 === t.selected
                },
                empty: function(t) {
                    for (t = t.firstChild; t; t = t.nextSibling)
                        if (t.nodeType < 6)
                            return !1;
                    return !0
                },
                parent: function(t) {
                    return !n.pseudos.empty(t)
                },
                header: function(t) {
                    return V.test(t.nodeName)
                },
                input: function(t) {
                    return X.test(t.nodeName)
                },
                button: function(t) {
                    var e = t.nodeName.toLowerCase();
                    return "input" === e && "button" === t.type || "button" === e
                },
                text: function(t) {
                    var e;
                    return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                },
                first: gt(function() {
                    return [0]
                }),
                last: gt(function(t, e) {
                    return [e - 1]
                }),
                eq: gt(function(t, e, i) {
                    return [i < 0 ? i + e : i]
                }),
                even: gt(function(t, e) {
                    for (var i = 0; i < e; i += 2)
                        t.push(i);
                    return t
                }),
                odd: gt(function(t, e) {
                    for (var i = 1; i < e; i += 2)
                        t.push(i);
                    return t
                }),
                lt: gt(function(t, e, i) {
                    for (var n = i < 0 ? i + e : e < i ? e : i; 0 <= --n; )
                        t.push(n);
                    return t
                }),
                gt: gt(function(t, e, i) {
                    for (var n = i < 0 ? i + e : i; ++n < e; )
                        t.push(n);
                    return t
                })
            }
        }).pseudos.nth = n.pseudos.eq,
        {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        })
            n.pseudos[e] = ft(e);
        for (e in {
            submit: !0,
            reset: !0
        })
            n.pseudos[e] = pt(e);
        function yt() {}
        function wt(t) {
            for (var e = 0, i = t.length, n = ""; e < i; e++)
                n += t[e].value;
            return n
        }
        function bt(t, e, i) {
            var n = e.dir
              , o = e.next
              , r = o || n
              , s = i && "parentNode" === r
              , a = C++;
            return e.first ? function(e, i, o) {
                for (; e = e[n]; )
                    if (1 === e.nodeType || s)
                        return t(e, i, o);
                return !1
            }
            : function(e, i, l) {
                var c, u, d, h = [S, a];
                if (l) {
                    for (; e = e[n]; )
                        if ((1 === e.nodeType || s) && t(e, i, l))
                            return !0
                } else
                    for (; e = e[n]; )
                        if (1 === e.nodeType || s)
                            if (u = (d = e[b] || (e[b] = {}))[e.uniqueID] || (d[e.uniqueID] = {}),
                            o && o === e.nodeName.toLowerCase())
                                e = e[n] || e;
                            else {
                                if ((c = u[r]) && c[0] === S && c[1] === a)
                                    return h[2] = c[2];
                                if ((u[r] = h)[2] = t(e, i, l))
                                    return !0
                            }
                return !1
            }
        }
        function xt(t) {
            return 1 < t.length ? function(e, i, n) {
                for (var o = t.length; o--; )
                    if (!t[o](e, i, n))
                        return !1;
                return !0
            }
            : t[0]
        }
        function St(t, e, i, n, o) {
            for (var r, s = [], a = 0, l = t.length, c = null != e; a < l; a++)
                (r = t[a]) && (i && !i(r, n, o) || (s.push(r),
                c && e.push(a)));
            return s
        }
        function Ct(t, e, i, n, o, r) {
            return n && !n[b] && (n = Ct(n)),
            o && !o[b] && (o = Ct(o, r)),
            ct(function(r, s, a, l) {
                var c, u, d, h = [], f = [], p = s.length, m = r || function(t, e, i) {
                    for (var n = 0, o = e.length; n < o; n++)
                        at(t, e[n], i);
                    return i
                }(e || "*", a.nodeType ? [a] : a, []), g = !t || !r && e ? m : St(m, h, t, a, l), v = i ? o || (r ? t : p || n) ? [] : s : g;
                if (i && i(g, v, a, l),
                n)
                    for (c = St(v, f),
                    n(c, [], a, l),
                    u = c.length; u--; )
                        (d = c[u]) && (v[f[u]] = !(g[f[u]] = d));
                if (r) {
                    if (o || t) {
                        if (o) {
                            for (c = [],
                            u = v.length; u--; )
                                (d = v[u]) && c.push(g[u] = d);
                            o(null, v = [], c, l)
                        }
                        for (u = v.length; u--; )
                            (d = v[u]) && -1 < (c = o ? O(r, d) : h[u]) && (r[c] = !(s[c] = d))
                    }
                } else
                    v = St(v === s ? v.splice(p, v.length) : v),
                    o ? o(null, s, v, l) : j.apply(s, v)
            })
        }
        function It(t) {
            for (var e, i, o, r = t.length, s = n.relative[t[0].type], a = s || n.relative[" "], l = s ? 1 : 0, u = bt(function(t) {
                return t === e
            }, a, !0), d = bt(function(t) {
                return -1 < O(e, t)
            }, a, !0), h = [function(t, i, n) {
                var o = !s && (n || i !== c) || ((e = i).nodeType ? u(t, i, n) : d(t, i, n));
                return e = null,
                o
            }
            ]; l < r; l++)
                if (i = n.relative[t[l].type])
                    h = [bt(xt(h), i)];
                else {
                    if ((i = n.filter[t[l].type].apply(null, t[l].matches))[b]) {
                        for (o = ++l; o < r && !n.relative[t[o].type]; o++)
                            ;
                        return Ct(1 < l && xt(h), 1 < l && wt(t.slice(0, l - 1).concat({
                            value: " " === t[l - 2].type ? "*" : ""
                        })).replace(F, "$1"), i, l < o && It(t.slice(l, o)), o < r && It(t = t.slice(o)), o < r && wt(t))
                    }
                    h.push(i)
                }
            return xt(h)
        }
        return yt.prototype = n.filters = n.pseudos,
        n.setFilters = new yt,
        s = at.tokenize = function(t, e) {
            var i, o, r, s, a, l, c, u = _[t + " "];
            if (u)
                return e ? 0 : u.slice(0);
            for (a = t,
            l = [],
            c = n.preFilter; a; ) {
                for (s in i && !(o = q.exec(a)) || (o && (a = a.slice(o[0].length) || a),
                l.push(r = [])),
                i = !1,
                (o = Q.exec(a)) && (i = o.shift(),
                r.push({
                    value: i,
                    type: o[0].replace(F, " ")
                }),
                a = a.slice(i.length)),
                n.filter)
                    !(o = G[s].exec(a)) || c[s] && !(o = c[s](o)) || (i = o.shift(),
                    r.push({
                        value: i,
                        type: s,
                        matches: o
                    }),
                    a = a.slice(i.length));
                if (!i)
                    break
            }
            return e ? a.length : a ? at.error(t) : _(t, l).slice(0)
        }
        ,
        a = at.compile = function(t, e) {
            var i, o, r, a, l, u, d = [], p = [], g = T[t + " "];
            if (!g) {
                for (e || (e = s(t)),
                i = e.length; i--; )
                    (g = It(e[i]))[b] ? d.push(g) : p.push(g);
                (g = T(t, (o = p,
                a = 0 < (r = d).length,
                l = 0 < o.length,
                u = function(t, e, i, s, u) {
                    var d, p, g, v = 0, y = "0", w = t && [], b = [], x = c, C = t || l && n.find.TAG("*", u), I = S += null == x ? 1 : Math.random() || .1, _ = C.length;
                    for (u && (c = e === f || e || u); y !== _ && null != (d = C[y]); y++) {
                        if (l && d) {
                            for (p = 0,
                            e || d.ownerDocument === f || (h(d),
                            i = !m); g = o[p++]; )
                                if (g(d, e || f, i)) {
                                    s.push(d);
                                    break
                                }
                            u && (S = I)
                        }
                        a && ((d = !g && d) && v--,
                        t && w.push(d))
                    }
                    if (v += y,
                    a && y !== v) {
                        for (p = 0; g = r[p++]; )
                            g(w, b, e, i);
                        if (t) {
                            if (0 < v)
                                for (; y--; )
                                    w[y] || b[y] || (b[y] = D.call(s));
                            b = St(b)
                        }
                        j.apply(s, b),
                        u && !t && 0 < b.length && 1 < v + r.length && at.uniqueSort(s)
                    }
                    return u && (S = I,
                    c = x),
                    w
                }
                ,
                a ? ct(u) : u))).selector = t
            }
            return g
        }
        ,
        l = at.select = function(t, e, i, o) {
            var r, l, c, u, d, h = "function" == typeof t && t, f = !o && s(t = h.selector || t);
            if (i = i || [],
            1 === f.length) {
                if (2 < (l = f[0] = f[0].slice(0)).length && "ID" === (c = l[0]).type && 9 === e.nodeType && m && n.relative[l[1].type]) {
                    if (!(e = (n.find.ID(c.matches[0].replace(et, it), e) || [])[0]))
                        return i;
                    h && (e = e.parentNode),
                    t = t.slice(l.shift().value.length)
                }
                for (r = G.needsContext.test(t) ? 0 : l.length; r-- && (c = l[r],
                !n.relative[u = c.type]); )
                    if ((d = n.find[u]) && (o = d(c.matches[0].replace(et, it), tt.test(l[0].type) && vt(e.parentNode) || e))) {
                        if (l.splice(r, 1),
                        !(t = o.length && wt(l)))
                            return j.apply(i, o),
                            i;
                        break
                    }
            }
            return (h || a(t, f))(o, e, !m, i, !e || tt.test(t) && vt(e.parentNode) || e),
            i
        }
        ,
        i.sortStable = b.split("").sort(L).join("") === b,
        i.detectDuplicates = !!d,
        h(),
        i.sortDetached = ut(function(t) {
            return 1 & t.compareDocumentPosition(f.createElement("fieldset"))
        }),
        ut(function(t) {
            return t.innerHTML = "<a href='#'></a>",
            "#" === t.firstChild.getAttribute("href")
        }) || dt("type|href|height|width", function(t, e, i) {
            if (!i)
                return t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
        }),
        i.attributes && ut(function(t) {
            return t.innerHTML = "<input/>",
            t.firstChild.setAttribute("value", ""),
            "" === t.firstChild.getAttribute("value")
        }) || dt("value", function(t, e, i) {
            if (!i && "input" === t.nodeName.toLowerCase())
                return t.defaultValue
        }),
        ut(function(t) {
            return null == t.getAttribute("disabled")
        }) || dt(z, function(t, e, i) {
            var n;
            if (!i)
                return !0 === t[e] ? e.toLowerCase() : (n = t.getAttributeNode(e)) && n.specified ? n.value : null
        }),
        at
    }(t);
    x.find = I,
    x.expr = I.selectors,
    x.expr[":"] = x.expr.pseudos,
    x.uniqueSort = x.unique = I.uniqueSort,
    x.text = I.getText,
    x.isXMLDoc = I.isXML,
    x.contains = I.contains,
    x.escapeSelector = I.escape;
    var _ = function(t, e, i) {
        for (var n = [], o = void 0 !== i; (t = t[e]) && 9 !== t.nodeType; )
            if (1 === t.nodeType) {
                if (o && x(t).is(i))
                    break;
                n.push(t)
            }
        return n
    }
      , T = function(t, e) {
        for (var i = []; t; t = t.nextSibling)
            1 === t.nodeType && t !== e && i.push(t);
        return i
    }
      , E = x.expr.match.needsContext;
    function L(t, e) {
        return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
    }
    var M = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    function N(t, e, i) {
        return m(e) ? x.grep(t, function(t, n) {
            return !!e.call(t, n, t) !== i
        }) : e.nodeType ? x.grep(t, function(t) {
            return t === e !== i
        }) : "string" != typeof e ? x.grep(t, function(t) {
            return -1 < l.call(e, t) !== i
        }) : x.filter(e, t, i)
    }
    x.filter = function(t, e, i) {
        var n = e[0];
        return i && (t = ":not(" + t + ")"),
        1 === e.length && 1 === n.nodeType ? x.find.matchesSelector(n, t) ? [n] : [] : x.find.matches(t, x.grep(e, function(t) {
            return 1 === t.nodeType
        }))
    }
    ,
    x.fn.extend({
        find: function(t) {
            var e, i, n = this.length, o = this;
            if ("string" != typeof t)
                return this.pushStack(x(t).filter(function() {
                    for (e = 0; e < n; e++)
                        if (x.contains(o[e], this))
                            return !0
                }));
            for (i = this.pushStack([]),
            e = 0; e < n; e++)
                x.find(t, o[e], i);
            return 1 < n ? x.uniqueSort(i) : i
        },
        filter: function(t) {
            return this.pushStack(N(this, t || [], !1))
        },
        not: function(t) {
            return this.pushStack(N(this, t || [], !0))
        },
        is: function(t) {
            return !!N(this, "string" == typeof t && E.test(t) ? x(t) : t || [], !1).length
        }
    });
    var D, k = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (x.fn.init = function(t, e, i) {
        var o, r;
        if (!t)
            return this;
        if (i = i || D,
        "string" == typeof t) {
            if (!(o = "<" === t[0] && ">" === t[t.length - 1] && 3 <= t.length ? [null, t, null] : k.exec(t)) || !o[1] && e)
                return !e || e.jquery ? (e || i).find(t) : this.constructor(e).find(t);
            if (o[1]) {
                if (e = e instanceof x ? e[0] : e,
                x.merge(this, x.parseHTML(o[1], e && e.nodeType ? e.ownerDocument || e : n, !0)),
                M.test(o[1]) && x.isPlainObject(e))
                    for (o in e)
                        m(this[o]) ? this[o](e[o]) : this.attr(o, e[o]);
                return this
            }
            return (r = n.getElementById(o[2])) && (this[0] = r,
            this.length = 1),
            this
        }
        return t.nodeType ? (this[0] = t,
        this.length = 1,
        this) : m(t) ? void 0 !== i.ready ? i.ready(t) : t(x) : x.makeArray(t, this)
    }
    ).prototype = x.fn,
    D = x(n);
    var j = /^(?:parents|prev(?:Until|All))/
      , A = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    function O(t, e) {
        for (; (t = t[e]) && 1 !== t.nodeType; )
            ;
        return t
    }
    x.fn.extend({
        has: function(t) {
            var e = x(t, this)
              , i = e.length;
            return this.filter(function() {
                for (var t = 0; t < i; t++)
                    if (x.contains(this, e[t]))
                        return !0
            })
        },
        closest: function(t, e) {
            var i, n = 0, o = this.length, r = [], s = "string" != typeof t && x(t);
            if (!E.test(t))
                for (; n < o; n++)
                    for (i = this[n]; i && i !== e; i = i.parentNode)
                        if (i.nodeType < 11 && (s ? -1 < s.index(i) : 1 === i.nodeType && x.find.matchesSelector(i, t))) {
                            r.push(i);
                            break
                        }
            return this.pushStack(1 < r.length ? x.uniqueSort(r) : r)
        },
        index: function(t) {
            return t ? "string" == typeof t ? l.call(x(t), this[0]) : l.call(this, t.jquery ? t[0] : t) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(t, e) {
            return this.pushStack(x.uniqueSort(x.merge(this.get(), x(t, e))))
        },
        addBack: function(t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        }
    }),
    x.each({
        parent: function(t) {
            var e = t.parentNode;
            return e && 11 !== e.nodeType ? e : null
        },
        parents: function(t) {
            return _(t, "parentNode")
        },
        parentsUntil: function(t, e, i) {
            return _(t, "parentNode", i)
        },
        next: function(t) {
            return O(t, "nextSibling")
        },
        prev: function(t) {
            return O(t, "previousSibling")
        },
        nextAll: function(t) {
            return _(t, "nextSibling")
        },
        prevAll: function(t) {
            return _(t, "previousSibling")
        },
        nextUntil: function(t, e, i) {
            return _(t, "nextSibling", i)
        },
        prevUntil: function(t, e, i) {
            return _(t, "previousSibling", i)
        },
        siblings: function(t) {
            return T((t.parentNode || {}).firstChild, t)
        },
        children: function(t) {
            return T(t.firstChild)
        },
        contents: function(t) {
            return void 0 !== t.contentDocument ? t.contentDocument : (L(t, "template") && (t = t.content || t),
            x.merge([], t.childNodes))
        }
    }, function(t, e) {
        x.fn[t] = function(i, n) {
            var o = x.map(this, e, i);
            return "Until" !== t.slice(-5) && (n = i),
            n && "string" == typeof n && (o = x.filter(n, o)),
            1 < this.length && (A[t] || x.uniqueSort(o),
            j.test(t) && o.reverse()),
            this.pushStack(o)
        }
    });
    var z = /[^\x20\t\r\n\f]+/g;
    function P(t) {
        return t
    }
    function R(t) {
        throw t
    }
    function W(t, e, i, n) {
        var o;
        try {
            t && m(o = t.promise) ? o.call(t).done(e).fail(i) : t && m(o = t.then) ? o.call(t, e, i) : e.apply(void 0, [t].slice(n))
        } catch (t) {
            i.apply(void 0, [t])
        }
    }
    x.Callbacks = function(t) {
        var e, i;
        t = "string" == typeof t ? (e = t,
        i = {},
        x.each(e.match(z) || [], function(t, e) {
            i[e] = !0
        }),
        i) : x.extend({}, t);
        var n, o, r, s, a = [], l = [], c = -1, u = function() {
            for (s = s || t.once,
            r = n = !0; l.length; c = -1)
                for (o = l.shift(); ++c < a.length; )
                    !1 === a[c].apply(o[0], o[1]) && t.stopOnFalse && (c = a.length,
                    o = !1);
            t.memory || (o = !1),
            n = !1,
            s && (a = o ? [] : "")
        }, d = {
            add: function() {
                return a && (o && !n && (c = a.length - 1,
                l.push(o)),
                function e(i) {
                    x.each(i, function(i, n) {
                        m(n) ? t.unique && d.has(n) || a.push(n) : n && n.length && "string" !== w(n) && e(n)
                    })
                }(arguments),
                o && !n && u()),
                this
            },
            remove: function() {
                return x.each(arguments, function(t, e) {
                    for (var i; -1 < (i = x.inArray(e, a, i)); )
                        a.splice(i, 1),
                        i <= c && c--
                }),
                this
            },
            has: function(t) {
                return t ? -1 < x.inArray(t, a) : 0 < a.length
            },
            empty: function() {
                return a && (a = []),
                this
            },
            disable: function() {
                return s = l = [],
                a = o = "",
                this
            },
            disabled: function() {
                return !a
            },
            lock: function() {
                return s = l = [],
                o || n || (a = o = ""),
                this
            },
            locked: function() {
                return !!s
            },
            fireWith: function(t, e) {
                return s || (e = [t, (e = e || []).slice ? e.slice() : e],
                l.push(e),
                n || u()),
                this
            },
            fire: function() {
                return d.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !!r
            }
        };
        return d
    }
    ,
    x.extend({
        Deferred: function(e) {
            var i = [["notify", "progress", x.Callbacks("memory"), x.Callbacks("memory"), 2], ["resolve", "done", x.Callbacks("once memory"), x.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", x.Callbacks("once memory"), x.Callbacks("once memory"), 1, "rejected"]]
              , n = "pending"
              , o = {
                state: function() {
                    return n
                },
                always: function() {
                    return r.done(arguments).fail(arguments),
                    this
                },
                catch: function(t) {
                    return o.then(null, t)
                },
                pipe: function() {
                    var t = arguments;
                    return x.Deferred(function(e) {
                        x.each(i, function(i, n) {
                            var o = m(t[n[4]]) && t[n[4]];
                            r[n[1]](function() {
                                var t = o && o.apply(this, arguments);
                                t && m(t.promise) ? t.promise().progress(e.notify).done(e.resolve).fail(e.reject) : e[n[0] + "With"](this, o ? [t] : arguments)
                            })
                        }),
                        t = null
                    }).promise()
                },
                then: function(e, n, o) {
                    var r = 0;
                    function s(e, i, n, o) {
                        return function() {
                            var a = this
                              , l = arguments
                              , c = function() {
                                var t, c;
                                if (!(e < r)) {
                                    if ((t = n.apply(a, l)) === i.promise())
                                        throw new TypeError("Thenable self-resolution");
                                    c = t && ("object" == typeof t || "function" == typeof t) && t.then,
                                    m(c) ? o ? c.call(t, s(r, i, P, o), s(r, i, R, o)) : (r++,
                                    c.call(t, s(r, i, P, o), s(r, i, R, o), s(r, i, P, i.notifyWith))) : (n !== P && (a = void 0,
                                    l = [t]),
                                    (o || i.resolveWith)(a, l))
                                }
                            }
                              , u = o ? c : function() {
                                try {
                                    c()
                                } catch (t) {
                                    x.Deferred.exceptionHook && x.Deferred.exceptionHook(t, u.stackTrace),
                                    r <= e + 1 && (n !== R && (a = void 0,
                                    l = [t]),
                                    i.rejectWith(a, l))
                                }
                            }
                            ;
                            e ? u() : (x.Deferred.getStackHook && (u.stackTrace = x.Deferred.getStackHook()),
                            t.setTimeout(u))
                        }
                    }
                    return x.Deferred(function(t) {
                        i[0][3].add(s(0, t, m(o) ? o : P, t.notifyWith)),
                        i[1][3].add(s(0, t, m(e) ? e : P)),
                        i[2][3].add(s(0, t, m(n) ? n : R))
                    }).promise()
                },
                promise: function(t) {
                    return null != t ? x.extend(t, o) : o
                }
            }
              , r = {};
            return x.each(i, function(t, e) {
                var s = e[2]
                  , a = e[5];
                o[e[1]] = s.add,
                a && s.add(function() {
                    n = a
                }, i[3 - t][2].disable, i[3 - t][3].disable, i[0][2].lock, i[0][3].lock),
                s.add(e[3].fire),
                r[e[0]] = function() {
                    return r[e[0] + "With"](this === r ? void 0 : this, arguments),
                    this
                }
                ,
                r[e[0] + "With"] = s.fireWith
            }),
            o.promise(r),
            e && e.call(r, r),
            r
        },
        when: function(t) {
            var e = arguments.length
              , i = e
              , n = Array(i)
              , o = r.call(arguments)
              , s = x.Deferred()
              , a = function(t) {
                return function(i) {
                    n[t] = this,
                    o[t] = 1 < arguments.length ? r.call(arguments) : i,
                    --e || s.resolveWith(n, o)
                }
            };
            if (e <= 1 && (W(t, s.done(a(i)).resolve, s.reject, !e),
            "pending" === s.state() || m(o[i] && o[i].then)))
                return s.then();
            for (; i--; )
                W(o[i], a(i), s.reject);
            return s.promise()
        }
    });
    var H = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    x.Deferred.exceptionHook = function(e, i) {
        t.console && t.console.warn && e && H.test(e.name) && t.console.warn("jQuery.Deferred exception: " + e.message, e.stack, i)
    }
    ,
    x.readyException = function(e) {
        t.setTimeout(function() {
            throw e
        })
    }
    ;
    var B = x.Deferred();
    function F() {
        n.removeEventListener("DOMContentLoaded", F),
        t.removeEventListener("load", F),
        x.ready()
    }
    x.fn.ready = function(t) {
        return B.then(t).catch(function(t) {
            x.readyException(t)
        }),
        this
    }
    ,
    x.extend({
        isReady: !1,
        readyWait: 1,
        ready: function(t) {
            (!0 === t ? --x.readyWait : x.isReady) || (x.isReady = !0) !== t && 0 < --x.readyWait || B.resolveWith(n, [x])
        }
    }),
    x.ready.then = B.then,
    "complete" === n.readyState || "loading" !== n.readyState && !n.documentElement.doScroll ? t.setTimeout(x.ready) : (n.addEventListener("DOMContentLoaded", F),
    t.addEventListener("load", F));
    var q = function(t, e, i, n, o, r, s) {
        var a = 0
          , l = t.length
          , c = null == i;
        if ("object" === w(i))
            for (a in o = !0,
            i)
                q(t, e, a, i[a], !0, r, s);
        else if (void 0 !== n && (o = !0,
        m(n) || (s = !0),
        c && (s ? (e.call(t, n),
        e = null) : (c = e,
        e = function(t, e, i) {
            return c.call(x(t), i)
        }
        )),
        e))
            for (; a < l; a++)
                e(t[a], i, s ? n : n.call(t[a], a, e(t[a], i)));
        return o ? t : c ? e.call(t) : l ? e(t[0], i) : r
    }
      , Q = /^-ms-/
      , U = /-([a-z])/g;
    function Y(t, e) {
        return e.toUpperCase()
    }
    function Z(t) {
        return t.replace(Q, "ms-").replace(U, Y)
    }
    var G = function(t) {
        return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType
    };
    function $() {
        this.expando = x.expando + $.uid++
    }
    $.uid = 1,
    $.prototype = {
        cache: function(t) {
            var e = t[this.expando];
            return e || (e = {},
            G(t) && (t.nodeType ? t[this.expando] = e : Object.defineProperty(t, this.expando, {
                value: e,
                configurable: !0
            }))),
            e
        },
        set: function(t, e, i) {
            var n, o = this.cache(t);
            if ("string" == typeof e)
                o[Z(e)] = i;
            else
                for (n in e)
                    o[Z(n)] = e[n];
            return o
        },
        get: function(t, e) {
            return void 0 === e ? this.cache(t) : t[this.expando] && t[this.expando][Z(e)]
        },
        access: function(t, e, i) {
            return void 0 === e || e && "string" == typeof e && void 0 === i ? this.get(t, e) : (this.set(t, e, i),
            void 0 !== i ? i : e)
        },
        remove: function(t, e) {
            var i, n = t[this.expando];
            if (void 0 !== n) {
                if (void 0 !== e) {
                    i = (e = Array.isArray(e) ? e.map(Z) : (e = Z(e))in n ? [e] : e.match(z) || []).length;
                    for (; i--; )
                        delete n[e[i]]
                }
                (void 0 === e || x.isEmptyObject(n)) && (t.nodeType ? t[this.expando] = void 0 : delete t[this.expando])
            }
        },
        hasData: function(t) {
            var e = t[this.expando];
            return void 0 !== e && !x.isEmptyObject(e)
        }
    };
    var X = new $
      , V = new $
      , J = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
      , K = /[A-Z]/g;
    function tt(t, e, i) {
        var n, o;
        if (void 0 === i && 1 === t.nodeType)
            if (n = "data-" + e.replace(K, "-$&").toLowerCase(),
            "string" == typeof (i = t.getAttribute(n))) {
                try {
                    i = "true" === (o = i) || "false" !== o && ("null" === o ? null : o === +o + "" ? +o : J.test(o) ? JSON.parse(o) : o)
                } catch (t) {}
                V.set(t, e, i)
            } else
                i = void 0;
        return i
    }
    x.extend({
        hasData: function(t) {
            return V.hasData(t) || X.hasData(t)
        },
        data: function(t, e, i) {
            return V.access(t, e, i)
        },
        removeData: function(t, e) {
            V.remove(t, e)
        },
        _data: function(t, e, i) {
            return X.access(t, e, i)
        },
        _removeData: function(t, e) {
            X.remove(t, e)
        }
    }),
    x.fn.extend({
        data: function(t, e) {
            var i, n, o, r = this[0], s = r && r.attributes;
            if (void 0 === t) {
                if (this.length && (o = V.get(r),
                1 === r.nodeType && !X.get(r, "hasDataAttrs"))) {
                    for (i = s.length; i--; )
                        s[i] && 0 === (n = s[i].name).indexOf("data-") && (n = Z(n.slice(5)),
                        tt(r, n, o[n]));
                    X.set(r, "hasDataAttrs", !0)
                }
                return o
            }
            return "object" == typeof t ? this.each(function() {
                V.set(this, t)
            }) : q(this, function(e) {
                var i;
                if (r && void 0 === e)
                    return void 0 !== (i = V.get(r, t)) ? i : void 0 !== (i = tt(r, t)) ? i : void 0;
                this.each(function() {
                    V.set(this, t, e)
                })
            }, null, e, 1 < arguments.length, null, !0)
        },
        removeData: function(t) {
            return this.each(function() {
                V.remove(this, t)
            })
        }
    }),
    x.extend({
        queue: function(t, e, i) {
            var n;
            if (t)
                return e = (e || "fx") + "queue",
                n = X.get(t, e),
                i && (!n || Array.isArray(i) ? n = X.access(t, e, x.makeArray(i)) : n.push(i)),
                n || []
        },
        dequeue: function(t, e) {
            e = e || "fx";
            var i = x.queue(t, e)
              , n = i.length
              , o = i.shift()
              , r = x._queueHooks(t, e);
            "inprogress" === o && (o = i.shift(),
            n--),
            o && ("fx" === e && i.unshift("inprogress"),
            delete r.stop,
            o.call(t, function() {
                x.dequeue(t, e)
            }, r)),
            !n && r && r.empty.fire()
        },
        _queueHooks: function(t, e) {
            var i = e + "queueHooks";
            return X.get(t, i) || X.access(t, i, {
                empty: x.Callbacks("once memory").add(function() {
                    X.remove(t, [e + "queue", i])
                })
            })
        }
    }),
    x.fn.extend({
        queue: function(t, e) {
            var i = 2;
            return "string" != typeof t && (e = t,
            t = "fx",
            i--),
            arguments.length < i ? x.queue(this[0], t) : void 0 === e ? this : this.each(function() {
                var i = x.queue(this, t, e);
                x._queueHooks(this, t),
                "fx" === t && "inprogress" !== i[0] && x.dequeue(this, t)
            })
        },
        dequeue: function(t) {
            return this.each(function() {
                x.dequeue(this, t)
            })
        },
        clearQueue: function(t) {
            return this.queue(t || "fx", [])
        },
        promise: function(t, e) {
            var i, n = 1, o = x.Deferred(), r = this, s = this.length, a = function() {
                --n || o.resolveWith(r, [r])
            };
            for ("string" != typeof t && (e = t,
            t = void 0),
            t = t || "fx"; s--; )
                (i = X.get(r[s], t + "queueHooks")) && i.empty && (n++,
                i.empty.add(a));
            return a(),
            o.promise(e)
        }
    });
    var et = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
      , it = new RegExp("^(?:([+-])=|)(" + et + ")([a-z%]*)$","i")
      , nt = ["Top", "Right", "Bottom", "Left"]
      , ot = n.documentElement
      , rt = function(t) {
        return x.contains(t.ownerDocument, t)
    }
      , st = {
        composed: !0
    };
    ot.getRootNode && (rt = function(t) {
        return x.contains(t.ownerDocument, t) || t.getRootNode(st) === t.ownerDocument
    }
    );
    var at = function(t, e) {
        return "none" === (t = e || t).style.display || "" === t.style.display && rt(t) && "none" === x.css(t, "display")
    }
      , lt = function(t, e, i, n) {
        var o, r, s = {};
        for (r in e)
            s[r] = t.style[r],
            t.style[r] = e[r];
        for (r in o = i.apply(t, n || []),
        e)
            t.style[r] = s[r];
        return o
    };
    function ct(t, e, i, n) {
        var o, r, s = 20, a = n ? function() {
            return n.cur()
        }
        : function() {
            return x.css(t, e, "")
        }
        , l = a(), c = i && i[3] || (x.cssNumber[e] ? "" : "px"), u = t.nodeType && (x.cssNumber[e] || "px" !== c && +l) && it.exec(x.css(t, e));
        if (u && u[3] !== c) {
            for (l /= 2,
            c = c || u[3],
            u = +l || 1; s--; )
                x.style(t, e, u + c),
                (1 - r) * (1 - (r = a() / l || .5)) <= 0 && (s = 0),
                u /= r;
            u *= 2,
            x.style(t, e, u + c),
            i = i || []
        }
        return i && (u = +u || +l || 0,
        o = i[1] ? u + (i[1] + 1) * i[2] : +i[2],
        n && (n.unit = c,
        n.start = u,
        n.end = o)),
        o
    }
    var ut = {};
    function dt(t, e) {
        for (var i, n, o, r, s, a, l, c = [], u = 0, d = t.length; u < d; u++)
            (n = t[u]).style && (i = n.style.display,
            e ? ("none" === i && (c[u] = X.get(n, "display") || null,
            c[u] || (n.style.display = "")),
            "" === n.style.display && at(n) && (c[u] = (l = s = r = void 0,
            s = (o = n).ownerDocument,
            a = o.nodeName,
            (l = ut[a]) || (r = s.body.appendChild(s.createElement(a)),
            l = x.css(r, "display"),
            r.parentNode.removeChild(r),
            "none" === l && (l = "block"),
            ut[a] = l)))) : "none" !== i && (c[u] = "none",
            X.set(n, "display", i)));
        for (u = 0; u < d; u++)
            null != c[u] && (t[u].style.display = c[u]);
        return t
    }
    x.fn.extend({
        show: function() {
            return dt(this, !0)
        },
        hide: function() {
            return dt(this)
        },
        toggle: function(t) {
            return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() {
                at(this) ? x(this).show() : x(this).hide()
            })
        }
    });
    var ht = /^(?:checkbox|radio)$/i
      , ft = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i
      , pt = /^$|^module$|\/(?:java|ecma)script/i
      , mt = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    function gt(t, e) {
        var i;
        return i = void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e || "*") : void 0 !== t.querySelectorAll ? t.querySelectorAll(e || "*") : [],
        void 0 === e || e && L(t, e) ? x.merge([t], i) : i
    }
    function vt(t, e) {
        for (var i = 0, n = t.length; i < n; i++)
            X.set(t[i], "globalEval", !e || X.get(e[i], "globalEval"))
    }
    mt.optgroup = mt.option,
    mt.tbody = mt.tfoot = mt.colgroup = mt.caption = mt.thead,
    mt.th = mt.td;
    var yt, wt, bt = /<|&#?\w+;/;
    function xt(t, e, i, n, o) {
        for (var r, s, a, l, c, u, d = e.createDocumentFragment(), h = [], f = 0, p = t.length; f < p; f++)
            if ((r = t[f]) || 0 === r)
                if ("object" === w(r))
                    x.merge(h, r.nodeType ? [r] : r);
                else if (bt.test(r)) {
                    for (s = s || d.appendChild(e.createElement("div")),
                    a = (ft.exec(r) || ["", ""])[1].toLowerCase(),
                    l = mt[a] || mt._default,
                    s.innerHTML = l[1] + x.htmlPrefilter(r) + l[2],
                    u = l[0]; u--; )
                        s = s.lastChild;
                    x.merge(h, s.childNodes),
                    (s = d.firstChild).textContent = ""
                } else
                    h.push(e.createTextNode(r));
        for (d.textContent = "",
        f = 0; r = h[f++]; )
            if (n && -1 < x.inArray(r, n))
                o && o.push(r);
            else if (c = rt(r),
            s = gt(d.appendChild(r), "script"),
            c && vt(s),
            i)
                for (u = 0; r = s[u++]; )
                    pt.test(r.type || "") && i.push(r);
        return d
    }
    yt = n.createDocumentFragment().appendChild(n.createElement("div")),
    (wt = n.createElement("input")).setAttribute("type", "radio"),
    wt.setAttribute("checked", "checked"),
    wt.setAttribute("name", "t"),
    yt.appendChild(wt),
    p.checkClone = yt.cloneNode(!0).cloneNode(!0).lastChild.checked,
    yt.innerHTML = "<textarea>x</textarea>",
    p.noCloneChecked = !!yt.cloneNode(!0).lastChild.defaultValue;
    var St = /^key/
      , Ct = /^(?:mouse|pointer|contextmenu|drag|drop)|click/
      , It = /^([^.]*)(?:\.(.+)|)/;
    function _t() {
        return !0
    }
    function Tt() {
        return !1
    }
    function Et(t, e) {
        return t === function() {
            try {
                return n.activeElement
            } catch (t) {}
        }() == ("focus" === e)
    }
    function Lt(t, e, i, n, o, r) {
        var s, a;
        if ("object" == typeof e) {
            for (a in "string" != typeof i && (n = n || i,
            i = void 0),
            e)
                Lt(t, a, i, n, e[a], r);
            return t
        }
        if (null == n && null == o ? (o = i,
        n = i = void 0) : null == o && ("string" == typeof i ? (o = n,
        n = void 0) : (o = n,
        n = i,
        i = void 0)),
        !1 === o)
            o = Tt;
        else if (!o)
            return t;
        return 1 === r && (s = o,
        (o = function(t) {
            return x().off(t),
            s.apply(this, arguments)
        }
        ).guid = s.guid || (s.guid = x.guid++)),
        t.each(function() {
            x.event.add(this, e, o, n, i)
        })
    }
    function Mt(t, e, i) {
        i ? (X.set(t, e, !1),
        x.event.add(t, e, {
            namespace: !1,
            handler: function(t) {
                var n, o, s = X.get(this, e);
                if (1 & t.isTrigger && this[e]) {
                    if (s.length)
                        (x.event.special[e] || {}).delegateType && t.stopPropagation();
                    else if (s = r.call(arguments),
                    X.set(this, e, s),
                    n = i(this, e),
                    this[e](),
                    s !== (o = X.get(this, e)) || n ? X.set(this, e, !1) : o = {},
                    s !== o)
                        return t.stopImmediatePropagation(),
                        t.preventDefault(),
                        o.value
                } else
                    s.length && (X.set(this, e, {
                        value: x.event.trigger(x.extend(s[0], x.Event.prototype), s.slice(1), this)
                    }),
                    t.stopImmediatePropagation())
            }
        })) : void 0 === X.get(t, e) && x.event.add(t, e, _t)
    }
    x.event = {
        global: {},
        add: function(t, e, i, n, o) {
            var r, s, a, l, c, u, d, h, f, p, m, g = X.get(t);
            if (g)
                for (i.handler && (i = (r = i).handler,
                o = r.selector),
                o && x.find.matchesSelector(ot, o),
                i.guid || (i.guid = x.guid++),
                (l = g.events) || (l = g.events = {}),
                (s = g.handle) || (s = g.handle = function(e) {
                    return void 0 !== x && x.event.triggered !== e.type ? x.event.dispatch.apply(t, arguments) : void 0
                }
                ),
                c = (e = (e || "").match(z) || [""]).length; c--; )
                    f = m = (a = It.exec(e[c]) || [])[1],
                    p = (a[2] || "").split(".").sort(),
                    f && (d = x.event.special[f] || {},
                    f = (o ? d.delegateType : d.bindType) || f,
                    d = x.event.special[f] || {},
                    u = x.extend({
                        type: f,
                        origType: m,
                        data: n,
                        handler: i,
                        guid: i.guid,
                        selector: o,
                        needsContext: o && x.expr.match.needsContext.test(o),
                        namespace: p.join(".")
                    }, r),
                    (h = l[f]) || ((h = l[f] = []).delegateCount = 0,
                    d.setup && !1 !== d.setup.call(t, n, p, s) || t.addEventListener && t.addEventListener(f, s)),
                    d.add && (d.add.call(t, u),
                    u.handler.guid || (u.handler.guid = i.guid)),
                    o ? h.splice(h.delegateCount++, 0, u) : h.push(u),
                    x.event.global[f] = !0)
        },
        remove: function(t, e, i, n, o) {
            var r, s, a, l, c, u, d, h, f, p, m, g = X.hasData(t) && X.get(t);
            if (g && (l = g.events)) {
                for (c = (e = (e || "").match(z) || [""]).length; c--; )
                    if (f = m = (a = It.exec(e[c]) || [])[1],
                    p = (a[2] || "").split(".").sort(),
                    f) {
                        for (d = x.event.special[f] || {},
                        h = l[f = (n ? d.delegateType : d.bindType) || f] || [],
                        a = a[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                        s = r = h.length; r--; )
                            u = h[r],
                            !o && m !== u.origType || i && i.guid !== u.guid || a && !a.test(u.namespace) || n && n !== u.selector && ("**" !== n || !u.selector) || (h.splice(r, 1),
                            u.selector && h.delegateCount--,
                            d.remove && d.remove.call(t, u));
                        s && !h.length && (d.teardown && !1 !== d.teardown.call(t, p, g.handle) || x.removeEvent(t, f, g.handle),
                        delete l[f])
                    } else
                        for (f in l)
                            x.event.remove(t, f + e[c], i, n, !0);
                x.isEmptyObject(l) && X.remove(t, "handle events")
            }
        },
        dispatch: function(t) {
            var e, i, n, o, r, s, a = x.event.fix(t), l = new Array(arguments.length), c = (X.get(this, "events") || {})[a.type] || [], u = x.event.special[a.type] || {};
            for (l[0] = a,
            e = 1; e < arguments.length; e++)
                l[e] = arguments[e];
            if (a.delegateTarget = this,
            !u.preDispatch || !1 !== u.preDispatch.call(this, a)) {
                for (s = x.event.handlers.call(this, a, c),
                e = 0; (o = s[e++]) && !a.isPropagationStopped(); )
                    for (a.currentTarget = o.elem,
                    i = 0; (r = o.handlers[i++]) && !a.isImmediatePropagationStopped(); )
                        a.rnamespace && !1 !== r.namespace && !a.rnamespace.test(r.namespace) || (a.handleObj = r,
                        a.data = r.data,
                        void 0 !== (n = ((x.event.special[r.origType] || {}).handle || r.handler).apply(o.elem, l)) && !1 === (a.result = n) && (a.preventDefault(),
                        a.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, a),
                a.result
            }
        },
        handlers: function(t, e) {
            var i, n, o, r, s, a = [], l = e.delegateCount, c = t.target;
            if (l && c.nodeType && !("click" === t.type && 1 <= t.button))
                for (; c !== this; c = c.parentNode || this)
                    if (1 === c.nodeType && ("click" !== t.type || !0 !== c.disabled)) {
                        for (r = [],
                        s = {},
                        i = 0; i < l; i++)
                            void 0 === s[o = (n = e[i]).selector + " "] && (s[o] = n.needsContext ? -1 < x(o, this).index(c) : x.find(o, this, null, [c]).length),
                            s[o] && r.push(n);
                        r.length && a.push({
                            elem: c,
                            handlers: r
                        })
                    }
            return c = this,
            l < e.length && a.push({
                elem: c,
                handlers: e.slice(l)
            }),
            a
        },
        addProp: function(t, e) {
            Object.defineProperty(x.Event.prototype, t, {
                enumerable: !0,
                configurable: !0,
                get: m(e) ? function() {
                    if (this.originalEvent)
                        return e(this.originalEvent)
                }
                : function() {
                    if (this.originalEvent)
                        return this.originalEvent[t]
                }
                ,
                set: function(e) {
                    Object.defineProperty(this, t, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: e
                    })
                }
            })
        },
        fix: function(t) {
            return t[x.expando] ? t : new x.Event(t)
        },
        special: {
            load: {
                noBubble: !0
            },
            click: {
                setup: function(t) {
                    var e = this || t;
                    return ht.test(e.type) && e.click && L(e, "input") && Mt(e, "click", _t),
                    !1
                },
                trigger: function(t) {
                    var e = this || t;
                    return ht.test(e.type) && e.click && L(e, "input") && Mt(e, "click"),
                    !0
                },
                _default: function(t) {
                    var e = t.target;
                    return ht.test(e.type) && e.click && L(e, "input") && X.get(e, "click") || L(e, "a")
                }
            },
            beforeunload: {
                postDispatch: function(t) {
                    void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
                }
            }
        }
    },
    x.removeEvent = function(t, e, i) {
        t.removeEventListener && t.removeEventListener(e, i)
    }
    ,
    x.Event = function(t, e) {
        if (!(this instanceof x.Event))
            return new x.Event(t,e);
        t && t.type ? (this.originalEvent = t,
        this.type = t.type,
        this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && !1 === t.returnValue ? _t : Tt,
        this.target = t.target && 3 === t.target.nodeType ? t.target.parentNode : t.target,
        this.currentTarget = t.currentTarget,
        this.relatedTarget = t.relatedTarget) : this.type = t,
        e && x.extend(this, e),
        this.timeStamp = t && t.timeStamp || Date.now(),
        this[x.expando] = !0
    }
    ,
    x.Event.prototype = {
        constructor: x.Event,
        isDefaultPrevented: Tt,
        isPropagationStopped: Tt,
        isImmediatePropagationStopped: Tt,
        isSimulated: !1,
        preventDefault: function() {
            var t = this.originalEvent;
            this.isDefaultPrevented = _t,
            t && !this.isSimulated && t.preventDefault()
        },
        stopPropagation: function() {
            var t = this.originalEvent;
            this.isPropagationStopped = _t,
            t && !this.isSimulated && t.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var t = this.originalEvent;
            this.isImmediatePropagationStopped = _t,
            t && !this.isSimulated && t.stopImmediatePropagation(),
            this.stopPropagation()
        }
    },
    x.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        code: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function(t) {
            var e = t.button;
            return null == t.which && St.test(t.type) ? null != t.charCode ? t.charCode : t.keyCode : !t.which && void 0 !== e && Ct.test(t.type) ? 1 & e ? 1 : 2 & e ? 3 : 4 & e ? 2 : 0 : t.which
        }
    }, x.event.addProp),
    x.each({
        focus: "focusin",
        blur: "focusout"
    }, function(t, e) {
        x.event.special[t] = {
            setup: function() {
                return Mt(this, t, Et),
                !1
            },
            trigger: function() {
                return Mt(this, t),
                !0
            },
            delegateType: e
        }
    }),
    x.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(t, e) {
        x.event.special[t] = {
            delegateType: e,
            bindType: e,
            handle: function(t) {
                var i, n = t.relatedTarget, o = t.handleObj;
                return n && (n === this || x.contains(this, n)) || (t.type = o.origType,
                i = o.handler.apply(this, arguments),
                t.type = e),
                i
            }
        }
    }),
    x.fn.extend({
        on: function(t, e, i, n) {
            return Lt(this, t, e, i, n)
        },
        one: function(t, e, i, n) {
            return Lt(this, t, e, i, n, 1)
        },
        off: function(t, e, i) {
            var n, o;
            if (t && t.preventDefault && t.handleObj)
                return n = t.handleObj,
                x(t.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler),
                this;
            if ("object" == typeof t) {
                for (o in t)
                    this.off(o, e, t[o]);
                return this
            }
            return !1 !== e && "function" != typeof e || (i = e,
            e = void 0),
            !1 === i && (i = Tt),
            this.each(function() {
                x.event.remove(this, t, i, e)
            })
        }
    });
    var Nt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi
      , Dt = /<script|<style|<link/i
      , kt = /checked\s*(?:[^=]|=\s*.checked.)/i
      , jt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    function At(t, e) {
        return L(t, "table") && L(11 !== e.nodeType ? e : e.firstChild, "tr") && x(t).children("tbody")[0] || t
    }
    function Ot(t) {
        return t.type = (null !== t.getAttribute("type")) + "/" + t.type,
        t
    }
    function zt(t) {
        return "true/" === (t.type || "").slice(0, 5) ? t.type = t.type.slice(5) : t.removeAttribute("type"),
        t
    }
    function Pt(t, e) {
        var i, n, o, r, s, a, l, c;
        if (1 === e.nodeType) {
            if (X.hasData(t) && (r = X.access(t),
            s = X.set(e, r),
            c = r.events))
                for (o in delete s.handle,
                s.events = {},
                c)
                    for (i = 0,
                    n = c[o].length; i < n; i++)
                        x.event.add(e, o, c[o][i]);
            V.hasData(t) && (a = V.access(t),
            l = x.extend({}, a),
            V.set(e, l))
        }
    }
    function Rt(t, e, i, n) {
        e = s.apply([], e);
        var o, r, a, l, c, u, d = 0, h = t.length, f = h - 1, g = e[0], v = m(g);
        if (v || 1 < h && "string" == typeof g && !p.checkClone && kt.test(g))
            return t.each(function(o) {
                var r = t.eq(o);
                v && (e[0] = g.call(this, o, r.html())),
                Rt(r, e, i, n)
            });
        if (h && (r = (o = xt(e, t[0].ownerDocument, !1, t, n)).firstChild,
        1 === o.childNodes.length && (o = r),
        r || n)) {
            for (l = (a = x.map(gt(o, "script"), Ot)).length; d < h; d++)
                c = o,
                d !== f && (c = x.clone(c, !0, !0),
                l && x.merge(a, gt(c, "script"))),
                i.call(t[d], c, d);
            if (l)
                for (u = a[a.length - 1].ownerDocument,
                x.map(a, zt),
                d = 0; d < l; d++)
                    c = a[d],
                    pt.test(c.type || "") && !X.access(c, "globalEval") && x.contains(u, c) && (c.src && "module" !== (c.type || "").toLowerCase() ? x._evalUrl && !c.noModule && x._evalUrl(c.src, {
                        nonce: c.nonce || c.getAttribute("nonce")
                    }) : y(c.textContent.replace(jt, ""), c, u))
        }
        return t
    }
    function Wt(t, e, i) {
        for (var n, o = e ? x.filter(e, t) : t, r = 0; null != (n = o[r]); r++)
            i || 1 !== n.nodeType || x.cleanData(gt(n)),
            n.parentNode && (i && rt(n) && vt(gt(n, "script")),
            n.parentNode.removeChild(n));
        return t
    }
    x.extend({
        htmlPrefilter: function(t) {
            return t.replace(Nt, "<$1></$2>")
        },
        clone: function(t, e, i) {
            var n, o, r, s, a, l, c, u = t.cloneNode(!0), d = rt(t);
            if (!(p.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || x.isXMLDoc(t)))
                for (s = gt(u),
                n = 0,
                o = (r = gt(t)).length; n < o; n++)
                    a = r[n],
                    "input" === (c = (l = s[n]).nodeName.toLowerCase()) && ht.test(a.type) ? l.checked = a.checked : "input" !== c && "textarea" !== c || (l.defaultValue = a.defaultValue);
            if (e)
                if (i)
                    for (r = r || gt(t),
                    s = s || gt(u),
                    n = 0,
                    o = r.length; n < o; n++)
                        Pt(r[n], s[n]);
                else
                    Pt(t, u);
            return 0 < (s = gt(u, "script")).length && vt(s, !d && gt(t, "script")),
            u
        },
        cleanData: function(t) {
            for (var e, i, n, o = x.event.special, r = 0; void 0 !== (i = t[r]); r++)
                if (G(i)) {
                    if (e = i[X.expando]) {
                        if (e.events)
                            for (n in e.events)
                                o[n] ? x.event.remove(i, n) : x.removeEvent(i, n, e.handle);
                        i[X.expando] = void 0
                    }
                    i[V.expando] && (i[V.expando] = void 0)
                }
        }
    }),
    x.fn.extend({
        detach: function(t) {
            return Wt(this, t, !0)
        },
        remove: function(t) {
            return Wt(this, t)
        },
        text: function(t) {
            return q(this, function(t) {
                return void 0 === t ? x.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = t)
                })
            }, null, t, arguments.length)
        },
        append: function() {
            return Rt(this, arguments, function(t) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || At(this, t).appendChild(t)
            })
        },
        prepend: function() {
            return Rt(this, arguments, function(t) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var e = At(this, t);
                    e.insertBefore(t, e.firstChild)
                }
            })
        },
        before: function() {
            return Rt(this, arguments, function(t) {
                this.parentNode && this.parentNode.insertBefore(t, this)
            })
        },
        after: function() {
            return Rt(this, arguments, function(t) {
                this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
            })
        },
        empty: function() {
            for (var t, e = 0; null != (t = this[e]); e++)
                1 === t.nodeType && (x.cleanData(gt(t, !1)),
                t.textContent = "");
            return this
        },
        clone: function(t, e) {
            return t = null != t && t,
            e = null == e ? t : e,
            this.map(function() {
                return x.clone(this, t, e)
            })
        },
        html: function(t) {
            return q(this, function(t) {
                var e = this[0] || {}
                  , i = 0
                  , n = this.length;
                if (void 0 === t && 1 === e.nodeType)
                    return e.innerHTML;
                if ("string" == typeof t && !Dt.test(t) && !mt[(ft.exec(t) || ["", ""])[1].toLowerCase()]) {
                    t = x.htmlPrefilter(t);
                    try {
                        for (; i < n; i++)
                            1 === (e = this[i] || {}).nodeType && (x.cleanData(gt(e, !1)),
                            e.innerHTML = t);
                        e = 0
                    } catch (t) {}
                }
                e && this.empty().append(t)
            }, null, t, arguments.length)
        },
        replaceWith: function() {
            var t = [];
            return Rt(this, arguments, function(e) {
                var i = this.parentNode;
                x.inArray(this, t) < 0 && (x.cleanData(gt(this)),
                i && i.replaceChild(e, this))
            }, t)
        }
    }),
    x.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(t, e) {
        x.fn[t] = function(t) {
            for (var i, n = [], o = x(t), r = o.length - 1, s = 0; s <= r; s++)
                i = s === r ? this : this.clone(!0),
                x(o[s])[e](i),
                a.apply(n, i.get());
            return this.pushStack(n)
        }
    });
    var Ht = new RegExp("^(" + et + ")(?!px)[a-z%]+$","i")
      , Bt = function(e) {
        var i = e.ownerDocument.defaultView;
        return i && i.opener || (i = t),
        i.getComputedStyle(e)
    }
      , Ft = new RegExp(nt.join("|"),"i");
    function qt(t, e, i) {
        var n, o, r, s, a = t.style;
        return (i = i || Bt(t)) && ("" !== (s = i.getPropertyValue(e) || i[e]) || rt(t) || (s = x.style(t, e)),
        !p.pixelBoxStyles() && Ht.test(s) && Ft.test(e) && (n = a.width,
        o = a.minWidth,
        r = a.maxWidth,
        a.minWidth = a.maxWidth = a.width = s,
        s = i.width,
        a.width = n,
        a.minWidth = o,
        a.maxWidth = r)),
        void 0 !== s ? s + "" : s
    }
    function Qt(t, e) {
        return {
            get: function() {
                if (!t())
                    return (this.get = e).apply(this, arguments);
                delete this.get
            }
        }
    }
    !function() {
        function e() {
            if (u) {
                c.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",
                u.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",
                ot.appendChild(c).appendChild(u);
                var e = t.getComputedStyle(u);
                o = "1%" !== e.top,
                l = 12 === i(e.marginLeft),
                u.style.right = "60%",
                a = 36 === i(e.right),
                r = 36 === i(e.width),
                u.style.position = "absolute",
                s = 12 === i(u.offsetWidth / 3),
                ot.removeChild(c),
                u = null
            }
        }
        function i(t) {
            return Math.round(parseFloat(t))
        }
        var o, r, s, a, l, c = n.createElement("div"), u = n.createElement("div");
        u.style && (u.style.backgroundClip = "content-box",
        u.cloneNode(!0).style.backgroundClip = "",
        p.clearCloneStyle = "content-box" === u.style.backgroundClip,
        x.extend(p, {
            boxSizingReliable: function() {
                return e(),
                r
            },
            pixelBoxStyles: function() {
                return e(),
                a
            },
            pixelPosition: function() {
                return e(),
                o
            },
            reliableMarginLeft: function() {
                return e(),
                l
            },
            scrollboxSize: function() {
                return e(),
                s
            }
        }))
    }();
    var Ut = ["Webkit", "Moz", "ms"]
      , Yt = n.createElement("div").style
      , Zt = {};
    function Gt(t) {
        return x.cssProps[t] || Zt[t] || (t in Yt ? t : Zt[t] = function(t) {
            for (var e = t[0].toUpperCase() + t.slice(1), i = Ut.length; i--; )
                if ((t = Ut[i] + e)in Yt)
                    return t
        }(t) || t)
    }
    var $t = /^(none|table(?!-c[ea]).+)/
      , Xt = /^--/
      , Vt = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }
      , Jt = {
        letterSpacing: "0",
        fontWeight: "400"
    };
    function Kt(t, e, i) {
        var n = it.exec(e);
        return n ? Math.max(0, n[2] - (i || 0)) + (n[3] || "px") : e
    }
    function te(t, e, i, n, o, r) {
        var s = "width" === e ? 1 : 0
          , a = 0
          , l = 0;
        if (i === (n ? "border" : "content"))
            return 0;
        for (; s < 4; s += 2)
            "margin" === i && (l += x.css(t, i + nt[s], !0, o)),
            n ? ("content" === i && (l -= x.css(t, "padding" + nt[s], !0, o)),
            "margin" !== i && (l -= x.css(t, "border" + nt[s] + "Width", !0, o))) : (l += x.css(t, "padding" + nt[s], !0, o),
            "padding" !== i ? l += x.css(t, "border" + nt[s] + "Width", !0, o) : a += x.css(t, "border" + nt[s] + "Width", !0, o));
        return !n && 0 <= r && (l += Math.max(0, Math.ceil(t["offset" + e[0].toUpperCase() + e.slice(1)] - r - l - a - .5)) || 0),
        l
    }
    function ee(t, e, i) {
        var n = Bt(t)
          , o = (!p.boxSizingReliable() || i) && "border-box" === x.css(t, "boxSizing", !1, n)
          , r = o
          , s = qt(t, e, n)
          , a = "offset" + e[0].toUpperCase() + e.slice(1);
        if (Ht.test(s)) {
            if (!i)
                return s;
            s = "auto"
        }
        return (!p.boxSizingReliable() && o || "auto" === s || !parseFloat(s) && "inline" === x.css(t, "display", !1, n)) && t.getClientRects().length && (o = "border-box" === x.css(t, "boxSizing", !1, n),
        (r = a in t) && (s = t[a])),
        (s = parseFloat(s) || 0) + te(t, e, i || (o ? "border" : "content"), r, n, s) + "px"
    }
    function ie(t, e, i, n, o) {
        return new ie.prototype.init(t,e,i,n,o)
    }
    x.extend({
        cssHooks: {
            opacity: {
                get: function(t, e) {
                    if (e) {
                        var i = qt(t, "opacity");
                        return "" === i ? "1" : i
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            gridArea: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnStart: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowStart: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {},
        style: function(t, e, i, n) {
            if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                var o, r, s, a = Z(e), l = Xt.test(e), c = t.style;
                if (l || (e = Gt(a)),
                s = x.cssHooks[e] || x.cssHooks[a],
                void 0 === i)
                    return s && "get"in s && void 0 !== (o = s.get(t, !1, n)) ? o : c[e];
                "string" == (r = typeof i) && (o = it.exec(i)) && o[1] && (i = ct(t, e, o),
                r = "number"),
                null != i && i == i && ("number" !== r || l || (i += o && o[3] || (x.cssNumber[a] ? "" : "px")),
                p.clearCloneStyle || "" !== i || 0 !== e.indexOf("background") || (c[e] = "inherit"),
                s && "set"in s && void 0 === (i = s.set(t, i, n)) || (l ? c.setProperty(e, i) : c[e] = i))
            }
        },
        css: function(t, e, i, n) {
            var o, r, s, a = Z(e);
            return Xt.test(e) || (e = Gt(a)),
            (s = x.cssHooks[e] || x.cssHooks[a]) && "get"in s && (o = s.get(t, !0, i)),
            void 0 === o && (o = qt(t, e, n)),
            "normal" === o && e in Jt && (o = Jt[e]),
            "" === i || i ? (r = parseFloat(o),
            !0 === i || isFinite(r) ? r || 0 : o) : o
        }
    }),
    x.each(["height", "width"], function(t, e) {
        x.cssHooks[e] = {
            get: function(t, i, n) {
                if (i)
                    return !$t.test(x.css(t, "display")) || t.getClientRects().length && t.getBoundingClientRect().width ? ee(t, e, n) : lt(t, Vt, function() {
                        return ee(t, e, n)
                    })
            },
            set: function(t, i, n) {
                var o, r = Bt(t), s = !p.scrollboxSize() && "absolute" === r.position, a = (s || n) && "border-box" === x.css(t, "boxSizing", !1, r), l = n ? te(t, e, n, a, r) : 0;
                return a && s && (l -= Math.ceil(t["offset" + e[0].toUpperCase() + e.slice(1)] - parseFloat(r[e]) - te(t, e, "border", !1, r) - .5)),
                l && (o = it.exec(i)) && "px" !== (o[3] || "px") && (t.style[e] = i,
                i = x.css(t, e)),
                Kt(0, i, l)
            }
        }
    }),
    x.cssHooks.marginLeft = Qt(p.reliableMarginLeft, function(t, e) {
        if (e)
            return (parseFloat(qt(t, "marginLeft")) || t.getBoundingClientRect().left - lt(t, {
                marginLeft: 0
            }, function() {
                return t.getBoundingClientRect().left
            })) + "px"
    }),
    x.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(t, e) {
        x.cssHooks[t + e] = {
            expand: function(i) {
                for (var n = 0, o = {}, r = "string" == typeof i ? i.split(" ") : [i]; n < 4; n++)
                    o[t + nt[n] + e] = r[n] || r[n - 2] || r[0];
                return o
            }
        },
        "margin" !== t && (x.cssHooks[t + e].set = Kt)
    }),
    x.fn.extend({
        css: function(t, e) {
            return q(this, function(t, e, i) {
                var n, o, r = {}, s = 0;
                if (Array.isArray(e)) {
                    for (n = Bt(t),
                    o = e.length; s < o; s++)
                        r[e[s]] = x.css(t, e[s], !1, n);
                    return r
                }
                return void 0 !== i ? x.style(t, e, i) : x.css(t, e)
            }, t, e, 1 < arguments.length)
        }
    }),
    ((x.Tween = ie).prototype = {
        constructor: ie,
        init: function(t, e, i, n, o, r) {
            this.elem = t,
            this.prop = i,
            this.easing = o || x.easing._default,
            this.options = e,
            this.start = this.now = this.cur(),
            this.end = n,
            this.unit = r || (x.cssNumber[i] ? "" : "px")
        },
        cur: function() {
            var t = ie.propHooks[this.prop];
            return t && t.get ? t.get(this) : ie.propHooks._default.get(this)
        },
        run: function(t) {
            var e, i = ie.propHooks[this.prop];
            return this.options.duration ? this.pos = e = x.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t,
            this.now = (this.end - this.start) * e + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            i && i.set ? i.set(this) : ie.propHooks._default.set(this),
            this
        }
    }).init.prototype = ie.prototype,
    (ie.propHooks = {
        _default: {
            get: function(t) {
                var e;
                return 1 !== t.elem.nodeType || null != t.elem[t.prop] && null == t.elem.style[t.prop] ? t.elem[t.prop] : (e = x.css(t.elem, t.prop, "")) && "auto" !== e ? e : 0
            },
            set: function(t) {
                x.fx.step[t.prop] ? x.fx.step[t.prop](t) : 1 !== t.elem.nodeType || !x.cssHooks[t.prop] && null == t.elem.style[Gt(t.prop)] ? t.elem[t.prop] = t.now : x.style(t.elem, t.prop, t.now + t.unit)
            }
        }
    }).scrollTop = ie.propHooks.scrollLeft = {
        set: function(t) {
            t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
        }
    },
    x.easing = {
        linear: function(t) {
            return t
        },
        swing: function(t) {
            return .5 - Math.cos(t * Math.PI) / 2
        },
        _default: "swing"
    },
    x.fx = ie.prototype.init,
    x.fx.step = {};
    var ne, oe, re, se, ae = /^(?:toggle|show|hide)$/, le = /queueHooks$/;
    function ce() {
        oe && (!1 === n.hidden && t.requestAnimationFrame ? t.requestAnimationFrame(ce) : t.setTimeout(ce, x.fx.interval),
        x.fx.tick())
    }
    function ue() {
        return t.setTimeout(function() {
            ne = void 0
        }),
        ne = Date.now()
    }
    function de(t, e) {
        var i, n = 0, o = {
            height: t
        };
        for (e = e ? 1 : 0; n < 4; n += 2 - e)
            o["margin" + (i = nt[n])] = o["padding" + i] = t;
        return e && (o.opacity = o.width = t),
        o
    }
    function he(t, e, i) {
        for (var n, o = (fe.tweeners[e] || []).concat(fe.tweeners["*"]), r = 0, s = o.length; r < s; r++)
            if (n = o[r].call(i, e, t))
                return n
    }
    function fe(t, e, i) {
        var n, o, r = 0, s = fe.prefilters.length, a = x.Deferred().always(function() {
            delete l.elem
        }), l = function() {
            if (o)
                return !1;
            for (var e = ne || ue(), i = Math.max(0, c.startTime + c.duration - e), n = 1 - (i / c.duration || 0), r = 0, s = c.tweens.length; r < s; r++)
                c.tweens[r].run(n);
            return a.notifyWith(t, [c, n, i]),
            n < 1 && s ? i : (s || a.notifyWith(t, [c, 1, 0]),
            a.resolveWith(t, [c]),
            !1)
        }, c = a.promise({
            elem: t,
            props: x.extend({}, e),
            opts: x.extend(!0, {
                specialEasing: {},
                easing: x.easing._default
            }, i),
            originalProperties: e,
            originalOptions: i,
            startTime: ne || ue(),
            duration: i.duration,
            tweens: [],
            createTween: function(e, i) {
                var n = x.Tween(t, c.opts, e, i, c.opts.specialEasing[e] || c.opts.easing);
                return c.tweens.push(n),
                n
            },
            stop: function(e) {
                var i = 0
                  , n = e ? c.tweens.length : 0;
                if (o)
                    return this;
                for (o = !0; i < n; i++)
                    c.tweens[i].run(1);
                return e ? (a.notifyWith(t, [c, 1, 0]),
                a.resolveWith(t, [c, e])) : a.rejectWith(t, [c, e]),
                this
            }
        }), u = c.props;
        for (function(t, e) {
            var i, n, o, r, s;
            for (i in t)
                if (o = e[n = Z(i)],
                r = t[i],
                Array.isArray(r) && (o = r[1],
                r = t[i] = r[0]),
                i !== n && (t[n] = r,
                delete t[i]),
                (s = x.cssHooks[n]) && "expand"in s)
                    for (i in r = s.expand(r),
                    delete t[n],
                    r)
                        i in t || (t[i] = r[i],
                        e[i] = o);
                else
                    e[n] = o
        }(u, c.opts.specialEasing); r < s; r++)
            if (n = fe.prefilters[r].call(c, t, u, c.opts))
                return m(n.stop) && (x._queueHooks(c.elem, c.opts.queue).stop = n.stop.bind(n)),
                n;
        return x.map(u, he, c),
        m(c.opts.start) && c.opts.start.call(t, c),
        c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always),
        x.fx.timer(x.extend(l, {
            elem: t,
            anim: c,
            queue: c.opts.queue
        })),
        c
    }
    x.Animation = x.extend(fe, {
        tweeners: {
            "*": [function(t, e) {
                var i = this.createTween(t, e);
                return ct(i.elem, t, it.exec(e), i),
                i
            }
            ]
        },
        tweener: function(t, e) {
            m(t) ? (e = t,
            t = ["*"]) : t = t.match(z);
            for (var i, n = 0, o = t.length; n < o; n++)
                i = t[n],
                fe.tweeners[i] = fe.tweeners[i] || [],
                fe.tweeners[i].unshift(e)
        },
        prefilters: [function(t, e, i) {
            var n, o, r, s, a, l, c, u, d = "width"in e || "height"in e, h = this, f = {}, p = t.style, m = t.nodeType && at(t), g = X.get(t, "fxshow");
            for (n in i.queue || (null == (s = x._queueHooks(t, "fx")).unqueued && (s.unqueued = 0,
            a = s.empty.fire,
            s.empty.fire = function() {
                s.unqueued || a()
            }
            ),
            s.unqueued++,
            h.always(function() {
                h.always(function() {
                    s.unqueued--,
                    x.queue(t, "fx").length || s.empty.fire()
                })
            })),
            e)
                if (o = e[n],
                ae.test(o)) {
                    if (delete e[n],
                    r = r || "toggle" === o,
                    o === (m ? "hide" : "show")) {
                        if ("show" !== o || !g || void 0 === g[n])
                            continue;
                        m = !0
                    }
                    f[n] = g && g[n] || x.style(t, n)
                }
            if ((l = !x.isEmptyObject(e)) || !x.isEmptyObject(f))
                for (n in d && 1 === t.nodeType && (i.overflow = [p.overflow, p.overflowX, p.overflowY],
                null == (c = g && g.display) && (c = X.get(t, "display")),
                "none" === (u = x.css(t, "display")) && (c ? u = c : (dt([t], !0),
                c = t.style.display || c,
                u = x.css(t, "display"),
                dt([t]))),
                ("inline" === u || "inline-block" === u && null != c) && "none" === x.css(t, "float") && (l || (h.done(function() {
                    p.display = c
                }),
                null == c && (u = p.display,
                c = "none" === u ? "" : u)),
                p.display = "inline-block")),
                i.overflow && (p.overflow = "hidden",
                h.always(function() {
                    p.overflow = i.overflow[0],
                    p.overflowX = i.overflow[1],
                    p.overflowY = i.overflow[2]
                })),
                l = !1,
                f)
                    l || (g ? "hidden"in g && (m = g.hidden) : g = X.access(t, "fxshow", {
                        display: c
                    }),
                    r && (g.hidden = !m),
                    m && dt([t], !0),
                    h.done(function() {
                        for (n in m || dt([t]),
                        X.remove(t, "fxshow"),
                        f)
                            x.style(t, n, f[n])
                    })),
                    l = he(m ? g[n] : 0, n, h),
                    n in g || (g[n] = l.start,
                    m && (l.end = l.start,
                    l.start = 0))
        }
        ],
        prefilter: function(t, e) {
            e ? fe.prefilters.unshift(t) : fe.prefilters.push(t)
        }
    }),
    x.speed = function(t, e, i) {
        var n = t && "object" == typeof t ? x.extend({}, t) : {
            complete: i || !i && e || m(t) && t,
            duration: t,
            easing: i && e || e && !m(e) && e
        };
        return x.fx.off ? n.duration = 0 : "number" != typeof n.duration && (n.duration in x.fx.speeds ? n.duration = x.fx.speeds[n.duration] : n.duration = x.fx.speeds._default),
        null != n.queue && !0 !== n.queue || (n.queue = "fx"),
        n.old = n.complete,
        n.complete = function() {
            m(n.old) && n.old.call(this),
            n.queue && x.dequeue(this, n.queue)
        }
        ,
        n
    }
    ,
    x.fn.extend({
        fadeTo: function(t, e, i, n) {
            return this.filter(at).css("opacity", 0).show().end().animate({
                opacity: e
            }, t, i, n)
        },
        animate: function(t, e, i, n) {
            var o = x.isEmptyObject(t)
              , r = x.speed(e, i, n)
              , s = function() {
                var e = fe(this, x.extend({}, t), r);
                (o || X.get(this, "finish")) && e.stop(!0)
            };
            return s.finish = s,
            o || !1 === r.queue ? this.each(s) : this.queue(r.queue, s)
        },
        stop: function(t, e, i) {
            var n = function(t) {
                var e = t.stop;
                delete t.stop,
                e(i)
            };
            return "string" != typeof t && (i = e,
            e = t,
            t = void 0),
            e && !1 !== t && this.queue(t || "fx", []),
            this.each(function() {
                var e = !0
                  , o = null != t && t + "queueHooks"
                  , r = x.timers
                  , s = X.get(this);
                if (o)
                    s[o] && s[o].stop && n(s[o]);
                else
                    for (o in s)
                        s[o] && s[o].stop && le.test(o) && n(s[o]);
                for (o = r.length; o--; )
                    r[o].elem !== this || null != t && r[o].queue !== t || (r[o].anim.stop(i),
                    e = !1,
                    r.splice(o, 1));
                !e && i || x.dequeue(this, t)
            })
        },
        finish: function(t) {
            return !1 !== t && (t = t || "fx"),
            this.each(function() {
                var e, i = X.get(this), n = i[t + "queue"], o = i[t + "queueHooks"], r = x.timers, s = n ? n.length : 0;
                for (i.finish = !0,
                x.queue(this, t, []),
                o && o.stop && o.stop.call(this, !0),
                e = r.length; e--; )
                    r[e].elem === this && r[e].queue === t && (r[e].anim.stop(!0),
                    r.splice(e, 1));
                for (e = 0; e < s; e++)
                    n[e] && n[e].finish && n[e].finish.call(this);
                delete i.finish
            })
        }
    }),
    x.each(["toggle", "show", "hide"], function(t, e) {
        var i = x.fn[e];
        x.fn[e] = function(t, n, o) {
            return null == t || "boolean" == typeof t ? i.apply(this, arguments) : this.animate(de(e, !0), t, n, o)
        }
    }),
    x.each({
        slideDown: de("show"),
        slideUp: de("hide"),
        slideToggle: de("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(t, e) {
        x.fn[t] = function(t, i, n) {
            return this.animate(e, t, i, n)
        }
    }),
    x.timers = [],
    x.fx.tick = function() {
        var t, e = 0, i = x.timers;
        for (ne = Date.now(); e < i.length; e++)
            (t = i[e])() || i[e] !== t || i.splice(e--, 1);
        i.length || x.fx.stop(),
        ne = void 0
    }
    ,
    x.fx.timer = function(t) {
        x.timers.push(t),
        x.fx.start()
    }
    ,
    x.fx.interval = 13,
    x.fx.start = function() {
        oe || (oe = !0,
        ce())
    }
    ,
    x.fx.stop = function() {
        oe = null
    }
    ,
    x.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    x.fn.delay = function(e, i) {
        return e = x.fx && x.fx.speeds[e] || e,
        i = i || "fx",
        this.queue(i, function(i, n) {
            var o = t.setTimeout(i, e);
            n.stop = function() {
                t.clearTimeout(o)
            }
        })
    }
    ,
    re = n.createElement("input"),
    se = n.createElement("select").appendChild(n.createElement("option")),
    re.type = "checkbox",
    p.checkOn = "" !== re.value,
    p.optSelected = se.selected,
    (re = n.createElement("input")).value = "t",
    re.type = "radio",
    p.radioValue = "t" === re.value;
    var pe, me = x.expr.attrHandle;
    x.fn.extend({
        attr: function(t, e) {
            return q(this, x.attr, t, e, 1 < arguments.length)
        },
        removeAttr: function(t) {
            return this.each(function() {
                x.removeAttr(this, t)
            })
        }
    }),
    x.extend({
        attr: function(t, e, i) {
            var n, o, r = t.nodeType;
            if (3 !== r && 8 !== r && 2 !== r)
                return void 0 === t.getAttribute ? x.prop(t, e, i) : (1 === r && x.isXMLDoc(t) || (o = x.attrHooks[e.toLowerCase()] || (x.expr.match.bool.test(e) ? pe : void 0)),
                void 0 !== i ? null === i ? void x.removeAttr(t, e) : o && "set"in o && void 0 !== (n = o.set(t, i, e)) ? n : (t.setAttribute(e, i + ""),
                i) : o && "get"in o && null !== (n = o.get(t, e)) ? n : null == (n = x.find.attr(t, e)) ? void 0 : n)
        },
        attrHooks: {
            type: {
                set: function(t, e) {
                    if (!p.radioValue && "radio" === e && L(t, "input")) {
                        var i = t.value;
                        return t.setAttribute("type", e),
                        i && (t.value = i),
                        e
                    }
                }
            }
        },
        removeAttr: function(t, e) {
            var i, n = 0, o = e && e.match(z);
            if (o && 1 === t.nodeType)
                for (; i = o[n++]; )
                    t.removeAttribute(i)
        }
    }),
    pe = {
        set: function(t, e, i) {
            return !1 === e ? x.removeAttr(t, i) : t.setAttribute(i, i),
            i
        }
    },
    x.each(x.expr.match.bool.source.match(/\w+/g), function(t, e) {
        var i = me[e] || x.find.attr;
        me[e] = function(t, e, n) {
            var o, r, s = e.toLowerCase();
            return n || (r = me[s],
            me[s] = o,
            o = null != i(t, e, n) ? s : null,
            me[s] = r),
            o
        }
    });
    var ge = /^(?:input|select|textarea|button)$/i
      , ve = /^(?:a|area)$/i;
    function ye(t) {
        return (t.match(z) || []).join(" ")
    }
    function we(t) {
        return t.getAttribute && t.getAttribute("class") || ""
    }
    function be(t) {
        return Array.isArray(t) ? t : "string" == typeof t && t.match(z) || []
    }
    x.fn.extend({
        prop: function(t, e) {
            return q(this, x.prop, t, e, 1 < arguments.length)
        },
        removeProp: function(t) {
            return this.each(function() {
                delete this[x.propFix[t] || t]
            })
        }
    }),
    x.extend({
        prop: function(t, e, i) {
            var n, o, r = t.nodeType;
            if (3 !== r && 8 !== r && 2 !== r)
                return 1 === r && x.isXMLDoc(t) || (e = x.propFix[e] || e,
                o = x.propHooks[e]),
                void 0 !== i ? o && "set"in o && void 0 !== (n = o.set(t, i, e)) ? n : t[e] = i : o && "get"in o && null !== (n = o.get(t, e)) ? n : t[e]
        },
        propHooks: {
            tabIndex: {
                get: function(t) {
                    var e = x.find.attr(t, "tabindex");
                    return e ? parseInt(e, 10) : ge.test(t.nodeName) || ve.test(t.nodeName) && t.href ? 0 : -1
                }
            }
        },
        propFix: {
            for: "htmlFor",
            class: "className"
        }
    }),
    p.optSelected || (x.propHooks.selected = {
        get: function(t) {
            var e = t.parentNode;
            return e && e.parentNode && e.parentNode.selectedIndex,
            null
        },
        set: function(t) {
            var e = t.parentNode;
            e && (e.selectedIndex,
            e.parentNode && e.parentNode.selectedIndex)
        }
    }),
    x.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        x.propFix[this.toLowerCase()] = this
    }),
    x.fn.extend({
        addClass: function(t) {
            var e, i, n, o, r, s, a, l = 0;
            if (m(t))
                return this.each(function(e) {
                    x(this).addClass(t.call(this, e, we(this)))
                });
            if ((e = be(t)).length)
                for (; i = this[l++]; )
                    if (o = we(i),
                    n = 1 === i.nodeType && " " + ye(o) + " ") {
                        for (s = 0; r = e[s++]; )
                            n.indexOf(" " + r + " ") < 0 && (n += r + " ");
                        o !== (a = ye(n)) && i.setAttribute("class", a)
                    }
            return this
        },
        removeClass: function(t) {
            var e, i, n, o, r, s, a, l = 0;
            if (m(t))
                return this.each(function(e) {
                    x(this).removeClass(t.call(this, e, we(this)))
                });
            if (!arguments.length)
                return this.attr("class", "");
            if ((e = be(t)).length)
                for (; i = this[l++]; )
                    if (o = we(i),
                    n = 1 === i.nodeType && " " + ye(o) + " ") {
                        for (s = 0; r = e[s++]; )
                            for (; -1 < n.indexOf(" " + r + " "); )
                                n = n.replace(" " + r + " ", " ");
                        o !== (a = ye(n)) && i.setAttribute("class", a)
                    }
            return this
        },
        toggleClass: function(t, e) {
            var i = typeof t
              , n = "string" === i || Array.isArray(t);
            return "boolean" == typeof e && n ? e ? this.addClass(t) : this.removeClass(t) : m(t) ? this.each(function(i) {
                x(this).toggleClass(t.call(this, i, we(this), e), e)
            }) : this.each(function() {
                var e, o, r, s;
                if (n)
                    for (o = 0,
                    r = x(this),
                    s = be(t); e = s[o++]; )
                        r.hasClass(e) ? r.removeClass(e) : r.addClass(e);
                else
                    void 0 !== t && "boolean" !== i || ((e = we(this)) && X.set(this, "__className__", e),
                    this.setAttribute && this.setAttribute("class", e || !1 === t ? "" : X.get(this, "__className__") || ""))
            })
        },
        hasClass: function(t) {
            var e, i, n = 0;
            for (e = " " + t + " "; i = this[n++]; )
                if (1 === i.nodeType && -1 < (" " + ye(we(i)) + " ").indexOf(e))
                    return !0;
            return !1
        }
    });
    var xe = /\r/g;
    x.fn.extend({
        val: function(t) {
            var e, i, n, o = this[0];
            return arguments.length ? (n = m(t),
            this.each(function(i) {
                var o;
                1 === this.nodeType && (null == (o = n ? t.call(this, i, x(this).val()) : t) ? o = "" : "number" == typeof o ? o += "" : Array.isArray(o) && (o = x.map(o, function(t) {
                    return null == t ? "" : t + ""
                })),
                (e = x.valHooks[this.type] || x.valHooks[this.nodeName.toLowerCase()]) && "set"in e && void 0 !== e.set(this, o, "value") || (this.value = o))
            })) : o ? (e = x.valHooks[o.type] || x.valHooks[o.nodeName.toLowerCase()]) && "get"in e && void 0 !== (i = e.get(o, "value")) ? i : "string" == typeof (i = o.value) ? i.replace(xe, "") : null == i ? "" : i : void 0
        }
    }),
    x.extend({
        valHooks: {
            option: {
                get: function(t) {
                    var e = x.find.attr(t, "value");
                    return null != e ? e : ye(x.text(t))
                }
            },
            select: {
                get: function(t) {
                    var e, i, n, o = t.options, r = t.selectedIndex, s = "select-one" === t.type, a = s ? null : [], l = s ? r + 1 : o.length;
                    for (n = r < 0 ? l : s ? r : 0; n < l; n++)
                        if (((i = o[n]).selected || n === r) && !i.disabled && (!i.parentNode.disabled || !L(i.parentNode, "optgroup"))) {
                            if (e = x(i).val(),
                            s)
                                return e;
                            a.push(e)
                        }
                    return a
                },
                set: function(t, e) {
                    for (var i, n, o = t.options, r = x.makeArray(e), s = o.length; s--; )
                        ((n = o[s]).selected = -1 < x.inArray(x.valHooks.option.get(n), r)) && (i = !0);
                    return i || (t.selectedIndex = -1),
                    r
                }
            }
        }
    }),
    x.each(["radio", "checkbox"], function() {
        x.valHooks[this] = {
            set: function(t, e) {
                if (Array.isArray(e))
                    return t.checked = -1 < x.inArray(x(t).val(), e)
            }
        },
        p.checkOn || (x.valHooks[this].get = function(t) {
            return null === t.getAttribute("value") ? "on" : t.value
        }
        )
    }),
    p.focusin = "onfocusin"in t;
    var Se = /^(?:focusinfocus|focusoutblur)$/
      , Ce = function(t) {
        t.stopPropagation()
    };
    x.extend(x.event, {
        trigger: function(e, i, o, r) {
            var s, a, l, c, u, h, f, p, v = [o || n], y = d.call(e, "type") ? e.type : e, w = d.call(e, "namespace") ? e.namespace.split(".") : [];
            if (a = p = l = o = o || n,
            3 !== o.nodeType && 8 !== o.nodeType && !Se.test(y + x.event.triggered) && (-1 < y.indexOf(".") && (y = (w = y.split(".")).shift(),
            w.sort()),
            u = y.indexOf(":") < 0 && "on" + y,
            (e = e[x.expando] ? e : new x.Event(y,"object" == typeof e && e)).isTrigger = r ? 2 : 3,
            e.namespace = w.join("."),
            e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + w.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
            e.result = void 0,
            e.target || (e.target = o),
            i = null == i ? [e] : x.makeArray(i, [e]),
            f = x.event.special[y] || {},
            r || !f.trigger || !1 !== f.trigger.apply(o, i))) {
                if (!r && !f.noBubble && !g(o)) {
                    for (c = f.delegateType || y,
                    Se.test(c + y) || (a = a.parentNode); a; a = a.parentNode)
                        v.push(a),
                        l = a;
                    l === (o.ownerDocument || n) && v.push(l.defaultView || l.parentWindow || t)
                }
                for (s = 0; (a = v[s++]) && !e.isPropagationStopped(); )
                    p = a,
                    e.type = 1 < s ? c : f.bindType || y,
                    (h = (X.get(a, "events") || {})[e.type] && X.get(a, "handle")) && h.apply(a, i),
                    (h = u && a[u]) && h.apply && G(a) && (e.result = h.apply(a, i),
                    !1 === e.result && e.preventDefault());
                return e.type = y,
                r || e.isDefaultPrevented() || f._default && !1 !== f._default.apply(v.pop(), i) || !G(o) || u && m(o[y]) && !g(o) && ((l = o[u]) && (o[u] = null),
                x.event.triggered = y,
                e.isPropagationStopped() && p.addEventListener(y, Ce),
                o[y](),
                e.isPropagationStopped() && p.removeEventListener(y, Ce),
                x.event.triggered = void 0,
                l && (o[u] = l)),
                e.result
            }
        },
        simulate: function(t, e, i) {
            var n = x.extend(new x.Event, i, {
                type: t,
                isSimulated: !0
            });
            x.event.trigger(n, null, e)
        }
    }),
    x.fn.extend({
        trigger: function(t, e) {
            return this.each(function() {
                x.event.trigger(t, e, this)
            })
        },
        triggerHandler: function(t, e) {
            var i = this[0];
            if (i)
                return x.event.trigger(t, e, i, !0)
        }
    }),
    p.focusin || x.each({
        focus: "focusin",
        blur: "focusout"
    }, function(t, e) {
        var i = function(t) {
            x.event.simulate(e, t.target, x.event.fix(t))
        };
        x.event.special[e] = {
            setup: function() {
                var n = this.ownerDocument || this
                  , o = X.access(n, e);
                o || n.addEventListener(t, i, !0),
                X.access(n, e, (o || 0) + 1)
            },
            teardown: function() {
                var n = this.ownerDocument || this
                  , o = X.access(n, e) - 1;
                o ? X.access(n, e, o) : (n.removeEventListener(t, i, !0),
                X.remove(n, e))
            }
        }
    });
    var Ie = t.location
      , _e = Date.now()
      , Te = /\?/;
    x.parseXML = function(e) {
        var i;
        if (!e || "string" != typeof e)
            return null;
        try {
            i = (new t.DOMParser).parseFromString(e, "text/xml")
        } catch (e) {
            i = void 0
        }
        return i && !i.getElementsByTagName("parsererror").length || x.error("Invalid XML: " + e),
        i
    }
    ;
    var Ee = /\[\]$/
      , Le = /\r?\n/g
      , Me = /^(?:submit|button|image|reset|file)$/i
      , Ne = /^(?:input|select|textarea|keygen)/i;
    function De(t, e, i, n) {
        var o;
        if (Array.isArray(e))
            x.each(e, function(e, o) {
                i || Ee.test(t) ? n(t, o) : De(t + "[" + ("object" == typeof o && null != o ? e : "") + "]", o, i, n)
            });
        else if (i || "object" !== w(e))
            n(t, e);
        else
            for (o in e)
                De(t + "[" + o + "]", e[o], i, n)
    }
    x.param = function(t, e) {
        var i, n = [], o = function(t, e) {
            var i = m(e) ? e() : e;
            n[n.length] = encodeURIComponent(t) + "=" + encodeURIComponent(null == i ? "" : i)
        };
        if (null == t)
            return "";
        if (Array.isArray(t) || t.jquery && !x.isPlainObject(t))
            x.each(t, function() {
                o(this.name, this.value)
            });
        else
            for (i in t)
                De(i, t[i], e, o);
        return n.join("&")
    }
    ,
    x.fn.extend({
        serialize: function() {
            return x.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var t = x.prop(this, "elements");
                return t ? x.makeArray(t) : this
            }).filter(function() {
                var t = this.type;
                return this.name && !x(this).is(":disabled") && Ne.test(this.nodeName) && !Me.test(t) && (this.checked || !ht.test(t))
            }).map(function(t, e) {
                var i = x(this).val();
                return null == i ? null : Array.isArray(i) ? x.map(i, function(t) {
                    return {
                        name: e.name,
                        value: t.replace(Le, "\r\n")
                    }
                }) : {
                    name: e.name,
                    value: i.replace(Le, "\r\n")
                }
            }).get()
        }
    });
    var ke = /%20/g
      , je = /#.*$/
      , Ae = /([?&])_=[^&]*/
      , Oe = /^(.*?):[ \t]*([^\r\n]*)$/gm
      , ze = /^(?:GET|HEAD)$/
      , Pe = /^\/\//
      , Re = {}
      , We = {}
      , He = "*/".concat("*")
      , Be = n.createElement("a");
    function Fe(t) {
        return function(e, i) {
            "string" != typeof e && (i = e,
            e = "*");
            var n, o = 0, r = e.toLowerCase().match(z) || [];
            if (m(i))
                for (; n = r[o++]; )
                    "+" === n[0] ? (n = n.slice(1) || "*",
                    (t[n] = t[n] || []).unshift(i)) : (t[n] = t[n] || []).push(i)
        }
    }
    function qe(t, e, i, n) {
        var o = {}
          , r = t === We;
        function s(a) {
            var l;
            return o[a] = !0,
            x.each(t[a] || [], function(t, a) {
                var c = a(e, i, n);
                return "string" != typeof c || r || o[c] ? r ? !(l = c) : void 0 : (e.dataTypes.unshift(c),
                s(c),
                !1)
            }),
            l
        }
        return s(e.dataTypes[0]) || !o["*"] && s("*")
    }
    function Qe(t, e) {
        var i, n, o = x.ajaxSettings.flatOptions || {};
        for (i in e)
            void 0 !== e[i] && ((o[i] ? t : n || (n = {}))[i] = e[i]);
        return n && x.extend(!0, t, n),
        t
    }
    Be.href = Ie.href,
    x.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Ie.href,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Ie.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": He,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": x.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(t, e) {
            return e ? Qe(Qe(t, x.ajaxSettings), e) : Qe(x.ajaxSettings, t)
        },
        ajaxPrefilter: Fe(Re),
        ajaxTransport: Fe(We),
        ajax: function(e, i) {
            "object" == typeof e && (i = e,
            e = void 0),
            i = i || {};
            var o, r, s, a, l, c, u, d, h, f, p = x.ajaxSetup({}, i), m = p.context || p, g = p.context && (m.nodeType || m.jquery) ? x(m) : x.event, v = x.Deferred(), y = x.Callbacks("once memory"), w = p.statusCode || {}, b = {}, S = {}, C = "canceled", I = {
                readyState: 0,
                getResponseHeader: function(t) {
                    var e;
                    if (u) {
                        if (!a)
                            for (a = {}; e = Oe.exec(s); )
                                a[e[1].toLowerCase() + " "] = (a[e[1].toLowerCase() + " "] || []).concat(e[2]);
                        e = a[t.toLowerCase() + " "]
                    }
                    return null == e ? null : e.join(", ")
                },
                getAllResponseHeaders: function() {
                    return u ? s : null
                },
                setRequestHeader: function(t, e) {
                    return null == u && (t = S[t.toLowerCase()] = S[t.toLowerCase()] || t,
                    b[t] = e),
                    this
                },
                overrideMimeType: function(t) {
                    return null == u && (p.mimeType = t),
                    this
                },
                statusCode: function(t) {
                    var e;
                    if (t)
                        if (u)
                            I.always(t[I.status]);
                        else
                            for (e in t)
                                w[e] = [w[e], t[e]];
                    return this
                },
                abort: function(t) {
                    var e = t || C;
                    return o && o.abort(e),
                    _(0, e),
                    this
                }
            };
            if (v.promise(I),
            p.url = ((e || p.url || Ie.href) + "").replace(Pe, Ie.protocol + "//"),
            p.type = i.method || i.type || p.method || p.type,
            p.dataTypes = (p.dataType || "*").toLowerCase().match(z) || [""],
            null == p.crossDomain) {
                c = n.createElement("a");
                try {
                    c.href = p.url,
                    c.href = c.href,
                    p.crossDomain = Be.protocol + "//" + Be.host != c.protocol + "//" + c.host
                } catch (e) {
                    p.crossDomain = !0
                }
            }
            if (p.data && p.processData && "string" != typeof p.data && (p.data = x.param(p.data, p.traditional)),
            qe(Re, p, i, I),
            u)
                return I;
            for (h in (d = x.event && p.global) && 0 == x.active++ && x.event.trigger("ajaxStart"),
            p.type = p.type.toUpperCase(),
            p.hasContent = !ze.test(p.type),
            r = p.url.replace(je, ""),
            p.hasContent ? p.data && p.processData && 0 === (p.contentType || "").indexOf("application/x-www-form-urlencoded") && (p.data = p.data.replace(ke, "+")) : (f = p.url.slice(r.length),
            p.data && (p.processData || "string" == typeof p.data) && (r += (Te.test(r) ? "&" : "?") + p.data,
            delete p.data),
            !1 === p.cache && (r = r.replace(Ae, "$1"),
            f = (Te.test(r) ? "&" : "?") + "_=" + _e++ + f),
            p.url = r + f),
            p.ifModified && (x.lastModified[r] && I.setRequestHeader("If-Modified-Since", x.lastModified[r]),
            x.etag[r] && I.setRequestHeader("If-None-Match", x.etag[r])),
            (p.data && p.hasContent && !1 !== p.contentType || i.contentType) && I.setRequestHeader("Content-Type", p.contentType),
            I.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + He + "; q=0.01" : "") : p.accepts["*"]),
            p.headers)
                I.setRequestHeader(h, p.headers[h]);
            if (p.beforeSend && (!1 === p.beforeSend.call(m, I, p) || u))
                return I.abort();
            if (C = "abort",
            y.add(p.complete),
            I.done(p.success),
            I.fail(p.error),
            o = qe(We, p, i, I)) {
                if (I.readyState = 1,
                d && g.trigger("ajaxSend", [I, p]),
                u)
                    return I;
                p.async && 0 < p.timeout && (l = t.setTimeout(function() {
                    I.abort("timeout")
                }, p.timeout));
                try {
                    u = !1,
                    o.send(b, _)
                } catch (e) {
                    if (u)
                        throw e;
                    _(-1, e)
                }
            } else
                _(-1, "No Transport");
            function _(e, i, n, a) {
                var c, h, f, b, S, C = i;
                u || (u = !0,
                l && t.clearTimeout(l),
                o = void 0,
                s = a || "",
                I.readyState = 0 < e ? 4 : 0,
                c = 200 <= e && e < 300 || 304 === e,
                n && (b = function(t, e, i) {
                    for (var n, o, r, s, a = t.contents, l = t.dataTypes; "*" === l[0]; )
                        l.shift(),
                        void 0 === n && (n = t.mimeType || e.getResponseHeader("Content-Type"));
                    if (n)
                        for (o in a)
                            if (a[o] && a[o].test(n)) {
                                l.unshift(o);
                                break
                            }
                    if (l[0]in i)
                        r = l[0];
                    else {
                        for (o in i) {
                            if (!l[0] || t.converters[o + " " + l[0]]) {
                                r = o;
                                break
                            }
                            s || (s = o)
                        }
                        r = r || s
                    }
                    if (r)
                        return r !== l[0] && l.unshift(r),
                        i[r]
                }(p, I, n)),
                b = function(t, e, i, n) {
                    var o, r, s, a, l, c = {}, u = t.dataTypes.slice();
                    if (u[1])
                        for (s in t.converters)
                            c[s.toLowerCase()] = t.converters[s];
                    for (r = u.shift(); r; )
                        if (t.responseFields[r] && (i[t.responseFields[r]] = e),
                        !l && n && t.dataFilter && (e = t.dataFilter(e, t.dataType)),
                        l = r,
                        r = u.shift())
                            if ("*" === r)
                                r = l;
                            else if ("*" !== l && l !== r) {
                                if (!(s = c[l + " " + r] || c["* " + r]))
                                    for (o in c)
                                        if ((a = o.split(" "))[1] === r && (s = c[l + " " + a[0]] || c["* " + a[0]])) {
                                            !0 === s ? s = c[o] : !0 !== c[o] && (r = a[0],
                                            u.unshift(a[1]));
                                            break
                                        }
                                if (!0 !== s)
                                    if (s && t.throws)
                                        e = s(e);
                                    else
                                        try {
                                            e = s(e)
                                        } catch (t) {
                                            return {
                                                state: "parsererror",
                                                error: s ? t : "No conversion from " + l + " to " + r
                                            }
                                        }
                            }
                    return {
                        state: "success",
                        data: e
                    }
                }(p, b, I, c),
                c ? (p.ifModified && ((S = I.getResponseHeader("Last-Modified")) && (x.lastModified[r] = S),
                (S = I.getResponseHeader("etag")) && (x.etag[r] = S)),
                204 === e || "HEAD" === p.type ? C = "nocontent" : 304 === e ? C = "notmodified" : (C = b.state,
                h = b.data,
                c = !(f = b.error))) : (f = C,
                !e && C || (C = "error",
                e < 0 && (e = 0))),
                I.status = e,
                I.statusText = (i || C) + "",
                c ? v.resolveWith(m, [h, C, I]) : v.rejectWith(m, [I, C, f]),
                I.statusCode(w),
                w = void 0,
                d && g.trigger(c ? "ajaxSuccess" : "ajaxError", [I, p, c ? h : f]),
                y.fireWith(m, [I, C]),
                d && (g.trigger("ajaxComplete", [I, p]),
                --x.active || x.event.trigger("ajaxStop")))
            }
            return I
        },
        getJSON: function(t, e, i) {
            return x.get(t, e, i, "json")
        },
        getScript: function(t, e) {
            return x.get(t, void 0, e, "script")
        }
    }),
    x.each(["get", "post"], function(t, e) {
        x[e] = function(t, i, n, o) {
            return m(i) && (o = o || n,
            n = i,
            i = void 0),
            x.ajax(x.extend({
                url: t,
                type: e,
                dataType: o,
                data: i,
                success: n
            }, x.isPlainObject(t) && t))
        }
    }),
    x._evalUrl = function(t, e) {
        return x.ajax({
            url: t,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            converters: {
                "text script": function() {}
            },
            dataFilter: function(t) {
                x.globalEval(t, e)
            }
        })
    }
    ,
    x.fn.extend({
        wrapAll: function(t) {
            var e;
            return this[0] && (m(t) && (t = t.call(this[0])),
            e = x(t, this[0].ownerDocument).eq(0).clone(!0),
            this[0].parentNode && e.insertBefore(this[0]),
            e.map(function() {
                for (var t = this; t.firstElementChild; )
                    t = t.firstElementChild;
                return t
            }).append(this)),
            this
        },
        wrapInner: function(t) {
            return m(t) ? this.each(function(e) {
                x(this).wrapInner(t.call(this, e))
            }) : this.each(function() {
                var e = x(this)
                  , i = e.contents();
                i.length ? i.wrapAll(t) : e.append(t)
            })
        },
        wrap: function(t) {
            var e = m(t);
            return this.each(function(i) {
                x(this).wrapAll(e ? t.call(this, i) : t)
            })
        },
        unwrap: function(t) {
            return this.parent(t).not("body").each(function() {
                x(this).replaceWith(this.childNodes)
            }),
            this
        }
    }),
    x.expr.pseudos.hidden = function(t) {
        return !x.expr.pseudos.visible(t)
    }
    ,
    x.expr.pseudos.visible = function(t) {
        return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length)
    }
    ,
    x.ajaxSettings.xhr = function() {
        try {
            return new t.XMLHttpRequest
        } catch (t) {}
    }
    ;
    var Ue = {
        0: 200,
        1223: 204
    }
      , Ye = x.ajaxSettings.xhr();
    p.cors = !!Ye && "withCredentials"in Ye,
    p.ajax = Ye = !!Ye,
    x.ajaxTransport(function(e) {
        var i, n;
        if (p.cors || Ye && !e.crossDomain)
            return {
                send: function(o, r) {
                    var s, a = e.xhr();
                    if (a.open(e.type, e.url, e.async, e.username, e.password),
                    e.xhrFields)
                        for (s in e.xhrFields)
                            a[s] = e.xhrFields[s];
                    for (s in e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType),
                    e.crossDomain || o["X-Requested-With"] || (o["X-Requested-With"] = "XMLHttpRequest"),
                    o)
                        a.setRequestHeader(s, o[s]);
                    i = function(t) {
                        return function() {
                            i && (i = n = a.onload = a.onerror = a.onabort = a.ontimeout = a.onreadystatechange = null,
                            "abort" === t ? a.abort() : "error" === t ? "number" != typeof a.status ? r(0, "error") : r(a.status, a.statusText) : r(Ue[a.status] || a.status, a.statusText, "text" !== (a.responseType || "text") || "string" != typeof a.responseText ? {
                                binary: a.response
                            } : {
                                text: a.responseText
                            }, a.getAllResponseHeaders()))
                        }
                    }
                    ,
                    a.onload = i(),
                    n = a.onerror = a.ontimeout = i("error"),
                    void 0 !== a.onabort ? a.onabort = n : a.onreadystatechange = function() {
                        4 === a.readyState && t.setTimeout(function() {
                            i && n()
                        })
                    }
                    ,
                    i = i("abort");
                    try {
                        a.send(e.hasContent && e.data || null)
                    } catch (o) {
                        if (i)
                            throw o
                    }
                },
                abort: function() {
                    i && i()
                }
            }
    }),
    x.ajaxPrefilter(function(t) {
        t.crossDomain && (t.contents.script = !1)
    }),
    x.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(t) {
                return x.globalEval(t),
                t
            }
        }
    }),
    x.ajaxPrefilter("script", function(t) {
        void 0 === t.cache && (t.cache = !1),
        t.crossDomain && (t.type = "GET")
    }),
    x.ajaxTransport("script", function(t) {
        var e, i;
        if (t.crossDomain || t.scriptAttrs)
            return {
                send: function(o, r) {
                    e = x("<script>").attr(t.scriptAttrs || {}).prop({
                        charset: t.scriptCharset,
                        src: t.url
                    }).on("load error", i = function(t) {
                        e.remove(),
                        i = null,
                        t && r("error" === t.type ? 404 : 200, t.type)
                    }
                    ),
                    n.head.appendChild(e[0])
                },
                abort: function() {
                    i && i()
                }
            }
    });
    var Ze, Ge = [], $e = /(=)\?(?=&|$)|\?\?/;
    x.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var t = Ge.pop() || x.expando + "_" + _e++;
            return this[t] = !0,
            t
        }
    }),
    x.ajaxPrefilter("json jsonp", function(e, i, n) {
        var o, r, s, a = !1 !== e.jsonp && ($e.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && $e.test(e.data) && "data");
        if (a || "jsonp" === e.dataTypes[0])
            return o = e.jsonpCallback = m(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback,
            a ? e[a] = e[a].replace($e, "$1" + o) : !1 !== e.jsonp && (e.url += (Te.test(e.url) ? "&" : "?") + e.jsonp + "=" + o),
            e.converters["script json"] = function() {
                return s || x.error(o + " was not called"),
                s[0]
            }
            ,
            e.dataTypes[0] = "json",
            r = t[o],
            t[o] = function() {
                s = arguments
            }
            ,
            n.always(function() {
                void 0 === r ? x(t).removeProp(o) : t[o] = r,
                e[o] && (e.jsonpCallback = i.jsonpCallback,
                Ge.push(o)),
                s && m(r) && r(s[0]),
                s = r = void 0
            }),
            "script"
    }),
    p.createHTMLDocument = ((Ze = n.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>",
    2 === Ze.childNodes.length),
    x.parseHTML = function(t, e, i) {
        return "string" != typeof t ? [] : ("boolean" == typeof e && (i = e,
        e = !1),
        e || (p.createHTMLDocument ? ((o = (e = n.implementation.createHTMLDocument("")).createElement("base")).href = n.location.href,
        e.head.appendChild(o)) : e = n),
        s = !i && [],
        (r = M.exec(t)) ? [e.createElement(r[1])] : (r = xt([t], e, s),
        s && s.length && x(s).remove(),
        x.merge([], r.childNodes)));
        var o, r, s
    }
    ,
    x.fn.load = function(t, e, i) {
        var n, o, r, s = this, a = t.indexOf(" ");
        return -1 < a && (n = ye(t.slice(a)),
        t = t.slice(0, a)),
        m(e) ? (i = e,
        e = void 0) : e && "object" == typeof e && (o = "POST"),
        0 < s.length && x.ajax({
            url: t,
            type: o || "GET",
            dataType: "html",
            data: e
        }).done(function(t) {
            r = arguments,
            s.html(n ? x("<div>").append(x.parseHTML(t)).find(n) : t)
        }).always(i && function(t, e) {
            s.each(function() {
                i.apply(this, r || [t.responseText, e, t])
            })
        }
        ),
        this
    }
    ,
    x.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, e) {
        x.fn[e] = function(t) {
            return this.on(e, t)
        }
    }),
    x.expr.pseudos.animated = function(t) {
        return x.grep(x.timers, function(e) {
            return t === e.elem
        }).length
    }
    ,
    x.offset = {
        setOffset: function(t, e, i) {
            var n, o, r, s, a, l, c = x.css(t, "position"), u = x(t), d = {};
            "static" === c && (t.style.position = "relative"),
            a = u.offset(),
            r = x.css(t, "top"),
            l = x.css(t, "left"),
            ("absolute" === c || "fixed" === c) && -1 < (r + l).indexOf("auto") ? (s = (n = u.position()).top,
            o = n.left) : (s = parseFloat(r) || 0,
            o = parseFloat(l) || 0),
            m(e) && (e = e.call(t, i, x.extend({}, a))),
            null != e.top && (d.top = e.top - a.top + s),
            null != e.left && (d.left = e.left - a.left + o),
            "using"in e ? e.using.call(t, d) : u.css(d)
        }
    },
    x.fn.extend({
        offset: function(t) {
            if (arguments.length)
                return void 0 === t ? this : this.each(function(e) {
                    x.offset.setOffset(this, t, e)
                });
            var e, i, n = this[0];
            return n ? n.getClientRects().length ? (e = n.getBoundingClientRect(),
            i = n.ownerDocument.defaultView,
            {
                top: e.top + i.pageYOffset,
                left: e.left + i.pageXOffset
            }) : {
                top: 0,
                left: 0
            } : void 0
        },
        position: function() {
            if (this[0]) {
                var t, e, i, n = this[0], o = {
                    top: 0,
                    left: 0
                };
                if ("fixed" === x.css(n, "position"))
                    e = n.getBoundingClientRect();
                else {
                    for (e = this.offset(),
                    i = n.ownerDocument,
                    t = n.offsetParent || i.documentElement; t && (t === i.body || t === i.documentElement) && "static" === x.css(t, "position"); )
                        t = t.parentNode;
                    t && t !== n && 1 === t.nodeType && ((o = x(t).offset()).top += x.css(t, "borderTopWidth", !0),
                    o.left += x.css(t, "borderLeftWidth", !0))
                }
                return {
                    top: e.top - o.top - x.css(n, "marginTop", !0),
                    left: e.left - o.left - x.css(n, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var t = this.offsetParent; t && "static" === x.css(t, "position"); )
                    t = t.offsetParent;
                return t || ot
            })
        }
    }),
    x.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, e) {
        var i = "pageYOffset" === e;
        x.fn[t] = function(n) {
            return q(this, function(t, n, o) {
                var r;
                if (g(t) ? r = t : 9 === t.nodeType && (r = t.defaultView),
                void 0 === o)
                    return r ? r[e] : t[n];
                r ? r.scrollTo(i ? r.pageXOffset : o, i ? o : r.pageYOffset) : t[n] = o
            }, t, n, arguments.length)
        }
    }),
    x.each(["top", "left"], function(t, e) {
        x.cssHooks[e] = Qt(p.pixelPosition, function(t, i) {
            if (i)
                return i = qt(t, e),
                Ht.test(i) ? x(t).position()[e] + "px" : i
        })
    }),
    x.each({
        Height: "height",
        Width: "width"
    }, function(t, e) {
        x.each({
            padding: "inner" + t,
            content: e,
            "": "outer" + t
        }, function(i, n) {
            x.fn[n] = function(o, r) {
                var s = arguments.length && (i || "boolean" != typeof o)
                  , a = i || (!0 === o || !0 === r ? "margin" : "border");
                return q(this, function(e, i, o) {
                    var r;
                    return g(e) ? 0 === n.indexOf("outer") ? e["inner" + t] : e.document.documentElement["client" + t] : 9 === e.nodeType ? (r = e.documentElement,
                    Math.max(e.body["scroll" + t], r["scroll" + t], e.body["offset" + t], r["offset" + t], r["client" + t])) : void 0 === o ? x.css(e, i, a) : x.style(e, i, o, a)
                }, e, s ? o : void 0, s)
            }
        })
    }),
    x.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(t, e) {
        x.fn[e] = function(t, i) {
            return 0 < arguments.length ? this.on(e, null, t, i) : this.trigger(e)
        }
    }),
    x.fn.extend({
        hover: function(t, e) {
            return this.mouseenter(t).mouseleave(e || t)
        }
    }),
    x.fn.extend({
        bind: function(t, e, i) {
            return this.on(t, null, e, i)
        },
        unbind: function(t, e) {
            return this.off(t, null, e)
        },
        delegate: function(t, e, i, n) {
            return this.on(e, t, i, n)
        },
        undelegate: function(t, e, i) {
            return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", i)
        }
    }),
    x.proxy = function(t, e) {
        var i, n, o;
        if ("string" == typeof e && (i = t[e],
        e = t,
        t = i),
        m(t))
            return n = r.call(arguments, 2),
            (o = function() {
                return t.apply(e || this, n.concat(r.call(arguments)))
            }
            ).guid = t.guid = t.guid || x.guid++,
            o
    }
    ,
    x.holdReady = function(t) {
        t ? x.readyWait++ : x.ready(!0)
    }
    ,
    x.isArray = Array.isArray,
    x.parseJSON = JSON.parse,
    x.nodeName = L,
    x.isFunction = m,
    x.isWindow = g,
    x.camelCase = Z,
    x.type = w,
    x.now = Date.now,
    x.isNumeric = function(t) {
        var e = x.type(t);
        return ("number" === e || "string" === e) && !isNaN(t - parseFloat(t))
    }
    ,
    "function" == typeof define && define.amd && define("jquery", [], function() {
        return x
    });
    var Xe = t.jQuery
      , Ve = t.$;
    return x.noConflict = function(e) {
        return t.$ === x && (t.$ = Ve),
        e && t.jQuery === x && (t.jQuery = Xe),
        x
    }
    ,
    e || (t.jQuery = t.$ = x),
    x
}),
function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], e) : e((t = t || self).bootstrap = {}, t.jQuery, t.Popper)
}(this, function(t, e, i) {
    "use strict";
    function n(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n)
        }
    }
    function o(t, e, i) {
        return e && n(t.prototype, e),
        i && n(t, i),
        t
    }
    function r(t, e) {
        var i = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e && (n = n.filter(function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            })),
            i.push.apply(i, n)
        }
        return i
    }
    function s(t) {
        for (var e = 1; e < arguments.length; e++) {
            var i = null != arguments[e] ? arguments[e] : {};
            e % 2 ? r(Object(i), !0).forEach(function(e) {
                var n, o, r;
                n = t,
                r = i[o = e],
                o in n ? Object.defineProperty(n, o, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : n[o] = r
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : r(Object(i)).forEach(function(e) {
                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e))
            })
        }
        return t
    }
    e = e && e.hasOwnProperty("default") ? e.default : e,
    i = i && i.hasOwnProperty("default") ? i.default : i;
    var a = "transitionend"
      , l = {
        TRANSITION_END: "bsTransitionEnd",
        getUID: function(t) {
            for (; t += ~~(1e6 * Math.random()),
            document.getElementById(t); )
                ;
            return t
        },
        getSelectorFromElement: function(t) {
            var e = t.getAttribute("data-target");
            if (!e || "#" === e) {
                var i = t.getAttribute("href");
                e = i && "#" !== i ? i.trim() : ""
            }
            try {
                return document.querySelector(e) ? e : null
            } catch (t) {
                return null
            }
        },
        getTransitionDurationFromElement: function(t) {
            if (!t)
                return 0;
            var i = e(t).css("transition-duration")
              , n = e(t).css("transition-delay")
              , o = parseFloat(i)
              , r = parseFloat(n);
            return o || r ? (i = i.split(",")[0],
            n = n.split(",")[0],
            1e3 * (parseFloat(i) + parseFloat(n))) : 0
        },
        reflow: function(t) {
            return t.offsetHeight
        },
        triggerTransitionEnd: function(t) {
            e(t).trigger(a)
        },
        supportsTransitionEnd: function() {
            return Boolean(a)
        },
        isElement: function(t) {
            return (t[0] || t).nodeType
        },
        typeCheckConfig: function(t, e, i) {
            for (var n in i)
                if (Object.prototype.hasOwnProperty.call(i, n)) {
                    var o = i[n]
                      , r = e[n]
                      , s = r && l.isElement(r) ? "element" : (a = r,
                    {}.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase());
                    if (!new RegExp(o).test(s))
                        throw new Error(t.toUpperCase() + ': Option "' + n + '" provided type "' + s + '" but expected type "' + o + '".')
                }
            var a
        },
        findShadowRoot: function(t) {
            if (!document.documentElement.attachShadow)
                return null;
            if ("function" != typeof t.getRootNode)
                return t instanceof ShadowRoot ? t : t.parentNode ? l.findShadowRoot(t.parentNode) : null;
            var e = t.getRootNode();
            return e instanceof ShadowRoot ? e : null
        },
        jQueryDetection: function() {
            if (void 0 === e)
                throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
            var t = e.fn.jquery.split(" ")[0].split(".");
            if (t[0] < 2 && t[1] < 9 || 1 === t[0] && 9 === t[1] && t[2] < 1 || 4 <= t[0])
                throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
        }
    };
    l.jQueryDetection(),
    e.fn.emulateTransitionEnd = function(t) {
        var i = this
          , n = !1;
        return e(this).one(l.TRANSITION_END, function() {
            n = !0
        }),
        setTimeout(function() {
            n || l.triggerTransitionEnd(i)
        }, t),
        this
    }
    ,
    e.event.special[l.TRANSITION_END] = {
        bindType: a,
        delegateType: a,
        handle: function(t) {
            if (e(t.target).is(this))
                return t.handleObj.handler.apply(this, arguments)
        }
    };
    var c = "alert"
      , u = "bs.alert"
      , d = "." + u
      , h = e.fn[c]
      , f = {
        CLOSE: "close" + d,
        CLOSED: "closed" + d,
        CLICK_DATA_API: "click" + d + ".data-api"
    }
      , p = function() {
        function t(t) {
            this._element = t
        }
        var i = t.prototype;
        return i.close = function(t) {
            var e = this._element;
            t && (e = this._getRootElement(t)),
            this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
        }
        ,
        i.dispose = function() {
            e.removeData(this._element, u),
            this._element = null
        }
        ,
        i._getRootElement = function(t) {
            var i = l.getSelectorFromElement(t)
              , n = !1;
            return i && (n = document.querySelector(i)),
            n || e(t).closest(".alert")[0]
        }
        ,
        i._triggerCloseEvent = function(t) {
            var i = e.Event(f.CLOSE);
            return e(t).trigger(i),
            i
        }
        ,
        i._removeElement = function(t) {
            var i = this;
            if (e(t).removeClass("show"),
            e(t).hasClass("fade")) {
                var n = l.getTransitionDurationFromElement(t);
                e(t).one(l.TRANSITION_END, function(e) {
                    return i._destroyElement(t, e)
                }).emulateTransitionEnd(n)
            } else
                this._destroyElement(t)
        }
        ,
        i._destroyElement = function(t) {
            e(t).detach().trigger(f.CLOSED).remove()
        }
        ,
        t._jQueryInterface = function(i) {
            return this.each(function() {
                var n = e(this)
                  , o = n.data(u);
                o || (o = new t(this),
                n.data(u, o)),
                "close" === i && o[i](this)
            })
        }
        ,
        t._handleDismiss = function(t) {
            return function(e) {
                e && e.preventDefault(),
                t.close(this)
            }
        }
        ,
        o(t, null, [{
            key: "VERSION",
            get: function() {
                return "4.4.1"
            }
        }]),
        t
    }();
    e(document).on(f.CLICK_DATA_API, '[data-dismiss="alert"]', p._handleDismiss(new p)),
    e.fn[c] = p._jQueryInterface,
    e.fn[c].Constructor = p,
    e.fn[c].noConflict = function() {
        return e.fn[c] = h,
        p._jQueryInterface
    }
    ;
    var m = "button"
      , g = "bs.button"
      , v = "." + g
      , y = ".data-api"
      , w = e.fn[m]
      , b = "active"
      , x = '[data-toggle^="button"]'
      , S = 'input:not([type="hidden"])'
      , C = ".btn"
      , I = {
        CLICK_DATA_API: "click" + v + y,
        FOCUS_BLUR_DATA_API: "focus" + v + y + " blur" + v + y,
        LOAD_DATA_API: "load" + v + y
    }
      , _ = function() {
        function t(t) {
            this._element = t
        }
        var i = t.prototype;
        return i.toggle = function() {
            var t = !0
              , i = !0
              , n = e(this._element).closest('[data-toggle="buttons"]')[0];
            if (n) {
                var o = this._element.querySelector(S);
                if (o) {
                    if ("radio" === o.type)
                        if (o.checked && this._element.classList.contains(b))
                            t = !1;
                        else {
                            var r = n.querySelector(".active");
                            r && e(r).removeClass(b)
                        }
                    else
                        "checkbox" === o.type ? "LABEL" === this._element.tagName && o.checked === this._element.classList.contains(b) && (t = !1) : t = !1;
                    t && (o.checked = !this._element.classList.contains(b),
                    e(o).trigger("change")),
                    o.focus(),
                    i = !1
                }
            }
            this._element.hasAttribute("disabled") || this._element.classList.contains("disabled") || (i && this._element.setAttribute("aria-pressed", !this._element.classList.contains(b)),
            t && e(this._element).toggleClass(b))
        }
        ,
        i.dispose = function() {
            e.removeData(this._element, g),
            this._element = null
        }
        ,
        t._jQueryInterface = function(i) {
            return this.each(function() {
                var n = e(this).data(g);
                n || (n = new t(this),
                e(this).data(g, n)),
                "toggle" === i && n[i]()
            })
        }
        ,
        o(t, null, [{
            key: "VERSION",
            get: function() {
                return "4.4.1"
            }
        }]),
        t
    }();
    e(document).on(I.CLICK_DATA_API, x, function(t) {
        var i = t.target;
        if (e(i).hasClass("btn") || (i = e(i).closest(C)[0]),
        !i || i.hasAttribute("disabled") || i.classList.contains("disabled"))
            t.preventDefault();
        else {
            var n = i.querySelector(S);
            if (n && (n.hasAttribute("disabled") || n.classList.contains("disabled")))
                return void t.preventDefault();
            _._jQueryInterface.call(e(i), "toggle")
        }
    }).on(I.FOCUS_BLUR_DATA_API, x, function(t) {
        var i = e(t.target).closest(C)[0];
        e(i).toggleClass("focus", /^focus(in)?$/.test(t.type))
    }),
    e(window).on(I.LOAD_DATA_API, function() {
        for (var t = [].slice.call(document.querySelectorAll('[data-toggle="buttons"] .btn')), e = 0, i = t.length; e < i; e++) {
            var n = t[e]
              , o = n.querySelector(S);
            o.checked || o.hasAttribute("checked") ? n.classList.add(b) : n.classList.remove(b)
        }
        for (var r = 0, s = (t = [].slice.call(document.querySelectorAll('[data-toggle="button"]'))).length; r < s; r++) {
            var a = t[r];
            "true" === a.getAttribute("aria-pressed") ? a.classList.add(b) : a.classList.remove(b)
        }
    }),
    e.fn[m] = _._jQueryInterface,
    e.fn[m].Constructor = _,
    e.fn[m].noConflict = function() {
        return e.fn[m] = w,
        _._jQueryInterface
    }
    ;
    var T = "carousel"
      , E = "bs.carousel"
      , L = "." + E
      , M = ".data-api"
      , N = e.fn[T]
      , D = {
        interval: 5e3,
        keyboard: !0,
        slide: !1,
        pause: "hover",
        wrap: !0,
        touch: !0
    }
      , k = {
        interval: "(number|boolean)",
        keyboard: "boolean",
        slide: "(boolean|string)",
        pause: "(string|boolean)",
        wrap: "boolean",
        touch: "boolean"
    }
      , j = "next"
      , A = "prev"
      , O = {
        SLIDE: "slide" + L,
        SLID: "slid" + L,
        KEYDOWN: "keydown" + L,
        MOUSEENTER: "mouseenter" + L,
        MOUSELEAVE: "mouseleave" + L,
        TOUCHSTART: "touchstart" + L,
        TOUCHMOVE: "touchmove" + L,
        TOUCHEND: "touchend" + L,
        POINTERDOWN: "pointerdown" + L,
        POINTERUP: "pointerup" + L,
        DRAG_START: "dragstart" + L,
        LOAD_DATA_API: "load" + L + M,
        CLICK_DATA_API: "click" + L + M
    }
      , z = "active"
      , P = ".active.carousel-item"
      , R = ".carousel-indicators"
      , W = {
        TOUCH: "touch",
        PEN: "pen"
    }
      , H = function() {
        function t(t, e) {
            this._items = null,
            this._interval = null,
            this._activeElement = null,
            this._isPaused = !1,
            this._isSliding = !1,
            this.touchTimeout = null,
            this.touchStartX = 0,
            this.touchDeltaX = 0,
            this._config = this._getConfig(e),
            this._element = t,
            this._indicatorsElement = this._element.querySelector(R),
            this._touchSupported = "ontouchstart"in document.documentElement || 0 < navigator.maxTouchPoints,
            this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent),
            this._addEventListeners()
        }
        var i = t.prototype;
        return i.next = function() {
            this._isSliding || this._slide(j)
        }
        ,
        i.nextWhenVisible = function() {
            !document.hidden && e(this._element).is(":visible") && "hidden" !== e(this._element).css("visibility") && this.next()
        }
        ,
        i.prev = function() {
            this._isSliding || this._slide(A)
        }
        ,
        i.pause = function(t) {
            t || (this._isPaused = !0),
            this._element.querySelector(".carousel-item-next, .carousel-item-prev") && (l.triggerTransitionEnd(this._element),
            this.cycle(!0)),
            clearInterval(this._interval),
            this._interval = null
        }
        ,
        i.cycle = function(t) {
            t || (this._isPaused = !1),
            this._interval && (clearInterval(this._interval),
            this._interval = null),
            this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
        }
        ,
        i.to = function(t) {
            var i = this;
            this._activeElement = this._element.querySelector(P);
            var n = this._getItemIndex(this._activeElement);
            if (!(t > this._items.length - 1 || t < 0))
                if (this._isSliding)
                    e(this._element).one(O.SLID, function() {
                        return i.to(t)
                    });
                else {
                    if (n === t)
                        return this.pause(),
                        void this.cycle();
                    var o = n < t ? j : A;
                    this._slide(o, this._items[t])
                }
        }
        ,
        i.dispose = function() {
            e(this._element).off(L),
            e.removeData(this._element, E),
            this._items = null,
            this._config = null,
            this._element = null,
            this._interval = null,
            this._isPaused = null,
            this._isSliding = null,
            this._activeElement = null,
            this._indicatorsElement = null
        }
        ,
        i._getConfig = function(t) {
            return t = s({}, D, {}, t),
            l.typeCheckConfig(T, t, k),
            t
        }
        ,
        i._handleSwipe = function() {
            var t = Math.abs(this.touchDeltaX);
            if (!(t <= 40)) {
                var e = t / this.touchDeltaX;
                (this.touchDeltaX = 0) < e && this.prev(),
                e < 0 && this.next()
            }
        }
        ,
        i._addEventListeners = function() {
            var t = this;
            this._config.keyboard && e(this._element).on(O.KEYDOWN, function(e) {
                return t._keydown(e)
            }),
            "hover" === this._config.pause && e(this._element).on(O.MOUSEENTER, function(e) {
                return t.pause(e)
            }).on(O.MOUSELEAVE, function(e) {
                return t.cycle(e)
            }),
            this._config.touch && this._addTouchEventListeners()
        }
        ,
        i._addTouchEventListeners = function() {
            var t = this;
            if (this._touchSupported) {
                var i = function(e) {
                    t._pointerEvent && W[e.originalEvent.pointerType.toUpperCase()] ? t.touchStartX = e.originalEvent.clientX : t._pointerEvent || (t.touchStartX = e.originalEvent.touches[0].clientX)
                }
                  , n = function(e) {
                    t._pointerEvent && W[e.originalEvent.pointerType.toUpperCase()] && (t.touchDeltaX = e.originalEvent.clientX - t.touchStartX),
                    t._handleSwipe(),
                    "hover" === t._config.pause && (t.pause(),
                    t.touchTimeout && clearTimeout(t.touchTimeout),
                    t.touchTimeout = setTimeout(function(e) {
                        return t.cycle(e)
                    }, 500 + t._config.interval))
                };
                e(this._element.querySelectorAll(".carousel-item img")).on(O.DRAG_START, function(t) {
                    return t.preventDefault()
                }),
                this._pointerEvent ? (e(this._element).on(O.POINTERDOWN, function(t) {
                    return i(t)
                }),
                e(this._element).on(O.POINTERUP, function(t) {
                    return n(t)
                }),
                this._element.classList.add("pointer-event")) : (e(this._element).on(O.TOUCHSTART, function(t) {
                    return i(t)
                }),
                e(this._element).on(O.TOUCHMOVE, function(e) {
                    return function(e) {
                        e.originalEvent.touches && 1 < e.originalEvent.touches.length ? t.touchDeltaX = 0 : t.touchDeltaX = e.originalEvent.touches[0].clientX - t.touchStartX
                    }(e)
                }),
                e(this._element).on(O.TOUCHEND, function(t) {
                    return n(t)
                }))
            }
        }
        ,
        i._keydown = function(t) {
            if (!/input|textarea/i.test(t.target.tagName))
                switch (t.which) {
                case 37:
                    t.preventDefault(),
                    this.prev();
                    break;
                case 39:
                    t.preventDefault(),
                    this.next()
                }
        }
        ,
        i._getItemIndex = function(t) {
            return this._items = t && t.parentNode ? [].slice.call(t.parentNode.querySelectorAll(".carousel-item")) : [],
            this._items.indexOf(t)
        }
        ,
        i._getItemByDirection = function(t, e) {
            var i = t === j
              , n = t === A
              , o = this._getItemIndex(e)
              , r = this._items.length - 1;
            if ((n && 0 === o || i && o === r) && !this._config.wrap)
                return e;
            var s = (o + (t === A ? -1 : 1)) % this._items.length;
            return -1 == s ? this._items[this._items.length - 1] : this._items[s]
        }
        ,
        i._triggerSlideEvent = function(t, i) {
            var n = this._getItemIndex(t)
              , o = this._getItemIndex(this._element.querySelector(P))
              , r = e.Event(O.SLIDE, {
                relatedTarget: t,
                direction: i,
                from: o,
                to: n
            });
            return e(this._element).trigger(r),
            r
        }
        ,
        i._setActiveIndicatorElement = function(t) {
            if (this._indicatorsElement) {
                var i = [].slice.call(this._indicatorsElement.querySelectorAll(".active"));
                e(i).removeClass(z);
                var n = this._indicatorsElement.children[this._getItemIndex(t)];
                n && e(n).addClass(z)
            }
        }
        ,
        i._slide = function(t, i) {
            var n, o, r, s = this, a = this._element.querySelector(P), c = this._getItemIndex(a), u = i || a && this._getItemByDirection(t, a), d = this._getItemIndex(u), h = Boolean(this._interval);
            if (r = t === j ? (n = "carousel-item-left",
            o = "carousel-item-next",
            "left") : (n = "carousel-item-right",
            o = "carousel-item-prev",
            "right"),
            u && e(u).hasClass(z))
                this._isSliding = !1;
            else if (!this._triggerSlideEvent(u, r).isDefaultPrevented() && a && u) {
                this._isSliding = !0,
                h && this.pause(),
                this._setActiveIndicatorElement(u);
                var f = e.Event(O.SLID, {
                    relatedTarget: u,
                    direction: r,
                    from: c,
                    to: d
                });
                if (e(this._element).hasClass("slide")) {
                    e(u).addClass(o),
                    l.reflow(u),
                    e(a).addClass(n),
                    e(u).addClass(n);
                    var p = parseInt(u.getAttribute("data-interval"), 10);
                    p ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval,
                    this._config.interval = p) : this._config.interval = this._config.defaultInterval || this._config.interval;
                    var m = l.getTransitionDurationFromElement(a);
                    e(a).one(l.TRANSITION_END, function() {
                        e(u).removeClass(n + " " + o).addClass(z),
                        e(a).removeClass(z + " " + o + " " + n),
                        s._isSliding = !1,
                        setTimeout(function() {
                            return e(s._element).trigger(f)
                        }, 0)
                    }).emulateTransitionEnd(m)
                } else
                    e(a).removeClass(z),
                    e(u).addClass(z),
                    this._isSliding = !1,
                    e(this._element).trigger(f);
                h && this.cycle()
            }
        }
        ,
        t._jQueryInterface = function(i) {
            return this.each(function() {
                var n = e(this).data(E)
                  , o = s({}, D, {}, e(this).data());
                "object" == typeof i && (o = s({}, o, {}, i));
                var r = "string" == typeof i ? i : o.slide;
                if (n || (n = new t(this,o),
                e(this).data(E, n)),
                "number" == typeof i)
                    n.to(i);
                else if ("string" == typeof r) {
                    if (void 0 === n[r])
                        throw new TypeError('No method named "' + r + '"');
                    n[r]()
                } else
                    o.interval && o.ride && (n.pause(),
                    n.cycle())
            })
        }
        ,
        t._dataApiClickHandler = function(i) {
            var n = l.getSelectorFromElement(this);
            if (n) {
                var o = e(n)[0];
                if (o && e(o).hasClass("carousel")) {
                    var r = s({}, e(o).data(), {}, e(this).data())
                      , a = this.getAttribute("data-slide-to");
                    a && (r.interval = !1),
                    t._jQueryInterface.call(e(o), r),
                    a && e(o).data(E).to(a),
                    i.preventDefault()
                }
            }
        }
        ,
        o(t, null, [{
            key: "VERSION",
            get: function() {
                return "4.4.1"
            }
        }, {
            key: "Default",
            get: function() {
                return D
            }
        }]),
        t
    }();
    e(document).on(O.CLICK_DATA_API, "[data-slide], [data-slide-to]", H._dataApiClickHandler),
    e(window).on(O.LOAD_DATA_API, function() {
        for (var t = [].slice.call(document.querySelectorAll('[data-ride="carousel"]')), i = 0, n = t.length; i < n; i++) {
            var o = e(t[i]);
            H._jQueryInterface.call(o, o.data())
        }
    }),
    e.fn[T] = H._jQueryInterface,
    e.fn[T].Constructor = H,
    e.fn[T].noConflict = function() {
        return e.fn[T] = N,
        H._jQueryInterface
    }
    ;
    var B = "collapse"
      , F = "bs.collapse"
      , q = "." + F
      , Q = e.fn[B]
      , U = {
        toggle: !0,
        parent: ""
    }
      , Y = {
        toggle: "boolean",
        parent: "(string|element)"
    }
      , Z = {
        SHOW: "show" + q,
        SHOWN: "shown" + q,
        HIDE: "hide" + q,
        HIDDEN: "hidden" + q,
        CLICK_DATA_API: "click" + q + ".data-api"
    }
      , G = "show"
      , $ = "collapse"
      , X = "collapsing"
      , V = "collapsed"
      , J = '[data-toggle="collapse"]'
      , K = function() {
        function t(t, e) {
            this._isTransitioning = !1,
            this._element = t,
            this._config = this._getConfig(e),
            this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]'));
            for (var i = [].slice.call(document.querySelectorAll(J)), n = 0, o = i.length; n < o; n++) {
                var r = i[n]
                  , s = l.getSelectorFromElement(r)
                  , a = [].slice.call(document.querySelectorAll(s)).filter(function(e) {
                    return e === t
                });
                null !== s && 0 < a.length && (this._selector = s,
                this._triggerArray.push(r))
            }
            this._parent = this._config.parent ? this._getParent() : null,
            this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray),
            this._config.toggle && this.toggle()
        }
        var i = t.prototype;
        return i.toggle = function() {
            e(this._element).hasClass(G) ? this.hide() : this.show()
        }
        ,
        i.show = function() {
            var i, n, o = this;
            if (!(this._isTransitioning || e(this._element).hasClass(G) || (this._parent && 0 === (i = [].slice.call(this._parent.querySelectorAll(".show, .collapsing")).filter(function(t) {
                return "string" == typeof o._config.parent ? t.getAttribute("data-parent") === o._config.parent : t.classList.contains($)
            })).length && (i = null),
            i && (n = e(i).not(this._selector).data(F)) && n._isTransitioning))) {
                var r = e.Event(Z.SHOW);
                if (e(this._element).trigger(r),
                !r.isDefaultPrevented()) {
                    i && (t._jQueryInterface.call(e(i).not(this._selector), "hide"),
                    n || e(i).data(F, null));
                    var s = this._getDimension();
                    e(this._element).removeClass($).addClass(X),
                    this._element.style[s] = 0,
                    this._triggerArray.length && e(this._triggerArray).removeClass(V).attr("aria-expanded", !0),
                    this.setTransitioning(!0);
                    var a = "scroll" + (s[0].toUpperCase() + s.slice(1))
                      , c = l.getTransitionDurationFromElement(this._element);
                    e(this._element).one(l.TRANSITION_END, function() {
                        e(o._element).removeClass(X).addClass($).addClass(G),
                        o._element.style[s] = "",
                        o.setTransitioning(!1),
                        e(o._element).trigger(Z.SHOWN)
                    }).emulateTransitionEnd(c),
                    this._element.style[s] = this._element[a] + "px"
                }
            }
        }
        ,
        i.hide = function() {
            var t = this;
            if (!this._isTransitioning && e(this._element).hasClass(G)) {
                var i = e.Event(Z.HIDE);
                if (e(this._element).trigger(i),
                !i.isDefaultPrevented()) {
                    var n = this._getDimension();
                    this._element.style[n] = this._element.getBoundingClientRect()[n] + "px",
                    l.reflow(this._element),
                    e(this._element).addClass(X).removeClass($).removeClass(G);
                    var o = this._triggerArray.length;
                    if (0 < o)
                        for (var r = 0; r < o; r++) {
                            var s = this._triggerArray[r]
                              , a = l.getSelectorFromElement(s);
                            null !== a && (e([].slice.call(document.querySelectorAll(a))).hasClass(G) || e(s).addClass(V).attr("aria-expanded", !1))
                        }
                    this.setTransitioning(!0),
                    this._element.style[n] = "";
                    var c = l.getTransitionDurationFromElement(this._element);
                    e(this._element).one(l.TRANSITION_END, function() {
                        t.setTransitioning(!1),
                        e(t._element).removeClass(X).addClass($).trigger(Z.HIDDEN)
                    }).emulateTransitionEnd(c)
                }
            }
        }
        ,
        i.setTransitioning = function(t) {
            this._isTransitioning = t
        }
        ,
        i.dispose = function() {
            e.removeData(this._element, F),
            this._config = null,
            this._parent = null,
            this._element = null,
            this._triggerArray = null,
            this._isTransitioning = null
        }
        ,
        i._getConfig = function(t) {
            return (t = s({}, U, {}, t)).toggle = Boolean(t.toggle),
            l.typeCheckConfig(B, t, Y),
            t
        }
        ,
        i._getDimension = function() {
            return e(this._element).hasClass("width") ? "width" : "height"
        }
        ,
        i._getParent = function() {
            var i, n = this;
            l.isElement(this._config.parent) ? (i = this._config.parent,
            void 0 !== this._config.parent.jquery && (i = this._config.parent[0])) : i = document.querySelector(this._config.parent);
            var o = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]'
              , r = [].slice.call(i.querySelectorAll(o));
            return e(r).each(function(e, i) {
                n._addAriaAndCollapsedClass(t._getTargetFromElement(i), [i])
            }),
            i
        }
        ,
        i._addAriaAndCollapsedClass = function(t, i) {
            var n = e(t).hasClass(G);
            i.length && e(i).toggleClass(V, !n).attr("aria-expanded", n)
        }
        ,
        t._getTargetFromElement = function(t) {
            var e = l.getSelectorFromElement(t);
            return e ? document.querySelector(e) : null
        }
        ,
        t._jQueryInterface = function(i) {
            return this.each(function() {
                var n = e(this)
                  , o = n.data(F)
                  , r = s({}, U, {}, n.data(), {}, "object" == typeof i && i ? i : {});
                if (!o && r.toggle && /show|hide/.test(i) && (r.toggle = !1),
                o || (o = new t(this,r),
                n.data(F, o)),
                "string" == typeof i) {
                    if (void 0 === o[i])
                        throw new TypeError('No method named "' + i + '"');
                    o[i]()
                }
            })
        }
        ,
        o(t, null, [{
            key: "VERSION",
            get: function() {
                return "4.4.1"
            }
        }, {
            key: "Default",
            get: function() {
                return U
            }
        }]),
        t
    }();
    e(document).on(Z.CLICK_DATA_API, J, function(t) {
        "A" === t.currentTarget.tagName && t.preventDefault();
        var i = e(this)
          , n = l.getSelectorFromElement(this)
          , o = [].slice.call(document.querySelectorAll(n));
        e(o).each(function() {
            var t = e(this)
              , n = t.data(F) ? "toggle" : i.data();
            K._jQueryInterface.call(t, n)
        })
    }),
    e.fn[B] = K._jQueryInterface,
    e.fn[B].Constructor = K,
    e.fn[B].noConflict = function() {
        return e.fn[B] = Q,
        K._jQueryInterface
    }
    ;
    var tt = "dropdown"
      , et = "bs.dropdown"
      , it = "." + et
      , nt = ".data-api"
      , ot = e.fn[tt]
      , rt = new RegExp("38|40|27")
      , st = {
        HIDE: "hide" + it,
        HIDDEN: "hidden" + it,
        SHOW: "show" + it,
        SHOWN: "shown" + it,
        CLICK: "click" + it,
        CLICK_DATA_API: "click" + it + nt,
        KEYDOWN_DATA_API: "keydown" + it + nt,
        KEYUP_DATA_API: "keyup" + it + nt
    }
      , at = "disabled"
      , lt = "show"
      , ct = "dropdown-menu-right"
      , ut = '[data-toggle="dropdown"]'
      , dt = ".dropdown-menu"
      , ht = {
        offset: 0,
        flip: !0,
        boundary: "scrollParent",
        reference: "toggle",
        display: "dynamic",
        popperConfig: null
    }
      , ft = {
        offset: "(number|string|function)",
        flip: "boolean",
        boundary: "(string|element)",
        reference: "(string|element)",
        display: "string",
        popperConfig: "(null|object)"
    }
      , pt = function() {
        function t(t, e) {
            this._element = t,
            this._popper = null,
            this._config = this._getConfig(e),
            this._menu = this._getMenuElement(),
            this._inNavbar = this._detectNavbar(),
            this._addEventListeners()
        }
        var n = t.prototype;
        return n.toggle = function() {
            if (!this._element.disabled && !e(this._element).hasClass(at)) {
                var i = e(this._menu).hasClass(lt);
                t._clearMenus(),
                i || this.show(!0)
            }
        }
        ,
        n.show = function(n) {
            if (void 0 === n && (n = !1),
            !(this._element.disabled || e(this._element).hasClass(at) || e(this._menu).hasClass(lt))) {
                var o = {
                    relatedTarget: this._element
                }
                  , r = e.Event(st.SHOW, o)
                  , s = t._getParentFromElement(this._element);
                if (e(s).trigger(r),
                !r.isDefaultPrevented()) {
                    if (!this._inNavbar && n) {
                        if (void 0 === i)
                            throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");
                        var a = this._element;
                        "parent" === this._config.reference ? a = s : l.isElement(this._config.reference) && (a = this._config.reference,
                        void 0 !== this._config.reference.jquery && (a = this._config.reference[0])),
                        "scrollParent" !== this._config.boundary && e(s).addClass("position-static"),
                        this._popper = new i(a,this._menu,this._getPopperConfig())
                    }
                    "ontouchstart"in document.documentElement && 0 === e(s).closest(".navbar-nav").length && e(document.body).children().on("mouseover", null, e.noop),
                    this._element.focus(),
                    this._element.setAttribute("aria-expanded", !0),
                    e(this._menu).toggleClass(lt),
                    e(s).toggleClass(lt).trigger(e.Event(st.SHOWN, o))
                }
            }
        }
        ,
        n.hide = function() {
            if (!this._element.disabled && !e(this._element).hasClass(at) && e(this._menu).hasClass(lt)) {
                var i = {
                    relatedTarget: this._element
                }
                  , n = e.Event(st.HIDE, i)
                  , o = t._getParentFromElement(this._element);
                e(o).trigger(n),
                n.isDefaultPrevented() || (this._popper && this._popper.destroy(),
                e(this._menu).toggleClass(lt),
                e(o).toggleClass(lt).trigger(e.Event(st.HIDDEN, i)))
            }
        }
        ,
        n.dispose = function() {
            e.removeData(this._element, et),
            e(this._element).off(it),
            this._element = null,
            (this._menu = null) !== this._popper && (this._popper.destroy(),
            this._popper = null)
        }
        ,
        n.update = function() {
            this._inNavbar = this._detectNavbar(),
            null !== this._popper && this._popper.scheduleUpdate()
        }
        ,
        n._addEventListeners = function() {
            var t = this;
            e(this._element).on(st.CLICK, function(e) {
                e.preventDefault(),
                e.stopPropagation(),
                t.toggle()
            })
        }
        ,
        n._getConfig = function(t) {
            return t = s({}, this.constructor.Default, {}, e(this._element).data(), {}, t),
            l.typeCheckConfig(tt, t, this.constructor.DefaultType),
            t
        }
        ,
        n._getMenuElement = function() {
            if (!this._menu) {
                var e = t._getParentFromElement(this._element);
                e && (this._menu = e.querySelector(dt))
            }
            return this._menu
        }
        ,
        n._getPlacement = function() {
            var t = e(this._element.parentNode)
              , i = "bottom-start";
            return t.hasClass("dropup") ? (i = "top-start",
            e(this._menu).hasClass(ct) && (i = "top-end")) : t.hasClass("dropright") ? i = "right-start" : t.hasClass("dropleft") ? i = "left-start" : e(this._menu).hasClass(ct) && (i = "bottom-end"),
            i
        }
        ,
        n._detectNavbar = function() {
            return 0 < e(this._element).closest(".navbar").length
        }
        ,
        n._getOffset = function() {
            var t = this
              , e = {};
            return "function" == typeof this._config.offset ? e.fn = function(e) {
                return e.offsets = s({}, e.offsets, {}, t._config.offset(e.offsets, t._element) || {}),
                e
            }
            : e.offset = this._config.offset,
            e
        }
        ,
        n._getPopperConfig = function() {
            var t = {
                placement: this._getPlacement(),
                modifiers: {
                    offset: this._getOffset(),
                    flip: {
                        enabled: this._config.flip
                    },
                    preventOverflow: {
                        boundariesElement: this._config.boundary
                    }
                }
            };
            return "static" === this._config.display && (t.modifiers.applyStyle = {
                enabled: !1
            }),
            s({}, t, {}, this._config.popperConfig)
        }
        ,
        t._jQueryInterface = function(i) {
            return this.each(function() {
                var n = e(this).data(et);
                if (n || (n = new t(this,"object" == typeof i ? i : null),
                e(this).data(et, n)),
                "string" == typeof i) {
                    if (void 0 === n[i])
                        throw new TypeError('No method named "' + i + '"');
                    n[i]()
                }
            })
        }
        ,
        t._clearMenus = function(i) {
            if (!i || 3 !== i.which && ("keyup" !== i.type || 9 === i.which))
                for (var n = [].slice.call(document.querySelectorAll(ut)), o = 0, r = n.length; o < r; o++) {
                    var s = t._getParentFromElement(n[o])
                      , a = e(n[o]).data(et)
                      , l = {
                        relatedTarget: n[o]
                    };
                    if (i && "click" === i.type && (l.clickEvent = i),
                    a) {
                        var c = a._menu;
                        if (e(s).hasClass(lt) && !(i && ("click" === i.type && /input|textarea/i.test(i.target.tagName) || "keyup" === i.type && 9 === i.which) && e.contains(s, i.target))) {
                            var u = e.Event(st.HIDE, l);
                            e(s).trigger(u),
                            u.isDefaultPrevented() || ("ontouchstart"in document.documentElement && e(document.body).children().off("mouseover", null, e.noop),
                            n[o].setAttribute("aria-expanded", "false"),
                            a._popper && a._popper.destroy(),
                            e(c).removeClass(lt),
                            e(s).removeClass(lt).trigger(e.Event(st.HIDDEN, l)))
                        }
                    }
                }
        }
        ,
        t._getParentFromElement = function(t) {
            var e, i = l.getSelectorFromElement(t);
            return i && (e = document.querySelector(i)),
            e || t.parentNode
        }
        ,
        t._dataApiKeydownHandler = function(i) {
            if ((/input|textarea/i.test(i.target.tagName) ? !(32 === i.which || 27 !== i.which && (40 !== i.which && 38 !== i.which || e(i.target).closest(dt).length)) : rt.test(i.which)) && (i.preventDefault(),
            i.stopPropagation(),
            !this.disabled && !e(this).hasClass(at))) {
                var n = t._getParentFromElement(this)
                  , o = e(n).hasClass(lt);
                if (o || 27 !== i.which)
                    if (o && (!o || 27 !== i.which && 32 !== i.which)) {
                        var r = [].slice.call(n.querySelectorAll(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)")).filter(function(t) {
                            return e(t).is(":visible")
                        });
                        if (0 !== r.length) {
                            var s = r.indexOf(i.target);
                            38 === i.which && 0 < s && s--,
                            40 === i.which && s < r.length - 1 && s++,
                            s < 0 && (s = 0),
                            r[s].focus()
                        }
                    } else {
                        if (27 === i.which) {
                            var a = n.querySelector(ut);
                            e(a).trigger("focus")
                        }
                        e(this).trigger("click")
                    }
            }
        }
        ,
        o(t, null, [{
            key: "VERSION",
            get: function() {
                return "4.4.1"
            }
        }, {
            key: "Default",
            get: function() {
                return ht
            }
        }, {
            key: "DefaultType",
            get: function() {
                return ft
            }
        }]),
        t
    }();
    e(document).on(st.KEYDOWN_DATA_API, ut, pt._dataApiKeydownHandler).on(st.KEYDOWN_DATA_API, dt, pt._dataApiKeydownHandler).on(st.CLICK_DATA_API + " " + st.KEYUP_DATA_API, pt._clearMenus).on(st.CLICK_DATA_API, ut, function(t) {
        t.preventDefault(),
        t.stopPropagation(),
        pt._jQueryInterface.call(e(this), "toggle")
    }).on(st.CLICK_DATA_API, ".dropdown form", function(t) {
        t.stopPropagation()
    }),
    e.fn[tt] = pt._jQueryInterface,
    e.fn[tt].Constructor = pt,
    e.fn[tt].noConflict = function() {
        return e.fn[tt] = ot,
        pt._jQueryInterface
    }
    ;
    var mt = "modal"
      , gt = "bs.modal"
      , vt = "." + gt
      , yt = e.fn[mt]
      , wt = {
        backdrop: !0,
        keyboard: !0,
        focus: !0,
        show: !0
    }
      , bt = {
        backdrop: "(boolean|string)",
        keyboard: "boolean",
        focus: "boolean",
        show: "boolean"
    }
      , xt = {
        HIDE: "hide" + vt,
        HIDE_PREVENTED: "hidePrevented" + vt,
        HIDDEN: "hidden" + vt,
        SHOW: "show" + vt,
        SHOWN: "shown" + vt,
        FOCUSIN: "focusin" + vt,
        RESIZE: "resize" + vt,
        CLICK_DISMISS: "click.dismiss" + vt,
        KEYDOWN_DISMISS: "keydown.dismiss" + vt,
        MOUSEUP_DISMISS: "mouseup.dismiss" + vt,
        MOUSEDOWN_DISMISS: "mousedown.dismiss" + vt,
        CLICK_DATA_API: "click" + vt + ".data-api"
    }
      , St = "modal-open"
      , Ct = "fade"
      , It = "show"
      , _t = "modal-static"
      , Tt = ".modal-dialog"
      , Et = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"
      , Lt = ".sticky-top"
      , Mt = function() {
        function t(t, e) {
            this._config = this._getConfig(e),
            this._element = t,
            this._dialog = t.querySelector(Tt),
            this._backdrop = null,
            this._isShown = !1,
            this._isBodyOverflowing = !1,
            this._ignoreBackdropClick = !1,
            this._isTransitioning = !1,
            this._scrollbarWidth = 0
        }
        var i = t.prototype;
        return i.toggle = function(t) {
            return this._isShown ? this.hide() : this.show(t)
        }
        ,
        i.show = function(t) {
            var i = this;
            if (!this._isShown && !this._isTransitioning) {
                e(this._element).hasClass(Ct) && (this._isTransitioning = !0);
                var n = e.Event(xt.SHOW, {
                    relatedTarget: t
                });
                e(this._element).trigger(n),
                this._isShown || n.isDefaultPrevented() || (this._isShown = !0,
                this._checkScrollbar(),
                this._setScrollbar(),
                this._adjustDialog(),
                this._setEscapeEvent(),
                this._setResizeEvent(),
                e(this._element).on(xt.CLICK_DISMISS, '[data-dismiss="modal"]', function(t) {
                    return i.hide(t)
                }),
                e(this._dialog).on(xt.MOUSEDOWN_DISMISS, function() {
                    e(i._element).one(xt.MOUSEUP_DISMISS, function(t) {
                        e(t.target).is(i._element) && (i._ignoreBackdropClick = !0)
                    })
                }),
                this._showBackdrop(function() {
                    return i._showElement(t)
                }))
            }
        }
        ,
        i.hide = function(t) {
            var i = this;
            if (t && t.preventDefault(),
            this._isShown && !this._isTransitioning) {
                var n = e.Event(xt.HIDE);
                if (e(this._element).trigger(n),
                this._isShown && !n.isDefaultPrevented()) {
                    this._isShown = !1;
                    var o = e(this._element).hasClass(Ct);
                    if (o && (this._isTransitioning = !0),
                    this._setEscapeEvent(),
                    this._setResizeEvent(),
                    e(document).off(xt.FOCUSIN),
                    e(this._element).removeClass(It),
                    e(this._element).off(xt.CLICK_DISMISS),
                    e(this._dialog).off(xt.MOUSEDOWN_DISMISS),
                    o) {
                        var r = l.getTransitionDurationFromElement(this._element);
                        e(this._element).one(l.TRANSITION_END, function(t) {
                            return i._hideModal(t)
                        }).emulateTransitionEnd(r)
                    } else
                        this._hideModal()
                }
            }
        }
        ,
        i.dispose = function() {
            [window, this._element, this._dialog].forEach(function(t) {
                return e(t).off(vt)
            }),
            e(document).off(xt.FOCUSIN),
            e.removeData(this._element, gt),
            this._config = null,
            this._element = null,
            this._dialog = null,
            this._backdrop = null,
            this._isShown = null,
            this._isBodyOverflowing = null,
            this._ignoreBackdropClick = null,
            this._isTransitioning = null,
            this._scrollbarWidth = null
        }
        ,
        i.handleUpdate = function() {
            this._adjustDialog()
        }
        ,
        i._getConfig = function(t) {
            return t = s({}, wt, {}, t),
            l.typeCheckConfig(mt, t, bt),
            t
        }
        ,
        i._triggerBackdropTransition = function() {
            var t = this;
            if ("static" === this._config.backdrop) {
                var i = e.Event(xt.HIDE_PREVENTED);
                if (e(this._element).trigger(i),
                i.defaultPrevented)
                    return;
                this._element.classList.add(_t);
                var n = l.getTransitionDurationFromElement(this._element);
                e(this._element).one(l.TRANSITION_END, function() {
                    t._element.classList.remove(_t)
                }).emulateTransitionEnd(n),
                this._element.focus()
            } else
                this.hide()
        }
        ,
        i._showElement = function(t) {
            var i = this
              , n = e(this._element).hasClass(Ct)
              , o = this._dialog ? this._dialog.querySelector(".modal-body") : null;
            function r() {
                i._config.focus && i._element.focus(),
                i._isTransitioning = !1,
                e(i._element).trigger(s)
            }
            this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element),
            this._element.style.display = "block",
            this._element.removeAttribute("aria-hidden"),
            this._element.setAttribute("aria-modal", !0),
            e(this._dialog).hasClass("modal-dialog-scrollable") && o ? o.scrollTop = 0 : this._element.scrollTop = 0,
            n && l.reflow(this._element),
            e(this._element).addClass(It),
            this._config.focus && this._enforceFocus();
            var s = e.Event(xt.SHOWN, {
                relatedTarget: t
            });
            if (n) {
                var a = l.getTransitionDurationFromElement(this._dialog);
                e(this._dialog).one(l.TRANSITION_END, r).emulateTransitionEnd(a)
            } else
                r()
        }
        ,
        i._enforceFocus = function() {
            var t = this;
            e(document).off(xt.FOCUSIN).on(xt.FOCUSIN, function(i) {
                document !== i.target && t._element !== i.target && 0 === e(t._element).has(i.target).length && t._element.focus()
            })
        }
        ,
        i._setEscapeEvent = function() {
            var t = this;
            this._isShown && this._config.keyboard ? e(this._element).on(xt.KEYDOWN_DISMISS, function(e) {
                27 === e.which && t._triggerBackdropTransition()
            }) : this._isShown || e(this._element).off(xt.KEYDOWN_DISMISS)
        }
        ,
        i._setResizeEvent = function() {
            var t = this;
            this._isShown ? e(window).on(xt.RESIZE, function(e) {
                return t.handleUpdate(e)
            }) : e(window).off(xt.RESIZE)
        }
        ,
        i._hideModal = function() {
            var t = this;
            this._element.style.display = "none",
            this._element.setAttribute("aria-hidden", !0),
            this._element.removeAttribute("aria-modal"),
            this._isTransitioning = !1,
            this._showBackdrop(function() {
                e(document.body).removeClass(St),
                t._resetAdjustments(),
                t._resetScrollbar(),
                e(t._element).trigger(xt.HIDDEN)
            })
        }
        ,
        i._removeBackdrop = function() {
            this._backdrop && (e(this._backdrop).remove(),
            this._backdrop = null)
        }
        ,
        i._showBackdrop = function(t) {
            var i = this
              , n = e(this._element).hasClass(Ct) ? Ct : "";
            if (this._isShown && this._config.backdrop) {
                if (this._backdrop = document.createElement("div"),
                this._backdrop.className = "modal-backdrop",
                n && this._backdrop.classList.add(n),
                e(this._backdrop).appendTo(document.body),
                e(this._element).on(xt.CLICK_DISMISS, function(t) {
                    i._ignoreBackdropClick ? i._ignoreBackdropClick = !1 : t.target === t.currentTarget && i._triggerBackdropTransition()
                }),
                n && l.reflow(this._backdrop),
                e(this._backdrop).addClass(It),
                !t)
                    return;
                if (!n)
                    return void t();
                var o = l.getTransitionDurationFromElement(this._backdrop);
                e(this._backdrop).one(l.TRANSITION_END, t).emulateTransitionEnd(o)
            } else if (!this._isShown && this._backdrop) {
                e(this._backdrop).removeClass(It);
                var r = function() {
                    i._removeBackdrop(),
                    t && t()
                };
                if (e(this._element).hasClass(Ct)) {
                    var s = l.getTransitionDurationFromElement(this._backdrop);
                    e(this._backdrop).one(l.TRANSITION_END, r).emulateTransitionEnd(s)
                } else
                    r()
            } else
                t && t()
        }
        ,
        i._adjustDialog = function() {
            var t = this._element.scrollHeight > document.documentElement.clientHeight;
            !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"),
            this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
        }
        ,
        i._resetAdjustments = function() {
            this._element.style.paddingLeft = "",
            this._element.style.paddingRight = ""
        }
        ,
        i._checkScrollbar = function() {
            var t = document.body.getBoundingClientRect();
            this._isBodyOverflowing = t.left + t.right < window.innerWidth,
            this._scrollbarWidth = this._getScrollbarWidth()
        }
        ,
        i._setScrollbar = function() {
            var t = this;
            if (this._isBodyOverflowing) {
                var i = [].slice.call(document.querySelectorAll(Et))
                  , n = [].slice.call(document.querySelectorAll(Lt));
                e(i).each(function(i, n) {
                    var o = n.style.paddingRight
                      , r = e(n).css("padding-right");
                    e(n).data("padding-right", o).css("padding-right", parseFloat(r) + t._scrollbarWidth + "px")
                }),
                e(n).each(function(i, n) {
                    var o = n.style.marginRight
                      , r = e(n).css("margin-right");
                    e(n).data("margin-right", o).css("margin-right", parseFloat(r) - t._scrollbarWidth + "px")
                });
                var o = document.body.style.paddingRight
                  , r = e(document.body).css("padding-right");
                e(document.body).data("padding-right", o).css("padding-right", parseFloat(r) + this._scrollbarWidth + "px")
            }
            e(document.body).addClass(St)
        }
        ,
        i._resetScrollbar = function() {
            var t = [].slice.call(document.querySelectorAll(Et));
            e(t).each(function(t, i) {
                var n = e(i).data("padding-right");
                e(i).removeData("padding-right"),
                i.style.paddingRight = n || ""
            });
            var i = [].slice.call(document.querySelectorAll("" + Lt));
            e(i).each(function(t, i) {
                var n = e(i).data("margin-right");
                void 0 !== n && e(i).css("margin-right", n).removeData("margin-right")
            });
            var n = e(document.body).data("padding-right");
            e(document.body).removeData("padding-right"),
            document.body.style.paddingRight = n || ""
        }
        ,
        i._getScrollbarWidth = function() {
            var t = document.createElement("div");
            t.className = "modal-scrollbar-measure",
            document.body.appendChild(t);
            var e = t.getBoundingClientRect().width - t.clientWidth;
            return document.body.removeChild(t),
            e
        }
        ,
        t._jQueryInterface = function(i, n) {
            return this.each(function() {
                var o = e(this).data(gt)
                  , r = s({}, wt, {}, e(this).data(), {}, "object" == typeof i && i ? i : {});
                if (o || (o = new t(this,r),
                e(this).data(gt, o)),
                "string" == typeof i) {
                    if (void 0 === o[i])
                        throw new TypeError('No method named "' + i + '"');
                    o[i](n)
                } else
                    r.show && o.show(n)
            })
        }
        ,
        o(t, null, [{
            key: "VERSION",
            get: function() {
                return "4.4.1"
            }
        }, {
            key: "Default",
            get: function() {
                return wt
            }
        }]),
        t
    }();
    e(document).on(xt.CLICK_DATA_API, '[data-toggle="modal"]', function(t) {
        var i, n = this, o = l.getSelectorFromElement(this);
        o && (i = document.querySelector(o));
        var r = e(i).data(gt) ? "toggle" : s({}, e(i).data(), {}, e(this).data());
        "A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault();
        var a = e(i).one(xt.SHOW, function(t) {
            t.isDefaultPrevented() || a.one(xt.HIDDEN, function() {
                e(n).is(":visible") && n.focus()
            })
        });
        Mt._jQueryInterface.call(e(i), r, this)
    }),
    e.fn[mt] = Mt._jQueryInterface,
    e.fn[mt].Constructor = Mt,
    e.fn[mt].noConflict = function() {
        return e.fn[mt] = yt,
        Mt._jQueryInterface
    }
    ;
    var Nt = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]
      , Dt = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi
      , kt = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;
    function jt(t, e, i) {
        if (0 === t.length)
            return t;
        if (i && "function" == typeof i)
            return i(t);
        for (var n = (new window.DOMParser).parseFromString(t, "text/html"), o = Object.keys(e), r = [].slice.call(n.body.querySelectorAll("*")), s = function(t) {
            var i = r[t]
              , n = i.nodeName.toLowerCase();
            if (-1 === o.indexOf(i.nodeName.toLowerCase()))
                return i.parentNode.removeChild(i),
                "continue";
            var s = [].slice.call(i.attributes)
              , a = [].concat(e["*"] || [], e[n] || []);
            s.forEach(function(t) {
                !function(t, e) {
                    var i = t.nodeName.toLowerCase();
                    if (-1 !== e.indexOf(i))
                        return -1 === Nt.indexOf(i) || Boolean(t.nodeValue.match(Dt) || t.nodeValue.match(kt));
                    for (var n = e.filter(function(t) {
                        return t instanceof RegExp
                    }), o = 0, r = n.length; o < r; o++)
                        if (i.match(n[o]))
                            return !0;
                    return !1
                }(t, a) && i.removeAttribute(t.nodeName)
            })
        }, a = 0, l = r.length; a < l; a++)
            s(a);
        return n.body.innerHTML
    }
    var At = "tooltip"
      , Ot = "bs.tooltip"
      , zt = "." + Ot
      , Pt = e.fn[At]
      , Rt = "bs-tooltip"
      , Wt = new RegExp("(^|\\s)" + Rt + "\\S+","g")
      , Ht = ["sanitize", "whiteList", "sanitizeFn"]
      , Bt = {
        animation: "boolean",
        template: "string",
        title: "(string|element|function)",
        trigger: "string",
        delay: "(number|object)",
        html: "boolean",
        selector: "(string|boolean)",
        placement: "(string|function)",
        offset: "(number|string|function)",
        container: "(string|element|boolean)",
        fallbackPlacement: "(string|array)",
        boundary: "(string|element)",
        sanitize: "boolean",
        sanitizeFn: "(null|function)",
        whiteList: "object",
        popperConfig: "(null|object)"
    }
      , Ft = {
        AUTO: "auto",
        TOP: "top",
        RIGHT: "right",
        BOTTOM: "bottom",
        LEFT: "left"
    }
      , qt = {
        animation: !0,
        template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        selector: !1,
        placement: "top",
        offset: 0,
        container: !1,
        fallbackPlacement: "flip",
        boundary: "scrollParent",
        sanitize: !0,
        sanitizeFn: null,
        whiteList: {
            "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
            a: ["target", "href", "title", "rel"],
            area: [],
            b: [],
            br: [],
            col: [],
            code: [],
            div: [],
            em: [],
            hr: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            i: [],
            img: ["src", "alt", "title", "width", "height"],
            li: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            small: [],
            span: [],
            sub: [],
            sup: [],
            strong: [],
            u: [],
            ul: []
        },
        popperConfig: null
    }
      , Qt = "show"
      , Ut = {
        HIDE: "hide" + zt,
        HIDDEN: "hidden" + zt,
        SHOW: "show" + zt,
        SHOWN: "shown" + zt,
        INSERTED: "inserted" + zt,
        CLICK: "click" + zt,
        FOCUSIN: "focusin" + zt,
        FOCUSOUT: "focusout" + zt,
        MOUSEENTER: "mouseenter" + zt,
        MOUSELEAVE: "mouseleave" + zt
    }
      , Yt = "fade"
      , Zt = "show"
      , Gt = "hover"
      , $t = "focus"
      , Xt = function() {
        function t(t, e) {
            if (void 0 === i)
                throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");
            this._isEnabled = !0,
            this._timeout = 0,
            this._hoverState = "",
            this._activeTrigger = {},
            this._popper = null,
            this.element = t,
            this.config = this._getConfig(e),
            this.tip = null,
            this._setListeners()
        }
        var n = t.prototype;
        return n.enable = function() {
            this._isEnabled = !0
        }
        ,
        n.disable = function() {
            this._isEnabled = !1
        }
        ,
        n.toggleEnabled = function() {
            this._isEnabled = !this._isEnabled
        }
        ,
        n.toggle = function(t) {
            if (this._isEnabled)
                if (t) {
                    var i = this.constructor.DATA_KEY
                      , n = e(t.currentTarget).data(i);
                    n || (n = new this.constructor(t.currentTarget,this._getDelegateConfig()),
                    e(t.currentTarget).data(i, n)),
                    n._activeTrigger.click = !n._activeTrigger.click,
                    n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n)
                } else {
                    if (e(this.getTipElement()).hasClass(Zt))
                        return void this._leave(null, this);
                    this._enter(null, this)
                }
        }
        ,
        n.dispose = function() {
            clearTimeout(this._timeout),
            e.removeData(this.element, this.constructor.DATA_KEY),
            e(this.element).off(this.constructor.EVENT_KEY),
            e(this.element).closest(".modal").off("hide.bs.modal", this._hideModalHandler),
            this.tip && e(this.tip).remove(),
            this._isEnabled = null,
            this._timeout = null,
            this._hoverState = null,
            this._activeTrigger = null,
            this._popper && this._popper.destroy(),
            this._popper = null,
            this.element = null,
            this.config = null,
            this.tip = null
        }
        ,
        n.show = function() {
            var t = this;
            if ("none" === e(this.element).css("display"))
                throw new Error("Please use show on visible elements");
            var n = e.Event(this.constructor.Event.SHOW);
            if (this.isWithContent() && this._isEnabled) {
                e(this.element).trigger(n);
                var o = l.findShadowRoot(this.element)
                  , r = e.contains(null !== o ? o : this.element.ownerDocument.documentElement, this.element);
                if (n.isDefaultPrevented() || !r)
                    return;
                var s = this.getTipElement()
                  , a = l.getUID(this.constructor.NAME);
                s.setAttribute("id", a),
                this.element.setAttribute("aria-describedby", a),
                this.setContent(),
                this.config.animation && e(s).addClass(Yt);
                var c = "function" == typeof this.config.placement ? this.config.placement.call(this, s, this.element) : this.config.placement
                  , u = this._getAttachment(c);
                this.addAttachmentClass(u);
                var d = this._getContainer();
                e(s).data(this.constructor.DATA_KEY, this),
                e.contains(this.element.ownerDocument.documentElement, this.tip) || e(s).appendTo(d),
                e(this.element).trigger(this.constructor.Event.INSERTED),
                this._popper = new i(this.element,s,this._getPopperConfig(u)),
                e(s).addClass(Zt),
                "ontouchstart"in document.documentElement && e(document.body).children().on("mouseover", null, e.noop);
                var h = function() {
                    t.config.animation && t._fixTransition();
                    var i = t._hoverState;
                    t._hoverState = null,
                    e(t.element).trigger(t.constructor.Event.SHOWN),
                    "out" === i && t._leave(null, t)
                };
                if (e(this.tip).hasClass(Yt)) {
                    var f = l.getTransitionDurationFromElement(this.tip);
                    e(this.tip).one(l.TRANSITION_END, h).emulateTransitionEnd(f)
                } else
                    h()
            }
        }
        ,
        n.hide = function(t) {
            function i() {
                n._hoverState !== Qt && o.parentNode && o.parentNode.removeChild(o),
                n._cleanTipClass(),
                n.element.removeAttribute("aria-describedby"),
                e(n.element).trigger(n.constructor.Event.HIDDEN),
                null !== n._popper && n._popper.destroy(),
                t && t()
            }
            var n = this
              , o = this.getTipElement()
              , r = e.Event(this.constructor.Event.HIDE);
            if (e(this.element).trigger(r),
            !r.isDefaultPrevented()) {
                if (e(o).removeClass(Zt),
                "ontouchstart"in document.documentElement && e(document.body).children().off("mouseover", null, e.noop),
                this._activeTrigger.click = !1,
                this._activeTrigger[$t] = !1,
                this._activeTrigger[Gt] = !1,
                e(this.tip).hasClass(Yt)) {
                    var s = l.getTransitionDurationFromElement(o);
                    e(o).one(l.TRANSITION_END, i).emulateTransitionEnd(s)
                } else
                    i();
                this._hoverState = ""
            }
        }
        ,
        n.update = function() {
            null !== this._popper && this._popper.scheduleUpdate()
        }
        ,
        n.isWithContent = function() {
            return Boolean(this.getTitle())
        }
        ,
        n.addAttachmentClass = function(t) {
            e(this.getTipElement()).addClass(Rt + "-" + t)
        }
        ,
        n.getTipElement = function() {
            return this.tip = this.tip || e(this.config.template)[0],
            this.tip
        }
        ,
        n.setContent = function() {
            var t = this.getTipElement();
            this.setElementContent(e(t.querySelectorAll(".tooltip-inner")), this.getTitle()),
            e(t).removeClass(Yt + " " + Zt)
        }
        ,
        n.setElementContent = function(t, i) {
            "object" != typeof i || !i.nodeType && !i.jquery ? this.config.html ? (this.config.sanitize && (i = jt(i, this.config.whiteList, this.config.sanitizeFn)),
            t.html(i)) : t.text(i) : this.config.html ? e(i).parent().is(t) || t.empty().append(i) : t.text(e(i).text())
        }
        ,
        n.getTitle = function() {
            return this.element.getAttribute("data-original-title") || ("function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title)
        }
        ,
        n._getPopperConfig = function(t) {
            var e = this;
            return s({}, {
                placement: t,
                modifiers: {
                    offset: this._getOffset(),
                    flip: {
                        behavior: this.config.fallbackPlacement
                    },
                    arrow: {
                        element: ".arrow"
                    },
                    preventOverflow: {
                        boundariesElement: this.config.boundary
                    }
                },
                onCreate: function(t) {
                    t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
                },
                onUpdate: function(t) {
                    return e._handlePopperPlacementChange(t)
                }
            }, {}, this.config.popperConfig)
        }
        ,
        n._getOffset = function() {
            var t = this
              , e = {};
            return "function" == typeof this.config.offset ? e.fn = function(e) {
                return e.offsets = s({}, e.offsets, {}, t.config.offset(e.offsets, t.element) || {}),
                e
            }
            : e.offset = this.config.offset,
            e
        }
        ,
        n._getContainer = function() {
            return !1 === this.config.container ? document.body : l.isElement(this.config.container) ? e(this.config.container) : e(document).find(this.config.container)
        }
        ,
        n._getAttachment = function(t) {
            return Ft[t.toUpperCase()]
        }
        ,
        n._setListeners = function() {
            var t = this;
            this.config.trigger.split(" ").forEach(function(i) {
                if ("click" === i)
                    e(t.element).on(t.constructor.Event.CLICK, t.config.selector, function(e) {
                        return t.toggle(e)
                    });
                else if ("manual" !== i) {
                    var n = i === Gt ? t.constructor.Event.MOUSEENTER : t.constructor.Event.FOCUSIN
                      , o = i === Gt ? t.constructor.Event.MOUSELEAVE : t.constructor.Event.FOCUSOUT;
                    e(t.element).on(n, t.config.selector, function(e) {
                        return t._enter(e)
                    }).on(o, t.config.selector, function(e) {
                        return t._leave(e)
                    })
                }
            }),
            this._hideModalHandler = function() {
                t.element && t.hide()
            }
            ,
            e(this.element).closest(".modal").on("hide.bs.modal", this._hideModalHandler),
            this.config.selector ? this.config = s({}, this.config, {
                trigger: "manual",
                selector: ""
            }) : this._fixTitle()
        }
        ,
        n._fixTitle = function() {
            var t = typeof this.element.getAttribute("data-original-title");
            !this.element.getAttribute("title") && "string" == t || (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""),
            this.element.setAttribute("title", ""))
        }
        ,
        n._enter = function(t, i) {
            var n = this.constructor.DATA_KEY;
            (i = i || e(t.currentTarget).data(n)) || (i = new this.constructor(t.currentTarget,this._getDelegateConfig()),
            e(t.currentTarget).data(n, i)),
            t && (i._activeTrigger["focusin" === t.type ? $t : Gt] = !0),
            e(i.getTipElement()).hasClass(Zt) || i._hoverState === Qt ? i._hoverState = Qt : (clearTimeout(i._timeout),
            i._hoverState = Qt,
            i.config.delay && i.config.delay.show ? i._timeout = setTimeout(function() {
                i._hoverState === Qt && i.show()
            }, i.config.delay.show) : i.show())
        }
        ,
        n._leave = function(t, i) {
            var n = this.constructor.DATA_KEY;
            (i = i || e(t.currentTarget).data(n)) || (i = new this.constructor(t.currentTarget,this._getDelegateConfig()),
            e(t.currentTarget).data(n, i)),
            t && (i._activeTrigger["focusout" === t.type ? $t : Gt] = !1),
            i._isWithActiveTrigger() || (clearTimeout(i._timeout),
            i._hoverState = "out",
            i.config.delay && i.config.delay.hide ? i._timeout = setTimeout(function() {
                "out" === i._hoverState && i.hide()
            }, i.config.delay.hide) : i.hide())
        }
        ,
        n._isWithActiveTrigger = function() {
            for (var t in this._activeTrigger)
                if (this._activeTrigger[t])
                    return !0;
            return !1
        }
        ,
        n._getConfig = function(t) {
            var i = e(this.element).data();
            return Object.keys(i).forEach(function(t) {
                -1 !== Ht.indexOf(t) && delete i[t]
            }),
            "number" == typeof (t = s({}, this.constructor.Default, {}, i, {}, "object" == typeof t && t ? t : {})).delay && (t.delay = {
                show: t.delay,
                hide: t.delay
            }),
            "number" == typeof t.title && (t.title = t.title.toString()),
            "number" == typeof t.content && (t.content = t.content.toString()),
            l.typeCheckConfig(At, t, this.constructor.DefaultType),
            t.sanitize && (t.template = jt(t.template, t.whiteList, t.sanitizeFn)),
            t
        }
        ,
        n._getDelegateConfig = function() {
            var t = {};
            if (this.config)
                for (var e in this.config)
                    this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
            return t
        }
        ,
        n._cleanTipClass = function() {
            var t = e(this.getTipElement())
              , i = t.attr("class").match(Wt);
            null !== i && i.length && t.removeClass(i.join(""))
        }
        ,
        n._handlePopperPlacementChange = function(t) {
            var e = t.instance;
            this.tip = e.popper,
            this._cleanTipClass(),
            this.addAttachmentClass(this._getAttachment(t.placement))
        }
        ,
        n._fixTransition = function() {
            var t = this.getTipElement()
              , i = this.config.animation;
            null === t.getAttribute("x-placement") && (e(t).removeClass(Yt),
            this.config.animation = !1,
            this.hide(),
            this.show(),
            this.config.animation = i)
        }
        ,
        t._jQueryInterface = function(i) {
            return this.each(function() {
                var n = e(this).data(Ot)
                  , o = "object" == typeof i && i;
                if ((n || !/dispose|hide/.test(i)) && (n || (n = new t(this,o),
                e(this).data(Ot, n)),
                "string" == typeof i)) {
                    if (void 0 === n[i])
                        throw new TypeError('No method named "' + i + '"');
                    n[i]()
                }
            })
        }
        ,
        o(t, null, [{
            key: "VERSION",
            get: function() {
                return "4.4.1"
            }
        }, {
            key: "Default",
            get: function() {
                return qt
            }
        }, {
            key: "NAME",
            get: function() {
                return At
            }
        }, {
            key: "DATA_KEY",
            get: function() {
                return Ot
            }
        }, {
            key: "Event",
            get: function() {
                return Ut
            }
        }, {
            key: "EVENT_KEY",
            get: function() {
                return zt
            }
        }, {
            key: "DefaultType",
            get: function() {
                return Bt
            }
        }]),
        t
    }();
    e.fn[At] = Xt._jQueryInterface,
    e.fn[At].Constructor = Xt,
    e.fn[At].noConflict = function() {
        return e.fn[At] = Pt,
        Xt._jQueryInterface
    }
    ;
    var Vt = "popover"
      , Jt = "bs.popover"
      , Kt = "." + Jt
      , te = e.fn[Vt]
      , ee = "bs-popover"
      , ie = new RegExp("(^|\\s)" + ee + "\\S+","g")
      , ne = s({}, Xt.Default, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
    })
      , oe = s({}, Xt.DefaultType, {
        content: "(string|element|function)"
    })
      , re = {
        HIDE: "hide" + Kt,
        HIDDEN: "hidden" + Kt,
        SHOW: "show" + Kt,
        SHOWN: "shown" + Kt,
        INSERTED: "inserted" + Kt,
        CLICK: "click" + Kt,
        FOCUSIN: "focusin" + Kt,
        FOCUSOUT: "focusout" + Kt,
        MOUSEENTER: "mouseenter" + Kt,
        MOUSELEAVE: "mouseleave" + Kt
    }
      , se = function(t) {
        function i() {
            return t.apply(this, arguments) || this
        }
        !function(t, e) {
            t.prototype = Object.create(e.prototype),
            (t.prototype.constructor = t).__proto__ = e
        }(i, t);
        var n = i.prototype;
        return n.isWithContent = function() {
            return this.getTitle() || this._getContent()
        }
        ,
        n.addAttachmentClass = function(t) {
            e(this.getTipElement()).addClass(ee + "-" + t)
        }
        ,
        n.getTipElement = function() {
            return this.tip = this.tip || e(this.config.template)[0],
            this.tip
        }
        ,
        n.setContent = function() {
            var t = e(this.getTipElement());
            this.setElementContent(t.find(".popover-header"), this.getTitle());
            var i = this._getContent();
            "function" == typeof i && (i = i.call(this.element)),
            this.setElementContent(t.find(".popover-body"), i),
            t.removeClass("fade show")
        }
        ,
        n._getContent = function() {
            return this.element.getAttribute("data-content") || this.config.content
        }
        ,
        n._cleanTipClass = function() {
            var t = e(this.getTipElement())
              , i = t.attr("class").match(ie);
            null !== i && 0 < i.length && t.removeClass(i.join(""))
        }
        ,
        i._jQueryInterface = function(t) {
            return this.each(function() {
                var n = e(this).data(Jt)
                  , o = "object" == typeof t ? t : null;
                if ((n || !/dispose|hide/.test(t)) && (n || (n = new i(this,o),
                e(this).data(Jt, n)),
                "string" == typeof t)) {
                    if (void 0 === n[t])
                        throw new TypeError('No method named "' + t + '"');
                    n[t]()
                }
            })
        }
        ,
        o(i, null, [{
            key: "VERSION",
            get: function() {
                return "4.4.1"
            }
        }, {
            key: "Default",
            get: function() {
                return ne
            }
        }, {
            key: "NAME",
            get: function() {
                return Vt
            }
        }, {
            key: "DATA_KEY",
            get: function() {
                return Jt
            }
        }, {
            key: "Event",
            get: function() {
                return re
            }
        }, {
            key: "EVENT_KEY",
            get: function() {
                return Kt
            }
        }, {
            key: "DefaultType",
            get: function() {
                return oe
            }
        }]),
        i
    }(Xt);
    e.fn[Vt] = se._jQueryInterface,
    e.fn[Vt].Constructor = se,
    e.fn[Vt].noConflict = function() {
        return e.fn[Vt] = te,
        se._jQueryInterface
    }
    ;
    var ae = "scrollspy"
      , le = "bs.scrollspy"
      , ce = "." + le
      , ue = e.fn[ae]
      , de = {
        offset: 10,
        method: "auto",
        target: ""
    }
      , he = {
        offset: "number",
        method: "string",
        target: "(string|element)"
    }
      , fe = {
        ACTIVATE: "activate" + ce,
        SCROLL: "scroll" + ce,
        LOAD_DATA_API: "load" + ce + ".data-api"
    }
      , pe = "active"
      , me = ".nav, .list-group"
      , ge = ".nav-link"
      , ve = ".list-group-item"
      , ye = ".dropdown-item"
      , we = "position"
      , be = function() {
        function t(t, i) {
            var n = this;
            this._element = t,
            this._scrollElement = "BODY" === t.tagName ? window : t,
            this._config = this._getConfig(i),
            this._selector = this._config.target + " " + ge + "," + this._config.target + " " + ve + "," + this._config.target + " " + ye,
            this._offsets = [],
            this._targets = [],
            this._activeTarget = null,
            this._scrollHeight = 0,
            e(this._scrollElement).on(fe.SCROLL, function(t) {
                return n._process(t)
            }),
            this.refresh(),
            this._process()
        }
        var i = t.prototype;
        return i.refresh = function() {
            var t = this
              , i = this._scrollElement === this._scrollElement.window ? "offset" : we
              , n = "auto" === this._config.method ? i : this._config.method
              , o = n === we ? this._getScrollTop() : 0;
            this._offsets = [],
            this._targets = [],
            this._scrollHeight = this._getScrollHeight(),
            [].slice.call(document.querySelectorAll(this._selector)).map(function(t) {
                var i, r = l.getSelectorFromElement(t);
                if (r && (i = document.querySelector(r)),
                i) {
                    var s = i.getBoundingClientRect();
                    if (s.width || s.height)
                        return [e(i)[n]().top + o, r]
                }
                return null
            }).filter(function(t) {
                return t
            }).sort(function(t, e) {
                return t[0] - e[0]
            }).forEach(function(e) {
                t._offsets.push(e[0]),
                t._targets.push(e[1])
            })
        }
        ,
        i.dispose = function() {
            e.removeData(this._element, le),
            e(this._scrollElement).off(ce),
            this._element = null,
            this._scrollElement = null,
            this._config = null,
            this._selector = null,
            this._offsets = null,
            this._targets = null,
            this._activeTarget = null,
            this._scrollHeight = null
        }
        ,
        i._getConfig = function(t) {
            if ("string" != typeof (t = s({}, de, {}, "object" == typeof t && t ? t : {})).target) {
                var i = e(t.target).attr("id");
                i || (i = l.getUID(ae),
                e(t.target).attr("id", i)),
                t.target = "#" + i
            }
            return l.typeCheckConfig(ae, t, he),
            t
        }
        ,
        i._getScrollTop = function() {
            return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
        }
        ,
        i._getScrollHeight = function() {
            return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
        }
        ,
        i._getOffsetHeight = function() {
            return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
        }
        ,
        i._process = function() {
            var t = this._getScrollTop() + this._config.offset
              , e = this._getScrollHeight()
              , i = this._config.offset + e - this._getOffsetHeight();
            if (this._scrollHeight !== e && this.refresh(),
            i <= t) {
                var n = this._targets[this._targets.length - 1];
                this._activeTarget !== n && this._activate(n)
            } else {
                if (this._activeTarget && t < this._offsets[0] && 0 < this._offsets[0])
                    return this._activeTarget = null,
                    void this._clear();
                for (var o = this._offsets.length; o--; )
                    this._activeTarget !== this._targets[o] && t >= this._offsets[o] && (void 0 === this._offsets[o + 1] || t < this._offsets[o + 1]) && this._activate(this._targets[o])
            }
        }
        ,
        i._activate = function(t) {
            this._activeTarget = t,
            this._clear();
            var i = this._selector.split(",").map(function(e) {
                return e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]'
            })
              , n = e([].slice.call(document.querySelectorAll(i.join(","))));
            n.hasClass("dropdown-item") ? (n.closest(".dropdown").find(".dropdown-toggle").addClass(pe),
            n.addClass(pe)) : (n.addClass(pe),
            n.parents(me).prev(ge + ", " + ve).addClass(pe),
            n.parents(me).prev(".nav-item").children(ge).addClass(pe)),
            e(this._scrollElement).trigger(fe.ACTIVATE, {
                relatedTarget: t
            })
        }
        ,
        i._clear = function() {
            [].slice.call(document.querySelectorAll(this._selector)).filter(function(t) {
                return t.classList.contains(pe)
            }).forEach(function(t) {
                return t.classList.remove(pe)
            })
        }
        ,
        t._jQueryInterface = function(i) {
            return this.each(function() {
                var n = e(this).data(le);
                if (n || (n = new t(this,"object" == typeof i && i),
                e(this).data(le, n)),
                "string" == typeof i) {
                    if (void 0 === n[i])
                        throw new TypeError('No method named "' + i + '"');
                    n[i]()
                }
            })
        }
        ,
        o(t, null, [{
            key: "VERSION",
            get: function() {
                return "4.4.1"
            }
        }, {
            key: "Default",
            get: function() {
                return de
            }
        }]),
        t
    }();
    e(window).on(fe.LOAD_DATA_API, function() {
        for (var t = [].slice.call(document.querySelectorAll('[data-spy="scroll"]')), i = t.length; i--; ) {
            var n = e(t[i]);
            be._jQueryInterface.call(n, n.data())
        }
    }),
    e.fn[ae] = be._jQueryInterface,
    e.fn[ae].Constructor = be,
    e.fn[ae].noConflict = function() {
        return e.fn[ae] = ue,
        be._jQueryInterface
    }
    ;
    var xe = "bs.tab"
      , Se = "." + xe
      , Ce = e.fn.tab
      , Ie = {
        HIDE: "hide" + Se,
        HIDDEN: "hidden" + Se,
        SHOW: "show" + Se,
        SHOWN: "shown" + Se,
        CLICK_DATA_API: "click" + Se + ".data-api"
    }
      , _e = "active"
      , Te = ".active"
      , Ee = "> li > .active"
      , Le = function() {
        function t(t) {
            this._element = t
        }
        var i = t.prototype;
        return i.show = function() {
            var t = this;
            if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && e(this._element).hasClass(_e) || e(this._element).hasClass("disabled"))) {
                var i, n, o = e(this._element).closest(".nav, .list-group")[0], r = l.getSelectorFromElement(this._element);
                if (o) {
                    var s = "UL" === o.nodeName || "OL" === o.nodeName ? Ee : Te;
                    n = (n = e.makeArray(e(o).find(s)))[n.length - 1]
                }
                var a = e.Event(Ie.HIDE, {
                    relatedTarget: this._element
                })
                  , c = e.Event(Ie.SHOW, {
                    relatedTarget: n
                });
                if (n && e(n).trigger(a),
                e(this._element).trigger(c),
                !c.isDefaultPrevented() && !a.isDefaultPrevented()) {
                    r && (i = document.querySelector(r)),
                    this._activate(this._element, o);
                    var u = function() {
                        var i = e.Event(Ie.HIDDEN, {
                            relatedTarget: t._element
                        })
                          , o = e.Event(Ie.SHOWN, {
                            relatedTarget: n
                        });
                        e(n).trigger(i),
                        e(t._element).trigger(o)
                    };
                    i ? this._activate(i, i.parentNode, u) : u()
                }
            }
        }
        ,
        i.dispose = function() {
            e.removeData(this._element, xe),
            this._element = null
        }
        ,
        i._activate = function(t, i, n) {
            function o() {
                return r._transitionComplete(t, s, n)
            }
            var r = this
              , s = (!i || "UL" !== i.nodeName && "OL" !== i.nodeName ? e(i).children(Te) : e(i).find(Ee))[0]
              , a = n && s && e(s).hasClass("fade");
            if (s && a) {
                var c = l.getTransitionDurationFromElement(s);
                e(s).removeClass("show").one(l.TRANSITION_END, o).emulateTransitionEnd(c)
            } else
                o()
        }
        ,
        i._transitionComplete = function(t, i, n) {
            if (i) {
                e(i).removeClass(_e);
                var o = e(i.parentNode).find("> .dropdown-menu .active")[0];
                o && e(o).removeClass(_e),
                "tab" === i.getAttribute("role") && i.setAttribute("aria-selected", !1)
            }
            if (e(t).addClass(_e),
            "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0),
            l.reflow(t),
            t.classList.contains("fade") && t.classList.add("show"),
            t.parentNode && e(t.parentNode).hasClass("dropdown-menu")) {
                var r = e(t).closest(".dropdown")[0];
                if (r) {
                    var s = [].slice.call(r.querySelectorAll(".dropdown-toggle"));
                    e(s).addClass(_e)
                }
                t.setAttribute("aria-expanded", !0)
            }
            n && n()
        }
        ,
        t._jQueryInterface = function(i) {
            return this.each(function() {
                var n = e(this)
                  , o = n.data(xe);
                if (o || (o = new t(this),
                n.data(xe, o)),
                "string" == typeof i) {
                    if (void 0 === o[i])
                        throw new TypeError('No method named "' + i + '"');
                    o[i]()
                }
            })
        }
        ,
        o(t, null, [{
            key: "VERSION",
            get: function() {
                return "4.4.1"
            }
        }]),
        t
    }();
    e(document).on(Ie.CLICK_DATA_API, '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', function(t) {
        t.preventDefault(),
        Le._jQueryInterface.call(e(this), "show")
    }),
    e.fn.tab = Le._jQueryInterface,
    e.fn.tab.Constructor = Le,
    e.fn.tab.noConflict = function() {
        return e.fn.tab = Ce,
        Le._jQueryInterface
    }
    ;
    var Me = "toast"
      , Ne = "bs.toast"
      , De = "." + Ne
      , ke = e.fn[Me]
      , je = {
        CLICK_DISMISS: "click.dismiss" + De,
        HIDE: "hide" + De,
        HIDDEN: "hidden" + De,
        SHOW: "show" + De,
        SHOWN: "shown" + De
    }
      , Ae = "hide"
      , Oe = "show"
      , ze = "showing"
      , Pe = {
        animation: "boolean",
        autohide: "boolean",
        delay: "number"
    }
      , Re = {
        animation: !0,
        autohide: !0,
        delay: 500
    }
      , We = function() {
        function t(t, e) {
            this._element = t,
            this._config = this._getConfig(e),
            this._timeout = null,
            this._setListeners()
        }
        var i = t.prototype;
        return i.show = function() {
            var t = this
              , i = e.Event(je.SHOW);
            if (e(this._element).trigger(i),
            !i.isDefaultPrevented()) {
                this._config.animation && this._element.classList.add("fade");
                var n = function() {
                    t._element.classList.remove(ze),
                    t._element.classList.add(Oe),
                    e(t._element).trigger(je.SHOWN),
                    t._config.autohide && (t._timeout = setTimeout(function() {
                        t.hide()
                    }, t._config.delay))
                };
                if (this._element.classList.remove(Ae),
                l.reflow(this._element),
                this._element.classList.add(ze),
                this._config.animation) {
                    var o = l.getTransitionDurationFromElement(this._element);
                    e(this._element).one(l.TRANSITION_END, n).emulateTransitionEnd(o)
                } else
                    n()
            }
        }
        ,
        i.hide = function() {
            if (this._element.classList.contains(Oe)) {
                var t = e.Event(je.HIDE);
                e(this._element).trigger(t),
                t.isDefaultPrevented() || this._close()
            }
        }
        ,
        i.dispose = function() {
            clearTimeout(this._timeout),
            this._timeout = null,
            this._element.classList.contains(Oe) && this._element.classList.remove(Oe),
            e(this._element).off(je.CLICK_DISMISS),
            e.removeData(this._element, Ne),
            this._element = null,
            this._config = null
        }
        ,
        i._getConfig = function(t) {
            return t = s({}, Re, {}, e(this._element).data(), {}, "object" == typeof t && t ? t : {}),
            l.typeCheckConfig(Me, t, this.constructor.DefaultType),
            t
        }
        ,
        i._setListeners = function() {
            var t = this;
            e(this._element).on(je.CLICK_DISMISS, '[data-dismiss="toast"]', function() {
                return t.hide()
            })
        }
        ,
        i._close = function() {
            function t() {
                i._element.classList.add(Ae),
                e(i._element).trigger(je.HIDDEN)
            }
            var i = this;
            if (this._element.classList.remove(Oe),
            this._config.animation) {
                var n = l.getTransitionDurationFromElement(this._element);
                e(this._element).one(l.TRANSITION_END, t).emulateTransitionEnd(n)
            } else
                t()
        }
        ,
        t._jQueryInterface = function(i) {
            return this.each(function() {
                var n = e(this)
                  , o = n.data(Ne);
                if (o || (o = new t(this,"object" == typeof i && i),
                n.data(Ne, o)),
                "string" == typeof i) {
                    if (void 0 === o[i])
                        throw new TypeError('No method named "' + i + '"');
                    o[i](this)
                }
            })
        }
        ,
        o(t, null, [{
            key: "VERSION",
            get: function() {
                return "4.4.1"
            }
        }, {
            key: "DefaultType",
            get: function() {
                return Pe
            }
        }, {
            key: "Default",
            get: function() {
                return Re
            }
        }]),
        t
    }();
    e.fn[Me] = We._jQueryInterface,
    e.fn[Me].Constructor = We,
    e.fn[Me].noConflict = function() {
        return e.fn[Me] = ke,
        We._jQueryInterface
    }
    ,
    t.Alert = p,
    t.Button = _,
    t.Carousel = H,
    t.Collapse = K,
    t.Dropdown = pt,
    t.Modal = Mt,
    t.Popover = se,
    t.Scrollspy = be,
    t.Tab = Le,
    t.Toast = We,
    t.Tooltip = Xt,
    t.Util = l,
    Object.defineProperty(t, "__esModule", {
        value: !0
    })
}),
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], function(e) {
        return t(e)
    }) : "object" == typeof module && "object" == typeof module.exports ? exports = t(require("jquery")) : t(jQuery)
}(function(t) {
    function e(t) {
        var e = 7.5625
          , i = 2.75;
        return t < 1 / i ? e * t * t : t < 2 / i ? e * (t -= 1.5 / i) * t + .75 : t < 2.5 / i ? e * (t -= 2.25 / i) * t + .9375 : e * (t -= 2.625 / i) * t + .984375
    }
    t.easing.jswing = t.easing.swing;
    var i = Math.pow
      , n = Math.sqrt
      , o = Math.sin
      , r = Math.cos
      , s = Math.PI
      , a = 1.70158
      , l = 1.525 * a
      , c = 2 * s / 3
      , u = 2 * s / 4.5;
    t.extend(t.easing, {
        def: "easeOutQuad",
        swing: function(e) {
            return t.easing[t.easing.def](e)
        },
        easeInQuad: function(t) {
            return t * t
        },
        easeOutQuad: function(t) {
            return 1 - (1 - t) * (1 - t)
        },
        easeInOutQuad: function(t) {
            return t < .5 ? 2 * t * t : 1 - i(-2 * t + 2, 2) / 2
        },
        easeInCubic: function(t) {
            return t * t * t
        },
        easeOutCubic: function(t) {
            return 1 - i(1 - t, 3)
        },
        easeInOutCubic: function(t) {
            return t < .5 ? 4 * t * t * t : 1 - i(-2 * t + 2, 3) / 2
        },
        easeInQuart: function(t) {
            return t * t * t * t
        },
        easeOutQuart: function(t) {
            return 1 - i(1 - t, 4)
        },
        easeInOutQuart: function(t) {
            return t < .5 ? 8 * t * t * t * t : 1 - i(-2 * t + 2, 4) / 2
        },
        easeInQuint: function(t) {
            return t * t * t * t * t
        },
        easeOutQuint: function(t) {
            return 1 - i(1 - t, 5)
        },
        easeInOutQuint: function(t) {
            return t < .5 ? 16 * t * t * t * t * t : 1 - i(-2 * t + 2, 5) / 2
        },
        easeInSine: function(t) {
            return 1 - r(t * s / 2)
        },
        easeOutSine: function(t) {
            return o(t * s / 2)
        },
        easeInOutSine: function(t) {
            return -(r(s * t) - 1) / 2
        },
        easeInExpo: function(t) {
            return 0 === t ? 0 : i(2, 10 * t - 10)
        },
        easeOutExpo: function(t) {
            return 1 === t ? 1 : 1 - i(2, -10 * t)
        },
        easeInOutExpo: function(t) {
            return 0 === t ? 0 : 1 === t ? 1 : t < .5 ? i(2, 20 * t - 10) / 2 : (2 - i(2, -20 * t + 10)) / 2
        },
        easeInCirc: function(t) {
            return 1 - n(1 - i(t, 2))
        },
        easeOutCirc: function(t) {
            return n(1 - i(t - 1, 2))
        },
        easeInOutCirc: function(t) {
            return t < .5 ? (1 - n(1 - i(2 * t, 2))) / 2 : (n(1 - i(-2 * t + 2, 2)) + 1) / 2
        },
        easeInElastic: function(t) {
            return 0 === t ? 0 : 1 === t ? 1 : -i(2, 10 * t - 10) * o((10 * t - 10.75) * c)
        },
        easeOutElastic: function(t) {
            return 0 === t ? 0 : 1 === t ? 1 : i(2, -10 * t) * o((10 * t - .75) * c) + 1
        },
        easeInOutElastic: function(t) {
            return 0 === t ? 0 : 1 === t ? 1 : t < .5 ? -i(2, 20 * t - 10) * o((20 * t - 11.125) * u) / 2 : i(2, -20 * t + 10) * o((20 * t - 11.125) * u) / 2 + 1
        },
        easeInBack: function(t) {
            return (a + 1) * t * t * t - a * t * t
        },
        easeOutBack: function(t) {
            return 1 + (a + 1) * i(t - 1, 3) + a * i(t - 1, 2)
        },
        easeInOutBack: function(t) {
            return t < .5 ? i(2 * t, 2) * (7.189819 * t - l) / 2 : (i(2 * t - 2, 2) * ((l + 1) * (2 * t - 2) + l) + 2) / 2
        },
        easeInBounce: function(t) {
            return 1 - e(1 - t)
        },
        easeOutBounce: e,
        easeInOutBounce: function(t) {
            return t < .5 ? (1 - e(1 - 2 * t)) / 2 : (1 + e(2 * t - 1)) / 2
        }
    })
}),
function(t) {
    var e = function(e, i) {
        var n = this;
        n.n = "breakpoints",
        n.settings = {},
        n.currentBp = null,
        n.getBreakpoint = function() {
            var t, e = r(), i = n.settings.breakpoints;
            return i.forEach(function(i) {
                e >= i.width && (t = i.name)
            }),
            t || (t = i[i.length - 1].name),
            t
        }
        ,
        n.getBreakpointWidth = function(t) {
            var e;
            return n.settings.breakpoints.forEach(function(i) {
                t == i.name && (e = i.width)
            }),
            e
        }
        ,
        n.compareCheck = function(t, e, i) {
            var o = r()
              , s = n.settings.breakpoints
              , a = n.getBreakpointWidth(e)
              , l = !1;
            switch (t) {
            case "lessThan":
                l = o < a;
                break;
            case "lessEqualTo":
                l = o <= a;
                break;
            case "greaterThan":
            case "greaterEqualTo":
                l = o > a;
                break;
            case "inside":
                var c = s.findIndex(function(t) {
                    return t.name === e
                });
                if (c === s.length - 1)
                    l = o > a;
                else {
                    var u = n.getBreakpointWidth(s[c + 1].name);
                    l = o >= a && o < u
                }
            }
            l && i()
        }
        ,
        n.destroy = function() {
            t(window).unbind(n.n)
        }
        ;
        var o = function() {
            var e = r()
              , i = n.settings.breakpoints
              , o = n.currentBp;
            i.forEach(function(i) {
                o === i.name ? i.inside || (t(window).trigger("inside-" + i.name),
                i.inside = !0) : i.inside = !1,
                e < i.width && (i.less || (t(window).trigger("lessThan-" + i.name),
                i.less = !0,
                i.greater = !1,
                i.greaterEqual = !1)),
                e >= i.width && (i.greaterEqual || (t(window).trigger("greaterEqualTo-" + i.name),
                i.greaterEqual = !0,
                i.less = !1),
                e > i.width && (i.greater || (t(window).trigger("greaterThan-" + i.name),
                i.greater = !0,
                i.less = !1)))
            })
        }
          , r = function() {
            var e = t(window);
            return n.outerWidth ? e.outerWidth() : e.width()
        }
          , s = t.extend({}, t.fn.breakpoints.defaults, i);
        n.settings = {
            breakpoints: s.breakpoints,
            buffer: s.buffer,
            triggerOnInit: s.triggerOnInit,
            outerWidth: s.outerWidth
        },
        e.data(n.n, this),
        n.currentBp = n.getBreakpoint();
        var a = null;
        t.isFunction(t(window).on) && t(window).on("resize." + n.n, function(e) {
            a && clearTimeout(a),
            a = setTimeout(function(e) {
                var i;
                (i = n.getBreakpoint()) !== n.currentBp && (t(window).trigger({
                    type: "breakpoint-change",
                    from: n.currentBp,
                    to: i
                }),
                n.currentBp = i),
                o()
            }, n.settings.buffer)
        }),
        n.settings.triggerOnInit && setTimeout(function() {
            t(window).trigger({
                type: "breakpoint-change",
                from: n.currentBp,
                to: n.currentBp,
                initialInit: !0
            })
        }, n.settings.buffer),
        setTimeout(function() {
            o()
        }, 0)
    };
    t.fn.breakpoints = function(t, i, n) {
        if (this.data("breakpoints")) {
            var o = this.data("breakpoints");
            return "getBreakpoint" === t ? o.getBreakpoint() : "getBreakpointWidth" === t ? o.getBreakpointWidth(i) : ["lessThan", "lessEqualTo", "greaterThan", "greaterEqualTo", "inside"].indexOf(t) >= 0 ? o.compareCheck(t, i, n) : void ("destroy" === t && o.destroy())
        }
        new e(this,t)
    }
    ,
    t.fn.breakpoints.defaults = {
        breakpoints: [{
            name: "xs",
            width: 0
        }, {
            name: "sm",
            width: 768
        }, {
            name: "md",
            width: 992
        }, {
            name: "lg",
            width: 1200
        }],
        buffer: 300,
        triggerOnInit: !1,
        outerWidth: !1
    }
}(jQuery),
function(t, e) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
}(window, function(t, e) {
    "use strict";
    function i(i, r, a) {
        (a = a || e || t.jQuery) && (r.prototype.option || (r.prototype.option = function(t) {
            a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
        }
        ),
        a.fn[i] = function(t) {
            return "string" == typeof t ? function(t, e, n) {
                var o, r = "$()." + i + '("' + e + '")';
                return t.each(function(t, l) {
                    var c = a.data(l, i);
                    if (c) {
                        var u = c[e];
                        if (u && "_" != e.charAt(0)) {
                            var d = u.apply(c, n);
                            o = void 0 === o ? d : o
                        } else
                            s(r + " is not a valid method")
                    } else
                        s(i + " not initialized. Cannot call methods, i.e. " + r)
                }),
                void 0 !== o ? o : t
            }(this, t, o.call(arguments, 1)) : (function(t, e) {
                t.each(function(t, n) {
                    var o = a.data(n, i);
                    o ? (o.option(e),
                    o._init()) : (o = new r(n,e),
                    a.data(n, i, o))
                })
            }(this, t),
            this)
        }
        ,
        n(a))
    }
    function n(t) {
        !t || t && t.bridget || (t.bridget = i)
    }
    var o = Array.prototype.slice
      , r = t.console
      , s = void 0 === r ? function() {}
    : function(t) {
        r.error(t)
    }
    ;
    return n(e || t.jQuery),
    i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {}
              , n = i[t] = i[t] || [];
            return -1 == n.indexOf(e) && n.push(e),
            this
        }
    }
    ,
    e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {};
            return (i[t] = i[t] || {})[e] = !0,
            this
        }
    }
    ,
    e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = i.indexOf(e);
            return -1 != n && i.splice(n, 1),
            this
        }
    }
    ,
    e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            i = i.slice(0),
            e = e || [];
            for (var n = this._onceEvents && this._onceEvents[t], o = 0; o < i.length; o++) {
                var r = i[o];
                n && n[r] && (this.off(t, r),
                delete n[r]),
                r.apply(this, e)
            }
            return this
        }
    }
    ,
    e.allOff = function() {
        delete this._events,
        delete this._onceEvents
    }
    ,
    t
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("get-size/get-size", e) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function() {
    "use strict";
    function t(t) {
        var e = parseFloat(t);
        return -1 == t.indexOf("%") && !isNaN(e) && e
    }
    function e(t) {
        var e = getComputedStyle(t);
        return e || r("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"),
        e
    }
    function i() {
        if (!l) {
            l = !0;
            var i = document.createElement("div");
            i.style.width = "200px",
            i.style.padding = "1px 2px 3px 4px",
            i.style.borderStyle = "solid",
            i.style.borderWidth = "1px 2px 3px 4px",
            i.style.boxSizing = "border-box";
            var r = document.body || document.documentElement;
            r.appendChild(i);
            var s = e(i);
            o = 200 == Math.round(t(s.width)),
            n.isBoxSizeOuter = o,
            r.removeChild(i)
        }
    }
    function n(n) {
        if (i(),
        "string" == typeof n && (n = document.querySelector(n)),
        n && "object" == typeof n && n.nodeType) {
            var r = e(n);
            if ("none" == r.display)
                return function() {
                    for (var t = {
                        width: 0,
                        height: 0,
                        innerWidth: 0,
                        innerHeight: 0,
                        outerWidth: 0,
                        outerHeight: 0
                    }, e = 0; e < a; e++)
                        t[s[e]] = 0;
                    return t
                }();
            var l = {};
            l.width = n.offsetWidth,
            l.height = n.offsetHeight;
            for (var c = l.isBorderBox = "border-box" == r.boxSizing, u = 0; u < a; u++) {
                var d = s[u]
                  , h = r[d]
                  , f = parseFloat(h);
                l[d] = isNaN(f) ? 0 : f
            }
            var p = l.paddingLeft + l.paddingRight
              , m = l.paddingTop + l.paddingBottom
              , g = l.marginLeft + l.marginRight
              , v = l.marginTop + l.marginBottom
              , y = l.borderLeftWidth + l.borderRightWidth
              , w = l.borderTopWidth + l.borderBottomWidth
              , b = c && o
              , x = t(r.width);
            !1 !== x && (l.width = x + (b ? 0 : p + y));
            var S = t(r.height);
            return !1 !== S && (l.height = S + (b ? 0 : m + w)),
            l.innerWidth = l.width - (p + y),
            l.innerHeight = l.height - (m + w),
            l.outerWidth = l.width + g,
            l.outerHeight = l.height + v,
            l
        }
    }
    var o, r = "undefined" == typeof console ? function() {}
    : function(t) {
        console.error(t)
    }
    , s = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"], a = s.length, l = !1;
    return n
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function() {
    "use strict";
    var t = function() {
        var t = window.Element.prototype;
        if (t.matches)
            return "matches";
        if (t.matchesSelector)
            return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
            var n = e[i] + "MatchesSelector";
            if (t[n])
                return n
        }
    }();
    return function(e, i) {
        return e[t](i)
    }
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
}(window, function(t, e) {
    var i = {
        extend: function(t, e) {
            for (var i in e)
                t[i] = e[i];
            return t
        },
        modulo: function(t, e) {
            return (t % e + e) % e
        }
    }
      , n = Array.prototype.slice;
    i.makeArray = function(t) {
        return Array.isArray(t) ? t : null == t ? [] : "object" == typeof t && "number" == typeof t.length ? n.call(t) : [t]
    }
    ,
    i.removeFrom = function(t, e) {
        var i = t.indexOf(e);
        -1 != i && t.splice(i, 1)
    }
    ,
    i.getParent = function(t, i) {
        for (; t.parentNode && t != document.body; )
            if (t = t.parentNode,
            e(t, i))
                return t
    }
    ,
    i.getQueryElement = function(t) {
        return "string" == typeof t ? document.querySelector(t) : t
    }
    ,
    i.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }
    ,
    i.filterFindElements = function(t, n) {
        t = i.makeArray(t);
        var o = [];
        return t.forEach(function(t) {
            if (t instanceof HTMLElement) {
                if (!n)
                    return void o.push(t);
                e(t, n) && o.push(t);
                for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++)
                    o.push(i[r])
            }
        }),
        o
    }
    ,
    i.debounceMethod = function(t, e, i) {
        i = i || 100;
        var n = t.prototype[e]
          , o = e + "Timeout";
        t.prototype[e] = function() {
            var t = this[o];
            clearTimeout(t);
            var e = arguments
              , r = this;
            this[o] = setTimeout(function() {
                n.apply(r, e),
                delete r[o]
            }, i)
        }
    }
    ,
    i.docReady = function(t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
    }
    ,
    i.toDashed = function(t) {
        return t.replace(/(.)([A-Z])/g, function(t, e, i) {
            return e + "-" + i
        }).toLowerCase()
    }
    ;
    var o = t.console;
    return i.htmlInit = function(e, n) {
        i.docReady(function() {
            var r = i.toDashed(n)
              , s = "data-" + r
              , a = document.querySelectorAll("[" + s + "]")
              , l = document.querySelectorAll(".js-" + r)
              , c = i.makeArray(a).concat(i.makeArray(l))
              , u = s + "-options"
              , d = t.jQuery;
            c.forEach(function(t) {
                var i, r = t.getAttribute(s) || t.getAttribute(u);
                try {
                    i = r && JSON.parse(r)
                } catch (e) {
                    return void (o && o.error("Error parsing " + s + " on " + t.className + ": " + e))
                }
                var a = new e(t,i);
                d && d.data(t, n, a)
            })
        })
    }
    ,
    i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {},
    t.Outlayer.Item = e(t.EvEmitter, t.getSize))
}(window, function(t, e) {
    "use strict";
    function i(t, e) {
        t && (this.element = t,
        this.layout = e,
        this.position = {
            x: 0,
            y: 0
        },
        this._create())
    }
    var n = document.documentElement.style
      , o = "string" == typeof n.transition ? "transition" : "WebkitTransition"
      , r = "string" == typeof n.transform ? "transform" : "WebkitTransform"
      , s = {
        WebkitTransition: "webkitTransitionEnd",
        transition: "transitionend"
    }[o]
      , a = {
        transform: r,
        transition: o,
        transitionDuration: o + "Duration",
        transitionProperty: o + "Property",
        transitionDelay: o + "Delay"
    }
      , l = i.prototype = Object.create(t.prototype);
    l.constructor = i,
    l._create = function() {
        this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
        },
        this.css({
            position: "absolute"
        })
    }
    ,
    l.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }
    ,
    l.getSize = function() {
        this.size = e(this.element)
    }
    ,
    l.css = function(t) {
        var e = this.element.style;
        for (var i in t)
            e[a[i] || i] = t[i]
    }
    ,
    l.getPosition = function() {
        var t = getComputedStyle(this.element)
          , e = this.layout._getOption("originLeft")
          , i = this.layout._getOption("originTop")
          , n = t[e ? "left" : "right"]
          , o = t[i ? "top" : "bottom"]
          , r = parseFloat(n)
          , s = parseFloat(o)
          , a = this.layout.size;
        -1 != n.indexOf("%") && (r = r / 100 * a.width),
        -1 != o.indexOf("%") && (s = s / 100 * a.height),
        r = isNaN(r) ? 0 : r,
        s = isNaN(s) ? 0 : s,
        r -= e ? a.paddingLeft : a.paddingRight,
        s -= i ? a.paddingTop : a.paddingBottom,
        this.position.x = r,
        this.position.y = s
    }
    ,
    l.layoutPosition = function() {
        var t = this.layout.size
          , e = {}
          , i = this.layout._getOption("originLeft")
          , n = this.layout._getOption("originTop")
          , o = i ? "paddingLeft" : "paddingRight"
          , r = i ? "left" : "right"
          , s = i ? "right" : "left"
          , a = this.position.x + t[o];
        e[r] = this.getXValue(a),
        e[s] = "";
        var l = n ? "paddingTop" : "paddingBottom"
          , c = n ? "top" : "bottom"
          , u = n ? "bottom" : "top"
          , d = this.position.y + t[l];
        e[c] = this.getYValue(d),
        e[u] = "",
        this.css(e),
        this.emitEvent("layout", [this])
    }
    ,
    l.getXValue = function(t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px"
    }
    ,
    l.getYValue = function(t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px"
    }
    ,
    l._transitionTo = function(t, e) {
        this.getPosition();
        var i = this.position.x
          , n = this.position.y
          , o = t == this.position.x && e == this.position.y;
        if (this.setPosition(t, e),
        !o || this.isTransitioning) {
            var r = t - i
              , s = e - n
              , a = {};
            a.transform = this.getTranslate(r, s),
            this.transition({
                to: a,
                onTransitionEnd: {
                    transform: this.layoutPosition
                },
                isCleaning: !0
            })
        } else
            this.layoutPosition()
    }
    ,
    l.getTranslate = function(t, e) {
        return "translate3d(" + (t = this.layout._getOption("originLeft") ? t : -t) + "px, " + (e = this.layout._getOption("originTop") ? e : -e) + "px, 0)"
    }
    ,
    l.goTo = function(t, e) {
        this.setPosition(t, e),
        this.layoutPosition()
    }
    ,
    l.moveTo = l._transitionTo,
    l.setPosition = function(t, e) {
        this.position.x = parseFloat(t),
        this.position.y = parseFloat(e)
    }
    ,
    l._nonTransition = function(t) {
        for (var e in this.css(t.to),
        t.isCleaning && this._removeStyles(t.to),
        t.onTransitionEnd)
            t.onTransitionEnd[e].call(this)
    }
    ,
    l.transition = function(t) {
        if (parseFloat(this.layout.options.transitionDuration)) {
            var e = this._transn;
            for (var i in t.onTransitionEnd)
                e.onEnd[i] = t.onTransitionEnd[i];
            for (i in t.to)
                e.ingProperties[i] = !0,
                t.isCleaning && (e.clean[i] = !0);
            t.from && (this.css(t.from),
            this.element.offsetHeight),
            this.enableTransition(t.to),
            this.css(t.to),
            this.isTransitioning = !0
        } else
            this._nonTransition(t)
    }
    ;
    var c = "opacity," + r.replace(/([A-Z])/g, function(t) {
        return "-" + t.toLowerCase()
    });
    l.enableTransition = function() {
        if (!this.isTransitioning) {
            var t = this.layout.options.transitionDuration;
            t = "number" == typeof t ? t + "ms" : t,
            this.css({
                transitionProperty: c,
                transitionDuration: t,
                transitionDelay: this.staggerDelay || 0
            }),
            this.element.addEventListener(s, this, !1)
        }
    }
    ,
    l.onwebkitTransitionEnd = function(t) {
        this.ontransitionend(t)
    }
    ,
    l.onotransitionend = function(t) {
        this.ontransitionend(t)
    }
    ;
    var u = {
        "-webkit-transform": "transform"
    };
    l.ontransitionend = function(t) {
        if (t.target === this.element) {
            var e = this._transn
              , i = u[t.propertyName] || t.propertyName;
            delete e.ingProperties[i],
            function(t) {
                for (var e in t)
                    return !1;
                return !0
            }(e.ingProperties) && this.disableTransition(),
            i in e.clean && (this.element.style[t.propertyName] = "",
            delete e.clean[i]),
            i in e.onEnd && (e.onEnd[i].call(this),
            delete e.onEnd[i]),
            this.emitEvent("transitionEnd", [this])
        }
    }
    ,
    l.disableTransition = function() {
        this.removeTransitionStyles(),
        this.element.removeEventListener(s, this, !1),
        this.isTransitioning = !1
    }
    ,
    l._removeStyles = function(t) {
        var e = {};
        for (var i in t)
            e[i] = "";
        this.css(e)
    }
    ;
    var d = {
        transitionProperty: "",
        transitionDuration: "",
        transitionDelay: ""
    };
    return l.removeTransitionStyles = function() {
        this.css(d)
    }
    ,
    l.stagger = function(t) {
        t = isNaN(t) ? 0 : t,
        this.staggerDelay = t + "ms"
    }
    ,
    l.removeElem = function() {
        this.element.parentNode.removeChild(this.element),
        this.css({
            display: ""
        }),
        this.emitEvent("remove", [this])
    }
    ,
    l.remove = function() {
        return o && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function() {
            this.removeElem()
        }),
        void this.hide()) : void this.removeElem()
    }
    ,
    l.reveal = function() {
        delete this.isHidden,
        this.css({
            display: ""
        });
        var t = this.layout.options
          , e = {};
        e[this.getHideRevealTransitionEndProperty("visibleStyle")] = this.onRevealTransitionEnd,
        this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }
    ,
    l.onRevealTransitionEnd = function() {
        this.isHidden || this.emitEvent("reveal")
    }
    ,
    l.getHideRevealTransitionEndProperty = function(t) {
        var e = this.layout.options[t];
        if (e.opacity)
            return "opacity";
        for (var i in e)
            return i
    }
    ,
    l.hide = function() {
        this.isHidden = !0,
        this.css({
            display: ""
        });
        var t = this.layout.options
          , e = {};
        e[this.getHideRevealTransitionEndProperty("hiddenStyle")] = this.onHideTransitionEnd,
        this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }
    ,
    l.onHideTransitionEnd = function() {
        this.isHidden && (this.css({
            display: "none"
        }),
        this.emitEvent("hide"))
    }
    ,
    l.destroy = function() {
        this.css({
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            transition: "",
            transform: ""
        })
    }
    ,
    i
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(i, n, o, r) {
        return e(t, i, n, o, r)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
}(window, function(t, e, i, n, o) {
    "use strict";
    function r(t, e) {
        var i = n.getQueryElement(t);
        if (i) {
            this.element = i,
            l && (this.$element = l(this.element)),
            this.options = n.extend({}, this.constructor.defaults),
            this.option(e);
            var o = ++u;
            this.element.outlayerGUID = o,
            d[o] = this,
            this._create(),
            this._getOption("initLayout") && this.layout()
        } else
            a && a.error("Bad element for " + this.constructor.namespace + ": " + (i || t))
    }
    function s(t) {
        function e() {
            t.apply(this, arguments)
        }
        return e.prototype = Object.create(t.prototype),
        e.prototype.constructor = e,
        e
    }
    var a = t.console
      , l = t.jQuery
      , c = function() {}
      , u = 0
      , d = {};
    r.namespace = "outlayer",
    r.Item = o,
    r.defaults = {
        containerStyle: {
            position: "relative"
        },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {
            opacity: 0,
            transform: "scale(0.001)"
        },
        visibleStyle: {
            opacity: 1,
            transform: "scale(1)"
        }
    };
    var h = r.prototype;
    n.extend(h, e.prototype),
    h.option = function(t) {
        n.extend(this.options, t)
    }
    ,
    h._getOption = function(t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
    }
    ,
    r.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
    },
    h._create = function() {
        this.reloadItems(),
        this.stamps = [],
        this.stamp(this.options.stamp),
        n.extend(this.element.style, this.options.containerStyle),
        this._getOption("resize") && this.bindResize()
    }
    ,
    h.reloadItems = function() {
        this.items = this._itemize(this.element.children)
    }
    ,
    h._itemize = function(t) {
        for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0; o < e.length; o++) {
            var r = new i(e[o],this);
            n.push(r)
        }
        return n
    }
    ,
    h._filterFindItemElements = function(t) {
        return n.filterFindElements(t, this.options.itemSelector)
    }
    ,
    h.getItemElements = function() {
        return this.items.map(function(t) {
            return t.element
        })
    }
    ,
    h.layout = function() {
        this._resetLayout(),
        this._manageStamps();
        var t = this._getOption("layoutInstant")
          , e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e),
        this._isLayoutInited = !0
    }
    ,
    h._init = h.layout,
    h._resetLayout = function() {
        this.getSize()
    }
    ,
    h.getSize = function() {
        this.size = i(this.element)
    }
    ,
    h._getMeasurement = function(t, e) {
        var n, o = this.options[t];
        o ? ("string" == typeof o ? n = this.element.querySelector(o) : o instanceof HTMLElement && (n = o),
        this[t] = n ? i(n)[e] : o) : this[t] = 0
    }
    ,
    h.layoutItems = function(t, e) {
        t = this._getItemsForLayout(t),
        this._layoutItems(t, e),
        this._postLayout()
    }
    ,
    h._getItemsForLayout = function(t) {
        return t.filter(function(t) {
            return !t.isIgnored
        })
    }
    ,
    h._layoutItems = function(t, e) {
        if (this._emitCompleteOnItems("layout", t),
        t && t.length) {
            var i = [];
            t.forEach(function(t) {
                var n = this._getItemLayoutPosition(t);
                n.item = t,
                n.isInstant = e || t.isLayoutInstant,
                i.push(n)
            }, this),
            this._processLayoutQueue(i)
        }
    }
    ,
    h._getItemLayoutPosition = function() {
        return {
            x: 0,
            y: 0
        }
    }
    ,
    h._processLayoutQueue = function(t) {
        this.updateStagger(),
        t.forEach(function(t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e)
        }, this)
    }
    ,
    h.updateStagger = function() {
        var t = this.options.stagger;
        return null == t ? void (this.stagger = 0) : (this.stagger = function(t) {
            if ("number" == typeof t)
                return t;
            var e = t.match(/(^\d*\.?\d*)(\w*)/)
              , i = e && e[1]
              , n = e && e[2];
            return i.length ? (i = parseFloat(i)) * (f[n] || 1) : 0
        }(t),
        this.stagger)
    }
    ,
    h._positionItem = function(t, e, i, n, o) {
        n ? t.goTo(e, i) : (t.stagger(o * this.stagger),
        t.moveTo(e, i))
    }
    ,
    h._postLayout = function() {
        this.resizeContainer()
    }
    ,
    h.resizeContainer = function() {
        if (this._getOption("resizeContainer")) {
            var t = this._getContainerSize();
            t && (this._setContainerMeasure(t.width, !0),
            this._setContainerMeasure(t.height, !1))
        }
    }
    ,
    h._getContainerSize = c,
    h._setContainerMeasure = function(t, e) {
        if (void 0 !== t) {
            var i = this.size;
            i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth),
            t = Math.max(t, 0),
            this.element.style[e ? "width" : "height"] = t + "px"
        }
    }
    ,
    h._emitCompleteOnItems = function(t, e) {
        function i() {
            o.dispatchEvent(t + "Complete", null, [e])
        }
        function n() {
            ++s == r && i()
        }
        var o = this
          , r = e.length;
        if (e && r) {
            var s = 0;
            e.forEach(function(e) {
                e.once(t, n)
            })
        } else
            i()
    }
    ,
    h.dispatchEvent = function(t, e, i) {
        var n = e ? [e].concat(i) : i;
        if (this.emitEvent(t, n),
        l)
            if (this.$element = this.$element || l(this.element),
            e) {
                var o = l.Event(e);
                o.type = t,
                this.$element.trigger(o, i)
            } else
                this.$element.trigger(t, i)
    }
    ,
    h.ignore = function(t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0)
    }
    ,
    h.unignore = function(t) {
        var e = this.getItem(t);
        e && delete e.isIgnored
    }
    ,
    h.stamp = function(t) {
        (t = this._find(t)) && (this.stamps = this.stamps.concat(t),
        t.forEach(this.ignore, this))
    }
    ,
    h.unstamp = function(t) {
        (t = this._find(t)) && t.forEach(function(t) {
            n.removeFrom(this.stamps, t),
            this.unignore(t)
        }, this)
    }
    ,
    h._find = function(t) {
        if (t)
            return "string" == typeof t && (t = this.element.querySelectorAll(t)),
            n.makeArray(t)
    }
    ,
    h._manageStamps = function() {
        this.stamps && this.stamps.length && (this._getBoundingRect(),
        this.stamps.forEach(this._manageStamp, this))
    }
    ,
    h._getBoundingRect = function() {
        var t = this.element.getBoundingClientRect()
          , e = this.size;
        this._boundingRect = {
            left: t.left + e.paddingLeft + e.borderLeftWidth,
            top: t.top + e.paddingTop + e.borderTopWidth,
            right: t.right - (e.paddingRight + e.borderRightWidth),
            bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
        }
    }
    ,
    h._manageStamp = c,
    h._getElementOffset = function(t) {
        var e = t.getBoundingClientRect()
          , n = this._boundingRect
          , o = i(t);
        return {
            left: e.left - n.left - o.marginLeft,
            top: e.top - n.top - o.marginTop,
            right: n.right - e.right - o.marginRight,
            bottom: n.bottom - e.bottom - o.marginBottom
        }
    }
    ,
    h.handleEvent = n.handleEvent,
    h.bindResize = function() {
        t.addEventListener("resize", this),
        this.isResizeBound = !0
    }
    ,
    h.unbindResize = function() {
        t.removeEventListener("resize", this),
        this.isResizeBound = !1
    }
    ,
    h.onresize = function() {
        this.resize()
    }
    ,
    n.debounceMethod(r, "onresize", 100),
    h.resize = function() {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
    }
    ,
    h.needsResizeLayout = function() {
        var t = i(this.element);
        return this.size && t && t.innerWidth !== this.size.innerWidth
    }
    ,
    h.addItems = function(t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)),
        e
    }
    ,
    h.appended = function(t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0),
        this.reveal(e))
    }
    ,
    h.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
            var i = this.items.slice(0);
            this.items = e.concat(i),
            this._resetLayout(),
            this._manageStamps(),
            this.layoutItems(e, !0),
            this.reveal(e),
            this.layoutItems(i)
        }
    }
    ,
    h.reveal = function(t) {
        if (this._emitCompleteOnItems("reveal", t),
        t && t.length) {
            var e = this.updateStagger();
            t.forEach(function(t, i) {
                t.stagger(i * e),
                t.reveal()
            })
        }
    }
    ,
    h.hide = function(t) {
        if (this._emitCompleteOnItems("hide", t),
        t && t.length) {
            var e = this.updateStagger();
            t.forEach(function(t, i) {
                t.stagger(i * e),
                t.hide()
            })
        }
    }
    ,
    h.revealItemElements = function(t) {
        var e = this.getItems(t);
        this.reveal(e)
    }
    ,
    h.hideItemElements = function(t) {
        var e = this.getItems(t);
        this.hide(e)
    }
    ,
    h.getItem = function(t) {
        for (var e = 0; e < this.items.length; e++) {
            var i = this.items[e];
            if (i.element == t)
                return i
        }
    }
    ,
    h.getItems = function(t) {
        t = n.makeArray(t);
        var e = [];
        return t.forEach(function(t) {
            var i = this.getItem(t);
            i && e.push(i)
        }, this),
        e
    }
    ,
    h.remove = function(t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e),
        e && e.length && e.forEach(function(t) {
            t.remove(),
            n.removeFrom(this.items, t)
        }, this)
    }
    ,
    h.destroy = function() {
        var t = this.element.style;
        t.height = "",
        t.position = "",
        t.width = "",
        this.items.forEach(function(t) {
            t.destroy()
        }),
        this.unbindResize();
        var e = this.element.outlayerGUID;
        delete d[e],
        delete this.element.outlayerGUID,
        l && l.removeData(this.element, this.constructor.namespace)
    }
    ,
    r.data = function(t) {
        var e = (t = n.getQueryElement(t)) && t.outlayerGUID;
        return e && d[e]
    }
    ,
    r.create = function(t, e) {
        var i = s(r);
        return i.defaults = n.extend({}, r.defaults),
        n.extend(i.defaults, e),
        i.compatOptions = n.extend({}, r.compatOptions),
        i.namespace = t,
        i.data = r.data,
        i.Item = s(o),
        n.htmlInit(i, t),
        l && l.bridget && l.bridget(t, i),
        i
    }
    ;
    var f = {
        ms: 1,
        s: 1e3
    };
    return r.Item = o,
    r
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/item", ["outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {},
    t.Isotope.Item = e(t.Outlayer))
}(window, function(t) {
    "use strict";
    function e() {
        t.Item.apply(this, arguments)
    }
    var i = e.prototype = Object.create(t.Item.prototype)
      , n = i._create;
    i._create = function() {
        this.id = this.layout.itemGUID++,
        n.call(this),
        this.sortData = {}
    }
    ,
    i.updateSortData = function() {
        if (!this.isIgnored) {
            this.sortData.id = this.id,
            this.sortData["original-order"] = this.id,
            this.sortData.random = Math.random();
            var t = this.layout.options.getSortData
              , e = this.layout._sorters;
            for (var i in t) {
                var n = e[i];
                this.sortData[i] = n(this.element, this)
            }
        }
    }
    ;
    var o = i.destroy;
    return i.destroy = function() {
        o.apply(this, arguments),
        this.css({
            display: ""
        })
    }
    ,
    e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {},
    t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
}(window, function(t, e) {
    "use strict";
    function i(t) {
        this.isotope = t,
        t && (this.options = t.options[this.namespace],
        this.element = t.element,
        this.items = t.filteredItems,
        this.size = t.size)
    }
    var n = i.prototype;
    return ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"].forEach(function(t) {
        n[t] = function() {
            return e.prototype[t].apply(this.isotope, arguments)
        }
    }),
    n.needsVerticalResizeLayout = function() {
        var e = t(this.isotope.element);
        return this.isotope.size && e && e.innerHeight != this.isotope.size.innerHeight
    }
    ,
    n._getMeasurement = function() {
        this.isotope._getMeasurement.apply(this, arguments)
    }
    ,
    n.getColumnWidth = function() {
        this.getSegmentSize("column", "Width")
    }
    ,
    n.getRowHeight = function() {
        this.getSegmentSize("row", "Height")
    }
    ,
    n.getSegmentSize = function(t, e) {
        var i = t + e
          , n = "outer" + e;
        if (this._getMeasurement(i, n),
        !this[i]) {
            var o = this.getFirstItemSize();
            this[i] = o && o[n] || this.isotope.size["inner" + e]
        }
    }
    ,
    n.getFirstItemSize = function() {
        var e = this.isotope.filteredItems[0];
        return e && e.element && t(e.element)
    }
    ,
    n.layout = function() {
        this.isotope.layout.apply(this.isotope, arguments)
    }
    ,
    n.getSize = function() {
        this.isotope.getSize(),
        this.size = this.isotope.size
    }
    ,
    i.modes = {},
    i.create = function(t, e) {
        function o() {
            i.apply(this, arguments)
        }
        return o.prototype = Object.create(n),
        o.prototype.constructor = o,
        e && (o.options = e),
        o.prototype.namespace = t,
        i.modes[t] = o,
        o
    }
    ,
    i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("masonry-layout/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
}(window, function(t, e) {
    var i = t.create("masonry");
    i.compatOptions.fitWidth = "isFitWidth";
    var n = i.prototype;
    return n._resetLayout = function() {
        this.getSize(),
        this._getMeasurement("columnWidth", "outerWidth"),
        this._getMeasurement("gutter", "outerWidth"),
        this.measureColumns(),
        this.colYs = [];
        for (var t = 0; t < this.cols; t++)
            this.colYs.push(0);
        this.maxY = 0,
        this.horizontalColIndex = 0
    }
    ,
    n.measureColumns = function() {
        if (this.getContainerWidth(),
        !this.columnWidth) {
            var t = this.items[0]
              , i = t && t.element;
            this.columnWidth = i && e(i).outerWidth || this.containerWidth
        }
        var n = this.columnWidth += this.gutter
          , o = this.containerWidth + this.gutter
          , r = o / n
          , s = n - o % n;
        r = Math[s && s < 1 ? "round" : "floor"](r),
        this.cols = Math.max(r, 1)
    }
    ,
    n.getContainerWidth = function() {
        var t = this._getOption("fitWidth") ? this.element.parentNode : this.element
          , i = e(t);
        this.containerWidth = i && i.innerWidth
    }
    ,
    n._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth
          , i = Math[e && e < 1 ? "round" : "ceil"](t.size.outerWidth / this.columnWidth);
        i = Math.min(i, this.cols);
        for (var n = this[this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition"](i, t), o = {
            x: this.columnWidth * n.col,
            y: n.y
        }, r = n.y + t.size.outerHeight, s = i + n.col, a = n.col; a < s; a++)
            this.colYs[a] = r;
        return o
    }
    ,
    n._getTopColPosition = function(t) {
        var e = this._getTopColGroup(t)
          , i = Math.min.apply(Math, e);
        return {
            col: e.indexOf(i),
            y: i
        }
    }
    ,
    n._getTopColGroup = function(t) {
        if (t < 2)
            return this.colYs;
        for (var e = [], i = this.cols + 1 - t, n = 0; n < i; n++)
            e[n] = this._getColGroupY(n, t);
        return e
    }
    ,
    n._getColGroupY = function(t, e) {
        if (e < 2)
            return this.colYs[t];
        var i = this.colYs.slice(t, t + e);
        return Math.max.apply(Math, i)
    }
    ,
    n._getHorizontalColPosition = function(t, e) {
        var i = this.horizontalColIndex % this.cols;
        i = t > 1 && i + t > this.cols ? 0 : i;
        var n = e.size.outerWidth && e.size.outerHeight;
        return this.horizontalColIndex = n ? i + t : this.horizontalColIndex,
        {
            col: i,
            y: this._getColGroupY(i, t)
        }
    }
    ,
    n._manageStamp = function(t) {
        var i = e(t)
          , n = this._getElementOffset(t)
          , o = this._getOption("originLeft") ? n.left : n.right
          , r = o + i.outerWidth
          , s = Math.floor(o / this.columnWidth);
        s = Math.max(0, s);
        var a = Math.floor(r / this.columnWidth);
        a -= r % this.columnWidth ? 0 : 1,
        a = Math.min(this.cols - 1, a);
        for (var l = (this._getOption("originTop") ? n.top : n.bottom) + i.outerHeight, c = s; c <= a; c++)
            this.colYs[c] = Math.max(l, this.colYs[c])
    }
    ,
    n._getContainerSize = function() {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = {
            height: this.maxY
        };
        return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()),
        t
    }
    ,
    n._getContainerFitWidth = function() {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; )
            t++;
        return (this.cols - t) * this.columnWidth - this.gutter
    }
    ,
    n.needsResizeLayout = function() {
        var t = this.containerWidth;
        return this.getContainerWidth(),
        t != this.containerWidth
    }
    ,
    i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/masonry", ["../layout-mode", "masonry-layout/masonry"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry)
}(window, function(t, e) {
    "use strict";
    var i = t.create("masonry")
      , n = i.prototype
      , o = {
        _getElementOffset: !0,
        layout: !0,
        _getMeasurement: !0
    };
    for (var r in e.prototype)
        o[r] || (n[r] = e.prototype[r]);
    var s = n.measureColumns;
    n.measureColumns = function() {
        this.items = this.isotope.filteredItems,
        s.call(this)
    }
    ;
    var a = n._getOption;
    return n._getOption = function(t) {
        return "fitWidth" == t ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : a.apply(this.isotope, arguments)
    }
    ,
    i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function(t) {
    "use strict";
    var e = t.create("fitRows")
      , i = e.prototype;
    return i._resetLayout = function() {
        this.x = 0,
        this.y = 0,
        this.maxY = 0,
        this._getMeasurement("gutter", "outerWidth")
    }
    ,
    i._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerWidth + this.gutter
          , i = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && e + this.x > i && (this.x = 0,
        this.y = this.maxY);
        var n = {
            x: this.x,
            y: this.y
        };
        return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight),
        this.x += e,
        n
    }
    ,
    i._getContainerSize = function() {
        return {
            height: this.maxY
        }
    }
    ,
    e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function(t) {
    "use strict";
    var e = t.create("vertical", {
        horizontalAlignment: 0
    })
      , i = e.prototype;
    return i._resetLayout = function() {
        this.y = 0
    }
    ,
    i._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment
          , i = this.y;
        return this.y += t.size.outerHeight,
        {
            x: e,
            y: i
        }
    }
    ,
    i._getContainerSize = function() {
        return {
            height: this.y
        }
    }
    ,
    e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope-layout/js/item", "isotope-layout/js/layout-mode", "isotope-layout/js/layout-modes/masonry", "isotope-layout/js/layout-modes/fit-rows", "isotope-layout/js/layout-modes/vertical"], function(i, n, o, r, s, a) {
        return e(t, i, n, o, r, s, a)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope-layout/js/item"), require("isotope-layout/js/layout-mode"), require("isotope-layout/js/layout-modes/masonry"), require("isotope-layout/js/layout-modes/fit-rows"), require("isotope-layout/js/layout-modes/vertical")) : t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode)
}(window, function(t, e, i, n, o, r, s) {
    var a = t.jQuery
      , l = String.prototype.trim ? function(t) {
        return t.trim()
    }
    : function(t) {
        return t.replace(/^\s+|\s+$/g, "")
    }
      , c = e.create("isotope", {
        layoutMode: "masonry",
        isJQueryFiltering: !0,
        sortAscending: !0
    });
    c.Item = r,
    c.LayoutMode = s;
    var u = c.prototype;
    u._create = function() {
        for (var t in this.itemGUID = 0,
        this._sorters = {},
        this._getSorters(),
        e.prototype._create.call(this),
        this.modes = {},
        this.filteredItems = this.items,
        this.sortHistory = ["original-order"],
        s.modes)
            this._initLayoutMode(t)
    }
    ,
    u.reloadItems = function() {
        this.itemGUID = 0,
        e.prototype.reloadItems.call(this)
    }
    ,
    u._itemize = function() {
        for (var t = e.prototype._itemize.apply(this, arguments), i = 0; i < t.length; i++)
            t[i].id = this.itemGUID++;
        return this._updateItemsSortData(t),
        t
    }
    ,
    u._initLayoutMode = function(t) {
        var e = s.modes[t]
          , i = this.options[t] || {};
        this.options[t] = e.options ? o.extend(e.options, i) : i,
        this.modes[t] = new e(this)
    }
    ,
    u.layout = function() {
        return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this._layout()
    }
    ,
    u._layout = function() {
        var t = this._getIsInstant();
        this._resetLayout(),
        this._manageStamps(),
        this.layoutItems(this.filteredItems, t),
        this._isLayoutInited = !0
    }
    ,
    u.arrange = function(t) {
        this.option(t),
        this._getIsInstant();
        var e = this._filter(this.items);
        this.filteredItems = e.matches,
        this._bindArrangeComplete(),
        this._isInstant ? this._noTransition(this._hideReveal, [e]) : this._hideReveal(e),
        this._sort(),
        this._layout()
    }
    ,
    u._init = u.arrange,
    u._hideReveal = function(t) {
        this.reveal(t.needReveal),
        this.hide(t.needHide)
    }
    ,
    u._getIsInstant = function() {
        var t = this._getOption("layoutInstant")
          , e = void 0 !== t ? t : !this._isLayoutInited;
        return this._isInstant = e,
        e
    }
    ,
    u._bindArrangeComplete = function() {
        function t() {
            e && i && n && o.dispatchEvent("arrangeComplete", null, [o.filteredItems])
        }
        var e, i, n, o = this;
        this.once("layoutComplete", function() {
            e = !0,
            t()
        }),
        this.once("hideComplete", function() {
            i = !0,
            t()
        }),
        this.once("revealComplete", function() {
            n = !0,
            t()
        })
    }
    ,
    u._filter = function(t) {
        var e = this.options.filter;
        e = e || "*";
        for (var i = [], n = [], o = [], r = this._getFilterTest(e), s = 0; s < t.length; s++) {
            var a = t[s];
            if (!a.isIgnored) {
                var l = r(a);
                l && i.push(a),
                l && a.isHidden ? n.push(a) : l || a.isHidden || o.push(a)
            }
        }
        return {
            matches: i,
            needReveal: n,
            needHide: o
        }
    }
    ,
    u._getFilterTest = function(t) {
        return a && this.options.isJQueryFiltering ? function(e) {
            return a(e.element).is(t)
        }
        : "function" == typeof t ? function(e) {
            return t(e.element)
        }
        : function(e) {
            return n(e.element, t)
        }
    }
    ,
    u.updateSortData = function(t) {
        var e;
        t ? (t = o.makeArray(t),
        e = this.getItems(t)) : e = this.items,
        this._getSorters(),
        this._updateItemsSortData(e)
    }
    ,
    u._getSorters = function() {
        var t = this.options.getSortData;
        for (var e in t) {
            var i = t[e];
            this._sorters[e] = d(i)
        }
    }
    ,
    u._updateItemsSortData = function(t) {
        for (var e = t && t.length, i = 0; e && i < e; i++)
            t[i].updateSortData()
    }
    ;
    var d = function(t) {
        if ("string" != typeof t)
            return t;
        var e = l(t).split(" ")
          , i = e[0]
          , n = i.match(/^\[(.+)\]$/)
          , o = function(t, e) {
            return t ? function(e) {
                return e.getAttribute(t)
            }
            : function(t) {
                var i = t.querySelector(e);
                return i && i.textContent
            }
        }(n && n[1], i)
          , r = c.sortDataParsers[e[1]];
        return r ? function(t) {
            return t && r(o(t))
        }
        : function(t) {
            return t && o(t)
        }
    };
    c.sortDataParsers = {
        parseInt: function(t) {
            return parseInt(t, 10)
        },
        parseFloat: function(t) {
            return parseFloat(t)
        }
    },
    u._sort = function() {
        if (this.options.sortBy) {
            var t = o.makeArray(this.options.sortBy);
            this._getIsSameSortBy(t) || (this.sortHistory = t.concat(this.sortHistory));
            var e = function(t, e) {
                return function(i, n) {
                    for (var o = 0; o < t.length; o++) {
                        var r = t[o]
                          , s = i.sortData[r]
                          , a = n.sortData[r];
                        if (s > a || s < a)
                            return (s > a ? 1 : -1) * ((void 0 !== e[r] ? e[r] : e) ? 1 : -1)
                    }
                    return 0
                }
            }(this.sortHistory, this.options.sortAscending);
            this.filteredItems.sort(e)
        }
    }
    ,
    u._getIsSameSortBy = function(t) {
        for (var e = 0; e < t.length; e++)
            if (t[e] != this.sortHistory[e])
                return !1;
        return !0
    }
    ,
    u._mode = function() {
        var t = this.options.layoutMode
          , e = this.modes[t];
        if (!e)
            throw new Error("No layout mode: " + t);
        return e.options = this.options[t],
        e
    }
    ,
    u._resetLayout = function() {
        e.prototype._resetLayout.call(this),
        this._mode()._resetLayout()
    }
    ,
    u._getItemLayoutPosition = function(t) {
        return this._mode()._getItemLayoutPosition(t)
    }
    ,
    u._manageStamp = function(t) {
        this._mode()._manageStamp(t)
    }
    ,
    u._getContainerSize = function() {
        return this._mode()._getContainerSize()
    }
    ,
    u.needsResizeLayout = function() {
        return this._mode().needsResizeLayout()
    }
    ,
    u.appended = function(t) {
        var e = this.addItems(t);
        if (e.length) {
            var i = this._filterRevealAdded(e);
            this.filteredItems = this.filteredItems.concat(i)
        }
    }
    ,
    u.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
            this._resetLayout(),
            this._manageStamps();
            var i = this._filterRevealAdded(e);
            this.layoutItems(this.filteredItems),
            this.filteredItems = i.concat(this.filteredItems),
            this.items = e.concat(this.items)
        }
    }
    ,
    u._filterRevealAdded = function(t) {
        var e = this._filter(t);
        return this.hide(e.needHide),
        this.reveal(e.matches),
        this.layoutItems(e.matches, !0),
        e.matches
    }
    ,
    u.insert = function(t) {
        var e = this.addItems(t);
        if (e.length) {
            var i, n, o = e.length;
            for (i = 0; i < o; i++)
                n = e[i],
                this.element.appendChild(n.element);
            var r = this._filter(e).matches;
            for (i = 0; i < o; i++)
                e[i].isLayoutInstant = !0;
            for (this.arrange(),
            i = 0; i < o; i++)
                delete e[i].isLayoutInstant;
            this.reveal(r)
        }
    }
    ;
    var h = u.remove;
    return u.remove = function(t) {
        t = o.makeArray(t);
        var e = this.getItems(t);
        h.call(this, t);
        for (var i = e && e.length, n = 0; i && n < i; n++) {
            var r = e[n];
            o.removeFrom(this.filteredItems, r)
        }
    }
    ,
    u.shuffle = function() {
        for (var t = 0; t < this.items.length; t++)
            this.items[t].sortData.random = Math.random();
        this.options.sortBy = "random",
        this._sort(),
        this._layout()
    }
    ,
    u._noTransition = function(t, e) {
        var i = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var n = t.apply(this, e);
        return this.options.transitionDuration = i,
        n
    }
    ,
    u.getFilteredItemElements = function() {
        return this.filteredItems.map(function(t) {
            return t.element
        })
    }
    ,
    c
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {}
              , n = i[t] = i[t] || [];
            return -1 == n.indexOf(e) && n.push(e),
            this
        }
    }
    ,
    e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {};
            return (i[t] = i[t] || {})[e] = !0,
            this
        }
    }
    ,
    e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = i.indexOf(e);
            return -1 != n && i.splice(n, 1),
            this
        }
    }
    ,
    e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            i = i.slice(0),
            e = e || [];
            for (var n = this._onceEvents && this._onceEvents[t], o = 0; o < i.length; o++) {
                var r = i[o];
                n && n[r] && (this.off(t, r),
                delete n[r]),
                r.apply(this, e)
            }
            return this
        }
    }
    ,
    e.allOff = function() {
        delete this._events,
        delete this._onceEvents
    }
    ,
    t
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter)
}("undefined" != typeof window ? window : this, function(t, e) {
    function i(t, e) {
        for (var i in e)
            t[i] = e[i];
        return t
    }
    function n(t, e, o) {
        if (!(this instanceof n))
            return new n(t,e,o);
        var r = t;
        return "string" == typeof t && (r = document.querySelectorAll(t)),
        r ? (this.elements = function(t) {
            return Array.isArray(t) ? t : "object" == typeof t && "number" == typeof t.length ? l.call(t) : [t]
        }(r),
        this.options = i({}, this.options),
        "function" == typeof e ? o = e : i(this.options, e),
        o && this.on("always", o),
        this.getImages(),
        s && (this.jqDeferred = new s.Deferred),
        void setTimeout(this.check.bind(this))) : void a.error("Bad element for imagesLoaded " + (r || t))
    }
    function o(t) {
        this.img = t
    }
    function r(t, e) {
        this.url = t,
        this.element = e,
        this.img = new Image
    }
    var s = t.jQuery
      , a = t.console
      , l = Array.prototype.slice;
    n.prototype = Object.create(e.prototype),
    n.prototype.options = {},
    n.prototype.getImages = function() {
        this.images = [],
        this.elements.forEach(this.addElementImages, this)
    }
    ,
    n.prototype.addElementImages = function(t) {
        "IMG" == t.nodeName && this.addImage(t),
        !0 === this.options.background && this.addElementBackgroundImages(t);
        var e = t.nodeType;
        if (e && c[e]) {
            for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
                var o = i[n];
                this.addImage(o)
            }
            if ("string" == typeof this.options.background) {
                var r = t.querySelectorAll(this.options.background);
                for (n = 0; n < r.length; n++) {
                    var s = r[n];
                    this.addElementBackgroundImages(s)
                }
            }
        }
    }
    ;
    var c = {
        1: !0,
        9: !0,
        11: !0
    };
    return n.prototype.addElementBackgroundImages = function(t) {
        var e = getComputedStyle(t);
        if (e)
            for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n; ) {
                var o = n && n[2];
                o && this.addBackground(o, t),
                n = i.exec(e.backgroundImage)
            }
    }
    ,
    n.prototype.addImage = function(t) {
        var e = new o(t);
        this.images.push(e)
    }
    ,
    n.prototype.addBackground = function(t, e) {
        var i = new r(t,e);
        this.images.push(i)
    }
    ,
    n.prototype.check = function() {
        function t(t, i, n) {
            setTimeout(function() {
                e.progress(t, i, n)
            })
        }
        var e = this;
        return this.progressedCount = 0,
        this.hasAnyBroken = !1,
        this.images.length ? void this.images.forEach(function(e) {
            e.once("progress", t),
            e.check()
        }) : void this.complete()
    }
    ,
    n.prototype.progress = function(t, e, i) {
        this.progressedCount++,
        this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded,
        this.emitEvent("progress", [this, t, e]),
        this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t),
        this.progressedCount == this.images.length && this.complete(),
        this.options.debug && a && a.log("progress: " + i, t, e)
    }
    ,
    n.prototype.complete = function() {
        var t = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0,
        this.emitEvent(t, [this]),
        this.emitEvent("always", [this]),
        this.jqDeferred) {
            var e = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[e](this)
        }
    }
    ,
    o.prototype = Object.create(e.prototype),
    o.prototype.check = function() {
        return this.getIsImageComplete() ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image,
        this.proxyImage.addEventListener("load", this),
        this.proxyImage.addEventListener("error", this),
        this.img.addEventListener("load", this),
        this.img.addEventListener("error", this),
        void (this.proxyImage.src = this.img.src))
    }
    ,
    o.prototype.getIsImageComplete = function() {
        return this.img.complete && this.img.naturalWidth
    }
    ,
    o.prototype.confirm = function(t, e) {
        this.isLoaded = t,
        this.emitEvent("progress", [this, this.img, e])
    }
    ,
    o.prototype.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }
    ,
    o.prototype.onload = function() {
        this.confirm(!0, "onload"),
        this.unbindEvents()
    }
    ,
    o.prototype.onerror = function() {
        this.confirm(!1, "onerror"),
        this.unbindEvents()
    }
    ,
    o.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this),
        this.proxyImage.removeEventListener("error", this),
        this.img.removeEventListener("load", this),
        this.img.removeEventListener("error", this)
    }
    ,
    r.prototype = Object.create(o.prototype),
    r.prototype.check = function() {
        this.img.addEventListener("load", this),
        this.img.addEventListener("error", this),
        this.img.src = this.url,
        this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
        this.unbindEvents())
    }
    ,
    r.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this),
        this.img.removeEventListener("error", this)
    }
    ,
    r.prototype.confirm = function(t, e) {
        this.isLoaded = t,
        this.emitEvent("progress", [this, this.element, e])
    }
    ,
    n.makeJQueryPlugin = function(e) {
        (e = e || t.jQuery) && ((s = e).fn.imagesLoaded = function(t, e) {
            return new n(this,t,e).jqDeferred.promise(s(this))
        }
        )
    }
    ,
    n.makeJQueryPlugin(),
    n
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
}(window, function(t, e) {
    "use strict";
    var i = Array.prototype.slice
      , n = t.console
      , o = void 0 === n ? function() {}
    : function(t) {
        n.error(t)
    }
    ;
    function r(n, r, a) {
        (a = a || e || t.jQuery) && (r.prototype.option || (r.prototype.option = function(t) {
            a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
        }
        ),
        a.fn[n] = function(t) {
            return "string" == typeof t ? function(t, e, i) {
                var r, s = "$()." + n + '("' + e + '")';
                return t.each(function(t, l) {
                    var c = a.data(l, n);
                    if (c) {
                        var u = c[e];
                        if (u && "_" != e.charAt(0)) {
                            var d = u.apply(c, i);
                            r = void 0 === r ? d : r
                        } else
                            o(s + " is not a valid method")
                    } else
                        o(n + " not initialized. Cannot call methods, i.e. " + s)
                }),
                void 0 !== r ? r : t
            }(this, t, i.call(arguments, 1)) : (function(t, e) {
                t.each(function(t, i) {
                    var o = a.data(i, n);
                    o ? (o.option(e),
                    o._init()) : (o = new r(i,e),
                    a.data(i, n, o))
                })
            }(this, t),
            this)
        }
        ,
        s(a))
    }
    function s(t) {
        !t || t && t.bridget || (t.bridget = r)
    }
    return s(e || t.jQuery),
    r
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {}
              , n = i[t] = i[t] || [];
            return -1 == n.indexOf(e) && n.push(e),
            this
        }
    }
    ,
    e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {};
            return (i[t] = i[t] || {})[e] = !0,
            this
        }
    }
    ,
    e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = i.indexOf(e);
            return -1 != n && i.splice(n, 1),
            this
        }
    }
    ,
    e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            i = i.slice(0),
            e = e || [];
            for (var n = this._onceEvents && this._onceEvents[t], o = 0; o < i.length; o++) {
                var r = i[o];
                n && n[r] && (this.off(t, r),
                delete n[r]),
                r.apply(this, e)
            }
            return this
        }
    }
    ,
    e.allOff = function() {
        delete this._events,
        delete this._onceEvents
    }
    ,
    t
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("get-size/get-size", e) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function() {
    "use strict";
    function t(t) {
        var e = parseFloat(t);
        return -1 == t.indexOf("%") && !isNaN(e) && e
    }
    var e = "undefined" == typeof console ? function() {}
    : function(t) {
        console.error(t)
    }
      , i = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"]
      , n = i.length;
    function o(t) {
        var i = getComputedStyle(t);
        return i || e("Style returned " + i + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"),
        i
    }
    var r, s = !1;
    return function e(a) {
        if (function() {
            if (!s) {
                s = !0;
                var i = document.createElement("div");
                i.style.width = "200px",
                i.style.padding = "1px 2px 3px 4px",
                i.style.borderStyle = "solid",
                i.style.borderWidth = "1px 2px 3px 4px",
                i.style.boxSizing = "border-box";
                var n = document.body || document.documentElement;
                n.appendChild(i);
                var a = o(i);
                r = 200 == Math.round(t(a.width)),
                e.isBoxSizeOuter = r,
                n.removeChild(i)
            }
        }(),
        "string" == typeof a && (a = document.querySelector(a)),
        a && "object" == typeof a && a.nodeType) {
            var l = o(a);
            if ("none" == l.display)
                return function() {
                    for (var t = {
                        width: 0,
                        height: 0,
                        innerWidth: 0,
                        innerHeight: 0,
                        outerWidth: 0,
                        outerHeight: 0
                    }, e = 0; e < n; e++)
                        t[i[e]] = 0;
                    return t
                }();
            var c = {};
            c.width = a.offsetWidth,
            c.height = a.offsetHeight;
            for (var u = c.isBorderBox = "border-box" == l.boxSizing, d = 0; d < n; d++) {
                var h = i[d]
                  , f = l[h]
                  , p = parseFloat(f);
                c[h] = isNaN(p) ? 0 : p
            }
            var m = c.paddingLeft + c.paddingRight
              , g = c.paddingTop + c.paddingBottom
              , v = c.marginLeft + c.marginRight
              , y = c.marginTop + c.marginBottom
              , w = c.borderLeftWidth + c.borderRightWidth
              , b = c.borderTopWidth + c.borderBottomWidth
              , x = u && r
              , S = t(l.width);
            !1 !== S && (c.width = S + (x ? 0 : m + w));
            var C = t(l.height);
            return !1 !== C && (c.height = C + (x ? 0 : g + b)),
            c.innerWidth = c.width - (m + w),
            c.innerHeight = c.height - (g + b),
            c.outerWidth = c.width + v,
            c.outerHeight = c.height + y,
            c
        }
    }
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function() {
    "use strict";
    var t = function() {
        var t = window.Element.prototype;
        if (t.matches)
            return "matches";
        if (t.matchesSelector)
            return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
            var n = e[i] + "MatchesSelector";
            if (t[n])
                return n
        }
    }();
    return function(e, i) {
        return e[t](i)
    }
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
}(window, function(t, e) {
    var i = {
        extend: function(t, e) {
            for (var i in e)
                t[i] = e[i];
            return t
        },
        modulo: function(t, e) {
            return (t % e + e) % e
        }
    }
      , n = Array.prototype.slice;
    i.makeArray = function(t) {
        return Array.isArray(t) ? t : null == t ? [] : "object" == typeof t && "number" == typeof t.length ? n.call(t) : [t]
    }
    ,
    i.removeFrom = function(t, e) {
        var i = t.indexOf(e);
        -1 != i && t.splice(i, 1)
    }
    ,
    i.getParent = function(t, i) {
        for (; t.parentNode && t != document.body; )
            if (t = t.parentNode,
            e(t, i))
                return t
    }
    ,
    i.getQueryElement = function(t) {
        return "string" == typeof t ? document.querySelector(t) : t
    }
    ,
    i.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }
    ,
    i.filterFindElements = function(t, n) {
        t = i.makeArray(t);
        var o = [];
        return t.forEach(function(t) {
            if (t instanceof HTMLElement)
                if (n) {
                    e(t, n) && o.push(t);
                    for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++)
                        o.push(i[r])
                } else
                    o.push(t)
        }),
        o
    }
    ,
    i.debounceMethod = function(t, e, i) {
        i = i || 100;
        var n = t.prototype[e]
          , o = e + "Timeout";
        t.prototype[e] = function() {
            var t = this[o];
            clearTimeout(t);
            var e = arguments
              , r = this;
            this[o] = setTimeout(function() {
                n.apply(r, e),
                delete r[o]
            }, i)
        }
    }
    ,
    i.docReady = function(t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
    }
    ,
    i.toDashed = function(t) {
        return t.replace(/(.)([A-Z])/g, function(t, e, i) {
            return e + "-" + i
        }).toLowerCase()
    }
    ;
    var o = t.console;
    return i.htmlInit = function(e, n) {
        i.docReady(function() {
            var r = i.toDashed(n)
              , s = "data-" + r
              , a = document.querySelectorAll("[" + s + "]")
              , l = document.querySelectorAll(".js-" + r)
              , c = i.makeArray(a).concat(i.makeArray(l))
              , u = s + "-options"
              , d = t.jQuery;
            c.forEach(function(t) {
                var i, r = t.getAttribute(s) || t.getAttribute(u);
                try {
                    i = r && JSON.parse(r)
                } catch (i) {
                    return void (o && o.error("Error parsing " + s + " on " + t.className + ": " + i))
                }
                var a = new e(t,i);
                d && d.data(t, n, a)
            })
        })
    }
    ,
    i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/cell", ["get-size/get-size"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("get-size")) : (t.Flickity = t.Flickity || {},
    t.Flickity.Cell = e(t, t.getSize))
}(window, function(t, e) {
    function i(t, e) {
        this.element = t,
        this.parent = e,
        this.create()
    }
    var n = i.prototype;
    return n.create = function() {
        this.element.style.position = "absolute",
        this.element.setAttribute("aria-hidden", "true"),
        this.x = 0,
        this.shift = 0
    }
    ,
    n.destroy = function() {
        this.unselect(),
        this.element.style.position = "";
        var t = this.parent.originSide;
        this.element.style[t] = ""
    }
    ,
    n.getSize = function() {
        this.size = e(this.element)
    }
    ,
    n.setPosition = function(t) {
        this.x = t,
        this.updateTarget(),
        this.renderPosition(t)
    }
    ,
    n.updateTarget = n.setDefaultTarget = function() {
        var t = "left" == this.parent.originSide ? "marginLeft" : "marginRight";
        this.target = this.x + this.size[t] + this.size.width * this.parent.cellAlign
    }
    ,
    n.renderPosition = function(t) {
        var e = this.parent.originSide;
        this.element.style[e] = this.parent.getPositionValue(t)
    }
    ,
    n.select = function() {
        this.element.classList.add("is-selected"),
        this.element.removeAttribute("aria-hidden")
    }
    ,
    n.unselect = function() {
        this.element.classList.remove("is-selected"),
        this.element.setAttribute("aria-hidden", "true")
    }
    ,
    n.wrapShift = function(t) {
        this.shift = t,
        this.renderPosition(this.x + this.parent.slideableWidth * t)
    }
    ,
    n.remove = function() {
        this.element.parentNode.removeChild(this.element)
    }
    ,
    i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/slide", e) : "object" == typeof module && module.exports ? module.exports = e() : (t.Flickity = t.Flickity || {},
    t.Flickity.Slide = e())
}(window, function() {
    "use strict";
    function t(t) {
        this.parent = t,
        this.isOriginLeft = "left" == t.originSide,
        this.cells = [],
        this.outerWidth = 0,
        this.height = 0
    }
    var e = t.prototype;
    return e.addCell = function(t) {
        if (this.cells.push(t),
        this.outerWidth += t.size.outerWidth,
        this.height = Math.max(t.size.outerHeight, this.height),
        1 == this.cells.length) {
            this.x = t.x;
            var e = this.isOriginLeft ? "marginLeft" : "marginRight";
            this.firstMargin = t.size[e]
        }
    }
    ,
    e.updateTarget = function() {
        var t = this.isOriginLeft ? "marginRight" : "marginLeft"
          , e = this.getLastCell()
          , i = e ? e.size[t] : 0
          , n = this.outerWidth - (this.firstMargin + i);
        this.target = this.x + this.firstMargin + n * this.parent.cellAlign
    }
    ,
    e.getLastCell = function() {
        return this.cells[this.cells.length - 1]
    }
    ,
    e.select = function() {
        this.cells.forEach(function(t) {
            t.select()
        })
    }
    ,
    e.unselect = function() {
        this.cells.forEach(function(t) {
            t.unselect()
        })
    }
    ,
    e.getCellElements = function() {
        return this.cells.map(function(t) {
            return t.element
        })
    }
    ,
    t
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/animate", ["fizzy-ui-utils/utils"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("fizzy-ui-utils")) : (t.Flickity = t.Flickity || {},
    t.Flickity.animatePrototype = e(t, t.fizzyUIUtils))
}(window, function(t, e) {
    return {
        startAnimation: function() {
            this.isAnimating || (this.isAnimating = !0,
            this.restingFrames = 0,
            this.animate())
        },
        animate: function() {
            this.applyDragForce(),
            this.applySelectedAttraction();
            var t = this.x;
            if (this.integratePhysics(),
            this.positionSlider(),
            this.settle(t),
            this.isAnimating) {
                var e = this;
                requestAnimationFrame(function() {
                    e.animate()
                })
            }
        },
        positionSlider: function() {
            var t = this.x;
            this.options.wrapAround && 1 < this.cells.length && (t = e.modulo(t, this.slideableWidth),
            t -= this.slideableWidth,
            this.shiftWrapCells(t)),
            this.setTranslateX(t, this.isAnimating),
            this.dispatchScrollEvent()
        },
        setTranslateX: function(t, e) {
            t += this.cursorPosition,
            t = this.options.rightToLeft ? -t : t;
            var i = this.getPositionValue(t);
            this.slider.style.transform = e ? "translate3d(" + i + ",0,0)" : "translateX(" + i + ")"
        },
        dispatchScrollEvent: function() {
            var t = this.slides[0];
            if (t) {
                var e = -this.x - t.target
                  , i = e / this.slidesWidth;
                this.dispatchEvent("scroll", null, [i, e])
            }
        },
        positionSliderAtSelected: function() {
            this.cells.length && (this.x = -this.selectedSlide.target,
            this.velocity = 0,
            this.positionSlider())
        },
        getPositionValue: function(t) {
            return this.options.percentPosition ? .01 * Math.round(t / this.size.innerWidth * 1e4) + "%" : Math.round(t) + "px"
        },
        settle: function(t) {
            this.isPointerDown || Math.round(100 * this.x) != Math.round(100 * t) || this.restingFrames++,
            2 < this.restingFrames && (this.isAnimating = !1,
            delete this.isFreeScrolling,
            this.positionSlider(),
            this.dispatchEvent("settle", null, [this.selectedIndex]))
        },
        shiftWrapCells: function(t) {
            var e = this.cursorPosition + t;
            this._shiftCells(this.beforeShiftCells, e, -1);
            var i = this.size.innerWidth - (t + this.slideableWidth + this.cursorPosition);
            this._shiftCells(this.afterShiftCells, i, 1)
        },
        _shiftCells: function(t, e, i) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n]
                  , r = 0 < e ? i : 0;
                o.wrapShift(r),
                e -= o.size.outerWidth
            }
        },
        _unshiftCells: function(t) {
            if (t && t.length)
                for (var e = 0; e < t.length; e++)
                    t[e].wrapShift(0)
        },
        integratePhysics: function() {
            this.x += this.velocity,
            this.velocity *= this.getFrictionFactor()
        },
        applyForce: function(t) {
            this.velocity += t
        },
        getFrictionFactor: function() {
            return 1 - this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"]
        },
        getRestingPosition: function() {
            return this.x + this.velocity / (1 - this.getFrictionFactor())
        },
        applyDragForce: function() {
            if (this.isDraggable && this.isPointerDown) {
                var t = this.dragX - this.x - this.velocity;
                this.applyForce(t)
            }
        },
        applySelectedAttraction: function() {
            if ((!this.isDraggable || !this.isPointerDown) && !this.isFreeScrolling && this.slides.length) {
                var t = (-1 * this.selectedSlide.target - this.x) * this.options.selectedAttraction;
                this.applyForce(t)
            }
        }
    }
}),
function(t, e) {
    if ("function" == typeof define && define.amd)
        define("flickity/js/flickity", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./cell", "./slide", "./animate"], function(i, n, o, r, s, a) {
            return e(t, i, n, o, r, s, a)
        });
    else if ("object" == typeof module && module.exports)
        module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./cell"), require("./slide"), require("./animate"));
    else {
        var i = t.Flickity;
        t.Flickity = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, i.Cell, i.Slide, i.animatePrototype)
    }
}(window, function(t, e, i, n, o, r, s) {
    var a = t.jQuery
      , l = t.getComputedStyle
      , c = t.console;
    function u(t, e) {
        for (t = n.makeArray(t); t.length; )
            e.appendChild(t.shift())
    }
    var d = 0
      , h = {};
    function f(t, e) {
        var i = n.getQueryElement(t);
        if (i) {
            if (this.element = i,
            this.element.flickityGUID) {
                var o = h[this.element.flickityGUID];
                return o.option(e),
                o
            }
            a && (this.$element = a(this.element)),
            this.options = n.extend({}, this.constructor.defaults),
            this.option(e),
            this._create()
        } else
            c && c.error("Bad element for Flickity: " + (i || t))
    }
    f.defaults = {
        accessibility: !0,
        cellAlign: "center",
        freeScrollFriction: .075,
        friction: .28,
        namespaceJQueryEvents: !0,
        percentPosition: !0,
        resize: !0,
        selectedAttraction: .025,
        setGallerySize: !0
    },
    f.createMethods = [];
    var p = f.prototype;
    n.extend(p, e.prototype),
    p._create = function() {
        var e = this.guid = ++d;
        for (var i in this.element.flickityGUID = e,
        (h[e] = this).selectedIndex = 0,
        this.restingFrames = 0,
        this.x = 0,
        this.velocity = 0,
        this.originSide = this.options.rightToLeft ? "right" : "left",
        this.viewport = document.createElement("div"),
        this.viewport.className = "flickity-viewport",
        this._createSlider(),
        (this.options.resize || this.options.watchCSS) && t.addEventListener("resize", this),
        this.options.on) {
            var n = this.options.on[i];
            this.on(i, n)
        }
        f.createMethods.forEach(function(t) {
            this[t]()
        }, this),
        this.options.watchCSS ? this.watchCSS() : this.activate()
    }
    ,
    p.option = function(t) {
        n.extend(this.options, t)
    }
    ,
    p.activate = function() {
        this.isActive || (this.isActive = !0,
        this.element.classList.add("flickity-enabled"),
        this.options.rightToLeft && this.element.classList.add("flickity-rtl"),
        this.getSize(),
        u(this._filterFindCellElements(this.element.children), this.slider),
        this.viewport.appendChild(this.slider),
        this.element.appendChild(this.viewport),
        this.reloadCells(),
        this.options.accessibility && (this.element.tabIndex = 0,
        this.element.addEventListener("keydown", this)),
        this.emitEvent("activate"),
        this.selectInitialIndex(),
        this.isInitActivated = !0,
        this.dispatchEvent("ready"))
    }
    ,
    p._createSlider = function() {
        var t = document.createElement("div");
        t.className = "flickity-slider",
        t.style[this.originSide] = 0,
        this.slider = t
    }
    ,
    p._filterFindCellElements = function(t) {
        return n.filterFindElements(t, this.options.cellSelector)
    }
    ,
    p.reloadCells = function() {
        this.cells = this._makeCells(this.slider.children),
        this.positionCells(),
        this._getWrapShiftCells(),
        this.setGallerySize()
    }
    ,
    p._makeCells = function(t) {
        return this._filterFindCellElements(t).map(function(t) {
            return new o(t,this)
        }, this)
    }
    ,
    p.getLastCell = function() {
        return this.cells[this.cells.length - 1]
    }
    ,
    p.getLastSlide = function() {
        return this.slides[this.slides.length - 1]
    }
    ,
    p.positionCells = function() {
        this._sizeCells(this.cells),
        this._positionCells(0)
    }
    ,
    p._positionCells = function(t) {
        t = t || 0,
        this.maxCellHeight = t && this.maxCellHeight || 0;
        var e = 0;
        if (0 < t) {
            var i = this.cells[t - 1];
            e = i.x + i.size.outerWidth
        }
        for (var n = this.cells.length, o = t; o < n; o++) {
            var r = this.cells[o];
            r.setPosition(e),
            e += r.size.outerWidth,
            this.maxCellHeight = Math.max(r.size.outerHeight, this.maxCellHeight)
        }
        this.slideableWidth = e,
        this.updateSlides(),
        this._containSlides(),
        this.slidesWidth = n ? this.getLastSlide().target - this.slides[0].target : 0
    }
    ,
    p._sizeCells = function(t) {
        t.forEach(function(t) {
            t.getSize()
        })
    }
    ,
    p.updateSlides = function() {
        if (this.slides = [],
        this.cells.length) {
            var t = new r(this);
            this.slides.push(t);
            var e = "left" == this.originSide ? "marginRight" : "marginLeft"
              , i = this._getCanCellFit();
            this.cells.forEach(function(n, o) {
                if (t.cells.length) {
                    var s = t.outerWidth - t.firstMargin + (n.size.outerWidth - n.size[e]);
                    i.call(this, o, s) || (t.updateTarget(),
                    t = new r(this),
                    this.slides.push(t)),
                    t.addCell(n)
                } else
                    t.addCell(n)
            }, this),
            t.updateTarget(),
            this.updateSelectedSlide()
        }
    }
    ,
    p._getCanCellFit = function() {
        var t = this.options.groupCells;
        if (!t)
            return function() {
                return !1
            }
            ;
        if ("number" == typeof t) {
            var e = parseInt(t, 10);
            return function(t) {
                return t % e != 0
            }
        }
        var i = "string" == typeof t && t.match(/^(\d+)%$/)
          , n = i ? parseInt(i[1], 10) / 100 : 1;
        return function(t, e) {
            return e <= (this.size.innerWidth + 1) * n
        }
    }
    ,
    p._init = p.reposition = function() {
        this.positionCells(),
        this.positionSliderAtSelected()
    }
    ,
    p.getSize = function() {
        this.size = i(this.element),
        this.setCellAlign(),
        this.cursorPosition = this.size.innerWidth * this.cellAlign
    }
    ;
    var m = {
        center: {
            left: .5,
            right: .5
        },
        left: {
            left: 0,
            right: 1
        },
        right: {
            right: 0,
            left: 1
        }
    };
    return p.setCellAlign = function() {
        var t = m[this.options.cellAlign];
        this.cellAlign = t ? t[this.originSide] : this.options.cellAlign
    }
    ,
    p.setGallerySize = function() {
        if (this.options.setGallerySize) {
            var t = this.options.adaptiveHeight && this.selectedSlide ? this.selectedSlide.height : this.maxCellHeight;
            this.viewport.style.height = t + "px"
        }
    }
    ,
    p._getWrapShiftCells = function() {
        if (this.options.wrapAround) {
            this._unshiftCells(this.beforeShiftCells),
            this._unshiftCells(this.afterShiftCells);
            var t = this.cursorPosition
              , e = this.cells.length - 1;
            this.beforeShiftCells = this._getGapCells(t, e, -1),
            t = this.size.innerWidth - this.cursorPosition,
            this.afterShiftCells = this._getGapCells(t, 0, 1)
        }
    }
    ,
    p._getGapCells = function(t, e, i) {
        for (var n = []; 0 < t; ) {
            var o = this.cells[e];
            if (!o)
                break;
            n.push(o),
            e += i,
            t -= o.size.outerWidth
        }
        return n
    }
    ,
    p._containSlides = function() {
        if (this.options.contain && !this.options.wrapAround && this.cells.length) {
            var t = this.options.rightToLeft
              , e = t ? "marginRight" : "marginLeft"
              , i = t ? "marginLeft" : "marginRight"
              , n = this.slideableWidth - this.getLastCell().size[i]
              , o = n < this.size.innerWidth
              , r = this.cursorPosition + this.cells[0].size[e]
              , s = n - this.size.innerWidth * (1 - this.cellAlign);
            this.slides.forEach(function(t) {
                o ? t.target = n * this.cellAlign : (t.target = Math.max(t.target, r),
                t.target = Math.min(t.target, s))
            }, this)
        }
    }
    ,
    p.dispatchEvent = function(t, e, i) {
        var n = e ? [e].concat(i) : i;
        if (this.emitEvent(t, n),
        a && this.$element) {
            var o = t += this.options.namespaceJQueryEvents ? ".flickity" : "";
            if (e) {
                var r = a.Event(e);
                r.type = t,
                o = r
            }
            this.$element.trigger(o, i)
        }
    }
    ,
    p.select = function(t, e, i) {
        if (this.isActive && (t = parseInt(t, 10),
        this._wrapSelect(t),
        (this.options.wrapAround || e) && (t = n.modulo(t, this.slides.length)),
        this.slides[t])) {
            var o = this.selectedIndex;
            this.selectedIndex = t,
            this.updateSelectedSlide(),
            i ? this.positionSliderAtSelected() : this.startAnimation(),
            this.options.adaptiveHeight && this.setGallerySize(),
            this.dispatchEvent("select", null, [t]),
            t != o && this.dispatchEvent("change", null, [t]),
            this.dispatchEvent("cellSelect")
        }
    }
    ,
    p._wrapSelect = function(t) {
        var e = this.slides.length;
        if (!(this.options.wrapAround && 1 < e))
            return t;
        var i = n.modulo(t, e)
          , o = Math.abs(i - this.selectedIndex)
          , r = Math.abs(i + e - this.selectedIndex)
          , s = Math.abs(i - e - this.selectedIndex);
        !this.isDragSelect && r < o ? t += e : !this.isDragSelect && s < o && (t -= e),
        t < 0 ? this.x -= this.slideableWidth : e <= t && (this.x += this.slideableWidth)
    }
    ,
    p.previous = function(t, e) {
        this.select(this.selectedIndex - 1, t, e)
    }
    ,
    p.next = function(t, e) {
        this.select(this.selectedIndex + 1, t, e)
    }
    ,
    p.updateSelectedSlide = function() {
        var t = this.slides[this.selectedIndex];
        t && (this.unselectSelectedSlide(),
        (this.selectedSlide = t).select(),
        this.selectedCells = t.cells,
        this.selectedElements = t.getCellElements(),
        this.selectedCell = t.cells[0],
        this.selectedElement = this.selectedElements[0])
    }
    ,
    p.unselectSelectedSlide = function() {
        this.selectedSlide && this.selectedSlide.unselect()
    }
    ,
    p.selectInitialIndex = function() {
        var t = this.options.initialIndex;
        if (this.isInitActivated)
            this.select(this.selectedIndex, !1, !0);
        else {
            if (t && "string" == typeof t && this.queryCell(t))
                return void this.selectCell(t, !1, !0);
            var e = 0;
            t && this.slides[t] && (e = t),
            this.select(e, !1, !0)
        }
    }
    ,
    p.selectCell = function(t, e, i) {
        var n = this.queryCell(t);
        if (n) {
            var o = this.getCellSlideIndex(n);
            this.select(o, e, i)
        }
    }
    ,
    p.getCellSlideIndex = function(t) {
        for (var e = 0; e < this.slides.length; e++)
            if (-1 != this.slides[e].cells.indexOf(t))
                return e
    }
    ,
    p.getCell = function(t) {
        for (var e = 0; e < this.cells.length; e++) {
            var i = this.cells[e];
            if (i.element == t)
                return i
        }
    }
    ,
    p.getCells = function(t) {
        t = n.makeArray(t);
        var e = [];
        return t.forEach(function(t) {
            var i = this.getCell(t);
            i && e.push(i)
        }, this),
        e
    }
    ,
    p.getCellElements = function() {
        return this.cells.map(function(t) {
            return t.element
        })
    }
    ,
    p.getParentCell = function(t) {
        return this.getCell(t) || (t = n.getParent(t, ".flickity-slider > *"),
        this.getCell(t))
    }
    ,
    p.getAdjacentCellElements = function(t, e) {
        if (!t)
            return this.selectedSlide.getCellElements();
        e = void 0 === e ? this.selectedIndex : e;
        var i = this.slides.length;
        if (i <= 1 + 2 * t)
            return this.getCellElements();
        for (var o = [], r = e - t; r <= e + t; r++) {
            var s = this.options.wrapAround ? n.modulo(r, i) : r
              , a = this.slides[s];
            a && (o = o.concat(a.getCellElements()))
        }
        return o
    }
    ,
    p.queryCell = function(t) {
        if ("number" == typeof t)
            return this.cells[t];
        if ("string" == typeof t) {
            if (t.match(/^[#\.]?[\d\/]/))
                return;
            t = this.element.querySelector(t)
        }
        return this.getCell(t)
    }
    ,
    p.uiChange = function() {
        this.emitEvent("uiChange")
    }
    ,
    p.childUIPointerDown = function(t) {
        "touchstart" != t.type && t.preventDefault(),
        this.focus()
    }
    ,
    p.onresize = function() {
        this.watchCSS(),
        this.resize()
    }
    ,
    n.debounceMethod(f, "onresize", 150),
    p.resize = function() {
        if (this.isActive) {
            this.getSize(),
            this.options.wrapAround && (this.x = n.modulo(this.x, this.slideableWidth)),
            this.positionCells(),
            this._getWrapShiftCells(),
            this.setGallerySize(),
            this.emitEvent("resize");
            var t = this.selectedElements && this.selectedElements[0];
            this.selectCell(t, !1, !0)
        }
    }
    ,
    p.watchCSS = function() {
        this.options.watchCSS && (-1 != l(this.element, ":after").content.indexOf("flickity") ? this.activate() : this.deactivate())
    }
    ,
    p.onkeydown = function(t) {
        var e = document.activeElement && document.activeElement != this.element;
        if (this.options.accessibility && !e) {
            var i = f.keyboardHandlers[t.keyCode];
            i && i.call(this)
        }
    }
    ,
    f.keyboardHandlers = {
        37: function() {
            var t = this.options.rightToLeft ? "next" : "previous";
            this.uiChange(),
            this[t]()
        },
        39: function() {
            var t = this.options.rightToLeft ? "previous" : "next";
            this.uiChange(),
            this[t]()
        }
    },
    p.focus = function() {
        var e = t.pageYOffset;
        this.element.focus({
            preventScroll: !0
        }),
        t.pageYOffset != e && t.scrollTo(t.pageXOffset, e)
    }
    ,
    p.deactivate = function() {
        this.isActive && (this.element.classList.remove("flickity-enabled"),
        this.element.classList.remove("flickity-rtl"),
        this.unselectSelectedSlide(),
        this.cells.forEach(function(t) {
            t.destroy()
        }),
        this.element.removeChild(this.viewport),
        u(this.slider.children, this.element),
        this.options.accessibility && (this.element.removeAttribute("tabIndex"),
        this.element.removeEventListener("keydown", this)),
        this.isActive = !1,
        this.emitEvent("deactivate"))
    }
    ,
    p.destroy = function() {
        this.deactivate(),
        t.removeEventListener("resize", this),
        this.allOff(),
        this.emitEvent("destroy"),
        a && this.$element && a.removeData(this.element, "flickity"),
        delete this.element.flickityGUID,
        delete h[this.guid]
    }
    ,
    n.extend(p, s),
    f.data = function(t) {
        var e = (t = n.getQueryElement(t)) && t.flickityGUID;
        return e && h[e]
    }
    ,
    n.htmlInit(f, "flickity"),
    a && a.bridget && a.bridget("flickity", f),
    f.setJQuery = function(t) {
        a = t
    }
    ,
    f.Cell = o,
    f.Slide = r,
    f
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("unipointer/unipointer", ["ev-emitter/ev-emitter"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.Unipointer = e(t, t.EvEmitter)
}(window, function(t, e) {
    function i() {}
    var n = i.prototype = Object.create(e.prototype);
    n.bindStartEvent = function(t) {
        this._bindStartEvent(t, !0)
    }
    ,
    n.unbindStartEvent = function(t) {
        this._bindStartEvent(t, !1)
    }
    ,
    n._bindStartEvent = function(e, i) {
        var n = (i = void 0 === i || i) ? "addEventListener" : "removeEventListener"
          , o = "mousedown";
        t.PointerEvent ? o = "pointerdown" : "ontouchstart"in t && (o = "touchstart"),
        e[n](o, this)
    }
    ,
    n.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }
    ,
    n.getTouch = function(t) {
        for (var e = 0; e < t.length; e++) {
            var i = t[e];
            if (i.identifier == this.pointerIdentifier)
                return i
        }
    }
    ,
    n.onmousedown = function(t) {
        var e = t.button;
        e && 0 !== e && 1 !== e || this._pointerDown(t, t)
    }
    ,
    n.ontouchstart = function(t) {
        this._pointerDown(t, t.changedTouches[0])
    }
    ,
    n.onpointerdown = function(t) {
        this._pointerDown(t, t)
    }
    ,
    n._pointerDown = function(t, e) {
        t.button || this.isPointerDown || (this.isPointerDown = !0,
        this.pointerIdentifier = void 0 !== e.pointerId ? e.pointerId : e.identifier,
        this.pointerDown(t, e))
    }
    ,
    n.pointerDown = function(t, e) {
        this._bindPostStartEvents(t),
        this.emitEvent("pointerDown", [t, e])
    }
    ;
    var o = {
        mousedown: ["mousemove", "mouseup"],
        touchstart: ["touchmove", "touchend", "touchcancel"],
        pointerdown: ["pointermove", "pointerup", "pointercancel"]
    };
    return n._bindPostStartEvents = function(e) {
        if (e) {
            var i = o[e.type];
            i.forEach(function(e) {
                t.addEventListener(e, this)
            }, this),
            this._boundPointerEvents = i
        }
    }
    ,
    n._unbindPostStartEvents = function() {
        this._boundPointerEvents && (this._boundPointerEvents.forEach(function(e) {
            t.removeEventListener(e, this)
        }, this),
        delete this._boundPointerEvents)
    }
    ,
    n.onmousemove = function(t) {
        this._pointerMove(t, t)
    }
    ,
    n.onpointermove = function(t) {
        t.pointerId == this.pointerIdentifier && this._pointerMove(t, t)
    }
    ,
    n.ontouchmove = function(t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerMove(t, e)
    }
    ,
    n._pointerMove = function(t, e) {
        this.pointerMove(t, e)
    }
    ,
    n.pointerMove = function(t, e) {
        this.emitEvent("pointerMove", [t, e])
    }
    ,
    n.onmouseup = function(t) {
        this._pointerUp(t, t)
    }
    ,
    n.onpointerup = function(t) {
        t.pointerId == this.pointerIdentifier && this._pointerUp(t, t)
    }
    ,
    n.ontouchend = function(t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerUp(t, e)
    }
    ,
    n._pointerUp = function(t, e) {
        this._pointerDone(),
        this.pointerUp(t, e)
    }
    ,
    n.pointerUp = function(t, e) {
        this.emitEvent("pointerUp", [t, e])
    }
    ,
    n._pointerDone = function() {
        this._pointerReset(),
        this._unbindPostStartEvents(),
        this.pointerDone()
    }
    ,
    n._pointerReset = function() {
        this.isPointerDown = !1,
        delete this.pointerIdentifier
    }
    ,
    n.pointerDone = function() {}
    ,
    n.onpointercancel = function(t) {
        t.pointerId == this.pointerIdentifier && this._pointerCancel(t, t)
    }
    ,
    n.ontouchcancel = function(t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerCancel(t, e)
    }
    ,
    n._pointerCancel = function(t, e) {
        this._pointerDone(),
        this.pointerCancel(t, e)
    }
    ,
    n.pointerCancel = function(t, e) {
        this.emitEvent("pointerCancel", [t, e])
    }
    ,
    i.getPointerPoint = function(t) {
        return {
            x: t.pageX,
            y: t.pageY
        }
    }
    ,
    i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("unidragger/unidragger", ["unipointer/unipointer"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("unipointer")) : t.Unidragger = e(t, t.Unipointer)
}(window, function(t, e) {
    function i() {}
    var n = i.prototype = Object.create(e.prototype);
    n.bindHandles = function() {
        this._bindHandles(!0)
    }
    ,
    n.unbindHandles = function() {
        this._bindHandles(!1)
    }
    ,
    n._bindHandles = function(e) {
        for (var i = (e = void 0 === e || e) ? "addEventListener" : "removeEventListener", n = e ? this._touchActionValue : "", o = 0; o < this.handles.length; o++) {
            var r = this.handles[o];
            this._bindStartEvent(r, e),
            r[i]("click", this),
            t.PointerEvent && (r.style.touchAction = n)
        }
    }
    ,
    n._touchActionValue = "none",
    n.pointerDown = function(t, e) {
        this.okayPointerDown(t) && (this.pointerDownPointer = e,
        t.preventDefault(),
        this.pointerDownBlur(),
        this._bindPostStartEvents(t),
        this.emitEvent("pointerDown", [t, e]))
    }
    ;
    var o = {
        TEXTAREA: !0,
        INPUT: !0,
        SELECT: !0,
        OPTION: !0
    }
      , r = {
        radio: !0,
        checkbox: !0,
        button: !0,
        submit: !0,
        image: !0,
        file: !0
    };
    return n.okayPointerDown = function(t) {
        var e = o[t.target.nodeName]
          , i = r[t.target.type]
          , n = !e || i;
        return n || this._pointerReset(),
        n
    }
    ,
    n.pointerDownBlur = function() {
        var t = document.activeElement;
        t && t.blur && t != document.body && t.blur()
    }
    ,
    n.pointerMove = function(t, e) {
        var i = this._dragPointerMove(t, e);
        this.emitEvent("pointerMove", [t, e, i]),
        this._dragMove(t, e, i)
    }
    ,
    n._dragPointerMove = function(t, e) {
        var i = {
            x: e.pageX - this.pointerDownPointer.pageX,
            y: e.pageY - this.pointerDownPointer.pageY
        };
        return !this.isDragging && this.hasDragStarted(i) && this._dragStart(t, e),
        i
    }
    ,
    n.hasDragStarted = function(t) {
        return 3 < Math.abs(t.x) || 3 < Math.abs(t.y)
    }
    ,
    n.pointerUp = function(t, e) {
        this.emitEvent("pointerUp", [t, e]),
        this._dragPointerUp(t, e)
    }
    ,
    n._dragPointerUp = function(t, e) {
        this.isDragging ? this._dragEnd(t, e) : this._staticClick(t, e)
    }
    ,
    n._dragStart = function(t, e) {
        this.isDragging = !0,
        this.isPreventingClicks = !0,
        this.dragStart(t, e)
    }
    ,
    n.dragStart = function(t, e) {
        this.emitEvent("dragStart", [t, e])
    }
    ,
    n._dragMove = function(t, e, i) {
        this.isDragging && this.dragMove(t, e, i)
    }
    ,
    n.dragMove = function(t, e, i) {
        t.preventDefault(),
        this.emitEvent("dragMove", [t, e, i])
    }
    ,
    n._dragEnd = function(t, e) {
        this.isDragging = !1,
        setTimeout(function() {
            delete this.isPreventingClicks
        }
        .bind(this)),
        this.dragEnd(t, e)
    }
    ,
    n.dragEnd = function(t, e) {
        this.emitEvent("dragEnd", [t, e])
    }
    ,
    n.onclick = function(t) {
        this.isPreventingClicks && t.preventDefault()
    }
    ,
    n._staticClick = function(t, e) {
        this.isIgnoringMouseUp && "mouseup" == t.type || (this.staticClick(t, e),
        "mouseup" != t.type && (this.isIgnoringMouseUp = !0,
        setTimeout(function() {
            delete this.isIgnoringMouseUp
        }
        .bind(this), 400)))
    }
    ,
    n.staticClick = function(t, e) {
        this.emitEvent("staticClick", [t, e])
    }
    ,
    i.getPointerPoint = e.getPointerPoint,
    i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/drag", ["./flickity", "unidragger/unidragger", "fizzy-ui-utils/utils"], function(i, n, o) {
        return e(t, i, n, o)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("unidragger"), require("fizzy-ui-utils")) : t.Flickity = e(t, t.Flickity, t.Unidragger, t.fizzyUIUtils)
}(window, function(t, e, i, n) {
    n.extend(e.defaults, {
        draggable: ">1",
        dragThreshold: 3
    }),
    e.createMethods.push("_createDrag");
    var o = e.prototype;
    n.extend(o, i.prototype),
    o._touchActionValue = "pan-y";
    var r = "createTouch"in document
      , s = !1;
    o._createDrag = function() {
        this.on("activate", this.onActivateDrag),
        this.on("uiChange", this._uiChangeDrag),
        this.on("deactivate", this.onDeactivateDrag),
        this.on("cellChange", this.updateDraggable),
        r && !s && (t.addEventListener("touchmove", function() {}),
        s = !0)
    }
    ,
    o.onActivateDrag = function() {
        this.handles = [this.viewport],
        this.bindHandles(),
        this.updateDraggable()
    }
    ,
    o.onDeactivateDrag = function() {
        this.unbindHandles(),
        this.element.classList.remove("is-draggable")
    }
    ,
    o.updateDraggable = function() {
        ">1" == this.options.draggable ? this.isDraggable = 1 < this.slides.length : this.isDraggable = this.options.draggable,
        this.isDraggable ? this.element.classList.add("is-draggable") : this.element.classList.remove("is-draggable")
    }
    ,
    o.bindDrag = function() {
        this.options.draggable = !0,
        this.updateDraggable()
    }
    ,
    o.unbindDrag = function() {
        this.options.draggable = !1,
        this.updateDraggable()
    }
    ,
    o._uiChangeDrag = function() {
        delete this.isFreeScrolling
    }
    ,
    o.pointerDown = function(e, i) {
        this.isDraggable ? this.okayPointerDown(e) && (this._pointerDownPreventDefault(e),
        this.pointerDownFocus(e),
        document.activeElement != this.element && this.pointerDownBlur(),
        this.dragX = this.x,
        this.viewport.classList.add("is-pointer-down"),
        this.pointerDownScroll = l(),
        t.addEventListener("scroll", this),
        this._pointerDownDefault(e, i)) : this._pointerDownDefault(e, i)
    }
    ,
    o._pointerDownDefault = function(t, e) {
        this.pointerDownPointer = {
            pageX: e.pageX,
            pageY: e.pageY
        },
        this._bindPostStartEvents(t),
        this.dispatchEvent("pointerDown", t, [e])
    }
    ;
    var a = {
        INPUT: !0,
        TEXTAREA: !0,
        SELECT: !0
    };
    function l() {
        return {
            x: t.pageXOffset,
            y: t.pageYOffset
        }
    }
    return o.pointerDownFocus = function(t) {
        a[t.target.nodeName] || this.focus()
    }
    ,
    o._pointerDownPreventDefault = function(t) {
        var e = "touchstart" == t.type
          , i = "touch" == t.pointerType
          , n = a[t.target.nodeName];
        e || i || n || t.preventDefault()
    }
    ,
    o.hasDragStarted = function(t) {
        return Math.abs(t.x) > this.options.dragThreshold
    }
    ,
    o.pointerUp = function(t, e) {
        delete this.isTouchScrolling,
        this.viewport.classList.remove("is-pointer-down"),
        this.dispatchEvent("pointerUp", t, [e]),
        this._dragPointerUp(t, e)
    }
    ,
    o.pointerDone = function() {
        t.removeEventListener("scroll", this),
        delete this.pointerDownScroll
    }
    ,
    o.dragStart = function(e, i) {
        this.isDraggable && (this.dragStartPosition = this.x,
        this.startAnimation(),
        t.removeEventListener("scroll", this),
        this.dispatchEvent("dragStart", e, [i]))
    }
    ,
    o.pointerMove = function(t, e) {
        var i = this._dragPointerMove(t, e);
        this.dispatchEvent("pointerMove", t, [e, i]),
        this._dragMove(t, e, i)
    }
    ,
    o.dragMove = function(t, e, i) {
        if (this.isDraggable) {
            t.preventDefault(),
            this.previousDragX = this.dragX;
            var n = this.options.rightToLeft ? -1 : 1;
            this.options.wrapAround && (i.x = i.x % this.slideableWidth);
            var o = this.dragStartPosition + i.x * n;
            if (!this.options.wrapAround && this.slides.length) {
                var r = Math.max(-this.slides[0].target, this.dragStartPosition);
                o = r < o ? .5 * (o + r) : o;
                var s = Math.min(-this.getLastSlide().target, this.dragStartPosition);
                o = o < s ? .5 * (o + s) : o
            }
            this.dragX = o,
            this.dragMoveTime = new Date,
            this.dispatchEvent("dragMove", t, [e, i])
        }
    }
    ,
    o.dragEnd = function(t, e) {
        if (this.isDraggable) {
            this.options.freeScroll && (this.isFreeScrolling = !0);
            var i = this.dragEndRestingSelect();
            if (this.options.freeScroll && !this.options.wrapAround) {
                var n = this.getRestingPosition();
                this.isFreeScrolling = -n > this.slides[0].target && -n < this.getLastSlide().target
            } else
                this.options.freeScroll || i != this.selectedIndex || (i += this.dragEndBoostSelect());
            delete this.previousDragX,
            this.isDragSelect = this.options.wrapAround,
            this.select(i),
            delete this.isDragSelect,
            this.dispatchEvent("dragEnd", t, [e])
        }
    }
    ,
    o.dragEndRestingSelect = function() {
        var t = this.getRestingPosition()
          , e = Math.abs(this.getSlideDistance(-t, this.selectedIndex))
          , i = this._getClosestResting(t, e, 1)
          , n = this._getClosestResting(t, e, -1);
        return i.distance < n.distance ? i.index : n.index
    }
    ,
    o._getClosestResting = function(t, e, i) {
        for (var n = this.selectedIndex, o = 1 / 0, r = this.options.contain && !this.options.wrapAround ? function(t, e) {
            return t <= e
        }
        : function(t, e) {
            return t < e
        }
        ; r(e, o) && (n += i,
        o = e,
        null !== (e = this.getSlideDistance(-t, n))); )
            e = Math.abs(e);
        return {
            distance: o,
            index: n - i
        }
    }
    ,
    o.getSlideDistance = function(t, e) {
        var i = this.slides.length
          , o = this.options.wrapAround && 1 < i
          , r = o ? n.modulo(e, i) : e
          , s = this.slides[r];
        if (!s)
            return null;
        var a = o ? this.slideableWidth * Math.floor(e / i) : 0;
        return t - (s.target + a)
    }
    ,
    o.dragEndBoostSelect = function() {
        if (void 0 === this.previousDragX || !this.dragMoveTime || 100 < new Date - this.dragMoveTime)
            return 0;
        var t = this.getSlideDistance(-this.dragX, this.selectedIndex)
          , e = this.previousDragX - this.dragX;
        return 0 < t && 0 < e ? 1 : t < 0 && e < 0 ? -1 : 0
    }
    ,
    o.staticClick = function(t, e) {
        var i = this.getParentCell(t.target)
          , n = i && i.element
          , o = i && this.cells.indexOf(i);
        this.dispatchEvent("staticClick", t, [e, n, o])
    }
    ,
    o.onscroll = function() {
        var t = l()
          , e = this.pointerDownScroll.x - t.x
          , i = this.pointerDownScroll.y - t.y;
        (3 < Math.abs(e) || 3 < Math.abs(i)) && this._pointerDone()
    }
    ,
    e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/prev-next-button", ["./flickity", "unipointer/unipointer", "fizzy-ui-utils/utils"], function(i, n, o) {
        return e(t, i, n, o)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("unipointer"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.Unipointer, t.fizzyUIUtils)
}(window, function(t, e, i, n) {
    "use strict";
    var o = "http://www.w3.org/2000/svg";
    function r(t, e) {
        this.direction = t,
        this.parent = e,
        this._create()
    }
    (r.prototype = Object.create(i.prototype))._create = function() {
        this.isEnabled = !0,
        this.isPrevious = -1 == this.direction;
        var t = this.parent.options.rightToLeft ? 1 : -1;
        this.isLeft = this.direction == t;
        var e = this.element = document.createElement("button");
        e.className = "flickity-button flickity-prev-next-button",
        e.className += this.isPrevious ? " previous" : " next",
        e.setAttribute("type", "button"),
        this.disable(),
        e.setAttribute("aria-label", this.isPrevious ? "Previous" : "Next");
        var i = this.createSVG();
        e.appendChild(i),
        this.parent.on("select", this.update.bind(this)),
        this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
    }
    ,
    r.prototype.activate = function() {
        this.bindStartEvent(this.element),
        this.element.addEventListener("click", this),
        this.parent.element.appendChild(this.element)
    }
    ,
    r.prototype.deactivate = function() {
        this.parent.element.removeChild(this.element),
        this.unbindStartEvent(this.element),
        this.element.removeEventListener("click", this)
    }
    ,
    r.prototype.createSVG = function() {
        var t = document.createElementNS(o, "svg");
        t.setAttribute("class", "flickity-button-icon"),
        t.setAttribute("viewBox", "0 0 100 100");
        var e = document.createElementNS(o, "path")
          , i = function(t) {
            return "string" != typeof t ? "M " + t.x0 + ",50 L " + t.x1 + "," + (t.y1 + 50) + " L " + t.x2 + "," + (t.y2 + 50) + " L " + t.x3 + ",50  L " + t.x2 + "," + (50 - t.y2) + " L " + t.x1 + "," + (50 - t.y1) + " Z" : t
        }(this.parent.options.arrowShape);
        return e.setAttribute("d", i),
        e.setAttribute("class", "arrow"),
        this.isLeft || e.setAttribute("transform", "translate(100, 100) rotate(180) "),
        t.appendChild(e),
        t
    }
    ,
    r.prototype.handleEvent = n.handleEvent,
    r.prototype.onclick = function() {
        if (this.isEnabled) {
            this.parent.uiChange();
            var t = this.isPrevious ? "previous" : "next";
            this.parent[t]()
        }
    }
    ,
    r.prototype.enable = function() {
        this.isEnabled || (this.element.disabled = !1,
        this.isEnabled = !0)
    }
    ,
    r.prototype.disable = function() {
        this.isEnabled && (this.element.disabled = !0,
        this.isEnabled = !1)
    }
    ,
    r.prototype.update = function() {
        var t = this.parent.slides;
        if (this.parent.options.wrapAround && 1 < t.length)
            this.enable();
        else {
            var e = t.length ? t.length - 1 : 0
              , i = this.isPrevious ? 0 : e;
            this[this.parent.selectedIndex == i ? "disable" : "enable"]()
        }
    }
    ,
    r.prototype.destroy = function() {
        this.deactivate(),
        this.allOff()
    }
    ,
    n.extend(e.defaults, {
        prevNextButtons: !0,
        arrowShape: {
            x0: 10,
            x1: 60,
            y1: 50,
            x2: 70,
            y2: 40,
            x3: 30
        }
    }),
    e.createMethods.push("_createPrevNextButtons");
    var s = e.prototype;
    return s._createPrevNextButtons = function() {
        this.options.prevNextButtons && (this.prevButton = new r(-1,this),
        this.nextButton = new r(1,this),
        this.on("activate", this.activatePrevNextButtons))
    }
    ,
    s.activatePrevNextButtons = function() {
        this.prevButton.activate(),
        this.nextButton.activate(),
        this.on("deactivate", this.deactivatePrevNextButtons)
    }
    ,
    s.deactivatePrevNextButtons = function() {
        this.prevButton.deactivate(),
        this.nextButton.deactivate(),
        this.off("deactivate", this.deactivatePrevNextButtons)
    }
    ,
    e.PrevNextButton = r,
    e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/page-dots", ["./flickity", "unipointer/unipointer", "fizzy-ui-utils/utils"], function(i, n, o) {
        return e(t, i, n, o)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("unipointer"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.Unipointer, t.fizzyUIUtils)
}(window, function(t, e, i, n) {
    function o(t) {
        this.parent = t,
        this._create()
    }
    (o.prototype = Object.create(i.prototype))._create = function() {
        this.holder = document.createElement("ol"),
        this.holder.className = "flickity-page-dots",
        this.dots = [],
        this.handleClick = this.onClick.bind(this),
        this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
    }
    ,
    o.prototype.activate = function() {
        this.setDots(),
        this.holder.addEventListener("click", this.handleClick),
        this.bindStartEvent(this.holder),
        this.parent.element.appendChild(this.holder)
    }
    ,
    o.prototype.deactivate = function() {
        this.holder.removeEventListener("click", this.handleClick),
        this.unbindStartEvent(this.holder),
        this.parent.element.removeChild(this.holder)
    }
    ,
    o.prototype.setDots = function() {
        var t = this.parent.slides.length - this.dots.length;
        0 < t ? this.addDots(t) : t < 0 && this.removeDots(-t)
    }
    ,
    o.prototype.addDots = function(t) {
        for (var e = document.createDocumentFragment(), i = [], n = this.dots.length, o = n + t, r = n; r < o; r++) {
            var s = document.createElement("li");
            s.className = "dot",
            s.setAttribute("aria-label", "Page dot " + (r + 1)),
            e.appendChild(s),
            i.push(s)
        }
        this.holder.appendChild(e),
        this.dots = this.dots.concat(i)
    }
    ,
    o.prototype.removeDots = function(t) {
        this.dots.splice(this.dots.length - t, t).forEach(function(t) {
            this.holder.removeChild(t)
        }, this)
    }
    ,
    o.prototype.updateSelected = function() {
        this.selectedDot && (this.selectedDot.className = "dot",
        this.selectedDot.removeAttribute("aria-current")),
        this.dots.length && (this.selectedDot = this.dots[this.parent.selectedIndex],
        this.selectedDot.className = "dot is-selected",
        this.selectedDot.setAttribute("aria-current", "step"))
    }
    ,
    o.prototype.onTap = o.prototype.onClick = function(t) {
        var e = t.target;
        if ("LI" == e.nodeName) {
            this.parent.uiChange();
            var i = this.dots.indexOf(e);
            this.parent.select(i)
        }
    }
    ,
    o.prototype.destroy = function() {
        this.deactivate(),
        this.allOff()
    }
    ,
    e.PageDots = o,
    n.extend(e.defaults, {
        pageDots: !0
    }),
    e.createMethods.push("_createPageDots");
    var r = e.prototype;
    return r._createPageDots = function() {
        this.options.pageDots && (this.pageDots = new o(this),
        this.on("activate", this.activatePageDots),
        this.on("select", this.updateSelectedPageDots),
        this.on("cellChange", this.updatePageDots),
        this.on("resize", this.updatePageDots),
        this.on("deactivate", this.deactivatePageDots))
    }
    ,
    r.activatePageDots = function() {
        this.pageDots.activate()
    }
    ,
    r.updateSelectedPageDots = function() {
        this.pageDots.updateSelected()
    }
    ,
    r.updatePageDots = function() {
        this.pageDots.setDots()
    }
    ,
    r.deactivatePageDots = function() {
        this.pageDots.deactivate()
    }
    ,
    e.PageDots = o,
    e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/player", ["ev-emitter/ev-emitter", "fizzy-ui-utils/utils", "./flickity"], function(t, i, n) {
        return e(t, i, n)
    }) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("fizzy-ui-utils"), require("./flickity")) : e(t.EvEmitter, t.fizzyUIUtils, t.Flickity)
}(window, function(t, e, i) {
    function n(t) {
        this.parent = t,
        this.state = "stopped",
        this.onVisibilityChange = this.visibilityChange.bind(this),
        this.onVisibilityPlay = this.visibilityPlay.bind(this)
    }
    (n.prototype = Object.create(t.prototype)).play = function() {
        "playing" != this.state && (document.hidden ? document.addEventListener("visibilitychange", this.onVisibilityPlay) : (this.state = "playing",
        document.addEventListener("visibilitychange", this.onVisibilityChange),
        this.tick()))
    }
    ,
    n.prototype.tick = function() {
        if ("playing" == this.state) {
            var t = this.parent.options.autoPlay;
            t = "number" == typeof t ? t : 3e3;
            var e = this;
            this.clear(),
            this.timeout = setTimeout(function() {
                e.parent.next(!0),
                e.tick()
            }, t)
        }
    }
    ,
    n.prototype.stop = function() {
        this.state = "stopped",
        this.clear(),
        document.removeEventListener("visibilitychange", this.onVisibilityChange)
    }
    ,
    n.prototype.clear = function() {
        clearTimeout(this.timeout)
    }
    ,
    n.prototype.pause = function() {
        "playing" == this.state && (this.state = "paused",
        this.clear())
    }
    ,
    n.prototype.unpause = function() {
        "paused" == this.state && this.play()
    }
    ,
    n.prototype.visibilityChange = function() {
        this[document.hidden ? "pause" : "unpause"]()
    }
    ,
    n.prototype.visibilityPlay = function() {
        this.play(),
        document.removeEventListener("visibilitychange", this.onVisibilityPlay)
    }
    ,
    e.extend(i.defaults, {
        pauseAutoPlayOnHover: !0
    }),
    i.createMethods.push("_createPlayer");
    var o = i.prototype;
    return o._createPlayer = function() {
        this.player = new n(this),
        this.on("activate", this.activatePlayer),
        this.on("uiChange", this.stopPlayer),
        this.on("pointerDown", this.stopPlayer),
        this.on("deactivate", this.deactivatePlayer)
    }
    ,
    o.activatePlayer = function() {
        this.options.autoPlay && (this.player.play(),
        this.element.addEventListener("mouseenter", this))
    }
    ,
    o.playPlayer = function() {
        this.player.play()
    }
    ,
    o.stopPlayer = function() {
        this.player.stop()
    }
    ,
    o.pausePlayer = function() {
        this.player.pause()
    }
    ,
    o.unpausePlayer = function() {
        this.player.unpause()
    }
    ,
    o.deactivatePlayer = function() {
        this.player.stop(),
        this.element.removeEventListener("mouseenter", this)
    }
    ,
    o.onmouseenter = function() {
        this.options.pauseAutoPlayOnHover && (this.player.pause(),
        this.element.addEventListener("mouseleave", this))
    }
    ,
    o.onmouseleave = function() {
        this.player.unpause(),
        this.element.removeEventListener("mouseleave", this)
    }
    ,
    i.Player = n,
    i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/add-remove-cell", ["./flickity", "fizzy-ui-utils/utils"], function(i, n) {
        return e(t, i, n)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.fizzyUIUtils)
}(window, function(t, e, i) {
    var n = e.prototype;
    return n.insert = function(t, e) {
        var i = this._makeCells(t);
        if (i && i.length) {
            var n = this.cells.length;
            e = void 0 === e ? n : e;
            var o = function(t) {
                var e = document.createDocumentFragment();
                return t.forEach(function(t) {
                    e.appendChild(t.element)
                }),
                e
            }(i)
              , r = e == n;
            if (r)
                this.slider.appendChild(o);
            else {
                var s = this.cells[e].element;
                this.slider.insertBefore(o, s)
            }
            if (0 === e)
                this.cells = i.concat(this.cells);
            else if (r)
                this.cells = this.cells.concat(i);
            else {
                var a = this.cells.splice(e, n - e);
                this.cells = this.cells.concat(i).concat(a)
            }
            this._sizeCells(i),
            this.cellChange(e, !0)
        }
    }
    ,
    n.append = function(t) {
        this.insert(t, this.cells.length)
    }
    ,
    n.prepend = function(t) {
        this.insert(t, 0)
    }
    ,
    n.remove = function(t) {
        var e = this.getCells(t);
        if (e && e.length) {
            var n = this.cells.length - 1;
            e.forEach(function(t) {
                t.remove();
                var e = this.cells.indexOf(t);
                n = Math.min(e, n),
                i.removeFrom(this.cells, t)
            }, this),
            this.cellChange(n, !0)
        }
    }
    ,
    n.cellSizeChange = function(t) {
        var e = this.getCell(t);
        if (e) {
            e.getSize();
            var i = this.cells.indexOf(e);
            this.cellChange(i)
        }
    }
    ,
    n.cellChange = function(t, e) {
        var i = this.selectedElement;
        this._positionCells(t),
        this._getWrapShiftCells(),
        this.setGallerySize();
        var n = this.getCell(i);
        n && (this.selectedIndex = this.getCellSlideIndex(n)),
        this.selectedIndex = Math.min(this.slides.length - 1, this.selectedIndex),
        this.emitEvent("cellChange", [t]),
        this.select(this.selectedIndex),
        e && this.positionSliderAtSelected()
    }
    ,
    e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/lazyload", ["./flickity", "fizzy-ui-utils/utils"], function(i, n) {
        return e(t, i, n)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("./flickity"), require("fizzy-ui-utils")) : e(t, t.Flickity, t.fizzyUIUtils)
}(window, function(t, e, i) {
    "use strict";
    e.createMethods.push("_createLazyload");
    var n = e.prototype;
    function o(t, e) {
        this.img = t,
        this.flickity = e,
        this.load()
    }
    return n._createLazyload = function() {
        this.on("select", this.lazyLoad)
    }
    ,
    n.lazyLoad = function() {
        var t = this.options.lazyLoad;
        if (t) {
            var e = "number" == typeof t ? t : 0
              , n = this.getAdjacentCellElements(e)
              , r = [];
            n.forEach(function(t) {
                var e = function(t) {
                    if ("IMG" == t.nodeName) {
                        var e = t.getAttribute("data-flickity-lazyload")
                          , n = t.getAttribute("data-flickity-lazyload-src")
                          , o = t.getAttribute("data-flickity-lazyload-srcset");
                        if (e || n || o)
                            return [t]
                    }
                    var r = t.querySelectorAll("img[data-flickity-lazyload], img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]");
                    return i.makeArray(r)
                }(t);
                r = r.concat(e)
            }),
            r.forEach(function(t) {
                new o(t,this)
            }, this)
        }
    }
    ,
    o.prototype.handleEvent = i.handleEvent,
    o.prototype.load = function() {
        this.img.addEventListener("load", this),
        this.img.addEventListener("error", this);
        var t = this.img.getAttribute("data-flickity-lazyload") || this.img.getAttribute("data-flickity-lazyload-src")
          , e = this.img.getAttribute("data-flickity-lazyload-srcset");
        this.img.src = t,
        e && this.img.setAttribute("srcset", e),
        this.img.removeAttribute("data-flickity-lazyload"),
        this.img.removeAttribute("data-flickity-lazyload-src"),
        this.img.removeAttribute("data-flickity-lazyload-srcset")
    }
    ,
    o.prototype.onload = function(t) {
        this.complete(t, "flickity-lazyloaded")
    }
    ,
    o.prototype.onerror = function(t) {
        this.complete(t, "flickity-lazyerror")
    }
    ,
    o.prototype.complete = function(t, e) {
        this.img.removeEventListener("load", this),
        this.img.removeEventListener("error", this);
        var i = this.flickity.getParentCell(this.img)
          , n = i && i.element;
        this.flickity.cellSizeChange(n),
        this.img.classList.add(e),
        this.flickity.dispatchEvent("lazyLoad", t, n)
    }
    ,
    e.LazyLoader = o,
    e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity/js/index", ["./flickity", "./drag", "./prev-next-button", "./page-dots", "./player", "./add-remove-cell", "./lazyload"], e) : "object" == typeof module && module.exports && (module.exports = e(require("./flickity"), require("./drag"), require("./prev-next-button"), require("./page-dots"), require("./player"), require("./add-remove-cell"), require("./lazyload")))
}(window, function(t) {
    return t
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("flickity-as-nav-for/as-nav-for", ["flickity/js/index", "fizzy-ui-utils/utils"], e) : "object" == typeof module && module.exports ? module.exports = e(require("flickity"), require("fizzy-ui-utils")) : t.Flickity = e(t.Flickity, t.fizzyUIUtils)
}(window, function(t, e) {
    t.createMethods.push("_createAsNavFor");
    var i = t.prototype;
    return i._createAsNavFor = function() {
        this.on("activate", this.activateAsNavFor),
        this.on("deactivate", this.deactivateAsNavFor),
        this.on("destroy", this.destroyAsNavFor);
        var t = this.options.asNavFor;
        if (t) {
            var e = this;
            setTimeout(function() {
                e.setNavCompanion(t)
            })
        }
    }
    ,
    i.setNavCompanion = function(i) {
        i = e.getQueryElement(i);
        var n = t.data(i);
        if (n && n != this) {
            this.navCompanion = n;
            var o = this;
            this.onNavCompanionSelect = function() {
                o.navCompanionSelect()
            }
            ,
            n.on("select", this.onNavCompanionSelect),
            this.on("staticClick", this.onNavStaticClick),
            this.navCompanionSelect(!0)
        }
    }
    ,
    i.navCompanionSelect = function(t) {
        var e = this.navCompanion && this.navCompanion.selectedCells;
        if (e) {
            var i = e[0]
              , n = this.navCompanion.cells.indexOf(i)
              , o = n + e.length - 1
              , r = Math.floor(function(t, e, i) {
                return (e - t) * i + t
            }(n, o, this.navCompanion.cellAlign));
            if (this.selectCell(r, !1, t),
            this.removeNavSelectedElements(),
            !(r >= this.cells.length)) {
                var s = this.cells.slice(n, 1 + o);
                this.navSelectedElements = s.map(function(t) {
                    return t.element
                }),
                this.changeNavSelectedClass("add")
            }
        }
    }
    ,
    i.changeNavSelectedClass = function(t) {
        this.navSelectedElements.forEach(function(e) {
            e.classList[t]("is-nav-selected")
        })
    }
    ,
    i.activateAsNavFor = function() {
        this.navCompanionSelect(!0)
    }
    ,
    i.removeNavSelectedElements = function() {
        this.navSelectedElements && (this.changeNavSelectedClass("remove"),
        delete this.navSelectedElements)
    }
    ,
    i.onNavStaticClick = function(t, e, i, n) {
        "number" == typeof n && this.navCompanion.selectCell(n)
    }
    ,
    i.deactivateAsNavFor = function() {
        this.removeNavSelectedElements()
    }
    ,
    i.destroyAsNavFor = function() {
        this.navCompanion && (this.navCompanion.off("select", this.onNavCompanionSelect),
        this.off("staticClick", this.onNavStaticClick),
        delete this.navCompanion)
    }
    ,
    t
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("imagesloaded/imagesloaded", ["ev-emitter/ev-emitter"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter)
}("undefined" != typeof window ? window : this, function(t, e) {
    var i = t.jQuery
      , n = t.console;
    function o(t, e) {
        for (var i in e)
            t[i] = e[i];
        return t
    }
    var r = Array.prototype.slice;
    function s(t, e, a) {
        if (!(this instanceof s))
            return new s(t,e,a);
        var l = t;
        "string" == typeof t && (l = document.querySelectorAll(t)),
        l ? (this.elements = function(t) {
            return Array.isArray(t) ? t : "object" == typeof t && "number" == typeof t.length ? r.call(t) : [t]
        }(l),
        this.options = o({}, this.options),
        "function" == typeof e ? a = e : o(this.options, e),
        a && this.on("always", a),
        this.getImages(),
        i && (this.jqDeferred = new i.Deferred),
        setTimeout(this.check.bind(this))) : n.error("Bad element for imagesLoaded " + (l || t))
    }
    (s.prototype = Object.create(e.prototype)).options = {},
    s.prototype.getImages = function() {
        this.images = [],
        this.elements.forEach(this.addElementImages, this)
    }
    ,
    s.prototype.addElementImages = function(t) {
        "IMG" == t.nodeName && this.addImage(t),
        !0 === this.options.background && this.addElementBackgroundImages(t);
        var e = t.nodeType;
        if (e && a[e]) {
            for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
                var o = i[n];
                this.addImage(o)
            }
            if ("string" == typeof this.options.background) {
                var r = t.querySelectorAll(this.options.background);
                for (n = 0; n < r.length; n++) {
                    var s = r[n];
                    this.addElementBackgroundImages(s)
                }
            }
        }
    }
    ;
    var a = {
        1: !0,
        9: !0,
        11: !0
    };
    function l(t) {
        this.img = t
    }
    function c(t, e) {
        this.url = t,
        this.element = e,
        this.img = new Image
    }
    return s.prototype.addElementBackgroundImages = function(t) {
        var e = getComputedStyle(t);
        if (e)
            for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n; ) {
                var o = n && n[2];
                o && this.addBackground(o, t),
                n = i.exec(e.backgroundImage)
            }
    }
    ,
    s.prototype.addImage = function(t) {
        var e = new l(t);
        this.images.push(e)
    }
    ,
    s.prototype.addBackground = function(t, e) {
        var i = new c(t,e);
        this.images.push(i)
    }
    ,
    s.prototype.check = function() {
        var t = this;
        function e(e, i, n) {
            setTimeout(function() {
                t.progress(e, i, n)
            })
        }
        this.progressedCount = 0,
        this.hasAnyBroken = !1,
        this.images.length ? this.images.forEach(function(t) {
            t.once("progress", e),
            t.check()
        }) : this.complete()
    }
    ,
    s.prototype.progress = function(t, e, i) {
        this.progressedCount++,
        this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded,
        this.emitEvent("progress", [this, t, e]),
        this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t),
        this.progressedCount == this.images.length && this.complete(),
        this.options.debug && n && n.log("progress: " + i, t, e)
    }
    ,
    s.prototype.complete = function() {
        var t = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0,
        this.emitEvent(t, [this]),
        this.emitEvent("always", [this]),
        this.jqDeferred) {
            var e = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[e](this)
        }
    }
    ,
    (l.prototype = Object.create(e.prototype)).check = function() {
        this.getIsImageComplete() ? this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image,
        this.proxyImage.addEventListener("load", this),
        this.proxyImage.addEventListener("error", this),
        this.img.addEventListener("load", this),
        this.img.addEventListener("error", this),
        this.proxyImage.src = this.img.src)
    }
    ,
    l.prototype.getIsImageComplete = function() {
        return this.img.complete && this.img.naturalWidth
    }
    ,
    l.prototype.confirm = function(t, e) {
        this.isLoaded = t,
        this.emitEvent("progress", [this, this.img, e])
    }
    ,
    l.prototype.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }
    ,
    l.prototype.onload = function() {
        this.confirm(!0, "onload"),
        this.unbindEvents()
    }
    ,
    l.prototype.onerror = function() {
        this.confirm(!1, "onerror"),
        this.unbindEvents()
    }
    ,
    l.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this),
        this.proxyImage.removeEventListener("error", this),
        this.img.removeEventListener("load", this),
        this.img.removeEventListener("error", this)
    }
    ,
    (c.prototype = Object.create(l.prototype)).check = function() {
        this.img.addEventListener("load", this),
        this.img.addEventListener("error", this),
        this.img.src = this.url,
        this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
        this.unbindEvents())
    }
    ,
    c.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this),
        this.img.removeEventListener("error", this)
    }
    ,
    c.prototype.confirm = function(t, e) {
        this.isLoaded = t,
        this.emitEvent("progress", [this, this.element, e])
    }
    ,
    s.makeJQueryPlugin = function(e) {
        (e = e || t.jQuery) && ((i = e).fn.imagesLoaded = function(t, e) {
            return new s(this,t,e).jqDeferred.promise(i(this))
        }
        )
    }
    ,
    s.makeJQueryPlugin(),
    s
}),
function(t, e) {
    "function" == typeof define && define.amd ? define(["flickity/js/index", "imagesloaded/imagesloaded"], function(i, n) {
        return e(t, i, n)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("flickity"), require("imagesloaded")) : t.Flickity = e(t, t.Flickity, t.imagesLoaded)
}(window, function(t, e, i) {
    "use strict";
    e.createMethods.push("_createImagesLoaded");
    var n = e.prototype;
    return n._createImagesLoaded = function() {
        this.on("activate", this.imagesLoaded)
    }
    ,
    n.imagesLoaded = function() {
        if (this.options.imagesLoaded) {
            var t = this;
            i(this.slider).on("progress", function(e, i) {
                var n = t.getParentCell(i.img);
                t.cellSizeChange(n && n.element),
                t.options.freeScroll || t.positionSliderAtSelected()
            })
        }
    }
    ,
    e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define(["flickity/js/index", "fizzy-ui-utils/utils"], e) : "object" == typeof module && module.exports ? module.exports = e(require("flickity"), require("fizzy-ui-utils")) : e(t.Flickity, t.fizzyUIUtils)
}(this, function(t, e) {
    var i = t.Slide
      , n = i.prototype.updateTarget;
    i.prototype.updateTarget = function() {
        if (n.apply(this, arguments),
        this.parent.options.fade) {
            var t = this.target - this.x
              , e = this.cells[0].x;
            this.cells.forEach(function(i) {
                var n = i.x - e - t;
                i.renderPosition(n)
            })
        }
    }
    ,
    i.prototype.setOpacity = function(t) {
        this.cells.forEach(function(e) {
            e.element.style.opacity = t
        })
    }
    ;
    var o = t.prototype;
    t.createMethods.push("_createFade"),
    o._createFade = function() {
        this.fadeIndex = this.selectedIndex,
        this.prevSelectedIndex = this.selectedIndex,
        this.on("select", this.onSelectFade),
        this.on("dragEnd", this.onDragEndFade),
        this.on("settle", this.onSettleFade),
        this.on("activate", this.onActivateFade),
        this.on("deactivate", this.onDeactivateFade)
    }
    ;
    var r = o.updateSlides;
    o.updateSlides = function() {
        r.apply(this, arguments),
        this.options.fade && this.slides.forEach(function(t, e) {
            var i = e == this.selectedIndex ? 1 : 0;
            t.setOpacity(i)
        }, this)
    }
    ,
    o.onSelectFade = function() {
        this.fadeIndex = Math.min(this.prevSelectedIndex, this.slides.length - 1),
        this.prevSelectedIndex = this.selectedIndex
    }
    ,
    o.onSettleFade = function() {
        delete this.didDragEnd,
        this.options.fade && (this.selectedSlide.setOpacity(1),
        this.slides[this.fadeIndex] && this.fadeIndex != this.selectedIndex && this.slides[this.fadeIndex].setOpacity(0))
    }
    ,
    o.onDragEndFade = function() {
        this.didDragEnd = !0
    }
    ,
    o.onActivateFade = function() {
        this.options.fade && this.element.classList.add("is-fade")
    }
    ,
    o.onDeactivateFade = function() {
        this.options.fade && (this.element.classList.remove("is-fade"),
        this.slides.forEach(function(t) {
            t.setOpacity("")
        }))
    }
    ;
    var s = o.positionSlider;
    o.positionSlider = function() {
        this.options.fade ? (this.fadeSlides(),
        this.dispatchScrollEvent()) : s.apply(this, arguments)
    }
    ;
    var a = o.positionSliderAtSelected;
    o.positionSliderAtSelected = function() {
        this.options.fade && this.setTranslateX(0),
        a.apply(this, arguments)
    }
    ,
    o.fadeSlides = function() {
        if (!(this.slides.length < 2)) {
            var t = this.getFadeIndexes()
              , e = this.slides[t.a]
              , i = this.slides[t.b]
              , n = this.wrapDifference(e.target, i.target)
              , o = this.wrapDifference(e.target, -this.x);
            o /= n,
            e.setOpacity(1 - o),
            i.setOpacity(o);
            var r = t.a;
            this.isDragging && (r = o > .5 ? t.a : t.b),
            null != this.fadeHideIndex && this.fadeHideIndex != r && this.fadeHideIndex != t.a && this.fadeHideIndex != t.b && this.slides[this.fadeHideIndex].setOpacity(0),
            this.fadeHideIndex = r
        }
    }
    ,
    o.getFadeIndexes = function() {
        return this.isDragging || this.didDragEnd ? this.options.wrapAround ? this.getFadeDragWrapIndexes() : this.getFadeDragLimitIndexes() : {
            a: this.fadeIndex,
            b: this.selectedIndex
        }
    }
    ,
    o.getFadeDragWrapIndexes = function() {
        var t = this.slides.map(function(t, e) {
            return this.getSlideDistance(-this.x, e)
        }, this)
          , i = t.map(function(t) {
            return Math.abs(t)
        })
          , n = Math.min.apply(Math, i)
          , o = i.indexOf(n)
          , r = t[o]
          , s = this.slides.length
          , a = r >= 0 ? 1 : -1;
        return {
            a: o,
            b: e.modulo(o + a, s)
        }
    }
    ,
    o.getFadeDragLimitIndexes = function() {
        for (var t = 0, e = 0; e < this.slides.length - 1; e++) {
            var i = this.slides[e];
            if (-this.x < i.target)
                break;
            t = e
        }
        return {
            a: t,
            b: t + 1
        }
    }
    ,
    o.wrapDifference = function(t, e) {
        var i = e - t;
        if (!this.options.wrapAround)
            return i;
        var n = i + this.slideableWidth
          , o = i - this.slideableWidth;
        return Math.abs(n) < Math.abs(i) && (i = n),
        Math.abs(o) < Math.abs(i) && (i = o),
        i
    }
    ;
    var l = o._getWrapShiftCells;
    o._getWrapShiftCells = function() {
        this.options.fade || l.apply(this, arguments)
    }
    ;
    var c = o.shiftWrapCells;
    return o.shiftWrapCells = function() {
        this.options.fade || c.apply(this, arguments)
    }
    ,
    t
}),
function(t, e) {
    "function" == typeof define && define.amd ? define(["flickity/js/index", "fizzy-ui-utils/utils"], e) : "object" == typeof module && module.exports ? module.exports = e(require("flickity"), require("fizzy-ui-utils")) : t.Flickity = e(t.Flickity, t.fizzyUIUtils)
}(window, function(t, e) {
    "use strict";
    t.createMethods.push("_createAsNavFor");
    var i = t.prototype;
    return i._createAsNavFor = function() {
        this.on("activate", this.activateAsNavFor),
        this.on("deactivate", this.deactivateAsNavFor),
        this.on("destroy", this.destroyAsNavFor);
        var t = this.options.asNavFor;
        if (t) {
            var e = this;
            setTimeout(function() {
                e.setNavCompanion(t)
            })
        }
    }
    ,
    i.setNavCompanion = function(i) {
        i = e.getQueryElement(i);
        var n = t.data(i);
        if (n && n != this) {
            this.navCompanion = n;
            var o = this;
            this.onNavCompanionSelect = function() {
                o.navCompanionSelect()
            }
            ,
            n.on("select", this.onNavCompanionSelect),
            this.on("staticClick", this.onNavStaticClick),
            this.navCompanionSelect(!0)
        }
    }
    ,
    i.navCompanionSelect = function(t) {
        var e = this.navCompanion && this.navCompanion.selectedCells;
        if (e) {
            var i, n = e[0], o = this.navCompanion.cells.indexOf(n), r = o + e.length - 1, s = Math.floor((r - (i = o)) * this.navCompanion.cellAlign + i);
            if (this.selectCell(s, !1, t),
            this.removeNavSelectedElements(),
            !(s >= this.cells.length)) {
                var a = this.cells.slice(o, r + 1);
                this.navSelectedElements = a.map(function(t) {
                    return t.element
                }),
                this.changeNavSelectedClass("add")
            }
        }
    }
    ,
    i.changeNavSelectedClass = function(t) {
        this.navSelectedElements.forEach(function(e) {
            e.classList[t]("is-nav-selected")
        })
    }
    ,
    i.activateAsNavFor = function() {
        this.navCompanionSelect(!0)
    }
    ,
    i.removeNavSelectedElements = function() {
        this.navSelectedElements && (this.changeNavSelectedClass("remove"),
        delete this.navSelectedElements)
    }
    ,
    i.onNavStaticClick = function(t, e, i, n) {
        "number" == typeof n && this.navCompanion.selectCell(n)
    }
    ,
    i.deactivateAsNavFor = function() {
        this.removeNavSelectedElements()
    }
    ,
    i.destroyAsNavFor = function() {
        this.navCompanion && (this.navCompanion.off("select", this.onNavCompanionSelect),
        this.off("staticClick", this.onNavStaticClick),
        delete this.navCompanion)
    }
    ,
    t
}),
function(t, e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e(t.jQuery)
}(this, function(t) {
    "use strict";
    function e(e, o) {
        this.element = e,
        this.$element = t(this.element),
        this.options = t.extend({}, n, o),
        this._defaults = n,
        this._name = i,
        this.init()
    }
    var i = "scrolly"
      , n = {
        bgParallax: !1
    };
    e.prototype.init = function() {
        var e = this;
        this.startPosition = this.$element.position().top,
        this.offsetTop = this.$element.offset().top,
        this.height = this.$element.outerHeight(!0),
        this.velocity = this.$element.attr("data-velocity"),
        this.bgStart = parseInt(this.$element.attr("data-fit"), 10),
        t(document).scroll(function() {
            e.didScroll = !0
        }),
        setInterval(function() {
            e.didScroll && (e.didScroll = !1,
            e.scrolly())
        }, 10)
    }
    ,
    e.prototype.scrolly = function() {
        var e = t(window).scrollTop()
          , i = t(window).height()
          , n = this.startPosition;
        this.offsetTop >= e + i ? this.$element.addClass("scrolly-invisible") : n = this.$element.hasClass("scrolly-invisible") ? this.startPosition + (e + (i - this.offsetTop)) * this.velocity : this.startPosition + e * this.velocity,
        this.bgStart && (n += this.bgStart),
        !0 === this.options.bgParallax ? this.$element.css({
            backgroundPositionY: n + "px"
        }) : this.$element.css({
            top: n
        })
    }
    ,
    t.fn[i] = function(n) {
        return this.each(function() {
            t.data(this, "plugin_" + i) || t.data(this, "plugin_" + i, new e(this,n))
        })
    }
}),
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function(t) {
    var e, i, n, o, r, s, a = "Close", l = "BeforeClose", c = "MarkupParse", u = "Open", d = "Change", h = "mfp", f = "." + h, p = "mfp-ready", m = "mfp-removing", g = "mfp-prevent-close", v = function() {}, y = !!window.jQuery, w = t(window), b = function(t, i) {
        e.ev.on(h + t + f, i)
    }, x = function(e, i, n, o) {
        var r = document.createElement("div");
        return r.className = "mfp-" + e,
        n && (r.innerHTML = n),
        o ? i && i.appendChild(r) : (r = t(r),
        i && r.appendTo(i)),
        r
    }, S = function(i, n) {
        e.ev.triggerHandler(h + i, n),
        e.st.callbacks && (i = i.charAt(0).toLowerCase() + i.slice(1),
        e.st.callbacks[i] && e.st.callbacks[i].apply(e, t.isArray(n) ? n : [n]))
    }, C = function(i) {
        return i === s && e.currTemplate.closeBtn || (e.currTemplate.closeBtn = t(e.st.closeMarkup.replace("%title%", e.st.tClose)),
        s = i),
        e.currTemplate.closeBtn
    }, I = function() {
        t.magnificPopup.instance || ((e = new v).init(),
        t.magnificPopup.instance = e)
    };
    v.prototype = {
        constructor: v,
        init: function() {
            var i = navigator.appVersion;
            e.isLowIE = e.isIE8 = document.all && !document.addEventListener,
            e.isAndroid = /android/gi.test(i),
            e.isIOS = /iphone|ipad|ipod/gi.test(i),
            e.supportsTransition = function() {
                var t = document.createElement("p").style
                  , e = ["ms", "O", "Moz", "Webkit"];
                if (void 0 !== t.transition)
                    return !0;
                for (; e.length; )
                    if (e.pop() + "Transition"in t)
                        return !0;
                return !1
            }(),
            e.probablyMobile = e.isAndroid || e.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),
            n = t(document),
            e.popupsCache = {}
        },
        open: function(i) {
            var o;
            if (!1 === i.isObj) {
                e.items = i.items.toArray(),
                e.index = 0;
                var s, a = i.items;
                for (o = 0; o < a.length; o++)
                    if ((s = a[o]).parsed && (s = s.el[0]),
                    s === i.el[0]) {
                        e.index = o;
                        break
                    }
            } else
                e.items = t.isArray(i.items) ? i.items : [i.items],
                e.index = i.index || 0;
            if (!e.isOpen) {
                e.types = [],
                r = "",
                i.mainEl && i.mainEl.length ? e.ev = i.mainEl.eq(0) : e.ev = n,
                i.key ? (e.popupsCache[i.key] || (e.popupsCache[i.key] = {}),
                e.currTemplate = e.popupsCache[i.key]) : e.currTemplate = {},
                e.st = t.extend(!0, {}, t.magnificPopup.defaults, i),
                e.fixedContentPos = "auto" === e.st.fixedContentPos ? !e.probablyMobile : e.st.fixedContentPos,
                e.st.modal && (e.st.closeOnContentClick = !1,
                e.st.closeOnBgClick = !1,
                e.st.showCloseBtn = !1,
                e.st.enableEscapeKey = !1),
                e.bgOverlay || (e.bgOverlay = x("bg").on("click" + f, function() {
                    e.close()
                }),
                e.wrap = x("wrap").attr("tabindex", -1).on("click" + f, function(t) {
                    e._checkIfClose(t.target) && e.close()
                }),
                e.container = x("container", e.wrap)),
                e.contentContainer = x("content"),
                e.st.preloader && (e.preloader = x("preloader", e.container, e.st.tLoading));
                var l = t.magnificPopup.modules;
                for (o = 0; o < l.length; o++) {
                    var d = l[o];
                    d = d.charAt(0).toUpperCase() + d.slice(1),
                    e["init" + d].call(e)
                }
                S("BeforeOpen"),
                e.st.showCloseBtn && (e.st.closeBtnInside ? (b(c, function(t, e, i, n) {
                    i.close_replaceWith = C(n.type)
                }),
                r += " mfp-close-btn-in") : e.wrap.append(C())),
                e.st.alignTop && (r += " mfp-align-top"),
                e.fixedContentPos ? e.wrap.css({
                    overflow: e.st.overflowY,
                    overflowX: "hidden",
                    overflowY: e.st.overflowY
                }) : e.wrap.css({
                    top: w.scrollTop(),
                    position: "absolute"
                }),
                (!1 === e.st.fixedBgPos || "auto" === e.st.fixedBgPos && !e.fixedContentPos) && e.bgOverlay.css({
                    height: n.height(),
                    position: "absolute"
                }),
                e.st.enableEscapeKey && n.on("keyup" + f, function(t) {
                    27 === t.keyCode && e.close()
                }),
                w.on("resize" + f, function() {
                    e.updateSize()
                }),
                e.st.closeOnContentClick || (r += " mfp-auto-cursor"),
                r && e.wrap.addClass(r);
                var h = e.wH = w.height()
                  , m = {};
                if (e.fixedContentPos && e._hasScrollBar(h)) {
                    var g = e._getScrollbarSize();
                    g && (m.marginRight = g)
                }
                e.fixedContentPos && (e.isIE7 ? t("body, html").css("overflow", "hidden") : m.overflow = "hidden");
                var v = e.st.mainClass;
                return e.isIE7 && (v += " mfp-ie7"),
                v && e._addClassToMFP(v),
                e.updateItemHTML(),
                S("BuildControls"),
                t("html").css(m),
                e.bgOverlay.add(e.wrap).prependTo(e.st.prependTo || t(document.body)),
                e._lastFocusedEl = document.activeElement,
                setTimeout(function() {
                    e.content ? (e._addClassToMFP(p),
                    e._setFocus()) : e.bgOverlay.addClass(p),
                    n.on("focusin" + f, e._onFocusIn)
                }, 16),
                e.isOpen = !0,
                e.updateSize(h),
                S(u),
                i
            }
            e.updateItemHTML()
        },
        close: function() {
            e.isOpen && (S(l),
            e.isOpen = !1,
            e.st.removalDelay && !e.isLowIE && e.supportsTransition ? (e._addClassToMFP(m),
            setTimeout(function() {
                e._close()
            }, e.st.removalDelay)) : e._close())
        },
        _close: function() {
            S(a);
            var i = m + " " + p + " ";
            if (e.bgOverlay.detach(),
            e.wrap.detach(),
            e.container.empty(),
            e.st.mainClass && (i += e.st.mainClass + " "),
            e._removeClassFromMFP(i),
            e.fixedContentPos) {
                var o = {
                    marginRight: ""
                };
                e.isIE7 ? t("body, html").css("overflow", "") : o.overflow = "",
                t("html").css(o)
            }
            n.off("keyup.mfp focusin" + f),
            e.ev.off(f),
            e.wrap.attr("class", "mfp-wrap").removeAttr("style"),
            e.bgOverlay.attr("class", "mfp-bg"),
            e.container.attr("class", "mfp-container"),
            !e.st.showCloseBtn || e.st.closeBtnInside && !0 !== e.currTemplate[e.currItem.type] || e.currTemplate.closeBtn && e.currTemplate.closeBtn.detach(),
            e.st.autoFocusLast && e._lastFocusedEl && t(e._lastFocusedEl).focus(),
            e.currItem = null,
            e.content = null,
            e.currTemplate = null,
            e.prevHeight = 0,
            S("AfterClose")
        },
        updateSize: function(t) {
            if (e.isIOS) {
                var i = document.documentElement.clientWidth / window.innerWidth
                  , n = window.innerHeight * i;
                e.wrap.css("height", n),
                e.wH = n
            } else
                e.wH = t || w.height();
            e.fixedContentPos || e.wrap.css("height", e.wH),
            S("Resize")
        },
        updateItemHTML: function() {
            var i = e.items[e.index];
            e.contentContainer.detach(),
            e.content && e.content.detach(),
            i.parsed || (i = e.parseEl(e.index));
            var n = i.type;
            if (S("BeforeChange", [e.currItem ? e.currItem.type : "", n]),
            e.currItem = i,
            !e.currTemplate[n]) {
                var r = !!e.st[n] && e.st[n].markup;
                S("FirstMarkupParse", r),
                e.currTemplate[n] = !r || t(r)
            }
            o && o !== i.type && e.container.removeClass("mfp-" + o + "-holder");
            var s = e["get" + n.charAt(0).toUpperCase() + n.slice(1)](i, e.currTemplate[n]);
            e.appendContent(s, n),
            i.preloaded = !0,
            S(d, i),
            o = i.type,
            e.container.prepend(e.contentContainer),
            S("AfterChange")
        },
        appendContent: function(t, i) {
            e.content = t,
            t ? e.st.showCloseBtn && e.st.closeBtnInside && !0 === e.currTemplate[i] ? e.content.find(".mfp-close").length || e.content.append(C()) : e.content = t : e.content = "",
            S("BeforeAppend"),
            e.container.addClass("mfp-" + i + "-holder"),
            e.contentContainer.append(e.content)
        },
        parseEl: function(i) {
            var n, o = e.items[i];
            if (o.tagName ? o = {
                el: t(o)
            } : (n = o.type,
            o = {
                data: o,
                src: o.src
            }),
            o.el) {
                for (var r = e.types, s = 0; s < r.length; s++)
                    if (o.el.hasClass("mfp-" + r[s])) {
                        n = r[s];
                        break
                    }
                o.src = o.el.attr("data-mfp-src"),
                o.src || (o.src = o.el.attr("href"))
            }
            return o.type = n || e.st.type || "inline",
            o.index = i,
            o.parsed = !0,
            e.items[i] = o,
            S("ElementParse", o),
            e.items[i]
        },
        addGroup: function(t, i) {
            var n = function(n) {
                n.mfpEl = this,
                e._openClick(n, t, i)
            };
            i || (i = {});
            var o = "click.magnificPopup";
            i.mainEl = t,
            i.items ? (i.isObj = !0,
            t.off(o).on(o, n)) : (i.isObj = !1,
            i.delegate ? t.off(o).on(o, i.delegate, n) : (i.items = t,
            t.off(o).on(o, n)))
        },
        _openClick: function(i, n, o) {
            if ((void 0 !== o.midClick ? o.midClick : t.magnificPopup.defaults.midClick) || !(2 === i.which || i.ctrlKey || i.metaKey || i.altKey || i.shiftKey)) {
                var r = void 0 !== o.disableOn ? o.disableOn : t.magnificPopup.defaults.disableOn;
                if (r)
                    if (t.isFunction(r)) {
                        if (!r.call(e))
                            return !0
                    } else if (w.width() < r)
                        return !0;
                i.type && (i.preventDefault(),
                e.isOpen && i.stopPropagation()),
                o.el = t(i.mfpEl),
                o.delegate && (o.items = n.find(o.delegate)),
                e.open(o)
            }
        },
        updateStatus: function(t, n) {
            if (e.preloader) {
                i !== t && e.container.removeClass("mfp-s-" + i),
                n || "loading" !== t || (n = e.st.tLoading);
                var o = {
                    status: t,
                    text: n
                };
                S("UpdateStatus", o),
                t = o.status,
                n = o.text,
                e.preloader.html(n),
                e.preloader.find("a").on("click", function(t) {
                    t.stopImmediatePropagation()
                }),
                e.container.addClass("mfp-s-" + t),
                i = t
            }
        },
        _checkIfClose: function(i) {
            if (!t(i).hasClass(g)) {
                var n = e.st.closeOnContentClick
                  , o = e.st.closeOnBgClick;
                if (n && o)
                    return !0;
                if (!e.content || t(i).hasClass("mfp-close") || e.preloader && i === e.preloader[0])
                    return !0;
                if (i === e.content[0] || t.contains(e.content[0], i)) {
                    if (n)
                        return !0
                } else if (o && t.contains(document, i))
                    return !0;
                return !1
            }
        },
        _addClassToMFP: function(t) {
            e.bgOverlay.addClass(t),
            e.wrap.addClass(t)
        },
        _removeClassFromMFP: function(t) {
            this.bgOverlay.removeClass(t),
            e.wrap.removeClass(t)
        },
        _hasScrollBar: function(t) {
            return (e.isIE7 ? n.height() : document.body.scrollHeight) > (t || w.height())
        },
        _setFocus: function() {
            (e.st.focus ? e.content.find(e.st.focus).eq(0) : e.wrap).focus()
        },
        _onFocusIn: function(i) {
            return i.target === e.wrap[0] || t.contains(e.wrap[0], i.target) ? void 0 : (e._setFocus(),
            !1)
        },
        _parseMarkup: function(e, i, n) {
            var o;
            n.data && (i = t.extend(n.data, i)),
            S(c, [e, i, n]),
            t.each(i, function(i, n) {
                if (void 0 === n || !1 === n)
                    return !0;
                if ((o = i.split("_")).length > 1) {
                    var r = e.find(f + "-" + o[0]);
                    if (r.length > 0) {
                        var s = o[1];
                        "replaceWith" === s ? r[0] !== n[0] && r.replaceWith(n) : "img" === s ? r.is("img") ? r.attr("src", n) : r.replaceWith(t("<img>").attr("src", n).attr("class", r.attr("class"))) : r.attr(o[1], n)
                    }
                } else
                    e.find(f + "-" + i).html(n)
            })
        },
        _getScrollbarSize: function() {
            if (void 0 === e.scrollbarSize) {
                var t = document.createElement("div");
                t.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",
                document.body.appendChild(t),
                e.scrollbarSize = t.offsetWidth - t.clientWidth,
                document.body.removeChild(t)
            }
            return e.scrollbarSize
        }
    },
    t.magnificPopup = {
        instance: null,
        proto: v.prototype,
        modules: [],
        open: function(e, i) {
            return I(),
            (e = e ? t.extend(!0, {}, e) : {}).isObj = !0,
            e.index = i || 0,
            this.instance.open(e)
        },
        close: function() {
            return t.magnificPopup.instance && t.magnificPopup.instance.close()
        },
        registerModule: function(e, i) {
            i.options && (t.magnificPopup.defaults[e] = i.options),
            t.extend(this.proto, i.proto),
            this.modules.push(e)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    },
    t.fn.magnificPopup = function(i) {
        I();
        var n = t(this);
        if ("string" == typeof i)
            if ("open" === i) {
                var o, r = y ? n.data("magnificPopup") : n[0].magnificPopup, s = parseInt(arguments[1], 10) || 0;
                r.items ? o = r.items[s] : (o = n,
                r.delegate && (o = o.find(r.delegate)),
                o = o.eq(s)),
                e._openClick({
                    mfpEl: o
                }, n, r)
            } else
                e.isOpen && e[i].apply(e, Array.prototype.slice.call(arguments, 1));
        else
            i = t.extend(!0, {}, i),
            y ? n.data("magnificPopup", i) : n[0].magnificPopup = i,
            e.addGroup(n, i);
        return n
    }
    ;
    var _, T, E, L = "inline", M = function() {
        E && (T.after(E.addClass(_)).detach(),
        E = null)
    };
    t.magnificPopup.registerModule(L, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                e.types.push(L),
                b(a + "." + L, function() {
                    M()
                })
            },
            getInline: function(i, n) {
                if (M(),
                i.src) {
                    var o = e.st.inline
                      , r = t(i.src);
                    if (r.length) {
                        var s = r[0].parentNode;
                        s && s.tagName && (T || (_ = o.hiddenClass,
                        T = x(_),
                        _ = "mfp-" + _),
                        E = r.after(T).detach().removeClass(_)),
                        e.updateStatus("ready")
                    } else
                        e.updateStatus("error", o.tNotFound),
                        r = t("<div>");
                    return i.inlineElement = r,
                    r
                }
                return e.updateStatus("ready"),
                e._parseMarkup(n, {}, i),
                n
            }
        }
    });
    var N, D, k, j = "ajax", A = function() {
        N && t(document.body).removeClass(N)
    }, O = function() {
        A(),
        e.req && e.req.abort()
    };
    t.magnificPopup.registerModule(j, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                e.types.push(j),
                N = e.st.ajax.cursor,
                b(a + "." + j, O),
                b("BeforeChange." + j, O)
            },
            getAjax: function(i) {
                N && t(document.body).addClass(N),
                e.updateStatus("loading");
                var n = t.extend({
                    url: i.src,
                    success: function(n, o, r) {
                        var s = {
                            data: n,
                            xhr: r
                        };
                        S("ParseAjax", s),
                        e.appendContent(t(s.data), j),
                        i.finished = !0,
                        A(),
                        e._setFocus(),
                        setTimeout(function() {
                            e.wrap.addClass(p)
                        }, 16),
                        e.updateStatus("ready"),
                        S("AjaxContentAdded")
                    },
                    error: function() {
                        A(),
                        i.finished = i.loadError = !0,
                        e.updateStatus("error", e.st.ajax.tError.replace("%url%", i.src))
                    }
                }, e.st.ajax.settings);
                return e.req = t.ajax(n),
                ""
            }
        }
    }),
    t.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var i = e.st.image
                  , n = ".image";
                e.types.push("image"),
                b(u + n, function() {
                    "image" === e.currItem.type && i.cursor && t(document.body).addClass(i.cursor)
                }),
                b(a + n, function() {
                    i.cursor && t(document.body).removeClass(i.cursor),
                    w.off("resize" + f)
                }),
                b("Resize" + n, e.resizeImage),
                e.isLowIE && b("AfterChange", e.resizeImage)
            },
            resizeImage: function() {
                var t = e.currItem;
                if (t && t.img && e.st.image.verticalFit) {
                    var i = 0;
                    e.isLowIE && (i = parseInt(t.img.css("padding-top"), 10) + parseInt(t.img.css("padding-bottom"), 10)),
                    t.img.css("max-height", e.wH - i)
                }
            },
            _onImageHasSize: function(t) {
                t.img && (t.hasSize = !0,
                D && clearInterval(D),
                t.isCheckingImgSize = !1,
                S("ImageHasSize", t),
                t.imgHidden && (e.content && e.content.removeClass("mfp-loading"),
                t.imgHidden = !1))
            },
            findImageSize: function(t) {
                var i = 0
                  , n = t.img[0]
                  , o = function(r) {
                    D && clearInterval(D),
                    D = setInterval(function() {
                        return n.naturalWidth > 0 ? void e._onImageHasSize(t) : (i > 200 && clearInterval(D),
                        void (3 == ++i ? o(10) : 40 === i ? o(50) : 100 === i && o(500)))
                    }, r)
                };
                o(1)
            },
            getImage: function(i, n) {
                var o = 0
                  , r = function() {
                    i && (i.img[0].complete ? (i.img.off(".mfploader"),
                    i === e.currItem && (e._onImageHasSize(i),
                    e.updateStatus("ready")),
                    i.hasSize = !0,
                    i.loaded = !0,
                    S("ImageLoadComplete")) : 200 > ++o ? setTimeout(r, 100) : s())
                }
                  , s = function() {
                    i && (i.img.off(".mfploader"),
                    i === e.currItem && (e._onImageHasSize(i),
                    e.updateStatus("error", a.tError.replace("%url%", i.src))),
                    i.hasSize = !0,
                    i.loaded = !0,
                    i.loadError = !0)
                }
                  , a = e.st.image
                  , l = n.find(".mfp-img");
                if (l.length) {
                    var c = document.createElement("img");
                    c.className = "mfp-img",
                    i.el && i.el.find("img").length && (c.alt = i.el.find("img").attr("alt")),
                    i.img = t(c).on("load.mfploader", r).on("error.mfploader", s),
                    c.src = i.src,
                    l.is("img") && (i.img = i.img.clone()),
                    (c = i.img[0]).naturalWidth > 0 ? i.hasSize = !0 : c.width || (i.hasSize = !1)
                }
                return e._parseMarkup(n, {
                    title: function(i) {
                        if (i.data && void 0 !== i.data.title)
                            return i.data.title;
                        var n = e.st.image.titleSrc;
                        if (n) {
                            if (t.isFunction(n))
                                return n.call(e, i);
                            if (i.el)
                                return i.el.attr(n) || ""
                        }
                        return ""
                    }(i),
                    img_replaceWith: i.img
                }, i),
                e.resizeImage(),
                i.hasSize ? (D && clearInterval(D),
                i.loadError ? (n.addClass("mfp-loading"),
                e.updateStatus("error", a.tError.replace("%url%", i.src))) : (n.removeClass("mfp-loading"),
                e.updateStatus("ready")),
                n) : (e.updateStatus("loading"),
                i.loading = !0,
                i.hasSize || (i.imgHidden = !0,
                n.addClass("mfp-loading"),
                e.findImageSize(i)),
                n)
            }
        }
    }),
    t.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(t) {
                return t.is("img") ? t : t.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var t, i = e.st.zoom, n = ".zoom";
                if (i.enabled && e.supportsTransition) {
                    var o, r, s = i.duration, c = function(t) {
                        var e = t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image")
                          , n = "all " + i.duration / 1e3 + "s " + i.easing
                          , o = {
                            position: "fixed",
                            zIndex: 9999,
                            left: 0,
                            top: 0,
                            "-webkit-backface-visibility": "hidden"
                        }
                          , r = "transition";
                        return o["-webkit-" + r] = o["-moz-" + r] = o["-o-" + r] = o[r] = n,
                        e.css(o),
                        e
                    }, u = function() {
                        e.content.css("visibility", "visible")
                    };
                    b("BuildControls" + n, function() {
                        if (e._allowZoom()) {
                            if (clearTimeout(o),
                            e.content.css("visibility", "hidden"),
                            !(t = e._getItemToZoom()))
                                return void u();
                            (r = c(t)).css(e._getOffset()),
                            e.wrap.append(r),
                            o = setTimeout(function() {
                                r.css(e._getOffset(!0)),
                                o = setTimeout(function() {
                                    u(),
                                    setTimeout(function() {
                                        r.remove(),
                                        t = r = null,
                                        S("ZoomAnimationEnded")
                                    }, 16)
                                }, s)
                            }, 16)
                        }
                    }),
                    b(l + n, function() {
                        if (e._allowZoom()) {
                            if (clearTimeout(o),
                            e.st.removalDelay = s,
                            !t) {
                                if (!(t = e._getItemToZoom()))
                                    return;
                                r = c(t)
                            }
                            r.css(e._getOffset(!0)),
                            e.wrap.append(r),
                            e.content.css("visibility", "hidden"),
                            setTimeout(function() {
                                r.css(e._getOffset())
                            }, 16)
                        }
                    }),
                    b(a + n, function() {
                        e._allowZoom() && (u(),
                        r && r.remove(),
                        t = null)
                    })
                }
            },
            _allowZoom: function() {
                return "image" === e.currItem.type
            },
            _getItemToZoom: function() {
                return !!e.currItem.hasSize && e.currItem.img
            },
            _getOffset: function(i) {
                var n, o = (n = i ? e.currItem.img : e.st.zoom.opener(e.currItem.el || e.currItem)).offset(), r = parseInt(n.css("padding-top"), 10), s = parseInt(n.css("padding-bottom"), 10);
                o.top -= t(window).scrollTop() - r;
                var a = {
                    width: n.width(),
                    height: (y ? n.innerHeight() : n[0].offsetHeight) - s - r
                };
                return void 0 === k && (k = void 0 !== document.createElement("p").style.MozTransform),
                k ? a["-moz-transform"] = a.transform = "translate(" + o.left + "px," + o.top + "px)" : (a.left = o.left,
                a.top = o.top),
                a
            }
        }
    });
    var z = "iframe"
      , P = function(t) {
        if (e.currTemplate[z]) {
            var i = e.currTemplate[z].find("iframe");
            i.length && (t || (i[0].src = "//about:blank"),
            e.isIE8 && i.css("display", t ? "block" : "none"))
        }
    };
    t.magnificPopup.registerModule(z, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                e.types.push(z),
                b("BeforeChange", function(t, e, i) {
                    e !== i && (e === z ? P() : i === z && P(!0))
                }),
                b(a + "." + z, function() {
                    P()
                })
            },
            getIframe: function(i, n) {
                var o = i.src
                  , r = e.st.iframe;
                t.each(r.patterns, function() {
                    return o.indexOf(this.index) > -1 ? (this.id && (o = "string" == typeof this.id ? o.substr(o.lastIndexOf(this.id) + this.id.length, o.length) : this.id.call(this, o)),
                    o = this.src.replace("%id%", o),
                    !1) : void 0
                });
                var s = {};
                return r.srcAction && (s[r.srcAction] = o),
                e._parseMarkup(n, s, i),
                e.updateStatus("ready"),
                n
            }
        }
    });
    var R = function(t) {
        var i = e.items.length;
        return t > i - 1 ? t - i : 0 > t ? i + t : t
    }
      , W = function(t, e, i) {
        return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, i)
    };
    t.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var i = e.st.gallery
                  , o = ".mfp-gallery";
                return e.direction = !0,
                !(!i || !i.enabled) && (r += " mfp-gallery",
                b(u + o, function() {
                    i.navigateByImgClick && e.wrap.on("click" + o, ".mfp-img", function() {
                        return e.items.length > 1 ? (e.next(),
                        !1) : void 0
                    }),
                    n.on("keydown" + o, function(t) {
                        37 === t.keyCode ? e.prev() : 39 === t.keyCode && e.next()
                    })
                }),
                b("UpdateStatus" + o, function(t, i) {
                    i.text && (i.text = W(i.text, e.currItem.index, e.items.length))
                }),
                b(c + o, function(t, n, o, r) {
                    var s = e.items.length;
                    o.counter = s > 1 ? W(i.tCounter, r.index, s) : ""
                }),
                b("BuildControls" + o, function() {
                    if (e.items.length > 1 && i.arrows && !e.arrowLeft) {
                        var n = i.arrowMarkup
                          , o = e.arrowLeft = t(n.replace(/%title%/gi, i.tPrev).replace(/%dir%/gi, "left")).addClass(g)
                          , r = e.arrowRight = t(n.replace(/%title%/gi, i.tNext).replace(/%dir%/gi, "right")).addClass(g);
                        o.click(function() {
                            e.prev()
                        }),
                        r.click(function() {
                            e.next()
                        }),
                        e.container.append(o.add(r))
                    }
                }),
                b(d + o, function() {
                    e._preloadTimeout && clearTimeout(e._preloadTimeout),
                    e._preloadTimeout = setTimeout(function() {
                        e.preloadNearbyImages(),
                        e._preloadTimeout = null
                    }, 16)
                }),
                void b(a + o, function() {
                    n.off(o),
                    e.wrap.off("click" + o),
                    e.arrowRight = e.arrowLeft = null
                }))
            },
            next: function() {
                e.direction = !0,
                e.index = R(e.index + 1),
                e.updateItemHTML()
            },
            prev: function() {
                e.direction = !1,
                e.index = R(e.index - 1),
                e.updateItemHTML()
            },
            goTo: function(t) {
                e.direction = t >= e.index,
                e.index = t,
                e.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var t, i = e.st.gallery.preload, n = Math.min(i[0], e.items.length), o = Math.min(i[1], e.items.length);
                for (t = 1; t <= (e.direction ? o : n); t++)
                    e._preloadItem(e.index + t);
                for (t = 1; t <= (e.direction ? n : o); t++)
                    e._preloadItem(e.index - t)
            },
            _preloadItem: function(i) {
                if (i = R(i),
                !e.items[i].preloaded) {
                    var n = e.items[i];
                    n.parsed || (n = e.parseEl(i)),
                    S("LazyLoad", n),
                    "image" === n.type && (n.img = t('<img class="mfp-img" />').on("load.mfploader", function() {
                        n.hasSize = !0
                    }).on("error.mfploader", function() {
                        n.hasSize = !0,
                        n.loadError = !0,
                        S("LazyLoadError", n)
                    }).attr("src", n.src)),
                    n.preloaded = !0
                }
            }
        }
    });
    var H = "retina";
    t.magnificPopup.registerModule(H, {
        options: {
            replaceSrc: function(t) {
                return t.src.replace(/\.\w+$/, function(t) {
                    return "@2x" + t
                })
            },
            ratio: 1
        },
        proto: {
            initRetina: function() {
                if (window.devicePixelRatio > 1) {
                    var t = e.st.retina
                      , i = t.ratio;
                    (i = isNaN(i) ? i() : i) > 1 && (b("ImageHasSize." + H, function(t, e) {
                        e.img.css({
                            "max-width": e.img[0].naturalWidth / i,
                            width: "100%"
                        })
                    }),
                    b("ElementParse." + H, function(e, n) {
                        n.src = t.replaceSrc(n, i)
                    }))
                }
            }
        }
    }),
    I()
}),
function(t) {
    var e;
    if ("function" == typeof define && define.amd && (define(t),
    e = !0),
    "object" == typeof exports && (module.exports = t(),
    e = !0),
    !e) {
        var i = window.Cookies
          , n = window.Cookies = t();
        n.noConflict = function() {
            return window.Cookies = i,
            n
        }
    }
}(function() {
    function t() {
        for (var t = 0, e = {}; t < arguments.length; t++) {
            var i = arguments[t];
            for (var n in i)
                e[n] = i[n]
        }
        return e
    }
    function e(t) {
        return t.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent)
    }
    return function i(n) {
        function o() {}
        function r(e, i, r) {
            if ("undefined" != typeof document) {
                "number" == typeof (r = t({
                    path: "/"
                }, o.defaults, r)).expires && (r.expires = new Date(1 * new Date + 864e5 * r.expires)),
                r.expires = r.expires ? r.expires.toUTCString() : "";
                try {
                    var s = JSON.stringify(i);
                    /^[\{\[]/.test(s) && (i = s)
                } catch (t) {}
                i = n.write ? n.write(i, e) : encodeURIComponent(i + "").replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent),
                e = encodeURIComponent(e + "").replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
                var a = "";
                for (var l in r)
                    r[l] && (a += "; " + l,
                    !0 !== r[l] && (a += "=" + r[l].split(";")[0]));
                return document.cookie = e + "=" + i + a
            }
        }
        function s(t, i) {
            if ("undefined" != typeof document) {
                for (var o = {}, r = document.cookie ? document.cookie.split("; ") : [], s = 0; s < r.length; s++) {
                    var a = r[s].split("=")
                      , l = a.slice(1).join("=");
                    i || '"' !== l.charAt(0) || (l = l.slice(1, -1));
                    try {
                        var c = e(a[0]);
                        if (l = (n.read || n)(l, c) || e(l),
                        i)
                            try {
                                l = JSON.parse(l)
                            } catch (t) {}
                        if (o[c] = l,
                        t === c)
                            break
                    } catch (t) {}
                }
                return t ? o[t] : o
            }
        }
        return o.set = r,
        o.get = function(t) {
            return s(t, !1)
        }
        ,
        o.getJSON = function(t) {
            return s(t, !0)
        }
        ,
        o.remove = function(e, i) {
            r(e, "", t(i, {
                expires: -1
            }))
        }
        ,
        o.defaults = {},
        o.withConverter = i,
        o
    }(function() {})
}),
function(t) {
    "use strict";
    t.fn.twittie = function() {
        var e = arguments[0]instanceof Object ? arguments[0] : {}
          , i = "function" == typeof arguments[0] ? arguments[0] : arguments[1]
          , n = t.extend({
            username: null,
            list: null,
            hashtag: null,
            count: 10,
            hideReplies: !1,
            dateFormat: "%b/%d/%Y",
            template: "{{date}} - {{tweet}}",
            apiPath: "api/tweet.php",
            loadingText: "Loading..."
        }, e);
        n.list && !n.username && t.error("If you want to fetch tweets from a list, you must define the username of the list owner.");
        var o = function(t) {
            return t.replace(/(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/gi, '<a href="$1" target="_blank" title="Visit this link">$1</a>').replace(/#([a-zA-Z0-9_]+)/g, '<a href="https://twitter.com/search?q=%23$1&amp;src=hash" target="_blank" title="Search for #$1">#$1</a>').replace(/@([a-zA-Z0-9_]+)/g, '<a href="https://twitter.com/$1" target="_blank" title="$1 on Twitter">@$1</a>')
        }
          , r = function(t) {
            for (var e = t.split(" "), i = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], o = {
                "%d": (t = new Date(Date.parse(e[1] + " " + e[2] + ", " + e[5] + " " + e[3] + " UTC"))).getDate(),
                "%m": t.getMonth() + 1,
                "%b": i[t.getMonth()].substr(0, 3),
                "%B": i[t.getMonth()],
                "%y": String(t.getFullYear()).slice(-2),
                "%Y": t.getFullYear()
            }, r = n.dateFormat, s = n.dateFormat.match(/%[dmbByY]/g), a = 0, l = s.length; l > a; a++)
                r = r.replace(s[a], o[s[a]]);
            return r
        }
          , s = function(t) {
            for (var e = n.template, i = ["date", "tweet", "avatar", "url", "retweeted", "screen_name", "user_name"], o = 0, r = i.length; r > o; o++)
                e = e.replace(new RegExp("{{" + i[o] + "}}","gi"), t[i[o]]);
            return e
        };
        this.html("<span>" + n.loadingText + "</span>");
        var a = this;
        t.getJSON(n.apiPath, {
            username: n.username,
            list: n.list,
            hashtag: n.hashtag,
            count: n.count,
            exclude_replies: n.hideReplies
        }, function(t) {
            a.find("span").fadeOut("fast", function() {
                a.html("<ul></ul>");
                for (var e = 0; e < n.count; e++) {
                    var l = !1;
                    if (t[e])
                        l = t[e];
                    else {
                        if (void 0 === t.statuses || !t.statuses[e])
                            break;
                        l = t.statuses[e]
                    }
                    var c = {
                        user_name: l.user.name,
                        date: r(l.created_at),
                        tweet: o(l.retweeted ? "RT @" + l.user.screen_name + ": " + l.retweeted_status.text : l.text),
                        avatar: '<img src="' + l.user.profile_image_url + '" />',
                        url: "https://twitter.com/" + l.user.screen_name + "/status/" + l.id_str,
                        retweeted: l.retweeted,
                        screen_name: o("@" + l.user.screen_name)
                    };
                    a.find("ul").append("<li>" + s(c) + "</li>")
                }
                "function" == typeof i && i()
            })
        })
    }
}(jQuery),
function(t) {
    t.fn.jflickrfeed = function(e, i) {
        var n = (e = t.extend(!0, {
            flickrbase: "http://api.flickr.com/services/feeds/",
            feedapi: "photos_public.gne",
            limit: 20,
            qstrings: {
                lang: "en-us",
                format: "json",
                jsoncallback: "?"
            },
            cleanDescription: !0,
            useTemplate: !0,
            itemTemplate: "",
            itemCallback: function() {}
        }, e)).flickrbase + e.feedapi + "?"
          , o = !0;
        for (var r in e.qstrings)
            o || (n += "&"),
            n += r + "=" + e.qstrings[r],
            o = !1;
        return t(this).each(function() {
            var o = t(this)
              , r = this;
            t.getJSON(n, function(n) {
                t.each(n.items, function(t, i) {
                    if (t < e.limit) {
                        if (e.cleanDescription) {
                            var n = /<p>(.*?)<\/p>/g
                              , s = i.description;
                            n.test(s) && (i.description = s.match(n)[2],
                            null != i.description && (i.description = i.description.replace("<p>", "").replace("</p>", "")))
                        }
                        if (i.image_s = i.media.m.replace("_m", "_s"),
                        i.image_t = i.media.m.replace("_m", "_t"),
                        i.image_m = i.media.m.replace("_m", "_m"),
                        i.image = i.media.m.replace("_m", ""),
                        i.image_b = i.media.m.replace("_m", "_b"),
                        delete i.media,
                        e.useTemplate) {
                            var a = e.itemTemplate;
                            for (var l in i) {
                                var c = new RegExp("{{" + l + "}}","g");
                                a = a.replace(c, i[l])
                            }
                            o.append(a)
                        }
                        e.itemCallback.call(r, i)
                    }
                }),
                t.isFunction(i) && i.call(r, n)
            })
        })
    }
}(jQuery),
"function" != typeof Object.create && (Object.create = function(t) {
    function e() {}
    return e.prototype = t,
    new e
}
),
function(t, e, i, n) {
    var o = {
        API_URL: "https://api.instagram.com/v1",
        initialize: function(e, i) {
            this.elem = i,
            this.$elem = t(i),
            this.accessToken = t.fn.spectragram.accessData.accessToken,
            this.options = t.extend({}, t.fn.spectragram.options, e),
            this.endpoints = this.setEndpoints(),
            this.messages = {
                defaultImageAltText: "Instagram Photo related with " + this.options.query,
                notFound: "This user account is private or doesn't have any photos."
            }
        },
        setEndpoints: function() {
            return {
                usersSelf: "/users/self/?access_token=" + this.accessToken,
                usersMediaRecent: "/users/self/media/recent/?&count=" + this.options.max + "&access_token=" + this.accessToken,
                tagsMediaRecent: "/tags/" + this.options.query + "/media/recent?&count=" + this.options.max + "&access_token=" + this.accessToken
            }
        },
        getPhotos: function(e) {
            var i = this;
            i.fetch(e).done(function(e) {
                var n = i.options.query || "User";
                e.data.length ? i.display(e) : t.error("Spectragram.js - Error: " + n + " does not have photos.")
            })
        },
        getUserFeed: function() {
            this.getPhotos(this.endpoints.usersMediaRecent)
        },
        getRecentTagged: function() {
            this.getPhotos(this.endpoints.tagsMediaRecent)
        },
        fetch: function(e) {
            var i = this.API_URL + e;
            return t.ajax({
                type: "GET",
                dataType: "jsonp",
                cache: !1,
                url: i
            })
        },
        display: function(e) {
            var i, n, o, r, s, a, l, c, u, d = [];
            if (o = 0 === t(this.options.wrapEachWith).length,
            void 0 === e.data || 200 !== e.meta.code || 0 === e.data.length)
                o ? this.$elem.append(this.messages.notFound) : this.$elem.append(t(this.options.wrapEachWith).append(this.messages.notFound));
            else {
                l = this.options.max >= e.data.length ? e.data.length : this.options.max,
                c = this.options.size;
                for (var h = 0; h < l; h++)
                    "small" === c ? (u = e.data[h].images.thumbnail.url,
                    s = e.data[h].images.thumbnail.height,
                    a = e.data[h].images.thumbnail.width) : "medium" === c ? (u = e.data[h].images.low_resolution.url,
                    s = e.data[h].images.low_resolution.height,
                    a = e.data[h].images.low_resolution.width) : (u = e.data[h].images.standard_resolution.url,
                    s = e.data[h].images.standard_resolution.height,
                    a = e.data[h].images.standard_resolution.width),
                    r = null !== e.data[h].caption ? t("<span>").text(e.data[h].caption.text).html() : this.messages.defaultImageAltText,
                    n = t("<img>", {
                        alt: r,
                        attr: {
                            height: s,
                            width: a
                        },
                        src: u
                    }),
                    i = t("<a>", {
                        href: e.data[h].link,
                        target: "_blank",
                        title: r
                    }).append(n),
                    o ? d.push(i) : d.push(t(this.options.wrapEachWith).append(i));
                this.$elem.append(d)
            }
            "function" == typeof this.options.complete && this.options.complete.call(this)
        }
    };
    jQuery.fn.spectragram = function(e, i) {
        jQuery.fn.spectragram.accessData.accessToken ? this.each(function() {
            var n = Object.create(o);
            if (n.initialize(i, this),
            n[e])
                return n[e](this);
            t.error("Method " + e + " does not exist on jQuery.spectragram")
        }) : t.error("You must define an accessToken on jQuery.spectragram")
    }
    ,
    jQuery.fn.spectragram.options = {
        complete: null,
        max: 20,
        query: "instagram",
        size: "medium",
        wrapEachWith: "<li></li>"
    },
    jQuery.fn.spectragram.accessData = {
        accessToken: null
    }
}(jQuery, window, document),
function(t) {
    t.fn.countTo = function(e) {
        return e = e || {},
        t(this).each(function() {
            function i(t) {
                var e = n.formatter.call(s, t, n);
                a.text(e)
            }
            var n = t.extend({}, t.fn.countTo.defaults, {
                from: t(this).data("from"),
                to: t(this).data("to"),
                speed: t(this).data("speed"),
                refreshInterval: t(this).data("refresh-interval"),
                decimals: t(this).data("decimals")
            }, e)
              , o = Math.ceil(n.speed / n.refreshInterval)
              , r = (n.to - n.from) / o
              , s = this
              , a = t(this)
              , l = 0
              , c = n.from
              , u = a.data("countTo") || {};
            a.data("countTo", u),
            u.interval && clearInterval(u.interval),
            u.interval = setInterval(function() {
                l++,
                i(c += r),
                "function" == typeof n.onUpdate && n.onUpdate.call(s, c),
                l >= o && (a.removeData("countTo"),
                clearInterval(u.interval),
                c = n.to,
                "function" == typeof n.onComplete && n.onComplete.call(s, c))
            }, n.refreshInterval),
            i(c)
        })
    }
    ,
    t.fn.countTo.defaults = {
        from: 0,
        to: 0,
        speed: 1e3,
        refreshInterval: 100,
        decimals: 0,
        formatter: function(t, e) {
            return t.toFixed(e.decimals)
        },
        onUpdate: null,
        onComplete: null
    }
}(jQuery),
function(t) {
    "use strict";
    function e(e, i) {
        this.element = t(e),
        this.settings = t.extend({}, n, i),
        this._defaults = n,
        this._init()
    }
    var i = "Morphext"
      , n = {
        animation: "bounceIn",
        separator: ",",
        speed: 2e3,
        complete: t.noop
    };
    e.prototype = {
        _init: function() {
            var e = this;
            this.phrases = [],
            this.element.addClass("morphext"),
            t.each(this.element.text().split(this.settings.separator), function(i, n) {
                e.phrases.push(t.trim(n))
            }),
            this.index = -1,
            this.animate(),
            this.start()
        },
        animate: function() {
            this.index = ++this.index % this.phrases.length,
            this.element[0].innerHTML = '<span class="animated ' + this.settings.animation + '">' + this.phrases[this.index] + "</span>",
            t.isFunction(this.settings.complete) && this.settings.complete.call(this)
        },
        start: function() {
            var t = this;
            this._interval = setInterval(function() {
                t.animate()
            }, this.settings.speed)
        },
        stop: function() {
            this._interval = clearInterval(this._interval)
        }
    },
    t.fn[i] = function(n) {
        return this.each(function() {
            t.data(this, "plugin_" + i) || t.data(this, "plugin_" + i, new e(this,n))
        })
    }
}(jQuery),
function(t, e) {
    "function" == typeof define && define.amd ? define(["jquery"], function(t) {
        return e(t)
    }) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(0, function(t) {
    var e = function(t, e) {
        var i, n = document.createElement("canvas");
        t.appendChild(n),
        "object" == typeof G_vmlCanvasManager && G_vmlCanvasManager.initElement(n);
        var o = n.getContext("2d");
        n.width = n.height = e.size;
        var r = 1;
        window.devicePixelRatio > 1 && (r = window.devicePixelRatio,
        n.style.width = n.style.height = [e.size, "px"].join(""),
        n.width = n.height = e.size * r,
        o.scale(r, r)),
        o.translate(e.size / 2, e.size / 2),
        o.rotate((e.rotate / 180 - .5) * Math.PI);
        var s = (e.size - e.lineWidth) / 2;
        e.scaleColor && e.scaleLength && (s -= e.scaleLength + 2),
        Date.now = Date.now || function() {
            return +new Date
        }
        ;
        var a = function(t, e, i) {
            var n = 0 >= (i = Math.min(Math.max(-1, i || 0), 1));
            o.beginPath(),
            o.arc(0, 0, s, 0, 2 * Math.PI * i, n),
            o.strokeStyle = t,
            o.lineWidth = e,
            o.stroke()
        }
          , l = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(t) {
            window.setTimeout(t, 1e3 / 60)
        }
          , c = function() {
            e.scaleColor && function() {
                var t, i;
                o.lineWidth = 1,
                o.fillStyle = e.scaleColor,
                o.save();
                for (var n = 24; n > 0; --n)
                    n % 6 == 0 ? (i = e.scaleLength,
                    t = 0) : (i = .6 * e.scaleLength,
                    t = e.scaleLength - i),
                    o.fillRect(-e.size / 2 + t, 0, i, 1),
                    o.rotate(Math.PI / 12);
                o.restore()
            }(),
            e.trackColor && a(e.trackColor, e.trackWidth || e.lineWidth, 1)
        };
        this.getCanvas = function() {
            return n
        }
        ,
        this.getCtx = function() {
            return o
        }
        ,
        this.clear = function() {
            o.clearRect(e.size / -2, e.size / -2, e.size, e.size)
        }
        ,
        this.draw = function(t) {
            var n;
            e.scaleColor || e.trackColor ? o.getImageData && o.putImageData ? i ? o.putImageData(i, 0, 0) : (c(),
            i = o.getImageData(0, 0, e.size * r, e.size * r)) : (this.clear(),
            c()) : this.clear(),
            o.lineCap = e.lineCap,
            n = "function" == typeof e.barColor ? e.barColor(t) : e.barColor,
            a(n, e.lineWidth, t / 100)
        }
        .bind(this),
        this.animate = function(t, i) {
            var n = Date.now();
            e.onStart(t, i);
            var o = function() {
                var r = Math.min(Date.now() - n, e.animate.duration)
                  , s = e.easing(this, r, t, i - t, e.animate.duration);
                this.draw(s),
                e.onStep(t, i, s),
                r >= e.animate.duration ? e.onStop(t, i) : l(o)
            }
            .bind(this);
            l(o)
        }
        .bind(this)
    }
      , i = function(t, i) {
        var n = {
            barColor: "#ef1e25",
            trackColor: "#f9f9f9",
            scaleColor: "#dfe0e0",
            scaleLength: 5,
            lineCap: "round",
            lineWidth: 3,
            trackWidth: void 0,
            size: 110,
            rotate: 0,
            animate: {
                duration: 1e3,
                enabled: !0
            },
            easing: function(t, e, i, n, o) {
                return 1 > (e /= o / 2) ? n / 2 * e * e + i : -n / 2 * (--e * (e - 2) - 1) + i
            },
            onStart: function(t, e) {},
            onStep: function(t, e, i) {},
            onStop: function(t, e) {}
        };
        if (void 0 !== e)
            n.renderer = e;
        else {
            if ("undefined" == typeof SVGRenderer)
                throw new Error("Please load either the SVG- or the CanvasRenderer");
            n.renderer = SVGRenderer
        }
        var o = {}
          , r = 0
          , s = function() {
            for (var e in this.el = t,
            this.options = o,
            n)
                n.hasOwnProperty(e) && (o[e] = i && void 0 !== i[e] ? i[e] : n[e],
                "function" == typeof o[e] && (o[e] = o[e].bind(this)));
            "string" == typeof o.easing && "undefined" != typeof jQuery && jQuery.isFunction(jQuery.easing[o.easing]) ? o.easing = jQuery.easing[o.easing] : o.easing = n.easing,
            "number" == typeof o.animate && (o.animate = {
                duration: o.animate,
                enabled: !0
            }),
            "boolean" != typeof o.animate || o.animate || (o.animate = {
                duration: 1e3,
                enabled: o.animate
            }),
            this.renderer = new o.renderer(t,o),
            this.renderer.draw(r),
            t.dataset && t.dataset.percent ? this.update(parseFloat(t.dataset.percent)) : t.getAttribute && t.getAttribute("data-percent") && this.update(parseFloat(t.getAttribute("data-percent")))
        }
        .bind(this);
        this.update = function(t) {
            return t = parseFloat(t),
            o.animate.enabled ? this.renderer.animate(r, t) : this.renderer.draw(t),
            r = t,
            this
        }
        .bind(this),
        this.disableAnimation = function() {
            return o.animate.enabled = !1,
            this
        }
        ,
        this.enableAnimation = function() {
            return o.animate.enabled = !0,
            this
        }
        ,
        s()
    };
    t.fn.easyPieChart = function(e) {
        return this.each(function() {
            var n;
            t.data(this, "easyPieChart") || (n = t.extend({}, e, t(this).data()),
            t.data(this, "easyPieChart", new i(this,n)))
        })
    }
}),
function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
}(function(t) {
    "use strict";
    function e(t) {
        var e = t.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        return new RegExp(e)
    }
    function i(t) {
        return function(i) {
            var o = i.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
            if (o)
                for (var r = 0, s = o.length; r < s; ++r) {
                    var l = o[r].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/)
                      , c = e(l[0])
                      , u = l[1] || ""
                      , d = l[3] || ""
                      , h = null;
                    l = l[2],
                    a.hasOwnProperty(l) && (h = a[l],
                    h = Number(t[h])),
                    null !== h && ("!" === u && (h = n(d, h)),
                    "" === u && h < 10 && (h = "0" + h.toString()),
                    i = i.replace(c, h.toString()))
                }
            return i.replace(/%%/, "%")
        }
    }
    function n(t, e) {
        var i = "s"
          , n = "";
        return t && (1 === (t = t.replace(/(:|;|\s)/gi, "").split(/\,/)).length ? i = t[0] : (n = t[0],
        i = t[1])),
        Math.abs(e) > 1 ? i : n
    }
    var o = []
      , r = []
      , s = {
        precision: 100,
        elapse: !1,
        defer: !1
    };
    r.push(/^[0-9]*$/.source),
    r.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),
    r.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),
    r = new RegExp(r.join("|"));
    var a = {
        Y: "years",
        m: "months",
        n: "daysToMonth",
        d: "daysToWeek",
        w: "weeks",
        W: "weeksToMonth",
        H: "hours",
        M: "minutes",
        S: "seconds",
        D: "totalDays",
        I: "totalHours",
        N: "totalMinutes",
        T: "totalSeconds"
    }
      , l = function(e, i, n) {
        this.el = e,
        this.$el = t(e),
        this.interval = null,
        this.offset = {},
        this.options = t.extend({}, s),
        this.firstTick = !0,
        this.instanceNumber = o.length,
        o.push(this),
        this.$el.data("countdown-instance", this.instanceNumber),
        n && ("function" == typeof n ? (this.$el.on("update.countdown", n),
        this.$el.on("stoped.countdown", n),
        this.$el.on("finish.countdown", n)) : this.options = t.extend({}, s, n)),
        this.setFinalDate(i),
        !1 === this.options.defer && this.start()
    };
    t.extend(l.prototype, {
        start: function() {
            null !== this.interval && clearInterval(this.interval);
            var t = this;
            this.update(),
            this.interval = setInterval(function() {
                t.update.call(t)
            }, this.options.precision)
        },
        stop: function() {
            clearInterval(this.interval),
            this.interval = null,
            this.dispatchEvent("stoped")
        },
        toggle: function() {
            this.interval ? this.stop() : this.start()
        },
        pause: function() {
            this.stop()
        },
        resume: function() {
            this.start()
        },
        remove: function() {
            this.stop.call(this),
            o[this.instanceNumber] = null,
            delete this.$el.data().countdownInstance
        },
        setFinalDate: function(t) {
            this.finalDate = function(t) {
                if (t instanceof Date)
                    return t;
                if (String(t).match(r))
                    return String(t).match(/^[0-9]*$/) && (t = Number(t)),
                    String(t).match(/\-/) && (t = String(t).replace(/\-/g, "/")),
                    new Date(t);
                throw new Error("Couldn't cast `" + t + "` to a date object.")
            }(t)
        },
        update: function() {
            if (0 !== this.$el.closest("html").length) {
                var t, e = new Date;
                return t = this.finalDate.getTime() - e.getTime(),
                t = Math.ceil(t / 1e3),
                t = !this.options.elapse && t < 0 ? 0 : Math.abs(t),
                this.totalSecsLeft === t || this.firstTick ? void (this.firstTick = !1) : (this.totalSecsLeft = t,
                this.elapsed = e >= this.finalDate,
                this.offset = {
                    seconds: this.totalSecsLeft % 60,
                    minutes: Math.floor(this.totalSecsLeft / 60) % 60,
                    hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
                    days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                    daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                    daysToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 % 30.4368),
                    weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
                    weeksToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7) % 4,
                    months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368),
                    years: Math.abs(this.finalDate.getFullYear() - e.getFullYear()),
                    totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
                    totalHours: Math.floor(this.totalSecsLeft / 60 / 60),
                    totalMinutes: Math.floor(this.totalSecsLeft / 60),
                    totalSeconds: this.totalSecsLeft
                },
                void (this.options.elapse || 0 !== this.totalSecsLeft ? this.dispatchEvent("update") : (this.stop(),
                this.dispatchEvent("finish"))))
            }
            this.remove()
        },
        dispatchEvent: function(e) {
            var n = t.Event(e + ".countdown");
            n.finalDate = this.finalDate,
            n.elapsed = this.elapsed,
            n.offset = t.extend({}, this.offset),
            n.strftime = i(this.offset),
            this.$el.trigger(n)
        }
    }),
    t.fn.countdown = function() {
        var e = Array.prototype.slice.call(arguments, 0);
        return this.each(function() {
            var i = t(this).data("countdown-instance");
            if (void 0 !== i) {
                var n = o[i]
                  , r = e[0];
                l.prototype.hasOwnProperty(r) ? n[r].apply(n, e.slice(1)) : null === String(r).match(/^[$A-Z_][0-9A-Z_$]*$/i) ? (n.setFinalDate.call(n, r),
                n.start()) : t.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi, r))
            } else
                new l(this,e[0],e[1])
        })
    }
}),
function(t) {
    t.fn.downCount = function(e, i) {
        var n = t.extend({
            date: null,
            offset: null
        }, e);
        n.date || t.error("Date is not defined."),
        Date.parse(n.date) || t.error("Incorrect date format, it should look like this, 12/24/2012 12:00:00.");
        var o = this
          , r = setInterval(function() {
            var t = new Date(n.date) - function() {
                var t = new Date
                  , e = t.getTime() + 6e4 * t.getTimezoneOffset();
                return new Date(e + 36e5 * n.offset)
            }();
            if (t < 0)
                return clearInterval(r),
                void (i && "function" == typeof i && i());
            var e = Math.floor(t / 864e5)
              , s = Math.floor(t % 864e5 / 36e5)
              , a = Math.floor(t % 36e5 / 6e4)
              , l = Math.floor(t % 6e4 / 1e3)
              , c = 1 === (e = String(e).length >= 2 ? e : "0" + e) ? "day" : "days"
              , u = 1 === (s = String(s).length >= 2 ? s : "0" + s) ? "hour" : "hours"
              , d = 1 === (a = String(a).length >= 2 ? a : "0" + a) ? "minute" : "minutes"
              , h = 1 === (l = String(l).length >= 2 ? l : "0" + l) ? "second" : "seconds";
            o.find(".days").text(e),
            o.find(".hours").text(s),
            o.find(".minutes").text(a),
            o.find(".seconds").text(l),
            o.find(".days_ref").text(c),
            o.find(".hours_ref").text(u),
            o.find(".minutes_ref").text(d),
            o.find(".seconds_ref").text(h)
        }, 1e3)
    }
}(jQuery),
function(t) {
    t.fn.theiaStickySidebar = function(e) {
        function i(e, i) {
            return !0 === e.initialized || !(t("body").width() < e.minWidth) && (function(e, i) {
                e.initialized = !0,
                0 === t("#theia-sticky-sidebar-stylesheet-" + e.namespace).length && t("head").append(t('<style id="theia-sticky-sidebar-stylesheet-' + e.namespace + '">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>')),
                i.each(function() {
                    function i() {
                        o.fixedScrollTop = 0,
                        o.sidebar.css({
                            "min-height": "1px"
                        }),
                        o.stickySidebar.css({
                            position: "static",
                            width: "",
                            transform: "none"
                        })
                    }
                    var o = {};
                    if (o.sidebar = t(this),
                    o.options = e || {},
                    o.container = t(o.options.containerSelector),
                    0 == o.container.length && (o.container = o.sidebar.parent()),
                    o.sidebar.parents().css("-webkit-transform", "none"),
                    o.sidebar.css({
                        position: o.options.defaultPosition,
                        overflow: "visible",
                        "-webkit-box-sizing": "border-box",
                        "-moz-box-sizing": "border-box",
                        "box-sizing": "border-box"
                    }),
                    o.stickySidebar = o.sidebar.find(".theiaStickySidebar"),
                    0 == o.stickySidebar.length) {
                        var r = /(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;
                        o.sidebar.find("script").filter(function(t, e) {
                            return 0 === e.type.length || e.type.match(r)
                        }).remove(),
                        o.stickySidebar = t("<div>").addClass("theiaStickySidebar").append(o.sidebar.children()),
                        o.sidebar.append(o.stickySidebar)
                    }
                    o.marginBottom = parseInt(o.sidebar.css("margin-bottom")),
                    o.paddingTop = parseInt(o.sidebar.css("padding-top")),
                    o.paddingBottom = parseInt(o.sidebar.css("padding-bottom"));
                    var s = o.stickySidebar.offset().top
                      , a = o.stickySidebar.outerHeight();
                    o.stickySidebar.css("padding-top", 1),
                    o.stickySidebar.css("padding-bottom", 1),
                    s -= o.stickySidebar.offset().top,
                    a = o.stickySidebar.outerHeight() - a - s,
                    0 == s ? (o.stickySidebar.css("padding-top", 0),
                    o.stickySidebarPaddingTop = 0) : o.stickySidebarPaddingTop = 1,
                    0 == a ? (o.stickySidebar.css("padding-bottom", 0),
                    o.stickySidebarPaddingBottom = 0) : o.stickySidebarPaddingBottom = 1,
                    o.previousScrollTop = null,
                    o.fixedScrollTop = 0,
                    i(),
                    o.onScroll = function(o) {
                        if (o.stickySidebar.is(":visible")) {
                            if (t("body").width() < o.options.minWidth)
                                return void i();
                            if (o.options.disableOnResponsiveLayouts)
                                if (o.sidebar.outerWidth("none" == o.sidebar.css("float")) + 50 > o.container.width())
                                    return void i();
                            var r = t(document).scrollTop()
                              , s = "static";
                            if (r >= o.sidebar.offset().top + (o.paddingTop - o.options.additionalMarginTop)) {
                                var a, l = o.paddingTop + e.additionalMarginTop, c = o.paddingBottom + o.marginBottom + e.additionalMarginBottom, u = o.sidebar.offset().top, d = o.sidebar.offset().top + function(e) {
                                    var i = e.height();
                                    return e.children().each(function() {
                                        i = Math.max(i, t(this).height())
                                    }),
                                    i
                                }(o.container), h = 0 + e.additionalMarginTop;
                                a = o.stickySidebar.outerHeight() + l + c < t(window).height() ? h + o.stickySidebar.outerHeight() : t(window).height() - o.marginBottom - o.paddingBottom - e.additionalMarginBottom;
                                var f = u - r + o.paddingTop
                                  , p = d - r - o.paddingBottom - o.marginBottom
                                  , m = o.stickySidebar.offset().top - r
                                  , g = o.previousScrollTop - r;
                                "fixed" == o.stickySidebar.css("position") && "modern" == o.options.sidebarBehavior && (m += g),
                                "stick-to-top" == o.options.sidebarBehavior && (m = e.additionalMarginTop),
                                "stick-to-bottom" == o.options.sidebarBehavior && (m = a - o.stickySidebar.outerHeight()),
                                m = g > 0 ? Math.min(m, h) : Math.max(m, a - o.stickySidebar.outerHeight()),
                                m = Math.max(m, f),
                                m = Math.min(m, p - o.stickySidebar.outerHeight());
                                var v = o.container.height() == o.stickySidebar.outerHeight();
                                s = !v && m == h || !v && m == a - o.stickySidebar.outerHeight() ? "fixed" : r + m - o.sidebar.offset().top - o.paddingTop <= e.additionalMarginTop ? "static" : "absolute"
                            }
                            if ("fixed" == s) {
                                var y = t(document).scrollLeft();
                                o.stickySidebar.css({
                                    position: "fixed",
                                    width: n(o.stickySidebar) + "px",
                                    transform: "translateY(" + m + "px)",
                                    left: o.sidebar.offset().left + parseInt(o.sidebar.css("padding-left")) - y + "px",
                                    top: "0px"
                                })
                            } else if ("absolute" == s) {
                                var w = {};
                                "absolute" != o.stickySidebar.css("position") && (w.position = "absolute",
                                w.transform = "translateY(" + (r + m - o.sidebar.offset().top - o.stickySidebarPaddingTop - o.stickySidebarPaddingBottom) + "px)",
                                w.top = "0px"),
                                w.width = n(o.stickySidebar) + "px",
                                w.left = "",
                                o.stickySidebar.css(w)
                            } else
                                "static" == s && i();
                            "static" != s && 1 == o.options.updateSidebarHeight && o.sidebar.css({
                                "min-height": o.stickySidebar.outerHeight() + o.stickySidebar.offset().top - o.sidebar.offset().top + o.paddingBottom
                            }),
                            o.previousScrollTop = r
                        }
                    }
                    ,
                    o.onScroll(o),
                    t(document).on("scroll." + o.options.namespace, function(t) {
                        return function() {
                            t.onScroll(t)
                        }
                    }(o)),
                    t(window).on("resize." + o.options.namespace, function(t) {
                        return function() {
                            t.stickySidebar.css({
                                position: "static"
                            }),
                            t.onScroll(t)
                        }
                    }(o)),
                    "undefined" != typeof ResizeSensor && new ResizeSensor(o.stickySidebar[0],function(t) {
                        return function() {
                            t.onScroll(t)
                        }
                    }(o))
                })
            }(e, i),
            !0)
        }
        function n(t) {
            var e;
            try {
                e = t[0].getBoundingClientRect().width
            } catch (t) {}
            return void 0 === e && (e = t.width()),
            e
        }
        return (e = t.extend({
            containerSelector: "",
            additionalMarginTop: 0,
            additionalMarginBottom: 0,
            updateSidebarHeight: !0,
            minWidth: 0,
            disableOnResponsiveLayouts: !0,
            sidebarBehavior: "modern",
            defaultPosition: "relative",
            namespace: "TSS"
        }, e)).additionalMarginTop = parseInt(e.additionalMarginTop) || 0,
        e.additionalMarginBottom = parseInt(e.additionalMarginBottom) || 0,
        function(e, n) {
            i(e, n) || (console.log("TSS: Body width smaller than options.minWidth. Init is delayed."),
            t(document).on("scroll." + e.namespace, function(e, n) {
                return function(o) {
                    i(e, n) && t(this).unbind(o)
                }
            }(e, n)),
            t(window).on("resize." + e.namespace, function(e, n) {
                return function(o) {
                    i(e, n) && t(this).unbind(o)
                }
            }(e, n)))
        }(e, this),
        this
    }
}(jQuery),
function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : jQuery)
}(function(t) {
    function e(e, n, o) {
        var r = {
            content: {
                message: "object" == typeof n ? n.message : n,
                title: n.title ? n.title : "",
                icon: n.icon ? n.icon : "",
                url: n.url ? n.url : "#",
                target: n.target ? n.target : "-"
            }
        };
        o = t.extend(!0, {}, r, o),
        this.settings = t.extend(!0, {}, i, o),
        this._defaults = i,
        "-" === this.settings.content.target && (this.settings.content.target = this.settings.url_target),
        this.animations = {
            start: "webkitAnimationStart oanimationstart MSAnimationStart animationstart",
            end: "webkitAnimationEnd oanimationend MSAnimationEnd animationend"
        },
        "number" == typeof this.settings.offset && (this.settings.offset = {
            x: this.settings.offset,
            y: this.settings.offset
        }),
        (this.settings.allow_duplicates || !this.settings.allow_duplicates && !function(e) {
            var i = !1;
            return t('[data-notify="container"]').each(function(n, o) {
                var r = t(o)
                  , s = r.find('[data-notify="title"]').html().trim()
                  , a = r.find('[data-notify="message"]').html().trim()
                  , l = s === t("<div>" + e.settings.content.title + "</div>").html().trim()
                  , c = a === t("<div>" + e.settings.content.message + "</div>").html().trim()
                  , u = r.hasClass("alert-" + e.settings.type);
                return l && c && u && (i = !0),
                !i
            }),
            i
        }(this)) && this.init()
    }
    var i = {
        element: "body",
        position: null,
        type: "info",
        allow_dismiss: !0,
        allow_duplicates: !0,
        newest_on_top: !1,
        showProgressbar: !1,
        placement: {
            from: "top",
            align: "right"
        },
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 5e3,
        timer: 1e3,
        url_target: "_blank",
        mouse_over: null,
        animate: {
            enter: "animated fadeInDown",
            exit: "animated fadeOutUp"
        },
        onShow: null,
        onShown: null,
        onClose: null,
        onClosed: null,
        onClick: null,
        icon_type: "class",
        template: '<div data-notify="container" class="col-11 col-md-4 alert alert-{0}" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss">&times;</button><span data-notify="icon"></span> <span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="p-progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>'
    };
    String.format = function() {
        var t = arguments;
        return arguments[0].replace(/(\{\{\d\}\}|\{\d\})/g, function(e) {
            if ("{{" === e.substring(0, 2))
                return e;
            var i = parseInt(e.match(/\d/)[0]);
            return t[i + 1]
        })
    }
    ,
    t.extend(e.prototype, {
        init: function() {
            var t = this;
            this.buildNotify(),
            this.settings.content.icon && this.setIcon(),
            "#" != this.settings.content.url && this.styleURL(),
            this.styleDismiss(),
            this.placement(),
            this.bind(),
            this.notify = {
                $ele: this.$ele,
                update: function(e, i) {
                    var n = {};
                    for (var o in "string" == typeof e ? n[e] = i : n = e,
                    n)
                        switch (o) {
                        case "type":
                            this.$ele.removeClass("alert-" + t.settings.type),
                            this.$ele.find('[data-notify="progressbar"] > .progress-bar').removeClass("p-progress-bar-" + t.settings.type),
                            t.settings.type = n[o],
                            this.$ele.addClass("alert-" + n[o]).find('[data-notify="progressbar"] > .progress-bar').addClass("p-progress-bar-" + n[o]);
                            break;
                        case "icon":
                            var r = this.$ele.find('[data-notify="icon"]');
                            "class" === t.settings.icon_type.toLowerCase() ? r.removeClass(t.settings.content.icon).addClass(n[o]) : (r.is("img") || r.find("img"),
                            r.attr("src", n[o])),
                            t.settings.content.icon = n[e];
                            break;
                        case "progress":
                            var s = t.settings.delay - t.settings.delay * (n[o] / 100);
                            this.$ele.data("notify-delay", s),
                            this.$ele.find('[data-notify="progressbar"] > div').attr("aria-valuenow", n[o]).css("width", n[o] + "%");
                            break;
                        case "url":
                            this.$ele.find('[data-notify="url"]').attr("href", n[o]);
                            break;
                        case "target":
                            this.$ele.find('[data-notify="url"]').attr("target", n[o]);
                            break;
                        default:
                            this.$ele.find('[data-notify="' + o + '"]').html(n[o])
                        }
                    var a = this.$ele.outerHeight() + parseInt(t.settings.spacing) + parseInt(t.settings.offset.y);
                    t.reposition(a)
                },
                close: function() {
                    t.close()
                }
            }
        },
        buildNotify: function() {
            var e = this.settings.content;
            this.$ele = t(String.format(this.settings.template, this.settings.type, e.title, e.message, e.url, e.target)),
            this.$ele.attr("data-notify-position", this.settings.placement.from + "-" + this.settings.placement.align),
            this.settings.allow_dismiss || this.$ele.find('[data-notify="dismiss"]').css("display", "none"),
            (this.settings.delay <= 0 && !this.settings.showProgressbar || !this.settings.showProgressbar) && this.$ele.find('[data-notify="progressbar"]').remove()
        },
        setIcon: function() {
            "class" === this.settings.icon_type.toLowerCase() ? this.$ele.find('[data-notify="icon"]').addClass(this.settings.content.icon) : this.$ele.find('[data-notify="icon"]').is("img") ? this.$ele.find('[data-notify="icon"]').attr("src", this.settings.content.icon) : this.$ele.find('[data-notify="icon"]').append('<img src="' + this.settings.content.icon + '" alt="Notify Icon" />')
        },
        styleDismiss: function() {
            this.$ele.find('[data-notify="dismiss"]').css({
                position: "absolute",
                right: "10px",
                top: "5px",
                zIndex: this.settings.z_index + 2
            })
        },
        styleURL: function() {
            this.$ele.find('[data-notify="url"]').css({
                backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)",
                height: "100%",
                left: 0,
                position: "absolute",
                top: 0,
                width: "100%",
                zIndex: this.settings.z_index + 1
            })
        },
        placement: function() {
            var e = this
              , i = this.settings.offset.y
              , n = {
                display: "inline-block",
                margin: "0px auto",
                position: this.settings.position ? this.settings.position : "body" === this.settings.element ? "fixed" : "absolute",
                transition: "all .5s ease-in-out",
                zIndex: this.settings.z_index
            }
              , o = !1
              , r = this.settings;
            switch (t('[data-notify-position="' + this.settings.placement.from + "-" + this.settings.placement.align + '"]:not([data-closing="true"])').each(function() {
                i = Math.max(i, parseInt(t(this).css(r.placement.from)) + parseInt(t(this).outerHeight()) + parseInt(r.spacing))
            }),
            !0 === this.settings.newest_on_top && (i = this.settings.offset.y),
            n[this.settings.placement.from] = i + "px",
            this.settings.placement.align) {
            case "left":
            case "right":
                n[this.settings.placement.align] = this.settings.offset.x + "px";
                break;
            case "center":
                n.left = 0,
                n.right = 0
            }
            this.$ele.css(n).addClass(this.settings.animate.enter),
            t.each(Array("webkit-", "moz-", "o-", "ms-", ""), function(t, i) {
                e.$ele[0].style[i + "AnimationIterationCount"] = 1
            }),
            t(this.settings.element).append(this.$ele),
            !0 === this.settings.newest_on_top && (i = parseInt(i) + parseInt(this.settings.spacing) + this.$ele.outerHeight(),
            this.reposition(i)),
            t.isFunction(e.settings.onShow) && e.settings.onShow.call(this.$ele),
            this.$ele.one(this.animations.start, function() {
                o = !0
            }).one(this.animations.end, function() {
                e.$ele.removeClass(e.settings.animate.enter),
                t.isFunction(e.settings.onShown) && e.settings.onShown.call(this)
            }),
            setTimeout(function() {
                o || t.isFunction(e.settings.onShown) && e.settings.onShown.call(this)
            }, 600)
        },
        bind: function() {
            var e = this;
            if (this.$ele.find('[data-notify="dismiss"]').on("click", function() {
                e.close()
            }),
            t.isFunction(e.settings.onClick) && this.$ele.on("click", function(t) {
                t.target != e.$ele.find('[data-notify="dismiss"]')[0] && e.settings.onClick.call(this, t)
            }),
            this.$ele.mouseover(function() {
                t(this).data("data-hover", "true")
            }).mouseout(function() {
                t(this).data("data-hover", "false")
            }),
            this.$ele.data("data-hover", "false"),
            this.settings.delay > 0) {
                e.$ele.data("notify-delay", e.settings.delay);
                var i = setInterval(function() {
                    var t = parseInt(e.$ele.data("notify-delay")) - e.settings.timer;
                    if ("false" === e.$ele.data("data-hover") && "pause" === e.settings.mouse_over || "pause" != e.settings.mouse_over) {
                        var n = (e.settings.delay - t) / e.settings.delay * 100;
                        e.$ele.data("notify-delay", t),
                        e.$ele.find('[data-notify="progressbar"] > div').attr("aria-valuenow", n).css("width", n + "%")
                    }
                    t <= -e.settings.timer && (clearInterval(i),
                    e.close())
                }, e.settings.timer)
            }
        },
        close: function() {
            var e = this
              , i = parseInt(this.$ele.css(this.settings.placement.from))
              , n = !1;
            this.$ele.attr("data-closing", "true").addClass(this.settings.animate.exit),
            e.reposition(i),
            t.isFunction(e.settings.onClose) && e.settings.onClose.call(this.$ele),
            this.$ele.one(this.animations.start, function() {
                n = !0
            }).one(this.animations.end, function() {
                t(this).remove(),
                t.isFunction(e.settings.onClosed) && e.settings.onClosed.call(this)
            }),
            setTimeout(function() {
                n || (e.$ele.remove(),
                e.settings.onClosed && e.settings.onClosed(e.$ele))
            }, 600)
        },
        reposition: function(e) {
            var i = this
              , n = '[data-notify-position="' + this.settings.placement.from + "-" + this.settings.placement.align + '"]:not([data-closing="true"])'
              , o = this.$ele.nextAll(n);
            !0 === this.settings.newest_on_top && (o = this.$ele.prevAll(n)),
            o.each(function() {
                t(this).css(i.settings.placement.from, e),
                e = parseInt(e) + parseInt(i.settings.spacing) + t(this).outerHeight()
            })
        }
    }),
    t.notify = function(t, i) {
        return new e(this,t,i).notify
    }
    ,
    t.notifyDefaults = function(e) {
        return i = t.extend(!0, {}, i, e)
    }
    ,
    t.notifyClose = function(e) {
        void 0 === e || "all" === e ? t("[data-notify]").find('[data-notify="dismiss"]').trigger("click") : "success" === e || "info" === e || "warning" === e || "danger" === e ? t(".alert-" + e + "[data-notify]").find('[data-notify="dismiss"]').trigger("click") : e ? t(e + "[data-notify]").find('[data-notify="dismiss"]').trigger("click") : t('[data-notify-position="' + e + '"]').find('[data-notify="dismiss"]').trigger("click")
    }
    ,
    t.notifyCloseExcept = function(e) {
        "success" === e || "info" === e || "warning" === e || "danger" === e ? t("[data-notify]").not(".alert-" + e).find('[data-notify="dismiss"]').trigger("click") : t("[data-notify]").not(e).find('[data-notify="dismiss"]').trigger("click")
    }
}),
function(t, e) {
    "use strict";
    function i(i, n, r, a, l) {
        function c() {
            C = t.devicePixelRatio > 1,
            r = u(r),
            n.delay >= 0 && setTimeout(function() {
                d(!0)
            }, n.delay),
            (n.delay < 0 || n.combined) && (a.e = function(t, e) {
                var o, r = 0;
                return function(s, a) {
                    function l() {
                        r = +new Date,
                        e.call(i, s)
                    }
                    var c = +new Date - r;
                    o && clearTimeout(o),
                    c > t || !n.enableThrottle || a ? l() : o = setTimeout(l, t - c)
                }
            }(n.throttle, function(t) {
                "resize" === t.type && (x = S = -1),
                d(t.all)
            }),
            a.a = function(t) {
                t = u(t),
                r.push.apply(r, t)
            }
            ,
            a.g = function() {
                return r = o(r).filter(function() {
                    return !o(this).data(n.loadedName)
                })
            }
            ,
            a.f = function(t) {
                for (var e = 0; e < t.length; e++) {
                    var i = r.filter(function() {
                        return this === t[e]
                    });
                    i.length && d(!1, i)
                }
            }
            ,
            d(),
            o(n.appendScroll).on("scroll." + l + " resize." + l, a.e))
        }
        function u(t) {
            for (var r = n.defaultImage, s = n.placeholder, a = n.imageBase, l = n.srcsetAttribute, c = n.loaderAttribute, u = n._f || {}, d = 0, h = (t = o(t).filter(function() {
                var t = o(this)
                  , i = g(this);
                return !t.data(n.handledName) && (t.attr(n.attribute) || t.attr(l) || t.attr(c) || u[i] !== e)
            }).data("plugin_" + n.name, i)).length; d < h; d++) {
                var f = o(t[d])
                  , p = g(t[d])
                  , m = f.attr(n.imageBaseAttribute) || a;
                p === E && m && f.attr(l) && f.attr(l, v(f.attr(l), m)),
                u[p] === e || f.attr(c) || f.attr(c, u[p]),
                p === E && r && !f.attr(L) ? f.attr(L, r) : p === E || !s || f.css(D) && "none" !== f.css(D) || f.css(D, "url('" + s + "')")
            }
            return t
        }
        function d(t, e) {
            if (r.length) {
                for (var s = e || r, a = !1, l = n.imageBase || "", c = n.srcsetAttribute, u = n.handledName, d = 0; d < s.length; d++)
                    if (t || e || f(s[d])) {
                        var p = o(s[d])
                          , m = g(s[d])
                          , v = p.attr(n.attribute)
                          , y = p.attr(n.imageBaseAttribute) || l
                          , w = p.attr(n.loaderAttribute);
                        p.data(u) || n.visibleOnly && !p.is(":visible") || !((v || p.attr(c)) && (m === E && (y + v !== p.attr(L) || p.attr(c) !== p.attr(M)) || m !== E && y + v !== p.css(D)) || w) || (a = !0,
                        p.data(u, !0),
                        h(p, m, y, w))
                    }
                a && (r = o(r).filter(function() {
                    return !o(this).data(u)
                }))
            } else
                n.autoDestroy && i.destroy()
        }
        function h(t, e, i, r) {
            ++b;
            var s = function() {
                w("onError", t),
                y(),
                s = o.noop
            };
            w("beforeLoad", t);
            var a = n.attribute
              , l = n.srcsetAttribute
              , c = n.sizesAttribute
              , u = n.retinaAttribute
              , d = n.removeAttribute
              , h = n.loadedName
              , f = t.attr(u);
            if (r) {
                var p = function() {
                    d && t.removeAttr(n.loaderAttribute),
                    t.data(h, !0),
                    w(I, t),
                    setTimeout(y, 1),
                    p = o.noop
                };
                t.off(T).one(T, s).one(_, p),
                w(r, t, function(e) {
                    e ? (t.off(_),
                    p()) : (t.off(T),
                    s())
                }) || t.trigger(T)
            } else {
                var m = o(new Image);
                m.one(T, s).one(_, function() {
                    t.hide(),
                    e === E ? t.attr(N, m.attr(N)).attr(M, m.attr(M)).attr(L, m.attr(L)) : t.css(D, "url('" + m.attr(L) + "')"),
                    t[n.effect](n.effectTime),
                    d && (t.removeAttr(a + " " + l + " " + u + " " + n.imageBaseAttribute),
                    c !== N && t.removeAttr(c)),
                    t.data(h, !0),
                    w(I, t),
                    m.remove(),
                    y()
                });
                var g = (C && f ? f : t.attr(a)) || "";
                m.attr(N, t.attr(c)).attr(M, t.attr(l)).attr(L, g ? i + g : null),
                m.complete && m.trigger(_)
            }
        }
        function f(t) {
            var e = t.getBoundingClientRect()
              , i = n.scrollDirection
              , o = n.threshold
              , r = m() + o > e.top && -o < e.bottom
              , s = p() + o > e.left && -o < e.right;
            return "vertical" === i ? r : "horizontal" === i ? s : r && s
        }
        function p() {
            return x >= 0 ? x : x = o(t).width()
        }
        function m() {
            return S >= 0 ? S : S = o(t).height()
        }
        function g(t) {
            return t.tagName.toLowerCase()
        }
        function v(t, e) {
            if (e) {
                var i = t.split(",");
                t = "";
                for (var n = 0, o = i.length; n < o; n++)
                    t += e + i[n].trim() + (n !== o - 1 ? "," : "")
            }
            return t
        }
        function y() {
            --b,
            r.length || b || w("onFinishedAll")
        }
        function w(t, e, o) {
            return !!(t = n[t]) && (t.apply(i, [].slice.call(arguments, 1)),
            !0)
        }
        var b = 0
          , x = -1
          , S = -1
          , C = !1
          , I = "afterLoad"
          , _ = "load"
          , T = "error"
          , E = "img"
          , L = "src"
          , M = "srcset"
          , N = "sizes"
          , D = "background-image";
        "event" === n.bind || s ? c() : o(t).on(_ + "." + l, c)
    }
    function n(n, s) {
        var a = this
          , l = o.extend({}, a.config, s)
          , c = {}
          , u = l.name + "-" + ++r;
        return a.config = function(t, i) {
            return i === e ? l[t] : (l[t] = i,
            a)
        }
        ,
        a.addItems = function(t) {
            return c.a && c.a("string" === o.type(t) ? o(t) : t),
            a
        }
        ,
        a.getItems = function() {
            return c.g ? c.g() : {}
        }
        ,
        a.update = function(t) {
            return c.e && c.e({}, !t),
            a
        }
        ,
        a.force = function(t) {
            return c.f && c.f("string" === o.type(t) ? o(t) : t),
            a
        }
        ,
        a.loadAll = function() {
            return c.e && c.e({
                all: !0
            }, !0),
            a
        }
        ,
        a.destroy = function() {
            return o(l.appendScroll).off("." + u, c.e),
            o(t).off("." + u),
            c = {},
            e
        }
        ,
        i(a, l, n, c, u),
        l.chainable ? n : a
    }
    var o = t.jQuery || t.Zepto
      , r = 0
      , s = !1;
    o.fn.Lazy = o.fn.lazy = function(t) {
        return new n(this,t)
    }
    ,
    o.Lazy = o.lazy = function(t, i, r) {
        if (o.isFunction(i) && (r = i,
        i = []),
        o.isFunction(r)) {
            t = o.isArray(t) ? t : [t],
            i = o.isArray(i) ? i : [i];
            for (var s = n.prototype.config, a = s._f || (s._f = {}), l = 0, c = t.length; l < c; l++)
                (s[t[l]] === e || o.isFunction(s[t[l]])) && (s[t[l]] = r);
            for (var u = 0, d = i.length; u < d; u++)
                a[i[u]] = t[0]
        }
    }
    ,
    n.prototype.config = {
        name: "lazy",
        chainable: !0,
        autoDestroy: !0,
        bind: "load",
        threshold: 500,
        visibleOnly: !1,
        appendScroll: t,
        scrollDirection: "both",
        imageBase: null,
        defaultImage: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
        placeholder: null,
        delay: -1,
        combined: !1,
        attribute: "data-src",
        srcsetAttribute: "data-srcset",
        sizesAttribute: "data-sizes",
        retinaAttribute: "data-retina",
        loaderAttribute: "data-loader",
        imageBaseAttribute: "data-imagebase",
        removeAttribute: !0,
        handledName: "handled",
        loadedName: "loaded",
        effect: "show",
        effectTime: 0,
        enableThrottle: !0,
        throttle: 250,
        beforeLoad: e,
        afterLoad: e,
        onError: e,
        onFinishedAll: e
    },
    o(t).on("load", function() {
        s = !0
    })
}(window),
function() {
    "use strict";
    function t(n) {
        if (!n)
            throw new Error("No options passed to Waypoint constructor");
        if (!n.element)
            throw new Error("No element option passed to Waypoint constructor");
        if (!n.handler)
            throw new Error("No handler option passed to Waypoint constructor");
        this.key = "waypoint-" + e,
        this.options = t.Adapter.extend({}, t.defaults, n),
        this.element = this.options.element,
        this.adapter = new t.Adapter(this.element),
        this.callback = n.handler,
        this.axis = this.options.horizontal ? "horizontal" : "vertical",
        this.enabled = this.options.enabled,
        this.triggerPoint = null,
        this.group = t.Group.findOrCreate({
            name: this.options.group,
            axis: this.axis
        }),
        this.context = t.Context.findOrCreateByElement(this.options.context),
        t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]),
        this.group.add(this),
        this.context.add(this),
        i[this.key] = this,
        e += 1
    }
    var e = 0
      , i = {};
    t.prototype.queueTrigger = function(t) {
        this.group.queueTrigger(this, t)
    }
    ,
    t.prototype.trigger = function(t) {
        this.enabled && this.callback && this.callback.apply(this, t)
    }
    ,
    t.prototype.destroy = function() {
        this.context.remove(this),
        this.group.remove(this),
        delete i[this.key]
    }
    ,
    t.prototype.disable = function() {
        return this.enabled = !1,
        this
    }
    ,
    t.prototype.enable = function() {
        return this.context.refresh(),
        this.enabled = !0,
        this
    }
    ,
    t.prototype.next = function() {
        return this.group.next(this)
    }
    ,
    t.prototype.previous = function() {
        return this.group.previous(this)
    }
    ,
    t.invokeAll = function(t) {
        var e = [];
        for (var n in i)
            e.push(i[n]);
        for (var o = 0, r = e.length; r > o; o++)
            e[o][t]()
    }
    ,
    t.destroyAll = function() {
        t.invokeAll("destroy")
    }
    ,
    t.disableAll = function() {
        t.invokeAll("disable")
    }
    ,
    t.enableAll = function() {
        for (var e in t.Context.refreshAll(),
        i)
            i[e].enabled = !0;
        return this
    }
    ,
    t.refreshAll = function() {
        t.Context.refreshAll()
    }
    ,
    t.viewportHeight = function() {
        return window.innerHeight || document.documentElement.clientHeight
    }
    ,
    t.viewportWidth = function() {
        return document.documentElement.clientWidth
    }
    ,
    t.adapters = [],
    t.defaults = {
        context: window,
        continuous: !0,
        enabled: !0,
        group: "default",
        horizontal: !1,
        offset: 0
    },
    t.offsetAliases = {
        "bottom-in-view": function() {
            return this.context.innerHeight() - this.adapter.outerHeight()
        },
        "right-in-view": function() {
            return this.context.innerWidth() - this.adapter.outerWidth()
        }
    },
    window.Waypoint = t
}(),
function() {
    "use strict";
    function t(o) {
        this.element = o,
        this.Adapter = n.Adapter,
        this.adapter = new this.Adapter(o),
        this.key = "waypoint-context-" + e,
        this.didScroll = !1,
        this.didResize = !1,
        this.oldScroll = {
            x: this.adapter.scrollLeft(),
            y: this.adapter.scrollTop()
        },
        this.waypoints = {
            vertical: {},
            horizontal: {}
        },
        o.waypointContextKey = this.key,
        i[o.waypointContextKey] = this,
        e += 1,
        n.windowContext || (n.windowContext = !0,
        n.windowContext = new t(window)),
        this.createThrottledScrollHandler(),
        this.createThrottledResizeHandler()
    }
    var e = 0
      , i = {}
      , n = window.Waypoint
      , o = window.onload;
    t.prototype.add = function(t) {
        var e = t.options.horizontal ? "horizontal" : "vertical";
        this.waypoints[e][t.key] = t,
        this.refresh()
    }
    ,
    t.prototype.checkEmpty = function() {
        var t = this.Adapter.isEmptyObject(this.waypoints.horizontal)
          , e = this.Adapter.isEmptyObject(this.waypoints.vertical)
          , n = this.element == this.element.window;
        t && e && !n && (this.adapter.off(".waypoints"),
        delete i[this.key])
    }
    ,
    t.prototype.createThrottledResizeHandler = function() {
        function t() {
            e.handleResize(),
            e.didResize = !1
        }
        var e = this;
        this.adapter.on("resize.waypoints", function() {
            e.didResize || (e.didResize = !0,
            n.requestAnimationFrame(t))
        })
    }
    ,
    t.prototype.createThrottledScrollHandler = function() {
        function t() {
            e.handleScroll(),
            e.didScroll = !1
        }
        var e = this;
        this.adapter.on("scroll.waypoints", function() {
            (!e.didScroll || n.isTouch) && (e.didScroll = !0,
            n.requestAnimationFrame(t))
        })
    }
    ,
    t.prototype.handleResize = function() {
        n.Context.refreshAll()
    }
    ,
    t.prototype.handleScroll = function() {
        var t = {}
          , e = {
            horizontal: {
                newScroll: this.adapter.scrollLeft(),
                oldScroll: this.oldScroll.x,
                forward: "right",
                backward: "left"
            },
            vertical: {
                newScroll: this.adapter.scrollTop(),
                oldScroll: this.oldScroll.y,
                forward: "down",
                backward: "up"
            }
        };
        for (var i in e) {
            var n = e[i]
              , o = n.newScroll > n.oldScroll ? n.forward : n.backward;
            for (var r in this.waypoints[i]) {
                var s = this.waypoints[i][r];
                if (null !== s.triggerPoint) {
                    var a = n.oldScroll < s.triggerPoint
                      , l = n.newScroll >= s.triggerPoint;
                    (a && l || !a && !l) && (s.queueTrigger(o),
                    t[s.group.id] = s.group)
                }
            }
        }
        for (var c in t)
            t[c].flushTriggers();
        this.oldScroll = {
            x: e.horizontal.newScroll,
            y: e.vertical.newScroll
        }
    }
    ,
    t.prototype.innerHeight = function() {
        return this.element == this.element.window ? n.viewportHeight() : this.adapter.innerHeight()
    }
    ,
    t.prototype.remove = function(t) {
        delete this.waypoints[t.axis][t.key],
        this.checkEmpty()
    }
    ,
    t.prototype.innerWidth = function() {
        return this.element == this.element.window ? n.viewportWidth() : this.adapter.innerWidth()
    }
    ,
    t.prototype.destroy = function() {
        var t = [];
        for (var e in this.waypoints)
            for (var i in this.waypoints[e])
                t.push(this.waypoints[e][i]);
        for (var n = 0, o = t.length; o > n; n++)
            t[n].destroy()
    }
    ,
    t.prototype.refresh = function() {
        var t, e = this.element == this.element.window, i = e ? void 0 : this.adapter.offset(), o = {};
        for (var r in this.handleScroll(),
        t = {
            horizontal: {
                contextOffset: e ? 0 : i.left,
                contextScroll: e ? 0 : this.oldScroll.x,
                contextDimension: this.innerWidth(),
                oldScroll: this.oldScroll.x,
                forward: "right",
                backward: "left",
                offsetProp: "left"
            },
            vertical: {
                contextOffset: e ? 0 : i.top,
                contextScroll: e ? 0 : this.oldScroll.y,
                contextDimension: this.innerHeight(),
                oldScroll: this.oldScroll.y,
                forward: "down",
                backward: "up",
                offsetProp: "top"
            }
        }) {
            var s = t[r];
            for (var a in this.waypoints[r]) {
                var l, c, u, d, h = this.waypoints[r][a], f = h.options.offset, p = h.triggerPoint, m = 0, g = null == p;
                h.element !== h.element.window && (m = h.adapter.offset()[s.offsetProp]),
                "function" == typeof f ? f = f.apply(h) : "string" == typeof f && (f = parseFloat(f),
                h.options.offset.indexOf("%") > -1 && (f = Math.ceil(s.contextDimension * f / 100))),
                l = s.contextScroll - s.contextOffset,
                h.triggerPoint = Math.floor(m + l - f),
                c = p < s.oldScroll,
                u = h.triggerPoint >= s.oldScroll,
                d = !c && !u,
                !g && c && u ? (h.queueTrigger(s.backward),
                o[h.group.id] = h.group) : !g && d ? (h.queueTrigger(s.forward),
                o[h.group.id] = h.group) : g && s.oldScroll >= h.triggerPoint && (h.queueTrigger(s.forward),
                o[h.group.id] = h.group)
            }
        }
        return n.requestAnimationFrame(function() {
            for (var t in o)
                o[t].flushTriggers()
        }),
        this
    }
    ,
    t.findOrCreateByElement = function(e) {
        return t.findByElement(e) || new t(e)
    }
    ,
    t.refreshAll = function() {
        for (var t in i)
            i[t].refresh()
    }
    ,
    t.findByElement = function(t) {
        return i[t.waypointContextKey]
    }
    ,
    window.onload = function() {
        o && o(),
        t.refreshAll()
    }
    ,
    n.requestAnimationFrame = function(t) {
        (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(t) {
            window.setTimeout(t, 1e3 / 60)
        }
        ).call(window, t)
    }
    ,
    n.Context = t
}(),
function() {
    "use strict";
    function t(t, e) {
        return t.triggerPoint - e.triggerPoint
    }
    function e(t, e) {
        return e.triggerPoint - t.triggerPoint
    }
    function i(t) {
        this.name = t.name,
        this.axis = t.axis,
        this.id = this.name + "-" + this.axis,
        this.waypoints = [],
        this.clearTriggerQueues(),
        n[this.axis][this.name] = this
    }
    var n = {
        vertical: {},
        horizontal: {}
    }
      , o = window.Waypoint;
    i.prototype.add = function(t) {
        this.waypoints.push(t)
    }
    ,
    i.prototype.clearTriggerQueues = function() {
        this.triggerQueues = {
            up: [],
            down: [],
            left: [],
            right: []
        }
    }
    ,
    i.prototype.flushTriggers = function() {
        for (var i in this.triggerQueues) {
            var n = this.triggerQueues[i]
              , o = "up" === i || "left" === i;
            n.sort(o ? e : t);
            for (var r = 0, s = n.length; s > r; r += 1) {
                var a = n[r];
                (a.options.continuous || r === n.length - 1) && a.trigger([i])
            }
        }
        this.clearTriggerQueues()
    }
    ,
    i.prototype.next = function(e) {
        this.waypoints.sort(t);
        var i = o.Adapter.inArray(e, this.waypoints);
        return i === this.waypoints.length - 1 ? null : this.waypoints[i + 1]
    }
    ,
    i.prototype.previous = function(e) {
        this.waypoints.sort(t);
        var i = o.Adapter.inArray(e, this.waypoints);
        return i ? this.waypoints[i - 1] : null
    }
    ,
    i.prototype.queueTrigger = function(t, e) {
        this.triggerQueues[e].push(t)
    }
    ,
    i.prototype.remove = function(t) {
        var e = o.Adapter.inArray(t, this.waypoints);
        e > -1 && this.waypoints.splice(e, 1)
    }
    ,
    i.prototype.first = function() {
        return this.waypoints[0]
    }
    ,
    i.prototype.last = function() {
        return this.waypoints[this.waypoints.length - 1]
    }
    ,
    i.findOrCreate = function(t) {
        return n[t.axis][t.name] || new i(t)
    }
    ,
    o.Group = i
}(),
function() {
    "use strict";
    function t(t) {
        this.$element = e(t)
    }
    var e = window.jQuery
      , i = window.Waypoint;
    e.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function(e, i) {
        t.prototype[i] = function() {
            var t = Array.prototype.slice.call(arguments);
            return this.$element[i].apply(this.$element, t)
        }
    }),
    e.each(["extend", "inArray", "isEmptyObject"], function(i, n) {
        t[n] = e[n]
    }),
    i.adapters.push({
        name: "jquery",
        Adapter: t
    }),
    i.Adapter = t
}(),
function() {
    "use strict";
    function t(t) {
        return function() {
            var i = []
              , n = arguments[0];
            return t.isFunction(arguments[0]) && ((n = t.extend({}, arguments[1])).handler = arguments[0]),
            this.each(function() {
                var o = t.extend({}, n, {
                    element: this
                });
                "string" == typeof o.context && (o.context = t(this).closest(o.context)[0]),
                i.push(new e(o))
            }),
            i
        }
    }
    var e = window.Waypoint;
    window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)),
    window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto))
}();
var INSPIRO = {}
  , $ = jQuery.noConflict();
function decode(t) {
    return t.replace(/[a-zA-Z]/g, function(t) {
        return String.fromCharCode((t <= "Z" ? 90 : 122) >= (t = t.charCodeAt(0) + 13) ? t : t - 26)
    })
}
function openMailer(t, e, i, n) {
    var o = decode(n + "@" + e + "." + i);
    t.setAttribute("href", "mailto:" + o),
    t.setAttribute("onclick", "")
}
!function(t) {
    "use strict";
    var e = t(window)
      , i = t("body")
      , n = (t(".body-inner"),
    t("section"))
      , o = t("#topbar")
      , r = t("#header")
      , s = r.attr("class")
      , a = t("#logo")
      , l = t("#mainMenu")
      , c = t("#mainMenu-trigger a, #mainMenu-trigger button")
      , u = t(".page-menu")
      , d = (t("#slider"),
    t(".inspiro-slider"))
      , h = t(".carousel")
      , f = t(".grid-layout")
      , p = t(".grid-filter");
    e.width();
    if (p = p.length > 0 ? p : t(".page-grid-filter"),
    r.length > 0)
        var m = r.offset().top;
    var g = {
        isMobile: {
            browser: {
                isMobile: function() {
                    return !!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)
                }
            }
        }.browser.isMobile,
        submenuLight: 1 == r.hasClass("submenu-light"),
        menuIsOpen: !1,
        menuOverlayOpened: !1
    };
    t(window).breakpoints({
        breakpoints: [{
            name: "xs",
            width: 0
        }, {
            name: "sm",
            width: 576
        }, {
            name: "md",
            width: 768
        }, {
            name: "lg",
            width: 1025
        }, {
            name: "xl",
            width: 1200
        }]
    });
    var v = t(window).breakpoints("getBreakpoint");
    i.addClass("breakpoint-" + v),
    t(window).bind("breakpoint-change", function(t) {
        i.removeClass("breakpoint-" + t.from),
        i.addClass("breakpoint-" + t.to)
    }),
    t(window).breakpoints("greaterEqualTo", "lg", function() {
        i.addClass("b--desktop"),
        i.removeClass("b--responsive")
    }),
    t(window).breakpoints("lessThan", "lg", function() {
        i.removeClass("b--desktop"),
        i.addClass("b--responsive")
    }),
    INSPIRO.core = {
        functions: function() {
            INSPIRO.core.scrollTop(),
            INSPIRO.core.rtlStatus(),
            INSPIRO.core.rtlStatusActivate(),
            INSPIRO.core.equalize(),
            INSPIRO.core.customHeight(),
            INSPIRO.core.darkTheme()
        },
        scrollTop: function() {
            var n = t("#scrollTop");
            if (n.length > 0) {
                var o = i.attr("data-offset") || 400;
                e.scrollTop() > o ? i.hasClass("frame") ? n.css({
                    bottom: "46px",
                    opacity: 1,
                    "z-index": 199
                }) : n.css({
                    bottom: "26px",
                    opacity: 1,
                    "z-index": 199
                }) : n.css({
                    bottom: "16px",
                    opacity: 0
                }),
                n.off("click").on("click", function() {
                    return t("body,html").stop(!0).animate({
                        scrollTop: 0
                    }, 1e3, "easeInOutExpo"),
                    !1
                })
            }
        },
        rtlStatus: function() {
            return "rtl" == t("html").attr("dir")
        },
        rtlStatusActivate: function() {
            1 == INSPIRO.core.rtlStatus() && t("head").append('<link rel="stylesheet" type="text/css" href="css/rtl.css">')
        },
        equalize: function() {
            var e = t(".equalize");
            e.length > 0 && e.each(function() {
                var e = t(this)
                  , i = e.find(e.attr("data-equalize-item")) || "> div"
                  , n = 0;
                i.each(function() {
                    t(this).outerHeight(!0) > n && (n = t(this).outerHeight(!0))
                }),
                i.height(n)
            })
        },
        customHeight: function(e) {
            var i = t(".custom-height");
            i.length > 0 && i.each(function() {
                var i = t(this)
                  , n = i.attr("data-height") || 400
                  , o = i.attr("data-height-lg") || n
                  , r = i.attr("data-height-md") || o
                  , s = i.attr("data-height-sm") || r
                  , a = i.attr("data-height-xs") || s;
                function l(e) {
                    switch (e && (i = e),
                    t(window).breakpoints("getBreakpoint")) {
                    case "xs":
                        i.height(a);
                        break;
                    case "sm":
                        i.height(s);
                        break;
                    case "md":
                        i.height(r);
                        break;
                    case "lg":
                        i.height(o);
                        break;
                    case "xl":
                        i.height(n)
                    }
                }
                l(e),
                t(window).resize(function() {
                    setTimeout(function() {
                        l(e)
                    }, 100)
                })
            })
        },
        darkTheme: function(e) {
            i.hasClass("dark") && t("[data-dark-src]").each(function() {
                var e = t(this)
                  , i = e.attr("data-dark-src");
                i && e.attr("src", i)
            })
        }
    },
    INSPIRO.header = {
        functions: function() {
            INSPIRO.header.logoStatus(),
            INSPIRO.header.stickyHeader(),
            INSPIRO.header.topBar(),
            INSPIRO.header.search(),
            INSPIRO.header.mainMenu(),
            INSPIRO.header.mainMenuOverlay(),
            INSPIRO.header.pageMenu(),
            INSPIRO.header.sidebarOverlay(),
            INSPIRO.header.dotsMenu(),
            INSPIRO.header.onepageMenu()
        },
        logoStatus: function(e) {
            var i = a.find(t(".logo-default"))
              , n = a.find(t(".logo-dark"))
              , o = a.find(".logo-fixed")
              , s = a.find(".logo-responsive");
            r.hasClass("header-sticky") && o.length > 0 ? (i.css("display", "none"),
            n.css("display", "none"),
            s.css("display", "none"),
            o.css("display", "block")) : (i.removeAttr("style"),
            n.removeAttr("style"),
            s.removeAttr("style"),
            o.removeAttr("style")),
            t(window).breakpoints("lessThan", "lg", function() {
                s.length > 0 && (i.css("display", "none"),
                n.css("display", "none"),
                o.css("display", "none"),
                s.css("display", "block"))
            })
        },
        stickyHeader: function() {
            var i = t(this)
              , n = i.attr("data-shrink") || 0
              , o = i.attr("data-sticky-active") || 200
              , a = e.scrollTop();
            r.hasClass("header-modern") && (n = 300),
            t(window).breakpoints("greaterEqualTo", "lg", function() {
                r.is(".header-disable-fixed") || (a > m + n ? (r.addClass("header-sticky"),
                a > m + o && (r.addClass("sticky-active"),
                g.submenuLight && (r.removeClass("dark"),
                !0),
                INSPIRO.header.logoStatus())) : (r.removeClass().addClass(s),
                INSPIRO.header.logoStatus()))
            }),
            t(window).breakpoints("lessThan", "lg", function() {
                "true" == r.attr("data-responsive-fixed") && (a > m + n ? (r.addClass("header-sticky"),
                a > m + o && (r.addClass("sticky-active"),
                g.submenuLight && (r.removeClass("dark"),
                !0),
                INSPIRO.header.logoStatus())) : (r.removeClass().addClass(s),
                INSPIRO.header.logoStatus()))
            })
        },
        topBar: function() {
            o.length > 0 && t("#topbar .topbar-dropdown .topbar-form").each(function(i, n) {
                e.width() - (t(n).width() + t(n).offset().left) < 0 && t(n).addClass("dropdown-invert")
            })
        },
        search: function() {
            var e = t("#search");
            if (e.length > 0) {
                var n = t("#btn-search")
                  , o = t("#btn-search-close")
                  , r = e.find(".form-control");
                function s() {
                    i.removeClass("search-open"),
                    r.value = ""
                }
                n.on("click", function() {
                    return i.addClass("search-open"),
                    r.focus(),
                    !1
                }),
                o.on("click", function() {
                    return s(),
                    !1
                }),
                document.addEventListener("keyup", function(t) {
                    27 == t.keyCode && s()
                })
            }
        },
        mainMenu: function() {
            if (l.length > 0) {
                var n, o = t("#mainMenu nav > ul > li.dropdown > a, .dropdown-submenu > a, .dropdown-submenu > span, .page-menu nav > ul > li.dropdown > a"), s = t("#mainMenu-trigger a, #mainMenu-trigger button"), a = !1;
                s.on("click", function(o) {
                    var s = t(this);
                    o.preventDefault(),
                    t(window).breakpoints("lessThan", "lg", function() {
                        g.menuIsOpen ? void (a || (a = !0,
                        g.menuIsOpen = !1,
                        INSPIRO.header.logoStatus(),
                        l.animate({
                            "min-height": 0
                        }, {
                            start: function() {
                                l.removeClass("menu-animate")
                            },
                            done: function() {
                                i.removeClass("mainMenu-open"),
                                s.removeClass("toggle-active"),
                                g.submenuLight && n && r.addClass("dark")
                            },
                            duration: 500,
                            easing: "easeInOutQuart",
                            complete: function() {
                                a = !1
                            }
                        }))) : void (a || (a = !0,
                        g.menuIsOpen = !0,
                        g.submenuLight && (r.removeClass("dark"),
                        n = !0),
                        s.addClass("toggle-active"),
                        i.addClass("mainMenu-open"),
                        INSPIRO.header.logoStatus(),
                        l.animate({
                            "min-height": e.height()
                        }, {
                            duration: 500,
                            easing: "easeInOutQuart",
                            start: function() {
                                setTimeout(function() {
                                    l.addClass("menu-animate")
                                }, 300)
                            },
                            complete: function() {
                                a = !1
                            }
                        })))
                    })
                }),
                o.on("click", function(e) {
                    t(this).parent("li").siblings().removeClass("hover-active"),
                    t(this).parent("li").toggleClass("hover-active"),
                    e.stopPropagation(),
                    e.preventDefault()
                }),
                i.on("click", function(t) {
                    l.find(".hover-active").removeClass("hover-active")
                }),
                t(window).breakpoints("greaterEqualTo", "lg", function() {
                    var i = t("nav > ul > li:last-child")
                      , n = t("nav > ul > li:last-child > ul")
                      , o = (n.width(),
                    i.width(),
                    t("nav > ul > li").find(".dropdown-menu"));
                    o.css("display", "block"),
                    t(".dropdown:not(.mega-menu-item) ul ul").each(function(i, n) {
                        e.width() - (t(n).width() + t(n).offset().left) < 0 && t(n).addClass("menu-invert")
                    }),
                    e.width() - (n.width() + i.offset().left) < 0 && n.addClass("menu-last"),
                    o.css("display", "")
                })
            }
        },
        mainMenuOverlay: function() {},
        pageMenu: function() {
            u.length > 0 && u.each(function() {
                t(this).find("#pageMenu-trigger").on("click", function() {
                    u.toggleClass("page-menu-active"),
                    u.toggleClass("items-visible")
                })
            })
        },
        sidebarOverlay: function() {
            var e = t("#side-panel");
            e.length > 0 && (e.css("opacity", 1),
            t("#close-panel").on("click", function() {
                i.removeClass("side-panel-active"),
                t("#side-panel-trigger").removeClass("toggle-active")
            }))
        },
        dotsMenu: function() {
            var e = t("#dotsMenu")
              , i = e.find("ul > li > a");
            e.length > 0 && (i.on("click", function() {
                return i.parent("li").removeClass("current"),
                t(this).parent("li").addClass("current"),
                !1
            }),
            i.parents("li").removeClass("current"),
            e.find('a[href="#' + INSPIRO.header.currentSection() + '"]').parent("li").addClass("current"))
        },
        onepageMenu: function() {
            if (l.hasClass("menu-one-page")) {
                t(window).on("scroll", function() {
                    var t = INSPIRO.header.currentSection();
                    l.find("nav > ul > li > a").parents("li").removeClass("current"),
                    l.find('nav > ul > li > a[href="#' + t + '"]').parent("li").addClass("current")
                })
            }
        },
        currentSection: function() {
            var i = "body";
            return n.each(function() {
                var n = t(this)
                  , o = n.attr("id");
                n.offset().top - e.height() / 3 < e.scrollTop() && n.offset().top + n.height() - e.height() / 3 > e.scrollTop() && (i = o)
            }),
            i
        }
    },
    INSPIRO.slider = {
        functions: function() {
            INSPIRO.slider.inspiroSlider(),
            INSPIRO.slider.carousel()
        },
        inspiroSlider: function() {
            if (d.length > 0) {
                if (void 0 === t.fn.flickity)
                    return INSPIRO.elements.notification("Warning", "jQuery flickity slider plugin is missing in plugins.js file.", "danger"),
                    !0;
                var i = "fadeInUp";
                function n(e) {
                    var n = e;
                    n.each(function() {
                        var e = t(this)
                          , i = "600ms";
                        t(this).attr("data-animate-duration") && (i = t(this).attr("data-animate-duration") + "ms"),
                        e.css({
                            opacity: 0
                        }),
                        t(this).css("animation-duration", i)
                    }),
                    n.each(function(e) {
                        var n = t(this)
                          , o = n.attr("data-caption-delay") || 350 * e + 1e3
                          , r = n.attr("data-caption-animate") || i;
                        setTimeout(function() {
                            n.css({
                                opacity: 1
                            }),
                            n.addClass(r)
                        }, o)
                    })
                }
                function s(e) {
                    e.each(function(e) {
                        var n = (e = t(this)).attr("data-caption-animate") || i;
                        e.removeClass(n),
                        e.removeAttr("style")
                    })
                }
                function a(t) {
                    var e = t.find(".slide.is-selected");
                    e.hasClass("kenburns") && setTimeout(function() {
                        e.find(".kenburns-bg").addClass("kenburns-bg-animate")
                    }, 1500)
                }
                function l(i, n) {
                    r.outerHeight(),
                    o.outerHeight();
                    var s = e.height()
                      , a = (i.height(),
                    i.find(".slide"))
                      , l = (i.hasClass("slider-fullscreen"),
                    i.hasClass("slider-halfscreen"),
                    r.attr("data-transparent"),
                    i.attr("data-height"))
                      , c = (i.attr("data-height-xs"),
                    i.find(".container").first().outerHeight());
                    if (c >= s) {
                        !0;
                        var u = c;
                        i.css("min-height", u + 100),
                        a.css("min-height", u + 100),
                        i.find(".flickity-viewport").css("min-height", u + 100)
                    }
                    function d(t) {
                        "null" == t ? (i.css("height", ""),
                        a.css("height", ""),
                        i.find(".flickity-viewport").css("height", "")) : (i.css("height", t),
                        a.css("height", t),
                        i.find(".flickity-viewport").css("height", t))
                    }
                    d("null"),
                    l && t(window).breakpoints("greaterEqualTo", "lg", function() {
                        d(l + "px")
                    })
                }
                d.each(function() {
                    var e = t(this);
                    e.options = {
                        cellSelector: e.attr("data-item") || !1,
                        prevNextButtons: 0 != e.data("arrows"),
                        pageDots: 0 != e.data("dots"),
                        fade: 1 == e.data("fade"),
                        draggable: 1 == e.data("drag"),
                        freeScroll: 1 == e.data("free-scroll"),
                        wrapAround: 0 != e.data("loop"),
                        groupCells: 1 == e.data("group-cells"),
                        autoPlay: e.attr("data-autoplay") || 7e3,
                        pauseAutoPlayOnHover: 1 == e.data("hoverpause"),
                        adaptiveHeight: (e.data("adaptive-height"),
                        !1),
                        asNavFor: e.attr("data-navigation") || !1,
                        selectedAttraction: e.attr("data-attraction") || .07,
                        friction: e.attr("data-friction") || .9,
                        initialIndex: e.attr("data-initial-index") || 0,
                        accessibility: 1 == e.data("accessibility"),
                        setGallerySize: (e.data("gallery-size"),
                        !1),
                        resize: (e.data("resize"),
                        !1),
                        cellAlign: e.attr("data-align") || "left",
                        playWholeVideo: 0 != e.attr("data-play-whole-video")
                    },
                    e.find(".slide").each(function() {
                        if (t(this).hasClass("kenburns")) {
                            var e = t(this)
                              , i = e.css("background-image").replace(/.*\s?url\([\'\"]?/, "").replace(/[\'\"]?\).*/, "");
                            e.attr("data-bg-image") && (i = e.attr("data-bg-image")),
                            e.prepend('<div class="kenburns-bg" style="background-image:url(' + i + ')"></div>')
                        }
                    }),
                    e.find(".slide video").each(function() {
                        this.pause()
                    }),
                    e.find(".slide").length <= 1 && (e.options.prevNextButtons = !1,
                    e.options.pageDots = !1),
                    t(window).breakpoints("lessThan", "lg", function() {
                        e.options.draggable = !0
                    }),
                    t.isNumeric(e.options.autoPlay) || 0 == e.options.autoPlay || (e.options.autoPlay = Number(7e3));
                    var i = e.flickity({
                        cellSelector: e.options.cellSelector,
                        prevNextButtons: e.options.prevNextButtons,
                        pageDots: e.options.pageDots,
                        fade: e.options.fade,
                        draggable: e.options.draggable,
                        freeScroll: e.options.freeScroll,
                        wrapAround: e.options.wrapAround,
                        groupCells: e.options.groupCells,
                        autoPlay: Number(e.options.autoPlay),
                        pauseAutoPlayOnHover: e.options.pauseAutoPlayOnHover,
                        adaptiveHeight: e.options.adaptiveHeight,
                        asNavFor: e.options.asNavFor,
                        selectedAttraction: Number(e.options.selectedAttraction),
                        friction: e.options.friction,
                        initialIndex: e.options.initialIndex,
                        accessibility: e.options.accessibility,
                        setGallerySize: e.options.setGallerySize,
                        resize: e.options.resize,
                        cellAlign: e.options.cellAlign,
                        rightToLeft: INSPIRO.core.rtlStatus(),
                        on: {
                            ready: function(t) {
                                var i = e.find(".slide.is-selected .slide-captions > *");
                                l(e),
                                a(e),
                                n(i),
                                setTimeout(function() {
                                    e.find(".slide video").each(function(t, e) {
                                        e.pause(),
                                        e.currentTime = 0
                                    })
                                }, 700)
                            }
                        }
                    })
                      , o = i.data("flickity");
                    i.on("change.flickity", function() {
                        var t = e.find(".slide.is-selected .slide-captions > *");
                        s(t),
                        setTimeout(function() {
                            !function(t) {
                                t.find(".slide:not(.is-selected)").find(".kenburns-bg").removeClass("kenburns-bg-animate")
                            }(e)
                        }, 500),
                        function(t) {
                            t.find(".slide.is-selected").hasClass("slide-dark") ? r.removeClass("dark").addClass("dark-removed") : !r.hasClass("sticky-active") && r.hasClass("dark-removed") && r.addClass("dark").removeClass("dark-removed")
                        }(e),
                        a(e),
                        n(t),
                        e.find(".slide video").each(function(t, e) {
                            e.currentTime = 0
                        })
                    }),
                    i.on("select.flickity", function() {
                        INSPIRO.elements.backgroundImage();
                        var t = e.find(".slide.is-selected .slide-captions > *");
                        l(e),
                        a(e),
                        n(t);
                        var i = o.selectedElement.querySelector("video");
                        i ? (i.play(),
                        o.options.autoPlay = Number(1e3 * i.duration)) : o.options.autoPlay = Number(e.options.autoPlay)
                    }),
                    i.on("dragStart.flickity", function() {
                        s(e.find(".slide:not(.is-selected) .slide-captions > *"))
                    }),
                    t(window).resize(function() {
                        l(e),
                        e.flickity("reposition")
                    })
                })
            }
        },
        carouselAjax: function() {
            if (void 0 === t.fn.flickity)
                return INSPIRO.elements.notification("Warning", "jQuery flickity plugin is missing in plugins.js file.", "danger"),
                !0;
            var e = t(".carousel")
              , i = t(e).imagesLoaded(function() {
                i.flickity({
                    adaptiveHeight: !1,
                    wrapAround: !0,
                    cellAlign: "left",
                    resize: !0
                }),
                e.addClass("carousel-loaded")
            })
        },
        carousel: function(e) {
            if (e && (h = e),
            h.length > 0) {
                if (void 0 === t.fn.flickity)
                    return INSPIRO.elements.notification("Warning", "jQuery flickity plugin is missing in plugins.js file.", "danger"),
                    !0;
                h.each(function() {
                    var e, i, n = t(this);
                    function o() {
                        switch (t(window).breakpoints("getBreakpoint")) {
                        case "xs":
                            e = Number(n.options.itemsXs);
                            break;
                        case "sm":
                            e = Number(n.options.itemsSm);
                            break;
                        case "md":
                            e = Number(n.options.itemsMd);
                            break;
                        case "lg":
                            e = Number(n.options.itemsLg);
                            break;
                        case "xl":
                            e = Number(n.options.items)
                        }
                    }
                    if (n.options = {
                        containerWidth: n.width(),
                        items: n.attr("data-items") || 4,
                        itemsLg: n.attr("data-items-lg"),
                        itemsMd: n.attr("data-items-md"),
                        itemsSm: n.attr("data-items-sm"),
                        itemsXs: n.attr("data-items-xs"),
                        margin: n.attr("data-margin") || 10,
                        cellSelector: n.attr("data-item") || !1,
                        prevNextButtons: 0 != n.data("arrows"),
                        pageDots: 0 != n.data("dots"),
                        fade: 1 == n.data("fade"),
                        draggable: 0 != n.data("drag"),
                        freeScroll: 1 == n.data("free-scroll"),
                        wrapAround: 0 != n.data("loop"),
                        groupCells: 1 == n.data("group-cells"),
                        autoPlay: n.attr("data-autoplay") || 5e3,
                        pauseAutoPlayOnHover: 0 != n.data("hover-pause"),
                        asNavFor: n.attr("data-navigation") || !1,
                        lazyLoad: 1 == n.data("lazy-load"),
                        initialIndex: n.attr("data-initial-index") || 0,
                        accessibility: 1 == n.data("accessibility"),
                        adaptiveHeight: 1 == n.data("adaptive-height"),
                        autoWidth: 1 == n.data("auto-width"),
                        setGallerySize: 0 != n.data("gallery-size"),
                        resize: 0 != n.data("resize"),
                        cellAlign: n.attr("data-align") || "left",
                        rightToLeft: INSPIRO.core.rtlStatus()
                    },
                    n.options.itemsLg = n.options.itemsLg || Math.min(Number(n.options.items), Number(4)),
                    n.options.itemsMd = n.options.itemsMd || Math.min(Number(n.options.itemsLg), Number(3)),
                    n.options.itemsSm = n.options.itemsSm || Math.min(Number(n.options.itemsMd), Number(2)),
                    n.options.itemsXs = n.options.itemsXs || Math.min(Number(n.options.itemsSm), Number(1)),
                    o(),
                    n.find("> *").wrap('<div class="polo-carousel-item">'),
                    n.hasClass("custom-height")) {
                        n.options.setGallerySize = !1,
                        INSPIRO.core.customHeight(n),
                        INSPIRO.core.customHeight(n.find(".polo-carousel-item"));
                        var r = !0
                    }
                    1 !== Number(n.options.items) ? n.options.autoWidth || r ? n.find(".polo-carousel-item").css({
                        "padding-right": n.options.margin + "px"
                    }) : (i = (n.options.containerWidth + Number(n.options.margin)) / e,
                    n.find(".polo-carousel-item").css({
                        width: i,
                        "padding-right": n.options.margin + "px"
                    })) : n.find(".polo-carousel-item").css({
                        width: "100%",
                        "padding-right": "0 !important;"
                    }),
                    (n.options.autoWidth || r) && (n.options.cellAlign = "center"),
                    "false" == n.options.autoPlay && (n.options.autoPlay = !1),
                    t(n).flickity({
                        cellSelector: n.options.cellSelector,
                        prevNextButtons: n.options.prevNextButtons,
                        pageDots: n.options.pageDots,
                        fade: n.options.fade,
                        draggable: n.options.draggable,
                        freeScroll: n.options.freeScroll,
                        wrapAround: n.options.wrapAround,
                        groupCells: n.options.groupCells,
                        autoPlay: n.options.autoPlay,
                        pauseAutoPlayOnHover: n.options.pauseAutoPlayOnHover,
                        adaptiveHeight: n.options.adaptiveHeight,
                        asNavFor: n.options.asNavFor,
                        initialIndex: n.options.initialIndex,
                        accessibility: n.options.accessibility,
                        setGallerySize: n.options.setGallerySize,
                        resize: n.options.resize,
                        cellAlign: n.options.cellAlign,
                        rightToLeft: n.options.rightToLeft,
                        contain: !0
                    }),
                    n.addClass("carousel-loaded"),
                    n.hasClass("custom-height") && INSPIRO.core.customHeight(n),
                    1 !== Number(n.options.items) && t(window).on("resize", function() {
                        setTimeout(function() {
                            o(),
                            i = (n.width() + Number(n.options.margin)) / e,
                            n.options.autoWidth || r ? n.find(".polo-carousel-item").css({
                                "padding-right": n.options.margin + "px"
                            }) : n.hasClass("custom-height") ? (INSPIRO.core.customHeight(n.find(".polo-carousel-item")),
                            n.find(".polo-carousel-item").css({
                                width: i,
                                "padding-right": n.options.margin + "px"
                            })) : n.find(".polo-carousel-item").css({
                                width: i,
                                "padding-right": n.options.margin + "px"
                            }),
                            n.find(".flickity-slider").css({
                                "margin-right": -n.options.margin / e + "px"
                            }),
                            n.flickity("reposition")
                        }, 100)
                    })
                })
            }
        }
    },
    INSPIRO.elements = {
        functions: function() {
            INSPIRO.elements.naTo(),
            INSPIRO.elements.morphext(),
            INSPIRO.elements.buttons(),
            INSPIRO.elements.accordion(),
            INSPIRO.elements.animations(),
            INSPIRO.elements.parallax(),
            INSPIRO.elements.backgroundImage(),
            INSPIRO.elements.shapeDivider(),
            INSPIRO.elements.responsiveVideos(),
            INSPIRO.elements.counters(),
            INSPIRO.elements.countdownTimer(),
            INSPIRO.elements.progressBar(),
            INSPIRO.elements.pieChart(),
            INSPIRO.elements.maps(),
            INSPIRO.elements.gridLayout(),
            INSPIRO.elements.tooltip(),
            INSPIRO.elements.popover(),
            INSPIRO.elements.magnificPopup(),
            INSPIRO.elements.yTPlayer(),
            INSPIRO.elements.vimeoPlayer(),
            INSPIRO.elements.modal(),
            INSPIRO.elements.sidebarFixed(),
            INSPIRO.elements.clipboard(),
            INSPIRO.elements.bootstrapSwitch(),
            INSPIRO.elements.countdown(),
            INSPIRO.elements.other(),
            INSPIRO.elements.videoBackground(),
            INSPIRO.elements.forms(),
            INSPIRO.elements.formValidation(),
            INSPIRO.elements.formAjaxProcessing(),
            INSPIRO.elements.wizard()
        },
        forms: function() {
            var e = t(".show-hide-password");
            e.length > 0 && e.each(function() {
                var e = t(this)
                  , i = e.find(".input-group-append i")
                  , n = e.children("input");
                e.find(".input-group-append i").css({
                    cursor: "pointer"
                }),
                i.on("click", function(t) {
                    t.preventDefault(),
                    "text" == e.children("input").attr("type") ? (n.attr("type", "password"),
                    i.removeClass("icon-eye11"),
                    i.addClass("icon-eye-off")) : "password" == e.children("input").attr("type") && (n.attr("type", "text"),
                    i.addClass("icon-eye11"),
                    i.removeClass("icon-eye-off"))
                })
            })
        },
        formValidation: function() {
            var t = document.getElementsByClassName("needs-validation");
            Array.prototype.filter.call(t, function(t) {
                t.addEventListener("submit", function(e) {
                    !1 === t.checkValidity() && (e.preventDefault(),
                    e.stopPropagation()),
                    t.classList.add("was-validated")
                }, !1)
            })
        },
        formAjaxProcessing: function() {
            var e = t(".widget-contact-form, .ajax-form");
            e.length > 0 && e.each(function() {
                var e = t(this)
                  , i = e.attr("data-success-message") || "We have <strong>successfully</strong> received your Message and will get Back to you as soon as possible."
                  , n = e.attr("data-success-page")
                  , o = e.find("button#form-submit")
                  , r = o.html();
                Array.prototype.filter.call(e, function(t) {
                    t.addEventListener("submit", function(e) {
                        return !1 === t[0].checkValidity() && (e.preventDefault(),
                        e.stopPropagation()),
                        t.classList.add("was-validated"),
                        !1
                    }, !1)
                });
                e.submit(function(s) {
                    s.preventDefault();
                    var a = t(this).attr("action")
                      , l = t(this).attr("method")
                      , c = t(this).serialize();
                    !1 === e[0].checkValidity() ? (s.stopPropagation(),
                    e.addClass("was-validated")) : (t(e).removeClass("was-validated"),
                    o.html('<i class="icon-loader fa-spin"> </i> Sending...'),
                    t.ajax({
                        url: a,
                        type: l,
                        data: c,
                        success: function(s) {
                            if ("success" == s.response)
                                e.find(".g-recaptcha").children("div").length > 0 && grecaptcha.reset(),
                                t(e)[0].reset(),
                                o.html(r),
                                n ? window.location.href = n : t.notify({
                                    message: i
                                }, {
                                    type: "success"
                                });
                            else {
                                t.notify({
                                    message: e.attr("data-error-message") || s.message
                                }, {
                                    type: "danger"
                                });
                                setTimeout(function() {
                                    o.html(r)
                                }, 1e3)
                            }
                        }
                    }))
                })
            })
        },
        wizard: function() {},
        other: function(i) {
            t(function() {
                t(".lazy").Lazy({
                    afterLoad: function(t) {
                        t.addClass("img-loaded")
                    }
                })
            }),
            t(".toggle-item").length > 0 && t(".toggle-item").each(function() {
                var e = t(this)
                  , i = e.attr("data-class")
                  , n = e.attr("data-target");
                e.on("click", function() {
                    return i && (n ? t(n).toggleClass(i) : e.toggleClass(i)),
                    e.toggleClass("toggle-active"),
                    !1
                })
            });
            var n = t(".p-dropdown");
            n.length > 0 && n.each(function() {
                var i = t(this);
                e.width() / 2 > i.offset().left && i.addClass("p-dropdown-invert")
            })
        },
        naTo: function() {
            t("a.scroll-to, #dotsMenu > ul > li > a, .menu-one-page nav > ul > li > a").on("click", function() {
                var e = 0
                  , i = 0;
                t(window).breakpoints("lessThan", "lg", function() {
                    g.menuIsOpen && c.trigger("click"),
                    !0 === r.attr("data-responsive-fixed") && (i = r.height())
                }),
                t(window).breakpoints("greaterEqualTo", "lg", function() {
                    r.length > 0 && (i = r.height())
                }),
                t(".dashboard").length > 0 && (e = 30);
                var n = t(this);
                return t("html, body").stop(!0, !1).animate({
                    scrollTop: t(n.attr("href")).offset().top - (i + e)
                }, 1500, "easeInOutExpo"),
                !1
            })
        },
        morphext: function() {
            var e = t(".text-rotator");
            if (e.length > 0) {
                if (void 0 === t.fn.Morphext)
                    return INSPIRO.elements.notification("Warning", "jQuery Morphext plugin is missing in plugins.js file.", "danger"),
                    !0;
                e.each(function() {
                    var e = t(this);
                    e.options = {
                        animation: e.attr("data-animation") || "fadeIn",
                        separator: e.attr("data-separator") || ",",
                        speed: e.attr("data-speed") || 2e3,
                        height: e.height()
                    },
                    e.css({
                        "min-height": e.options.height
                    }),
                    e.Morphext({
                        animation: e.options.animation,
                        separator: e.options.separator,
                        speed: Number(e.options.speed)
                    })
                })
            }
        },
        buttons: function() {
            t(".btn-slide[data-width]") && t(".btn.btn-slide[data-width]").each(function() {
                var e, i = t(this), n = i.attr("data-width");
                switch (!0) {
                case i.hasClass("btn-lg"):
                    e = "60";
                    break;
                case i.hasClass("btn-sm"):
                    e = "36";
                    break;
                case i.hasClass("btn-xs"):
                    e = "28";
                    break;
                default:
                    e = "48"
                }
                i.hover(function() {
                    t(this).css("width", n + "px")
                }, function() {
                    t(this).css("width", e + "px")
                })
            })
        },
        accordion: function() {
            var e = t(".ac-item");
            e.length && (e.each(function() {
                var e = t(this);
                e.hasClass("ac-active") ? e.addClass("ac-active") : e.find(".ac-content").hide()
            }),
            t(".ac-title").on("click", function(e) {
                var i = t(this)
                  , n = i.parents(".ac-item")
                  , o = n.parents(".accordion");
                return n.hasClass("ac-active") ? o.hasClass("toggle") ? (n.removeClass("ac-active"),
                i.next(".ac-content").slideUp()) : (o.find(".ac-item").removeClass("ac-active"),
                o.find(".ac-content").slideUp()) : (o.hasClass("toggle") || (o.find(".ac-item").removeClass("ac-active"),
                o.find(".ac-content").slideUp("fast")),
                n.addClass("ac-active"),
                i.next(".ac-content").slideToggle("fast")),
                e.preventDefault(),
                !1
            }))
        },
        animations: function() {
            var e = t("[data-animate]");
            if (e.length > 0) {
                if ("undefined" == typeof Waypoint)
                    return INSPIRO.elements.notification("Warning", "jQuery Waypoint plugin is missing in plugins.js file.", "danger"),
                    !0;
                e.each(function() {
                    var e = t(this);
                    e.addClass("animated"),
                    e.options = {
                        animation: e.attr("data-animate") || "fadeIn",
                        delay: e.attr("data-animate-delay") || 200,
                        direction: ~e.attr("data-animate").indexOf("Out") ? "back" : "forward",
                        offsetX: e.attr("data-animate-offsetX") || 0,
                        offsetY: e.attr("data-animate-offsetY") || -100
                    },
                    "forward" == e.options.direction ? new Waypoint({
                        element: e,
                        handler: function() {
                            setTimeout(function() {
                                e.addClass(e.options.animation + " visible")
                            }, e.options.delay);
                            this.destroy()
                        },
                        offset: "100%"
                    }) : (e.addClass("visible"),
                    e.on("click", function() {
                        return e.addClass(e.options.animation),
                        !1
                    })),
                    e.parents(".demo-play-animations").length && e.on("click", function() {
                        e.removeClass(e.options.animation);
                        setTimeout(function() {
                            e.addClass(e.options.animation)
                        }, 50);
                        return !1
                    })
                })
            }
        },
        parallax: function() {
            var e = t("[data-bg-parallax]");
            if (e.length > 0) {
                if (void 0 === t.fn.scrolly)
                    return INSPIRO.elements.notification("Warning", "jQuery scrolly plugin is missing in plugins.js file.", "danger"),
                    !0;
                e.each(function() {
                    var e = t(this)
                      , n = e.attr("data-bg-parallax")
                      , o = e.attr("data-velocity") || "-.140";
                    e.prepend('<div class="parallax-container" data-lazy-background="' + n + '"  data-velocity="' + o + '" style="background: url(' + n + ')"></div>'),
                    t(".parallax-container").lazy({
                        attribute: "data-lazy-background",
                        afterLoad: function(t) {
                            e.find(".parallax-container").addClass("img-loaded")
                        }
                    }),
                    i.hasClass("breakpoint-lg") || i.hasClass("breakpoint-xl") ? e.find(".parallax-container").scrolly({
                        bgParallax: !0
                    }) : e.find(".parallax-container").addClass("parallax-responsive")
                })
            }
        },
        backgroundImage: function() {
            var e = t("[data-bg-image]");
            e.length > 0 && e.each(function() {
                var e = t(this)
                  , i = e.attr("data-bg-image");
                e.attr("data-lazy-background", i),
                e.lazy({
                    attribute: "data-lazy-background",
                    afterLoad: function(t) {
                        e.addClass("bg-loaded")
                    }
                })
            })
        },
        shapeDivider: function() {
            t(".shape-divider").each(function() {
                var e = t(this);
                switch (e.options = {
                    style: e.attr("data-style") || 1,
                    color: e.attr("data-color") || "#ffffff",
                    opacity: e.attr("data-opacity") || "1",
                    zIndex: e.attr("data-zIndex") || "0",
                    height: e.attr("data-height") || 210,
                    prefix: "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MzAg"
                },
                e.options.style) {
                case "1":
                    e.options.style = e.options.prefix + "MTI1LjcyIj48dGl0bGU+QXNzZXQgMTc0PC90aXRsZT48cGF0aCBkPSJNMzk1LDk5LjM3Yy01Ny40MywxMC4xNy0xMjQuMjctOC4wNi0xNzYuOC0xMS43MnEzLjkzLjY0LDgsMS40MWM1MC44MSw2LDExMy4zLDI0LjA4LDE2OC43NiwxNC4yNkM0NjgsOTAuNDIsNTE5LjYsMTEuODgsNjMwLDguOVYwQzUwNS40Miw0LDQ2OCw4Ni40NywzOTUsOTkuMzdaIiBzdHlsZT0iZmlsbDojZmZmO29wYWNpdHk6MC4zMDAwMDAwMDAwMDAwMDAwNCIvPjxwYXRoIGQ9Ik0yMjYuMjUsODlDMjczLjg4LDk4LDMzOC4xNCwxMTkuMjksMzk1LDEwOS4yM2M3Mi45My0xMi45MSwxMjYuNjEtNzcuNDYsMjM1LTczLjQ4VjguODZjLTExMC40LDMtMTYyLDgxLjUxLTIzNSw5NC40MkMzMzkuNTUsMTEzLjEsMjc3LjA2LDk1LjA3LDIyNi4yNSw4OVoiIHN0eWxlPSJmaWxsOiNmZmY7b3BhY2l0eTowLjYzIi8+PHBhdGggZD0iTTYwLjgyLDEyMi44OCw2MiwxMjNhMzEuNDksMzEuNDksMCwwLDAsOS4zNC0uNjRBMTAxLjI2LDEwMS4yNiwwLDAsMSw2MC44MiwxMjIuODhaIiBzdHlsZT0iZmlsbDojZmZmIi8+PHBhdGggZD0iTTYwLjgyLDEyMi44OCw2MiwxMjNhMzEuNDksMzEuNDksMCwwLDAsOS4zNC0uNjRBMTAxLjI2LDEwMS4yNiwwLDAsMSw2MC44MiwxMjIuODhaIiBzdHlsZT0iZmlsbDojZmZmO29wYWNpdHk6MC4zNTAwMDAwMDAwMDAwMDAwMyIvPjxwYXRoIGQ9Ik0zOTgsMTA3Ljg0Yy01Ni4xNSwxMC4wNy0xMTkuNTktMTEuMjYtMTY2LjYyLTIwLjItMi43MS0uNTItNS4zNS0xLTcuOTQtMS40MUExNTkuNTQsMTU5LjU0LDAsMCwwLDIwMiw4NHEtMy4wOS0uMDktNiwwYy0uNzEsMC0xLjM5LjA4LTIuMDkuMTItNTIuOCwyLjkzLTgwLjM0LDI4Ljc4LTExMi45MSwzNi42MmE3Mi42Myw3Mi42MywwLDAsMS05LjY2LDEuNjJBMzEuNDksMzEuNDksMCwwLDEsNjIsMTIzbC0xLjE4LS4xM0MzMS4zNywxMjIuODUsMCwxMTEuODIsMCwxMTEuODJ2MTMuOUg2MzBWMzQuMzZDNTIzLDMwLjM5LDQ3MCw5NC45NCwzOTgsMTA3Ljg0WiIgc3R5bGU9ImZpbGw6I2ZmZiIvPjxwYXRoIGQ9Ik0wLDEwMi4xNHYxMGM4MywzNCwxMjYuODMtMTQsMTkwLTI0bDEtNGMtNDQuNCw2LjI2LTQ1LDIyLTkzLDMxQzU0Ljc4LDEyMy4yNSwzMCwxMTMuMTQsMCwxMDIuMTRaIiBzdHlsZT0iZmlsbDojZmZmO29wYWNpdHk6MC4zMDAwMDAwMDAwMDAwMDAwNCIvPjxwYXRoIGQ9Ik0wLDEwNC4xNHYxMGMyMiw5LDQxLjIzLDEwLjI2LDU4LjgsMTAsNDguNzgtLjc2LDg0Ljc2LTI2LjY1LDEzMS4yLTM0bDEtNGMtNDQuNCw2LjI2LTQ1LDIyLTkzLDMxQzU0Ljc4LDEyNS4yNSwzMCwxMTUuMTQsMCwxMDQuMTRaIiBzdHlsZT0iZmlsbDojZmZmO29wYWNpdHk6MC4zMDAwMDAwMDAwMDAwMDAwNCIvPjwvc3ZnPg==";
                    break;
                case "2":
                    e.options.style = e.options.prefix + "MTIwIj48dGl0bGU+QXNzZXQgMTY0PC90aXRsZT48cGF0aCBkPSJNNTY3LjY3LDMxLjE0Yy0yNi4yMiwxNy4zNi01MCwzNi41NS04MS44LDUwQzQzNy41MiwxMDEuNDgsMzc1LjUyLDEwNi4yMSwzMTcsMTAzLjIzcy0xMTUuNDItMTMtMTczLjE1LTE5LjU2Qzk2LjQ3LDc4LjI1LDQ3LjE4LDc1LjE4LDAsODAuMDd2MzIuNDFINjMwVjBDNjA2LjQ0LDcuNTIsNTg1Ljg5LDE5LjA5LDU2Ny42NywzMS4xNFoiIHN0eWxlPSJmaWxsOiNmZmY7b3BhY2l0eTowLjY0Ii8+PHBhdGggZD0iTTU2Ny42NywzOC42N2MtMjYuMjIsMTcuMzUtNTAsMzYuNTUtODEuOCw1MEM0MzcuNTIsMTA5LDM3NS41MiwxMTMuNzMsMzE3LDExMC43NXMtMTE1LjQyLTEzLTE3My4xNS0xOS41NkM5Ni40Nyw4NS43Nyw0Ny4xOCw4Mi43LDAsODcuNTlWMTIwSDYzMFY3LjUyQzYwNi40NCwxNSw1ODUuODksMjYuNjEsNTY3LjY3LDM4LjY3WiIgc3R5bGU9ImZpbGw6I2ZmZiIvPjwvc3ZnPg==";
                    break;
                case "3":
                    e.options.style = e.options.prefix + "NjAiPjx0aXRsZT5Bc3NldCAxNzI8L3RpdGxlPjxwYXRoIGQ9Ik0wLDAsNDAwLDUzLjIzLDYzMCwwVjYwSDBaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+";
                    break;
                case "4":
                    e.options.style = e.options.prefix + "ODAiPjx0aXRsZT40PC90aXRsZT48cGF0aCBkPSJNMjYxLjIsNjQuOUMzNjcuNiw1NC43LDQ5OS42LDM5LjcsNjMwLDE4LjVWMEM0OTcuOCwzMS40LDM2My43LDUyLDI2MS4yLDY0LjlaIiBzdHlsZT0iZmlsbDojZmZmO29wYWNpdHk6MC4zMDAwMDAwMDAwMDAwMDAwNCIvPjxwYXRoIGQ9Ik0yNjEuMiw2NC45Yy00MSwzLjktNzguMiw3LjEtMTEwLDkuNiwxMy4yLS40LDI3LS45LDQxLjUtMS42QzMxNSw2Ny43LDQ3OC40LDU5LjQsNjMwLDM0LjhWMTguNUM0OTkuMSwzOS44LDM2Ny4zLDU0LjgsMjYxLjIsNjQuOVoiIHN0eWxlPSJmaWxsOiNmZmY7b3BhY2l0eTowLjYwMDAwMDAwMDAwMDAwMDEiLz48cGF0aCBkPSJNMTkyLjcsNzIuOWMtMTQuNS43LTI4LjMsMS4yLTQxLjUsMS42QzU5LjksNzcuNywwLDc3LjQsMCw3Ny40VjgwSDYzMFYzMy44QzQ3OC40LDU4LjQsMzE1LDY3LjcsMTkyLjcsNzIuOVoiIHN0eWxlPSJmaWxsOiNmZmYiLz48L3N2Zz4=";
                    break;
                case "5":
                    e.options.style = e.options.prefix + "MTAwIj48dGl0bGU+QXNzZXQgMTczPC90aXRsZT48cGF0aCBkPSJNMCw1Ni44NGwxMDgsMzlMNDY4LDAsNjMwLDY4LjQyVjEwMEgwWiIgc3R5bGU9ImZpbGw6I2ZmZiIvPjwvc3ZnPg==";
                    break;
                case "6":
                    e.options.style = e.options.prefix + "MTIwIj48dGl0bGU+NjwvdGl0bGU+PHBhdGggZD0iTTYxNS41LDIuNWMtNDEuMyw1LjgtNzcuNCwxMi43LTExNiwxMy43LTIyLjIuNi00NC44LTMuMy02Ny4yLjQtNDguOCw4LjEtMTA3LjgsNDMuNS0xNTcuNyw2Mi42LTQyLjQsMTYuMi02OS45LDE2LTk4LjcsMy44LTIxLjEtOS00Mi4xLTIyLjktNjUuMi0zMy4xLTI5LjQtMTMtNjIuNC0yNC4yLTk4LjktMTIuM2wtMS4xLjNMMCw0MS42VjUzLjhsMTAuNy0zLjYsMS4xLS40YzQyLjEtMTMuNyw2My4xLTUuNiw5OC45LDUuNiwyMi43LDcsNDQuMSwyMCw2NS4yLDI4LjksMzAuOSwxMy4xLDU1LjgsMTMsOTguNy0xLDQ5LjktMTYuNCwxMDguOS01MS44LDE1Ny43LTU5LjksMjIuNC0zLjcsNDUuMi00LjUsNjcuMi0uNCwzNy44LDcuMiw3NC43LDcuMSwxMTYsMS4zLDUtLjcsOS44LTEuNSwxNC41LTIuNVYwQzYyNS4zLDEsNjIwLjUsMS45LDYxNS41LDIuNVoiIHN0eWxlPSJmaWxsOiNmZmY7b3BhY2l0eTowLjM1MDAwMDAwMDAwMDAwMDAzIi8+PHBhdGggZD0iTTQ5OS41LDIzYy0yMi00LjEtNDQuOC0zLjMtNjcuMi40LTQ4LjgsOC4xLTEwNy44LDQzLjUtMTU3LjcsNTkuOS00Mi45LDE0LTY3LjgsMTQuMS05OC43LDEtMjEuMS04LjktNDIuNS0yMS45LTY1LjItMjguOUM3NC45LDQ0LjIsNTMuOSwzNi4xLDExLjgsNDkuOGwtMS4xLjRMMCw1My44VjYybDEwLjctMy42LDEuMS0uNGMzNi41LTExLjksNjguOC04LDk4LjksMS40LDIyLjcsNy4xLDQ0LjEsMTcuMyw2NS4yLDI2LjMsMjguOCwxMi4yLDU1LjcsMTIuOSw5OS4xLDIuOSw1Mi41LTEyLjEsMTA3LjEtNTEuNywxNTUuOS01OS44LDIyLjMtMy44LDQ2LjYtMS44LDY4LjYsMi40LDM3LjgsNy4xLDc0LjcsMjIsMTE2LDE2LjMsNS0uNyw5LjgtMS42LDE0LjUtMi42VjIxLjhjLTQuNywxLTkuNSwxLjgtMTQuNSwyLjVDNTc0LjIsMzAuMSw1MzcuMywzMC4yLDQ5OS41LDIzWiIgc3R5bGU9ImZpbGw6I2ZmZjtvcGFjaXR5OjAuNSIvPjxwYXRoIGQ9Ik00OTkuNSwzMS4yYy0yMi00LjItNDYuMy02LjItNjguNi0yLjRDMzgyLjEsMzYuOSwzMjcuNSw3Ni41LDI3NSw4OC42Yy00My40LDEwLTcwLjMsOS4zLTk5LjEtMi45LTIxLjEtOS00Mi41LTE5LjItNjUuMi0yNi4zQzgwLjYsNTAsNDguMyw0Ni4xLDExLjgsNThsLTEuMS40TDAsNjJ2NThINjMwVjQ0LjljLTQuNywxLTkuNSwxLjktMTQuNSwyLjZDNTc0LjIsNTMuMiw1MzcuMywzOC4zLDQ5OS41LDMxLjJaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+";
                    break;
                case "7":
                    e.options.style = e.options.prefix + "MTIwIj48dGl0bGU+QXNzZXQgMTc0PC90aXRsZT48cGF0aCBkPSJNMCwwLDYzMCwxMjBIMFoiIHN0eWxlPSJmaWxsOiNmZmYiLz48L3N2Zz4=";
                    break;
                case "8":
                    e.options.style = e.options.prefix + "MTIwIj48dGl0bGU+ODwvdGl0bGU+PHBhdGggZD0iTTQ1Ni43LDUzLjZDNDM5LjgsNDIuOSwzOTYuOSwxLjgsMzQzLjIsMzAuMWMtMzUuNywxOC43LTg0LDcxLjUtMTI3LjgsNzEuOS0zNi4xLjMtNTcuOC0yMC4yLTgxLjQtMzUuMS0xNy4zLTExLTM1LTIzLjUtNTMuNi0zMi4yQzU1LjYsMjMuMiwzMCwxMS44LjEsMjYuNGMtLjMuMSwwLDkzLjYsMCw5My42SDYzMFYzMS44Yy0zLjksMS4zLTEzLDE3LjMtNjUuMiwzMi44QzUzMy4zLDc2LjQsNDkyLjQsNzYuNCw0NTYuNyw1My42WiIgc3R5bGU9ImZpbGw6I2ZmZiIvPjxnIHN0eWxlPSJvcGFjaXR5OjAuMzgiPjxwYXRoIGQ9Ik02MTEsNjMuNmwtMiw0Mi44LTUyNy45LDUtODEtMS4xVjYxLjhhMTk0LjcsMTk0LjcsMCwwLDAsMjQuNyw5LjQsMTQ2LjgsMTQ2LjgsMCwwLDAsNDMuOSw2LjJDOTQuNiw3Ny4zLDEyMC41LDY1LDE0Niw1MC41YzE4LjctMTAuNiwzNy4xLTIyLjMsNTUuMi0zMS4zQzIxMy43LDEyLjksMjI2LDgsMjM4LjEsNS43YzI0LjMtNC42LDUxLjQtMy4yLDcyLjUsNy45bDM2LjcsMTkuNmMzNy4zLDE5LjksNzMuMSwzOC45LDEwNC4yLDUxLjdDNDY1LjQsOTAuNiw0NzguMyw5NS4yLDQ5MCw5OGMxMy4zLDMuMywyNS4xLDQuNSwzNSwyLjlhNzUuNSw3NS41LDAsMCwwLDkuMy0zLjdsNy40LTMuM2MxNS40LTcuMSwzOC44LTE5LjEsNTkuNi0zMy4yLDUuNS0zLjcuNi40LDUuNy0zLjRDNjE5LDQ4LjIsNjA4LjcsNjQuMiw2MTEsNjMuNloiIHN0eWxlPSJmaWxsOiNmZmYiLz48L2c+PHBhdGggZD0iTTU4MS44LDExLjRDNTUyLC4yLDUzMS41LDMuOSw1MDcuMiw4LjQsNDcyLjEsMTUsNDM0LjcsNDQuMSwzOTYuNiw2My4yYy0xNi4zLDguMS0zMi44LDE0LjQtNDkuMiwxNi4zLTE1LjgtNS40LTMyLTEyLjItNDcuNi0xOS4yLTM3LjktMTcuMS03Mi42LTM1LjctOTEuOS0zOS44bC02LjctMS4zYy0yMi4yLTQuMi00NS45LTUuOC02Ny45LTEuNy0xMC40LDItMjEsNS45LTMxLjgsMTFDNzYuNiw0MC4yLDUwLjksNTcuOSwyNC44LDcxLjJBMjEzLjYsMjEzLjYsMCwwLDEsLjEsODIuMXYzMC44bDgxLTEuNSwzMTIuMy01LjcsMS40LjNMNjMwLDExMS44di04MEM2MTMsMjYuNCw2MTkuMywyNS41LDU4MS44LDExLjRaIiBzdHlsZT0iZmlsbDojZmZmO29wYWNpdHk6MC40OSIvPjxnIHN0eWxlPSJvcGFjaXR5OjAuMzgiPjxwYXRoIGQ9Ik01NDUuNCw5N2wtMTEuMS4yTDQ5MCw5OCwuMSwxMDcuMVYwQzIxLjMtLjQsNDEuMyw0LjEsNjAuNCwxMC44YTQwMy43LDQwMy43LDAsMCwxLDQxLjEsMTcuN2MxMCw0LjksMTkuOSw5LjksMjkuNywxNC42LDUsMi4zLDkuOSw0LjksMTQuOCw3LjQsMjYuMSwxMy41LDUyLjcsMjgsOTIuOSwyNy44LDIwLjMtLjEsNDAuNy03LjcsNjAuOS0xOCwxNi04LjIsMzEuOS0xOCw0Ny41LTI3LjEsMjAuOS0xMi4xLDQxLjMtMjIuOSw2MC45LTI2LjZDNDMyLjUsMiw0ODEuMSw4LjYsNTA0LDE4czQ5LjYsMjMuNiw5Ny4zLDQyLjdDNjIwLjIsNjguNCw1NDUuNCw5Nyw1NDUuNCw5N1oiIHN0eWxlPSJmaWxsOiNmZmYiLz48L2c+PC9zdmc+";
                    break;
                case "9":
                    e.options.style = e.options.prefix + "MTAwIj48dGl0bGU+QXNzZXQgMTgyPC90aXRsZT48cGF0aCBkPSJNMCw0NS42NVMxNTksMCwzMjIsMCw2MzAsNDUuNjUsNjMwLDQ1LjY1VjEwMEgwWiIgc3R5bGU9ImZpbGw6I2ZmZiIvPjwvc3ZnPg==";
                    break;
                case "10":
                    e.options.style = e.options.prefix + "MTIwIj48dGl0bGU+MTA8L3RpdGxlPjxwYXRoIGQ9Ik0wLDEwOC4xSDYzMFYwUzQ3NSwxMDQuNiwzMTQsMTA0LjYsMCwwLDAsMFoiIHN0eWxlPSJmaWxsOiNmZmY7b3BhY2l0eTowLjIyIi8+PHBhdGggZD0iTTAsMTA2LjlINjMwVjE3LjhzLTE1NSw4Ny45LTMxNiw4Ny45UzAsMTksMCwxOVoiIHN0eWxlPSJmaWxsOiNmZmY7b3BhY2l0eTowLjM2Ii8+PHBhdGggZD0iTTAsMTIwSDYzMFY0NS4xcy0xNTUsNjEuOC0zMTYsNjEuOFMwLDQ1LjEsMCw0NS4xWiIgc3R5bGU9ImZpbGw6I2ZmZiIvPjwvc3ZnPg==";
                    break;
                case "11":
                    e.options.style = e.options.prefix + "MTIwIj48dGl0bGU+MTE8L3RpdGxlPjxwYXRoIGQ9Ik01MTAuNywyLjljLTk4LjksMjEuOS0yMjIuMyw4NS41LTMyMiw4NS41QzgwLjEsODguNCwyNC4xLDU2LjEsMCwzNi40VjEyMEg2MzBWMTUuMkM2MDIuNCw2LjksNTUwLjEtNS44LDUxMC43LDIuOVoiIHN0eWxlPSJmaWxsOiNmZmYiLz48L3N2Zz4=";
                    break;
                case "12":
                    e.options.style = e.options.prefix + "MTIwIj48dGl0bGU+MTI8L3RpdGxlPjxwYXRoIGQ9Ik02MzAsMzQuNWE1NCw1NCwwLDAsMS05LDIuM0M1NzguMyw0Ni4xLDU1Ni4xLDI0LDUxNy4yLDEyLjVjLTIyLjktNi43LTQ3LjktOS44LTcxLTMuOUMzOTUuOCwyMS43LDM0MC4zLDEwMiwyODUuMSwxMDIuNGMtNDUuNC4zLTcyLjYtMjYuNS0xMDIuMy00Ni4xLTIxLjgtMTQuNC00NC0zMC44LTY3LjQtNDIuMUM4NC4yLS45LDUwLjktNy4yLDEzLjIsMTEuOGwtMS4yLjZjLTMuNSwxLjktOC4yLDMuOS0xMiw1LjlWMTIwSDYzMFoiIHN0eWxlPSJmaWxsOiNmZmYiLz48L3N2Zz4=";
                    break;
                case "13":
                    e.options.style = e.options.prefix + "OTAiPjx0aXRsZT4xMzwvdGl0bGU+PHBhdGggZD0iTTYzMCw5MEgxTDAsMFMxMzEsNzYuNiwzNjYsMzQuMmMxMjAtMjEuNywyNjQsNC41LDI2NCw0LjVaIiBzdHlsZT0iZmlsbDojZmZmO29wYWNpdHk6MC4xNiIvPjxwYXRoIGQ9Ik0xLDkwSDYzMFYwUzQ4OSw3NC4zLDI1NCwzMS45QzEzNCwxMC4zLDAsMzMsMCwzM1oiIHN0eWxlPSJmaWxsOiNmZmY7b3BhY2l0eTowLjIiLz48cGF0aCBkPSJNMCw5MEg2MzBWMTguMlM0NzUsNzcuNSwzMTQsNzcuNSwwLDE4LjIsMCwxOC4yWiIgc3R5bGU9ImZpbGw6I2ZmZiIvPjwvc3ZnPg==";
                    break;
                case "14":
                    e.options.style = e.options.prefix + "NjAiPjx0aXRsZT5Bc3NldCAxNzg8L3RpdGxlPjxwYXRoIGQ9Ik0wLDAsMTEzLDE5LDU4MiwyOS40Nyw2MzAsMFY2MEgwWiIgc3R5bGU9ImZpbGw6I2ZmZiIvPjwvc3ZnPg==";
                    break;
                case "15":
                    e.options.style = e.options.prefix + "ODAiPjx0aXRsZT5Bc3NldCAxNzc8L3RpdGxlPjxwYXRoIGQ9Ik0zMTUsMCw2MzAsODBIMFoiIHN0eWxlPSJmaWxsOiNmZmYiLz48L3N2Zz4=";
                    break;
                case "16":
                    e.options.style = e.options.prefix + "ODAiPjx0aXRsZT4xNjwvdGl0bGU+PHBhdGggZD0iTTAsODBTMjA4LDAsMzE1LDAsNjMwLDgwLDYzMCw4MFoiIHN0eWxlPSJmaWxsOiNmZmYiLz48L3N2Zz4=";
                    break;
                case "17":
                    e.options.style = e.options.prefix + "MTIwIj48dGl0bGU+MTc8L3RpdGxlPjxwYXRoIGQ9Ik0zMjAsMTZjODguNCwyLDMxMCwxMDQsMzEwLDEwNFM1NjkuNiw4Ny4zLDQ5OS41LDU2Yy0xOS43LTguOC00MC4xLTE3LjUtNjAuMi0yNS4zQzM5NS4yLDEzLjYsMzUyLjcuNywzMjQsMCwyMzUtMiwwLDEyMCwwLDEyMGwxNC4xLTUuNUM2Mi41LDkyLjgsMjQzLjMsMTQuMywzMjAsMTZaIiBzdHlsZT0iZmlsbDojZmZmO29wYWNpdHk6MC4zMSIvPjxwYXRoIGQ9Ik0xNC4xLDExNC41QzY0LjksOTUsMjM5LjQsMzAuMywzMTUsMzJjODguNCwyLDMxNSw4OCwzMTUsODhTNDA4LjQsMTgsMzIwLDE2QzI0My4zLDE0LjMsNjIuNSw5Mi44LDE0LjEsMTE0LjVaIiBzdHlsZT0iZmlsbDojZmZmO29wYWNpdHk6MC40MyIvPjxwYXRoIGQ9Ik0xNC4xLDExNC41QzY0LjksOTUsMjM5LjQsMzAuMywzMTUsMzJjODguNCwyLDMxNSw4OCwzMTUsODhTNDA4LjQsMTgsMzIwLDE2QzI0My4zLDE0LjMsNjIuNSw5Mi44LDE0LjEsMTE0LjVaIiBzdHlsZT0iZmlsbDojZmZmO29wYWNpdHk6MC4zMSIvPjxwYXRoIGQ9Ik0zMTUsMzJDMjM5LjQsMzAuMyw2NC45LDk1LDE0LjEsMTE0LjVMMiwxMjBINjMwUzQwMy40LDM0LDMxNSwzMloiIHN0eWxlPSJmaWxsOiNmZmYiLz48L3N2Zz4=";
                    break;
                case "18":
                    e.options.style = e.options.prefix + "NDAiPjx0aXRsZT5Bc3NldCAxNzk8L3RpdGxlPjxwYXRoIGQ9Ik0wLDE4LjEsNTMsMS45LDEwMywyMGw1OS05LjUyLDU2LDE1LjIzLDcyLTcuNjEsNDYsNC43NiwzNC00Ljc2LDM2LDguNTcsNzYtMTksODUsMTUuMjRMNjMwLDBWMzcuMTRIMFoiIHN0eWxlPSJmaWxsOiNmZmY7b3BhY2l0eTowLjQ3MDAwMDAwMDAwMDAwMDAzIi8+PHBhdGggZD0iTTAsMjAsNTMsMy44MSwxMDMsMjEuOWw1OS05LjUyLDU2LDE1LjI0TDI5MCwyMGw0Niw0Ljc2TDM3MCwyMGwzNiw5LjUyLDc2LTE3LjE0LDg1LDE2LjE5LDYzLTE2LjE5VjQwSDBaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+";
                    break;
                case "19":
                    e.options.style = e.options.prefix + "ODAiPjx0aXRsZT4xOTwvdGl0bGU+PHBhdGggZD0iTTYzMCwzNi45YTM0LjYsMzQuNiwwLDAsMC0xNi41LTQuMmMtMTcuMiwwLTMxLjgsMTIuNy0zNi43LDMwLjNhMjEuMiwyMS4yLDAsMCwwLTkuMy0yLjIsMjEuOCwyMS44LDAsMCwwLTEzLjksNS4xLDM4LjcsMzguNywwLDAsMC00MC40LTQuOGMtNS4yLTcuNy0xMy40LTEyLjYtMjIuNy0xMi42YTI1LjcsMjUuNywwLDAsMC04LjcsMS41QzQ3Mi45LDI3LjgsNDUzLDEyLjQsNDMwLDEyLjRzLTQyLjcsMTUuMy01MS43LDM3LjJjLTcuMi0xMC45LTE4LjgtMTguMS0zMS44LTE4LjFhMzcsMzcsMCwwLDAtMjQsOS4yYy02LTEwLjMtMTYuMy0xNy0yOC0xNy0xMy44LDAtMjUuNiw5LjMtMzAuNywyMi43QTI2LjUsMjYuNSwwLDAsMCwyNDQsMzcuMmEyMiwyMiwwLDAsMC01LjguN2MtNC0xMS42LTE0LTE5LjktMjUuNy0xOS45YTI0LjcsMjQuNywwLDAsMC05LjQsMS45QzE4OS4yLDcuNCwxNzEuNiwwLDE1Mi41LDAsMTI0LjYsMCwxMDAsMTUuOCw4NS4zLDM5LjlBMjcuNiwyNy42LDAsMCwwLDYzLDI4LjJhMjMuOSwyMy45LDAsMCwwLTcuMSwxQzQ3LjIsMTMsMzEuNSwyLjMsMTMuNSwyLjNBNDMuMyw0My4zLDAsMCwwLDAsNC40VjgwSDYzMFoiIHN0eWxlPSJmaWxsOiNmZmYiLz48L3N2Zz4=";
                    break;
                case "20":
                    e.options.style = e.options.prefix + "MTAwIj48dGl0bGU+QXNzZXQgMTgwPC90aXRsZT48cGF0aCBkPSJNNjMwLDYwLjgyVjEwMEgwVjk1Ljg4bDExLjkxLTYuNDlMODQsNDMuMzRsMzYuNDksMjQuNDVMMTYwLDQ2LDIzMi4wNSwwbDQ5LjA3LDMyLjg5LDM0LjA3LDI5LjU5LDY4LjI5LDI3Ljc1TDQyMyw2NWw0Mi4yLDI4LjI5LDE4LjM5LTE2LDQ5LjA3LTMyLjg5TDU5NCw4My42MSw2MjgsNjEuOVoiIHN0eWxlPSJmaWxsOiNmZmYiLz48L3N2Zz4="
                }
                var n = atob(e.options.style)
                  , o = document.createElement("div");
                o.innerHTML = n;
                var r = o.firstChild
                  , s = r.getElementsByTagName("path");
                [].forEach.call(s, function(t) {
                    t.style.fill = e.options.color
                }),
                i.hasClass("b--desktop") ? (r.setAttribute("preserveAspectRatio", "none"),
                e.options.height ? r.setAttribute("style", "height:" + e.options.height + "px") : r.setAttribute("style", "height:" + r.height.baseVal.value + "px")) : r.setAttribute("preserveAspectRatio", "xMidYMid meet"),
                t(".shape-divider svg title").remove(),
                e.css({
                    "z-index": e.options.zIndex,
                    opacity: e.options.opacity
                }),
                e.append(r)
            })
        },
        responsiveVideos: function() {
            var e = t("section, .content, .post-content, .video-js, .post-video, .video-wrap, .ajax-quick-view,#slider:not(.revslider-wrap)").find(['iframe[src*="player.vimeo.com"]', 'iframe[src*="youtube.com"]', 'iframe[src*="youtube-nocookie.com"]', 'iframe[src*="kickstarter.com"][src*="video.html"]', "object", "embed"].join(","));
            e && e.each(function() {
                t(this).wrap('<div class="embed-responsive embed-responsive-16by9"></div>')
            })
        },
        counters: function() {
            var e = t(".counter");
            if (e.length > 0) {
                if (void 0 === t.fn.countTo)
                    return INSPIRO.elements.notification("Warning", "jQuery countTo plugin is missing in plugins.js file.", "danger"),
                    !0;
                e.each(function() {
                    var e = t(this)
                      , i = e.find("span").attr("data-prefix") || ""
                      , n = e.find("span").attr("data-suffix") || "";
                    new Waypoint({
                        element: e,
                        handler: function() {
                            e.find("span").countTo({
                                refreshInterval: 2,
                                formatter: function(t, e) {
                                    return String(i) + t.toFixed(e.decimals) + String(n)
                                }
                            }),
                            this.destroy()
                        },
                        offset: "104%"
                    })
                })
            }
        },
        countdownTimer: function() {
            if (t(".countdown").length > 0) {
                if (void 0 === t.fn.countdown)
                    return INSPIRO.elements.notification("Warning", "jQuery countdown plugin is missing in plugins.js file.", "danger"),
                    !0;
                t("[data-countdown]").each(function() {
                    var e = t(this)
                      , i = t(this).attr("data-countdown");
                    e.countdown(i, function(t) {
                        e.html(t.strftime('<div class="countdown-container"><div class="countdown-box"><div class="number">%-D</div><span>Day%!d</span></div><div class="countdown-box"><div class="number">%H</div><span>Hours</span></div><div class="countdown-box"><div class="number">%M</div><span>Minutes</span></div><div class="countdown-box"><div class="number">%S</div><span>Seconds</span></div></div>'))
                    })
                })
            }
        },
        progressBar: function() {
            var e = t(".p-progress-bar") || t(".progress-bar");
            e.length > 0 && e.each(function(e, n) {
                var o = t(this)
                  , r = o.attr("data-percent") || "100"
                  , s = o.attr("data-delay") || "60"
                  , a = o.attr("data-type") || "%";
                o.hasClass("progress-animated") || o.css({
                    width: "0%"
                });
                var l = function() {
                    o.animate({
                        width: r + "%"
                    }, "easeInOutCirc").addClass("progress-animated"),
                    o.delay(s).append('<span class="progress-type">' + a + '</span><span class="progress-number animated fadeIn">' + r + "</span>")
                };
                i.hasClass("breakpoint-lg") || i.hasClass("breakpoint-xl") ? new Waypoint({
                    element: t(n),
                    handler: function() {
                        setTimeout(function() {
                            l()
                        }, s);
                        this.destroy()
                    },
                    offset: "100%"
                }) : l()
            })
        },
        pieChart: function() {
            var e = t(".pie-chart");
            if (e.length > 0) {
                if (void 0 === t.fn.easyPieChart)
                    return INSPIRO.elements.notification("Warning", "jQuery easyPieChart plugin is missing in plugins.js file.", "danger"),
                    !0;
                e.each(function() {
                    var e = t(this);
                    e.options = {
                        barColor: e.attr("data-color") || "#2250fc",
                        trackColor: e.attr("data-trackcolor") || "rgba(0,0,0,0.10)",
                        scaleColor: e.attr("data-scaleColor") || !1,
                        scaleLength: e.attr("data-scaleLength") || 5,
                        lineCap: e.attr("data-lineCap") || "square",
                        lineWidth: e.attr("data-lineWidth") || 6,
                        size: e.attr("data-size") || 160,
                        rotate: e.attr("data-rotate") || 0,
                        animate: e.attr("data-animate") || 2600,
                        elemEasing: e.attr("data-easing") || "easeInOutExpo"
                    },
                    e.find("span, i").css({
                        width: e.options.size + "px",
                        height: e.options.size + "px",
                        "line-height": e.options.size + "px"
                    }),
                    new Waypoint({
                        element: e,
                        handler: function() {
                            e.easyPieChart({
                                barColor: e.options.barColor,
                                trackColor: e.options.trackColor,
                                scaleColor: e.options.scaleColor,
                                scaleLength: e.options.scaleLength,
                                lineCap: e.options.lineCap,
                                lineWidth: Number(e.options.lineWidth),
                                size: Number(e.options.size),
                                rotate: Number(e.options.rotate),
                                animate: Number(e.options.animate),
                                elemEasing: e.options.elemEasing,
                                onStep: function(t, i, n) {
                                    e.find("span.percent").text(Math.round(n))
                                }
                            }),
                            this.destroy()
                        },
                        offset: "100%"
                    })
                })
            }
        },
        maps: function() {
            var e = t(".map");
            if (e.length > 0) {
                if (void 0 === t.fn.gmap3)
                    return INSPIRO.elements.notification("Warning", "jQuery gmap3 plugin is missing, please go to this <a href='//support.inspirothemes.com/help-center/articles/8/14/65/google-maps'>help article</a> and follow instructions on how to configure google maps.", "danger"),
                    !0;
                e.each(function() {
                    var e, i = t(this);
                    i.options = {
                        latitude: i.attr("data-latitude") || "-37.817240",
                        longitude: i.attr("data-longitude") || "144.955820",
                        info: i.attr("data-info"),
                        maptype: i.attr("data-type") || "ROADMAP",
                        zoom: i.attr("data-zoom") || 14,
                        icon: i.attr("data-icon"),
                        mapColor: i.attr("data-style") || null
                    },
                    window.MAPS && (e = i.options.mapColor ? MAPS[i.options.mapColor] : null),
                    i.gmap3({
                        center: [Number(i.options.latitude), Number(i.options.longitude)],
                        zoom: Number(i.options.zoom),
                        mapTypeId: google.maps.MapTypeId[i.options.maptype],
                        scrollwheel: !1,
                        zoomControl: !0,
                        mapTypeControl: !1,
                        streetViewControl: !0,
                        fullscreenControl: !0,
                        styles: e
                    }),
                    i.options.icon ? i.gmap3().marker({
                        position: [Number(i.options.latitude), Number(i.options.longitude)],
                        icon: i.options.icon
                    }) : i.gmap3().marker({
                        position: [Number(i.options.latitude), Number(i.options.longitude)],
                        icon: " "
                    }).overlay({
                        position: [Number(i.options.latitude), Number(i.options.longitude)],
                        content: '<div class="animated-dot"></div>'
                    }),
                    i.options.info && i.gmap3().infowindow({
                        position: [Number(i.options.latitude), Number(i.options.longitude)],
                        content: i.options.info,
                        pixelOffset: new google.maps.Size(0,-10)
                    }).then(function(t) {
                        var e = this.get(0);
                        this.get(1).addListener("click", function() {
                            t.open(e)
                        })
                    })
                })
            }
        },
        gridLayout: function() {
            if (f.length > 0) {
                if (void 0 === t.fn.isotope)
                    return INSPIRO.elements.notification("Warning", "jQuery isotope plugin is missing in plugins.js file.", "danger"),
                    !0;
                var i;
                i = !INSPIRO.core.rtlStatus(),
                f.each(function() {
                    var n = t(this);
                    if (n.options = {
                        itemSelector: n.attr("data-item") || "portfolio-item",
                        layoutMode: n.attr("data-layout") || "masonry",
                        filter: n.attr("data-default-filter") || "*",
                        stagger: n.attr("data-stagger") || 0,
                        autoHeight: 0 != n.data("auto-height"),
                        gridMargin: n.attr("data-margin") || 20,
                        gridMarginXs: n.attr("data-margin-xs"),
                        transitionDuration: n.attr("data-transition") || "0.45s",
                        isOriginLeft: i
                    },
                    t(window).breakpoints("lessThan", "lg", function() {
                        n.options.gridMargin = n.options.gridMarginXs || n.options.gridMargin
                    }),
                    n.css("margin", "0 -" + n.options.gridMargin + "px -" + n.options.gridMargin + "px 0"),
                    n.find("." + n.options.itemSelector).css("padding", "0 " + n.options.gridMargin + "px " + n.options.gridMargin + "px 0"),
                    n.attr("data-default-filter")) {
                        var o = n.options.filter;
                        n.options.filter = "." + n.options.filter
                    }
                    n.append('<div class="grid-loader"></div>');
                    var r = t(n).imagesLoaded(function() {
                        r.isotope({
                            layoutMode: n.options.layoutMode,
                            transitionDuration: n.options.transitionDuration,
                            stagger: Number(n.options.stagger),
                            resize: !0,
                            itemSelector: "." + n.options.itemSelector + ":not(.grid-loader)",
                            isOriginLeft: n.options.isOriginLeft,
                            autoHeight: n.options.autoHeight,
                            masonry: {
                                columnWidth: n.find("." + n.options.itemSelector + ":not(.large-width)")[0]
                            },
                            filter: n.options.filter
                        }),
                        n.remove(".grid-loader").addClass("grid-loaded")
                    });
                    n.next().hasClass("infinite-scroll") && INSPIRO.elements.gridLayoutInfinite(n, n.options.itemSelector, n.options.gridMargin),
                    p.length > 0 && p.each(function() {
                        var i = t(this)
                          , r = i.find("a")
                          , s = i.attr("data-layout");
                        if (r.on("click", function() {
                            i.find("li").removeClass("active"),
                            t(this).parent("li").addClass("active");
                            var n = t(this).attr("data-category");
                            return t(s).isotope({
                                filter: n
                            }).on("layoutComplete", function() {
                                e.trigger("scroll")
                            }),
                            t(".grid-active-title").length > 0 && t(".grid-active-title").empty().append(t(this).text()),
                            !1
                        }),
                        o) {
                            var a = i.find(t('[data-category="' + n.options.filter + '"]'));
                            i.find("li").removeClass("active"),
                            a.parent("li").addClass("active")
                        } else {
                            (a = i.find(t('[data-category="*"]'))).parent("li").addClass("active")
                        }
                    })
                })
            }
        },
        gridLayoutInfinite: function(e, i, n) {
            if (void 0 === t.fn.infiniteScroll)
                return INSPIRO.elements.notification("Warning", "jQuery infiniteScroll plugin is missing, please add this code line <b> &lt;script src=&quot;plugins/metafizzy/infinite-scroll.min.js&quot;&gt;&lt;/script&gt;</b>, before <b>plugins.js</b>", "danger"),
                !0;
            var o = e
              , r = i
              , s = n
              , a = !0
              , l = 500
              , c = !0
              , u = t("#showMore")
              , d = t("#showMore a.btn")
              , h = t("#showMore a.btn").html()
              , f = t('<div class="infinite-scroll-message"><p class="animated visible fadeIn">No more posts to show</p></div>');
            if ((p = t(".infinite-scroll > a").attr("href")).indexOf(".html") > -1)
                var p = p.replace(/(-\d+)/g, "-{{#}}");
            u.length > 0 && (a = !1,
            l = !1,
            c = !1),
            o.infiniteScroll({
                path: p,
                append: "." + r,
                history: !1,
                button: "#showMore a",
                scrollThreshold: l,
                loadOnScroll: a,
                prefill: c
            }),
            o.on("load.infiniteScroll", function(e, i, n, s) {
                var a = t(i).find("." + r);
                a.imagesLoaded(function() {
                    o.append(a),
                    o.isotope("insert", a)
                })
            }),
            o.on("error.infiniteScroll", function(e, i, n) {
                u.addClass("animated visible fadeOut");
                setTimeout(function() {
                    u.hide(),
                    o.after(f)
                }, 500),
                setTimeout(function() {
                    t(".infinite-scroll-message").addClass("animated visible fadeOut")
                }, 3e3)
            }),
            o.on("append.infiniteScroll", function(i, n, o, a) {
                INSPIRO.slider.carousel(t(a).find(".carousel")),
                d.html(h),
                e.css("margin", "0 -" + s + "px -" + s + "px 0"),
                e.find("." + r).css("padding", "0 " + s + "px " + s + "px 0")
            })
        },
        tooltip: function() {
            var e = t('[data-toggle="tooltip"]');
            if (e.length > 0) {
                if (void 0 === t.fn.tooltip)
                    return INSPIRO.elements.notification("Warning: jQuery tooltip plugin is missing in plugins.js file.", "warning"),
                    !0;
                e.tooltip()
            }
        },
        popover: function() {
            var e = t('[data-toggle="popover"]');
            if (e.length > 0) {
                if (void 0 === t.fn.popover)
                    return INSPIRO.elements.notification("Warning: jQuery popover plugin is missing in plugins.js file.", "warning"),
                    !0;
                e.popover({
                    container: "body",
                    html: !0
                })
            }
        },
        magnificPopup: function() {
            var e = t("[data-lightbox]");
            if (e.length > 0) {
                if (void 0 === t.fn.magnificPopup)
                    return INSPIRO.elements.notification("Warning", "jQuery magnificPopup plugin is missing in plugins.js file.", "danger"),
                    !0;
                var i = {
                    image: {
                        type: "image",
                        closeOnContentClick: !0,
                        removalDelay: 500,
                        image: {
                            verticalFit: !0
                        },
                        callbacks: {
                            beforeOpen: function() {
                                this.st.image.markup = this.st.image.markup.replace("mfp-figure", "mfp-figure mfp-with-anim"),
                                this.st.mainClass = "mfp-zoom-out"
                            }
                        }
                    },
                    gallery: {
                        delegate: 'a[data-lightbox="gallery-image"], a[data-lightbox="image"]',
                        type: "image",
                        image: {
                            verticalFit: !0
                        },
                        gallery: {
                            enabled: !0,
                            navigateByImgClick: !0,
                            preload: [0, 1]
                        },
                        removalDelay: 500,
                        callbacks: {
                            beforeOpen: function() {
                                this.st.image.markup = this.st.image.markup.replace("mfp-figure", "mfp-figure mfp-with-anim"),
                                this.st.mainClass = "mfp-zoom-out"
                            }
                        }
                    },
                    iframe: {
                        type: "iframe",
                        removalDelay: 500,
                        callbacks: {
                            beforeOpen: function() {
                                this.st.image.markup = this.st.image.markup.replace("mfp-figure", "mfp-figure mfp-with-anim"),
                                this.st.mainClass = "mfp-zoom-out"
                            }
                        }
                    },
                    ajax: {
                        type: "ajax",
                        removalDelay: 500,
                        callbacks: {
                            ajaxContentAdded: function(t) {
                                INSPIRO.slider.carouselAjax(),
                                INSPIRO.elements.responsiveVideos(),
                                INSPIRO.elements.buttons()
                            }
                        }
                    },
                    inline: {
                        type: "inline",
                        removalDelay: 500,
                        callbacks: {
                            beforeOpen: function() {
                                this.st.image.markup = this.st.image.markup.replace("mfp-figure", "mfp-figure mfp-with-anim"),
                                this.st.mainClass = "mfp-zoom-out"
                            }
                        },
                        closeBtnInside: !1,
                        fixedContentPos: !0,
                        overflowY: "scroll"
                    }
                };
                e.each(function() {
                    var e = t(this);
                    switch (e.attr("data-lightbox")) {
                    case "image":
                        e.magnificPopup(i.image);
                        break;
                    case "gallery":
                        e.magnificPopup(i.gallery);
                        break;
                    case "iframe":
                        e.magnificPopup(i.iframe);
                        break;
                    case "ajax":
                        e.magnificPopup(i.ajax);
                        break;
                    case "inline":
                        e.magnificPopup(i.inline)
                    }
                })
            }
        },
        yTPlayer: function() {
            var e = t(".youtube-background");
            if (e.length > 0) {
                if (void 0 === t.fn.YTPlayer)
                    return INSPIRO.elements.notification("Warning", "jQuery YTPlayer plugin is missing, please add this code line <b> &lt;script src=&quot;plugins/youtube-player/jquery.mb.YTPlayer.min.js&quot;&gt;&lt;/script&gt;</b>, before <b><--Template functions--\x3e</b>", "danger", 1e4),
                    !0;
                e.each(function() {
                    var e = t(this);
                    e.options = {
                        videoURL: e.attr("data-youtube-url"),
                        autoPlay: 0 == e.data("youtube-autoplay") ? 0 : 1,
                        mute: 0 != e.data("youtube-mute"),
                        pauseOnScroll: 0 != e.data("youtube-pauseOnScroll"),
                        loop: 0 != e.data("youtube-loop"),
                        vol: e.attr("data-youtube-volume") || 50,
                        startAt: e.attr("data-youtube-start") || 0,
                        stopAt: e.attr("data-youtube-stop") || 0,
                        controls: 1 == e.data("youtube-controls") ? 1 : 0
                    };
                    var i = e.options.videoURL.match(/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
                    i && 11 == i[2].length ? e.options.videoURL = i[2] : e.options.videoURL = e.options.videoURL,
                    e.YTPlayer({
                        fitToBackground: !0,
                        videoId: e.options.videoURL,
                        repeat: e.options.loop,
                        playerVars: {
                            start: e.options.start,
                            end: e.options.end,
                            autoplay: e.options.autoPlay,
                            modestbranding: e.options.logo,
                            controls: e.options.controls,
                            origin: window.location.origin,
                            branding: 0,
                            rel: 0,
                            showinfo: 0
                        },
                        events: {
                            onReady: function(t) {
                                e.options.vol && t.target.setVolume(e.options.vol);
                                e.options.mute && t.target.mute();
                                if (e.options.pauseOnScroll)
                                    new Waypoint({
                                        element: e,
                                        handler: function(i) {
                                            t.target.pauseVideo(),
                                            1 == e.options.autoPlay && "up" == i && t.target.playVideo()
                                        }
                                    })
                            }
                        }
                    })
                })
            }
        },
        vimeoPlayer: function() {
            var e = t(".vimeo-background");
            if (e.length > 0) {
                if (void 0 === t.fn.vimeo_player)
                    return INSPIRO.elements.notification("Warning", "jQuery vimeo_player plugin is missing, please add this code line <b> &lt;script src=&quot;plugins/vimeo-player/jquery.mb.vimeo_player.min.js&quot;&gt;&lt;/script&gt;</b>, before <b><--Template functions--\x3e</b>", "danger", 1e4),
                    !0;
                e.each(function() {
                    var e = t(this)
                      , i = e.attr("data-vimeo-url") || null
                      , n = e.attr("data-vimeo-mute") || !1
                      , o = e.attr("data-vimeo-ratio") || "16/9"
                      , r = e.attr("data-vimeo-quality") || "hd720"
                      , s = e.attr("data-vimeo-opacity") || 1
                      , a = e.attr("data-vimeo-container") || "self"
                      , l = e.attr("data-vimeo-optimize") || !0
                      , c = e.attr("data-vimeo-loop") || !0
                      , u = e.attr("data-vimeo-volume") || 70
                      , d = e.attr("data-vimeo-start") || 0
                      , h = e.attr("data-vimeo-stop") || 0
                      , f = e.attr("data-vimeo-autoplay") || !0
                      , p = e.attr("data-vimeo-fullscreen") || !0
                      , m = e.attr("data-vimeo-controls") || !1
                      , g = e.attr("data-vimeo-logo") || !1;
                    e.attr("data-vimeo-autopause");
                    e.vimeo_player({
                        videoURL: i,
                        mute: n,
                        ratio: o,
                        quality: r,
                        opacity: s,
                        containment: a,
                        optimizeDisplay: l,
                        loop: c,
                        vol: u,
                        startAt: d,
                        stopAt: h,
                        autoPlay: f,
                        realfullscreen: p,
                        showvmLogo: g,
                        showControls: m
                    })
                })
            }
        },
        modal: function() {
            if (void 0 === t.fn.magnificPopup)
                return INSPIRO.elements.notification("Warning", "jQuery magnificPopup plugin is missing in plugins.js file.", "danger"),
                !0;
            var e = t(".modal")
              , i = t(".modal-strip")
              , n = t(".btn-modal")
              , o = t(".modal-close")
              , r = t(".cookie-notify")
              , s = r.find(".modal-confirm, .mfp-close");
            e.length > 0 && e.each(function() {
                var e = t(this)
                  , i = e.attr("data-delay") || 3e3
                  , n = e.attr("data-cookie-expire") || 365
                  , r = e.attr("data-cookie-name") || "cookieModalName2020_3"
                  , s = 1 == e.data("cookie-enabled");
                e.attr("data-delay-dismiss");
                if (e.hasClass("modal-auto-open")) {
                    var a = t(this);
                    setTimeout(function() {
                        a.addClass("modal-active")
                    }, i)
                }
                if (e.find(o).click(function() {
                    return e.removeClass("modal-active"),
                    !1
                }),
                e.hasClass("modal-auto-open"))
                    if (1 != s)
                        setTimeout(function() {
                            t.magnificPopup.open({
                                items: {
                                    src: e
                                },
                                type: "inline",
                                closeBtnInside: !0,
                                callbacks: {
                                    beforeOpen: function() {
                                        this.st.image.markup = this.st.image.markup.replace("mfp-figure", "mfp-figure mfp-with-anim"),
                                        this.st.mainClass = "mfp-zoom-out"
                                    },
                                    open: function() {
                                        e.find("video").length > 0 && e.find("video").get(0).play()
                                    }
                                }
                            }, 0)
                        }, i);
                    else if (void 0 === Cookies.get(r))
                        setTimeout(function() {
                            t.magnificPopup.open({
                                items: {
                                    src: e
                                },
                                type: "inline",
                                closeBtnInside: !0,
                                callbacks: {
                                    beforeOpen: function() {
                                        this.st.image.markup = this.st.image.markup.replace("mfp-figure", "mfp-figure mfp-with-anim"),
                                        this.st.mainClass = "mfp-zoom-out"
                                    },
                                    open: function() {
                                        e.find("video").length > 0 && e.find("video").get(0).play()
                                    },
                                    close: function() {
                                        Cookies.set(r, !0, {
                                            expires: Number(n)
                                        })
                                    }
                                }
                            }, 0)
                        }, i);
                e.find(o).click(function() {
                    return t.magnificPopup.close(),
                    !1
                })
            }),
            i.length > 0 && i.each(function() {
                var e = t(this)
                  , i = e.attr("data-delay") || 3e3
                  , n = e.attr("data-cookie-expire") || 365
                  , a = e.attr("data-cookie-name") || "cookieName2013"
                  , l = 1 == e.data("cookie-enabled")
                  , c = e.attr("data-delay-dismiss");
                if (e.hasClass("modal-auto-open")) {
                    var u = t(this);
                    setTimeout(function() {
                        if (u.addClass("modal-active"),
                        c)
                            setTimeout(function() {
                                e.removeClass("modal-active")
                            }, c)
                    }, i)
                }
                if (e.find(o).click(function() {
                    return e.removeClass("modal-active"),
                    !1
                }),
                e.hasClass("cookie-notify")) {
                    setTimeout(function() {
                        1 != l ? r.addClass("modal-active") : void 0 === Cookies.get(a) && r.addClass("modal-active")
                    }, i);
                    s.click(function() {
                        return Cookies.set(a, !0, {
                            expires: Number(n)
                        }),
                        t.magnificPopup.close(),
                        r.removeClass("modal-active"),
                        !1
                    })
                }
            }),
            n.length > 0 && n.each(function() {
                var e = t(this)
                  , i = e.attr("data-modal");
                e.click(function() {
                    return t(i).toggleClass("modal-active", 1e3),
                    !1
                })
            })
        },
        notification: function(e, i, n, o, r, s, a, l, c, u) {
            var d, h;
            a = a || "fadeInDown",
            l = l || "fadeOutDown";
            s = s || "top",
            o ? (d = "element-container",
            a = "fadeIn",
            l = "fadeOut") : d = "col-11 col-md-4",
            c && (h = 'style="background-image:url(' + c + '); background-repeat: no-repeat; background-position: 50% 20%; height:120px !important; width:430px !important; border:0px;" '),
            i || (i = ""),
            o = "body";
            var f = function() {
                t.notify({
                    title: e,
                    message: i
                }, {
                    element: o,
                    type: n || "warning",
                    delay: r || 1e4,
                    template: '<div data-notify="container" ' + h + ' class="bootstrap-notify ' + d + ' alert alert-{0}" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button><span data-notify="icon"></span> <span data-notify="title">{1}</span> <span data-notify="message">{2}</span></div>',
                    mouse_over: !0,
                    allow_dismiss: !0,
                    placement: {
                        from: s
                    },
                    animate: {
                        enter: "animated " + a,
                        exit: "animated " + l
                    }
                })
            };
            u ? setTimeout(function() {
                f()
            }, 2e3) : f()
        },
        sidebarFixed: function() {
            if (INSPIRO.core.rtlStatus())
                return !0;
            var e = t(".sticky-sidebar");
            if (e.length > 0) {
                if (void 0 === t.fn.theiaStickySidebar)
                    return INSPIRO.elements.notification("Warning", "jQuery theiaStickySidebar plugin is missing in plugins.js file.", "danger"),
                    !0;
                e.each(function() {
                    var e = t(this);
                    e.options = {
                        additionalMarginTop: e.attr("data-margin-top") || 120,
                        additionalMarginBottom: e.attr("data-margin-bottom") || 50
                    },
                    e.theiaStickySidebar({
                        additionalMarginTop: Number(e.options.additionalMarginTop),
                        additionalMarginBottom: Number(e.options.additionalMarginBottom),
                        disableOnResponsiveLayouts: !0
                    })
                })
            }
        },
        bootstrapSwitch: function() {
            var e = t("[data-switch=true]");
            if (e.length > 0) {
                if (void 0 === t.fn.bootstrapSwitch)
                    return INSPIRO.elements.notification("Warning", "jQuery bootstrapSwitch plugin is missing in plugins.js file.", "danger"),
                    !0;
                e.bootstrapSwitch()
            }
        },
        clipboard: function() {
            var e = t("[data-clipboard-target]")
              , i = t("[data-clipboard-text]");
            if (e.length > 0) {
                if ("undefined" == typeof ClipboardJS)
                    return INSPIRO.elements.notification("Warning", "jQuery ClipboardJS plugin is missing in plugins.js file.", "danger"),
                    !0;
                function n(e) {
                    e.each(function() {
                        var e = t(this)
                          , i = e.attr("data-original-title") || "Copy to clipboard"
                          , n = e.attr("data-original-title-success") || "Copied!";
                        e.tooltip({
                            placement: "top",
                            title: i
                        }),
                        e.on("click", function() {
                            e.attr("data-original-title", n).tooltip("show")
                        }).on("mouseleave", function() {
                            return e.tooltip("hide").attr("data-original-title", i),
                            !1
                        })
                    })
                }
                e && (new ClipboardJS("[data-clipboard-target]"),
                n(e)),
                i && (new ClipboardJS("[data-clipboard-text]"),
                n(i))
            }
        },
        countdown: function() {
            var e = t(".p-countdown");
            e.length > 0 && e.each(function() {
                var e = t(this)
                  , i = e.find(".p-countdown-count")
                  , n = e.find(".p-countdown-show")
                  , o = e.attr("data-delay") || 5;
                i.find(".count-number").html(o),
                new Waypoint({
                    element: e,
                    handler: function() {
                        var t = setInterval(function() {
                            0 == --o ? (clearInterval(t),
                            i.fadeOut("slow"),
                            setTimeout(function() {
                                n.fadeIn("show")
                            }, 1e3)) : i.find(".count-number").html(o)
                        }, 1e3);
                        this.destroy()
                    },
                    offset: "100%"
                })
            })
        },
        videoBackground: function() {
            var e = t("[data-bg-video], [data-vide-bg]");
            e.length > 0 && e.each(function() {
                var e = t(this);
                e.options = {
                    autoplay: e.attr("data-video-autoplay") || !0,
                    controls: e.attr("data-video-controls"),
                    loop: e.attr("data-video-loop") || !0,
                    muted: e.attr("data-video-muted") || !0,
                    poster: e.attr("data-video-poster") || "",
                    preload: e.attr("data-video-preload") || "auto",
                    src: e.attr("data-bg-video"),
                    randomId: Math.random().toString(36).substr(2, 5)
                },
                e.options.controls ? e.options.controls = ' controls="' + e.options.controls + '" ' : e.options.controls = "",
                e.prepend('<div class="html5vid" id="video-' + e.options.randomId + '"><video playsinline ' + e.options.controls + ' loop="' + e.options.loop + '" muted="' + e.options.muted + '" poster="' + e.options.poster + '" preload="' + e.options.preload + '"><source src="' + e.options.src + '" type="video/mp4"></video></div>'),
                e.options.autoplay && setTimeout(function() {
                    t("#video-" + e.options.randomId).find("video").get(0).play()
                }, 100),
                setTimeout(function() {
                    t("#video-" + e.options.randomId).addClass("video-loaded")
                }, 300)
            })
        }
    },
    INSPIRO.widgets = {
        functions: function() {
            INSPIRO.widgets.twitter(),
            INSPIRO.widgets.flickr(),
            INSPIRO.widgets.instagram(),
            INSPIRO.widgets.subscribeForm()
        },
        twitter: function() {
            var e = t(".widget-tweeter") || t(".widget-twitter");
            if (e.length > 0) {
                if (void 0 === t.fn.twittie)
                    return INSPIRO.elements.notification("Warning", "jQuery twittie plugin is missing in plugins.js file.", "danger"),
                    !0;
                setTimeout(function() {
                    e.each(function() {
                        var e = t(this)
                          , i = e.attr("data-username") || "ardianmusliu"
                          , n = e.attr("data-limit") || 2
                          , o = e.attr("data-format") || "%b/%d/%Y"
                          , r = e.attr("data-loading-text") || "Loading..."
                          , s = e.attr("data-loader") || "include/twitter/tweet.php"
                          , a = e.attr("data-avatar") || !1;
                        a = "true" == a ? "{{avatar}}" : "",
                        e.append('<div id="twitter-cnt"></div>'),
                        e.find("#twitter-cnt").twittie({
                            username: i,
                            count: n,
                            dateFormat: o,
                            template: a + "{{tweet}}<small>{{date}}</small>",
                            apiPath: s,
                            loadingText: r
                        }, function() {
                            e.parents(".grid-layout").length > 0 && e.parents(".grid-layout").isotope("layout")
                        })
                    })
                }, 2e3)
            }
        },
        flickr: function() {
            var e = t(".flickr-widget");
            if (e.length > 0) {
                if (void 0 === t.fn.jflickrfeed)
                    return INSPIRO.elements.notification("Warning", "jQuery jflickrfeed plugin is missing in plugins.js file.", "danger"),
                    !0;
                e.each(function() {
                    var i = t(this);
                    i.options = {
                        id: i.attr("data-flickr-id") || "52617155@N08",
                        limit: i.attr("data-flickr-images") || "9",
                        itemTemplate: '<a href="{{image}}" title="{{title}}"><img src="{{image_s}}" alt="{{title}}" /></a>'
                    },
                    e.jflickrfeed({
                        limit: i.options.limit,
                        qstrings: {
                            id: i.options.id
                        },
                        itemTemplate: i.options.itemTemplate
                    }, function() {
                        setTimeout(function() {
                            i.addClass("flickr-widget-loaded")
                        }, 1e3);
                        i.magnificPopup({
                            delegate: "a",
                            type: "image",
                            gallery: {
                                enabled: !0
                            }
                        }),
                        i.parents(".grid-layout").length > 0 && i.parents(".grid-layout").isotope("layout")
                    })
                })
            }
        },
        instagram: function() {
            var e = t(".widget-instagram");
            if (e.length > 0) {
                if (void 0 === t.fn.spectragram)
                    return INSPIRO.elements.notification("Warning", "jQuery spectragram plugin is missing in plugins.js file.", "danger"),
                    !0;
                e.each(function() {
                    var e = t(this)
                      , i = e.attr("data-limit") || 12
                      , n = e.attr("data-col") || 3
                      , o = e.attr("data-token") || "5783726529.226c7d2.68a168eec1264759b9f91c1fc2c6ce56"
                      , r = e.attr("data-size") || "small"
                      , s = "grid-" + n;
                    e.append('<div id="instagram-cnt" class="' + s + '"></div>'),
                    jQuery.fn.spectragram.accessData = {
                        accessToken: o
                    },
                    e.find(t("#instagram-cnt")).spectragram("getUserFeed", {
                        size: r,
                        max: i,
                        wrapEachWith: "",
                        complete: function() {
                            e.addClass("widget-instagram-loaded"),
                            e.parents(".grid-layout").length > 0 && e.parents(".grid-layout").isotope("layout")
                        }
                    })
                })
            }
        },
        subscribeForm: function() {
            var e = t(".widget-subscribe-form");
            e.length > 0 && e.each(function() {
                var e = t(this)
                  , i = e.attr("success-message") || "You have successfully subscribed to our mailing list."
                  , n = e.find("#widget-subscribe-submit-button")
                  , o = n.html();
                e.submit(function(r) {
                    r.preventDefault();
                    var s = t(this).attr("action")
                      , a = t(this).attr("method")
                      , l = t(this).serialize();
                    !1 === e[0].checkValidity() ? (r.stopPropagation(),
                    e.addClass("was-validated")) : (t(e).removeClass("was-validated"),
                    n.html('<i class="icon-loader fa-spin"></i>'),
                    t.ajax({
                        url: s,
                        type: a,
                        data: l,
                        dataType: "json",
                        success: function(r) {
                            "success" == r.response ? (t.notify({
                                message: i
                            }, {
                                type: "success"
                            }),
                            t(e)[0].reset(),
                            t(e).removeClass("was-validated"),
                            n.html(o)) : (t.notify({
                                message: r.message
                            }, {
                                type: "warning"
                            }),
                            t(e)[0].reset(),
                            t(e).removeClass("was-validated"),
                            n.html(o))
                        },
                        done: function() {
                            n.html(o)
                        }
                    }))
                })
            })
        }
    },
    t(document).ready(function() {
        INSPIRO.core.functions(),
        INSPIRO.header.functions(),
        INSPIRO.slider.functions(),
        INSPIRO.widgets.functions(),
        INSPIRO.elements.functions()
    }),
    e.on("scroll", function() {
        INSPIRO.header.stickyHeader(),
        INSPIRO.core.scrollTop(),
        INSPIRO.header.dotsMenu()
    }),
    e.on("resize", function() {
        INSPIRO.header.logoStatus(),
        INSPIRO.header.stickyHeader()
    })
}(jQuery),
function(t) {
    t.fn.marquee = function(e) {
        return this.each(function() {
            var i, n, o = t.extend({}, t.fn.marquee.defaults, e), r = t(this), s = 3, a = "animation-play-state", l = !1, c = function(t, e, i) {
                for (var n = ["webkit", "moz", "MS", "o", ""], o = 0; o < n.length; o++)
                    n[o] || (e = e.toLowerCase()),
                    t.addEventListener(n[o] + e, i, !1)
            }, u = {
                pause: function() {
                    l && o.allowCss3Support ? i.css(a, "paused") : t.fn.pause && i.pause(),
                    r.data("runningStatus", "paused"),
                    r.trigger("paused")
                },
                resume: function() {
                    l && o.allowCss3Support ? i.css(a, "running") : t.fn.resume && i.resume(),
                    r.data("runningStatus", "resumed"),
                    r.trigger("resumed")
                },
                toggle: function() {
                    u["resumed" == r.data("runningStatus") ? "pause" : "resume"]()
                },
                destroy: function() {
                    clearTimeout(r.timer),
                    r.find("*").addBack().unbind(),
                    r.html(r.find(".js-marquee:first").html())
                }
            };
            if ("string" == typeof e)
                t.isFunction(u[e]) && (i || (i = r.find(".js-marquee-wrapper")),
                !0 === r.data("css3AnimationIsSupported") && (l = !0),
                u[e]());
            else {
                var d;
                t.each(o, function(t, e) {
                    if (void 0 !== (d = r.attr("data-" + t))) {
                        switch (d) {
                        case "true":
                            d = !0;
                            break;
                        case "false":
                            d = !1
                        }
                        o[t] = d
                    }
                }),
                o.speed && (o.duration = parseInt(r.width(), 10) / o.speed * 1e3);
                var h = "up" == o.direction || "down" == o.direction;
                o.gap = o.duplicated ? parseInt(o.gap) : 0,
                r.wrapInner('<div class="js-marquee"></div>');
                var f = r.find(".js-marquee").css({
                    "margin-right": o.gap,
                    float: "left"
                });
                if (o.duplicated && f.clone(!0).appendTo(r),
                r.wrapInner('<div style="width:100000px" class="js-marquee-wrapper"></div>'),
                i = r.find(".js-marquee-wrapper"),
                h) {
                    var p = r.height();
                    i.removeAttr("style"),
                    r.height(p),
                    r.find(".js-marquee").css({
                        float: "none",
                        "margin-bottom": o.gap,
                        "margin-right": 0
                    }),
                    o.duplicated && r.find(".js-marquee:last").css({
                        "margin-bottom": 0
                    });
                    var m = r.find(".js-marquee:first").height() + o.gap;
                    o.startVisible && !o.duplicated ? (o._completeDuration = (parseInt(m, 10) + parseInt(p, 10)) / parseInt(p, 10) * o.duration,
                    o.duration *= parseInt(m, 10) / parseInt(p, 10)) : o.duration *= (parseInt(m, 10) + parseInt(p, 10)) / parseInt(p, 10)
                } else {
                    var g = r.find(".js-marquee:first").width() + o.gap
                      , v = r.width();
                    o.startVisible && !o.duplicated ? (o._completeDuration = (parseInt(g, 10) + parseInt(v, 10)) / parseInt(v, 10) * o.duration,
                    o.duration *= parseInt(g, 10) / parseInt(v, 10)) : o.duration *= (parseInt(g, 10) + parseInt(v, 10)) / parseInt(v, 10)
                }
                if (o.duplicated && (o.duration /= 2),
                o.allowCss3Support) {
                    f = document.body || document.createElement("div");
                    var y = "marqueeAnimation-" + Math.floor(1e7 * Math.random())
                      , w = ["Webkit", "Moz", "O", "ms", "Khtml"]
                      , b = "animation"
                      , x = ""
                      , S = "";
                    if (f.style.animation && (S = "@keyframes " + y + " ",
                    l = !0),
                    !1 === l)
                        for (var C = 0; C < w.length; C++)
                            if (void 0 !== f.style[w[C] + "AnimationName"]) {
                                f = "-" + w[C].toLowerCase() + "-",
                                b = f + b,
                                a = f + a,
                                S = "@" + f + "keyframes " + y + " ",
                                l = !0;
                                break
                            }
                    l && (x = y + " " + o.duration / 1e3 + "s " + o.delayBeforeStart / 1e3 + "s infinite " + o.css3easing,
                    r.data("css3AnimationIsSupported", !0))
                }
                var I = function() {
                    i.css("transform", "translateY(" + ("up" == o.direction ? p + "px" : "-" + m + "px") + ")")
                }
                  , _ = function() {
                    i.css("transform", "translateX(" + ("left" == o.direction ? v + "px" : "-" + g + "px") + ")")
                };
                o.duplicated ? (h ? o.startVisible ? i.css("transform", "translateY(0)") : i.css("transform", "translateY(" + ("up" == o.direction ? p + "px" : "-" + (2 * m - o.gap) + "px") + ")") : o.startVisible ? i.css("transform", "translateX(0)") : i.css("transform", "translateX(" + ("left" == o.direction ? v + "px" : "-" + (2 * g - o.gap) + "px") + ")"),
                o.startVisible || (s = 1)) : o.startVisible ? s = 2 : h ? I() : _();
                var T = function() {
                    if (o.duplicated && (1 === s ? (o._originalDuration = o.duration,
                    o.duration = h ? "up" == o.direction ? o.duration + p / (m / o.duration) : 2 * o.duration : "left" == o.direction ? o.duration + v / (g / o.duration) : 2 * o.duration,
                    x && (x = y + " " + o.duration / 1e3 + "s " + o.delayBeforeStart / 1e3 + "s " + o.css3easing),
                    s++) : 2 === s && (o.duration = o._originalDuration,
                    x && (y += "0",
                    S = t.trim(S) + "0 ",
                    x = y + " " + o.duration / 1e3 + "s 0s infinite " + o.css3easing),
                    s++)),
                    h ? o.duplicated ? (2 < s && i.css("transform", "translateY(" + ("up" == o.direction ? 0 : "-" + m + "px") + ")"),
                    n = {
                        transform: "translateY(" + ("up" == o.direction ? "-" + m + "px" : 0) + ")"
                    }) : o.startVisible ? 2 === s ? (x && (x = y + " " + o.duration / 1e3 + "s " + o.delayBeforeStart / 1e3 + "s " + o.css3easing),
                    n = {
                        transform: "translateY(" + ("up" == o.direction ? "-" + m + "px" : p + "px") + ")"
                    },
                    s++) : 3 === s && (o.duration = o._completeDuration,
                    x && (y += "0",
                    S = t.trim(S) + "0 ",
                    x = y + " " + o.duration / 1e3 + "s 0s infinite " + o.css3easing),
                    I()) : (I(),
                    n = {
                        transform: "translateY(" + ("up" == o.direction ? "-" + i.height() + "px" : p + "px") + ")"
                    }) : o.duplicated ? (2 < s && i.css("transform", "translateX(" + ("left" == o.direction ? 0 : "-" + g + "px") + ")"),
                    n = {
                        transform: "translateX(" + ("left" == o.direction ? "-" + g + "px" : 0) + ")"
                    }) : o.startVisible ? 2 === s ? (x && (x = y + " " + o.duration / 1e3 + "s " + o.delayBeforeStart / 1e3 + "s " + o.css3easing),
                    n = {
                        transform: "translateX(" + ("left" == o.direction ? "-" + g + "px" : v + "px") + ")"
                    },
                    s++) : 3 === s && (o.duration = o._completeDuration,
                    x && (y += "0",
                    S = t.trim(S) + "0 ",
                    x = y + " " + o.duration / 1e3 + "s 0s infinite " + o.css3easing),
                    _()) : (_(),
                    n = {
                        transform: "translateX(" + ("left" == o.direction ? "-" + g + "px" : v + "px") + ")"
                    }),
                    r.trigger("beforeStarting"),
                    l) {
                        i.css(b, x);
                        var e = S + " { 100%  " + function(t) {
                            var e, i = [];
                            for (e in t)
                                t.hasOwnProperty(e) && i.push(e + ":" + t[e]);
                            return i.push(),
                            "{" + i.join(",") + "}"
                        }(n) + "}"
                          , a = i.find("style");
                        0 !== a.length ? a.filter(":last").html(e) : t("head").append("<style>" + e + "</style>"),
                        c(i[0], "AnimationIteration", function() {
                            r.trigger("finished")
                        }),
                        c(i[0], "AnimationEnd", function() {
                            T(),
                            r.trigger("finished")
                        })
                    } else
                        i.animate(n, o.duration, o.easing, function() {
                            r.trigger("finished"),
                            o.pauseOnCycle ? r.timer = setTimeout(T, o.delayBeforeStart) : T()
                        });
                    r.data("runningStatus", "resumed")
                };
                r.bind("pause", u.pause),
                r.bind("resume", u.resume),
                o.pauseOnHover && (r.bind("mouseenter", u.pause),
                r.bind("mouseleave", u.resume)),
                l && o.allowCss3Support ? T() : r.timer = setTimeout(T, o.delayBeforeStart)
            }
        })
    }
    ,
    t.fn.marquee.defaults = {
        allowCss3Support: !0,
        css3easing: "linear",
        easing: "linear",
        delayBeforeStart: 1e3,
        direction: "left",
        duplicated: !1,
        duration: 5e3,
        gap: 20,
        pauseOnCycle: !1,
        pauseOnHover: !1,
        startVisible: !1
    }
}(jQuery);
