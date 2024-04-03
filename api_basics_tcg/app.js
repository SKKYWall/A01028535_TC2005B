"use strict";

import express from 'express';

const app = express();

const port = 3000;

app.use(express.json());

let cartas = [];

app.get('/cartas', (req, res) => {
    if (cartas.length === 0) {
        return res.status(200).json({ mensaje: "No hay cartas almacenadas" });
    }
    res.status(200).json(cartas);
});

app.get('/cartas/:id_carta', (req, res) => {
    const carta = cartas.filter(card => card.id === parseInt(req.params.id_carta));

    if (carta.length === 0) {
        return res.status(404).json({ mensaje: 'Esta carta no existe' });
    }

    res.status(200).json(carta[0]);
});

app.post('/cartas', (req, res) => {
    console.log(cartas);
    const nuevasCartas = req.body;

    for (const nuevaCarta of nuevasCartas) {
        if (!('id' in nuevaCarta) || !('nombre' in nuevaCarta) || !('atributo' in nuevaCarta)) {
            return res.status(400).json({ mensaje: 'La carta debe tener los atributos: id, nombre y atributo' });
        }

        if (cartas.some(carta => carta.id === nuevaCarta.id)) {
            return res.status(400).json({ mensaje: 'Ya existe una carta con el mismo ID' });
        }

        cartas.push(nuevaCarta);
    }

    res.status(201).json({ mensaje: 'Cartas agregadas correctamente' });
});

app.delete('/cartas/:id_carta', (req, res) => {
    console.log("Eliminar Cartas");
    const idCarta = parseInt(req.params.id_carta);
    const index = cartas.findIndex(c => c.id === idCarta);

    if (index === -1) {
        return res.status(404).json({ mensaje: 'Carta no encontrada' });
    }

    cartas.splice(index, 1);
    res.status(200).json({ mensaje: 'Carta eliminada correctamente' });
});

app.put('/cartas/:id_carta', (req, res) => {
    console.log("Actualizar Cartas");
    const idCarta = parseInt(req.params.id_carta);
    const carta = cartas.find(c => c.id === idCarta);

    if (!carta) {
        return res.status(404).json({ mensaje: 'Carta no encontrada' });
    }

    const camposActualizar = req.body;
    for (const campo in camposActualizar) {
        if (camposActualizar.hasOwnProperty(campo)) {
            carta[campo] = camposActualizar[campo];
        }
    }

    res.status(200).json({ mensaje: 'Carta actualizada correctamente' });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
});
