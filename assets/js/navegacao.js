/* Destaca no menu o link da seção que está visível na tela. */
(function () {
    'use strict';

    if (!('IntersectionObserver' in window)) {
        return;
    }

    const links = document.querySelectorAll('.navegacao ul a[href^="#"]');
    const linkPorSecao = {};
    const secoes = [];

    links.forEach(function (link) {
        const id = link.getAttribute('href').slice(1);
        const secao = document.getElementById(id);
        if (secao) {
            linkPorSecao[id] = link;
            secoes.push(secao);
        }
    });

    function marcar(id) {
        links.forEach(function (link) {
            link.removeAttribute('aria-current');
        });
        if (linkPorSecao[id]) {
            linkPorSecao[id].setAttribute('aria-current', 'true');
        }
    }

    /* A "faixa de leitura" fica um pouco acima do meio da tela.
       A seção que cruza essa faixa é considerada a seção atual. */
    const observador = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
            if (entrada.isIntersecting) {
                marcar(entrada.target.id);
            }
        });
    }, { rootMargin: '-35% 0px -60% 0px' });

    secoes.forEach(function (secao) {
        observador.observe(secao);
    });

    /* No topo da página (hero), nenhum link fica marcado. */
    const inicio = document.getElementById('inicio');
    if (inicio) {
        new IntersectionObserver(function (entradas) {
            if (entradas[0].isIntersecting) {
                marcar(null);
            }
        }, { rootMargin: '-35% 0px -60% 0px' }).observe(inicio);
    }
})();
