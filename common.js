// common.js – общие скрипты для всех страниц
(function() {
    "use strict";

    // ---- Бургер-меню ----
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => nav.classList.toggle('active'));
    }

    // ---- Поиск ----
    const searchIcon = document.getElementById('searchIcon');
    const searchPopup = document.getElementById('searchPopup');
    if (searchIcon && searchPopup) {
        searchIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            searchPopup.classList.toggle('active');
            if (searchPopup.classList.contains('active')) {
                const input = searchPopup.querySelector('input');
                if (input) input.focus();
            }
        });
        document.addEventListener('click', (e) => {
            if (!searchPopup.contains(e.target) && e.target !== searchIcon) {
                searchPopup.classList.remove('active');
            }
        });
    }

    // ---- Адаптивное меню (оставлено как есть) ----
    (function() {
        const nav = document.getElementById('nav');
        if (!nav) return;
        const originalHTML = nav.innerHTML;
        function buildMobile(items) {
            const main = ['Главная', 'О нас', 'Краеведение', 'Новинки', 'Услуги'];
            const more = ['Спидкубинг', 'События', 'Библиотеки района', 'Партнёры', 'Вопросы', 'Фотогалерея', 'Контакты'];
            let html = '<ul>';
            main.forEach(text => {
                const li = items.find(li => li.textContent.trim() === text);
                if (li) {
                    const a = li.querySelector('a');
                    if (a) {
                        const href = a.getAttribute('href');
                        const active = a.classList.contains('active') ? 'active' : '';
                        const icon = a.querySelector('i') ? a.querySelector('i').outerHTML : '';
                        html += `<li><a href="${href}" class="${active}">${icon} ${text}</a></li>`;
                    }
                }
            });
            html += `<li class="mobile-more"><a href="#" id="mobileMoreToggle">Ещё <i class="fas fa-chevron-down"></i></a><ul class="mobile-submenu" style="display: none;">`;
            more.forEach(text => {
                const li = items.find(li => li.textContent.trim() === text);
                if (li) {
                    const a = li.querySelector('a');
                    if (a) {
                        const href = a.getAttribute('href');
                        const active = a.classList.contains('active') ? 'active' : '';
                        const icon = a.querySelector('i') ? a.querySelector('i').outerHTML : '';
                        html += `<li><a href="${href}" class="${active}">${icon} ${text}</a></li>`;
                    }
                }
            });
            html += '</ul></li></ul>';
            return html;
        }
        function update() {
            if (window.innerWidth <= 768) {
                const temp = document.createElement('div');
                temp.innerHTML = originalHTML;
                const items = Array.from(temp.querySelectorAll('ul > li'));
                nav.innerHTML = buildMobile(items);
                const moreToggle = document.getElementById('mobileMoreToggle');
                if (moreToggle) {
                    moreToggle.addEventListener('click', function(e) {
                        e.preventDefault();
                        const sub = this.nextElementSibling;
                        const icon = this.querySelector('i');
                        if (sub.style.display === 'none' || sub.style.display === '') {
                            sub.style.display = 'block';
                            icon.classList.remove('fa-chevron-down');
                            icon.classList.add('fa-chevron-up');
                        } else {
                            sub.style.display = 'none';
                            icon.classList.remove('fa-chevron-up');
                            icon.classList.add('fa-chevron-down');
                        }
                    });
                }
            } else {
                nav.innerHTML = originalHTML;
            }
        }
        const mq = window.matchMedia('(max-width: 768px)');
        mq.addEventListener('change', update);
        window.addEventListener('load', update);
        if (mq.matches) update();
    })();

    // ---- КНОПКА «НАВЕРХ» (усиленная) ----
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        function toggleButton() {
            if (window.scrollY > 300 || document.documentElement.scrollTop > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }
        window.addEventListener('scroll', toggleButton);
        window.addEventListener('resize', toggleButton);
        toggleButton(); // сразу при загрузке

        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---- Аккордеон в подвале ----
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', function() {
            const accordion = this.closest('.footer-accordion');
            if (accordion) accordion.classList.toggle('open');
        });
    });

    // ---- Версия для слабовидящих ----
    const specialLink = document.getElementById('specialFooterLink');
    if (specialLink) {
        specialLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.classList.toggle('special-mode');
        });
    }

    // ---- Cookie-баннер и Яндекс.Метрика ----
    function loadYandexMetrica() {
        if (window.ym && window.ym(107242178)) return;
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        ym(107242178, "init", { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true });
        const ns = document.createElement('noscript');
        const div = document.createElement('div');
        const img = document.createElement('img');
        img.src = 'https://mc.yandex.ru/watch/107242178';
        img.style = 'position:absolute; left:-9999px;';
        img.alt = '';
        div.appendChild(img);
        ns.appendChild(div);
        document.body.appendChild(ns);
    }

    const banner = document.getElementById('cookie-banner');
    const accept = document.getElementById('cookie-accept');
    const decline = document.getElementById('cookie-decline');

    if (banner && accept && decline) {
        if (!localStorage.getItem('cookieConsent')) {
            banner.style.display = 'block';
        } else if (localStorage.getItem('cookieConsent') === 'true') {
            loadYandexMetrica();
        }

        accept.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'true');
            banner.style.display = 'none';
            loadYandexMetrica();
        });
        decline.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'false');
            banner.style.display = 'none';
        });
    }

    // ---- Fancybox (если есть) ----
    if (typeof Fancybox !== 'undefined') {
        Fancybox.bind("[data-fancybox]");
    }
})();