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
    console.log(tipoClase);
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


function generarPersonajeAleatorio(){
    const nombre = 'Personaje_'+getNumeroRandom(100);
    const clases = Object.keys(tipoClase);
    const clase  = clases[getNumeroRandom(clases.length)];
    const primerAtaque = comprobarTipoAtaque(clase);
    const segundoAtaque = comprobarTipoAtaque(clase);
    //attacks[getNumeroRandom(attacks.length)];
   // console.log(primerAtaque);
   // const nombre = attacks[getNumeroRandom(attacks.length)].name;
   // const nombre = attacks[getNumeroRandom(attacks.length)].name;
   // const nombre = attacks[getNumeroRandom(attacks.length)].name;
}

generarPersonajeAleatorio();
//console.log(types[getNumeroRandom(types.length)]);
