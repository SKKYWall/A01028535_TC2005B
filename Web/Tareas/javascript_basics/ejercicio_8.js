function qDuplicados(arreglo) {
    const conjuntoU = new Set(arreglo);
    
    const arregloSD = Array.from(conjuntoU);
    
    return arregloSD;
}

// Pruebas :)
const arregloO = [1, 0, 1, 1, 0, 0];
const resultado = qDuplicados(arregloO);

console.log(resultado);
