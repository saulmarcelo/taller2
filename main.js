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
    velocidad
  };


}

let personaje1 = generarPersonajeAleatorio();
console.log(personaje1);
//console.log(types[getNumeroRandom(types.length)]);
