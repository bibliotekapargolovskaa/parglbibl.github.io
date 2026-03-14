// common.js – общие скрипты для всех страниц сайта Парголовской библиотеки

(function() {
    "use strict";

    // === БАЗОВЫЙ ОБРАБОТЧИК БУРГЕР-МЕНЮ ===
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // === ПОИСК (иконка и всплывающее окно) ===
    const searchIcon = document.getElementById('searchIcon');
    const searchPopup = document.getElementById('searchPopup');
    if (searchIcon && searchPopup) {
        searchIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            searchPopup.classList.toggle('active');
            if (searchPopup.classList.contains('active')) {
                const input = searchPopup.querySelector('input');
                if (input) input.focus();
            }
        });

        document.addEventListener('click', function(e) {
            if (!searchPopup.contains(e.target) && e.target !== searchIcon) {
                searchPopup.classList.remove('active');
            }
        });
    }

    // === АДАПТИВНОЕ МЕНЮ (перестраивает навигацию на мобильных) ===
    (function() {
        const nav = document.getElementById('nav');
        if (!nav) return;
        const originalMenuHTML = nav.innerHTML;

        function buildMobileMenu(originalItems) {
            const mainItems = ['Главная', 'О нас', 'Краеведение', 'Новинки', 'Услуги'];
            const moreItems = ['Спидкубинг', 'События', 'Библиотеки района', 'Партнёры', 'Вопросы', 'Фотогалерея', 'Контакты'];

            let html = '<ul>';

            mainItems.forEach(text => {
                const li = originalItems.find(li => li.textContent.trim() === text);
                if (li) {
                    const link = li.querySelector('a');
                    if (link) {
                        const href = link.getAttribute('href');
                        const activeClass = link.classList.contains('active') ? 'active' : '';
                        const iconHtml = link.querySelector('i') ? link.querySelector('i').outerHTML : '';
                        html += `<li><a href="${href}" class="${activeClass}">${iconHtml} ${text}</a></li>`;
                    }
                }
            });

            html += `<li class="mobile-more"><a href="#" id="mobileMoreToggle">Ещё <i class="fas fa-chevron-down"></i></a><ul class="mobile-submenu" style="display: none;">`;

            moreItems.forEach(text => {
                const li = originalItems.find(li => li.textContent.trim() === text);
                if (li) {
                    const link = li.querySelector('a');
                    if (link) {
                        const href = link.getAttribute('href');
                        const activeClass = link.classList.contains('active') ? 'active' : '';
                        const iconHtml = link.querySelector('i') ? link.querySelector('i').outerHTML : '';
                        html += `<li><a href="${href}" class="${activeClass}">${iconHtml} ${text}</a></li>`;
                    }
                }
            });

            html += '</ul></li></ul>';
            return html;
        }

        function updateMenu() {
            if (window.innerWidth <= 768) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = originalMenuHTML;
                const originalItems = Array.from(tempDiv.querySelectorAll('ul > li'));

                nav.innerHTML = buildMobileMenu(originalItems);

                const moreToggle = document.getElementById('mobileMoreToggle');
                if (moreToggle) {
                    moreToggle.addEventListener('click', function(e) {
                        e.preventDefault();
                        const submenu = this.nextElementSibling;
                        if (submenu.style.display === 'none' || submenu.style.display === '') {
                            submenu.style.display = 'block';
                            const icon = this.querySelector('i');
                            icon.classList.remove('fa-chevron-down');
                            icon.classList.add('fa-chevron-up');
                        } else {
                            submenu.style.display = 'none';
                            const icon = this.querySelector('i');
                            icon.classList.remove('fa-chevron-up');
                            icon.classList.add('fa-chevron-down');
                        }
                    });
                }
            } else {
                nav.innerHTML = originalMenuHTML;
            }
        }

        const mediaQuery = window.matchMedia('(max-width: 768px)');
        mediaQuery.addEventListener('change', updateMenu);
        window.addEventListener('load', updateMenu);
        if (mediaQuery.matches) {
            updateMenu();
        }
    })();

    // === КНОПКА «НАВЕРХ» ===
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // === АККОРДЕОН В ПОДВАЛЕ (карта сайта) ===
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', function() {
            const accordion = this.closest('.footer-accordion');
            if (accordion) {
                accordion.classList.toggle('open');
            }
        });
    });

    // === ВЕРСИЯ ДЛЯ СЛАБОВИДЯЩИХ ===
    const specialFooterLink = document.getElementById('specialFooterLink');
    if (specialFooterLink) {
        specialFooterLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.classList.toggle('special-mode');
        });
    }

    // === COOKIE-БАННЕР И ЯНДЕКС.МЕТРИКА ===
    function loadYandexMetrica() {
        if (window.ym && window.ym(107242178)) return;

        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

        ym(107242178, "init", {
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true
        });

        var noscript = document.createElement('noscript');
        var div = document.createElement('div');
        var img = document.createElement('img');
        img.src = 'https://mc.yandex.ru/watch/107242178';
        img.style = 'position:absolute; left:-9999px;';
        img.alt = '';
        div.appendChild(img);
        noscript.appendChild(div);
        document.body.appendChild(noscript);
    }

    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');

    if (cookieBanner && acceptBtn && declineBtn) {
        if (!localStorage.getItem('cookieConsent')) {
            cookieBanner.style.display = 'block';
        } else {
            if (localStorage.getItem('cookieConsent') === 'true') {
                loadYandexMetrica();
            }
        }

        acceptBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'true');
            cookieBanner.style.display = 'none';
            loadYandexMetrica();
        });

        declineBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'false');
            cookieBanner.style.display = 'none';
        });
    }

    // === FANCYBOX (если подключен на странице) ===
    if (typeof Fancybox !== 'undefined') {
        Fancybox.bind("[data-fancybox]");
    }

})();