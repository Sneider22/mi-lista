import React from 'react';

export default function ProfileHeader({
  currentUser,
  selectedProfile,
  setSelectedProfile,
  allUsers,
  userListings,
  currentUserFriends = [],
  currentUserIncomingRequests = [],
  selectedProfileIncomingRequests = [],
  onSendRequest,
  onAcceptRequest,
  onRemoveFriend,
  onCancelRequest
}) {
  
  // 10 funny cartoon animal avatars (Kittens from RoboHash)
  const avatarOptions = [
    { seed: 'kitten-1', url: 'https://robohash.org/Felix?set=set4' },
    { seed: 'kitten-2', url: 'https://robohash.org/Aneka?set=set4' },
    { seed: 'kitten-3', url: 'https://robohash.org/Jack?set=set4' },
    { seed: 'kitten-4', url: 'https://robohash.org/Zoe?set=set4' },
    { seed: 'kitten-5', url: 'https://robohash.org/Sasha?set=set4' },
    { seed: 'kitten-6', url: 'https://robohash.org/Toby?set=set4' },
    { seed: 'kitten-7', url: 'https://robohash.org/Sophia?set=set4' },
    { seed: 'kitten-8', url: 'https://robohash.org/Oliver?set=set4' },
    { seed: 'kitten-9', url: 'https://robohash.org/Mimi?set=set4' },
    { seed: 'kitten-10', url: 'https://robohash.org/Buster?set=set4' }
  ];

  // Helper to fetch user's saved avatar url
  const getAvatarUrl = (user) => {
    return localStorage.getItem('avatar_' + user) || `https://robohash.org/${encodeURIComponent(user)}?set=set4`;
  };

  const handleAvatarClick = (url) => {
    if (selectedProfile !== currentUser) return;
    localStorage.setItem('avatar_' + currentUser, url);
    window.dispatchEvent(new Event('storage'));
  };

  // Compatibility calculation
  const calculateCompatibility = () => {
    const listA = (userListings[currentUser] || []).map(item => item.titulo.toLowerCase());
    const listB = (userListings[selectedProfile] || []).map(item => item.titulo.toLowerCase());
    
    if (listA.length === 0 || listB.length === 0) return 0;
    
    const common = listA.filter(title => listB.includes(title));
    const total = Math.max(listA.length, listB.length);
    return Math.round((common.length / total) * 100);
  };

  const currentAvatar = getAvatarUrl(selectedProfile);
  const isOwnProfile = currentUser === selectedProfile;
  const compatibility = isOwnProfile ? null : calculateCompatibility();

  // Friendship states
  const isFriend = currentUserFriends.includes(selectedProfile);
  const hasIncomingRequest = currentUserIncomingRequests.includes(selectedProfile);
  const hasSentRequest = selectedProfileIncomingRequests.includes(currentUser);

  // Render social actions on another user's profile
  const renderFriendshipControl = () => {
    if (isOwnProfile) return null;

    if (isFriend) {
      return (
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#00e054] bg-[#00e054]/10 border border-[#00e054]/20 rounded">
            Conexión: Amigos
          </span>
          <button
            onClick={() => onRemoveFriend(selectedProfile)}
            className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#9ab] hover:text-white bg-[#2c3440] hover:bg-rose-950/20 border border-[#445566]/60 hover:border-rose-900 rounded cursor-pointer transition"
          >
            Eliminar Amigo
          </button>
        </div>
      );
    }

    if (hasIncomingRequest) {
      return (
        <div className="flex items-center gap-2">
          <button
            onClick={() => onAcceptRequest(selectedProfile)}
            className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#14181c] bg-[#00e054] hover:bg-[#00c048] rounded cursor-pointer transition"
          >
            Aceptar Solicitud
          </button>
        </div>
      );
    }

    if (hasSentRequest) {
      return (
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#9ab] bg-[#2c3440] border border-[#445566]/30 rounded">
            Solicitud Pendiente
          </span>
          <button
            onClick={() => onCancelRequest(selectedProfile)}
            className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#667788] hover:text-[#9ab] bg-transparent border border-[#445566]/20 rounded cursor-pointer transition"
          >
            Cancelar
          </button>
        </div>
      );
    }

    return (
      <button
        onClick={() => onSendRequest(selectedProfile)}
        className="px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-[#14181c] bg-[#40bcf4] hover:bg-[#329dc9] rounded cursor-pointer transition"
      >
        Agregar Amigo
      </button>
    );
  };

  return (
    <div className="bg-[#1c252d]/60 border border-[#2c3440] rounded-xl p-6 mb-8 max-w-6xl mx-auto shadow-md">
      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
        
        {/* Profile Details & Avatar selection */}
        <div className="flex flex-col sm:flex-row items-start gap-5 w-full md:w-auto">
          {/* Avatar frame */}
          <div className="relative flex-shrink-0">
            <img
              src={currentAvatar}
              alt="Avatar"
              className={`w-20 h-20 rounded-lg border-2 ${
                isOwnProfile ? 'border-[#00e054]' : 'border-[#40bcf4]'
              } shadow-lg object-cover bg-[#14181c]`}
            />
          </div>

          <div className="text-center sm:text-left space-y-3 flex-grow">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <h3 className="text-lg font-bold text-white font-display">
                Perfil de <span className="text-[#40bcf4]">{selectedProfile}</span>
              </h3>
              {isOwnProfile ? (
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#00e054] bg-[#00e054]/10 border border-[#00e054]/20 rounded">
                  Usuario Activo
                </span>
              ) : (
                /* Friendship Badge */
                renderFriendshipControl()
              )}
            </div>

            {/* Avatar Selector and Friends List for owner */}
            {isOwnProfile ? (
              <div className="space-y-4">
                {/* Selector */}
                <div className="space-y-1.5">
                  <span className="block text-[10px] uppercase tracking-wider text-[#667788] font-bold text-left">
                    Seleccionar personaje animal:
                  </span>
                  <div className="grid grid-cols-5 gap-1.5 sm:flex sm:flex-wrap">
                    {avatarOptions.map((av) => {
                      const savedAvatar = localStorage.getItem('avatar_' + currentUser);
                      const isSelected = savedAvatar === av.url;
                      return (
                        <button
                          key={av.seed}
                          onClick={() => handleAvatarClick(av.url)}
                          className={`w-7 h-7 rounded overflow-hidden border bg-[#14181c] hover:scale-105 active:scale-95 transition-all ${
                            isSelected ? 'border-[#00e054] ring-2 ring-[#00e054]/20 scale-105' : 'border-[#445566]/60'
                          }`}
                        >
                          <img src={av.url} alt={av.seed} className="w-full h-full object-cover" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Friends List section */}
                <div className="space-y-2 border-t border-[#2c3440] pt-3 mt-3 text-left">
                  <span className="block text-[10px] uppercase tracking-wider text-[#667788] font-bold">
                    Mis Amigos ({currentUserFriends.length}):
                  </span>
                  {currentUserFriends.length > 0 ? (
                    <div className="flex flex-wrap gap-2 max-w-xl">
                      {currentUserFriends.map((friend) => (
                        <div
                          key={friend}
                          className="flex items-center gap-2 bg-[#2c3440]/60 hover:bg-[#2c3440] border border-[#2c3440] pl-2.5 pr-1.5 py-1 rounded text-xs text-white"
                        >
                          <button
                            onClick={() => setSelectedProfile(friend)}
                            className="font-bold text-[#40bcf4] hover:underline cursor-pointer text-xs"
                          >
                            {friend}
                          </button>
                          <button
                            onClick={() => onRemoveFriend(friend)}
                            title="Eliminar amigo"
                            className="text-[#667788] hover:text-rose-500 cursor-pointer transition-colors p-0.5 rounded hover:bg-[#14181c]"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="block text-[11px] text-[#667788] italic">
                      No tienes amigos en tu lista. Selecciona otro perfil en la derecha para enviar una solicitud.
                    </span>
                  )}
                </div>

              </div>
            ) : (
              /* Compatibility display (For others) */
              <div className="space-y-1.5 max-w-xs mx-auto sm:mx-0">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-[#9ab] uppercase tracking-wider text-[10px]">Indice de coincidencia:</span>
                  <span className="text-[#00e054]">{compatibility}%</span>
                </div>
                {/* Visual affinity bar */}
                <div className="w-48 h-1.5 bg-[#2c3440] rounded-full overflow-hidden border border-[#445566]/20">
                  <div
                    className="h-full bg-gradient-to-r from-[#40bcf4] to-[#00e054] transition-all duration-500"
                    style={{ width: `${compatibility}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* User profile selector & Back button */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto flex-shrink-0 md:mt-0 mt-4">
          {!isOwnProfile && (
            <button
              onClick={() => setSelectedProfile(currentUser)}
              className="w-full sm:w-auto px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#14181c] bg-[#40bcf4] hover:bg-[#329dc9] rounded transition cursor-pointer"
            >
              Volver a mi perfil
            </button>
          )}

          <div className="flex items-center gap-2 w-full sm:w-auto bg-[#2c3440]/60 border border-[#445566]/40 px-3 py-1.5 rounded">
            <label htmlFor="user-select" className="text-[10px] text-[#667788] uppercase tracking-wider font-bold whitespace-nowrap">
              Ver perfil:
            </label>
            <select
              id="user-select"
              value={selectedProfile}
              onChange={(e) => setSelectedProfile(e.target.value)}
              className="bg-transparent border-0 text-white text-xs font-bold focus:ring-0 focus:outline-none cursor-pointer"
            >
              {allUsers.map((u) => (
                <option key={u} value={u} className="bg-[#1c252d] text-white">
                  {u}
                </option>
              ))}
            </select>
          </div>
        </div>

      </div>
    </div>
  );
}
