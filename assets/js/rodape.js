/* Mantém o ano do rodapé atualizado. */
(function () {
    'use strict';

    const ano = document.getElementById('ano-atual');
    if (ano) {
        ano.textContent = String(new Date().getFullYear());
    }
})();
