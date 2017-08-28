webpackJsonp([ 0 ], {
    /***/
    42: /***/
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        /* harmony import */
        var u = n(43), r = n.n(u), s = n(45), a = n(1), c = a(r.a, s.a, null, null, null);
        /* harmony default export */
        t.default = c.exports;
    },
    /***/
    43: /***/
    function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var u = n(2), r = n(44), s = function(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }(r);
        //
        //
        //
        //
        //
        //
        t.default = {
            methods: {
                cls: new u.componentGetClassNames(s.default)
            },
            created: function() {},
            mounted: function() {}
        };
    },
    /***/
    44: /***/
    function(e, t) {
        // removed by extract-text-webpack-plugin
        e.exports = {
            "home-wrap": "home-wrap_c9d45"
        };
    },
    /***/
    45: /***/
    function(e, t, n) {
        "use strict";
        var u = function() {
            var e = this, t = e.$createElement;
            return (e._self._c || t)("div", {
                class: e.cls("home-wrap")
            }, [ e._v("\n    HELLO WORLD!\n  ") ]);
        }, r = [], s = {
            render: u,
            staticRenderFns: r
        };
        /* harmony default export */
        t.a = s;
    }
});