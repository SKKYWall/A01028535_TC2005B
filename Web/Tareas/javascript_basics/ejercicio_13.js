function mFrecuente(listaCadenas) {
    let f = {};
    
    listaCadenas.forEach(function(cadena) {
        f[cadena] = (f[cadena] || 0) + 1;
    });

    let mFrecuente = '';
    let maxF = 0;

    for (let cadena in f) {
        if (f[cadena] > maxF) {
            maxF = f[cadena];
            mFrecuente = cadena;
        }
    }

    return mFrecuente;
}

// Ejemplo de uso:
let lista = ['hola', 'hola', 'adios', 'hola', 'cómo', 'estás', 'hola'];
console.log(mFrecuente(lista));
