function mayus(cadena) {
    let palabras = cadena.split(' ');
    
    //Info investigada, "Split" funciona para que la palabra se separe y solo se ponga en mayuscula la primera letra.

    let pMayus = palabras.map(function(palabra) {
        return palabra.charAt(0).toUpperCase() + palabra.slice(1);
    });
    
    //toUpperCase es para convertir en mayúscula.
    //slice regresa una copia sin modificar la original

    let nCadena = pMayus.join(' ');
//join une todos los elementos de una matriz
    return nCadena;
}

//Funcionamiento
let prueba = "hola mundo, buenos dias, me gustan las fresas :)";
let fMayus = mayus(prueba);
console.log(fMayus);
