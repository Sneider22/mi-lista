import React, { useState, useRef, useEffect } from 'react';

export default function Navbar({
  activeUser,
  onLogout,
  activeSection,
  setActiveSection,
  searchTerm,
  setSearchTerm,
  pendingRequests = [],
  onAcceptRequest,
  onDeclineRequest
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  const sections = [
    { id: 'series', label: 'Series' },
    { id: 'peliculas', label: 'Películas' },
    { id: 'libros', label: 'Libros' },
    { id: 'musica', label: 'Música' }
  ];

  // Close notifications dropdown on clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-[#131211]/90 backdrop-blur-md border-b border-[#2a2724] sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Top bar: Brand logo & Session controls */}
        <div className="flex items-center justify-between py-3.5">
          <h1 className="font-display text-2xl font-medium text-[#efe8dc] m-0 tracking-tight">
            <span className="italic text-[#e8a33d]">Mi</span> Lista
          </h1>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-xs text-[#bdb5a9] font-medium ">
              Sesión: <strong className="text-white normal-case">{activeUser}</strong>
            </span>

            {/* Notifications Bell Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-1.5 rounded-lg bg-[#2a2724] hover:bg-[#36322e] text-[#bdb5a9] hover:text-white transition-all relative cursor-pointer"
                title="Notificaciones de amistad"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
                {pendingRequests.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#e8a33d] rounded-full ring-2 ring-[#1c1a18]" />
                )}
              </button>

              {/* Notification Menu */}
              {showNotifications && (
                <div className="fixed top-16 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-[#1c1a18] border border-[#2a2724] rounded-xl shadow-2xl z-50 py-3 md:absolute md:top-auto md:left-auto md:right-0 md:translate-x-0 md:w-72 md:mt-2">
                  <div className="px-4 pb-2 border-b border-[#2a2724] mb-2 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-[#8f877c]">
                      Solicitudes de amistad
                    </span>
                    {pendingRequests.length > 0 && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold text-white bg-[#d8c7a6] rounded-lg">
                        {pendingRequests.length}
                      </span>
                    )}
                  </div>

                  <div className="max-h-60 overflow-y-auto px-2">
                    {pendingRequests.length > 0 ? (
                      pendingRequests.map((sender) => (
                        <div
                          key={sender}
                          className="p-2 bg-[#2a2724]/30 border border-[#2a2724] rounded-lg flex items-center justify-between gap-3 mb-1.5 last:mb-0"
                        >
                          <span className="text-xs font-semibold text-white truncate">
                            {sender}
                          </span>
                          <div className="flex gap-1.5 flex-shrink-0">
                            <button
                              onClick={() => {
                                onAcceptRequest(sender);
                                setShowNotifications(false);
                              }}
                              className="px-2 py-1 text-[9px] font-bold text-[#131211] bg-[#e8a33d] hover:bg-[#d48f2a] rounded-lg cursor-pointer transition"
                            >
                              Aceptar
                            </button>
                            <button
                              onClick={() => {
                                onDeclineRequest(sender);
                              }}
                              className="px-2 py-1 text-[9px] font-bold text-white bg-[#2a2724] hover:bg-[#36322e] border border-[#4a4540]/60 rounded-lg cursor-pointer transition"
                            >
                              Ignorar
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-6 text-center text-xs text-[#8f877c]">
                        No tienes solicitudes pendientes
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <button
              onClick={onLogout}
              className="px-3.5 py-1.5 text-xs font-bold text-white hover:text-rose-400 bg-[#2a2724] hover:bg-rose-950/20 border border-[#4a4540]/60 hover:border-rose-900 rounded-lg transition-all cursor-pointer"
            >
              Salir
            </button>
          </div>
        </div>

        {/* Bottom bar: Navigation tabs & Search bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 gap-3">
          {/* Section tabs */}
          <nav className="-mx-4 px-4 overflow-x-auto no-scrollbar md:mx-0 md:px-0">
            <ul className="flex items-center gap-1.5">
              {sections.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <li key={sec.id}>
                    <button
                      onClick={() => setActiveSection(sec.id)}
                      className={`whitespace-nowrap px-4 py-1.5 text-sm font-medium rounded-full transition-all cursor-pointer ${
                        isActive
                          ? 'text-[#131211] bg-[#efe8dc]'
                          : 'text-[#bdb5a9] hover:text-[#efe8dc] hover:bg-[#2a2724]'
                      }`}
                    >
                      {sec.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Search box */}
          <div className="relative w-full md:max-w-xs">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#8f877c]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar en esta lista…"
              className="w-full pl-9 pr-4 py-2 bg-[#1c1a18] border border-[#2a2724] rounded-full text-sm text-white placeholder-[#8f877c] focus:outline-none focus:border-[#d8c7a6] focus:ring-1 focus:ring-[#d8c7a6] transition"
            />
          </div>

        </div>

      </div>
    </header>
  );
}
