-- Crear Base de Datos
CREATE DATABASE Zambombazo;

-- Seleccionar la Base de Datos
USE Zambombazo;

-- Crear Tablas
CREATE TABLE Equipo (
	id_equipo INT UNSIGNED NOT NULL AUTO_INCREMENT,
    Nombre VARCHAR(25) NOT NULL,
    Descripcion VARCHAR(255),
    Cantidad_Defensas TINYINT UNSIGNED NOT NULL CHECK(Cantidad_Defensas >= 0),
    Cantidad_Medios TINYINT UNSIGNED NOT NULL CHECK(Cantidad_Medios >= 0),
    Cantidad_Delanteros TINYINT UNSIGNED NOT NULL CHECK(Cantidad_Delanteros >= 0),
    Fecha_Creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Fecha_Ultima_Modificacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id_equipo)
);

CREATE TABLE Carta (
	id_carta INT UNSIGNED NOT NULL AUTO_INCREMENT,
    id_equipo INT UNSIGNED,
    Nombre VARCHAR(25) UNIQUE NOT NULL,
    Posicion VARCHAR(25) NOT NULL,
    Ataque TINYINT UNSIGNED NOT NULL CHECK(Ataque > 0),
    Mediocampo TINYINT UNSIGNED NOT NULL CHECK(Mediocampo > 0),
    Defensa TINYINT UNSIGNED NOT NULL CHECK(Defensa > 0),
    Energia TINYINT UNSIGNED NOT NULL CHECK(Energia > 0),
    Fecha_Creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Fecha_Ultima_Modificacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id_carta),
    CONSTRAINT fk_carta_equipo FOREIGN KEY (id_equipo) REFERENCES Equipo(id_equipo) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE Formacion (
	id_formacion INT UNSIGNED NOT NULL AUTO_INCREMENT,
    TipoDeFormacion VARCHAR(25) NOT NULL,
    Descripcion VARCHAR(255),
    PRIMARY KEY (id_formacion)
);

CREATE TABLE TacticaJuego (
	id_tactica_juego INT UNSIGNED NOT NULL AUTO_INCREMENT,
    id_usuario INT UNSIGNED,
    id_formacion INT UNSIGNED,
    PRIMARY KEY (id_tactica_juego),
    CONSTRAINT fk_tacticaJuego_formacion FOREIGN KEY (id_formacion) REFERENCES Formacion(id_formacion) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE Usuario (
	id_usuario INT UNSIGNED NOT NULL AUTO_INCREMENT,
    id_inventario INT UNSIGNED,
    Nombre VARCHAR(25) UNIQUE NOT NULL,
    Contrasena varchar(255),
    Monedas INT UNSIGNED NOT NULL,
    Victorias INT UNSIGNED NOT NULL,
    Derrotas INT UNSIGNED NOT NULL,
    Empates INT UNSIGNED NOT NULL,
    esBot BOOLEAN NOT NULL,
    Fecha_Creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Fecha_Ultima_Modificacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id_usuario)
);

ALTER TABLE TacticaJuego ADD CONSTRAINT fk_tacticaJuego_usuario FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE RESTRICT ON UPDATE CASCADE;

-- CREATE TABLE Inventario (
-- id_inventario INT UNSIGNED NOT NULL AUTO_INCREMENT,
-- id_usuario INT UNSIGNED,
-- id_carta INT UNSIGNED,
-- PRIMARY KEY (id_inventario)
-- );

CREATE TABLE Inventario (
  id_inventario INT UNSIGNED NOT NULL AUTO_INCREMENT,
  id_usuario INT UNSIGNED UNIQUE NOT NULL,
  PRIMARY KEY (id_inventario)
);

CREATE TABLE InventarioCarta (
  id_inventario INT UNSIGNED NOT NULL,
  id_carta INT UNSIGNED NOT NULL,
  cantidad INT UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (id_inventario, id_carta)
);

-- Agregar los Foreign Keys, después de crear ambas tablas
ALTER TABLE Usuario ADD CONSTRAINT fk_usuario_inventario FOREIGN KEY (id_inventario) REFERENCES Inventario(id_inventario) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE Inventario ADD CONSTRAINT fk_inventario_usuario FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE InventarioCarta ADD CONSTRAINT fk_inventarioCarta_inventario FOREIGN KEY (id_inventario) REFERENCES Inventario(id_inventario) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE InventarioCarta ADD CONSTRAINT fk_inventarioCarta_carta FOREIGN KEY (id_carta) REFERENCES Carta(id_carta) ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE Partido (
	id_partido INT UNSIGNED NOT NULL AUTO_INCREMENT,
    id_jugador1 INT UNSIGNED,
    id_jugador2 INT UNSIGNED,
    id_ganador INT UNSIGNED,
    Resultado VARCHAR(5) NOT NULL,
    PRIMARY KEY (id_partido),
    CONSTRAINT fk_jugador1 FOREIGN KEY (id_jugador1) REFERENCES Usuario(id_usuario) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_jugador2 FOREIGN KEY (id_jugador2) REFERENCES Usuario(id_usuario) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_ganador FOREIGN KEY (id_ganador) REFERENCES Usuario(id_usuario) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE Turno (
	id_turno INT UNSIGNED NOT NULL AUTO_INCREMENT,
    id_partido INT UNSIGNED,
    id_carta INT UNSIGNED,
    id_usuario INT UNSIGNED,
    esGol BOOLEAN NOT NULL,
    Tipo_stat VARCHAR(25) NOT NULL,
    Valor_stat TINYINT UNSIGNED NOT NULL,
    PRIMARY KEY (id_turno),
    CONSTRAINT fk_turno_partido FOREIGN KEY (id_partido) REFERENCES Partido(id_partido) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_turno_carta FOREIGN KEY (id_carta) REFERENCES Carta(id_carta) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_turno_usuario FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE Estadistica (
	id_estadistica INT UNSIGNED NOT NULL AUTO_INCREMENT,
    id_partido INT UNSIGNED,
    id_carta INT UNSIGNED,
    id_usuario INT UNSIGNED,
    id_turno INT UNSIGNED,
	Tiempo_partida INT UNSIGNED NOT NULL,
    Numero_jugadas TINYINT UNSIGNED NOT NULL,
    PRIMARY KEY (id_estadistica),
    CONSTRAINT fk_estadistica_partido FOREIGN KEY (id_partido) REFERENCES Partido(id_partido) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_estadistica_carta FOREIGN KEY (id_carta) REFERENCES Carta(id_carta) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_estadistica_usuario FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_estadistica_turno FOREIGN KEY (id_turno) REFERENCES Turno(id_turno) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Insertar Datos Tabla Equipo
-- Solo 4 filas dummy, ya que el juego solo contiene 4 equipos
INSERT INTO Equipo (Nombre, Descripcion, Cantidad_Defensas, Cantidad_Medios, Cantidad_Delanteros) 
VALUES 
('Real Madrid', 'Equipo de la capital española con 10 defensas, 8 mediocampos y 4 delanteros.', 10, 8, 4),
('Barcelona', 'Equipo de Barcelona con 10 defensas, 6 mediocampos y 5 delanteros', 10, 6, 5),
('Atlético Madrid', 'Otro equipo de la capital española con 10 defensas, 7 mediocampos y 5 delanteros', 10, 7, 5),
('Sevilla', 'Equipo con sede en Sevilla que tiene 11 defensas, 7 mediocampos y 4 delanteros', 11, 7, 4);
-- Consulta Tabla Equipo
SELECT * FROM Equipo;

-- Insertar Datos Tabla Carta
INSERT INTO Carta (Nombre, Posicion, Ataque, Mediocampo, Defensa, Energia, id_equipo) 
VALUES 
('Thibaut Courtois', 'PO', 32, 40, 86, 6, 1),
('Andriv Lunin', 'PO', 30, 37, 82, 3, 1),
('Kepa Arrizabalaga', 'PO', 31, 38, 80, 2, 1),
('Dani Carvajal', 'LD', 77, 80, 84, 4, 1),
('Lucas Vázquez', 'LD', 74, 78, 81, 2, 1),
('Eder Militao', 'DFC', 69, 72, 87, 6, 1),
('Antonio Rudiger', 'DFC', 66, 69, 86, 5, 1),
('David Alaba', 'DFC', 72, 80, 84, 4, 1),
('Nacho Fernández', 'DFC', 62, 69, 82, 2, 1),
('Ferland Mendy', 'LI', 70, 76, 84, 3, 1),
('Fran García', 'LI', 70, 74, 81, 2, 1),
('Aurelian Tchouaméni', 'MC', 76, 82, 84, 4, 1),
('Eduardo Camaving', 'MC', 81, 84, 82, 3, 1),
('Toni Kroos', 'MC', 83, 86, 80, 5, 1),
('Federico Valverde', 'MC', 84, 86, 85, 5, 1),
('Luka Modric', 'MC', 84, 86, 84, 5, 1),
('Dani Ceballos', 'MC', 79, 80, 73, 1, 1),
('Arda Guller', 'MC', 80, 80, 74, 1, 1),
('Jude Bellingham', 'MC', 85, 88, 82, 7, 1),
('Vinicius Jr', 'EI', 89, 82, 51, 8, 1),
('Rodrygo Goes', 'ED', 85, 81, 57, 5, 1),
('Brahim Díaz', 'ED', 84, 80, 56, 3, 1),
('Joselu Mato', 'DC', 82, 76, 54, 2, 1),
('Ter Stegen', 'PO', 34, 40, 85, 5, 2),
('Iñaki Peña', 'PO', 22, 34, 77, 1, 2),
('João Cancelo', 'LD', 79, 81, 82, 2, 2),
('Sergi Roberto', 'LD', 64, 71, 79, 1, 2),
('Ronald Araújo', 'DFC', 66, 70, 86, 6, 2),
('Jules Koundé', 'DFC', 67, 71, 84, 4, 2),
('Iñigo Martínez', 'DFC', 60, 67, 82, 2, 2);
-- Consulta Tabla Carta
SELECT * FROM Carta;

-- Consulta para ver a qué equipo pertenece cada jugador
SELECT Equipo.Nombre AS Equipo, Carta.Nombre AS Carta
FROM Carta
JOIN Equipo ON Carta.id_equipo = Equipo.id_equipo;

-- Insertar Datos Tabla Usuario
INSERT INTO Usuario (Nombre, Contrasena, Monedas, Victorias, Derrotas, Empates, esBot)
VALUES
('Paul', 'pass1', 1003, 23, 4, 1, FALSE),
('Diego', 'pass2', 243, 12, 14, 2, FALSE),
('Beto', 'pass3', 100, 3, 12, 0, FALSE),
('CPU1', 'pass4', 0, 2, 1, 0, TRUE),
('Paolo', 'pass5', 200, 5, 2, 0, FALSE),
('CPU2', 'pass6', 0, 1, 4, 0, TRUE),
('CPU3', 'pass7', 0, 10, 2, 0, TRUE),
('CPU4', 'pass8', 0, 17, 1, 0, TRUE),
('CPU5', 'pass9', 0, 15, 1, 0, TRUE),
('CPU6', 'pass10', 0, 14, 1, 0, TRUE),
('CPU7', 'pass11', 0, 1, 1, 0, TRUE),
('Pablo', 'pass12', 406, 768, 349, 0, FALSE),
('Vale', 'pass13', 201, 10, 35, 0, FALSE),
('Luis', 'pass14', 643, 43, 44, 1, FALSE),
('Francisco', 'pass15', 765, 123, 31, 3, FALSE),
('Gabriel', 'pass16', 2345, 101, 46, 2, FALSE),
('Lucas', 'pass17', 432, 234, 123, 4, FALSE),
('CPU8', 'pass18', 0, 13, 12, 0, TRUE),
('Joseph', 'pass19', 107, 1, 2, 0, FALSE),
('CPU9', 'pass20', 0, 1, 4, 0, TRUE),
('CPU10', 'pass21', 0, 15, 2, 0, TRUE),
('CPU11', 'pass22', 0, 1, 1, 0, TRUE),
('CPU12', 'pass23', 0, 0, 0, 0, TRUE),
('CPU13', 'pass24', 0, 8, 5, 0, TRUE),
('CPU14', 'pass25', 0, 7, 19, 1, TRUE),
('Isaac', 'pass26', 89, 5, 7, 1, FALSE),
('Ricardo', 'pass27', 222, 2, 2, 2, FALSE),
('Mateo', 'pass28', 9872, 589, 321, 0, FALSE),
('Maria', 'pass29', 407, 10, 3, 0, FALSE),
('Daniela', 'pass30', 543, 56, 39, 2, FALSE);
-- Consulta Tabla Usuario
SELECT * FROM Usuario;

-- Insertar Datos en Inventario
INSERT INTO Inventario (id_usuario)
VALUES
(1),
(2),
(3),
(4),
(5),
(6),
(7),
(8),
(9),
(10),
(11),
(12),
(13),
(14),
(15),
(16),
(17),
(18),
(19),
(20),
(21),
(22),
(23),
(24),
(25),
(26),
(27),
(28),
(29),
(30);
-- Consultar Tabla Inventario
SELECT * FROM Inventario;

-- Insertar Datos InventarioCarta
INSERT INTO InventarioCarta (id_inventario, id_carta, cantidad)
VALUES 
(1, 1, 3),
(1, 2, 2),
(1, 3, 1),
(1, 4, 2),
(1, 5, 2),
(1, 11, 2),
(1, 12, 3),
(1, 13, 1),
(1, 14, 4),
(1, 15, 1),
(1, 21, 2),
(1, 22, 1),
(1, 23, 1),
(1, 24, 1),
(1, 25, 1),
(2, 6, 3),
(2, 7, 2),
(2, 8, 1),
(2, 9, 2),
(2, 10, 2),
(2, 16, 2),
(2, 17, 3),
(2, 18, 1),
(2, 19, 4),
(2, 20, 1),
(2, 26, 2),
(2, 27, 1),
(2, 28, 1),
(2, 29, 1),
(2, 30, 1);
-- Consultar Tabla InventarioCarta
SELECT * FROM InventarioCarta;

-- Consulta combinando varios datos
SELECT
  U.id_usuario,
  U.Nombre AS NombreUsuario,
  I.id_inventario,
  C.id_carta,
  C.Nombre AS NombreCarta,
  IC.cantidad
FROM Usuario U
JOIN Inventario I ON U.id_usuario = I.id_usuario
JOIN InventarioCarta IC ON I.id_inventario = IC.id_inventario
JOIN Carta C ON IC.id_carta = C.id_carta;

-- Insertar Datos Tabla Formacion
-- Solo van a existir 5 formaciones dentro del juego
INSERT INTO Formacion (TipoDeFormacion, Descripcion)
VALUES
('3-2-1', '1 portero, 3 defensas, 2 medioscampos y 1 delantero'),
('3-1-2', '1 portero, 3 defensas, 1 mediocampo y 2 delanteros'),
('2-3-1', '1 portero, 2 defensas, 3 mediocampos y 1 delantero'),
('2-2-2', '1 portero, 2 defensas, 2 mediocampos y 2 delanteros'),
('2-1-3', '1 portero, 2 defensas, 1 mediocampo y 3 delanteros');
-- Consulta Tabla Formación
SELECT * FROM Formacion;

-- Insertar Datos TacticaJuego
INSERT INTO TacticaJuego (id_formacion, id_usuario)
VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4), 
(1, 5),
(2, 6),
(2, 7),
(2, 8),
(2, 9),
(2, 10),
(3, 11),
(3, 12),
(3, 13),
(3, 14),
(3, 15),
(4, 16),
(4, 17),
(4, 18),
(4, 19),
(4, 20),
(5, 21),
(5, 22),
(5, 23),
(5, 24),
(5, 25),
(1, 26),
(2, 27),
(3, 28),
(4, 29),
(5, 30);
-- Consultar Tabla TacticaJuego
SELECT * FROM TacticaJuego;

-- Consulta de formaciones juntando tablas
SELECT
  U.Nombre AS NombreUsuario,
  F.TipoDeFormacion,
  F.Descripcion AS DescripcionFormacion,
  TJ.id_tactica_juego
FROM Usuario U
JOIN TacticaJuego TJ ON U.id_usuario = TJ.id_usuario
JOIN Formacion F ON TJ.id_formacion = F.id_formacion;

-- Insertar Datos Tabla Turno
INSERT INTO Partido (id_jugador1, id_jugador2, id_ganador, resultado)
VALUES
(1, 2, 1, '4-3'),
(1, 3, 1, '4-2'),
(1, 23, 1, '4-3'),
(2, 12, 2, '4-3'),
(2, 30, 30, '4-3'),
(2, 13, 2, '4-2'),
(2, 10, 10, '4-1'),
(3, 28, 3, '4-0'),
(3, 27, 3, '4-0'),
(3, 11, 11, '4-1'),
(4, 29, 29, '4-3'),
(4, 22, 22, '4-2'),
(5, 13, 5, '4-3'),
(5, 27, 27, '4-3'),
(5, 30, 5, '4-3'),
(6, 1, 6, '4-2'),
(7, 23, 23, '4-1'),
(7, 24, 24, '4-0'),
(7, 26, 26, '4-0'),
(7, 3, 7, '4-1'),
(8, 14, 8, '4-3'),
(8, 15, 15, '4-2'),
(9, 16, 16, '4-3'),
(9, 19, 9, '4-3'),
(9, 20, 9, '4-3'),
(10, 1, 10, '4-2'),
(10, 4, 10, '4-1'),
(10, 6, 6, '4-0'),
(11, 5, 11, '4-0'),
(11, 7, 7, '4-1');
-- Consulta Tabla Partido
SELECT * FROM Partido;

-- Insertar Datos Turno
INSERT INTO Turno (id_partido, id_carta, id_usuario, esGol, Tipo_stat, Valor_stat)
VALUES
(1, 23, 1, FALSE, 'Ataque', 81),
(1, 29, 2, TRUE, 'Defensa', 84),
(1, 12, 2, FALSE, 'Mediocampo', 82),
(1, 13, 1, TRUE, 'Mediocampo', 84),
(1, 2, 1, FALSE, 'Defensa', 82),
(1, 20, 2, TRUE, 'Ataque', 89),
(1, 16, 2, FALSE, 'Mediocampo', 86),
(1, 19, 1, TRUE, 'Mediocampo', 88),
(1, 25, 1, FALSE, 'Defensa', 77),
(1, 22, 2, TRUE, 'Ataque', 84),
(1, 21, 1, FALSE, 'Ataque', 85),
(1, 1, 2, TRUE, 'Defensa', 86),
(1, 27, 2, FALSE, 'Defensa', 79),
(1, 15, 1, TRUE, 'Ataque', 84),
(2, 17, 1, FALSE, 'Mediocampo', 80),
(2, 26, 2, TRUE, 'Mediocampo', 81),
(2, 30, 2, FALSE, 'Defensa', 82),
(2, 14, 1, TRUE, 'Ataque', 83),
(2, 7, 1, FALSE, 'Defensa', 86),
(2, 20, 2, TRUE, 'Ataque', 89),
(3, 23, 1, FALSE, 'Ataque', 82),
(3, 29, 2, TRUE, 'Defensa', 84),
(3, 21, 2, FALSE, 'Ataque', 85),
(3, 6, 1, TRUE, 'Defensa', 87),
(4, 16, 1, FALSE, 'Mediocampo', 86),
(5, 19, 2, TRUE, 'Mediocampo', 88),
(6, 13, 2, FALSE, 'Mediocampo', 84),
(6, 15, 1, TRUE, 'Mediocampo', 86),
(6, 1, 1, FALSE, 'Defensa', 86),
(6, 20, 2, TRUE, 'Ataque', 89);
-- Consulta Tabla Turno
SELECT * FROM Turno;

-- Insertar Datos Tabla Estadistica
INSERT INTO Estadistica (id_partido, id_carta, id_usuario, id_turno, Tiempo_partida, Numero_jugadas)
VALUES
(1, 23, 1, 1, 90, 10),
(1, 26, 2, 2, 103, 16),
(1, 28, 3, 3, 143, 18),
(1, 29, 4, 4, 87, 17),
(1, 25, 5, 5, 86, 18),
(1, 21, 6, 6, 99, 19),
(1, 22, 7, 7, 93, 19),
(1, 27, 8, 8, 91, 12),
(1, 20, 9, 9, 135, 11),
(1, 24, 10, 10, 76, 11),
(1, 30, 11, 11, 79, 13),
(1, 12, 12, 12, 78, 10),
(1, 11, 13, 13, 95, 16),
(1, 17, 14, 14, 82, 15),
(2, 19, 15, 15, 83, 14),
(2, 15, 16, 16, 86, 12),
(2, 14, 17, 17, 87, 18),
(2, 16, 18, 18, 88, 16),
(2, 15, 19, 19, 200, 10),
(2, 18, 20, 20, 123, 10),
(3, 1, 21, 21, 154, 11),
(3, 2, 22, 22, 176, 11),
(3, 3, 23, 23, 156, 19),
(3, 6, 24, 24, 198, 18),
(4, 5, 25, 25, 62, 18),
(5, 4, 26, 26, 67, 13),
(6, 9, 27, 27, 142, 14),
(6, 7, 28, 28, 102, 16),
(6, 8, 29, 29, 137, 15),
(6, 10, 30, 30, 132, 15);
-- Consulta Tabla Estadistica
SELECT * FROM Estadistica;

-- Consulta Datos combinados
SELECT
    E.id_estadistica AS EstadisticaID,
    P.id_partido AS PartidoID,
    U.Nombre AS Usuario,
    C.Nombre AS Carta,
    T.esGol AS Gol,
    T.Tipo_stat AS TipoEstadistica,
    T.Valor_stat AS ValorEstadistica,
    E.Tiempo_partida AS TiempoPartida,
    E.Numero_jugadas AS NumeroJugadas
FROM Estadistica E
JOIN Turno T ON E.id_turno = T.id_turno
JOIN Partido P ON E.id_partido = P.id_partido
JOIN Usuario U ON E.id_usuario = U.id_usuario
JOIN Carta C ON E.id_carta = C.id_carta;
