import React from 'react';

export default function ConfirmationModal({ isOpen, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/90 backdrop-blur-sm transition-all duration-300">
      <div className="w-full max-w-md bg-[#1c1a18] border border-[#2a2724] rounded-xl overflow-hidden shadow-2xl p-6 relative mt-16 animate-slide-down">
        
        {/* Warning Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-sm font-bold text-white font-display">
            Confirmar acción
          </h3>
        </div>

        {/* Message */}
        <p className="text-sm text-[#bdb5a9] leading-relaxed mb-6">
          {message}
        </p>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-xs font-bold text-[#131211] bg-[#e8a33d] hover:bg-[#d48f2a] rounded-lg transition cursor-pointer"
          >
            Aceptar
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 text-xs font-bold text-white bg-[#2a2724] hover:bg-[#36322e] border border-[#4a4540]/60 rounded-lg transition cursor-pointer"
          >
            Cancelar
          </button>
        </div>

      </div>
    </div>
  );
}
