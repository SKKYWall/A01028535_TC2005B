function potencia(numero) {
    if (numero <= 0) {
        return false;
    }
    // Se utiliza un AND
    return (numero & (numero - 1)) === 0;
}

// Pruebas
var numero1 = 8;
var numero2 = 12;

console.log(numero1 + " es potencia de dos: " + potencia(numero1));
console.log(numero2 + " es potencia de dos: " + potencia(numero2));
