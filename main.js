const attacks = require('./attacks.json');

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
   // const nombre = attacks[getNumeroRandom(attacks.length)].name;
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
    let terminarCombate = false;
    const ataque = elegirAtaque(atacante);
    const presicion = Math.floor(Math.random() * (100 - 1 + 1)) + 1;;
    console.log(atacante)
    if (ataque.accuracy >= presicion) {
        defensa.vida -= ataque.damage;
        if(defensa.vida <= 0){
            console.log("termina combate")
            return true;
        } else {
            return false;
        }
    } else {
      atacante.ataquesFallados++;
      return false;
    }

    return terminarCombate;
}

function prioridadTurnoCombate (personaje1, personaje2){
    let atacante, defensa,numTurno = 0,terminarCombate = false;
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
    
  
  do{
    numTurno++
    terminarCombate = ataque(atacante,defensa,numTurno);
    if(defensa.vida <= 0){
        break;
    }
    
    terminarCombate = ataque(defensa,atacante,numTurno);
    if(atacante.vida <=0){
        break;
    }
  } while(true);

}

function comenzarCombate(personaje1,personaje2){
    prioridadTurnoCombate(personaje1,personaje2);
}



let personaje1 = generarPersonajeAleatorio();
let personaje2 = generarPersonajeAleatorio();
comenzarCombate(personaje1,personaje2);
