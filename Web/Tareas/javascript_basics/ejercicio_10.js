function palindromo(cadena) {
  // Se utiliza para quitar espacios y convertir a minúsculas
  const cadenaFormateada = cadena.toLowerCase().replace(/ /g, '');

  // Comparar cadenas
  if (cadenaFormateada === cadenaFormateada.split('').reverse().join('')) {
    return true;
  } else if (cadenaFormateada === 'javascript') {
    return false;
  } else {
    return false;
  }
}

// Pruebas
const textoPalindromo = "Anita lava la tina";
const textoNoPalindromo = "JavaScript";

if (palindromo(textoPalindromo)) {
  console.log(`${textoPalindromo} es un palíndromo.`);
} else {
  console.log(`${textoPalindromo} no es un palíndromo.`);
}

if (palindromo(textoNoPalindromo)) {
  console.log(`${textoNoPalindromo} es un palíndromo.`);
} else {
  console.log(`${textoNoPalindromo} no es un palíndromo.`);
}
