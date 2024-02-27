function invertirA(a) {
  let res = [];

  for (let i = a.length - 1; i >= 0; i--) {
    res.push(a[i]);
  }

  return res;
}

function invertirAN(a) {
  for (let i = 0; i < a.length / 2; i++) {
    let t = a[i];
    a[i] = a[a.length - 1 - i];
    a[a.length - 1 - i] = t;
  }
}

// Ejemplo
let a = [2, 3, 4, 5, 6];

//Información investigada: slice regresa una copia del array sin modificar el array original.
let resN = invertirA(a.slice());
console.log("Arreglo invertido:", resN);

// Usando la segunda función
invertirAN(a.slice());
console.log("Arreglo como argumento:", a);
