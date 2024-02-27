function oAlfa(lista) {
    const lO = lista.slice().sort();
    return lO;
}

// Pruebas
const liOr = ["sandia", "manzana", "fresa", "naranja"];
const liOrd = oAlfa(liOr);

console.log("Lista original:", liOr);
console.log("Lista ordenada:", liOrd);
