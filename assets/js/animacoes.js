/* Animações: seções que aparecem ao rolar a página e brilho que segue o mouse nos cartões. */
(function () {
    'use strict';

    const movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Revelar ao rolar ---------- */

    if (!movimentoReduzido && 'IntersectionObserver' in window) {
        const elementos = document.querySelectorAll('[data-revelar]');

        const observador = new IntersectionObserver(function (entradas) {
            entradas.forEach(function (entrada) {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add('visivel');
                    // Cada elemento anima uma vez só.
                    observador.unobserve(entrada.target);
                }
            });
        }, { rootMargin: '0px 0px -10% 0px' });

        // Só esta classe esconde os elementos. Sem JavaScript, tudo aparece normalmente.
        document.documentElement.classList.add('com-animacoes');

        elementos.forEach(function (elemento) {
            observador.observe(elemento);
        });
    }

    /* ---------- Spotlight nos cartões ---------- */

    // Só faz sentido em aparelhos com mouse.
    if (window.matchMedia('(hover: hover)').matches) {
        document.addEventListener('pointermove', function (evento) {
            if (!(evento.target instanceof Element)) {
                return;
            }

            // Um único ouvinte no documento também cobre os cartões criados depois (projetos).
            const cartao = evento.target.closest('.cartao');
            if (!cartao) {
                return;
            }

            const caixa = cartao.getBoundingClientRect();
            cartao.style.setProperty('--x', (evento.clientX - caixa.left) + 'px');
            cartao.style.setProperty('--y', (evento.clientY - caixa.top) + 'px');
        });
    }
})();
