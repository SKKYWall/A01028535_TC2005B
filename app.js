"use strict";

import express from "express";
import mysql from "mysql2/promise";
import fs from "fs";

const app = express();
const port = 3002;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3002');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Since we are using the chart module installed from node js, we need to expose it so that the web page can use it.
app.use(express.static("./public"));

// This function will connect to the database and return the connection object.
async function connectToDB() {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "KAtia1407.",
    database: "Zambombazo",
  });
}

// This is the route that will be used to load the page. It will read the html file and send it to the client.
// The client will then load the page and make the requests to the server.
app.get('/', (request, response) => {
    fs.readFile('./public/html/inicio.html', 'utf8', (err, html) => {
        if (err) response.status(500).send('There was an error: ' + err);
        console.log('Loading page...');
        response.send(html);
    });
});


app.get('/index2.html', (request, response) => {
  fs.readFile('./public/html/index2.html', 'utf8', (err, html) => {
      if (err) response.status(500).send('There was an error: ' + err);
      console.log('Loading page...');
      response.send(html);
  });
});

app.get('/public/css/index2.css', (request, response) => {
  fs.readFile('./public/css/index2.css', 'utf8', (err, css) => {
    if (err) {
      response.status(500).send('There was an error: ' + err);
    } else {
      console.log('Loading CSS file...');
      response.setHeader('Content-Type', 'text/css');
      response.send(css);
    }
  });
});


app.get('/gdd.html', (request, response) => {
  fs.readFile('./public/html/gdd.html', 'utf8', (err, html) => {
      if (err) response.status(500).send('There was an error: ' + err);
      console.log('Loading page...');
      response.send(html);
  });
});

app.get('/public/css/gdd.css', (request, response) => {
  fs.readFile('./public/css/gdd.css', 'utf8', (err, css) => {
    if (err) {
      response.status(500).send('There was an error: ' + err);
    } else {
      console.log('Loading CSS file...');
      response.setHeader('Content-Type', 'text/css');
      response.send(css);
    }
  });
});

app.get('/inicio.html', (request, response) => {
  fs.readFile('./public/html/inicio.html', 'utf8', (err, html) => {
      if (err) response.status(500).send('There was an error: ' + err);
      console.log('Loading page...');
      response.send(html);
  });
});

app.get('/public/css/inicio.css', (request, response) => {
  fs.readFile('./public/css/inicio.css', 'utf8', (err, css) => {
    if (err) {
      response.status(500).send('There was an error: ' + err);
    } else {
      console.log('Loading CSS file...');
      response.setHeader('Content-Type', 'text/css');
      response.send(css);
    }
  });
});

app.get('/reglas.html', (request, response) => {
  fs.readFile('./public/html/reglas.html', 'utf8', (err, html) => {
      if (err) response.status(500).send('There was an error: ' + err);
      console.log('Loading page...');
      response.send(html);
  });
});

app.get('/public/css/reglas.css', (request, response) => {
  fs.readFile('./public/css/reglas.css', 'utf8', (err, css) => {
    if (err) {
      response.status(500).send('There was an error: ' + err);
    } else {
      console.log('Loading CSS file...');
      response.setHeader('Content-Type', 'text/css');
      response.send(css);
    }
  });
});










app.get("/api/cards", async (req, res) => {
  let connection = null;

  try {
    //guardar lo que regresa la funcion de conexion
    //await se pone en la funcion que tarda tiempo
    connection = await connectToDB();

    //metodo para mandar consultas
    //establecer results como el primero del arreglo porque no quiero la info irrelvante
    const [results, infoirrelvante] = await connection.execute(
      "SELECT * from Carta"
    );
    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No hay cartas en la base de datos." });
    }
    const objjson = { cartas: results };
    res.status(200).json(objjson);
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  } finally {
    //cuando sea truthy, sí se conectó
    if (connection) {
      connection.end();
    }
  }
});

//get 1 card
app.get("/api/cards/:id", async (req, res) => {
  let connection = null;

  try {
    //guardar lo que regresa la funcion de conexion
    //await se pone en la funcion que tarda tiempo
    connection = await connectToDB();

    //metodo para mandar consultas
    //establecer results como el primero del arreglo porque no quiero la info irrelvante
    const [results, infoirrelvante] = await connection.execute(
      "SELECT * from Carta WHERE id_carta =?",
      [req.params.id]
    );

    if (results.length === 0) {
      return res.status(404).json({ message: "No existe esa carta" });
    }
    const objjson = { cartas: results };
    res.status(200).json(objjson);
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  } finally {
    //cuando sea truthy, sí se conectó
    if (connection) {
      connection.end();
    }
  }
});
app.post("/api/cards", async (req, res) => {
  let connection = null;
  const body = req.body;
  console.log(body);
  try {
    connection = await connectToDB();

    const Attributes = [
      "Nombre",
      "Posicion",
      "Ataque",
      "Mediocampo",
      "Defensa",
      "Costo",
      "id_equipo",
    ];
    for (const attr of Attributes) {
      if (!body.hasOwnProperty(attr)) {
        return res
          .status(400)
          .json({ message: "Falta un atributo en la solicitud" });
      }
    }

    // Verificar si la carta ya existe en la base de datos
    const [cartaExistente] = await connection.execute(
      "SELECT * FROM Carta WHERE Nombre = ?",
      [body.Nombre]
    );

    if (cartaExistente.length > 0) {
      return res.status(409).json({ message: "La carta ya existe" });
    }

    // Insertar la nueva carta en la base de datos
    await connection.execute(
      "INSERT INTO Carta (Nombre, Posicion, Ataque, Mediocampo, Defensa, Costo, id_equipo) VALUES (?,?,?,?,?,?,?)",
      [
        body.Nombre,
        body.Posicion,
        body.Ataque,
        body.Mediocampo,
        body.Defensa,
        body.Costo,
        body.id_equipo,
      ]
    );

    return res.status(201).json({ message: "Carta agregada correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error interno del servidor" });
  } finally {
    if (connection) {
      connection.end();
    }
  }
});

app.put("/api/cards/:id", async (req, res) => {
  let connection = null;

  try {
    //guardar lo que regresa la funcion de conexion
    //await se pone en la funcion que tarda tiempo
    connection = await connectToDB();

    const [checkResults, checkFields] = await connection.execute(
      "SELECT * FROM Carta WHERE id_carta = ?",
      [req.params.id]
    );

    // Si no hay resultados, significa que la carta no existe
    if (checkResults.length === 0) {
      return res.status(404).json({ message: "Card not found" });
    }

    const dataToUpdate = req.body;

    let updateconsulta = "UPDATE Carta SET ";
    const updateValues = [];
    Object.keys(dataToUpdate).forEach((key, index) => {
      if (index > 0) {
        updateconsulta += ", ";
      }
      updateconsulta += `${key}=?`;
      updateValues.push(dataToUpdate[key]);
    });
    updateconsulta += " WHERE id_carta=?";
    updateValues.push(req.params.id);

    const [updateResults, updateFields] = await connection.execute(
      updateconsulta,
      updateValues
    );

    res.status(200).json({ message: "Card updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  } finally {
    //cuando sea truthy, sí se conectó
    if (connection) {
      connection.end();
    }
  }
});

//delete carta con base en su id
app.delete("/api/cards/:id", async (req, res) => {
  let connection = null;

  try {
    //guardar lo que regresa la funcion de conexion
    //await se pone en la funcion que tarda tiempo
    connection = await connectToDB();

    //para checar si ya existe

    const [usuarioexiste] = await connection.execute(
      "SELECT * from Carta WHERE id_carta =?",
      [req.params.id]
    );

    if (usuarioexiste.length === 0) {
      //return para evitar que lo demás se siga ejectutando
      return res.status(404).json({ message: "no existe esa carta" });
    }
    //metodo para mandar consultas
    //establecer results como el primero del arreglo porque no quiero la info irrelvante
    const [results, infoirrelvante] = await connection.execute(
      "delete from Carta WHERE id_carta =?",
      [req.params.id]
    );
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  } finally {
    //cuando sea truthy, sí se conectó
    if (connection) {
      connection.end();
    }
  }
});

//USUARIO

// get todos los usuarios
app.get("/api/usuarios", async (req, res) => {
  let connection = null;

  try {
    connection = await connectToDB();

    const [results] = await connection.execute("SELECT * FROM Usuario");

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found in the database." });
    }

    res.status(200).json({ usuarios: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (connection) {
      connection.end();
    }
  }
});

//post para ingresar un usuario nuevo
app.post("/api/usuario/logIn", async (req, res) => {
  let connection = null;
  const body = req.body;
  console.log(body);
  try {
    connection = await connectToDB();

    const Attributes = ["Usuario", "Contrasena"];
    for (const attr of Attributes) {
      if (!body.hasOwnProperty(attr)) {
        return res
          .status(400)
          .json({ message: "Falta un atributo en la solicitud" });
      }
    }

    // Verificar si la carta ya existe en la base de datos
    const [cartaExistente] = await connection.execute(
      "SELECT * FROM Usuario WHERE Usuario = ?",
      [body.Usuario]
    );

    if (cartaExistente.length === 0) {
      return res.status(409).json({ message: "El usuario no existe" });
    }
    console.log(cartaExistente[0]);
    console.log(cartaExistente[0].Contrasena);
    console.log(body.Contrasena);
    if (cartaExistente[0].Contrasena !== body.Contrasena) {
      return res.status(409).json({ message: "la contraseña no coincide" });
    }

    return res.status(201).json({
      usuario: {
        id: cartaExistente[0].id,
        usuario: cartaExistente[0].Usuario,
        monedas: cartaExistente[0].Monedas,
        victorias: cartaExistente[0].Victorias,
        derrotas: cartaExistente[0].Derrotas,
        empates: cartaExistente[0].Empates,
        progreso: cartaExistente[0].Progreso,
        esBot: cartaExistente[0].esBot,
        cantidadDineroPartida: cartaExistente[0].CantidadDineroPartida,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error interno del servidor" });
  } finally {
    if (connection) {
      connection.end();
    }
  }
});

app.post("/api/usuario2", async (req, res) => {
  let connection = null;
  const body = req.body;
  console.log(body);
  try {
    connection = await connectToDB();

    const Attributes = ["Usuario", "Contrasena"];
    for (const attr of Attributes) {
      if (!body.hasOwnProperty(attr)) {
        return res
          .status(400)
          .json({ message: "Falta un atributo en la solicitud" });
      }
    }

    // Verificar si la carta ya existe en la base de datos
    const [cartaExistente] = await connection.execute(
      "SELECT * FROM Usuario WHERE Usuario = ?",
      [body.Usuario]
    );

    if (cartaExistente.length > 0) {
      return res.status(409).json({ message: "El usuario ya existe" });
    }

    // Insertar la nueva carta en la base de datos
    await connection.execute(
      "insert into usuario(Usuario,Contrasena) values (?,?)",
      [body.Usuario.trim(), body.Contrasena.trim()]
    );
    const [userinfo] = await connection.execute(
      "SELECT id_usuario,Usuario,Monedas,Victorias,Derrotas,Empates,Progreso,esBot,CantidadDineroPartida FROM Usuario WHERE Usuario=?",
      [body.Usuario]
    );

    res
      .status(200)
      .json({ message: "usuario existoso", usuarioinfo: userinfo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error interno del servidor" });
  } finally {
    if (connection) {
      connection.end();
    }
  }
});

// actualizar usuario // put

app.put("/api/users2/:id", async (req, res) => {
  let connection = null;

  try {
    //guardar lo que regresa la funcion de conexion
    //await se pone en la funcion que tarda tiempo
    connection = await connectToDB();

    const [checkResults, checkFields] = await connection.execute(
      "SELECT * FROM Usuario WHERE id_usuario = ?",
      [req.params.id]
    );

    // Si no hay resultados, significa que la carta no existe
    if (checkResults.length === 0) {
      return res.status(404).json({ message: "usuario not found" });
    }

    const dataToUpdate = req.body;
    console.log(dataToUpdate);

    let updateconsulta = "UPDATE Usuario SET ";
    const updateValues = [];
    Object.keys(dataToUpdate).forEach((key, index) => {
      if (index > 0) {
        updateconsulta += ", ";
      }
      updateconsulta += `${key}=?`;
      updateValues.push(dataToUpdate[key]);
    });
    updateconsulta += " WHERE id_usuario=?";
    updateValues.push(req.params.id);

    const [updateResults, updateFields] = await connection.execute(
      updateconsulta,
      updateValues
    );

    res.status(200).json({ message: "user updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  } finally {
    //cuando sea truthy, sí se conectó
    if (connection) {
      connection.end();
    }
  }
});

// delete usuario nuevo

app.delete("/api/users/:id", async (req, res) => {
  let connection = null;

  try {
    //guardar lo que regresa la funcion de conexion
    //await se pone en la funcion que tarda tiempo
    connection = await connectToDB();

    //para checar si ya existe

    const [usuarioexiste] = await connection.execute(
      "SELECT * from Usuario WHERE id_usuario =?",
      [req.params.id]
    );

    if (usuarioexiste.length === 0) {
      //return para evitar que lo demás se siga ejectutando
      return res.status(500).json({ message: "no existe ese usuario" });
    }

    //metodo para mandar consultas
    //establecer results como el primero del arreglo porque no quiero la info irrelvante
    const [results, infoirrelvante] = await connection.execute(
      "delete from Usuario where id_usuario =?",
      [req.params.id]
    );
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  } finally {
    //cuando sea truthy, sí se conectó
    if (connection) {
      connection.end();
    }
  }
});

//delete carta con base en su id

//  ver estadisticas

app.get("/api/stats", async (req, res) => {
  let connection = null;
  try {
    //guardar lo que regresa la funcion de conexion
    //await se pone en la funcion que tarda tiempo
    connection = await connectToDB();
    //metodo para mandar consultas
    //establecer results como el primero del arreglo porque no quiero la info irrelvante
    const [results, infoirrelvante] = await connection.execute(
      "SELECT * from Estadistica"
    );
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  } finally {
    //cuando sea truthy, sí se conectó
    if (connection) {
      connection.end();
    }
  }
});

// subir stats
app.post("/api/stats", async (req, res) => {
  let connection = null;
  const body = req.body;
  console.log(body);
  try {
    connection = await connectToDB();

    await connection.execute(
      "insert into Estadistica (id_partido, id_carta, id_usuario, id_turno, Tiempo_partida, Numero_jugadas) values (?,?,?,?,?,?)",
      [
        body.id_partido,
        body.id_carta,
        body.id_usuario,
        body.id_turno,
        body.Tiempo_partida,
        body.Numero_jugadas,
      ]
    );
    return res.status(200).json({ message: "usuario creado exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.end();
    }
  }
});

//subir turno

// subir partido

//get partido
app.get("/api/game", async (req, res) => {
  let connection = null;
  try {
    //guardar lo que regresa la funcion de conexion
    //await se pone en la funcion que tarda tiempo
    connection = await connectToDB();
    //metodo para mandar consultas
    //establecer results como el primero del arreglo porque no quiero la info irrelvante
    const [results, infoirrelvante] = await connection.execute(
      "SELECT * from Partido"
    );
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  } finally {
    //cuando sea truthy, sí se conectó
    if (connection) {
      connection.end();
    }
  }
});

//get formacion
app.get("/api/formacion", async (req, res) => {
  let connection = null;
  try {
    //guardar lo que regresa la funcion de conexion
    //await se pone en la funcion que tarda tiempo
    connection = await connectToDB();
    //metodo para mandar consultas
    //establecer results como el primero del arreglo porque no quiero la info irrelvante
    const [results] = await connection.execute("SELECT * from Formacion");
    const objetoJSON = { formaciones: results };
    res.status(200).json(objetoJSON);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  } finally {
    //cuando sea truthy, sí se conectó
    if (connection) {
      connection.end();
    }
  }
});

//get equipo
app.get("/api/equipo", async (req, res) => {
  let connection = null;
  try {
    //guardar lo que regresa la funcion de conexion
    //await se pone en la funcion que tarda tiempo
    connection = await connectToDB();
    //metodo para mandar consultas
    //establecer results como el primero del arreglo porque no quiero la info irrelvante
    const [results, infoirrelvante] = await connection.execute(
      "SELECT * from Equipo"
    );
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  } finally {
    //cuando sea truthy, sí se conectó
    if (connection) {
      connection.end();
    }
  }
});

//Aquí comienzan las consultas para las estadísticas

app.post("/api/turn", async (req, res) => {
  let connection = null;
  const body = req.body;
  console.log(body);
  try {
    connection = await connectToDB();

    const [partidoexiste] = await connection.execute(
      "SELECT * FROM Partido WHERE id_partido = ?",
      [body.id_partido]
    );

    if (partidoexiste.length === 0) {
      return res.status(409).json({ message: "el partido no existe" });
    }

    await connection.execute(
      "insert into Turno (id_partido, id_carta, id_usuario, esGol, Tipo_stat, Valor_stat) values (?,?,?,?,?,?)",
      [
        body.id_partido,
        body.id_carta,
        body.id_usuario,
        body.esGol,
        body.Tipo_stat,
        body.Valor_stat,
      ]
    );
    return res.status(200).json({ message: "turno creado exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.end();
    }
  }
});

app.post("/api/game", async (req, res) => {
  let connection = null;
  const body = req.body;
  console.log(body);
  try {
    connection = await connectToDB();

    const [usuarioexiste] = await connection.execute(
      "SELECT * FROM Usuario WHERE id_usuario = ?",
      [body.id_jugador1]
    );

    if (usuarioexiste.length === 0) {
      return res.status(409).json({ message: "el jugador no existe" });
    }

    const [cpuexiste] = await connection.execute(
      "SELECT * FROM Usuario WHERE id_usuario = ?",
      [body.id_jugador2]
    );

    if (cpuexiste.length === 0) {
      return res.status(409).json({ message: "el jugador2 no existe" });
    }

    const [variable] = await connection.execute(
      "INSERT INTO Partido (id_jugador1, id_formacion_jugador1, id_jugador2, id_formacion_jugador2) values (?,?,?,?)",
      [
        body.id_jugador1,
        body.id_formacion_jugador1,
        body.id_jugador2,
        body.id_formacion_jugador2,
      ]
    );
    console.log(variable.insertId);

    return res
      .status(200)
      .json({
        message: "partida  creada exitosamente",
        id_partido: variable.insertId,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  } finally {
    if (connection) {
      connection.end();
    }
  }
});

app.put("/api/game/:id", async (req, res) => {
  let connection = null;

  try {
    //guardar lo que regresa la funcion de conexion
    //await se pone en la funcion que tarda tiempo
    connection = await connectToDB();

    const [partidoexiste] = await connection.execute(
      "SELECT * FROM Partido WHERE id_partido = ?",
      [req.params.id]
    );

    if (partidoexiste.length === 0) {
      return res.status(409).json({ message: "el partido no existe" });
    }

    const dataToUpdate = req.body;

    let updateconsulta = "UPDATE Partido SET ";
    const updateValues = [];
    Object.keys(dataToUpdate).forEach((key, index) => {
      if (dataToUpdate[key]) {
        updateconsulta += `${key}=?`;
        updateValues.push(dataToUpdate[key]);
        if (index !== Object.keys(dataToUpdate).length - 1) {
          updateconsulta += ", ";
        }
      }
    });
    updateconsulta += " WHERE id_partido=?";
    updateValues.push(req.params.id);

    const [updateResults, updateFields] = await connection.execute(
      updateconsulta,
      updateValues
    );

    res.status(200).json({ message: "game updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  } finally {
    //cuando sea truthy, sí se conectó
    if (connection) {
      connection.end();
    }
  }
});

app.get("/api/usuariosBot", async (req, res) => {
  let connection = null;

  try {
    connection = await connectToDB();

    const [results] = await connection.execute(
      "SELECT * FROM Usuario WHERE esBot=1"
    );

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found in the database." });
    }

    res.status(200).json({ usuarios: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    if (connection) {
      connection.end();
    }
  }
});

//post para partidas

app.get("/api/cartas-mas-utilizadas", async (request, response) => {
  let connection = null;

  try {
    connection = await connectToDB();

    //Aquí lo que hace es buscar dentro de la tabla de estadísticas y busca cuantas veces aparece el "id"
    const [results, fields] = await connection.query(`
            SELECT
                C.Nombre AS Carta,
                COUNT(E.id_turno) AS Veces_Utilizada
            FROM
                Estadistica E
            JOIN
                Carta C ON E.id_carta = C.id_carta
            GROUP BY
                C.Nombre
            ORDER BY
                Veces_Utilizada DESC
            LIMIT 5
        `);

    console.log("Enviando datos correctamente.");
    response.status(200).json(results);
  } catch (error) {
    response.status(500).json(error);
    console.log(error);
  } finally {
    if (connection !== null) {
      connection.end();
      console.log("¡Conexión cerrada exitosamente!");
    }
  }
});

app.get("/api/carta-con-mas-goles", async (request, response) => {
  let connection = null;

  try {
    connection = await connectToDB();

    const [results, fields] = await connection.query(`
            SELECT
                C.Nombre AS Nombre,
                SUM(T.esGol) AS Goles
            FROM Estadistica E
            JOIN Turno T ON E.id_turno = T.id_turno
            JOIN Carta C ON E.id_carta = C.id_carta
            GROUP BY C.Nombre
            ORDER BY Goles DESC
            LIMIT 5;
        `);

    console.log("Enviando datos correctamente.");
    response.status(200).json(results); // Devolver todos los resultados obtenidos
  } catch (error) {
    response.status(500).json(error);
    console.log(error);
  } finally {
    if (connection !== null) {
      connection.end();
      console.log("¡Conexión cerrada exitosamente!");
    }
  }
});

app.get("/api/cartas-con-mas-victorias", async (request, response) => {
  let connection = null;

  try {
    connection = await connectToDB();

    const [results, fields] = await connection.query(`
            SELECT
                C.id_carta,
                C.Nombre AS NombreCarta,
                COUNT(P.id_ganador) AS TotalVictorias
            FROM Carta C
            LEFT JOIN Partido P ON C.id_carta = P.id_ganador
            GROUP BY C.id_carta, C.Nombre
            ORDER BY TotalVictorias DESC
            LIMIT 5;
        `);

    console.log("Enviando datos correctamente.");
    response.status(200).json(results);
  } catch (error) {
    response.status(500).json(error);
    console.log(error);
  } finally {
    if (connection !== null) {
      connection.end();
      console.log("¡Conexión cerrada exitosamente!");
    }
  }
});

app.get("/api/cartas-menos-utilizadas", async (request, response) => {
  let connection = null;

  try {
    connection = await connectToDB();

    const [results, fields] = await connection.query(`
          SELECT
              C.Nombre AS Carta,
              COALESCE(COUNT(E.id_turno), 0) AS Veces_Utilizada
          FROM
              Carta C
          LEFT JOIN
              Estadistica E ON E.id_carta = C.id_carta
          GROUP BY
              C.Nombre
          ORDER BY
              Veces_Utilizada ASC
          LIMIT 5;

        `);

    console.log("Enviando datos correctamente.");
    response.status(200).json(results);
  } catch (error) {
    response.status(500).json(error);
    console.log(error);
  } finally {
    if (connection !== null) {
      connection.end();
      console.log("¡Conexión cerrada exitosamente!");
    }
  }
});

app.get("/api/cartas-con-menos-goles", async (request, response) => {
  let connection = null;

  try {
    connection = await connectToDB();

    const [results, fields] = await connection.query(`

            SELECT
                C.Nombre AS Nombre,
                SUM(T.esGol) AS Goles
            FROM 
                Estadistica E
            JOIN 
                Turno T ON E.id_turno = T.id_turno
            JOIN 
                Carta C ON E.id_carta = C.id_carta
            GROUP BY 
                C.Nombre
            ORDER BY 
                Goles ASC
            LIMIT 5;

        `);

    console.log("Enviando datos correctamente.");
    response.status(200).json(results);
  } catch (error) {
    response.status(500).json(error);
    console.log(error);
  } finally {
    if (connection !== null) {
      connection.end();
      console.log("¡Conexión cerrada exitosamente!");
    }
  }
});

app.get("/api/cartas-con-menos-victorias", async (request, response) => {
  let connection = null;

  try {
    connection = await connectToDB();

    const [results, fields] = await connection.query(`
            SELECT
                C.id_carta,
                C.Nombre AS NombreCarta,
                COUNT(P.id_ganador) AS TotalVictorias
            FROM 
                Carta C
            LEFT JOIN 
                Partido P ON C.id_carta = P.id_ganador
            GROUP BY 
                C.id_carta, C.Nombre
            ORDER BY 
                TotalVictorias ASC
            LIMIT 5;

        `);

    console.log("Enviando datos correctamente.");
    response.status(200).json(results);
  } catch (error) {
    response.status(500).json(error);
    console.log(error);
  } finally {
    if (connection !== null) {
      connection.end();
      console.log("¡Conexión cerrada exitosamente!");
    }
  }
});

app.get("/api/formaciones-mas-utilizadas", async (request, response) => {
  let connection = null;

  try {
    connection = await connectToDB();

    const [results, fields] = await connection.query(`
            SELECT TipoDeFormacion, COUNT(*) AS TotalUtilizado
            FROM Partido
            JOIN Formacion ON Partido.id_formacion_jugador1 = Formacion.id_formacion OR Partido.id_formacion_jugador2 = Formacion.id_formacion
            GROUP BY TipoDeFormacion
            ORDER BY TotalUtilizado DESC;
        `);

    console.log("Enviando datos correctamente.");
    response.status(200).json(results);
  } catch (error) {
    response.status(500).json(error);
    console.log(error);
  } finally {
    if (connection !== null) {
      connection.end();
      console.log("¡Conexión cerrada exitosamente!");
    }
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
