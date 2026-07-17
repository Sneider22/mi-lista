# Mi Lista — Catálogo Personal de Medios & Red Social Simulada

¡Bienvenido a **Mi Lista**! Este proyecto es un sistema premium para catalogar y clasificar consumos culturales (series, películas, libros y música) y conectarte socialmente con amigos. Es el resultado de una migración y refactorización arquitectónica completa hacia tecnologías modernas y estándares de ingeniería de software robustos.

Desarrollado y optimizado por **Sneider**.

---

## Arquitectura Tecnológica y Stack

La aplicación se construyó bajo un enfoque de desarrollo ágil y modular, separando las capas de presentación, lógica reactiva y persistencia local:

*   **Core:** React 19 + Vite (compilación y recarga en caliente de rendimiento ultra rápido).
*   **Diseño:** Tailwind CSS v4 (utilizando el nuevo motor de compilación CSS nativo, variables unificadas en `:root` y diseño responsivo fluido).
*   **Estilo Visual:** Inspirado en las mejores prácticas de UI oscuras (como *Letterboxd* y *Goodreads*), usando una paleta monocromática elegante, acentos en verde esmeralda y cian, scrollbars personalizados y exclusión de emojis en favor de iconos vectoriales SVG limpios.
*   **Bases de Datos & APIs de Terceros:**
    *   **TMDB API:** Consulta metadata detallada de películas y series (sinopsis, fecha de estreno, reparto de actores, géneros y portadas en alta resolución).
    *   **Open Library API:** Buscador de libros ampliado mediante consultas generales (`q=`), extrayendo el año, el autor y enlazando portadas mediante Cover ID.
    *   **MusicBrainz API + Cover Art Archive:** Sistema de consulta de álbumes y singles 100% gratuito y sin llave de acceso. Conexión automatizada a portadas con sistema tolerante a fallos (fallbacks automáticos a iconos SVG).
*   **Persistencia:** Modelo de almacenamiento estructurado de datos persistido en el cliente a través del `localStorage` del navegador.

---

## Características Principales e Ingeniería

Este sistema destaca por implementar patrones avanzados de usabilidad y diseño técnico:

### 1. Sistema CRUD y Edición de Estados
*   **Formulario Dinámico:** Selección integrada del tipo de elemento y autocompletado inteligente conforme el usuario escribe.
*   **Clasificación Localizada:** Selector de estados de consumo con terminología contextualizada al tipo de recurso:
    *   *Películas/Series:* Visto, Viendo, Por ver, Abandonado.
    *   *Libros:* Leído, Leyendo, Por leer, Abandonado.
    *   *Música:* Escuchado, Escuchando, Por escuchar, Abandonado.
*   **Edición y Eliminación en Detalle:** Edición instantánea del estado de consumo desde el modal de detalles del elemento y botón de borrado de recursos integrado en el pie, solucionando las limitaciones de pantallas móviles (donde no existe la acción de *hover*).

### 2. Notificaciones Propias del Sistema (Purga de Componentes Nativos)
*   **Toast Alert System:** Componente modular que muestra notificaciones temporizadas deslizables desde la parte superior central de la ventana, con temporizador de desvanecimiento automático (4 segundos).
*   **System Confirmation Overlays:** Caja de diálogo modular que reemplaza al clásico `confirm()` del navegador por un modal nativo estilizado en escala de grises con fondo translúcido y botones de rechazo/aceptación.

### 3. Red Social Simulada y Algoritmo de Afinidad
*   **Grafo de Amistad Bidireccional:** Lógica en Javascript para establecer relaciones de amistad mutua en localStorage, soportando el ciclo de vida de una solicitud: Enviar, Recibir, Cancelar Solicitud, Aceptar e Ignorar.
*   **Menú de Solicitudes Centrado:** Campanita de alertas en la barra de navegación con indicador verde flotante. El contenedor se centra automáticamente en móviles (`fixed` centrado en viewport) y se comporta como popover lateral en monitores de escritorio.
*   **Navegación de Amigos:** Lista interactiva de amigos en el perfil del usuario. Dar clic en el badge de un amigo te redirige a su biblioteca personal de forma instantánea.
*   **Taste Affinity index:** Algoritmo que compara la biblioteca del perfil seleccionado contra tu biblioteca personal. Devuelve un porcentaje matemático de coincidencia de gustos basado en categorías, títulos y géneros compartidos.

### 4. Seguridad de Cuentas (Auth)
*   **Registro Avanzado:** Validador con requerimientos de complejidad en contraseñas (mínimo de 3 caracteres, al menos una letra mayúscula y al menos un número).
*   **Visualizador de Contraseñas:** Campo de contraseña equipado con un alternador dinámico de visibilidad (icono del ojo en formato SVG) para mejorar la usabilidad al ingresar o registrarte.

### 5. Control de Desplazamientos (Background Scroll Lock)
*   *Scroll Lock* inteligente implementado en la raíz de los componentes. Al abrir cualquier modal (detalles, agregar elemento o confirmaciones), se inyecta la directiva `overflow-hidden` al cuerpo de la página, congelando el fondo trasero y habilitando el scroll únicamente dentro de la ventana activa para evitar la sobre-navegación.

---

## Instalación y Uso Local

1.  **Instalar dependencias:**
    Asegúrate de estar en el directorio raíz de la aplicación y ejecuta:
    ```bash
    cd mi-lista-app
    npm install
    ```

2.  **Iniciar el entorno de desarrollo:**
    Ejecuta el servidor de desarrollo local de Vite:
    ```bash
    npm run dev
    ```

3.  **Compilar para producción:**
    Genera el empaquetado final optimizado (HTML, CSS y JS compilado):
    ```bash
    npm run build
    ```
