# **Zambombazo**

## _Game Design Document_

---

##### **Copyright notice / author information / boring legal stuff nobody likes**

Diego Ortega Fernández - A01028535

Valeria Tapia González - A01028038


Paul Araque Fernández - A01027626

##
## _Index_

---

1. [Index](#index)
2. [Game Design](#game-design)
    1. [Summary](#summary)
    2. [Idea Pitch](#idea-pitch)
    2. [Gameplay](#gameplay)
    3. [Mindset](#mindset)
    4. [Sketches](#sketches)
    5. [References](#references)
3. [Technical](#technical)
    1. [Screens](#screens)
    2. [Controls](#controls)
    3. [Mechanics](#mechanics)
4. [Level Design](#level-design)
    1. [Themes](#themes)
        1. Ambience
        2. Objects
            1. Ambient
            2. Interactive
        3. Challenges
    2. [Game Flow](#game-flow)
5. [Development](#development)
    1. [Abstract Classes](#abstract-classes--components)
    2. [Derived Classes](#derived-classes--component-compositions)
6. [Graphics](#graphics)
    1. [Style Attributes](#style-attributes)
    2. [Graphics Needed](#graphics-needed)
7. [Sounds/Music](#soundsmusic)
    1. [Style Attributes](#style-attributes-1)
    2. [Sounds Needed](#sounds-needed)
    3. [Music Needed](#music-needed)
8. [Schedule](#schedule)

## _Game Design_

---

### **Summary**

Te adentrarás en un juego estratégico de cartas basado en el deporte fútbol, poniendo en práctica diferentes estrategias para anotar gol y ganar a tu contrincante, de la mano de tus jugadores favoritos.

### **Idea Pitch**

En este juego de fútbol, cada jugador cuenta con 11 cartas previamente seleccionadas por él/ella. Cada carta tiene un valor de defensa, otro de mediocampo y otro de ataque. El primer turno siempre será aleatorio, lo que implica que un jugador elegirá su primera carta, junto a valor de defensa, ataque o mediocampo, y luego el segundo jugador, teniendo en cuenta el valor que eligió el contrincante, deberá elegir una de sus cartas para tratar de ganar el combate. Si el primer jugador eligió el valor de defensa, el segundo jugador deberá elegir el valor de ataque para tratar de anotar un gol, y si el primero eligió mediocampo, el segundo jugador deberá contestar con un valor de mediocampo. Adicionalmente, cada jugador empezará con 10 de energía y cada carta tendrá un coste de entre 1 a 8 de energía para utilizarla. Después de cada combate, se le sumará dos energías a cada jugador y podrán elegir las nuevas cartas a utilizar. Al cada jugador tener 11 cartas, el primero que anote 6 goles ganará la partida y solo existirá el empate en caso de que el marcador esté empatado y los valores totales de las últimas dos cartas es el mismo, aunque es un caso muy extraño de que ocurra. 
Por cada partida, los jugadores recibirán una cantidad de monedas que va a variar dependiendo si ganaron, perdieron o empataron el partido. Con estas monedas, los jugadores podrán comprar sobres en una tienda para tratar de obtener mejores jugadores y así mejorar sus respectivos equipos. 

Extra: Al principio de cada partida, cada jugador podrá seleccionar 1 de 10 cartas aleatorias que podrán utilizar en cualquier turno. Un ejemplo de esta carta puede ser el doble de energía, la cual se podría utilizar a partir de la segunda ronda y le multiplicará la energía por dos al jugador. Otra carta puede ser “robo de carta”, la cual se activaría cuando el otro jugador use su carta aleatoria y su contrincante le robe la carta para su uso. 


### **Gameplay**

El juego empieza al darle al participante 10 en nivel de energía y un sobre con 20 cartas aleatorias, este tiene que escoger solo 11 para la partida. Cada carta representa a un jugador profesional de fútbol que posee 3 habilidades: defensa, ataque y medio campo, y un nivel de energía del 1 al 8 (siendo 8 lo máximo). En el sobre inicial, 6 cartas serían de defensa, 6 medios, 6 delanteros y 2 porteros. 

Con base en su desempeño en la vida real, el jugador tendrá un puntaje acorde a las áreas. Por ejemplo, Cristiano Ronaldo, en ataque tendría 94 pts, en defensa 56 pts, en medio campo 73 pts, y su nivel de energía sería un 8, mientras que alguien como Álvaro Morata tendría 83 pts en ataque, en defensa 49 pts, en medio campo 67 pts y en nivel de energía 6.  
Si es el turno del participante, éste podrá elegir su carta y con qué habilidad va a competir, es decir defensa, ataque o medio campo. Si no es su turno, el participante solo podrá elegir al jugador, mientras que la habilidad con la que competirá, será dependiendo de lo que haya escogido el otro participante. Hay 3 posibles combinaciones:

 Si el participante con el turno escoge jugar con defensa, el otro participante tendrá que jugar con ataque.
Si el participante con el turno escoge ataque, el otro tendrá que jugar con defensa.
Si el participante con el turno escoge medio campo, su contrario tendrá que jugar con mediocampo de igual manera.

El participante cuya carta en la habilidad que le corresponda tenga una mayor puntuación, meterá el gol. En caso de tener un empate, se le acreditará un gol a ambos participantes. 
Cada que alguien meta gol, el nivel de energía del participante, bajará de acuerdo al nivel de energía que posea el jugador que haya usado en su ronda. Al pasar a la siguiente ronda, a los dos participantes se les abonarán 2 puntos de energía. 
 
La partida termina cuando un jugador mete 6 goles, o algún jugador se queda sin energía. El participante ganador será acreedor de 1000 monedas que podrá usar en el futuro para comprar sobres más fuertes. 

Para ejemplificar las instrucciones, analizaremos el caso de Cristiano Ronaldo vs Alvaro Morata en la primera ronda, los dos participantes con nivel 10 de energía. 
En este caso, el participante A tendría el turno, escogiendo a Cristiano Ronaldo con su ofensa(94 pts), mientras que el participante B tendría que escoger un jugador para combatir con su defensa, en este caso Alvaro Morata (49 pts). Cristiano metería gol y ganaría la ronda al ser su puntaje mayor que el de su contrincante, pero el jugador A terminaría la ronda con 2 de energía (10 de energía inicial -8 de energía usada en Cristiano=2), mientras que el jugador B tendría 4 de energía porque Morata solo costó 6 de energía. 
Como los dos participantes siguen con vida, para la ronda 2, a ambos se les abonará 2 niveles de energía, por lo que participante A tendría 4 y participante B tendría 8. 

Los participantes deberán buscar una buena táctica para usar su energía de manera adecuada, y cuidar sus cartas con mayor puntaje con base en lo que ha estado haciendo su contrincante. 

Es importante destacar, que cuando se une un usuario al juego, la primera vez que juega le saldrá un sobre con jugadores que tengan una media de nivel de energía del 1 al 4, entre más partidas gane, podrá ir comprando sobres con una media de nivel de energía superior para tener un equipo más fuerte y de igual manera competir contra rivales más fuertes.


### **Mindset**

Buscamos que el jugador cree su propia estrategia, pero siempre debe tener en cuenta que necesita marcar al menos 6 goles para ganar el partido. De esta manera, pueden desarrollar su estrategia para empezar el juego más tranquilo y tratando de utilizar sus cartas débiles contra las fuertes del contrincante, pero al final se tendría que apurar para utilizar sus mejores cartas, teniendo el resultado en su contra, para tratar de darle vuelta al marcador. De igual manera, queremos que se sientan un poco nerviosos, ya que si utilizó a su mejor carta, pero el contrincante le ganó de alguna manera, deberá pensar que jugará en el siguiente turno para tratar de ganar ese combate. Asimismo, los nervios les pueden llegar si es un partido importante y el jugador puede estar pensando si jugar más agresivo, calmado o seguir su propia estrategia que le ha funcionado. Finalmente, si el jugador ve que su estrategia no está funcionando, queremos que experimenten probando nuevas ideas y analizando cuál es el mejor momento para jugar cada una de sus cartas. 

### **Sketches**

Menú de inicio:

![alt text](image-3.png)

Plantilla o Deck:

![alt text](image-6.png)

Batalla en juego:

![alt text](image-5.png)


### **References**

Algunos de los videojuegos de cartas que se usaron como referencia e insipiración, fueron los siguientes:

Pokémon:

![alt text](image-7.png)

Clash Royale: 

![alt text](image-9.png)

Fantasy:

![alt text](image-8.png)



## _Technical_

---

### **Screens**

1. Title Screen
    1. Options
2. Level Select
3. Game
    1. Inventory
    2. Assessment / Next Level
4. End Credits

_(example)_

### **Controls**

How will the player interact with the game? Will they be able to choose the controls? What kind of in-game events are they going to be able to trigger, and how? (e.g. pressing buttons, opening doors, etc.)

### **Mechanics**

Are there any interesting mechanics? If so, how are you going to accomplish them? Physics, algorithms, etc.

## _Level Design_

---

_(Note : These sections can safely be skipped if they&#39;re not relevant, or you&#39;d rather go about it another way. For most games, at least one of them should be useful. But I&#39;ll understand if you don&#39;t want to use them. It&#39;ll only hurt my feelings a little bit.)_

### **Themes**

1. Forest
    1. Mood
        1. Dark, calm, foreboding
    2. Objects
        1. _Ambient_
            1. Fireflies
            2. Beams of moonlight
            3. Tall grass
        2. _Interactive_
            1. Wolves
            2. Goblins
            3. Rocks
2. Castle
    1. Mood
        1. Dangerous, tense, active
    2. Objects
        1. _Ambient_
            1. Rodents
            2. Torches
            3. Suits of armor
        2. _Interactive_
            1. Guards
            2. Giant rats
            3. Chests

_(example)_

### **Game Flow**

1. Player starts in forest
2. Pond to the left, must move right
3. To the right is a hill, player jumps to traverse it (&quot;jump&quot; taught)
4. Player encounters castle - door&#39;s shut and locked
5. There&#39;s a window within jump height, and a rock on the ground
6. Player picks up rock and throws at glass (&quot;throw&quot; taught)
7. … etc.

_(example)_

## _Development_

---

### **Abstract Classes / Components**

1. BasePhysics
    1. BasePlayer
    2. BaseEnemy
    3. BaseObject
2. BaseObstacle
3. BaseInteractable

_(example)_

### **Derived Classes / Component Compositions**

1. BasePlayer
    1. PlayerMain
    2. PlayerUnlockable
2. BaseEnemy
    1. EnemyWolf
    2. EnemyGoblin
    3. EnemyGuard (may drop key)
    4. EnemyGiantRat
    5. EnemyPrisoner
3. BaseObject
    1. ObjectRock (pick-up-able, throwable)
    2. ObjectChest (pick-up-able, throwable, spits gold coins with key)
    3. ObjectGoldCoin (cha-ching!)
    4. ObjectKey (pick-up-able, throwable)
4. BaseObstacle
    1. ObstacleWindow (destroyed with rock)
    2. ObstacleWall
    3. ObstacleGate (watches to see if certain buttons are pressed)
5. BaseInteractable
    1. InteractableButton

_(example)_

## _Graphics_

---

### **Style Attributes**

What kinds of colors will you be using? Do you have a limited palette to work with? A post-processed HSV map/image? Consistency is key for immersion.

What kind of graphic style are you going for? Cartoony? Pixel-y? Cute? How, specifically? Solid, thick outlines with flat hues? Non-black outlines with limited tints/shades? Emphasize smooth curvatures over sharp angles? Describe a set of general rules depicting your style here.

Well-designed feedback, both good (e.g. leveling up) and bad (e.g. being hit), are great for teaching the player how to play through trial and error, instead of scripting a lengthy tutorial. What kind of visual feedback are you going to use to let the player know they&#39;re interacting with something? That they \*can\* interact with something?

### **Graphics Needed**

1. Characters
    1. Human-like
        1. Goblin (idle, walking, throwing)
        2. Guard (idle, walking, stabbing)
        3. Prisoner (walking, running)
    2. Other
        1. Wolf (idle, walking, running)
        2. Giant Rat (idle, scurrying)
2. Blocks
    1. Dirt
    2. Dirt/Grass
    3. Stone Block
    4. Stone Bricks
    5. Tiled Floor
    6. Weathered Stone Block
    7. Weathered Stone Bricks
3. Ambient
    1. Tall Grass
    2. Rodent (idle, scurrying)
    3. Torch
    4. Armored Suit
    5. Chains (matching Weathered Stone Bricks)
    6. Blood stains (matching Weathered Stone Bricks)
4. Other
    1. Chest
    2. Door (matching Stone Bricks)
    3. Gate
    4. Button (matching Weathered Stone Bricks)

_(example)_


## _Sounds/Music_

---

### **Style Attributes**

Again, consistency is key. Define that consistency here. What kind of instruments do you want to use in your music? Any particular tempo, key? Influences, genre? Mood?

Stylistically, what kind of sound effects are you looking for? Do you want to exaggerate actions with lengthy, cartoony sounds (e.g. mario&#39;s jump), or use just enough to let the player know something happened (e.g. mega man&#39;s landing)? Going for realism? You can use the music style as a bit of a reference too.

 Remember, auditory feedback should stand out from the music and other sound effects so the player hears it well. Volume, panning, and frequency/pitch are all important aspects to consider in both music _and_ sounds - so plan accordingly!

### **Sounds Needed**

1. Effects
    1. Soft Footsteps (dirt floor)
    2. Sharper Footsteps (stone floor)
    3. Soft Landing (low vertical velocity)
    4. Hard Landing (high vertical velocity)
    5. Glass Breaking
    6. Chest Opening
    7. Door Opening
2. Feedback
    1. Relieved &quot;Ahhhh!&quot; (health)
    2. Shocked &quot;Ooomph!&quot; (attacked)
    3. Happy chime (extra life)
    4. Sad chime (died)

_(example)_

### **Music Needed**

1. Slow-paced, nerve-racking &quot;forest&quot; track
2. Exciting &quot;castle&quot; track
3. Creepy, slow &quot;dungeon&quot; track
4. Happy ending credits track
5. Rick Astley&#39;s hit #1 single &quot;Never Gonna Give You Up&quot;

_(example)_


## _Schedule_

---

_(define the main activities and the expected dates when they should be finished. This is only a reference, and can change as the project is developed)_

1. develop base classes
    1. base entity
        1. base player
        2. base enemy
        3. base block
  2. base app state
        1. game world
        2. menu world
2. develop player and basic block classes
    1. physics / collisions
3. find some smooth controls/physics
4. develop other derived classes
    1. blocks
        1. moving
        2. falling
        3. breaking
        4. cloud
    2. enemies
        1. soldier
        2. rat
        3. etc.
5. design levels
    1. introduce motion/jumping
    2. introduce throwing
    3. mind the pacing, let the player play between lessons
6. design sounds
7. design music

_(example)_
