const attacks = require('./attacks.json');
let fightlogs="";

const tipoClase = {
  MAGICIAN: 'MAGIC',
  KNIGHT: 'PHYSICAL',
  WARRIOR: 'PHYSICAL',
  FAIRY: 'MAGIC'
};

function getNumeroRandom(max) {
    return Math.floor(Math.random() * max);
}

//se comprueba el tipoAtaque dado el tipoDeClase del personaje
function comprobarTipoAtaque(tipoClase){
    let tipoAtaque = "";
    if(tipoClase == "MAGICIAN" || tipoClase === "FAIRY"){
        tipoAtaque = "MAGIC";
        const ataquesDisponibles = attacks.filter(attack => attack.type == tipoAtaque)
        return ataquesDisponibles[getNumeroRandom(ataquesDisponibles.length)];
    } else {
        tipoAtaque = "PHYSICAL";
        const ataquesDisponibles = attacks.filter(attack => attack.type == tipoAtaque)
        return ataquesDisponibles[getNumeroRandom(ataquesDisponibles.length)];
    }    
}

function generarVida(){
    return Math.floor(Math.random() * (200 - 100 + 1)) + 100;
}

function generarVelocidad(){
    return Math.floor(Math.random() * 10) + 1;
}


function generarPersonajeAleatorio(){
    const nombre = 'Personaje_'+getNumeroRandom(10);
    const clases = Object.keys(tipoClase);
    const clase  = clases[getNumeroRandom(clases.length)];
    const primerAtaque = comprobarTipoAtaque(clase);
    const segundoAtaque = comprobarTipoAtaque(clase);
    const vida = generarVida();
    const velocidad = generarVelocidad();

    return {
    nombre,
    clase,
    primerAtaque,
    segundoAtaque,
    vida,
    velocidad,
    ataquesFallados : 0
  };
}

function elegirAtaque(personaje){
    return Math.random() < 0.5 ? personaje.primerAtaque : personaje.segundoAtaque;
}


function ataque (atacante, defensa) {
    const ataque = elegirAtaque(atacante);
    const presicion = Math.floor(Math.random() * (100 - 1 + 1)) + 1;;
    //en caso de que la presicion del ataque sea mayor a presicion, se realizara el ataque
    if (ataque.accuracy >= presicion) {
        defensa.vida -= ataque.damage;
        //se comprueba si termina el combate
        if(defensa.vida <= 0){
            fightlogs+=` ${atacante.nombre} ataca con ${ataque.name}... Da en el blanco. El ${defensa.nombre} no puede continuar\n\n`;
            //genera el logs ## RESUMEN ##
            generarResumen(atacante,defensa);
        } else {
            fightlogs+=` ${atacante.nombre} ataca con ${ataque.name}... Da en el blanco!. La vida del ${defensa.nombre} queda en ${defensa.vida}.\n`;
        }
    } else {
    //aumenta el numero de ataques fallidos
      atacante.ataquesFallados++;
      fightlogs+=`${atacante.nombre} ataca con ${ataque.name}... Falla!. La vida del ${defensa.nombre} se mantiene en ${defensa.vida}.\n`;

    }

}

//define quien va a ser el primero en atacar
function prioridadTurnoCombate (personaje1, personaje2){
    let atacante, defensa;
  if (personaje1.velocidad > personaje2.velocidad) {
    atacante = personaje1;
    defensa = personaje2;
  } else if (personaje2.velocidad > personaje1.velocidad) {
    atacante = personaje2;
    defensa = personaje1;
  } else {
    if (Math.random() < 0.5) {
        atacante = personaje1;
        defensa = personaje2;
    } else {
        atacante = personaje2;
        defensa = personaje1;
    }
  }
  comenzarCombate(atacante,defensa);
}

function comenzarCombate(atacante,defensa){
    numTurno =0;
    fightlogs+="### BATALLA ###\n\n";
    do{
      numTurno++;
      fightlogs+=`Turno ${numTurno}\n`;
  
     //ya que atacante tiene mayor velocidad realizaba el ataque primero
      ataque(atacante,defensa,numTurno);
      //comprueba si el defensa perdio
      if(defensa.vida <= 0){
          break;
      }
      
      //luego de que atacante haya realizado el ataque, lo va a realizar el que haya quedado segundo(el defensa)
      ataque(defensa,atacante,numTurno);
  
      //comprueba si el atacante perdio
      if(atacante.vida <=0){
          break;
      }
    } while(true);
}

function generarCombate(personaje1,personaje2){
    fightlogs+="### INICIO ###\n\n";
    fightlogs+=`${personaje1.nombre} | ${personaje1.clase} | ${personaje1.vida} de vida vs ${personaje2.nombre} | ${personaje2.clase} | ${personaje2.vida} de vida `;
    prioridadTurnoCombate(personaje1,personaje2);
}

function generateFileLog(logs, filename) {
    const fs = require("fs");
    fs.writeFile(filename, logs, (err) => {
    if (err) throw err;
        });
    }

function generarResumen(personaje1, personaje2){
    fightlogs+="### RESUMEN ###\n\n";
    fightlogs+=`${personaje1.nombre} gana la batalla!\n`;
    fightlogs+=`El ${personaje1.nombre} falló ${personaje1.ataquesFallados} veces su ataque\n`;
    fightlogs+=`El ${personaje2.nombre} falló ${personaje2.ataquesFallados} veces su ataque\n`;
}

let personaje1 = generarPersonajeAleatorio();
let personaje2 = generarPersonajeAleatorio();

// en caso de que tengan el mismo nombre entra al while, hasta que tengan nombres distintos
while(personaje1.nombre == personaje2.nombre){
     personaje2 = generarPersonajeAleatorio();
}

generarCombate(personaje1,personaje2);
generateFileLog(fightlogs, 'logs_batalla.txt');