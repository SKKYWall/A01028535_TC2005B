function mCD(a, b) {
    let t;
    while (b !== 0) {
        t = b;
        b = a % b;
        a = t;
    }
    return a;
}
//Pruebas
const resultado = mCD(100, 75);
console.log(resultado);
