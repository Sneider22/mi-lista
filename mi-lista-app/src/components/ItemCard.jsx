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

// Color de cada estado (mismos tonos que en el resto de la app)
const STATUS_COLORS = {
  completado: '#9cc5a1',
  en_progreso: '#e8a33d',
  pendiente: '#9db0d1',
  abandonado: '#d08a8a'
};

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
        <svg className="w-10 h-10 text-[#4a4540] mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      );
    }
    if (isMovie) {
      return (
        <svg className="w-10 h-10 text-[#4a4540] mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6h16.5M3.75 12h16.5M3.75 18h16.5M9 3.75v16.5M15 3.75v16.5" />
        </svg>
      );
    }
    if (isMusic) {
      return (
        <svg className="w-10 h-10 text-[#4a4540] mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      );
    }
    return (
      <svg className="w-10 h-10 text-[#4a4540] mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 2.25h12A2.25 2.25 0 0120.25 4.5v10.5a2.25 2.25 0 01-2.25 2.25h-1.5l-3 3-3-3H6A2.25 2.25 0 013.75 15V4.5A2.25 2.25 0 016 2.25z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h7.5M8.25 10.5h7.5" />
      </svg>
    );
  };

  const statusColor = STATUS_COLORS[statusKey] || STATUS_COLORS.completado;
  const subtitle = [year, isBook || isMusic ? detailValue : ''].filter(Boolean).join(' · ');
  const typeLabel = isMovie ? 'Película' : isTV ? 'Serie' : isBook ? 'Libro' : 'Música';

  return (
    <article onClick={() => onSelect(item)} className="group cursor-pointer min-w-0">
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-[#2a2724] ring-1 ring-white/5 shadow-lg shadow-black/40 transition duration-300 group-hover:-translate-y-1 group-hover:ring-[#e8a33d]/50">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={item.titulo}
            className="w-full h-full object-cover bg-[#131211]"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#2a2724] to-[#131211] flex flex-col items-center justify-center gap-3 p-4 text-center">
            {renderPlaceholderIcon()}
            <span className="text-[11px] text-[#8f877c]">{typeLabel}</span>
          </div>
        )}

        {/* Estado de consumo */}
        <span className="absolute left-2 top-2 inline-flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur-sm px-2 py-1 text-[10px] font-medium text-[#efe8dc]">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: statusColor }} />
          {statusLabel}
        </span>

        {/* Más información al pasar el mouse (solo en pantallas grandes) */}
        <div className="absolute inset-0 hidden md:flex flex-col justify-end gap-2 bg-gradient-to-t from-black via-black/80 to-black/10 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {canDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(item);
              }}
              title="Eliminar de mi catálogo"
              className="absolute right-2 top-2 p-1.5 rounded-full bg-black/70 text-[#efe8dc] hover:bg-[#d08a8a] hover:text-[#131211] transition cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
          {genres.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {genres.slice(0, 2).map((g) => (
                <span key={g} className="px-1.5 py-0.5 text-[10px] rounded-md bg-white/10 text-[#efe8dc]">
                  {g}
                </span>
              ))}
            </div>
          )}
          {overview && <p className="text-[11px] leading-relaxed text-[#d9d1c4] line-clamp-4">{overview}</p>}
          {!overview && detailValue && (
            <p className="text-[11px] text-[#d9d1c4] line-clamp-3">
              <span className="text-[#8f877c]">{detailLabel}: </span>{detailValue}
            </p>
          )}
        </div>
      </div>

      <div className="mt-2.5 px-0.5">
        <h4 className="font-display text-[15px] leading-snug text-[#efe8dc] line-clamp-2 group-hover:text-[#f2b95c] transition-colors">
          {item.titulo}
        </h4>
        {subtitle && <p className="mt-0.5 text-xs text-[#8f877c] truncate">{subtitle}</p>}
      </div>
    </article>
  );
}
