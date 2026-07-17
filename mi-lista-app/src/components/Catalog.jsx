import React, { useState } from 'react';
import ItemCard from './ItemCard';

const getFilterLabels = (section) => {
  if (section === 'libros') {
    return {
      completado: 'Leídos',
      en_progreso: 'Leyendo',
      pendiente: 'Por leer'
    };
  }
  if (section === 'musica') {
    return {
      completado: 'Escuchados',
      en_progreso: 'Escuchando',
      pendiente: 'Por escuchar'
    };
  }
  return {
    completado: 'Vistos',
    en_progreso: 'Viendo',
    pendiente: 'Por ver'
  };
};

export default function Catalog({
  activeSection,
  selectedProfile,
  currentUser,
  catalogItems,
  onDeleteItem,
  onSelectItem,
  searchTerm,
  genresMap
}) {
  const [statusFilter, setStatusFilter] = useState('todos');

  // Reset status filter if active section changes
  React.useEffect(() => {
    setStatusFilter('todos');
  }, [activeSection]);
  
  // Section identifier mapper (from database type to view section)
  const mapSectionToType = {
    series: 'serie',
    peliculas: 'pelicula',
    libros: 'libro',
    musica: 'musica'
  };

  const targetType = mapSectionToType[activeSection] || 'serie';

  // Filter items matching section, status & search term
  const filteredItems = catalogItems.filter((item) => {
    // 1. Filter by section type
    if (item.tipo !== targetType) return false;

    // 2. Filter by status selection
    const itemStatus = item.estado || 'completado';
    if (statusFilter !== 'todos' && itemStatus !== statusFilter) return false;

    // 3. Filter by search input query
    const query = searchTerm.toLowerCase().trim();
    if (!query) return true;

    // Match title
    if (item.titulo && item.titulo.toLowerCase().includes(query)) return true;

    // Match type/category
    if (item.tipo && item.tipo.toLowerCase().includes(query)) return true;

    // Match actors (movies/tv)
    if (item.tmdb && Array.isArray(item.tmdb.actores) && item.tmdb.actores.join(' ').toLowerCase().includes(query)) return true;

    // Match author (books)
    if (item.ol && item.ol.author && item.ol.author.toLowerCase().includes(query)) return true;

    // Match artist (music)
    if (item.mb && item.mb.artist && item.mb.artist.toLowerCase().includes(query)) return true;

    // Match genres (movies/tv)
    if (item.tmdb && item.tmdb.genre_ids && Array.isArray(item.tmdb.genre_ids)) {
      for (const id of item.tmdb.genre_ids) {
        const genreName = (genresMap[id] || '').toLowerCase();
        if (genreName.includes(query)) return true;
      }
    }

    return false;
  });

  const canDelete = selectedProfile === currentUser;
  const labels = getFilterLabels(activeSection);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
      
      {/* Catalog Title & Stats */}
      <div className="flex justify-between items-baseline mb-4 border-b border-[#2c3440] pb-3">
        <h2 className="text-xl font-bold tracking-tight text-white capitalize font-display">
          {activeSection}
        </h2>
        <span className="text-xs font-semibold text-[#667788] uppercase tracking-wider">
          {filteredItems.length} {filteredItems.length === 1 ? 'elemento' : 'elementos'}
        </span>
      </div>

      {/* Horizontal Status Filter Bar */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { key: 'todos', label: 'Todos' },
          { key: 'completado', label: labels.completado },
          { key: 'en_progreso', label: labels.en_progreso },
          { key: 'pendiente', label: labels.pendiente },
          { key: 'abandonado', label: 'Abandonados' }
        ].map((filter) => {
          const isActive = statusFilter === filter.key;
          return (
            <button
              key={filter.key}
              onClick={() => setStatusFilter(filter.key)}
              className={`px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider rounded-full border transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#00e054] text-[#14181c] border-transparent'
                  : 'bg-transparent border-[#2c3440] text-[#9ab] hover:text-white hover:border-[#445566]'
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* Grid List */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredItems.map((item, index) => (
            <ItemCard
              key={`${item.tipo}-${item.titulo}-${index}`}
              item={item}
              canDelete={canDelete}
              onDelete={onDeleteItem}
              onSelect={onSelectItem}
              genresMap={genresMap}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 px-4 bg-[#1c252d]/30 border border-dashed border-[#2c3440] rounded-xl">
          <svg className="w-12 h-12 text-[#445566] mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-lg font-bold text-white mb-1 font-display">
            No se encontraron resultados
          </h3>
          <p className="text-sm text-[#9ab] text-center max-w-sm">
            {searchTerm || statusFilter !== 'todos'
              ? 'No hallamos coincidencias para los filtros aplicados.'
              : `Aún no hay elementos guardados en la sección de ${activeSection} para este perfil.`}
          </p>
        </div>
      )}

    </div>
  );
}
