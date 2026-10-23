// Clave pública de TMDB (API v3), usada desde el navegador para buscar películas y series.
// En una app sin servidor no se puede ocultar: cualquiera la ve en el código que descarga el navegador.
// Para protegerla de verdad habría que pasar las búsquedas por una función de servidor (por ejemplo en Vercel).
export const TMDB_API_KEY = 'e7fc358f1fb84ae5a56fda2f30e11a30';
