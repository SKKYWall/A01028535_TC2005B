function medianaModa(lista) {
    lista.sort(function(a, b) {
        return a - b;
    });

    let mid = Math.floor(lista.length / 2);
    let mediana = lista.length % 2 === 0 ? (lista[mid - 1] + lista[mid]) / 2 : lista[mid];

    let frecuencia = {};
    let moda;
    let maxFrecuencia = 0;

    lista.forEach(function(num) {
        frecuencia[num] = (frecuencia[num] || 0) + 1;
        if (frecuencia[num] > maxFrecuencia) {
            moda = parseFloat(num);
            maxFrecuencia = frecuencia[num];
        }
    });

    return { mediana: mediana, moda: moda };
}

// Pruebas
let listaNumeros = [1, 2, 4, 6, 8, 2, 4, 6, 8, 10, 15];
let resultado = medianaModa(listaNumeros);
console.log("Mediana:", resultado.mediana);
console.log("Moda:", resultado.moda);
