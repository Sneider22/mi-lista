import React, { useState } from 'react';
import { registerUser, verifyUser, isDemoAccount, getUsers } from '../lib/auth';
import { seedDemoData, GUEST_USER, DEMO_USERS } from '../data/demo';

const MIN_PASSWORD = 6;
// Nombres usados por el modo invitado: no se pueden registrar
const RESERVED_NAMES = DEMO_USERS.map((name) => name.toLowerCase());

export default function AuthModal({ onLoginSuccess, showToast }) {
  const [isRegister, setIsRegister] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const u = usuario.trim();
    if (!u || !password) return;

    if (isDemoAccount(u)) {
      setError('Esa es una cuenta de demostración: usa "Entrar como invitado"');
      return;
    }
    if (await verifyUser(u, password)) {
      localStorage.setItem('usuario_activo', u);
      onLoginSuccess(u);
      setError('');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  // Entra con una lista de ejemplo, sin registrarse
  const handleGuest = () => {
    // Si antes de existir el modo invitado alguien registró una cuenta real llamada "Invitado", no se entra en ella
    if (getUsers()[GUEST_USER] && !isDemoAccount(GUEST_USER)) {
      setError(`Ya existe una cuenta personal llamada "${GUEST_USER}" en este navegador`);
      return;
    }
    seedDemoData();
    localStorage.setItem('usuario_activo', GUEST_USER);
    onLoginSuccess(GUEST_USER);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const u = usuario.trim();
    if (u.length < 3) {
      setError('El usuario debe tener al menos 3 caracteres');
      return;
    }
    if (RESERVED_NAMES.includes(u.toLowerCase())) {
      setError('Ese nombre está reservado para la demostración');
      return;
    }
    if (password.length < MIN_PASSWORD) {
      setError(`La contraseña debe tener al menos ${MIN_PASSWORD} caracteres`);
      return;
    }

    // Password requirements: at least one uppercase letter and one number
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    if (!hasUppercase || !hasNumber) {
      setError('La contraseña debe contener al menos una letra mayúscula y un número');
      return;
    }

    const result = await registerUser(u, password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setError('');
    if (showToast) {
      showToast('Usuario registrado correctamente');
    }
    setIsRegister(false);
    setUsuario('');
    setPassword('');
    setShowPassword(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#131211] transition-all duration-300">
      <div className="w-full max-w-md p-6 sm:p-8 bg-[#1c1a18] border border-[#2a2724] rounded-2xl shadow-2xl shadow-black/50 transition-all duration-500 scale-100">
        
        {/* Logo/Icon Header */}
        <div className="flex flex-col items-center mb-6">
          <h1 className="font-display text-2xl font-black text-white">
            <span className="italic text-[#e8a33d]">Mi</span> Lista
          </h1>
          <p className="text-xs text-[#8f877c] mt-1 font-bold">
            Tu catálogo de series, películas, libros y música
          </p>
        </div>

        {/* Dynamic Form title */}
        <h2 className="text-sm font-bold text-white mb-6 text-center border-b border-[#2a2724] pb-3">
          {isRegister ? 'Crear una cuenta' : 'Iniciar sesión'}
        </h2>

        <form onSubmit={isRegister ? handleRegister : handleLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-[#8f877c] mb-2">
              Usuario
            </label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#2a2724] border border-[#4a4540] rounded-lg text-white text-sm focus:outline-none focus:border-[#d8c7a6] focus:ring-1 focus:ring-[#d8c7a6] transition"
              placeholder="Nombre de usuario"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#8f877c] mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 bg-[#2a2724] border border-[#4a4540] rounded-lg text-white text-sm focus:outline-none focus:border-[#d8c7a6] focus:ring-1 focus:ring-[#d8c7a6] transition"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-[#8f877c] hover:text-[#bdb5a9] transition-colors cursor-pointer"
                title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? (
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
            {isRegister && (
              <span className="block text-[9px] text-[#8f877c] mt-1.5 leading-tight">
                Al menos {MIN_PASSWORD} caracteres, una letra mayúscula y un número. Se guarda cifrada en este navegador.
              </span>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-500 bg-rose-500/10 border border-rose-500/20 px-3 py-2.5 rounded-lg justify-center">
              <svg className="w-4 h-4 text-rose-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 mt-2 font-bold text-xs text-[#131211] bg-[#e8a33d] hover:bg-[#d48f2a] rounded-lg transition cursor-pointer"
          >
            {isRegister ? 'Crear cuenta' : 'Ingresar'}
          </button>
        </form>

        {!isRegister && (
          <div className="mt-4">
            <div className="flex items-center gap-3 text-[10px] text-[#4a4540] font-bold">
              <span className="flex-1 h-px bg-[#2a2724]"></span> o <span className="flex-1 h-px bg-[#2a2724]"></span>
            </div>
            <button
              type="button"
              onClick={handleGuest}
              className="w-full mt-4 py-2.5 font-bold text-xs text-white bg-[#2a2724] hover:bg-[#36322e] border border-[#4a4540] rounded-lg transition cursor-pointer"
            >
              Entrar como invitado
            </button>
            <p className="mt-2 text-[10px] text-center text-[#8f877c]">
              Explora una lista de ejemplo sin crear una cuenta.
            </p>
          </div>
        )}

        {/* Auth Toggle Link */}
        <p className="mt-6 text-xs text-center text-[#bdb5a9] ">
          {isRegister ? '¿Ya posees una cuenta?' : '¿Aún no tienes cuenta?'}{' '}
          <button
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
              setUsuario('');
              setPassword('');
              setShowPassword(false);
            }}
            className="font-bold text-[#d8c7a6] hover:underline normal-case transition ml-1"
          >
            {isRegister ? 'Inicia sesión' : 'Regístrate'}
          </button>
        </p>
      </div>
    </div>
  );
}
