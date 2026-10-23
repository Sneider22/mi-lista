import React, { useState } from 'react';
import ProfileSwitcher from './ProfileSwitcher';
import FriendsPreview from './FriendsPreview';

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
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  
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

  // Afinidad entre dos catálogos (0-100):
  // - 70%: títulos en común, contando solo si son del mismo tipo (el libro "Dune" no es la película "Dune")
  // - 30%: géneros de películas y series que comparten (índice de Jaccard)
  const calculateCompatibility = (other = selectedProfile) => {
    const listA = userListings[currentUser] || [];
    const listB = userListings[other] || [];
    if (listA.length === 0 || listB.length === 0) return 0;

    const key = (item) => `${item.tipo}:${item.titulo.trim().toLowerCase()}`;
    const keysB = new Set(listB.map(key));
    const common = listA.filter((item) => keysB.has(key(item))).length;
    const titleScore = common / Math.max(listA.length, listB.length);

    const genres = (list) => new Set(list.flatMap((item) => (item.tmdb && item.tmdb.genre_ids) || []));
    const genresA = genres(listA);
    const genresB = genres(listB);
    const union = new Set([...genresA, ...genresB]);
    const sharedGenres = [...genresA].filter((g) => genresB.has(g)).length;
    const genreScore = union.size ? sharedGenres / union.size : 0;

    return Math.round((0.7 * titleScore + 0.3 * genreScore) * 100);
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
          <span className="px-3 py-1 text-[10px] font-bold text-[#e8a33d] bg-[#e8a33d]/10 border border-[#e8a33d]/20 rounded-lg">
            Son amigos
          </span>
          <button
            onClick={() => onRemoveFriend(selectedProfile)}
            className="px-3 py-1.5 text-[10px] font-bold text-[#bdb5a9] hover:text-white bg-[#2a2724] hover:bg-rose-950/20 border border-[#4a4540]/60 hover:border-rose-900 rounded-lg cursor-pointer transition"
          >
            Eliminar amigo
          </button>
        </div>
      );
    }

    if (hasIncomingRequest) {
      return (
        <div className="flex items-center gap-2">
          <button
            onClick={() => onAcceptRequest(selectedProfile)}
            className="px-3 py-1.5 text-[10px] font-bold text-[#131211] bg-[#e8a33d] hover:bg-[#d48f2a] rounded-lg cursor-pointer transition"
          >
            Aceptar solicitud
          </button>
        </div>
      );
    }

    if (hasSentRequest) {
      return (
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 text-[10px] font-bold text-[#bdb5a9] bg-[#2a2724] border border-[#4a4540]/30 rounded-lg">
            Solicitud Pendiente
          </span>
          <button
            onClick={() => onCancelRequest(selectedProfile)}
            className="px-3 py-1.5 text-[10px] font-bold text-[#8f877c] hover:text-[#bdb5a9] bg-transparent border border-[#4a4540]/20 rounded-lg cursor-pointer transition"
          >
            Cancelar
          </button>
        </div>
      );
    }

    return (
      <button
        onClick={() => onSendRequest(selectedProfile)}
        className="px-3.5 py-2 text-[10px] font-bold text-[#131211] bg-[#d8c7a6] hover:bg-[#c4b28e] rounded-lg cursor-pointer transition"
      >
        Agregar amigo
      </button>
    );
  };

  return (
    <div className="bg-[#1c1a18] border border-[#2a2724] rounded-2xl p-4 sm:p-6 mb-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
        
        {/* Profile Details & Avatar selection */}
        <div className="flex flex-row items-start gap-4 sm:gap-5 w-full md:w-auto">
          {/* Avatar frame */}
          <div className="relative flex-shrink-0">
            <img
              src={currentAvatar}
              alt="Avatar"
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 ${
                isOwnProfile ? 'border-[#e8a33d]' : 'border-[#d8c7a6]'
              } shadow-lg object-cover bg-[#131211]`}
            />
            {isOwnProfile && (
              <button
                onClick={() => setShowAvatarSelector(!showAvatarSelector)}
                title="Editar foto de perfil"
                className="absolute -bottom-1.5 -right-1.5 p-1 bg-[#2a2724] hover:bg-[#36322e] border border-[#4a4540]/80 text-[#e8a33d] hover:text-[#f2b95c] rounded-lg shadow-md cursor-pointer transition-all active:scale-95 z-10"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.83 18.25a2.25 2.25 0 01-1.022.547l-3.52 1.002a.75.75 0 01-.98-.98l1.002-3.52a2.25 2.25 0 01.548-1.022L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
              </button>
            )}
          </div>

          <div className="text-left space-y-3 flex-grow min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="text-xl sm:text-2xl font-medium text-[#efe8dc] font-display">
                Perfil de <span className="text-[#d8c7a6]">{selectedProfile}</span>
              </h3>
              {isOwnProfile ? (
                <span className="px-2 py-0.5 text-[10px] font-bold text-[#e8a33d] bg-[#e8a33d]/10 border border-[#e8a33d]/20 rounded-lg">
                  Tu perfil
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
                {showAvatarSelector && (
                  <div className="space-y-1.5 animate-slide-down">
                    <span className="block text-[10px] text-[#8f877c] font-bold text-left">
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
                            className={`w-7 h-7 rounded-lg overflow-hidden border bg-[#131211] hover:scale-105 active:scale-95 transition-all ${
                              isSelected ? 'border-[#e8a33d] ring-2 ring-[#e8a33d]/20 scale-105' : 'border-[#4a4540]/60'
                            }`}
                          >
                            <img src={av.url} alt={av.seed} className="w-full h-full object-cover" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Amigos: una línea compacta que abre la lista completa */}
                <div className="border-t border-[#2a2724] pt-3 mt-3">
                  <FriendsPreview
                    friends={currentUserFriends}
                    getAvatarUrl={getAvatarUrl}
                    userListings={userListings}
                    affinityWith={calculateCompatibility}
                    onOpenProfile={setSelectedProfile}
                    onRemoveFriend={onRemoveFriend}
                  />
                </div>

              </div>
            ) : (
              /* Compatibility display (For others) */
              <div className="space-y-1.5 max-w-xs">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-[#bdb5a9] text-[10px]">Afinidad de gustos</span>
                  <span className="text-[#e8a33d]">{compatibility}%</span>
                </div>
                {/* Visual affinity bar */}
                <div className="w-48 h-1.5 bg-[#2a2724] rounded-full overflow-hidden border border-[#4a4540]/20">
                  <div
                    className="h-full bg-gradient-to-r from-[#d8c7a6] to-[#e8a33d] transition-all duration-500"
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
              className="w-full sm:w-auto px-4 py-2 text-xs font-bold text-[#131211] bg-[#d8c7a6] hover:bg-[#c4b28e] rounded-lg transition cursor-pointer"
            >
              Volver a mi perfil
            </button>
          )}

          <ProfileSwitcher
            users={allUsers}
            currentUser={currentUser}
            selected={selectedProfile}
            friends={currentUserFriends}
            onChange={setSelectedProfile}
            getAvatarUrl={getAvatarUrl}
          />
        </div>

      </div>
    </div>
  );
}
