import React, { useState } from 'react';

export default function AuthModal({ onLoginSuccess, showToast }) {
  const [isRegister, setIsRegister] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const getUsuarios = () => {
    return JSON.parse(localStorage.getItem('usuarios') || '{}');
  };

  const saveUsuario = (u, p) => {
    const usuarios = getUsuarios();
    usuarios[u] = p;
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const u = usuario.trim();
    if (!u || !password) return;

    const usuarios = getUsuarios();
    if (usuarios[u] === password) {
      localStorage.setItem('usuario_activo', u);
      onLoginSuccess(u);
      setError('');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const u = usuario.trim();
    if (u.length < 3 || password.length < 3) {
      setError('Mínimo 3 caracteres para usuario y contraseña');
      return;
    }

    // Password requirements: at least one uppercase letter and one number
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    if (!hasUppercase || !hasNumber) {
      setError('La contraseña debe contener al menos una letra mayúscula y un número');
      return;
    }

    const usuarios = getUsuarios();
    if (usuarios[u]) {
      setError('El usuario ya existe');
      return;
    }

    saveUsuario(u, password);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm transition-all duration-300">
      <div className="w-full max-w-md p-6 sm:p-8 bg-[#1c252d] border border-[#2c3440] rounded-xl shadow-2xl transition-all duration-500 scale-100">
        
        {/* Logo/Icon Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center justify-center w-14 h-14 rounded bg-[#2c3440] border border-[#445566]/80 text-[#00e054] mb-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="font-display text-2xl font-black tracking-widest text-white">
            MI LISTA
          </h1>
          <p className="text-xs uppercase tracking-wider text-[#667788] mt-1 font-bold">
            Catálogo Personal de Medios
          </p>
        </div>

        {/* Dynamic Form title */}
        <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-6 text-center border-b border-[#2c3440] pb-3">
          {isRegister ? 'Registrar nueva cuenta' : 'Iniciar Sesión'}
        </h2>

        <form onSubmit={isRegister ? handleRegister : handleLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#667788] mb-2">
              Usuario
            </label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#2c3440] border border-[#445566] rounded text-white text-sm focus:outline-none focus:border-[#40bcf4] focus:ring-1 focus:ring-[#40bcf4] transition"
              placeholder="Nombre de usuario"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#667788] mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 bg-[#2c3440] border border-[#445566] rounded text-white text-sm focus:outline-none focus:border-[#40bcf4] focus:ring-1 focus:ring-[#40bcf4] transition"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-[#667788] hover:text-[#9ab] transition-colors cursor-pointer"
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
              <span className="block text-[9px] text-[#667788] mt-1.5 leading-tight">
                La contraseña debe contener al menos 3 caracteres, una letra mayúscula y un número.
              </span>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-500 bg-rose-500/10 border border-rose-500/20 px-3 py-2.5 rounded justify-center">
              <svg className="w-4 h-4 text-rose-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 mt-2 font-bold uppercase tracking-wider text-xs text-[#14181c] bg-[#00e054] hover:bg-[#00c048] rounded transition cursor-pointer"
          >
            {isRegister ? 'Crear Cuenta' : 'Ingresar'}
          </button>
        </form>

        {/* Auth Toggle Link */}
        <p className="mt-6 text-xs text-center text-[#9ab] uppercase tracking-wider">
          {isRegister ? '¿Ya posees una cuenta?' : '¿Aún no tienes cuenta?'}{' '}
          <button
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
              setUsuario('');
              setPassword('');
              setShowPassword(false);
            }}
            className="font-bold text-[#40bcf4] hover:underline normal-case transition ml-1"
          >
            {isRegister ? 'Inicia sesión' : 'Regístrate'}
          </button>
        </p>
      </div>
    </div>
  );
}
