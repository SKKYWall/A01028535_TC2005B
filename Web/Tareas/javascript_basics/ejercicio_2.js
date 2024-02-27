function bS(a) {
  let n = a.length;

  for (let i = 0; i < n - 1; ++i) {
    for (let j = i + 1; j < n; ++j) {
      if (a[i] > a[j]) {
        let t = a[i];
        a[i] = a[j];
        a[j] = t;
      }
    }
  }

  return a;
}

// Ejemplo de uso corregido
let a = [3, 4, 2, 5, 9, 1, 7];
let sA = bS(a);
console.log(sA);
