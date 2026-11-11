/* Busca os repositórios públicos no GitHub e cria os cartões da seção "Projetos".
   Só aparecem os repositórios marcados com o topic definido em TOPICO_FILTRO. */
(function () {
    'use strict';

    /* ---------- Configuração ---------- */

    const USUARIO = 'JfmBR';
    // Só entram os repositórios com este topic. Deixe '' para mostrar todos os públicos.
    const TOPICO_FILTRO = 'portfolio';
    const URL_API = 'https://api.github.com/users/' + USUARIO + '/repos?sort=pushed&per_page=100';
    const URL_PERFIL = 'https://github.com/' + USUARIO + '?tab=repositories';

    const CHAVE_CACHE = 'portfolio:repos:v1';
    const VALIDADE_CACHE = 60 * 60 * 1000;   // 1 hora, em milissegundos
    const TEMPO_LIMITE = 10 * 1000;          // desiste da requisição depois de 10 segundos
    const MAXIMO_ETIQUETAS = 4;

    // Cores usadas pelo GitHub para cada linguagem (projeto Linguist).
    const CORES_LINGUAGEM = {
        'Python': '#3572A5',
        'HTML': '#E34C26',
        'CSS': '#663399',
        'JavaScript': '#F1E05A',
        'TypeScript': '#3178C6',
        'Java': '#B07219',
        'Kotlin': '#A97BFF',
        'C': '#555555',
        'C++': '#F34B7D',
        'C#': '#178600',
        'PHP': '#4F5D95',
        'Shell': '#89E051',
        'Jupyter Notebook': '#DA5B0B'
    };

    const secao = document.getElementById('projetos');
    const lista = document.getElementById('lista-projetos');

    if (!secao || !lista) {
        return;
    }

    /* ---------- Cache (localStorage) ---------- */

    function lerCache() {
        try {
            const cache = JSON.parse(localStorage.getItem(CHAVE_CACHE));
            if (cache && Array.isArray(cache.repos) && typeof cache.salvoEm === 'number') {
                return cache;
            }
        } catch (erro) {
            /* Cache ausente ou inválido: segue sem ele. */
        }
        return null;
    }

    function salvarCache(repos) {
        try {
            localStorage.setItem(CHAVE_CACHE, JSON.stringify({ salvoEm: Date.now(), repos: repos }));
        } catch (erro) {
            /* Sem espaço ou sem permissão: o site funciona mesmo sem cache. */
        }
    }

    /* ---------- Busca e filtro ---------- */

    async function buscarNaApi() {
        const controle = new AbortController();
        const temporizador = setTimeout(function () {
            controle.abort();
        }, TEMPO_LIMITE);

        try {
            const resposta = await fetch(URL_API, {
                headers: { 'Accept': 'application/vnd.github+json' },
                signal: controle.signal
            });
            if (!resposta.ok) {
                throw new Error('A API do GitHub respondeu com o código ' + resposta.status);
            }
            return await resposta.json();
        } finally {
            clearTimeout(temporizador);
        }
    }

    function filtrarEOrdenar(reposDaApi) {
        return reposDaApi
            .filter(function (repo) {
                const topics = repo.topics || [];
                const temTopico = TOPICO_FILTRO === '' || topics.includes(TOPICO_FILTRO);
                return temTopico && !repo.fork && !repo.archived;
            })
            // Guarda só os campos usados nos cartões.
            .map(function (repo) {
                return {
                    nome: repo.name,
                    descricao: repo.description,
                    url: repo.html_url,
                    site: repo.homepage,
                    linguagem: repo.language,
                    estrelas: repo.stargazers_count || 0,
                    topics: repo.topics || [],
                    atualizadoEm: repo.pushed_at || repo.updated_at
                };
            })
            // Mais estrelas primeiro. No empate, o atualizado mais recentemente.
            .sort(function (a, b) {
                if (b.estrelas !== a.estrelas) {
                    return b.estrelas - a.estrelas;
                }
                return new Date(b.atualizadoEm) - new Date(a.atualizadoEm);
            });
    }

    /* ---------- Funções de apoio ---------- */

    function criarElemento(tag, classe, texto) {
        const elemento = document.createElement(tag);
        if (classe) {
            elemento.className = classe;
        }
        if (texto) {
            // textContent trata o valor como texto puro. Assim, nada vindo da API vira HTML.
            elemento.textContent = texto;
        }
        return elemento;
    }

    // "monitor-postura_yolo" vira "Monitor Postura Yolo".
    function formatarNome(nome) {
        return nome
            .split(/[-_]+/)
            .filter(Boolean)
            .map(function (palavra) {
                return palavra.charAt(0).toUpperCase() + palavra.slice(1);
            })
            .join(' ');
    }

    function tempoRelativo(dataIso) {
        const UM_DIA = 24 * 60 * 60 * 1000;
        const dias = Math.max(0, Math.floor((Date.now() - new Date(dataIso).getTime()) / UM_DIA));

        if (!window.Intl || !Intl.RelativeTimeFormat) {
            return 'em ' + new Date(dataIso).toLocaleDateString('pt-BR');
        }

        const formatador = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' });
        if (dias < 30) {
            return formatador.format(-dias, 'day');
        }
        if (dias < 365) {
            return formatador.format(-Math.floor(dias / 30), 'month');
        }
        return formatador.format(-Math.floor(dias / 365), 'year');
    }

    function ehEnderecoWeb(texto) {
        return typeof texto === 'string' && /^https?:\/\//i.test(texto);
    }

    function criarLinkExterno(texto, url, classe, nomeProjeto) {
        const link = criarElemento('a', classe, texto);
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        // Completa o texto para leitores de tela: "Código de Monitor Postura".
        link.appendChild(criarElemento('span', 'visualmente-oculto', ' de ' + nomeProjeto));
        return link;
    }

    /* ---------- Criação dos cartões ---------- */

    function criarCartao(repo) {
        const nome = formatarNome(repo.nome);
        const item = document.createElement('li');
        const cartao = criarElemento('article', 'bloco cartao-projeto');

        cartao.appendChild(criarElemento('h3', '', nome));
        cartao.appendChild(criarElemento('p', 'descricao', repo.descricao || 'Sem descrição.'));

        const etiquetas = repo.topics
            .filter(function (topic) {
                return topic !== TOPICO_FILTRO;
            })
            .slice(0, MAXIMO_ETIQUETAS);

        if (etiquetas.length > 0) {
            const listaEtiquetas = criarElemento('ul', 'etiquetas');
            listaEtiquetas.setAttribute('aria-label', 'Assuntos');
            etiquetas.forEach(function (topic) {
                listaEtiquetas.appendChild(criarElemento('li', 'selo', topic));
            });
            cartao.appendChild(listaEtiquetas);
        }

        const dados = criarElemento('p', 'dados-projeto');

        if (repo.linguagem) {
            const linguagem = criarElemento('span', 'linguagem');
            const cor = criarElemento('span', 'cor-linguagem');
            cor.setAttribute('aria-hidden', 'true');
            if (CORES_LINGUAGEM[repo.linguagem]) {
                cor.style.backgroundColor = CORES_LINGUAGEM[repo.linguagem];
            }
            linguagem.appendChild(cor);
            linguagem.appendChild(document.createTextNode(repo.linguagem));
            dados.appendChild(linguagem);
        }

        if (repo.estrelas > 0) {
            const estrelas = criarElemento('span', '', '★ ' + repo.estrelas);
            estrelas.setAttribute('aria-label', repo.estrelas + (repo.estrelas === 1 ? ' estrela' : ' estrelas'));
            dados.appendChild(estrelas);
        }

        if (repo.atualizadoEm) {
            dados.appendChild(criarElemento('span', '', 'Atualizado ' + tempoRelativo(repo.atualizadoEm)));
        }

        cartao.appendChild(dados);

        const acoes = criarElemento('div', 'acoes-projeto');
        acoes.appendChild(criarLinkExterno('Código', repo.url, 'botao botao-pequeno', nome));
        if (ehEnderecoWeb(repo.site)) {
            acoes.appendChild(criarLinkExterno('Ver online', repo.site, 'botao botao-primario botao-pequeno', nome));
        }
        cartao.appendChild(acoes);

        item.appendChild(cartao);
        return item;
    }

    /* ---------- Estados da seção ---------- */

    function limparLista() {
        while (lista.firstChild) {
            lista.removeChild(lista.firstChild);
        }
    }

    function mostrarCarregando() {
        lista.setAttribute('aria-busy', 'true');
        limparLista();

        const grade = criarElemento('ul', 'grade-projetos');
        grade.setAttribute('aria-hidden', 'true');
        for (let i = 0; i < 3; i += 1) {
            const item = document.createElement('li');
            const esqueleto = criarElemento('div', 'bloco esqueleto');
            for (let linha = 0; linha < 4; linha += 1) {
                esqueleto.appendChild(document.createElement('span'));
            }
            item.appendChild(esqueleto);
            grade.appendChild(item);
        }

        lista.appendChild(criarElemento('p', 'visualmente-oculto', 'Carregando projetos…'));
        lista.appendChild(grade);
    }

    function mostrarProjetos(repos) {
        lista.setAttribute('aria-busy', 'false');
        limparLista();

        const grade = criarElemento('ul', 'grade-projetos');
        repos.forEach(function (repo) {
            grade.appendChild(criarCartao(repo));
        });
        lista.appendChild(grade);
    }

    function mostrarErro() {
        lista.setAttribute('aria-busy', 'false');
        limparLista();

        const caixa = criarElemento('div', 'bloco mensagem-projetos');
        caixa.appendChild(criarElemento('p', '', 'Não consegui carregar os projetos agora. Você pode ver todos direto no GitHub.'));

        const link = criarElemento('a', 'botao botao-pequeno', 'Abrir meu GitHub');
        link.href = URL_PERFIL;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        caixa.appendChild(link);

        lista.appendChild(caixa);
    }

    // Sem projetos, a seção some junto com os links que apontam para ela.
    function esconderSecao() {
        secao.hidden = true;
        document.querySelectorAll('[data-requer-projetos]').forEach(function (elemento) {
            elemento.hidden = true;
        });
    }

    function exibir(repos) {
        if (repos.length === 0) {
            esconderSecao();
        } else {
            mostrarProjetos(repos);
        }
    }

    /* ---------- Fluxo principal ---------- */

    async function iniciar() {
        const cache = lerCache();

        if (cache && Date.now() - cache.salvoEm < VALIDADE_CACHE) {
            exibir(cache.repos);
            return;
        }

        mostrarCarregando();

        try {
            const repos = filtrarEOrdenar(await buscarNaApi());
            salvarCache(repos);
            exibir(repos);
        } catch (erro) {
            console.error('Falha ao buscar os repositórios:', erro);
            if (cache) {
                // Plano B: usa o cache antigo em vez de mostrar erro.
                exibir(cache.repos);
            } else {
                mostrarErro();
            }
        }
    }

    iniciar();
})();
