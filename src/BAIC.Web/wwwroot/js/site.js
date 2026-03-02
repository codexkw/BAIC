// Header scroll effect
window.addEventListener('scroll', () => {
    document.getElementById('header').classList.toggle('scrolled', window.scrollY > 50);
});

// Mega menu tabs (Models dropdown)
document.querySelectorAll('.mega-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.mega-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const f = tab.dataset.filter;
        document.querySelectorAll('.mega-model-item').forEach((item, i) => {
            if (f === 'all' || item.dataset.cat === f) {
                item.classList.remove('hidden');
                item.style.opacity = '0';
                item.style.transform = 'translateY(8px)';
                setTimeout(() => {
                    item.style.transition = 'all .3s ease';
                    item.style.opacity = '';
                    item.style.transform = '';
                }, i * 30);
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// Cookie banner - show only once across all pages
(function () {
    const banner = document.getElementById('cookieBanner');
    if (!banner) return;
    if (localStorage.getItem('cookieConsent')) {
        banner.classList.add('hidden');
    }
    banner.querySelectorAll('.ck-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            banner.classList.add('hidden');
            localStorage.setItem('cookieConsent', '1');
        });
    });
})();

// Mobile menu toggle
(function () {
    const toggle = document.getElementById('menuToggle');
    const nav = document.querySelector('.nav-menu');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
        toggle.classList.toggle('active');
        nav.classList.toggle('open');
        document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    // Tap a nav item with dropdown to expand on mobile
    nav.querySelectorAll(':scope > li > a').forEach(function (link) {
        link.addEventListener('click', function (e) {
            if (window.innerWidth > 900) return;
            var li = link.parentElement;
            var sub = li.querySelector('.dropdown, .mega-menu');
            if (!sub) return;
            e.preventDefault();
            var wasOpen = li.classList.contains('open');
            nav.querySelectorAll(':scope > li').forEach(function (l) { l.classList.remove('open'); });
            if (!wasOpen) li.classList.add('open');
        });
    });

    // Close menu on window resize to desktop
    window.addEventListener('resize', function () {
        if (window.innerWidth > 900) {
            toggle.classList.remove('active');
            nav.classList.remove('open');
            document.body.style.overflow = '';
            nav.querySelectorAll(':scope > li').forEach(function (l) { l.classList.remove('open'); });
        }
    });
})();

// Scroll reveal for fade-in elements
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            fadeObserver.unobserve(e.target);
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));
