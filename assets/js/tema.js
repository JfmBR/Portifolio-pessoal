/* Modo escuro: segue o sistema, permite alternar pelo botão e lembra a escolha. */
(function () {
    'use strict';

    const CHAVE = 'portfolio:tema';
    const raiz = document.documentElement;
    const botao = document.getElementById('alternar-tema');
    const sistemaEscuro = window.matchMedia('(prefers-color-scheme: dark)');

    if (!botao) {
        return;
    }

    function temaAtual() {
        const escolhido = raiz.getAttribute('data-tema');
        if (escolhido) {
            return escolhido;
        }
        return sistemaEscuro.matches ? 'escuro' : 'claro';
    }

    function atualizarBotao() {
        botao.setAttribute('aria-pressed', String(temaAtual() === 'escuro'));
    }

    botao.addEventListener('click', function () {
        const novoTema = temaAtual() === 'escuro' ? 'claro' : 'escuro';
        raiz.setAttribute('data-tema', novoTema);
        try {
            localStorage.setItem(CHAVE, novoTema);
        } catch (erro) {
            /* Sem localStorage, a escolha vale só até recarregar a página. */
        }
        atualizarBotao();
    });

    /* Se o sistema mudar de tema e o visitante não tiver escolhido um, o botão acompanha. */
    sistemaEscuro.addEventListener('change', atualizarBotao);

    botao.hidden = false;
    atualizarBotao();
})();
