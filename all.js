/*! jQuery v3.4.1 | (c) JS Foundation and other contributors | jquery.org/license */ ! function (e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function (e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function (C, e) {
    "use strict";
    var t = [],
        E = C.document,
        r = Object.getPrototypeOf,
        s = t.slice,
        g = t.concat,
        u = t.push,
        i = t.indexOf,
        n = {},
        o = n.toString,
        v = n.hasOwnProperty,
        a = v.toString,
        l = a.call(Object),
        y = {},
        m = function (e) {
            return "function" == typeof e && "number" != typeof e.nodeType
        },
        x = function (e) {
            return null != e && e === e.window
        },
        c = {
            type: !0,
            src: !0,
            nonce: !0,
            noModule: !0
        };

    function b(e, t, n) {
        var r, i, o = (n = n || E).createElement("script");
        if (o.text = e, t)
            for (r in c)(i = t[r] || t.getAttribute && t.getAttribute(r)) && o.setAttribute(r, i);
        n.head.appendChild(o).parentNode.removeChild(o)
    }

    function w(e) {
        return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? n[o.call(e)] || "object" : typeof e
    }
    var f = "3.4.1",
        k = function (e, t) {
            return new k.fn.init(e, t)
        },
        p = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

    function d(e) {
        var t = !!e && "length" in e && e.length,
            n = w(e);
        return !m(e) && !x(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e)
    }
    k.fn = k.prototype = {
        jquery: f,
        constructor: k,
        length: 0,
        toArray: function () {
            return s.call(this)
        },
        get: function (e) {
            return null == e ? s.call(this) : e < 0 ? this[e + this.length] : this[e]
        },
        pushStack: function (e) {
            var t = k.merge(this.constructor(), e);
            return t.prevObject = this, t
        },
        each: function (e) {
            return k.each(this, e)
        },
        map: function (n) {
            return this.pushStack(k.map(this, function (e, t) {
                return n.call(e, t, e)
            }))
        },
        slice: function () {
            return this.pushStack(s.apply(this, arguments))
        },
        first: function () {
            return this.eq(0)
        },
        last: function () {
            return this.eq(-1)
        },
        eq: function (e) {
            var t = this.length,
                n = +e + (e < 0 ? t : 0);
            return this.pushStack(0 <= n && n < t ? [this[n]] : [])
        },
        end: function () {
            return this.prevObject || this.constructor()
        },
        push: u,
        sort: t.sort,
        splice: t.splice
    }, k.extend = k.fn.extend = function () {
        var e, t, n, r, i, o, a = arguments[0] || {},
            s = 1,
            u = arguments.length,
            l = !1;
        for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == typeof a || m(a) || (a = {}), s === u && (a = this, s--); s < u; s++)
            if (null != (e = arguments[s]))
                for (t in e) r = e[t], "__proto__" !== t && a !== r && (l && r && (k.isPlainObject(r) || (i = Array.isArray(r))) ? (n = a[t], o = i && !Array.isArray(n) ? [] : i || k.isPlainObject(n) ? n : {}, i = !1, a[t] = k.extend(l, o, r)) : void 0 !== r && (a[t] = r));
        return a
    }, k.extend({
        expando: "jQuery" + (f + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function (e) {
            throw new Error(e)
        },
        noop: function () {},
        isPlainObject: function (e) {
            var t, n;
            return !(!e || "[object Object]" !== o.call(e)) && (!(t = r(e)) || "function" == typeof (n = v.call(t, "constructor") && t.constructor) && a.call(n) === l)
        },
        isEmptyObject: function (e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        globalEval: function (e, t) {
            b(e, {
                nonce: t && t.nonce
            })
        },
        each: function (e, t) {
            var n, r = 0;
            if (d(e)) {
                for (n = e.length; r < n; r++)
                    if (!1 === t.call(e[r], r, e[r])) break
            } else
                for (r in e)
                    if (!1 === t.call(e[r], r, e[r])) break;
            return e
        },
        trim: function (e) {
            return null == e ? "" : (e + "").replace(p, "")
        },
        makeArray: function (e, t) {
            var n = t || [];
            return null != e && (d(Object(e)) ? k.merge(n, "string" == typeof e ? [e] : e) : u.call(n, e)), n
        },
        inArray: function (e, t, n) {
            return null == t ? -1 : i.call(t, e, n)
        },
        merge: function (e, t) {
            for (var n = +t.length, r = 0, i = e.length; r < n; r++) e[i++] = t[r];
            return e.length = i, e
        },
        grep: function (e, t, n) {
            for (var r = [], i = 0, o = e.length, a = !n; i < o; i++) !t(e[i], i) !== a && r.push(e[i]);
            return r
        },
        map: function (e, t, n) {
            var r, i, o = 0,
                a = [];
            if (d(e))
                for (r = e.length; o < r; o++) null != (i = t(e[o], o, n)) && a.push(i);
            else
                for (o in e) null != (i = t(e[o], o, n)) && a.push(i);
            return g.apply([], a)
        },
        guid: 1,
        support: y
    }), "function" == typeof Symbol && (k.fn[Symbol.iterator] = t[Symbol.iterator]), k.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
        n["[object " + t + "]"] = t.toLowerCase()
    });
    var h = function (n) {
        var e, d, b, o, i, h, f, g, w, u, l, T, C, a, E, v, s, c, y, k = "sizzle" + 1 * new Date,
            m = n.document,
            S = 0,
            r = 0,
            p = ue(),
            x = ue(),
            N = ue(),
            A = ue(),
            D = function (e, t) {
                return e === t && (l = !0), 0
            },
            j = {}.hasOwnProperty,
            t = [],
            q = t.pop,
            L = t.push,
            H = t.push,
            O = t.slice,
            P = function (e, t) {
                for (var n = 0, r = e.length; n < r; n++)
                    if (e[n] === t) return n;
                return -1
            },
            R = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            M = "[\\x20\\t\\r\\n\\f]",
            I = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
            W = "\\[" + M + "*(" + I + ")(?:" + M + "*([*^$|!~]?=)" + M + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + I + "))|)" + M + "*\\]",
            $ = ":(" + I + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + W + ")*)|.*)\\)|)",
            F = new RegExp(M + "+", "g"),
            B = new RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"),
            _ = new RegExp("^" + M + "*," + M + "*"),
            z = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"),
            U = new RegExp(M + "|>"),
            X = new RegExp($),
            V = new RegExp("^" + I + "$"),
            G = {
                ID: new RegExp("^#(" + I + ")"),
                CLASS: new RegExp("^\\.(" + I + ")"),
                TAG: new RegExp("^(" + I + "|[*])"),
                ATTR: new RegExp("^" + W),
                PSEUDO: new RegExp("^" + $),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + R + ")$", "i"),
                needsContext: new RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)", "i")
            },
            Y = /HTML$/i,
            Q = /^(?:input|select|textarea|button)$/i,
            J = /^h\d$/i,
            K = /^[^{]+\{\s*\[native \w/,
            Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            ee = /[+~]/,
            te = new RegExp("\\\\([\\da-f]{1,6}" + M + "?|(" + M + ")|.)", "ig"),
            ne = function (e, t, n) {
                var r = "0x" + t - 65536;
                return r != r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
            },
            re = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
            ie = function (e, t) {
                return t ? "\0" === e ? "\ufffd" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
            },
            oe = function () {
                T()
            },
            ae = be(function (e) {
                return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase()
            }, {
                dir: "parentNode",
                next: "legend"
            });
        try {
            H.apply(t = O.call(m.childNodes), m.childNodes), t[m.childNodes.length].nodeType
        } catch (e) {
            H = {
                apply: t.length ? function (e, t) {
                    L.apply(e, O.call(t))
                } : function (e, t) {
                    var n = e.length,
                        r = 0;
                    while (e[n++] = t[r++]);
                    e.length = n - 1
                }
            }
        }

        function se(t, e, n, r) {
            var i, o, a, s, u, l, c, f = e && e.ownerDocument,
                p = e ? e.nodeType : 9;
            if (n = n || [], "string" != typeof t || !t || 1 !== p && 9 !== p && 11 !== p) return n;
            if (!r && ((e ? e.ownerDocument || e : m) !== C && T(e), e = e || C, E)) {
                if (11 !== p && (u = Z.exec(t)))
                    if (i = u[1]) {
                        if (9 === p) {
                            if (!(a = e.getElementById(i))) return n;
                            if (a.id === i) return n.push(a), n
                        } else if (f && (a = f.getElementById(i)) && y(e, a) && a.id === i) return n.push(a), n
                    } else {
                        if (u[2]) return H.apply(n, e.getElementsByTagName(t)), n;
                        if ((i = u[3]) && d.getElementsByClassName && e.getElementsByClassName) return H.apply(n, e.getElementsByClassName(i)), n
                    } if (d.qsa && !A[t + " "] && (!v || !v.test(t)) && (1 !== p || "object" !== e.nodeName.toLowerCase())) {
                    if (c = t, f = e, 1 === p && U.test(t)) {
                        (s = e.getAttribute("id")) ? s = s.replace(re, ie): e.setAttribute("id", s = k), o = (l = h(t)).length;
                        while (o--) l[o] = "#" + s + " " + xe(l[o]);
                        c = l.join(","), f = ee.test(t) && ye(e.parentNode) || e
                    }
                    try {
                        return H.apply(n, f.querySelectorAll(c)), n
                    } catch (e) {
                        A(t, !0)
                    } finally {
                        s === k && e.removeAttribute("id")
                    }
                }
            }
            return g(t.replace(B, "$1"), e, n, r)
        }

        function ue() {
            var r = [];
            return function e(t, n) {
                return r.push(t + " ") > b.cacheLength && delete e[r.shift()], e[t + " "] = n
            }
        }

        function le(e) {
            return e[k] = !0, e
        }

        function ce(e) {
            var t = C.createElement("fieldset");
            try {
                return !!e(t)
            } catch (e) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function fe(e, t) {
            var n = e.split("|"),
                r = n.length;
            while (r--) b.attrHandle[n[r]] = t
        }

        function pe(e, t) {
            var n = t && e,
                r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
            if (r) return r;
            if (n)
                while (n = n.nextSibling)
                    if (n === t) return -1;
            return e ? 1 : -1
        }

        function de(t) {
            return function (e) {
                return "input" === e.nodeName.toLowerCase() && e.type === t
            }
        }

        function he(n) {
            return function (e) {
                var t = e.nodeName.toLowerCase();
                return ("input" === t || "button" === t) && e.type === n
            }
        }

        function ge(t) {
            return function (e) {
                return "form" in e ? e.parentNode && !1 === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && ae(e) === t : e.disabled === t : "label" in e && e.disabled === t
            }
        }

        function ve(a) {
            return le(function (o) {
                return o = +o, le(function (e, t) {
                    var n, r = a([], e.length, o),
                        i = r.length;
                    while (i--) e[n = r[i]] && (e[n] = !(t[n] = e[n]))
                })
            })
        }

        function ye(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e
        }
        for (e in d = se.support = {}, i = se.isXML = function (e) {
                var t = e.namespaceURI,
                    n = (e.ownerDocument || e).documentElement;
                return !Y.test(t || n && n.nodeName || "HTML")
            }, T = se.setDocument = function (e) {
                var t, n, r = e ? e.ownerDocument || e : m;
                return r !== C && 9 === r.nodeType && r.documentElement && (a = (C = r).documentElement, E = !i(C), m !== C && (n = C.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", oe, !1) : n.attachEvent && n.attachEvent("onunload", oe)), d.attributes = ce(function (e) {
                    return e.className = "i", !e.getAttribute("className")
                }), d.getElementsByTagName = ce(function (e) {
                    return e.appendChild(C.createComment("")), !e.getElementsByTagName("*").length
                }), d.getElementsByClassName = K.test(C.getElementsByClassName), d.getById = ce(function (e) {
                    return a.appendChild(e).id = k, !C.getElementsByName || !C.getElementsByName(k).length
                }), d.getById ? (b.filter.ID = function (e) {
                    var t = e.replace(te, ne);
                    return function (e) {
                        return e.getAttribute("id") === t
                    }
                }, b.find.ID = function (e, t) {
                    if ("undefined" != typeof t.getElementById && E) {
                        var n = t.getElementById(e);
                        return n ? [n] : []
                    }
                }) : (b.filter.ID = function (e) {
                    var n = e.replace(te, ne);
                    return function (e) {
                        var t = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                        return t && t.value === n
                    }
                }, b.find.ID = function (e, t) {
                    if ("undefined" != typeof t.getElementById && E) {
                        var n, r, i, o = t.getElementById(e);
                        if (o) {
                            if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
                            i = t.getElementsByName(e), r = 0;
                            while (o = i[r++])
                                if ((n = o.getAttributeNode("id")) && n.value === e) return [o]
                        }
                        return []
                    }
                }), b.find.TAG = d.getElementsByTagName ? function (e, t) {
                    return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : d.qsa ? t.querySelectorAll(e) : void 0
                } : function (e, t) {
                    var n, r = [],
                        i = 0,
                        o = t.getElementsByTagName(e);
                    if ("*" === e) {
                        while (n = o[i++]) 1 === n.nodeType && r.push(n);
                        return r
                    }
                    return o
                }, b.find.CLASS = d.getElementsByClassName && function (e, t) {
                    if ("undefined" != typeof t.getElementsByClassName && E) return t.getElementsByClassName(e)
                }, s = [], v = [], (d.qsa = K.test(C.querySelectorAll)) && (ce(function (e) {
                    a.appendChild(e).innerHTML = "<a id='" + k + "'></a><select id='" + k + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && v.push("[*^$]=" + M + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || v.push("\\[" + M + "*(?:value|" + R + ")"), e.querySelectorAll("[id~=" + k + "-]").length || v.push("~="), e.querySelectorAll(":checked").length || v.push(":checked"), e.querySelectorAll("a#" + k + "+*").length || v.push(".#.+[+~]")
                }), ce(function (e) {
                    e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                    var t = C.createElement("input");
                    t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && v.push("name" + M + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && v.push(":enabled", ":disabled"), a.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && v.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), v.push(",.*:")
                })), (d.matchesSelector = K.test(c = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.msMatchesSelector)) && ce(function (e) {
                    d.disconnectedMatch = c.call(e, "*"), c.call(e, "[s!='']:x"), s.push("!=", $)
                }), v = v.length && new RegExp(v.join("|")), s = s.length && new RegExp(s.join("|")), t = K.test(a.compareDocumentPosition), y = t || K.test(a.contains) ? function (e, t) {
                    var n = 9 === e.nodeType ? e.documentElement : e,
                        r = t && t.parentNode;
                    return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
                } : function (e, t) {
                    if (t)
                        while (t = t.parentNode)
                            if (t === e) return !0;
                    return !1
                }, D = t ? function (e, t) {
                    if (e === t) return l = !0, 0;
                    var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                    return n || (1 & (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !d.sortDetached && t.compareDocumentPosition(e) === n ? e === C || e.ownerDocument === m && y(m, e) ? -1 : t === C || t.ownerDocument === m && y(m, t) ? 1 : u ? P(u, e) - P(u, t) : 0 : 4 & n ? -1 : 1)
                } : function (e, t) {
                    if (e === t) return l = !0, 0;
                    var n, r = 0,
                        i = e.parentNode,
                        o = t.parentNode,
                        a = [e],
                        s = [t];
                    if (!i || !o) return e === C ? -1 : t === C ? 1 : i ? -1 : o ? 1 : u ? P(u, e) - P(u, t) : 0;
                    if (i === o) return pe(e, t);
                    n = e;
                    while (n = n.parentNode) a.unshift(n);
                    n = t;
                    while (n = n.parentNode) s.unshift(n);
                    while (a[r] === s[r]) r++;
                    return r ? pe(a[r], s[r]) : a[r] === m ? -1 : s[r] === m ? 1 : 0
                }), C
            }, se.matches = function (e, t) {
                return se(e, null, null, t)
            }, se.matchesSelector = function (e, t) {
                if ((e.ownerDocument || e) !== C && T(e), d.matchesSelector && E && !A[t + " "] && (!s || !s.test(t)) && (!v || !v.test(t))) try {
                    var n = c.call(e, t);
                    if (n || d.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n
                } catch (e) {
                    A(t, !0)
                }
                return 0 < se(t, C, null, [e]).length
            }, se.contains = function (e, t) {
                return (e.ownerDocument || e) !== C && T(e), y(e, t)
            }, se.attr = function (e, t) {
                (e.ownerDocument || e) !== C && T(e);
                var n = b.attrHandle[t.toLowerCase()],
                    r = n && j.call(b.attrHandle, t.toLowerCase()) ? n(e, t, !E) : void 0;
                return void 0 !== r ? r : d.attributes || !E ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
            }, se.escape = function (e) {
                return (e + "").replace(re, ie)
            }, se.error = function (e) {
                throw new Error("Syntax error, unrecognized expression: " + e)
            }, se.uniqueSort = function (e) {
                var t, n = [],
                    r = 0,
                    i = 0;
                if (l = !d.detectDuplicates, u = !d.sortStable && e.slice(0), e.sort(D), l) {
                    while (t = e[i++]) t === e[i] && (r = n.push(i));
                    while (r--) e.splice(n[r], 1)
                }
                return u = null, e
            }, o = se.getText = function (e) {
                var t, n = "",
                    r = 0,
                    i = e.nodeType;
                if (i) {
                    if (1 === i || 9 === i || 11 === i) {
                        if ("string" == typeof e.textContent) return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling) n += o(e)
                    } else if (3 === i || 4 === i) return e.nodeValue
                } else
                    while (t = e[r++]) n += o(t);
                return n
            }, (b = se.selectors = {
                cacheLength: 50,
                createPseudo: le,
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
                    ATTR: function (e) {
                        return e[1] = e[1].replace(te, ne), e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                    },
                    CHILD: function (e) {
                        return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || se.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && se.error(e[0]), e
                    },
                    PSEUDO: function (e) {
                        var t, n = !e[6] && e[2];
                        return G.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && X.test(n) && (t = h(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function (e) {
                        var t = e.replace(te, ne).toLowerCase();
                        return "*" === e ? function () {
                            return !0
                        } : function (e) {
                            return e.nodeName && e.nodeName.toLowerCase() === t
                        }
                    },
                    CLASS: function (e) {
                        var t = p[e + " "];
                        return t || (t = new RegExp("(^|" + M + ")" + e + "(" + M + "|$)")) && p(e, function (e) {
                            return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                        })
                    },
                    ATTR: function (n, r, i) {
                        return function (e) {
                            var t = se.attr(e, n);
                            return null == t ? "!=" === r : !r || (t += "", "=" === r ? t === i : "!=" === r ? t !== i : "^=" === r ? i && 0 === t.indexOf(i) : "*=" === r ? i && -1 < t.indexOf(i) : "$=" === r ? i && t.slice(-i.length) === i : "~=" === r ? -1 < (" " + t.replace(F, " ") + " ").indexOf(i) : "|=" === r && (t === i || t.slice(0, i.length + 1) === i + "-"))
                        }
                    },
                    CHILD: function (h, e, t, g, v) {
                        var y = "nth" !== h.slice(0, 3),
                            m = "last" !== h.slice(-4),
                            x = "of-type" === e;
                        return 1 === g && 0 === v ? function (e) {
                            return !!e.parentNode
                        } : function (e, t, n) {
                            var r, i, o, a, s, u, l = y !== m ? "nextSibling" : "previousSibling",
                                c = e.parentNode,
                                f = x && e.nodeName.toLowerCase(),
                                p = !n && !x,
                                d = !1;
                            if (c) {
                                if (y) {
                                    while (l) {
                                        a = e;
                                        while (a = a[l])
                                            if (x ? a.nodeName.toLowerCase() === f : 1 === a.nodeType) return !1;
                                        u = l = "only" === h && !u && "nextSibling"
                                    }
                                    return !0
                                }
                                if (u = [m ? c.firstChild : c.lastChild], m && p) {
                                    d = (s = (r = (i = (o = (a = c)[k] || (a[k] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === S && r[1]) && r[2], a = s && c.childNodes[s];
                                    while (a = ++s && a && a[l] || (d = s = 0) || u.pop())
                                        if (1 === a.nodeType && ++d && a === e) {
                                            i[h] = [S, s, d];
                                            break
                                        }
                                } else if (p && (d = s = (r = (i = (o = (a = e)[k] || (a[k] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === S && r[1]), !1 === d)
                                    while (a = ++s && a && a[l] || (d = s = 0) || u.pop())
                                        if ((x ? a.nodeName.toLowerCase() === f : 1 === a.nodeType) && ++d && (p && ((i = (o = a[k] || (a[k] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] = [S, d]), a === e)) break;
                                return (d -= v) === g || d % g == 0 && 0 <= d / g
                            }
                        }
                    },
                    PSEUDO: function (e, o) {
                        var t, a = b.pseudos[e] || b.setFilters[e.toLowerCase()] || se.error("unsupported pseudo: " + e);
                        return a[k] ? a(o) : 1 < a.length ? (t = [e, e, "", o], b.setFilters.hasOwnProperty(e.toLowerCase()) ? le(function (e, t) {
                            var n, r = a(e, o),
                                i = r.length;
                            while (i--) e[n = P(e, r[i])] = !(t[n] = r[i])
                        }) : function (e) {
                            return a(e, 0, t)
                        }) : a
                    }
                },
                pseudos: {
                    not: le(function (e) {
                        var r = [],
                            i = [],
                            s = f(e.replace(B, "$1"));
                        return s[k] ? le(function (e, t, n, r) {
                            var i, o = s(e, null, r, []),
                                a = e.length;
                            while (a--)(i = o[a]) && (e[a] = !(t[a] = i))
                        }) : function (e, t, n) {
                            return r[0] = e, s(r, null, n, i), r[0] = null, !i.pop()
                        }
                    }),
                    has: le(function (t) {
                        return function (e) {
                            return 0 < se(t, e).length
                        }
                    }),
                    contains: le(function (t) {
                        return t = t.replace(te, ne),
                            function (e) {
                                return -1 < (e.textContent || o(e)).indexOf(t)
                            }
                    }),
                    lang: le(function (n) {
                        return V.test(n || "") || se.error("unsupported lang: " + n), n = n.replace(te, ne).toLowerCase(),
                            function (e) {
                                var t;
                                do {
                                    if (t = E ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-")
                                } while ((e = e.parentNode) && 1 === e.nodeType);
                                return !1
                            }
                    }),
                    target: function (e) {
                        var t = n.location && n.location.hash;
                        return t && t.slice(1) === e.id
                    },
                    root: function (e) {
                        return e === a
                    },
                    focus: function (e) {
                        return e === C.activeElement && (!C.hasFocus || C.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                    },
                    enabled: ge(!1),
                    disabled: ge(!0),
                    checked: function (e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && !!e.checked || "option" === t && !!e.selected
                    },
                    selected: function (e) {
                        return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                    },
                    empty: function (e) {
                        for (e = e.firstChild; e; e = e.nextSibling)
                            if (e.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function (e) {
                        return !b.pseudos.empty(e)
                    },
                    header: function (e) {
                        return J.test(e.nodeName)
                    },
                    input: function (e) {
                        return Q.test(e.nodeName)
                    },
                    button: function (e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && "button" === e.type || "button" === t
                    },
                    text: function (e) {
                        var t;
                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                    },
                    first: ve(function () {
                        return [0]
                    }),
                    last: ve(function (e, t) {
                        return [t - 1]
                    }),
                    eq: ve(function (e, t, n) {
                        return [n < 0 ? n + t : n]
                    }),
                    even: ve(function (e, t) {
                        for (var n = 0; n < t; n += 2) e.push(n);
                        return e
                    }),
                    odd: ve(function (e, t) {
                        for (var n = 1; n < t; n += 2) e.push(n);
                        return e
                    }),
                    lt: ve(function (e, t, n) {
                        for (var r = n < 0 ? n + t : t < n ? t : n; 0 <= --r;) e.push(r);
                        return e
                    }),
                    gt: ve(function (e, t, n) {
                        for (var r = n < 0 ? n + t : n; ++r < t;) e.push(r);
                        return e
                    })
                }
            }).pseudos.nth = b.pseudos.eq, {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) b.pseudos[e] = de(e);
        for (e in {
                submit: !0,
                reset: !0
            }) b.pseudos[e] = he(e);

        function me() {}

        function xe(e) {
            for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
            return r
        }

        function be(s, e, t) {
            var u = e.dir,
                l = e.next,
                c = l || u,
                f = t && "parentNode" === c,
                p = r++;
            return e.first ? function (e, t, n) {
                while (e = e[u])
                    if (1 === e.nodeType || f) return s(e, t, n);
                return !1
            } : function (e, t, n) {
                var r, i, o, a = [S, p];
                if (n) {
                    while (e = e[u])
                        if ((1 === e.nodeType || f) && s(e, t, n)) return !0
                } else
                    while (e = e[u])
                        if (1 === e.nodeType || f)
                            if (i = (o = e[k] || (e[k] = {}))[e.uniqueID] || (o[e.uniqueID] = {}), l && l === e.nodeName.toLowerCase()) e = e[u] || e;
                            else {
                                if ((r = i[c]) && r[0] === S && r[1] === p) return a[2] = r[2];
                                if ((i[c] = a)[2] = s(e, t, n)) return !0
                            } return !1
            }
        }

        function we(i) {
            return 1 < i.length ? function (e, t, n) {
                var r = i.length;
                while (r--)
                    if (!i[r](e, t, n)) return !1;
                return !0
            } : i[0]
        }

        function Te(e, t, n, r, i) {
            for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++)(o = e[s]) && (n && !n(o, r, i) || (a.push(o), l && t.push(s)));
            return a
        }

        function Ce(d, h, g, v, y, e) {
            return v && !v[k] && (v = Ce(v)), y && !y[k] && (y = Ce(y, e)), le(function (e, t, n, r) {
                var i, o, a, s = [],
                    u = [],
                    l = t.length,
                    c = e || function (e, t, n) {
                        for (var r = 0, i = t.length; r < i; r++) se(e, t[r], n);
                        return n
                    }(h || "*", n.nodeType ? [n] : n, []),
                    f = !d || !e && h ? c : Te(c, s, d, n, r),
                    p = g ? y || (e ? d : l || v) ? [] : t : f;
                if (g && g(f, p, n, r), v) {
                    i = Te(p, u), v(i, [], n, r), o = i.length;
                    while (o--)(a = i[o]) && (p[u[o]] = !(f[u[o]] = a))
                }
                if (e) {
                    if (y || d) {
                        if (y) {
                            i = [], o = p.length;
                            while (o--)(a = p[o]) && i.push(f[o] = a);
                            y(null, p = [], i, r)
                        }
                        o = p.length;
                        while (o--)(a = p[o]) && -1 < (i = y ? P(e, a) : s[o]) && (e[i] = !(t[i] = a))
                    }
                } else p = Te(p === t ? p.splice(l, p.length) : p), y ? y(null, t, p, r) : H.apply(t, p)
            })
        }

        function Ee(e) {
            for (var i, t, n, r = e.length, o = b.relative[e[0].type], a = o || b.relative[" "], s = o ? 1 : 0, u = be(function (e) {
                    return e === i
                }, a, !0), l = be(function (e) {
                    return -1 < P(i, e)
                }, a, !0), c = [function (e, t, n) {
                    var r = !o && (n || t !== w) || ((i = t).nodeType ? u(e, t, n) : l(e, t, n));
                    return i = null, r
                }]; s < r; s++)
                if (t = b.relative[e[s].type]) c = [be(we(c), t)];
                else {
                    if ((t = b.filter[e[s].type].apply(null, e[s].matches))[k]) {
                        for (n = ++s; n < r; n++)
                            if (b.relative[e[n].type]) break;
                        return Ce(1 < s && we(c), 1 < s && xe(e.slice(0, s - 1).concat({
                            value: " " === e[s - 2].type ? "*" : ""
                        })).replace(B, "$1"), t, s < n && Ee(e.slice(s, n)), n < r && Ee(e = e.slice(n)), n < r && xe(e))
                    }
                    c.push(t)
                } return we(c)
        }
        return me.prototype = b.filters = b.pseudos, b.setFilters = new me, h = se.tokenize = function (e, t) {
            var n, r, i, o, a, s, u, l = x[e + " "];
            if (l) return t ? 0 : l.slice(0);
            a = e, s = [], u = b.preFilter;
            while (a) {
                for (o in n && !(r = _.exec(a)) || (r && (a = a.slice(r[0].length) || a), s.push(i = [])), n = !1, (r = z.exec(a)) && (n = r.shift(), i.push({
                        value: n,
                        type: r[0].replace(B, " ")
                    }), a = a.slice(n.length)), b.filter) !(r = G[o].exec(a)) || u[o] && !(r = u[o](r)) || (n = r.shift(), i.push({
                    value: n,
                    type: o,
                    matches: r
                }), a = a.slice(n.length));
                if (!n) break
            }
            return t ? a.length : a ? se.error(e) : x(e, s).slice(0)
        }, f = se.compile = function (e, t) {
            var n, v, y, m, x, r, i = [],
                o = [],
                a = N[e + " "];
            if (!a) {
                t || (t = h(e)), n = t.length;
                while (n--)(a = Ee(t[n]))[k] ? i.push(a) : o.push(a);
                (a = N(e, (v = o, m = 0 < (y = i).length, x = 0 < v.length, r = function (e, t, n, r, i) {
                    var o, a, s, u = 0,
                        l = "0",
                        c = e && [],
                        f = [],
                        p = w,
                        d = e || x && b.find.TAG("*", i),
                        h = S += null == p ? 1 : Math.random() || .1,
                        g = d.length;
                    for (i && (w = t === C || t || i); l !== g && null != (o = d[l]); l++) {
                        if (x && o) {
                            a = 0, t || o.ownerDocument === C || (T(o), n = !E);
                            while (s = v[a++])
                                if (s(o, t || C, n)) {
                                    r.push(o);
                                    break
                                } i && (S = h)
                        }
                        m && ((o = !s && o) && u--, e && c.push(o))
                    }
                    if (u += l, m && l !== u) {
                        a = 0;
                        while (s = y[a++]) s(c, f, t, n);
                        if (e) {
                            if (0 < u)
                                while (l--) c[l] || f[l] || (f[l] = q.call(r));
                            f = Te(f)
                        }
                        H.apply(r, f), i && !e && 0 < f.length && 1 < u + y.length && se.uniqueSort(r)
                    }
                    return i && (S = h, w = p), c
                }, m ? le(r) : r))).selector = e
            }
            return a
        }, g = se.select = function (e, t, n, r) {
            var i, o, a, s, u, l = "function" == typeof e && e,
                c = !r && h(e = l.selector || e);
            if (n = n || [], 1 === c.length) {
                if (2 < (o = c[0] = c[0].slice(0)).length && "ID" === (a = o[0]).type && 9 === t.nodeType && E && b.relative[o[1].type]) {
                    if (!(t = (b.find.ID(a.matches[0].replace(te, ne), t) || [])[0])) return n;
                    l && (t = t.parentNode), e = e.slice(o.shift().value.length)
                }
                i = G.needsContext.test(e) ? 0 : o.length;
                while (i--) {
                    if (a = o[i], b.relative[s = a.type]) break;
                    if ((u = b.find[s]) && (r = u(a.matches[0].replace(te, ne), ee.test(o[0].type) && ye(t.parentNode) || t))) {
                        if (o.splice(i, 1), !(e = r.length && xe(o))) return H.apply(n, r), n;
                        break
                    }
                }
            }
            return (l || f(e, c))(r, t, !E, n, !t || ee.test(e) && ye(t.parentNode) || t), n
        }, d.sortStable = k.split("").sort(D).join("") === k, d.detectDuplicates = !!l, T(), d.sortDetached = ce(function (e) {
            return 1 & e.compareDocumentPosition(C.createElement("fieldset"))
        }), ce(function (e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || fe("type|href|height|width", function (e, t, n) {
            if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), d.attributes && ce(function (e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || fe("value", function (e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
        }), ce(function (e) {
            return null == e.getAttribute("disabled")
        }) || fe(R, function (e, t, n) {
            var r;
            if (!n) return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }), se
    }(C);
    k.find = h, k.expr = h.selectors, k.expr[":"] = k.expr.pseudos, k.uniqueSort = k.unique = h.uniqueSort, k.text = h.getText, k.isXMLDoc = h.isXML, k.contains = h.contains, k.escapeSelector = h.escape;
    var T = function (e, t, n) {
            var r = [],
                i = void 0 !== n;
            while ((e = e[t]) && 9 !== e.nodeType)
                if (1 === e.nodeType) {
                    if (i && k(e).is(n)) break;
                    r.push(e)
                } return r
        },
        S = function (e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        },
        N = k.expr.match.needsContext;

    function A(e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }
    var D = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

    function j(e, n, r) {
        return m(n) ? k.grep(e, function (e, t) {
            return !!n.call(e, t, e) !== r
        }) : n.nodeType ? k.grep(e, function (e) {
            return e === n !== r
        }) : "string" != typeof n ? k.grep(e, function (e) {
            return -1 < i.call(n, e) !== r
        }) : k.filter(n, e, r)
    }
    k.filter = function (e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? k.find.matchesSelector(r, e) ? [r] : [] : k.find.matches(e, k.grep(t, function (e) {
            return 1 === e.nodeType
        }))
    }, k.fn.extend({
        find: function (e) {
            var t, n, r = this.length,
                i = this;
            if ("string" != typeof e) return this.pushStack(k(e).filter(function () {
                for (t = 0; t < r; t++)
                    if (k.contains(i[t], this)) return !0
            }));
            for (n = this.pushStack([]), t = 0; t < r; t++) k.find(e, i[t], n);
            return 1 < r ? k.uniqueSort(n) : n
        },
        filter: function (e) {
            return this.pushStack(j(this, e || [], !1))
        },
        not: function (e) {
            return this.pushStack(j(this, e || [], !0))
        },
        is: function (e) {
            return !!j(this, "string" == typeof e && N.test(e) ? k(e) : e || [], !1).length
        }
    });
    var q, L = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (k.fn.init = function (e, t, n) {
        var r, i;
        if (!e) return this;
        if (n = n || q, "string" == typeof e) {
            if (!(r = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : L.exec(e)) || !r[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
            if (r[1]) {
                if (t = t instanceof k ? t[0] : t, k.merge(this, k.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : E, !0)), D.test(r[1]) && k.isPlainObject(t))
                    for (r in t) m(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                return this
            }
            return (i = E.getElementById(r[2])) && (this[0] = i, this.length = 1), this
        }
        return e.nodeType ? (this[0] = e, this.length = 1, this) : m(e) ? void 0 !== n.ready ? n.ready(e) : e(k) : k.makeArray(e, this)
    }).prototype = k.fn, q = k(E);
    var H = /^(?:parents|prev(?:Until|All))/,
        O = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };

    function P(e, t) {
        while ((e = e[t]) && 1 !== e.nodeType);
        return e
    }
    k.fn.extend({
        has: function (e) {
            var t = k(e, this),
                n = t.length;
            return this.filter(function () {
                for (var e = 0; e < n; e++)
                    if (k.contains(this, t[e])) return !0
            })
        },
        closest: function (e, t) {
            var n, r = 0,
                i = this.length,
                o = [],
                a = "string" != typeof e && k(e);
            if (!N.test(e))
                for (; r < i; r++)
                    for (n = this[r]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (a ? -1 < a.index(n) : 1 === n.nodeType && k.find.matchesSelector(n, e))) {
                            o.push(n);
                            break
                        } return this.pushStack(1 < o.length ? k.uniqueSort(o) : o)
        },
        index: function (e) {
            return e ? "string" == typeof e ? i.call(k(e), this[0]) : i.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function (e, t) {
            return this.pushStack(k.uniqueSort(k.merge(this.get(), k(e, t))))
        },
        addBack: function (e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), k.each({
        parent: function (e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function (e) {
            return T(e, "parentNode")
        },
        parentsUntil: function (e, t, n) {
            return T(e, "parentNode", n)
        },
        next: function (e) {
            return P(e, "nextSibling")
        },
        prev: function (e) {
            return P(e, "previousSibling")
        },
        nextAll: function (e) {
            return T(e, "nextSibling")
        },
        prevAll: function (e) {
            return T(e, "previousSibling")
        },
        nextUntil: function (e, t, n) {
            return T(e, "nextSibling", n)
        },
        prevUntil: function (e, t, n) {
            return T(e, "previousSibling", n)
        },
        siblings: function (e) {
            return S((e.parentNode || {}).firstChild, e)
        },
        children: function (e) {
            return S(e.firstChild)
        },
        contents: function (e) {
            return "undefined" != typeof e.contentDocument ? e.contentDocument : (A(e, "template") && (e = e.content || e), k.merge([], e.childNodes))
        }
    }, function (r, i) {
        k.fn[r] = function (e, t) {
            var n = k.map(this, i, e);
            return "Until" !== r.slice(-5) && (t = e), t && "string" == typeof t && (n = k.filter(t, n)), 1 < this.length && (O[r] || k.uniqueSort(n), H.test(r) && n.reverse()), this.pushStack(n)
        }
    });
    var R = /[^\x20\t\r\n\f]+/g;

    function M(e) {
        return e
    }

    function I(e) {
        throw e
    }

    function W(e, t, n, r) {
        var i;
        try {
            e && m(i = e.promise) ? i.call(e).done(t).fail(n) : e && m(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r))
        } catch (e) {
            n.apply(void 0, [e])
        }
    }
    k.Callbacks = function (r) {
        var e, n;
        r = "string" == typeof r ? (e = r, n = {}, k.each(e.match(R) || [], function (e, t) {
            n[t] = !0
        }), n) : k.extend({}, r);
        var i, t, o, a, s = [],
            u = [],
            l = -1,
            c = function () {
                for (a = a || r.once, o = i = !0; u.length; l = -1) {
                    t = u.shift();
                    while (++l < s.length) !1 === s[l].apply(t[0], t[1]) && r.stopOnFalse && (l = s.length, t = !1)
                }
                r.memory || (t = !1), i = !1, a && (s = t ? [] : "")
            },
            f = {
                add: function () {
                    return s && (t && !i && (l = s.length - 1, u.push(t)), function n(e) {
                        k.each(e, function (e, t) {
                            m(t) ? r.unique && f.has(t) || s.push(t) : t && t.length && "string" !== w(t) && n(t)
                        })
                    }(arguments), t && !i && c()), this
                },
                remove: function () {
                    return k.each(arguments, function (e, t) {
                        var n;
                        while (-1 < (n = k.inArray(t, s, n))) s.splice(n, 1), n <= l && l--
                    }), this
                },
                has: function (e) {
                    return e ? -1 < k.inArray(e, s) : 0 < s.length
                },
                empty: function () {
                    return s && (s = []), this
                },
                disable: function () {
                    return a = u = [], s = t = "", this
                },
                disabled: function () {
                    return !s
                },
                lock: function () {
                    return a = u = [], t || i || (s = t = ""), this
                },
                locked: function () {
                    return !!a
                },
                fireWith: function (e, t) {
                    return a || (t = [e, (t = t || []).slice ? t.slice() : t], u.push(t), i || c()), this
                },
                fire: function () {
                    return f.fireWith(this, arguments), this
                },
                fired: function () {
                    return !!o
                }
            };
        return f
    }, k.extend({
        Deferred: function (e) {
            var o = [
                    ["notify", "progress", k.Callbacks("memory"), k.Callbacks("memory"), 2],
                    ["resolve", "done", k.Callbacks("once memory"), k.Callbacks("once memory"), 0, "resolved"],
                    ["reject", "fail", k.Callbacks("once memory"), k.Callbacks("once memory"), 1, "rejected"]
                ],
                i = "pending",
                a = {
                    state: function () {
                        return i
                    },
                    always: function () {
                        return s.done(arguments).fail(arguments), this
                    },
                    "catch": function (e) {
                        return a.then(null, e)
                    },
                    pipe: function () {
                        var i = arguments;
                        return k.Deferred(function (r) {
                            k.each(o, function (e, t) {
                                var n = m(i[t[4]]) && i[t[4]];
                                s[t[1]](function () {
                                    var e = n && n.apply(this, arguments);
                                    e && m(e.promise) ? e.promise().progress(r.notify).done(r.resolve).fail(r.reject) : r[t[0] + "With"](this, n ? [e] : arguments)
                                })
                            }), i = null
                        }).promise()
                    },
                    then: function (t, n, r) {
                        var u = 0;

                        function l(i, o, a, s) {
                            return function () {
                                var n = this,
                                    r = arguments,
                                    e = function () {
                                        var e, t;
                                        if (!(i < u)) {
                                            if ((e = a.apply(n, r)) === o.promise()) throw new TypeError("Thenable self-resolution");
                                            t = e && ("object" == typeof e || "function" == typeof e) && e.then, m(t) ? s ? t.call(e, l(u, o, M, s), l(u, o, I, s)) : (u++, t.call(e, l(u, o, M, s), l(u, o, I, s), l(u, o, M, o.notifyWith))) : (a !== M && (n = void 0, r = [e]), (s || o.resolveWith)(n, r))
                                        }
                                    },
                                    t = s ? e : function () {
                                        try {
                                            e()
                                        } catch (e) {
                                            k.Deferred.exceptionHook && k.Deferred.exceptionHook(e, t.stackTrace), u <= i + 1 && (a !== I && (n = void 0, r = [e]), o.rejectWith(n, r))
                                        }
                                    };
                                i ? t() : (k.Deferred.getStackHook && (t.stackTrace = k.Deferred.getStackHook()), C.setTimeout(t))
                            }
                        }
                        return k.Deferred(function (e) {
                            o[0][3].add(l(0, e, m(r) ? r : M, e.notifyWith)), o[1][3].add(l(0, e, m(t) ? t : M)), o[2][3].add(l(0, e, m(n) ? n : I))
                        }).promise()
                    },
                    promise: function (e) {
                        return null != e ? k.extend(e, a) : a
                    }
                },
                s = {};
            return k.each(o, function (e, t) {
                var n = t[2],
                    r = t[5];
                a[t[1]] = n.add, r && n.add(function () {
                    i = r
                }, o[3 - e][2].disable, o[3 - e][3].disable, o[0][2].lock, o[0][3].lock), n.add(t[3].fire), s[t[0]] = function () {
                    return s[t[0] + "With"](this === s ? void 0 : this, arguments), this
                }, s[t[0] + "With"] = n.fireWith
            }), a.promise(s), e && e.call(s, s), s
        },
        when: function (e) {
            var n = arguments.length,
                t = n,
                r = Array(t),
                i = s.call(arguments),
                o = k.Deferred(),
                a = function (t) {
                    return function (e) {
                        r[t] = this, i[t] = 1 < arguments.length ? s.call(arguments) : e, --n || o.resolveWith(r, i)
                    }
                };
            if (n <= 1 && (W(e, o.done(a(t)).resolve, o.reject, !n), "pending" === o.state() || m(i[t] && i[t].then))) return o.then();
            while (t--) W(i[t], a(t), o.reject);
            return o.promise()
        }
    });
    var $ = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    k.Deferred.exceptionHook = function (e, t) {
        C.console && C.console.warn && e && $.test(e.name) && C.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t)
    }, k.readyException = function (e) {
        C.setTimeout(function () {
            throw e
        })
    };
    var F = k.Deferred();

    function B() {
        E.removeEventListener("DOMContentLoaded", B), C.removeEventListener("load", B), k.ready()
    }
    k.fn.ready = function (e) {
        return F.then(e)["catch"](function (e) {
            k.readyException(e)
        }), this
    }, k.extend({
        isReady: !1,
        readyWait: 1,
        ready: function (e) {
            (!0 === e ? --k.readyWait : k.isReady) || (k.isReady = !0) !== e && 0 < --k.readyWait || F.resolveWith(E, [k])
        }
    }), k.ready.then = F.then, "complete" === E.readyState || "loading" !== E.readyState && !E.documentElement.doScroll ? C.setTimeout(k.ready) : (E.addEventListener("DOMContentLoaded", B), C.addEventListener("load", B));
    var _ = function (e, t, n, r, i, o, a) {
            var s = 0,
                u = e.length,
                l = null == n;
            if ("object" === w(n))
                for (s in i = !0, n) _(e, t, s, n[s], !0, o, a);
            else if (void 0 !== r && (i = !0, m(r) || (a = !0), l && (a ? (t.call(e, r), t = null) : (l = t, t = function (e, t, n) {
                    return l.call(k(e), n)
                })), t))
                for (; s < u; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
            return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
        },
        z = /^-ms-/,
        U = /-([a-z])/g;

    function X(e, t) {
        return t.toUpperCase()
    }

    function V(e) {
        return e.replace(z, "ms-").replace(U, X)
    }
    var G = function (e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
    };

    function Y() {
        this.expando = k.expando + Y.uid++
    }
    Y.uid = 1, Y.prototype = {
        cache: function (e) {
            var t = e[this.expando];
            return t || (t = {}, G(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))), t
        },
        set: function (e, t, n) {
            var r, i = this.cache(e);
            if ("string" == typeof t) i[V(t)] = n;
            else
                for (r in t) i[V(r)] = t[r];
            return i
        },
        get: function (e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][V(t)]
        },
        access: function (e, t, n) {
            return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t)
        },
        remove: function (e, t) {
            var n, r = e[this.expando];
            if (void 0 !== r) {
                if (void 0 !== t) {
                    n = (t = Array.isArray(t) ? t.map(V) : (t = V(t)) in r ? [t] : t.match(R) || []).length;
                    while (n--) delete r[t[n]]
                }(void 0 === t || k.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
            }
        },
        hasData: function (e) {
            var t = e[this.expando];
            return void 0 !== t && !k.isEmptyObject(t)
        }
    };
    var Q = new Y,
        J = new Y,
        K = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        Z = /[A-Z]/g;

    function ee(e, t, n) {
        var r, i;
        if (void 0 === n && 1 === e.nodeType)
            if (r = "data-" + t.replace(Z, "-$&").toLowerCase(), "string" == typeof (n = e.getAttribute(r))) {
                try {
                    n = "true" === (i = n) || "false" !== i && ("null" === i ? null : i === +i + "" ? +i : K.test(i) ? JSON.parse(i) : i)
                } catch (e) {}
                J.set(e, t, n)
            } else n = void 0;
        return n
    }
    k.extend({
        hasData: function (e) {
            return J.hasData(e) || Q.hasData(e)
        },
        data: function (e, t, n) {
            return J.access(e, t, n)
        },
        removeData: function (e, t) {
            J.remove(e, t)
        },
        _data: function (e, t, n) {
            return Q.access(e, t, n)
        },
        _removeData: function (e, t) {
            Q.remove(e, t)
        }
    }), k.fn.extend({
        data: function (n, e) {
            var t, r, i, o = this[0],
                a = o && o.attributes;
            if (void 0 === n) {
                if (this.length && (i = J.get(o), 1 === o.nodeType && !Q.get(o, "hasDataAttrs"))) {
                    t = a.length;
                    while (t--) a[t] && 0 === (r = a[t].name).indexOf("data-") && (r = V(r.slice(5)), ee(o, r, i[r]));
                    Q.set(o, "hasDataAttrs", !0)
                }
                return i
            }
            return "object" == typeof n ? this.each(function () {
                J.set(this, n)
            }) : _(this, function (e) {
                var t;
                if (o && void 0 === e) return void 0 !== (t = J.get(o, n)) ? t : void 0 !== (t = ee(o, n)) ? t : void 0;
                this.each(function () {
                    J.set(this, n, e)
                })
            }, null, e, 1 < arguments.length, null, !0)
        },
        removeData: function (e) {
            return this.each(function () {
                J.remove(this, e)
            })
        }
    }), k.extend({
        queue: function (e, t, n) {
            var r;
            if (e) return t = (t || "fx") + "queue", r = Q.get(e, t), n && (!r || Array.isArray(n) ? r = Q.access(e, t, k.makeArray(n)) : r.push(n)), r || []
        },
        dequeue: function (e, t) {
            t = t || "fx";
            var n = k.queue(e, t),
                r = n.length,
                i = n.shift(),
                o = k._queueHooks(e, t);
            "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, function () {
                k.dequeue(e, t)
            }, o)), !r && o && o.empty.fire()
        },
        _queueHooks: function (e, t) {
            var n = t + "queueHooks";
            return Q.get(e, n) || Q.access(e, n, {
                empty: k.Callbacks("once memory").add(function () {
                    Q.remove(e, [t + "queue", n])
                })
            })
        }
    }), k.fn.extend({
        queue: function (t, n) {
            var e = 2;
            return "string" != typeof t && (n = t, t = "fx", e--), arguments.length < e ? k.queue(this[0], t) : void 0 === n ? this : this.each(function () {
                var e = k.queue(this, t, n);
                k._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && k.dequeue(this, t)
            })
        },
        dequeue: function (e) {
            return this.each(function () {
                k.dequeue(this, e)
            })
        },
        clearQueue: function (e) {
            return this.queue(e || "fx", [])
        },
        promise: function (e, t) {
            var n, r = 1,
                i = k.Deferred(),
                o = this,
                a = this.length,
                s = function () {
                    --r || i.resolveWith(o, [o])
                };
            "string" != typeof e && (t = e, e = void 0), e = e || "fx";
            while (a--)(n = Q.get(o[a], e + "queueHooks")) && n.empty && (r++, n.empty.add(s));
            return s(), i.promise(t)
        }
    });
    var te = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        ne = new RegExp("^(?:([+-])=|)(" + te + ")([a-z%]*)$", "i"),
        re = ["Top", "Right", "Bottom", "Left"],
        ie = E.documentElement,
        oe = function (e) {
            return k.contains(e.ownerDocument, e)
        },
        ae = {
            composed: !0
        };
    ie.getRootNode && (oe = function (e) {
        return k.contains(e.ownerDocument, e) || e.getRootNode(ae) === e.ownerDocument
    });
    var se = function (e, t) {
            return "none" === (e = t || e).style.display || "" === e.style.display && oe(e) && "none" === k.css(e, "display")
        },
        ue = function (e, t, n, r) {
            var i, o, a = {};
            for (o in t) a[o] = e.style[o], e.style[o] = t[o];
            for (o in i = n.apply(e, r || []), t) e.style[o] = a[o];
            return i
        };

    function le(e, t, n, r) {
        var i, o, a = 20,
            s = r ? function () {
                return r.cur()
            } : function () {
                return k.css(e, t, "")
            },
            u = s(),
            l = n && n[3] || (k.cssNumber[t] ? "" : "px"),
            c = e.nodeType && (k.cssNumber[t] || "px" !== l && +u) && ne.exec(k.css(e, t));
        if (c && c[3] !== l) {
            u /= 2, l = l || c[3], c = +u || 1;
            while (a--) k.style(e, t, c + l), (1 - o) * (1 - (o = s() / u || .5)) <= 0 && (a = 0), c /= o;
            c *= 2, k.style(e, t, c + l), n = n || []
        }
        return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = i)), i
    }
    var ce = {};

    function fe(e, t) {
        for (var n, r, i, o, a, s, u, l = [], c = 0, f = e.length; c < f; c++)(r = e[c]).style && (n = r.style.display, t ? ("none" === n && (l[c] = Q.get(r, "display") || null, l[c] || (r.style.display = "")), "" === r.style.display && se(r) && (l[c] = (u = a = o = void 0, a = (i = r).ownerDocument, s = i.nodeName, (u = ce[s]) || (o = a.body.appendChild(a.createElement(s)), u = k.css(o, "display"), o.parentNode.removeChild(o), "none" === u && (u = "block"), ce[s] = u)))) : "none" !== n && (l[c] = "none", Q.set(r, "display", n)));
        for (c = 0; c < f; c++) null != l[c] && (e[c].style.display = l[c]);
        return e
    }
    k.fn.extend({
        show: function () {
            return fe(this, !0)
        },
        hide: function () {
            return fe(this)
        },
        toggle: function (e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
                se(this) ? k(this).show() : k(this).hide()
            })
        }
    });
    var pe = /^(?:checkbox|radio)$/i,
        de = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
        he = /^$|^module$|\/(?:java|ecma)script/i,
        ge = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };

    function ve(e, t) {
        var n;
        return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && A(e, t) ? k.merge([e], n) : n
    }

    function ye(e, t) {
        for (var n = 0, r = e.length; n < r; n++) Q.set(e[n], "globalEval", !t || Q.get(t[n], "globalEval"))
    }
    ge.optgroup = ge.option, ge.tbody = ge.tfoot = ge.colgroup = ge.caption = ge.thead, ge.th = ge.td;
    var me, xe, be = /<|&#?\w+;/;

    function we(e, t, n, r, i) {
        for (var o, a, s, u, l, c, f = t.createDocumentFragment(), p = [], d = 0, h = e.length; d < h; d++)
            if ((o = e[d]) || 0 === o)
                if ("object" === w(o)) k.merge(p, o.nodeType ? [o] : o);
                else if (be.test(o)) {
            a = a || f.appendChild(t.createElement("div")), s = (de.exec(o) || ["", ""])[1].toLowerCase(), u = ge[s] || ge._default, a.innerHTML = u[1] + k.htmlPrefilter(o) + u[2], c = u[0];
            while (c--) a = a.lastChild;
            k.merge(p, a.childNodes), (a = f.firstChild).textContent = ""
        } else p.push(t.createTextNode(o));
        f.textContent = "", d = 0;
        while (o = p[d++])
            if (r && -1 < k.inArray(o, r)) i && i.push(o);
            else if (l = oe(o), a = ve(f.appendChild(o), "script"), l && ye(a), n) {
            c = 0;
            while (o = a[c++]) he.test(o.type || "") && n.push(o)
        }
        return f
    }
    me = E.createDocumentFragment().appendChild(E.createElement("div")), (xe = E.createElement("input")).setAttribute("type", "radio"), xe.setAttribute("checked", "checked"), xe.setAttribute("name", "t"), me.appendChild(xe), y.checkClone = me.cloneNode(!0).cloneNode(!0).lastChild.checked, me.innerHTML = "<textarea>x</textarea>", y.noCloneChecked = !!me.cloneNode(!0).lastChild.defaultValue;
    var Te = /^key/,
        Ce = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        Ee = /^([^.]*)(?:\.(.+)|)/;

    function ke() {
        return !0
    }

    function Se() {
        return !1
    }

    function Ne(e, t) {
        return e === function () {
            try {
                return E.activeElement
            } catch (e) {}
        }() == ("focus" === t)
    }

    function Ae(e, t, n, r, i, o) {
        var a, s;
        if ("object" == typeof t) {
            for (s in "string" != typeof n && (r = r || n, n = void 0), t) Ae(e, s, n, r, t[s], o);
            return e
        }
        if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), !1 === i) i = Se;
        else if (!i) return e;
        return 1 === o && (a = i, (i = function (e) {
            return k().off(e), a.apply(this, arguments)
        }).guid = a.guid || (a.guid = k.guid++)), e.each(function () {
            k.event.add(this, t, i, r, n)
        })
    }

    function De(e, i, o) {
        o ? (Q.set(e, i, !1), k.event.add(e, i, {
            namespace: !1,
            handler: function (e) {
                var t, n, r = Q.get(this, i);
                if (1 & e.isTrigger && this[i]) {
                    if (r.length)(k.event.special[i] || {}).delegateType && e.stopPropagation();
                    else if (r = s.call(arguments), Q.set(this, i, r), t = o(this, i), this[i](), r !== (n = Q.get(this, i)) || t ? Q.set(this, i, !1) : n = {}, r !== n) return e.stopImmediatePropagation(), e.preventDefault(), n.value
                } else r.length && (Q.set(this, i, {
                    value: k.event.trigger(k.extend(r[0], k.Event.prototype), r.slice(1), this)
                }), e.stopImmediatePropagation())
            }
        })) : void 0 === Q.get(e, i) && k.event.add(e, i, ke)
    }
    k.event = {
        global: {},
        add: function (t, e, n, r, i) {
            var o, a, s, u, l, c, f, p, d, h, g, v = Q.get(t);
            if (v) {
                n.handler && (n = (o = n).handler, i = o.selector), i && k.find.matchesSelector(ie, i), n.guid || (n.guid = k.guid++), (u = v.events) || (u = v.events = {}), (a = v.handle) || (a = v.handle = function (e) {
                    return "undefined" != typeof k && k.event.triggered !== e.type ? k.event.dispatch.apply(t, arguments) : void 0
                }), l = (e = (e || "").match(R) || [""]).length;
                while (l--) d = g = (s = Ee.exec(e[l]) || [])[1], h = (s[2] || "").split(".").sort(), d && (f = k.event.special[d] || {}, d = (i ? f.delegateType : f.bindType) || d, f = k.event.special[d] || {}, c = k.extend({
                    type: d,
                    origType: g,
                    data: r,
                    handler: n,
                    guid: n.guid,
                    selector: i,
                    needsContext: i && k.expr.match.needsContext.test(i),
                    namespace: h.join(".")
                }, o), (p = u[d]) || ((p = u[d] = []).delegateCount = 0, f.setup && !1 !== f.setup.call(t, r, h, a) || t.addEventListener && t.addEventListener(d, a)), f.add && (f.add.call(t, c), c.handler.guid || (c.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, c) : p.push(c), k.event.global[d] = !0)
            }
        },
        remove: function (e, t, n, r, i) {
            var o, a, s, u, l, c, f, p, d, h, g, v = Q.hasData(e) && Q.get(e);
            if (v && (u = v.events)) {
                l = (t = (t || "").match(R) || [""]).length;
                while (l--)
                    if (d = g = (s = Ee.exec(t[l]) || [])[1], h = (s[2] || "").split(".").sort(), d) {
                        f = k.event.special[d] || {}, p = u[d = (r ? f.delegateType : f.bindType) || d] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = p.length;
                        while (o--) c = p[o], !i && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1), c.selector && p.delegateCount--, f.remove && f.remove.call(e, c));
                        a && !p.length && (f.teardown && !1 !== f.teardown.call(e, h, v.handle) || k.removeEvent(e, d, v.handle), delete u[d])
                    } else
                        for (d in u) k.event.remove(e, d + t[l], n, r, !0);
                k.isEmptyObject(u) && Q.remove(e, "handle events")
            }
        },
        dispatch: function (e) {
            var t, n, r, i, o, a, s = k.event.fix(e),
                u = new Array(arguments.length),
                l = (Q.get(this, "events") || {})[s.type] || [],
                c = k.event.special[s.type] || {};
            for (u[0] = s, t = 1; t < arguments.length; t++) u[t] = arguments[t];
            if (s.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, s)) {
                a = k.event.handlers.call(this, s, l), t = 0;
                while ((i = a[t++]) && !s.isPropagationStopped()) {
                    s.currentTarget = i.elem, n = 0;
                    while ((o = i.handlers[n++]) && !s.isImmediatePropagationStopped()) s.rnamespace && !1 !== o.namespace && !s.rnamespace.test(o.namespace) || (s.handleObj = o, s.data = o.data, void 0 !== (r = ((k.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, u)) && !1 === (s.result = r) && (s.preventDefault(), s.stopPropagation()))
                }
                return c.postDispatch && c.postDispatch.call(this, s), s.result
            }
        },
        handlers: function (e, t) {
            var n, r, i, o, a, s = [],
                u = t.delegateCount,
                l = e.target;
            if (u && l.nodeType && !("click" === e.type && 1 <= e.button))
                for (; l !== this; l = l.parentNode || this)
                    if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
                        for (o = [], a = {}, n = 0; n < u; n++) void 0 === a[i = (r = t[n]).selector + " "] && (a[i] = r.needsContext ? -1 < k(i, this).index(l) : k.find(i, this, null, [l]).length), a[i] && o.push(r);
                        o.length && s.push({
                            elem: l,
                            handlers: o
                        })
                    } return l = this, u < t.length && s.push({
                elem: l,
                handlers: t.slice(u)
            }), s
        },
        addProp: function (t, e) {
            Object.defineProperty(k.Event.prototype, t, {
                enumerable: !0,
                configurable: !0,
                get: m(e) ? function () {
                    if (this.originalEvent) return e(this.originalEvent)
                } : function () {
                    if (this.originalEvent) return this.originalEvent[t]
                },
                set: function (e) {
                    Object.defineProperty(this, t, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: e
                    })
                }
            })
        },
        fix: function (e) {
            return e[k.expando] ? e : new k.Event(e)
        },
        special: {
            load: {
                noBubble: !0
            },
            click: {
                setup: function (e) {
                    var t = this || e;
                    return pe.test(t.type) && t.click && A(t, "input") && De(t, "click", ke), !1
                },
                trigger: function (e) {
                    var t = this || e;
                    return pe.test(t.type) && t.click && A(t, "input") && De(t, "click"), !0
                },
                _default: function (e) {
                    var t = e.target;
                    return pe.test(t.type) && t.click && A(t, "input") && Q.get(t, "click") || A(t, "a")
                }
            },
            beforeunload: {
                postDispatch: function (e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        }
    }, k.removeEvent = function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    }, k.Event = function (e, t) {
        if (!(this instanceof k.Event)) return new k.Event(e, t);
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? ke : Se, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && k.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[k.expando] = !0
    }, k.Event.prototype = {
        constructor: k.Event,
        isDefaultPrevented: Se,
        isPropagationStopped: Se,
        isImmediatePropagationStopped: Se,
        isSimulated: !1,
        preventDefault: function () {
            var e = this.originalEvent;
            this.isDefaultPrevented = ke, e && !this.isSimulated && e.preventDefault()
        },
        stopPropagation: function () {
            var e = this.originalEvent;
            this.isPropagationStopped = ke, e && !this.isSimulated && e.stopPropagation()
        },
        stopImmediatePropagation: function () {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = ke, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, k.each({
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
        "char": !0,
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
        which: function (e) {
            var t = e.button;
            return null == e.which && Te.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && Ce.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
        }
    }, k.event.addProp), k.each({
        focus: "focusin",
        blur: "focusout"
    }, function (e, t) {
        k.event.special[e] = {
            setup: function () {
                return De(this, e, Ne), !1
            },
            trigger: function () {
                return De(this, e), !0
            },
            delegateType: t
        }
    }), k.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function (e, i) {
        k.event.special[e] = {
            delegateType: i,
            bindType: i,
            handle: function (e) {
                var t, n = e.relatedTarget,
                    r = e.handleObj;
                return n && (n === this || k.contains(this, n)) || (e.type = r.origType, t = r.handler.apply(this, arguments), e.type = i), t
            }
        }
    }), k.fn.extend({
        on: function (e, t, n, r) {
            return Ae(this, e, t, n, r)
        },
        one: function (e, t, n, r) {
            return Ae(this, e, t, n, r, 1)
        },
        off: function (e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj) return r = e.handleObj, k(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
            if ("object" == typeof e) {
                for (i in e) this.off(i, t, e[i]);
                return this
            }
            return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = Se), this.each(function () {
                k.event.remove(this, e, n, t)
            })
        }
    });
    var je = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
        qe = /<script|<style|<link/i,
        Le = /checked\s*(?:[^=]|=\s*.checked.)/i,
        He = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

    function Oe(e, t) {
        return A(e, "table") && A(11 !== t.nodeType ? t : t.firstChild, "tr") && k(e).children("tbody")[0] || e
    }

    function Pe(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }

    function Re(e) {
        return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e
    }

    function Me(e, t) {
        var n, r, i, o, a, s, u, l;
        if (1 === t.nodeType) {
            if (Q.hasData(e) && (o = Q.access(e), a = Q.set(t, o), l = o.events))
                for (i in delete a.handle, a.events = {}, l)
                    for (n = 0, r = l[i].length; n < r; n++) k.event.add(t, i, l[i][n]);
            J.hasData(e) && (s = J.access(e), u = k.extend({}, s), J.set(t, u))
        }
    }

    function Ie(n, r, i, o) {
        r = g.apply([], r);
        var e, t, a, s, u, l, c = 0,
            f = n.length,
            p = f - 1,
            d = r[0],
            h = m(d);
        if (h || 1 < f && "string" == typeof d && !y.checkClone && Le.test(d)) return n.each(function (e) {
            var t = n.eq(e);
            h && (r[0] = d.call(this, e, t.html())), Ie(t, r, i, o)
        });
        if (f && (t = (e = we(r, n[0].ownerDocument, !1, n, o)).firstChild, 1 === e.childNodes.length && (e = t), t || o)) {
            for (s = (a = k.map(ve(e, "script"), Pe)).length; c < f; c++) u = e, c !== p && (u = k.clone(u, !0, !0), s && k.merge(a, ve(u, "script"))), i.call(n[c], u, c);
            if (s)
                for (l = a[a.length - 1].ownerDocument, k.map(a, Re), c = 0; c < s; c++) u = a[c], he.test(u.type || "") && !Q.access(u, "globalEval") && k.contains(l, u) && (u.src && "module" !== (u.type || "").toLowerCase() ? k._evalUrl && !u.noModule && k._evalUrl(u.src, {
                    nonce: u.nonce || u.getAttribute("nonce")
                }) : b(u.textContent.replace(He, ""), u, l))
        }
        return n
    }

    function We(e, t, n) {
        for (var r, i = t ? k.filter(t, e) : e, o = 0; null != (r = i[o]); o++) n || 1 !== r.nodeType || k.cleanData(ve(r)), r.parentNode && (n && oe(r) && ye(ve(r, "script")), r.parentNode.removeChild(r));
        return e
    }
    k.extend({
        htmlPrefilter: function (e) {
            return e.replace(je, "<$1></$2>")
        },
        clone: function (e, t, n) {
            var r, i, o, a, s, u, l, c = e.cloneNode(!0),
                f = oe(e);
            if (!(y.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || k.isXMLDoc(e)))
                for (a = ve(c), r = 0, i = (o = ve(e)).length; r < i; r++) s = o[r], u = a[r], void 0, "input" === (l = u.nodeName.toLowerCase()) && pe.test(s.type) ? u.checked = s.checked : "input" !== l && "textarea" !== l || (u.defaultValue = s.defaultValue);
            if (t)
                if (n)
                    for (o = o || ve(e), a = a || ve(c), r = 0, i = o.length; r < i; r++) Me(o[r], a[r]);
                else Me(e, c);
            return 0 < (a = ve(c, "script")).length && ye(a, !f && ve(e, "script")), c
        },
        cleanData: function (e) {
            for (var t, n, r, i = k.event.special, o = 0; void 0 !== (n = e[o]); o++)
                if (G(n)) {
                    if (t = n[Q.expando]) {
                        if (t.events)
                            for (r in t.events) i[r] ? k.event.remove(n, r) : k.removeEvent(n, r, t.handle);
                        n[Q.expando] = void 0
                    }
                    n[J.expando] && (n[J.expando] = void 0)
                }
        }
    }), k.fn.extend({
        detach: function (e) {
            return We(this, e, !0)
        },
        remove: function (e) {
            return We(this, e)
        },
        text: function (e) {
            return _(this, function (e) {
                return void 0 === e ? k.text(this) : this.empty().each(function () {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                })
            }, null, e, arguments.length)
        },
        append: function () {
            return Ie(this, arguments, function (e) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Oe(this, e).appendChild(e)
            })
        },
        prepend: function () {
            return Ie(this, arguments, function (e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = Oe(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function () {
            return Ie(this, arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function () {
            return Ie(this, arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        empty: function () {
            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (k.cleanData(ve(e, !1)), e.textContent = "");
            return this
        },
        clone: function (e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function () {
                return k.clone(this, e, t)
            })
        },
        html: function (e) {
            return _(this, function (e) {
                var t = this[0] || {},
                    n = 0,
                    r = this.length;
                if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof e && !qe.test(e) && !ge[(de.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = k.htmlPrefilter(e);
                    try {
                        for (; n < r; n++) 1 === (t = this[n] || {}).nodeType && (k.cleanData(ve(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (e) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function () {
            var n = [];
            return Ie(this, arguments, function (e) {
                var t = this.parentNode;
                k.inArray(this, n) < 0 && (k.cleanData(ve(this)), t && t.replaceChild(e, this))
            }, n)
        }
    }), k.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (e, a) {
        k.fn[e] = function (e) {
            for (var t, n = [], r = k(e), i = r.length - 1, o = 0; o <= i; o++) t = o === i ? this : this.clone(!0), k(r[o])[a](t), u.apply(n, t.get());
            return this.pushStack(n)
        }
    });
    var $e = new RegExp("^(" + te + ")(?!px)[a-z%]+$", "i"),
        Fe = function (e) {
            var t = e.ownerDocument.defaultView;
            return t && t.opener || (t = C), t.getComputedStyle(e)
        },
        Be = new RegExp(re.join("|"), "i");

    function _e(e, t, n) {
        var r, i, o, a, s = e.style;
        return (n = n || Fe(e)) && ("" !== (a = n.getPropertyValue(t) || n[t]) || oe(e) || (a = k.style(e, t)), !y.pixelBoxStyles() && $e.test(a) && Be.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 !== a ? a + "" : a
    }

    function ze(e, t) {
        return {
            get: function () {
                if (!e()) return (this.get = t).apply(this, arguments);
                delete this.get
            }
        }
    }! function () {
        function e() {
            if (u) {
                s.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", u.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", ie.appendChild(s).appendChild(u);
                var e = C.getComputedStyle(u);
                n = "1%" !== e.top, a = 12 === t(e.marginLeft), u.style.right = "60%", o = 36 === t(e.right), r = 36 === t(e.width), u.style.position = "absolute", i = 12 === t(u.offsetWidth / 3), ie.removeChild(s), u = null
            }
        }

        function t(e) {
            return Math.round(parseFloat(e))
        }
        var n, r, i, o, a, s = E.createElement("div"),
            u = E.createElement("div");
        u.style && (u.style.backgroundClip = "content-box", u.cloneNode(!0).style.backgroundClip = "", y.clearCloneStyle = "content-box" === u.style.backgroundClip, k.extend(y, {
            boxSizingReliable: function () {
                return e(), r
            },
            pixelBoxStyles: function () {
                return e(), o
            },
            pixelPosition: function () {
                return e(), n
            },
            reliableMarginLeft: function () {
                return e(), a
            },
            scrollboxSize: function () {
                return e(), i
            }
        }))
    }();
    var Ue = ["Webkit", "Moz", "ms"],
        Xe = E.createElement("div").style,
        Ve = {};

    function Ge(e) {
        var t = k.cssProps[e] || Ve[e];
        return t || (e in Xe ? e : Ve[e] = function (e) {
            var t = e[0].toUpperCase() + e.slice(1),
                n = Ue.length;
            while (n--)
                if ((e = Ue[n] + t) in Xe) return e
        }(e) || e)
    }
    var Ye = /^(none|table(?!-c[ea]).+)/,
        Qe = /^--/,
        Je = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Ke = {
            letterSpacing: "0",
            fontWeight: "400"
        };

    function Ze(e, t, n) {
        var r = ne.exec(t);
        return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
    }

    function et(e, t, n, r, i, o) {
        var a = "width" === t ? 1 : 0,
            s = 0,
            u = 0;
        if (n === (r ? "border" : "content")) return 0;
        for (; a < 4; a += 2) "margin" === n && (u += k.css(e, n + re[a], !0, i)), r ? ("content" === n && (u -= k.css(e, "padding" + re[a], !0, i)), "margin" !== n && (u -= k.css(e, "border" + re[a] + "Width", !0, i))) : (u += k.css(e, "padding" + re[a], !0, i), "padding" !== n ? u += k.css(e, "border" + re[a] + "Width", !0, i) : s += k.css(e, "border" + re[a] + "Width", !0, i));
        return !r && 0 <= o && (u += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - u - s - .5)) || 0), u
    }

    function tt(e, t, n) {
        var r = Fe(e),
            i = (!y.boxSizingReliable() || n) && "border-box" === k.css(e, "boxSizing", !1, r),
            o = i,
            a = _e(e, t, r),
            s = "offset" + t[0].toUpperCase() + t.slice(1);
        if ($e.test(a)) {
            if (!n) return a;
            a = "auto"
        }
        return (!y.boxSizingReliable() && i || "auto" === a || !parseFloat(a) && "inline" === k.css(e, "display", !1, r)) && e.getClientRects().length && (i = "border-box" === k.css(e, "boxSizing", !1, r), (o = s in e) && (a = e[s])), (a = parseFloat(a) || 0) + et(e, t, n || (i ? "border" : "content"), o, r, a) + "px"
    }

    function nt(e, t, n, r, i) {
        return new nt.prototype.init(e, t, n, r, i)
    }
    k.extend({
        cssHooks: {
            opacity: {
                get: function (e, t) {
                    if (t) {
                        var n = _e(e, "opacity");
                        return "" === n ? "1" : n
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
        style: function (e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, o, a, s = V(t),
                    u = Qe.test(t),
                    l = e.style;
                if (u || (t = Ge(s)), a = k.cssHooks[t] || k.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];
                "string" === (o = typeof n) && (i = ne.exec(n)) && i[1] && (n = le(e, t, i), o = "number"), null != n && n == n && ("number" !== o || u || (n += i && i[3] || (k.cssNumber[s] ? "" : "px")), y.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (u ? l.setProperty(t, n) : l[t] = n))
            }
        },
        css: function (e, t, n, r) {
            var i, o, a, s = V(t);
            return Qe.test(t) || (t = Ge(s)), (a = k.cssHooks[t] || k.cssHooks[s]) && "get" in a && (i = a.get(e, !0, n)), void 0 === i && (i = _e(e, t, r)), "normal" === i && t in Ke && (i = Ke[t]), "" === n || n ? (o = parseFloat(i), !0 === n || isFinite(o) ? o || 0 : i) : i
        }
    }), k.each(["height", "width"], function (e, u) {
        k.cssHooks[u] = {
            get: function (e, t, n) {
                if (t) return !Ye.test(k.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? tt(e, u, n) : ue(e, Je, function () {
                    return tt(e, u, n)
                })
            },
            set: function (e, t, n) {
                var r, i = Fe(e),
                    o = !y.scrollboxSize() && "absolute" === i.position,
                    a = (o || n) && "border-box" === k.css(e, "boxSizing", !1, i),
                    s = n ? et(e, u, n, a, i) : 0;
                return a && o && (s -= Math.ceil(e["offset" + u[0].toUpperCase() + u.slice(1)] - parseFloat(i[u]) - et(e, u, "border", !1, i) - .5)), s && (r = ne.exec(t)) && "px" !== (r[3] || "px") && (e.style[u] = t, t = k.css(e, u)), Ze(0, t, s)
            }
        }
    }), k.cssHooks.marginLeft = ze(y.reliableMarginLeft, function (e, t) {
        if (t) return (parseFloat(_e(e, "marginLeft")) || e.getBoundingClientRect().left - ue(e, {
            marginLeft: 0
        }, function () {
            return e.getBoundingClientRect().left
        })) + "px"
    }), k.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function (i, o) {
        k.cssHooks[i + o] = {
            expand: function (e) {
                for (var t = 0, n = {}, r = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++) n[i + re[t] + o] = r[t] || r[t - 2] || r[0];
                return n
            }
        }, "margin" !== i && (k.cssHooks[i + o].set = Ze)
    }), k.fn.extend({
        css: function (e, t) {
            return _(this, function (e, t, n) {
                var r, i, o = {},
                    a = 0;
                if (Array.isArray(t)) {
                    for (r = Fe(e), i = t.length; a < i; a++) o[t[a]] = k.css(e, t[a], !1, r);
                    return o
                }
                return void 0 !== n ? k.style(e, t, n) : k.css(e, t)
            }, e, t, 1 < arguments.length)
        }
    }), ((k.Tween = nt).prototype = {
        constructor: nt,
        init: function (e, t, n, r, i, o) {
            this.elem = e, this.prop = n, this.easing = i || k.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (k.cssNumber[n] ? "" : "px")
        },
        cur: function () {
            var e = nt.propHooks[this.prop];
            return e && e.get ? e.get(this) : nt.propHooks._default.get(this)
        },
        run: function (e) {
            var t, n = nt.propHooks[this.prop];
            return this.options.duration ? this.pos = t = k.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : nt.propHooks._default.set(this), this
        }
    }).init.prototype = nt.prototype, (nt.propHooks = {
        _default: {
            get: function (e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = k.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
            },
            set: function (e) {
                k.fx.step[e.prop] ? k.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !k.cssHooks[e.prop] && null == e.elem.style[Ge(e.prop)] ? e.elem[e.prop] = e.now : k.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    }).scrollTop = nt.propHooks.scrollLeft = {
        set: function (e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, k.easing = {
        linear: function (e) {
            return e
        },
        swing: function (e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    }, k.fx = nt.prototype.init, k.fx.step = {};
    var rt, it, ot, at, st = /^(?:toggle|show|hide)$/,
        ut = /queueHooks$/;

    function lt() {
        it && (!1 === E.hidden && C.requestAnimationFrame ? C.requestAnimationFrame(lt) : C.setTimeout(lt, k.fx.interval), k.fx.tick())
    }

    function ct() {
        return C.setTimeout(function () {
            rt = void 0
        }), rt = Date.now()
    }

    function ft(e, t) {
        var n, r = 0,
            i = {
                height: e
            };
        for (t = t ? 1 : 0; r < 4; r += 2 - t) i["margin" + (n = re[r])] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e), i
    }

    function pt(e, t, n) {
        for (var r, i = (dt.tweeners[t] || []).concat(dt.tweeners["*"]), o = 0, a = i.length; o < a; o++)
            if (r = i[o].call(n, t, e)) return r
    }

    function dt(o, e, t) {
        var n, a, r = 0,
            i = dt.prefilters.length,
            s = k.Deferred().always(function () {
                delete u.elem
            }),
            u = function () {
                if (a) return !1;
                for (var e = rt || ct(), t = Math.max(0, l.startTime + l.duration - e), n = 1 - (t / l.duration || 0), r = 0, i = l.tweens.length; r < i; r++) l.tweens[r].run(n);
                return s.notifyWith(o, [l, n, t]), n < 1 && i ? t : (i || s.notifyWith(o, [l, 1, 0]), s.resolveWith(o, [l]), !1)
            },
            l = s.promise({
                elem: o,
                props: k.extend({}, e),
                opts: k.extend(!0, {
                    specialEasing: {},
                    easing: k.easing._default
                }, t),
                originalProperties: e,
                originalOptions: t,
                startTime: rt || ct(),
                duration: t.duration,
                tweens: [],
                createTween: function (e, t) {
                    var n = k.Tween(o, l.opts, e, t, l.opts.specialEasing[e] || l.opts.easing);
                    return l.tweens.push(n), n
                },
                stop: function (e) {
                    var t = 0,
                        n = e ? l.tweens.length : 0;
                    if (a) return this;
                    for (a = !0; t < n; t++) l.tweens[t].run(1);
                    return e ? (s.notifyWith(o, [l, 1, 0]), s.resolveWith(o, [l, e])) : s.rejectWith(o, [l, e]), this
                }
            }),
            c = l.props;
        for (! function (e, t) {
                var n, r, i, o, a;
                for (n in e)
                    if (i = t[r = V(n)], o = e[n], Array.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), (a = k.cssHooks[r]) && "expand" in a)
                        for (n in o = a.expand(o), delete e[r], o) n in e || (e[n] = o[n], t[n] = i);
                    else t[r] = i
            }(c, l.opts.specialEasing); r < i; r++)
            if (n = dt.prefilters[r].call(l, o, c, l.opts)) return m(n.stop) && (k._queueHooks(l.elem, l.opts.queue).stop = n.stop.bind(n)), n;
        return k.map(c, pt, l), m(l.opts.start) && l.opts.start.call(o, l), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always), k.fx.timer(k.extend(u, {
            elem: o,
            anim: l,
            queue: l.opts.queue
        })), l
    }
    k.Animation = k.extend(dt, {
        tweeners: {
            "*": [function (e, t) {
                var n = this.createTween(e, t);
                return le(n.elem, e, ne.exec(t), n), n
            }]
        },
        tweener: function (e, t) {
            m(e) ? (t = e, e = ["*"]) : e = e.match(R);
            for (var n, r = 0, i = e.length; r < i; r++) n = e[r], dt.tweeners[n] = dt.tweeners[n] || [], dt.tweeners[n].unshift(t)
        },
        prefilters: [function (e, t, n) {
            var r, i, o, a, s, u, l, c, f = "width" in t || "height" in t,
                p = this,
                d = {},
                h = e.style,
                g = e.nodeType && se(e),
                v = Q.get(e, "fxshow");
            for (r in n.queue || (null == (a = k._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function () {
                    a.unqueued || s()
                }), a.unqueued++, p.always(function () {
                    p.always(function () {
                        a.unqueued--, k.queue(e, "fx").length || a.empty.fire()
                    })
                })), t)
                if (i = t[r], st.test(i)) {
                    if (delete t[r], o = o || "toggle" === i, i === (g ? "hide" : "show")) {
                        if ("show" !== i || !v || void 0 === v[r]) continue;
                        g = !0
                    }
                    d[r] = v && v[r] || k.style(e, r)
                } if ((u = !k.isEmptyObject(t)) || !k.isEmptyObject(d))
                for (r in f && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], null == (l = v && v.display) && (l = Q.get(e, "display")), "none" === (c = k.css(e, "display")) && (l ? c = l : (fe([e], !0), l = e.style.display || l, c = k.css(e, "display"), fe([e]))), ("inline" === c || "inline-block" === c && null != l) && "none" === k.css(e, "float") && (u || (p.done(function () {
                        h.display = l
                    }), null == l && (c = h.display, l = "none" === c ? "" : c)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", p.always(function () {
                        h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
                    })), u = !1, d) u || (v ? "hidden" in v && (g = v.hidden) : v = Q.access(e, "fxshow", {
                    display: l
                }), o && (v.hidden = !g), g && fe([e], !0), p.done(function () {
                    for (r in g || fe([e]), Q.remove(e, "fxshow"), d) k.style(e, r, d[r])
                })), u = pt(g ? v[r] : 0, r, p), r in v || (v[r] = u.start, g && (u.end = u.start, u.start = 0))
        }],
        prefilter: function (e, t) {
            t ? dt.prefilters.unshift(e) : dt.prefilters.push(e)
        }
    }), k.speed = function (e, t, n) {
        var r = e && "object" == typeof e ? k.extend({}, e) : {
            complete: n || !n && t || m(e) && e,
            duration: e,
            easing: n && t || t && !m(t) && t
        };
        return k.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in k.fx.speeds ? r.duration = k.fx.speeds[r.duration] : r.duration = k.fx.speeds._default), null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function () {
            m(r.old) && r.old.call(this), r.queue && k.dequeue(this, r.queue)
        }, r
    }, k.fn.extend({
        fadeTo: function (e, t, n, r) {
            return this.filter(se).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function (t, e, n, r) {
            var i = k.isEmptyObject(t),
                o = k.speed(e, n, r),
                a = function () {
                    var e = dt(this, k.extend({}, t), o);
                    (i || Q.get(this, "finish")) && e.stop(!0)
                };
            return a.finish = a, i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
        },
        stop: function (i, e, o) {
            var a = function (e) {
                var t = e.stop;
                delete e.stop, t(o)
            };
            return "string" != typeof i && (o = e, e = i, i = void 0), e && !1 !== i && this.queue(i || "fx", []), this.each(function () {
                var e = !0,
                    t = null != i && i + "queueHooks",
                    n = k.timers,
                    r = Q.get(this);
                if (t) r[t] && r[t].stop && a(r[t]);
                else
                    for (t in r) r[t] && r[t].stop && ut.test(t) && a(r[t]);
                for (t = n.length; t--;) n[t].elem !== this || null != i && n[t].queue !== i || (n[t].anim.stop(o), e = !1, n.splice(t, 1));
                !e && o || k.dequeue(this, i)
            })
        },
        finish: function (a) {
            return !1 !== a && (a = a || "fx"), this.each(function () {
                var e, t = Q.get(this),
                    n = t[a + "queue"],
                    r = t[a + "queueHooks"],
                    i = k.timers,
                    o = n ? n.length : 0;
                for (t.finish = !0, k.queue(this, a, []), r && r.stop && r.stop.call(this, !0), e = i.length; e--;) i[e].elem === this && i[e].queue === a && (i[e].anim.stop(!0), i.splice(e, 1));
                for (e = 0; e < o; e++) n[e] && n[e].finish && n[e].finish.call(this);
                delete t.finish
            })
        }
    }), k.each(["toggle", "show", "hide"], function (e, r) {
        var i = k.fn[r];
        k.fn[r] = function (e, t, n) {
            return null == e || "boolean" == typeof e ? i.apply(this, arguments) : this.animate(ft(r, !0), e, t, n)
        }
    }), k.each({
        slideDown: ft("show"),
        slideUp: ft("hide"),
        slideToggle: ft("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function (e, r) {
        k.fn[e] = function (e, t, n) {
            return this.animate(r, e, t, n)
        }
    }), k.timers = [], k.fx.tick = function () {
        var e, t = 0,
            n = k.timers;
        for (rt = Date.now(); t < n.length; t++)(e = n[t])() || n[t] !== e || n.splice(t--, 1);
        n.length || k.fx.stop(), rt = void 0
    }, k.fx.timer = function (e) {
        k.timers.push(e), k.fx.start()
    }, k.fx.interval = 13, k.fx.start = function () {
        it || (it = !0, lt())
    }, k.fx.stop = function () {
        it = null
    }, k.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, k.fn.delay = function (r, e) {
        return r = k.fx && k.fx.speeds[r] || r, e = e || "fx", this.queue(e, function (e, t) {
            var n = C.setTimeout(e, r);
            t.stop = function () {
                C.clearTimeout(n)
            }
        })
    }, ot = E.createElement("input"), at = E.createElement("select").appendChild(E.createElement("option")), ot.type = "checkbox", y.checkOn = "" !== ot.value, y.optSelected = at.selected, (ot = E.createElement("input")).value = "t", ot.type = "radio", y.radioValue = "t" === ot.value;
    var ht, gt = k.expr.attrHandle;
    k.fn.extend({
        attr: function (e, t) {
            return _(this, k.attr, e, t, 1 < arguments.length)
        },
        removeAttr: function (e) {
            return this.each(function () {
                k.removeAttr(this, e)
            })
        }
    }), k.extend({
        attr: function (e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof e.getAttribute ? k.prop(e, t, n) : (1 === o && k.isXMLDoc(e) || (i = k.attrHooks[t.toLowerCase()] || (k.expr.match.bool.test(t) ? ht : void 0)), void 0 !== n ? null === n ? void k.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : null == (r = k.find.attr(e, t)) ? void 0 : r)
        },
        attrHooks: {
            type: {
                set: function (e, t) {
                    if (!y.radioValue && "radio" === t && A(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        },
        removeAttr: function (e, t) {
            var n, r = 0,
                i = t && t.match(R);
            if (i && 1 === e.nodeType)
                while (n = i[r++]) e.removeAttribute(n)
        }
    }), ht = {
        set: function (e, t, n) {
            return !1 === t ? k.removeAttr(e, n) : e.setAttribute(n, n), n
        }
    }, k.each(k.expr.match.bool.source.match(/\w+/g), function (e, t) {
        var a = gt[t] || k.find.attr;
        gt[t] = function (e, t, n) {
            var r, i, o = t.toLowerCase();
            return n || (i = gt[o], gt[o] = r, r = null != a(e, t, n) ? o : null, gt[o] = i), r
        }
    });
    var vt = /^(?:input|select|textarea|button)$/i,
        yt = /^(?:a|area)$/i;

    function mt(e) {
        return (e.match(R) || []).join(" ")
    }

    function xt(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }

    function bt(e) {
        return Array.isArray(e) ? e : "string" == typeof e && e.match(R) || []
    }
    k.fn.extend({
        prop: function (e, t) {
            return _(this, k.prop, e, t, 1 < arguments.length)
        },
        removeProp: function (e) {
            return this.each(function () {
                delete this[k.propFix[e] || e]
            })
        }
    }), k.extend({
        prop: function (e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o) return 1 === o && k.isXMLDoc(e) || (t = k.propFix[t] || t, i = k.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function (e) {
                    var t = k.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : vt.test(e.nodeName) || yt.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    }), y.optSelected || (k.propHooks.selected = {
        get: function (e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        },
        set: function (e) {
            var t = e.parentNode;
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
        }
    }), k.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        k.propFix[this.toLowerCase()] = this
    }), k.fn.extend({
        addClass: function (t) {
            var e, n, r, i, o, a, s, u = 0;
            if (m(t)) return this.each(function (e) {
                k(this).addClass(t.call(this, e, xt(this)))
            });
            if ((e = bt(t)).length)
                while (n = this[u++])
                    if (i = xt(n), r = 1 === n.nodeType && " " + mt(i) + " ") {
                        a = 0;
                        while (o = e[a++]) r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                        i !== (s = mt(r)) && n.setAttribute("class", s)
                    } return this
        },
        removeClass: function (t) {
            var e, n, r, i, o, a, s, u = 0;
            if (m(t)) return this.each(function (e) {
                k(this).removeClass(t.call(this, e, xt(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if ((e = bt(t)).length)
                while (n = this[u++])
                    if (i = xt(n), r = 1 === n.nodeType && " " + mt(i) + " ") {
                        a = 0;
                        while (o = e[a++])
                            while (-1 < r.indexOf(" " + o + " ")) r = r.replace(" " + o + " ", " ");
                        i !== (s = mt(r)) && n.setAttribute("class", s)
                    } return this
        },
        toggleClass: function (i, t) {
            var o = typeof i,
                a = "string" === o || Array.isArray(i);
            return "boolean" == typeof t && a ? t ? this.addClass(i) : this.removeClass(i) : m(i) ? this.each(function (e) {
                k(this).toggleClass(i.call(this, e, xt(this), t), t)
            }) : this.each(function () {
                var e, t, n, r;
                if (a) {
                    t = 0, n = k(this), r = bt(i);
                    while (e = r[t++]) n.hasClass(e) ? n.removeClass(e) : n.addClass(e)
                } else void 0 !== i && "boolean" !== o || ((e = xt(this)) && Q.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", e || !1 === i ? "" : Q.get(this, "__className__") || ""))
            })
        },
        hasClass: function (e) {
            var t, n, r = 0;
            t = " " + e + " ";
            while (n = this[r++])
                if (1 === n.nodeType && -1 < (" " + mt(xt(n)) + " ").indexOf(t)) return !0;
            return !1
        }
    });
    var wt = /\r/g;
    k.fn.extend({
        val: function (n) {
            var r, e, i, t = this[0];
            return arguments.length ? (i = m(n), this.each(function (e) {
                var t;
                1 === this.nodeType && (null == (t = i ? n.call(this, e, k(this).val()) : n) ? t = "" : "number" == typeof t ? t += "" : Array.isArray(t) && (t = k.map(t, function (e) {
                    return null == e ? "" : e + ""
                })), (r = k.valHooks[this.type] || k.valHooks[this.nodeName.toLowerCase()]) && "set" in r && void 0 !== r.set(this, t, "value") || (this.value = t))
            })) : t ? (r = k.valHooks[t.type] || k.valHooks[t.nodeName.toLowerCase()]) && "get" in r && void 0 !== (e = r.get(t, "value")) ? e : "string" == typeof (e = t.value) ? e.replace(wt, "") : null == e ? "" : e : void 0
        }
    }), k.extend({
        valHooks: {
            option: {
                get: function (e) {
                    var t = k.find.attr(e, "value");
                    return null != t ? t : mt(k.text(e))
                }
            },
            select: {
                get: function (e) {
                    var t, n, r, i = e.options,
                        o = e.selectedIndex,
                        a = "select-one" === e.type,
                        s = a ? null : [],
                        u = a ? o + 1 : i.length;
                    for (r = o < 0 ? u : a ? o : 0; r < u; r++)
                        if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !A(n.parentNode, "optgroup"))) {
                            if (t = k(n).val(), a) return t;
                            s.push(t)
                        } return s
                },
                set: function (e, t) {
                    var n, r, i = e.options,
                        o = k.makeArray(t),
                        a = i.length;
                    while (a--)((r = i[a]).selected = -1 < k.inArray(k.valHooks.option.get(r), o)) && (n = !0);
                    return n || (e.selectedIndex = -1), o
                }
            }
        }
    }), k.each(["radio", "checkbox"], function () {
        k.valHooks[this] = {
            set: function (e, t) {
                if (Array.isArray(t)) return e.checked = -1 < k.inArray(k(e).val(), t)
            }
        }, y.checkOn || (k.valHooks[this].get = function (e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    }), y.focusin = "onfocusin" in C;
    var Tt = /^(?:focusinfocus|focusoutblur)$/,
        Ct = function (e) {
            e.stopPropagation()
        };
    k.extend(k.event, {
        trigger: function (e, t, n, r) {
            var i, o, a, s, u, l, c, f, p = [n || E],
                d = v.call(e, "type") ? e.type : e,
                h = v.call(e, "namespace") ? e.namespace.split(".") : [];
            if (o = f = a = n = n || E, 3 !== n.nodeType && 8 !== n.nodeType && !Tt.test(d + k.event.triggered) && (-1 < d.indexOf(".") && (d = (h = d.split(".")).shift(), h.sort()), u = d.indexOf(":") < 0 && "on" + d, (e = e[k.expando] ? e : new k.Event(d, "object" == typeof e && e)).isTrigger = r ? 2 : 3, e.namespace = h.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), t = null == t ? [e] : k.makeArray(t, [e]), c = k.event.special[d] || {}, r || !c.trigger || !1 !== c.trigger.apply(n, t))) {
                if (!r && !c.noBubble && !x(n)) {
                    for (s = c.delegateType || d, Tt.test(s + d) || (o = o.parentNode); o; o = o.parentNode) p.push(o), a = o;
                    a === (n.ownerDocument || E) && p.push(a.defaultView || a.parentWindow || C)
                }
                i = 0;
                while ((o = p[i++]) && !e.isPropagationStopped()) f = o, e.type = 1 < i ? s : c.bindType || d, (l = (Q.get(o, "events") || {})[e.type] && Q.get(o, "handle")) && l.apply(o, t), (l = u && o[u]) && l.apply && G(o) && (e.result = l.apply(o, t), !1 === e.result && e.preventDefault());
                return e.type = d, r || e.isDefaultPrevented() || c._default && !1 !== c._default.apply(p.pop(), t) || !G(n) || u && m(n[d]) && !x(n) && ((a = n[u]) && (n[u] = null), k.event.triggered = d, e.isPropagationStopped() && f.addEventListener(d, Ct), n[d](), e.isPropagationStopped() && f.removeEventListener(d, Ct), k.event.triggered = void 0, a && (n[u] = a)), e.result
            }
        },
        simulate: function (e, t, n) {
            var r = k.extend(new k.Event, n, {
                type: e,
                isSimulated: !0
            });
            k.event.trigger(r, null, t)
        }
    }), k.fn.extend({
        trigger: function (e, t) {
            return this.each(function () {
                k.event.trigger(e, t, this)
            })
        },
        triggerHandler: function (e, t) {
            var n = this[0];
            if (n) return k.event.trigger(e, t, n, !0)
        }
    }), y.focusin || k.each({
        focus: "focusin",
        blur: "focusout"
    }, function (n, r) {
        var i = function (e) {
            k.event.simulate(r, e.target, k.event.fix(e))
        };
        k.event.special[r] = {
            setup: function () {
                var e = this.ownerDocument || this,
                    t = Q.access(e, r);
                t || e.addEventListener(n, i, !0), Q.access(e, r, (t || 0) + 1)
            },
            teardown: function () {
                var e = this.ownerDocument || this,
                    t = Q.access(e, r) - 1;
                t ? Q.access(e, r, t) : (e.removeEventListener(n, i, !0), Q.remove(e, r))
            }
        }
    });
    var Et = C.location,
        kt = Date.now(),
        St = /\?/;
    k.parseXML = function (e) {
        var t;
        if (!e || "string" != typeof e) return null;
        try {
            t = (new C.DOMParser).parseFromString(e, "text/xml")
        } catch (e) {
            t = void 0
        }
        return t && !t.getElementsByTagName("parsererror").length || k.error("Invalid XML: " + e), t
    };
    var Nt = /\[\]$/,
        At = /\r?\n/g,
        Dt = /^(?:submit|button|image|reset|file)$/i,
        jt = /^(?:input|select|textarea|keygen)/i;

    function qt(n, e, r, i) {
        var t;
        if (Array.isArray(e)) k.each(e, function (e, t) {
            r || Nt.test(n) ? i(n, t) : qt(n + "[" + ("object" == typeof t && null != t ? e : "") + "]", t, r, i)
        });
        else if (r || "object" !== w(e)) i(n, e);
        else
            for (t in e) qt(n + "[" + t + "]", e[t], r, i)
    }
    k.param = function (e, t) {
        var n, r = [],
            i = function (e, t) {
                var n = m(t) ? t() : t;
                r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
            };
        if (null == e) return "";
        if (Array.isArray(e) || e.jquery && !k.isPlainObject(e)) k.each(e, function () {
            i(this.name, this.value)
        });
        else
            for (n in e) qt(n, e[n], t, i);
        return r.join("&")
    }, k.fn.extend({
        serialize: function () {
            return k.param(this.serializeArray())
        },
        serializeArray: function () {
            return this.map(function () {
                var e = k.prop(this, "elements");
                return e ? k.makeArray(e) : this
            }).filter(function () {
                var e = this.type;
                return this.name && !k(this).is(":disabled") && jt.test(this.nodeName) && !Dt.test(e) && (this.checked || !pe.test(e))
            }).map(function (e, t) {
                var n = k(this).val();
                return null == n ? null : Array.isArray(n) ? k.map(n, function (e) {
                    return {
                        name: t.name,
                        value: e.replace(At, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(At, "\r\n")
                }
            }).get()
        }
    });
    var Lt = /%20/g,
        Ht = /#.*$/,
        Ot = /([?&])_=[^&]*/,
        Pt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        Rt = /^(?:GET|HEAD)$/,
        Mt = /^\/\//,
        It = {},
        Wt = {},
        $t = "*/".concat("*"),
        Ft = E.createElement("a");

    function Bt(o) {
        return function (e, t) {
            "string" != typeof e && (t = e, e = "*");
            var n, r = 0,
                i = e.toLowerCase().match(R) || [];
            if (m(t))
                while (n = i[r++]) "+" === n[0] ? (n = n.slice(1) || "*", (o[n] = o[n] || []).unshift(t)) : (o[n] = o[n] || []).push(t)
        }
    }

    function _t(t, i, o, a) {
        var s = {},
            u = t === Wt;

        function l(e) {
            var r;
            return s[e] = !0, k.each(t[e] || [], function (e, t) {
                var n = t(i, o, a);
                return "string" != typeof n || u || s[n] ? u ? !(r = n) : void 0 : (i.dataTypes.unshift(n), l(n), !1)
            }), r
        }
        return l(i.dataTypes[0]) || !s["*"] && l("*")
    }

    function zt(e, t) {
        var n, r, i = k.ajaxSettings.flatOptions || {};
        for (n in t) void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
        return r && k.extend(!0, e, r), e
    }
    Ft.href = Et.href, k.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Et.href,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Et.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": $t,
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
                "text xml": k.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function (e, t) {
            return t ? zt(zt(e, k.ajaxSettings), t) : zt(k.ajaxSettings, e)
        },
        ajaxPrefilter: Bt(It),
        ajaxTransport: Bt(Wt),
        ajax: function (e, t) {
            "object" == typeof e && (t = e, e = void 0), t = t || {};
            var c, f, p, n, d, r, h, g, i, o, v = k.ajaxSetup({}, t),
                y = v.context || v,
                m = v.context && (y.nodeType || y.jquery) ? k(y) : k.event,
                x = k.Deferred(),
                b = k.Callbacks("once memory"),
                w = v.statusCode || {},
                a = {},
                s = {},
                u = "canceled",
                T = {
                    readyState: 0,
                    getResponseHeader: function (e) {
                        var t;
                        if (h) {
                            if (!n) {
                                n = {};
                                while (t = Pt.exec(p)) n[t[1].toLowerCase() + " "] = (n[t[1].toLowerCase() + " "] || []).concat(t[2])
                            }
                            t = n[e.toLowerCase() + " "]
                        }
                        return null == t ? null : t.join(", ")
                    },
                    getAllResponseHeaders: function () {
                        return h ? p : null
                    },
                    setRequestHeader: function (e, t) {
                        return null == h && (e = s[e.toLowerCase()] = s[e.toLowerCase()] || e, a[e] = t), this
                    },
                    overrideMimeType: function (e) {
                        return null == h && (v.mimeType = e), this
                    },
                    statusCode: function (e) {
                        var t;
                        if (e)
                            if (h) T.always(e[T.status]);
                            else
                                for (t in e) w[t] = [w[t], e[t]];
                        return this
                    },
                    abort: function (e) {
                        var t = e || u;
                        return c && c.abort(t), l(0, t), this
                    }
                };
            if (x.promise(T), v.url = ((e || v.url || Et.href) + "").replace(Mt, Et.protocol + "//"), v.type = t.method || t.type || v.method || v.type, v.dataTypes = (v.dataType || "*").toLowerCase().match(R) || [""], null == v.crossDomain) {
                r = E.createElement("a");
                try {
                    r.href = v.url, r.href = r.href, v.crossDomain = Ft.protocol + "//" + Ft.host != r.protocol + "//" + r.host
                } catch (e) {
                    v.crossDomain = !0
                }
            }
            if (v.data && v.processData && "string" != typeof v.data && (v.data = k.param(v.data, v.traditional)), _t(It, v, t, T), h) return T;
            for (i in (g = k.event && v.global) && 0 == k.active++ && k.event.trigger("ajaxStart"), v.type = v.type.toUpperCase(), v.hasContent = !Rt.test(v.type), f = v.url.replace(Ht, ""), v.hasContent ? v.data && v.processData && 0 === (v.contentType || "").indexOf("application/x-www-form-urlencoded") && (v.data = v.data.replace(Lt, "+")) : (o = v.url.slice(f.length), v.data && (v.processData || "string" == typeof v.data) && (f += (St.test(f) ? "&" : "?") + v.data, delete v.data), !1 === v.cache && (f = f.replace(Ot, "$1"), o = (St.test(f) ? "&" : "?") + "_=" + kt++ + o), v.url = f + o), v.ifModified && (k.lastModified[f] && T.setRequestHeader("If-Modified-Since", k.lastModified[f]), k.etag[f] && T.setRequestHeader("If-None-Match", k.etag[f])), (v.data && v.hasContent && !1 !== v.contentType || t.contentType) && T.setRequestHeader("Content-Type", v.contentType), T.setRequestHeader("Accept", v.dataTypes[0] && v.accepts[v.dataTypes[0]] ? v.accepts[v.dataTypes[0]] + ("*" !== v.dataTypes[0] ? ", " + $t + "; q=0.01" : "") : v.accepts["*"]), v.headers) T.setRequestHeader(i, v.headers[i]);
            if (v.beforeSend && (!1 === v.beforeSend.call(y, T, v) || h)) return T.abort();
            if (u = "abort", b.add(v.complete), T.done(v.success), T.fail(v.error), c = _t(Wt, v, t, T)) {
                if (T.readyState = 1, g && m.trigger("ajaxSend", [T, v]), h) return T;
                v.async && 0 < v.timeout && (d = C.setTimeout(function () {
                    T.abort("timeout")
                }, v.timeout));
                try {
                    h = !1, c.send(a, l)
                } catch (e) {
                    if (h) throw e;
                    l(-1, e)
                }
            } else l(-1, "No Transport");

            function l(e, t, n, r) {
                var i, o, a, s, u, l = t;
                h || (h = !0, d && C.clearTimeout(d), c = void 0, p = r || "", T.readyState = 0 < e ? 4 : 0, i = 200 <= e && e < 300 || 304 === e, n && (s = function (e, t, n) {
                    var r, i, o, a, s = e.contents,
                        u = e.dataTypes;
                    while ("*" === u[0]) u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
                    if (r)
                        for (i in s)
                            if (s[i] && s[i].test(r)) {
                                u.unshift(i);
                                break
                            } if (u[0] in n) o = u[0];
                    else {
                        for (i in n) {
                            if (!u[0] || e.converters[i + " " + u[0]]) {
                                o = i;
                                break
                            }
                            a || (a = i)
                        }
                        o = o || a
                    }
                    if (o) return o !== u[0] && u.unshift(o), n[o]
                }(v, T, n)), s = function (e, t, n, r) {
                    var i, o, a, s, u, l = {},
                        c = e.dataTypes.slice();
                    if (c[1])
                        for (a in e.converters) l[a.toLowerCase()] = e.converters[a];
                    o = c.shift();
                    while (o)
                        if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift())
                            if ("*" === o) o = u;
                            else if ("*" !== u && u !== o) {
                        if (!(a = l[u + " " + o] || l["* " + o]))
                            for (i in l)
                                if ((s = i.split(" "))[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                                    !0 === a ? a = l[i] : !0 !== l[i] && (o = s[0], c.unshift(s[1]));
                                    break
                                } if (!0 !== a)
                            if (a && e["throws"]) t = a(t);
                            else try {
                                t = a(t)
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: a ? e : "No conversion from " + u + " to " + o
                                }
                            }
                    }
                    return {
                        state: "success",
                        data: t
                    }
                }(v, s, T, i), i ? (v.ifModified && ((u = T.getResponseHeader("Last-Modified")) && (k.lastModified[f] = u), (u = T.getResponseHeader("etag")) && (k.etag[f] = u)), 204 === e || "HEAD" === v.type ? l = "nocontent" : 304 === e ? l = "notmodified" : (l = s.state, o = s.data, i = !(a = s.error))) : (a = l, !e && l || (l = "error", e < 0 && (e = 0))), T.status = e, T.statusText = (t || l) + "", i ? x.resolveWith(y, [o, l, T]) : x.rejectWith(y, [T, l, a]), T.statusCode(w), w = void 0, g && m.trigger(i ? "ajaxSuccess" : "ajaxError", [T, v, i ? o : a]), b.fireWith(y, [T, l]), g && (m.trigger("ajaxComplete", [T, v]), --k.active || k.event.trigger("ajaxStop")))
            }
            return T
        },
        getJSON: function (e, t, n) {
            return k.get(e, t, n, "json")
        },
        getScript: function (e, t) {
            return k.get(e, void 0, t, "script")
        }
    }), k.each(["get", "post"], function (e, i) {
        k[i] = function (e, t, n, r) {
            return m(t) && (r = r || n, n = t, t = void 0), k.ajax(k.extend({
                url: e,
                type: i,
                dataType: r,
                data: t,
                success: n
            }, k.isPlainObject(e) && e))
        }
    }), k._evalUrl = function (e, t) {
        return k.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            converters: {
                "text script": function () {}
            },
            dataFilter: function (e) {
                k.globalEval(e, t)
            }
        })
    }, k.fn.extend({
        wrapAll: function (e) {
            var t;
            return this[0] && (m(e) && (e = e.call(this[0])), t = k(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                var e = this;
                while (e.firstElementChild) e = e.firstElementChild;
                return e
            }).append(this)), this
        },
        wrapInner: function (n) {
            return m(n) ? this.each(function (e) {
                k(this).wrapInner(n.call(this, e))
            }) : this.each(function () {
                var e = k(this),
                    t = e.contents();
                t.length ? t.wrapAll(n) : e.append(n)
            })
        },
        wrap: function (t) {
            var n = m(t);
            return this.each(function (e) {
                k(this).wrapAll(n ? t.call(this, e) : t)
            })
        },
        unwrap: function (e) {
            return this.parent(e).not("body").each(function () {
                k(this).replaceWith(this.childNodes)
            }), this
        }
    }), k.expr.pseudos.hidden = function (e) {
        return !k.expr.pseudos.visible(e)
    }, k.expr.pseudos.visible = function (e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
    }, k.ajaxSettings.xhr = function () {
        try {
            return new C.XMLHttpRequest
        } catch (e) {}
    };
    var Ut = {
            0: 200,
            1223: 204
        },
        Xt = k.ajaxSettings.xhr();
    y.cors = !!Xt && "withCredentials" in Xt, y.ajax = Xt = !!Xt, k.ajaxTransport(function (i) {
        var o, a;
        if (y.cors || Xt && !i.crossDomain) return {
            send: function (e, t) {
                var n, r = i.xhr();
                if (r.open(i.type, i.url, i.async, i.username, i.password), i.xhrFields)
                    for (n in i.xhrFields) r[n] = i.xhrFields[n];
                for (n in i.mimeType && r.overrideMimeType && r.overrideMimeType(i.mimeType), i.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"), e) r.setRequestHeader(n, e[n]);
                o = function (e) {
                    return function () {
                        o && (o = a = r.onload = r.onerror = r.onabort = r.ontimeout = r.onreadystatechange = null, "abort" === e ? r.abort() : "error" === e ? "number" != typeof r.status ? t(0, "error") : t(r.status, r.statusText) : t(Ut[r.status] || r.status, r.statusText, "text" !== (r.responseType || "text") || "string" != typeof r.responseText ? {
                            binary: r.response
                        } : {
                            text: r.responseText
                        }, r.getAllResponseHeaders()))
                    }
                }, r.onload = o(), a = r.onerror = r.ontimeout = o("error"), void 0 !== r.onabort ? r.onabort = a : r.onreadystatechange = function () {
                    4 === r.readyState && C.setTimeout(function () {
                        o && a()
                    })
                }, o = o("abort");
                try {
                    r.send(i.hasContent && i.data || null)
                } catch (e) {
                    if (o) throw e
                }
            },
            abort: function () {
                o && o()
            }
        }
    }), k.ajaxPrefilter(function (e) {
        e.crossDomain && (e.contents.script = !1)
    }), k.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function (e) {
                return k.globalEval(e), e
            }
        }
    }), k.ajaxPrefilter("script", function (e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), k.ajaxTransport("script", function (n) {
        var r, i;
        if (n.crossDomain || n.scriptAttrs) return {
            send: function (e, t) {
                r = k("<script>").attr(n.scriptAttrs || {}).prop({
                    charset: n.scriptCharset,
                    src: n.url
                }).on("load error", i = function (e) {
                    r.remove(), i = null, e && t("error" === e.type ? 404 : 200, e.type)
                }), E.head.appendChild(r[0])
            },
            abort: function () {
                i && i()
            }
        }
    });
    var Vt, Gt = [],
        Yt = /(=)\?(?=&|$)|\?\?/;
    k.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var e = Gt.pop() || k.expando + "_" + kt++;
            return this[e] = !0, e
        }
    }), k.ajaxPrefilter("json jsonp", function (e, t, n) {
        var r, i, o, a = !1 !== e.jsonp && (Yt.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Yt.test(e.data) && "data");
        if (a || "jsonp" === e.dataTypes[0]) return r = e.jsonpCallback = m(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(Yt, "$1" + r) : !1 !== e.jsonp && (e.url += (St.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function () {
            return o || k.error(r + " was not called"), o[0]
        }, e.dataTypes[0] = "json", i = C[r], C[r] = function () {
            o = arguments
        }, n.always(function () {
            void 0 === i ? k(C).removeProp(r) : C[r] = i, e[r] && (e.jsonpCallback = t.jsonpCallback, Gt.push(r)), o && m(i) && i(o[0]), o = i = void 0
        }), "script"
    }), y.createHTMLDocument = ((Vt = E.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === Vt.childNodes.length), k.parseHTML = function (e, t, n) {
        return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (y.createHTMLDocument ? ((r = (t = E.implementation.createHTMLDocument("")).createElement("base")).href = E.location.href, t.head.appendChild(r)) : t = E), o = !n && [], (i = D.exec(e)) ? [t.createElement(i[1])] : (i = we([e], t, o), o && o.length && k(o).remove(), k.merge([], i.childNodes)));
        var r, i, o
    }, k.fn.load = function (e, t, n) {
        var r, i, o, a = this,
            s = e.indexOf(" ");
        return -1 < s && (r = mt(e.slice(s)), e = e.slice(0, s)), m(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), 0 < a.length && k.ajax({
            url: e,
            type: i || "GET",
            dataType: "html",
            data: t
        }).done(function (e) {
            o = arguments, a.html(r ? k("<div>").append(k.parseHTML(e)).find(r) : e)
        }).always(n && function (e, t) {
            a.each(function () {
                n.apply(this, o || [e.responseText, t, e])
            })
        }), this
    }, k.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
        k.fn[t] = function (e) {
            return this.on(t, e)
        }
    }), k.expr.pseudos.animated = function (t) {
        return k.grep(k.timers, function (e) {
            return t === e.elem
        }).length
    }, k.offset = {
        setOffset: function (e, t, n) {
            var r, i, o, a, s, u, l = k.css(e, "position"),
                c = k(e),
                f = {};
            "static" === l && (e.style.position = "relative"), s = c.offset(), o = k.css(e, "top"), u = k.css(e, "left"), ("absolute" === l || "fixed" === l) && -1 < (o + u).indexOf("auto") ? (a = (r = c.position()).top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), m(t) && (t = t.call(e, n, k.extend({}, s))), null != t.top && (f.top = t.top - s.top + a), null != t.left && (f.left = t.left - s.left + i), "using" in t ? t.using.call(e, f) : c.css(f)
        }
    }, k.fn.extend({
        offset: function (t) {
            if (arguments.length) return void 0 === t ? this : this.each(function (e) {
                k.offset.setOffset(this, t, e)
            });
            var e, n, r = this[0];
            return r ? r.getClientRects().length ? (e = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, {
                top: e.top + n.pageYOffset,
                left: e.left + n.pageXOffset
            }) : {
                top: 0,
                left: 0
            } : void 0
        },
        position: function () {
            if (this[0]) {
                var e, t, n, r = this[0],
                    i = {
                        top: 0,
                        left: 0
                    };
                if ("fixed" === k.css(r, "position")) t = r.getBoundingClientRect();
                else {
                    t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement;
                    while (e && (e === n.body || e === n.documentElement) && "static" === k.css(e, "position")) e = e.parentNode;
                    e && e !== r && 1 === e.nodeType && ((i = k(e).offset()).top += k.css(e, "borderTopWidth", !0), i.left += k.css(e, "borderLeftWidth", !0))
                }
                return {
                    top: t.top - i.top - k.css(r, "marginTop", !0),
                    left: t.left - i.left - k.css(r, "marginLeft", !0)
                }
            }
        },
        offsetParent: function () {
            return this.map(function () {
                var e = this.offsetParent;
                while (e && "static" === k.css(e, "position")) e = e.offsetParent;
                return e || ie
            })
        }
    }), k.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function (t, i) {
        var o = "pageYOffset" === i;
        k.fn[t] = function (e) {
            return _(this, function (e, t, n) {
                var r;
                if (x(e) ? r = e : 9 === e.nodeType && (r = e.defaultView), void 0 === n) return r ? r[i] : e[t];
                r ? r.scrollTo(o ? r.pageXOffset : n, o ? n : r.pageYOffset) : e[t] = n
            }, t, e, arguments.length)
        }
    }), k.each(["top", "left"], function (e, n) {
        k.cssHooks[n] = ze(y.pixelPosition, function (e, t) {
            if (t) return t = _e(e, n), $e.test(t) ? k(e).position()[n] + "px" : t
        })
    }), k.each({
        Height: "height",
        Width: "width"
    }, function (a, s) {
        k.each({
            padding: "inner" + a,
            content: s,
            "": "outer" + a
        }, function (r, o) {
            k.fn[o] = function (e, t) {
                var n = arguments.length && (r || "boolean" != typeof e),
                    i = r || (!0 === e || !0 === t ? "margin" : "border");
                return _(this, function (e, t, n) {
                    var r;
                    return x(e) ? 0 === o.indexOf("outer") ? e["inner" + a] : e.document.documentElement["client" + a] : 9 === e.nodeType ? (r = e.documentElement, Math.max(e.body["scroll" + a], r["scroll" + a], e.body["offset" + a], r["offset" + a], r["client" + a])) : void 0 === n ? k.css(e, t, i) : k.style(e, t, n, i)
                }, s, n ? e : void 0, n)
            }
        })
    }), k.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (e, n) {
        k.fn[n] = function (e, t) {
            return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n)
        }
    }), k.fn.extend({
        hover: function (e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }), k.fn.extend({
        bind: function (e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function (e, t) {
            return this.off(e, null, t)
        },
        delegate: function (e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function (e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    }), k.proxy = function (e, t) {
        var n, r, i;
        if ("string" == typeof t && (n = e[t], t = e, e = n), m(e)) return r = s.call(arguments, 2), (i = function () {
            return e.apply(t || this, r.concat(s.call(arguments)))
        }).guid = e.guid = e.guid || k.guid++, i
    }, k.holdReady = function (e) {
        e ? k.readyWait++ : k.ready(!0)
    }, k.isArray = Array.isArray, k.parseJSON = JSON.parse, k.nodeName = A, k.isFunction = m, k.isWindow = x, k.camelCase = V, k.type = w, k.now = Date.now, k.isNumeric = function (e) {
        var t = k.type(e);
        return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
    }, "function" == typeof define && define.amd && define("jquery", [], function () {
        return k
    });
    var Qt = C.jQuery,
        Jt = C.$;
    return k.noConflict = function (e) {
        return C.$ === k && (C.$ = Jt), e && C.jQuery === k && (C.jQuery = Qt), k
    }, e || (C.jQuery = C.$ = k), k
});
/*!
  * Bootstrap v4.4.1 (https://getbootstrap.com/)
  * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
 !function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("jquery"),require("popper.js")):"function"==typeof define&&define.amd?define(["exports","jquery","popper.js"],e):e((t=t||self).bootstrap={},t.jQuery,t.Popper)}(this,function(t,e,i){"use strict";function n(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function o(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),t}function s(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),i.push.apply(i,n)}return i}function r(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?s(Object(i),!0).forEach(function(e){var n,o,s;n=t,s=i[o=e],o in n?Object.defineProperty(n,o,{value:s,enumerable:!0,configurable:!0,writable:!0}):n[o]=s}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):s(Object(i)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))})}return t}e=e&&e.hasOwnProperty("default")?e.default:e,i=i&&i.hasOwnProperty("default")?i.default:i;var a="transitionend";var l={TRANSITION_END:"bsTransitionEnd",getUID:function(t){for(;t+=~~(1e6*Math.random()),document.getElementById(t););return t},getSelectorFromElement:function(t){var e=t.getAttribute("data-target");if(!e||"#"===e){var i=t.getAttribute("href");e=i&&"#"!==i?i.trim():""}try{return document.querySelector(e)?e:null}catch(t){return null}},getTransitionDurationFromElement:function(t){if(!t)return 0;var i=e(t).css("transition-duration"),n=e(t).css("transition-delay"),o=parseFloat(i),s=parseFloat(n);return o||s?(i=i.split(",")[0],n=n.split(",")[0],1e3*(parseFloat(i)+parseFloat(n))):0},reflow:function(t){return t.offsetHeight},triggerTransitionEnd:function(t){e(t).trigger(a)},supportsTransitionEnd:function(){return Boolean(a)},isElement:function(t){return(t[0]||t).nodeType},typeCheckConfig:function(t,e,i){for(var n in i)if(Object.prototype.hasOwnProperty.call(i,n)){var o=i[n],s=e[n],r=s&&l.isElement(s)?"element":(a=s,{}.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase());if(!new RegExp(o).test(r))throw new Error(t.toUpperCase()+': Option "'+n+'" provided type "'+r+'" but expected type "'+o+'".')}var a},findShadowRoot:function(t){if(!document.documentElement.attachShadow)return null;if("function"!=typeof t.getRootNode)return t instanceof ShadowRoot?t:t.parentNode?l.findShadowRoot(t.parentNode):null;var e=t.getRootNode();return e instanceof ShadowRoot?e:null},jQueryDetection:function(){if(void 0===e)throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");var t=e.fn.jquery.split(" ")[0].split(".");if(t[0]<2&&t[1]<9||1===t[0]&&9===t[1]&&t[2]<1||4<=t[0])throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")}};l.jQueryDetection(),e.fn.emulateTransitionEnd=function(t){var i=this,n=!1;return e(this).one(l.TRANSITION_END,function(){n=!0}),setTimeout(function(){n||l.triggerTransitionEnd(i)},t),this},e.event.special[l.TRANSITION_END]={bindType:a,delegateType:a,handle:function(t){if(e(t.target).is(this))return t.handleObj.handler.apply(this,arguments)}};var c="alert",h="bs.alert",u="."+h,d=e.fn[c],f={CLOSE:"close"+u,CLOSED:"closed"+u,CLICK_DATA_API:"click"+u+".data-api"},p=function(){function t(t){this._element=t}var i=t.prototype;return i.close=function(t){var e=this._element;t&&(e=this._getRootElement(t)),this._triggerCloseEvent(e).isDefaultPrevented()||this._removeElement(e)},i.dispose=function(){e.removeData(this._element,h),this._element=null},i._getRootElement=function(t){var i=l.getSelectorFromElement(t),n=!1;return i&&(n=document.querySelector(i)),n||e(t).closest(".alert")[0]},i._triggerCloseEvent=function(t){var i=e.Event(f.CLOSE);return e(t).trigger(i),i},i._removeElement=function(t){var i=this;if(e(t).removeClass("show"),e(t).hasClass("fade")){var n=l.getTransitionDurationFromElement(t);e(t).one(l.TRANSITION_END,function(e){return i._destroyElement(t,e)}).emulateTransitionEnd(n)}else this._destroyElement(t)},i._destroyElement=function(t){e(t).detach().trigger(f.CLOSED).remove()},t._jQueryInterface=function(i){return this.each(function(){var n=e(this),o=n.data(h);o||(o=new t(this),n.data(h,o)),"close"===i&&o[i](this)})},t._handleDismiss=function(t){return function(e){e&&e.preventDefault(),t.close(this)}},o(t,null,[{key:"VERSION",get:function(){return"4.4.1"}}]),t}();e(document).on(f.CLICK_DATA_API,'[data-dismiss="alert"]',p._handleDismiss(new p)),e.fn[c]=p._jQueryInterface,e.fn[c].Constructor=p,e.fn[c].noConflict=function(){return e.fn[c]=d,p._jQueryInterface};var m="button",g="bs.button",v="."+g,y=".data-api",_=e.fn[m],b="active",w='[data-toggle^="button"]',E='input:not([type="hidden"])',S=".btn",C={CLICK_DATA_API:"click"+v+y,FOCUS_BLUR_DATA_API:"focus"+v+y+" blur"+v+y,LOAD_DATA_API:"load"+v+y},I=function(){function t(t){this._element=t}var i=t.prototype;return i.toggle=function(){var t=!0,i=!0,n=e(this._element).closest('[data-toggle="buttons"]')[0];if(n){var o=this._element.querySelector(E);if(o){if("radio"===o.type)if(o.checked&&this._element.classList.contains(b))t=!1;else{var s=n.querySelector(".active");s&&e(s).removeClass(b)}else"checkbox"===o.type?"LABEL"===this._element.tagName&&o.checked===this._element.classList.contains(b)&&(t=!1):t=!1;t&&(o.checked=!this._element.classList.contains(b),e(o).trigger("change")),o.focus(),i=!1}}this._element.hasAttribute("disabled")||this._element.classList.contains("disabled")||(i&&this._element.setAttribute("aria-pressed",!this._element.classList.contains(b)),t&&e(this._element).toggleClass(b))},i.dispose=function(){e.removeData(this._element,g),this._element=null},t._jQueryInterface=function(i){return this.each(function(){var n=e(this).data(g);n||(n=new t(this),e(this).data(g,n)),"toggle"===i&&n[i]()})},o(t,null,[{key:"VERSION",get:function(){return"4.4.1"}}]),t}();e(document).on(C.CLICK_DATA_API,w,function(t){var i=t.target;if(e(i).hasClass("btn")||(i=e(i).closest(S)[0]),!i||i.hasAttribute("disabled")||i.classList.contains("disabled"))t.preventDefault();else{var n=i.querySelector(E);if(n&&(n.hasAttribute("disabled")||n.classList.contains("disabled")))return void t.preventDefault();I._jQueryInterface.call(e(i),"toggle")}}).on(C.FOCUS_BLUR_DATA_API,w,function(t){var i=e(t.target).closest(S)[0];e(i).toggleClass("focus",/^focus(in)?$/.test(t.type))}),e(window).on(C.LOAD_DATA_API,function(){for(var t=[].slice.call(document.querySelectorAll('[data-toggle="buttons"] .btn')),e=0,i=t.length;e<i;e++){var n=t[e],o=n.querySelector(E);o.checked||o.hasAttribute("checked")?n.classList.add(b):n.classList.remove(b)}for(var s=0,r=(t=[].slice.call(document.querySelectorAll('[data-toggle="button"]'))).length;s<r;s++){var a=t[s];"true"===a.getAttribute("aria-pressed")?a.classList.add(b):a.classList.remove(b)}}),e.fn[m]=I._jQueryInterface,e.fn[m].Constructor=I,e.fn[m].noConflict=function(){return e.fn[m]=_,I._jQueryInterface};var x="carousel",T="bs.carousel",A="."+T,k=".data-api",D=e.fn[x],z={interval:5e3,keyboard:!0,slide:!1,pause:"hover",wrap:!0,touch:!0},L={interval:"(number|boolean)",keyboard:"boolean",slide:"(boolean|string)",pause:"(string|boolean)",wrap:"boolean",touch:"boolean"},O="next",P="prev",N={SLIDE:"slide"+A,SLID:"slid"+A,KEYDOWN:"keydown"+A,MOUSEENTER:"mouseenter"+A,MOUSELEAVE:"mouseleave"+A,TOUCHSTART:"touchstart"+A,TOUCHMOVE:"touchmove"+A,TOUCHEND:"touchend"+A,POINTERDOWN:"pointerdown"+A,POINTERUP:"pointerup"+A,DRAG_START:"dragstart"+A,LOAD_DATA_API:"load"+A+k,CLICK_DATA_API:"click"+A+k},j="active",M=".active.carousel-item",F=".carousel-indicators",W={TOUCH:"touch",PEN:"pen"},B=function(){function t(t,e){this._items=null,this._interval=null,this._activeElement=null,this._isPaused=!1,this._isSliding=!1,this.touchTimeout=null,this.touchStartX=0,this.touchDeltaX=0,this._config=this._getConfig(e),this._element=t,this._indicatorsElement=this._element.querySelector(F),this._touchSupported="ontouchstart"in document.documentElement||0<navigator.maxTouchPoints,this._pointerEvent=Boolean(window.PointerEvent||window.MSPointerEvent),this._addEventListeners()}var i=t.prototype;return i.next=function(){this._isSliding||this._slide(O)},i.nextWhenVisible=function(){!document.hidden&&e(this._element).is(":visible")&&"hidden"!==e(this._element).css("visibility")&&this.next()},i.prev=function(){this._isSliding||this._slide(P)},i.pause=function(t){t||(this._isPaused=!0),this._element.querySelector(".carousel-item-next, .carousel-item-prev")&&(l.triggerTransitionEnd(this._element),this.cycle(!0)),clearInterval(this._interval),this._interval=null},i.cycle=function(t){t||(this._isPaused=!1),this._interval&&(clearInterval(this._interval),this._interval=null),this._config.interval&&!this._isPaused&&(this._interval=setInterval((document.visibilityState?this.nextWhenVisible:this.next).bind(this),this._config.interval))},i.to=function(t){var i=this;this._activeElement=this._element.querySelector(M);var n=this._getItemIndex(this._activeElement);if(!(t>this._items.length-1||t<0))if(this._isSliding)e(this._element).one(N.SLID,function(){return i.to(t)});else{if(n===t)return this.pause(),void this.cycle();var o=n<t?O:P;this._slide(o,this._items[t])}},i.dispose=function(){e(this._element).off(A),e.removeData(this._element,T),this._items=null,this._config=null,this._element=null,this._interval=null,this._isPaused=null,this._isSliding=null,this._activeElement=null,this._indicatorsElement=null},i._getConfig=function(t){return t=r({},z,{},t),l.typeCheckConfig(x,t,L),t},i._handleSwipe=function(){var t=Math.abs(this.touchDeltaX);if(!(t<=40)){var e=t/this.touchDeltaX;(this.touchDeltaX=0)<e&&this.prev(),e<0&&this.next()}},i._addEventListeners=function(){var t=this;this._config.keyboard&&e(this._element).on(N.KEYDOWN,function(e){return t._keydown(e)}),"hover"===this._config.pause&&e(this._element).on(N.MOUSEENTER,function(e){return t.pause(e)}).on(N.MOUSELEAVE,function(e){return t.cycle(e)}),this._config.touch&&this._addTouchEventListeners()},i._addTouchEventListeners=function(){var t=this;if(this._touchSupported){var i=function(e){t._pointerEvent&&W[e.originalEvent.pointerType.toUpperCase()]?t.touchStartX=e.originalEvent.clientX:t._pointerEvent||(t.touchStartX=e.originalEvent.touches[0].clientX)},n=function(e){t._pointerEvent&&W[e.originalEvent.pointerType.toUpperCase()]&&(t.touchDeltaX=e.originalEvent.clientX-t.touchStartX),t._handleSwipe(),"hover"===t._config.pause&&(t.pause(),t.touchTimeout&&clearTimeout(t.touchTimeout),t.touchTimeout=setTimeout(function(e){return t.cycle(e)},500+t._config.interval))};e(this._element.querySelectorAll(".carousel-item img")).on(N.DRAG_START,function(t){return t.preventDefault()}),this._pointerEvent?(e(this._element).on(N.POINTERDOWN,function(t){return i(t)}),e(this._element).on(N.POINTERUP,function(t){return n(t)}),this._element.classList.add("pointer-event")):(e(this._element).on(N.TOUCHSTART,function(t){return i(t)}),e(this._element).on(N.TOUCHMOVE,function(e){return function(e){e.originalEvent.touches&&1<e.originalEvent.touches.length?t.touchDeltaX=0:t.touchDeltaX=e.originalEvent.touches[0].clientX-t.touchStartX}(e)}),e(this._element).on(N.TOUCHEND,function(t){return n(t)}))}},i._keydown=function(t){if(!/input|textarea/i.test(t.target.tagName))switch(t.which){case 37:t.preventDefault(),this.prev();break;case 39:t.preventDefault(),this.next()}},i._getItemIndex=function(t){return this._items=t&&t.parentNode?[].slice.call(t.parentNode.querySelectorAll(".carousel-item")):[],this._items.indexOf(t)},i._getItemByDirection=function(t,e){var i=t===O,n=t===P,o=this._getItemIndex(e),s=this._items.length-1;if((n&&0===o||i&&o===s)&&!this._config.wrap)return e;var r=(o+(t===P?-1:1))%this._items.length;return-1==r?this._items[this._items.length-1]:this._items[r]},i._triggerSlideEvent=function(t,i){var n=this._getItemIndex(t),o=this._getItemIndex(this._element.querySelector(M)),s=e.Event(N.SLIDE,{relatedTarget:t,direction:i,from:o,to:n});return e(this._element).trigger(s),s},i._setActiveIndicatorElement=function(t){if(this._indicatorsElement){var i=[].slice.call(this._indicatorsElement.querySelectorAll(".active"));e(i).removeClass(j);var n=this._indicatorsElement.children[this._getItemIndex(t)];n&&e(n).addClass(j)}},i._slide=function(t,i){var n,o,s,r=this,a=this._element.querySelector(M),c=this._getItemIndex(a),h=i||a&&this._getItemByDirection(t,a),u=this._getItemIndex(h),d=Boolean(this._interval);if(s=t===O?(n="carousel-item-left",o="carousel-item-next","left"):(n="carousel-item-right",o="carousel-item-prev","right"),h&&e(h).hasClass(j))this._isSliding=!1;else if(!this._triggerSlideEvent(h,s).isDefaultPrevented()&&a&&h){this._isSliding=!0,d&&this.pause(),this._setActiveIndicatorElement(h);var f=e.Event(N.SLID,{relatedTarget:h,direction:s,from:c,to:u});if(e(this._element).hasClass("slide")){e(h).addClass(o),l.reflow(h),e(a).addClass(n),e(h).addClass(n);var p=parseInt(h.getAttribute("data-interval"),10);p?(this._config.defaultInterval=this._config.defaultInterval||this._config.interval,this._config.interval=p):this._config.interval=this._config.defaultInterval||this._config.interval;var m=l.getTransitionDurationFromElement(a);e(a).one(l.TRANSITION_END,function(){e(h).removeClass(n+" "+o).addClass(j),e(a).removeClass(j+" "+o+" "+n),r._isSliding=!1,setTimeout(function(){return e(r._element).trigger(f)},0)}).emulateTransitionEnd(m)}else e(a).removeClass(j),e(h).addClass(j),this._isSliding=!1,e(this._element).trigger(f);d&&this.cycle()}},t._jQueryInterface=function(i){return this.each(function(){var n=e(this).data(T),o=r({},z,{},e(this).data());"object"==typeof i&&(o=r({},o,{},i));var s="string"==typeof i?i:o.slide;if(n||(n=new t(this,o),e(this).data(T,n)),"number"==typeof i)n.to(i);else if("string"==typeof s){if(void 0===n[s])throw new TypeError('No method named "'+s+'"');n[s]()}else o.interval&&o.ride&&(n.pause(),n.cycle())})},t._dataApiClickHandler=function(i){var n=l.getSelectorFromElement(this);if(n){var o=e(n)[0];if(o&&e(o).hasClass("carousel")){var s=r({},e(o).data(),{},e(this).data()),a=this.getAttribute("data-slide-to");a&&(s.interval=!1),t._jQueryInterface.call(e(o),s),a&&e(o).data(T).to(a),i.preventDefault()}}},o(t,null,[{key:"VERSION",get:function(){return"4.4.1"}},{key:"Default",get:function(){return z}}]),t}();e(document).on(N.CLICK_DATA_API,"[data-slide], [data-slide-to]",B._dataApiClickHandler),e(window).on(N.LOAD_DATA_API,function(){for(var t=[].slice.call(document.querySelectorAll('[data-ride="carousel"]')),i=0,n=t.length;i<n;i++){var o=e(t[i]);B._jQueryInterface.call(o,o.data())}}),e.fn[x]=B._jQueryInterface,e.fn[x].Constructor=B,e.fn[x].noConflict=function(){return e.fn[x]=D,B._jQueryInterface};var q="collapse",H="bs.collapse",R="."+H,U=e.fn[q],Q={toggle:!0,parent:""},$={toggle:"boolean",parent:"(string|element)"},Y={SHOW:"show"+R,SHOWN:"shown"+R,HIDE:"hide"+R,HIDDEN:"hidden"+R,CLICK_DATA_API:"click"+R+".data-api"},K="show",V="collapse",G="collapsing",X="collapsed",Z='[data-toggle="collapse"]',J=function(){function t(t,e){this._isTransitioning=!1,this._element=t,this._config=this._getConfig(e),this._triggerArray=[].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#'+t.id+'"],[data-toggle="collapse"][data-target="#'+t.id+'"]'));for(var i=[].slice.call(document.querySelectorAll(Z)),n=0,o=i.length;n<o;n++){var s=i[n],r=l.getSelectorFromElement(s),a=[].slice.call(document.querySelectorAll(r)).filter(function(e){return e===t});null!==r&&0<a.length&&(this._selector=r,this._triggerArray.push(s))}this._parent=this._config.parent?this._getParent():null,this._config.parent||this._addAriaAndCollapsedClass(this._element,this._triggerArray),this._config.toggle&&this.toggle()}var i=t.prototype;return i.toggle=function(){e(this._element).hasClass(K)?this.hide():this.show()},i.show=function(){var i,n,o=this;if(!(this._isTransitioning||e(this._element).hasClass(K)||(this._parent&&0===(i=[].slice.call(this._parent.querySelectorAll(".show, .collapsing")).filter(function(t){return"string"==typeof o._config.parent?t.getAttribute("data-parent")===o._config.parent:t.classList.contains(V)})).length&&(i=null),i&&(n=e(i).not(this._selector).data(H))&&n._isTransitioning))){var s=e.Event(Y.SHOW);if(e(this._element).trigger(s),!s.isDefaultPrevented()){i&&(t._jQueryInterface.call(e(i).not(this._selector),"hide"),n||e(i).data(H,null));var r=this._getDimension();e(this._element).removeClass(V).addClass(G),this._element.style[r]=0,this._triggerArray.length&&e(this._triggerArray).removeClass(X).attr("aria-expanded",!0),this.setTransitioning(!0);var a="scroll"+(r[0].toUpperCase()+r.slice(1)),c=l.getTransitionDurationFromElement(this._element);e(this._element).one(l.TRANSITION_END,function(){e(o._element).removeClass(G).addClass(V).addClass(K),o._element.style[r]="",o.setTransitioning(!1),e(o._element).trigger(Y.SHOWN)}).emulateTransitionEnd(c),this._element.style[r]=this._element[a]+"px"}}},i.hide=function(){var t=this;if(!this._isTransitioning&&e(this._element).hasClass(K)){var i=e.Event(Y.HIDE);if(e(this._element).trigger(i),!i.isDefaultPrevented()){var n=this._getDimension();this._element.style[n]=this._element.getBoundingClientRect()[n]+"px",l.reflow(this._element),e(this._element).addClass(G).removeClass(V).removeClass(K);var o=this._triggerArray.length;if(0<o)for(var s=0;s<o;s++){var r=this._triggerArray[s],a=l.getSelectorFromElement(r);null!==a&&(e([].slice.call(document.querySelectorAll(a))).hasClass(K)||e(r).addClass(X).attr("aria-expanded",!1))}this.setTransitioning(!0),this._element.style[n]="";var c=l.getTransitionDurationFromElement(this._element);e(this._element).one(l.TRANSITION_END,function(){t.setTransitioning(!1),e(t._element).removeClass(G).addClass(V).trigger(Y.HIDDEN)}).emulateTransitionEnd(c)}}},i.setTransitioning=function(t){this._isTransitioning=t},i.dispose=function(){e.removeData(this._element,H),this._config=null,this._parent=null,this._element=null,this._triggerArray=null,this._isTransitioning=null},i._getConfig=function(t){return(t=r({},Q,{},t)).toggle=Boolean(t.toggle),l.typeCheckConfig(q,t,$),t},i._getDimension=function(){return e(this._element).hasClass("width")?"width":"height"},i._getParent=function(){var i,n=this;l.isElement(this._config.parent)?(i=this._config.parent,void 0!==this._config.parent.jquery&&(i=this._config.parent[0])):i=document.querySelector(this._config.parent);var o='[data-toggle="collapse"][data-parent="'+this._config.parent+'"]',s=[].slice.call(i.querySelectorAll(o));return e(s).each(function(e,i){n._addAriaAndCollapsedClass(t._getTargetFromElement(i),[i])}),i},i._addAriaAndCollapsedClass=function(t,i){var n=e(t).hasClass(K);i.length&&e(i).toggleClass(X,!n).attr("aria-expanded",n)},t._getTargetFromElement=function(t){var e=l.getSelectorFromElement(t);return e?document.querySelector(e):null},t._jQueryInterface=function(i){return this.each(function(){var n=e(this),o=n.data(H),s=r({},Q,{},n.data(),{},"object"==typeof i&&i?i:{});if(!o&&s.toggle&&/show|hide/.test(i)&&(s.toggle=!1),o||(o=new t(this,s),n.data(H,o)),"string"==typeof i){if(void 0===o[i])throw new TypeError('No method named "'+i+'"');o[i]()}})},o(t,null,[{key:"VERSION",get:function(){return"4.4.1"}},{key:"Default",get:function(){return Q}}]),t}();e(document).on(Y.CLICK_DATA_API,Z,function(t){"A"===t.currentTarget.tagName&&t.preventDefault();var i=e(this),n=l.getSelectorFromElement(this),o=[].slice.call(document.querySelectorAll(n));e(o).each(function(){var t=e(this),n=t.data(H)?"toggle":i.data();J._jQueryInterface.call(t,n)})}),e.fn[q]=J._jQueryInterface,e.fn[q].Constructor=J,e.fn[q].noConflict=function(){return e.fn[q]=U,J._jQueryInterface};var tt="dropdown",et="bs.dropdown",it="."+et,nt=".data-api",ot=e.fn[tt],st=new RegExp("38|40|27"),rt={HIDE:"hide"+it,HIDDEN:"hidden"+it,SHOW:"show"+it,SHOWN:"shown"+it,CLICK:"click"+it,CLICK_DATA_API:"click"+it+nt,KEYDOWN_DATA_API:"keydown"+it+nt,KEYUP_DATA_API:"keyup"+it+nt},at="disabled",lt="show",ct="dropdown-menu-right",ht='[data-toggle="dropdown"]',ut=".dropdown-menu",dt={offset:0,flip:!0,boundary:"scrollParent",reference:"toggle",display:"dynamic",popperConfig:null},ft={offset:"(number|string|function)",flip:"boolean",boundary:"(string|element)",reference:"(string|element)",display:"string",popperConfig:"(null|object)"},pt=function(){function t(t,e){this._element=t,this._popper=null,this._config=this._getConfig(e),this._menu=this._getMenuElement(),this._inNavbar=this._detectNavbar(),this._addEventListeners()}var n=t.prototype;return n.toggle=function(){if(!this._element.disabled&&!e(this._element).hasClass(at)){var i=e(this._menu).hasClass(lt);t._clearMenus(),i||this.show(!0)}},n.show=function(n){if(void 0===n&&(n=!1),!(this._element.disabled||e(this._element).hasClass(at)||e(this._menu).hasClass(lt))){var o={relatedTarget:this._element},s=e.Event(rt.SHOW,o),r=t._getParentFromElement(this._element);if(e(r).trigger(s),!s.isDefaultPrevented()){if(!this._inNavbar&&n){if(void 0===i)throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");var a=this._element;"parent"===this._config.reference?a=r:l.isElement(this._config.reference)&&(a=this._config.reference,void 0!==this._config.reference.jquery&&(a=this._config.reference[0])),"scrollParent"!==this._config.boundary&&e(r).addClass("position-static"),this._popper=new i(a,this._menu,this._getPopperConfig())}"ontouchstart"in document.documentElement&&0===e(r).closest(".navbar-nav").length&&e(document.body).children().on("mouseover",null,e.noop),this._element.focus(),this._element.setAttribute("aria-expanded",!0),e(this._menu).toggleClass(lt),e(r).toggleClass(lt).trigger(e.Event(rt.SHOWN,o))}}},n.hide=function(){if(!this._element.disabled&&!e(this._element).hasClass(at)&&e(this._menu).hasClass(lt)){var i={relatedTarget:this._element},n=e.Event(rt.HIDE,i),o=t._getParentFromElement(this._element);e(o).trigger(n),n.isDefaultPrevented()||(this._popper&&this._popper.destroy(),e(this._menu).toggleClass(lt),e(o).toggleClass(lt).trigger(e.Event(rt.HIDDEN,i)))}},n.dispose=function(){e.removeData(this._element,et),e(this._element).off(it),this._element=null,(this._menu=null)!==this._popper&&(this._popper.destroy(),this._popper=null)},n.update=function(){this._inNavbar=this._detectNavbar(),null!==this._popper&&this._popper.scheduleUpdate()},n._addEventListeners=function(){var t=this;e(this._element).on(rt.CLICK,function(e){e.preventDefault(),e.stopPropagation(),t.toggle()})},n._getConfig=function(t){return t=r({},this.constructor.Default,{},e(this._element).data(),{},t),l.typeCheckConfig(tt,t,this.constructor.DefaultType),t},n._getMenuElement=function(){if(!this._menu){var e=t._getParentFromElement(this._element);e&&(this._menu=e.querySelector(ut))}return this._menu},n._getPlacement=function(){var t=e(this._element.parentNode),i="bottom-start";return t.hasClass("dropup")?(i="top-start",e(this._menu).hasClass(ct)&&(i="top-end")):t.hasClass("dropright")?i="right-start":t.hasClass("dropleft")?i="left-start":e(this._menu).hasClass(ct)&&(i="bottom-end"),i},n._detectNavbar=function(){return 0<e(this._element).closest(".navbar").length},n._getOffset=function(){var t=this,e={};return"function"==typeof this._config.offset?e.fn=function(e){return e.offsets=r({},e.offsets,{},t._config.offset(e.offsets,t._element)||{}),e}:e.offset=this._config.offset,e},n._getPopperConfig=function(){var t={placement:this._getPlacement(),modifiers:{offset:this._getOffset(),flip:{enabled:this._config.flip},preventOverflow:{boundariesElement:this._config.boundary}}};return"static"===this._config.display&&(t.modifiers.applyStyle={enabled:!1}),r({},t,{},this._config.popperConfig)},t._jQueryInterface=function(i){return this.each(function(){var n=e(this).data(et);if(n||(n=new t(this,"object"==typeof i?i:null),e(this).data(et,n)),"string"==typeof i){if(void 0===n[i])throw new TypeError('No method named "'+i+'"');n[i]()}})},t._clearMenus=function(i){if(!i||3!==i.which&&("keyup"!==i.type||9===i.which))for(var n=[].slice.call(document.querySelectorAll(ht)),o=0,s=n.length;o<s;o++){var r=t._getParentFromElement(n[o]),a=e(n[o]).data(et),l={relatedTarget:n[o]};if(i&&"click"===i.type&&(l.clickEvent=i),a){var c=a._menu;if(e(r).hasClass(lt)&&!(i&&("click"===i.type&&/input|textarea/i.test(i.target.tagName)||"keyup"===i.type&&9===i.which)&&e.contains(r,i.target))){var h=e.Event(rt.HIDE,l);e(r).trigger(h),h.isDefaultPrevented()||("ontouchstart"in document.documentElement&&e(document.body).children().off("mouseover",null,e.noop),n[o].setAttribute("aria-expanded","false"),a._popper&&a._popper.destroy(),e(c).removeClass(lt),e(r).removeClass(lt).trigger(e.Event(rt.HIDDEN,l)))}}}},t._getParentFromElement=function(t){var e,i=l.getSelectorFromElement(t);return i&&(e=document.querySelector(i)),e||t.parentNode},t._dataApiKeydownHandler=function(i){if((/input|textarea/i.test(i.target.tagName)?!(32===i.which||27!==i.which&&(40!==i.which&&38!==i.which||e(i.target).closest(ut).length)):st.test(i.which))&&(i.preventDefault(),i.stopPropagation(),!this.disabled&&!e(this).hasClass(at))){var n=t._getParentFromElement(this),o=e(n).hasClass(lt);if(o||27!==i.which)if(o&&(!o||27!==i.which&&32!==i.which)){var s=[].slice.call(n.querySelectorAll(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)")).filter(function(t){return e(t).is(":visible")});if(0!==s.length){var r=s.indexOf(i.target);38===i.which&&0<r&&r--,40===i.which&&r<s.length-1&&r++,r<0&&(r=0),s[r].focus()}}else{if(27===i.which){var a=n.querySelector(ht);e(a).trigger("focus")}e(this).trigger("click")}}},o(t,null,[{key:"VERSION",get:function(){return"4.4.1"}},{key:"Default",get:function(){return dt}},{key:"DefaultType",get:function(){return ft}}]),t}();e(document).on(rt.KEYDOWN_DATA_API,ht,pt._dataApiKeydownHandler).on(rt.KEYDOWN_DATA_API,ut,pt._dataApiKeydownHandler).on(rt.CLICK_DATA_API+" "+rt.KEYUP_DATA_API,pt._clearMenus).on(rt.CLICK_DATA_API,ht,function(t){t.preventDefault(),t.stopPropagation(),pt._jQueryInterface.call(e(this),"toggle")}).on(rt.CLICK_DATA_API,".dropdown form",function(t){t.stopPropagation()}),e.fn[tt]=pt._jQueryInterface,e.fn[tt].Constructor=pt,e.fn[tt].noConflict=function(){return e.fn[tt]=ot,pt._jQueryInterface};var mt="modal",gt="bs.modal",vt="."+gt,yt=e.fn[mt],_t={backdrop:!0,keyboard:!0,focus:!0,show:!0},bt={backdrop:"(boolean|string)",keyboard:"boolean",focus:"boolean",show:"boolean"},wt={HIDE:"hide"+vt,HIDE_PREVENTED:"hidePrevented"+vt,HIDDEN:"hidden"+vt,SHOW:"show"+vt,SHOWN:"shown"+vt,FOCUSIN:"focusin"+vt,RESIZE:"resize"+vt,CLICK_DISMISS:"click.dismiss"+vt,KEYDOWN_DISMISS:"keydown.dismiss"+vt,MOUSEUP_DISMISS:"mouseup.dismiss"+vt,MOUSEDOWN_DISMISS:"mousedown.dismiss"+vt,CLICK_DATA_API:"click"+vt+".data-api"},Et="modal-open",St="fade",Ct="show",It="modal-static",xt=".modal-dialog",Tt=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",At=".sticky-top",kt=function(){function t(t,e){this._config=this._getConfig(e),this._element=t,this._dialog=t.querySelector(xt),this._backdrop=null,this._isShown=!1,this._isBodyOverflowing=!1,this._ignoreBackdropClick=!1,this._isTransitioning=!1,this._scrollbarWidth=0}var i=t.prototype;return i.toggle=function(t){return this._isShown?this.hide():this.show(t)},i.show=function(t){var i=this;if(!this._isShown&&!this._isTransitioning){e(this._element).hasClass(St)&&(this._isTransitioning=!0);var n=e.Event(wt.SHOW,{relatedTarget:t});e(this._element).trigger(n),this._isShown||n.isDefaultPrevented()||(this._isShown=!0,this._checkScrollbar(),this._setScrollbar(),this._adjustDialog(),this._setEscapeEvent(),this._setResizeEvent(),e(this._element).on(wt.CLICK_DISMISS,'[data-dismiss="modal"]',function(t){return i.hide(t)}),e(this._dialog).on(wt.MOUSEDOWN_DISMISS,function(){e(i._element).one(wt.MOUSEUP_DISMISS,function(t){e(t.target).is(i._element)&&(i._ignoreBackdropClick=!0)})}),this._showBackdrop(function(){return i._showElement(t)}))}},i.hide=function(t){var i=this;if(t&&t.preventDefault(),this._isShown&&!this._isTransitioning){var n=e.Event(wt.HIDE);if(e(this._element).trigger(n),this._isShown&&!n.isDefaultPrevented()){this._isShown=!1;var o=e(this._element).hasClass(St);if(o&&(this._isTransitioning=!0),this._setEscapeEvent(),this._setResizeEvent(),e(document).off(wt.FOCUSIN),e(this._element).removeClass(Ct),e(this._element).off(wt.CLICK_DISMISS),e(this._dialog).off(wt.MOUSEDOWN_DISMISS),o){var s=l.getTransitionDurationFromElement(this._element);e(this._element).one(l.TRANSITION_END,function(t){return i._hideModal(t)}).emulateTransitionEnd(s)}else this._hideModal()}}},i.dispose=function(){[window,this._element,this._dialog].forEach(function(t){return e(t).off(vt)}),e(document).off(wt.FOCUSIN),e.removeData(this._element,gt),this._config=null,this._element=null,this._dialog=null,this._backdrop=null,this._isShown=null,this._isBodyOverflowing=null,this._ignoreBackdropClick=null,this._isTransitioning=null,this._scrollbarWidth=null},i.handleUpdate=function(){this._adjustDialog()},i._getConfig=function(t){return t=r({},_t,{},t),l.typeCheckConfig(mt,t,bt),t},i._triggerBackdropTransition=function(){var t=this;if("static"===this._config.backdrop){var i=e.Event(wt.HIDE_PREVENTED);if(e(this._element).trigger(i),i.defaultPrevented)return;this._element.classList.add(It);var n=l.getTransitionDurationFromElement(this._element);e(this._element).one(l.TRANSITION_END,function(){t._element.classList.remove(It)}).emulateTransitionEnd(n),this._element.focus()}else this.hide()},i._showElement=function(t){var i=this,n=e(this._element).hasClass(St),o=this._dialog?this._dialog.querySelector(".modal-body"):null;function s(){i._config.focus&&i._element.focus(),i._isTransitioning=!1,e(i._element).trigger(r)}this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE||document.body.appendChild(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),e(this._dialog).hasClass("modal-dialog-scrollable")&&o?o.scrollTop=0:this._element.scrollTop=0,n&&l.reflow(this._element),e(this._element).addClass(Ct),this._config.focus&&this._enforceFocus();var r=e.Event(wt.SHOWN,{relatedTarget:t});if(n){var a=l.getTransitionDurationFromElement(this._dialog);e(this._dialog).one(l.TRANSITION_END,s).emulateTransitionEnd(a)}else s()},i._enforceFocus=function(){var t=this;e(document).off(wt.FOCUSIN).on(wt.FOCUSIN,function(i){document!==i.target&&t._element!==i.target&&0===e(t._element).has(i.target).length&&t._element.focus()})},i._setEscapeEvent=function(){var t=this;this._isShown&&this._config.keyboard?e(this._element).on(wt.KEYDOWN_DISMISS,function(e){27===e.which&&t._triggerBackdropTransition()}):this._isShown||e(this._element).off(wt.KEYDOWN_DISMISS)},i._setResizeEvent=function(){var t=this;this._isShown?e(window).on(wt.RESIZE,function(e){return t.handleUpdate(e)}):e(window).off(wt.RESIZE)},i._hideModal=function(){var t=this;this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._isTransitioning=!1,this._showBackdrop(function(){e(document.body).removeClass(Et),t._resetAdjustments(),t._resetScrollbar(),e(t._element).trigger(wt.HIDDEN)})},i._removeBackdrop=function(){this._backdrop&&(e(this._backdrop).remove(),this._backdrop=null)},i._showBackdrop=function(t){var i=this,n=e(this._element).hasClass(St)?St:"";if(this._isShown&&this._config.backdrop){if(this._backdrop=document.createElement("div"),this._backdrop.className="modal-backdrop",n&&this._backdrop.classList.add(n),e(this._backdrop).appendTo(document.body),e(this._element).on(wt.CLICK_DISMISS,function(t){i._ignoreBackdropClick?i._ignoreBackdropClick=!1:t.target===t.currentTarget&&i._triggerBackdropTransition()}),n&&l.reflow(this._backdrop),e(this._backdrop).addClass(Ct),!t)return;if(!n)return void t();var o=l.getTransitionDurationFromElement(this._backdrop);e(this._backdrop).one(l.TRANSITION_END,t).emulateTransitionEnd(o)}else if(!this._isShown&&this._backdrop){e(this._backdrop).removeClass(Ct);var s=function(){i._removeBackdrop(),t&&t()};if(e(this._element).hasClass(St)){var r=l.getTransitionDurationFromElement(this._backdrop);e(this._backdrop).one(l.TRANSITION_END,s).emulateTransitionEnd(r)}else s()}else t&&t()},i._adjustDialog=function(){var t=this._element.scrollHeight>document.documentElement.clientHeight;!this._isBodyOverflowing&&t&&(this._element.style.paddingLeft=this._scrollbarWidth+"px"),this._isBodyOverflowing&&!t&&(this._element.style.paddingRight=this._scrollbarWidth+"px")},i._resetAdjustments=function(){this._element.style.paddingLeft="",this._element.style.paddingRight=""},i._checkScrollbar=function(){var t=document.body.getBoundingClientRect();this._isBodyOverflowing=t.left+t.right<window.innerWidth,this._scrollbarWidth=this._getScrollbarWidth()},i._setScrollbar=function(){var t=this;if(this._isBodyOverflowing){var i=[].slice.call(document.querySelectorAll(Tt)),n=[].slice.call(document.querySelectorAll(At));e(i).each(function(i,n){var o=n.style.paddingRight,s=e(n).css("padding-right");e(n).data("padding-right",o).css("padding-right",parseFloat(s)+t._scrollbarWidth+"px")}),e(n).each(function(i,n){var o=n.style.marginRight,s=e(n).css("margin-right");e(n).data("margin-right",o).css("margin-right",parseFloat(s)-t._scrollbarWidth+"px")});var o=document.body.style.paddingRight,s=e(document.body).css("padding-right");e(document.body).data("padding-right",o).css("padding-right",parseFloat(s)+this._scrollbarWidth+"px")}e(document.body).addClass(Et)},i._resetScrollbar=function(){var t=[].slice.call(document.querySelectorAll(Tt));e(t).each(function(t,i){var n=e(i).data("padding-right");e(i).removeData("padding-right"),i.style.paddingRight=n||""});var i=[].slice.call(document.querySelectorAll(""+At));e(i).each(function(t,i){var n=e(i).data("margin-right");void 0!==n&&e(i).css("margin-right",n).removeData("margin-right")});var n=e(document.body).data("padding-right");e(document.body).removeData("padding-right"),document.body.style.paddingRight=n||""},i._getScrollbarWidth=function(){var t=document.createElement("div");t.className="modal-scrollbar-measure",document.body.appendChild(t);var e=t.getBoundingClientRect().width-t.clientWidth;return document.body.removeChild(t),e},t._jQueryInterface=function(i,n){return this.each(function(){var o=e(this).data(gt),s=r({},_t,{},e(this).data(),{},"object"==typeof i&&i?i:{});if(o||(o=new t(this,s),e(this).data(gt,o)),"string"==typeof i){if(void 0===o[i])throw new TypeError('No method named "'+i+'"');o[i](n)}else s.show&&o.show(n)})},o(t,null,[{key:"VERSION",get:function(){return"4.4.1"}},{key:"Default",get:function(){return _t}}]),t}();e(document).on(wt.CLICK_DATA_API,'[data-toggle="modal"]',function(t){var i,n=this,o=l.getSelectorFromElement(this);o&&(i=document.querySelector(o));var s=e(i).data(gt)?"toggle":r({},e(i).data(),{},e(this).data());"A"!==this.tagName&&"AREA"!==this.tagName||t.preventDefault();var a=e(i).one(wt.SHOW,function(t){t.isDefaultPrevented()||a.one(wt.HIDDEN,function(){e(n).is(":visible")&&n.focus()})});kt._jQueryInterface.call(e(i),s,this)}),e.fn[mt]=kt._jQueryInterface,e.fn[mt].Constructor=kt,e.fn[mt].noConflict=function(){return e.fn[mt]=yt,kt._jQueryInterface};var Dt=["background","cite","href","itemtype","longdesc","poster","src","xlink:href"],zt=/^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,Lt=/^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;function Ot(t,e,i){if(0===t.length)return t;if(i&&"function"==typeof i)return i(t);for(var n=(new window.DOMParser).parseFromString(t,"text/html"),o=Object.keys(e),s=[].slice.call(n.body.querySelectorAll("*")),r=function(t){var i=s[t],n=i.nodeName.toLowerCase();if(-1===o.indexOf(i.nodeName.toLowerCase()))return i.parentNode.removeChild(i),"continue";var r=[].slice.call(i.attributes),a=[].concat(e["*"]||[],e[n]||[]);r.forEach(function(t){!function(t,e){var i=t.nodeName.toLowerCase();if(-1!==e.indexOf(i))return-1===Dt.indexOf(i)||Boolean(t.nodeValue.match(zt)||t.nodeValue.match(Lt));for(var n=e.filter(function(t){return t instanceof RegExp}),o=0,s=n.length;o<s;o++)if(i.match(n[o]))return!0;return!1}(t,a)&&i.removeAttribute(t.nodeName)})},a=0,l=s.length;a<l;a++)r(a);return n.body.innerHTML}var Pt="tooltip",Nt="bs.tooltip",jt="."+Nt,Mt=e.fn[Pt],Ft="bs-tooltip",Wt=new RegExp("(^|\\s)"+Ft+"\\S+","g"),Bt=["sanitize","whiteList","sanitizeFn"],qt={animation:"boolean",template:"string",title:"(string|element|function)",trigger:"string",delay:"(number|object)",html:"boolean",selector:"(string|boolean)",placement:"(string|function)",offset:"(number|string|function)",container:"(string|element|boolean)",fallbackPlacement:"(string|array)",boundary:"(string|element)",sanitize:"boolean",sanitizeFn:"(null|function)",whiteList:"object",popperConfig:"(null|object)"},Ht={AUTO:"auto",TOP:"top",RIGHT:"right",BOTTOM:"bottom",LEFT:"left"},Rt={animation:!0,template:'<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,selector:!1,placement:"top",offset:0,container:!1,fallbackPlacement:"flip",boundary:"scrollParent",sanitize:!0,sanitizeFn:null,whiteList:{"*":["class","dir","id","lang","role",/^aria-[\w-]*$/i],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],div:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},popperConfig:null},Ut="show",Qt={HIDE:"hide"+jt,HIDDEN:"hidden"+jt,SHOW:"show"+jt,SHOWN:"shown"+jt,INSERTED:"inserted"+jt,CLICK:"click"+jt,FOCUSIN:"focusin"+jt,FOCUSOUT:"focusout"+jt,MOUSEENTER:"mouseenter"+jt,MOUSELEAVE:"mouseleave"+jt},$t="fade",Yt="show",Kt="hover",Vt="focus",Gt=function(){function t(t,e){if(void 0===i)throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");this._isEnabled=!0,this._timeout=0,this._hoverState="",this._activeTrigger={},this._popper=null,this.element=t,this.config=this._getConfig(e),this.tip=null,this._setListeners()}var n=t.prototype;return n.enable=function(){this._isEnabled=!0},n.disable=function(){this._isEnabled=!1},n.toggleEnabled=function(){this._isEnabled=!this._isEnabled},n.toggle=function(t){if(this._isEnabled)if(t){var i=this.constructor.DATA_KEY,n=e(t.currentTarget).data(i);n||(n=new this.constructor(t.currentTarget,this._getDelegateConfig()),e(t.currentTarget).data(i,n)),n._activeTrigger.click=!n._activeTrigger.click,n._isWithActiveTrigger()?n._enter(null,n):n._leave(null,n)}else{if(e(this.getTipElement()).hasClass(Yt))return void this._leave(null,this);this._enter(null,this)}},n.dispose=function(){clearTimeout(this._timeout),e.removeData(this.element,this.constructor.DATA_KEY),e(this.element).off(this.constructor.EVENT_KEY),e(this.element).closest(".modal").off("hide.bs.modal",this._hideModalHandler),this.tip&&e(this.tip).remove(),this._isEnabled=null,this._timeout=null,this._hoverState=null,this._activeTrigger=null,this._popper&&this._popper.destroy(),this._popper=null,this.element=null,this.config=null,this.tip=null},n.show=function(){var t=this;if("none"===e(this.element).css("display"))throw new Error("Please use show on visible elements");var n=e.Event(this.constructor.Event.SHOW);if(this.isWithContent()&&this._isEnabled){e(this.element).trigger(n);var o=l.findShadowRoot(this.element),s=e.contains(null!==o?o:this.element.ownerDocument.documentElement,this.element);if(n.isDefaultPrevented()||!s)return;var r=this.getTipElement(),a=l.getUID(this.constructor.NAME);r.setAttribute("id",a),this.element.setAttribute("aria-describedby",a),this.setContent(),this.config.animation&&e(r).addClass($t);var c="function"==typeof this.config.placement?this.config.placement.call(this,r,this.element):this.config.placement,h=this._getAttachment(c);this.addAttachmentClass(h);var u=this._getContainer();e(r).data(this.constructor.DATA_KEY,this),e.contains(this.element.ownerDocument.documentElement,this.tip)||e(r).appendTo(u),e(this.element).trigger(this.constructor.Event.INSERTED),this._popper=new i(this.element,r,this._getPopperConfig(h)),e(r).addClass(Yt),"ontouchstart"in document.documentElement&&e(document.body).children().on("mouseover",null,e.noop);var d=function(){t.config.animation&&t._fixTransition();var i=t._hoverState;t._hoverState=null,e(t.element).trigger(t.constructor.Event.SHOWN),"out"===i&&t._leave(null,t)};if(e(this.tip).hasClass($t)){var f=l.getTransitionDurationFromElement(this.tip);e(this.tip).one(l.TRANSITION_END,d).emulateTransitionEnd(f)}else d()}},n.hide=function(t){function i(){n._hoverState!==Ut&&o.parentNode&&o.parentNode.removeChild(o),n._cleanTipClass(),n.element.removeAttribute("aria-describedby"),e(n.element).trigger(n.constructor.Event.HIDDEN),null!==n._popper&&n._popper.destroy(),t&&t()}var n=this,o=this.getTipElement(),s=e.Event(this.constructor.Event.HIDE);if(e(this.element).trigger(s),!s.isDefaultPrevented()){if(e(o).removeClass(Yt),"ontouchstart"in document.documentElement&&e(document.body).children().off("mouseover",null,e.noop),this._activeTrigger.click=!1,this._activeTrigger[Vt]=!1,this._activeTrigger[Kt]=!1,e(this.tip).hasClass($t)){var r=l.getTransitionDurationFromElement(o);e(o).one(l.TRANSITION_END,i).emulateTransitionEnd(r)}else i();this._hoverState=""}},n.update=function(){null!==this._popper&&this._popper.scheduleUpdate()},n.isWithContent=function(){return Boolean(this.getTitle())},n.addAttachmentClass=function(t){e(this.getTipElement()).addClass(Ft+"-"+t)},n.getTipElement=function(){return this.tip=this.tip||e(this.config.template)[0],this.tip},n.setContent=function(){var t=this.getTipElement();this.setElementContent(e(t.querySelectorAll(".tooltip-inner")),this.getTitle()),e(t).removeClass($t+" "+Yt)},n.setElementContent=function(t,i){"object"!=typeof i||!i.nodeType&&!i.jquery?this.config.html?(this.config.sanitize&&(i=Ot(i,this.config.whiteList,this.config.sanitizeFn)),t.html(i)):t.text(i):this.config.html?e(i).parent().is(t)||t.empty().append(i):t.text(e(i).text())},n.getTitle=function(){var t=this.element.getAttribute("data-original-title");return t||("function"==typeof this.config.title?this.config.title.call(this.element):this.config.title)},n._getPopperConfig=function(t){var e=this;return r({},{placement:t,modifiers:{offset:this._getOffset(),flip:{behavior:this.config.fallbackPlacement},arrow:{element:".arrow"},preventOverflow:{boundariesElement:this.config.boundary}},onCreate:function(t){t.originalPlacement!==t.placement&&e._handlePopperPlacementChange(t)},onUpdate:function(t){return e._handlePopperPlacementChange(t)}},{},this.config.popperConfig)},n._getOffset=function(){var t=this,e={};return"function"==typeof this.config.offset?e.fn=function(e){return e.offsets=r({},e.offsets,{},t.config.offset(e.offsets,t.element)||{}),e}:e.offset=this.config.offset,e},n._getContainer=function(){return!1===this.config.container?document.body:l.isElement(this.config.container)?e(this.config.container):e(document).find(this.config.container)},n._getAttachment=function(t){return Ht[t.toUpperCase()]},n._setListeners=function(){var t=this;this.config.trigger.split(" ").forEach(function(i){if("click"===i)e(t.element).on(t.constructor.Event.CLICK,t.config.selector,function(e){return t.toggle(e)});else if("manual"!==i){var n=i===Kt?t.constructor.Event.MOUSEENTER:t.constructor.Event.FOCUSIN,o=i===Kt?t.constructor.Event.MOUSELEAVE:t.constructor.Event.FOCUSOUT;e(t.element).on(n,t.config.selector,function(e){return t._enter(e)}).on(o,t.config.selector,function(e){return t._leave(e)})}}),this._hideModalHandler=function(){t.element&&t.hide()},e(this.element).closest(".modal").on("hide.bs.modal",this._hideModalHandler),this.config.selector?this.config=r({},this.config,{trigger:"manual",selector:""}):this._fixTitle()},n._fixTitle=function(){var t=typeof this.element.getAttribute("data-original-title");!this.element.getAttribute("title")&&"string"==t||(this.element.setAttribute("data-original-title",this.element.getAttribute("title")||""),this.element.setAttribute("title",""))},n._enter=function(t,i){var n=this.constructor.DATA_KEY;(i=i||e(t.currentTarget).data(n))||(i=new this.constructor(t.currentTarget,this._getDelegateConfig()),e(t.currentTarget).data(n,i)),t&&(i._activeTrigger["focusin"===t.type?Vt:Kt]=!0),e(i.getTipElement()).hasClass(Yt)||i._hoverState===Ut?i._hoverState=Ut:(clearTimeout(i._timeout),i._hoverState=Ut,i.config.delay&&i.config.delay.show?i._timeout=setTimeout(function(){i._hoverState===Ut&&i.show()},i.config.delay.show):i.show())},n._leave=function(t,i){var n=this.constructor.DATA_KEY;(i=i||e(t.currentTarget).data(n))||(i=new this.constructor(t.currentTarget,this._getDelegateConfig()),e(t.currentTarget).data(n,i)),t&&(i._activeTrigger["focusout"===t.type?Vt:Kt]=!1),i._isWithActiveTrigger()||(clearTimeout(i._timeout),i._hoverState="out",i.config.delay&&i.config.delay.hide?i._timeout=setTimeout(function(){"out"===i._hoverState&&i.hide()},i.config.delay.hide):i.hide())},n._isWithActiveTrigger=function(){for(var t in this._activeTrigger)if(this._activeTrigger[t])return!0;return!1},n._getConfig=function(t){var i=e(this.element).data();return Object.keys(i).forEach(function(t){-1!==Bt.indexOf(t)&&delete i[t]}),"number"==typeof(t=r({},this.constructor.Default,{},i,{},"object"==typeof t&&t?t:{})).delay&&(t.delay={show:t.delay,hide:t.delay}),"number"==typeof t.title&&(t.title=t.title.toString()),"number"==typeof t.content&&(t.content=t.content.toString()),l.typeCheckConfig(Pt,t,this.constructor.DefaultType),t.sanitize&&(t.template=Ot(t.template,t.whiteList,t.sanitizeFn)),t},n._getDelegateConfig=function(){var t={};if(this.config)for(var e in this.config)this.constructor.Default[e]!==this.config[e]&&(t[e]=this.config[e]);return t},n._cleanTipClass=function(){var t=e(this.getTipElement()),i=t.attr("class").match(Wt);null!==i&&i.length&&t.removeClass(i.join(""))},n._handlePopperPlacementChange=function(t){var e=t.instance;this.tip=e.popper,this._cleanTipClass(),this.addAttachmentClass(this._getAttachment(t.placement))},n._fixTransition=function(){var t=this.getTipElement(),i=this.config.animation;null===t.getAttribute("x-placement")&&(e(t).removeClass($t),this.config.animation=!1,this.hide(),this.show(),this.config.animation=i)},t._jQueryInterface=function(i){return this.each(function(){var n=e(this).data(Nt),o="object"==typeof i&&i;if((n||!/dispose|hide/.test(i))&&(n||(n=new t(this,o),e(this).data(Nt,n)),"string"==typeof i)){if(void 0===n[i])throw new TypeError('No method named "'+i+'"');n[i]()}})},o(t,null,[{key:"VERSION",get:function(){return"4.4.1"}},{key:"Default",get:function(){return Rt}},{key:"NAME",get:function(){return Pt}},{key:"DATA_KEY",get:function(){return Nt}},{key:"Event",get:function(){return Qt}},{key:"EVENT_KEY",get:function(){return jt}},{key:"DefaultType",get:function(){return qt}}]),t}();e.fn[Pt]=Gt._jQueryInterface,e.fn[Pt].Constructor=Gt,e.fn[Pt].noConflict=function(){return e.fn[Pt]=Mt,Gt._jQueryInterface};var Xt="popover",Zt="bs.popover",Jt="."+Zt,te=e.fn[Xt],ee="bs-popover",ie=new RegExp("(^|\\s)"+ee+"\\S+","g"),ne=r({},Gt.Default,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'}),oe=r({},Gt.DefaultType,{content:"(string|element|function)"}),se={HIDE:"hide"+Jt,HIDDEN:"hidden"+Jt,SHOW:"show"+Jt,SHOWN:"shown"+Jt,INSERTED:"inserted"+Jt,CLICK:"click"+Jt,FOCUSIN:"focusin"+Jt,FOCUSOUT:"focusout"+Jt,MOUSEENTER:"mouseenter"+Jt,MOUSELEAVE:"mouseleave"+Jt},re=function(t){function i(){return t.apply(this,arguments)||this}!function(t,e){t.prototype=Object.create(e.prototype),(t.prototype.constructor=t).__proto__=e}(i,t);var n=i.prototype;return n.isWithContent=function(){return this.getTitle()||this._getContent()},n.addAttachmentClass=function(t){e(this.getTipElement()).addClass(ee+"-"+t)},n.getTipElement=function(){return this.tip=this.tip||e(this.config.template)[0],this.tip},n.setContent=function(){var t=e(this.getTipElement());this.setElementContent(t.find(".popover-header"),this.getTitle());var i=this._getContent();"function"==typeof i&&(i=i.call(this.element)),this.setElementContent(t.find(".popover-body"),i),t.removeClass("fade show")},n._getContent=function(){return this.element.getAttribute("data-content")||this.config.content},n._cleanTipClass=function(){var t=e(this.getTipElement()),i=t.attr("class").match(ie);null!==i&&0<i.length&&t.removeClass(i.join(""))},i._jQueryInterface=function(t){return this.each(function(){var n=e(this).data(Zt),o="object"==typeof t?t:null;if((n||!/dispose|hide/.test(t))&&(n||(n=new i(this,o),e(this).data(Zt,n)),"string"==typeof t)){if(void 0===n[t])throw new TypeError('No method named "'+t+'"');n[t]()}})},o(i,null,[{key:"VERSION",get:function(){return"4.4.1"}},{key:"Default",get:function(){return ne}},{key:"NAME",get:function(){return Xt}},{key:"DATA_KEY",get:function(){return Zt}},{key:"Event",get:function(){return se}},{key:"EVENT_KEY",get:function(){return Jt}},{key:"DefaultType",get:function(){return oe}}]),i}(Gt);e.fn[Xt]=re._jQueryInterface,e.fn[Xt].Constructor=re,e.fn[Xt].noConflict=function(){return e.fn[Xt]=te,re._jQueryInterface};var ae="scrollspy",le="bs.scrollspy",ce="."+le,he=e.fn[ae],ue={offset:10,method:"auto",target:""},de={offset:"number",method:"string",target:"(string|element)"},fe={ACTIVATE:"activate"+ce,SCROLL:"scroll"+ce,LOAD_DATA_API:"load"+ce+".data-api"},pe="active",me=".nav, .list-group",ge=".nav-link",ve=".list-group-item",ye=".dropdown-item",_e="position",be=function(){function t(t,i){var n=this;this._element=t,this._scrollElement="BODY"===t.tagName?window:t,this._config=this._getConfig(i),this._selector=this._config.target+" "+ge+","+this._config.target+" "+ve+","+this._config.target+" "+ye,this._offsets=[],this._targets=[],this._activeTarget=null,this._scrollHeight=0,e(this._scrollElement).on(fe.SCROLL,function(t){return n._process(t)}),this.refresh(),this._process()}var i=t.prototype;return i.refresh=function(){var t=this,i=this._scrollElement===this._scrollElement.window?"offset":_e,n="auto"===this._config.method?i:this._config.method,o=n===_e?this._getScrollTop():0;this._offsets=[],this._targets=[],this._scrollHeight=this._getScrollHeight(),[].slice.call(document.querySelectorAll(this._selector)).map(function(t){var i,s=l.getSelectorFromElement(t);if(s&&(i=document.querySelector(s)),i){var r=i.getBoundingClientRect();if(r.width||r.height)return[e(i)[n]().top+o,s]}return null}).filter(function(t){return t}).sort(function(t,e){return t[0]-e[0]}).forEach(function(e){t._offsets.push(e[0]),t._targets.push(e[1])})},i.dispose=function(){e.removeData(this._element,le),e(this._scrollElement).off(ce),this._element=null,this._scrollElement=null,this._config=null,this._selector=null,this._offsets=null,this._targets=null,this._activeTarget=null,this._scrollHeight=null},i._getConfig=function(t){if("string"!=typeof(t=r({},ue,{},"object"==typeof t&&t?t:{})).target){var i=e(t.target).attr("id");i||(i=l.getUID(ae),e(t.target).attr("id",i)),t.target="#"+i}return l.typeCheckConfig(ae,t,de),t},i._getScrollTop=function(){return this._scrollElement===window?this._scrollElement.pageYOffset:this._scrollElement.scrollTop},i._getScrollHeight=function(){return this._scrollElement.scrollHeight||Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)},i._getOffsetHeight=function(){return this._scrollElement===window?window.innerHeight:this._scrollElement.getBoundingClientRect().height},i._process=function(){var t=this._getScrollTop()+this._config.offset,e=this._getScrollHeight(),i=this._config.offset+e-this._getOffsetHeight();if(this._scrollHeight!==e&&this.refresh(),i<=t){var n=this._targets[this._targets.length-1];this._activeTarget!==n&&this._activate(n)}else{if(this._activeTarget&&t<this._offsets[0]&&0<this._offsets[0])return this._activeTarget=null,void this._clear();for(var o=this._offsets.length;o--;)this._activeTarget!==this._targets[o]&&t>=this._offsets[o]&&(void 0===this._offsets[o+1]||t<this._offsets[o+1])&&this._activate(this._targets[o])}},i._activate=function(t){this._activeTarget=t,this._clear();var i=this._selector.split(",").map(function(e){return e+'[data-target="'+t+'"],'+e+'[href="'+t+'"]'}),n=e([].slice.call(document.querySelectorAll(i.join(","))));n.hasClass("dropdown-item")?(n.closest(".dropdown").find(".dropdown-toggle").addClass(pe),n.addClass(pe)):(n.addClass(pe),n.parents(me).prev(ge+", "+ve).addClass(pe),n.parents(me).prev(".nav-item").children(ge).addClass(pe)),e(this._scrollElement).trigger(fe.ACTIVATE,{relatedTarget:t})},i._clear=function(){[].slice.call(document.querySelectorAll(this._selector)).filter(function(t){return t.classList.contains(pe)}).forEach(function(t){return t.classList.remove(pe)})},t._jQueryInterface=function(i){return this.each(function(){var n=e(this).data(le);if(n||(n=new t(this,"object"==typeof i&&i),e(this).data(le,n)),"string"==typeof i){if(void 0===n[i])throw new TypeError('No method named "'+i+'"');n[i]()}})},o(t,null,[{key:"VERSION",get:function(){return"4.4.1"}},{key:"Default",get:function(){return ue}}]),t}();e(window).on(fe.LOAD_DATA_API,function(){for(var t=[].slice.call(document.querySelectorAll('[data-spy="scroll"]')),i=t.length;i--;){var n=e(t[i]);be._jQueryInterface.call(n,n.data())}}),e.fn[ae]=be._jQueryInterface,e.fn[ae].Constructor=be,e.fn[ae].noConflict=function(){return e.fn[ae]=he,be._jQueryInterface};var we="bs.tab",Ee="."+we,Se=e.fn.tab,Ce={HIDE:"hide"+Ee,HIDDEN:"hidden"+Ee,SHOW:"show"+Ee,SHOWN:"shown"+Ee,CLICK_DATA_API:"click"+Ee+".data-api"},Ie="active",xe=".active",Te="> li > .active",Ae=function(){function t(t){this._element=t}var i=t.prototype;return i.show=function(){var t=this;if(!(this._element.parentNode&&this._element.parentNode.nodeType===Node.ELEMENT_NODE&&e(this._element).hasClass(Ie)||e(this._element).hasClass("disabled"))){var i,n,o=e(this._element).closest(".nav, .list-group")[0],s=l.getSelectorFromElement(this._element);if(o){var r="UL"===o.nodeName||"OL"===o.nodeName?Te:xe;n=(n=e.makeArray(e(o).find(r)))[n.length-1]}var a=e.Event(Ce.HIDE,{relatedTarget:this._element}),c=e.Event(Ce.SHOW,{relatedTarget:n});if(n&&e(n).trigger(a),e(this._element).trigger(c),!c.isDefaultPrevented()&&!a.isDefaultPrevented()){s&&(i=document.querySelector(s)),this._activate(this._element,o);var h=function(){var i=e.Event(Ce.HIDDEN,{relatedTarget:t._element}),o=e.Event(Ce.SHOWN,{relatedTarget:n});e(n).trigger(i),e(t._element).trigger(o)};i?this._activate(i,i.parentNode,h):h()}}},i.dispose=function(){e.removeData(this._element,we),this._element=null},i._activate=function(t,i,n){function o(){return s._transitionComplete(t,r,n)}var s=this,r=(!i||"UL"!==i.nodeName&&"OL"!==i.nodeName?e(i).children(xe):e(i).find(Te))[0],a=n&&r&&e(r).hasClass("fade");if(r&&a){var c=l.getTransitionDurationFromElement(r);e(r).removeClass("show").one(l.TRANSITION_END,o).emulateTransitionEnd(c)}else o()},i._transitionComplete=function(t,i,n){if(i){e(i).removeClass(Ie);var o=e(i.parentNode).find("> .dropdown-menu .active")[0];o&&e(o).removeClass(Ie),"tab"===i.getAttribute("role")&&i.setAttribute("aria-selected",!1)}if(e(t).addClass(Ie),"tab"===t.getAttribute("role")&&t.setAttribute("aria-selected",!0),l.reflow(t),t.classList.contains("fade")&&t.classList.add("show"),t.parentNode&&e(t.parentNode).hasClass("dropdown-menu")){var s=e(t).closest(".dropdown")[0];if(s){var r=[].slice.call(s.querySelectorAll(".dropdown-toggle"));e(r).addClass(Ie)}t.setAttribute("aria-expanded",!0)}n&&n()},t._jQueryInterface=function(i){return this.each(function(){var n=e(this),o=n.data(we);if(o||(o=new t(this),n.data(we,o)),"string"==typeof i){if(void 0===o[i])throw new TypeError('No method named "'+i+'"');o[i]()}})},o(t,null,[{key:"VERSION",get:function(){return"4.4.1"}}]),t}();e(document).on(Ce.CLICK_DATA_API,'[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',function(t){t.preventDefault(),Ae._jQueryInterface.call(e(this),"show")}),e.fn.tab=Ae._jQueryInterface,e.fn.tab.Constructor=Ae,e.fn.tab.noConflict=function(){return e.fn.tab=Se,Ae._jQueryInterface};var ke="toast",De="bs.toast",ze="."+De,Le=e.fn[ke],Oe={CLICK_DISMISS:"click.dismiss"+ze,HIDE:"hide"+ze,HIDDEN:"hidden"+ze,SHOW:"show"+ze,SHOWN:"shown"+ze},Pe="hide",Ne="show",je="showing",Me={animation:"boolean",autohide:"boolean",delay:"number"},Fe={animation:!0,autohide:!0,delay:500},We=function(){function t(t,e){this._element=t,this._config=this._getConfig(e),this._timeout=null,this._setListeners()}var i=t.prototype;return i.show=function(){var t=this,i=e.Event(Oe.SHOW);if(e(this._element).trigger(i),!i.isDefaultPrevented()){this._config.animation&&this._element.classList.add("fade");var n=function(){t._element.classList.remove(je),t._element.classList.add(Ne),e(t._element).trigger(Oe.SHOWN),t._config.autohide&&(t._timeout=setTimeout(function(){t.hide()},t._config.delay))};if(this._element.classList.remove(Pe),l.reflow(this._element),this._element.classList.add(je),this._config.animation){var o=l.getTransitionDurationFromElement(this._element);e(this._element).one(l.TRANSITION_END,n).emulateTransitionEnd(o)}else n()}},i.hide=function(){if(this._element.classList.contains(Ne)){var t=e.Event(Oe.HIDE);e(this._element).trigger(t),t.isDefaultPrevented()||this._close()}},i.dispose=function(){clearTimeout(this._timeout),this._timeout=null,this._element.classList.contains(Ne)&&this._element.classList.remove(Ne),e(this._element).off(Oe.CLICK_DISMISS),e.removeData(this._element,De),this._element=null,this._config=null},i._getConfig=function(t){return t=r({},Fe,{},e(this._element).data(),{},"object"==typeof t&&t?t:{}),l.typeCheckConfig(ke,t,this.constructor.DefaultType),t},i._setListeners=function(){var t=this;e(this._element).on(Oe.CLICK_DISMISS,'[data-dismiss="toast"]',function(){return t.hide()})},i._close=function(){function t(){i._element.classList.add(Pe),e(i._element).trigger(Oe.HIDDEN)}var i=this;if(this._element.classList.remove(Ne),this._config.animation){var n=l.getTransitionDurationFromElement(this._element);e(this._element).one(l.TRANSITION_END,t).emulateTransitionEnd(n)}else t()},t._jQueryInterface=function(i){return this.each(function(){var n=e(this),o=n.data(De);if(o||(o=new t(this,"object"==typeof i&&i),n.data(De,o)),"string"==typeof i){if(void 0===o[i])throw new TypeError('No method named "'+i+'"');o[i](this)}})},o(t,null,[{key:"VERSION",get:function(){return"4.4.1"}},{key:"DefaultType",get:function(){return Me}},{key:"Default",get:function(){return Fe}}]),t}();e.fn[ke]=We._jQueryInterface,e.fn[ke].Constructor=We,e.fn[ke].noConflict=function(){return e.fn[ke]=Le,We._jQueryInterface},t.Alert=p,t.Button=I,t.Carousel=B,t.Collapse=J,t.Dropdown=pt,t.Modal=kt,t.Popover=re,t.Scrollspy=be,t.Tab=Ae,t.Toast=We,t.Tooltip=Gt,t.Util=l,Object.defineProperty(t,"__esModule",{value:!0})}),function(t){"function"==typeof define&&define.amd?define(["jquery"],function(e){return t(e)}):"object"==typeof module&&"object"==typeof module.exports?exports=t(require("jquery")):t(jQuery)}(function(t){function e(t){var e=7.5625,i=2.75;return t<1/i?e*t*t:t<2/i?e*(t-=1.5/i)*t+.75:t<2.5/i?e*(t-=2.25/i)*t+.9375:e*(t-=2.625/i)*t+.984375}t.easing.jswing=t.easing.swing;var i=Math.pow,n=Math.sqrt,o=Math.sin,s=Math.cos,r=Math.PI,a=1.70158,l=1.525*a,c=2*r/3,h=2*r/4.5;t.extend(t.easing,{def:"easeOutQuad",swing:function(e){return t.easing[t.easing.def](e)},easeInQuad:function(t){return t*t},easeOutQuad:function(t){return 1-(1-t)*(1-t)},easeInOutQuad:function(t){return t<.5?2*t*t:1-i(-2*t+2,2)/2},easeInCubic:function(t){return t*t*t},easeOutCubic:function(t){return 1-i(1-t,3)},easeInOutCubic:function(t){return t<.5?4*t*t*t:1-i(-2*t+2,3)/2},easeInQuart:function(t){return t*t*t*t},easeOutQuart:function(t){return 1-i(1-t,4)},easeInOutQuart:function(t){return t<.5?8*t*t*t*t:1-i(-2*t+2,4)/2},easeInQuint:function(t){return t*t*t*t*t},easeOutQuint:function(t){return 1-i(1-t,5)},easeInOutQuint:function(t){return t<.5?16*t*t*t*t*t:1-i(-2*t+2,5)/2},easeInSine:function(t){return 1-s(t*r/2)},easeOutSine:function(t){return o(t*r/2)},easeInOutSine:function(t){return-(s(r*t)-1)/2},easeInExpo:function(t){return 0===t?0:i(2,10*t-10)},easeOutExpo:function(t){return 1===t?1:1-i(2,-10*t)},easeInOutExpo:function(t){return 0===t?0:1===t?1:t<.5?i(2,20*t-10)/2:(2-i(2,-20*t+10))/2},easeInCirc:function(t){return 1-n(1-i(t,2))},easeOutCirc:function(t){return n(1-i(t-1,2))},easeInOutCirc:function(t){return t<.5?(1-n(1-i(2*t,2)))/2:(n(1-i(-2*t+2,2))+1)/2},easeInElastic:function(t){return 0===t?0:1===t?1:-i(2,10*t-10)*o((10*t-10.75)*c)},easeOutElastic:function(t){return 0===t?0:1===t?1:i(2,-10*t)*o((10*t-.75)*c)+1},easeInOutElastic:function(t){return 0===t?0:1===t?1:t<.5?-i(2,20*t-10)*o((20*t-11.125)*h)/2:i(2,-20*t+10)*o((20*t-11.125)*h)/2+1},easeInBack:function(t){return(a+1)*t*t*t-a*t*t},easeOutBack:function(t){return 1+(a+1)*i(t-1,3)+a*i(t-1,2)},easeInOutBack:function(t){return t<.5?i(2*t,2)*(7.189819*t-l)/2:(i(2*t-2,2)*((l+1)*(2*t-2)+l)+2)/2},easeInBounce:function(t){return 1-e(1-t)},easeOutBounce:e,easeInOutBounce:function(t){return t<.5?(1-e(1-2*t))/2:(1+e(2*t-1))/2}})}),function(t){var e=function(e,i){var n=this;n.n="breakpoints",n.settings={},n.currentBp=null,n.getBreakpoint=function(){var t,e=s(),i=n.settings.breakpoints;return i.forEach(function(i){e>=i.width&&(t=i.name)}),t||(t=i[i.length-1].name),t},n.getBreakpointWidth=function(t){var e;return n.settings.breakpoints.forEach(function(i){t==i.name&&(e=i.width)}),e},n.compareCheck=function(t,e,i){var o=s(),r=n.settings.breakpoints,a=n.getBreakpointWidth(e),l=!1;switch(t){case"lessThan":l=o<a;break;case"lessEqualTo":l=o<=a;break;case"greaterThan":case"greaterEqualTo":l=o>a;break;case"inside":var c=r.findIndex(function(t){return t.name===e});if(c===r.length-1)l=o>a;else{var h=n.getBreakpointWidth(r[c+1].name);l=o>=a&&o<h}}l&&i()},n.destroy=function(){t(window).unbind(n.n)};var o=function(){var e=s(),i=n.settings.breakpoints,o=n.currentBp;i.forEach(function(i){o===i.name?i.inside||(t(window).trigger("inside-"+i.name),i.inside=!0):i.inside=!1,e<i.width&&(i.less||(t(window).trigger("lessThan-"+i.name),i.less=!0,i.greater=!1,i.greaterEqual=!1)),e>=i.width&&(i.greaterEqual||(t(window).trigger("greaterEqualTo-"+i.name),i.greaterEqual=!0,i.less=!1),e>i.width&&(i.greater||(t(window).trigger("greaterThan-"+i.name),i.greater=!0,i.less=!1)))})},s=function(){var e=t(window);return n.outerWidth?e.outerWidth():e.width()},r=t.extend({},t.fn.breakpoints.defaults,i);n.settings={breakpoints:r.breakpoints,buffer:r.buffer,triggerOnInit:r.triggerOnInit,outerWidth:r.outerWidth},e.data(n.n,this),n.currentBp=n.getBreakpoint();var a=null;t.isFunction(t(window).on)&&t(window).on("resize."+n.n,function(e){a&&clearTimeout(a),a=setTimeout(function(e){var i;(i=n.getBreakpoint())!==n.currentBp&&(t(window).trigger({type:"breakpoint-change",from:n.currentBp,to:i}),n.currentBp=i),o()},n.settings.buffer)}),n.settings.triggerOnInit&&setTimeout(function(){t(window).trigger({type:"breakpoint-change",from:n.currentBp,to:n.currentBp,initialInit:!0})},n.settings.buffer),setTimeout(function(){o()},0)};t.fn.breakpoints=function(t,i,n){if(this.data("breakpoints")){var o=this.data("breakpoints");return"getBreakpoint"===t?o.getBreakpoint():"getBreakpointWidth"===t?o.getBreakpointWidth(i):["lessThan","lessEqualTo","greaterThan","greaterEqualTo","inside"].indexOf(t)>=0?o.compareCheck(t,i,n):void("destroy"===t&&o.destroy())}new e(this,t)},t.fn.breakpoints.defaults={breakpoints:[{name:"xs",width:0},{name:"sm",width:768},{name:"md",width:992},{name:"lg",width:1200}],buffer:300,triggerOnInit:!1,outerWidth:!1}}(jQuery),function(t,e){"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function i(i,s,a){(a=a||e||t.jQuery)&&(s.prototype.option||(s.prototype.option=function(t){a.isPlainObject(t)&&(this.options=a.extend(!0,this.options,t))}),a.fn[i]=function(t){return"string"==typeof t?function(t,e,n){var o,s="$()."+i+'("'+e+'")';return t.each(function(t,l){var c=a.data(l,i);if(c){var h=c[e];if(h&&"_"!=e.charAt(0)){var u=h.apply(c,n);o=void 0===o?u:o}else r(s+" is not a valid method")}else r(i+" not initialized. Cannot call methods, i.e. "+s)}),void 0!==o?o:t}(this,t,o.call(arguments,1)):(function(t,e){t.each(function(t,n){var o=a.data(n,i);o?(o.option(e),o._init()):(o=new s(n,e),a.data(n,i,o))})}(this,t),this)},n(a))}function n(t){!t||t&&t.bridget||(t.bridget=i)}var o=Array.prototype.slice,s=t.console,r=void 0===s?function(){}:function(t){s.error(t)};return n(e||t.jQuery),i}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{};return(i[t]=i[t]||{})[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){i=i.slice(0),e=e||[];for(var n=this._onceEvents&&this._onceEvents[t],o=0;o<i.length;o++){var s=i[o];n&&n[s]&&(this.off(t,s),delete n[s]),s.apply(this,e)}return this}},e.allOff=function(){delete this._events,delete this._onceEvents},t}),function(t,e){"function"==typeof define&&define.amd?define("get-size/get-size",e):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function t(t){var e=parseFloat(t);return-1==t.indexOf("%")&&!isNaN(e)&&e}function e(t){var e=getComputedStyle(t);return e||s("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"),e}function i(){if(!l){l=!0;var i=document.createElement("div");i.style.width="200px",i.style.padding="1px 2px 3px 4px",i.style.borderStyle="solid",i.style.borderWidth="1px 2px 3px 4px",i.style.boxSizing="border-box";var s=document.body||document.documentElement;s.appendChild(i);var r=e(i);o=200==Math.round(t(r.width)),n.isBoxSizeOuter=o,s.removeChild(i)}}function n(n){if(i(),"string"==typeof n&&(n=document.querySelector(n)),n&&"object"==typeof n&&n.nodeType){var s=e(n);if("none"==s.display)return function(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;e<a;e++)t[r[e]]=0;return t}();var l={};l.width=n.offsetWidth,l.height=n.offsetHeight;for(var c=l.isBorderBox="border-box"==s.boxSizing,h=0;h<a;h++){var u=r[h],d=s[u],f=parseFloat(d);l[u]=isNaN(f)?0:f}var p=l.paddingLeft+l.paddingRight,m=l.paddingTop+l.paddingBottom,g=l.marginLeft+l.marginRight,v=l.marginTop+l.marginBottom,y=l.borderLeftWidth+l.borderRightWidth,_=l.borderTopWidth+l.borderBottomWidth,b=c&&o,w=t(s.width);!1!==w&&(l.width=w+(b?0:p+y));var E=t(s.height);return!1!==E&&(l.height=E+(b?0:m+_)),l.innerWidth=l.width-(p+y),l.innerHeight=l.height-(m+_),l.outerWidth=l.width+g,l.outerHeight=l.height+v,l}}var o,s="undefined"==typeof console?function(){}:function(t){console.error(t)},r=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],a=r.length,l=!1;return n}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("desandro-matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=window.Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var n=e[i]+"MatchesSelector";if(t[n])return n}}();return function(e,i){return e[t](i)}}),function(t,e){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var i={extend:function(t,e){for(var i in e)t[i]=e[i];return t},modulo:function(t,e){return(t%e+e)%e}},n=Array.prototype.slice;i.makeArray=function(t){return Array.isArray(t)?t:null==t?[]:"object"==typeof t&&"number"==typeof t.length?n.call(t):[t]},i.removeFrom=function(t,e){var i=t.indexOf(e);-1!=i&&t.splice(i,1)},i.getParent=function(t,i){for(;t.parentNode&&t!=document.body;)if(t=t.parentNode,e(t,i))return t},i.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.filterFindElements=function(t,n){t=i.makeArray(t);var o=[];return t.forEach(function(t){if(t instanceof HTMLElement){if(!n)return void o.push(t);e(t,n)&&o.push(t);for(var i=t.querySelectorAll(n),s=0;s<i.length;s++)o.push(i[s])}}),o},i.debounceMethod=function(t,e,i){i=i||100;var n=t.prototype[e],o=e+"Timeout";t.prototype[e]=function(){var t=this[o];clearTimeout(t);var e=arguments,s=this;this[o]=setTimeout(function(){n.apply(s,e),delete s[o]},i)}},i.docReady=function(t){var e=document.readyState;"complete"==e||"interactive"==e?setTimeout(t):document.addEventListener("DOMContentLoaded",t)},i.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var o=t.console;return i.htmlInit=function(e,n){i.docReady(function(){var s=i.toDashed(n),r="data-"+s,a=document.querySelectorAll("["+r+"]"),l=document.querySelectorAll(".js-"+s),c=i.makeArray(a).concat(i.makeArray(l)),h=r+"-options",u=t.jQuery;c.forEach(function(t){var i,s=t.getAttribute(r)||t.getAttribute(h);try{i=s&&JSON.parse(s)}catch(e){return void(o&&o.error("Error parsing "+r+" on "+t.className+": "+e))}var a=new e(t,i);u&&u.data(t,n,a)})})},i}),function(t,e){"function"==typeof define&&define.amd?define("outlayer/item",["ev-emitter/ev-emitter","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("ev-emitter"),require("get-size")):(t.Outlayer={},t.Outlayer.Item=e(t.EvEmitter,t.getSize))}(window,function(t,e){"use strict";function i(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}var n=document.documentElement.style,o="string"==typeof n.transition?"transition":"WebkitTransition",s="string"==typeof n.transform?"transform":"WebkitTransform",r={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[o],a={transform:s,transition:o,transitionDuration:o+"Duration",transitionProperty:o+"Property",transitionDelay:o+"Delay"},l=i.prototype=Object.create(t.prototype);l.constructor=i,l._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},l.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},l.getSize=function(){this.size=e(this.element)},l.css=function(t){var e=this.element.style;for(var i in t){e[a[i]||i]=t[i]}},l.getPosition=function(){var t=getComputedStyle(this.element),e=this.layout._getOption("originLeft"),i=this.layout._getOption("originTop"),n=t[e?"left":"right"],o=t[i?"top":"bottom"],s=parseFloat(n),r=parseFloat(o),a=this.layout.size;-1!=n.indexOf("%")&&(s=s/100*a.width),-1!=o.indexOf("%")&&(r=r/100*a.height),s=isNaN(s)?0:s,r=isNaN(r)?0:r,s-=e?a.paddingLeft:a.paddingRight,r-=i?a.paddingTop:a.paddingBottom,this.position.x=s,this.position.y=r},l.layoutPosition=function(){var t=this.layout.size,e={},i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop"),o=i?"paddingLeft":"paddingRight",s=i?"left":"right",r=i?"right":"left",a=this.position.x+t[o];e[s]=this.getXValue(a),e[r]="";var l=n?"paddingTop":"paddingBottom",c=n?"top":"bottom",h=n?"bottom":"top",u=this.position.y+t[l];e[c]=this.getYValue(u),e[h]="",this.css(e),this.emitEvent("layout",[this])},l.getXValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&!e?t/this.layout.size.width*100+"%":t+"px"},l.getYValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&e?t/this.layout.size.height*100+"%":t+"px"},l._transitionTo=function(t,e){this.getPosition();var i=this.position.x,n=this.position.y,o=t==this.position.x&&e==this.position.y;if(this.setPosition(t,e),!o||this.isTransitioning){var s=t-i,r=e-n,a={};a.transform=this.getTranslate(s,r),this.transition({to:a,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})}else this.layoutPosition()},l.getTranslate=function(t,e){return"translate3d("+(t=this.layout._getOption("originLeft")?t:-t)+"px, "+(e=this.layout._getOption("originTop")?e:-e)+"px, 0)"},l.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},l.moveTo=l._transitionTo,l.setPosition=function(t,e){this.position.x=parseFloat(t),this.position.y=parseFloat(e)},l._nonTransition=function(t){for(var e in this.css(t.to),t.isCleaning&&this._removeStyles(t.to),t.onTransitionEnd)t.onTransitionEnd[e].call(this)},l.transition=function(t){if(parseFloat(this.layout.options.transitionDuration)){var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);this.element.offsetHeight;null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0}else this._nonTransition(t)};var c="opacity,"+function(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}(s);l.enableTransition=function(){if(!this.isTransitioning){var t=this.layout.options.transitionDuration;t="number"==typeof t?t+"ms":t,this.css({transitionProperty:c,transitionDuration:t,transitionDelay:this.staggerDelay||0}),this.element.addEventListener(r,this,!1)}},l.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},l.onotransitionend=function(t){this.ontransitionend(t)};var h={"-webkit-transform":"transform"};l.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,i=h[t.propertyName]||t.propertyName;if(delete e.ingProperties[i],function(t){for(var e in t)return!1;return!0}(e.ingProperties)&&this.disableTransition(),i in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[i]),i in e.onEnd)e.onEnd[i].call(this),delete e.onEnd[i];this.emitEvent("transitionEnd",[this])}},l.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(r,this,!1),this.isTransitioning=!1},l._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var u={transitionProperty:"",transitionDuration:"",transitionDelay:""};return l.removeTransitionStyles=function(){this.css(u)},l.stagger=function(t){t=isNaN(t)?0:t,this.staggerDelay=t+"ms"},l.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},l.remove=function(){return o&&parseFloat(this.layout.options.transitionDuration)?(this.once("transitionEnd",function(){this.removeElem()}),void this.hide()):void this.removeElem()},l.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options,e={};e[this.getHideRevealTransitionEndProperty("visibleStyle")]=this.onRevealTransitionEnd,this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0,onTransitionEnd:e})},l.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},l.getHideRevealTransitionEndProperty=function(t){var e=this.layout.options[t];if(e.opacity)return"opacity";for(var i in e)return i},l.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options,e={};e[this.getHideRevealTransitionEndProperty("hiddenStyle")]=this.onHideTransitionEnd,this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:e})},l.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},l.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},i}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("outlayer/outlayer",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(i,n,o,s){return e(t,i,n,o,s)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):t.Outlayer=e(t,t.EvEmitter,t.getSize,t.fizzyUIUtils,t.Outlayer.Item)}(window,function(t,e,i,n,o){"use strict";function s(t,e){var i=n.getQueryElement(t);if(i){this.element=i,l&&(this.$element=l(this.element)),this.options=n.extend({},this.constructor.defaults),this.option(e);var o=++h;this.element.outlayerGUID=o,u[o]=this,this._create(),this._getOption("initLayout")&&this.layout()}else a&&a.error("Bad element for "+this.constructor.namespace+": "+(i||t))}function r(t){function e(){t.apply(this,arguments)}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e}var a=t.console,l=t.jQuery,c=function(){},h=0,u={};s.namespace="outlayer",s.Item=o,s.defaults={containerStyle:{position:"relative"},initLayout:!0,originLeft:!0,originTop:!0,resize:!0,resizeContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}};var d=s.prototype;n.extend(d,e.prototype),d.option=function(t){n.extend(this.options,t)},d._getOption=function(t){var e=this.constructor.compatOptions[t];return e&&void 0!==this.options[e]?this.options[e]:this.options[t]},s.compatOptions={initLayout:"isInitLayout",horizontal:"isHorizontal",layoutInstant:"isLayoutInstant",originLeft:"isOriginLeft",originTop:"isOriginTop",resize:"isResizeBound",resizeContainer:"isResizingContainer"},d._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),n.extend(this.element.style,this.options.containerStyle),this._getOption("resize")&&this.bindResize()},d.reloadItems=function(){this.items=this._itemize(this.element.children)},d._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,n=[],o=0;o<e.length;o++){var s=new i(e[o],this);n.push(s)}return n},d._filterFindItemElements=function(t){return n.filterFindElements(t,this.options.itemSelector)},d.getItemElements=function(){return this.items.map(function(t){return t.element})},d.layout=function(){this._resetLayout(),this._manageStamps();var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;this.layoutItems(this.items,e),this._isLayoutInited=!0},d._init=d.layout,d._resetLayout=function(){this.getSize()},d.getSize=function(){this.size=i(this.element)},d._getMeasurement=function(t,e){var n,o=this.options[t];o?("string"==typeof o?n=this.element.querySelector(o):o instanceof HTMLElement&&(n=o),this[t]=n?i(n)[e]:o):this[t]=0},d.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},d._getItemsForLayout=function(t){return t.filter(function(t){return!t.isIgnored})},d._layoutItems=function(t,e){if(this._emitCompleteOnItems("layout",t),t&&t.length){var i=[];t.forEach(function(t){var n=this._getItemLayoutPosition(t);n.item=t,n.isInstant=e||t.isLayoutInstant,i.push(n)},this),this._processLayoutQueue(i)}},d._getItemLayoutPosition=function(){return{x:0,y:0}},d._processLayoutQueue=function(t){this.updateStagger(),t.forEach(function(t,e){this._positionItem(t.item,t.x,t.y,t.isInstant,e)},this)},d.updateStagger=function(){var t=this.options.stagger;return null==t?void(this.stagger=0):(this.stagger=function(t){if("number"==typeof t)return t;var e=t.match(/(^\d*\.?\d*)(\w*)/),i=e&&e[1],n=e&&e[2];return i.length?(i=parseFloat(i))*(f[n]||1):0}(t),this.stagger)},d._positionItem=function(t,e,i,n,o){n?t.goTo(e,i):(t.stagger(o*this.stagger),t.moveTo(e,i))},d._postLayout=function(){this.resizeContainer()},d.resizeContainer=function(){if(this._getOption("resizeContainer")){var t=this._getContainerSize();t&&(this._setContainerMeasure(t.width,!0),this._setContainerMeasure(t.height,!1))}},d._getContainerSize=c,d._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},d._emitCompleteOnItems=function(t,e){function i(){o.dispatchEvent(t+"Complete",null,[e])}function n(){++r==s&&i()}var o=this,s=e.length;if(e&&s){var r=0;e.forEach(function(e){e.once(t,n)})}else i()},d.dispatchEvent=function(t,e,i){var n=e?[e].concat(i):i;if(this.emitEvent(t,n),l)if(this.$element=this.$element||l(this.element),e){var o=l.Event(e);o.type=t,this.$element.trigger(o,i)}else this.$element.trigger(t,i)},d.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},d.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},d.stamp=function(t){(t=this._find(t))&&(this.stamps=this.stamps.concat(t),t.forEach(this.ignore,this))},d.unstamp=function(t){(t=this._find(t))&&t.forEach(function(t){n.removeFrom(this.stamps,t),this.unignore(t)},this)},d._find=function(t){if(t)return"string"==typeof t&&(t=this.element.querySelectorAll(t)),n.makeArray(t)},d._manageStamps=function(){this.stamps&&this.stamps.length&&(this._getBoundingRect(),this.stamps.forEach(this._manageStamp,this))},d._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},d._manageStamp=c,d._getElementOffset=function(t){var e=t.getBoundingClientRect(),n=this._boundingRect,o=i(t);return{left:e.left-n.left-o.marginLeft,top:e.top-n.top-o.marginTop,right:n.right-e.right-o.marginRight,bottom:n.bottom-e.bottom-o.marginBottom}},d.handleEvent=n.handleEvent,d.bindResize=function(){t.addEventListener("resize",this),this.isResizeBound=!0},d.unbindResize=function(){t.removeEventListener("resize",this),this.isResizeBound=!1},d.onresize=function(){this.resize()},n.debounceMethod(s,"onresize",100),d.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},d.needsResizeLayout=function(){var t=i(this.element);return this.size&&t&&t.innerWidth!==this.size.innerWidth},d.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},d.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},d.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},d.reveal=function(t){if(this._emitCompleteOnItems("reveal",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.reveal()})}},d.hide=function(t){if(this._emitCompleteOnItems("hide",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.hide()})}},d.revealItemElements=function(t){var e=this.getItems(t);this.reveal(e)},d.hideItemElements=function(t){var e=this.getItems(t);this.hide(e)},d.getItem=function(t){for(var e=0;e<this.items.length;e++){var i=this.items[e];if(i.element==t)return i}},d.getItems=function(t){t=n.makeArray(t);var e=[];return t.forEach(function(t){var i=this.getItem(t);i&&e.push(i)},this),e},d.remove=function(t){var e=this.getItems(t);this._emitCompleteOnItems("remove",e),e&&e.length&&e.forEach(function(t){t.remove(),n.removeFrom(this.items,t)},this)},d.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="",this.items.forEach(function(t){t.destroy()}),this.unbindResize();var e=this.element.outlayerGUID;delete u[e],delete this.element.outlayerGUID,l&&l.removeData(this.element,this.constructor.namespace)},s.data=function(t){var e=(t=n.getQueryElement(t))&&t.outlayerGUID;return e&&u[e]},s.create=function(t,e){var i=r(s);return i.defaults=n.extend({},s.defaults),n.extend(i.defaults,e),i.compatOptions=n.extend({},s.compatOptions),i.namespace=t,i.data=s.data,i.Item=r(o),n.htmlInit(i,t),l&&l.bridget&&l.bridget(t,i),i};var f={ms:1,s:1e3};return s.Item=o,s}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/item",["outlayer/outlayer"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer")):(t.Isotope=t.Isotope||{},t.Isotope.Item=e(t.Outlayer))}(window,function(t){"use strict";function e(){t.Item.apply(this,arguments)}var i=e.prototype=Object.create(t.Item.prototype),n=i._create;i._create=function(){this.id=this.layout.itemGUID++,n.call(this),this.sortData={}},i.updateSortData=function(){if(!this.isIgnored){this.sortData.id=this.id,this.sortData["original-order"]=this.id,this.sortData.random=Math.random();var t=this.layout.options.getSortData,e=this.layout._sorters;for(var i in t){var n=e[i];this.sortData[i]=n(this.element,this)}}};var o=i.destroy;return i.destroy=function(){o.apply(this,arguments),this.css({display:""})},e}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/layout-mode",["get-size/get-size","outlayer/outlayer"],e):"object"==typeof module&&module.exports?module.exports=e(require("get-size"),require("outlayer")):(t.Isotope=t.Isotope||{},t.Isotope.LayoutMode=e(t.getSize,t.Outlayer))}(window,function(t,e){"use strict";function i(t){this.isotope=t,t&&(this.options=t.options[this.namespace],this.element=t.element,this.items=t.filteredItems,this.size=t.size)}var n=i.prototype;return["_resetLayout","_getItemLayoutPosition","_manageStamp","_getContainerSize","_getElementOffset","needsResizeLayout","_getOption"].forEach(function(t){n[t]=function(){return e.prototype[t].apply(this.isotope,arguments)}}),n.needsVerticalResizeLayout=function(){var e=t(this.isotope.element);return this.isotope.size&&e&&e.innerHeight!=this.isotope.size.innerHeight},n._getMeasurement=function(){this.isotope._getMeasurement.apply(this,arguments)},n.getColumnWidth=function(){this.getSegmentSize("column","Width")},n.getRowHeight=function(){this.getSegmentSize("row","Height")},n.getSegmentSize=function(t,e){var i=t+e,n="outer"+e;if(this._getMeasurement(i,n),!this[i]){var o=this.getFirstItemSize();this[i]=o&&o[n]||this.isotope.size["inner"+e]}},n.getFirstItemSize=function(){var e=this.isotope.filteredItems[0];return e&&e.element&&t(e.element)},n.layout=function(){this.isotope.layout.apply(this.isotope,arguments)},n.getSize=function(){this.isotope.getSize(),this.size=this.isotope.size},i.modes={},i.create=function(t,e){function o(){i.apply(this,arguments)}return o.prototype=Object.create(n),o.prototype.constructor=o,e&&(o.options=e),o.prototype.namespace=t,i.modes[t]=o,o},i}),function(t,e){"function"==typeof define&&define.amd?define("masonry-layout/masonry",["outlayer/outlayer","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer"),require("get-size")):t.Masonry=e(t.Outlayer,t.getSize)}(window,function(t,e){var i=t.create("masonry");i.compatOptions.fitWidth="isFitWidth";var n=i.prototype;return n._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns(),this.colYs=[];for(var t=0;t<this.cols;t++)this.colYs.push(0);this.maxY=0,this.horizontalColIndex=0},n.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}var n=this.columnWidth+=this.gutter,o=this.containerWidth+this.gutter,s=o/n,r=n-o%n;s=Math[r&&r<1?"round":"floor"](s),this.cols=Math.max(s,1)},n.getContainerWidth=function(){var t=this._getOption("fitWidth")?this.element.parentNode:this.element,i=e(t);this.containerWidth=i&&i.innerWidth},n._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,i=Math[e&&e<1?"round":"ceil"](t.size.outerWidth/this.columnWidth);i=Math.min(i,this.cols);for(var n=this[this.options.horizontalOrder?"_getHorizontalColPosition":"_getTopColPosition"](i,t),o={x:this.columnWidth*n.col,y:n.y},s=n.y+t.size.outerHeight,r=i+n.col,a=n.col;a<r;a++)this.colYs[a]=s;return o},n._getTopColPosition=function(t){var e=this._getTopColGroup(t),i=Math.min.apply(Math,e);return{col:e.indexOf(i),y:i}},n._getTopColGroup=function(t){if(t<2)return this.colYs;for(var e=[],i=this.cols+1-t,n=0;n<i;n++)e[n]=this._getColGroupY(n,t);return e},n._getColGroupY=function(t,e){if(e<2)return this.colYs[t];var i=this.colYs.slice(t,t+e);return Math.max.apply(Math,i)},n._getHorizontalColPosition=function(t,e){var i=this.horizontalColIndex%this.cols;i=t>1&&i+t>this.cols?0:i;var n=e.size.outerWidth&&e.size.outerHeight;return this.horizontalColIndex=n?i+t:this.horizontalColIndex,{col:i,y:this._getColGroupY(i,t)}},n._manageStamp=function(t){var i=e(t),n=this._getElementOffset(t),o=this._getOption("originLeft")?n.left:n.right,s=o+i.outerWidth,r=Math.floor(o/this.columnWidth);r=Math.max(0,r);var a=Math.floor(s/this.columnWidth);a-=s%this.columnWidth?0:1,a=Math.min(this.cols-1,a);for(var l=(this._getOption("originTop")?n.top:n.bottom)+i.outerHeight,c=r;c<=a;c++)this.colYs[c]=Math.max(l,this.colYs[c])},n._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this._getOption("fitWidth")&&(t.width=this._getContainerFitWidth()),t},n._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},n.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!=this.containerWidth},i}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/layout-modes/masonry",["../layout-mode","masonry-layout/masonry"],e):"object"==typeof module&&module.exports?module.exports=e(require("../layout-mode"),require("masonry-layout")):e(t.Isotope.LayoutMode,t.Masonry)}(window,function(t,e){"use strict";var i=t.create("masonry"),n=i.prototype,o={_getElementOffset:!0,layout:!0,_getMeasurement:!0};for(var s in e.prototype)o[s]||(n[s]=e.prototype[s]);var r=n.measureColumns;n.measureColumns=function(){this.items=this.isotope.filteredItems,r.call(this)};var a=n._getOption;return n._getOption=function(t){return"fitWidth"==t?void 0!==this.options.isFitWidth?this.options.isFitWidth:this.options.fitWidth:a.apply(this.isotope,arguments)},i}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/layout-modes/fit-rows",["../layout-mode"],e):"object"==typeof exports?module.exports=e(require("../layout-mode")):e(t.Isotope.LayoutMode)}(window,function(t){"use strict";var e=t.create("fitRows"),i=e.prototype;return i._resetLayout=function(){this.x=0,this.y=0,this.maxY=0,this._getMeasurement("gutter","outerWidth")},i._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth+this.gutter,i=this.isotope.size.innerWidth+this.gutter;0!==this.x&&e+this.x>i&&(this.x=0,this.y=this.maxY);var n={x:this.x,y:this.y};return this.maxY=Math.max(this.maxY,this.y+t.size.outerHeight),this.x+=e,n},i._getContainerSize=function(){return{height:this.maxY}},e}),function(t,e){"function"==typeof define&&define.amd?define("isotope-layout/js/layout-modes/vertical",["../layout-mode"],e):"object"==typeof module&&module.exports?module.exports=e(require("../layout-mode")):e(t.Isotope.LayoutMode)}(window,function(t){"use strict";var e=t.create("vertical",{horizontalAlignment:0}),i=e.prototype;return i._resetLayout=function(){this.y=0},i._getItemLayoutPosition=function(t){t.getSize();var e=(this.isotope.size.innerWidth-t.size.outerWidth)*this.options.horizontalAlignment,i=this.y;return this.y+=t.size.outerHeight,{x:e,y:i}},i._getContainerSize=function(){return{height:this.y}},e}),function(t,e){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size","desandro-matches-selector/matches-selector","fizzy-ui-utils/utils","isotope-layout/js/item","isotope-layout/js/layout-mode","isotope-layout/js/layout-modes/masonry","isotope-layout/js/layout-modes/fit-rows","isotope-layout/js/layout-modes/vertical"],function(i,n,o,s,r,a){return e(t,i,n,o,s,r,a)}):"object"==typeof module&&module.exports?module.exports=e(t,require("outlayer"),require("get-size"),require("desandro-matches-selector"),require("fizzy-ui-utils"),require("isotope-layout/js/item"),require("isotope-layout/js/layout-mode"),require("isotope-layout/js/layout-modes/masonry"),require("isotope-layout/js/layout-modes/fit-rows"),require("isotope-layout/js/layout-modes/vertical")):t.Isotope=e(t,t.Outlayer,t.getSize,t.matchesSelector,t.fizzyUIUtils,t.Isotope.Item,t.Isotope.LayoutMode)}(window,function(t,e,i,n,o,s,r){var a=t.jQuery,l=String.prototype.trim?function(t){return t.trim()}:function(t){return t.replace(/^\s+|\s+$/g,"")},c=e.create("isotope",{layoutMode:"masonry",isJQueryFiltering:!0,sortAscending:!0});c.Item=s,c.LayoutMode=r;var h=c.prototype;h._create=function(){for(var t in this.itemGUID=0,this._sorters={},this._getSorters(),e.prototype._create.call(this),this.modes={},this.filteredItems=this.items,this.sortHistory=["original-order"],r.modes)this._initLayoutMode(t)},h.reloadItems=function(){this.itemGUID=0,e.prototype.reloadItems.call(this)},h._itemize=function(){for(var t=e.prototype._itemize.apply(this,arguments),i=0;i<t.length;i++){t[i].id=this.itemGUID++}return this._updateItemsSortData(t),t},h._initLayoutMode=function(t){var e=r.modes[t],i=this.options[t]||{};this.options[t]=e.options?o.extend(e.options,i):i,this.modes[t]=new e(this)},h.layout=function(){return!this._isLayoutInited&&this._getOption("initLayout")?void this.arrange():void this._layout()},h._layout=function(){var t=this._getIsInstant();this._resetLayout(),this._manageStamps(),this.layoutItems(this.filteredItems,t),this._isLayoutInited=!0},h.arrange=function(t){this.option(t),this._getIsInstant();var e=this._filter(this.items);this.filteredItems=e.matches,this._bindArrangeComplete(),this._isInstant?this._noTransition(this._hideReveal,[e]):this._hideReveal(e),this._sort(),this._layout()},h._init=h.arrange,h._hideReveal=function(t){this.reveal(t.needReveal),this.hide(t.needHide)},h._getIsInstant=function(){var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;return this._isInstant=e,e},h._bindArrangeComplete=function(){function t(){e&&i&&n&&o.dispatchEvent("arrangeComplete",null,[o.filteredItems])}var e,i,n,o=this;this.once("layoutComplete",function(){e=!0,t()}),this.once("hideComplete",function(){i=!0,t()}),this.once("revealComplete",function(){n=!0,t()})},h._filter=function(t){var e=this.options.filter;e=e||"*";for(var i=[],n=[],o=[],s=this._getFilterTest(e),r=0;r<t.length;r++){var a=t[r];if(!a.isIgnored){var l=s(a);l&&i.push(a),l&&a.isHidden?n.push(a):l||a.isHidden||o.push(a)}}return{matches:i,needReveal:n,needHide:o}},h._getFilterTest=function(t){return a&&this.options.isJQueryFiltering?function(e){return a(e.element).is(t)}:"function"==typeof t?function(e){return t(e.element)}:function(e){return n(e.element,t)}},h.updateSortData=function(t){var e;t?(t=o.makeArray(t),e=this.getItems(t)):e=this.items,this._getSorters(),this._updateItemsSortData(e)},h._getSorters=function(){var t=this.options.getSortData;for(var e in t){var i=t[e];this._sorters[e]=u(i)}},h._updateItemsSortData=function(t){for(var e=t&&t.length,i=0;e&&i<e;i++){t[i].updateSortData()}};var u=function(){return function(t){if("string"!=typeof t)return t;var e=l(t).split(" "),i=e[0],n=i.match(/^\[(.+)\]$/),o=function(t,e){return t?function(e){return e.getAttribute(t)}:function(t){var i=t.querySelector(e);return i&&i.textContent}}(n&&n[1],i),s=c.sortDataParsers[e[1]];return s?function(t){return t&&s(o(t))}:function(t){return t&&o(t)}}}();c.sortDataParsers={parseInt:function(t){return parseInt(t,10)},parseFloat:function(t){return parseFloat(t)}},h._sort=function(){if(this.options.sortBy){var t=o.makeArray(this.options.sortBy);this._getIsSameSortBy(t)||(this.sortHistory=t.concat(this.sortHistory));var e=function(t,e){return function(i,n){for(var o=0;o<t.length;o++){var s=t[o],r=i.sortData[s],a=n.sortData[s];if(r>a||r<a)return(r>a?1:-1)*((void 0!==e[s]?e[s]:e)?1:-1)}return 0}}(this.sortHistory,this.options.sortAscending);this.filteredItems.sort(e)}},h._getIsSameSortBy=function(t){for(var e=0;e<t.length;e++)if(t[e]!=this.sortHistory[e])return!1;return!0},h._mode=function(){var t=this.options.layoutMode,e=this.modes[t];if(!e)throw new Error("No layout mode: "+t);return e.options=this.options[t],e},h._resetLayout=function(){e.prototype._resetLayout.call(this),this._mode()._resetLayout()},h._getItemLayoutPosition=function(t){return this._mode()._getItemLayoutPosition(t)},h._manageStamp=function(t){this._mode()._manageStamp(t)},h._getContainerSize=function(){return this._mode()._getContainerSize()},h.needsResizeLayout=function(){return this._mode().needsResizeLayout()},h.appended=function(t){var e=this.addItems(t);if(e.length){var i=this._filterRevealAdded(e);this.filteredItems=this.filteredItems.concat(i)}},h.prepended=function(t){var e=this._itemize(t);if(e.length){this._resetLayout(),this._manageStamps();var i=this._filterRevealAdded(e);this.layoutItems(this.filteredItems),this.filteredItems=i.concat(this.filteredItems),this.items=e.concat(this.items)}},h._filterRevealAdded=function(t){var e=this._filter(t);return this.hide(e.needHide),this.reveal(e.matches),this.layoutItems(e.matches,!0),e.matches},h.insert=function(t){var e=this.addItems(t);if(e.length){var i,n,o=e.length;for(i=0;i<o;i++)n=e[i],this.element.appendChild(n.element);var s=this._filter(e).matches;for(i=0;i<o;i++)e[i].isLayoutInstant=!0;for(this.arrange(),i=0;i<o;i++)delete e[i].isLayoutInstant;this.reveal(s)}};var d=h.remove;return h.remove=function(t){t=o.makeArray(t);var e=this.getItems(t);d.call(this,t);for(var i=e&&e.length,n=0;i&&n<i;n++){var s=e[n];o.removeFrom(this.filteredItems,s)}},h.shuffle=function(){for(var t=0;t<this.items.length;t++){this.items[t].sortData.random=Math.random()}this.options.sortBy="random",this._sort(),this._layout()},h._noTransition=function(t,e){var i=this.options.transitionDuration;this.options.transitionDuration=0;var n=t.apply(this,e);return this.options.transitionDuration=i,n},h.getFilteredItemElements=function(){return this.filteredItems.map(function(t){return t.element})},c}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{};return(i[t]=i[t]||{})[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){i=i.slice(0),e=e||[];for(var n=this._onceEvents&&this._onceEvents[t],o=0;o<i.length;o++){var s=i[o];n&&n[s]&&(this.off(t,s),delete n[s]),s.apply(this,e)}return this}},e.allOff=function(){delete this._events,delete this._onceEvents},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter")):t.imagesLoaded=e(t,t.EvEmitter)}("undefined"!=typeof window?window:this,function(t,e){function i(t,e){for(var i in e)t[i]=e[i];return t}function n(t,e,o){if(!(this instanceof n))return new n(t,e,o);var s=t;return"string"==typeof t&&(s=document.querySelectorAll(t)),s?(this.elements=function(t){return Array.isArray(t)?t:"object"==typeof t&&"number"==typeof t.length?l.call(t):[t]}(s),this.options=i({},this.options),"function"==typeof e?o=e:i(this.options,e),o&&this.on("always",o),this.getImages(),r&&(this.jqDeferred=new r.Deferred),void setTimeout(this.check.bind(this))):void a.error("Bad element for imagesLoaded "+(s||t))}function o(t){this.img=t}function s(t,e){this.url=t,this.element=e,this.img=new Image}var r=t.jQuery,a=t.console,l=Array.prototype.slice;n.prototype=Object.create(e.prototype),n.prototype.options={},n.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},n.prototype.addElementImages=function(t){"IMG"==t.nodeName&&this.addImage(t),!0===this.options.background&&this.addElementBackgroundImages(t);var e=t.nodeType;if(e&&c[e]){for(var i=t.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var s=t.querySelectorAll(this.options.background);for(n=0;n<s.length;n++){var r=s[n];this.addElementBackgroundImages(r)}}}};var c={1:!0,9:!0,11:!0};return n.prototype.addElementBackgroundImages=function(t){var e=getComputedStyle(t);if(e)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(e.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,t),n=i.exec(e.backgroundImage)}},n.prototype.addImage=function(t){var e=new o(t);this.images.push(e)},n.prototype.addBackground=function(t,e){var i=new s(t,e);this.images.push(i)},n.prototype.check=function(){function t(t,i,n){setTimeout(function(){e.progress(t,i,n)})}var e=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(e){e.once("progress",t),e.check()}):void this.complete()},n.prototype.progress=function(t,e,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded,this.emitEvent("progress",[this,t,e]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,t),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+i,t,e)},n.prototype.complete=function(){var t=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(t,[this]),this.emitEvent("always",[this]),this.jqDeferred){var e=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[e](this)}},o.prototype=Object.create(e.prototype),o.prototype.check=function(){return this.getIsImageComplete()?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},o.prototype.getIsImageComplete=function(){return this.img.complete&&this.img.naturalWidth},o.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.img,e])},o.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},o.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},o.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},o.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype=Object.create(o.prototype),s.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url,this.getIsImageComplete()&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},s.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.element,e])},n.makeJQueryPlugin=function(e){(e=e||t.jQuery)&&((r=e).fn.imagesLoaded=function(t,e){return new n(this,t,e).jqDeferred.promise(r(this))})},n.makeJQueryPlugin(),n}),function(t,e){"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";var i=Array.prototype.slice,n=t.console,o=void 0===n?function(){}:function(t){n.error(t)};function s(n,s,a){(a=a||e||t.jQuery)&&(s.prototype.option||(s.prototype.option=function(t){a.isPlainObject(t)&&(this.options=a.extend(!0,this.options,t))}),a.fn[n]=function(t){return"string"==typeof t?function(t,e,i){var s,r="$()."+n+'("'+e+'")';return t.each(function(t,l){var c=a.data(l,n);if(c){var h=c[e];if(h&&"_"!=e.charAt(0)){var u=h.apply(c,i);s=void 0===s?u:s}else o(r+" is not a valid method")}else o(n+" not initialized. Cannot call methods, i.e. "+r)}),void 0!==s?s:t}(this,t,i.call(arguments,1)):(function(t,e){t.each(function(t,i){var o=a.data(i,n);o?(o.option(e),o._init()):(o=new s(i,e),a.data(i,n,o))})}(this,t),this)},r(a))}function r(t){!t||t&&t.bridget||(t.bridget=s)}return r(e||t.jQuery),s}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{};return(i[t]=i[t]||{})[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){i=i.slice(0),e=e||[];for(var n=this._onceEvents&&this._onceEvents[t],o=0;o<i.length;o++){var s=i[o];n&&n[s]&&(this.off(t,s),delete n[s]),s.apply(this,e)}return this}},e.allOff=function(){delete this._events,delete this._onceEvents},t}),function(t,e){"function"==typeof define&&define.amd?define("get-size/get-size",e):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function t(t){var e=parseFloat(t);return-1==t.indexOf("%")&&!isNaN(e)&&e}var e="undefined"==typeof console?function(){}:function(t){console.error(t)},i=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],n=i.length;function o(t){var i=getComputedStyle(t);return i||e("Style returned "+i+". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"),i}var s,r=!1;return function e(a){if(function(){if(!r){r=!0;var i=document.createElement("div");i.style.width="200px",i.style.padding="1px 2px 3px 4px",i.style.borderStyle="solid",i.style.borderWidth="1px 2px 3px 4px",i.style.boxSizing="border-box";var n=document.body||document.documentElement;n.appendChild(i);var a=o(i);s=200==Math.round(t(a.width)),e.isBoxSizeOuter=s,n.removeChild(i)}}(),"string"==typeof a&&(a=document.querySelector(a)),a&&"object"==typeof a&&a.nodeType){var l=o(a);if("none"==l.display)return function(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;e<n;e++)t[i[e]]=0;return t}();var c={};c.width=a.offsetWidth,c.height=a.offsetHeight;for(var h=c.isBorderBox="border-box"==l.boxSizing,u=0;u<n;u++){var d=i[u],f=l[d],p=parseFloat(f);c[d]=isNaN(p)?0:p}var m=c.paddingLeft+c.paddingRight,g=c.paddingTop+c.paddingBottom,v=c.marginLeft+c.marginRight,y=c.marginTop+c.marginBottom,_=c.borderLeftWidth+c.borderRightWidth,b=c.borderTopWidth+c.borderBottomWidth,w=h&&s,E=t(l.width);!1!==E&&(c.width=E+(w?0:m+_));var S=t(l.height);return!1!==S&&(c.height=S+(w?0:g+b)),c.innerWidth=c.width-(m+_),c.innerHeight=c.height-(g+b),c.outerWidth=c.width+v,c.outerHeight=c.height+y,c}}}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("desandro-matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=window.Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var n=e[i]+"MatchesSelector";if(t[n])return n}}();return function(e,i){return e[t](i)}}),function(t,e){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var i={extend:function(t,e){for(var i in e)t[i]=e[i];return t},modulo:function(t,e){return(t%e+e)%e}},n=Array.prototype.slice;i.makeArray=function(t){return Array.isArray(t)?t:null==t?[]:"object"==typeof t&&"number"==typeof t.length?n.call(t):[t]},i.removeFrom=function(t,e){var i=t.indexOf(e);-1!=i&&t.splice(i,1)},i.getParent=function(t,i){for(;t.parentNode&&t!=document.body;)if(t=t.parentNode,e(t,i))return t},i.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.filterFindElements=function(t,n){t=i.makeArray(t);var o=[];return t.forEach(function(t){if(t instanceof HTMLElement)if(n){e(t,n)&&o.push(t);for(var i=t.querySelectorAll(n),s=0;s<i.length;s++)o.push(i[s])}else o.push(t)}),o},i.debounceMethod=function(t,e,i){i=i||100;var n=t.prototype[e],o=e+"Timeout";t.prototype[e]=function(){var t=this[o];clearTimeout(t);var e=arguments,s=this;this[o]=setTimeout(function(){n.apply(s,e),delete s[o]},i)}},i.docReady=function(t){var e=document.readyState;"complete"==e||"interactive"==e?setTimeout(t):document.addEventListener("DOMContentLoaded",t)},i.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var o=t.console;return i.htmlInit=function(e,n){i.docReady(function(){var s=i.toDashed(n),r="data-"+s,a=document.querySelectorAll("["+r+"]"),l=document.querySelectorAll(".js-"+s),c=i.makeArray(a).concat(i.makeArray(l)),h=r+"-options",u=t.jQuery;c.forEach(function(t){var i,s=t.getAttribute(r)||t.getAttribute(h);try{i=s&&JSON.parse(s)}catch(i){return void(o&&o.error("Error parsing "+r+" on "+t.className+": "+i))}var a=new e(t,i);u&&u.data(t,n,a)})})},i}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/cell",["get-size/get-size"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("get-size")):(t.Flickity=t.Flickity||{},t.Flickity.Cell=e(t,t.getSize))}(window,function(t,e){function i(t,e){this.element=t,this.parent=e,this.create()}var n=i.prototype;return n.create=function(){this.element.style.position="absolute",this.element.setAttribute("aria-hidden","true"),this.x=0,this.shift=0},n.destroy=function(){this.unselect(),this.element.style.position="";var t=this.parent.originSide;this.element.style[t]=""},n.getSize=function(){this.size=e(this.element)},n.setPosition=function(t){this.x=t,this.updateTarget(),this.renderPosition(t)},n.updateTarget=n.setDefaultTarget=function(){var t="left"==this.parent.originSide?"marginLeft":"marginRight";this.target=this.x+this.size[t]+this.size.width*this.parent.cellAlign},n.renderPosition=function(t){var e=this.parent.originSide;this.element.style[e]=this.parent.getPositionValue(t)},n.select=function(){this.element.classList.add("is-selected"),this.element.removeAttribute("aria-hidden")},n.unselect=function(){this.element.classList.remove("is-selected"),this.element.setAttribute("aria-hidden","true")},n.wrapShift=function(t){this.shift=t,this.renderPosition(this.x+this.parent.slideableWidth*t)},n.remove=function(){this.element.parentNode.removeChild(this.element)},i}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/slide",e):"object"==typeof module&&module.exports?module.exports=e():(t.Flickity=t.Flickity||{},t.Flickity.Slide=e())}(window,function(){"use strict";function t(t){this.parent=t,this.isOriginLeft="left"==t.originSide,this.cells=[],this.outerWidth=0,this.height=0}var e=t.prototype;return e.addCell=function(t){if(this.cells.push(t),this.outerWidth+=t.size.outerWidth,this.height=Math.max(t.size.outerHeight,this.height),1==this.cells.length){this.x=t.x;var e=this.isOriginLeft?"marginLeft":"marginRight";this.firstMargin=t.size[e]}},e.updateTarget=function(){var t=this.isOriginLeft?"marginRight":"marginLeft",e=this.getLastCell(),i=e?e.size[t]:0,n=this.outerWidth-(this.firstMargin+i);this.target=this.x+this.firstMargin+n*this.parent.cellAlign},e.getLastCell=function(){return this.cells[this.cells.length-1]},e.select=function(){this.cells.forEach(function(t){t.select()})},e.unselect=function(){this.cells.forEach(function(t){t.unselect()})},e.getCellElements=function(){return this.cells.map(function(t){return t.element})},t}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/animate",["fizzy-ui-utils/utils"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("fizzy-ui-utils")):(t.Flickity=t.Flickity||{},t.Flickity.animatePrototype=e(t,t.fizzyUIUtils))}(window,function(t,e){return{startAnimation:function(){this.isAnimating||(this.isAnimating=!0,this.restingFrames=0,this.animate())},animate:function(){this.applyDragForce(),this.applySelectedAttraction();var t=this.x;if(this.integratePhysics(),this.positionSlider(),this.settle(t),this.isAnimating){var e=this;requestAnimationFrame(function(){e.animate()})}},positionSlider:function(){var t=this.x;this.options.wrapAround&&1<this.cells.length&&(t=e.modulo(t,this.slideableWidth),t-=this.slideableWidth,this.shiftWrapCells(t)),this.setTranslateX(t,this.isAnimating),this.dispatchScrollEvent()},setTranslateX:function(t,e){t+=this.cursorPosition,t=this.options.rightToLeft?-t:t;var i=this.getPositionValue(t);this.slider.style.transform=e?"translate3d("+i+",0,0)":"translateX("+i+")"},dispatchScrollEvent:function(){var t=this.slides[0];if(t){var e=-this.x-t.target,i=e/this.slidesWidth;this.dispatchEvent("scroll",null,[i,e])}},positionSliderAtSelected:function(){this.cells.length&&(this.x=-this.selectedSlide.target,this.velocity=0,this.positionSlider())},getPositionValue:function(t){return this.options.percentPosition?.01*Math.round(t/this.size.innerWidth*1e4)+"%":Math.round(t)+"px"},settle:function(t){this.isPointerDown||Math.round(100*this.x)!=Math.round(100*t)||this.restingFrames++,2<this.restingFrames&&(this.isAnimating=!1,delete this.isFreeScrolling,this.positionSlider(),this.dispatchEvent("settle",null,[this.selectedIndex]))},shiftWrapCells:function(t){var e=this.cursorPosition+t;this._shiftCells(this.beforeShiftCells,e,-1);var i=this.size.innerWidth-(t+this.slideableWidth+this.cursorPosition);this._shiftCells(this.afterShiftCells,i,1)},_shiftCells:function(t,e,i){for(var n=0;n<t.length;n++){var o=t[n],s=0<e?i:0;o.wrapShift(s),e-=o.size.outerWidth}},_unshiftCells:function(t){if(t&&t.length)for(var e=0;e<t.length;e++)t[e].wrapShift(0)},integratePhysics:function(){this.x+=this.velocity,this.velocity*=this.getFrictionFactor()},applyForce:function(t){this.velocity+=t},getFrictionFactor:function(){return 1-this.options[this.isFreeScrolling?"freeScrollFriction":"friction"]},getRestingPosition:function(){return this.x+this.velocity/(1-this.getFrictionFactor())},applyDragForce:function(){if(this.isDraggable&&this.isPointerDown){var t=this.dragX-this.x-this.velocity;this.applyForce(t)}},applySelectedAttraction:function(){if((!this.isDraggable||!this.isPointerDown)&&!this.isFreeScrolling&&this.slides.length){var t=(-1*this.selectedSlide.target-this.x)*this.options.selectedAttraction;this.applyForce(t)}}}}),function(t,e){if("function"==typeof define&&define.amd)define("flickity/js/flickity",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./cell","./slide","./animate"],function(i,n,o,s,r,a){return e(t,i,n,o,s,r,a)});else if("object"==typeof module&&module.exports)module.exports=e(t,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./cell"),require("./slide"),require("./animate"));else{var i=t.Flickity;t.Flickity=e(t,t.EvEmitter,t.getSize,t.fizzyUIUtils,i.Cell,i.Slide,i.animatePrototype)}}(window,function(t,e,i,n,o,s,r){var a=t.jQuery,l=t.getComputedStyle,c=t.console;function h(t,e){for(t=n.makeArray(t);t.length;)e.appendChild(t.shift())}var u=0,d={};function f(t,e){var i=n.getQueryElement(t);if(i){if(this.element=i,this.element.flickityGUID){var o=d[this.element.flickityGUID];return o.option(e),o}a&&(this.$element=a(this.element)),this.options=n.extend({},this.constructor.defaults),this.option(e),this._create()}else c&&c.error("Bad element for Flickity: "+(i||t))}f.defaults={accessibility:!0,cellAlign:"center",freeScrollFriction:.075,friction:.28,namespaceJQueryEvents:!0,percentPosition:!0,resize:!0,selectedAttraction:.025,setGallerySize:!0},f.createMethods=[];var p=f.prototype;n.extend(p,e.prototype),p._create=function(){var e=this.guid=++u;for(var i in this.element.flickityGUID=e,(d[e]=this).selectedIndex=0,this.restingFrames=0,this.x=0,this.velocity=0,this.originSide=this.options.rightToLeft?"right":"left",this.viewport=document.createElement("div"),this.viewport.className="flickity-viewport",this._createSlider(),(this.options.resize||this.options.watchCSS)&&t.addEventListener("resize",this),this.options.on){var n=this.options.on[i];this.on(i,n)}f.createMethods.forEach(function(t){this[t]()},this),this.options.watchCSS?this.watchCSS():this.activate()},p.option=function(t){n.extend(this.options,t)},p.activate=function(){this.isActive||(this.isActive=!0,this.element.classList.add("flickity-enabled"),this.options.rightToLeft&&this.element.classList.add("flickity-rtl"),this.getSize(),h(this._filterFindCellElements(this.element.children),this.slider),this.viewport.appendChild(this.slider),this.element.appendChild(this.viewport),this.reloadCells(),this.options.accessibility&&(this.element.tabIndex=0,this.element.addEventListener("keydown",this)),this.emitEvent("activate"),this.selectInitialIndex(),this.isInitActivated=!0,this.dispatchEvent("ready"))},p._createSlider=function(){var t=document.createElement("div");t.className="flickity-slider",t.style[this.originSide]=0,this.slider=t},p._filterFindCellElements=function(t){return n.filterFindElements(t,this.options.cellSelector)},p.reloadCells=function(){this.cells=this._makeCells(this.slider.children),this.positionCells(),this._getWrapShiftCells(),this.setGallerySize()},p._makeCells=function(t){return this._filterFindCellElements(t).map(function(t){return new o(t,this)},this)},p.getLastCell=function(){return this.cells[this.cells.length-1]},p.getLastSlide=function(){return this.slides[this.slides.length-1]},p.positionCells=function(){this._sizeCells(this.cells),this._positionCells(0)},p._positionCells=function(t){t=t||0,this.maxCellHeight=t&&this.maxCellHeight||0;var e=0;if(0<t){var i=this.cells[t-1];e=i.x+i.size.outerWidth}for(var n=this.cells.length,o=t;o<n;o++){var s=this.cells[o];s.setPosition(e),e+=s.size.outerWidth,this.maxCellHeight=Math.max(s.size.outerHeight,this.maxCellHeight)}this.slideableWidth=e,this.updateSlides(),this._containSlides(),this.slidesWidth=n?this.getLastSlide().target-this.slides[0].target:0},p._sizeCells=function(t){t.forEach(function(t){t.getSize()})},p.updateSlides=function(){if(this.slides=[],this.cells.length){var t=new s(this);this.slides.push(t);var e="left"==this.originSide?"marginRight":"marginLeft",i=this._getCanCellFit();this.cells.forEach(function(n,o){if(t.cells.length){var r=t.outerWidth-t.firstMargin+(n.size.outerWidth-n.size[e]);i.call(this,o,r)||(t.updateTarget(),t=new s(this),this.slides.push(t)),t.addCell(n)}else t.addCell(n)},this),t.updateTarget(),this.updateSelectedSlide()}},p._getCanCellFit=function(){var t=this.options.groupCells;if(!t)return function(){return!1};if("number"==typeof t){var e=parseInt(t,10);return function(t){return t%e!=0}}var i="string"==typeof t&&t.match(/^(\d+)%$/),n=i?parseInt(i[1],10)/100:1;return function(t,e){return e<=(this.size.innerWidth+1)*n}},p._init=p.reposition=function(){this.positionCells(),this.positionSliderAtSelected()},p.getSize=function(){this.size=i(this.element),this.setCellAlign(),this.cursorPosition=this.size.innerWidth*this.cellAlign};var m={center:{left:.5,right:.5},left:{left:0,right:1},right:{right:0,left:1}};return p.setCellAlign=function(){var t=m[this.options.cellAlign];this.cellAlign=t?t[this.originSide]:this.options.cellAlign},p.setGallerySize=function(){if(this.options.setGallerySize){var t=this.options.adaptiveHeight&&this.selectedSlide?this.selectedSlide.height:this.maxCellHeight;this.viewport.style.height=t+"px"}},p._getWrapShiftCells=function(){if(this.options.wrapAround){this._unshiftCells(this.beforeShiftCells),this._unshiftCells(this.afterShiftCells);var t=this.cursorPosition,e=this.cells.length-1;this.beforeShiftCells=this._getGapCells(t,e,-1),t=this.size.innerWidth-this.cursorPosition,this.afterShiftCells=this._getGapCells(t,0,1)}},p._getGapCells=function(t,e,i){for(var n=[];0<t;){var o=this.cells[e];if(!o)break;n.push(o),e+=i,t-=o.size.outerWidth}return n},p._containSlides=function(){if(this.options.contain&&!this.options.wrapAround&&this.cells.length){var t=this.options.rightToLeft,e=t?"marginRight":"marginLeft",i=t?"marginLeft":"marginRight",n=this.slideableWidth-this.getLastCell().size[i],o=n<this.size.innerWidth,s=this.cursorPosition+this.cells[0].size[e],r=n-this.size.innerWidth*(1-this.cellAlign);this.slides.forEach(function(t){o?t.target=n*this.cellAlign:(t.target=Math.max(t.target,s),t.target=Math.min(t.target,r))},this)}},p.dispatchEvent=function(t,e,i){var n=e?[e].concat(i):i;if(this.emitEvent(t,n),a&&this.$element){var o=t+=this.options.namespaceJQueryEvents?".flickity":"";if(e){var s=a.Event(e);s.type=t,o=s}this.$element.trigger(o,i)}},p.select=function(t,e,i){if(this.isActive&&(t=parseInt(t,10),this._wrapSelect(t),(this.options.wrapAround||e)&&(t=n.modulo(t,this.slides.length)),this.slides[t])){var o=this.selectedIndex;this.selectedIndex=t,this.updateSelectedSlide(),i?this.positionSliderAtSelected():this.startAnimation(),this.options.adaptiveHeight&&this.setGallerySize(),this.dispatchEvent("select",null,[t]),t!=o&&this.dispatchEvent("change",null,[t]),this.dispatchEvent("cellSelect")}},p._wrapSelect=function(t){var e=this.slides.length;if(!(this.options.wrapAround&&1<e))return t;var i=n.modulo(t,e),o=Math.abs(i-this.selectedIndex),s=Math.abs(i+e-this.selectedIndex),r=Math.abs(i-e-this.selectedIndex);!this.isDragSelect&&s<o?t+=e:!this.isDragSelect&&r<o&&(t-=e),t<0?this.x-=this.slideableWidth:e<=t&&(this.x+=this.slideableWidth)},p.previous=function(t,e){this.select(this.selectedIndex-1,t,e)},p.next=function(t,e){this.select(this.selectedIndex+1,t,e)},p.updateSelectedSlide=function(){var t=this.slides[this.selectedIndex];t&&(this.unselectSelectedSlide(),(this.selectedSlide=t).select(),this.selectedCells=t.cells,this.selectedElements=t.getCellElements(),this.selectedCell=t.cells[0],this.selectedElement=this.selectedElements[0])},p.unselectSelectedSlide=function(){this.selectedSlide&&this.selectedSlide.unselect()},p.selectInitialIndex=function(){var t=this.options.initialIndex;if(this.isInitActivated)this.select(this.selectedIndex,!1,!0);else{if(t&&"string"==typeof t&&this.queryCell(t))return void this.selectCell(t,!1,!0);var e=0;t&&this.slides[t]&&(e=t),this.select(e,!1,!0)}},p.selectCell=function(t,e,i){var n=this.queryCell(t);if(n){var o=this.getCellSlideIndex(n);this.select(o,e,i)}},p.getCellSlideIndex=function(t){for(var e=0;e<this.slides.length;e++)if(-1!=this.slides[e].cells.indexOf(t))return e},p.getCell=function(t){for(var e=0;e<this.cells.length;e++){var i=this.cells[e];if(i.element==t)return i}},p.getCells=function(t){t=n.makeArray(t);var e=[];return t.forEach(function(t){var i=this.getCell(t);i&&e.push(i)},this),e},p.getCellElements=function(){return this.cells.map(function(t){return t.element})},p.getParentCell=function(t){return this.getCell(t)||(t=n.getParent(t,".flickity-slider > *"),this.getCell(t))},p.getAdjacentCellElements=function(t,e){if(!t)return this.selectedSlide.getCellElements();e=void 0===e?this.selectedIndex:e;var i=this.slides.length;if(i<=1+2*t)return this.getCellElements();for(var o=[],s=e-t;s<=e+t;s++){var r=this.options.wrapAround?n.modulo(s,i):s,a=this.slides[r];a&&(o=o.concat(a.getCellElements()))}return o},p.queryCell=function(t){if("number"==typeof t)return this.cells[t];if("string"==typeof t){if(t.match(/^[#\.]?[\d\/]/))return;t=this.element.querySelector(t)}return this.getCell(t)},p.uiChange=function(){this.emitEvent("uiChange")},p.childUIPointerDown=function(t){"touchstart"!=t.type&&t.preventDefault(),this.focus()},p.onresize=function(){this.watchCSS(),this.resize()},n.debounceMethod(f,"onresize",150),p.resize=function(){if(this.isActive){this.getSize(),this.options.wrapAround&&(this.x=n.modulo(this.x,this.slideableWidth)),this.positionCells(),this._getWrapShiftCells(),this.setGallerySize(),this.emitEvent("resize");var t=this.selectedElements&&this.selectedElements[0];this.selectCell(t,!1,!0)}},p.watchCSS=function(){this.options.watchCSS&&(-1!=l(this.element,":after").content.indexOf("flickity")?this.activate():this.deactivate())},p.onkeydown=function(t){var e=document.activeElement&&document.activeElement!=this.element;if(this.options.accessibility&&!e){var i=f.keyboardHandlers[t.keyCode];i&&i.call(this)}},f.keyboardHandlers={37:function(){var t=this.options.rightToLeft?"next":"previous";this.uiChange(),this[t]()},39:function(){var t=this.options.rightToLeft?"previous":"next";this.uiChange(),this[t]()}},p.focus=function(){var e=t.pageYOffset;this.element.focus({preventScroll:!0}),t.pageYOffset!=e&&t.scrollTo(t.pageXOffset,e)},p.deactivate=function(){this.isActive&&(this.element.classList.remove("flickity-enabled"),this.element.classList.remove("flickity-rtl"),this.unselectSelectedSlide(),this.cells.forEach(function(t){t.destroy()}),this.element.removeChild(this.viewport),h(this.slider.children,this.element),this.options.accessibility&&(this.element.removeAttribute("tabIndex"),this.element.removeEventListener("keydown",this)),this.isActive=!1,this.emitEvent("deactivate"))},p.destroy=function(){this.deactivate(),t.removeEventListener("resize",this),this.allOff(),this.emitEvent("destroy"),a&&this.$element&&a.removeData(this.element,"flickity"),delete this.element.flickityGUID,delete d[this.guid]},n.extend(p,r),f.data=function(t){var e=(t=n.getQueryElement(t))&&t.flickityGUID;return e&&d[e]},n.htmlInit(f,"flickity"),a&&a.bridget&&a.bridget("flickity",f),f.setJQuery=function(t){a=t},f.Cell=o,f.Slide=s,f}),function(t,e){"function"==typeof define&&define.amd?define("unipointer/unipointer",["ev-emitter/ev-emitter"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter")):t.Unipointer=e(t,t.EvEmitter)}(window,function(t,e){function i(){}var n=i.prototype=Object.create(e.prototype);n.bindStartEvent=function(t){this._bindStartEvent(t,!0)},n.unbindStartEvent=function(t){this._bindStartEvent(t,!1)},n._bindStartEvent=function(e,i){var n=(i=void 0===i||i)?"addEventListener":"removeEventListener",o="mousedown";t.PointerEvent?o="pointerdown":"ontouchstart"in t&&(o="touchstart"),e[n](o,this)},n.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},n.getTouch=function(t){for(var e=0;e<t.length;e++){var i=t[e];if(i.identifier==this.pointerIdentifier)return i}},n.onmousedown=function(t){var e=t.button;e&&0!==e&&1!==e||this._pointerDown(t,t)},n.ontouchstart=function(t){this._pointerDown(t,t.changedTouches[0])},n.onpointerdown=function(t){this._pointerDown(t,t)},n._pointerDown=function(t,e){t.button||this.isPointerDown||(this.isPointerDown=!0,this.pointerIdentifier=void 0!==e.pointerId?e.pointerId:e.identifier,this.pointerDown(t,e))},n.pointerDown=function(t,e){this._bindPostStartEvents(t),this.emitEvent("pointerDown",[t,e])};var o={mousedown:["mousemove","mouseup"],touchstart:["touchmove","touchend","touchcancel"],pointerdown:["pointermove","pointerup","pointercancel"]};return n._bindPostStartEvents=function(e){if(e){var i=o[e.type];i.forEach(function(e){t.addEventListener(e,this)},this),this._boundPointerEvents=i}},n._unbindPostStartEvents=function(){this._boundPointerEvents&&(this._boundPointerEvents.forEach(function(e){t.removeEventListener(e,this)},this),delete this._boundPointerEvents)},n.onmousemove=function(t){this._pointerMove(t,t)},n.onpointermove=function(t){t.pointerId==this.pointerIdentifier&&this._pointerMove(t,t)},n.ontouchmove=function(t){var e=this.getTouch(t.changedTouches);e&&this._pointerMove(t,e)},n._pointerMove=function(t,e){this.pointerMove(t,e)},n.pointerMove=function(t,e){this.emitEvent("pointerMove",[t,e])},n.onmouseup=function(t){this._pointerUp(t,t)},n.onpointerup=function(t){t.pointerId==this.pointerIdentifier&&this._pointerUp(t,t)},n.ontouchend=function(t){var e=this.getTouch(t.changedTouches);e&&this._pointerUp(t,e)},n._pointerUp=function(t,e){this._pointerDone(),this.pointerUp(t,e)},n.pointerUp=function(t,e){this.emitEvent("pointerUp",[t,e])},n._pointerDone=function(){this._pointerReset(),this._unbindPostStartEvents(),this.pointerDone()},n._pointerReset=function(){this.isPointerDown=!1,delete this.pointerIdentifier},n.pointerDone=function(){},n.onpointercancel=function(t){t.pointerId==this.pointerIdentifier&&this._pointerCancel(t,t)},n.ontouchcancel=function(t){var e=this.getTouch(t.changedTouches);e&&this._pointerCancel(t,e)},n._pointerCancel=function(t,e){this._pointerDone(),this.pointerCancel(t,e)},n.pointerCancel=function(t,e){this.emitEvent("pointerCancel",[t,e])},i.getPointerPoint=function(t){return{x:t.pageX,y:t.pageY}},i}),function(t,e){"function"==typeof define&&define.amd?define("unidragger/unidragger",["unipointer/unipointer"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("unipointer")):t.Unidragger=e(t,t.Unipointer)}(window,function(t,e){function i(){}var n=i.prototype=Object.create(e.prototype);n.bindHandles=function(){this._bindHandles(!0)},n.unbindHandles=function(){this._bindHandles(!1)},n._bindHandles=function(e){for(var i=(e=void 0===e||e)?"addEventListener":"removeEventListener",n=e?this._touchActionValue:"",o=0;o<this.handles.length;o++){var s=this.handles[o];this._bindStartEvent(s,e),s[i]("click",this),t.PointerEvent&&(s.style.touchAction=n)}},n._touchActionValue="none",n.pointerDown=function(t,e){this.okayPointerDown(t)&&(this.pointerDownPointer=e,t.preventDefault(),this.pointerDownBlur(),this._bindPostStartEvents(t),this.emitEvent("pointerDown",[t,e]))};var o={TEXTAREA:!0,INPUT:!0,SELECT:!0,OPTION:!0},s={radio:!0,checkbox:!0,button:!0,submit:!0,image:!0,file:!0};return n.okayPointerDown=function(t){var e=o[t.target.nodeName],i=s[t.target.type],n=!e||i;return n||this._pointerReset(),n},n.pointerDownBlur=function(){var t=document.activeElement;t&&t.blur&&t!=document.body&&t.blur()},n.pointerMove=function(t,e){var i=this._dragPointerMove(t,e);this.emitEvent("pointerMove",[t,e,i]),this._dragMove(t,e,i)},n._dragPointerMove=function(t,e){var i={x:e.pageX-this.pointerDownPointer.pageX,y:e.pageY-this.pointerDownPointer.pageY};return!this.isDragging&&this.hasDragStarted(i)&&this._dragStart(t,e),i},n.hasDragStarted=function(t){return 3<Math.abs(t.x)||3<Math.abs(t.y)},n.pointerUp=function(t,e){this.emitEvent("pointerUp",[t,e]),this._dragPointerUp(t,e)},n._dragPointerUp=function(t,e){this.isDragging?this._dragEnd(t,e):this._staticClick(t,e)},n._dragStart=function(t,e){this.isDragging=!0,this.isPreventingClicks=!0,this.dragStart(t,e)},n.dragStart=function(t,e){this.emitEvent("dragStart",[t,e])},n._dragMove=function(t,e,i){this.isDragging&&this.dragMove(t,e,i)},n.dragMove=function(t,e,i){t.preventDefault(),this.emitEvent("dragMove",[t,e,i])},n._dragEnd=function(t,e){this.isDragging=!1,setTimeout(function(){delete this.isPreventingClicks}.bind(this)),this.dragEnd(t,e)},n.dragEnd=function(t,e){this.emitEvent("dragEnd",[t,e])},n.onclick=function(t){this.isPreventingClicks&&t.preventDefault()},n._staticClick=function(t,e){this.isIgnoringMouseUp&&"mouseup"==t.type||(this.staticClick(t,e),"mouseup"!=t.type&&(this.isIgnoringMouseUp=!0,setTimeout(function(){delete this.isIgnoringMouseUp}.bind(this),400)))},n.staticClick=function(t,e){this.emitEvent("staticClick",[t,e])},i.getPointerPoint=e.getPointerPoint,i}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/drag",["./flickity","unidragger/unidragger","fizzy-ui-utils/utils"],function(i,n,o){return e(t,i,n,o)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./flickity"),require("unidragger"),require("fizzy-ui-utils")):t.Flickity=e(t,t.Flickity,t.Unidragger,t.fizzyUIUtils)}(window,function(t,e,i,n){n.extend(e.defaults,{draggable:">1",dragThreshold:3}),e.createMethods.push("_createDrag");var o=e.prototype;n.extend(o,i.prototype),o._touchActionValue="pan-y";var s="createTouch"in document,r=!1;o._createDrag=function(){this.on("activate",this.onActivateDrag),this.on("uiChange",this._uiChangeDrag),this.on("deactivate",this.onDeactivateDrag),this.on("cellChange",this.updateDraggable),s&&!r&&(t.addEventListener("touchmove",function(){}),r=!0)},o.onActivateDrag=function(){this.handles=[this.viewport],this.bindHandles(),this.updateDraggable()},o.onDeactivateDrag=function(){this.unbindHandles(),this.element.classList.remove("is-draggable")},o.updateDraggable=function(){">1"==this.options.draggable?this.isDraggable=1<this.slides.length:this.isDraggable=this.options.draggable,this.isDraggable?this.element.classList.add("is-draggable"):this.element.classList.remove("is-draggable")},o.bindDrag=function(){this.options.draggable=!0,this.updateDraggable()},o.unbindDrag=function(){this.options.draggable=!1,this.updateDraggable()},o._uiChangeDrag=function(){delete this.isFreeScrolling},o.pointerDown=function(e,i){this.isDraggable?this.okayPointerDown(e)&&(this._pointerDownPreventDefault(e),this.pointerDownFocus(e),document.activeElement!=this.element&&this.pointerDownBlur(),this.dragX=this.x,this.viewport.classList.add("is-pointer-down"),this.pointerDownScroll=l(),t.addEventListener("scroll",this),this._pointerDownDefault(e,i)):this._pointerDownDefault(e,i)},o._pointerDownDefault=function(t,e){this.pointerDownPointer={pageX:e.pageX,pageY:e.pageY},this._bindPostStartEvents(t),this.dispatchEvent("pointerDown",t,[e])};var a={INPUT:!0,TEXTAREA:!0,SELECT:!0};function l(){return{x:t.pageXOffset,y:t.pageYOffset}}return o.pointerDownFocus=function(t){a[t.target.nodeName]||this.focus()},o._pointerDownPreventDefault=function(t){var e="touchstart"==t.type,i="touch"==t.pointerType,n=a[t.target.nodeName];e||i||n||t.preventDefault()},o.hasDragStarted=function(t){return Math.abs(t.x)>this.options.dragThreshold},o.pointerUp=function(t,e){delete this.isTouchScrolling,this.viewport.classList.remove("is-pointer-down"),this.dispatchEvent("pointerUp",t,[e]),this._dragPointerUp(t,e)},o.pointerDone=function(){t.removeEventListener("scroll",this),delete this.pointerDownScroll},o.dragStart=function(e,i){this.isDraggable&&(this.dragStartPosition=this.x,this.startAnimation(),t.removeEventListener("scroll",this),this.dispatchEvent("dragStart",e,[i]))},o.pointerMove=function(t,e){var i=this._dragPointerMove(t,e);this.dispatchEvent("pointerMove",t,[e,i]),this._dragMove(t,e,i)},o.dragMove=function(t,e,i){if(this.isDraggable){t.preventDefault(),this.previousDragX=this.dragX;var n=this.options.rightToLeft?-1:1;this.options.wrapAround&&(i.x=i.x%this.slideableWidth);var o=this.dragStartPosition+i.x*n;if(!this.options.wrapAround&&this.slides.length){var s=Math.max(-this.slides[0].target,this.dragStartPosition);o=s<o?.5*(o+s):o;var r=Math.min(-this.getLastSlide().target,this.dragStartPosition);o=o<r?.5*(o+r):o}this.dragX=o,this.dragMoveTime=new Date,this.dispatchEvent("dragMove",t,[e,i])}},o.dragEnd=function(t,e){if(this.isDraggable){this.options.freeScroll&&(this.isFreeScrolling=!0);var i=this.dragEndRestingSelect();if(this.options.freeScroll&&!this.options.wrapAround){var n=this.getRestingPosition();this.isFreeScrolling=-n>this.slides[0].target&&-n<this.getLastSlide().target}else this.options.freeScroll||i!=this.selectedIndex||(i+=this.dragEndBoostSelect());delete this.previousDragX,this.isDragSelect=this.options.wrapAround,this.select(i),delete this.isDragSelect,this.dispatchEvent("dragEnd",t,[e])}},o.dragEndRestingSelect=function(){var t=this.getRestingPosition(),e=Math.abs(this.getSlideDistance(-t,this.selectedIndex)),i=this._getClosestResting(t,e,1),n=this._getClosestResting(t,e,-1);return i.distance<n.distance?i.index:n.index},o._getClosestResting=function(t,e,i){for(var n=this.selectedIndex,o=1/0,s=this.options.contain&&!this.options.wrapAround?function(t,e){return t<=e}:function(t,e){return t<e};s(e,o)&&(n+=i,o=e,null!==(e=this.getSlideDistance(-t,n)));)e=Math.abs(e);return{distance:o,index:n-i}},o.getSlideDistance=function(t,e){var i=this.slides.length,o=this.options.wrapAround&&1<i,s=o?n.modulo(e,i):e,r=this.slides[s];if(!r)return null;var a=o?this.slideableWidth*Math.floor(e/i):0;return t-(r.target+a)},o.dragEndBoostSelect=function(){if(void 0===this.previousDragX||!this.dragMoveTime||100<new Date-this.dragMoveTime)return 0;var t=this.getSlideDistance(-this.dragX,this.selectedIndex),e=this.previousDragX-this.dragX;return 0<t&&0<e?1:t<0&&e<0?-1:0},o.staticClick=function(t,e){var i=this.getParentCell(t.target),n=i&&i.element,o=i&&this.cells.indexOf(i);this.dispatchEvent("staticClick",t,[e,n,o])},o.onscroll=function(){var t=l(),e=this.pointerDownScroll.x-t.x,i=this.pointerDownScroll.y-t.y;(3<Math.abs(e)||3<Math.abs(i))&&this._pointerDone()},e}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/prev-next-button",["./flickity","unipointer/unipointer","fizzy-ui-utils/utils"],function(i,n,o){return e(t,i,n,o)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./flickity"),require("unipointer"),require("fizzy-ui-utils")):e(t,t.Flickity,t.Unipointer,t.fizzyUIUtils)}(window,function(t,e,i,n){"use strict";var o="http://www.w3.org/2000/svg";function s(t,e){this.direction=t,this.parent=e,this._create()}(s.prototype=Object.create(i.prototype))._create=function(){this.isEnabled=!0,this.isPrevious=-1==this.direction;var t=this.parent.options.rightToLeft?1:-1;this.isLeft=this.direction==t;var e=this.element=document.createElement("button");e.className="flickity-button flickity-prev-next-button",e.className+=this.isPrevious?" previous":" next",e.setAttribute("type","button"),this.disable(),e.setAttribute("aria-label",this.isPrevious?"Previous":"Next");var i=this.createSVG();e.appendChild(i),this.parent.on("select",this.update.bind(this)),this.on("pointerDown",this.parent.childUIPointerDown.bind(this.parent))},s.prototype.activate=function(){this.bindStartEvent(this.element),this.element.addEventListener("click",this),this.parent.element.appendChild(this.element)},s.prototype.deactivate=function(){this.parent.element.removeChild(this.element),this.unbindStartEvent(this.element),this.element.removeEventListener("click",this)},s.prototype.createSVG=function(){var t=document.createElementNS(o,"svg");t.setAttribute("class","flickity-button-icon"),t.setAttribute("viewBox","0 0 100 100");var e=document.createElementNS(o,"path"),i=function(t){return"string"!=typeof t?"M "+t.x0+",50 L "+t.x1+","+(t.y1+50)+" L "+t.x2+","+(t.y2+50)+" L "+t.x3+",50  L "+t.x2+","+(50-t.y2)+" L "+t.x1+","+(50-t.y1)+" Z":t}(this.parent.options.arrowShape);return e.setAttribute("d",i),e.setAttribute("class","arrow"),this.isLeft||e.setAttribute("transform","translate(100, 100) rotate(180) "),t.appendChild(e),t},s.prototype.handleEvent=n.handleEvent,s.prototype.onclick=function(){if(this.isEnabled){this.parent.uiChange();var t=this.isPrevious?"previous":"next";this.parent[t]()}},s.prototype.enable=function(){this.isEnabled||(this.element.disabled=!1,this.isEnabled=!0)},s.prototype.disable=function(){this.isEnabled&&(this.element.disabled=!0,this.isEnabled=!1)},s.prototype.update=function(){var t=this.parent.slides;if(this.parent.options.wrapAround&&1<t.length)this.enable();else{var e=t.length?t.length-1:0,i=this.isPrevious?0:e;this[this.parent.selectedIndex==i?"disable":"enable"]()}},s.prototype.destroy=function(){this.deactivate(),this.allOff()},n.extend(e.defaults,{prevNextButtons:!0,arrowShape:{x0:10,x1:60,y1:50,x2:70,y2:40,x3:30}}),e.createMethods.push("_createPrevNextButtons");var r=e.prototype;return r._createPrevNextButtons=function(){this.options.prevNextButtons&&(this.prevButton=new s(-1,this),this.nextButton=new s(1,this),this.on("activate",this.activatePrevNextButtons))},r.activatePrevNextButtons=function(){this.prevButton.activate(),this.nextButton.activate(),this.on("deactivate",this.deactivatePrevNextButtons)},r.deactivatePrevNextButtons=function(){this.prevButton.deactivate(),this.nextButton.deactivate(),this.off("deactivate",this.deactivatePrevNextButtons)},e.PrevNextButton=s,e}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/page-dots",["./flickity","unipointer/unipointer","fizzy-ui-utils/utils"],function(i,n,o){return e(t,i,n,o)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./flickity"),require("unipointer"),require("fizzy-ui-utils")):e(t,t.Flickity,t.Unipointer,t.fizzyUIUtils)}(window,function(t,e,i,n){function o(t){this.parent=t,this._create()}(o.prototype=Object.create(i.prototype))._create=function(){this.holder=document.createElement("ol"),this.holder.className="flickity-page-dots",this.dots=[],this.handleClick=this.onClick.bind(this),this.on("pointerDown",this.parent.childUIPointerDown.bind(this.parent))},o.prototype.activate=function(){this.setDots(),this.holder.addEventListener("click",this.handleClick),this.bindStartEvent(this.holder),this.parent.element.appendChild(this.holder)},o.prototype.deactivate=function(){this.holder.removeEventListener("click",this.handleClick),this.unbindStartEvent(this.holder),this.parent.element.removeChild(this.holder)},o.prototype.setDots=function(){var t=this.parent.slides.length-this.dots.length;0<t?this.addDots(t):t<0&&this.removeDots(-t)},o.prototype.addDots=function(t){for(var e=document.createDocumentFragment(),i=[],n=this.dots.length,o=n+t,s=n;s<o;s++){var r=document.createElement("li");r.className="dot",r.setAttribute("aria-label","Page dot "+(s+1)),e.appendChild(r),i.push(r)}this.holder.appendChild(e),this.dots=this.dots.concat(i)},o.prototype.removeDots=function(t){this.dots.splice(this.dots.length-t,t).forEach(function(t){this.holder.removeChild(t)},this)},o.prototype.updateSelected=function(){this.selectedDot&&(this.selectedDot.className="dot",this.selectedDot.removeAttribute("aria-current")),this.dots.length&&(this.selectedDot=this.dots[this.parent.selectedIndex],this.selectedDot.className="dot is-selected",this.selectedDot.setAttribute("aria-current","step"))},o.prototype.onTap=o.prototype.onClick=function(t){var e=t.target;if("LI"==e.nodeName){this.parent.uiChange();var i=this.dots.indexOf(e);this.parent.select(i)}},o.prototype.destroy=function(){this.deactivate(),this.allOff()},e.PageDots=o,n.extend(e.defaults,{pageDots:!0}),e.createMethods.push("_createPageDots");var s=e.prototype;return s._createPageDots=function(){this.options.pageDots&&(this.pageDots=new o(this),this.on("activate",this.activatePageDots),this.on("select",this.updateSelectedPageDots),this.on("cellChange",this.updatePageDots),this.on("resize",this.updatePageDots),this.on("deactivate",this.deactivatePageDots))},s.activatePageDots=function(){this.pageDots.activate()},s.updateSelectedPageDots=function(){this.pageDots.updateSelected()},s.updatePageDots=function(){this.pageDots.setDots()},s.deactivatePageDots=function(){this.pageDots.deactivate()},e.PageDots=o,e}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/player",["ev-emitter/ev-emitter","fizzy-ui-utils/utils","./flickity"],function(t,i,n){return e(t,i,n)}):"object"==typeof module&&module.exports?module.exports=e(require("ev-emitter"),require("fizzy-ui-utils"),require("./flickity")):e(t.EvEmitter,t.fizzyUIUtils,t.Flickity)}(window,function(t,e,i){function n(t){this.parent=t,this.state="stopped",this.onVisibilityChange=this.visibilityChange.bind(this),this.onVisibilityPlay=this.visibilityPlay.bind(this)}(n.prototype=Object.create(t.prototype)).play=function(){"playing"!=this.state&&(document.hidden?document.addEventListener("visibilitychange",this.onVisibilityPlay):(this.state="playing",document.addEventListener("visibilitychange",this.onVisibilityChange),this.tick()))},n.prototype.tick=function(){if("playing"==this.state){var t=this.parent.options.autoPlay;t="number"==typeof t?t:3e3;var e=this;this.clear(),this.timeout=setTimeout(function(){e.parent.next(!0),e.tick()},t)}},n.prototype.stop=function(){this.state="stopped",this.clear(),document.removeEventListener("visibilitychange",this.onVisibilityChange)},n.prototype.clear=function(){clearTimeout(this.timeout)},n.prototype.pause=function(){"playing"==this.state&&(this.state="paused",this.clear())},n.prototype.unpause=function(){"paused"==this.state&&this.play()},n.prototype.visibilityChange=function(){this[document.hidden?"pause":"unpause"]()},n.prototype.visibilityPlay=function(){this.play(),document.removeEventListener("visibilitychange",this.onVisibilityPlay)},e.extend(i.defaults,{pauseAutoPlayOnHover:!0}),i.createMethods.push("_createPlayer");var o=i.prototype;return o._createPlayer=function(){this.player=new n(this),this.on("activate",this.activatePlayer),this.on("uiChange",this.stopPlayer),this.on("pointerDown",this.stopPlayer),this.on("deactivate",this.deactivatePlayer)},o.activatePlayer=function(){this.options.autoPlay&&(this.player.play(),this.element.addEventListener("mouseenter",this))},o.playPlayer=function(){this.player.play()},o.stopPlayer=function(){this.player.stop()},o.pausePlayer=function(){this.player.pause()},o.unpausePlayer=function(){this.player.unpause()},o.deactivatePlayer=function(){this.player.stop(),this.element.removeEventListener("mouseenter",this)},o.onmouseenter=function(){this.options.pauseAutoPlayOnHover&&(this.player.pause(),this.element.addEventListener("mouseleave",this))},o.onmouseleave=function(){this.player.unpause(),this.element.removeEventListener("mouseleave",this)},i.Player=n,i}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/add-remove-cell",["./flickity","fizzy-ui-utils/utils"],function(i,n){return e(t,i,n)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./flickity"),require("fizzy-ui-utils")):e(t,t.Flickity,t.fizzyUIUtils)}(window,function(t,e,i){var n=e.prototype;return n.insert=function(t,e){var i=this._makeCells(t);if(i&&i.length){var n=this.cells.length;e=void 0===e?n:e;var o=function(t){var e=document.createDocumentFragment();return t.forEach(function(t){e.appendChild(t.element)}),e}(i),s=e==n;if(s)this.slider.appendChild(o);else{var r=this.cells[e].element;this.slider.insertBefore(o,r)}if(0===e)this.cells=i.concat(this.cells);else if(s)this.cells=this.cells.concat(i);else{var a=this.cells.splice(e,n-e);this.cells=this.cells.concat(i).concat(a)}this._sizeCells(i),this.cellChange(e,!0)}},n.append=function(t){this.insert(t,this.cells.length)},n.prepend=function(t){this.insert(t,0)},n.remove=function(t){var e=this.getCells(t);if(e&&e.length){var n=this.cells.length-1;e.forEach(function(t){t.remove();var e=this.cells.indexOf(t);n=Math.min(e,n),i.removeFrom(this.cells,t)},this),this.cellChange(n,!0)}},n.cellSizeChange=function(t){var e=this.getCell(t);if(e){e.getSize();var i=this.cells.indexOf(e);this.cellChange(i)}},n.cellChange=function(t,e){var i=this.selectedElement;this._positionCells(t),this._getWrapShiftCells(),this.setGallerySize();var n=this.getCell(i);n&&(this.selectedIndex=this.getCellSlideIndex(n)),this.selectedIndex=Math.min(this.slides.length-1,this.selectedIndex),this.emitEvent("cellChange",[t]),this.select(this.selectedIndex),e&&this.positionSliderAtSelected()},e}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/lazyload",["./flickity","fizzy-ui-utils/utils"],function(i,n){return e(t,i,n)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./flickity"),require("fizzy-ui-utils")):e(t,t.Flickity,t.fizzyUIUtils)}(window,function(t,e,i){"use strict";e.createMethods.push("_createLazyload");var n=e.prototype;function o(t,e){this.img=t,this.flickity=e,this.load()}return n._createLazyload=function(){this.on("select",this.lazyLoad)},n.lazyLoad=function(){var t=this.options.lazyLoad;if(t){var e="number"==typeof t?t:0,n=this.getAdjacentCellElements(e),s=[];n.forEach(function(t){var e=function(t){if("IMG"==t.nodeName){var e=t.getAttribute("data-flickity-lazyload"),n=t.getAttribute("data-flickity-lazyload-src"),o=t.getAttribute("data-flickity-lazyload-srcset");if(e||n||o)return[t]}var s=t.querySelectorAll("img[data-flickity-lazyload], img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]");return i.makeArray(s)}(t);s=s.concat(e)}),s.forEach(function(t){new o(t,this)},this)}},o.prototype.handleEvent=i.handleEvent,o.prototype.load=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this);var t=this.img.getAttribute("data-flickity-lazyload")||this.img.getAttribute("data-flickity-lazyload-src"),e=this.img.getAttribute("data-flickity-lazyload-srcset");this.img.src=t,e&&this.img.setAttribute("srcset",e),this.img.removeAttribute("data-flickity-lazyload"),this.img.removeAttribute("data-flickity-lazyload-src"),this.img.removeAttribute("data-flickity-lazyload-srcset")},o.prototype.onload=function(t){this.complete(t,"flickity-lazyloaded")},o.prototype.onerror=function(t){this.complete(t,"flickity-lazyerror")},o.prototype.complete=function(t,e){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this);var i=this.flickity.getParentCell(this.img),n=i&&i.element;this.flickity.cellSizeChange(n),this.img.classList.add(e),this.flickity.dispatchEvent("lazyLoad",t,n)},e.LazyLoader=o,e}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/index",["./flickity","./drag","./prev-next-button","./page-dots","./player","./add-remove-cell","./lazyload"],e):"object"==typeof module&&module.exports&&(module.exports=e(require("./flickity"),require("./drag"),require("./prev-next-button"),require("./page-dots"),require("./player"),require("./add-remove-cell"),require("./lazyload")))}(window,function(t){return t}),function(t,e){"function"==typeof define&&define.amd?define("flickity-as-nav-for/as-nav-for",["flickity/js/index","fizzy-ui-utils/utils"],e):"object"==typeof module&&module.exports?module.exports=e(require("flickity"),require("fizzy-ui-utils")):t.Flickity=e(t.Flickity,t.fizzyUIUtils)}(window,function(t,e){t.createMethods.push("_createAsNavFor");var i=t.prototype;return i._createAsNavFor=function(){this.on("activate",this.activateAsNavFor),this.on("deactivate",this.deactivateAsNavFor),this.on("destroy",this.destroyAsNavFor);var t=this.options.asNavFor;if(t){var e=this;setTimeout(function(){e.setNavCompanion(t)})}},i.setNavCompanion=function(i){i=e.getQueryElement(i);var n=t.data(i);if(n&&n!=this){this.navCompanion=n;var o=this;this.onNavCompanionSelect=function(){o.navCompanionSelect()},n.on("select",this.onNavCompanionSelect),this.on("staticClick",this.onNavStaticClick),this.navCompanionSelect(!0)}},i.navCompanionSelect=function(t){var e=this.navCompanion&&this.navCompanion.selectedCells;if(e){var i=e[0],n=this.navCompanion.cells.indexOf(i),o=n+e.length-1,s=Math.floor(function(t,e,i){return(e-t)*i+t}(n,o,this.navCompanion.cellAlign));if(this.selectCell(s,!1,t),this.removeNavSelectedElements(),!(s>=this.cells.length)){var r=this.cells.slice(n,1+o);this.navSelectedElements=r.map(function(t){return t.element}),this.changeNavSelectedClass("add")}}},i.changeNavSelectedClass=function(t){this.navSelectedElements.forEach(function(e){e.classList[t]("is-nav-selected")})},i.activateAsNavFor=function(){this.navCompanionSelect(!0)},i.removeNavSelectedElements=function(){this.navSelectedElements&&(this.changeNavSelectedClass("remove"),delete this.navSelectedElements)},i.onNavStaticClick=function(t,e,i,n){"number"==typeof n&&this.navCompanion.selectCell(n)},i.deactivateAsNavFor=function(){this.removeNavSelectedElements()},i.destroyAsNavFor=function(){this.navCompanion&&(this.navCompanion.off("select",this.onNavCompanionSelect),this.off("staticClick",this.onNavStaticClick),delete this.navCompanion)},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("imagesloaded/imagesloaded",["ev-emitter/ev-emitter"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter")):t.imagesLoaded=e(t,t.EvEmitter)}("undefined"!=typeof window?window:this,function(t,e){var i=t.jQuery,n=t.console;function o(t,e){for(var i in e)t[i]=e[i];return t}var s=Array.prototype.slice;function r(t,e,a){if(!(this instanceof r))return new r(t,e,a);var l=t;"string"==typeof t&&(l=document.querySelectorAll(t)),l?(this.elements=function(t){return Array.isArray(t)?t:"object"==typeof t&&"number"==typeof t.length?s.call(t):[t]}(l),this.options=o({},this.options),"function"==typeof e?a=e:o(this.options,e),a&&this.on("always",a),this.getImages(),i&&(this.jqDeferred=new i.Deferred),setTimeout(this.check.bind(this))):n.error("Bad element for imagesLoaded "+(l||t))}(r.prototype=Object.create(e.prototype)).options={},r.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},r.prototype.addElementImages=function(t){"IMG"==t.nodeName&&this.addImage(t),!0===this.options.background&&this.addElementBackgroundImages(t);var e=t.nodeType;if(e&&a[e]){for(var i=t.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var s=t.querySelectorAll(this.options.background);for(n=0;n<s.length;n++){var r=s[n];this.addElementBackgroundImages(r)}}}};var a={1:!0,9:!0,11:!0};function l(t){this.img=t}function c(t,e){this.url=t,this.element=e,this.img=new Image}return r.prototype.addElementBackgroundImages=function(t){var e=getComputedStyle(t);if(e)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(e.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,t),n=i.exec(e.backgroundImage)}},r.prototype.addImage=function(t){var e=new l(t);this.images.push(e)},r.prototype.addBackground=function(t,e){var i=new c(t,e);this.images.push(i)},r.prototype.check=function(){var t=this;function e(e,i,n){setTimeout(function(){t.progress(e,i,n)})}this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?this.images.forEach(function(t){t.once("progress",e),t.check()}):this.complete()},r.prototype.progress=function(t,e,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded,this.emitEvent("progress",[this,t,e]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,t),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&n&&n.log("progress: "+i,t,e)},r.prototype.complete=function(){var t=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(t,[this]),this.emitEvent("always",[this]),this.jqDeferred){var e=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[e](this)}},(l.prototype=Object.create(e.prototype)).check=function(){this.getIsImageComplete()?this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.proxyImage.src=this.img.src)},l.prototype.getIsImageComplete=function(){return this.img.complete&&this.img.naturalWidth},l.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.img,e])},l.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},l.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},l.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},l.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},(c.prototype=Object.create(l.prototype)).check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url,this.getIsImageComplete()&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},c.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},c.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.element,e])},r.makeJQueryPlugin=function(e){(e=e||t.jQuery)&&((i=e).fn.imagesLoaded=function(t,e){return new r(this,t,e).jqDeferred.promise(i(this))})},r.makeJQueryPlugin(),r}),function(t,e){"function"==typeof define&&define.amd?define(["flickity/js/index","imagesloaded/imagesloaded"],function(i,n){return e(t,i,n)}):"object"==typeof module&&module.exports?module.exports=e(t,require("flickity"),require("imagesloaded")):t.Flickity=e(t,t.Flickity,t.imagesLoaded)}(window,function(t,e,i){"use strict";e.createMethods.push("_createImagesLoaded");var n=e.prototype;return n._createImagesLoaded=function(){this.on("activate",this.imagesLoaded)},n.imagesLoaded=function(){if(this.options.imagesLoaded){var t=this;i(this.slider).on("progress",function(e,i){var n=t.getParentCell(i.img);t.cellSizeChange(n&&n.element),t.options.freeScroll||t.positionSliderAtSelected()})}},e}),function(t,e){"function"==typeof define&&define.amd?define(["flickity/js/index","fizzy-ui-utils/utils"],e):"object"==typeof module&&module.exports?module.exports=e(require("flickity"),require("fizzy-ui-utils")):e(t.Flickity,t.fizzyUIUtils)}(this,function(t,e){var i=t.Slide,n=i.prototype.updateTarget;i.prototype.updateTarget=function(){if(n.apply(this,arguments),this.parent.options.fade){var t=this.target-this.x,e=this.cells[0].x;this.cells.forEach(function(i){var n=i.x-e-t;i.renderPosition(n)})}},i.prototype.setOpacity=function(t){this.cells.forEach(function(e){e.element.style.opacity=t})};var o=t.prototype;t.createMethods.push("_createFade"),o._createFade=function(){this.fadeIndex=this.selectedIndex,this.prevSelectedIndex=this.selectedIndex,this.on("select",this.onSelectFade),this.on("dragEnd",this.onDragEndFade),this.on("settle",this.onSettleFade),this.on("activate",this.onActivateFade),this.on("deactivate",this.onDeactivateFade)};var s=o.updateSlides;o.updateSlides=function(){s.apply(this,arguments),this.options.fade&&this.slides.forEach(function(t,e){var i=e==this.selectedIndex?1:0;t.setOpacity(i)},this)},o.onSelectFade=function(){this.fadeIndex=Math.min(this.prevSelectedIndex,this.slides.length-1),this.prevSelectedIndex=this.selectedIndex},o.onSettleFade=function(){delete this.didDragEnd,this.options.fade&&(this.selectedSlide.setOpacity(1),this.slides[this.fadeIndex]&&this.fadeIndex!=this.selectedIndex&&this.slides[this.fadeIndex].setOpacity(0))},o.onDragEndFade=function(){this.didDragEnd=!0},o.onActivateFade=function(){this.options.fade&&this.element.classList.add("is-fade")},o.onDeactivateFade=function(){this.options.fade&&(this.element.classList.remove("is-fade"),this.slides.forEach(function(t){t.setOpacity("")}))};var r=o.positionSlider;o.positionSlider=function(){this.options.fade?(this.fadeSlides(),this.dispatchScrollEvent()):r.apply(this,arguments)};var a=o.positionSliderAtSelected;o.positionSliderAtSelected=function(){this.options.fade&&this.setTranslateX(0),a.apply(this,arguments)},o.fadeSlides=function(){if(!(this.slides.length<2)){var t=this.getFadeIndexes(),e=this.slides[t.a],i=this.slides[t.b],n=this.wrapDifference(e.target,i.target),o=this.wrapDifference(e.target,-this.x);o/=n,e.setOpacity(1-o),i.setOpacity(o);var s=t.a;this.isDragging&&(s=o>.5?t.a:t.b),null!=this.fadeHideIndex&&this.fadeHideIndex!=s&&this.fadeHideIndex!=t.a&&this.fadeHideIndex!=t.b&&this.slides[this.fadeHideIndex].setOpacity(0),this.fadeHideIndex=s}},o.getFadeIndexes=function(){return this.isDragging||this.didDragEnd?this.options.wrapAround?this.getFadeDragWrapIndexes():this.getFadeDragLimitIndexes():{a:this.fadeIndex,b:this.selectedIndex}},o.getFadeDragWrapIndexes=function(){var t=this.slides.map(function(t,e){return this.getSlideDistance(-this.x,e)},this),i=t.map(function(t){return Math.abs(t)}),n=Math.min.apply(Math,i),o=i.indexOf(n),s=t[o],r=this.slides.length,a=s>=0?1:-1;return{a:o,b:e.modulo(o+a,r)}},o.getFadeDragLimitIndexes=function(){for(var t=0,e=0;e<this.slides.length-1;e++){var i=this.slides[e];if(-this.x<i.target)break;t=e}return{a:t,b:t+1}},o.wrapDifference=function(t,e){var i=e-t;if(!this.options.wrapAround)return i;var n=i+this.slideableWidth,o=i-this.slideableWidth;return Math.abs(n)<Math.abs(i)&&(i=n),Math.abs(o)<Math.abs(i)&&(i=o),i};var l=o._getWrapShiftCells;o._getWrapShiftCells=function(){this.options.fade||l.apply(this,arguments)};var c=o.shiftWrapCells;return o.shiftWrapCells=function(){this.options.fade||c.apply(this,arguments)},t}),function(t,e){"function"==typeof define&&define.amd?define(["flickity/js/index","fizzy-ui-utils/utils"],e):"object"==typeof module&&module.exports?module.exports=e(require("flickity"),require("fizzy-ui-utils")):t.Flickity=e(t.Flickity,t.fizzyUIUtils)}(window,function(t,e){"use strict";t.createMethods.push("_createAsNavFor");var i=t.prototype;return i._createAsNavFor=function(){this.on("activate",this.activateAsNavFor),this.on("deactivate",this.deactivateAsNavFor),this.on("destroy",this.destroyAsNavFor);var t=this.options.asNavFor;if(t){var e=this;setTimeout(function(){e.setNavCompanion(t)})}},i.setNavCompanion=function(i){i=e.getQueryElement(i);var n=t.data(i);if(n&&n!=this){this.navCompanion=n;var o=this;this.onNavCompanionSelect=function(){o.navCompanionSelect()},n.on("select",this.onNavCompanionSelect),this.on("staticClick",this.onNavStaticClick),this.navCompanionSelect(!0)}},i.navCompanionSelect=function(t){var e=this.navCompanion&&this.navCompanion.selectedCells;if(e){var i,n=e[0],o=this.navCompanion.cells.indexOf(n),s=o+e.length-1,r=Math.floor((s-(i=o))*this.navCompanion.cellAlign+i);if(this.selectCell(r,!1,t),this.removeNavSelectedElements(),!(r>=this.cells.length)){var a=this.cells.slice(o,s+1);this.navSelectedElements=a.map(function(t){return t.element}),this.changeNavSelectedClass("add")}}},i.changeNavSelectedClass=function(t){this.navSelectedElements.forEach(function(e){e.classList[t]("is-nav-selected")})},i.activateAsNavFor=function(){this.navCompanionSelect(!0)},i.removeNavSelectedElements=function(){this.navSelectedElements&&(this.changeNavSelectedClass("remove"),delete this.navSelectedElements)},i.onNavStaticClick=function(t,e,i,n){"number"==typeof n&&this.navCompanion.selectCell(n)},i.deactivateAsNavFor=function(){this.removeNavSelectedElements()},i.destroyAsNavFor=function(){this.navCompanion&&(this.navCompanion.off("select",this.onNavCompanionSelect),this.off("staticClick",this.onNavStaticClick),delete this.navCompanion)},t}),function(t,e){"function"==typeof define&&define.amd?define(["jquery"],e):e(t.jQuery)}(this,function(t){"use strict";function e(e,o){this.element=e,this.$element=t(this.element),this.options=t.extend({},n,o),this._defaults=n,this._name=i,this.init()}var i="scrolly",n={bgParallax:!1};e.prototype.init=function(){var e=this;this.startPosition=this.$element.position().top,this.offsetTop=this.$element.offset().top,this.height=this.$element.outerHeight(!0),this.velocity=this.$element.attr("data-velocity"),this.bgStart=parseInt(this.$element.attr("data-fit"),10),t(document).scroll(function(){e.didScroll=!0}),setInterval(function(){e.didScroll&&(e.didScroll=!1,e.scrolly())},10)},e.prototype.scrolly=function(){var e=t(window).scrollTop(),i=t(window).height(),n=this.startPosition;this.offsetTop>=e+i?this.$element.addClass("scrolly-invisible"):n=this.$element.hasClass("scrolly-invisible")?this.startPosition+(e+(i-this.offsetTop))*this.velocity:this.startPosition+e*this.velocity,this.bgStart&&(n+=this.bgStart),!0===this.options.bgParallax?this.$element.css({backgroundPositionY:n+"px"}):this.$element.css({top:n})},t.fn[i]=function(n){return this.each(function(){t.data(this,"plugin_"+i)||t.data(this,"plugin_"+i,new e(this,n))})}}),function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof exports?require("jquery"):window.jQuery||window.Zepto)}(function(t){var e,i,n,o,s,r,a="Close",l="BeforeClose",c="MarkupParse",h="Open",u="Change",d="mfp",f="."+d,p="mfp-ready",m="mfp-removing",g="mfp-prevent-close",v=function(){},y=!!window.jQuery,_=t(window),b=function(t,i){e.ev.on(d+t+f,i)},w=function(e,i,n,o){var s=document.createElement("div");return s.className="mfp-"+e,n&&(s.innerHTML=n),o?i&&i.appendChild(s):(s=t(s),i&&s.appendTo(i)),s},E=function(i,n){e.ev.triggerHandler(d+i,n),e.st.callbacks&&(i=i.charAt(0).toLowerCase()+i.slice(1),e.st.callbacks[i]&&e.st.callbacks[i].apply(e,t.isArray(n)?n:[n]))},S=function(i){return i===r&&e.currTemplate.closeBtn||(e.currTemplate.closeBtn=t(e.st.closeMarkup.replace("%title%",e.st.tClose)),r=i),e.currTemplate.closeBtn},C=function(){t.magnificPopup.instance||((e=new v).init(),t.magnificPopup.instance=e)};v.prototype={constructor:v,init:function(){var i=navigator.appVersion;e.isLowIE=e.isIE8=document.all&&!document.addEventListener,e.isAndroid=/android/gi.test(i),e.isIOS=/iphone|ipad|ipod/gi.test(i),e.supportsTransition=function(){var t=document.createElement("p").style,e=["ms","O","Moz","Webkit"];if(void 0!==t.transition)return!0;for(;e.length;)if(e.pop()+"Transition"in t)return!0;return!1}(),e.probablyMobile=e.isAndroid||e.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),n=t(document),e.popupsCache={}},open:function(i){var o;if(!1===i.isObj){e.items=i.items.toArray(),e.index=0;var r,a=i.items;for(o=0;o<a.length;o++)if((r=a[o]).parsed&&(r=r.el[0]),r===i.el[0]){e.index=o;break}}else e.items=t.isArray(i.items)?i.items:[i.items],e.index=i.index||0;if(!e.isOpen){e.types=[],s="",i.mainEl&&i.mainEl.length?e.ev=i.mainEl.eq(0):e.ev=n,i.key?(e.popupsCache[i.key]||(e.popupsCache[i.key]={}),e.currTemplate=e.popupsCache[i.key]):e.currTemplate={},e.st=t.extend(!0,{},t.magnificPopup.defaults,i),e.fixedContentPos="auto"===e.st.fixedContentPos?!e.probablyMobile:e.st.fixedContentPos,e.st.modal&&(e.st.closeOnContentClick=!1,e.st.closeOnBgClick=!1,e.st.showCloseBtn=!1,e.st.enableEscapeKey=!1),e.bgOverlay||(e.bgOverlay=w("bg").on("click"+f,function(){e.close()}),e.wrap=w("wrap").attr("tabindex",-1).on("click"+f,function(t){e._checkIfClose(t.target)&&e.close()}),e.container=w("container",e.wrap)),e.contentContainer=w("content"),e.st.preloader&&(e.preloader=w("preloader",e.container,e.st.tLoading));var l=t.magnificPopup.modules;for(o=0;o<l.length;o++){var u=l[o];u=u.charAt(0).toUpperCase()+u.slice(1),e["init"+u].call(e)}E("BeforeOpen"),e.st.showCloseBtn&&(e.st.closeBtnInside?(b(c,function(t,e,i,n){i.close_replaceWith=S(n.type)}),s+=" mfp-close-btn-in"):e.wrap.append(S())),e.st.alignTop&&(s+=" mfp-align-top"),e.fixedContentPos?e.wrap.css({overflow:e.st.overflowY,overflowX:"hidden",overflowY:e.st.overflowY}):e.wrap.css({top:_.scrollTop(),position:"absolute"}),(!1===e.st.fixedBgPos||"auto"===e.st.fixedBgPos&&!e.fixedContentPos)&&e.bgOverlay.css({height:n.height(),position:"absolute"}),e.st.enableEscapeKey&&n.on("keyup"+f,function(t){27===t.keyCode&&e.close()}),_.on("resize"+f,function(){e.updateSize()}),e.st.closeOnContentClick||(s+=" mfp-auto-cursor"),s&&e.wrap.addClass(s);var d=e.wH=_.height(),m={};if(e.fixedContentPos&&e._hasScrollBar(d)){var g=e._getScrollbarSize();g&&(m.marginRight=g)}e.fixedContentPos&&(e.isIE7?t("body, html").css("overflow","hidden"):m.overflow="hidden");var v=e.st.mainClass;return e.isIE7&&(v+=" mfp-ie7"),v&&e._addClassToMFP(v),e.updateItemHTML(),E("BuildControls"),t("html").css(m),e.bgOverlay.add(e.wrap).prependTo(e.st.prependTo||t(document.body)),e._lastFocusedEl=document.activeElement,setTimeout(function(){e.content?(e._addClassToMFP(p),e._setFocus()):e.bgOverlay.addClass(p),n.on("focusin"+f,e._onFocusIn)},16),e.isOpen=!0,e.updateSize(d),E(h),i}e.updateItemHTML()},close:function(){e.isOpen&&(E(l),e.isOpen=!1,e.st.removalDelay&&!e.isLowIE&&e.supportsTransition?(e._addClassToMFP(m),setTimeout(function(){e._close()},e.st.removalDelay)):e._close())},_close:function(){E(a);var i=m+" "+p+" ";if(e.bgOverlay.detach(),e.wrap.detach(),e.container.empty(),e.st.mainClass&&(i+=e.st.mainClass+" "),e._removeClassFromMFP(i),e.fixedContentPos){var o={marginRight:""};e.isIE7?t("body, html").css("overflow",""):o.overflow="",t("html").css(o)}n.off("keyup.mfp focusin"+f),e.ev.off(f),e.wrap.attr("class","mfp-wrap").removeAttr("style"),e.bgOverlay.attr("class","mfp-bg"),e.container.attr("class","mfp-container"),!e.st.showCloseBtn||e.st.closeBtnInside&&!0!==e.currTemplate[e.currItem.type]||e.currTemplate.closeBtn&&e.currTemplate.closeBtn.detach(),e.st.autoFocusLast&&e._lastFocusedEl&&t(e._lastFocusedEl).focus(),e.currItem=null,e.content=null,e.currTemplate=null,e.prevHeight=0,E("AfterClose")},updateSize:function(t){if(e.isIOS){var i=document.documentElement.clientWidth/window.innerWidth,n=window.innerHeight*i;e.wrap.css("height",n),e.wH=n}else e.wH=t||_.height();e.fixedContentPos||e.wrap.css("height",e.wH),E("Resize")},updateItemHTML:function(){var i=e.items[e.index];e.contentContainer.detach(),e.content&&e.content.detach(),i.parsed||(i=e.parseEl(e.index));var n=i.type;if(E("BeforeChange",[e.currItem?e.currItem.type:"",n]),e.currItem=i,!e.currTemplate[n]){var s=!!e.st[n]&&e.st[n].markup;E("FirstMarkupParse",s),e.currTemplate[n]=!s||t(s)}o&&o!==i.type&&e.container.removeClass("mfp-"+o+"-holder");var r=e["get"+n.charAt(0).toUpperCase()+n.slice(1)](i,e.currTemplate[n]);e.appendContent(r,n),i.preloaded=!0,E(u,i),o=i.type,e.container.prepend(e.contentContainer),E("AfterChange")},appendContent:function(t,i){e.content=t,t?e.st.showCloseBtn&&e.st.closeBtnInside&&!0===e.currTemplate[i]?e.content.find(".mfp-close").length||e.content.append(S()):e.content=t:e.content="",E("BeforeAppend"),e.container.addClass("mfp-"+i+"-holder"),e.contentContainer.append(e.content)},parseEl:function(i){var n,o=e.items[i];if(o.tagName?o={el:t(o)}:(n=o.type,o={data:o,src:o.src}),o.el){for(var s=e.types,r=0;r<s.length;r++)if(o.el.hasClass("mfp-"+s[r])){n=s[r];break}o.src=o.el.attr("data-mfp-src"),o.src||(o.src=o.el.attr("href"))}return o.type=n||e.st.type||"inline",o.index=i,o.parsed=!0,e.items[i]=o,E("ElementParse",o),e.items[i]},addGroup:function(t,i){var n=function(n){n.mfpEl=this,e._openClick(n,t,i)};i||(i={});var o="click.magnificPopup";i.mainEl=t,i.items?(i.isObj=!0,t.off(o).on(o,n)):(i.isObj=!1,i.delegate?t.off(o).on(o,i.delegate,n):(i.items=t,t.off(o).on(o,n)))},_openClick:function(i,n,o){if((void 0!==o.midClick?o.midClick:t.magnificPopup.defaults.midClick)||!(2===i.which||i.ctrlKey||i.metaKey||i.altKey||i.shiftKey)){var s=void 0!==o.disableOn?o.disableOn:t.magnificPopup.defaults.disableOn;if(s)if(t.isFunction(s)){if(!s.call(e))return!0}else if(_.width()<s)return!0;i.type&&(i.preventDefault(),e.isOpen&&i.stopPropagation()),o.el=t(i.mfpEl),o.delegate&&(o.items=n.find(o.delegate)),e.open(o)}},updateStatus:function(t,n){if(e.preloader){i!==t&&e.container.removeClass("mfp-s-"+i),n||"loading"!==t||(n=e.st.tLoading);var o={status:t,text:n};E("UpdateStatus",o),t=o.status,n=o.text,e.preloader.html(n),e.preloader.find("a").on("click",function(t){t.stopImmediatePropagation()}),e.container.addClass("mfp-s-"+t),i=t}},_checkIfClose:function(i){if(!t(i).hasClass(g)){var n=e.st.closeOnContentClick,o=e.st.closeOnBgClick;if(n&&o)return!0;if(!e.content||t(i).hasClass("mfp-close")||e.preloader&&i===e.preloader[0])return!0;if(i===e.content[0]||t.contains(e.content[0],i)){if(n)return!0}else if(o&&t.contains(document,i))return!0;return!1}},_addClassToMFP:function(t){e.bgOverlay.addClass(t),e.wrap.addClass(t)},_removeClassFromMFP:function(t){this.bgOverlay.removeClass(t),e.wrap.removeClass(t)},_hasScrollBar:function(t){return(e.isIE7?n.height():document.body.scrollHeight)>(t||_.height())},_setFocus:function(){(e.st.focus?e.content.find(e.st.focus).eq(0):e.wrap).focus()},_onFocusIn:function(i){return i.target===e.wrap[0]||t.contains(e.wrap[0],i.target)?void 0:(e._setFocus(),!1)},_parseMarkup:function(e,i,n){var o;n.data&&(i=t.extend(n.data,i)),E(c,[e,i,n]),t.each(i,function(i,n){if(void 0===n||!1===n)return!0;if((o=i.split("_")).length>1){var s=e.find(f+"-"+o[0]);if(s.length>0){var r=o[1];"replaceWith"===r?s[0]!==n[0]&&s.replaceWith(n):"img"===r?s.is("img")?s.attr("src",n):s.replaceWith(t("<img>").attr("src",n).attr("class",s.attr("class"))):s.attr(o[1],n)}}else e.find(f+"-"+i).html(n)})},_getScrollbarSize:function(){if(void 0===e.scrollbarSize){var t=document.createElement("div");t.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(t),e.scrollbarSize=t.offsetWidth-t.clientWidth,document.body.removeChild(t)}return e.scrollbarSize}},t.magnificPopup={instance:null,proto:v.prototype,modules:[],open:function(e,i){return C(),(e=e?t.extend(!0,{},e):{}).isObj=!0,e.index=i||0,this.instance.open(e)},close:function(){return t.magnificPopup.instance&&t.magnificPopup.instance.close()},registerModule:function(e,i){i.options&&(t.magnificPopup.defaults[e]=i.options),t.extend(this.proto,i.proto),this.modules.push(e)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&#215;</button>',tClose:"Close (Esc)",tLoading:"Loading...",autoFocusLast:!0}},t.fn.magnificPopup=function(i){C();var n=t(this);if("string"==typeof i)if("open"===i){var o,s=y?n.data("magnificPopup"):n[0].magnificPopup,r=parseInt(arguments[1],10)||0;s.items?o=s.items[r]:(o=n,s.delegate&&(o=o.find(s.delegate)),o=o.eq(r)),e._openClick({mfpEl:o},n,s)}else e.isOpen&&e[i].apply(e,Array.prototype.slice.call(arguments,1));else i=t.extend(!0,{},i),y?n.data("magnificPopup",i):n[0].magnificPopup=i,e.addGroup(n,i);return n};var I,x,T,A="inline",k=function(){T&&(x.after(T.addClass(I)).detach(),T=null)};t.magnificPopup.registerModule(A,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){e.types.push(A),b(a+"."+A,function(){k()})},getInline:function(i,n){if(k(),i.src){var o=e.st.inline,s=t(i.src);if(s.length){var r=s[0].parentNode;r&&r.tagName&&(x||(I=o.hiddenClass,x=w(I),I="mfp-"+I),T=s.after(x).detach().removeClass(I)),e.updateStatus("ready")}else e.updateStatus("error",o.tNotFound),s=t("<div>");return i.inlineElement=s,s}return e.updateStatus("ready"),e._parseMarkup(n,{},i),n}}});var D,z="ajax",L=function(){D&&t(document.body).removeClass(D)},O=function(){L(),e.req&&e.req.abort()};t.magnificPopup.registerModule(z,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){e.types.push(z),D=e.st.ajax.cursor,b(a+"."+z,O),b("BeforeChange."+z,O)},getAjax:function(i){D&&t(document.body).addClass(D),e.updateStatus("loading");var n=t.extend({url:i.src,success:function(n,o,s){var r={data:n,xhr:s};E("ParseAjax",r),e.appendContent(t(r.data),z),i.finished=!0,L(),e._setFocus(),setTimeout(function(){e.wrap.addClass(p)},16),e.updateStatus("ready"),E("AjaxContentAdded")},error:function(){L(),i.finished=i.loadError=!0,e.updateStatus("error",e.st.ajax.tError.replace("%url%",i.src))}},e.st.ajax.settings);return e.req=t.ajax(n),""}}});var P;t.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var i=e.st.image,n=".image";e.types.push("image"),b(h+n,function(){"image"===e.currItem.type&&i.cursor&&t(document.body).addClass(i.cursor)}),b(a+n,function(){i.cursor&&t(document.body).removeClass(i.cursor),_.off("resize"+f)}),b("Resize"+n,e.resizeImage),e.isLowIE&&b("AfterChange",e.resizeImage)},resizeImage:function(){var t=e.currItem;if(t&&t.img&&e.st.image.verticalFit){var i=0;e.isLowIE&&(i=parseInt(t.img.css("padding-top"),10)+parseInt(t.img.css("padding-bottom"),10)),t.img.css("max-height",e.wH-i)}},_onImageHasSize:function(t){t.img&&(t.hasSize=!0,P&&clearInterval(P),t.isCheckingImgSize=!1,E("ImageHasSize",t),t.imgHidden&&(e.content&&e.content.removeClass("mfp-loading"),t.imgHidden=!1))},findImageSize:function(t){var i=0,n=t.img[0],o=function(s){P&&clearInterval(P),P=setInterval(function(){return n.naturalWidth>0?void e._onImageHasSize(t):(i>200&&clearInterval(P),void(3===++i?o(10):40===i?o(50):100===i&&o(500)))},s)};o(1)},getImage:function(i,n){var o=0,s=function(){i&&(i.img[0].complete?(i.img.off(".mfploader"),i===e.currItem&&(e._onImageHasSize(i),e.updateStatus("ready")),i.hasSize=!0,i.loaded=!0,E("ImageLoadComplete")):200>++o?setTimeout(s,100):r())},r=function(){i&&(i.img.off(".mfploader"),i===e.currItem&&(e._onImageHasSize(i),e.updateStatus("error",a.tError.replace("%url%",i.src))),i.hasSize=!0,i.loaded=!0,i.loadError=!0)},a=e.st.image,l=n.find(".mfp-img");if(l.length){var c=document.createElement("img");c.className="mfp-img",i.el&&i.el.find("img").length&&(c.alt=i.el.find("img").attr("alt")),i.img=t(c).on("load.mfploader",s).on("error.mfploader",r),c.src=i.src,l.is("img")&&(i.img=i.img.clone()),(c=i.img[0]).naturalWidth>0?i.hasSize=!0:c.width||(i.hasSize=!1)}return e._parseMarkup(n,{title:function(i){if(i.data&&void 0!==i.data.title)return i.data.title;var n=e.st.image.titleSrc;if(n){if(t.isFunction(n))return n.call(e,i);if(i.el)return i.el.attr(n)||""}return""}(i),img_replaceWith:i.img},i),e.resizeImage(),i.hasSize?(P&&clearInterval(P),i.loadError?(n.addClass("mfp-loading"),e.updateStatus("error",a.tError.replace("%url%",i.src))):(n.removeClass("mfp-loading"),e.updateStatus("ready")),n):(e.updateStatus("loading"),i.loading=!0,i.hasSize||(i.imgHidden=!0,n.addClass("mfp-loading"),e.findImageSize(i)),n)}}});var N;t.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(t){return t.is("img")?t:t.find("img")}},proto:{initZoom:function(){var t,i=e.st.zoom,n=".zoom";if(i.enabled&&e.supportsTransition){var o,s,r=i.duration,c=function(t){var e=t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),n="all "+i.duration/1e3+"s "+i.easing,o={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},s="transition";return o["-webkit-"+s]=o["-moz-"+s]=o["-o-"+s]=o[s]=n,e.css(o),e},h=function(){e.content.css("visibility","visible")};b("BuildControls"+n,function(){if(e._allowZoom()){if(clearTimeout(o),e.content.css("visibility","hidden"),!(t=e._getItemToZoom()))return void h();(s=c(t)).css(e._getOffset()),e.wrap.append(s),o=setTimeout(function(){s.css(e._getOffset(!0)),o=setTimeout(function(){h(),setTimeout(function(){s.remove(),t=s=null,E("ZoomAnimationEnded")},16)},r)},16)}}),b(l+n,function(){if(e._allowZoom()){if(clearTimeout(o),e.st.removalDelay=r,!t){if(!(t=e._getItemToZoom()))return;s=c(t)}s.css(e._getOffset(!0)),e.wrap.append(s),e.content.css("visibility","hidden"),setTimeout(function(){s.css(e._getOffset())},16)}}),b(a+n,function(){e._allowZoom()&&(h(),s&&s.remove(),t=null)})}},_allowZoom:function(){return"image"===e.currItem.type},_getItemToZoom:function(){return!!e.currItem.hasSize&&e.currItem.img},_getOffset:function(i){var n,o=(n=i?e.currItem.img:e.st.zoom.opener(e.currItem.el||e.currItem)).offset(),s=parseInt(n.css("padding-top"),10),r=parseInt(n.css("padding-bottom"),10);o.top-=t(window).scrollTop()-s;var a={width:n.width(),height:(y?n.innerHeight():n[0].offsetHeight)-r-s};return void 0===N&&(N=void 0!==document.createElement("p").style.MozTransform),N?a["-moz-transform"]=a.transform="translate("+o.left+"px,"+o.top+"px)":(a.left=o.left,a.top=o.top),a}}});var j="iframe",M=function(t){if(e.currTemplate[j]){var i=e.currTemplate[j].find("iframe");i.length&&(t||(i[0].src="//about:blank"),e.isIE8&&i.css("display",t?"block":"none"))}};t.magnificPopup.registerModule(j,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){e.types.push(j),b("BeforeChange",function(t,e,i){e!==i&&(e===j?M():i===j&&M(!0))}),b(a+"."+j,function(){M()})},getIframe:function(i,n){var o=i.src,s=e.st.iframe;t.each(s.patterns,function(){return o.indexOf(this.index)>-1?(this.id&&(o="string"==typeof this.id?o.substr(o.lastIndexOf(this.id)+this.id.length,o.length):this.id.call(this,o)),o=this.src.replace("%id%",o),!1):void 0});var r={};return s.srcAction&&(r[s.srcAction]=o),e._parseMarkup(n,r,i),e.updateStatus("ready"),n}}});var F=function(t){var i=e.items.length;return t>i-1?t-i:0>t?i+t:t},W=function(t,e,i){return t.replace(/%curr%/gi,e+1).replace(/%total%/gi,i)};t.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var i=e.st.gallery,o=".mfp-gallery";return e.direction=!0,!(!i||!i.enabled)&&(s+=" mfp-gallery",b(h+o,function(){i.navigateByImgClick&&e.wrap.on("click"+o,".mfp-img",function(){return e.items.length>1?(e.next(),!1):void 0}),n.on("keydown"+o,function(t){37===t.keyCode?e.prev():39===t.keyCode&&e.next()})}),b("UpdateStatus"+o,function(t,i){i.text&&(i.text=W(i.text,e.currItem.index,e.items.length))}),b(c+o,function(t,n,o,s){var r=e.items.length;o.counter=r>1?W(i.tCounter,s.index,r):""}),b("BuildControls"+o,function(){if(e.items.length>1&&i.arrows&&!e.arrowLeft){var n=i.arrowMarkup,o=e.arrowLeft=t(n.replace(/%title%/gi,i.tPrev).replace(/%dir%/gi,"left")).addClass(g),s=e.arrowRight=t(n.replace(/%title%/gi,i.tNext).replace(/%dir%/gi,"right")).addClass(g);o.click(function(){e.prev()}),s.click(function(){e.next()}),e.container.append(o.add(s))}}),b(u+o,function(){e._preloadTimeout&&clearTimeout(e._preloadTimeout),e._preloadTimeout=setTimeout(function(){e.preloadNearbyImages(),e._preloadTimeout=null},16)}),void b(a+o,function(){n.off(o),e.wrap.off("click"+o),e.arrowRight=e.arrowLeft=null}))},next:function(){e.direction=!0,e.index=F(e.index+1),e.updateItemHTML()},prev:function(){e.direction=!1,e.index=F(e.index-1),e.updateItemHTML()},goTo:function(t){e.direction=t>=e.index,e.index=t,e.updateItemHTML()},preloadNearbyImages:function(){var t,i=e.st.gallery.preload,n=Math.min(i[0],e.items.length),o=Math.min(i[1],e.items.length);for(t=1;t<=(e.direction?o:n);t++)e._preloadItem(e.index+t);for(t=1;t<=(e.direction?n:o);t++)e._preloadItem(e.index-t)},_preloadItem:function(i){if(i=F(i),!e.items[i].preloaded){var n=e.items[i];n.parsed||(n=e.parseEl(i)),E("LazyLoad",n),"image"===n.type&&(n.img=t('<img class="mfp-img" />').on("load.mfploader",function(){n.hasSize=!0}).on("error.mfploader",function(){n.hasSize=!0,n.loadError=!0,E("LazyLoadError",n)}).attr("src",n.src)),n.preloaded=!0}}}});var B="retina";t.magnificPopup.registerModule(B,{options:{replaceSrc:function(t){return t.src.replace(/\.\w+$/,function(t){return"@2x"+t})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var t=e.st.retina,i=t.ratio;(i=isNaN(i)?i():i)>1&&(b("ImageHasSize."+B,function(t,e){e.img.css({"max-width":e.img[0].naturalWidth/i,width:"100%"})}),b("ElementParse."+B,function(e,n){n.src=t.replaceSrc(n,i)}))}}}}),C()}),function(t){var e;if("function"==typeof define&&define.amd&&(define(t),e=!0),"object"==typeof exports&&(module.exports=t(),e=!0),!e){var i=window.Cookies,n=window.Cookies=t();n.noConflict=function(){return window.Cookies=i,n}}}(function(){function t(){for(var t=0,e={};t<arguments.length;t++){var i=arguments[t];for(var n in i)e[n]=i[n]}return e}function e(t){return t.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent)}return function i(n){function o(){}function s(e,i,s){if("undefined"!=typeof document){"number"==typeof(s=t({path:"/"},o.defaults,s)).expires&&(s.expires=new Date(1*new Date+864e5*s.expires)),s.expires=s.expires?s.expires.toUTCString():"";try{var r=JSON.stringify(i);/^[\{\[]/.test(r)&&(i=r)}catch(t){}i=n.write?n.write(i,e):encodeURIComponent(i+"").replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),e=encodeURIComponent(e+"").replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).replace(/[\(\)]/g,escape);var a="";for(var l in s)s[l]&&(a+="; "+l,!0!==s[l]&&(a+="="+s[l].split(";")[0]));return document.cookie=e+"="+i+a}}function r(t,i){if("undefined"!=typeof document){for(var o={},s=document.cookie?document.cookie.split("; "):[],r=0;r<s.length;r++){var a=s[r].split("="),l=a.slice(1).join("=");i||'"'!==l.charAt(0)||(l=l.slice(1,-1));try{var c=e(a[0]);if(l=(n.read||n)(l,c)||e(l),i)try{l=JSON.parse(l)}catch(t){}if(o[c]=l,t===c)break}catch(t){}}return t?o[t]:o}}return o.set=s,o.get=function(t){return r(t,!1)},o.getJSON=function(t){return r(t,!0)},o.remove=function(e,i){s(e,"",t(i,{expires:-1}))},o.defaults={},o.withConverter=i,o}(function(){})}),function(t){"use strict";t.fn.twittie=function(){var e=arguments[0]instanceof Object?arguments[0]:{},i="function"==typeof arguments[0]?arguments[0]:arguments[1],n=t.extend({username:null,list:null,hashtag:null,count:10,hideReplies:!1,dateFormat:"%b/%d/%Y",template:"{{date}} - {{tweet}}",apiPath:"api/tweet.php",loadingText:"Loading..."},e);n.list&&!n.username&&t.error("If you want to fetch tweets from a list, you must define the username of the list owner.");var o=function(t){return t.replace(/(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/gi,'<a href="$1" target="_blank" title="Visit this link">$1</a>').replace(/#([a-zA-Z0-9_]+)/g,'<a href="https://twitter.com/search?q=%23$1&amp;src=hash" target="_blank" title="Search for #$1">#$1</a>').replace(/@([a-zA-Z0-9_]+)/g,'<a href="https://twitter.com/$1" target="_blank" title="$1 on Twitter">@$1</a>')},s=function(t){for(var e=t.split(" "),i=["January","February","March","April","May","June","July","August","September","October","November","December"],o={"%d":(t=new Date(Date.parse(e[1]+" "+e[2]+", "+e[5]+" "+e[3]+" UTC"))).getDate(),"%m":t.getMonth()+1,"%b":i[t.getMonth()].substr(0,3),"%B":i[t.getMonth()],"%y":String(t.getFullYear()).slice(-2),"%Y":t.getFullYear()},s=n.dateFormat,r=n.dateFormat.match(/%[dmbByY]/g),a=0,l=r.length;l>a;a++)s=s.replace(r[a],o[r[a]]);return s},r=function(t){for(var e=n.template,i=["date","tweet","avatar","url","retweeted","screen_name","user_name"],o=0,s=i.length;s>o;o++)e=e.replace(new RegExp("{{"+i[o]+"}}","gi"),t[i[o]]);return e};this.html("<span>"+n.loadingText+"</span>");var a=this;t.getJSON(n.apiPath,{username:n.username,list:n.list,hashtag:n.hashtag,count:n.count,exclude_replies:n.hideReplies},function(t){a.find("span").fadeOut("fast",function(){a.html("<ul></ul>");for(var e=0;e<n.count;e++){var l=!1;if(t[e])l=t[e];else{if(void 0===t.statuses||!t.statuses[e])break;l=t.statuses[e]}var c={user_name:l.user.name,date:s(l.created_at),tweet:o(l.retweeted?"RT @"+l.user.screen_name+": "+l.retweeted_status.text:l.text),avatar:'<img src="'+l.user.profile_image_url+'" />',url:"https://twitter.com/"+l.user.screen_name+"/status/"+l.id_str,retweeted:l.retweeted,screen_name:o("@"+l.user.screen_name)};a.find("ul").append("<li>"+r(c)+"</li>")}"function"==typeof i&&i()})})}}(jQuery),
 /*
  * Copyright (C) 2009 Joel Sutherland
  * Licenced under the MIT license
  * http://www.newmediacampaigns.com/page/jquery-flickr-plugin
  */
 function(t){t.fn.jflickrfeed=function(e,i){var n=(e=t.extend(!0,{flickrbase:"http://api.flickr.com/services/feeds/",feedapi:"photos_public.gne",limit:20,qstrings:{lang:"en-us",format:"json",jsoncallback:"?"},cleanDescription:!0,useTemplate:!0,itemTemplate:"",itemCallback:function(){}},e)).flickrbase+e.feedapi+"?",o=!0;for(var s in e.qstrings)o||(n+="&"),n+=s+"="+e.qstrings[s],o=!1;return t(this).each(function(){var o=t(this),s=this;t.getJSON(n,function(n){t.each(n.items,function(t,i){if(t<e.limit){if(e.cleanDescription){var n=/<p>(.*?)<\/p>/g,r=i.description;n.test(r)&&(i.description=r.match(n)[2],null!=i.description&&(i.description=i.description.replace("<p>","").replace("</p>","")))}if(i.image_s=i.media.m.replace("_m","_s"),i.image_t=i.media.m.replace("_m","_t"),i.image_m=i.media.m.replace("_m","_m"),i.image=i.media.m.replace("_m",""),i.image_b=i.media.m.replace("_m","_b"),delete i.media,e.useTemplate){var a=e.itemTemplate;for(var l in i){var c=new RegExp("{{"+l+"}}","g");a=a.replace(c,i[l])}o.append(a)}e.itemCallback.call(s,i)}}),t.isFunction(i)&&i.call(s,n)})})}}(jQuery),
 /* spectragram.js / by Adrian Quevedo */
 "function"!=typeof Object.create&&(Object.create=function(t){function e(){}return e.prototype=t,new e}),function(t,e,i,n){var o={API_URL:"https://api.instagram.com/v1",initialize:function(e,i){this.elem=i,this.$elem=t(i),this.accessToken=t.fn.spectragram.accessData.accessToken,this.options=t.extend({},t.fn.spectragram.options,e),this.endpoints=this.setEndpoints(),this.messages={defaultImageAltText:"Instagram Photo related with "+this.options.query,notFound:"This user account is private or doesn't have any photos."}},setEndpoints:function(){return{usersSelf:"/users/self/?access_token="+this.accessToken,usersMediaRecent:"/users/self/media/recent/?&count="+this.options.max+"&access_token="+this.accessToken,tagsMediaRecent:"/tags/"+this.options.query+"/media/recent?&count="+this.options.max+"&access_token="+this.accessToken}},getPhotos:function(e){var i=this;i.fetch(e).done(function(e){var n=i.options.query||"User";e.data.length?i.display(e):t.error("Spectragram.js - Error: "+n+" does not have photos.")})},getUserFeed:function(){this.getPhotos(this.endpoints.usersMediaRecent)},getRecentTagged:function(){this.getPhotos(this.endpoints.tagsMediaRecent)},fetch:function(e){var i=this.API_URL+e;return t.ajax({type:"GET",dataType:"jsonp",cache:!1,url:i})},display:function(e){var i,n,o,s,r,a,l,c,h,u=[];if(o=0===t(this.options.wrapEachWith).length,void 0===e.data||200!==e.meta.code||0===e.data.length)o?this.$elem.append(this.messages.notFound):this.$elem.append(t(this.options.wrapEachWith).append(this.messages.notFound));else{l=this.options.max>=e.data.length?e.data.length:this.options.max,c=this.options.size;for(var d=0;d<l;d++)"small"===c?(h=e.data[d].images.thumbnail.url,r=e.data[d].images.thumbnail.height,a=e.data[d].images.thumbnail.width):"medium"===c?(h=e.data[d].images.low_resolution.url,r=e.data[d].images.low_resolution.height,a=e.data[d].images.low_resolution.width):(h=e.data[d].images.standard_resolution.url,r=e.data[d].images.standard_resolution.height,a=e.data[d].images.standard_resolution.width),s=null!==e.data[d].caption?t("<span>").text(e.data[d].caption.text).html():this.messages.defaultImageAltText,n=t("<img>",{alt:s,attr:{height:r,width:a},src:h}),i=t("<a>",{href:e.data[d].link,target:"_blank",title:s}).append(n),o?u.push(i):u.push(t(this.options.wrapEachWith).append(i));this.$elem.append(u)}"function"==typeof this.options.complete&&this.options.complete.call(this)}};jQuery.fn.spectragram=function(e,i){jQuery.fn.spectragram.accessData.accessToken?this.each(function(){var n=Object.create(o);if(n.initialize(i,this),n[e])return n[e](this);t.error("Method "+e+" does not exist on jQuery.spectragram")}):t.error("You must define an accessToken on jQuery.spectragram")},jQuery.fn.spectragram.options={complete:null,max:20,query:"instagram",size:"medium",wrapEachWith:"<li></li>"},jQuery.fn.spectragram.accessData={accessToken:null}}(jQuery,window,document),
 /* https://github.com/mhuggins/jquery-countTo */
 function(t){t.fn.countTo=function(e){return e=e||{},t(this).each(function(){function i(t){var e=n.formatter.call(r,t,n);a.text(e)}var n=t.extend({},t.fn.countTo.defaults,{from:t(this).data("from"),to:t(this).data("to"),speed:t(this).data("speed"),refreshInterval:t(this).data("refresh-interval"),decimals:t(this).data("decimals")},e),o=Math.ceil(n.speed/n.refreshInterval),s=(n.to-n.from)/o,r=this,a=t(this),l=0,c=n.from,h=a.data("countTo")||{};a.data("countTo",h),h.interval&&clearInterval(h.interval),h.interval=setInterval(function(){l++,i(c+=s),"function"==typeof n.onUpdate&&n.onUpdate.call(r,c),l>=o&&(a.removeData("countTo"),clearInterval(h.interval),c=n.to,"function"==typeof n.onComplete&&n.onComplete.call(r,c))},n.refreshInterval),i(c)})},t.fn.countTo.defaults={from:0,to:0,speed:1e3,refreshInterval:100,decimals:0,formatter:function(t,e){return t.toFixed(e.decimals)},onUpdate:null,onComplete:null}}(jQuery),function(t){"use strict";function e(e,i){this.element=t(e),this.settings=t.extend({},n,i),this._defaults=n,this._init()}var i="Morphext",n={animation:"bounceIn",separator:",",speed:2e3,complete:t.noop};e.prototype={_init:function(){var e=this;this.phrases=[],this.element.addClass("morphext"),t.each(this.element.text().split(this.settings.separator),function(i,n){e.phrases.push(t.trim(n))}),this.index=-1,this.animate(),this.start()},animate:function(){this.index=++this.index%this.phrases.length,this.element[0].innerHTML='<span class="animated '+this.settings.animation+'">'+this.phrases[this.index]+"</span>",t.isFunction(this.settings.complete)&&this.settings.complete.call(this)},start:function(){var t=this;this._interval=setInterval(function(){t.animate()},this.settings.speed)},stop:function(){this._interval=clearInterval(this._interval)}},t.fn[i]=function(n){return this.each(function(){t.data(this,"plugin_"+i)||t.data(this,"plugin_"+i,new e(this,n))})}}(jQuery),function(t,e){"function"==typeof define&&define.amd?define(["jquery"],function(t){return e(t)}):"object"==typeof exports?module.exports=e(require("jquery")):e(jQuery)}(0,function(t){var e=function(t,e){var i,n=document.createElement("canvas");t.appendChild(n),"object"==typeof G_vmlCanvasManager&&G_vmlCanvasManager.initElement(n);var o=n.getContext("2d");n.width=n.height=e.size;var s=1;window.devicePixelRatio>1&&(s=window.devicePixelRatio,n.style.width=n.style.height=[e.size,"px"].join(""),n.width=n.height=e.size*s,o.scale(s,s)),o.translate(e.size/2,e.size/2),o.rotate((e.rotate/180-.5)*Math.PI);var r=(e.size-e.lineWidth)/2;e.scaleColor&&e.scaleLength&&(r-=e.scaleLength+2),Date.now=Date.now||function(){return+new Date};var a=function(t,e,i){var n=0>=(i=Math.min(Math.max(-1,i||0),1));o.beginPath(),o.arc(0,0,r,0,2*Math.PI*i,n),o.strokeStyle=t,o.lineWidth=e,o.stroke()},l=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)},c=function(){e.scaleColor&&function(){var t,i;o.lineWidth=1,o.fillStyle=e.scaleColor,o.save();for(var n=24;n>0;--n)n%6==0?(i=e.scaleLength,t=0):(i=.6*e.scaleLength,t=e.scaleLength-i),o.fillRect(-e.size/2+t,0,i,1),o.rotate(Math.PI/12);o.restore()}(),e.trackColor&&a(e.trackColor,e.trackWidth||e.lineWidth,1)};this.getCanvas=function(){return n},this.getCtx=function(){return o},this.clear=function(){o.clearRect(e.size/-2,e.size/-2,e.size,e.size)},this.draw=function(t){var n;e.scaleColor||e.trackColor?o.getImageData&&o.putImageData?i?o.putImageData(i,0,0):(c(),i=o.getImageData(0,0,e.size*s,e.size*s)):(this.clear(),c()):this.clear(),o.lineCap=e.lineCap,n="function"==typeof e.barColor?e.barColor(t):e.barColor,a(n,e.lineWidth,t/100)}.bind(this),this.animate=function(t,i){var n=Date.now();e.onStart(t,i);var o=function(){var s=Math.min(Date.now()-n,e.animate.duration),r=e.easing(this,s,t,i-t,e.animate.duration);this.draw(r),e.onStep(t,i,r),s>=e.animate.duration?e.onStop(t,i):l(o)}.bind(this);l(o)}.bind(this)},i=function(t,i){var n={barColor:"#ef1e25",trackColor:"#f9f9f9",scaleColor:"#dfe0e0",scaleLength:5,lineCap:"round",lineWidth:3,trackWidth:void 0,size:110,rotate:0,animate:{duration:1e3,enabled:!0},easing:function(t,e,i,n,o){return 1>(e/=o/2)?n/2*e*e+i:-n/2*(--e*(e-2)-1)+i},onStart:function(t,e){},onStep:function(t,e,i){},onStop:function(t,e){}};if(void 0!==e)n.renderer=e;else{if("undefined"==typeof SVGRenderer)throw new Error("Please load either the SVG- or the CanvasRenderer");n.renderer=SVGRenderer}var o={},s=0,r=function(){for(var e in this.el=t,this.options=o,n)n.hasOwnProperty(e)&&(o[e]=i&&void 0!==i[e]?i[e]:n[e],"function"==typeof o[e]&&(o[e]=o[e].bind(this)));"string"==typeof o.easing&&"undefined"!=typeof jQuery&&jQuery.isFunction(jQuery.easing[o.easing])?o.easing=jQuery.easing[o.easing]:o.easing=n.easing,"number"==typeof o.animate&&(o.animate={duration:o.animate,enabled:!0}),"boolean"!=typeof o.animate||o.animate||(o.animate={duration:1e3,enabled:o.animate}),this.renderer=new o.renderer(t,o),this.renderer.draw(s),t.dataset&&t.dataset.percent?this.update(parseFloat(t.dataset.percent)):t.getAttribute&&t.getAttribute("data-percent")&&this.update(parseFloat(t.getAttribute("data-percent")))}.bind(this);this.update=function(t){return t=parseFloat(t),o.animate.enabled?this.renderer.animate(s,t):this.renderer.draw(t),s=t,this}.bind(this),this.disableAnimation=function(){return o.animate.enabled=!1,this},this.enableAnimation=function(){return o.animate.enabled=!0,this},r()};t.fn.easyPieChart=function(e){return this.each(function(){var n;t.data(this,"easyPieChart")||(n=t.extend({},e,t(this).data()),t.data(this,"easyPieChart",new i(this,n)))})}}),function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)}(function(t){"use strict";function e(t){var e=t.toString().replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1");return new RegExp(e)}function i(t){return function(i){var o=i.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);if(o)for(var s=0,r=o.length;s<r;++s){var l=o[s].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),c=e(l[0]),h=l[1]||"",u=l[3]||"",d=null;l=l[2],a.hasOwnProperty(l)&&(d=a[l],d=Number(t[d])),null!==d&&("!"===h&&(d=n(u,d)),""===h&&d<10&&(d="0"+d.toString()),i=i.replace(c,d.toString()))}return i.replace(/%%/,"%")}}function n(t,e){var i="s",n="";return t&&(1===(t=t.replace(/(:|;|\s)/gi,"").split(/\,/)).length?i=t[0]:(n=t[0],i=t[1])),Math.abs(e)>1?i:n}var o=[],s=[],r={precision:100,elapse:!1,defer:!1};s.push(/^[0-9]*$/.source),s.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),s.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),s=new RegExp(s.join("|"));var a={Y:"years",m:"months",n:"daysToMonth",d:"daysToWeek",w:"weeks",W:"weeksToMonth",H:"hours",M:"minutes",S:"seconds",D:"totalDays",I:"totalHours",N:"totalMinutes",T:"totalSeconds"},l=function(e,i,n){this.el=e,this.$el=t(e),this.interval=null,this.offset={},this.options=t.extend({},r),this.firstTick=!0,this.instanceNumber=o.length,o.push(this),this.$el.data("countdown-instance",this.instanceNumber),n&&("function"==typeof n?(this.$el.on("update.countdown",n),this.$el.on("stoped.countdown",n),this.$el.on("finish.countdown",n)):this.options=t.extend({},r,n)),this.setFinalDate(i),!1===this.options.defer&&this.start()};t.extend(l.prototype,{start:function(){null!==this.interval&&clearInterval(this.interval);var t=this;this.update(),this.interval=setInterval(function(){t.update.call(t)},this.options.precision)},stop:function(){clearInterval(this.interval),this.interval=null,this.dispatchEvent("stoped")},toggle:function(){this.interval?this.stop():this.start()},pause:function(){this.stop()},resume:function(){this.start()},remove:function(){this.stop.call(this),o[this.instanceNumber]=null,delete this.$el.data().countdownInstance},setFinalDate:function(t){this.finalDate=function(t){if(t instanceof Date)return t;if(String(t).match(s))return String(t).match(/^[0-9]*$/)&&(t=Number(t)),String(t).match(/\-/)&&(t=String(t).replace(/\-/g,"/")),new Date(t);throw new Error("Couldn't cast `"+t+"` to a date object.")}(t)},update:function(){if(0!==this.$el.closest("html").length){var t,e=new Date;return t=this.finalDate.getTime()-e.getTime(),t=Math.ceil(t/1e3),t=!this.options.elapse&&t<0?0:Math.abs(t),this.totalSecsLeft===t||this.firstTick?void(this.firstTick=!1):(this.totalSecsLeft=t,this.elapsed=e>=this.finalDate,this.offset={seconds:this.totalSecsLeft%60,minutes:Math.floor(this.totalSecsLeft/60)%60,hours:Math.floor(this.totalSecsLeft/60/60)%24,days:Math.floor(this.totalSecsLeft/60/60/24)%7,daysToWeek:Math.floor(this.totalSecsLeft/60/60/24)%7,daysToMonth:Math.floor(this.totalSecsLeft/60/60/24%30.4368),weeks:Math.floor(this.totalSecsLeft/60/60/24/7),weeksToMonth:Math.floor(this.totalSecsLeft/60/60/24/7)%4,months:Math.floor(this.totalSecsLeft/60/60/24/30.4368),years:Math.abs(this.finalDate.getFullYear()-e.getFullYear()),totalDays:Math.floor(this.totalSecsLeft/60/60/24),totalHours:Math.floor(this.totalSecsLeft/60/60),totalMinutes:Math.floor(this.totalSecsLeft/60),totalSeconds:this.totalSecsLeft},void(this.options.elapse||0!==this.totalSecsLeft?this.dispatchEvent("update"):(this.stop(),this.dispatchEvent("finish"))))}this.remove()},dispatchEvent:function(e){var n=t.Event(e+".countdown");n.finalDate=this.finalDate,n.elapsed=this.elapsed,n.offset=t.extend({},this.offset),n.strftime=i(this.offset),this.$el.trigger(n)}}),t.fn.countdown=function(){var e=Array.prototype.slice.call(arguments,0);return this.each(function(){var i=t(this).data("countdown-instance");if(void 0!==i){var n=o[i],s=e[0];l.prototype.hasOwnProperty(s)?n[s].apply(n,e.slice(1)):null===String(s).match(/^[$A-Z_][0-9A-Z_$]*$/i)?(n.setFinalDate.call(n,s),n.start()):t.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi,s))}else new l(this,e[0],e[1])})}}),function(t){t.fn.downCount=function(e,i){var n=t.extend({date:null,offset:null},e);n.date||t.error("Date is not defined."),Date.parse(n.date)||t.error("Incorrect date format, it should look like this, 12/24/2012 12:00:00.");var o=this,s=setInterval(function(){var t=new Date(n.date)-function(){var t=new Date,e=t.getTime()+6e4*t.getTimezoneOffset();return new Date(e+36e5*n.offset)}();if(t<0)return clearInterval(s),void(i&&"function"==typeof i&&i());var e=Math.floor(t/864e5),r=Math.floor(t%864e5/36e5),a=Math.floor(t%36e5/6e4),l=Math.floor(t%6e4/1e3),c=1===(e=String(e).length>=2?e:"0"+e)?"day":"days",h=1===(r=String(r).length>=2?r:"0"+r)?"hour":"hours",u=1===(a=String(a).length>=2?a:"0"+a)?"minute":"minutes",d=1===(l=String(l).length>=2?l:"0"+l)?"second":"seconds";o.find(".days").text(e),o.find(".hours").text(r),o.find(".minutes").text(a),o.find(".seconds").text(l),o.find(".days_ref").text(c),o.find(".hours_ref").text(h),o.find(".minutes_ref").text(u),o.find(".seconds_ref").text(d)},1e3)}}(jQuery),function(t){t.fn.theiaStickySidebar=function(e){function i(e,i){return!0===e.initialized||!(t("body").width()<e.minWidth)&&(function(e,i){e.initialized=!0,0===t("#theia-sticky-sidebar-stylesheet-"+e.namespace).length&&t("head").append(t('<style id="theia-sticky-sidebar-stylesheet-'+e.namespace+'">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>')),i.each(function(){function i(){o.fixedScrollTop=0,o.sidebar.css({"min-height":"1px"}),o.stickySidebar.css({position:"static",width:"",transform:"none"})}var o={};if(o.sidebar=t(this),o.options=e||{},o.container=t(o.options.containerSelector),0==o.container.length&&(o.container=o.sidebar.parent()),o.sidebar.parents().css("-webkit-transform","none"),o.sidebar.css({position:o.options.defaultPosition,overflow:"visible","-webkit-box-sizing":"border-box","-moz-box-sizing":"border-box","box-sizing":"border-box"}),o.stickySidebar=o.sidebar.find(".theiaStickySidebar"),0==o.stickySidebar.length){var s=/(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;o.sidebar.find("script").filter(function(t,e){return 0===e.type.length||e.type.match(s)}).remove(),o.stickySidebar=t("<div>").addClass("theiaStickySidebar").append(o.sidebar.children()),o.sidebar.append(o.stickySidebar)}o.marginBottom=parseInt(o.sidebar.css("margin-bottom")),o.paddingTop=parseInt(o.sidebar.css("padding-top")),o.paddingBottom=parseInt(o.sidebar.css("padding-bottom"));var r=o.stickySidebar.offset().top,a=o.stickySidebar.outerHeight();o.stickySidebar.css("padding-top",1),o.stickySidebar.css("padding-bottom",1),r-=o.stickySidebar.offset().top,a=o.stickySidebar.outerHeight()-a-r,0==r?(o.stickySidebar.css("padding-top",0),o.stickySidebarPaddingTop=0):o.stickySidebarPaddingTop=1,0==a?(o.stickySidebar.css("padding-bottom",0),o.stickySidebarPaddingBottom=0):o.stickySidebarPaddingBottom=1,o.previousScrollTop=null,o.fixedScrollTop=0,i(),o.onScroll=function(o){if(o.stickySidebar.is(":visible")){if(t("body").width()<o.options.minWidth)return void i();if(o.options.disableOnResponsiveLayouts){var s=o.sidebar.outerWidth("none"==o.sidebar.css("float"));if(s+50>o.container.width())return void i()}var r=t(document).scrollTop(),a="static";if(r>=o.sidebar.offset().top+(o.paddingTop-o.options.additionalMarginTop)){var l,c=o.paddingTop+e.additionalMarginTop,h=o.paddingBottom+o.marginBottom+e.additionalMarginBottom,u=o.sidebar.offset().top,d=o.sidebar.offset().top+function(e){var i=e.height();return e.children().each(function(){i=Math.max(i,t(this).height())}),i}(o.container),f=0+e.additionalMarginTop,p=o.stickySidebar.outerHeight()+c+h<t(window).height();l=p?f+o.stickySidebar.outerHeight():t(window).height()-o.marginBottom-o.paddingBottom-e.additionalMarginBottom;var m=u-r+o.paddingTop,g=d-r-o.paddingBottom-o.marginBottom,v=o.stickySidebar.offset().top-r,y=o.previousScrollTop-r;"fixed"==o.stickySidebar.css("position")&&"modern"==o.options.sidebarBehavior&&(v+=y),"stick-to-top"==o.options.sidebarBehavior&&(v=e.additionalMarginTop),"stick-to-bottom"==o.options.sidebarBehavior&&(v=l-o.stickySidebar.outerHeight()),v=y>0?Math.min(v,f):Math.max(v,l-o.stickySidebar.outerHeight()),v=Math.max(v,m),v=Math.min(v,g-o.stickySidebar.outerHeight());var _=o.container.height()==o.stickySidebar.outerHeight();a=!_&&v==f||!_&&v==l-o.stickySidebar.outerHeight()?"fixed":r+v-o.sidebar.offset().top-o.paddingTop<=e.additionalMarginTop?"static":"absolute"}if("fixed"==a){var b=t(document).scrollLeft();o.stickySidebar.css({position:"fixed",width:n(o.stickySidebar)+"px",transform:"translateY("+v+"px)",left:o.sidebar.offset().left+parseInt(o.sidebar.css("padding-left"))-b+"px",top:"0px"})}else if("absolute"==a){var w={};"absolute"!=o.stickySidebar.css("position")&&(w.position="absolute",w.transform="translateY("+(r+v-o.sidebar.offset().top-o.stickySidebarPaddingTop-o.stickySidebarPaddingBottom)+"px)",w.top="0px"),w.width=n(o.stickySidebar)+"px",w.left="",o.stickySidebar.css(w)}else"static"==a&&i();"static"!=a&&1==o.options.updateSidebarHeight&&o.sidebar.css({"min-height":o.stickySidebar.outerHeight()+o.stickySidebar.offset().top-o.sidebar.offset().top+o.paddingBottom}),o.previousScrollTop=r}},o.onScroll(o),t(document).on("scroll."+o.options.namespace,function(t){return function(){t.onScroll(t)}}(o)),t(window).on("resize."+o.options.namespace,function(t){return function(){t.stickySidebar.css({position:"static"}),t.onScroll(t)}}(o)),"undefined"!=typeof ResizeSensor&&new ResizeSensor(o.stickySidebar[0],function(t){return function(){t.onScroll(t)}}(o))})}(e,i),!0)}function n(t){var e;try{e=t[0].getBoundingClientRect().width}catch(t){}return void 0===e&&(e=t.width()),e}return(e=t.extend({containerSelector:"",additionalMarginTop:0,additionalMarginBottom:0,updateSidebarHeight:!0,minWidth:0,disableOnResponsiveLayouts:!0,sidebarBehavior:"modern",defaultPosition:"relative",namespace:"TSS"},e)).additionalMarginTop=parseInt(e.additionalMarginTop)||0,e.additionalMarginBottom=parseInt(e.additionalMarginBottom)||0,function(e,n){i(e,n)||(console.log("TSS: Body width smaller than options.minWidth. Init is delayed."),t(document).on("scroll."+e.namespace,function(e,n){return function(o){i(e,n)&&t(this).unbind(o)}}(e,n)),t(window).on("resize."+e.namespace,function(e,n){return function(o){i(e,n)&&t(this).unbind(o)}}(e,n)))}(e,this),this}}(jQuery),function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){function e(e,n,o){var s={content:{message:"object"==typeof n?n.message:n,title:n.title?n.title:"",icon:n.icon?n.icon:"",url:n.url?n.url:"#",target:n.target?n.target:"-"}};o=t.extend(!0,{},s,o),this.settings=t.extend(!0,{},i,o),this._defaults=i,"-"===this.settings.content.target&&(this.settings.content.target=this.settings.url_target),this.animations={start:"webkitAnimationStart oanimationstart MSAnimationStart animationstart",end:"webkitAnimationEnd oanimationend MSAnimationEnd animationend"},"number"==typeof this.settings.offset&&(this.settings.offset={x:this.settings.offset,y:this.settings.offset}),(this.settings.allow_duplicates||!this.settings.allow_duplicates&&!function(e){var i=!1;return t('[data-notify="container"]').each(function(n,o){var s=t(o),r=s.find('[data-notify="title"]').html().trim(),a=s.find('[data-notify="message"]').html().trim(),l=r===t("<div>"+e.settings.content.title+"</div>").html().trim(),c=a===t("<div>"+e.settings.content.message+"</div>").html().trim(),h=s.hasClass("alert-"+e.settings.type);return l&&c&&h&&(i=!0),!i}),i}(this))&&this.init()}var i={element:"body",position:null,type:"info",allow_dismiss:!0,allow_duplicates:!0,newest_on_top:!1,showProgressbar:!1,placement:{from:"top",align:"right"},offset:20,spacing:10,z_index:1031,delay:5e3,timer:1e3,url_target:"_blank",mouse_over:null,animate:{enter:"animated fadeInDown",exit:"animated fadeOutUp"},onShow:null,onShown:null,onClose:null,onClosed:null,onClick:null,icon_type:"class",template:'<div data-notify="container" class="col-11 col-md-4 alert alert-{0}" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss">&times;</button><span data-notify="icon"></span> <span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="p-progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>'};String.format=function(){var t=arguments;return arguments[0].replace(/(\{\{\d\}\}|\{\d\})/g,function(e){if("{{"===e.substring(0,2))return e;var i=parseInt(e.match(/\d/)[0]);return t[i+1]})},t.extend(e.prototype,{init:function(){var t=this;this.buildNotify(),this.settings.content.icon&&this.setIcon(),"#"!=this.settings.content.url&&this.styleURL(),this.styleDismiss(),this.placement(),this.bind(),this.notify={$ele:this.$ele,update:function(e,i){var n={};for(var o in"string"==typeof e?n[e]=i:n=e,n)switch(o){case"type":this.$ele.removeClass("alert-"+t.settings.type),this.$ele.find('[data-notify="progressbar"] > .progress-bar').removeClass("p-progress-bar-"+t.settings.type),t.settings.type=n[o],this.$ele.addClass("alert-"+n[o]).find('[data-notify="progressbar"] > .progress-bar').addClass("p-progress-bar-"+n[o]);break;case"icon":var s=this.$ele.find('[data-notify="icon"]');"class"===t.settings.icon_type.toLowerCase()?s.removeClass(t.settings.content.icon).addClass(n[o]):(s.is("img")||s.find("img"),s.attr("src",n[o])),t.settings.content.icon=n[e];break;case"progress":var r=t.settings.delay-t.settings.delay*(n[o]/100);this.$ele.data("notify-delay",r),this.$ele.find('[data-notify="progressbar"] > div').attr("aria-valuenow",n[o]).css("width",n[o]+"%");break;case"url":this.$ele.find('[data-notify="url"]').attr("href",n[o]);break;case"target":this.$ele.find('[data-notify="url"]').attr("target",n[o]);break;default:this.$ele.find('[data-notify="'+o+'"]').html(n[o])}var a=this.$ele.outerHeight()+parseInt(t.settings.spacing)+parseInt(t.settings.offset.y);t.reposition(a)},close:function(){t.close()}}},buildNotify:function(){var e=this.settings.content;this.$ele=t(String.format(this.settings.template,this.settings.type,e.title,e.message,e.url,e.target)),this.$ele.attr("data-notify-position",this.settings.placement.from+"-"+this.settings.placement.align),this.settings.allow_dismiss||this.$ele.find('[data-notify="dismiss"]').css("display","none"),(this.settings.delay<=0&&!this.settings.showProgressbar||!this.settings.showProgressbar)&&this.$ele.find('[data-notify="progressbar"]').remove()},setIcon:function(){"class"===this.settings.icon_type.toLowerCase()?this.$ele.find('[data-notify="icon"]').addClass(this.settings.content.icon):this.$ele.find('[data-notify="icon"]').is("img")?this.$ele.find('[data-notify="icon"]').attr("src",this.settings.content.icon):this.$ele.find('[data-notify="icon"]').append('<img src="'+this.settings.content.icon+'" alt="Notify Icon" />')},styleDismiss:function(){this.$ele.find('[data-notify="dismiss"]').css({position:"absolute",right:"10px",top:"5px",zIndex:this.settings.z_index+2})},styleURL:function(){this.$ele.find('[data-notify="url"]').css({backgroundImage:"url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)",height:"100%",left:0,position:"absolute",top:0,width:"100%",zIndex:this.settings.z_index+1})},placement:function(){var e=this,i=this.settings.offset.y,n={display:"inline-block",margin:"0px auto",position:this.settings.position?this.settings.position:"body"===this.settings.element?"fixed":"absolute",transition:"all .5s ease-in-out",zIndex:this.settings.z_index},o=!1,s=this.settings;switch(t('[data-notify-position="'+this.settings.placement.from+"-"+this.settings.placement.align+'"]:not([data-closing="true"])').each(function(){i=Math.max(i,parseInt(t(this).css(s.placement.from))+parseInt(t(this).outerHeight())+parseInt(s.spacing))}),!0===this.settings.newest_on_top&&(i=this.settings.offset.y),n[this.settings.placement.from]=i+"px",this.settings.placement.align){case"left":case"right":n[this.settings.placement.align]=this.settings.offset.x+"px";break;case"center":n.left=0,n.right=0}this.$ele.css(n).addClass(this.settings.animate.enter),t.each(Array("webkit-","moz-","o-","ms-",""),function(t,i){e.$ele[0].style[i+"AnimationIterationCount"]=1}),t(this.settings.element).append(this.$ele),!0===this.settings.newest_on_top&&(i=parseInt(i)+parseInt(this.settings.spacing)+this.$ele.outerHeight(),this.reposition(i)),t.isFunction(e.settings.onShow)&&e.settings.onShow.call(this.$ele),this.$ele.one(this.animations.start,function(){o=!0}).one(this.animations.end,function(){e.$ele.removeClass(e.settings.animate.enter),t.isFunction(e.settings.onShown)&&e.settings.onShown.call(this)}),setTimeout(function(){o||t.isFunction(e.settings.onShown)&&e.settings.onShown.call(this)},600)},bind:function(){var e=this;if(this.$ele.find('[data-notify="dismiss"]').on("click",function(){e.close()}),t.isFunction(e.settings.onClick)&&this.$ele.on("click",function(t){t.target!=e.$ele.find('[data-notify="dismiss"]')[0]&&e.settings.onClick.call(this,t)}),this.$ele.mouseover(function(){t(this).data("data-hover","true")}).mouseout(function(){t(this).data("data-hover","false")}),this.$ele.data("data-hover","false"),this.settings.delay>0){e.$ele.data("notify-delay",e.settings.delay);var i=setInterval(function(){var t=parseInt(e.$ele.data("notify-delay"))-e.settings.timer;if("false"===e.$ele.data("data-hover")&&"pause"===e.settings.mouse_over||"pause"!=e.settings.mouse_over){var n=(e.settings.delay-t)/e.settings.delay*100;e.$ele.data("notify-delay",t),e.$ele.find('[data-notify="progressbar"] > div').attr("aria-valuenow",n).css("width",n+"%")}t<=-e.settings.timer&&(clearInterval(i),e.close())},e.settings.timer)}},close:function(){var e=this,i=parseInt(this.$ele.css(this.settings.placement.from)),n=!1;this.$ele.attr("data-closing","true").addClass(this.settings.animate.exit),e.reposition(i),t.isFunction(e.settings.onClose)&&e.settings.onClose.call(this.$ele),this.$ele.one(this.animations.start,function(){n=!0}).one(this.animations.end,function(){t(this).remove(),t.isFunction(e.settings.onClosed)&&e.settings.onClosed.call(this)}),setTimeout(function(){n||(e.$ele.remove(),e.settings.onClosed&&e.settings.onClosed(e.$ele))},600)},reposition:function(e){var i=this,n='[data-notify-position="'+this.settings.placement.from+"-"+this.settings.placement.align+'"]:not([data-closing="true"])',o=this.$ele.nextAll(n);!0===this.settings.newest_on_top&&(o=this.$ele.prevAll(n)),o.each(function(){t(this).css(i.settings.placement.from,e),e=parseInt(e)+parseInt(i.settings.spacing)+t(this).outerHeight()})}}),t.notify=function(t,i){return new e(this,t,i).notify},t.notifyDefaults=function(e){return i=t.extend(!0,{},i,e)},t.notifyClose=function(e){void 0===e||"all"===e?t("[data-notify]").find('[data-notify="dismiss"]').trigger("click"):"success"===e||"info"===e||"warning"===e||"danger"===e?t(".alert-"+e+"[data-notify]").find('[data-notify="dismiss"]').trigger("click"):e?t(e+"[data-notify]").find('[data-notify="dismiss"]').trigger("click"):t('[data-notify-position="'+e+'"]').find('[data-notify="dismiss"]').trigger("click")},t.notifyCloseExcept=function(e){"success"===e||"info"===e||"warning"===e||"danger"===e?t("[data-notify]").not(".alert-"+e).find('[data-notify="dismiss"]').trigger("click"):t("[data-notify]").not(e).find('[data-notify="dismiss"]').trigger("click")}}),function(t,e){"use strict";function i(i,n,s,a,l){function c(){S=t.devicePixelRatio>1,s=h(s),n.delay>=0&&setTimeout(function(){u(!0)},n.delay),(n.delay<0||n.combined)&&(a.e=function(t,e){var o,s=0;return function(r,a){function l(){s=+new Date,e.call(i,r)}var c=+new Date-s;o&&clearTimeout(o),c>t||!n.enableThrottle||a?l():o=setTimeout(l,t-c)}}(n.throttle,function(t){"resize"===t.type&&(w=E=-1),u(t.all)}),a.a=function(t){t=h(t),s.push.apply(s,t)},a.g=function(){return s=o(s).filter(function(){return!o(this).data(n.loadedName)})},a.f=function(t){for(var e=0;e<t.length;e++){var i=s.filter(function(){return this===t[e]});i.length&&u(!1,i)}},u(),o(n.appendScroll).on("scroll."+l+" resize."+l,a.e))}function h(t){for(var s=n.defaultImage,r=n.placeholder,a=n.imageBase,l=n.srcsetAttribute,c=n.loaderAttribute,h=n._f||{},u=0,d=(t=o(t).filter(function(){var t=o(this),i=g(this);return!t.data(n.handledName)&&(t.attr(n.attribute)||t.attr(l)||t.attr(c)||h[i]!==e)}).data("plugin_"+n.name,i)).length;u<d;u++){var f=o(t[u]),p=g(t[u]),m=f.attr(n.imageBaseAttribute)||a;p===T&&m&&f.attr(l)&&f.attr(l,v(f.attr(l),m)),h[p]===e||f.attr(c)||f.attr(c,h[p]),p===T&&s&&!f.attr(A)?f.attr(A,s):p===T||!r||f.css(z)&&"none"!==f.css(z)||f.css(z,"url('"+r+"')")}return t}function u(t,e){if(s.length){for(var r=e||s,a=!1,l=n.imageBase||"",c=n.srcsetAttribute,h=n.handledName,u=0;u<r.length;u++)if(t||e||f(r[u])){var p=o(r[u]),m=g(r[u]),v=p.attr(n.attribute),y=p.attr(n.imageBaseAttribute)||l,_=p.attr(n.loaderAttribute);p.data(h)||n.visibleOnly&&!p.is(":visible")||!((v||p.attr(c))&&(m===T&&(y+v!==p.attr(A)||p.attr(c)!==p.attr(k))||m!==T&&y+v!==p.css(z))||_)||(a=!0,p.data(h,!0),d(p,m,y,_))}a&&(s=o(s).filter(function(){return!o(this).data(h)}))}else n.autoDestroy&&i.destroy()}function d(t,e,i,s){++b;var r=function(){_("onError",t),y(),r=o.noop};_("beforeLoad",t);var a=n.attribute,l=n.srcsetAttribute,c=n.sizesAttribute,h=n.retinaAttribute,u=n.removeAttribute,d=n.loadedName,f=t.attr(h);if(s){var p=function(){u&&t.removeAttr(n.loaderAttribute),t.data(d,!0),_(C,t),setTimeout(y,1),p=o.noop};t.off(x).one(x,r).one(I,p),_(s,t,function(e){e?(t.off(I),p()):(t.off(x),r())})||t.trigger(x)}else{var m=o(new Image);m.one(x,r).one(I,function(){t.hide(),e===T?t.attr(D,m.attr(D)).attr(k,m.attr(k)).attr(A,m.attr(A)):t.css(z,"url('"+m.attr(A)+"')"),t[n.effect](n.effectTime),u&&(t.removeAttr(a+" "+l+" "+h+" "+n.imageBaseAttribute),c!==D&&t.removeAttr(c)),t.data(d,!0),_(C,t),m.remove(),y()});var g=(S&&f?f:t.attr(a))||"";m.attr(D,t.attr(c)).attr(k,t.attr(l)).attr(A,g?i+g:null),m.complete&&m.trigger(I)}}function f(t){var e=t.getBoundingClientRect(),i=n.scrollDirection,o=n.threshold,s=m()+o>e.top&&-o<e.bottom,r=p()+o>e.left&&-o<e.right;return"vertical"===i?s:"horizontal"===i?r:s&&r}function p(){return w>=0?w:w=o(t).width()}function m(){return E>=0?E:E=o(t).height()}function g(t){return t.tagName.toLowerCase()}function v(t,e){if(e){var i=t.split(",");t="";for(var n=0,o=i.length;n<o;n++)t+=e+i[n].trim()+(n!==o-1?",":"")}return t}function y(){--b,s.length||b||_("onFinishedAll")}function _(t,e,o){return!!(t=n[t])&&(t.apply(i,[].slice.call(arguments,1)),!0)}var b=0,w=-1,E=-1,S=!1,C="afterLoad",I="load",x="error",T="img",A="src",k="srcset",D="sizes",z="background-image";"event"===n.bind||r?c():o(t).on(I+"."+l,c)}function n(n,r){var a=this,l=o.extend({},a.config,r),c={},h=l.name+"-"+ ++s;return a.config=function(t,i){return i===e?l[t]:(l[t]=i,a)},a.addItems=function(t){return c.a&&c.a("string"===o.type(t)?o(t):t),a},a.getItems=function(){return c.g?c.g():{}},a.update=function(t){return c.e&&c.e({},!t),a},a.force=function(t){return c.f&&c.f("string"===o.type(t)?o(t):t),a},a.loadAll=function(){return c.e&&c.e({all:!0},!0),a},a.destroy=function(){return o(l.appendScroll).off("."+h,c.e),o(t).off("."+h),c={},e},i(a,l,n,c,h),l.chainable?n:a}var o=t.jQuery||t.Zepto,s=0,r=!1;o.fn.Lazy=o.fn.lazy=function(t){return new n(this,t)},o.Lazy=o.lazy=function(t,i,s){if(o.isFunction(i)&&(s=i,i=[]),o.isFunction(s)){t=o.isArray(t)?t:[t],i=o.isArray(i)?i:[i];for(var r=n.prototype.config,a=r._f||(r._f={}),l=0,c=t.length;l<c;l++)(r[t[l]]===e||o.isFunction(r[t[l]]))&&(r[t[l]]=s);for(var h=0,u=i.length;h<u;h++)a[i[h]]=t[0]}},n.prototype.config={name:"lazy",chainable:!0,autoDestroy:!0,bind:"load",threshold:500,visibleOnly:!1,appendScroll:t,scrollDirection:"both",imageBase:null,defaultImage:"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",placeholder:null,delay:-1,combined:!1,attribute:"data-src",srcsetAttribute:"data-srcset",sizesAttribute:"data-sizes",retinaAttribute:"data-retina",loaderAttribute:"data-loader",imageBaseAttribute:"data-imagebase",removeAttribute:!0,handledName:"handled",loadedName:"loaded",effect:"show",effectTime:0,enableThrottle:!0,throttle:250,beforeLoad:e,afterLoad:e,onError:e,onFinishedAll:e},o(t).on("load",function(){r=!0})}(window),function(){"use strict";function t(n){if(!n)throw new Error("No options passed to Waypoint constructor");if(!n.element)throw new Error("No element option passed to Waypoint constructor");if(!n.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,n),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=n.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),i[this.key]=this,e+=1}var e=0,i={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete i[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var n in i)e.push(i[n]);for(var o=0,s=e.length;s>o;o++)e[o][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){for(var e in t.Context.refreshAll(),i)i[e].enabled=!0;return this},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=o.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+i,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,n[t.waypointContextKey]=this,i+=1,o.windowContext||(o.windowContext=!0,o.windowContext=new e(window)),this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var i=0,n={},o=window.Waypoint,s=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical),i=this.element==this.element.window;t&&e&&!i&&(this.adapter.off(".waypoints"),delete n[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,o.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||o.isTouch)&&(e.didScroll=!0,o.requestAnimationFrame(t))})},e.prototype.handleResize=function(){o.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var i in e){var n=e[i],o=n.newScroll>n.oldScroll?n.forward:n.backward;for(var s in this.waypoints[i]){var r=this.waypoints[i][s];if(null!==r.triggerPoint){var a=n.oldScroll<r.triggerPoint,l=n.newScroll>=r.triggerPoint;(a&&l||!a&&!l)&&(r.queueTrigger(o),t[r.group.id]=r.group)}}}for(var c in t)t[c].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?o.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?o.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var i in this.waypoints[e])t.push(this.waypoints[e][i]);for(var n=0,o=t.length;o>n;n++)t[n].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,i=e?void 0:this.adapter.offset(),n={};for(var s in this.handleScroll(),t={horizontal:{contextOffset:e?0:i.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:i.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}}){var r=t[s];for(var a in this.waypoints[s]){var l,c,h,u,d=this.waypoints[s][a],f=d.options.offset,p=d.triggerPoint,m=0,g=null==p;d.element!==d.element.window&&(m=d.adapter.offset()[r.offsetProp]),"function"==typeof f?f=f.apply(d):"string"==typeof f&&(f=parseFloat(f),d.options.offset.indexOf("%")>-1&&(f=Math.ceil(r.contextDimension*f/100))),l=r.contextScroll-r.contextOffset,d.triggerPoint=Math.floor(m+l-f),c=p<r.oldScroll,h=d.triggerPoint>=r.oldScroll,u=!c&&!h,!g&&(c&&h)?(d.queueTrigger(r.backward),n[d.group.id]=d.group):!g&&u?(d.queueTrigger(r.forward),n[d.group.id]=d.group):g&&r.oldScroll>=d.triggerPoint&&(d.queueTrigger(r.forward),n[d.group.id]=d.group)}}return o.requestAnimationFrame(function(){for(var t in n)n[t].flushTriggers()}),this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in n)n[t].refresh()},e.findByElement=function(t){return n[t.waypointContextKey]},window.onload=function(){s&&s(),e.refreshAll()},o.requestAnimationFrame=function(e){(window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t).call(window,e)},o.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),n[this.axis][this.name]=this}var n={vertical:{},horizontal:{}},o=window.Waypoint;i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var i in this.triggerQueues){var n=this.triggerQueues[i],o="up"===i||"left"===i;n.sort(o?e:t);for(var s=0,r=n.length;r>s;s+=1){var a=n[s];(a.options.continuous||s===n.length-1)&&a.trigger([i])}}this.clearTriggerQueues()},i.prototype.next=function(e){this.waypoints.sort(t);var i=o.Adapter.inArray(e,this.waypoints);return i===this.waypoints.length-1?null:this.waypoints[i+1]},i.prototype.previous=function(e){this.waypoints.sort(t);var i=o.Adapter.inArray(e,this.waypoints);return i?this.waypoints[i-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=o.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return n[t.axis][t.name]||new i(t)},o.Group=i}(),function(){"use strict";function t(t){this.$element=e(t)}var e=window.jQuery,i=window.Waypoint;e.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(e,i){t.prototype[i]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[i].apply(this.$element,t)}}),e.each(["extend","inArray","isEmptyObject"],function(i,n){t[n]=e[n]}),i.adapters.push({name:"jquery",Adapter:t}),i.Adapter=t}(),function(){"use strict";function t(t){return function(){var i=[],n=arguments[0];return t.isFunction(arguments[0])&&((n=t.extend({},arguments[1])).handler=arguments[0]),this.each(function(){var o=t.extend({},n,{element:this});"string"==typeof o.context&&(o.context=t(this).closest(o.context)[0]),i.push(new e(o))}),i}}var e=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}();
//----------------------------------------------------/
//
//      POLO - HTML5 Template
//      Author: INSPIRO - Ardian Berisha
//      Version: v5.9.6
//      Update: January 23, 2020
//
//----------------------------------------------------/
//INSPIRO Global var
var INSPIRO = {},
    $ = jQuery.noConflict();
(function($) {
    "use strict";
    // Predefined Global Variables
    var $window = $(window),
        $theme_color = '#2250fc',
        //Main
        $body = $('body'),
        $bodyInner = $('.body-inner'),
        $section = $('section'),
        //Header
        $topbar = $('#topbar'),
        $header = $('#header'),
        $headerCurrentClasses = $header.attr('class'),
        //Logo
        headerLogo = $('#logo'),
        //Menu
        $mainMenu = $('#mainMenu'),
        $mainMenuTriggerBtn = $("#mainMenu-trigger a, #mainMenu-trigger button"),
        $pageMenu = $('.page-menu'),
        //Slider
        $slider = $('#slider'),
        $inspiroSlider = $('.inspiro-slider'),
        $carousel = $('.carousel'),
        /*Grid Layout*/
        $gridLayout = $(".grid-layout"),
        $gridFilter = $(".grid-filter"),
        windowWidth = $window.width();
    if ($gridFilter.length > 0) {
        $gridFilter = $gridFilter;
    } else {
        $gridFilter = $(".page-grid-filter");
    }
    //Check if header exist
    if ($header.length > 0) {
        var $headerOffsetTop = $header.offset().top;
    }
    var Events = {
            browser: {
                isMobile: function() {
                    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        }
        //Settings
    var Settings = {
            isMobile: Events.browser.isMobile,
            submenuLight: $header.hasClass('submenu-light') == true ? true : false,
            menuIsOpen: false,
            menuOverlayOpened: false
        }
        //Window breakpoints
    $(window).breakpoints({
        breakpoints: [{
            "name": "xs",
            "width": 0
        }, {
            "name": "sm",
            "width": 576
        }, {
            "name": "md",
            "width": 768
        }, {
            "name": "lg",
            "width": 1025
        }, {
            "name": "xl",
            "width": 1200
        }]
    });
    var currentBreakpoint = $(window).breakpoints("getBreakpoint");
    $body.addClass('breakpoint-' + currentBreakpoint);
    $(window).bind("breakpoint-change", function(breakpoint) {
        $body.removeClass('breakpoint-' + breakpoint.from);
        $body.addClass('breakpoint-' + breakpoint.to);
    });
    $(window).breakpoints("greaterEqualTo", "lg", function() {
        $body.addClass('b--desktop');
        $body.removeClass('b--responsive');
    });
    $(window).breakpoints("lessThan", "lg", function() {
        $body.removeClass('b--desktop');
        $body.addClass('b--responsive');
    });
    INSPIRO.core = {
        functions: function() {
            INSPIRO.core.scrollTop();
            INSPIRO.core.rtlStatus();
            INSPIRO.core.rtlStatusActivate();
            INSPIRO.core.equalize();
            INSPIRO.core.customHeight();
            INSPIRO.core.darkTheme();
        },
        scrollTop: function() {
            var $scrollTop = $('#scrollTop');
            if ($scrollTop.length > 0) {
                var scrollOffset = $body.attr('data-offset') || 400;
                if ($window.scrollTop() > scrollOffset) {
                    if ($body.hasClass("frame")) {
                        $scrollTop.css({
                            'bottom': '46px',
                            'opacity': 1,
                            'z-index': 199
                        });
                    } else {
                        $scrollTop.css({
                            'bottom': '26px',
                            'opacity': 1,
                            'z-index': 199
                        });
                    }
                } else {
                    $scrollTop.css({
                        'bottom': '16px',
                        'opacity': 0
                    });
                }
                $scrollTop.off('click').on('click', function() {
                    $('body,html').stop(true).animate({
                        'scrollTop': 0
                    }, 1000, 'easeInOutExpo');
                    return false;
                });
            }
        },
        rtlStatus: function() {
            var $rtlStatusCheck = $("html").attr("dir");
            if ($rtlStatusCheck == "rtl") {
                return true;
            }
            return false;
        },
        rtlStatusActivate: function() {
            if (INSPIRO.core.rtlStatus() == true) {
                $('head').append('<link rel="stylesheet" type="text/css" href="css/rtl.css">');
            }
        },
        equalize: function() {
            var $equalize = $('.equalize');
            if ($equalize.length > 0) {
                $equalize.each(function() {
                    var elem = $(this),
                        selectorItem = elem.find(elem.attr('data-equalize-item')) || "> div",
                        maxHeight = 0;
                    selectorItem.each(function() {
                        if ($(this).outerHeight(true) > maxHeight) {
                            maxHeight = $(this).outerHeight(true);
                        }
                    });
                    selectorItem.height(maxHeight);
                });
            }
        },
        customHeight: function(setHeight) {
            var $customHeight = $('.custom-height');
            if ($customHeight.length > 0) {
                $customHeight.each(function() {
                    var elem = $(this),
                        elemHeight = elem.attr('data-height') || 400,
                        elemHeightLg = elem.attr('data-height-lg') || elemHeight,
                        elemHeightMd = elem.attr('data-height-md') || elemHeightLg,
                        elemHeightSm = elem.attr('data-height-sm') || elemHeightMd,
                        elemHeightXs = elem.attr('data-height-xs') || elemHeightSm;

                    function customHeightBreakpoint(setHeight) {
                        if (setHeight) {
                            elem = setHeight;
                        }
                        switch ($(window).breakpoints("getBreakpoint")) {
                            case "xs":
                                elem.height(elemHeightXs);
                                break;
                            case "sm":
                                elem.height(elemHeightSm);
                                break;
                            case "md":
                                elem.height(elemHeightMd);
                                break;
                            case "lg":
                                elem.height(elemHeightLg);
                                break;
                            case "xl":
                                elem.height(elemHeight);
                                break;
                        }
                    }
                    customHeightBreakpoint(setHeight);
                    $(window).resize(function() {
                        setTimeout(function() {
                            customHeightBreakpoint(setHeight);
                        }, 100);
                    });
                });
            }
        },
        darkTheme: function(setHeight) {
            if ($body.hasClass("dark")) {
                var $darkElement = $('[data-dark-src]');
                $darkElement.each(function() {
                    var elem = $(this),
                        elemDarkSrc = elem.attr("data-dark-src");
                    if (elemDarkSrc) {
                        elem.attr("src", elemDarkSrc);
                    }
                });
            }
        }
    };
    INSPIRO.header = {
        functions: function() {
            INSPIRO.header.logoStatus();
            INSPIRO.header.stickyHeader();
            INSPIRO.header.topBar();
            INSPIRO.header.search();
            INSPIRO.header.mainMenu();
            INSPIRO.header.mainMenuOverlay();
            INSPIRO.header.pageMenu();
            INSPIRO.header.sidebarOverlay();
            INSPIRO.header.dotsMenu();
            INSPIRO.header.onepageMenu();
        },
        logoStatus: function(status) {
            var headerLogoDefault = headerLogo.find($('.logo-default')),
                headerLogoDark = headerLogo.find($('.logo-dark')),
                headerLogoFixed = headerLogo.find('.logo-fixed'),
                headerLogoResponsive = headerLogo.find('.logo-responsive');

            if ($header.hasClass("header-sticky") && headerLogoFixed.length > 0) {
                headerLogoDefault.css("display", "none");
                headerLogoDark.css("display", "none");
                headerLogoResponsive.css("display", "none");
                headerLogoFixed.css("display", "block");
            } else {
                headerLogoDefault.removeAttr("style")
                headerLogoDark.removeAttr("style");
                headerLogoResponsive.removeAttr("style");
                headerLogoFixed.removeAttr("style");
            }
            $(window).breakpoints("lessThan", "lg", function() {
                if (headerLogoResponsive.length > 0) {
                    headerLogoDefault.css("display", "none");
                    headerLogoDark.css("display", "none");
                    headerLogoFixed.css("display", "none");
                    headerLogoResponsive.css("display", "block");
                }
            });
        },
        stickyHeader: function() {

            var elem = $(this),
                shrinkHeader = elem.attr('data-shrink') || 0,
                shrinkHeaderActive = elem.attr('data-sticky-active') || 200,
                scrollOnTop = $window.scrollTop(),
                darkClassRemoved;

            if ($header.hasClass("header-modern")) {
                shrinkHeader = 300;
            }

            $(window).breakpoints("greaterEqualTo", "lg", function() {

                if (!$header.is(".header-disable-fixed")) {
                    if (scrollOnTop > $headerOffsetTop + shrinkHeader) {
                        $header.addClass('header-sticky');
                        if (scrollOnTop > $headerOffsetTop + shrinkHeaderActive) {
                            $header.addClass('sticky-active');
                            if (Settings.submenuLight) {
                                $header.removeClass('dark');
                                darkClassRemoved = true;
                            }
                            INSPIRO.header.logoStatus();
                        }
                    } else {
                        $header.removeClass().addClass($headerCurrentClasses);
                        INSPIRO.header.logoStatus();
                    }
                }
            });


            $(window).breakpoints("lessThan", "lg", function() {

                if ($header.attr('data-responsive-fixed') == "true") {
                    if (scrollOnTop > $headerOffsetTop + shrinkHeader) {
                        $header.addClass('header-sticky');
                        if (scrollOnTop > $headerOffsetTop + shrinkHeaderActive) {
                            $header.addClass('sticky-active');
                            if (Settings.submenuLight) {
                                $header.removeClass('dark');
                                darkClassRemoved = true;
                            }
                            INSPIRO.header.logoStatus();
                        }
                    } else {
                        $header.removeClass().addClass($headerCurrentClasses);
                        INSPIRO.header.logoStatus();
                    }
                }

            });

        },
        //chkd
        topBar: function() {
            if ($topbar.length > 0) {
                $("#topbar .topbar-dropdown .topbar-form").each(function(index, element) {
                    if ($window.width() - ($(element).width() + $(element).offset().left) < 0) {
                        $(element).addClass('dropdown-invert');
                    }
                });
            }
        },
        search: function() {
            var $search = $('#search');
            if ($search.length > 0) {
                var searchBtn = $('#btn-search'),
                    searchBtnClose = $('#btn-search-close'),
                    searchInput = $search.find('.form-control');

                function openSearch() {
                    $body.addClass('search-open');
                    searchInput.focus();
                }

                function closeSearch() {
                    $body.removeClass('search-open');
                    searchInput.value = '';
                }
                searchBtn.on('click', function() {
                    openSearch();
                    return false;
                });
                searchBtnClose.on('click', function() {
                    closeSearch();
                    return false;
                });
                document.addEventListener('keyup', function(ev) {
                    if (ev.keyCode == 27) {
                        closeSearch();
                    }
                });
            }
        },
        mainMenu: function() {
            if ($mainMenu.length > 0) {
                var $menuItemLinks = $("#mainMenu nav > ul > li.dropdown > a, .dropdown-submenu > a, .dropdown-submenu > span, .page-menu nav > ul > li.dropdown > a"),
                    $triggerButton = $("#mainMenu-trigger a, #mainMenu-trigger button"),
                    darkClassRemoved,
                    processing = false,
                    triggerEvent;
                $triggerButton.on('click', function(e) {
                    var elem = $(this);
                    e.preventDefault();
                    $(window).breakpoints("lessThan", "lg", function() {
                        var openMenu = function() {
                            if (!processing) {
                                processing = true;
                                Settings.menuIsOpen = true;
                                if (Settings.submenuLight) {
                                    $header.removeClass('dark');
                                    darkClassRemoved = true;
                                }
                                elem.addClass('toggle-active');
                                $body.addClass('mainMenu-open');
                                INSPIRO.header.logoStatus();
                                $mainMenu.animate({
                                    'min-height': $window.height()
                                }, {
                                    duration: 500,
                                    easing: "easeInOutQuart",
                                    start: function() {
                                        setTimeout(function() {
                                            $mainMenu.addClass('menu-animate');
                                        }, 300);
                                    },
                                    complete: function() {
                                        processing = false;
                                    }
                                });
                            }
                        };
                        var closeMenu = function() {
                            if (!processing) {
                                processing = true;
                                Settings.menuIsOpen = false;
                                INSPIRO.header.logoStatus();
                                $mainMenu.animate({
                                    'min-height': 0
                                }, {
                                    start: function() {
                                        $mainMenu.removeClass('menu-animate');
                                    },
                                    done: function() {
                                        $body.removeClass('mainMenu-open');
                                        elem.removeClass('toggle-active');
                                        if (Settings.submenuLight && darkClassRemoved) {
                                            $header.addClass('dark');
                                        }
                                    },
                                    duration: 500,
                                    easing: "easeInOutQuart",
                                    complete: function() {
                                        processing = false;
                                    }
                                });
                            }
                        };
                        if (!Settings.menuIsOpen) {
                            triggerEvent = openMenu();
                        } else {
                            triggerEvent = closeMenu();
                        }
                    });
                });
                $menuItemLinks.on('click', function(e) {
                    $(this).parent('li').siblings().removeClass('hover-active');
                    $(this).parent('li').toggleClass('hover-active');
                    e.stopPropagation();
                    e.preventDefault();
                });
                $body.on('click', function(e) {
                    $mainMenu.find('.hover-active').removeClass('hover-active');
                });
                /*invert menu fix*/
                $(window).breakpoints("greaterEqualTo", "lg", function() {
                    var $menuLastItem = $("nav > ul > li:last-child"),
                        $menuLastItemUl = $("nav > ul > li:last-child > ul"),
                        $menuLastInvert = $menuLastItemUl.width() - $menuLastItem.width(),
                        $menuItems = $("nav > ul > li").find(".dropdown-menu");
                    $menuItems.css('display', 'block');
                    $('.dropdown:not(.mega-menu-item) ul ul').each(function(index, element) {
                        if ($window.width() - ($(element).width() + $(element).offset().left) < 0) {
                            $(element).addClass('menu-invert');
                        }
                    });
                    if ($window.width() - ($menuLastItemUl.width() + $menuLastItem.offset().left) < 0) {
                        $menuLastItemUl.addClass('menu-last');
                    }
                    $menuItems.css('display', '');
                });
            }
        },
        mainMenuOverlay: function() {},
        /*Page Menu*/
        pageMenu: function() {
            if ($pageMenu.length > 0) {
                $pageMenu.each(function() {
                    $(this).find("#pageMenu-trigger").on("click", function() {
                        $pageMenu.toggleClass("page-menu-active");
                        $pageMenu.toggleClass("items-visible");
                    });
                });
            }
        },
        sidebarOverlay: function() {
            var sidebarOverlay = $('#side-panel');
            if (sidebarOverlay.length > 0) {
                sidebarOverlay.css("opacity", 1);
                $("#close-panel").on("click", function() {
                    $body.removeClass("side-panel-active");
                    $("#side-panel-trigger").removeClass("toggle-active");
                });
            }
        },
        dotsMenu: function() {
            var $dotsMenu = $('#dotsMenu'),
                $dotsMenuItems = $dotsMenu.find("ul > li > a");
            if ($dotsMenu.length > 0) {
                $dotsMenuItems.on('click', function() {
                    $dotsMenuItems.parent("li").removeClass('current');
                    $(this).parent("li").addClass('current');
                    return false;
                });
                $dotsMenuItems.parents("li").removeClass('current');
                $dotsMenu.find('a[href="#' + INSPIRO.header.currentSection() + '"]').parent("li").addClass('current');
            }
        },
        onepageMenu: function() {
            if ($mainMenu.hasClass("menu-one-page")) {
                var $currentMenuItem = "current";
                $(window).on("scroll", function() {
                    var $currentSection = INSPIRO.header.currentSection();
                    $mainMenu.find("nav > ul > li > a").parents("li").removeClass($currentMenuItem);
                    $mainMenu.find('nav > ul > li > a[href="#' + $currentSection + '"]').parent("li").addClass($currentMenuItem);
                });
            }
        },
        currentSection: function() {
            var elemCurrent = "body";
            $section.each(function() {
                var elem = $(this),
                    elemeId = elem.attr("id");
                if ((elem.offset().top - $window.height() / 3 < $window.scrollTop()) && (elem.offset().top + elem.height() - $window.height() / 3 > $window.scrollTop())) {
                    elemCurrent = elemeId;
                }
            });
            return elemCurrent;
        }
    };
    INSPIRO.slider = {
        functions: function() {
            INSPIRO.slider.inspiroSlider();
            INSPIRO.slider.carousel();
        },
        inspiroSlider: function() {
            if ($inspiroSlider.length > 0) {
                //Check if flickity plugin is loaded
                if (typeof $.fn.flickity === 'undefined') {
                    INSPIRO.elements.notification("Warning", "jQuery flickity slider plugin is missing in plugins.js file.", "danger")
                    return true;
                }
                var defaultAnimation = "fadeInUp";

                function animate_captions($elem) {
                    var $captions = $elem;
                    $captions.each(function() {
                        var $captionElem = $(this),
                            animationDuration = "600ms";
                        if ($(this).attr("data-animate-duration")) {
                            animationDuration = $(this).attr("data-animate-duration") + "ms";
                        }
                        $captionElem.css({
                            opacity: 0
                        });
                        $(this).css("animation-duration", animationDuration);
                    });
                    $captions.each(function(index) {
                        var $captionElem = $(this),
                            captionDelay = $captionElem.attr("data-caption-delay") || (index * 350 + 1000),
                            captionAnimation = $captionElem.attr('data-caption-animate') || defaultAnimation;
                        var t = setTimeout(function() {
                            $captionElem.css({
                                opacity: 1
                            });
                            $captionElem.addClass(captionAnimation);
                        }, captionDelay);
                    });
                }

                function hide_captions($elem) {
                    var $captions = $elem;
                    $captions.each(function(caption) {
                        var caption = $(this),
                            captionAnimation = caption.attr('data-caption-animate') || defaultAnimation;
                        caption.removeClass(captionAnimation);
                        caption.removeAttr('style');
                    });
                }

                function start_kenburn(elem) {
                    var currentSlide = elem.find('.slide.is-selected'),
                        currentSlideKenburns = currentSlide.hasClass("kenburns");
                    if (currentSlideKenburns) {
                        setTimeout(function() {
                            currentSlide.find(".kenburns-bg").addClass("kenburns-bg-animate");
                        }, 1500);
                    }
                }

                function stop_kenburn(elem) {
                    var notCurrentSlide = elem.find('.slide:not(.is-selected)');
                    notCurrentSlide.find(".kenburns-bg").removeClass("kenburns-bg-animate");
                }

                function slide_dark(elem) {
                    var $sliderClassSlide = elem.find(".slide.is-selected");
                    if ($sliderClassSlide.hasClass("slide-dark")) {
                        $header.removeClass('dark').addClass("dark-removed");
                    } else {
                        if (!$header.hasClass("sticky-active") && $header.hasClass("dark-removed")) {
                            $header.addClass('dark').removeClass("dark-removed");
                        }
                    }
                }

                function sliderHeight(elem, state) {
                    var elem,
                        headerHeight = $header.outerHeight(),
                        topbarHeight = $topbar.outerHeight() || 0,
                        windowHeight = $window.height(),
                        sliderCurrentHeight = elem.height(),
                        screenHeightExtra = headerHeight + topbarHeight,
                        $sliderClassSlide = elem.find(".slide"),
                        sliderFullscreen = elem.hasClass('slider-fullscreen'),
                        screenRatio = elem.hasClass('slider-halfscreen') ? 1 : 1.2,
                        transparentHeader = $header.attr('data-transparent'),
                        customHeight = elem.attr("data-height"),
                        responsiveHeightXs = elem.attr("data-height-xs"),
                        containerFullscreen = elem.find(".container").first().outerHeight(),
                        contentCrop;
                    if (containerFullscreen >= windowHeight) {
                        contentCrop = true;
                        var sliderMinHeight = containerFullscreen;
                        elem.css('min-height', sliderMinHeight + 100);
                        $sliderClassSlide.css('min-height', sliderMinHeight + 100);
                        elem.find('.flickity-viewport').css('min-height', sliderMinHeight + 100);
                    }
                    sliderElementsHeight('null');

                    function sliderElementsHeight(height) {
                        if (height == 'null') {
                            elem.css('height', '');
                            $sliderClassSlide.css('height', '');
                            elem.find('.flickity-viewport').css('height', '');
                        } else {
                            elem.css('height', height);
                            $sliderClassSlide.css('height', height);
                            elem.find('.flickity-viewport').css('height', height);
                        }
                    }
                    if (customHeight) {
                        $(window).breakpoints("greaterEqualTo", "lg", function() {
                            sliderElementsHeight(customHeight + "px");
                        });
                    }
                }
                $inspiroSlider.each(function() {
                    var elem = $(this);
                    //Plugin Options
                    elem.options = {
                        cellSelector: elem.attr('data-item') || false,
                        prevNextButtons: elem.data('arrows') == false ? false : true,
                        pageDots: elem.data('dots') == false ? false : true,
                        fade: elem.data('fade') == true ? true : false,
                        draggable: elem.data('drag') == true ? true : false,
                        freeScroll: elem.data('free-scroll') == true ? true : false,
                        wrapAround: elem.data('loop') == false ? false : true,
                        groupCells: elem.data('group-cells') == true ? true : false,
                        autoPlay: elem.attr('data-autoplay') || 7000,
                        pauseAutoPlayOnHover: elem.data('hoverpause') == true ? true : false,
                        adaptiveHeight: elem.data('adaptive-height') == false ? false : false,
                        asNavFor: elem.attr('data-navigation') || false,
                        selectedAttraction: elem.attr('data-attraction') || .07,
                        friction: elem.attr('data-friction') || .9,
                        initialIndex: elem.attr('data-initial-index') || 0,
                        accessibility: elem.data('accessibility') == true ? true : false,
                        setGallerySize: elem.data('gallery-size') == false ? false : false,
                        resize: elem.data('resize') == false ? false : false,
                        cellAlign: elem.attr('data-align') || 'left',
                        playWholeVideo: elem.attr('data-play-whole-video') == false ? false : true
                    };
                    //Kenburns effect
                    elem.find('.slide').each(function() {
                        if ($(this).hasClass("kenburns")) {
                            var elemChild = $(this),
                                elemChildImage = elemChild.css('background-image').replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '');

                            if (elemChild.attr('data-bg-image')) {
                                elemChildImage = elemChild.attr('data-bg-image');
                            }
                            elemChild.prepend('<div class="kenburns-bg" style="background-image:url(' + elemChildImage + ')"></div>');
                        }
                    });
                    elem.find(".slide video").each(function() {
                        this.pause();
                    });
                    if (elem.find('.slide').length <= 1) {
                        elem.options.prevNextButtons = false;
                        elem.options.pageDots = false;
                    }

                    $(window).breakpoints("lessThan", "lg", function() {
                        elem.options.draggable = true;
                    });

                    if (!$.isNumeric(elem.options.autoPlay) && elem.options.autoPlay != false) {
                        elem.options.autoPlay = Number(7000);
                    }

                    var inspiroSliderData = elem.flickity({
                        cellSelector: elem.options.cellSelector,
                        prevNextButtons: elem.options.prevNextButtons,
                        pageDots: elem.options.pageDots,
                        fade: elem.options.fade,
                        draggable: elem.options.draggable,
                        freeScroll: elem.options.freeScroll,
                        wrapAround: elem.options.wrapAround,
                        groupCells: elem.options.groupCells,
                        autoPlay: Number(elem.options.autoPlay),
                        pauseAutoPlayOnHover: elem.options.pauseAutoPlayOnHover,
                        adaptiveHeight: elem.options.adaptiveHeight,
                        asNavFor: elem.options.asNavFor,
                        selectedAttraction: Number(elem.options.selectedAttraction),
                        friction: elem.options.friction,
                        initialIndex: elem.options.initialIndex,
                        accessibility: elem.options.accessibility,
                        setGallerySize: elem.options.setGallerySize,
                        resize: elem.options.resize,
                        cellAlign: elem.options.cellAlign,
                        rightToLeft: INSPIRO.core.rtlStatus(),
                        on: {
                            ready: function(index) {
                
                                var $captions = elem.find('.slide.is-selected .slide-captions > *');
                                sliderHeight(elem);
                                start_kenburn(elem);
                                animate_captions($captions);    
                               setTimeout(function(){
                                elem.find(".slide video").each(function (i, video) {
                                    video.pause();
                                    video.currentTime = 0;
                                })
                               },700);;
                            },
                        }
                    });

                    var flkty = inspiroSliderData.data('flickity');

                    inspiroSliderData.on('change.flickity', function() {
                        var $captions = elem.find('.slide.is-selected .slide-captions > *');
                        hide_captions($captions);
                        setTimeout(function() {
                            stop_kenburn(elem);
                        }, 500);
                        slide_dark(elem);
                        start_kenburn(elem);
                        animate_captions($captions);
                        elem.find(".slide video").each(function (i, video) {
                            video.currentTime = 0;
                        });
                    });

                    inspiroSliderData.on('select.flickity', function() {
                        INSPIRO.elements.backgroundImage();
                        var $captions = elem.find('.slide.is-selected .slide-captions > *');
                        sliderHeight(elem);
                        start_kenburn(elem);
                        animate_captions($captions);
                        var video = flkty.selectedElement.querySelector('video');
                        if (video) {
                            video.play();
                            flkty.options.autoPlay = Number(video.duration * 1000);
                        } else {
                            flkty.options.autoPlay = Number(elem.options.autoPlay);
                        }
                    });
                    inspiroSliderData.on('dragStart.flickity', function() {
                        var $captions = elem.find('.slide:not(.is-selected) .slide-captions > *');
                        hide_captions($captions);
                    });
                    $(window).resize(function() {
                        sliderHeight(elem);
                        elem.flickity('reposition');
                    });
                });
            }
        },
        carouselAjax: function() {
            //Check if flickity plugin is loaded
            if (typeof $.fn.flickity === 'undefined') {
                INSPIRO.elements.notification("Warning", "jQuery flickity plugin is missing in plugins.js file.", "danger")
                return true;
            }
            //Plugin Options
            var elem = $(".carousel");
            //Initializing plugin and passing the options

            var $carouselAjax = $(elem).imagesLoaded(function() {
                // init Isotope after all images have loaded
                $carouselAjax.flickity({
                    adaptiveHeight: false,
                    wrapAround: true,
                    cellAlign: 'left',
                    resize: true,
                });
                elem.addClass("carousel-loaded");
            });
        },
        carousel: function(elem) {
            if (elem) {
                $carousel = elem;
            }

            if ($carousel.length > 0) {
                //Check if flickity plugin is loaded
                if (typeof $.fn.flickity === 'undefined') {
                    INSPIRO.elements.notification("Warning", "jQuery flickity plugin is missing in plugins.js file.", "danger")
                    return true;
                }
                $carousel.each(function() {
                    var elem = $(this);
                    //Plugin Options
                    elem.options = {
                        containerWidth: elem.width(),
                        items: elem.attr('data-items') || 4,
                        itemsLg: elem.attr('data-items-lg'),
                        itemsMd: elem.attr('data-items-md'),
                        itemsSm: elem.attr('data-items-sm'),
                        itemsXs: elem.attr('data-items-xs'),
                        margin: elem.attr('data-margin') || 10,
                        cellSelector: elem.attr('data-item') || false,
                        prevNextButtons: elem.data('arrows') == false ? false : true,
                        pageDots: elem.data('dots') == false ? false : true,
                        fade: elem.data('fade') == true ? true : false,
                        draggable: elem.data('drag') == false ? false : true,
                        freeScroll: elem.data('free-scroll') == true ? true : false,
                        wrapAround: elem.data('loop') == false ? false : true,
                        groupCells: elem.data('group-cells') == true ? true : false,
                        autoPlay: elem.attr('data-autoplay') || 5000,
                        pauseAutoPlayOnHover: elem.data('hover-pause') == false ? false : true,
                        asNavFor: elem.attr('data-navigation') || false,
                        lazyLoad: elem.data('lazy-load') == true ? true : false,
                        initialIndex: elem.attr('data-initial-index') || 0,
                        accessibility: elem.data('accessibility') == true ? true : false,
                        adaptiveHeight: elem.data('adaptive-height') == true ? true : false,
                        autoWidth: elem.data('auto-width') == true ? true : false,
                        setGallerySize: elem.data('gallery-size') == false ? false : true,
                        resize: elem.data('resize') == false ? false : true,
                        cellAlign: elem.attr('data-align') || 'left',
                        rightToLeft: INSPIRO.core.rtlStatus(),
                    };

                    //Calculate min/max on responsive breakpoints
                    elem.options.itemsLg = elem.options.itemsLg || Math.min(Number(elem.options.items), Number(4));
                    elem.options.itemsMd = elem.options.itemsMd || Math.min(Number(elem.options.itemsLg), Number(3));
                    elem.options.itemsSm = elem.options.itemsSm || Math.min(Number(elem.options.itemsMd), Number(2));
                    elem.options.itemsXs = elem.options.itemsXs || Math.min(Number(elem.options.itemsSm), Number(1));
                    var setResponsiveColumns;

                    function getCarouselColumns() {
                        switch ($(window).breakpoints("getBreakpoint")) {
                            case "xs":
                                setResponsiveColumns = Number(elem.options.itemsXs);
                                break;
                            case "sm":
                                setResponsiveColumns = Number(elem.options.itemsSm);
                                break;
                            case "md":
                                setResponsiveColumns = Number(elem.options.itemsMd);
                                break;
                            case "lg":
                                setResponsiveColumns = Number(elem.options.itemsLg);
                                break;
                            case "xl":
                                setResponsiveColumns = Number(elem.options.items);
                                break;
                        }
                    }
                    getCarouselColumns();
                    var itemWidth;
                    elem.find("> *").wrap('<div class="polo-carousel-item">');
                    if (elem.hasClass("custom-height")) {
                        elem.options.setGallerySize = false;
                        INSPIRO.core.customHeight(elem);
                        INSPIRO.core.customHeight(elem.find(".polo-carousel-item"));
                        var carouselCustomHeightStatus = true;
                    }
                    if (Number(elem.options.items) !== 1) {
                        if (elem.options.autoWidth || carouselCustomHeightStatus) {
                            elem.find(".polo-carousel-item").css({
                                'padding-right': elem.options.margin + 'px'
                            });
                        } else {
                            itemWidth = ((elem.options.containerWidth + Number(elem.options.margin)) / setResponsiveColumns);
                            elem.find(".polo-carousel-item").css({
                                'width': itemWidth,
                                'padding-right': elem.options.margin + 'px'
                            });
                        }
                    } else {
                        elem.find(".polo-carousel-item").css({
                            'width': '100%',
                            'padding-right': '0 !important;',
                        });
                    }
                    if (elem.options.autoWidth || carouselCustomHeightStatus) {
                        elem.options.cellAlign = 'center';
                    }

                    if (elem.options.autoPlay == "false") {
                        elem.options.autoPlay = false
                    }
                    //Initializing plugin and passing the options
                    var $carouselElem = $(elem);
                    //   .imagesLoaded(function() {
                    // init Isotope after all images have loaded
                    $carouselElem.flickity({
                        cellSelector: elem.options.cellSelector,
                        prevNextButtons: elem.options.prevNextButtons,
                        pageDots: elem.options.pageDots,
                        fade: elem.options.fade,
                        draggable: elem.options.draggable,
                        freeScroll: elem.options.freeScroll,
                        wrapAround: elem.options.wrapAround,
                        groupCells: elem.options.groupCells,
                        autoPlay: elem.options.autoPlay,
                        pauseAutoPlayOnHover: elem.options.pauseAutoPlayOnHover,
                        adaptiveHeight: elem.options.adaptiveHeight,
                        asNavFor: elem.options.asNavFor,
                        initialIndex: elem.options.initialIndex,
                        accessibility: elem.options.accessibility,
                        setGallerySize: elem.options.setGallerySize,
                        resize: elem.options.resize,
                        cellAlign: elem.options.cellAlign,
                        rightToLeft: elem.options.rightToLeft,
                        contain: true
                    });
                    elem.addClass("carousel-loaded");
                    //  });
                    if (elem.hasClass("custom-height")) {
                        INSPIRO.core.customHeight(elem);
                    }
                    if (Number(elem.options.items) !== 1) {
                        $(window).on('resize', function() {
                            setTimeout(function() {
                                getCarouselColumns();
                                itemWidth = ((elem.width() + Number(elem.options.margin)) / setResponsiveColumns);
                                if (elem.options.autoWidth || carouselCustomHeightStatus) {
                                    elem.find(".polo-carousel-item").css({
                                        'padding-right': elem.options.margin + 'px'
                                    });
                                } else {
                                    if (!elem.hasClass("custom-height")) {
                                        elem.find(".polo-carousel-item").css({
                                            'width': itemWidth,
                                            'padding-right': elem.options.margin + 'px'
                                        });
                                    } else {
                                        INSPIRO.core.customHeight(elem.find(".polo-carousel-item"));
                                        elem.find(".polo-carousel-item").css({
                                            'width': itemWidth,
                                            'padding-right': elem.options.margin + 'px'
                                        });
                                    }
                                }
                                elem.find(".flickity-slider").css({
                                    'margin-right': -elem.options.margin / (setResponsiveColumns) + 'px'
                                });
                                elem.flickity('reposition');
                            }, 100);
                        });
                    }
                });
            }
        },
    };
    INSPIRO.elements = {
        functions: function() {
            INSPIRO.elements.naTo();
            INSPIRO.elements.morphext();
            INSPIRO.elements.buttons();
            INSPIRO.elements.accordion();
            INSPIRO.elements.animations();
            INSPIRO.elements.parallax();
            INSPIRO.elements.backgroundImage();
            INSPIRO.elements.shapeDivider();
            INSPIRO.elements.responsiveVideos();
            INSPIRO.elements.counters();
            INSPIRO.elements.countdownTimer();
            INSPIRO.elements.progressBar();
            INSPIRO.elements.pieChart();
            INSPIRO.elements.maps();
            INSPIRO.elements.gridLayout();
            INSPIRO.elements.tooltip();
            INSPIRO.elements.popover();
            INSPIRO.elements.magnificPopup();
            INSPIRO.elements.yTPlayer();
            INSPIRO.elements.vimeoPlayer();
            INSPIRO.elements.modal();
            INSPIRO.elements.sidebarFixed();
            INSPIRO.elements.clipboard();
            INSPIRO.elements.bootstrapSwitch();
            INSPIRO.elements.countdown();
            INSPIRO.elements.other();
            INSPIRO.elements.videoBackground();
            INSPIRO.elements.forms();
            INSPIRO.elements.formValidation();
            INSPIRO.elements.formAjaxProcessing();
            INSPIRO.elements.wizard();
        },
        forms: function() {
            //Show hide password
            var $showHidePassword = $('.show-hide-password');
            if ($showHidePassword.length > 0) {
                $showHidePassword.each(function() {
                    var elem = $(this),
                        $iconEye = 'icon-eye11',
                        $iconClosedEye = 'icon-eye-off',
                        elemShowHideIcon = elem.find('.input-group-append i'),
                        elemInput = elem.children('input');
                    elem.find('.input-group-append i').css({
                        'cursor': 'pointer'
                    });
                    elemShowHideIcon.on('click', function(event) {
                        event.preventDefault();
                        if (elem.children('input').attr("type") == "text") {
                            elemInput.attr('type', 'password');
                            elemShowHideIcon.removeClass($iconEye);
                            elemShowHideIcon.addClass($iconClosedEye);
                        } else if (elem.children('input').attr("type") == "password") {
                            elemInput.attr('type', 'text');
                            elemShowHideIcon.addClass($iconEye);
                            elemShowHideIcon.removeClass($iconClosedEye);
                        }
                    });
                })
            }
        },
        formValidation: function() {
            var forms = document.getElementsByClassName('needs-validation');
            var validation = Array.prototype.filter.call(forms, function(form) {
                form.addEventListener('submit', function(event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.classList.add('was-validated');
                }, false);
            });
        },
        formAjaxProcessing: function() {
            var $ajaxForm = $(".widget-contact-form, .ajax-form");
            if ($ajaxForm.length > 0) {
                $ajaxForm.each(function() {
                    var elem = $(this),
                        elemSuccessMessage = elem.attr('data-success-message') || "We have <strong>successfully</strong> received your Message and will get Back to you as soon as possible.",
                        elemCustomRedirectPage = elem.attr('data-success-page');
                    var button = elem.find('button#form-submit'),
                        buttonText = button.html();
                    var validation = Array.prototype.filter.call(elem, function(form) {
                        form.addEventListener('submit', function(event) {
                            if (form[0].checkValidity() === false) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                            form.classList.add('was-validated');
                            return false;
                        }, false);
                    });
                    elem.submit(function(event) {
                        event.preventDefault();
                        var post_url = $(this).attr("action");
                        var request_method = $(this).attr("method");
                        var form_data = $(this).serialize();
                        if (elem[0].checkValidity() === false) {
                            event.stopPropagation();
                            elem.addClass('was-validated');
                        } else {
                            $(elem).removeClass("was-validated");
                            button.html('<i class="icon-loader fa-spin"> </i> Sending...');
                            $.ajax({
                                url: post_url,
                                type: request_method,
                                data: form_data,
                                success: function(text) {
                                    if (text.response == 'success') {
                                        if (elem.find('.g-recaptcha').children('div').length > 0) {
                                            grecaptcha.reset();
                                        }
                                        $(elem)[0].reset();
                                        button.html(buttonText);
                                        if (elemCustomRedirectPage) {
                                            window.location.href = elemCustomRedirectPage;
                                        } else {
                                            $.notify({
                                                message: elemSuccessMessage
                                            }, {
                                                type: 'success'
                                            });
                                        }
                                    } else {
                                        $.notify({
                                            message: elem.attr('data-error-message') || text.message
                                        }, {
                                            type: 'danger'
                                        });
                                        var t = setTimeout(function() {
                                            button.html(buttonText);
                                        }, 1000);
                                    }
                                }
                            });
                        }
                    });
                });
            }
        },
        wizard: function() {
            //Show hide password
        },
        other: function(context) {
            //Lazy Load
            $(function() {
                $('.lazy').Lazy({
                    afterLoad: function(element) {
                        element.addClass("img-loaded")
                    },
                });
            });
            if ($(".toggle-item").length > 0) {
                $(".toggle-item").each(function() {
                    var elem = $(this),
                        toggleItemClass = elem.attr('data-class'),
                        toggleItemClassTarget = elem.attr('data-target');
                    elem.on("click", function() {
                        if (toggleItemClass) {
                            if (toggleItemClassTarget) {
                                $(toggleItemClassTarget).toggleClass(toggleItemClass);
                            } else {
                                elem.toggleClass(toggleItemClass);
                            }
                        }
                        elem.toggleClass("toggle-active");
                        return false;
                    });
                });
            }
            /*Dropdown popup invert*/
            var $pDropdown = $(".p-dropdown");
            if ($pDropdown.length > 0) {
                $pDropdown.each(function() {
                    var elem = $(this);
                    if ($window.width() / 2 > elem.offset().left) {
                        elem.addClass("p-dropdown-invert")
                    }
                });
            }
        },
        naTo: function() {
            $('a.scroll-to, #dotsMenu > ul > li > a, .menu-one-page nav > ul > li > a').on('click', function() {
                var extraPaddingTop = 0,
                    extraHeaderHeight = 0;
                $(window).breakpoints("lessThan", "lg", function() {
                    if (Settings.menuIsOpen) {
                        $mainMenuTriggerBtn.trigger("click");
                    }
                    if ($header.attr('data-responsive-fixed') === true) {
                        extraHeaderHeight = $header.height();
                    }
                });
                $(window).breakpoints("greaterEqualTo", "lg", function() {
                    if ($header.length > 0) {
                        extraHeaderHeight = $header.height();
                    }
                });
                if ($('.dashboard').length > 0) {
                    extraPaddingTop = 30;
                }
                var $anchor = $(this);
                $('html, body').stop(true, false).animate({
                    scrollTop: ($($anchor.attr('href')).offset().top - (extraHeaderHeight + extraPaddingTop))
                }, 1500, 'easeInOutExpo');
                return false;
            });
        },
        morphext: function() {
            var $textRotator = $('.text-rotator');
            if ($textRotator.length > 0) {
                //Check if Morphext plugin is loaded
                if (typeof $.fn.Morphext === 'undefined') {
                    INSPIRO.elements.notification("Warning", "jQuery Morphext plugin is missing in plugins.js file.", "danger")
                    return true;
                }
                $textRotator.each(function() {
                    var elem = $(this);
                    //Plugin Options
                    elem.options = {
                        animation: elem.attr('data-animation') || "fadeIn",
                        separator: elem.attr('data-separator') || ",",
                        speed: elem.attr('data-speed') || 2000,
                        height: elem.height()
                    }
                    elem.css({
                        'min-height': elem.options.height
                    });
                    //Initializing Morphext plugin and passing the options
                    elem.Morphext({
                        animation: elem.options.animation,
                        separator: elem.options.separator,
                        speed: Number(elem.options.speed)
                    });
                });
            }
        },
        buttons: function() {
            //Button slide width
            if ($(".btn-slide[data-width]")) {
                $(".btn.btn-slide[data-width]").each(function() {
                    var elem = $(this),
                        elemWidth = elem.attr('data-width'),
                        elemDefaultWidth;
                    switch (true) {
                        case elem.hasClass('btn-lg'):
                            elemDefaultWidth = "60";
                            break;
                        case elem.hasClass('btn-sm'):
                            elemDefaultWidth = "36";
                            break;
                        case elem.hasClass('btn-xs'):
                            elemDefaultWidth = "28";
                            break;
                        default:
                            elemDefaultWidth = "48";
                            break;
                    }
                    elem.hover(function() {
                        $(this).css("width", elemWidth + "px");
                    }, function() {
                        $(this).css("width", elemDefaultWidth + "px");
                    });
                });
            }
        },
        accordion: function() {
            var accordionType = "accordion",
                toogleType = "toggle",
                accordionItem = "ac-item",
                itemActive = "ac-active",
                itemTitle = "ac-title",
                itemContent = "ac-content",
                $accs = $("." + accordionItem);
            $accs.length && ($accs.each(function() {
                var $item = $(this);
                $item.hasClass(itemActive) ? $item.addClass(itemActive) : $item.find("." + itemContent).hide();
            }), $("." + itemTitle).on("click", function(e) {
                var $link = $(this),
                    $item = $link.parents("." + accordionItem),
                    $acc = $item.parents("." + accordionType);
                $item.hasClass(itemActive) ? $acc.hasClass(toogleType) ? ($item.removeClass(itemActive), $link.next("." + itemContent).slideUp()) : ($acc.find("." + accordionItem).removeClass(itemActive), $acc.find("." + itemContent).slideUp()) : ($acc.hasClass(toogleType) || ($acc.find("." + accordionItem).removeClass(itemActive), $acc.find("." + itemContent).slideUp("fast")), $item.addClass(itemActive), $link.next("." + itemContent).slideToggle("fast")), e.preventDefault();
                return false;
            }));
        },
        animations: function() {
            var $animate = $("[data-animate]");
            if ($animate.length > 0) {
                //Check if jQuery Waypoint plugin is loaded
                if (typeof Waypoint === 'undefined') {
                    INSPIRO.elements.notification("Warning", "jQuery Waypoint plugin is missing in plugins.js file.", "danger")
                    return true;
                }
                $animate.each(function() {
                    var elem = $(this);
                    elem.addClass("animated");
                    //Plugin Options
                    elem.options = {
                            animation: elem.attr("data-animate") || "fadeIn",
                            delay: elem.attr("data-animate-delay") || 200,
                            direction: ~elem.attr("data-animate").indexOf("Out") ? "back" : "forward",
                            offsetX: elem.attr("data-animate-offsetX") || 0,
                            offsetY: elem.attr("data-animate-offsetY") || -100
                        }
                        //Initializing jQuery Waypoint plugin and passing the options from data animations attributes
                    if (elem.options.direction == "forward") {
                        new Waypoint({
                            element: elem,
                            handler: function() {
                                var t = setTimeout(function() {
                                    elem.addClass(elem.options.animation + " visible");
                                }, elem.options.delay);
                                this.destroy();
                            },
                            offset: '100%'
                        });
                    } else {
                        elem.addClass("visible");
                        elem.on("click", function() {
                            elem.addClass(elem.options.animation);
                            return false;
                        });
                    }
                    //Demo play
                    if (elem.parents('.demo-play-animations').length) {
                        elem.on("click", function() {
                            elem.removeClass(elem.options.animation);
                            var t = setTimeout(function() {
                                elem.addClass(elem.options.animation);
                            }, 50);
                            return false;
                        });
                    }
                });
            }
        },
        parallax: function() {
            var $parallax = $('[data-bg-parallax]');
            if ($parallax.length > 0) {
                //Check if scrolly plugin is loaded
                if (typeof $.fn.scrolly === 'undefined') {
                    INSPIRO.elements.notification("Warning", "jQuery scrolly plugin is missing in plugins.js file.", "danger")
                    return true;
                }
                $parallax.each(function() {
                    var $elem = $(this),
                        elemImageSrc = $elem.attr("data-bg-parallax"),
                        elemImageVelocity = $elem.attr("data-velocity") || "-.140";
                    $elem.prepend('<div class="parallax-container" data-lazy-background="' + elemImageSrc + '"  data-velocity="' + elemImageVelocity + '" style="background: url(' + elemImageSrc + ')"></div>');
                    $(".parallax-container").lazy({
                        attribute: "data-lazy-background",
                        afterLoad: function(element) {
                            $elem.find(".parallax-container").addClass("img-loaded");
                        }
                    });
                    if ($body.hasClass('breakpoint-lg') || $body.hasClass('breakpoint-xl')) {
                        $elem.find(".parallax-container").scrolly({
                            bgParallax: true
                        });
                    } else {
                        $elem.find(".parallax-container").addClass("parallax-responsive");
                    }
                });
            }
        },
        backgroundImage: function() {
            var $backgroundImage = $('[data-bg-image]');
            if ($backgroundImage.length > 0) {
                $backgroundImage.each(function() {
                    var $elem = $(this),
                        elemImageSrc = $elem.attr("data-bg-image");
                    $elem.attr('data-lazy-background', elemImageSrc);
                    $elem.lazy({
                        attribute: "data-lazy-background",
                        afterLoad: function(element) {
                            $elem.addClass("bg-loaded");
                        }
                    });
                });
            }
        },
        shapeDivider: function() {
            var $shape_divider = $(".shape-divider");
            $shape_divider.each(function() {
                var elem = $(this);
                elem.options = {
                    style: elem.attr('data-style') || 1,
                    color: elem.attr('data-color') || '#ffffff',
                    opacity: elem.attr('data-opacity') || '1',
                    zIndex: elem.attr('data-zIndex') || '0',
                    height: elem.attr('data-height') || 210,
                    prefix: "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MzAg"
                }
                switch (elem.options.style) {
                    case '1':
                        elem.options.style = elem.options.prefix + "MTI1LjcyIj48dGl0bGU+QXNzZXQgMTc0PC90aXRsZT48cGF0aCBkPSJNMzk1LDk5LjM3Yy01Ny40MywxMC4xNy0xMjQuMjctOC4wNi0xNzYuOC0xMS43MnEzLjkzLjY0LDgsMS40MWM1MC44MSw2LDExMy4zLDI0LjA4LDE2OC43NiwxNC4yNkM0NjgsOTAuNDIsNTE5LjYsMTEuODgsNjMwLDguOVYwQzUwNS40Miw0LDQ2OCw4Ni40NywzOTUsOTkuMzdaIiBzdHlsZT0iZmlsbDojZmZmO29wYWNpdHk6MC4zMDAwMDAwMDAwMDAwMDAwNCIvPjxwYXRoIGQ9Ik0yMjYuMjUsODlDMjczLjg4LDk4LDMzOC4xNCwxMTkuMjksMzk1LDEwOS4yM2M3Mi45My0xMi45MSwxMjYuNjEtNzcuNDYsMjM1LTczLjQ4VjguODZjLTExMC40LDMtMTYyLDgxLjUxLTIzNSw5NC40MkMzMzkuNTUsMTEzLjEsMjc3LjA2LDk1LjA3LDIyNi4yNSw4OVoiIHN0eWxlPSJmaWxsOiNmZmY7b3BhY2l0eTowLjYzIi8+PHBhdGggZD0iTTYwLjgyLDEyMi44OCw2MiwxMjNhMzEuNDksMzEuNDksMCwwLDAsOS4zNC0uNjRBMTAxLjI2LDEwMS4yNiwwLDAsMSw2MC44MiwxMjIuODhaIiBzdHlsZT0iZmlsbDojZmZmIi8+PHBhdGggZD0iTTYwLjgyLDEyMi44OCw2MiwxMjNhMzEuNDksMzEuNDksMCwwLDAsOS4zNC0uNjRBMTAxLjI2LDEwMS4yNiwwLDAsMSw2MC44MiwxMjIuODhaIiBzdHlsZT0iZmlsbDojZmZmO29wYWNpdHk6MC4zNTAwMDAwMDAwMDAwMDAwMyIvPjxwYXRoIGQ9Ik0zOTgsMTA3Ljg0Yy01Ni4xNSwxMC4wNy0xMTkuNTktMTEuMjYtMTY2LjYyLTIwLjItMi43MS0uNTItNS4zNS0xLTcuOTQtMS40MUExNTkuNTQsMTU5LjU0LDAsMCwwLDIwMiw4NHEtMy4wOS0uMDktNiwwYy0uNzEsMC0xLjM5LjA4LTIuMDkuMTItNTIuOCwyLjkzLTgwLjM0LDI4Ljc4LTExMi45MSwzNi42MmE3Mi42Myw3Mi42MywwLDAsMS05LjY2LDEuNjJBMzEuNDksMzEuNDksMCwwLDEsNjIsMTIzbC0xLjE4LS4xM0MzMS4zNywxMjIuODUsMCwxMTEuODIsMCwxMTEuODJ2MTMuOUg2MzBWMzQuMzZDNTIzLDMwLjM5LDQ3MCw5NC45NCwzOTgsMTA3Ljg0WiIgc3R5bGU9ImZpbGw6I2ZmZiIvPjxwYXRoIGQ9Ik0wLDEwMi4xNHYxMGM4MywzNCwxMjYuODMtMTQsMTkwLTI0bDEtNGMtNDQuNCw2LjI2LTQ1LDIyLTkzLDMxQzU0Ljc4LDEyMy4yNSwzMCwxMTMuMTQsMCwxMDIuMTRaIiBzdHlsZT0iZmlsbDojZmZmO29wYWNpdHk6MC4zMDAwMDAwMDAwMDAwMDAwNCIvPjxwYXRoIGQ9Ik0wLDEwNC4xNHYxMGMyMiw5LDQxLjIzLDEwLjI2LDU4LjgsMTAsNDguNzgtLjc2LDg0Ljc2LTI2LjY1LDEzMS4yLTM0bDEtNGMtNDQuNCw2LjI2LTQ1LDIyLTkzLDMxQzU0Ljc4LDEyNS4yNSwzMCwxMTUuMTQsMCwxMDQuMTRaIiBzdHlsZT0iZmlsbDojZmZmO29wYWNpdHk6MC4zMDAwMDAwMDAwMDAwMDAwNCIvPjwvc3ZnPg==";
                        break;
                    case '2':
                        elem.options.style = elem.options.prefix + "MTIwIj48dGl0bGU+QXNzZXQgMTY0PC90aXRsZT48cGF0aCBkPSJNNTY3LjY3LDMxLjE0Yy0yNi4yMiwxNy4zNi01MCwzNi41NS04MS44LDUwQzQzNy41MiwxMDEuNDgsMzc1LjUyLDEwNi4yMSwzMTcsMTAzLjIzcy0xMTUuNDItMTMtMTczLjE1LTE5LjU2Qzk2LjQ3LDc4LjI1LDQ3LjE4LDc1LjE4LDAsODAuMDd2MzIuNDFINjMwVjBDNjA2LjQ0LDcuNTIsNTg1Ljg5LDE5LjA5LDU2Ny42NywzMS4xNFoiIHN0eWxlPSJmaWxsOiNmZmY7b3BhY2l0eTowLjY0Ii8+PHBhdGggZD0iTTU2Ny42NywzOC42N2MtMjYuMjIsMTcuMzUtNTAsMzYuNTUtODEuOCw1MEM0MzcuNTIsMTA5LDM3NS41MiwxMTMuNzMsMzE3LDExMC43NXMtMTE1LjQyLTEzLTE3My4xNS0xOS41NkM5Ni40Nyw4NS43Nyw0Ny4xOCw4Mi43LDAsODcuNTlWMTIwSDYzMFY3LjUyQzYwNi40NCwxNSw1ODUuODksMjYuNjEsNTY3LjY3LDM4LjY3WiIgc3R5bGU9ImZpbGw6I2ZmZiIvPjwvc3ZnPg==";
                        break;
                    case '3':
                        elem.options.style = elem.options.prefix + "NjAiPjx0aXRsZT5Bc3NldCAxNzI8L3RpdGxlPjxwYXRoIGQ9Ik0wLDAsNDAwLDUzLjIzLDYzMCwwVjYwSDBaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+";
                        break;
                    case '4':
                        elem.options.style = elem.options.prefix + "ODAiPjx0aXRsZT40PC90aXRsZT48cGF0aCBkPSJNMjYxLjIsNjQuOUMzNjcuNiw1NC43LDQ5OS42LDM5LjcsNjMwLDE4LjVWMEM0OTcuOCwzMS40LDM2My43LDUyLDI2MS4yLDY0LjlaIiBzdHlsZT0iZmlsbDojZmZmO29wYWNpdHk6MC4zMDAwMDAwMDAwMDAwMDAwNCIvPjxwYXRoIGQ9Ik0yNjEuMiw2NC45Yy00MSwzLjktNzguMiw3LjEtMTEwLDkuNiwxMy4yLS40LDI3LS45LDQxLjUtMS42QzMxNSw2Ny43LDQ3OC40LDU5LjQsNjMwLDM0LjhWMTguNUM0OTkuMSwzOS44LDM2Ny4zLDU0LjgsMjYxLjIsNjQuOVoiIHN0eWxlPSJmaWxsOiNmZmY7b3BhY2l0eTowLjYwMDAwMDAwMDAwMDAwMDEiLz48cGF0aCBkPSJNMTkyLjcsNzIuOWMtMTQuNS43LTI4LjMsMS4yLTQxLjUsMS42QzU5LjksNzcuNywwLDc3LjQsMCw3Ny40VjgwSDYzMFYzMy44QzQ3OC40LDU4LjQsMzE1LDY3LjcsMTkyLjcsNzIuOVoiIHN0eWxlPSJmaWxsOiNmZmYiLz48L3N2Zz4=";
                        break;
                    case '5':
                        elem.options.style = elem.options.prefix + "MTAwIj48dGl0bGU+QXNzZXQgMTczPC90aXRsZT48cGF0aCBkPSJNMCw1Ni44NGwxMDgsMzlMNDY4LDAsNjMwLDY4LjQyVjEwMEgwWiIgc3R5bGU9ImZpbGw6I2ZmZiIvPjwvc3ZnPg==";
                        break;
                    case '6':
                        elem.options.style = elem.options.prefix + "MTIwIj48dGl0bGU+NjwvdGl0bGU+PHBhdGggZD0iTTYxNS41LDIuNWMtNDEuMyw1LjgtNzcuNCwxMi43LTExNiwxMy43LTIyLjIuNi00NC44LTMuMy02Ny4yLjQtNDguOCw4LjEtMTA3LjgsNDMuNS0xNTcuNyw2Mi42LTQyLjQsMTYuMi02OS45LDE2LTk4LjcsMy44LTIxLjEtOS00Mi4xLTIyLjktNjUuMi0zMy4xLTI5LjQtMTMtNjIuNC0yNC4yLTk4LjktMTIuM2wtMS4xLjNMMCw0MS42VjUzLjhsMTAuNy0zLjYsMS4xLS40YzQyLjEtMTMuNyw2My4xLTUuNiw5OC45LDUuNiwyMi43LDcsNDQuMSwyMCw2NS4yLDI4LjksMzAuOSwxMy4xLDU1LjgsMTMsOTguNy0xLDQ5LjktMTYuNCwxMDguOS01MS44LDE1Ny43LTU5LjksMjIuNC0zLjcsNDUuMi00LjUsNjcuMi0uNCwzNy44LDcuMiw3NC43LDcuMSwxMTYsMS4zLDUtLjcsOS44LTEuNSwxNC41LTIuNVYwQzYyNS4zLDEsNjIwLjUsMS45LDYxNS41LDIuNVoiIHN0eWxlPSJmaWxsOiNmZmY7b3BhY2l0eTowLjM1MDAwMDAwMDAwMDAwMDAzIi8+PHBhdGggZD0iTTQ5OS41LDIzYy0yMi00LjEtNDQuOC0zLjMtNjcuMi40LTQ4LjgsOC4xLTEwNy44LDQzLjUtMTU3LjcsNTkuOS00Mi45LDE0LTY3LjgsMTQuMS05OC43LDEtMjEuMS04LjktNDIuNS0yMS45LTY1LjItMjguOUM3NC45LDQ0LjIsNTMuOSwzNi4xLDExLjgsNDkuOGwtMS4xLjRMMCw1My44VjYybDEwLjctMy42LDEuMS0uNGMzNi41LTExLjksNjguOC04LDk4LjksMS40LDIyLjcsNy4xLDQ0LjEsMTcuMyw2NS4yLDI2LjMsMjguOCwxMi4yLDU1LjcsMTIuOSw5OS4xLDIuOSw1Mi41LTEyLjEsMTA3LjEtNTEuNywxNTUuOS01OS44LDIyLjMtMy44LDQ2LjYtMS44LDY4LjYsMi40LDM3LjgsNy4xLDc0LjcsMjIsMTE2LDE2LjMsNS0uNyw5LjgtMS42LDE0LjUtMi42VjIxLjhjLTQuNywxLTkuNSwxLjgtMTQuNSwyLjVDNTc0LjIsMzAuMSw1MzcuMywzMC4yLDQ5OS41LDIzWiIgc3R5bGU9ImZpbGw6I2ZmZjtvcGFjaXR5OjAuNSIvPjxwYXRoIGQ9Ik00OTkuNSwzMS4yYy0yMi00LjItNDYuMy02LjItNjguNi0yLjRDMzgyLjEsMzYuOSwzMjcuNSw3Ni41LDI3NSw4OC42Yy00My40LDEwLTcwLjMsOS4zLTk5LjEtMi45LTIxLjEtOS00Mi41LTE5LjItNjUuMi0yNi4zQzgwLjYsNTAsNDguMyw0Ni4xLDExLjgsNThsLTEuMS40TDAsNjJ2NThINjMwVjQ0LjljLTQuNywxLTkuNSwxLjktMTQuNSwyLjZDNTc0LjIsNTMuMiw1MzcuMywzOC4zLDQ5OS41LDMxLjJaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+";
                        break;
                    case '7':
                        elem.options.style = elem.options.prefix + "MTIwIj48dGl0bGU+QXNzZXQgMTc0PC90aXRsZT48cGF0aCBkPSJNMCwwLDYzMCwxMjBIMFoiIHN0eWxlPSJmaWxsOiNmZmYiLz48L3N2Zz4=";
                        break;
                    case '8':
                        elem.options.style = elem.options.prefix + "MTIwIj48dGl0bGU+ODwvdGl0bGU+PHBhdGggZD0iTTQ1Ni43LDUzLjZDNDM5LjgsNDIuOSwzOTYuOSwxLjgsMzQzLjIsMzAuMWMtMzUuNywxOC43LTg0LDcxLjUtMTI3LjgsNzEuOS0zNi4xLjMtNTcuOC0yMC4yLTgxLjQtMzUuMS0xNy4zLTExLTM1LTIzLjUtNTMuNi0zMi4yQzU1LjYsMjMuMiwzMCwxMS44LjEsMjYuNGMtLjMuMSwwLDkzLjYsMCw5My42SDYzMFYzMS44Yy0zLjksMS4zLTEzLDE3LjMtNjUuMiwzMi44QzUzMy4zLDc2LjQsNDkyLjQsNzYuNCw0NTYuNyw1My42WiIgc3R5bGU9ImZpbGw6I2ZmZiIvPjxnIHN0eWxlPSJvcGFjaXR5OjAuMzgiPjxwYXRoIGQ9Ik02MTEsNjMuNmwtMiw0Mi44LTUyNy45LDUtODEtMS4xVjYxLjhhMTk0LjcsMTk0LjcsMCwwLDAsMjQuNyw5LjQsMTQ2LjgsMTQ2LjgsMCwwLDAsNDMuOSw2LjJDOTQuNiw3Ny4zLDEyMC41LDY1LDE0Niw1MC41YzE4LjctMTAuNiwzNy4xLTIyLjMsNTUuMi0zMS4zQzIxMy43LDEyLjksMjI2LDgsMjM4LjEsNS43YzI0LjMtNC42LDUxLjQtMy4yLDcyLjUsNy45bDM2LjcsMTkuNmMzNy4zLDE5LjksNzMuMSwzOC45LDEwNC4yLDUxLjdDNDY1LjQsOTAuNiw0NzguMyw5NS4yLDQ5MCw5OGMxMy4zLDMuMywyNS4xLDQuNSwzNSwyLjlhNzUuNSw3NS41LDAsMCwwLDkuMy0zLjdsNy40LTMuM2MxNS40LTcuMSwzOC44LTE5LjEsNTkuNi0zMy4yLDUuNS0zLjcuNi40LDUuNy0zLjRDNjE5LDQ4LjIsNjA4LjcsNjQuMiw2MTEsNjMuNloiIHN0eWxlPSJmaWxsOiNmZmYiLz48L2c+PHBhdGggZD0iTTU4MS44LDExLjRDNTUyLC4yLDUzMS41LDMuOSw1MDcuMiw4LjQsNDcyLjEsMTUsNDM0LjcsNDQuMSwzOTYuNiw2My4yYy0xNi4zLDguMS0zMi44LDE0LjQtNDkuMiwxNi4zLTE1LjgtNS40LTMyLTEyLjItNDcuNi0xOS4yLTM3LjktMTcuMS03Mi42LTM1LjctOTEuOS0zOS44bC02LjctMS4zYy0yMi4yLTQuMi00NS45LTUuOC02Ny45LTEuNy0xMC40LDItMjEsNS45LTMxLjgsMTFDNzYuNiw0MC4yLDUwLjksNTcuOSwyNC44LDcxLjJBMjEzLjYsMjEzLjYsMCwwLDEsLjEsODIuMXYzMC44bDgxLTEuNSwzMTIuMy01LjcsMS40LjNMNjMwLDExMS44di04MEM2MTMsMjYuNCw2MTkuMywyNS41LDU4MS44LDExLjRaIiBzdHlsZT0iZmlsbDojZmZmO29wYWNpdHk6MC40OSIvPjxnIHN0eWxlPSJvcGFjaXR5OjAuMzgiPjxwYXRoIGQ9Ik01NDUuNCw5N2wtMTEuMS4yTDQ5MCw5OCwuMSwxMDcuMVYwQzIxLjMtLjQsNDEuMyw0LjEsNjAuNCwxMC44YTQwMy43LDQwMy43LDAsMCwxLDQxLjEsMTcuN2MxMCw0LjksMTkuOSw5LjksMjkuNywxNC42LDUsMi4zLDkuOSw0LjksMTQuOCw3LjQsMjYuMSwxMy41LDUyLjcsMjgsOTIuOSwyNy44LDIwLjMtLjEsNDAuNy03LjcsNjAuOS0xOCwxNi04LjIsMzEuOS0xOCw0Ny41LTI3LjEsMjAuOS0xMi4xLDQxLjMtMjIuOSw2MC45LTI2LjZDNDMyLjUsMiw0ODEuMSw4LjYsNTA0LDE4czQ5LjYsMjMuNiw5Ny4zLDQyLjdDNjIwLjIsNjguNCw1NDUuNCw5Nyw1NDUuNCw5N1oiIHN0eWxlPSJmaWxsOiNmZmYiLz48L2c+PC9zdmc+";
                        break;
                    case '9':
                        elem.options.style = elem.options.prefix + "MTAwIj48dGl0bGU+QXNzZXQgMTgyPC90aXRsZT48cGF0aCBkPSJNMCw0NS42NVMxNTksMCwzMjIsMCw2MzAsNDUuNjUsNjMwLDQ1LjY1VjEwMEgwWiIgc3R5bGU9ImZpbGw6I2ZmZiIvPjwvc3ZnPg==";
                        break;
                    case '10':
                        elem.options.style = elem.options.prefix + "MTIwIj48dGl0bGU+MTA8L3RpdGxlPjxwYXRoIGQ9Ik0wLDEwOC4xSDYzMFYwUzQ3NSwxMDQuNiwzMTQsMTA0LjYsMCwwLDAsMFoiIHN0eWxlPSJmaWxsOiNmZmY7b3BhY2l0eTowLjIyIi8+PHBhdGggZD0iTTAsMTA2LjlINjMwVjE3LjhzLTE1NSw4Ny45LTMxNiw4Ny45UzAsMTksMCwxOVoiIHN0eWxlPSJmaWxsOiNmZmY7b3BhY2l0eTowLjM2Ii8+PHBhdGggZD0iTTAsMTIwSDYzMFY0NS4xcy0xNTUsNjEuOC0zMTYsNjEuOFMwLDQ1LjEsMCw0NS4xWiIgc3R5bGU9ImZpbGw6I2ZmZiIvPjwvc3ZnPg==";
                        break;
                    case '11':
                        elem.options.style = elem.options.prefix + "MTIwIj48dGl0bGU+MTE8L3RpdGxlPjxwYXRoIGQ9Ik01MTAuNywyLjljLTk4LjksMjEuOS0yMjIuMyw4NS41LTMyMiw4NS41QzgwLjEsODguNCwyNC4xLDU2LjEsMCwzNi40VjEyMEg2MzBWMTUuMkM2MDIuNCw2LjksNTUwLjEtNS44LDUxMC43LDIuOVoiIHN0eWxlPSJmaWxsOiNmZmYiLz48L3N2Zz4=";
                        break;
                    case '12':
                        elem.options.style = elem.options.prefix + "MTIwIj48dGl0bGU+MTI8L3RpdGxlPjxwYXRoIGQ9Ik02MzAsMzQuNWE1NCw1NCwwLDAsMS05LDIuM0M1NzguMyw0Ni4xLDU1Ni4xLDI0LDUxNy4yLDEyLjVjLTIyLjktNi43LTQ3LjktOS44LTcxLTMuOUMzOTUuOCwyMS43LDM0MC4zLDEwMiwyODUuMSwxMDIuNGMtNDUuNC4zLTcyLjYtMjYuNS0xMDIuMy00Ni4xLTIxLjgtMTQuNC00NC0zMC44LTY3LjQtNDIuMUM4NC4yLS45LDUwLjktNy4yLDEzLjIsMTEuOGwtMS4yLjZjLTMuNSwxLjktOC4yLDMuOS0xMiw1LjlWMTIwSDYzMFoiIHN0eWxlPSJmaWxsOiNmZmYiLz48L3N2Zz4=";
                        break;
                    case '13':
                        elem.options.style = elem.options.prefix + "OTAiPjx0aXRsZT4xMzwvdGl0bGU+PHBhdGggZD0iTTYzMCw5MEgxTDAsMFMxMzEsNzYuNiwzNjYsMzQuMmMxMjAtMjEuNywyNjQsNC41LDI2NCw0LjVaIiBzdHlsZT0iZmlsbDojZmZmO29wYWNpdHk6MC4xNiIvPjxwYXRoIGQ9Ik0xLDkwSDYzMFYwUzQ4OSw3NC4zLDI1NCwzMS45QzEzNCwxMC4zLDAsMzMsMCwzM1oiIHN0eWxlPSJmaWxsOiNmZmY7b3BhY2l0eTowLjIiLz48cGF0aCBkPSJNMCw5MEg2MzBWMTguMlM0NzUsNzcuNSwzMTQsNzcuNSwwLDE4LjIsMCwxOC4yWiIgc3R5bGU9ImZpbGw6I2ZmZiIvPjwvc3ZnPg==";
                        break;
                    case '14':
                        elem.options.style = elem.options.prefix + "NjAiPjx0aXRsZT5Bc3NldCAxNzg8L3RpdGxlPjxwYXRoIGQ9Ik0wLDAsMTEzLDE5LDU4MiwyOS40Nyw2MzAsMFY2MEgwWiIgc3R5bGU9ImZpbGw6I2ZmZiIvPjwvc3ZnPg==";
                        break;
                    case '15':
                        elem.options.style = elem.options.prefix + "ODAiPjx0aXRsZT5Bc3NldCAxNzc8L3RpdGxlPjxwYXRoIGQ9Ik0zMTUsMCw2MzAsODBIMFoiIHN0eWxlPSJmaWxsOiNmZmYiLz48L3N2Zz4=";
                        break;
                    case '16':
                        elem.options.style = elem.options.prefix + "ODAiPjx0aXRsZT4xNjwvdGl0bGU+PHBhdGggZD0iTTAsODBTMjA4LDAsMzE1LDAsNjMwLDgwLDYzMCw4MFoiIHN0eWxlPSJmaWxsOiNmZmYiLz48L3N2Zz4=";
                        break;
                    case '17':
                        elem.options.style = elem.options.prefix + "MTIwIj48dGl0bGU+MTc8L3RpdGxlPjxwYXRoIGQ9Ik0zMjAsMTZjODguNCwyLDMxMCwxMDQsMzEwLDEwNFM1NjkuNiw4Ny4zLDQ5OS41LDU2Yy0xOS43LTguOC00MC4xLTE3LjUtNjAuMi0yNS4zQzM5NS4yLDEzLjYsMzUyLjcuNywzMjQsMCwyMzUtMiwwLDEyMCwwLDEyMGwxNC4xLTUuNUM2Mi41LDkyLjgsMjQzLjMsMTQuMywzMjAsMTZaIiBzdHlsZT0iZmlsbDojZmZmO29wYWNpdHk6MC4zMSIvPjxwYXRoIGQ9Ik0xNC4xLDExNC41QzY0LjksOTUsMjM5LjQsMzAuMywzMTUsMzJjODguNCwyLDMxNSw4OCwzMTUsODhTNDA4LjQsMTgsMzIwLDE2QzI0My4zLDE0LjMsNjIuNSw5Mi44LDE0LjEsMTE0LjVaIiBzdHlsZT0iZmlsbDojZmZmO29wYWNpdHk6MC40MyIvPjxwYXRoIGQ9Ik0xNC4xLDExNC41QzY0LjksOTUsMjM5LjQsMzAuMywzMTUsMzJjODguNCwyLDMxNSw4OCwzMTUsODhTNDA4LjQsMTgsMzIwLDE2QzI0My4zLDE0LjMsNjIuNSw5Mi44LDE0LjEsMTE0LjVaIiBzdHlsZT0iZmlsbDojZmZmO29wYWNpdHk6MC4zMSIvPjxwYXRoIGQ9Ik0zMTUsMzJDMjM5LjQsMzAuMyw2NC45LDk1LDE0LjEsMTE0LjVMMiwxMjBINjMwUzQwMy40LDM0LDMxNSwzMloiIHN0eWxlPSJmaWxsOiNmZmYiLz48L3N2Zz4=";
                        break;
                    case '18':
                        elem.options.style = elem.options.prefix + "NDAiPjx0aXRsZT5Bc3NldCAxNzk8L3RpdGxlPjxwYXRoIGQ9Ik0wLDE4LjEsNTMsMS45LDEwMywyMGw1OS05LjUyLDU2LDE1LjIzLDcyLTcuNjEsNDYsNC43NiwzNC00Ljc2LDM2LDguNTcsNzYtMTksODUsMTUuMjRMNjMwLDBWMzcuMTRIMFoiIHN0eWxlPSJmaWxsOiNmZmY7b3BhY2l0eTowLjQ3MDAwMDAwMDAwMDAwMDAzIi8+PHBhdGggZD0iTTAsMjAsNTMsMy44MSwxMDMsMjEuOWw1OS05LjUyLDU2LDE1LjI0TDI5MCwyMGw0Niw0Ljc2TDM3MCwyMGwzNiw5LjUyLDc2LTE3LjE0LDg1LDE2LjE5LDYzLTE2LjE5VjQwSDBaIiBzdHlsZT0iZmlsbDojZmZmIi8+PC9zdmc+";
                        break;
                    case '19':
                        elem.options.style = elem.options.prefix + "ODAiPjx0aXRsZT4xOTwvdGl0bGU+PHBhdGggZD0iTTYzMCwzNi45YTM0LjYsMzQuNiwwLDAsMC0xNi41LTQuMmMtMTcuMiwwLTMxLjgsMTIuNy0zNi43LDMwLjNhMjEuMiwyMS4yLDAsMCwwLTkuMy0yLjIsMjEuOCwyMS44LDAsMCwwLTEzLjksNS4xLDM4LjcsMzguNywwLDAsMC00MC40LTQuOGMtNS4yLTcuNy0xMy40LTEyLjYtMjIuNy0xMi42YTI1LjcsMjUuNywwLDAsMC04LjcsMS41QzQ3Mi45LDI3LjgsNDUzLDEyLjQsNDMwLDEyLjRzLTQyLjcsMTUuMy01MS43LDM3LjJjLTcuMi0xMC45LTE4LjgtMTguMS0zMS44LTE4LjFhMzcsMzcsMCwwLDAtMjQsOS4yYy02LTEwLjMtMTYuMy0xNy0yOC0xNy0xMy44LDAtMjUuNiw5LjMtMzAuNywyMi43QTI2LjUsMjYuNSwwLDAsMCwyNDQsMzcuMmEyMiwyMiwwLDAsMC01LjguN2MtNC0xMS42LTE0LTE5LjktMjUuNy0xOS45YTI0LjcsMjQuNywwLDAsMC05LjQsMS45QzE4OS4yLDcuNCwxNzEuNiwwLDE1Mi41LDAsMTI0LjYsMCwxMDAsMTUuOCw4NS4zLDM5LjlBMjcuNiwyNy42LDAsMCwwLDYzLDI4LjJhMjMuOSwyMy45LDAsMCwwLTcuMSwxQzQ3LjIsMTMsMzEuNSwyLjMsMTMuNSwyLjNBNDMuMyw0My4zLDAsMCwwLDAsNC40VjgwSDYzMFoiIHN0eWxlPSJmaWxsOiNmZmYiLz48L3N2Zz4=";
                        break;
                    case '20':
                        elem.options.style = elem.options.prefix + "MTAwIj48dGl0bGU+QXNzZXQgMTgwPC90aXRsZT48cGF0aCBkPSJNNjMwLDYwLjgyVjEwMEgwVjk1Ljg4bDExLjkxLTYuNDlMODQsNDMuMzRsMzYuNDksMjQuNDVMMTYwLDQ2LDIzMi4wNSwwbDQ5LjA3LDMyLjg5LDM0LjA3LDI5LjU5LDY4LjI5LDI3Ljc1TDQyMyw2NWw0Mi4yLDI4LjI5LDE4LjM5LTE2LDQ5LjA3LTMyLjg5TDU5NCw4My42MSw2MjgsNjEuOVoiIHN0eWxlPSJmaWxsOiNmZmYiLz48L3N2Zz4=";
                        break;
                }
                var decodeSvg = atob(elem.options.style);
                var wrapper = document.createElement('div');
                wrapper.innerHTML = decodeSvg;
                var svg = wrapper.firstChild;
                var paths = svg.getElementsByTagName('path');
                [].forEach.call(paths, function(path) {
                    path.style.fill = elem.options.color;
                });
                if ($body.hasClass("b--desktop")) {
                    svg.setAttribute("preserveAspectRatio", "none");
                    if (elem.options.height) {
                        svg.setAttribute("style", "height:" + elem.options.height + "px");
                    } else {
                        svg.setAttribute("style", "height:" + svg.height.baseVal.value + "px");
                    }
                } else {
                    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
                }
                $(".shape-divider svg title").remove();
                elem.css({
                    'z-index': elem.options.zIndex,
                    'opacity': elem.options.opacity
                });
                elem.append(svg);
            });
        },
        responsiveVideos: function() {
            //selecting elements
            var selectors = [
                'iframe[src*="player.vimeo.com"]',
                'iframe[src*="youtube.com"]',
                'iframe[src*="youtube-nocookie.com"]',
                'iframe[src*="kickstarter.com"][src*="video.html"]',
                'object',
                'embed'
            ];
            var videoContainers = $("section, .content, .post-content, .video-js, .post-video, .video-wrap, .ajax-quick-view,#slider:not(.revslider-wrap)");
            var elem = videoContainers.find(selectors.join(','));
            if (elem) {
                elem.each(function() {
                    $(this).wrap('<div class="embed-responsive embed-responsive-16by9"></div>');
                });
            }
        },
        counters: function() {
            var $counter = $('.counter');
            if ($counter.length > 0) {
                //Check if countTo plugin is loaded
                if (typeof $.fn.countTo === 'undefined') {
                    INSPIRO.elements.notification("Warning", "jQuery countTo plugin is missing in plugins.js file.", "danger")
                    return true;
                }
                //Initializing countTo plugin 
                $counter.each(function() {
                    var elem = $(this),
                        prefix = elem.find("span").attr("data-prefix") || "",
                        suffix = elem.find("span").attr("data-suffix") || "";

                    new Waypoint({
                        element: elem,
                        handler: function() {
                            elem.find('span').countTo({
                                refreshInterval: 2,
                                formatter: function(value, options) {
                                    return String(prefix) + value.toFixed(options.decimals) + String(suffix);
                                },
                            });
                            this.destroy();
                        },
                        offset: '104%'
                    });
                });
            }
        },
        countdownTimer: function() {
            var $countdownTimer = $('.countdown');
            if ($countdownTimer.length > 0) {
                //Check if countdown plugin is loaded
                if (typeof $.fn.countdown === 'undefined') {
                    INSPIRO.elements.notification("Warning", "jQuery countdown plugin is missing in plugins.js file.", "danger")
                    return true;
                }
                $('[data-countdown]').each(function() {
                    var $this = $(this),
                        finalDate = $(this).attr('data-countdown');
                    $this.countdown(finalDate, function(event) {
                        $this.html(event.strftime('<div class="countdown-container"><div class="countdown-box"><div class="number">%-D</div><span>Day%!d</span></div>' + '<div class="countdown-box"><div class="number">%H</div><span>Hours</span></div>' + '<div class="countdown-box"><div class="number">%M</div><span>Minutes</span></div>' + '<div class="countdown-box"><div class="number">%S</div><span>Seconds</span></div></div>'));
                    });
                });

            }
        },
        progressBar: function() {
            var $progressBar = $('.p-progress-bar') || $('.progress-bar');
            if ($progressBar.length > 0) {
                $progressBar.each(function(i, elem) {
                    var $elem = $(this),
                        percent = $elem.attr('data-percent') || "100",
                        delay = $elem.attr('data-delay') || "60",
                        type = $elem.attr('data-type') || "%";
                    if (!$elem.hasClass('progress-animated')) {
                        $elem.css({
                            'width': '0%'
                        });
                    }
                    var progressBarRun = function() {
                        $elem.animate({
                            'width': percent + '%'
                        }, 'easeInOutCirc').addClass('progress-animated');
                        $elem.delay(delay).append('<span class="progress-type">' + type + '</span><span class="progress-number animated fadeIn">' + percent + '</span>');
                    };
                    if ($body.hasClass('breakpoint-lg') || $body.hasClass('breakpoint-xl')) {
                        new Waypoint({
                            element: $(elem),
                            handler: function() {
                                var t = setTimeout(function() {
                                    progressBarRun();
                                }, delay);
                                this.destroy();
                            },
                            offset: '100%'
                        });
                    } else {
                        progressBarRun();
                    }
                });
            }
        },
        pieChart: function() {
            var $pieChart = $('.pie-chart');
            if ($pieChart.length > 0) {
                //Check if easyPieChart plugin is loaded
                if (typeof $.fn.easyPieChart === 'undefined') {
                    INSPIRO.elements.notification("Warning", "jQuery easyPieChart plugin is missing in plugins.js file.", "danger")
                    return true;
                }
                $pieChart.each(function() {
                    var elem = $(this);
                    //Plugin Options
                    elem.options = {
                        barColor: elem.attr('data-color') || $theme_color,
                        trackColor: elem.attr('data-trackcolor') || "rgba(0,0,0,0.10)",
                        scaleColor: elem.attr('data-scaleColor') || false,
                        scaleLength: elem.attr('data-scaleLength') || 5,
                        lineCap: elem.attr('data-lineCap') || 'square',
                        lineWidth: elem.attr('data-lineWidth') || 6,
                        size: elem.attr('data-size') || 160,
                        rotate: elem.attr('data-rotate') || 0,
                        animate: elem.attr('data-animate') || 2600,
                        elemEasing: elem.attr('data-easing') || 'easeInOutExpo'
                    }
                    elem.find('span, i').css({
                        'width': elem.options.size + 'px',
                        'height': elem.options.size + 'px',
                        'line-height': elem.options.size + 'px'
                    });
                    //Initializing jQuery easyPieChart plugin and passing the options
                    new Waypoint({
                        element: elem,
                        handler: function() {
                            elem.easyPieChart({
                                barColor: elem.options.barColor,
                                trackColor: elem.options.trackColor,
                                scaleColor: elem.options.scaleColor,
                                scaleLength: elem.options.scaleLength,
                                lineCap: elem.options.lineCap,
                                lineWidth: Number(elem.options.lineWidth),
                                size: Number(elem.options.size),
                                rotate: Number(elem.options.rotate),
                                animate: Number(elem.options.animate),
                                elemEasing: elem.options.elemEasing,
                                onStep: function(from, to, percent) {
                                    elem.find('span.percent').text(Math.round(percent));
                                },
                            });
                            this.destroy();
                        },
                        offset: '100%'
                    });
                });
            }
        },
        maps: function() {
            var $map = $('.map');

            if ($map.length > 0) {
                //Check if gMap plugin is loaded
                if (typeof $.fn.gmap3 === 'undefined') {
                    INSPIRO.elements.notification("Warning", "jQuery gmap3 plugin is missing, please go to this <a href='//support.inspirothemes.com/help-center/articles/8/14/65/google-maps'>help article</a> and follow instructions on how to configure google maps.", "danger")
                    return true;
                }
                $map.each(function() {
                    var elem = $(this);
                    //Plugin Options
                    elem.options = {
                        latitude: elem.attr('data-latitude') || "-37.817240",
                        longitude: elem.attr('data-longitude') || "144.955820",
                        info: elem.attr('data-info'),
                        maptype: elem.attr('data-type') || "ROADMAP",
                        zoom: elem.attr('data-zoom') || 14,
                        icon: elem.attr('data-icon'),
                        mapColor: elem.attr('data-style') || null,
                    }
                    var mapsStyle;
                    if (window.MAPS) {
                        if (elem.options.mapColor) {
                            mapsStyle = MAPS[elem.options.mapColor];
                        } else {
                            mapsStyle = null
                        }
                    }
                    //Initialize google maps plugin and passing the options
                    elem.gmap3({
                        center: [Number(elem.options.latitude), Number(elem.options.longitude)],
                        zoom: Number(elem.options.zoom),
                        mapTypeId: google.maps.MapTypeId[elem.options.maptype],
                        scrollwheel: false,
                        zoomControl: true,
                        mapTypeControl: false,
                        streetViewControl: true,
                        fullscreenControl: true,
                        styles: mapsStyle
                    })
                    if (elem.options.icon) {
                        elem.gmap3().marker({
                            position: [Number(elem.options.latitude), Number(elem.options.longitude)],
                            icon: elem.options.icon
                        });
                    } else {
                        elem.gmap3().marker({
                            position: [Number(elem.options.latitude), Number(elem.options.longitude)],
                            icon: ' ',
                        }).overlay({
                            position: [Number(elem.options.latitude), Number(elem.options.longitude)],
                            content: '<div class="animated-dot"></div>',
                        });
                    }
                    if (elem.options.info) {
                        elem.gmap3().infowindow({
                            position: [Number(elem.options.latitude), Number(elem.options.longitude)],
                            content: elem.options.info,
                            pixelOffset: new google.maps.Size(0, -10)
                        }).then(function(infowindow) {
                            var map = this.get(0);
                            var marker = this.get(1);
                            marker.addListener('click', function() {
                                infowindow.open(map);
                            });
                        });
                    }
                });
            }
        },
        gridLayout: function() {
            if ($gridLayout.length > 0) {
                //Check if isotope plugin is loaded
                if (typeof $.fn.isotope === 'undefined') {
                    INSPIRO.elements.notification("Warning", "jQuery isotope plugin is missing in plugins.js file.", "danger")
                    return true;
                }

                var isotopeRTL;
                if (INSPIRO.core.rtlStatus()) {
                    isotopeRTL = false;
                } else {
                    isotopeRTL = true;
                }

                $gridLayout.each(function() {
                    var elem = $(this);
                    elem.options = {
                        itemSelector: elem.attr('data-item') || "portfolio-item",
                        layoutMode: elem.attr('data-layout') || "masonry",
                        filter: elem.attr("data-default-filter") || "*",
                        stagger: elem.attr('data-stagger') || 0,
                        autoHeight: elem.data('auto-height') == false ? false : true,
                        gridMargin: elem.attr('data-margin') || 20,
                        gridMarginXs: elem.attr('data-margin-xs'),
                        transitionDuration: elem.attr("data-transition") || "0.45s",
                        isOriginLeft: isotopeRTL
                    }

                    $(window).breakpoints("lessThan", "lg", function() {
                        elem.options.gridMargin = elem.options.gridMarginXs || elem.options.gridMargin;
                    });

                    elem.css("margin", "0 -" + elem.options.gridMargin + "px -" + elem.options.gridMargin + "px 0");
                    elem.find('.' + elem.options.itemSelector).css("padding", "0 " + elem.options.gridMargin + "px " + elem.options.gridMargin + "px 0");
                    if (elem.attr("data-default-filter")) {
                        var elemDefaultFilter = elem.options.filter;
                        elem.options.filter = "." + elem.options.filter;
                    }
                    elem.append('<div class="grid-loader"></div>');
                    var $isotopelayout = $(elem).imagesLoaded(function() {
                        // init Isotope after all images have loaded
                        $isotopelayout.isotope({
                            layoutMode: elem.options.layoutMode,
                            transitionDuration: elem.options.transitionDuration,
                            stagger: Number(elem.options.stagger),
                            resize: true,
                            itemSelector: "." + elem.options.itemSelector + ':not(.grid-loader)',
                            isOriginLeft: elem.options.isOriginLeft,
                            autoHeight: elem.options.autoHeight,
                            masonry: {
                                columnWidth: elem.find('.' + elem.options.itemSelector + ':not(.large-width)')[0],
                            },
                            filter: elem.options.filter
                        });
                        elem.remove(".grid-loader").addClass('grid-loaded');
                    });

                    //Infinity Scroll
                    if (elem.next().hasClass("infinite-scroll")) {
                        INSPIRO.elements.gridLayoutInfinite(elem, elem.options.itemSelector, elem.options.gridMargin);
                    }
                    if ($gridFilter.length > 0) {
                        $gridFilter.each(function() {
                            var elemFilter = $(this),
                                $filterItem = elemFilter.find('a'),
                                elemFilterLayout = elemFilter.attr('data-layout'),
                                $filterItemActiveClass = "active";
                            $filterItem.on('click', function() {
                                elemFilter.find('li').removeClass($filterItemActiveClass);
                                $(this).parent('li').addClass($filterItemActiveClass);
                                var filterValue = $(this).attr('data-category');
                                $(elemFilterLayout).isotope({
                                    filter: filterValue
                                }).on('layoutComplete', function() {
                                    $window.trigger("scroll");
                                });
                                if ($(".grid-active-title").length > 0) {
                                    $(".grid-active-title").empty().append($(this).text())
                                }
                                return false;
                            });
                            if (elemDefaultFilter) {
                                var filterDefaultValue = elemFilter.find($('[data-category="' + elem.options.filter + '"]'));
                                elemFilter.find('li').removeClass($filterItemActiveClass);
                                filterDefaultValue.parent('li').addClass($filterItemActiveClass);
                            } else {
                                var filterDefaultValue = elemFilter.find($('[data-category="*"]'));
                                filterDefaultValue.parent('li').addClass($filterItemActiveClass);
                            }
                        });
                    }
                });
            }
        },
        gridLayoutInfinite: function(element, elementSelector, elemGridMargin) {

            //Check if infiniteScroll plugin is loaded
            if (typeof $.fn.infiniteScroll === 'undefined') {
                INSPIRO.elements.notification("Warning", "jQuery infiniteScroll plugin is missing, please add this code line <b> &lt;script src=&quot;plugins/metafizzy/infinite-scroll.min.js&quot;&gt;&lt;/script&gt;</b>, before <b>plugins.js</b>", "danger");
                return true;
            }
            var elem = element,
                gridItem = elementSelector,
                gridMargin = elemGridMargin,
                loadOnScroll = true,
                threshold = 500,
                prefilli = true,
                loadMoreElem = $("#showMore"),
                loadMoreBtn = $("#showMore a.btn"),
                loadMoreBtnText = $("#showMore a.btn").html(),
                loadMoreMessage = $('<div class="infinite-scroll-message"><p class="animated visible fadeIn">No more posts to show</p></div>');

            var pathSelector = $('.infinite-scroll > a').attr('href');
            if (pathSelector.indexOf(".html") > -1) {
                var pathSelector = pathSelector.replace(/(-\d+)/g, '-{{#}}');
            }

            if (loadMoreElem.length > 0) {
                loadOnScroll = false;
                threshold = false;
                prefilli = false;
            }
            elem.infiniteScroll({
                path: pathSelector,
                append: '.' + gridItem,
                history: false,
                button: '#showMore a',
                scrollThreshold: threshold,
                loadOnScroll: loadOnScroll,
                prefill: prefilli,
            });

            elem.on('load.infiniteScroll', function(event, response, path, items) {
                var $items = $(response).find('.' + gridItem);
                $items.imagesLoaded(function() {
                    elem.append($items);
                    elem.isotope('insert', $items);
                });
            });

            elem.on('error.infiniteScroll', function(event, error, path) {
                loadMoreElem.addClass("animated visible fadeOut");
                var t = setTimeout(function() {
                    loadMoreElem.hide();
                    elem.after(loadMoreMessage);
                }, 500);
                var t = setTimeout(function() {
                    $(".infinite-scroll-message").addClass("animated visible fadeOut");
                }, 3000);
            })
            elem.on('append.infiniteScroll', function(event, response, path, items) {
                INSPIRO.slider.carousel($(items).find('.carousel'));
                loadMoreBtn.html(loadMoreBtnText);
                element.css("margin", "0 -" + gridMargin + "px -" + gridMargin + "px 0");
                element.find('.' + gridItem).css("padding", "0 " + gridMargin + "px " + gridMargin + "px 0");
            });
        },

        tooltip: function() {
            var $tooltip = $('[data-toggle="tooltip"]');
            if ($tooltip.length > 0) {
                //Check if tooltip plugin is loaded
                if (typeof $.fn.tooltip === 'undefined') {
                    INSPIRO.elements.notification("Warning: jQuery tooltip plugin is missing in plugins.js file.", "warning")
                    return true;
                }
                //Initialize Tooltip plugin function
                $tooltip.tooltip();
            }
        },
        popover: function() {
            var $popover = $('[data-toggle="popover"]');
            if ($popover.length > 0) {

                //Check if popover plugin is loaded
                if (typeof $.fn.popover === 'undefined') {
                    INSPIRO.elements.notification("Warning: jQuery popover plugin is missing in plugins.js file.", "warning")
                    return true;
                }
                //Initialize Tooltip plugin function
                $popover.popover({
                    container: 'body',
                    html: true
                });
            }
        },

        magnificPopup: function() {
            var $lightbox = $('[data-lightbox]');
            if ($lightbox.length > 0) {
                //Check if magnificPopup plugin is loaded
                if (typeof $.fn.magnificPopup === 'undefined') {
                    INSPIRO.elements.notification("Warning", "jQuery magnificPopup plugin is missing in plugins.js file.", "danger")
                    return true;
                }
                //Get lightbox data type
                var getType = {
                        image: {
                            type: 'image',
                            closeOnContentClick: true,
                            removalDelay: 500,
                            image: {
                                verticalFit: true
                            },
                            callbacks: {
                                beforeOpen: function() {
                                    this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                                    this.st.mainClass = "mfp-zoom-out";
                                }
                            }
                        },
                        gallery: {
                            delegate: 'a[data-lightbox="gallery-image"], a[data-lightbox="image"]',
                            type: 'image',
                            image: {
                                verticalFit: true
                            },
                            gallery: {
                                enabled: true,
                                navigateByImgClick: true,
                                preload: [0, 1]
                            },
                            removalDelay: 500,
                            callbacks: {
                                beforeOpen: function() {
                                    this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                                    this.st.mainClass = "mfp-zoom-out";
                                }
                            },
                        },
                        iframe: {
                            type: 'iframe',
                            removalDelay: 500,
                            callbacks: {
                                beforeOpen: function() {
                                    this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                                    this.st.mainClass = "mfp-zoom-out";
                                }
                            }
                        },
                        ajax: {
                            type: 'ajax',
                            removalDelay: 500,
                            callbacks: {
                                ajaxContentAdded: function(mfpResponse) {
                                    INSPIRO.slider.carouselAjax();
                                    INSPIRO.elements.responsiveVideos();
                                    INSPIRO.elements.buttons();
                                }
                            }
                        },
                        inline: {
                            type: 'inline',
                            removalDelay: 500,
                            callbacks: {
                                beforeOpen: function() {
                                    this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                                    this.st.mainClass = "mfp-zoom-out";
                                }
                            },
                            closeBtnInside: false,
                            fixedContentPos: true,
                            overflowY: 'scroll',
                        }
                    }
                    //Initializing jQuery magnificPopup plugin and passing the options
                $lightbox.each(function() {
                    var elem = $(this),
                        elemType = elem.attr('data-lightbox');
                    switch (elemType) {
                        case 'image':
                            elem.magnificPopup(getType.image);
                            break;
                        case 'gallery':
                            elem.magnificPopup(getType.gallery);
                            break;
                        case 'iframe':
                            elem.magnificPopup(getType.iframe);
                            break;
                        case 'ajax':
                            elem.magnificPopup(getType.ajax);
                            break;
                        case 'inline':
                            elem.magnificPopup(getType.inline);
                            break;
                    }
                });
            }
        },
        yTPlayer: function() {
            var $ytPlayer = $('.youtube-background');
            if ($ytPlayer.length > 0) {
                //Check if YTPlayer plugin is loaded
                if (typeof $.fn.YTPlayer === 'undefined') {
                    INSPIRO.elements.notification("Warning", "jQuery YTPlayer plugin is missing, please add this code line <b> &lt;script src=&quot;plugins/youtube-player/jquery.mb.YTPlayer.min.js&quot;&gt;&lt;/script&gt;</b>, before <b><--Template functions--></b>", "danger", 10000)
                    return true;
                }
                $ytPlayer.each(function() {
                    var elem = $(this);
                    //Plugin Options
                    elem.options = {
                        videoURL: elem.attr('data-youtube-url'),
                        autoPlay: elem.data('youtube-autoplay') == false ? 0 : 1,
                        mute: elem.data('youtube-mute') == false ? false : true,
                        pauseOnScroll: elem.data('youtube-pauseOnScroll') == false ? false : true,
                        loop: elem.data('youtube-loop') == false ? false : true,
                        vol: elem.attr('data-youtube-volume') || 50,
                        startAt: elem.attr('data-youtube-start') || 0,
                        stopAt: elem.attr('data-youtube-stop') || 0,
                        controls: elem.data('youtube-controls') == true ? 1 : 0,
                    }
                    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                    var match = elem.options.videoURL.match(regExp);
                    if (match && match[2].length == 11) {
                        elem.options.videoURL = match[2];
                    } else {
                        elem.options.videoURL = elem.options.videoURL;
                    }
                    elem.YTPlayer({
                        fitToBackground: true,
                        videoId: elem.options.videoURL,
                        repeat: elem.options.loop,
                        playerVars: {
                            start: elem.options.start,
                            end: elem.options.end,
                            autoplay: elem.options.autoPlay,
                            modestbranding: elem.options.logo,
                            controls: elem.options.controls,
                            origin: window.location.origin,
                            branding: 0,
                            rel: 0,
                            showinfo: 0,
                        },
                        events: {
                            'onReady': onPlayerReady,
                        }
                    });

                    function onPlayerReady(event) {
                        if (elem.options.vol) {
                            event.target.setVolume(elem.options.vol);
                        }
                        if (elem.options.mute) {
                            event.target.mute();
                        }
                        if (elem.options.pauseOnScroll) {
                            var waypoint = new Waypoint({
                                element: elem,
                                handler: function(direction) {
                                    event.target.pauseVideo();
                                    if (elem.options.autoPlay == true && direction == 'up') {
                                        event.target.playVideo();
                                    }
                                }
                            });
                        }
                    }
                });
            }
        },
        vimeoPlayer: function() {
            var $vmPlayer = $('.vimeo-background');
            if ($vmPlayer.length > 0) {
                //Check if vimeo_player plugin is loaded
                if (typeof $.fn.vimeo_player === 'undefined') {
                    INSPIRO.elements.notification("Warning", "jQuery vimeo_player plugin is missing, please add this code line <b> &lt;script src=&quot;plugins/vimeo-player/jquery.mb.vimeo_player.min.js&quot;&gt;&lt;/script&gt;</b>, before <b><--Template functions--></b>", "danger", 10000)
                    return true;
                }
                $vmPlayer.each(function() {
                    var elem = $(this),
                        elemVideo = elem.attr('data-vimeo-url') || null,
                        elemMute = elem.attr('data-vimeo-mute') || false,
                        elemRatio = elem.attr('data-vimeo-ratio') || '16/9',
                        elemQuality = elem.attr('data-vimeo-quality') || 'hd720',
                        elemOpacity = elem.attr('data-vimeo-opacity') || 1,
                        elemContainer = elem.attr('data-vimeo-container') || 'self',
                        elemOptimize = elem.attr('data-vimeo-optimize') || true,
                        elemLoop = elem.attr('data-vimeo-loop') || true,
                        elemVolume = elem.attr('data-vimeo-volume') || 70,
                        elemStart = elem.attr('data-vimeo-start') || 0,
                        elemStop = elem.attr('data-vimeo-stop') || 0,
                        elemAutoPlay = elem.attr('data-vimeo-autoplay') || true,
                        elemFullScreen = elem.attr('data-vimeo-fullscreen') || true,
                        elemControls = elem.attr('data-vimeo-controls') || false,
                        elemLogo = elem.attr('data-vimeo-logo') || false,
                        elemAutoPause = elem.attr('data-vimeo-autopause') || false;
                    elem.vimeo_player({
                        videoURL: elemVideo,
                        mute: elemMute,
                        ratio: elemRatio,
                        quality: elemQuality,
                        opacity: elemOpacity,
                        containment: elemContainer,
                        optimizeDisplay: elemOptimize,
                        loop: elemLoop,
                        vol: elemVolume,
                        startAt: elemStart,
                        stopAt: elemStop,
                        autoPlay: elemAutoPlay,
                        realfullscreen: elemFullScreen,
                        showvmLogo: elemLogo,
                        showControls: elemControls
                    });
                });
            }
        },
        modal: function() {
            //Check if magnificPopup plugin is loaded
            if (typeof $.fn.magnificPopup === 'undefined') {
                INSPIRO.elements.notification("Warning", "jQuery magnificPopup plugin is missing in plugins.js file.", "danger")
                return true;
            }
            var $modal = $(".modal"),
                $modalStrip = $(".modal-strip"),
                $btnModal = $(".btn-modal"),
                modalShow = "modal-auto-open",
                modalShowClass = "modal-active",
                modalDecline = $(".modal-close"),
                cookieNotify = $(".cookie-notify"),
                cookieConfirm = cookieNotify.find(".modal-confirm, .mfp-close");
            /*Modal*/
            if ($modal.length > 0) {
                $modal.each(function() {
                    var elem = $(this),
                        elemDelay = elem.attr("data-delay") || 3000,
                        elemCookieExpire = elem.attr("data-cookie-expire") || 365,
                        elemCookieName = elem.attr("data-cookie-name") || "cookieModalName2020_3",
                        elemCookieEnabled = elem.data("cookie-enabled") == true ? true : false,
                        elemModalDismissDelay = elem.attr("data-delay-dismiss");
                    /*Modal Auto Show*/
                    if (elem.hasClass(modalShow)) {
                        var modalElem = $(this);
                        var timeout = setTimeout(function() {
                            modalElem.addClass(modalShowClass);
                        }, elemDelay);
                    }
                    /*Modal Dissmis Button*/
                    elem.find(modalDecline).click(function() {
                        elem.removeClass(modalShowClass);
                        return false;
                    });
                    /*Modal Auto Show*/
                    if (elem.hasClass(modalShow)) {
                        if (elemCookieEnabled != true) {
                            /*Cookie Notify*/
                            var t = setTimeout(function() {
                                $.magnificPopup.open({
                                    items: {
                                        src: elem
                                    },
                                    type: 'inline',
                                    closeBtnInside: true,
                                    callbacks: {
                                        beforeOpen: function() {
                                            this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                                            this.st.mainClass = "mfp-zoom-out";
                                        },
                                        open: function() {
                                            if (elem.find("video").length > 0) {
                                                elem.find("video").get(0).play();
                                            }
                                        },
                                    }
                                }, 0);
                            }, elemDelay);
                        } else {
                            if (typeof Cookies.get(elemCookieName) == 'undefined') {
                                /*Cookie Notify*/
                                var t = setTimeout(function() {
                                    $.magnificPopup.open({
                                        items: {
                                            src: elem
                                        },
                                        type: 'inline',
                                        closeBtnInside: true,
                                        callbacks: {
                                            beforeOpen: function() {
                                                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                                                this.st.mainClass = "mfp-zoom-out";
                                            },
                                            open: function() {
                                                if (elem.find("video").length > 0) {
                                                    elem.find("video").get(0).play();
                                                }
                                            },
                                            close: function() {
                                                Cookies.set(elemCookieName, true, {
                                                    expires: Number(elemCookieExpire)
                                                });
                                            }
                                        }
                                    }, 0);
                                }, elemDelay);
                            }
                        }
                    }
                    /*Modal Dissmis Button*/
                    elem.find(modalDecline).click(function() {
                        $.magnificPopup.close();
                        return false;
                    });

                    if (elemModalDismissDelay) {

                    }
                });
            }
            /*Modal Strip*/
            if ($modalStrip.length > 0) {
                $modalStrip.each(function() {
                    var elem = $(this),
                        elemDelay = elem.attr("data-delay") || 3000,
                        elemCookieExpire = elem.attr("data-cookie-expire") || 365,
                        elemCookieName = elem.attr("data-cookie-name") || "cookieName2013",
                        elemCookieEnabled = elem.data("cookie-enabled") == true ? true : false,
                        elemModalDismissDelay = elem.attr("data-delay-dismiss");
                    /*Modal Auto Show*/
                    if (elem.hasClass(modalShow)) {
                        var modalElem = $(this);
                        var timeout = setTimeout(function() {
                            modalElem.addClass(modalShowClass);
                            if (elemModalDismissDelay) {
                                var t = setTimeout(function() {
                                    elem.removeClass(modalShowClass);
                                }, elemModalDismissDelay);
                            }

                        }, elemDelay);
                    }
                    /*Modal Dissmis Button*/
                    elem.find(modalDecline).click(function() {
                        elem.removeClass(modalShowClass);
                        return false;
                    });
                    /*Cookie Notify*/
                    if (elem.hasClass("cookie-notify")) {
                        var timeout = setTimeout(function() {
                            if (elemCookieEnabled != true) {
                                cookieNotify.addClass(modalShowClass);
                            } else {
                                if (typeof Cookies.get(elemCookieName) == 'undefined') {
                                    cookieNotify.addClass(modalShowClass);
                                }
                            }
                        }, elemDelay);
                        cookieConfirm.click(function() {
                            Cookies.set(elemCookieName, true, {
                                expires: Number(elemCookieExpire)
                            });
                            $.magnificPopup.close();
                            cookieNotify.removeClass(modalShowClass);
                            return false;
                        });
                    }
                });
            }

            /*Modal toggles*/
            if ($btnModal.length > 0) {
                $btnModal.each(function() {
                    var elem = $(this),
                        modalTarget = elem.attr("data-modal");
                    elem.click(function() {
                        $(modalTarget).toggleClass(modalShowClass, 1000);
                        return false;
                    });
                });
            }
        },
        notification: function($title, $message, $type, $element, $delay, $placement, $animateEnter, $animateExit, $backgroundImage, $timeout) {

            var $element,
                $elementContainer,
                $animateEnter = $animateEnter || "fadeInDown",
                $animateExit = $animateExit || "fadeOutDown",
                $placement,
                $backgroundImage,
                $backgroundImageContainer,
                $timeout;


            if ($placement) {
                $placement = $placement;
            } else {
                $placement = "top";
            }

            if ($element) {
                $elementContainer = "element-container";
                $animateEnter = "fadeIn",
                    $animateExit = "fadeOut";
            } else {

                $elementContainer = "col-11 col-md-4";
            }

            if ($backgroundImage) {
                $backgroundImageContainer = 'style="background-image:url(' + $backgroundImage + '); background-repeat: no-repeat; background-position: 50% 20%; height:120px !important; width:430px !important; border:0px;" ';
            }

            if (!$message) {
                $message = "";
            }

            $element = 'body';


            var notify = function() {
                $.notify({
                    title: $title,
                    message: $message
                }, {
                    element: $element,
                    type: $type || 'warning',
                    delay: $delay || 10000,
                    template: '<div data-notify="container" ' + $backgroundImageContainer + ' class="bootstrap-notify ' + $elementContainer + ' alert alert-{0}" role="alert">' +
                        '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
                        '<span data-notify="icon"></span> ' +
                        '<span data-notify="title">{1}</span> ' +
                        '<span data-notify="message">{2}</span>' +
                        '</div>',
                    mouse_over: true,
                    allow_dismiss: true,
                    placement: {
                        from: $placement
                    },
                    animate: {
                        enter: 'animated ' + $animateEnter,
                        exit: 'animated ' + $animateExit
                    }
                });
            }

            if ($timeout) {
                setTimeout(function() {
                    notify();
                }, 2000);
            } else {
                notify();
            }

        },
        sidebarFixed: function() {
            if (INSPIRO.core.rtlStatus()) {
                return true;
            }
            var $sidebarFixed = $('.sticky-sidebar');
            if ($sidebarFixed.length > 0) {
                //Check if theiaStickySidebar plugin is loaded
                if (typeof $.fn.theiaStickySidebar === 'undefined') {
                    INSPIRO.elements.notification("Warning", "jQuery theiaStickySidebar plugin is missing in plugins.js file.", "danger")
                    return true;
                }
                $sidebarFixed.each(function() {
                    var elem = $(this);
                    elem.options = {
                            additionalMarginTop: elem.attr('data-margin-top') || 120,
                            additionalMarginBottom: elem.attr('data-margin-bottom') || 50
                        }
                        //Initialize theiaStickySidebar plugin and passing the options
                    elem.theiaStickySidebar({
                        additionalMarginTop: Number(elem.options.additionalMarginTop),
                        additionalMarginBottom: Number(elem.options.additionalMarginBottom),
                        disableOnResponsiveLayouts: true
                    });
                });
            }
        },
        bootstrapSwitch: function() {
            var $bootstrapSwitch = $('[data-switch=true]');
            if ($bootstrapSwitch.length > 0) {
                //Check if bootstrapSwitch plugin is loaded
                if (typeof $.fn.bootstrapSwitch === 'undefined') {
                    INSPIRO.elements.notification("Warning", "jQuery bootstrapSwitch plugin is missing in plugins.js file.", "danger")
                    return true;
                }
                //Initialize jQuery BootstrapSwitch plugin
                $bootstrapSwitch.bootstrapSwitch();
            }
        },
        clipboard: function() {
            var $clipboardTarget = $('[data-clipboard-target]'),
                $clipboardText = $('[data-clipboard-text]');
            if ($clipboardTarget.length > 0) {
                //Check if ClipboardJS plugin is loaded
                if (typeof ClipboardJS === 'undefined') {
                    INSPIRO.elements.notification("Warning", "jQuery ClipboardJS plugin is missing in plugins.js file.", "danger")
                    return true;
                }
                if ($clipboardTarget) {
                    new ClipboardJS('[data-clipboard-target]');
                    clipboardInit($clipboardTarget);
                }
                if ($clipboardText) {
                    new ClipboardJS('[data-clipboard-text]');
                    clipboardInit($clipboardText);
                }

                function clipboardInit(clipboardType) {
                    clipboardType.each(function() {
                        var elem = $(this),
                            title = elem.attr('data-original-title') || "Copy to clipboard",
                            titleSuccess = elem.attr('data-original-title-success') || "Copied!";
                        elem.tooltip({
                            placement: 'top',
                            title: title
                        });
                        elem.on('click', function() {
                            elem.attr('data-original-title', titleSuccess).tooltip('show');
                        }).on('mouseleave', function() {
                            elem.tooltip('hide').attr('data-original-title', title);
                            return false;
                        });
                    });
                }
            }
        },
        countdown: function() {
            var $countdown = $(".p-countdown");
            if ($countdown.length > 0) {
                $countdown.each(function() {
                    var $elem = $(this),
                        $elemCount = $elem.find(".p-countdown-count"),
                        $elemShow = $elem.find(".p-countdown-show"),
                        $elemSeconds = $elem.attr("data-delay") || 5;
                    $elemCount.find('.count-number').html($elemSeconds);
                    new Waypoint({
                        element: $elem,
                        handler: function() {
                            var interval = setInterval(function() {
                                $elemSeconds--;
                                if ($elemSeconds == 0) {
                                    clearInterval(interval);
                                    $elemCount.fadeOut("slow");
                                    setTimeout(function() {
                                        $elemShow.fadeIn('show');
                                    }, 1000);
                                } else {
                                    $elemCount.find('.count-number').html($elemSeconds);
                                }
                            }, 1000);
                            this.destroy();
                        },
                        offset: '100%'
                    });
                });
            }
        },
        videoBackground: function() {
            var $videoBackground = $('[data-bg-video], [data-vide-bg]');
            if ($videoBackground.length > 0) {
                $videoBackground.each(function() {
                    var elem = $(this);
                    elem.options = {
                        autoplay: elem.attr("data-video-autoplay") || true,
                        controls: elem.attr("data-video-controls"),
                        loop: elem.attr("data-video-loop") || true,
                        muted: elem.attr("data-video-muted") || true,
                        poster: elem.attr('data-video-poster') || "",
                        preload: elem.attr('data-video-preload') || "auto",
                        src: elem.attr('data-bg-video'),
                        randomId: Math.random().toString(36).substr(2, 5)
                    };
                    if (elem.options.controls) {
                        elem.options.controls = ' controls="' + elem.options.controls + '" ';
                    } else {
                        elem.options.controls = "";
                    }
                    elem.prepend('<div class="html5vid" id="video-' + elem.options.randomId + '">' +
                        '<video playsinline ' + elem.options.controls + ' loop="' + elem.options.loop + '" muted="' + elem.options.muted + '" poster="' + elem.options.poster + '" preload="' + elem.options.preload + '">' +
                        '<source src="' + elem.options.src + '" type="video/mp4">' +
                        '</video>' +
                        '</div>');
                    if (elem.options.autoplay) {
                        setTimeout(function() {
                            $("#video-" + elem.options.randomId).find("video").get(0).play();
                        }, 100);
                    }
                    setTimeout(function() {
                        $("#video-" + elem.options.randomId).addClass("video-loaded");
                    }, 300);
                });
            }
        }
    };
    INSPIRO.widgets = {
        functions: function() {
            INSPIRO.widgets.twitter();
            INSPIRO.widgets.flickr();
            INSPIRO.widgets.instagram();
            INSPIRO.widgets.subscribeForm();
        },
        twitter: function() {
            var $widget_twitter = $('.widget-tweeter') || $('.widget-twitter');
            if ($widget_twitter.length > 0) {
                //Check if twittie plugin is loaded
                if (typeof $.fn.twittie === 'undefined') {
                    INSPIRO.elements.notification("Warning", "jQuery twittie plugin is missing in plugins.js file.", "danger")
                    return true;
                }
                var t = setTimeout(function() {
                    $widget_twitter.each(function() {
                        var elem = $(this),
                            twitterUsername = elem.attr('data-username') || "ardianmusliu",
                            twitterLimit = elem.attr('data-limit') || 2,
                            twitterDateFormat = elem.attr('data-format') || '%b/%d/%Y',
                            twitterLoadingText = elem.attr('data-loading-text') || 'Loading...',
                            twitterApiPAth = elem.attr('data-loader') || "include/twitter/tweet.php",
                            twitterAvatar = elem.attr('data-avatar') || false;
                        if (twitterAvatar == 'true') {
                            twitterAvatar = "{{avatar}}";
                        } else {
                            twitterAvatar = "";
                        }
                        elem.append('<div id="twitter-cnt"></div>')
                        elem.find('#twitter-cnt').twittie({
                            'username': twitterUsername,
                            'count': twitterLimit,
                            'dateFormat': twitterDateFormat,
                            'template': twitterAvatar + '{{tweet}}<small>{{date}}</small>',
                            'apiPath': twitterApiPAth,
                            'loadingText': twitterLoadingText
                        }, function() {
                            if (elem.parents('.grid-layout').length > 0) {
                                elem.parents('.grid-layout').isotope('layout');
                            }
                        });

                    });
                }, 2000);
            }
        },
        flickr: function() {
            var $flickr_widget = $('.flickr-widget');
            if ($flickr_widget.length > 0) {
                //Check if jflickrfeed plugin is loaded
                if (typeof $.fn.jflickrfeed === 'undefined') {
                    INSPIRO.elements.notification("Warning", "jQuery jflickrfeed plugin is missing in plugins.js file.", "danger")
                    return true;
                }
                $flickr_widget.each(function() {
                    var elem = $(this);
                    elem.options = {
                            id: elem.attr('data-flickr-id') || "52617155@N08",
                            limit: elem.attr('data-flickr-images') || "9",
                            itemTemplate: '<a href="{{image}}" title="{{title}}"><img src="{{image_s}}" alt="{{title}}" /></a>'
                        }
                        //Initializing jflickrfeed plugin and passing the options
                    $flickr_widget.jflickrfeed({
                        limit: elem.options.limit,
                        qstrings: {
                            id: elem.options.id
                        },
                        itemTemplate: elem.options.itemTemplate
                    }, function() {
                        var t = setTimeout(function() {
                            elem.addClass('flickr-widget-loaded');

                        }, 1000);
                        elem.magnificPopup({
                            delegate: 'a',
                            type: 'image',
                            gallery: {
                                enabled: true
                            }
                        });

                        if (elem.parents('.grid-layout').length > 0) {
                            elem.parents('.grid-layout').isotope('layout');
                        }
                    });
                });
            }
        },
        instagram: function() {
            var $widget_instagram = $('.widget-instagram');
            if ($widget_instagram.length > 0) {
                //Check if spectragram plugin is loaded
                if (typeof $.fn.spectragram === 'undefined') {
                    INSPIRO.elements.notification("Warning", "jQuery spectragram plugin is missing in plugins.js file.", "danger")
                    return true;
                }
                $widget_instagram.each(function() {
                    var elem = $(this),
                        instagramLimit = elem.attr('data-limit') || 12,
                        instagramColumns = elem.attr('data-col') || 3,
                        instagramAccessToken = elem.attr('data-token') || '5783726529.226c7d2.68a168eec1264759b9f91c1fc2c6ce56',
                        instagramItems = "#instagram-cnt",
                        instagramSize = elem.attr('data-size') || 'small', //The size of the photos. 'small', 'medium' or 'big'. Default: 'medium'
                        instagramGridColumns = "grid-" + instagramColumns;
                    elem.append('<div id="instagram-cnt" class="' + instagramGridColumns + '"></div>');
                    jQuery.fn.spectragram.accessData = {
                        accessToken: instagramAccessToken
                    };
                    elem.find($(instagramItems)).spectragram('getUserFeed', {
                        size: instagramSize,
                        max: instagramLimit,
                        wrapEachWith: '',
                        complete: function() {
                            elem.addClass('widget-instagram-loaded');
                            if (elem.parents('.grid-layout').length > 0) {
                                elem.parents('.grid-layout').isotope('layout');
                            }
                        }
                    });
                });
            }
        },
        subscribeForm: function() {
            var $subscribeForm = $(".widget-subscribe-form");
            if ($subscribeForm.length > 0) {
                $subscribeForm.each(function() {
                    var elem = $(this),
                        elemSuccessMessage = elem.attr('success-message') || "You have successfully subscribed to our mailing list.";
                    var addonIcon = elem.find('#widget-subscribe-submit-button'),
                        addonIconText = addonIcon.html();
                    elem.submit(function(event) {
                        event.preventDefault();
                        var post_url = $(this).attr("action");
                        var request_method = $(this).attr("method");
                        var form_data = $(this).serialize();
                        if (elem[0].checkValidity() === false) {
                            event.stopPropagation();
                            elem.addClass('was-validated');
                        } else {
                            $(elem).removeClass("was-validated");
                            addonIcon.html('<i class="icon-loader fa-spin"></i>');
                            $.ajax({
                                url: post_url,
                                type: request_method,
                                data: form_data,
                                dataType: 'json',
                                success: function(text) {
                                    if (text.response == 'success') {
                                        $.notify({
                                            message: elemSuccessMessage
                                        }, {
                                            type: 'success'
                                        });
                                        $(elem)[0].reset();
                                        $(elem).removeClass("was-validated");
                                        addonIcon.html(addonIconText);
                                    } else {
                                        $.notify({
                                            message: text.message
                                        }, {
                                            type: 'warning'
                                        });
                                        $(elem)[0].reset();
                                        $(elem).removeClass("was-validated");
                                        addonIcon.html(addonIconText);
                                    }
                                },
                                done: function() {
                                    addonIcon.html(addonIconText);
                                }
                            });
                        }
                    });
                });
            }
        }
    };
    //Load Functions on document ready
    $(document).ready(function() {
        INSPIRO.core.functions();
        INSPIRO.header.functions();
        INSPIRO.slider.functions();
        INSPIRO.widgets.functions();
        INSPIRO.elements.functions();
    });
    //Recall Functions on window scroll
    $window.on('scroll', function() {
        INSPIRO.header.stickyHeader();
        INSPIRO.core.scrollTop();
        INSPIRO.header.dotsMenu();
    });
    //Recall Functions on window resize
    $window.on('resize', function() {
        INSPIRO.header.logoStatus();
        INSPIRO.header.stickyHeader();

    });
})(jQuery);
/**
 * jQuery.marquee - scrolling text like old marquee element
 * @author Aamir Afridi - aamirafridi(at)gmail(dot)com / http://aamirafridi.com/jquery/jquery-marquee-plugin
 */
(function(f) {
    f.fn.marquee = function(x) {
        return this.each(function() {
            var a = f.extend({}, f.fn.marquee.defaults, x),
                b = f(this),
                c, t, e = 3,
                y = "animation-play-state",
                p = !1,
                E = function(a, b, c) { for (var e = ["webkit", "moz", "MS", "o", ""], d = 0; d < e.length; d++) e[d] || (b = b.toLowerCase()), a.addEventListener(e[d] + b, c, !1) },
                F = function(a) {
                    var b = [],
                        c;
                    for (c in a) a.hasOwnProperty(c) && b.push(c + ":" + a[c]);
                    b.push();
                    return "{" + b.join(",") + "}"
                },
                l = {
                    pause: function() {
                        p && a.allowCss3Support ? c.css(y, "paused") : f.fn.pause && c.pause();
                        b.data("runningStatus",
                            "paused");
                        b.trigger("paused")
                    },
                    resume: function() {
                        p && a.allowCss3Support ? c.css(y, "running") : f.fn.resume && c.resume();
                        b.data("runningStatus", "resumed");
                        b.trigger("resumed")
                    },
                    toggle: function() { l["resumed" == b.data("runningStatus") ? "pause" : "resume"]() },
                    destroy: function() {
                        clearTimeout(b.timer);
                        b.find("*").addBack().unbind();
                        b.html(b.find(".js-marquee:first").html())
                    }
                };
            if ("string" === typeof x) f.isFunction(l[x]) && (c || (c = b.find(".js-marquee-wrapper")), !0 === b.data("css3AnimationIsSupported") && (p = !0), l[x]());
            else {
                var u;
                f.each(a, function(c, d) {
                    u = b.attr("data-" + c);
                    if ("undefined" !== typeof u) {
                        switch (u) {
                            case "true":
                                u = !0;
                                break;
                            case "false":
                                u = !1
                        }
                        a[c] = u
                    }
                });
                a.speed && (a.duration = parseInt(b.width(), 10) / a.speed * 1E3);
                var v = "up" == a.direction || "down" == a.direction;
                a.gap = a.duplicated ? parseInt(a.gap) : 0;
                b.wrapInner('<div class="js-marquee"></div>');
                var h = b.find(".js-marquee").css({ "margin-right": a.gap, "float": "left" });
                a.duplicated && h.clone(!0).appendTo(b);
                b.wrapInner('<div style="width:100000px" class="js-marquee-wrapper"></div>');
                c = b.find(".js-marquee-wrapper");
                if (v) {
                    var k = b.height();
                    c.removeAttr("style");
                    b.height(k);
                    b.find(".js-marquee").css({ "float": "none", "margin-bottom": a.gap, "margin-right": 0 });
                    a.duplicated && b.find(".js-marquee:last").css({ "margin-bottom": 0 });
                    var q = b.find(".js-marquee:first").height() + a.gap;
                    a.startVisible && !a.duplicated ? (a._completeDuration = (parseInt(q, 10) + parseInt(k, 10)) / parseInt(k, 10) * a.duration, a.duration *= parseInt(q, 10) / parseInt(k, 10)) : a.duration *= (parseInt(q, 10) + parseInt(k, 10)) / parseInt(k, 10)
                } else {
                    var m =
                        b.find(".js-marquee:first").width() + a.gap;
                    var n = b.width();
                    a.startVisible && !a.duplicated ? (a._completeDuration = (parseInt(m, 10) + parseInt(n, 10)) / parseInt(n, 10) * a.duration, a.duration *= parseInt(m, 10) / parseInt(n, 10)) : a.duration *= (parseInt(m, 10) + parseInt(n, 10)) / parseInt(n, 10)
                }
                a.duplicated && (a.duration /= 2);
                if (a.allowCss3Support) {
                    h = document.body || document.createElement("div");
                    var g = "marqueeAnimation-" + Math.floor(1E7 * Math.random()),
                        A = ["Webkit", "Moz", "O", "ms", "Khtml"],
                        B = "animation",
                        d = "",
                        r = "";
                    h.style.animation &&
                        (r = "@keyframes " + g + " ", p = !0);
                    if (!1 === p)
                        for (var z = 0; z < A.length; z++)
                            if (void 0 !== h.style[A[z] + "AnimationName"]) {
                                h = "-" + A[z].toLowerCase() + "-";
                                B = h + B;
                                y = h + y;
                                r = "@" + h + "keyframes " + g + " ";
                                p = !0;
                                break
                            }
                    p && (d = g + " " + a.duration / 1E3 + "s " + a.delayBeforeStart / 1E3 + "s infinite " + a.css3easing, b.data("css3AnimationIsSupported", !0))
                }
                var C = function() { c.css("transform", "translateY(" + ("up" == a.direction ? k + "px" : "-" + q + "px") + ")") },
                    D = function() { c.css("transform", "translateX(" + ("left" == a.direction ? n + "px" : "-" + m + "px") + ")") };
                a.duplicated ?
                    (v ? a.startVisible ? c.css("transform", "translateY(0)") : c.css("transform", "translateY(" + ("up" == a.direction ? k + "px" : "-" + (2 * q - a.gap) + "px") + ")") : a.startVisible ? c.css("transform", "translateX(0)") : c.css("transform", "translateX(" + ("left" == a.direction ? n + "px" : "-" + (2 * m - a.gap) + "px") + ")"), a.startVisible || (e = 1)) : a.startVisible ? e = 2 : v ? C() : D();
                var w = function() {
                    a.duplicated && (1 === e ? (a._originalDuration = a.duration, a.duration = v ? "up" == a.direction ? a.duration + k / (q / a.duration) : 2 * a.duration : "left" == a.direction ? a.duration + n /
                        (m / a.duration) : 2 * a.duration, d && (d = g + " " + a.duration / 1E3 + "s " + a.delayBeforeStart / 1E3 + "s " + a.css3easing), e++) : 2 === e && (a.duration = a._originalDuration, d && (g += "0", r = f.trim(r) + "0 ", d = g + " " + a.duration / 1E3 + "s 0s infinite " + a.css3easing), e++));
                    v ? a.duplicated ? (2 < e && c.css("transform", "translateY(" + ("up" == a.direction ? 0 : "-" + q + "px") + ")"), t = { transform: "translateY(" + ("up" == a.direction ? "-" + q + "px" : 0) + ")" }) : a.startVisible ? 2 === e ? (d && (d = g + " " + a.duration / 1E3 + "s " + a.delayBeforeStart / 1E3 + "s " + a.css3easing), t = {
                        transform: "translateY(" +
                            ("up" == a.direction ? "-" + q + "px" : k + "px") + ")"
                    }, e++) : 3 === e && (a.duration = a._completeDuration, d && (g += "0", r = f.trim(r) + "0 ", d = g + " " + a.duration / 1E3 + "s 0s infinite " + a.css3easing), C()) : (C(), t = { transform: "translateY(" + ("up" == a.direction ? "-" + c.height() + "px" : k + "px") + ")" }) : a.duplicated ? (2 < e && c.css("transform", "translateX(" + ("left" == a.direction ? 0 : "-" + m + "px") + ")"), t = { transform: "translateX(" + ("left" == a.direction ? "-" + m + "px" : 0) + ")" }) : a.startVisible ? 2 === e ? (d && (d = g + " " + a.duration / 1E3 + "s " + a.delayBeforeStart / 1E3 + "s " + a.css3easing),
                        t = { transform: "translateX(" + ("left" == a.direction ? "-" + m + "px" : n + "px") + ")" }, e++) : 3 === e && (a.duration = a._completeDuration, d && (g += "0", r = f.trim(r) + "0 ", d = g + " " + a.duration / 1E3 + "s 0s infinite " + a.css3easing), D()) : (D(), t = { transform: "translateX(" + ("left" == a.direction ? "-" + m + "px" : n + "px") + ")" });
                    b.trigger("beforeStarting");
                    if (p) {
                        c.css(B, d);
                        var h = r + " { 100%  " + F(t) + "}",
                            l = c.find("style");
                        0 !== l.length ? l.filter(":last").html(h) : f("head").append("<style>" + h + "</style>");
                        E(c[0], "AnimationIteration", function() { b.trigger("finished") });
                        E(c[0], "AnimationEnd", function() {
                            w();
                            b.trigger("finished")
                        })
                    } else c.animate(t, a.duration, a.easing, function() {
                        b.trigger("finished");
                        a.pauseOnCycle ? b.timer = setTimeout(w, a.delayBeforeStart) : w()
                    });
                    b.data("runningStatus", "resumed")
                };
                b.bind("pause", l.pause);
                b.bind("resume", l.resume);
                a.pauseOnHover && (b.bind("mouseenter", l.pause), b.bind("mouseleave", l.resume));
                p && a.allowCss3Support ? w() : b.timer = setTimeout(w, a.delayBeforeStart)
            }
        })
    };
    f.fn.marquee.defaults = {
        allowCss3Support: !0,
        css3easing: "linear",
        easing: "linear",
        delayBeforeStart: 1E3,
        direction: "left",
        duplicated: !1,
        duration: 5E3,
        gap: 20,
        pauseOnCycle: !1,
        pauseOnHover: !1,
        startVisible: !1
    }
})(jQuery);
function decode(a) {
    return a.replace(/[a-zA-Z]/g, function(c) {
        return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ?
            c : c - 26);
    })
};

function openMailer(element, addr, country, user) {
    var y = decode(user + "@" + addr + '.' + country);
    element.setAttribute("href", 'mailto:' + y);
    element.setAttribute("onclick", "");
    // element.firstChild.nodeValue = "Open email software";
};