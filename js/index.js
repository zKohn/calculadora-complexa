import { COMPLEXO } from './COMPLEX.js'
import { calculaDeterminantes, calculaResultados, sistemaOk } from './matematica.js'

// DECLARAÇÃO DE VARIÁVEIS
const botaoOrdemHTML = document.querySelector('button.ordemMatriz');
const selectOrdemHTML = document.querySelector('select.ordemMatriz');
export let ordemMatriz, A, B, det = [], resultados;

// PARTE 1 - FUNÇÔES INICIAIS, EVENTOS E SELETORES PARA RETIRAR DADOS DO HTML
function constroiEstruturaMatriz(){
    const espacoMatrizHTML = document.querySelector('.matriz');
    espacoMatrizHTML.innerHTML = `
        <div class="matrizA"></div>
        <div class="matrizB"></div>
        <button class="enviaMatriz" ><a href="#resultado">enviar matriz</a></button>`;
    const espacoMatrizA_HTML = document.querySelector('.matriz div.matrizA');
    const espacoMatrizB_HTML = document.querySelector('.matriz div.matrizB');

    espacoMatrizA_HTML.innerHTML = '<div class="info">Digite os termos das matrizes:</div>';
    espacoMatrizA_HTML.innerHTML += `
        <div class="lado">
            <div>Formato da matriz A</div>
            <select class="matrizA">
                <option value="retangular" selected>Retangular</option>
                <option value="polar">Polar</option>
            </select>
        </div>`;
    espacoMatrizB_HTML.innerHTML = `
        <div class="lado">
            <div>Formato da matriz B</div>
            <select class="matrizB">
                <option value="retangular" selected>Retangular</option>
                <option value="polar">Polar</option>
            </select>
        </div>`;

    for(let i=1; i<=ordemMatriz; i++){
        espacoMatrizA_HTML.innerHTML += `<div id="linha" class="linha${i}"></div>`;
        espacoMatrizB_HTML.innerHTML += `
            <div id="linha" class="linha${i}">
                <div id="coluna" class="coluna1">
                    <input class="arg1" type="text" placeholder="0">
                    <input class="arg2" type="text" placeholder="0">
                </div>
            </div>`;
        let linhaMatrizA_HTML = document.querySelector(`.matriz div.matrizA .linha${i}`);

        for(let j=1; j<=ordemMatriz; j++){
            linhaMatrizA_HTML.innerHTML += `
                <div id="coluna" class="coluna${j}">
                    <input class="arg1" type="text" placeholder="0">
                    <input class="arg2" type="text" placeholder="0">
                </div>`;
        }
    }
    return handlerQueryParaMath( document.querySelector('.matriz button.enviaMatriz') );
}
function formaMatrizComplexa(){
    let formatoMatrizA_HTML = document.querySelector('.matriz select.matrizA');
    let formatoMatrizB_HTML = document.querySelector('.matriz select.matrizB');
    let formatoA = formatoMatrizA_HTML.options[formatoMatrizA_HTML.selectedIndex].value;
    let formatoB = formatoMatrizB_HTML.options[formatoMatrizB_HTML.selectedIndex].value;

    let matrizA_HTML = {
        'arg1': document.querySelectorAll('.matriz div.matrizA input.arg1'),
        'arg2': document.querySelectorAll('.matriz div.matrizA input.arg2'),
    }
    let matrizB_HTML = {
        'arg1': document.querySelectorAll('.matriz div.matrizB input.arg1'),
        'arg2': document.querySelectorAll('.matriz div.matrizB input.arg2'),
    }

    let i, j, matrizA = [], matrizB = [];

    for(i=0; i<ordemMatriz; i++){
        let aux1 = new COMPLEXO({
            'arg1': parseFloat(matrizB_HTML.arg1[i].value) || 0,
            'arg2': parseFloat(matrizB_HTML.arg2[i].value) || 0,
            'formato': formatoB,
        })
        matrizB.push( aux1 );

        matrizA[i] = new Array();

        for(j=0; j<ordemMatriz; j++){
            let aux2 = new COMPLEXO({
                'arg1': parseFloat(matrizA_HTML.arg1[j+ordemMatriz*(i)].value) || 0,
                'arg2': parseFloat(matrizA_HTML.arg2[j+ordemMatriz*(i)].value) || 0,
                'formato': formatoA,
            });
            matrizA[i].push( aux2 );
        }
    }
    return {'A': matrizA, 'B': matrizB};
}
function handlerQueryParaMath(botaoEnviaMatrizHTML){
    botaoEnviaMatrizHTML.addEventListener('click', () => {
        let objMatrizes = formaMatrizComplexa();
        A = objMatrizes.A;
        B = objMatrizes.B;
        calculaDeterminantes();
        handlerMathParaResultados();
    });
}
botaoOrdemHTML.addEventListener('click', () => {
    ordemMatriz = selectOrdemHTML.options[selectOrdemHTML.selectedIndex].value;
    constroiEstruturaMatriz();
});
function handlerMathParaResultados(){
    if(!sistemaOk()) return;
    mostraResultados({});
}

// PARTE 2 - FUNÇÔES DE ANÁLISE DE RESULTADOS 
function fixResultados(botaoFixResultados){
    botaoFixResultados.addEventListener('click', () => {
        const decimalHTML = document.querySelector('.casasResultado');
        let decimal = decimalHTML.options[decimalHTML.selectedIndex].value;
        mostraResultados({'decimal': parseInt(decimal)});
    });
}
function mostraResultados({decimal = -1}){
    let strResultadosPolar = '';
    let strResultadosRetangular = '';
    const resultadoHTML = document.querySelector('section.resultado');
    resultados = calculaResultados();

    resultados.forEach((resultado, indice) => {
        strResultadosPolar+=`<div> X${indice+1} = ${resultado.string({'formato': 'polar', decimal})} </div>`;
        strResultadosRetangular+=`<div> X${indice+1} = ${resultado.string({'formato': 'retangular', decimal})} </div>`;
    });
    resultadoHTML.innerHTML = `
        <div class="mostragem">
            <div class="info">
                Os resultados são:
            </div>
            <div class="lado">
                <div>Casas decimais dos valores</div>
                <select class="casasResultado">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="-1" selected>Padrão</option>
                </select>
                <button class='fixResultados'>enviar</button>
            </div>
            <div class="polar">
                Forma polar:
                <div class="valores"> ${strResultadosPolar} </div>
            </div>
            <div class="retangular">
                Forma retangular:
                <div class="valores"> ${strResultadosRetangular} </div>
            </div>
        </div>`;
        return fixResultados(document.querySelector('button.fixResultados'));
}