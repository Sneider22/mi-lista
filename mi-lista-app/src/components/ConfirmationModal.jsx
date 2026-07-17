import React from 'react';

export default function ConfirmationModal({ isOpen, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/90 backdrop-blur-sm transition-all duration-300">
      <div className="w-full max-w-md bg-[#1c252d] border border-[#2c3440] rounded-xl overflow-hidden shadow-2xl p-6 relative mt-16 animate-slide-down">
        
        {/* Warning Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded bg-rose-500/10 border border-rose-500/20 text-rose-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white font-display">
            Confirmar acción
          </h3>
        </div>

        {/* Message */}
        <p className="text-sm text-[#9ab] leading-relaxed mb-6">
          {message}
        </p>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#14181c] bg-[#00e054] hover:bg-[#00c048] rounded transition cursor-pointer"
          >
            Aceptar
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#2c3440] hover:bg-[#3d4957] border border-[#445566]/60 rounded transition cursor-pointer"
          >
            Cancelar
          </button>
        </div>

      </div>
    </div>
  );
}
