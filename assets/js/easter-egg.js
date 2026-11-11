/* Easter egg: o código Konami (↑ ↑ ↓ ↓ ← → ← → B A) solta confete roxo. */
(function () {
    'use strict';

    const SEQUENCIA = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];
    const CORES = ['#5B2A8C', '#7A45B0', '#B89CF0', '#8E6BC7', '#D8D5CC'];
    const DURACAO_CONFETE = 3000;
    const DURACAO_AVISO = 4000;
    const QUANTIDADE = 140;

    let ultimasTeclas = [];   // guarda as últimas teclas pressionadas
    let ativo = false;        // evita disparar duas vezes ao mesmo tempo

    function estaDigitando(elemento) {
        if (!(elemento instanceof Element)) {
            return false;
        }
        return elemento.matches('input, textarea, select') || elemento.isContentEditable;
    }

    function mostrarAviso() {
        const aviso = document.createElement('p');
        aviso.className = 'aviso-segredo';
        aviso.setAttribute('role', 'status');
        aviso.textContent = 'Você achou o segredo! 💜';
        document.body.appendChild(aviso);

        setTimeout(function () {
            aviso.remove();
            ativo = false;
        }, DURACAO_AVISO);
    }

    function soltarConfete() {
        const tela = document.createElement('canvas');
        const pincel = tela.getContext('2d');
        if (!pincel) {
            return;
        }

        tela.className = 'tela-confete';
        tela.setAttribute('aria-hidden', 'true');
        tela.width = window.innerWidth;
        tela.height = window.innerHeight;
        document.body.appendChild(tela);

        const pedacos = [];
        for (let i = 0; i < QUANTIDADE; i += 1) {
            pedacos.push({
                x: Math.random() * tela.width,
                y: -20 - Math.random() * tela.height * 0.5,
                tamanho: 6 + Math.random() * 6,
                velocidadeX: -1.5 + Math.random() * 3,
                velocidadeY: 2 + Math.random() * 4,
                giro: Math.random() * Math.PI,
                velocidadeGiro: -0.1 + Math.random() * 0.2,
                cor: CORES[Math.floor(Math.random() * CORES.length)]
            });
        }

        const inicio = performance.now();

        function desenhar(agora) {
            const decorrido = agora - inicio;
            pincel.clearRect(0, 0, tela.width, tela.height);
            // O confete some aos poucos no último meio segundo.
            pincel.globalAlpha = Math.min(1, (DURACAO_CONFETE - decorrido) / 500);

            pedacos.forEach(function (pedaco) {
                pedaco.x += pedaco.velocidadeX;
                pedaco.y += pedaco.velocidadeY;
                pedaco.giro += pedaco.velocidadeGiro;

                pincel.save();
                pincel.translate(pedaco.x, pedaco.y);
                pincel.rotate(pedaco.giro);
                pincel.fillStyle = pedaco.cor;
                pincel.fillRect(-pedaco.tamanho / 2, -pedaco.tamanho / 4, pedaco.tamanho, pedaco.tamanho / 2);
                pincel.restore();
            });

            if (decorrido < DURACAO_CONFETE) {
                requestAnimationFrame(desenhar);
            } else {
                tela.remove();
            }
        }

        requestAnimationFrame(desenhar);
    }

    function disparar() {
        if (ativo) {
            return;
        }
        ativo = true;

        mostrarAviso();
        // Com movimento reduzido, aparece só a mensagem.
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            soltarConfete();
        }
    }

    document.addEventListener('keydown', function (evento) {
        if (estaDigitando(evento.target)) {
            return;
        }

        // Letras valem em maiúscula ou minúscula.
        const tecla = evento.key.length === 1 ? evento.key.toLowerCase() : evento.key;

        // Guarda só as últimas teclas, na mesma quantidade da sequência.
        ultimasTeclas.push(tecla);
        if (ultimasTeclas.length > SEQUENCIA.length) {
            ultimasTeclas.shift();
        }

        if (ultimasTeclas.join(',') === SEQUENCIA.join(',')) {
            ultimasTeclas = [];
            disparar();
        }
    });
})();
