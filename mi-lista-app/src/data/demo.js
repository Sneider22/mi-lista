// Datos de ejemplo del modo invitado: el visitante ve la app con contenido sin registrarse.
// - Valeria y Mateo ya son amigos del invitado, con gustos distintos, para mostrar la afinidad.
// - Camila le envió una solicitud de amistad, para mostrar las notificaciones.
// Metadatos obtenidos de TMDB, Open Library y MusicBrainz.

export const GUEST_USER = 'Invitado';
const FRIENDS = ['Valeria', 'Mateo'];
const PENDING_REQUEST_FROM = 'Camila';

// Nombres usados por la demostración (no se pueden registrar)
export const DEMO_USERS = [GUEST_USER, ...FRIENDS, PENDING_REQUEST_FROM];

// Al cambiar los datos de ejemplo se sube este número para que se actualicen en navegadores que ya los tenían
const DEMO_VERSION = '2';

const GUEST_LIST = [
  {
    "titulo": "Breaking Bad",
    "tipo": "serie",
    "tmdb": {
      "id": 1396,
      "name": "Breaking Bad",
      "original_name": "Breaking Bad",
      "first_air_date": "2008-01-20",
      "overview": "Un profesor de química con cáncer terminal se asocia con un exalumno suyo para fabricar y vender metanfetamina a fin de que su familia no pase apuros económicos.",
      "poster_path": "/anFx9aTOOYqgS3v7x3R84Kz67ly.jpg",
      "genre_ids": [
        18,
        80
      ],
      "actores": [
        "Bryan Cranston",
        "Aaron Paul",
        "Anna Gunn",
        "RJ Mitte",
        "Dean Norris"
      ]
    },
    "estado": "completado"
  },
  {
    "titulo": "Arcane",
    "tipo": "serie",
    "tmdb": {
      "id": 94605,
      "name": "Arcane",
      "original_name": "Arcane",
      "first_air_date": "2021-11-06",
      "overview": "Con las dispares ciudades de Piltover y Zaun como telón de fondo, dos hermanas luchan en bandos opuestos de una guerra entre tecnologías mágicas y creencias enfrentadas.",
      "poster_path": "/87C0wecB8bHb1PsrKBI4kJiEkgV.jpg",
      "genre_ids": [
        16,
        10759,
        10765
      ],
      "actores": [
        "Hailee Steinfeld",
        "Ella Purnell"
      ]
    },
    "estado": "en_progreso"
  },
  {
    "titulo": "The Last of Us",
    "tipo": "serie",
    "tmdb": {
      "id": 100088,
      "name": "The Last of Us",
      "original_name": "The Last of Us",
      "first_air_date": "2023-01-15",
      "overview": "Año 2023, veinte años después del comienzo de una plaga mundial que infectó a población con un hongo mutado transformando a las personas en unas criaturas caníbales, el contrabandista Joel tiene la misión de escoltar a la adolescente Ellie por un mundo postapocalíptico en el nada va a ser fácil para los viajeros.  Joel todavía vive atormentado por el recuerdo de su única hija. Ellie es portadora de algo que podría cambiar el destino de la humanidad ¿Conseguirán sobrevivir los dos?",
      "poster_path": "/tNQWO6cNzQYCyvw36mUcAQQyf5F.jpg",
      "genre_ids": [
        18
      ],
      "actores": [
        "Bella Ramsey",
        "Gabriel Luna",
        "Isabela Merced",
        "Young Mazino"
      ]
    },
    "estado": "pendiente"
  },
  {
    "titulo": "Dark",
    "tipo": "serie",
    "tmdb": {
      "id": 70523,
      "name": "Dark",
      "original_name": "Dark",
      "first_air_date": "2017-12-01",
      "overview": "Tras la desaparición de un niño, cuatro familias desesperadas tratan de entender lo ocurrido a medida que van desvelando un retorcido misterio que abarca tres décadas.",
      "poster_path": "/hRP7N2uI0pokxnkcMFONoOZnxbv.jpg",
      "genre_ids": [
        80,
        18,
        10765,
        9648
      ],
      "actores": [
        "Louis Hofmann"
      ]
    },
    "estado": "completado"
  },
  {
    "titulo": "Stranger Things",
    "tipo": "serie",
    "tmdb": {
      "id": 66732,
      "name": "Stranger Things",
      "original_name": "Stranger Things",
      "first_air_date": "2016-07-15",
      "overview": "A raíz de la desaparición de un niño, un pueblo desvela un misterio relacionado con experimentos secretos, fuerzas sobrenaturales aterradoras y una niña muy extraña.",
      "poster_path": "/AsPD90QEQsIAtSxfSjV3fN7XFpt.jpg",
      "genre_ids": [
        10759,
        9648,
        10765
      ],
      "actores": [
        "Winona Ryder",
        "David Harbour",
        "Millie Bobby Brown",
        "Finn Wolfhard",
        "Gaten Matarazzo"
      ]
    },
    "estado": "completado"
  },
  {
    "titulo": "Shōgun",
    "tipo": "serie",
    "tmdb": {
      "id": 126308,
      "name": "Shōgun",
      "original_name": "Shōgun",
      "first_air_date": "2024-02-27",
      "overview": "Ambientada en el Japón de 1600, lord Yoshii Toranaga lucha por su vida mientras que sus enemigos en el Consejo de regentes se alían contra él cuando un misterioso barco europeo aparece abandonado cerca de un pueblo pesquero.",
      "poster_path": "/uIoDvVOQaKjSfz2oihkVS8M7l1v.jpg",
      "genre_ids": [
        18,
        10768
      ],
      "actores": [
        "Hiroyuki Sanada",
        "Cosmo Jarvis",
        "Anna Sawai",
        "Tadanobu Asano",
        "Takehiro Hira"
      ]
    },
    "estado": "pendiente"
  },
  {
    "titulo": "La casa de papel",
    "tipo": "serie",
    "tmdb": {
      "id": 71446,
      "name": "La casa de papel",
      "original_name": "La casa de papel",
      "first_air_date": "2017-05-02",
      "overview": "Un enigmático personaje llamado el Profesor planea algo grande: llevar a cabo el mayor atraco de la historia. Para ello recluta una banda de ocho personas que reúnen un único requisito, ninguno tiene nada que perder. Cinco meses de reclusión memorizando cada paso, cada detalle, cada probabilidad… y por fin, once días de encierro en la Fábrica Nacional de Moneda, rodeados de cuerpos de policía y con decenas de rehenes en su poder para saber si su apuesta suicida será todo o nada.",
      "poster_path": "/z01Dc0Ly2GmCpLe6Scx4d3dPP1S.jpg",
      "genre_ids": [
        80,
        18
      ],
      "actores": [
        "Úrsula Corberó",
        "Itziar Ituño",
        "Álvaro Morte",
        "Pedro Alonso",
        "Miguel Herrán"
      ]
    },
    "estado": "abandonado"
  },
  {
    "titulo": "Succession",
    "tipo": "serie",
    "tmdb": {
      "id": 76331,
      "name": "Succession",
      "original_name": "Succession",
      "first_air_date": "2018-06-03",
      "overview": "La serie gira en torno a la vida de la familia Roy. Son multimillonarios y poderosos, tienen todo lo que ansían, salvo vida familiar. Son dueños de una de la compañías de comunicaciones más exitosas del mundo. Su objetivo principal es hacer que el imperio crezca y, para ello, las lealtades se pondrán en juego.",
      "poster_path": "/xyHasySw0HQ4ndRWHvrpRTAsWXd.jpg",
      "genre_ids": [
        18,
        35
      ],
      "actores": [
        "Jeremy Strong",
        "Kieran Culkin",
        "Sarah Snook",
        "Brian Cox",
        "Matthew Macfadyen"
      ]
    },
    "estado": "en_progreso"
  },
  {
    "titulo": "Interstellar",
    "tipo": "pelicula",
    "tmdb": {
      "id": 157336,
      "title": "Interstellar",
      "original_title": "Interstellar",
      "release_date": "2014-11-04",
      "overview": "Un grupo de exploradores hacen uso de un agujero de gusano recientemente descubierto para superar las limitaciones de los viajes espaciales tripulados y vencer las inmensas distancias que tiene un viaje interestelar.",
      "poster_path": "/d1QKiYtceF3GDtxvTFXFAqwwah9.jpg",
      "genre_ids": [
        12,
        18,
        878
      ],
      "actores": [
        "Matthew McConaughey",
        "Anne Hathaway",
        "Michael Caine",
        "Jessica Chastain",
        "Casey Affleck"
      ]
    },
    "estado": "completado"
  },
  {
    "titulo": "El viaje de Chihiro",
    "tipo": "pelicula",
    "tmdb": {
      "id": 129,
      "title": "El viaje de Chihiro",
      "original_title": "千と千尋の神隠し",
      "release_date": "2001-07-20",
      "overview": "Durante el traslado de su familia a los suburbios, una niña de 10 años de edad deambula por un mundo gobernado por dioses, brujas y espíritus, y donde los humanos se convierten en bestias.",
      "poster_path": "/2RcxjDykOssx4SfqshewyI9vfSl.jpg",
      "genre_ids": [
        16,
        10751,
        14
      ],
      "actores": [
        "Rumi Hiiragi",
        "Miyu Irino",
        "Mari Natsuki",
        "Takashi Naito",
        "Yasuko Sawaguchi"
      ]
    },
    "estado": "completado"
  },
  {
    "titulo": "Dune: Parte dos",
    "tipo": "pelicula",
    "tmdb": {
      "id": 693134,
      "title": "Dune: Parte dos",
      "original_title": "Dune: Part Two",
      "release_date": "2024-02-27",
      "overview": "Sigue el viaje mítico de Paul Atreides mientras se une a Chani y los Fremen en una guerra de venganza contra los conspiradores que destruyeron a su familia. Al enfrentarse a una elección entre el amor de su vida y el destino del universo conocido, Paul se esfuerza por evitar un futuro terrible que solo él puede prever.",
      "poster_path": "/xCHmhHeO7aOCMlzcNukGH6Q7EiD.jpg",
      "genre_ids": [
        878,
        12
      ],
      "actores": [
        "Timothée Chalamet",
        "Zendaya",
        "Rebecca Ferguson",
        "Javier Bardem",
        "Josh Brolin"
      ]
    },
    "estado": "pendiente"
  },
  {
    "titulo": "Parásitos",
    "tipo": "pelicula",
    "tmdb": {
      "id": 496243,
      "title": "Parásitos",
      "original_title": "기생충",
      "release_date": "2019-05-30",
      "overview": "Tanto Gi Taek (Song Kang-ho) como su familia están sin trabajo. Cuando su hijo mayor, Gi Woo (Choi Woo-sik), empieza a dar clases particulares en casa de Park (Lee Seon-gyun), las dos familias, que tienen mucho en común pese a pertenecer a dos mundos totalmente distintos, comienzan una interrelación de resultados imprevisibles.",
      "poster_path": "/4N55tgxDW0RRATyrZHbx0q9HUKv.jpg",
      "genre_ids": [
        35,
        53,
        18
      ],
      "actores": [
        "Song Kang-ho",
        "Lee Sun-kyun",
        "Cho Yeo-jeong",
        "Choi Woo-shik",
        "Park So-dam"
      ]
    },
    "estado": "completado"
  },
  {
    "titulo": "Coco",
    "tipo": "pelicula",
    "tmdb": {
      "id": 354912,
      "title": "Coco",
      "original_title": "Coco",
      "release_date": "2017-10-27",
      "overview": "Un joven aspirante a músico llamado Miguel se embarca en un viaje extraordinario a la mágica tierra de sus ancestros. Allí, el encantador embaucador Héctor se convierte en su inesperado amigo y le ayuda a descubrir los misterios detrás de las historias y tradiciones de su familia.",
      "poster_path": "/vwsFGblLYxWBNjg9pdWN1Mm5YfW.jpg",
      "genre_ids": [
        10751,
        16,
        10402,
        12
      ],
      "actores": [
        "Anthony Gonzalez",
        "Gael García Bernal",
        "Benjamin Bratt",
        "Alanna Ubach",
        "Renée Victor"
      ]
    },
    "estado": "completado"
  },
  {
    "titulo": "Oppenheimer",
    "tipo": "pelicula",
    "tmdb": {
      "id": 872585,
      "title": "Oppenheimer",
      "original_title": "Oppenheimer",
      "release_date": "2023-07-19",
      "overview": "Película sobre el físico J. Robert Oppenheimer y su papel como desarrollador de la bomba atómica. Basada en el libro 'American Prometheus: The Triumph and Tragedy of J. Robert Oppenheimer' de Kai Bird y Martin J. Sherwin.",
      "poster_path": "/mJRUREPjTqqMEKwEiM2sdmIGngz.jpg",
      "genre_ids": [
        18,
        36,
        10752
      ],
      "actores": [
        "Cillian Murphy",
        "Emily Blunt",
        "Matt Damon",
        "Robert Downey Jr.",
        "Florence Pugh"
      ]
    },
    "estado": "pendiente"
  },
  {
    "titulo": "Spider-Man: Cruzando el Multiverso",
    "tipo": "pelicula",
    "tmdb": {
      "id": 569094,
      "title": "Spider-Man: Cruzando el Multiverso",
      "original_title": "Spider-Man: Across the Spider-Verse",
      "release_date": "2023-05-31",
      "overview": "Tras reencontrarse con Gwen Stacy, el amigable vecindario de Spider-Man de Brooklyn al completo es catapultado a través del Multiverso, donde se encuentra con un equipo de Spidermans encargados de proteger su propia existencia. Pero cuando los héroes se enfrentan sobre cómo manejar una nueva amenaza, Miles se encuentra enfrentado a las otras Arañas y debe redefinir lo que significa ser un héroe para poder salvar a la gente que más quiere.",
      "poster_path": "/37WcNMgNOMxdhT87MFl7tq7FM1.jpg",
      "genre_ids": [
        16,
        28,
        12,
        878
      ],
      "actores": [
        "Shameik Moore",
        "Hailee Steinfeld",
        "Brian Tyree Henry",
        "Luna Lauren Vélez",
        "Jake Johnson"
      ]
    },
    "estado": "completado"
  },
  {
    "titulo": "La La Land",
    "tipo": "pelicula",
    "tmdb": {
      "id": 313369,
      "title": "La ciudad de las estrellas (La La Land)",
      "original_title": "La La Land",
      "release_date": "2016-12-01",
      "overview": "Mia, una joven aspirante a actriz que compagina los castings con su trabajo de camarera, y Sebastian, un pianista de jazz que se gana la vida tocando en sórdidos tugurios, se enamoran. Pero la gran ambición por llegar a la cima en sus carreras artísticas amenaza con separarlos.",
      "poster_path": "/7pFsAaJmiOppVHcldBzg8JKBHwe.jpg",
      "genre_ids": [
        35,
        18,
        10749
      ],
      "actores": [
        "Ryan Gosling",
        "Emma Stone",
        "John Legend",
        "Rosemarie DeWitt",
        "Finn Wittrock"
      ]
    },
    "estado": "completado"
  },
  {
    "titulo": "El laberinto del fauno",
    "tipo": "pelicula",
    "tmdb": {
      "id": 1417,
      "title": "El laberinto del fauno",
      "original_title": "El laberinto del fauno",
      "release_date": "2006-10-11",
      "overview": "En la España falangista de 1944, una joven aficionada a los libros e hijastra de un sádico oficial del ejército huye a un misterioso pero cautivador mundo de fantasía.",
      "poster_path": "/gWPkUFGlO7ZIiArUcWRBmvAwVjB.jpg",
      "genre_ids": [
        14,
        18,
        10752
      ],
      "actores": [
        "Ivana Baquero",
        "Sergi López",
        "Maribel Verdú",
        "Doug Jones",
        "Ariadna Gil"
      ]
    },
    "estado": "pendiente"
  },
  {
    "titulo": "Cien años de soledad",
    "tipo": "libro",
    "ol": {
      "title": "Cien años de soledad",
      "author": "Gabriel García Márquez",
      "year": 1967,
      "cover": "https://covers.openlibrary.org/b/id/12627383-M.jpg"
    },
    "estado": "completado"
  },
  {
    "titulo": "El principito",
    "tipo": "libro",
    "ol": {
      "title": "El principito",
      "author": "Antoine de Saint-Exupéry",
      "year": 1943,
      "cover": "https://covers.openlibrary.org/b/id/10708272-M.jpg"
    },
    "estado": "completado"
  },
  {
    "titulo": "Rayuela",
    "tipo": "libro",
    "ol": {
      "title": "Rayuela",
      "author": "Julio Cortázar",
      "year": 1963,
      "cover": "https://covers.openlibrary.org/b/id/1047466-M.jpg"
    },
    "estado": "pendiente"
  },
  {
    "titulo": "1984",
    "tipo": "libro",
    "ol": {
      "title": "1984",
      "author": "George Orwell",
      "year": 1949,
      "cover": "https://covers.openlibrary.org/b/id/9267242-M.jpg"
    },
    "estado": "completado"
  },
  {
    "titulo": "Sapiens",
    "tipo": "libro",
    "ol": {
      "title": "Sapiens",
      "author": "Yuval Noah Harari",
      "year": 2011,
      "cover": "https://covers.openlibrary.org/b/id/8634250-M.jpg"
    },
    "estado": "en_progreso"
  },
  {
    "titulo": "Harry Potter y la piedra filosofal",
    "tipo": "libro",
    "ol": {
      "title": "Harry Potter y la piedra filosofal",
      "author": "J. K. Rowling",
      "year": 1997,
      "cover": "https://covers.openlibrary.org/b/id/15155833-M.jpg"
    },
    "estado": "completado"
  },
  {
    "titulo": "La sombra del viento",
    "tipo": "libro",
    "ol": {
      "title": "La sombra del viento",
      "author": "Carlos Ruiz Zafón",
      "year": 2001,
      "cover": "https://covers.openlibrary.org/b/id/10107644-M.jpg"
    },
    "estado": "pendiente"
  },
  {
    "titulo": "Crónica de una muerte anunciada",
    "tipo": "libro",
    "ol": {
      "title": "Crónica de una muerte anunciada",
      "author": "Gabriel García Márquez",
      "year": 1980,
      "cover": "https://covers.openlibrary.org/b/id/8489859-M.jpg"
    },
    "estado": "completado"
  },
  {
    "titulo": "Random Access Memories",
    "tipo": "musica",
    "mb": {
      "id": "158f94bf-d77f-4055-afa4-8fc7e0b2a004",
      "title": "Random Access Memories",
      "artist": "Daft Punk",
      "year": "2013",
      "cover": "https://coverartarchive.org/release/158f94bf-d77f-4055-afa4-8fc7e0b2a004/front-250"
    },
    "estado": "completado"
  },
  {
    "titulo": "Un verano sin ti",
    "tipo": "musica",
    "mb": {
      "id": "aded3f90-b758-451a-aad7-711d5985b05f",
      "title": "Un verano sin ti",
      "artist": "Bad Bunny",
      "year": "2022",
      "cover": "https://coverartarchive.org/release/aded3f90-b758-451a-aad7-711d5985b05f/front-250"
    },
    "estado": "en_progreso"
  },
  {
    "titulo": "MOTOMAMI",
    "tipo": "musica",
    "mb": {
      "id": "0117bc63-1c12-403a-904d-66113a70b8dc",
      "title": "MOTOMAMI",
      "artist": "ROSALÍA",
      "year": "2022",
      "cover": "https://coverartarchive.org/release/0117bc63-1c12-403a-904d-66113a70b8dc/front-250"
    },
    "estado": "completado"
  },
  {
    "titulo": "Abbey Road",
    "tipo": "musica",
    "mb": {
      "id": "03437e02-835f-3a0a-a37c-48a36c2e852a",
      "title": "Abbey Road",
      "artist": "The Beatles",
      "year": "1969",
      "cover": "https://coverartarchive.org/release/03437e02-835f-3a0a-a37c-48a36c2e852a/front-250"
    },
    "estado": "completado"
  },
  {
    "titulo": "Future Nostalgia",
    "tipo": "musica",
    "mb": {
      "id": "1c4fb070-c732-4ebe-8e12-8533ee95fa23",
      "title": "Future Nostalgia",
      "artist": "Dua Lipa",
      "year": "2019",
      "cover": "https://coverartarchive.org/release/1c4fb070-c732-4ebe-8e12-8533ee95fa23/front-250"
    },
    "estado": "pendiente"
  },
  {
    "titulo": "Blonde",
    "tipo": "musica",
    "mb": {
      "id": "08f54f68-7c89-4e22-8a0f-ac2b06e48568",
      "title": "Blonde",
      "artist": "Frank Ocean",
      "year": "2016",
      "cover": "https://coverartarchive.org/release/08f54f68-7c89-4e22-8a0f-ac2b06e48568/front-250"
    },
    "estado": "completado"
  },
  {
    "titulo": "Discovery",
    "tipo": "musica",
    "mb": {
      "id": "098060d4-ba3c-469d-88b0-08642261c7ab",
      "title": "Discovery",
      "artist": "Daft Punk",
      "year": "2001",
      "cover": "https://coverartarchive.org/release/098060d4-ba3c-469d-88b0-08642261c7ab/front-250"
    },
    "estado": "completado"
  },
  {
    "titulo": "El mal querer",
    "tipo": "musica",
    "mb": {
      "id": "5fdcd1ae-93b0-462f-b11e-405ff1485e4a",
      "title": "El mal querer",
      "artist": "ROSALÍA",
      "year": "2018",
      "cover": "https://coverartarchive.org/release/5fdcd1ae-93b0-462f-b11e-405ff1485e4a/front-250"
    },
    "estado": "en_progreso"
  }
];

const VALERIA_LIST = [
  {
    "titulo": "Dark",
    "tipo": "serie",
    "tmdb": {
      "id": 70523,
      "name": "Dark",
      "original_name": "Dark",
      "first_air_date": "2017-12-01",
      "overview": "Tras la desaparición de un niño, cuatro familias desesperadas tratan de entender lo ocurrido a medida que van desvelando un retorcido misterio que abarca tres décadas.",
      "poster_path": "/hRP7N2uI0pokxnkcMFONoOZnxbv.jpg",
      "genre_ids": [
        80,
        18,
        10765,
        9648
      ],
      "actores": [
        "Louis Hofmann"
      ]
    },
    "estado": "completado"
  },
  {
    "titulo": "The Last of Us",
    "tipo": "serie",
    "tmdb": {
      "id": 100088,
      "name": "The Last of Us",
      "original_name": "The Last of Us",
      "first_air_date": "2023-01-15",
      "overview": "Año 2023, veinte años después del comienzo de una plaga mundial que infectó a población con un hongo mutado transformando a las personas en unas criaturas caníbales, el contrabandista Joel tiene la misión de escoltar a la adolescente Ellie por un mundo postapocalíptico en el nada va a ser fácil para los viajeros.  Joel todavía vive atormentado por el recuerdo de su única hija. Ellie es portadora de algo que podría cambiar el destino de la humanidad ¿Conseguirán sobrevivir los dos?",
      "poster_path": "/tNQWO6cNzQYCyvw36mUcAQQyf5F.jpg",
      "genre_ids": [
        18
      ],
      "actores": [
        "Bella Ramsey",
        "Gabriel Luna",
        "Isabela Merced",
        "Young Mazino"
      ]
    },
    "estado": "completado"
  },
  {
    "titulo": "Fleabag",
    "tipo": "serie",
    "tmdb": {
      "id": 67070,
      "name": "Fleabag",
      "original_name": "Fleabag",
      "first_air_date": "2016-07-21",
      "overview": "La protagonista, Fleabag, es una mujer de clase media que tiene una  situación familiar complicada y un trabajo con el que no puede mantener  su estilo de vida. Ella es propietaria de un café con el que apenas gana  dinero y su novio es un hombre que llena su vacío existencial con  encuentros sexuales sin sentido con todo tipo de mujeres, cada cual peor que la anterior. Y eso es solo una pequeña parte de su vida y  situaciones cotidianas con las que Fleabag debe lidiar.  Fleabag  es un ejemplo de una vida que ha ido mal y debe adaptarse a nuevas  situaciones, cosa que consigue hacer gracias a su personalidad.",
      "poster_path": "/vFn0nLPcIggPH5LTWWaJ2hcsGlc.jpg",
      "genre_ids": [
        35,
        18
      ],
      "actores": [
        "Phoebe Waller-Bridge",
        "Sian Clifford",
        "Andrew Scott"
      ]
    },
    "estado": "completado"
  },
  {
    "titulo": "Arcane",
    "tipo": "serie",
    "tmdb": {
      "id": 94605,
      "name": "Arcane",
      "original_name": "Arcane",
      "first_air_date": "2021-11-06",
      "overview": "Con las dispares ciudades de Piltover y Zaun como telón de fondo, dos hermanas luchan en bandos opuestos de una guerra entre tecnologías mágicas y creencias enfrentadas.",
      "poster_path": "/87C0wecB8bHb1PsrKBI4kJiEkgV.jpg",
      "genre_ids": [
        16,
        10759,
        10765
      ],
      "actores": [
        "Hailee Steinfeld",
        "Ella Purnell"
      ]
    },
    "estado": "completado"
  },
  {
    "titulo": "Los Bridgerton",
    "tipo": "serie",
    "tmdb": {
      "id": 91239,
      "name": "Los Bridgerton",
      "original_name": "Bridgerton",
      "first_air_date": "2020-12-25",
      "overview": "Ambientada en la alta sociedad londinense de principios del siglo XIX, la historia se centra en la familia Bridgerton, formada por varios hermanos y hermanas que se debaten entre el amor, el deber y la vocación. Cada temporada refleja la vida amorosa de un hermano Bridgerton, empezando por Daphne y siguiendo por Anthony, Colin y Benedict.",
      "poster_path": "/4MQf8yWM47OVjjtxRdhc1SzoZVE.jpg",
      "genre_ids": [
        18
      ],
      "actores": [
        "Ruth Gemmell",
        "Luke Thompson",
        "Yerin Ha",
        "Luke Newton",
        "Claudia Jessie"
      ]
    },
    "estado": "en_progreso"
  },
  {
    "titulo": "Interstellar",
    "tipo": "pelicula",
    "tmdb": {
      "id": 157336,
      "title": "Interstellar",
      "original_title": "Interstellar",
      "release_date": "2014-11-04",
      "overview": "Un grupo de exploradores hacen uso de un agujero de gusano recientemente descubierto para superar las limitaciones de los viajes espaciales tripulados y vencer las inmensas distancias que tiene un viaje interestelar.",
      "poster_path": "/d1QKiYtceF3GDtxvTFXFAqwwah9.jpg",
      "genre_ids": [
        12,
        18,
        878
      ],
      "actores": [
        "Matthew McConaughey",
        "Anne Hathaway",
        "Michael Caine",
        "Jessica Chastain",
        "Casey Affleck"
      ]
    },
    "estado": "completado"
  },
  {
    "titulo": "Coco",
    "tipo": "pelicula",
    "tmdb": {
      "id": 354912,
      "title": "Coco",
      "original_title": "Coco",
      "release_date": "2017-10-27",
      "overview": "Un joven aspirante a músico llamado Miguel se embarca en un viaje extraordinario a la mágica tierra de sus ancestros. Allí, el encantador embaucador Héctor se convierte en su inesperado amigo y le ayuda a descubrir los misterios detrás de las historias y tradiciones de su familia.",
      "poster_path": "/vwsFGblLYxWBNjg9pdWN1Mm5YfW.jpg",
      "genre_ids": [
        10751,
        16,
        10402,
        12
      ],
      "actores": [
        "Anthony Gonzalez",
        "Gael García Bernal",
        "Benjamin Bratt",
        "Alanna Ubach",
        "Renée Victor"
      ]
    },
    "estado": "completado"
  },
  {
    "titulo": "La La Land",
    "tipo": "pelicula",
    "tmdb": {
      "id": 313369,
      "title": "La ciudad de las estrellas (La La Land)",
      "original_title": "La La Land",
      "release_date": "2016-12-01",
      "overview": "Mia, una joven aspirante a actriz que compagina los castings con su trabajo de camarera, y Sebastian, un pianista de jazz que se gana la vida tocando en sórdidos tugurios, se enamoran. Pero la gran ambición por llegar a la cima en sus carreras artísticas amenaza con separarlos.",
      "poster_path": "/7pFsAaJmiOppVHcldBzg8JKBHwe.jpg",
      "genre_ids": [
        35,
        18,
        10749
      ],
      "actores": [
        "Ryan Gosling",
        "Emma Stone",
        "John Legend",
        "Rosemarie DeWitt",
        "Finn Wittrock"
      ]
    },
    "estado": "completado"
  },
  {
    "titulo": "Amelie",
    "tipo": "pelicula",
    "tmdb": {
      "id": 194,
      "title": "Amelie",
      "original_title": "Le Fabuleux Destin d'Amélie Poulain",
      "release_date": "2001-04-25",
      "overview": "Amélie Poulain (Audrey Tautou) es una joven camarera que vive en París y que tiene una imaginación desbordante. Un día, encuentra una caja con objetos antiguos que pertenecían al antiguo inquilino de su apartamento. Amélie decide devolver la caja a su dueño y ver su reacción. Al ver la felicidad que le provoca, Amélie se propone hacer felices a los demás con pequeños gestos. Así, ayuda a sus vecinos, a sus compañeros de trabajo y a su padre, mientras se divierte con sus ocurrencias. Pero en su búsqueda de la felicidad ajena, Amélie se olvida de la suya propia, hasta que conoce a Nino Quincampoix (Mathieu Kassovitz), un joven coleccionista de fotos que le roba el corazón.",
      "poster_path": "/mYvUib00miJWxWkiXhy3QnrCj96.jpg",
      "genre_ids": [
        35,
        10749
      ],
      "actores": [
        "Audrey Tautou",
        "Mathieu Kassovitz",
        "Rufus",
        "Serge Merlin",
        "Jamel Debbouze"
      ]
    },
    "estado": "completado"
  },
  {
    "titulo": "Mujercitas",
    "tipo": "pelicula",
    "tmdb": {
      "id": 331482,
      "title": "Mujercitas",
      "original_title": "Little Women",
      "release_date": "2019-12-25",
      "overview": "Amy, Jo, Beth y Meg son cuatro hermanas adolescentes que se embarcan en unas vacaciones con su madre, pero sin su padre, un evangelista itinerante. A medida que atraviesan el estado de Massachusetts, sumido en plena Guerra Civil, descubren el amor y la importancia de los lazos familiares.",
      "poster_path": "/z2wBWFEQ9FE0RcjmWXz3vvSNPfT.jpg",
      "genre_ids": [
        18,
        10749
      ],
      "actores": [
        "Saoirse Ronan",
        "Emma Watson",
        "Florence Pugh",
        "Eliza Scanlen",
        "Laura Dern"
      ]
    },
    "estado": "pendiente"
  },
  {
    "titulo": "Cien años de soledad",
    "tipo": "libro",
    "ol": {
      "title": "Cien años de soledad",
      "author": "Gabriel García Márquez",
      "year": 1967,
      "cover": "https://covers.openlibrary.org/b/id/12627383-M.jpg"
    },
    "estado": "completado"
  },
  {
    "titulo": "La sombra del viento",
    "tipo": "libro",
    "ol": {
      "title": "La sombra del viento",
      "author": "Carlos Ruiz Zafón",
      "year": 2001,
      "cover": "https://covers.openlibrary.org/b/id/10107644-M.jpg"
    },
    "estado": "en_progreso"
  },
  {
    "titulo": "Orgullo y prejuicio",
    "tipo": "libro",
    "ol": {
      "title": "Orgullo y prejuicio",
      "author": "Jane Austen",
      "year": 1813,
      "cover": "https://covers.openlibrary.org/b/id/14348537-M.jpg"
    },
    "estado": "completado"
  },
  {
    "titulo": "El principito",
    "tipo": "libro",
    "ol": {
      "title": "El principito",
      "author": "Antoine de Saint-Exupéry",
      "year": 1943,
      "cover": "https://covers.openlibrary.org/b/id/10708272-M.jpg"
    },
    "estado": "completado"
  },
  {
    "titulo": "MOTOMAMI",
    "tipo": "musica",
    "mb": {
      "id": "0117bc63-1c12-403a-904d-66113a70b8dc",
      "title": "MOTOMAMI",
      "artist": "ROSALÍA",
      "year": "2022",
      "cover": "https://coverartarchive.org/release/0117bc63-1c12-403a-904d-66113a70b8dc/front-250"
    },
    "estado": "completado"
  },
  {
    "titulo": "El mal querer",
    "tipo": "musica",
    "mb": {
      "id": "5fdcd1ae-93b0-462f-b11e-405ff1485e4a",
      "title": "El mal querer",
      "artist": "ROSALÍA",
      "year": "2018",
      "cover": "https://coverartarchive.org/release/5fdcd1ae-93b0-462f-b11e-405ff1485e4a/front-250"
    },
    "estado": "completado"
  },
  {
    "titulo": "Future Nostalgia",
    "tipo": "musica",
    "mb": {
      "id": "1c4fb070-c732-4ebe-8e12-8533ee95fa23",
      "title": "Future Nostalgia",
      "artist": "Dua Lipa",
      "year": "2019",
      "cover": "https://coverartarchive.org/release/1c4fb070-c732-4ebe-8e12-8533ee95fa23/front-250"
    },
    "estado": "completado"
  },
  {
    "titulo": "SOS",
    "tipo": "musica",
    "mb": {
      "id": "07fc4a4b-28c7-45c6-a62b-5bfb1494ffaf",
      "title": "SOS",
      "artist": "SZA",
      "year": "2022",
      "cover": "https://coverartarchive.org/release/07fc4a4b-28c7-45c6-a62b-5bfb1494ffaf/front-250"
    },
    "estado": "en_progreso"
  }
];

const MATEO_LIST = [
  {
    "titulo": "Breaking Bad",
    "tipo": "serie",
    "tmdb": {
      "id": 1396,
      "name": "Breaking Bad",
      "original_name": "Breaking Bad",
      "first_air_date": "2008-01-20",
      "overview": "Un profesor de química con cáncer terminal se asocia con un exalumno suyo para fabricar y vender metanfetamina a fin de que su familia no pase apuros económicos.",
      "poster_path": "/anFx9aTOOYqgS3v7x3R84Kz67ly.jpg",
      "genre_ids": [
        18,
        80
      ],
      "actores": [
        "Bryan Cranston",
        "Aaron Paul",
        "Anna Gunn",
        "RJ Mitte",
        "Dean Norris"
      ]
    },
    "estado": "completado"
  },
  {
    "titulo": "Succession",
    "tipo": "serie",
    "tmdb": {
      "id": 76331,
      "name": "Succession",
      "original_name": "Succession",
      "first_air_date": "2018-06-03",
      "overview": "La serie gira en torno a la vida de la familia Roy. Son multimillonarios y poderosos, tienen todo lo que ansían, salvo vida familiar. Son dueños de una de la compañías de comunicaciones más exitosas del mundo. Su objetivo principal es hacer que el imperio crezca y, para ello, las lealtades se pondrán en juego.",
      "poster_path": "/xyHasySw0HQ4ndRWHvrpRTAsWXd.jpg",
      "genre_ids": [
        18,
        35
      ],
      "actores": [
        "Jeremy Strong",
        "Kieran Culkin",
        "Sarah Snook",
        "Brian Cox",
        "Matthew Macfadyen"
      ]
    },
    "estado": "completado"
  },
  {
    "titulo": "The Bear",
    "tipo": "serie",
    "tmdb": {
      "id": 136315,
      "name": "The Bear",
      "original_name": "The Bear",
      "first_air_date": "2022-06-23",
      "overview": "Un joven chef lucha por transformar una tienda de bocadillos junto a un equipo de cocineros novatos.",
      "poster_path": "/5TZnk9ryzfcNlsCOghURfZsBong.jpg",
      "genre_ids": [
        18,
        35
      ],
      "actores": [
        "Jeremy Allen White",
        "Ebon Moss-Bachrach",
        "Ayo Edebiri",
        "Lionel Boyce",
        "Abby Elliott"
      ]
    },
    "estado": "en_progreso"
  },
  {
    "titulo": "True Detective",
    "tipo": "serie",
    "tmdb": {
      "id": 46648,
      "name": "True Detective",
      "original_name": "True Detective",
      "first_air_date": "2014-01-12",
      "overview": "En Luisiana, en 1995, dos detectives investigan el atroz asesinato de una joven que fue sometida a un ritual pagano. En el año 2012, unos policías interrogan a estos dos detectives, dado que sospechan que el asesino de 1995 ha regresado",
      "poster_path": "/xZSuQm2KQQKoVKf31HgUWkjAVga.jpg",
      "genre_ids": [
        18,
        9648
      ],
      "actores": [
        "Jodie Foster",
        "Kali Reis",
        "Fiona Shaw",
        "Finn Bennett",
        "Isabella Star LaBlanc"
      ]
    },
    "estado": "completado"
  },
  {
    "titulo": "Oppenheimer",
    "tipo": "pelicula",
    "tmdb": {
      "id": 872585,
      "title": "Oppenheimer",
      "original_title": "Oppenheimer",
      "release_date": "2023-07-19",
      "overview": "Película sobre el físico J. Robert Oppenheimer y su papel como desarrollador de la bomba atómica. Basada en el libro 'American Prometheus: The Triumph and Tragedy of J. Robert Oppenheimer' de Kai Bird y Martin J. Sherwin.",
      "poster_path": "/mJRUREPjTqqMEKwEiM2sdmIGngz.jpg",
      "genre_ids": [
        18,
        36,
        10752
      ],
      "actores": [
        "Cillian Murphy",
        "Emily Blunt",
        "Matt Damon",
        "Robert Downey Jr.",
        "Florence Pugh"
      ]
    },
    "estado": "completado"
  },
  {
    "titulo": "Parásitos",
    "tipo": "pelicula",
    "tmdb": {
      "id": 496243,
      "title": "Parásitos",
      "original_title": "기생충",
      "release_date": "2019-05-30",
      "overview": "Tanto Gi Taek (Song Kang-ho) como su familia están sin trabajo. Cuando su hijo mayor, Gi Woo (Choi Woo-sik), empieza a dar clases particulares en casa de Park (Lee Seon-gyun), las dos familias, que tienen mucho en común pese a pertenecer a dos mundos totalmente distintos, comienzan una interrelación de resultados imprevisibles.",
      "poster_path": "/4N55tgxDW0RRATyrZHbx0q9HUKv.jpg",
      "genre_ids": [
        35,
        53,
        18
      ],
      "actores": [
        "Song Kang-ho",
        "Lee Sun-kyun",
        "Cho Yeo-jeong",
        "Choi Woo-shik",
        "Park So-dam"
      ]
    },
    "estado": "completado"
  },
  {
    "titulo": "Pulp Fiction",
    "tipo": "pelicula",
    "tmdb": {
      "id": 680,
      "title": "Pulp Fiction",
      "original_title": "Pulp Fiction",
      "release_date": "1994-09-10",
      "overview": "Jules y Vincent, dos asesinos a sueldo con muy pocas luces, trabajan para Marsellus Wallace. Vincent le confiesa a Jules que Marsellus le ha pedido que cuide de Mia, su mujer. Jules le recomienda prudencia porque es muy peligroso sobrepasarse con la novia del jefe. Cuando llega la hora de trabajar, ambos deben ponerse manos a la obra. Su misión: recuperar un misterioso maletín.",
      "poster_path": "/hNcQAuquJxTxl2fJFs1R42DrWcf.jpg",
      "genre_ids": [
        53,
        80,
        35
      ],
      "actores": [
        "John Travolta",
        "Samuel L. Jackson",
        "Uma Thurman",
        "Bruce Willis",
        "Ving Rhames"
      ]
    },
    "estado": "completado"
  },
  {
    "titulo": "El padrino",
    "tipo": "pelicula",
    "tmdb": {
      "id": 238,
      "title": "El padrino",
      "original_title": "The Godfather",
      "release_date": "1972-03-14",
      "overview": "Don Vito Corleone, conocido dentro de los círculos del hampa como \"El Padrino\", es el patriarca de una de las cinco familias que ejercen el mando de la Cosa Nostra en Nueva York (Estados Unidos) durante la década de 1940. Don Corleone tiene cuatro hijos: una chica, Connie, y tres varones; Sonny, Michael y Fredo. Cuando Vito reclina intervenir en el negocio de estupefacientes, empieza una cruenta lucha de violentos episodios entre las distintas familias del crimen organizado.",
      "poster_path": "/5HlLUsmsv60cZVTzVns9ICZD6zU.jpg",
      "genre_ids": [
        18,
        80
      ],
      "actores": [
        "Marlon Brando",
        "Al Pacino",
        "James Caan",
        "Robert Duvall",
        "Richard S. Castellano"
      ]
    },
    "estado": "completado"
  },
  {
    "titulo": "Dune: Parte dos",
    "tipo": "pelicula",
    "tmdb": {
      "id": 693134,
      "title": "Dune: Parte dos",
      "original_title": "Dune: Part Two",
      "release_date": "2024-02-27",
      "overview": "Sigue el viaje mítico de Paul Atreides mientras se une a Chani y los Fremen en una guerra de venganza contra los conspiradores que destruyeron a su familia. Al enfrentarse a una elección entre el amor de su vida y el destino del universo conocido, Paul se esfuerza por evitar un futuro terrible que solo él puede prever.",
      "poster_path": "/xCHmhHeO7aOCMlzcNukGH6Q7EiD.jpg",
      "genre_ids": [
        878,
        12
      ],
      "actores": [
        "Timothée Chalamet",
        "Zendaya",
        "Rebecca Ferguson",
        "Javier Bardem",
        "Josh Brolin"
      ]
    },
    "estado": "completado"
  },
  {
    "titulo": "1984",
    "tipo": "libro",
    "ol": {
      "title": "1984",
      "author": "George Orwell",
      "year": 1949,
      "cover": "https://covers.openlibrary.org/b/id/9267242-M.jpg"
    },
    "estado": "completado"
  },
  {
    "titulo": "Sapiens",
    "tipo": "libro",
    "ol": {
      "title": "Sapiens",
      "author": "Yuval Noah Harari",
      "year": 2011,
      "cover": "https://covers.openlibrary.org/b/id/8634250-M.jpg"
    },
    "estado": "completado"
  },
  {
    "titulo": "Dune",
    "tipo": "libro",
    "ol": {
      "title": "Dune",
      "author": "Frank Herbert",
      "year": 1965,
      "cover": "https://covers.openlibrary.org/b/id/11481354-M.jpg"
    },
    "estado": "en_progreso"
  },
  {
    "titulo": "Abbey Road",
    "tipo": "musica",
    "mb": {
      "id": "03437e02-835f-3a0a-a37c-48a36c2e852a",
      "title": "Abbey Road",
      "artist": "The Beatles",
      "year": "1969",
      "cover": "https://coverartarchive.org/release/03437e02-835f-3a0a-a37c-48a36c2e852a/front-250"
    },
    "estado": "completado"
  },
  {
    "titulo": "Discovery",
    "tipo": "musica",
    "mb": {
      "id": "098060d4-ba3c-469d-88b0-08642261c7ab",
      "title": "Discovery",
      "artist": "Daft Punk",
      "year": "2001",
      "cover": "https://coverartarchive.org/release/098060d4-ba3c-469d-88b0-08642261c7ab/front-250"
    },
    "estado": "completado"
  },
  {
    "titulo": "AM",
    "tipo": "musica",
    "mb": {
      "id": "169957aa-2ca8-42a8-ba02-71bdf3fe26ff",
      "title": "AM",
      "artist": "Arctic Monkeys",
      "year": "2013",
      "cover": "https://coverartarchive.org/release/169957aa-2ca8-42a8-ba02-71bdf3fe26ff/front-250"
    },
    "estado": "completado"
  },
  {
    "titulo": "OK Computer",
    "tipo": "musica",
    "mb": {
      "id": "0b6b4ba0-d36f-47bd-b4ea-6a5b91842d29",
      "title": "OK Computer",
      "artist": "Radiohead",
      "year": "1997",
      "cover": "https://coverartarchive.org/release/0b6b4ba0-d36f-47bd-b4ea-6a5b91842d29/front-250"
    },
    "estado": "en_progreso"
  }
];

const CAMILA_LIST = [
  {
    "titulo": "Stranger Things",
    "tipo": "serie",
    "tmdb": {
      "id": 66732,
      "name": "Stranger Things",
      "original_name": "Stranger Things",
      "first_air_date": "2016-07-15",
      "overview": "A raíz de la desaparición de un niño, un pueblo desvela un misterio relacionado con experimentos secretos, fuerzas sobrenaturales aterradoras y una niña muy extraña.",
      "poster_path": "/AsPD90QEQsIAtSxfSjV3fN7XFpt.jpg",
      "genre_ids": [
        10759,
        9648,
        10765
      ],
      "actores": [
        "Winona Ryder",
        "David Harbour",
        "Millie Bobby Brown",
        "Finn Wolfhard",
        "Gaten Matarazzo"
      ]
    },
    "estado": "completado"
  },
  {
    "titulo": "Miércoles",
    "tipo": "serie",
    "tmdb": {
      "id": 119051,
      "name": "Miércoles",
      "original_name": "Wednesday",
      "first_air_date": "2022-11-23",
      "overview": "Miércoles Addams, lista, sarcástica y un poco muerta por dentro, investiga misterios retorcidos mientras hace amigos —y enemigos— en la Academia Nunca Más.",
      "poster_path": "/bNKwoYqkCXfIhhr5Jz8slrsw32r.jpg",
      "genre_ids": [
        10765,
        9648,
        35
      ],
      "actores": [
        "Jenna Ortega",
        "Steve Buscemi",
        "Emma Myers",
        "Hunter Doohan",
        "Joy Sunday"
      ]
    },
    "estado": "en_progreso"
  },
  {
    "titulo": "Coco",
    "tipo": "pelicula",
    "tmdb": {
      "id": 354912,
      "title": "Coco",
      "original_title": "Coco",
      "release_date": "2017-10-27",
      "overview": "Un joven aspirante a músico llamado Miguel se embarca en un viaje extraordinario a la mágica tierra de sus ancestros. Allí, el encantador embaucador Héctor se convierte en su inesperado amigo y le ayuda a descubrir los misterios detrás de las historias y tradiciones de su familia.",
      "poster_path": "/vwsFGblLYxWBNjg9pdWN1Mm5YfW.jpg",
      "genre_ids": [
        10751,
        16,
        10402,
        12
      ],
      "actores": [
        "Anthony Gonzalez",
        "Gael García Bernal",
        "Benjamin Bratt",
        "Alanna Ubach",
        "Renée Victor"
      ]
    },
    "estado": "completado"
  },
  {
    "titulo": "Barbie",
    "tipo": "pelicula",
    "tmdb": {
      "id": 346698,
      "title": "Barbie",
      "original_title": "Barbie",
      "release_date": "2023-07-19",
      "overview": "Barbie vive en Barbieland donde todo es ideal y lleno de música y color. Un buen día decide conocer el mundo real. Cuando el CEO de Mattel se entere, tratará de evitarlo a toda costa y devolver a Barbie a una caja.",
      "poster_path": "/fNtqD4BTFj0Bgo9lyoAtmNFzxHN.jpg",
      "genre_ids": [
        35,
        12,
        14
      ],
      "actores": [
        "Margot Robbie",
        "Ryan Gosling",
        "America Ferrera",
        "Ariana Greenblatt",
        "Issa Rae"
      ]
    },
    "estado": "completado"
  },
  {
    "titulo": "Harry Potter y la piedra filosofal",
    "tipo": "libro",
    "ol": {
      "title": "Harry Potter y la piedra filosofal",
      "author": "J. K. Rowling",
      "year": 1997,
      "cover": "https://covers.openlibrary.org/b/id/15155833-M.jpg"
    },
    "estado": "completado"
  },
  {
    "titulo": "Future Nostalgia",
    "tipo": "musica",
    "mb": {
      "id": "1c4fb070-c732-4ebe-8e12-8533ee95fa23",
      "title": "Future Nostalgia",
      "artist": "Dua Lipa",
      "year": "2019",
      "cover": "https://coverartarchive.org/release/1c4fb070-c732-4ebe-8e12-8533ee95fa23/front-250"
    },
    "estado": "completado"
  },
  {
    "titulo": "Midnights",
    "tipo": "musica",
    "estado": "completado",
    "mb": {
      "id": "0d558759-dfd0-4642-b091-fb3608d55e05",
      "title": "Midnights",
      "artist": "Taylor Swift",
      "year": "2022",
      "cover": "https://coverartarchive.org/release/0d558759-dfd0-4642-b091-fb3608d55e05/front-250"
    }
  }
];

const DEMO_LISTS = {
  [GUEST_USER]: GUEST_LIST,
  Valeria: VALERIA_LIST,
  Mateo: MATEO_LIST,
  Camila: CAMILA_LIST
};

// Crea (o actualiza, si cambió la versión) el invitado, sus amigos y la solicitud pendiente
export function seedDemoData() {
  const read = (key) => JSON.parse(localStorage.getItem(key) || '{}');
  const users = read('usuarios');
  const lists = read('listas');
  const friends = read('amigos');
  const requests = read('solicitudes');
  const outdated = localStorage.getItem('demo_version') !== DEMO_VERSION;

  for (const name of DEMO_USERS) {
    if (!users[name]) users[name] = { demo: true };
    // Las listas de ejemplo se reponen solo si cambió la versión: si el visitante edita la suya, se respeta
    if (!lists[name] || outdated) lists[name] = DEMO_LISTS[name];
  }

  const link = (a, b) => {
    friends[a] = friends[a] || [];
    if (!friends[a].includes(b)) friends[a].push(b);
  };
  FRIENDS.forEach((friend) => {
    link(GUEST_USER, friend);
    link(friend, GUEST_USER);
  });

  const alreadyFriends = (friends[GUEST_USER] || []).includes(PENDING_REQUEST_FROM);
  requests[GUEST_USER] = requests[GUEST_USER] || [];
  if (outdated && !alreadyFriends && !requests[GUEST_USER].includes(PENDING_REQUEST_FROM)) {
    requests[GUEST_USER].push(PENDING_REQUEST_FROM);
  }

  localStorage.setItem('usuarios', JSON.stringify(users));
  localStorage.setItem('listas', JSON.stringify(lists));
  localStorage.setItem('amigos', JSON.stringify(friends));
  localStorage.setItem('solicitudes', JSON.stringify(requests));
  localStorage.setItem('demo_version', DEMO_VERSION);
}
