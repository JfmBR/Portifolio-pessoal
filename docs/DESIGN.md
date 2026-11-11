# Design system — "Ficha técnica"

> Este documento define a identidade visual do portfólio. Antes de criar ou mudar um estilo, confira se ele segue as regras abaixo.

## 1. Conceito

O site é apresentado como a **ficha técnica de um componente**, como as folhas de especificação de peças de computador.

**Por que esse conceito:** João monta e conserta computadores e está aprendendo a programar. A ficha técnica une as duas coisas: hardware e software. A criatividade tem um motivo real e não é só enfeite.

**Analogia:** uma ficha técnica não tenta impressionar com efeitos. Ela impressiona pela clareza: cada informação está no lugar certo, alinhada e fácil de achar.

## 2. Princípios

1. **Informação antes de efeito.** Linhas, alinhamento e tipografia fazem o trabalho visual.
2. **Um único destaque.** O roxo marca só o que é importante: ação principal, item atual e número da seção.
3. **Dados em fonte mono.** Rótulos, datas, números e metadados usam IBM Plex Mono. O texto corrido usa IBM Plex Sans.
4. **Linhas em vez de caixas.** Prefira separar com linhas finas. Use bordas de caixa só quando o item for clicável ou independente (como um projeto).
5. **Conteúdo real.** Nenhum dado inventado. Se não existe, a seção não aparece.

### Proibido

- Gradientes, manchas desfocadas e brilhos.
- Sombras (`box-shadow` decorativo).
- Cantos muito arredondados. O raio máximo é 2px.
- Texto em maiúsculas com espaçamento largo entre letras.
- Barras de "nível" de habilidade (como "Python 80%"). Não dá para medir isso de forma honesta.
- Animações que se repetem sem parar (exceto o carregamento dos projetos).

## 3. Tokens

Todos os tokens estão no início de `assets/css/style.css`, em `:root`.

### 3.1 Cores

| Token | Claro | Escuro | Uso |
| --- | --- | --- | --- |
| `--cor-fundo` | `#F4F3EF` | `#121116` | Fundo da página, cor de "papel" |
| `--cor-superficie` | `#FBFAF7` | `#19181E` | Fundo de notas e blocos em destaque |
| `--cor-texto` | `#17151C` | `#ECEAE5` | Texto principal |
| `--cor-texto-suave` | `#5C5865` | `#A6A1AE` | Rótulos, descrições e metadados |
| `--cor-linha` | `#D8D5CC` | `#2D2B33` | Linhas finas entre itens |
| `--cor-linha-forte` | `#17151C` | `#ECEAE5` | Linha que abre uma seção ou uma lista |
| `--cor-destaque` | `#5B2A8C` | `#B89CF0` | Roxo: ação principal, item atual, foco |
| `--cor-texto-sobre-destaque` | `#FFFFFF` | `#121116` | Texto sobre o roxo |

**Contraste medido (WCAG):**

| Par | Claro | Escuro |
| --- | --- | --- |
| Texto sobre fundo | 16.3:1 | 15.6:1 |
| Texto suave sobre fundo | 6.2:1 | 7.5:1 |
| Roxo sobre fundo | 8.8:1 | 8.1:1 |
| Texto do botão sobre o roxo | 9.7:1 | 8.1:1 |

Todos passam no nível AA (mínimo de 4.5:1 para texto).

### 3.2 Tipografia

| Token | Valor | Uso |
| --- | --- | --- |
| `--fonte-texto` | IBM Plex Sans (400, 500, 600) | Títulos e texto corrido |
| `--fonte-mono` | IBM Plex Mono (400, 500) | Rótulos, datas, números, metadados |

| Elemento | Tamanho |
| --- | --- |
| Nome (h1) | `clamp(2.25rem, …, 4rem)`, peso 600, espaçamento `-0.03em` |
| Título de seção (h2) | `clamp(1.5rem, …, 2rem)`, peso 600 |
| Subtítulo (h3) | `1rem` a `1.0625rem`, peso 600 |
| Texto | `1rem`, altura de linha `1.6` |
| Texto em destaque | `1.125rem` |
| Rótulo (mono) | `0.8125rem` |
| Metadados (mono) | `0.75rem` |

### 3.3 Espaçamento

Escala de 4px: `--espaco-1` (4px) até `--espaco-8` (64px).

| Token | Valor |
| --- | --- |
| `--espaco-1` | 4px |
| `--espaco-2` | 8px |
| `--espaco-3` | 12px |
| `--espaco-4` | 16px |
| `--espaco-5` | 24px |
| `--espaco-6` | 32px |
| `--espaco-7` | 48px |
| `--espaco-8` | 64px |

Use só valores da escala. Exceções pontuais (como `2px` de ajuste ótico) devem ser raras.

### 3.4 Forma

| Token | Valor |
| --- | --- |
| `--raio` | 2px |
| `--borda` | 1px |

## 4. Componentes

| Componente | Classe | Quando usar |
| --- | --- | --- |
| Rótulo | `.rotulo` | Texto técnico curto em mono: "Objetivo", "Portfólio · 2026" |
| Botão | `.botao` | Ação secundária. Borda escura, sem preenchimento. |
| Botão principal | `.botao .botao-primario` | No máximo **um** por área. Preenchido de roxo. |
| Botão pequeno | `.botao-pequeno` | Ações dentro de um bloco (ex.: "Código") |
| Especificações | `.especificacoes` (`<dl>`) | Pares "rótulo → valor": dados do hero, habilidades |
| Indicador | `.indicador` | Quadradinho roxo de status, como um LED |
| Selo | `.selo` | Marcação curta em mono: "em andamento", topics |
| Nota | `.nota` | Bloco de texto com destaque lateral (ex.: Objetivo) |
| Registro | `.registro` (`<ol>`) | Linha do tempo em formato de histórico: data → evento |
| Tabela | `.tabela` | Dados em colunas (ex.: cursos) |
| Bloco | `.bloco` | Caixa com borda para itens independentes (projetos, mensagens) |
| Notas do projeto | `.notas-projeto` (`<dl>`) | Contexto, desafio e aprendizado dentro do bloco de um projeto |
| Lista de contato | `.lista-contato` | Links em linhas: rótulo → valor → seta |

### Setas

| Símbolo | Significado |
| --- | --- |
| `→` | Vai para outra parte da página ou abre um aplicativo (e-mail) |
| `↗` | Abre outro site em nova aba |
| `↓` | Baixa um arquivo |

## 5. Layout

- **Largura máxima:** 1120px (`--largura-maxima`). Texto corrido com até 720px (`--largura-texto`).
- **Seções:** começam com uma linha forte. A partir de 900px, o título fica à esquerda (200px) e o conteúdo à direita.
- **Numeração:** feita por CSS (`counter`). Seções ocultas não contam, então a sequência nunca tem buracos.
- **Hero:** texto à esquerda e foto à direita. No celular, a foto vem primeiro e menor.
- **Foto:** retangular (4:5), com borda fina e legenda "Fig. 1".

## 6. Interação e movimento

- Transições curtas (0.15s), apenas em cor, borda e posição da seta.
- Nenhuma animação de entrada.
- Com `prefers-reduced-motion`, todas as animações e transições são desligadas.
- O foco do teclado usa contorno roxo de 2px com afastamento de 3px.

## 7. Checklist para um novo estilo

- [ ] Usa apenas tokens (cores, espaços, fontes)?
- [ ] O roxo marca algo realmente importante?
- [ ] Funciona nos temas claro e escuro?
- [ ] O contraste continua acima de 4.5:1?
- [ ] Funciona em 360px de largura?
- [ ] Respeita a lista de proibidos da seção 2?
