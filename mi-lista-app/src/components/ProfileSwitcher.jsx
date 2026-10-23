import React, { useEffect, useRef, useState } from 'react';

// Selector de perfiles con el estilo de la app (la lista nativa del navegador no se puede estilizar).
// Se maneja también con el teclado: flechas para moverse, Enter para elegir y Escape para cerrar.
export default function ProfileSwitcher({ users, currentUser, selected, friends = [], onChange, getAvatarUrl }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapperRef = useRef(null);
  const listRef = useRef(null);

  // Tu cuenta primero, después tus amigos y al final el resto
  const rank = (user) => (user === currentUser ? 0 : friends.includes(user) ? 1 : 2);
  const ordered = [...users].sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mantiene visible la opción marcada al moverse con el teclado
  useEffect(() => {
    if (open && listRef.current && listRef.current.children[active]) {
      listRef.current.children[active].scrollIntoView({ block: 'nearest' });
    }
  }, [active, open]);

  const openMenu = () => {
    setActive(Math.max(0, ordered.indexOf(selected)));
    setOpen(true);
  };

  const choose = (user) => {
    onChange(user);
    setOpen(false);
  };

  const handleKeyDown = (e) => {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        openMenu();
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (i + 1) % ordered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (i - 1 + ordered.length) % ordered.length);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      choose(ordered[active]);
    } else if (e.key === 'Escape' || e.key === 'Tab') {
      setOpen(false);
    }
  };

  const tag = (text) => (
    <span className="shrink-0 px-1.5 py-0.5 text-[10px] font-medium rounded-md bg-[#2a2724] text-[#bdb5a9]">{text}</span>
  );

  return (
    <div ref={wrapperRef} className="relative w-full sm:w-60">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Ver perfil: ${selected}`}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={handleKeyDown}
        className={`w-full flex items-center gap-2.5 rounded-xl border bg-[#131211]/60 px-2.5 py-2 text-left transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8a33d]/50 ${
          open ? 'border-[#4a4540]' : 'border-[#2a2724] hover:border-[#4a4540]'
        }`}
      >
        <img src={getAvatarUrl(selected)} alt="" className="w-8 h-8 rounded-lg bg-[#2a2724] object-cover" />
        <span className="flex-1 min-w-0">
          <span className="block text-[10px] text-[#8f877c] leading-tight">Ver perfil</span>
          <span className="block text-sm font-semibold text-[#efe8dc] truncate leading-tight">{selected}</span>
        </span>
        <svg
          className={`w-4 h-4 text-[#8f877c] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          aria-label="Perfiles"
          className="absolute right-0 z-30 mt-2 w-full max-h-72 overflow-y-auto scrollbar-thin rounded-xl border border-[#2a2724] bg-[#1c1a18] p-1.5 shadow-2xl shadow-black/60"
        >
          {ordered.map((user, index) => {
            const isSelected = user === selected;
            return (
              <li
                key={user}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActive(index)}
                onClick={() => choose(user)}
                className={`flex items-center gap-2.5 rounded-lg px-2 py-2 cursor-pointer transition-colors ${
                  index === active ? 'bg-[#2a2724]' : ''
                }`}
              >
                <img src={getAvatarUrl(user)} alt="" className="w-7 h-7 rounded-lg bg-[#131211] object-cover" />
                <span className={`flex-1 min-w-0 truncate text-sm ${isSelected ? 'text-[#efe8dc] font-semibold' : 'text-[#bdb5a9]'}`}>
                  {user}
                </span>
                {user === currentUser && tag('Tú')}
                {friends.includes(user) && tag('Amigo')}
                <svg
                  className={`w-4 h-4 shrink-0 text-[#e8a33d] ${isSelected ? '' : 'invisible'}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
