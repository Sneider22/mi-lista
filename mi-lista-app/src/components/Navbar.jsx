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
    <header className="bg-[#1c252d] border-b border-[#2c3440] sticky top-0 z-40 shadow-md">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Top bar: Brand logo & Session controls */}
        <div className="flex items-center justify-between py-4 border-b border-[#2c3440]/50">
          <div className="flex items-center gap-2.5">
            <svg className="w-5.5 h-5.5 text-[#00e054]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h1 className="font-display text-xl font-black tracking-widest text-white m-0">
              MI LISTA
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-xs text-[#9ab] font-medium uppercase tracking-wider">
              Sesión: <strong className="text-white normal-case">{activeUser}</strong>
            </span>

            {/* Notifications Bell Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-1.5 rounded bg-[#2c3440] hover:bg-[#3d4957] text-[#9ab] hover:text-white transition-all relative cursor-pointer"
                title="Notificaciones de Amistad"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
                {pendingRequests.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#00e054] rounded-full ring-2 ring-[#1c252d]" />
                )}
              </button>

              {/* Notification Menu */}
              {showNotifications && (
                <div className="fixed top-16 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-[#1c252d] border border-[#2c3440] rounded-xl shadow-2xl z-50 py-3 md:absolute md:top-auto md:left-auto md:right-0 md:translate-x-0 md:w-72 md:mt-2">
                  <div className="px-4 pb-2 border-b border-[#2c3440] mb-2 flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#667788]">
                      Solicitudes de Amistad
                    </span>
                    {pendingRequests.length > 0 && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold text-white bg-[#40bcf4] rounded">
                        {pendingRequests.length}
                      </span>
                    )}
                  </div>

                  <div className="max-h-60 overflow-y-auto px-2">
                    {pendingRequests.length > 0 ? (
                      pendingRequests.map((sender) => (
                        <div
                          key={sender}
                          className="p-2 bg-[#2c3440]/30 border border-[#2c3440] rounded flex items-center justify-between gap-3 mb-1.5 last:mb-0"
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
                              className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[#14181c] bg-[#00e054] hover:bg-[#00c048] rounded cursor-pointer transition"
                            >
                              Aceptar
                            </button>
                            <button
                              onClick={() => {
                                onDeclineRequest(sender);
                              }}
                              className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-white bg-[#2c3440] hover:bg-[#3d4957] border border-[#445566]/60 rounded cursor-pointer transition"
                            >
                              Ignorar
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-6 text-center text-xs text-[#667788]">
                        No tienes solicitudes pendientes
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <button
              onClick={onLogout}
              className="px-3.5 py-1.5 text-xs font-bold text-white hover:text-rose-400 bg-[#2c3440] hover:bg-rose-950/20 border border-[#445566]/60 hover:border-rose-900 rounded transition-all cursor-pointer"
            >
              Salir
            </button>
          </div>
        </div>

        {/* Bottom bar: Navigation tabs & Search bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between py-3 gap-3">
          {/* Section tabs */}
          <nav>
            <ul className="flex items-center gap-1 -ml-2">
              {sections.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <li key={sec.id}>
                    <button
                      onClick={() => setActiveSection(sec.id)}
                      className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all cursor-pointer ${
                        isActive
                          ? 'text-[#00e054] bg-[#2c3440]'
                          : 'text-[#9ab] hover:text-white hover:bg-[#2c3440]/30'
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
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#667788]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar localmente en tu lista..."
              className="w-full pl-9 pr-4 py-2 bg-[#2c3440] border border-[#445566]/80 rounded text-xs text-white placeholder-[#667788] focus:outline-none focus:border-[#40bcf4] focus:ring-1 focus:ring-[#40bcf4] transition"
            />
          </div>

        </div>

      </div>
    </header>
  );
}
