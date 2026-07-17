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

export default function ItemCard({ item, canDelete, onDelete, onSelect, genresMap }) {
  const isBook = item.tipo === 'libro';
  const isMovie = item.tipo === 'pelicula';
  const isTV = item.tipo === 'serie';
  const isMusic = item.tipo === 'musica';

  let posterUrl = '';
  let year = '';
  let detailLabel = '';
  let detailValue = '';
  let overview = '';
  let genres = [];

  if (isMovie && item.tmdb) {
    posterUrl = item.tmdb.poster_path
      ? `https://image.tmdb.org/t/p/w300${item.tmdb.poster_path}`
      : '';
    year = item.tmdb.release_date ? item.tmdb.release_date.slice(0, 4) : '';
    detailLabel = 'Actores';
    detailValue = item.tmdb.actores ? item.tmdb.actores.join(', ') : '';
    overview = item.tmdb.overview || '';
    genres = item.tmdb.genre_ids
      ? item.tmdb.genre_ids.map((id) => genresMap[id] || 'Otro')
      : [];
  } else if (isTV && item.tmdb) {
    posterUrl = item.tmdb.poster_path
      ? `https://image.tmdb.org/t/p/w300${item.tmdb.poster_path}`
      : '';
    year = item.tmdb.first_air_date ? item.tmdb.first_air_date.slice(0, 4) : '';
    detailLabel = 'Actores';
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
    detailLabel = 'Artista';
    detailValue = item.mb.artist || '';
  }

  const statusKey = item.estado || 'completado';
  const statusLabel = getStatusLabel(statusKey, item.tipo);

  // Icons for empty card placeholders (no emojis)
  const renderPlaceholderIcon = () => {
    if (isBook) {
      return (
        <svg className="w-10 h-10 text-[#445566] mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      );
    }
    if (isMovie) {
      return (
        <svg className="w-10 h-10 text-[#445566] mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6h16.5M3.75 12h16.5M3.75 18h16.5M9 3.75v16.5M15 3.75v16.5" />
        </svg>
      );
    }
    if (isMusic) {
      return (
        <svg className="w-10 h-10 text-[#445566] mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      );
    }
    return (
      <svg className="w-10 h-10 text-[#445566] mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 2.25h12A2.25 2.25 0 0120.25 4.5v10.5a2.25 2.25 0 01-2.25 2.25h-1.5l-3 3-3-3H6A2.25 2.25 0 013.75 15V4.5A2.25 2.25 0 016 2.25z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h7.5M8.25 10.5h7.5" />
      </svg>
    );
  };

  return (
    <div
      onClick={() => onSelect(item)}
      className="relative group aspect-[2/3] w-full rounded-lg overflow-hidden bg-[#2c3440] border border-[#445566]/30 shadow-md hover:border-[#00e054] hover:shadow-lg hover:shadow-[#00e054]/5 transition-all duration-300 cursor-pointer"
    >
      
      {/* Poster Image / Cover */}
      {posterUrl ? (
        <img
          src={posterUrl}
          alt={item.titulo}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 bg-[#14181c]"
          loading="lazy"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      ) : (
        /* Dynamic placeholder gradient if no poster */
        <div className="w-full h-full bg-gradient-to-br from-[#1c252d] via-[#2c3440] to-[#14181c] flex flex-col justify-between p-4 text-center">
          <div className="mt-8">
            {renderPlaceholderIcon()}
          </div>
          <span className="font-display font-extrabold text-sm text-white line-clamp-3">
            {item.titulo}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-[#667788] font-bold">
            {isMovie ? 'Película' : isTV ? 'Serie' : isBook ? 'Libro' : 'Música'}
          </span>
        </div>
      )}

      {/* Modern Hover Overlay */}
      <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-10">
        
        {/* Top: Delete action & Title info */}
        <div>
          <div className="flex justify-between items-start mb-2">
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] font-bold text-[#40bcf4] bg-[#40bcf4]/10 border border-[#40bcf4]/20 px-2 py-0.5 rounded uppercase tracking-wider self-start">
                {isMovie ? 'Película' : isTV ? 'Serie' : isBook ? 'Libro' : 'Música'}
              </span>
              <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider self-start border ${
                statusKey === 'completado' 
                  ? 'text-[#00e054] bg-[#00e054]/10 border-[#00e054]/20' 
                  : statusKey === 'en_progreso'
                  ? 'text-[#40bcf4] bg-[#40bcf4]/10 border-[#40bcf4]/20'
                  : statusKey === 'pendiente'
                  ? 'text-slate-400 bg-slate-400/10 border-slate-400/20'
                  : 'text-rose-500 bg-rose-500/10 border-rose-500/20'
              }`}>
                {statusLabel}
              </span>
            </div>
            {canDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item);
                }}
                title="Eliminar de mi catálogo"
                className="p-1.5 rounded bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white border border-rose-500/20 active:scale-90 transition-all cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>

          <h4 className="font-display font-bold text-white text-sm leading-snug line-clamp-2">
            {item.titulo} {year && <span className="text-xs text-[#9ab] font-normal">({year})</span>}
          </h4>

          {/* Genres (for Movies/TV) */}
          {genres.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {genres.slice(0, 2).map((g) => (
                <span
                  key={g}
                  className="px-1.5 py-0.5 text-[9px] font-bold border rounded border-[#445566]/60 text-[#9ab] bg-[#1c252d]"
                >
                  {g}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Middle/Bottom: Overview or Author/Actors */}
        <div className="space-y-2 mt-2 flex-grow overflow-hidden flex flex-col justify-end">
          {overview && (
            <p className="text-[11px] text-[#9ab] leading-relaxed line-clamp-3 italic">
              "{overview}"
            </p>
          )}

          {detailValue && (
            <div className="text-[10px] text-white border-t border-[#445566]/20 pt-2">
              <span className="font-bold text-[#667788] uppercase tracking-wider block text-[8px]">
                {detailLabel}
              </span>
              <p className="text-[#def] line-clamp-2">{detailValue}</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
