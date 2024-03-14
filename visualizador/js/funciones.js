var contadorPaso = 0;
var j = 0;
var archivo;
/*True es para las blancas y false para las negras*/
var tokens = "";
 var i = 0;
  turno = true;
var texto = "";
var columna = "";
var renglon = "";
var posicion = "";
var jaque = "";
var caballoblanco1 = [8, 2];
var caballoblanco2 = [8, 7];
var caballonegro1 = [1, 2];
var caballonegro2 = [1, 7];
var reynegro = [1, 5];
var reyBlanco = [8, 5];
var reynablanco = [8, 4];
var reynanegro = [1, 4]; var reynablanco = [8, 4];
var alfilBlanco1 = [8, 3]; var alfilBlanco2 = [8, 6];
var alfilNegro1 = [1, 3]; var alfilNegro2 = [1, 6];
var TorreB1 = [8, 1]; var TorreB2 = [8, 8];
var TorreN1 = [1, 1]; var TorreN2 = [1, 8];
var fin = false;

let peonesBlancos = [
  { nombre: 'p1', posicion: [7, 1], disponible: true },
  { nombre: 'p2', posicion: [7, 2], disponible: true },
  { nombre: 'p3', posicion: [7, 3], disponible: true },
  { nombre: 'p4', posicion: [7, 4], disponible: true },
  { nombre: 'p5', posicion: [7, 5], disponible: true },
  { nombre: 'p6', posicion: [7, 6], disponible: true },
  { nombre: 'p7', posicion: [7, 7], disponible: true },
  { nombre: 'p8', posicion: [7, 8], disponible: true }
];
var peonPosicion = [];
var alfilPosicion = []


let peonesNegros = [
  { nombre: 'p1', posicion: [2, 1], disponible: true },
  { nombre: 'p2', posicion: [2, 2], disponible: true },
  { nombre: 'p3', posicion: [2, 3], disponible: true },
  { nombre: 'p4', posicion: [2, 4], disponible: true },
  { nombre: 'p5', posicion: [2, 5], disponible: true },
  { nombre: 'p6', posicion: [2, 6], disponible: true },
  { nombre: 'p7', posicion: [2, 7], disponible: true },
  { nombre: 'p8', posicion: [2, 8], disponible: true }
];

primermov = true;
var pcd = [];
function reglas() {
  alert(`Notación de piezas:

    Rey: K
    Reina: Q
    Torre: R
    Alfil: B
    Caballo: N
    Peón: no se indica ninguna letra (por ejemplo, e4)
    Notación de columnas:
    
    Las columnas se indican con letras de la "a" a la "h". La columna más a la izquierda es la "a" y la columna más a la derecha es la "h".
    Notación de filas:
    
    Las filas se indican con números del 1 al 8. El lado de las blancas está en las filas 1 y 2, mientras que el lado de las negras está en las filas 7 y 8.
    Notación de movimientos:
    
    Se utiliza la notación abreviada de la pieza seguida de la casilla a la que se mueve. Por ejemplo, Re4 significa que el Rey se mueve a la casilla e4.
    Capturas:
    
    Cuando una pieza captura a otra, se utiliza "x" para indicar la captura. Por ejemplo, Bxe4 significa que el Alfil captura en la casilla e4.
    Enroque:
    
    El enroque corto se indica con O-O y el enroque largo se indica con O-O-O.
    Peones:
    
    Cuando un peón avanza sin capturar, solo se indica la casilla de destino. Por ejemplo, e4 significa que el peón se mueve a e4.
    Promoción de peones:
    
    Cuando un peón alcanza la octava fila, se promociona a otra pieza (generalmente una reina). La promoción se indica agregando la letra de la pieza deseada después del movimiento del peón. Por ejemplo, e8=Q significa que el peón en e8 se promociona a una reina.
    Jaque:
    
    Se indica con el símbolo "+" al final del movimiento. Por ejemplo, Nf7+ significa que el Caballo ha dado jaque.
    Jaque mate:
    
    Se indica con el símbolo "#" al final del movimiento. Por ejemplo, Qh8# significa que la Reina ha dado jaque mate.`);
}

var pcd = [];

function validarcampo() {
  if (tokens.length === 0) {
    //console.log('Esta vacio')
  } else {
    pasos();
  }
}

function validarcampoCompleto() {
  if (tokens.length === 0) {
   console.log('Esta vacio')
  } else {
    pasosCompleto();
    document.getElementById("validarcampo").disabled = true;
    document.getElementById("validarcampoc").disabled = true;
  }

  
}


function pasos() {

if (fin === true) {
  console.log('Se a terminado')
} else {
  


  //console.log(tokens[i])

  var pieza = "";
  var tabla = document.getElementById("Tablero");
  if (!tieneMayusculas(tokens[i])) {
    pieza = "peon";
    jaque = "";

    if (tokens[i].startsWith("ex") || tokens[i].startsWith("bx") || tokens[i].startsWith("cx") || tokens[i].startsWith("dx")
      || tokens[i].startsWith("ax") || tokens[i].startsWith("hx") || tokens[i].startsWith("fx")) {
      posicion = tokens[i].slice(2).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1];

      var Pdestino = [corregirRenglon(renglon), convertirLetraNumero(columna)];

      if (turno) {
        //mueven blancas
        puedeComerPeonBlanco(Pdestino[0], Pdestino[1], peonesBlancos);
        tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
          "background-image: url(./img/PeonB.png); background-size:cover;";

        //quitar imagen
        tabla.rows[peonPosicion[0]].cells[peonPosicion[1]].style =
          "background-image: none ; background-size:cover;;";
        //console.log('El error de comer' + peonPosicion)

      } else {
        //mueven negras
        //mueven blancas

        puedeComerPeonNegro(Pdestino[0], Pdestino[1], peonesNegros);
        tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
          "background-image: url(./img/PeonN.png); background-size:cover;";
        //console.log('Moviendo a peon para comer' + peonPosicion)

        //quitar imagen
        tabla.rows[peonPosicion[0]].cells[peonPosicion[1]].style =
          "background-image: none ; background-size:cover;;";
        //console.log('El error de comer' + peonPosicion)


      }


      //mueven blancas
      //tabla.rows[corregirRenglon(renglon)].cells[convertirLetraNumero(columna)].style = "background-image: url(./img/PeonB.png); background-size:cover;";
      //tabla.rows[parseInt(renglon)].cells[convertirLetraNumero(columna) + 1].style = "background-image: none ; background-size:cover;;";



      // tabla.rows[parseInt(renglon)+3].cells[convertirLetraNumero(columna)].style =
      //"background-image: none ; background-size:cover;";
    }
    else if (tokens[i].endsWith("+")) {
      jaque = "Jaque";

      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1].slice(-1);
      var Pdestino = [corregirRenglon(renglon), convertirLetraNumero(columna)];

      //console.log('tamano es de ' + tokens[i].length)
      if (tokens[i].length >= 4) {
        if (turno) {

          puedeComerPeonBlanco(Pdestino[0], Pdestino[1], peonesBlancos);
          tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
            "background-image: url(./img/PeonB.png); background-size:cover;";

          //quitar imagen
          tabla.rows[peonPosicion[0]].cells[peonPosicion[1]].style =
            "background-image: none ; background-size:cover;;";

        } else {
         
          //avanzarPeonBlanco(Pdestino[0], Pdestino[1], peonesNegros);
          //tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
          //"background-image: url(./img/PeonN.png); background-size:cover;";


          //quitar imagen
          // tabla.rows[peonPosicion[0]].cells[peonPosicion[1]].style =
          // "background-image: none ; background-size:cover;";


        }

      } else {
        posicion = tokens[i];
        //.slice(1).split(/(\d+)/);
        columna = posicion[0].replace("x", "");
        renglon = posicion[1].slice(-1);
        var Pdestino = [corregirRenglon(renglon), convertirLetraNumero(columna)];
        if (turno) {
          puedeComerPeonBlanco(Pdestino[0], Pdestino[1], peonesBlancos);
          tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
            "background-image: url(./img/PeonB.png); background-size:cover;";

          //quitar imagen
          tabla.rows[peonPosicion[0]].cells[peonPosicion[1]].style =
            "background-image: none ; background-size:cover;;";

        } else {
         

          avanzarPeonBlanco(Pdestino[0], Pdestino[1], peonesNegros);
          tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
            "background-image: url(./img/PeonN.png); background-size:cover;";


          //quitar imagen
          tabla.rows[peonPosicion[0]].cells[peonPosicion[1]].style =
            "background-image: none ; background-size:cover;";
        }
      }





    }
    else if (tokens[i].endsWith("#")) {
      jaque = "Jaque Mate";
      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1].slice(-1);
    } else {
      //aqui hubo un movimiento de peon normal
      posicion = tokens[i].split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1];
      var Pdestino = [corregirRenglon(renglon), convertirLetraNumero(columna)]

      if (turno) {
        //mueven blancas
        avanzarPeonBlanco(Pdestino[0], Pdestino[1], peonesBlancos);
        
        tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
          "background-image: url(./img/PeonB.png); background-size:cover;";


        //quitar imagen
        tabla.rows[peonPosicion[0]].cells[peonPosicion[1]].style =
          "background-image: none ; background-size:cover;";

      } else {
        //mueven negras
        //mueven blancas
        avanzarPeonBlanco(Pdestino[0], Pdestino[1], peonesNegros);
        tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
          "background-image: url(./img/PeonN.png); background-size:cover;";

        //quitar imagen
        tabla.rows[peonPosicion[0]].cells[peonPosicion[1]].style =
          "background-image: none ; background-size:cover;";

      }
    }

    /*tabla.rows[parseInt(renglon) - 1].cells[convertirLetraNumero(columna)].style =
    "background-image: url(./img/PeonN.png); background-size:cover;";
  //console.log((parseInt(renglon)+1) + " " + convertirLetraNumero(columna) );
  //console.log(parseInt(renglon)+2 + " " + convertirLetraNumero(columna) );
  tabla.rows[parseInt(renglon) - 3].cells[convertirLetraNumero(columna)].style =
    "background-image: none ; background-size:cover;";*/
    //Movimientos de caballo
  } else if (tokens[i].startsWith("N")) {
    pieza = "caballo";
    jaque = "";

    if (tokens[i].startsWith("Nx")) {
      posicion = tokens[i].slice(2).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1];
      //mover caballos normal
      if (turno) {
        //Turno blancas
        var Pdestino = [corregirRenglon(renglon), convertirLetraNumero(columna)]

        

        if (esMovimientoCaballo(caballoblanco1, Pdestino)) {
          
          tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
            "background-image: url(./img/caballoB.png); background-size:cover;";

          tabla.rows[caballoblanco1[0]].cells[caballoblanco1[1]].style =
            "background-image: none ; background-size:cover;";
          caballoblanco1 = [Pdestino[0], Pdestino[1]];

        } else {
      
          tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
            "background-image: url(./img/caballoB.png); background-size:cover;";

          tabla.rows[caballoblanco2[0]].cells[caballoblanco2[1]].style =
            "background-image: none ; background-size:cover;";
          caballoblanco2 = [Pdestino[0], Pdestino[1]];

        }

      } else {
        // Turno negras
        var Pdestino = [corregirRenglon(renglon), convertirLetraNumero(columna)]

        if (esMovimientoCaballo(caballonegro1, Pdestino)) {
        
          tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
            "background-image: url(./img/caballoN.png); background-size:cover;";

          tabla.rows[caballonegro1[0]].cells[caballonegro1[1]].style =
            "background-image: none ; background-size:cover;";
          caballonegro1 = [Pdestino[0], Pdestino[1]];

        } else {
        
          tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
            "background-image: url(./img/caballoN.png); background-size:cover;";

          tabla.rows[caballonegro2[0]].cells[caballonegro2[1]].style =
            "background-image: none ; background-size:cover;";
          caballonegro2 = [Pdestino[0], Pdestino[1]];

        }

      }

    } else {
      //Movimiento del caballo normal

      if (tokens[i].length >= 4) {
        posicion = tokens[i].slice(2).split(/(\d+)/);
        posicionCaballo = tokens[i].slice(1).split(/(\d+)/);
        columna = posicion[0].replace("x", "");
        renglon = posicion[1];
        var Pdestino = [corregirRenglon(renglon), convertirLetraNumero(columna)]
        var prueba = posicionCaballo[0].charAt(0);

        if (turno) {
          //Indica el renglo que especifica la pieza que se movera
          if (convertirLetraNumero(prueba) == caballoblanco1[1]) {

            tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
              "background-image: url(./img/caballoB.png); background-size:cover;";

            tabla.rows[caballoblanco1[0]].cells[caballoblanco1[1]].style =
              "background-image: none ; background-size:cover;";
            caballoblanco1 = [Pdestino[0], Pdestino[1]];

          } else {

            if (tokens[i].endsWith("+")) {
              posicion = tokens[i].slice(1).split(/(\d+)/);
              columna = posicion[0].replace("x", "");
              renglon = posicion[1];

              var Pdestino = [corregirRenglon(renglon), convertirLetraNumero(columna)];
              tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
                "background-image: url(./img/caballoB.png); background-size:cover;";


              tabla.rows[caballoblanco2[0]].cells[caballoblanco2[1]].style =
                "background-image: none ; background-size:cover;";
              caballoblanco2 = [Pdestino[0], Pdestino[1]];
            } else {

              posicion = tokens[i].slice(2).split(/(\d+)/);

              columna = posicion[0].replace("x", "");
              renglon = posicion[1];

              tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
                "background-image: url(./img/caballoB.png); background-size:cover;";


              tabla.rows[caballoblanco2[0]].cells[caballoblanco2[1]].style =
                "background-image: none ; background-size:cover;";
              caballoblanco2 = [Pdestino[0], Pdestino[1]];
            }
          }
        } else {

          // turno negras
          //Indica el renglo que especifica la pieza que se movera
          if (convertirLetraNumero(prueba) == caballonegro1[1]) {

            tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
              "background-image: url(./img/caballoN.png); background-size:cover;";

            tabla.rows[caballonegro1[0]].cells[caballonegro1[1]].style =
              "background-image: none ; background-size:cover;";
            caballonegro1 = [Pdestino[0], Pdestino[1]];

          } else {

            if (tokens[i].endsWith("+")) {
              posicion = tokens[i].slice(1).split(/(\d+)/);
              columna = posicion[0].replace("x", "");
              renglon = posicion[1];
              var Pdestino = [corregirRenglon(renglon), convertirLetraNumero(columna)]
              tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
                "background-image: url(./img/caballoB.png); background-size:cover;";


              tabla.rows[caballonegro2[0]].cells[caballonegro2[1]].style =
                "background-image: none ; background-size:cover;";
              caballoblanco2 = [Pdestino[0], Pdestino[1]];
            } else {

              posicion = tokens[i].slice(2).split(/(\d+)/);

              columna = posicion[0].replace("x", "");
              renglon = posicion[1];

              tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
                "background-image: url(./img/caballoN.png); background-size:cover;";


              tabla.rows[caballonegro2[0]].cells[caballonegro2[1]].style =
                "background-image: none ; background-size:cover;";
              caballonegro2 = [Pdestino[0], Pdestino[1]];


            }


          }
        }






      } else {
        posicion = tokens[i].slice(1).split(/(\d+)/);
        columna = posicion[0].replace("x", "");
        renglon = posicion[1];
        var Pdestino = [corregirRenglon(renglon), convertirLetraNumero(columna)]

        if (turno) {
          //Turno blancas
          var Pdestino = [corregirRenglon(renglon), convertirLetraNumero(columna)]

          if (esMovimientoCaballo(caballoblanco1, Pdestino)) {
            tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
              "background-image: url(./img/caballoB.png); background-size:cover;";

            tabla.rows[caballoblanco1[0]].cells[caballoblanco1[1]].style =
              "background-image: none ; background-size:cover;";
            caballoblanco1 = [Pdestino[0], Pdestino[1]];

          } else {
            tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
              "background-image: url(./img/caballoB.png); background-size:cover;";

            tabla.rows[caballoblanco2[0]].cells[caballoblanco2[1]].style =
              "background-image: none ; background-size:cover;";
            caballoblanco2 = [Pdestino[0], Pdestino[1]];

          }

        } else {
          // Turno negras
          var Pdestino = [corregirRenglon(renglon), convertirLetraNumero(columna)]

          if (esMovimientoCaballo(caballonegro1, Pdestino)) {
            tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
              "background-image: url(./img/caballoN.png); background-size:cover;";

            tabla.rows[caballonegro1[0]].cells[caballonegro1[1]].style =
              "background-image: none ; background-size:cover;";
            caballonegro1 = [Pdestino[0], Pdestino[1]];

          } else {
            tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
              "background-image: url(./img/caballoN.png); background-size:cover;";

            tabla.rows[caballonegro2[0]].cells[caballonegro2[1]].style =
              "background-image: none ; background-size:cover;";
            caballonegro2 = [Pdestino[0], Pdestino[1]];

          }
        }
      }
    }
    if (tokens[i].endsWith("+")) {
      jaque = "Jaque";
      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1].slice(-1);
      var Pdestino = [corregirRenglon(renglon), convertirLetraNumero(columna)]
      if (turno) {
        //Turno blancas
        var Pdestino = [corregirRenglon(renglon), convertirLetraNumero(columna)]

        if (esMovimientoCaballo(caballoblanco1, Pdestino)) {
          tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
            "background-image: url(./img/caballoB.png); background-size:cover;";

          tabla.rows[caballoblanco1[0]].cells[caballoblanco1[1]].style =
            "background-image: none ; background-size:cover;";
          caballoblanco1 = [Pdestino[0], Pdestino[1]];

        } else {
          tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
            "background-image: url(./img/caballoB.png); background-size:cover;";

          //tabla.rows[caballoblanco2[0]].cells[caballoblanco2[1]].style =
           // "background-image: none ; background-size:cover;";
          caballoblanco2 = [Pdestino[0], Pdestino[1]];

        }

      } else {
        // Turno negras
        var Pdestino = [corregirRenglon(renglon), convertirLetraNumero(columna)]

        if (esMovimientoCaballo(caballonegro1, Pdestino)) {
          tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
            "background-image: url(./img/caballoN.png); background-size:cover;";

          tabla.rows[caballonegro1[0]].cells[caballonegro1[1]].style =
            "background-image: none ; background-size:cover;";
          caballonegro1 = [Pdestino[0], Pdestino[1]];

        } else {
          tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
            "background-image: url(./img/caballoN.png); background-size:cover;";

          tabla.rows[caballonegro2[0]].cells[caballonegro2[1]].style =
            "background-image: none ; background-size:cover;";
          caballonegro2 = [Pdestino[0], Pdestino[1]];

        }

      }
    }
    if (tokens[i].endsWith("#")) {
      jaque = "Jaque Mate";
      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1].slice(-1);
    }
  } else if (tokens[i].startsWith("B")) {
    pieza = "Alfil";
    jaque = "";
    if (tokens[i].startsWith("Bx")) {
      posicion = tokens[i].slice(2).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1];

      if (turno) {
        //Turno blancas
        var Pdestino = [corregirRenglon(renglon), convertirLetraNumero(columna)]

        if (moverAlfil(alfilBlanco1, Pdestino)) {
          tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
            "background-image: url(./img/AlfilB.png); background-size:cover;"

          tabla.rows[alfilPosicion[0]].cells[alfilPosicion[1]].style =
            "background-image: none ; background-size:cover;";
          alfilBlanco1 = [Pdestino[0], Pdestino[1]];

        } else {
          //alfil 2
          tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
            "background-image: url(./img/AlfilB.png); background-size:cover;";

          tabla.rows[alfilPosicion[0]].cells[alfilPosicion[1]].style =
            "background-image: none ; background-size:cover;";
          alfilBlanco2 = [Pdestino[0], Pdestino[1]];

        }

      } else {
        // Turno negras
        var Pdestino = [corregirRenglon(renglon), convertirLetraNumero(columna)]

        if (moverAlfilNegro(alfilNegro1, Pdestino)) {
          tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
            "background-image: url(./img/AlfilN.png); background-size:cover;";

          tabla.rows[alfilPosicion[0]].cells[alfilPosicion[1]].style =
            "background-image: none ; background-size:cover;";
          alfilNegro1 = [Pdestino[0], Pdestino[1]];

        } else {
          //alfil 2
          tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
            "background-image: url(./img/AlfilN.png); background-size:cover;";

          tabla.rows[alfilPosicion[0]].cells[alfilPosicion[1]].style =
            "background-image: none ; background-size:cover;";
          alfilNegro2 = [Pdestino[0], Pdestino[1]];

        }

      }

    } else {
      //Mover alfi normal
      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1];

      if (turno) {
        //Turno blancas
        var Pdestino = [corregirRenglon(renglon), convertirLetraNumero(columna)]

        if (moverAlfil(alfilBlanco1, Pdestino)) {
        
          tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
            "background-image: url(./img/AlfilB.png); background-size:cover;";

          tabla.rows[alfilBlanco1[0]].cells[alfilBlanco1[1]].style =
            "background-image: none ; background-size:cover;";
          alfilBlanco1 = [Pdestino[0], Pdestino[1]];

        } else {
          //alfil 2
          tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
            "background-image: url(./img/AlfilB.png); background-size:cover;";


          tabla.rows[alfilBlanco2[0]].cells[alfilBlanco2[1]].style =
            "background-image: none ; background-size:cover;";
          alfilBlanco2 = [Pdestino[0], Pdestino[1]];

        }

      } else {
        // Turno negras
        var Pdestino = [corregirRenglon(renglon), convertirLetraNumero(columna)]

        if (moverAlfilNegro(alfilNegro1, Pdestino)) {
          tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
            "background-image: url(./img/AlfilN.png); background-size:cover;";

          tabla.rows[alfilNegro1[0]].cells[alfilNegro1[1]].style =
            "background-image: none ; background-size:cover;";
          alfilNegro1 = [Pdestino[0], Pdestino[1]];

        } else {
          //alfil 2
          tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
            "background-image: url(./img/AlfilN.png); background-size:cover;";


          tabla.rows[alfilPosicion[0]].cells[alfilPosicion[1]].style =
            "background-image: none ; background-size:cover;";
          alfilNegro2 = [alfilPosicion[0], alfilPosicion[1]];

        }

      }
    }
    if (tokens[i].endsWith("+")) {
      jaque = "Jaque";
      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x  ", "");
      renglon = posicion[1].slice(-1);
      if (turno) {


      } else {
        // Turno negras
     

      }
    }
    if (tokens[i].endsWith("#")) {
      jaque = "Jaque Mate";
      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1].slice(-1);
      var Pdestino = [corregirRenglon(renglon), convertirLetraNumero(columna)]

      if (moverAlfil(alfilBlanco1, Pdestino)) {
        tabla.rows[alfilBlanco1[0]].cells[alfilBlanco1[1]].style.backgroundColor = "red";
        tabla.rows[reynegro[0]].cells[reynegro[1]].style.backgroundColor = "red";
      } else {
        tabla.rows[alfilBlanco2[0]].cells[alfilBlanco2[1]].style.backgroundColor = "red";
        tabla.rows[reynegro[0]].cells[reynegro[1]].style.backgroundColor = "red";
      }

      tabla.rows[alfilBlanco1[0]].cells[alfilBlanco1[1]].style.backgroundColor = "red";
      tabla.rows[reynegro[0]].cells[reynegro[1]].style.backgroundColor = "red";
      fin = true;
    }
  } else if (tokens[i].startsWith("K")) {
    // Mover rey
    pieza = "Rey";
    jaque = "";
    if (tokens[i].startsWith("Kx")) {
      //Rey come
      posicion = tokens[i].slice(2).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1];

      if (turno) {
        //Rey blanco
        var Pdestino = [corregirRenglon(renglon), convertirLetraNumero(columna)]
        //mueven blancas

        tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
          "background-image: url(./img/ReyB.png); background-size:cover;";
        //console.log((parseInt(renglon)+1) + " " + convertirLetraNumero(columna) );
        //console.log(parseInt(renglon)+2 + " " + convertirLetraNumero(columna) );
        tabla.rows[reyBlanco[0]].cells[reyBlanco[1]].style =
          "background-image: none ; background-size:coverr;";
        reyBlanco = [Pdestino[0], Pdestino[1]];
      } else {
        //Rey negro
        var Pdestino = [corregirRenglon(renglon), convertirLetraNumero(columna)]
        tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
          "background-image: url(./img/ReyN.png); background-size:cover;";

        tabla.rows[reynegro[0]].cells[reynegro[1]].style =
          "background-image: none ; background-size:coverr;";

        //guardar posicion actualizada
        reynegro = [Pdestino[0], Pdestino[1]];
      }

    } else {
      //Movimiento normal rey
      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1];
      if (turno) {
        //Rey blanco
        var Pdestino = [corregirRenglon(renglon), convertirLetraNumero(columna)]
        //mueven blancas

        tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
          "background-image: url(./img/ReyB.png); background-size:cover;";

        tabla.rows[reyBlanco[0]].cells[reyBlanco[1]].style =
          "background-image: none ; background-size:cover;";
        reyBlanco = [Pdestino[0], Pdestino[1]];

      } else {
        //Rey negro
        var Pdestino = [corregirRenglon(renglon), convertirLetraNumero(columna)]
        tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
          "background-image: url(./img/ReyN.png); background-size:cover;";

        tabla.rows[reynegro[0]].cells[reynegro[1]].style =
          "background-image:none ; background-size:cover;";

        //guardar posicion actualizada
        reynegro = [Pdestino[0], Pdestino[1]];
      }
    }
    if (tokens[i].endsWith("+")) {
      jaque = "Jaque";
      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1].slice(-1);

    }
    else if (tokens[i].endsWith("#")) {
      jaque = "Jaque Mate";
      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1].slice(-1);


    }
    // movimiento reynas
  } else if (tokens[i].startsWith("Q")) {
    pieza = "Reina";
    jaque = "";

    if (tokens[i].startsWith("Qx")) {
      posicion = tokens[i].slice(2).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1];

      if (turno) {
        //Reyna blanco
        var Pdestino = [corregirRenglon(renglon), convertirLetraNumero(columna)]
        tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
          "background-image: url(./img/ReinaB.png); background-size:cover;";

        tabla.rows[reynablanco[0]].cells[reynablanco[1]].style =
          "background-image: none ; background-size:coverr;";

        //guardar posicion actualizada
        reynablanco = [Pdestino[0], Pdestino[1]];

      } else {
        //Reyna negro
        var Pdestino = [corregirRenglon(renglon), convertirLetraNumero(columna)]
        tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
          "background-image: url(./img/ReinaN.png); background-size:cover;";

        tabla.rows[reynanegro[0]].cells[reynanegro[1]].style =
          "background-image: none ; background-size:coverr;";

        //guardar posicion actualizada
        reynanegro = [Pdestino[0], Pdestino[1]];
      }


    } else {
      //Movimiento normal reina
      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1];

      if (turno) {
        //Reyna blanco
        var Pdestino = [corregirRenglon(renglon), convertirLetraNumero(columna)]
        //mueven blancas

        tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
          "background-image: url(./img/ReinaB.png); background-size:cover;";


        tabla.rows[reynablanco[0]].cells[reynablanco[1]].style =
          "background-image: none ; background-size:cover;";
        reynablanco = [Pdestino[0], Pdestino[1]];

      } else {
        //Reyna negro
        var Pdestino = [corregirRenglon(renglon), convertirLetraNumero(columna)]
        tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
          "background-image: url(./img/ReinaN.png); background-size:cover;";

        tabla.rows[reynanegro[0]].cells[reynanegro[1]].style =
          "background-image: none ; background-size:coverr;";

        //guardar posicion actualizada
        reynanegro = [Pdestino[0], Pdestino[1]];

      }

    }
    if (tokens[i].endsWith("+")) {
      jaque = "Jaque";
      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1].slice(-1);


      /*if (turno) {
        //Rey blanco

        tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
          "background-image: url(./img/ReinaB.png); background-size:cover;";

          tabla.rows[reynablanco[0]].cells[reyBlanco[1]].style =
          "background-image: none ; background-size:coverr;";
          console.log(reynablanco)

  

        //guardar posicion actualizada
        //reynablanco = [Pdestino[0], Pdestino[1]];

      } else {
        //Rey negro
        var Pdestino = [corregirRenglon(renglon), convertirLetraNumero(columna)]
        tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
          "background-image: url(./img/ReyN.png); background-size:cover;";

        tabla.rows[reynanegro[0]].cells[reynanegro[1]].style =
          "background-image: none ; background-size:coverr;";

        //guardar posicion actualizada
        reynanegro = [Pdestino[0], Pdestino[1]];
      }*/


    }
    if (tokens[i].endsWith("#")) {
      jaque = "Jaque Mate";
      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1].slice(-1);

      tabla.rows[reynanegro[0]].cells[reynanegro[1]].style.backgroundColor = "red";
      tabla.rows[reyBlanco[0]].cells[reyBlanco[1]].style.backgroundColor = "red";
      fin = true;










    }
  } else if (tokens[i].startsWith("R")) {
    pieza = "Torre";
    jaque = "";
    if (tokens[i].startsWith("Rx")) {
      posicion = tokens[i].slice(2).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1];

      var Pdestino = [corregirRenglon(renglon), convertirLetraNumero(columna)];

      if (turno) {
        var celdas = document.getElementById("Tablero");

        if (moverTorre(tabla, TorreB1, Pdestino)) {
          peonPosicion = [TorreB1[0], TorreB1[1]];
          TorreB1 = [Pdestino[0], Pdestino[1]];

          tabla.rows[TorreB1[0]].cells[TorreB1[1]].style =
            "background-image: url(./img/TorreB.png); background-size:cover;";

          tabla.rows[peonPosicion[0]].cells[peonPosicion[1]].style =
            "background-image: none ; background-size:cover;";

        } else {
          // torre 2
          peonPosicion = [TorreB2[0], TorreB2[1]];
          TorreB2 = [Pdestino[0], Pdestino[1]];

          tabla.rows[TorreB2[0]].cells[TorreB2[1]].style =
            "background-image: url(./img/TorreB.png); background-size:cover;";

          tabla.rows[peonPosicion[0]].cells[peonPosicion[1]].style =
            "background-image: none ; background-size:cover;";
        }

      } else {
        //Comer negras

        if (moverTorre(tabla, TorreN1, Pdestino)) {
          peonPosicion = [TorreN1[0], TorreN1[1]];
          TorreN1 = [Pdestino[0], Pdestino[1]];

          tabla.rows[TorreB1[0]].cells[TorreN1[1]].style =
            "background-image: url(./img/TorreN.png); background-size:cover;";

          tabla.rows[peonPosicion[0]].cells[peonPosicion[1]].style =
            "background-image: none ; background-size:cover;";

        } else {
          // torre 2
          peonPosicion = [TorreN2[0], TorreN2[1]];
          TorreN2 = [Pdestino[0], Pdestino[1]];

          tabla.rows[TorreN2[0]].cells[TorreN2[1]].style =
            "background-image: url(./img/TorreN.png); background-size:cover;";

          tabla.rows[peonPosicion[0]].cells[peonPosicion[1]].style =
            "background-image: none ; background-size:cover;";
        }

      }

    } else {
      //Movimiento torre normal
      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1];
      var Pdestino = [corregirRenglon(renglon), convertirLetraNumero(columna)];

      if (turno) {

        if (moverTorre(tabla, TorreB1, Pdestino)) {
          peonPosicion = [TorreB1[0], TorreB1[1]];

          tabla.rows[TorreB1[0]].cells[TorreB1[1]].style =
            "background-image: url(./img/TorreB.png); background-size:cover;";

          tabla.rows[peonPosicion[0]].cells[peonPosicion[1]].style =
            "background-image: none ; background-size:cover;";
          TorreB1 = [Pdestino[0], Pdestino[1]];
        } else {
          // torre 2
          peonPosicion = [TorreB2[0], TorreB2[1]];

          tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
            "background-image: url(./img/TorreB.png); background-size:cover;";

          tabla.rows[peonPosicion[0]].cells[peonPosicion[1]].style =
            "background-image: none ; background-size:cover;";
          TorreB2 = [Pdestino[0], Pdestino[1]];

        }
      } else {
        //nomral torres negras
        if (moverTorre(tabla, TorreN1, Pdestino)) {
          peonPosicion = [TorreN1[0], TorreN1[1]];

          tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
            "background-image: url(./img/TorreN.png); background-size:cover;";

          tabla.rows[peonPosicion[0]].cells[peonPosicion[1]].style =
            "background-image: none ; background-size:cover;";
          TorreN1 = [Pdestino[0], Pdestino[1]];

        } else {
          // torre 2
          peonPosicion = [TorreN2[0], TorreN2[1]];

          tabla.rows[Pdestino[0]].cells[Pdestino[1]].style =
            "background-image: url(./img/TorreN.png); background-size:cover;";

          tabla.rows[peonPosicion[0]].cells[peonPosicion[1]].style =
            "background-image: none ; background-size:cover;";
          TorreN2 = [Pdestino[0], Pdestino[1]];
        }

      }

    }
    if (tokens[i].endsWith("+")) {
      jaque = "Jaque";
      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1].slice(-1);
      var Pdestino = [corregirRenglon(renglon), convertirLetraNumero(columna)];


    }
    if (tokens[i].endsWith("#")) {
      jaque = "Jaque Mate";
      posicion = tokens[i].slice(1).split(/(\d+)/);
      columna = posicion[0].replace("x", "");
      renglon = posicion[1].slice(-1);
    }
  } else if (tokens[i].startsWith("O")) {
    pieza = "Enroque";
    jaque = "";

    if (turno) {
      //mover blancos
      var tipoEnroque = tokens[i];



      if (tipoEnroque === "O-O") {
        TorreB2 = [8, 6];
        reyBlanco = [8, 7];
        peonPosicion = [8, 5];
        tabla.rows[reyBlanco[0]].cells[reyBlanco[1]].style =
          "background-image: url(./img/ReyB.png); background-size:cover;";

        tabla.rows[peonPosicion[0]].cells[peonPosicion[1]].style =
          "background-image: none ; background-size:cover;";

          tabla.rows[8].cells[8].style =
          "background-image: none ; background-size:cover;";
        //Torre
        tabla.rows[TorreB2[0]].cells[TorreB2[1]].style =
          "background-image: url(./img/TorreB.png); background-size:cover;";



      } else {

        TorreB1 = [8, 4];
        reyBlanco = [8, 3];
        peonPosicion = [8, 5]
        //enroque largo
        tabla.rows[reyBlanco[0]].cells[reyBlanco[1]].style =
          "background-image: url(./img/ReyB.png); background-size:cover;";

        tabla.rows[peonPosicion[0]].cells[peonPosicion[1]].style =
          "background-image: none ; background-size:cover;";

        tabla.rows[8].cells[1].style =
          "background-image: none ; background-size:cover;";



        //Torre 
        tabla.rows[TorreB1[0]].cells[TorreB1[1]].style =
          "background-image: url(./img/TorreB.png); background-size:cover;";
      }




    } else {
      //Comer negras
      var tipoEnroque = tokens[i];



      if (tipoEnroque === "O-O") {

        TorreN2 = [1, 6];
        reynegro = [1, 7];
        peonPosicion = [1, 5];
       
       
        tabla.rows[reynegro[0]].cells[reynegro[1]].style =
          "background-image: url(./img/ReyN.png); background-size:cover;";

        tabla.rows[peonPosicion[0]].cells[peonPosicion[1]].style =
          "background-image: none ; background-size:cover;";

        //Torre
        tabla.rows[TorreN2[0]].cells[TorreN2[1]].style =
          "background-image: url(./img/TorreN.png); background-size:cover;";

        tabla.rows[1].cells[8].style =
          "background-image: none ; background-size:cover;";




      } else {
        TorreN1 = [8, 4];
        reyBlanco = [8, 3];
        peonPosicion = [8, 5]
   
        //enroque largo
        tabla.rows[reyBlanco[0]].cells[reyBlanco[1]].style =
          "background-image: url(./img/ReyB.png); background-size:cover;";

        tabla.rows[peonPosicion[0]].cells[peonPosicion[1]].style =
          "background-image: none ; background-size:cover;";

        tabla.rows[8].cells[1].style =
          "background-image: none ; background-size:cover;";

        //Torre 
        tabla.rows[TorreB1[0]].cells[TorreB1[1]].style =
          "background-image: url(./img/TorreB.png); background-size:cover;";
      }

    }


  } else{

  }
    //console.log('Se termina el archivoaaaaaaaaaaaaaaaaaa')
  document.getElementById("turno").innerHTML =
    "Movimiento: " +
    (i + 1) +
    " Turno " +
    (turno == true ? "blancas " : " negras ") +
    tokens[i++] +
    " " +
    pieza +
    " y se va a mover a Columna:" +
    columna +
    " Renglon:" +
    renglon +
    " " +
    jaque;
  turno = !turno;
 
}
}

function iniciar() {
  var celdas = document.getElementById("Tablero");

  celdas.rows[2].cells[1].style =
    "background-image: url(./img/PeonN.png); background-size:cover;";
  celdas.rows[2].cells[2].style =
    "background-image: url(./img/PeonN.png); background-size:cover;";
  celdas.rows[2].cells[3].style =
    "background-image: url(./img/PeonN.png); background-size:cover;";
  celdas.rows[2].cells[4].style =
    "background-image: url(./img/PeonN.png); background-size:cover;";
  celdas.rows[2].cells[5].style =
    "background-image: url(./img/PeonN.png); background-size:cover;";
  celdas.rows[2].cells[6].style =
    "background-image: url(./img/PeonN.png); background-size:cover;";
  celdas.rows[2].cells[7].style =
    "background-image: url(./img/PeonN.png); background-size:cover;";
  celdas.rows[2].cells[8].style =
    "background-image: url(./img/PeonN.png); background-size:cover;";

  celdas.rows[7].cells[1].style =
    "background-image: url(./img/PeonB.png); background-size:cover;";
  celdas.rows[7].cells[2].style =
    "background-image: url(./img/PeonB.png); background-size:cover;";
  celdas.rows[7].cells[3].style =
    "background-image: url(./img/PeonB.png); background-size:cover;";
  celdas.rows[7].cells[4].style =
    "background-image: url(./img/PeonB.png); background-size:cover;";
  celdas.rows[7].cells[5].style =
    "background-image: url(./img/PeonB.png); background-size:cover;";
  celdas.rows[7].cells[6].style =
    "background-image: url(./img/PeonB.png); background-size:cover;";
  celdas.rows[7].cells[7].style =
    "background-image: url(./img/PeonB.png); background-size:cover;";
  celdas.rows[7].cells[8].style =
    "background-image: url(./img/PeonB.png); background-size:cover;";

  celdas.rows[8].cells[3].style =
    "background-image: url(./img/AlfilB.png); background-size:cover;";
  celdas.rows[1].cells[3].style =
    "background-image: url(./img/AlfilN.png); background-size:cover;";
  celdas.rows[8].cells[6].style =
    "background-image: url(./img/AlfilB.png); background-size:cover;";
  celdas.rows[1].cells[6].style =
    "background-image: url(./img/AlfilN.png); background-size:cover;";

  celdas.rows[8].cells[1].style =
    "background-image: url(./img/TorreB.png); background-size:cover;";
  celdas.rows[1].cells[1].style =
    "background-image: url(./img/TorreN.png); background-size:cover;";
  celdas.rows[8].cells[8].style =
    "background-image: url(./img/TorreB.png); background-size:cover;";
  celdas.rows[1].cells[8].style =
    "background-image: url(./img/TorreN.png); background-size:cover;";

  celdas.rows[8].cells[1].style =
    "background-image: url(./img/TorreB.png); background-size:cover;";
  celdas.rows[1].cells[1].style =
    "background-image: url(./img/TorreN.png); background-size:cover;";
  celdas.rows[8].cells[8].style =
    "background-image: url(./img/TorreB.png); background-size:cover;";
  celdas.rows[1].cells[8].style =
    "background-image: url(./img/TorreN.png); background-size:cover;";

  celdas.rows[8].cells[2].style =
    "background-image: url(./img/CaballoB.png); background-size:cover;";
  celdas.rows[1].cells[2].style =
    "background-image: url(./img/CaballoN.png); background-size:cover;";
  celdas.rows[8].cells[7].style =
    "background-image: url(./img/CaballoB.png); background-size:cover;";
  celdas.rows[1].cells[7].style =
    "background-image: url(./img/CaballoN.png); background-size:cover;";


  celdas.rows[8].cells[2].style =
    "background-image: url(./img/CaballoB.png); background-size:cover;";
  celdas.rows[1].cells[2].style =
    "background-image: url(./img/CaballoN.png); background-size:cover;";

  celdas.rows[8].cells[5].style =
    "background-image: url(./img/ReyB.png); background-size:cover;";
  celdas.rows[1].cells[5].style =
    "background-image: url(./img/ReyN.png); background-size:cover;";

  celdas.rows[8].cells[4].style =
    "background-image: url(./img/ReinaB.png); background-size:cover;";
  celdas.rows[1].cells[4].style =
    "background-image: url(./img/ReinaN.png); background-size:cover;";
}

function limpiarTablero() {
  var celdas = document.getElementById("Tablero");

  // Recorre cada fila del tablero
  for (var i = 0; i < celdas.rows.length; i++) {
    // Recorre cada celda de la fila actual
    for (var j = 0; j < celdas.rows[i].cells.length; j++) {
      // Elimina el fondo de la celda
      celdas.rows[i].cells[j].style.backgroundImage = "";
      celdas.rows[i].cells[j].style.backgroundSize = "";
    }
  }
}

function partidas() {
  var textarea = document.getElementById("texto");
  var valor = document.getElementById("Combo").value;

  switch (valor) {
    case "0":
      textarea.value = "";
      break;
    case "1":
      textarea.value = "Partida 1";
      break;
    case "2":
      textarea.value = "Partida 2";
      break;
    case "3":
      textarea.value = "Partida 3";
      break;
    default:
      break;
  }
}

function removernumero1() {
  var texto = document.getElementById("textarea1").value;
  document.getElementById("textarea2").innerHTML = texto.replace(/\d+\.\s*/g, '');
  //console.log(document.getElementById("textarea2").value)
}

function removernumero() {
  var texto = document.getElementById("textarea1").value;
  //console.log("Texto original:", texto);
  var textoSinNumeros = texto.replace(/\d+\.\s*/g, '');
  //console.log("Texto sin números:", textoSinNumeros);
  document.getElementById("textarea2").value = textoSinNumeros; // Cambia innerHTML por value
  //console.log("Contenido de textarea2:", document.getElementById("textarea2").value);
}



function getTokens() {
  tokens = document.getElementById("textarea2").value.split(/\s+/);
  var salida = "";
  //tokens[0];
  for (let i = 0; i < tokens.length; i++) {
    salida += tokens[i] + "\n"

  }
  document.getElementById("textarea3").value = salida;
 
}




var tiempoEntrePasos = 1000;
function pasosCompleto() {

  // Función para ejecutar cada paso
  function ejecutarPaso() {
    // Realiza un paso
    pasos();

    // Si no se ha alcanzado el fin, programa el próximo paso después de un cierto tiempo
    if (!fin) {
      setTimeout(ejecutarPaso, tiempoEntrePasos);
    }
  }

  // Llama a la función para ejecutar el primer paso
  ejecutarPaso();
}

function reiniciar() {

  var celdas = document.getElementById("Tablero");

  celdas.rows[4].cells[1].style =
  "background-image: none ; background-size:cover;";

  celdas.rows[4].cells[2].style =
  "background-image: none ; background-size:cover;";

  //celdas.rows[1].cells[4].style =
  //  "background-image: none ; background-size:cover;";

  celdas.rows[3].cells[2].style =
   "background-image: none ; background-size:cover;";

  limpiarTablero();
  iniciar();
  document.getElementById("textarea1").value = '';
  document.getElementById("textarea2").value = "";
 document.getElementById("textarea3").value = "";

 document.getElementById("cargarBoton").disabled = false;
 document.getElementById("validarcampo").disabled = false;
 document.getElementById("validarcampoc").disabled = false;


 document.getElementById("cargarBoton").value = ''; // Limpia el valor del input file
 //document.getElementById("cargarBoton").removeEventListener("change", cargarPartida);
 
  tokens='';

var contadorPaso = 0;
var j = 0;
var archivo;
/*True es para las blancas y false para las negras*/
tokens = "";
i = 0;
turno = true;
texto = "";
columna = "";
renglon = "";
posicion = "";
jaque = "";
caballoblanco1 = [8, 2];
caballoblanco2 = [8, 7];
caballonegro1 = [1, 2];
caballonegro2 = [1, 7];
 reynegro = [1, 5];
 reyBlanco = [8, 5];
reynablanco = [8, 4];
reynanegro = [1, 4]; var reynablanco = [8, 4];
alfilBlanco1 = [8, 3]; var alfilBlanco2 = [8, 6];
alfilNegro1 = [1, 3]; var alfilNegro2 = [1, 6];
TorreB1 = [8, 1]; var TorreB2 = [8, 8];
TorreN1 = [1, 1]; var TorreN2 = [1, 8];
 fin = false;

 peonesBlancos = [
  { nombre: 'p1', posicion: [7, 1], disponible: true },
  { nombre: 'p2', posicion: [7, 2], disponible: true },
  { nombre: 'p3', posicion: [7, 3], disponible: true },
  { nombre: 'p4', posicion: [7, 4], disponible: true },
  { nombre: 'p5', posicion: [7, 5], disponible: true },
  { nombre: 'p6', posicion: [7, 6], disponible: true },
  { nombre: 'p7', posicion: [7, 7], disponible: true },
  { nombre: 'p8', posicion: [7, 8], disponible: true }
];
peonPosicion = [];
alfilPosicion = []


 peonesNegros = [
  { nombre: 'p1', posicion: [2, 1], disponible: true },
  { nombre: 'p2', posicion: [2, 2], disponible: true },
  { nombre: 'p3', posicion: [2, 3], disponible: true },
  { nombre: 'p4', posicion: [2, 4], disponible: true },
  { nombre: 'p5', posicion: [2, 5], disponible: true },
  { nombre: 'p6', posicion: [2, 6], disponible: true },
  { nombre: 'p7', posicion: [2, 7], disponible: true },
  { nombre: 'p8', posicion: [2, 8], disponible: true }
];

primermov = true;
archivo = null;
document.getElementById("turno").innerHTML = 'blanco';
}



function cargarPartida() {
  archivo = document.getElementById("cargarBoton").files[0];  
  var scanner = new FileReader();
  scanner.onload = function (e) {
    document.getElementById("textarea1").value = e.target.result;
    removernumero();
    getTokens();
    /*document.getElementById("texto").value = document.getElementById("cargarBoton").files;*/
  };
  scanner.readAsText(archivo);
  document.getElementById("cargarBoton").disabled = true;

  //console.log(archivo)
}











function tieneMayusculas(cadena) {
  return /[A-Z]/.test(cadena);
}
function convertirLetraNumero(letra) {
  switch (letra) {
    case "a":
      return 1;
      break;

    case "b":
      return 2;
      break;

    case "c":
      return 3;
      break;

    case "d":
      return 4;
      break;

    case "e":
      return 5;
      break;

    case "f":
      return 6;
      break;

    case "g":
      return 7;
      break;

    case "h":
      return 8;
      break;
  }
}

function corregirRenglon(renglon) {
  switch (renglon) {
    case "1":
      return 8;
      break;

    case "2":
      return 7;
      break;

    case "3":
      return 6;
      break;

    case "4":
      return 5;
      break;

    case "5":
      return 4;
      break;

    case "6":
      return 3;
      break;

    case "7":
      return 2;
      break;

    case "8":
      return 1;
      break;
  }
}

/*async function test() {
  var salida = "";
  for (let i = 0; i < 10; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    salida += i + "<br>";
    document.getElementById("out").innerHTML = salida;
  }
}*/
// Función para avanzar un peón hacia adelante
function avanzarPeonBlanco(renglonDestino, columnaDestino, peones) {
  // Recorremos los peones
  for (let i = 0; i < peones.length; i++) {
    // Obtenemos la columna actual del peón
    let columnaActual = peones[i].posicion[1];
    let renglonActual = peones[i].posicion[0];


    // Si la columna de destino es igual a la columna actual + 1
    if (columnaDestino === columnaActual) {
      // borrar pieza   
      peonPosicion = [renglonActual, columnaActual];

      // Aquí podrías actualizar la posición del peón si es necesario
      peones[i].posicion[1] = columnaDestino;
      peones[i].posicion[0] = renglonDestino

      break; // Terminamos el bucle porque hemos encontrado el peón que queremos mover
    }
  }
}

function puedeComerPeonBlanco(renglonDestino, columnaDestino, peones) {
  // Recorremos los peones
  for (let i = 0; i < peones.length; i++) {
    // Obtenemos la fila y columna actual del peón
    let renglonActual = peones[i].posicion[0];
    let columnaActual = peones[i].posicion[1];
    // Verificar si el peón puede avanzar hacia una casilla diagonal
    if (renglonDestino === renglonActual - 1 && (columnaDestino === columnaActual + 1 || columnaDestino === columnaActual - 1)) {
      // Realizar el movimiento y actualizar las posiciones si es necesario
      peonPosicion = [renglonActual, columnaActual];
      peones[i].posicion = [renglonDestino, columnaDestino];
      return true; // Indicar que el peón pudo comer
    } else[
     // console.log('No entro')
    ]
  }
  // Si ningún peón puede comer en la posición de destino, retornamos false
  return false;
}

function puedeComerPeonNegro(renglonDestino, columnaDestino, peones) {
  // Recorremos los peones
  for (let i = 0; i < peones.length; i++) {
    // Obtenemos la fila y columna actual del peón
    let renglonActual = peones[i].posicion[0];
    let columnaActual = peones[i].posicion[1];
    // Verificar si el peón puede avanzar hacia una casilla diagonal
    if (renglonDestino === renglonActual + 1 && (columnaDestino === columnaActual + 1 || columnaDestino === columnaActual - 1)) {
      // Realizar el movimiento y actualizar las posiciones si es necesario
      peonPosicion = [renglonActual, columnaActual];
      peones[i].posicion = [renglonDestino, columnaDestino];

      return true; // Indicar que el peón pudo comer
    } else[
      //console.log('No entro el peon negro')
    ]
  }
  // Si ningún peón puede comer en la posición de destino, retornamos false
  return false;
}

function moverAlfil(posicionActual, posicionDestino) {
  // Realizar el movimiento del alfil si es válido
  if (esMovimientoAlfil(posicionActual, posicionDestino)) {
    //peonPosicion = posicionActual[0];
    //peonPosicion = posicionActual[1];
    alfilPosicion[0] = alfilBlanco1[0];
    alfilPosicion[1] = alfilBlanco1[1];
    return true;
  } else {
    alfilPosicion[0] = alfilBlanco2[0];
    alfilPosicion[1] = alfilBlanco2[1];
    return false;
  }

}

function moverAlfilNegro(posicionActual, posicionDestino) {
  // Realizar el movimiento del alfil si es válido
  if (esMovimientoAlfil(posicionActual, posicionDestino)) {
    //peonPosicion = posicionActual[0];
    //peonPosicion = posicionActual[1];
    alfilPosicion[0] = alfilNegro1[0];
    alfilPosicion[1] = alfilNegro1[1];
  } else {
    alfilPosicion[0] = alfilNegro2[0];
    alfilPosicion[1] = alfilNegro2[1];
  }
}

function esMovimientoAlfil(posicionActual, posicionDestino) {
  // Verificar si las posiciones están en la misma diagonal
  var dx = Math.abs(posicionDestino[1] - posicionActual[1]);
  var dy = Math.abs(posicionDestino[0] - posicionActual[0]);
  return dx === dy;
}



// Función para verificar si el movimiento es válido para un caballo
function esMovimientoCaballo(origen, destino) {
  // Calcular la distancia horizontal y vertical entre las casillas
  var deltaX = Math.abs(destino[0] - origen[0]);
  var deltaY = Math.abs(destino[1] - origen[1]);

  // Verificar si el movimiento forma un "L"
  return (deltaX === 1 && deltaY === 2) || (deltaX === 2 && deltaY === 1);
}

function enroque(tipoEnroque) {
  // Verificar si el tipo de enroque es corto
  if (tipoEnroque === "O-O") {
    TorreB2 = [8, 7];
    reyBlanco = [8, 8];
    peonPosicion = [8, 5];


  } else {
    TorreB1 = [8, 2];
    reyBlanco = [8, 1];
    peonPosicion = [8, 5]
    return false;
  }
}

function moverTorre(tabla, posicionActual, posicionDestino) {
  var columnaActual = posicionActual[1];
  var renglonActual = posicionActual[0];
  var columnaDestino = posicionDestino[1];
  var renglonDestino = posicionDestino[0];

  // Verificar si la torre se moverá en la misma columna o en el mismo renglón
  if (columnaActual === columnaDestino || renglonActual === renglonDestino) {
    // Verificar si hay alguna pieza en la trayectoria
    var pasoValido = true;
    if (columnaActual === columnaDestino) {
      // Moverse en la misma columna
      var paso = renglonActual < renglonDestino ? 1 : -1;
      for (var i = renglonActual + paso; i !== renglonDestino; i += paso) {
        if (tabla.rows[i].cells[columnaActual].style.backgroundImage !== 'none' && tabla.rows[i].cells[columnaActual].style.backgroundImage !== '') {
          pasoValido = false;
          break;
        }
      }
     
      for (var j = 0; j < tabla.rows.length; j++) {
        var valorCelda = tabla.rows[j].cells[columnaDestino].style.backgroundImage;
       
      }

    } else {
      // Moverse en el mismo renglón
      var paso = columnaActual < columnaDestino ? 1 : -1;
      for (var j = columnaActual + paso; j !== columnaDestino; j += paso) {
        if (tabla.rows[renglonActual].cells[j].style.backgroundImage !== 'none') {

          pasoValido = false;
          break;
        }
      }
      for (var k = 0; k < tabla.rows[renglonActual].cells.length; k++) {
        var valorCelda = tabla.rows[renglonActual].cells[k].style.backgroundImage;
      }
    }

    if (pasoValido) {
      // Mover la torre a la posición destino
      tabla.rows[renglonDestino].cells[columnaDestino].style.backgroundImage = tabla.rows[renglonActual].cells[columnaActual].style.backgroundImage;
      tabla.rows[renglonDestino].cells[columnaDestino].style.backgroundSize = "cover";
      tabla.rows[renglonActual].cells[columnaActual].style.backgroundImage = "none";
      return true;
    } else {

      //console.log("No se puede mover la torre porque hay una pieza bloqueando el camino.");
      return false;
    }
  } else {
   // console.log("La torre solo puede moverse en la misma columna o en el mismo renglón.");
    return false;
  }
}