;(window._iconfont_svg_string_3741688 =
  '<svg><symbol id="icon-close" viewBox="0 0 1024 1024"><path d="M817.28 812.8l-121.856-0.576L512 593.6l-183.232 218.496-121.984 0.512a14.72 14.72 0 0 1-14.784-14.72 15.36 15.36 0 0 1 3.52-9.6l240.064-286.08-240.064-285.824A14.784 14.784 0 0 1 206.72 192l121.984 0.512L512 411.264l183.232-218.496 121.792-0.64c8.128 0 14.784 6.528 14.784 14.848a15.36 15.36 0 0 1-3.52 9.6L588.608 502.4l239.872 286.08a14.784 14.784 0 0 1-11.264 24.32z"  ></path></symbol><symbol id="icon-check" viewBox="0 0 1024 1024"><path d="M927.104 220.16l-467.84 646.4a70.784 70.784 0 0 1-114.88 0L67.392 484.096a17.792 17.792 0 0 1 14.4-28.16h104.192c22.656 0 44.16 10.88 57.6 29.44l158.08 218.816 349.248-482.688c13.376-18.368 34.688-29.44 57.6-29.44h104.128c14.464 0 22.912 16.384 14.464 28.16z"  ></path></symbol><symbol id="icon-arrow-right" viewBox="0 0 1024 1024"><path d="M478.592 128l-44.352 43.392 368.192 342.336-331.264 341.12 46.528 41.152 373.376-384.512z"  ></path><path d="M128 539.712h704v-64H128z"  ></path></symbol></svg>'),
  (function (n) {
    var t = (t = document.getElementsByTagName('script'))[t.length - 1],
      e = t.getAttribute('data-injectcss'),
      t = t.getAttribute('data-disable-injectsvg')
    if (!t) {
      var o,
        i,
        c,
        a,
        d,
        l = function (t, e) {
          e.parentNode.insertBefore(t, e)
        }
      if (e && !n.__iconfont__svg__cssinject__) {
        n.__iconfont__svg__cssinject__ = !0
        try {
          document.write(
            '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>'
          )
        } catch (t) {
          console && console.log(t)
        }
      }
      ;(o = function () {
        var t,
          e = document.createElement('div')
        ;(e.innerHTML = n._iconfont_svg_string_3741688),
          (e = e.getElementsByTagName('svg')[0]) &&
            (e.setAttribute('aria-hidden', 'true'),
            (e.style.position = 'absolute'),
            (e.style.width = 0),
            (e.style.height = 0),
            (e.style.overflow = 'hidden'),
            (e = e),
            (t = document.body).firstChild
              ? l(e, t.firstChild)
              : t.appendChild(e))
      }),
        document.addEventListener
          ? ~['complete', 'loaded', 'interactive'].indexOf(document.readyState)
            ? setTimeout(o, 0)
            : ((i = function () {
                document.removeEventListener('DOMContentLoaded', i, !1), o()
              }),
              document.addEventListener('DOMContentLoaded', i, !1))
          : document.attachEvent &&
            ((c = o),
            (a = n.document),
            (d = !1),
            r(),
            (a.onreadystatechange = function () {
              'complete' == a.readyState && ((a.onreadystatechange = null), s())
            }))
    }
    function s() {
      d || ((d = !0), c())
    }
    function r() {
      try {
        a.documentElement.doScroll('left')
      } catch (t) {
        return void setTimeout(r, 50)
      }
      s()
    }
  })(window)
