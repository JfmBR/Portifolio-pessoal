/* Efeito de digitação no hero: escreve e apaga frases em sequência. */
(function () {
    'use strict';

    const FRASES = [
        'programo em Python',
        'construo páginas com HTML e CSS',
        'estou aprendendo JavaScript',
        'monto e conserto computadores'
    ];
    const TEMPO_DIGITAR = 70;      // milissegundos por letra ao escrever
    const TEMPO_APAGAR = 35;       // milissegundos por letra ao apagar
    const PAUSA_FRASE_COMPLETA = 1800;
    const PAUSA_ANTES_DE_DIGITAR = 400;

    const alvo = document.getElementById('texto-digitado');
    const movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Com movimento reduzido, a primeira frase fica fixa (já está no HTML). */
    if (!alvo || movimentoReduzido) {
        return;
    }

    let indiceFrase = 0;
    let quantidadeLetras = FRASES[0].length;
    let apagando = true;

    function passo() {
        const frase = FRASES[indiceFrase];
        let espera;

        if (apagando) {
            quantidadeLetras -= 1;
            espera = TEMPO_APAGAR;
            if (quantidadeLetras === 0) {
                apagando = false;
                indiceFrase = (indiceFrase + 1) % FRASES.length;
                espera = PAUSA_ANTES_DE_DIGITAR;
            }
        } else {
            quantidadeLetras += 1;
            espera = TEMPO_DIGITAR;
            if (quantidadeLetras === frase.length) {
                apagando = true;
                espera = PAUSA_FRASE_COMPLETA;
            }
        }

        alvo.textContent = FRASES[indiceFrase].slice(0, quantidadeLetras);
        setTimeout(passo, espera);
    }

    setTimeout(passo, PAUSA_FRASE_COMPLETA);
})();
