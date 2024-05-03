# Processador de Retas e Polígonos

Este projeto consiste em um aplicativo web que permite ao usuário interagir com retas e polígonos no canvas. Abaixo está a descrição das funcionalidades principais:
___
Feito por: Maria paula Bastos 

___

### Funcionalidades:

1. **Reta Inicial**:
   - Ao abrir o link, uma reta é exibida no canvas.

2. **Movimentação dos Cantos**:
   - Se o usuário pressionar o mouse sobre um dos cantos da reta, aquele canto da reta será movido enquanto o outro canto da reta permanece fixo.

3. **Movimentação da Reta**:
   - Se o mouse for pressionado como no centro da reta, a reta inteira deve ser movida.

4. **Divisão da Reta**:
   - Ao clicar com o botão da direita do mouse, os dois cantos da reta ficam fixos e a reta é dividida em duas. Um extremo em cada ponto fixo e um extremo no local do mouse.

5. **Geração de Polígono**:
   - O aplicativo solicita um número entre 3 e 8, e gera um polígono com aquele número de lados.
   - Cada segmento de reta do polígono pode ser manipulado conforme as funcionalidades descritas acima.
   - Por exemplo, é possível transformar um triângulo em um quadrado ao pressionar com o botão da direita em uma das retas do triângulo.

# Classes

## Descrição das Funções da Classe Canvas

A classe `Canvas` é responsável por gerenciar e desenhar linhas em um elemento canvas HTML usando o contexto 2D. Abaixo estão as descrições das funções disponíveis nesta classe:

### `constructor(canvas, ctx)`

Construtor da classe Canvas. Recebe como parâmetros o elemento canvas, o contexto 2D e opcionalmente o tamanho dos polígonos a serem desenhados.

### `desenha()`

Desenha todas as linhas armazenadas na classe Canvas no canvas HTML. Limpa o canvas antes de desenhar as linhas.

## Classe `Linha`

Classe que representa uma linha no canvas.

### `constructor(coord1, coord2)`

Construtor da classe Linha.

- Parâmetros:
  - `coord1`: Objeto contendo as coordenadas iniciais da linha.
  - `coord2`: Objeto contendo as coordenadas finais da linha.

### `atualizaCoords(coord1, coord2)`

Atualiza as coordenadas da linha.

- Parâmetros:
  - `coord1`: Objeto contendo as novas coordenadas iniciais da linha.
  - `coord2`: Objeto contendo as novas coordenadas finais da linha.

### `mouseSobrepoe(mouse_event, ctx)`

Verifica se as coordenadas do evento do mouse estão sobre a linha.

- Parâmetros:
  - `mouse_event`: Evento do mouse.
  - `ctx`: Contexto 2D do canvas.

- Retorno:
  - Booleano indicando se o mouse está sobre a linha.

### `canto(coord)`

Verifica se uma dada coordenada está em um dos cantos da linha.

- Parâmetros:
  - `coord`: Objeto contendo as coordenadas a serem verificadas.

- Retorno:
  - `0` se a coordenada estiver mais próxima do canto `coords[0]`.
  - `1` se a coordenada estiver mais próxima do canto `coords[1]`.
  - `2` se a coordenada não estiver em nenhum canto.



# Descrição das Funções Adicionais

## Função `calculaDistancia(coord1, coord2)`

Calcula a distância euclidiana entre dois pontos no plano cartesiano.

- Parâmetros:
  - `coord1`: Objeto contendo os campos `x` e `y` representando as coordenadas do primeiro ponto.
  - `coord2`: Objeto contendo os campos `x` e `y` representando as coordenadas do segundo ponto.

- Retorno:
  - A distância entre os dois pontos.

## Constante `EDGE_MARGIN`

Define a margem de distância permitida para considerar que uma coordenada está em um dos cantos da linha.

---

Para mais informações sobre a classe Canvas, consulte o código-fonte ou os comentários no código.
