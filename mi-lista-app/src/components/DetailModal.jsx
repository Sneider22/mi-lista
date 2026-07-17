import React from 'react';

function getStatusLabel(status, type) {
  if (status === 'pendiente') {
    if (type === 'libro') return 'Por leer';
    if (type === 'musica') return 'Por escuchar';
    return 'Por ver';
  }
  if (status === 'en_progreso') {
    if (type === 'libro') return 'Leyendo';
    if (type === 'musica') return 'Escuchando';
    return 'Viendo';
  }
  if (status === 'completado') {
    if (type === 'libro') return 'Leído';
    if (type === 'musica') return 'Escuchado';
    return 'Visto';
  }
  if (status === 'abandonado') {
    return 'Abandonado';
  }
  return 'Visto';
}

export default function DetailModal({ item, isOpen, onClose, genresMap, canDelete, onDelete, onUpdateStatus }) {
  if (!isOpen || !item) return null;

  const isBook = item.tipo === 'libro';
  const isMovie = item.tipo === 'pelicula';
  const isTV = item.tipo === 'serie';
  const isMusic = item.tipo === 'musica';

  let posterUrl = '';
  let title = item.titulo;
  let originalTitle = '';
  let year = '';
  let detailLabel = '';
  let detailValue = '';
  let overview = '';
  let genres = [];

  if (isMovie && item.tmdb) {
    posterUrl = item.tmdb.poster_path
      ? `https://image.tmdb.org/t/p/w500${item.tmdb.poster_path}`
      : '';
    year = item.tmdb.release_date ? item.tmdb.release_date.slice(0, 4) : '';
    originalTitle = item.tmdb.original_title || '';
    detailLabel = 'Reparto Principal';
    detailValue = item.tmdb.actores ? item.tmdb.actores.join(', ') : '';
    overview = item.tmdb.overview || '';
    genres = item.tmdb.genre_ids
      ? item.tmdb.genre_ids.map((id) => genresMap[id] || 'Otro')
      : [];
  } else if (isTV && item.tmdb) {
    posterUrl = item.tmdb.poster_path
      ? `https://image.tmdb.org/t/p/w500${item.tmdb.poster_path}`
      : '';
    year = item.tmdb.first_air_date ? item.tmdb.first_air_date.slice(0, 4) : '';
    originalTitle = item.tmdb.original_name || '';
    detailLabel = 'Reparto Principal';
    detailValue = item.tmdb.actores ? item.tmdb.actores.join(', ') : '';
    overview = item.tmdb.overview || '';
    genres = item.tmdb.genre_ids
      ? item.tmdb.genre_ids.map((id) => genresMap[id] || 'Otro')
      : [];
  } else if (isBook && item.ol) {
    posterUrl = item.ol.cover || '';
    year = item.ol.year || '';
    detailLabel = 'Autor';
    detailValue = item.ol.author || '';
  } else if (isMusic && item.mb) {
    posterUrl = item.mb.cover || '';
    year = item.mb.year || '';
    originalTitle = '';
    detailLabel = 'Artista / Banda';
    detailValue = item.mb.artist || '';
    overview = '';
  }

  const currentStatus = item.estado || 'completado';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm transition-all duration-300">
      {/* Modal Card wrapper - constrained height and width */}
      <div className="w-full max-w-2xl bg-[#1c252d] border border-[#2c3440] rounded-xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row max-h-[85vh] md:max-h-[500px]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#9ab] hover:text-white transition-colors z-20 p-1.5 rounded-full bg-[#1c252d]/80 hover:bg-[#2c3440] border border-[#2c3440]"
          aria-label="Cerrar modal"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left column: Poster/Cover */}
        <div className="w-full md:w-5/12 h-48 md:h-auto bg-[#14181c] relative flex-shrink-0">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1c252d] to-[#14181c] flex flex-col items-center justify-center p-4 text-center">
              <svg className="w-8 h-8 text-[#445566] mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              <span className="text-[10px] uppercase tracking-widest text-[#667788] font-bold">
                Sin Imagen
              </span>
            </div>
          )}
        </div>

        {/* Right column: Details info - scrollable if content overflows */}
        <div className="w-full md:w-7/12 p-6 md:p-7 overflow-y-auto flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Header info */}
            <div>
              <span className="text-[9px] font-bold text-[#40bcf4] bg-[#40bcf4]/10 border border-[#40bcf4]/20 px-2 py-0.5 rounded uppercase tracking-widest">
                {item.tipo === 'pelicula' ? 'Película' : item.tipo === 'serie' ? 'Serie' : item.tipo === 'libro' ? 'Libro' : 'Música'}
              </span>
              <h3 className="font-display font-extrabold text-xl text-white mt-1.5 leading-snug truncate" title={title}>
                {title}
              </h3>
              {year && (
                <p className="text-xs font-semibold text-[#9ab] mt-0.5">
                  Lanzamiento: <span className="text-white">{year}</span>
                </p>
              )}
            </div>

            {/* Genres */}
            {genres.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {genres.map((g) => (
                  <span
                    key={g}
                    className="px-1.5 py-0.5 text-[10px] font-semibold border rounded border-[#445566]/60 text-[#9ab] bg-[#1c252d]"
                  >
                    {g}
                  </span>
                ))}
              </div>
            )}

            {/* Overview / Synopsis - Scrollable area to restrict size */}
            {overview && (
              <div className="space-y-1.5 border-t border-[#2c3440] pt-3">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#667788]">
                  Detalles
                </h4>
                <div className="max-h-24 overflow-y-auto pr-1 scrollbar-thin">
                  <p className="text-xs text-[#def] leading-relaxed">
                    {overview}
                  </p>
                </div>
              </div>
            )}

            {/* Metadata (Actors/Author/Artist) */}
            {detailValue && (
              <div className="space-y-1 border-t border-[#2c3440] pt-3">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#667788]">
                  {detailLabel}
                </h4>
                <p className="text-xs text-white truncate" title={detailValue}>
                  {detailValue}
                </p>
              </div>
            )}

            {/* Consume Status Toggle (only if own profile) */}
            {canDelete && onUpdateStatus && (
              <div className="space-y-1.5 border-t border-[#2c3440] pt-3">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#667788]">
                  Estado en tu biblioteca
                </h4>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {['completado', 'en_progreso', 'pendiente', 'abandonado'].map((statusKey) => {
                    const isActive = currentStatus === statusKey;
                    const label = getStatusLabel(statusKey, item.tipo);
                    
                    let activeClass = '';
                    if (statusKey === 'completado') activeClass = 'bg-[#00e054] text-[#14181c] border-transparent';
                    else if (statusKey === 'en_progreso') activeClass = 'bg-[#40bcf4] text-[#14181c] border-transparent';
                    else if (statusKey === 'pendiente') activeClass = 'bg-slate-400 text-[#14181c] border-transparent';
                    else if (statusKey === 'abandonado') activeClass = 'bg-rose-500 text-white border-transparent';

                    return (
                      <button
                        key={statusKey}
                        onClick={() => onUpdateStatus(item, statusKey)}
                        className={`px-2 py-1 text-[9px] font-bold rounded uppercase tracking-wider border transition-all cursor-pointer ${
                          isActive 
                            ? activeClass 
                            : 'bg-transparent border-[#445566]/60 text-[#9ab] hover:text-white hover:border-white'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

          {/* Footer note & Delete Action */}
          <div className="text-[9px] text-[#667788] border-t border-[#2c3440] pt-3 mt-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span>Catálogo Personal</span>
              <span className="text-[8px] text-[#445566] mt-0.5">ID: {item.mb?.id || item.tmdb?.id || item.ol?.year || 'Propio'}</span>
            </div>

            {canDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item);
                }}
                className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-rose-500 hover:text-white bg-rose-500/10 hover:bg-rose-600 border border-rose-500/20 hover:border-transparent rounded transition cursor-pointer flex items-center gap-1.5"
                title="Eliminar de mi lista"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Eliminar</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
