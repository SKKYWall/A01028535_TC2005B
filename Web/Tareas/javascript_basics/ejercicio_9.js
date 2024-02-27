function cadenaCorta(listaCadenas) {
  let longitudMinima = listaCadenas[0].length;

  for (let i = 1; i < listaCadenas.length; i++) {
    const longitudActual = listaCadenas[i].length;
    if (longitudActual < longitudMinima) {
      longitudMinima = longitudActual;
    }
  }

  return longitudMinima;
}

// Pruebas
const listaDeCadenas = ["Hola", "Mundo", "JavaScript", "Función"];
const resultado = cadenaCorta(listaDeCadenas);
console.log("Longitud de la cadena más corta:", resultado);
