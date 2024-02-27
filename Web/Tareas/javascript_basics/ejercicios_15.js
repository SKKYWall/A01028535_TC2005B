function oDescen(listaNumeros) {

//Se usa sort para ordenar :)
  let listaOrd = listaNumeros.sort(function(a, b) {
    return b - a;
  });

  return listaOrd;
}

// Pruebas
let numeros = [4, 2, 7, 1, 9, 5];
let numerosOrdenados = oDescen(numeros);
console.log(numerosOrdenados);
