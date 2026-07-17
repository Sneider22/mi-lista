import React, { useState, useEffect } from 'react';
import AuthModal from './components/AuthModal';
import Navbar from './components/Navbar';
import ProfileHeader from './components/ProfileHeader';
import Catalog from './components/Catalog';
import AddItemModal from './components/AddItemModal';
import DetailModal from './components/DetailModal';
import Toast from './components/Toast';
import ConfirmationModal from './components/ConfirmationModal';

const TMDB_API_KEY = 'e7fc358f1fb84ae5a56fda2f30e11a30';

export default function App() {
  const [activeUser, setActiveUser] = useState(() => localStorage.getItem('usuario_activo') || '');
  const [selectedProfile, setSelectedProfile] = useState(() => localStorage.getItem('usuario_activo') || '');
  const [activeSection, setActiveSection] = useState('series');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [genresMap, setGenresMap] = useState({});

  // Active detail inspected item
  const [selectedDetailItem, setSelectedDetailItem] = useState(null);

  // Custom alert toast message
  const [toastMessage, setToastMessage] = useState('');

  // Custom confirmation modal config
  const [confirmConfig, setConfirmConfig] = useState(null);

  // Listings state: { [username]: [items] }
  const [userListings, setUserListings] = useState(() => {
    return JSON.parse(localStorage.getItem('listas') || '{}');
  });

  // All users state (for dropdown listing)
  const [allUsers, setAllUsers] = useState(() => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '{}');
    return Object.keys(usuarios);
  });

  // Friends state: { [username]: [friendUsernames] }
  const [friends, setFriends] = useState(() => {
    return JSON.parse(localStorage.getItem('amigos') || '{}');
  });

  // Friend requests state: { [username]: [incomingRequestUsernames] }
  const [friendRequests, setFriendRequests] = useState(() => {
    return JSON.parse(localStorage.getItem('solicitudes') || '{}');
  });

  // Local state trigger to re-read avatar updates
  const [avatarUpdateTrigger, setAvatarUpdateTrigger] = useState(0);

  // Fetch TMDB genres list on mount
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=es-ES`)
      .then((res) => res.json())
      .then((data) => {
        if (data.genres) {
          const map = {};
          data.genres.forEach((g) => {
            map[g.id] = g.name;
          });
          setGenresMap(map);
        }
      })
      .catch((err) => console.error('Error fetching TMDB genres:', err));
  }, []);

  // Listen to window storage events (used to sync avatars or other data immediately)
  useEffect(() => {
    const handleStorageChange = () => {
      setAvatarUpdateTrigger((prev) => prev + 1);

      const updatedActiveUser = localStorage.getItem('usuario_activo') || '';
      setActiveUser(updatedActiveUser);

      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '{}');
      setAllUsers(Object.keys(usuarios));

      const listas = JSON.parse(localStorage.getItem('listas') || '{}');
      setUserListings(listas);

      const amigos = JSON.parse(localStorage.getItem('amigos') || '{}');
      setFriends(amigos);

      const solicitudes = JSON.parse(localStorage.getItem('solicitudes') || '{}');
      setFriendRequests(solicitudes);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Disable background page scroll when any modal overlay is active
  useEffect(() => {
    const isModalActive = isAddModalOpen || !!selectedDetailItem || !!confirmConfig;
    if (isModalActive) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isAddModalOpen, selectedDetailItem, confirmConfig]);

  const showToast = (message) => {
    setToastMessage(message);
  };

  const handleLoginSuccess = (username) => {
    setActiveUser(username);
    setSelectedProfile(username);

    // Refresh user lists
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '{}');
    setAllUsers(Object.keys(usuarios));
    showToast(`Bienvenido, ${username}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('usuario_activo');
    setActiveUser('');
    setSelectedProfile('');
    // Optionally reload to completely reset memory states
    window.location.reload();
  };

  const handleAddItem = (newItem) => {
    const lists = { ...userListings };
    if (!lists[activeUser]) {
      lists[activeUser] = [];
    }

    lists[activeUser].push(newItem);
    setUserListings(lists);
    localStorage.setItem('listas', JSON.stringify(lists));
  };

  // Uses custom confirmation modal instead of native confirm
  const handleDeleteItem = (itemToDelete) => {
    setConfirmConfig({
      message: `¿Seguro que deseas eliminar "${itemToDelete.titulo}" de tu catálogo?`,
      onConfirm: () => {
        const lists = { ...userListings };
        if (!lists[activeUser]) return;

        lists[activeUser] = lists[activeUser].filter(
          (item) => !(item.tipo === itemToDelete.tipo && item.titulo === itemToDelete.titulo)
        );

        setUserListings(lists);
        localStorage.setItem('listas', JSON.stringify(lists));
        setConfirmConfig(null);
        showToast('Elemento eliminado del catálogo');
      }
    });
  };

  // Social Friend Requests Actions
  const handleSendRequest = (target) => {
    const reqs = { ...friendRequests };
    if (!reqs[target]) reqs[target] = [];
    if (!reqs[target].includes(activeUser)) {
      reqs[target].push(activeUser);
    }
    setFriendRequests(reqs);
    localStorage.setItem('solicitudes', JSON.stringify(reqs));
    showToast('Solicitud de amistad enviada');
  };

  const handleAcceptRequest = (sender) => {
    // Add both as friends
    const frs = { ...friends };
    if (!frs[activeUser]) frs[activeUser] = [];
    if (!frs[activeUser].includes(sender)) frs[activeUser].push(sender);

    if (!frs[sender]) frs[sender] = [];
    if (!frs[sender].includes(activeUser)) frs[sender].push(activeUser);

    setFriends(frs);
    localStorage.setItem('amigos', JSON.stringify(frs));

    // Clear from pending requests
    const reqs = { ...friendRequests };
    if (reqs[activeUser]) {
      reqs[activeUser] = reqs[activeUser].filter((u) => u !== sender);
    }
    setFriendRequests(reqs);
    localStorage.setItem('solicitudes', JSON.stringify(reqs));
    showToast('Solicitud de amistad aceptada');
  };

  const handleDeclineRequest = (sender) => {
    const reqs = { ...friendRequests };
    if (reqs[activeUser]) {
      reqs[activeUser] = reqs[activeUser].filter((u) => u !== sender);
    }
    setFriendRequests(reqs);
    localStorage.setItem('solicitudes', JSON.stringify(reqs));
    showToast('Solicitud ignorada');
  };

  const handleCancelRequest = (target) => {
    const reqs = { ...friendRequests };
    if (reqs[target]) {
      reqs[target] = reqs[target].filter((u) => u !== activeUser);
    }
    setFriendRequests(reqs);
    localStorage.setItem('solicitudes', JSON.stringify(reqs));
    showToast('Solicitud cancelada');
  };

  // Uses custom confirmation modal instead of native confirm
  const handleRemoveFriend = (target) => {
    setConfirmConfig({
      message: `¿Seguro que deseas eliminar a ${target} de tus amigos? Un amigo no se debería perder tan fácil.`,
      onConfirm: () => {
        const frs = { ...friends };
        if (frs[activeUser]) {
          frs[activeUser] = frs[activeUser].filter((u) => u !== target);
        }
        if (frs[target]) {
          frs[target] = frs[target].filter((u) => u !== activeUser);
        }
        setFriends(frs);
        localStorage.setItem('amigos', JSON.stringify(frs));
        setConfirmConfig(null);
        showToast(`Eliminaste a ${target} de tus amigos`);
      }
    });
  };

  const handleUpdateItemStatus = (targetItem, newStatus) => {
    const lists = { ...userListings };
    if (!lists[activeUser]) return;

    lists[activeUser] = lists[activeUser].map((item) => {
      if (item.tipo === targetItem.tipo && item.titulo === targetItem.titulo) {
        return { ...item, estado: newStatus };
      }
      return item;
    });

    setUserListings(lists);
    localStorage.setItem('listas', JSON.stringify(lists));

    // Update selectedDetailItem if currently open to reflect change instantly
    setSelectedDetailItem((prev) => {
      if (prev && prev.tipo === targetItem.tipo && prev.titulo === targetItem.titulo) {
        return { ...prev, estado: newStatus };
      }
      return prev;
    });

    showToast('Estado de consumo actualizado');
  };

  const currentCatalog = userListings[selectedProfile] || [];
  const activeUserPendingRequests = friendRequests[activeUser] || [];
  const selectedProfilePendingRequests = friendRequests[selectedProfile] || [];
  const activeUserFriendsList = friends[activeUser] || [];

  return (
    <div className="min-h-screen flex flex-col bg-[#14181c] text-[#9ab] selection:bg-[#00e054] selection:text-black">
      {/* If not logged in, force show Auth Modal */}
      {!activeUser && (
        <AuthModal onLoginSuccess={handleLoginSuccess} showToast={showToast} />
      )}

      {activeUser && (
        <>
          {/* Main App Navigation Header */}
          <Navbar
            activeUser={activeUser}
            onLogout={handleLogout}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            pendingRequests={activeUserPendingRequests}
            onAcceptRequest={handleAcceptRequest}
            onDeclineRequest={handleDeclineRequest}
          />

          {/* Main Content Area */}
          <main className="flex-grow pt-8 px-4 md:px-0">
            {/* User Profile Affinity, Friends controls, & Avatar selection */}
            <ProfileHeader
              currentUser={activeUser}
              selectedProfile={selectedProfile}
              setSelectedProfile={setSelectedProfile}
              allUsers={allUsers}
              userListings={userListings}
              currentUserFriends={activeUserFriendsList}
              currentUserIncomingRequests={activeUserPendingRequests}
              selectedProfileIncomingRequests={selectedProfilePendingRequests}
              onSendRequest={handleSendRequest}
              onAcceptRequest={handleAcceptRequest}
              onRemoveFriend={handleRemoveFriend}
              onCancelRequest={handleCancelRequest}
              key={avatarUpdateTrigger} // Triggers repaint on avatar change
            />

            {/* Catalog Grid Section */}
            <Catalog
              activeSection={activeSection}
              selectedProfile={selectedProfile}
              currentUser={activeUser}
              catalogItems={currentCatalog}
              onDeleteItem={handleDeleteItem}
              onSelectItem={setSelectedDetailItem}
              searchTerm={searchTerm}
              genresMap={genresMap}
            />
          </main>

          {/* Footer (Formal - no emojis) */}
          <footer className="bg-[#1c252d] border-t border-[#2c3440] py-6 text-center text-xs text-[#667788] uppercase tracking-wider">
            <div className="max-w-6xl mx-auto px-4 space-y-1.5 font-semibold">
              <p>
                Desarrollado por Sneider
              </p>
              <p className="text-[10px] text-[#445566] normal-case font-normal">
                Datos provistos por TMDB API y Open Library API.
              </p>
            </div>
          </footer>

          {/* Floating Action Button (Only on own profile, with SVG icon instead of emoji) */}
          {selectedProfile === activeUser && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              title="Agregar a tu lista"
              className="fixed bottom-6 right-6 w-14 h-14 bg-[#00e054] hover:bg-[#00c048] text-[#14181c] rounded-full shadow-lg shadow-[#00e054]/25 flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-30 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          )}

          {/* Add Item Modal overlay */}
          <AddItemModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onAddItem={handleAddItem}
            currentCatalog={userListings[activeUser] || []}
            showToast={showToast}
          />

          {/* Detail Modal Overlay */}
          <DetailModal
            item={selectedDetailItem}
            isOpen={!!selectedDetailItem}
            onClose={() => setSelectedDetailItem(null)}
            genresMap={genresMap}
            canDelete={selectedProfile === activeUser}
            onDelete={(item) => {
              handleDeleteItem(item);
              setSelectedDetailItem(null);
            }}
            onUpdateStatus={handleUpdateItemStatus}
          />

          {/* Toast notifications */}
          <Toast message={toastMessage} onClose={() => setToastMessage('')} />

          {/* Custom Confirmation Modals */}
          <ConfirmationModal
            isOpen={!!confirmConfig}
            message={confirmConfig?.message || ''}
            onConfirm={confirmConfig?.onConfirm || (() => { })}
            onCancel={() => setConfirmConfig(null)}
          />
        </>
      )}
    </div>
  );
}
