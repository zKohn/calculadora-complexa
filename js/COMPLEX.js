/*
*   INFORMAÇÕES SOBRE USO:
*
*   1) AQUI CONTÉM UMA BASE DE NÚMEROS COMPLEXOS PARA ENGENHARIA, CÁLCULOS E AMOSTRAGENS DE RESULTADOS EM GERAL.
*   2) OS MÉTODOS AQUI DESCRITOS PODEM SER UTILIZADOS DE MANEIRA GRATUITA, MAS O ARQUIVO NÃO PODE SER COMERCIALIZADO OU TOMADO COMO SEU.
*
*   3) COMO IMPORTAR:
*
*       import { COMPLEXO, comp, pi } from '<caminho do arquivo>/COMPLEX.js';
*
*   EX: COLOCANDO NA MESMA PASTA QUE O ARQUIVO PRINCIPAL:
*   
*       import { COMPLEXO, comp, pi } from './COMPLEX.js';
*
*   REPOSITÓRIO DO CRIADOR: https://github.com/zKohn
*/

export const pi = 3.141592653589793;

// Classe de números complexos com recursos básicos para tratamentos em javascript
export class COMPLEXO{
    constructor({arg1=0,arg2=0,formato='retangular'}){
        this.arg1 = arg1;
        this.arg2 = arg2;
        this.formato = formato;
    }
    objeto(){
        return {
            'arg1': this.arg1,
            'arg2': this.arg2,
            'formato': this.formato,
        }
    }
    string({formato='retangular', decimal=-1}){
        if(isNaN(decimal)) return false;
        if(decimal<0){
            if(formato=='retangular')
                return `${this.real()} ${this.imaginario()<0?'-':'+'} j${Math.abs(this.imaginario())}`;
            if(formato=='polar')
                return `${this.modulo()} <${this.angulo()}°`;
        }
        if(formato=='retangular'){
            let fixedReal = (this.real()).toFixed(decimal);
            let fixedImag = (Math.abs(this.imaginario())).toFixed(decimal);
            return `${fixedReal} ${this.imaginario()<0?'-':'+'} j${fixedImag}`;
        }
        if(formato=='polar'){
            let fixedMod = (this.modulo()).toFixed(decimal);
            let fixedAng = (this.angulo()).toFixed(decimal);
            return `${fixedMod} <${fixedAng}°`;
        }
        return false;
    }
    real(){
        if(this.formato=='retangular')
            return this.arg1;
        return this.modulo()*Math.cos(pi*this.angulo()/180);
    }
    imaginario(){
        if(this.formato=='retangular')
            return this.arg2;
        return this.modulo()*Math.sin(pi*this.angulo()/180);
    }
    modulo(){
        if(this.formato=='polar')
            return this.arg1;
        return Math.sqrt(this.real()*this.real()+this.imaginario()*this.imaginario());
    }
    angulo(){
        if(this.formato=='polar')
            return this.arg2;
        return 180*Math.atan2( this.imaginario(), this.real() )/pi;
    }
    POL(){
        return [this.modulo(), this.angulo()];
    }
    RECT(){
        return [this.real(), this.imaginario()];
    }
}

// Operações complexas envolvendo objetos do tipo COMPLEXO
export const comp = {
    'soma': (c1, c2) => {
        return new COMPLEXO({
            'arg1': c1.real()+c2.real(),
            'arg2': c1.imaginario()+c2.imaginario(),
            'formato': 'retangular'
        })
    },
    'subtrai': (c1, c2) => {
        return new COMPLEXO({
            'arg1': c1.real()-c2.real(),
            'arg2': c1.imaginario()-c2.imaginario(),
            'formato': 'retangular'
        })
    },
    'multiplica': (c1, c2) => {
        return new COMPLEXO({
            'arg1': c1.modulo()*c2.modulo(),
            'arg2': c1.angulo()+c2.angulo(),
            'formato': 'polar'
        })
    },
    'divide': (c1, c2) => {
        return new COMPLEXO({
            'arg1': c1.modulo()/c2.modulo(),
            'arg2': c1.angulo()-c2.angulo(),
            'formato': 'polar'
        })
    },
    'multiplica_escalar': (escalar, c) => {
        return new COMPLEXO({
            'arg1': c.modulo()*escalar,
            'arg2': c.angulo(),
            'formato': 'polar'
        })
    },
}
