# Calculadora Complexa

# INFORMAÇÕES ACERCA DO PROJETO

<details>
<summary><h2>Descrição</h2></summary>
<p> Calculadora Complexa para cálculos de engenharia. Foi criada com intuito de ajudar estudantes da engenharia - em especial da engenharia elétrica - a resolver sistemas numéricos lineares que envolvem números complexos.</p>
<p>Tendo em vista a grande recorrência do uso de sistemas complexos, esta calculadora visa facilitar a resolução de atividades, problemas e trabalhos do curso. Não obstante, este projeto pode ser utilizado por alunos de engenharias em geral, matemática, física ou áreas afins em qualquer nível de graduação, assim como entusiastas e programadores.</p>
</details>
<details>
<summary><h2>Tutorial de uso</h2></summary>
<h3> O uso do programa é de fácil entendimento, tomam-se os seguintes passos: </h3>
<p> 1) Tendo um sistema linear complexo, define-se o tamanho do sistema, que pode ser 1x1 a 5x5. Este tamanho será a ordem da matriz dos coeficientes, matriz A do sistema <strong>A.X = B</strong>.</p>
<p> 2) Após enviar, deve-se digitar os números de cada matriz, A e B. Nesse momento é possível também alterar a forma complexa adotada nos termos cada matriz, tendo disponíveis as formas <em>Retangular</em> e <em>Polar</em>. </p>
<p> 3) Envie as matrizes, aguarde, e veja os resultados nas variáveis X mostradas ordenadamente. É possível selecionar um número de casas decimais para os resultados, para isso basta selecionar <em>Padrão</em>, escolher e clicar no botão de enviar. </p>
</details>
<details>
<summary><h2>Passos do programa, resumo do uso</h2></summary>
<h3>Existem três passos base no programa:</h3>
<p> 1. O passo de escolha do #tipo das matrizes; </p>
<p> 2. O passo de digitação das matrizes, #matriz. </p>
<p> 3. O passo de mostragem de #resultados </p>
<p> Clicar nos botões de envio redireciona para o tópico seguinte na página.</p>
</details>
<details>
<summary><h2>Digitação dos números</h2></summary>
<h3> Formas possíveis de digitação: </h3>

| Tipo | Simbologia | Exemplo |
|-----:|------------|---------|
| Positivo | + (opcional) | +83 ou 83 |
| Negativo | - | -15 |
| Decimal | . ou , | 1,92 ou 1.92 |
| Potência de 10 | e[expoente]| 5e-2 = 0.05 |
| Misturando |  | -500,2e-3 = -0.5002 |

</details>
<details>
<summary><h2>Dicas para uso em computador</h2></summary>
<h3>Além de utilizar um mouse para navegar até um elemento e clicar sobre ele, também é possível utilizar o teclado.</h3>
<p> Utilize <code>tab</code> para selecionar o próximo elemento e <code>shift</code>+<code>tab</code> para retornar ao anterior. </p>
<p> Pressionar <code>enter</code> executa um botão ou abre uma seleção de opções. </p>
<p> Utilize <code>enter</code> para selecionar uma opção, navegando por elas com as <code>setas</code> do teclado. </p>
<p> Nessa utilização, é necessário apertar duas vezes <code>tab</code> para passar dos botões para outros elementos. Pressionando pela segunda vez e apertando <code>enter</code> irá navegar até o próximo <em>passo</em>. </p>
</details>
<details>
<summary><h2>Algoritmo matemático aplicado</h2></summary>
<h3>Para resolver os sistemas de matrizes, foi aplicada a <em>Regra de Cramer</em></h3>
<p> A Regra de Cramer consiste em calcular n+1 determinantes para uma matriz n x n, modificando a matriz de coeficientes A. </p>
<p> Dividindo cada determinante de matriz modificada pelo determinante da matriz original, obtém-se os valores que resolvem o sistema. </p>
<p> A regra é baseada em estudos de Álgebra Linear e resolução de Sistemas Lineares, e aplicada sobre sistemas de números reais. </p>
<p> Um grande passo deste algoritmo foi aplicar os conceitos base para a regra de maneira que possam ser utilizados em sistemas com números complexos. </p>
<p> Vale lembrar que o algoritmo aplicado é original do autor. </p>
</details>
