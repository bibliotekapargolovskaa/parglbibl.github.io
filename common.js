// common.js – упрощённая версия, только важное
(function() {
    "use strict";

    // ---- Бургер-меню ----
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // ---- Кнопка «Наверх» (гарантированно работает) ----
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        function updateButton() {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }
        window.addEventListener('scroll', updateButton);
        updateButton(); // проверяем сразу при загрузке

        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---- Адаптивное меню (если нужно) ----
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

})();