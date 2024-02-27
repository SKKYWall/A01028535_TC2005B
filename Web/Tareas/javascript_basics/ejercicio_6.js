function hackerSpeak(t) {
  const equivalencias = {
    'a': '4',
    'e': '3',
    'i': '1',
    'o': '0',
    's': '5'
  };
  
  for (let letra in equivalencias) {
    t = t.replace(new RegExp(letra, 'g'), equivalencias[letra]);

  }
  
  //Información investigada
  //RegExp funciona para hacer coincidir un texto con un patrón
  //"(letra, 'g')" para que el programa no se detenga cuando encuentre la primera equivalencia.

  return t;
}

// Prueba
let original = 'Javascript es divertido';
let resultado = hackerSpeak(original);

console.log(resultado);  // Salida: 'J4v45cr1pt 35 d1v3rt1d0'
