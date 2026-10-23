import React, { useEffect, useState } from 'react';

const MAX_AVATARS = 4;

// Amigos en una sola línea (avatares superpuestos) que abre un panel con la lista completa.
// Así el perfil ocupa lo mismo con 2 amigos que con 200.
export default function FriendsPreview({ friends, getAvatarUrl, userListings, affinityWith, onOpenProfile, onRemoveFriend }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  // Mientras el panel está abierto la página de fondo no se desplaza; Escape lo cierra
  useEffect(() => {
    if (!open) return undefined;
    const handleKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    document.body.classList.add('overflow-hidden');
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.classList.remove('overflow-hidden');
    };
  }, [open]);

  if (friends.length === 0) {
    return <p className="text-xs text-[#8f877c]">Todavía no tienes amigos agregados.</p>;
  }

  const visible = friends.slice(0, MAX_AVATARS);
  const extra = friends.length - visible.length;
  const filtered = friends.filter((f) => f.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex items-center gap-3 rounded-xl -ml-1 px-1 py-1 hover:bg-[#2a2724]/60 transition cursor-pointer"
        aria-label={`Ver tus ${friends.length} amigos`}
      >
        <span className="flex -space-x-2.5">
          {visible.map((friend) => (
            <img
              key={friend}
              src={getAvatarUrl(friend)}
              alt=""
              className="w-8 h-8 rounded-full border-2 border-[#1c1a18] bg-[#2a2724] object-cover"
            />
          ))}
          {extra > 0 && (
            <span className="w-8 h-8 rounded-full border-2 border-[#1c1a18] bg-[#2a2724] text-[10px] font-semibold text-[#efe8dc] flex items-center justify-center">
              +{extra}
            </span>
          )}
        </span>
        <span className="text-sm text-[#bdb5a9] group-hover:text-[#efe8dc] transition-colors">
          <strong className="font-semibold text-[#efe8dc]">{friends.length}</strong> {friends.length === 1 ? 'amigo' : 'amigos'}
        </span>
        <svg className="w-4 h-4 text-[#8f877c] group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm sm:p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Tus amigos"
            className="w-full sm:max-w-md max-h-[85vh] flex flex-col bg-[#1c1a18] border border-[#2a2724] rounded-t-2xl sm:rounded-2xl shadow-2xl shadow-black/60"
          >
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <h3 className="font-display text-xl font-medium text-[#efe8dc]">
                Tus amigos <span className="text-[#8f877c] text-base">· {friends.length}</span>
              </h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="p-1.5 rounded-full text-[#8f877c] hover:text-[#efe8dc] hover:bg-[#2a2724] transition cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {friends.length > 6 && (
              <div className="px-5 pb-3">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar amigo…"
                  autoFocus
                  className="w-full px-4 py-2 bg-[#131211] border border-[#2a2724] rounded-full text-sm text-[#efe8dc] placeholder-[#8f877c] focus:outline-none focus:border-[#4a4540]"
                />
              </div>
            )}

            <ul className="flex-1 overflow-y-auto scrollbar-thin px-3 pb-4">
              {filtered.map((friend) => {
                const count = (userListings[friend] || []).length;
                return (
                  <li key={friend} className="flex items-center gap-3 rounded-xl px-2 py-2.5 hover:bg-[#2a2724]/60 transition-colors">
                    <img src={getAvatarUrl(friend)} alt="" className="w-10 h-10 rounded-full bg-[#2a2724] object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#efe8dc] truncate">{friend}</p>
                      <p className="text-xs text-[#8f877c]">
                        {count === 0 ? (
                          'Todavía no agrega títulos'
                        ) : (
                          <>
                            {count} {count === 1 ? 'título' : 'títulos'} · <span className="text-[#e8a33d]">{affinityWith(friend)}% afinidad</span>
                          </>
                        )}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        onOpenProfile(friend);
                      }}
                      className="px-3 py-1.5 text-xs font-medium rounded-full bg-[#efe8dc] text-[#131211] hover:bg-white transition cursor-pointer"
                    >
                      Ver lista
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveFriend(friend)}
                      title={`Eliminar a ${friend} de tus amigos`}
                      aria-label={`Eliminar a ${friend} de tus amigos`}
                      className="p-1.5 rounded-full text-[#8f877c] hover:text-[#d08a8a] hover:bg-[#2a2724] transition cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                      </svg>
                    </button>
                  </li>
                );
              })}
              {filtered.length === 0 && (
                <li className="py-8 text-center text-sm text-[#8f877c]">Ningún amigo coincide con “{query}”.</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
