class Carta {
  constructor(palo, valor, texto) {
    this.palo = palo;
    this.valor = valor;
    this.texto = texto;
    this.img = palo.figura + '_' + texto + '.jpg';
  }
}
class Palo {
  constructor(figura) {
    this.figura = figura;
  }
}

class Fabrica {
  palo = [
    new Palo("trebol"),
    new Palo("corazon"),
    new Palo("pica"),
    new Palo("diamante")
  ];
  texto = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  valor = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  mazo = [];
  mazoMezclado = [];
  elemento;
  crearBarajas() {
    // insertar los valores al array
    this.palo.forEach(function (elementPalo) {
      this.texto.forEach(function (elementLetra, index) {
        if (index === 0) {//para As que vale 1 y 11
          this.mazo.push(new Carta(elementPalo, [1, 11], elementLetra));
        } else if (index > 9) {
          this.mazo.push(new Carta(elementPalo, [10], elementLetra));
        } else if(index>=1 && index<=9){
          this.mazo.push(new Carta(elementPalo, [index+1], elementLetra));
        }
      }, this);
    }, this);

  }
  mezclar() {
    while (this.mazoMezclado.length < 52) {
      let valor = Math.floor(Math.random() * (52));
      this.elemento = this.mazoMezclado.find(element => element == valor)
      //let condicion = (this.elemento == undefined) ? this.mazoMezclado.push(valor) : valor;
    }

    for (let i = 0; i < this.mazo.length - 1; i++) {
      this.elemento = this.mazo[this.mazoMezclado[i]]
      this.mazo[this.mazoMezclado[i]] = this.mazo[i]
      this.mazo[i] = this.elemento;
    }
    return this.mazo;
  }

}
class Juego extends Fabrica {
  nuevaBaraja = [];
  contador = 0;
  arraySuma=[];
  pedir() {
    this.nuevaBaraja.push(this.mezclar().shift());
    this.contador++;
    let resultado=this.nuevaBaraja[this.nuevaBaraja.length - 1];
    this.arraySuma.push(resultado.valor);
    return resultado.img;
    
  }
  validar() {
    //sumatoria
    let suma=0;
    this.arraySuma.forEach(parametro => {
     if(parametro.length===1){
      suma+=parametro[0];
     }
     if (parametro.length===2) {
       suma+=parametro[1];
     }
     if(suma>15 && suma<21&&parametro.length===2){
       suma+=parametro[0];
     }
     
    })
    return suma
    /* if(suma>21){
     return "perdiste"; 
    }
    if (suma===21) {
      return "ganaste";
    } */
    
    

  }
}

