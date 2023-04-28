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
    const ataquesDisponibles = attacks.filter(attack => attack.type == tipoClase)
    const ataque = ataquesDisponibles[getNumeroRandom(ataquesDisponibles.length)];
}


function generarPersonajeAleatorio(){
    const nombre = 'Personaje_'+getNumeroRandom(100);
    const clases = Object.keys(tipoClase);
    const clase  = clases[getNumeroRandom(clases.length)];
    const validar = clases.filter();
    const primerAtaque = comprobarTipoAtaque(clase);
    //attacks[getNumeroRandom(attacks.length)];
   // console.log(primerAtaque);
   // const nombre = attacks[getNumeroRandom(attacks.length)].name;
   // const nombre = attacks[getNumeroRandom(attacks.length)].name;
   // const nombre = attacks[getNumeroRandom(attacks.length)].name;
}

generarPersonajeAleatorio();
//console.log(types[getNumeroRandom(types.length)]);
