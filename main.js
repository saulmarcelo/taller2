const attacks = require('./attacks.json');
const log = [];
const tipoClase = {
  MAGICIAN: 'MAGIC',
  KNIGHT: 'PHYSICAL',
  WARRIOR: 'PHYSICAL',
  FAIRY: 'MAGIC'
};

function getNumeroRandom(max) {
    return Math.floor(Math.random() * max);
}

function comprobarTipoAtaque(tipoClase){
    let tipoAtaque = "";
    if(tipoClase == "MAGICIAN" || tipoClase === "FAIRY"){
        tipoAtaque = "MAGIC";
        const ataquesDisponibles = attacks.filter(attack => attack.type == tipoAtaque)
        return ataquesDisponibles[getNumeroRandom(ataquesDisponibles.length)];
    } else {
        tipoAtaque ="PHYSICAL";
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

function comprobarNombre(){

}


function generarPersonajeAleatorio(){
    const nombre = 'Personaje_'+getNumeroRandom(100);
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


function ataque (atacante, defensa, numTurno) {
    const ataque = elegirAtaque(atacante);
    const presicion = Math.floor(Math.random() * (100 - 1 + 1)) + 1;;

    if (ataque.accuracy >= presicion) {
        defensa.vida -= ataque.damage;
        if(defensa.vida <= 0){
            log.push(`${atacante.nombre} ataca con ${ataque.name}... Da en el blanco. El ${defensa} no puede continuar`);
            generarResumen(atacante,defensa);
        } else {
            log.push(`Turno ${numTurno}\n 
             ${atacante.nombre} ataca con ${ataque.name}... Da en el blanco!. La vida del ${defensa.nombre} queda en ${defensa.vida}.`);
        }
    } else {
      atacante.ataquesFallados++;
      log.push(`Turno ${numTurno}\n
      ${atacante.nombre} ataca con ${ataque.name}... Falla!. La vida del ${defensa.nombre} se mantiene en ${defensa.vida}.`);
    }

}

function prioridadTurnoCombate (personaje1, personaje2){
    let atacante, defensa,numTurno = 0;
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

  log.push(`### BATALLA  ###\n\n`)
  do{
    numTurno++
    ataque(atacante,defensa,numTurno);
    if(defensa.vida <= 0){
        break;
    }
    
    ataque(defensa,atacante,numTurno);
    if(atacante.vida <=0){
        break;
    }
  } while(true);

}

function comenzarCombate(personaje1,personaje2){
    log.push(`### INICIO ###\n\n`);

    log.push(` ${personaje1.nombre} | ${personaje1.clase} | ${personaje1.vida} de vida vs ${personaje2.nombre} | ${personaje2.clase} | ${personaje2.vida} de vida `);
    prioridadTurnoCombate(personaje1,personaje2);
}

function generateFileLog(logs, filename) {
    const fs = require("fs");
    fs.writeFile(filename, logs, (err) => {
    if (err) throw err;
    });
    }

function generarResumen(personaje1, personaje2){
    log.push(`### RESUMEN ###\n\n`);
    log.push(`${personaje1.nombre} gana la batalla!`)
    log.push(`El ${personaje1.nombre} falló ${personaje1.ataquesFallados} veces su ataque`);
    log.push(`El ${personaje2.nombre} falló ${personaje2.ataquesFallados} veces su ataque`);
}
    


generateFileLog(log, "logs_batalla.txt");
let personaje1 = generarPersonajeAleatorio();
let personaje2 = generarPersonajeAleatorio();
comenzarCombate(personaje1,personaje2);
