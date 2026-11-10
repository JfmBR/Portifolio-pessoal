# Portfólio pessoal — João Francisco

Portfólio pessoal criado para apresentar minha trajetória, minhas habilidades e, futuramente, meus projetos autorais na área de desenvolvimento full-stack.

O projeto também faz parte do meu processo de aprendizado. Novas tecnologias e funcionalidades serão adicionadas conforme eu estudar, compreender e aplicar cada uma delas.

## Objetivo

- Apresentar meu perfil profissional.
- Demonstrar minhas habilidades de maneira clara e honesta.
- Registrar minha evolução como desenvolvedor.
- Reunir projetos que eu tenha desenvolvido e consiga explicar.
- Criar uma base organizada para futuras expansões.

## Estado atual

O projeto está em desenvolvimento.

A página principal já possui:

- apresentação com foto, botões de ação e efeito de digitação;
- seção "Sobre Mim" com objetivo profissional;
- linha do tempo "Minha Jornada" e cursos concluídos;
- habilidades organizadas por grupo;
- projetos carregados automaticamente do GitHub;
- canais de contato;
- tema claro e escuro;
- layout responsivo para celulares, tablets e computadores.

## Tecnologias utilizadas

- HTML5;
- CSS3;
- JavaScript (sem bibliotecas ou frameworks);
- Git e GitHub.

O JavaScript é usado para buscar os repositórios no GitHub, alternar o tema e criar as animações. A página continua legível com o JavaScript desligado.

## Como um projeto aparece no portfólio

A seção "Projetos" busca meus repositórios públicos na API do GitHub. Só aparecem os repositórios marcados com o topic `portfolio`.

Para incluir um repositório:

1. Abra o repositório no GitHub.
2. Clique na engrenagem ao lado de "About".
3. Em "Topics", adicione `portfolio`.
4. Preencha a descrição. Se o projeto tiver um site publicado, preencha também o campo "Website".

Observações:

- Forks e repositórios arquivados não aparecem.
- Se nenhum repositório tiver o topic, a seção "Projetos" fica oculta.
- A lista fica guardada no navegador por 1 hora. Por isso, uma mudança no GitHub pode demorar até 1 hora para aparecer.
- O topic e o nome de usuário ficam no início do arquivo `assets/js/github-repos.js`.

## Estrutura do projeto

```text
Portifolio-pessoal/
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── icons/
│   ├── images/
│   │   ├── eu.jpeg
│   │   └── og-preview.png
│   └── js/
│       ├── animacoes.js
│       ├── digitacao.js
│       ├── easter-egg.js
│       ├── github-repos.js
│       ├── navegacao.js
│       ├── rodape.js
│       └── tema.js
├── docs/
│   ├── Curriculo_Joao_Francisco.pdf
│   ├── PLANO_IMPLEMENTACAO.md
│   └── REQUISITOS_PORTFOLIO.md
├── index.html
└── README.MD
```

- `index.html`: estrutura e conteúdo da página principal.
- `assets/css`: estilos visuais do portfólio.
- `assets/icons`: ícones utilizados na seção de habilidades.
- `assets/images`: foto pessoal e imagem de prévia para compartilhamento.
- `assets/js`: um arquivo por funcionalidade.
  - `tema.js`: alterna entre tema claro e escuro e lembra a escolha.
  - `navegacao.js`: destaca no menu a seção visível.
  - `digitacao.js`: efeito de digitação na apresentação.
  - `github-repos.js`: busca os repositórios e cria os cartões de projeto.
  - `animacoes.js`: seções que aparecem ao rolar e brilho nos cartões.
  - `rodape.js`: mantém o ano do rodapé atualizado.
  - `easter-egg.js`: uma surpresa escondida.
- `docs`: currículo, requisitos e plano de implementação.

## Como visualizar localmente

1. Baixe ou clone este repositório.
2. Abra a pasta do projeto.
3. Abra o arquivo `index.html` em um navegador.

Nesta etapa não é necessário instalar dependências nem executar um servidor.

## Funcionalidades planejadas

- páginas detalhadas para projetos autorais;
- área administrativa privada;
- cadastro, edição e exclusão de projetos;
- armazenamento dos projetos em banco de dados;
- publicação do portfólio na internet;
- versão em inglês;
- futuras seções de certificações e experiências profissionais.

Os recursos planejados serão implementados gradualmente e podem mudar durante o aprendizado e a evolução do projeto.

## Documentação

Os requisitos e as decisões do produto estão registrados em [`docs/REQUISITOS_PORTFOLIO.md`](docs/REQUISITOS_PORTFOLIO.md).

O plano das melhorias visuais e da integração com o GitHub está em [`docs/PLANO_IMPLEMENTACAO.md`](docs/PLANO_IMPLEMENTACAO.md).

## Autor

Desenvolvido por **João Francisco da Silva Malaquias**.

- GitHub: [JfmBR](https://github.com/JfmBR)
- E-mail: [francisco.malaquias.joao@gmail.com](mailto:francisco.malaquias.joao@gmail.com)
