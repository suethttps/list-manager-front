'use client';

import { X } from 'lucide-react';
import { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', { email, password });
    // Aqui você adicionaria a lógica de login real
    setEmail('');
    setPassword('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        {/* Modal Header */}
        <div className="bg-green-600 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Bem-vindo!</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
                className="w-full px-4 py-3 rounded-lg border-2 border-blue-200 focus:border-blue-400 focus:outline-none bg-blue-50 text-gray-900 placeholder-gray-500 transition"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border-2 border-green-200 focus:border-green-400 focus:outline-none bg-green-50 text-gray-900 placeholder-gray-500 transition"
              />
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded border-2 border-blue-300 accent-blue-400" />
                <span className="text-sm text-gray-700">Lembrar-me</span>
              </label>
              <a href="#" className="text-sm text-green-600 hover:text-green-700 font-medium">
                Esqueceu a senha?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:shadow-lg transition transform hover:scale-105"
            >
              Entrar
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-sm text-gray-600">ou</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-gray-700">
              Não tem conta?{' '}
              <a href="#" className="text-green-600 hover:text-green-700 font-semibold">
                Cadastre-se
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
