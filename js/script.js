// declaraction of document.ready() function.
(function () {
    var ie = !!(window.attachEvent && !window.opera);
    var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525);
    var fn = [];
    var run = function () {
        for (var i = 0; i < fn.length; i++) fn[i]();
    };
    var d = document;
    d.ready = function (f) {
        if (!ie && !wk && d.addEventListener)
            return d.addEventListener('DOMContentLoaded', f, false);
        if (fn.push(f) > 1) return;
        if (ie)
            (function () {
                try {
                    d.documentElement.doScroll('left');
                    run();
                } catch (err) {
                    setTimeout(arguments.callee, 0);
                }
            })();
        else if (wk)
            var t = setInterval(function () {
                if (/^(loaded|complete)$/.test(d.readyState))
                    clearInterval(t), run();
            }, 0);
    };
})();


function toggleCheck(bool) {
    document.querySelectorAll(".switch_default").forEach(el => el.checked = bool)
}


document.ready(
    // toggleTheme function.
    // this script shouldn't be changed.
    function () {
        var _Blog = window._Blog || {};
        const currentTheme = window.localStorage && window.localStorage.getItem('theme');
        const isDark = currentTheme === 'dark';
        const mobileToggleTheme = document.getElementById("mobile-toggle-theme")
        const body = document.getElementsByTagName('body')[0]
        if (isDark) {
            toggleCheck(true)
            // mobile
            mobileToggleTheme.innerText = " · Dark"
        } else {
            toggleCheck(false)
            // mobile
            mobileToggleTheme.innerText = " · Light"
        }
        _Blog.toggleTheme = function () {
            if (isDark) {
                body.classList.add('dark-theme');
                // mobile
                mobileToggleTheme.innerText = " · Dark"
            } else {
                body.classList.remove('dark-theme');
                // mobile
                mobileToggleTheme.innerText = " · Light"
            }
            document.querySelectorAll('.toggleBtn').forEach(el => {
                el.addEventListener('click', () => {
                    if (body.classList.contains('dark-theme')) {
                        body.classList.remove('dark-theme');
                    } else {
                        body.classList.add('dark-theme');
                    }
                    window.localStorage &&
                        window.localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light',)
                })
            })

            // moblie
            document.getElementById('mobile-toggle-theme').addEventListener('click', () => {
                if (body.classList.contains('dark-theme')) {
                    body.classList.remove('dark-theme');
                    // mobile
                    mobileToggleTheme.innerText = " · Light"
                } else {
                    body.classList.add('dark-theme');
                    // mobile
                    mobileToggleTheme.innerText = " · Dark"
                }
                window.localStorage &&
                    window.localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light',)
            })
        };

        _Blog.toggleTheme();

        // ready function.

    }
);