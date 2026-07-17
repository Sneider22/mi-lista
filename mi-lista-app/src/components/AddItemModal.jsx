import React, { useState, useEffect, useRef } from 'react';

const TMDB_API_KEY = 'e7fc358f1fb84ae5a56fda2f30e11a30';

export default function AddItemModal({ isOpen, onClose, onAddItem, currentCatalog, showToast }) {
  const [tipo, setTipo] = useState('');
  const [titulo, setTitulo] = useState('');
  const [estado, setEstado] = useState('completado');
  const [suggestions, setSuggestions] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  // Cached API metadata for the selected item
  const selectedItemMeta = useRef(null);
  const actorsMeta = useRef([]);
  const menuRef = useRef(null);

  // Clear states when type changes
  useEffect(() => {
    setTitulo('');
    setSuggestions([]);
    setShowMenu(false);
    setEstado('completado');
    selectedItemMeta.current = null;
    actorsMeta.current = [];
  }, [tipo]);

  // Handle outside clicks to close autocomplete menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch autocomplete suggestions as user types
  const handleInputChange = async (e) => {
    const query = e.target.value;
    setTitulo(query);
    selectedItemMeta.current = null; // Reset selection on edit
    actorsMeta.current = [];

    if (!tipo || query.trim().length < 2) {
      setSuggestions([]);
      setShowMenu(false);
      return;
    }

    setLoading(true);
    try {
      if (tipo === 'pelicula') {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=es-ES&query=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        if (data.results) {
          setSuggestions(data.results.slice(0, 10));
          setShowMenu(true);
        }
      } else if (tipo === 'serie') {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/tv?api_key=${TMDB_API_KEY}&language=es-ES&query=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        if (data.results) {
          setSuggestions(data.results.slice(0, 10));
          setShowMenu(true);
        }
      } else if (tipo === 'libro') {
        const res = await fetch(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`
        );
        const data = await res.json();
        if (data.docs) {
          setSuggestions(data.docs.slice(0, 10));
          setShowMenu(true);
        }
      } else if (tipo === 'musica') {
        const res = await fetch(
          `https://musicbrainz.org/ws/2/release/?query=release:${encodeURIComponent(query)}&fmt=json`
        );
        const data = await res.json();
        if (data.releases) {
          setSuggestions(data.releases.slice(0, 10));
          setShowMenu(true);
        }
      }
    } catch (err) {
      console.error('Error fetching suggestions:', err);
    } finally {
      setLoading(false);
    }
  };

  // When suggestion is clicked
  const handleSelectSuggestion = async (item) => {
    setShowMenu(false);
    
    if (tipo === 'pelicula') {
      const displayTitle = item.title;
      setTitulo(displayTitle);
      selectedItemMeta.current = item;
      
      // Fetch actors
      try {
        const creditRes = await fetch(
          `https://api.themoviedb.org/3/movie/${item.id}/credits?api_key=${TMDB_API_KEY}&language=es-ES`
        );
        const creditData = await creditRes.json();
        if (creditData.cast) {
          actorsMeta.current = creditData.cast.slice(0, 3).map((a) => a.name);
        }
      } catch (err) {
        console.error('Error fetching movie credits:', err);
      }
    } 
    
    else if (tipo === 'serie') {
      const displayTitle = item.name;
      setTitulo(displayTitle);
      selectedItemMeta.current = item;
      
      // Fetch actors
      try {
        const creditRes = await fetch(
          `https://api.themoviedb.org/3/tv/${item.id}/credits?api_key=${TMDB_API_KEY}&language=es-ES`
        );
        const creditData = await creditRes.json();
        if (creditData.cast) {
          actorsMeta.current = creditData.cast.slice(0, 3).map((a) => a.name);
        }
      } catch (err) {
        console.error('Error fetching TV credits:', err);
      }
    } 
    
    else if (tipo === 'libro') {
      const displayTitle = item.title;
      setTitulo(displayTitle);
      selectedItemMeta.current = item;
    }

    else if (tipo === 'musica') {
      const displayTitle = item.title;
      setTitulo(displayTitle);
      selectedItemMeta.current = item;
    }
  };

  // Form submit to save
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tipo || !titulo.trim()) return;

    // Validate duplicate
    const cleanTitle = titulo.trim().toLowerCase();
    const yaExiste = currentCatalog.some(
      (item) => item.tipo === tipo && item.titulo.trim().toLowerCase() === cleanTitle
    );

    if (yaExiste) {
      if (showToast) {
        showToast('Este elemento ya está en tu catálogo');
      }
      return;
    }

    const newItem = {
      titulo: titulo.trim(),
      tipo,
      estado
    };

    const meta = selectedItemMeta.current;

    // Attach TMDB metadata for Movies
    if (tipo === 'pelicula' && meta) {
      newItem.tmdb = {
        id: meta.id,
        title: meta.title,
        original_title: meta.original_title,
        release_date: meta.release_date,
        overview: meta.overview,
        poster_path: meta.poster_path,
        genre_ids: meta.genre_ids,
        actores: actorsMeta.current
      };
    }

    // Attach TMDB metadata for Series
    if (tipo === 'serie' && meta) {
      newItem.tmdb = {
        id: meta.id,
        name: meta.name,
        original_name: meta.original_name,
        first_air_date: meta.first_air_date,
        overview: meta.overview,
        poster_path: meta.poster_path,
        genre_ids: meta.genre_ids,
        actores: actorsMeta.current
      };
    }

    // Attach OpenLibrary metadata for Books
    if (tipo === 'libro' && meta) {
      newItem.ol = {
        title: meta.title,
        author: meta.author_name ? meta.author_name[0] : '',
        year: meta.first_publish_year,
        cover: meta.cover_i
          ? `https://covers.openlibrary.org/b/id/${meta.cover_i}-M.jpg`
          : ''
      };
    }

    // Attach MusicBrainz metadata for Music
    if (tipo === 'musica' && meta) {
      newItem.mb = {
        id: meta.id,
        title: meta.title,
        artist: meta['artist-credit'] ? meta['artist-credit'][0].name : 'Artista Desconocido',
        year: meta.date ? meta.date.slice(0, 4) : '',
        cover: `https://coverartarchive.org/release/${meta.id}/front-250`
      };
    }

    // Send item to parent callback
    onAddItem(newItem);
    if (showToast) {
      showToast('Elemento agregado correctamente');
    }

    // Reset and Close
    setTipo('');
    setTitulo('');
    setEstado('completado');
    selectedItemMeta.current = null;
    actorsMeta.current = [];
    onClose();
  };

  const getCompletadoLabel = () => {
    if (tipo === 'libro') return 'Leído';
    if (tipo === 'musica') return 'Escuchado';
    return 'Visto';
  };

  const getEnProgresoLabel = () => {
    if (tipo === 'libro') return 'Leyendo';
    if (tipo === 'musica') return 'Escuchando';
    return 'Viendo';
  };

  const getPendienteLabel = () => {
    if (tipo === 'libro') return 'Por leer';
    if (tipo === 'musica') return 'Por escuchar';
    return 'Por ver';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm transition-all duration-300">
      <div className="w-full max-w-lg p-6 bg-[#1c252d] border border-[#2c3440] rounded-xl shadow-2xl relative">
        
        {/* Close Button (SVG instead of emoji) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#9ab] hover:text-white transition-colors p-1.5 rounded-full hover:bg-[#2c3440] cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-6 text-center font-display border-b border-[#2c3440] pb-3">
          Agregar a tu lista
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Item Type Selector */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#667788] mb-2">
              Tipo de elemento
            </label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#2c3440] border border-[#445566] rounded text-white text-xs font-semibold focus:outline-none focus:border-[#00e054] focus:ring-1 focus:ring-[#00e054] cursor-pointer transition"
              required
            >
              <option value="" className="text-[#667788]">Seleccionar categoría</option>
              <option value="serie">Serie</option>
              <option value="pelicula">Película</option>
              <option value="libro">Libro</option>
              <option value="musica">Música (Álbum / Single)</option>
            </select>
          </div>

          {/* Title Input & Autocomplete Dropdown */}
          <div className="relative" ref={menuRef}>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#667788] mb-2">
              Título
            </label>
            <div className="relative">
              <input
                type="text"
                value={titulo}
                onChange={handleInputChange}
                disabled={!tipo}
                className="w-full px-4 py-2.5 bg-[#2c3440] border border-[#445566] rounded text-white text-xs focus:outline-none focus:border-[#00e054] focus:ring-1 focus:ring-[#00e054] disabled:opacity-40 transition"
                placeholder={tipo ? `Buscar por título...` : 'Debe seleccionar un tipo de elemento'}
                required
              />
              {loading && (
                <div className="absolute right-3 top-2 flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-[#00e054]" />
                </div>
              )}
            </div>

            {/* Suggestions list */}
            {showMenu && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 mt-1.5 max-h-60 overflow-y-auto bg-[#2c3440] border border-[#445566] rounded shadow-xl z-50">
                {suggestions.map((item) => {
                  let text = '';
                  let key = '';
                  if (tipo === 'pelicula') {
                    key = `m-${item.id}`;
                    text = `${item.title} ${
                      item.release_date ? '(' + item.release_date.slice(0, 4) + ')' : ''
                    }`;
                  } else if (tipo === 'serie') {
                    key = `s-${item.id}`;
                    text = `${item.name} ${
                      item.first_air_date ? '(' + item.first_air_date.slice(0, 4) + ')' : ''
                    }`;
                  } else if (tipo === 'libro') {
                    key = `b-${item.key || item.cover_i}`;
                    text = `${item.title} ${
                      item.author_name ? ' - ' + item.author_name[0] : ''
                    }`;
                  } else if (tipo === 'musica') {
                    key = `mu-${item.id}`;
                    const artistName = item['artist-credit'] ? item['artist-credit'][0].name : 'Artista Desconocido';
                    text = `${item.title} - ${artistName} ${item.date ? '(' + item.date.slice(0,4) + ')' : ''}`;
                  }
                  return (
                    <div
                      key={key}
                      onClick={() => handleSelectSuggestion(item)}
                      className="px-4 py-2.5 text-xs text-white hover:bg-[#00e054]/10 hover:text-[#00e054] border-b border-[#445566]/20 last:border-b-0 cursor-pointer transition-colors"
                    >
                      {text}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Item State Selector */}
          {tipo && (
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#667788] mb-2">
                Estado inicial en catálogo
              </label>
              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#2c3440] border border-[#445566] rounded text-white text-xs font-semibold focus:outline-none focus:border-[#00e054] focus:ring-1 focus:ring-[#00e054] cursor-pointer transition"
              >
                <option value="completado">Completado ({getCompletadoLabel()})</option>
                <option value="en_progreso">En Progreso ({getEnProgresoLabel()})</option>
                <option value="pendiente">Pendiente ({getPendienteLabel()})</option>
                <option value="abandonado">Abandonado</option>
              </select>
            </div>
          )}

          {/* Success indicator (SVG instead of emoji) */}
          {selectedItemMeta.current && (
            <div className="flex items-center gap-2 p-2.5 bg-[#00e054]/10 border border-[#00e054]/20 rounded text-center justify-center text-[10px] font-bold text-[#00e054] uppercase tracking-wider">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span>Metadatos vinculados correctamente</span>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex gap-3 pt-3">
            <button
              type="submit"
              className="flex-1 py-2.5 font-bold uppercase tracking-wider text-xs text-[#14181c] bg-[#00e054] hover:bg-[#00c048] rounded transition-all cursor-pointer"
            >
              Agregar
            </button>
            <button
              type="button"
              onClick={() => {
                setTipo('');
                setTitulo('');
                setEstado('completado');
                onClose();
              }}
              className="flex-1 py-2.5 font-bold uppercase tracking-wider text-xs text-white bg-[#2c3440] hover:bg-[#3d4957] border border-[#445566]/60 rounded transition-all cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
