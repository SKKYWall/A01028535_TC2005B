// Definición de la función para generar un color aleatorio
function random_color(alpha) {
    return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${alpha})`;
}

// Fetching data for the first chart (cartas-mas-utilizadas)
try {
    const cartas_response = await fetch('http://localhost:3002/api/cartas-mas-utilizadas', { method: 'GET' });

    if (cartas_response.ok) {
        const cartas_results = await cartas_response.json();
        const carta_mas_utilizada = cartas_results[0];

        // Plotting chart for cartas-mas-utilizadas
        const ctx_carta_mas_utilizada = document.getElementById('apiChart1').getContext('2d');
        const cartaMasUtilizadaChart = new Chart(ctx_carta_mas_utilizada, {
            type: 'bar',
            data: {
                labels: cartas_results.map(carta => carta.Carta),
                datasets: [{
                    label: 'Veces Utilizada',
                    data: cartas_results.map(carta => carta.Veces_Utilizada),
                    backgroundColor: cartas_results.map(() => random_color(0.2)),
                    borderColor: cartas_results.map(() => random_color(1)),
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
} catch (error) {
    console.log(error);
}

try {
    const cartaConMasGoles_response = await fetch('http://localhost:3002/api/carta-con-mas-goles', { method: 'GET' });

    if (cartaConMasGoles_response.ok) {
        const cartaConMasGoles_result = await cartaConMasGoles_response.json(); 

        const nombresCartas = cartaConMasGoles_result.map(carta => carta.Nombre); // Usar Nombre en lugar de NombreCarta
        const golesCartas = cartaConMasGoles_result.map(carta => carta.Goles); // Usar Goles en lugar de GolesCarta

        const ctx_carta_con_mas_goles = document.getElementById('apiChart2').getContext('2d');
        const cartaConMasGolesChart = new Chart(ctx_carta_con_mas_goles, {
            type: 'bar',
            data: {
                labels: nombresCartas,
                datasets: [{
                    label: 'Goles',
                    data: golesCartas,
                    backgroundColor: random_color(0.2),
                    borderColor: random_color(1),
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else {
        console.error('La solicitud no fue exitosa:', cartaConMasGoles_response.status);
    }
} catch (error) {
    console.error('Ocurrió un error al procesar la solicitud:', error);
}



// Fetching data for the cards with the most victories
try {
    const cartasConMasVictorias_response = await fetch('http://localhost:3002/api/cartas-con-mas-victorias', { method: 'GET' });

    if (cartasConMasVictorias_response.ok) {
        const cartasConMasVictorias_result = await cartasConMasVictorias_response.json(); // Cambiar a cartasConMasVictorias_result para reflejar que es un array

        // Obtener nombres y victorias de todas las cartas
        const nombresCartas = cartasConMasVictorias_result.map(carta => carta.NombreCarta); // Cambiar a NombreCarta
        const victoriasCartas = cartasConMasVictorias_result.map(carta => carta.TotalVictorias); // Cambiar a TotalVictorias

        // Plotting chart for cartas-con-mas-victorias
        const ctx_cartas_con_mas_victorias = document.getElementById('apiChart3').getContext('2d');
        const cartasConMasVictoriasChart = new Chart(ctx_cartas_con_mas_victorias, {
            type: 'bar',
            data: {
                labels: nombresCartas, // Usar el array de nombres
                datasets: [{
                    label: 'Victorias',
                    data: victoriasCartas, // Usar el array de victorias
                    backgroundColor: random_color(0.2),
                    borderColor: random_color(1),
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
} catch (error) {
    console.log(error);
}

// Fetching data for the least used cards
try {
    const cartasMenosUtilizadas_response = await fetch('http://localhost:3002/api/cartas-menos-utilizadas', { method: 'GET' });

    if (cartasMenosUtilizadas_response.ok) {
        const cartasMenosUtilizadas_result = await cartasMenosUtilizadas_response.json(); 

        // Plotting chart for cartas-menos-utilizadas
        const ctx_cartas_menos_utilizadas = document.getElementById('apiChart4').getContext('2d');
        const cartasMenosUtilizadasChart = new Chart(ctx_cartas_menos_utilizadas, {
            type: 'bar',
            data: {
                labels: cartasMenosUtilizadas_result.map(carta => carta.Carta), // Cambiado de NombreCarta a Carta
                datasets: [{
                    label: 'Veces Utilizada',
                    data: cartasMenosUtilizadas_result.map(carta => carta.Veces_Utilizada), // Cambiado de TotalVictorias a Veces_Utilizada
                    backgroundColor: cartasMenosUtilizadas_result.map(() => random_color(0.2)),
                    borderColor: cartasMenosUtilizadas_result.map(() => random_color(1)),
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else {
        throw new Error('La respuesta no fue exitosa');
    }
} catch (error) {
    console.error('Error en la solicitud de datos de cartas menos utilizadas:', error);
}




// Fetching data for the cards with the least goals
try {
    const cartaConMenosGoles_response = await fetch('http://localhost:3002/api/cartas-con-menos-goles', { method: 'GET' });

    if (cartaConMenosGoles_response.ok) {
        const cartaConMenosGoles_result = await cartaConMenosGoles_response.json();

        // Plotting chart for carta-con-menos-goles
        const ctx_carta_con_menos_goles = document.getElementById('apiChart5').getContext('2d');
        const cartaConMenosGolesChart = new Chart(ctx_carta_con_menos_goles, {
            type: 'bar',
            data: {
                labels: cartaConMenosGoles_result.map(carta => carta.Nombre), // Cambiado de 'Carta' a 'Nombre'
                datasets: [{
                    label: 'Goles',
                    data: cartaConMenosGoles_result.map(carta => carta.Goles), // Cambiado de 'TotalGoles' a 'Goles'
                    backgroundColor: cartaConMenosGoles_result.map(() => random_color(0.2)),
                    borderColor: cartaConMenosGoles_result.map(() => random_color(1)),
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else {
        throw new Error('La respuesta no fue exitosa');
    }
} catch (error) {
    console.error('Error en la solicitud de datos de cartas con menos goles:', error);
}


// Fetching data for the cards with the least victories
try {
    const cartasConMenosVictorias_response = await fetch('http://localhost:3002/api/cartas-con-menos-victorias', { method: 'GET' });

    if (cartasConMenosVictorias_response.ok) {
        const cartasConMenosVictorias_result = await cartasConMenosVictorias_response.json();

        // Plotting chart for cartas-con-menos-victorias
        const ctx_cartas_con_menos_victorias = document.getElementById('apiChart6').getContext('2d');
        const cartasConMenosVictoriasChart = new Chart(ctx_cartas_con_menos_victorias, {
            type: 'bar',
            data: {
                labels: cartasConMenosVictorias_result.map(carta => carta.NombreCarta),
                datasets: [{
                    label: 'Victorias',
                    data: cartasConMenosVictorias_result.map(carta => carta.TotalVictorias), // Se cambió de 'Victorias' a 'TotalVictorias'
                    backgroundColor: cartasConMenosVictorias_result.map(() => random_color(0.2)),
                    borderColor: cartasConMenosVictorias_result.map(() => random_color(1)),
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else {
        throw new Error('La respuesta no fue exitosa');
    }
} catch (error) {
    console.error('Error en la solicitud de datos de cartas con menos victorias:', error);
}


try {
    const formacionesMasUtilizadas_response = await fetch('http://localhost:3002/api/formaciones-mas-utilizadas', { method: 'GET' });

    if (formacionesMasUtilizadas_response.ok) {
        const formacionesMasUtilizadas_result = await formacionesMasUtilizadas_response.json();

        // Hacer algo con los datos recibidos, como representarlos en un gráfico
        const ctx_formaciones_mas_utilizadas = document.getElementById('apiChart7').getContext('2d');
        const formacionesMasUtilizadasChart = new Chart(ctx_formaciones_mas_utilizadas, {
            type: 'bar',
            data: {
                labels: formacionesMasUtilizadas_result.map(formacion => formacion.TipoDeFormacion),
                datasets: [{
                    label: 'Total Utilizado',
                    data: formacionesMasUtilizadas_result.map(formacion => formacion.TotalUtilizado),
                    backgroundColor: random_color(0.2),
                    borderColor: random_color(1),
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else {
        throw new Error('La respuesta no fue exitosa');
    }
} catch (error) {
    console.log(error);
}
