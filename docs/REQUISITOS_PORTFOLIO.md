# Documento de visão e requisitos — Portfólio de João Francisco

## 1. Propósito

Construir um portfólio pessoal full-stack que ajude João Francisco a evoluir como profissional, desenvolver sua própria identidade e demonstrar sua capacidade para recrutadores.

O projeto deve priorizar organização, criatividade e qualidade de execução. A complexidade só deve ser adicionada quando resolver um problema real ou contribuir para o aprendizado.

## 2. Objetivos

- Apresentar João, suas habilidades e seus projetos de maneira profissional.
- Permitir que recrutadores entendam o funcionamento e a construção de cada projeto.
- Demonstrar fundamentos de desenvolvimento front-end e back-end.
- Registrar a evolução técnica de João ao longo do tempo.
- Servir como projeto prático para aprender novas tecnologias conforme elas forem necessárias.
- Possuir uma base organizada que facilite futuras expansões.

## 3. Público

### Público principal

- Recrutadores interessados em profissionais full-stack em início de carreira.

### Público secundário

- Professores.
- Possíveis clientes.
- Outros desenvolvedores.
- Pessoas interessadas nos projetos apresentados.

## 4. Identidade desejada

O portfólio deve transmitir:

- profissionalismo;
- elegância;
- modernidade;
- organização;
- criatividade com propósito.

A cor principal será o roxo. A paleta completa, tipografia e demais elementos visuais deverão respeitar contraste e legibilidade. A criatividade deve aparecer na composição, nos detalhes e nas interações, sem prejudicar a clareza.

## 5. Escopo da primeira versão

A primeira versão funcionará localmente. A publicação na internet não é requisito deste marco.

### 5.1 Página principal

A página principal deve apresentar, nesta ordem:

1. Foto de João.
2. Breve apresentação pessoal.
3. Habilidades técnicas.
4. Projetos, somente quando houver projetos autorais cadastrados.
5. Contatos profissionais.

Cada projeto autoral será mostrado em um cartão ou resumo contendo informações suficientes para despertar interesse e um link para sua página detalhada. Enquanto não houver projetos que João tenha construído e consiga explicar, essa seção não será exibida.

### 5.2 Página detalhada de projeto

Cada projeto deve possuir uma página própria com:

- nome;
- imagem ou imagens;
- problema que busca resolver;
- demonstração de funcionamento;
- tecnologias utilizadas;
- principais funcionalidades;
- desafios encontrados;
- aprendizados obtidos;
- decisões técnicas relevantes;
- link para o código-fonte, quando disponível;
- estado atual, como concluído ou em desenvolvimento.

Os projetos não devem ser apresentados apenas como links. Cada um deve funcionar como um pequeno estudo de caso.

### 5.3 Contatos

A seção de contato deve oferecer links para:

- e-mail;
- LinkedIn;
- GitHub;
- WhatsApp;
- currículo para download.

Não haverá formulário de contato dentro do site.

### 5.4 Área administrativa

A área administrativa será exclusivamente de João e deverá permitir:

- entrar com credenciais próprias;
- criar projetos;
- editar projetos;
- excluir projetos com confirmação;
- adicionar e gerenciar imagens;
- alterar o estado de um projeto.

Não haverá cadastro público de usuários. Visitantes não terão acesso ao painel e não poderão criar, editar ou remover conteúdo.

## 6. Requisitos funcionais

| Código | Requisito |
| --- | --- |
| RF-01 | O visitante deve visualizar a apresentação pessoal de João. |
| RF-02 | O visitante deve visualizar as habilidades cadastradas. |
| RF-03 | O visitante deve visualizar um resumo dos projetos. |
| RF-04 | O visitante deve abrir a página detalhada de um projeto. |
| RF-05 | O visitante deve acessar os canais externos de contato. |
| RF-06 | O visitante deve poder baixar o currículo quando ele estiver disponibilizado. |
| RF-07 | Somente João deve conseguir entrar na área administrativa. |
| RF-08 | João deve criar, consultar, editar e excluir projetos no painel. |
| RF-09 | João deve adicionar imagens aos projetos. |
| RF-10 | O sistema deve armazenar os projetos em banco de dados. |
| RF-11 | Projetos novos ou alterados no painel devem aparecer no portfólio público. |

## 7. Requisitos não funcionais

### 7.1 Responsividade

O conteúdo deve funcionar adequadamente em celulares, tablets e computadores.

### 7.2 Acessibilidade

- Utilizar HTML semântico.
- Permitir navegação por teclado.
- Exibir foco visível nos elementos interativos.
- Manter contraste de cores adequado.
- Fornecer texto alternativo para imagens relevantes.
- Associar corretamente rótulos aos campos do painel.
- Respeitar a preferência do usuário por redução de movimento.

### 7.3 Segurança

- Proteger todas as rotas administrativas.
- Não armazenar senha em texto puro.
- Não incluir segredos ou credenciais no repositório.
- Validar os dados recebidos pelo servidor.
- Validar o tipo e o tamanho das imagens enviadas.
- Solicitar confirmação antes de excluir um projeto.

### 7.4 Organização e manutenção

- Separar apresentação, regras de negócio e acesso aos dados.
- Usar nomes claros e consistentes.
- Evitar repetição desnecessária de código.
- Registrar decisões importantes na documentação.
- Manter commits pequenos e descritivos.
- Adicionar dependências somente quando houver uma necessidade clara.

### 7.5 Qualidade

- Não deve haver links quebrados.
- Os fluxos principais devem possuir testes essenciais.
- O site deve apresentar mensagens compreensíveis em casos de erro ou ausência de conteúdo.
- Seções sem conteúdo real não devem aparecer no portfólio público.

## 8. Conteúdo inicial

A primeira versão não utilizará os projetos antigos desenvolvidos durante as aulas, pois João não os construiu integralmente e não se sente preparado para explicar todas as suas decisões.

Não será criado conteúdo fictício para preencher o portfólio. A seção de projetos permanecerá oculta enquanto não houver conteúdo autoral real.

O próprio portfólio poderá ser o primeiro projeto apresentado depois que possuir uma versão funcional que João compreenda e consiga demonstrar. Projetos futuros serão adicionados conforme forem desenvolvidos.

## 9. Direção técnica inicial

João já possui contato com HTML, CSS, Python, Java e Git. JavaScript, desenvolvimento de servidor, banco de dados, autenticação e testes serão aprendidos e aplicados quando necessários.

### Alternativa recomendada: Django

Django é uma estrutura de desenvolvimento web baseada em Python. Ele fornece recursos integrados para rotas, páginas, formulários, banco de dados, autenticação e segurança. É adequado para uma aplicação organizada em módulos e com expansão planejada.

Uma possível organização futura é:

- módulo de conteúdo pessoal;
- módulo de projetos;
- módulo de autenticação e painel;
- arquivos de interface compartilhados;
- arquivos estáticos e imagens;
- testes separados por funcionalidade.

O painel visual pode ser construído pelo próprio João, utilizando o sistema de autenticação do Django. O painel administrativo interno oferecido pelo Django pode ser usado inicialmente para aprendizado ou apoio, mas não precisa ser a interface final do portfólio.

### Alternativa: Flask

Flask também utiliza Python e começa com uma estrutura menor. Ele oferece mais liberdade, porém exige escolher e integrar separadamente várias soluções, como autenticação, formulários e organização do banco.

### Decisão pendente

A escolha entre Django e Flask será feita por João após uma pesquisa introdutória. Para o escopo atual, Django é a recomendação por reunir os recursos necessários e favorecer uma estrutura expansível sem exigir muitas integrações logo no início.

## 10. Escalabilidade

Neste projeto, escalabilidade significa permitir crescimento sem reconstrução completa, e não criar uma infraestrutura grande antes da necessidade.

A solução deverá favorecer:

- componentes de interface reutilizáveis;
- módulos com responsabilidades claras;
- conteúdo de projetos armazenado no banco, não repetido manualmente nas páginas;
- configurações e credenciais fora do código versionado;
- inclusão futura de novos tipos de conteúdo;
- preparação para internacionalização, sem implementar dois idiomas agora.

## 11. Fora do escopo da primeira versão

- Publicação na internet.
- Versão em inglês.
- Cadastro de visitantes.
- Comentários, curtidas ou favoritos.
- Publicação de projetos por outras pessoas.
- Formulário interno de contato.
- Certificações sem conteúdo real.
- Experiências profissionais sem conteúdo real.
- Métricas avançadas de visitantes.
- Exibição dos projetos antigos das aulas.

## 12. Evoluções futuras

- Publicar o portfólio na internet.
- Adicionar versão em inglês.
- Criar seção de certificações quando houver certificados reais.
- Criar seção de experiências profissionais quando houver conteúdo real.
- Adicionar novos projetos feitos com JavaScript, Python, Java, banco de dados e APIs.
- Avaliar tema claro e escuro, caso combine com a identidade definida.

## 13. Etapas sugeridas de desenvolvimento

1. Organizar a estrutura inicial do novo portfólio.
2. Desenhar a estrutura e a identidade visual da página principal.
3. Construir uma versão estática acessível e responsiva, sem seções vazias.
4. Pesquisar Django e Flask e registrar a decisão técnica.
5. Modelar os dados de projeto e criar o banco.
6. Implementar login sem cadastro público.
7. Construir o painel de criação e edição de projetos.
8. Implementar gerenciamento de imagens e exclusão segura.
9. Fazer a seção pública de projetos aparecer somente quando houver conteúdo cadastrado.
10. Adicionar testes essenciais e revisar acessibilidade.
11. Preparar uma demonstração local completa.
12. Cadastrar o portfólio como primeiro projeto autoral quando estiver funcional.
13. Planejar a publicação como próximo marco.

Cada etapa deve ser compreendida antes de ser incorporada. Quando uma nova tecnologia for necessária, João deverá pesquisar seu papel, testar um exemplo pequeno e só então aplicá-la ao portfólio.

## 14. Critérios de aceite da primeira versão

A primeira versão será considerada pronta quando:

- a página principal apresentar foto, descrição, habilidades e contatos;
- a seção de projetos não aparecer enquanto estiver vazia;
- quando houver um projeto cadastrado, ele possuir resumo e página detalhada;
- o layout funcionar nos principais tamanhos de tela;
- a navegação por teclado e os requisitos básicos de acessibilidade funcionarem;
- o painel exigir autenticação e não oferecer cadastro público;
- João conseguir criar, editar e excluir um projeto;
- João conseguir associar imagens a um projeto;
- as alterações do painel forem refletidas nas páginas públicas;
- os contatos e o download do currículo funcionarem;
- os testes essenciais passarem;
- a aplicação puder ser iniciada e demonstrada localmente seguindo instruções documentadas.

## 15. Princípio de autoria

João será o autor das decisões e da implementação. A assistência durante o desenvolvimento deverá atuar como cliente, mentoria e revisão: esclarecer o objetivo, questionar escolhas, apontar problemas e explicar conceitos quando solicitado, sem assumir automaticamente a escrita do projeto.

Esse princípio existe para que João consiga compreender, defender e evoluir tudo o que estiver no portfólio.
