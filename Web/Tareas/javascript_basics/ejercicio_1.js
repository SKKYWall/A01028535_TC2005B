function primeraLetraQueNoSeRepite(cadena) {
  for (let x = 0; x < cadena.length; x++) {
    let caracterActual = cadena.charAt(x);
    if (cadena.indexOf(caracterActual) === cadena.lastIndexOf(caracterActual)) {
      return caracterActual;
    }
  }
  return "";
}

const cadenaDePrueba = 'abacddbec';
console.log(`'${primeraLetraQueNoSeRepite(cadenaDePrueba)}'`);
