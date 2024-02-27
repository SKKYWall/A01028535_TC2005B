function factoriza(numero) {
  if (isNaN(numero) || numero <= 0) {
    return "Por favor, ingresa un número positivo válido.";
  }
  
  //Información Investigada
  //isNaN funciona para sabersi el valor is "Not-A-Number"

  let factores = [];
  for (let i = 1; i <= numero; i++) {
    if (numero % i === 0) {
      factores.push(i);
    }
  }

  return factores;
}

// Prueba
let resultado = factoriza(12);
console.log(resultado);
