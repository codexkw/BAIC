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
