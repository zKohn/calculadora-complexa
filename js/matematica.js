import { COMPLEXO, comp } from './COMPLEX.js'
import { ordemMatriz, A, B, det } from './index.js'

// PARTE 3 - FUNÇÔES DE TRATAMENTO MATEMÁTICO
function novaPermutacao(){
    let permutacao = [];
    for(let i=0;i<ordemMatriz;i++)
        permutacao[i] = i;
    return permutacao;
}
function inversoes(permutacao){
    let numeroInversoes=0;
    for(let i=0;i<ordemMatriz;i++){
        for(let j=i+1;j<ordemMatriz;j++){
            if(permutacao[i]>permutacao[j]) numeroInversoes++;
        }
    }
    if(numeroInversoes%2==0) return 1;
    return -1;
}
function permuta(permutacao, a, b){
    let aux = permutacao[a];
    permutacao[a] = permutacao[b];
    permutacao[b] = aux;
    return permutacao;
}
function trocaColuna(coluna){
    let matriz = [];
    if(coluna == -1) return A;
    for(let i=0; i<ordemMatriz; i++){
        matriz[i] = [];
        for(let j=0; j<ordemMatriz; j++){
            if(j==coluna)
                matriz[i][j] = B[i];
            else
                matriz[i][j] = A[i][j];
        }
    }
    return matriz;
}
function determinante({det, matriz, permutacao, inferior}){
    let thisDet = det; // experimental
    let j;
    if(inferior == ordemMatriz-1){
        let parcela = new COMPLEXO( matriz[0][permutacao[0]].objeto() );
        for(j=1;j<ordemMatriz;j++){
            parcela = comp.multiplica(matriz[j][permutacao[j]], parcela);
        }
        let parcelaComSinal = comp.multiplica_escalar( inversoes(permutacao), parcela );
        thisDet[0] = comp.soma(thisDet[0], parcelaComSinal);
    }else{
        for(j=inferior;j<ordemMatriz;j++){
            permutacao = permuta(permutacao, inferior, j);
            determinante({'det': thisDet, matriz, permutacao, 'inferior': inferior+1});
            permutacao = permuta(permutacao, inferior, j);
        }
    }
}
export function calculaDeterminantes(){
    for(let i=0; i<=ordemMatriz;i++){
        det[i] = [new COMPLEXO({'arg1': 0, 'arg2': 0, 'formato': 'retangular'})];
        let matriz = trocaColuna(i-1);
        let permutacao = novaPermutacao();
        determinante({'det': det[i], matriz, permutacao, 'inferior': 0});
    }
}
export function calculaResultados(){
    let arr = [];
    for(let i=1; i<=ordemMatriz;i++){
        arr[i-1] = comp.divide(det[i][0], det[0][0]);
    }
    return arr;
}
export function sistemaOk(){
    if(det[0][0].real()!=0) return true;
    const resultadoHTML = document.querySelector('section.resultado');
    resultadoHTML.innerHTML = `
        <div>O sistema é impossível ou indeterminado.</div>
        <div>Verifique se digitou os termos corretamente.</div>
    `;
    return false;
}