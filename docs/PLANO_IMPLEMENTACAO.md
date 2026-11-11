# Plano de implementação — Portfólio v2

> Este plano organiza todas as melhorias aprovadas no brainstorm. Cada fase pode ser implementada e revisada separadamente.

## Situação

| Fase | Situação |
| --- | --- |
| 1 a 5 | Implementadas |
| 6 | Pendente. Depende da decisão de publicar o site. |

### Diferenças entre o plano e o que foi implementado

- **Selo "Estudando agora":** ficou só com JavaScript. O Django saiu porque a escolha entre Django e Flask ainda está pendente nos requisitos (seção 9).
- **Nome do atributo de tema:** `data-tema="claro"` ou `"escuro"`, em português, no lugar de `data-theme`.
- **Arquivo extra:** `rodape.js` cuida do ano do rodapé.
- **Data dos cartões:** usa `pushed_at` (último envio de código) em vez de `updated_at`, que também muda com estrelas e edições de descrição.
- **WhatsApp:** o link passou de `tel:` para `https://wa.me/`, que abre a conversa no aplicativo.
- **Layout:** "Sobre Mim" e "Minha Jornada" usam duas colunas em telas largas.
- **Linha do tempo:** usa as datas do currículo e do histórico do Git. Os cursos ficaram em uma lista sem data.

### Revisão visual (novembro de 2026)

O primeiro visual ficou genérico, com "cara de template". Ele foi substituído pelo conceito **"ficha técnica"**, definido em `docs/DESIGN.md`.

O que saiu:
- manchas desfocadas, gradientes, anel brilhante na foto e sombras;
- efeito de digitação (`digitacao.js`);
- animação ao rolar e brilho que segue o mouse (`animacoes.js`);
- fontes Sora e Inter, substituídas por IBM Plex Sans e IBM Plex Mono;
- roxo padrão do Tailwind (`#6D28D9`), substituído por `#5B2A8C`.

O que entrou:
- ficha de dados no hero (local, formação, foco e status);
- seções numeradas automaticamente, com título à esquerda;
- jornada em formato de histórico, cursos em tabela e habilidades em lista de especificações;
- favicon próprio.

Por isso, algumas tarefas das fases 2 e 4 descritas abaixo não valem mais. O `docs/DESIGN.md` tem prioridade sobre este plano em decisões visuais.

## 0. Visão geral

| Fase | Tema | Resultado esperado |
| --- | --- | --- |
| 1 | Base sólida | Site responsivo, com correções, tipografia nova e meta tags |
| 2 | Visual principal | Hero marcante, menu fixo com vidro fosco, habilidades em cartões |
| 3 | Repositórios do GitHub | Projetos aparecem sozinhos, filtrados pelo topic `portfolio` |
| 4 | Detalhes que impressionam | Modo escuro, linha do tempo, scroll reveal, efeito spotlight |
| 5 | Toque criativo | Easter egg (código Konami) |
| 6 | Automação e publicação | GitHub Action com `projetos.json` e GitHub Pages (opcional) |

**Analogia:** é como construir uma casa. Primeiro vem a fundação (fase 1), depois as paredes e a fachada (fase 2), depois as instalações que funcionam sozinhas (fase 3) e, por fim, o acabamento e a decoração (fases 4 e 5).

---

## 1. Decisões técnicas

| Decisão | Escolha recomendada | Motivo |
| --- | --- | --- |
| Fontes | **Sora** (títulos) + **Inter** (texto), pelo Google Fonts | Modernas e legíveis, combinam com a identidade elegante |
| Organização do JS | Vários arquivos `.js` comuns, com `defer`, um por funcionalidade | Módulos ES (`type="module"`) não funcionam ao abrir o `index.html` direto pelo explorador de arquivos (`file://`) |
| Fonte dos dados dos repositórios | API do GitHub no navegador + cache no `localStorage` | Funciona sem servidor. A GitHub Action fica para a fase 6. |
| Filtro de repositórios | Topic `portfolio`, excluindo forks e arquivados | Respeita a seção 8 dos requisitos: os projetos das aulas não aparecem |
| Modo escuro | Segue o sistema (`prefers-color-scheme`) + botão para alternar + escolha salva no `localStorage` | Respeita a preferência do usuário e permite trocar manualmente |
| Animações | Só com `transform` e `opacity`, e todas desligadas com `prefers-reduced-motion` | Desempenho e acessibilidade (requisito 7.2) |
| Dependências | Nenhuma biblioteca ou framework | O projeto continua simples e totalmente explicável |

---

## 2. Estrutura de arquivos final

```text
Portifolio-pessoal/
├── .github/
│   └── workflows/
│       └── atualizar-projetos.yml   (fase 6, opcional)
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── icons/
│   ├── images/
│   │   ├── eu.jpeg
│   │   └── og-preview.png           (imagem de compartilhamento)
│   └── js/
│       ├── tema.js                  (modo escuro)
│       ├── navegacao.js             (menu ativo)
│       ├── digitacao.js             (efeito de digitação)
│       ├── github-repos.js          (repositórios automáticos)
│       ├── animacoes.js             (scroll reveal + spotlight)
│       └── easter-egg.js            (código Konami)
├── docs/
│   ├── Curriculo_Joao_Francisco.pdf
│   ├── PLANO_IMPLEMENTACAO.md
│   └── REQUISITOS_PORTFOLIO.md
├── index.html
└── README.MD
```

O `script.js` atual está vazio e será substituído pelos arquivos acima.

---

## 3. Fases detalhadas

### Fase 1 — Base sólida

**Tarefas**

1. Corrigir `alt="HMTL5"` para `alt="HTML5"`.
2. Corrigir o `border-radius: 20%` dos links do menu para um valor fixo (`999px`, formato pílula).
3. Trocar `download=""` por `download` no link do currículo.
4. Adicionar o link "Pular para o conteúdo" no início do `<body>`.
5. Carregar Sora e Inter pelo Google Fonts, com `preconnect`.
6. Ampliar os tokens em `:root`: cores, espaçamentos, raios, sombras e tamanhos de fonte.
7. Criar um contêiner central com largura máxima (`max-width`) para o conteúdo.
8. Tornar o layout responsivo (mobile first):
   - `.introducao`: coluna no celular, linha a partir do tablet;
   - habilidades: CSS Grid com `auto-fill` e `minmax`;
   - menu: rolagem horizontal ou quebra de linha no celular.
9. Adicionar meta tags Open Graph (`og:title`, `og:description`, `og:image`, `og:type`) e `theme-color`.
10. Criar uma imagem `og-preview.png` (1200×630) com o nome e a cor roxa.

**Critérios de aceite**
- Nenhuma rolagem horizontal em 360px, 768px e 1280px de largura.
- A navegação por Tab mostra o foco em todos os links.
- Ao colar o link no WhatsApp ou no LinkedIn (depois de publicado), a prévia aparece.

**Conceitos para estudar:** mobile first, `@media`, CSS Grid, `minmax()`, `clamp()`, Open Graph.

---

### Fase 2 — Visual principal

**Tarefas**

1. **Hero**
   - Título grande com `clamp()` e subtítulo com efeito de digitação (`digitacao.js`), alternando: "Python", "HTML & CSS", "aprendendo JavaScript".
   - Dois botões: "Ver projetos" (âncora `#projetos`) e "Baixar currículo".
   - Fundo com 2 ou 3 "blobs" roxos desfocados (`filter: blur`), feitos com pseudoelementos.
   - Foto com anel em gradiente roxo e brilho (`box-shadow`).
2. **Menu fixo**
   - `position: sticky`, fundo semitransparente e `backdrop-filter: blur()`.
   - Link da seção visível destacado (`navegacao.js`, com `IntersectionObserver` e `aria-current`).
3. **Habilidades**
   - Cartões com elevação no hover (`transform: translateY`) e no `:focus-within`.
   - Três grupos com subtítulo: **Front-end** (HTML5, CSS3), **Back-end** (Python) e **Ferramentas** (Git, GitHub).
   - Grupo **"Estudando agora"** com selo: JavaScript e Django. Ícones do Devicon no mesmo padrão dos atuais.

**Critérios de aceite**
- O efeito de digitação não roda com `prefers-reduced-motion`. Nesse caso, o texto aparece fixo.
- O texto da digitação é anunciado de forma estável para leitores de tela (texto completo em `aria-label` ou em um elemento oculto visualmente).
- O contraste de texto sobre os blobs fica em pelo menos 4.5:1.

**Conceitos para estudar:** `position: sticky`, `backdrop-filter`, pseudoelementos `::before`/`::after`, `IntersectionObserver`, `setTimeout`.

---

### Fase 3 — Repositórios do GitHub

**Preparação no GitHub (feita por você)**
1. Abrir cada repositório que deve aparecer.
2. Clicar na engrenagem ao lado de "About".
3. Adicionar o topic `portfolio` e preencher a descrição. Se houver site publicado, preencher também o campo "Website".

**Fluxo do `github-repos.js`**

```text
1. Verifica o cache no localStorage (validade: 1 hora)
   ├─ válido → usa o cache
   └─ inválido → GET https://api.github.com/users/JfmBR/repos?sort=updated&per_page=100
2. Filtra: topics inclui "portfolio" E fork == false E archived == false
3. Ordena: estrelas (maior primeiro) e depois data de atualização
4. Renderiza os cartões
5. Trata os estados:
   ├─ carregando → cartões "esqueleto" animados
   ├─ erro       → mensagem + link para o perfil do GitHub
   │              (se houver cache vencido, usa ele como plano B)
   └─ vazio      → esconde a seção e o link "Projetos" do menu
```

**Conteúdo de cada cartão**
- Nome do repositório, formatado: `meu-projeto` vira "Meu Projeto".
- Descrição. Se não houver: "Sem descrição".
- Bolinha colorida com a linguagem principal (cores do GitHub Linguist).
- Estrelas, apenas se houver pelo menos uma.
- "Atualizado há X dias", com `Intl.RelativeTimeFormat` em pt-BR.
- Topics extras como etiquetas, sem repetir `portfolio`.
- Botões: "Código" (`html_url`) e "Ver online" (`homepage`, só quando existir).

**Regras de segurança e acessibilidade**
- Inserir textos da API somente com `textContent`, nunca com `innerHTML`.
- Links externos com `target="_blank"` e `rel="noopener noreferrer"`.
- A região dos cartões usa `aria-live="polite"` e `aria-busy` durante o carregamento.
- `<noscript>` com um link para o perfil do GitHub.
- Nenhum token no código.

**Critérios de aceite**
- Só aparecem repositórios com o topic `portfolio`.
- Sem internet ou com a API bloqueada, a página mostra a mensagem de erro e não quebra.
- Sem repositórios marcados, a seção e o link do menu ficam ocultos.
- Ao recarregar a página dentro de 1 hora, não há nova requisição (verificar na aba Rede do DevTools).

**Conceitos para estudar:** `fetch`, `async/await`, JSON, `try/catch`, `localStorage`, `JSON.stringify`/`JSON.parse`, `createElement`, `Intl.RelativeTimeFormat`, limite de requisições da API.

**Referências**
- [List repositories for a user](https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user)
- [Rate limits for the REST API](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api)
- [Classificar repositório com topics](https://docs.github.com/pt/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics)

---

### Fase 4 — Detalhes que impressionam

**Tarefas**

1. **Modo escuro (`tema.js`)**
   - Tokens escuros em `[data-theme="dark"]` e em `@media (prefers-color-scheme: dark)`.
   - Botão de alternância no menu, com `aria-pressed` e rótulo claro.
   - Escolha salva no `localStorage`.
   - Script mínimo no `<head>` que aplica o tema antes de desenhar a página, para evitar o "piscar" branco.
2. **Linha do tempo "Minha jornada"**
   - Nova seção entre "Sobre Mim" e "Habilidades".
   - Estrutura semântica: `<ol>` com `<time datetime="...">`.
   - Linha vertical com marcadores roxos. No celular, os itens ficam alinhados à esquerda.
   - **Depende de conteúdo seu** (ver seção 5).
3. **Scroll reveal (`animacoes.js`)**
   - Seções entram com fade + deslocamento curto, usando `IntersectionObserver`.
   - Sem JS ou com movimento reduzido, tudo aparece normalmente. A classe de "escondido" só é aplicada pelo JS.
4. **Spotlight nos cartões**
   - Brilho roxo segue o mouse dentro dos cartões de projeto e de habilidade.
   - O JS atualiza as variáveis `--x` e `--y`, e o CSS desenha o `radial-gradient`.
   - Só ativo em dispositivos com mouse (`@media (hover: hover)`).
5. **Rodapé**
   - "Feito com HTML, CSS e JavaScript", com link para o código-fonte deste repositório.
   - Ano atual gerado por JS, com o texto fixo como reserva.

**Critérios de aceite**
- O tema escolhido continua após recarregar a página.
- O contraste segue AA nos dois temas.
- Com `prefers-reduced-motion: reduce`, não há animação de entrada nem de digitação.

**Conceitos para estudar:** atributos `data-*`, `prefers-color-scheme`, `<time>`, eventos `pointermove`, variáveis CSS via JS (`style.setProperty`).

---

### Fase 5 — Toque criativo

**Easter egg (`easter-egg.js`)**
- Sequência: ↑ ↑ ↓ ↓ ← → ← → B A.
- Efeito: chuva de confete roxo por 3 segundos, feita com `<canvas>` ou com elementos animados por CSS.
- Mensagem discreta: "Você achou o segredo! 💜".
- Não dispara enquanto o foco estiver em um campo de texto. Com movimento reduzido, mostra só a mensagem.

**Conceitos para estudar:** evento `keydown`, arrays, `requestAnimationFrame`.

---

### Fase 6 — Automação e publicação (opcional)

> A publicação está fora do escopo da v1 (seção 11 dos requisitos). Esta fase depende de você decidir mudar esse escopo.

1. **GitHub Pages**
   - Settings → Pages → publicar a partir da branch `main`, pasta raiz.
   - Endereço esperado: `https://jfmbr.github.io/Portifolio-pessoal/`.
   - Atualizar `og:url` e `og:image` com caminhos absolutos.
2. **GitHub Action `atualizar-projetos.yml`**
   - Roda uma vez por dia e também manualmente (`workflow_dispatch`).
   - Busca os repositórios, filtra pelo topic e salva `assets/data/projetos.json`.
   - O `github-repos.js` passa a ler primeiro o JSON local e usa a API apenas como reserva.
   - Vantagem: sem limite de requisições e com carregamento mais rápido.
   - Atenção: `fetch` de arquivo local não funciona via `file://`. Para testar localmente, use a extensão Live Server do VS Code.

---

## 4. Checklist de qualidade (ao final de cada fase)

- [ ] Testar nas larguras de 360px, 768px e 1280px.
- [ ] Navegar pelo site inteiro só com o teclado.
- [ ] Ativar "reduzir movimento" no sistema e conferir as animações.
- [ ] Rodar o Lighthouse (DevTools) e buscar nota acima de 90 em Acessibilidade e Boas Práticas.
- [ ] Na fase 3, simular falha da API (DevTools → Rede → Offline).
- [ ] Verificar se não há links quebrados.
- [ ] Fazer commits pequenos e descritivos, um por tarefa.

---

## 5. O que preciso de você

| Item | Para qual fase | Obrigatório? |
| --- | --- | --- |
| Marcar os repositórios com o topic `portfolio` | 3 | Sim, ou a seção fica oculta |
| Datas e marcos da sua jornada (início da faculdade, cursos, primeiro projeto etc.) | 4 | Sim, para a linha do tempo |
| Confirmar se as fontes Sora + Inter agradam | 1 | Não. Uso a recomendação se não houver resposta. |
| Decidir sobre a publicação no GitHub Pages | 6 | Não |
| Definir se eu implemento ou se te guio passo a passo | Todas | Sim |

---

## 6. Atualizações de documentação previstas

- `docs/REQUISITOS_PORTFOLIO.md`: atualizar o "Estado atual do desenvolvimento". O JavaScript passa a ter uma necessidade concreta: repositórios automáticos e modo escuro.
- `README.MD`: atualizar "Tecnologias utilizadas", "Estrutura do projeto" e explicar como marcar um repositório com o topic `portfolio`.
